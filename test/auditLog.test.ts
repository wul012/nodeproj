import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AuditLog, FileBackedAuditStore, InMemoryAuditStore, outcomeForStatus, routeGroupForPath } from "../src/services/auditLog.js";

describe("AuditLog", () => {
  it("records recent events with route groups and summary counts", () => {
    const log = new AuditLog(5);

    log.record({
      requestId: "req-1",
      method: "get",
      path: "/health",
      statusCode: 200,
      durationMs: 4.4,
    });
    log.record({
      requestId: "req-2",
      method: "post",
      path: "/api/v1/mini-kv/commands",
      statusCode: 400,
      durationMs: 9.6,
    });
    log.record({
      requestId: "req-3",
      method: "get",
      path: "/api/v1/order-platform/products",
      statusCode: 502,
      durationMs: 15,
    });

    const summary = log.summary();

    expect(summary.total).toBe(3);
    expect(summary.success).toBe(1);
    expect(summary.clientError).toBe(1);
    expect(summary.serverError).toBe(1);
    expect(summary.averageDurationMs).toBe(10);
    expect(summary.byRouteGroup).toEqual({
      health: 1,
      "mini-kv": 1,
      "order-platform": 1,
    });
    expect(summary.latest?.requestId).toBe("req-3");
  });

  it("keeps only the configured number of latest events", () => {
    const log = new AuditLog(2);

    log.record({ requestId: "req-1", method: "GET", path: "/health", statusCode: 200, durationMs: 1 });
    log.record({ requestId: "req-2", method: "GET", path: "/api/v1/audit/summary", statusCode: 200, durationMs: 2 });
    log.record({ requestId: "req-3", method: "GET", path: "/api/v1/sources/status", statusCode: 200, durationMs: 3 });

    expect(log.list().map((event) => event.requestId)).toEqual(["req-3", "req-2"]);
  });

  it("keeps default behavior through the in-memory store adapter", () => {
    const log = new AuditLog({ capacity: 2, store: new InMemoryAuditStore(2) });

    log.record({ requestId: "req-1", method: "GET", path: "/health", statusCode: 200, durationMs: 1 });
    log.record({ requestId: "req-2", method: "GET", path: "/api/v1/audit/summary", statusCode: 200, durationMs: 2 });
    log.record({ requestId: "req-3", method: "GET", path: "/api/v1/sources/status", statusCode: 200, durationMs: 3 });

    expect(log.list().map((event) => event.requestId)).toEqual(["req-3", "req-2"]);
    expect(log.summary()).toMatchObject({
      total: 2,
      success: 2,
      latest: {
        requestId: "req-3",
      },
    });
  });

  it("can persist audit events through the file-backed store prototype", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-audit-store-"));
    const filePath = path.join(directory, "audit.jsonl");

    try {
      const log = new AuditLog({ capacity: 3, store: new FileBackedAuditStore(filePath, 3) });
      log.record({ requestId: "req-1", method: "GET", path: "/health", statusCode: 200, durationMs: 1 });
      log.record({ requestId: "req-2", method: "GET", path: "/api/v1/audit/summary", statusCode: 200, durationMs: 2 });

      const restored = new AuditLog({ capacity: 3, store: new FileBackedAuditStore(filePath, 3) });

      expect(restored.list().map((event) => event.requestId)).toEqual(["req-2", "req-1"]);
      expect(restored.summary()).toMatchObject({
        total: 2,
        success: 2,
      });
      expect(await readFile(filePath, "utf8")).toContain("\"requestId\":\"req-2\"");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});

describe("audit route classification", () => {
  it("maps known paths to stable groups", () => {
    expect(routeGroupForPath("/")).toBe("dashboard");
    expect(routeGroupForPath("/health")).toBe("health");
    expect(routeGroupForPath("/api/v1/order-platform/products")).toBe("order-platform");
    expect(routeGroupForPath("/api/v1/mini-kv/status")).toBe("mini-kv");
    expect(routeGroupForPath("/api/v1/sources/status")).toBe("status");
    expect(routeGroupForPath("/api/v1/events/ops")).toBe("status");
    expect(routeGroupForPath("/api/v1/audit/events?limit=20")).toBe("audit");
  });

  it("classifies outcomes by status code", () => {
    expect(outcomeForStatus(204)).toBe("success");
    expect(outcomeForStatus(404)).toBe("client_error");
    expect(outcomeForStatus(502)).toBe("server_error");
  });
});
