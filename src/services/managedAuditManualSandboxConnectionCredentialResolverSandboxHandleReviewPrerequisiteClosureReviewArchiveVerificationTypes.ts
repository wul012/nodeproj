export interface SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences {
  archiveRoot: "d/362";
  jsonEvidence: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  markdownEvidence: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  summaryEvidence: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  browserSnapshot: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  htmlArchive: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  screenshot: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  explanation: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  codeWalkthrough: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  sourcePlan: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  plansIndex: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
  archiveIndex: SandboxHandleReviewPrerequisiteClosureReviewArchiveFileReference;
}

export interface SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference {
  sourceVersion: "Node v362";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1";
  reviewState: "sandbox-handle-review-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision:
    | "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review"
    | "blocked";
  readyForClosureReview: boolean;
  readyForNodeV363ArchiveVerification: boolean;
  reviewDigest: string;
  sourceArchiveVerificationDigest: string;
  sourceDecisionDigest: string;
  originalClosureItemCount: number;
  completedClosureItemCount: number;
  remainingClosureItemCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  closureReviewOnly: true;
  readOnlyClosureReview: true;
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

export interface SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "sandbox-handle-review-prerequisite-closure-review-archive-verification";
  sourceSpan: "Node v362 sandbox handle review prerequisite closure review";
  archiveRoot: "d/362";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-prerequisite-closure-review"
    | "blocked";
  sourceReviewDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesClosureItemsAndBoundaryControls: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v364";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV363Verification: boolean;
  jsonDecisionValid: boolean;
  closureReviewRecorded: boolean;
  closureItemsRecordedAndClosed: boolean;
  allChecksPassedInSourceClosureReview: boolean;
  sourceNodeV361ArchiveEvidenceRecorded: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsClosureReview: boolean;
  markdownRecordsClosureItemsAndBoundaries: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsClosureAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV363: boolean;
  planIndexReferencesV362AndV363: boolean;
  archiveIndexReferencesV362: boolean;
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
  readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: boolean;
};

export interface SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  originalClosureItemCount: number;
  completedClosureItemCount: number;
  remainingClosureItemCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v362"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review-archive-verification.v1";
  archiveVerificationState: "sandbox-handle-review-prerequisite-closure-review-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-prerequisite-closure-review"
    | "blocked";
  readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: boolean;
  readyForNodeV364MinimalReadOnlyIntegrationRegularGate: boolean;
  consumesNodeV362SandboxHandleReviewPrerequisiteClosureReview: true;
  activeNodeVersion: "Node v363";
  sourceNodeVersion: "Node v362";
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
  archiveReferences: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences;
  sourceNodeV362: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference;
  archiveVerification: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord;
  checks: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks;
  summary: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationSummary;
  productionBlockers: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[];
  warnings: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[];
  recommendations: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationJson: string;
    sandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationMarkdown: string;
    sourceNodeV362Json: string;
    sourceNodeV362Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
