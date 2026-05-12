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
    expect(config.upstreamActionsEnabled).toBe(false);
    expect(config.mutationRateLimitWindowMs).toBe(60000);
    expect(config.mutationRateLimitMax).toBe(30);
    expect(config.javaExecutionContractFixturePath).toContain("failed-event-replay-execution-contract-approved.sample.json");
    expect(config.miniKvCheckJsonFixturePath).toContain("set-orderops-write-contract.json");
  });

  it("normalizes numeric values and strips the order URL slash", () => {
    const config = loadConfig({
      PORT: "4200",
      ORDER_PLATFORM_URL: "http://localhost:8080/",
      MINIKV_PORT: "6380",
      OPS_SAMPLE_INTERVAL_MS: "1500",
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "on",
      MUTATION_RATE_LIMIT_WINDOW_MS: "30000",
      MUTATION_RATE_LIMIT_MAX: "4",
      JAVA_EXECUTION_CONTRACT_FIXTURE_PATH: "D:\\fixtures\\java.json",
      MINIKV_CHECKJSON_FIXTURE_PATH: "D:\\fixtures\\minikv.json",
    });

    expect(config.port).toBe(4200);
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6380);
    expect(config.opsSampleIntervalMs).toBe(1500);
    expect(config.upstreamProbesEnabled).toBe(true);
    expect(config.upstreamActionsEnabled).toBe(true);
    expect(config.mutationRateLimitWindowMs).toBe(30000);
    expect(config.mutationRateLimitMax).toBe(4);
    expect(config.javaExecutionContractFixturePath).toBe("D:\\fixtures\\java.json");
    expect(config.miniKvCheckJsonFixturePath).toBe("D:\\fixtures\\minikv.json");
  });

  it("parses boolean-style upstream probe flags", () => {
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "1" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "yes" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "off" }).upstreamProbesEnabled).toBe(false);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "not-a-bool" }).upstreamProbesEnabled).toBe(false);
  });

  it("parses boolean-style upstream action flags", () => {
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }).upstreamActionsEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "on" }).upstreamActionsEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "0" }).upstreamActionsEnabled).toBe(false);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "not-a-bool" }).upstreamActionsEnabled).toBe(false);
  });
});
