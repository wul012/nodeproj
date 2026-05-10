import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("uses stable local defaults", () => {
    const config = loadConfig({});

    expect(config.port).toBe(4100);
    expect(config.host).toBe("127.0.0.1");
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6379);
    expect(config.upstreamProbesEnabled).toBe(false);
  });

  it("normalizes numeric values and strips the order URL slash", () => {
    const config = loadConfig({
      PORT: "4200",
      ORDER_PLATFORM_URL: "http://localhost:8080/",
      MINIKV_PORT: "6380",
      OPS_SAMPLE_INTERVAL_MS: "1500",
      UPSTREAM_PROBES_ENABLED: "true",
    });

    expect(config.port).toBe(4200);
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6380);
    expect(config.opsSampleIntervalMs).toBe(1500);
    expect(config.upstreamProbesEnabled).toBe(true);
  });

  it("parses boolean-style upstream probe flags", () => {
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "1" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "yes" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "off" }).upstreamProbesEnabled).toBe(false);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "not-a-bool" }).upstreamProbesEnabled).toBe(false);
  });
});
