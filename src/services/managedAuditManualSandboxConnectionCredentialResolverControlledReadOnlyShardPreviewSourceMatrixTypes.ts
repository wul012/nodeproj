export type PreviewProject = "advanced-order-platform" | "mini-kv";
export type PreviewStatus = "passed-read" | "failed-read" | "skipped-probes-disabled";
export type PreviewTransport = "http-json" | "tcp-command";
export type ControlledReadOnlyShardPreviewSource = "java" | "miniKv";

export interface ControlledReadOnlyShardPreviewObservationPreview {
  version: string | null;
  releaseVersion: string | null;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  status: string | null;
  shardMapCount: number | null;
  keyRoutingSampleCount: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixEntry {
  source: ControlledReadOnlyShardPreviewSource;
  project: PreviewProject;
  version: string | null;
  releaseVersion: string | null;
  status: PreviewStatus;
  readyForPreview: boolean;
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  endpoint: string;
  command: string | null;
  latencyMs: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrix {
  sources: ControlledReadOnlyShardPreviewSourceMatrixEntry[];
  sourceCount: number;
  readySourceCount: number;
  failedSourceCount: number;
  skippedSourceCount: number;
  routingModes: string[];
  shardCountDelta: number | null;
  slotCountDelta: number | null;
  shardCountsComparable: boolean;
  slotCountsComparable: boolean;
  allSourcesReady: boolean;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumerGates {
  observedRequiredSources: boolean;
  allSourcesReady: boolean;
  shardCountsComparable: boolean;
  slotCountsComparable: boolean;
  routingModesDeclared: boolean;
  readOnlyConsumerOnly: true;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumerComparison {
  routingModes: string[];
  routingModeCount: number;
  javaShardCount: number | null;
  miniKvShardCount: number | null;
  shardCountDelta: number | null;
  javaSlotCount: number | null;
  miniKvSlotCount: number | null;
  slotCountDelta: number | null;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixConsumer {
  consumerVersion: "Node v599";
  inputSourceVersion: "Node v598";
  decision: "ready-for-controlled-read-only-consumption" | "blocked";
  readyForControlledReadOnlyConsumption: boolean;
  requiredSources: ControlledReadOnlyShardPreviewSource[];
  observedSources: ControlledReadOnlyShardPreviewSource[];
  missingSources: ControlledReadOnlyShardPreviewSource[];
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewSourceMatrixConsumerGates;
  comparison: ControlledReadOnlyShardPreviewSourceMatrixConsumerComparison;
  blockedReasonCodes: string[];
  activatesRouting: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export type ControlledReadOnlyShardPreviewSourceMatrixDriftDimension =
  "consumerReadiness" | "routingMode" | "shardCount" | "slotCount";

export interface ControlledReadOnlyShardPreviewSourceMatrixDriftFinding {
  dimension: ControlledReadOnlyShardPreviewSourceMatrixDriftDimension;
  status: "aligned" | "drift-detected" | "not-comparable" | "blocked";
  severity: "info" | "warning" | "blocker";
  javaValue: string | number | null;
  miniKvValue: string | number | null;
  message: string;
}

export interface ControlledReadOnlyShardPreviewSourceMatrixDriftSummary {
  summaryVersion: "Node v600";
  inputConsumerVersion: "Node v599";
  driftState: "aligned" | "controlled-drift-detected" | "blocked";
  readyForControlledDriftReview: boolean;
  findingCount: number;
  driftFindingCount: number;
  blockingFindingCount: number;
  comparableFindingCount: number;
  findings: ControlledReadOnlyShardPreviewSourceMatrixDriftFinding[];
  requiresRoutingActivation: false;
  requiresFreshSiblingEvidence: false;
  startsServices: false;
  mutatesSiblingState: false;
}
