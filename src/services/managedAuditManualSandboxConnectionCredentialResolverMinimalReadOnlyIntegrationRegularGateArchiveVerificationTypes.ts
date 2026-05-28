import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateTypes.js";

export interface MinimalReadOnlyIntegrationRegularGateArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalReadOnlyIntegrationRegularGateArchiveReferences {
  archiveRoot: "d/364";
  jsonEvidence: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  markdownEvidence: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  summaryEvidence: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  browserSnapshot: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  htmlArchive: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  screenshot: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  explanation: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  codeWalkthrough: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  sourcePlan: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  plansIndex: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
  archiveIndex: MinimalReadOnlyIntegrationRegularGateArchiveFileReference;
}

export interface SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference {
  sourceVersion: "Node v364";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile["profileVersion"];
  gateState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile["gateState"];
  gateDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile["gateDecision"];
  readyForMinimalReadOnlyIntegrationRegularGate: boolean;
  readyForNodeV365RegularGateArchiveVerification: boolean;
  gateDigest: string;
  sourceTransitionDigest: string;
  sourceArchiveDigest: string;
  sourceNodeVersion: "Node v350";
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  checkCount: number;
  passedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  readOnlyTargetCount: number;
  requiredEnvCount: number;
  requiredHeaderCount: number;
  failureClassificationCount: number;
  artifactExpectationCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  regularGateOnly: true;
  gateDefinitionOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
}

export interface MinimalReadOnlyIntegrationRegularGateArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "minimal-read-only-integration-regular-gate-archive-verification";
  sourceSpan: "Node v364 minimal read-only integration regular gate";
  archiveRoot: "d/364";
  archiveVerificationDecision:
    | "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check"
    | "blocked";
  sourceGateDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesCiOperatorFriendlyCheck: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v366";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export interface MinimalReadOnlyIntegrationRegularGateCiOperatorFriendlyCheck {
  checkDigest: string;
  checkMode: "focused-ci-operator-friendly-regular-gate";
  focusedTestCommand: string;
  groupedTestCommand: string;
  buildCommand: string;
  smokeRoute: string;
  smokeMarkdownRoute: string;
  requiredHeaderCount: number;
  readOnlyTargetCount: number;
  failureClassificationCount: number;
  splitsVerificationIntoFocusedSteps: true;
  avoidsFullTestBatchByDefault: true;
  requiresExplicitReadWindowForActualProbe: true;
  automaticUpstreamStart: false;
  rerunsJavaMiniKvNow: false;
  opensManagedAuditConnection: false;
  readsCredentialValue: false;
  parsesRawEndpointUrl: false;
  invokesRuntimeShell: false;
}

export type MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonGateReadyForV365: boolean;
  jsonSourceV350Ready: boolean;
  jsonRegularGateRecorded: boolean;
  jsonReadOnlyTargetsComplete: boolean;
  jsonSafeEnvComplete: boolean;
  jsonRequiredHeadersComplete: boolean;
  jsonFailureClassificationsComplete: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsGateDecision: boolean;
  markdownRecordsTargetsAndSafeEnv: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsGateAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV365: boolean;
  planIndexReferencesV364AndV365: boolean;
  archiveIndexReferencesV364: boolean;
  routeRecordedInArchive: boolean;
  archiveVerificationDoesNotRerunProbe: boolean;
  ciCheckUsesFocusedCommands: boolean;
  ciCheckDocumentsOperatorHeaders: boolean;
  ciCheckKeepsReadWindowExplicit: boolean;
  ciCheckAvoidsLargeTestBatch: boolean;
  noAutomaticUpstreamStart: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointUrlRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noJavaMiniKvEchoRequired: boolean;
  archiveVerificationDigestStable: boolean;
  ciOperatorCheckDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: boolean;
};

export interface MinimalReadOnlyIntegrationRegularGateArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  readOnlyTargetCount: number;
  requiredEnvCount: number;
  requiredHeaderCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v364"
    | "ci-operator-check"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate-archive-verification.v1";
  archiveVerificationState: "minimal-read-only-integration-regular-gate-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-minimal-read-only-integration-regular-gate-and-ci-operator-check"
    | "blocked";
  readyForMinimalReadOnlyIntegrationRegularGateArchiveVerification: boolean;
  readyForNodeV366ExplicitReadWindowGateExecutionDecision: boolean;
  consumesNodeV364MinimalReadOnlyIntegrationRegularGate: true;
  activeNodeVersion: "Node v365";
  sourceNodeVersion: "Node v364";
  archiveVerificationOnly: true;
  ciOperatorFriendlyCheckIncluded: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: MinimalReadOnlyIntegrationRegularGateArchiveReferences;
  sourceNodeV364: SourceNodeV364MinimalReadOnlyIntegrationRegularGateArchiveReference;
  archiveVerification: MinimalReadOnlyIntegrationRegularGateArchiveVerificationRecord;
  ciOperatorFriendlyCheck: MinimalReadOnlyIntegrationRegularGateCiOperatorFriendlyCheck;
  checks: MinimalReadOnlyIntegrationRegularGateArchiveVerificationChecks;
  summary: MinimalReadOnlyIntegrationRegularGateArchiveVerificationSummary;
  productionBlockers: MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[];
  warnings: MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[];
  recommendations: MinimalReadOnlyIntegrationRegularGateArchiveVerificationMessage[];
  evidenceEndpoints: {
    regularGateArchiveVerificationJson: string;
    regularGateArchiveVerificationMarkdown: string;
    sourceNodeV364Json: string;
    sourceNodeV364Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
