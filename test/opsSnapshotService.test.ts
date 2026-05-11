import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { OpsSnapshotService } from "../src/services/opsSnapshotService.js";

describe("OpsSnapshotService", () => {
  it("does not touch upstream clients when probes are disabled", async () => {
    const orderPlatform = new OrderPlatformClient("http://127.0.0.1:1", 1);
    const miniKv = new MiniKvClient("127.0.0.1", 1, 1);
    const service = new OpsSnapshotService(orderPlatform, miniKv, false);

    const snapshot = await service.sample();

    expect(snapshot.node.state).toBe("online");
    expect(snapshot.javaOrderPlatform.state).toBe("disabled");
    expect(snapshot.javaOrderPlatform.message).toContain("UPSTREAM_PROBES_ENABLED=false");
    expect(snapshot.miniKv.state).toBe("disabled");
    expect(snapshot.miniKv.message).toContain("UPSTREAM_PROBES_ENABLED=false");
  });

  it("uses mini-kv HEALTH, STATSJSON, INFOJSON, COMMANDSJSON, and KEYSJSON when probes are enabled", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => ({
        statusCode: 200,
        latencyMs: 6,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          application: { name: "advanced-order-platform", profiles: ["default"], uptimeSeconds: 12 },
          orders: { total: 2 },
          inventory: { items: 3 },
          outbox: { pending: 1 },
          failedEvents: { total: 0, pendingReplayApprovals: 0, latestFailedAt: null },
        },
      }),
      failedEventsSummary: async () => ({
        statusCode: 200,
        latencyMs: 8,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          totalFailedEvents: 0,
          pendingReplayApprovals: 0,
          approvedReplayApprovals: 0,
          rejectedReplayApprovals: 0,
          latestFailedAt: null,
          latestApprovalAt: null,
          replayBacklog: 0,
        },
      }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=2 wal_enabled=yes", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":2,"wal_enabled":true}',
        latencyMs: 7,
        stats: { live_keys: 2, wal_enabled: true },
      }),
      infoJson: async () => ({
        command: "INFOJSON",
        response: '{"version":"0.45.0","server":{"protocol":["inline","resp"],"uptime_seconds":9,"max_request_bytes":4096},"store":{"live_keys":2},"wal":{"enabled":true},"metrics":{"enabled":true}}',
        latencyMs: 9,
        info: {
          version: "0.45.0",
          server: { protocol: ["inline", "resp"], uptime_seconds: 9, max_request_bytes: 4096 },
          store: { live_keys: 2 },
          wal: { enabled: true },
          metrics: { enabled: true },
        },
      }),
      commandsJson: async () => ({
        command: "COMMANDSJSON",
        response: '{"commands":[{"name":"GET","category":"read","mutates_store":false,"touches_wal":false,"stable":true},{"name":"SET","category":"write","mutates_store":true,"touches_wal":true,"stable":true},{"name":"COMPACT","category":"admin","mutates_store":false,"touches_wal":true,"stable":true}]}',
        latencyMs: 11,
        catalog: {
          commands: [
            { name: "GET", category: "read", mutates_store: false, touches_wal: false, stable: true },
            { name: "SET", category: "write", mutates_store: true, touches_wal: true, stable: true },
            { name: "COMPACT", category: "admin", mutates_store: false, touches_wal: true, stable: true },
          ],
        },
      }),
      keysJson: async () => ({
        command: "KEYSJSON",
        response: '{"prefix":null,"key_count":2,"keys":["orderops:1","orderops:2"],"truncated":false,"limit":1000}',
        latencyMs: 13,
        inventory: {
          prefix: null,
          key_count: 2,
          keys: ["orderops:1", "orderops:2"],
          truncated: false,
          limit: 1000,
        },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.javaOrderPlatform.state).toBe("online");
    expect(snapshot.javaOrderPlatform.message).toContain("orders=2");
    expect(snapshot.javaOrderPlatform.message).toContain("failed_summary=available");
    expect(snapshot.javaOrderPlatform.details).toMatchObject({
      opsOverview: {
        status: "available",
        data: {
          orders: {
            total: 2,
          },
        },
      },
      failedEventSummary: {
        status: "available",
        data: {
          replayBacklog: 0,
        },
      },
    });
    expect(snapshot.miniKv.state).toBe("online");
    expect(snapshot.miniKv.latencyMs).toBe(13);
    expect(snapshot.miniKv.message).toContain("health=OK live_keys=2");
    expect(snapshot.miniKv.message).toContain("wal_enabled=true");
    expect(snapshot.miniKv.message).toContain("infojson=available");
    expect(snapshot.miniKv.message).toContain("version=0.45.0");
    expect(snapshot.miniKv.message).toContain("command_catalog=available");
    expect(snapshot.miniKv.message).toContain("write_commands=1");
    expect(snapshot.miniKv.message).toContain("key_inventory=available");
    expect(snapshot.miniKv.message).toContain("key_count=2");
    expect(snapshot.miniKv.details).toMatchObject({
      statsJson: {
        stats: {
          live_keys: 2,
          wal_enabled: true,
        },
      },
      infoJson: {
        status: "available",
        info: {
          version: "0.45.0",
        },
      },
      commandCatalog: {
        status: "available",
      },
      keyInventory: {
        status: "available",
        inventory: {
          key_count: 2,
          truncated: false,
        },
      },
    });
    expect((snapshot.miniKv.details as { commandCatalog?: { catalog?: { commands?: unknown[] } } }).commandCatalog?.catalog?.commands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "GET",
        }),
      ]),
    );
  });

  it("keeps Java probe usable when the business overview is unavailable", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => {
        throw new Error("not found");
      },
      failedEventsSummary: async () => ({
        statusCode: 200,
        latencyMs: 6,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          totalFailedEvents: 1,
          pendingReplayApprovals: 0,
          approvedReplayApprovals: 0,
          rejectedReplayApprovals: 0,
          latestFailedAt: "2026-05-11T00:00:00.000Z",
          latestApprovalAt: null,
          replayBacklog: 1,
        },
      }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=0 wal_enabled=no", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":0,"wal_enabled":false}',
        latencyMs: 7,
        stats: { live_keys: 0, wal_enabled: false },
      }),
      infoJson: async () => ({
        command: "INFOJSON",
        response: '{"version":"0.45.0","server":{"protocol":["inline"],"uptime_seconds":1,"max_request_bytes":0},"store":{"live_keys":0},"wal":{"enabled":false},"metrics":{"enabled":false}}',
        latencyMs: 8,
        info: {
          version: "0.45.0",
          server: { protocol: ["inline"], uptime_seconds: 1, max_request_bytes: 0 },
          store: { live_keys: 0 },
          wal: { enabled: false },
          metrics: { enabled: false },
        },
      }),
      commandsJson: async () => ({
        command: "COMMANDSJSON",
        response: '{"commands":[]}',
        latencyMs: 9,
        catalog: { commands: [] },
      }),
      keysJson: async () => ({
        command: "KEYSJSON",
        response: '{"prefix":null,"key_count":0,"keys":[],"truncated":false,"limit":1000}',
        latencyMs: 10,
        inventory: { prefix: null, key_count: 0, keys: [], truncated: false, limit: 1000 },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.javaOrderPlatform.state).toBe("degraded");
    expect(snapshot.javaOrderPlatform.message).toContain("ops_overview=unavailable");
    expect(snapshot.javaOrderPlatform.details).toMatchObject({
      opsOverview: {
        status: "unavailable",
        message: "not found",
      },
    });
  });

  it("keeps mini-kv probe usable when INFOJSON is unavailable", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => ({
        statusCode: 200,
        latencyMs: 6,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          orders: { total: 0 },
          outbox: { pending: 0 },
          failedEvents: { total: 0 },
        },
      }),
      failedEventsSummary: async () => ({
        statusCode: 200,
        latencyMs: 8,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          totalFailedEvents: 0,
          pendingReplayApprovals: 0,
          approvedReplayApprovals: 0,
          rejectedReplayApprovals: 0,
          latestFailedAt: null,
          latestApprovalAt: null,
          replayBacklog: 0,
        },
      }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=1 wal_enabled=no", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":1,"wal_enabled":false}',
        latencyMs: 7,
        stats: { live_keys: 1, wal_enabled: false },
      }),
      infoJson: async () => {
        throw new Error("ERR unknown command");
      },
      commandsJson: async () => ({
        command: "COMMANDSJSON",
        response: '{"commands":[]}',
        latencyMs: 8,
        catalog: { commands: [] },
      }),
      keysJson: async () => ({
        command: "KEYSJSON",
        response: '{"prefix":null,"key_count":1,"keys":["orderops:1"],"truncated":false,"limit":1000}',
        latencyMs: 9,
        inventory: { prefix: null, key_count: 1, keys: ["orderops:1"], truncated: false, limit: 1000 },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.miniKv.state).toBe("degraded");
    expect(snapshot.miniKv.message).toContain("infojson=unavailable");
    expect(snapshot.miniKv.details).toMatchObject({
      infoJson: {
        status: "unavailable",
        message: "ERR unknown command",
      },
    });
  });

  it("keeps mini-kv probe usable when COMMANDSJSON is unavailable", async () => {
    const orderPlatform = {
      health: async () => ({
        statusCode: 200,
        latencyMs: 4,
        data: { status: "UP" },
      }),
      opsOverview: async () => ({
        statusCode: 200,
        latencyMs: 6,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          orders: { total: 0 },
          outbox: { pending: 0 },
          failedEvents: { total: 0 },
        },
      }),
      failedEventsSummary: async () => ({
        statusCode: 200,
        latencyMs: 8,
        data: {
          sampledAt: "2026-05-11T00:00:00.000Z",
          totalFailedEvents: 0,
          pendingReplayApprovals: 0,
          approvedReplayApprovals: 0,
          rejectedReplayApprovals: 0,
          latestFailedAt: null,
          latestApprovalAt: null,
          replayBacklog: 0,
        },
      }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=1 wal_enabled=no", latencyMs: 5 }),
      statsJson: async () => ({
        command: "STATSJSON",
        response: '{"live_keys":1,"wal_enabled":false}',
        latencyMs: 7,
        stats: { live_keys: 1, wal_enabled: false },
      }),
      infoJson: async () => ({
        command: "INFOJSON",
        response: '{"version":"0.46.0","server":{"protocol":["inline"],"uptime_seconds":1,"max_request_bytes":0},"store":{"live_keys":1},"wal":{"enabled":false},"metrics":{"enabled":false}}',
        latencyMs: 8,
        info: {
          version: "0.46.0",
          server: { protocol: ["inline"], uptime_seconds: 1, max_request_bytes: 0 },
          store: { live_keys: 1 },
          wal: { enabled: false },
          metrics: { enabled: false },
        },
      }),
      commandsJson: async () => {
        throw new Error("ERR unknown command");
      },
      keysJson: async () => ({
        command: "KEYSJSON",
        response: '{"prefix":null,"key_count":1,"keys":["orderops:1"],"truncated":false,"limit":1000}',
        latencyMs: 9,
        inventory: { prefix: null, key_count: 1, keys: ["orderops:1"], truncated: false, limit: 1000 },
      }),
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.miniKv.state).toBe("degraded");
    expect(snapshot.miniKv.message).toContain("command_catalog=unavailable");
    expect(snapshot.miniKv.details).toMatchObject({
      commandCatalog: {
        status: "unavailable",
        message: "ERR unknown command",
      },
    });
  });

  it("keeps mini-kv probe usable when KEYSJSON is unavailable", async () => {
    const orderPlatform = {
      health: async () => ({ statusCode: 200, latencyMs: 4, data: { status: "UP" } }),
      opsOverview: async () => ({ statusCode: 200, latencyMs: 6, data: { sampledAt: "2026-05-11T00:00:00.000Z", orders: { total: 0 }, outbox: { pending: 0 }, failedEvents: { total: 0 } } }),
      failedEventsSummary: async () => ({ statusCode: 200, latencyMs: 8, data: { sampledAt: "2026-05-11T00:00:00.000Z", totalFailedEvents: 0, pendingReplayApprovals: 0, approvedReplayApprovals: 0, rejectedReplayApprovals: 0, latestFailedAt: null, latestApprovalAt: null, replayBacklog: 0 } }),
    } as unknown as OrderPlatformClient;
    const miniKv = {
      ping: async () => ({ command: "PING orderops", response: "orderops", latencyMs: 3 }),
      health: async () => ({ command: "HEALTH", response: "OK live_keys=1 wal_enabled=no", latencyMs: 5 }),
      statsJson: async () => ({ command: "STATSJSON", response: '{"live_keys":1,"wal_enabled":false}', latencyMs: 7, stats: { live_keys: 1, wal_enabled: false } }),
      infoJson: async () => ({ command: "INFOJSON", response: '{"version":"0.47.0","server":{"protocol":["inline"],"uptime_seconds":1,"max_request_bytes":0},"store":{"live_keys":1},"wal":{"enabled":false},"metrics":{"enabled":false}}', latencyMs: 8, info: { version: "0.47.0", server: { protocol: ["inline"], uptime_seconds: 1, max_request_bytes: 0 }, store: { live_keys: 1 }, wal: { enabled: false }, metrics: { enabled: false } } }),
      commandsJson: async () => ({ command: "COMMANDSJSON", response: '{"commands":[{"name":"KEYSJSON","category":"read","mutates_store":false,"touches_wal":false,"stable":true}]}', latencyMs: 9, catalog: { commands: [{ name: "KEYSJSON", category: "read", mutates_store: false, touches_wal: false, stable: true }] } }),
      keysJson: async () => {
        throw new Error("ERR unknown command");
      },
    } as unknown as MiniKvClient;
    const service = new OpsSnapshotService(orderPlatform, miniKv, true);

    const snapshot = await service.sample();

    expect(snapshot.miniKv.state).toBe("degraded");
    expect(snapshot.miniKv.message).toContain("key_inventory=unavailable");
    expect(snapshot.miniKv.details).toMatchObject({
      keyInventory: {
        status: "unavailable",
        message: "ERR unknown command",
      },
    });
  });
});
