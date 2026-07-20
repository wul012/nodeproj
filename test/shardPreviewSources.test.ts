import { describe, expect, it } from "vitest";

import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { readShardPreviewSources } from "../src/services/shardPreview/sources.js";
import { loadTestConfig } from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("shard preview sources", () => {
  it("maps concurrent Java and mini-kv failures to fail-closed observations", async () => {
    const reads = await readShardPreviewSources({
      config: loadTestConfig(),
      orderPlatform: {
        shardReadiness: async () => {
          throw new Error("java preview unavailable");
        },
      } as OrderPlatformClient,
      miniKv: {
        shardJson: async () => {
          throw new Error("mini-kv preview unavailable");
        },
      } as MiniKvClient,
    });

    expect(reads).toMatchObject({
      java: {
        attempted: true,
        status: "failed-read",
        endpoint: "GET /api/v1/ops/shard-readiness",
        command: null,
        errorCode: "SHARD_PREVIEW_READ_FAILED",
        errorMessage: "java preview unavailable",
        readyForPreview: false,
      },
      miniKv: {
        attempted: true,
        status: "failed-read",
        endpoint: "127.0.0.1 mini-kv TCP",
        command: "SHARDJSON",
        errorCode: "SHARD_PREVIEW_READ_FAILED",
        errorMessage: "mini-kv preview unavailable",
        readyForPreview: false,
      },
    });
  });
});
