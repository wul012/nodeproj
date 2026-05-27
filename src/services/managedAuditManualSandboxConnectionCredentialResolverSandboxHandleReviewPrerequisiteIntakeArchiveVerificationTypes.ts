export interface SandboxHandleReviewPrerequisiteIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SandboxHandleReviewPrerequisiteIntakeArchiveReferences {
  archiveRoot: "d/354";
  jsonEvidence: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  markdownEvidence: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  summaryEvidence: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  browserSnapshot: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  htmlArchive: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  screenshot: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  explanation: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  codeWalkthrough: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  sourcePlan: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  plansIndex: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
  archiveIndex: SandboxHandleReviewPrerequisiteIntakeArchiveFileReference;
}

export interface SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference {
  sourceVersion: "Node v354";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1";
  intakeState: "sandbox-handle-review-prerequisite-intake-ready" | "blocked";
  intakeDecision:
    | "define-non-secret-sandbox-handle-review-prerequisites"
    | "blocked";
  readyForIntake: boolean;
  readyForNodeV355ArchiveVerification: boolean;
  intakeDigest: string;
  sourceDecisionDigest: string;
  prerequisiteInputCount: number;
  closedScopeCount: number;
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  prerequisiteIntakeOnly: boolean;
  sandboxHandleReviewOnly: boolean;
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

export interface SandboxHandleReviewPrerequisiteIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "sandbox-handle-review-prerequisite-intake-archive-verification";
  sourceSpan: "Node v354 sandbox handle review prerequisite intake";
  archiveRoot: "d/354";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-prerequisite-intake"
    | "blocked";
  sourceIntakeDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v356";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV355Verification: boolean;
  jsonIntakeDecisionValid: boolean;
  prerequisiteInputsRecorded: boolean;
  closedScopesRecorded: boolean;
  allChecksPassedInSourceIntake: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsPrerequisiteIntake: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsPrerequisiteBoundary: boolean;
  codeWalkthroughPresent: boolean;
  planIndexReferencesV354AndV355: boolean;
  archiveIndexReferencesV354: boolean;
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
  readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: boolean;
};

export interface SandboxHandleReviewPrerequisiteIntakeArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  prerequisiteInputCount: number;
  closedScopeCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v354"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification.v1";
  archiveVerificationState: "sandbox-handle-review-prerequisite-intake-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-prerequisite-intake"
    | "blocked";
  readyForSandboxHandleReviewPrerequisiteIntakeArchiveVerification: boolean;
  readyForNodeV356SandboxHandleReviewContractDecision: boolean;
  consumesNodeV354SandboxHandleReviewPrerequisiteIntake: true;
  activeNodeVersion: "Node v355";
  sourceNodeVersion: "Node v354";
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
  archiveReferences: SandboxHandleReviewPrerequisiteIntakeArchiveReferences;
  sourceNodeV354: SourceNodeV354SandboxHandleReviewPrerequisiteIntakeArchiveReference;
  archiveVerification: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationRecord;
  checks: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationChecks;
  summary: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationSummary;
  productionBlockers: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[];
  warnings: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[];
  recommendations: SandboxHandleReviewPrerequisiteIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPrerequisiteIntakeArchiveVerificationJson: string;
    sandboxHandleReviewPrerequisiteIntakeArchiveVerificationMarkdown: string;
    sourceNodeV354Json: string;
    sourceNodeV354Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
