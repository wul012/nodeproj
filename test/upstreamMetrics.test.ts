import { describe, expect, it } from "vitest";

import { summarizeLatency, UpstreamMetricsRegistry } from "../src/clients/upstreamMetrics.js";

describe("upstream metrics registry", () => {
  it("computes nearest-rank latency percentiles", () => {
    const values = Array.from({ length: 100 }, (_value, index) => index + 1);

    expect(summarizeLatency(values)).toEqual({
      count: 100,
      p50: 50,
      p95: 95,
      p99: 99,
      min: 1,
      max: 100,
    });
  });

  it("keeps request/error/timeout counters while bounding the latency window", () => {
    const registry = new UpstreamMetricsRegistry(3);

    registry.record({ client: "order-platform", latencyMs: 10, ok: true, timeout: false });
    registry.record({ client: "order-platform", latencyMs: 20, ok: false, timeout: false });
    registry.record({ client: "order-platform", latencyMs: 30, ok: false, timeout: true });
    registry.record({ client: "order-platform", latencyMs: 40, ok: true, timeout: false });
    registry.record({ client: "order-platform", latencyMs: 50, ok: true, timeout: false });

    const snapshot = registry.snapshot(new Date("2026-06-12T00:00:00.000Z"));

    expect(snapshot.generatedAt).toBe("2026-06-12T00:00:00.000Z");
    expect(snapshot.clients["order-platform"]).toMatchObject({
      requests: 5,
      errors: 2,
      timeouts: 1,
      latencyMs: {
        count: 3,
        p50: 40,
        p95: 50,
        p99: 50,
        min: 30,
        max: 50,
      },
    });
    expect(snapshot.clients["mini-kv"]).toMatchObject({
      requests: 0,
      errors: 0,
      timeouts: 0,
      latencyMs: {
        count: 0,
        p50: null,
        p95: null,
        p99: null,
      },
    });
  });
});
