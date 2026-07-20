import type { MiniKvClient } from "../../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../../clients/orderPlatformClient.js";
import type { AppConfig } from "../../config.js";
import {
  assessObservation,
  failedObservation,
  JAVA_ENDPOINT,
  MINI_KV_COMMAND,
  skippedObservation,
} from "../managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.js";
import type {
  ControlledReadOnlyShardPreviewObservation,
  ControlledReadOnlyShardPreviewReads,
} from "../managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export interface ShardPreviewSourceDeps {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}

export async function readShardPreviewSources(
  input: ShardPreviewSourceDeps,
): Promise<ControlledReadOnlyShardPreviewReads> {
  const [java, miniKv] = await Promise.all([
    readJavaPreview(input.config, input.orderPlatform),
    readMiniKvPreview(input.config, input.miniKv),
  ]);
  return { java, miniKv };
}

async function readJavaPreview(
  config: AppConfig,
  orderPlatform: OrderPlatformClient,
): Promise<ControlledReadOnlyShardPreviewObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null);
  }

  try {
    const response = await orderPlatform.shardReadiness();
    return assessObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null, response.statusCode,
      response.latencyMs, response.data);
  } catch (error) {
    return failedObservation("advanced-order-platform", "http-json", JAVA_ENDPOINT, null, error);
  }
}

async function readMiniKvPreview(
  config: AppConfig,
  miniKv: MiniKvClient,
): Promise<ControlledReadOnlyShardPreviewObservation> {
  if (!config.upstreamProbesEnabled) {
    return skippedObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND);
  }

  try {
    const response = await miniKv.shardJson();
    return assessObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND, null,
      response.latencyMs, response.readiness);
  } catch (error) {
    return failedObservation("mini-kv", "tcp-command", "127.0.0.1 mini-kv TCP", MINI_KV_COMMAND, error);
  }
}
