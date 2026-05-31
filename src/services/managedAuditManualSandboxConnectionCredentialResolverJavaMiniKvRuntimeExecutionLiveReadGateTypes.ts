import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationTypes.js";

export type RuntimeExecutionLiveReadGateSourceV405 =
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationProfile;

export type RuntimeExecutionLiveReadGateTargetOwner = "java" | "mini-kv";

export interface RuntimeExecutionLiveReadGateServiceTarget {
  owner: RuntimeExecutionLiveReadGateTargetOwner;
  serviceOwner: string | null;
  host: string | null;
  port: number | null;
  method: string | null;
  path: string | null;
  cleanupRule: string | null;
  localLoopbackOnly: boolean;
  getOnly: boolean;
  concretePortAssigned: boolean;
  nodeStartsService: false;
  nodeStopsService: false;
  readOnly: true;
  writeAllowed: false;
  credentialValueRequired: false;
  rawEndpointUrlRequired: false;
  managedAuditConnectionAllowed: false;
  activeShardRoutingAllowed: false;
  readyForNextSmoke: boolean;
}

export interface RuntimeExecutionLiveReadGateRecord {
  gateDigest: string;
  gateMode: "runtime-execution-live-read-gate";
  sourceSpan: "Node v405 canonical approval input value validation + approved e/398/input packet";
  gateDecision: "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke";
  approvalCorrelationId: string | null;
  approvalWindowId: string | null;
  packetId: string | null;
  targetCount: 2;
  readyTargetCount: number;
  packetExecutable: boolean;
  liveReadGateInputValidated: boolean;
  localLoopbackOnly: boolean;
  concreteLoopbackPortsAssigned: boolean;
  serviceOwnersResolved: boolean;
  smokeTargetsGetOnly: boolean;
  cleanupProofRequired: boolean;
  cleanupRuleCount: number;
  operatorOwnsServiceLifecycle: true;
  nodeMayStartServices: false;
  nodeMayStopServices: false;
  nodeMayMutateUpstream: false;
  runtimeSmokeAttempted: false;
  executionAttempted: false;
  managedAuditConnectionOpened: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  activeShardRoutingEnabled: false;
  liveReadGateOpenForNextSmoke: boolean;
  nextNodeVersionSuggested: "Node v407";
}

export interface RuntimeExecutionLiveReadGateChecks {
  sourceNodeV405Ready: boolean;
  sourceNodeV405HasNoBlockers: boolean;
  sourceNodeV405DidNotExecuteRuntime: boolean;
  canonicalInputsStillPresent: boolean;
  canonicalInputsStillValid: boolean;
  approvalCorrelationIdStable: boolean;
  approvalWindowStillValid: boolean;
  runtimePacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  loopbackHostsAreLocal: boolean;
  loopbackPortsConcrete: boolean;
  serviceOwnersDeclared: boolean;
  javaSmokeTargetDeclared: boolean;
  miniKvSmokeTargetDeclared: boolean;
  smokeTargetsGetOnly: boolean;
  javaSmokeTargetHealthGet: boolean;
  miniKvSmokeTargetHealthGet: boolean;
  cleanupProofRequired: boolean;
  cleanupRulesSafe: boolean;
  upstreamProbesApproved: boolean;
  upstreamActionsDisabled: boolean;
  operatorVerified: boolean;
  operatorCleanupAcknowledged: boolean;
  credentialValueReadDenied: boolean;
  rawEndpointParsingDenied: boolean;
  managedAuditConnectionDenied: boolean;
  writeOperationsDenied: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  executionStillNotAttempted: boolean;
  activeShardPrototypeStillDisabled: boolean;
  gateDigestStable: boolean;
  readyForRuntimeExecutionLiveReadGate: boolean;
}

export interface RuntimeExecutionLiveReadGateSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  targetCount: 2;
  readyTargetCount: number;
  cleanupRuleCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  readyForApprovedLocalLoopbackReadOnlySmoke: boolean;
}

export interface RuntimeExecutionLiveReadGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-live-read-gate.v1";
  gateState: "runtime-execution-live-read-gate-ready" | "blocked";
  gateDecision: "accept-approved-local-loopback-get-only-live-read-gate-for-next-smoke" | "blocked";
  readyForRuntimeExecutionLiveReadGate: boolean;
  readyForApprovedLocalLoopbackReadOnlySmoke: boolean;
  readyForRuntimeExecutionPacket: boolean;
  activeNodeVersion: "Node v406";
  sourceNodeVersion: "Node v405";
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  gateOnly: true;
  runtimeGateRequiresSeparateSmokeRun: true;
  runtimeExecutionPacketPresent: boolean;
  runtimeExecutionPacketExecutable: boolean;
  runtimeGateApprovalPresent: boolean;
  concreteLoopbackPortsAssigned: boolean;
  executionAttempted: false;
  runtimeSmokeAttempted: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
  sourceNodeV405: {
    sourceVersion: "Node v405";
    validationState: string;
    validationDecision: string;
    readyForRuntimeExecutionCanonicalApprovalInputValueValidation: boolean;
    readyForRuntimeExecutionPacket: boolean;
    readyForRuntimeLiveReadGate: boolean;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    targetInputCount: number;
    presentTargetInputCount: number;
    validTargetInputCount: number;
  };
  serviceTargets: RuntimeExecutionLiveReadGateServiceTarget[];
  liveReadGate: RuntimeExecutionLiveReadGateRecord;
  checks: RuntimeExecutionLiveReadGateChecks;
  summary: RuntimeExecutionLiveReadGateSummary;
  productionBlockers: RuntimeExecutionLiveReadGateMessage[];
  warnings: RuntimeExecutionLiveReadGateMessage[];
  recommendations: RuntimeExecutionLiveReadGateMessage[];
  evidenceEndpoints: {
    liveReadGateJson: string;
    liveReadGateMarkdown: string;
    sourceNodeV405Json: string;
    sourceNodeV405Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v407";
  };
  nextActions: string[];
}
