import { sha256StableJson } from "./liveProbeReportUtils.js";

// Design: this helper owns readiness and digest mechanics only.
// Domain builders retain digest fields and response assembly.
export interface ShardArtifactState {
  ready: boolean;
  digest: string;
}

export function resolveShardArtifactState(
  blockedReasons: readonly unknown[],
  digestInput: object,
): ShardArtifactState {
  return {
    ready: blockedReasons.length === 0,
    digest: sha256StableJson(digestInput),
  };
}
