export interface SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SandboxHandleReviewPacketGateDecisionRecordArchiveReferences {
  archiveRoot: "d/360";
  jsonEvidence: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  markdownEvidence: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  summaryEvidence: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  browserSnapshot: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  htmlArchive: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  screenshot: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  explanation: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  codeWalkthrough: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  sourcePlan: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  plansIndex: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
  archiveIndex: SandboxHandleReviewPacketGateDecisionRecordArchiveFileReference;
}

export interface SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference {
  sourceVersion: "Node v360";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1";
  decisionState: "sandbox-handle-review-packet-gate-decision-record-ready" | "blocked";
  decision: "advance-to-sandbox-handle-review-prerequisite-closure-review" | "blocked";
  readyForDecisionRecord: boolean;
  readyForNodeV361ArchiveVerification: boolean;
  decisionDigest: string;
  sourceArchiveVerificationDigest: string;
  sourceIntakeDigest: string;
  inputCount: number;
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
  decisionRecordOnly: true;
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

export interface SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "sandbox-handle-review-packet-gate-decision-record-archive-verification";
  sourceSpan: "Node v360 sandbox handle review packet/gate decision record";
  archiveRoot: "d/360";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-packet-gate-decision-record"
    | "blocked";
  sourceDecisionDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesDecisionInputsAndBoundaryControls: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v362";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV361Verification: boolean;
  jsonDecisionValid: boolean;
  decisionInputsRecorded: boolean;
  decisionRecordRecorded: boolean;
  allChecksPassedInSourceDecisionRecord: boolean;
  sourceNodeV359ArchiveEvidenceRecorded: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsDecisionRecord: boolean;
  markdownRecordsDecisionInputsAndBoundaries: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsDecisionAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV361: boolean;
  planIndexReferencesV360AndV361: boolean;
  archiveIndexReferencesV360: boolean;
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
  readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: boolean;
};

export interface SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  inputCount: number;
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

export interface SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v360"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record-archive-verification.v1";
  archiveVerificationState: "sandbox-handle-review-packet-gate-decision-record-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-packet-gate-decision-record"
    | "blocked";
  readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: boolean;
  readyForNodeV362SandboxHandleReviewPrerequisiteClosureReview: boolean;
  consumesNodeV360SandboxHandleReviewPacketGateDecisionRecord: true;
  activeNodeVersion: "Node v361";
  sourceNodeVersion: "Node v360";
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
  archiveReferences: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences;
  sourceNodeV360: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference;
  archiveVerification: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord;
  checks: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks;
  summary: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationSummary;
  productionBlockers: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[];
  warnings: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[];
  recommendations: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPacketGateDecisionRecordArchiveVerificationJson: string;
    sandboxHandleReviewPacketGateDecisionRecordArchiveVerificationMarkdown: string;
    sourceNodeV360Json: string;
    sourceNodeV360Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
