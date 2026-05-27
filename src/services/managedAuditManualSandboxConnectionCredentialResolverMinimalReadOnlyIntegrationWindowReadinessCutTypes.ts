import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-window-readiness-cut.v1";
  readinessState: "minimal-read-only-integration-window-readiness-cut-ready" | "blocked";
  readinessDecision: "ready-for-manual-read-only-integration-window" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: boolean;
  consumesNodeV344DisabledDesignDraftBodyDraftCandidateArchiveVerification: true;
  activeNodeVersion: "Node v345";
  sourceNodeVersion: "Node v344";
  readOnlyIntegrationWindowReadinessCut: true;
  readinessCutOnly: true;
  performsLiveProbeNow: false;
  startsJavaService: false;
  startsMiniKvService: false;
  sendsJavaHttpRequestNow: false;
  opensMiniKvTcpSocketNow: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: boolean;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV344: SourceNodeV344ArchiveVerificationReference;
  readinessCut: MinimalReadOnlyIntegrationWindowReadinessCutRecord;
  javaReadOnlyRequirements: ReadOnlyIntegrationRequirement[];
  miniKvReadOnlyRequirements: ReadOnlyIntegrationRequirement[];
  forbiddenOperations: ForbiddenIntegrationOperation[];
  environmentHandles: ReadOnlyIntegrationEnvironmentHandle[];
  checks: MinimalReadOnlyIntegrationWindowReadinessCutChecks;
  summary: MinimalReadOnlyIntegrationWindowReadinessCutSummary;
  productionBlockers: MinimalReadOnlyIntegrationWindowReadinessCutMessage[];
  warnings: MinimalReadOnlyIntegrationWindowReadinessCutMessage[];
  recommendations: MinimalReadOnlyIntegrationWindowReadinessCutMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationWindowReadinessCutJson: string;
    minimalReadOnlyIntegrationWindowReadinessCutMarkdown: string;
    sourceNodeV344Json: string;
    sourceNodeV344Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface SourceNodeV344ArchiveVerificationReference {
  sourceVersion: "Node v344";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNextDisabledDesignDraftStep: boolean;
  archiveVerificationDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  presentArchiveFileCount: number;
  archiveFileCount: number;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  javaServiceStarted: false;
  miniKvServiceStarted: false;
  automaticUpstreamStart: false;
  miniKvWriteCommandAllowed: false;
}

export interface MinimalReadOnlyIntegrationWindowReadinessCutRecord {
  readinessDigest: string;
  cutMode: "node-v345-minimal-read-only-integration-window-readiness-cut";
  sourceSpan: "Node v344 archive verification plus existing Node upstream clients";
  decision: "ready-for-manual-read-only-integration-window" | "blocked";
  necessityProof: string;
  consumesNodeV344ArchiveVerification: true;
  consumesJavaMiniKvRuntimeNow: false;
  performsLiveProbeNow: false;
  opensNetworkSocketNow: false;
  startsUpstreamServices: false;
  allowsOnlyJavaGetRequests: true;
  allowsOnlyMiniKvReadCommands: true;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  nextNodeVersionSuggested: "Node v346";
}

export interface ReadOnlyIntegrationRequirement {
  project: "java" | "mini-kv";
  kind: "http-endpoint" | "tcp-command";
  name: string;
  methodOrCommand: string;
  handle: string;
  expectedBoundary: string;
  existingNodeSupport: boolean;
  readOnly: true;
  mutatesState: false;
  startsService: false;
}

export interface ForbiddenIntegrationOperation {
  project: "java" | "mini-kv" | "node";
  operation: string;
  blockedReason: string;
}

export interface ReadOnlyIntegrationEnvironmentHandle {
  name: string;
  target: "java" | "mini-kv";
  valueKind: "base-url-handle" | "host-handle" | "port-handle" | "timeout-ms-handle";
  presentInConfig: boolean;
  secretValue: false;
  rawCredentialValue: false;
}

export type MinimalReadOnlyIntegrationWindowReadinessCutChecks = {
  sourceNodeV344Ready: boolean;
  sourceNodeV344KeepsRuntimeAndSideEffectsClosed: boolean;
  existingJavaClientReadEndpointsAvailable: boolean;
  existingMiniKvClientReadCommandsAvailable: boolean;
  environmentHandlesPresent: boolean;
  onlyJavaGetRequestsAllowed: boolean;
  onlyMiniKvReadCommandsAllowed: boolean;
  forbiddenOperationsDocumented: boolean;
  noLiveProbePerformedNow: boolean;
  noUpstreamServiceStarted: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  upstreamProbesStillDisabledForReadinessCut: boolean;
  upstreamActionsStillDisabled: boolean;
  noParallelJavaMiniKvEchoNeeded: boolean;
  readinessCutDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut: boolean;
};

export interface MinimalReadOnlyIntegrationWindowReadinessCutSummary {
  checkCount: number;
  passedCheckCount: number;
  javaRequirementCount: number;
  miniKvRequirementCount: number;
  environmentHandleCount: number;
  forbiddenOperationCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationWindowReadinessCutMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v344"
    | "java-read-only-requirements"
    | "mini-kv-read-only-requirements"
    | "environment-handles"
    | "runtime-boundary"
    | "configuration"
    | "next-step";
  message: string;
}
