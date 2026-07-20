import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import { assessShardPreview } from "./shardPreview/assessment.js";
import { buildShardPreviewProfile } from "./shardPreview/profile.js";
import { readShardPreviewSources } from "./shardPreview/sources.js";
import type {
  ControlledReadOnlyShardPreviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
export type {
  ControlledReadOnlyShardPreviewProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export async function loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ControlledReadOnlyShardPreviewProfile> {
  const reads = await readShardPreviewSources(input);
  const assessment = assessShardPreview(input.config, reads);
  return buildShardPreviewProfile(reads, assessment);
}
