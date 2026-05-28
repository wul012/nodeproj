export interface SandboxHandleReviewPacketGateIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SandboxHandleReviewPacketGateIntakeArchiveReferences {
  archiveRoot: "d/358";
  jsonEvidence: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  markdownEvidence: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  summaryEvidence: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  browserSnapshot: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  htmlArchive: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  screenshot: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  explanation: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  codeWalkthrough: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  sourcePlan: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  plansIndex: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
  archiveIndex: SandboxHandleReviewPacketGateIntakeArchiveFileReference;
}

export interface SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference {
  sourceVersion: "Node v358";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1";
  intakeState: "sandbox-handle-review-packet-gate-non-secret-intake-ready" | "blocked";
  intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate" | "blocked";
  readyForPacketGateIntake: boolean;
  readyForNodeV359ArchiveVerification: boolean;
  intakeDigest: string;
  sourceArchiveVerificationDigest: string;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  packetGateIntakeOnly: true;
  sandboxHandleReviewOnly: true;
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
}

export interface SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verification";
  sourceSpan: "Node v358 sandbox handle review packet/gate non-secret intake";
  archiveRoot: "d/358";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-packet-gate-non-secret-intake"
    | "blocked";
  sourceIntakeDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesPacketInputsGateOutputsAndStopConditions: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v360";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV359Verification: boolean;
  jsonIntakeDecisionValid: boolean;
  packetInputsRecorded: boolean;
  gateOutputsRecorded: boolean;
  stopConditionsRecorded: boolean;
  allChecksPassedInSourceIntake: boolean;
  sourceNodeV357ArchiveEvidenceRecorded: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsPacketGateIntake: boolean;
  markdownRecordsInputOutputStopConditionCounts: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsNonSecretBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV359: boolean;
  planIndexReferencesV358AndV359: boolean;
  archiveIndexReferencesV358: boolean;
  routeRecordedInArchive: boolean;
  verificationDoesNotRerunProbe: boolean;
  noUpstreamServiceStartedByNode: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointUrlRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noJavaMiniKvEchoRequired: boolean;
  archiveVerificationDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: boolean;
};

export interface SandboxHandleReviewPacketGateIntakeArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v358"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake-archive-verification.v1";
  archiveVerificationState: "sandbox-handle-review-packet-gate-non-secret-intake-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-packet-gate-non-secret-intake"
    | "blocked";
  readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: boolean;
  readyForNodeV360SandboxHandleReviewPacketGateDecisionRecord: boolean;
  consumesNodeV358SandboxHandleReviewPacketGateNonSecretIntake: true;
  activeNodeVersion: "Node v359";
  sourceNodeVersion: "Node v358";
  archiveVerificationOnly: true;
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
  archiveReferences: SandboxHandleReviewPacketGateIntakeArchiveReferences;
  sourceNodeV358: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference;
  archiveVerification: SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord;
  checks: SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks;
  summary: SandboxHandleReviewPacketGateIntakeArchiveVerificationSummary;
  productionBlockers: SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[];
  warnings: SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[];
  recommendations: SandboxHandleReviewPacketGateIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPacketGateIntakeArchiveVerificationJson: string;
    sandboxHandleReviewPacketGateIntakeArchiveVerificationMarkdown: string;
    sourceNodeV358Json: string;
    sourceNodeV358Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
