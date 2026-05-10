import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("uses stable local defaults", () => {
    const config = loadConfig({});

    expect(config.port).toBe(4100);
    expect(config.host).toBe("127.0.0.1");
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6379);
  });

  it("normalizes numeric values and strips the order URL slash", () => {
    const config = loadConfig({
      PORT: "4200",
      ORDER_PLATFORM_URL: "http://localhost:8080/",
      MINIKV_PORT: "6380",
      OPS_SAMPLE_INTERVAL_MS: "1500",
    });

    expect(config.port).toBe(4200);
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6380);
    expect(config.opsSampleIntervalMs).toBe(1500);
  });
});
