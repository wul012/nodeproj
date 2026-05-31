import type { MiniKvCommandResult } from "../clients/miniKvClient.js";
import type { UpstreamJsonResponse } from "../types.js";

export interface RuntimeExecutionApprovedLocalLoopbackSmokeTarget {
  id: "java-health" | "mini-kv-health";
  owner: "java" | "mini-kv";
  protocol: "http" | "tcp-inline";
  methodOrCommand: "GET" | "HEALTH";
  target: string;
  readOnly: true;
  mutatesState: false;
}

export type RuntimeExecutionApprovedLocalLoopbackSmokeStatus =
  | "passed-read"
  | "failed-read"
  | "skipped-closed-window";

export interface RuntimeExecutionApprovedLocalLoopbackSmokeRecord {
  id: RuntimeExecutionApprovedLocalLoopbackSmokeTarget["id"];
  owner: RuntimeExecutionApprovedLocalLoopbackSmokeTarget["owner"];
  protocol: RuntimeExecutionApprovedLocalLoopbackSmokeTarget["protocol"];
  methodOrCommand: RuntimeExecutionApprovedLocalLoopbackSmokeTarget["methodOrCommand"];
  target: string;
  status: RuntimeExecutionApprovedLocalLoopbackSmokeStatus;
  attempted: boolean;
  readOnly: true;
  mutatesState: false;
  latencyMs?: number;
  statusCode?: number;
  failureClass: "none" | "closed-window" | "unavailable" | "timeout" | "unexpected-response";
  message: string;
  evidenceSummary?: Record<string, unknown>;
}

export interface RuntimeExecutionApprovedLocalLoopbackSmokeSession {
  smokeDigest: string;
  smokeMode: "approved-local-loopback-read-only-smoke";
  sourceSpan: "Node v406 live-read gate + approved local Java/mini-kv loopback services";
  approvalCorrelationId: string | null;
  targetCount: 2;
  attemptedTargetCount: number;
  passedTargetCount: number;
  failedTargetCount: number;
  skippedTargetCount: number;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
  localLoopbackOnly: true;
  readOnly: true;
  mutatesUpstreamState: false;
  startsJavaServiceFromRoute: false;
  startsMiniKvServiceFromRoute: false;
  stopsJavaServiceFromRoute: false;
  stopsMiniKvServiceFromRoute: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  activeShardRoutingEnabled: false;
  cleanupProofRequired: true;
  cleanupProofExpectedInArchive: true;
  nextNodeVersionSuggested: "Node v408";
}

export interface RuntimeExecutionApprovedLocalLoopbackSmokeChecks {
  sourceNodeV406Ready: boolean;
  sourceNodeV406HasNoBlockers: boolean;
  upstreamProbesEnabled: boolean;
  upstreamActionsDisabled: boolean;
  targetsAreLocalLoopback: boolean;
  targetsGetOnlyOrHealthOnly: boolean;
  javaHealthAttempted: boolean;
  miniKvHealthAttempted: boolean;
  javaHealthPassed: boolean;
  miniKvHealthPassed: boolean;
  allAttemptedTargetsPassed: boolean;
  noWriteTargets: boolean;
  noAutomaticUpstreamStartStopFromRoute: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  activeShardPrototypeStillDisabled: boolean;
  cleanupProofRequired: boolean;
  smokeDigestStable: boolean;
  readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: boolean;
}

export interface RuntimeExecutionApprovedLocalLoopbackSmokeSummary {
  checkCount: number;
  passedCheckCount: number;
  targetCount: 2;
  attemptedTargetCount: number;
  passedTargetCount: number;
  failedTargetCount: number;
  skippedTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionApprovedLocalLoopbackSmokeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface RuntimeExecutionApprovedLocalLoopbackOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse>;
}

export interface RuntimeExecutionApprovedLocalLoopbackMiniKvClient {
  health(): Promise<MiniKvCommandResult>;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approved-local-loopback-read-only-smoke.v1";
  smokeState: "approved-local-loopback-read-only-smoke-passed" | "failed" | "skipped-closed-window";
  smokeDecision: "accept-read-only-smoke-pass-evidence" | "blocked" | "skipped";
  readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: boolean;
  readyForRuntimeExecutionPassEvidenceArchive: boolean;
  activeNodeVersion: "Node v407";
  sourceNodeVersion: "Node v406";
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  smokeOnly: true;
  readOnly: true;
  executionAllowed: false;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
  startsJavaServiceFromRoute: false;
  startsMiniKvServiceFromRoute: false;
  stopsJavaServiceFromRoute: false;
  stopsMiniKvServiceFromRoute: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  activeShardPrototypeEnabled: false;
  sourceNodeV406: {
    sourceVersion: "Node v406";
    gateState: string;
    gateDecision: string;
    readyForRuntimeExecutionLiveReadGate: boolean;
    readyForApprovedLocalLoopbackReadOnlySmoke: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    targetCount: number;
    readyTargetCount: number;
  };
  targets: RuntimeExecutionApprovedLocalLoopbackSmokeTarget[];
  records: RuntimeExecutionApprovedLocalLoopbackSmokeRecord[];
  smokeSession: RuntimeExecutionApprovedLocalLoopbackSmokeSession;
  checks: RuntimeExecutionApprovedLocalLoopbackSmokeChecks;
  summary: RuntimeExecutionApprovedLocalLoopbackSmokeSummary;
  productionBlockers: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[];
  warnings: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[];
  recommendations: RuntimeExecutionApprovedLocalLoopbackSmokeMessage[];
  evidenceEndpoints: {
    approvedLocalLoopbackSmokeJson: string;
    approvedLocalLoopbackSmokeMarkdown: string;
    sourceNodeV406Json: string;
    sourceNodeV406Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v408";
  };
  nextActions: string[];
}
