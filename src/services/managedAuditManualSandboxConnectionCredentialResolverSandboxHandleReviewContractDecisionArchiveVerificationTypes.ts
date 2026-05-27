export interface SandboxHandleReviewContractDecisionArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SandboxHandleReviewContractDecisionArchiveReferences {
  archiveRoot: "d/356";
  jsonEvidence: SandboxHandleReviewContractDecisionArchiveFileReference;
  markdownEvidence: SandboxHandleReviewContractDecisionArchiveFileReference;
  summaryEvidence: SandboxHandleReviewContractDecisionArchiveFileReference;
  browserSnapshot: SandboxHandleReviewContractDecisionArchiveFileReference;
  htmlArchive: SandboxHandleReviewContractDecisionArchiveFileReference;
  screenshot: SandboxHandleReviewContractDecisionArchiveFileReference;
  explanation: SandboxHandleReviewContractDecisionArchiveFileReference;
  codeWalkthrough: SandboxHandleReviewContractDecisionArchiveFileReference;
  sourcePlan: SandboxHandleReviewContractDecisionArchiveFileReference;
  plansIndex: SandboxHandleReviewContractDecisionArchiveFileReference;
  archiveIndex: SandboxHandleReviewContractDecisionArchiveFileReference;
}

export interface SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference {
  sourceVersion: "Node v356";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1";
  decisionState: "sandbox-handle-review-contract-decision-ready" | "blocked";
  decision: "define-sandbox-handle-review-contract" | "blocked";
  readyForContractDecision: boolean;
  readyForNodeV357ArchiveVerification: boolean;
  decisionDigest: string;
  sourceArchiveVerificationDigest: string;
  contractInputCount: number;
  contractSectionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  contractDecisionOnly: boolean;
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

export interface SandboxHandleReviewContractDecisionArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "sandbox-handle-review-contract-decision-archive-verification";
  sourceSpan: "Node v356 sandbox handle review contract decision";
  archiveRoot: "d/356";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-contract-decision"
    | "blocked";
  sourceDecisionDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v358";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type SandboxHandleReviewContractDecisionArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV357Verification: boolean;
  jsonDecisionValid: boolean;
  contractInputsRecorded: boolean;
  contractSectionsRecorded: boolean;
  allChecksPassedInSourceDecision: boolean;
  sourceNodeV355ArchiveEvidenceRecorded: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsContractDecision: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsContractBoundary: boolean;
  codeWalkthroughPresent: boolean;
  planIndexReferencesV356AndV357: boolean;
  archiveIndexReferencesV356: boolean;
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
  readyForSandboxHandleReviewContractDecisionArchiveVerification: boolean;
};

export interface SandboxHandleReviewContractDecisionArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  contractInputCount: number;
  contractSectionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewContractDecisionArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v356"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision-archive-verification.v1";
  archiveVerificationState: "sandbox-handle-review-contract-decision-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-sandbox-handle-review-contract-decision"
    | "blocked";
  readyForSandboxHandleReviewContractDecisionArchiveVerification: boolean;
  readyForNodeV358SandboxHandleReviewPacketOrGateIntake: boolean;
  consumesNodeV356SandboxHandleReviewContractDecision: true;
  activeNodeVersion: "Node v357";
  sourceNodeVersion: "Node v356";
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
  archiveReferences: SandboxHandleReviewContractDecisionArchiveReferences;
  sourceNodeV356: SourceNodeV356SandboxHandleReviewContractDecisionArchiveReference;
  archiveVerification: SandboxHandleReviewContractDecisionArchiveVerificationRecord;
  checks: SandboxHandleReviewContractDecisionArchiveVerificationChecks;
  summary: SandboxHandleReviewContractDecisionArchiveVerificationSummary;
  productionBlockers: SandboxHandleReviewContractDecisionArchiveVerificationMessage[];
  warnings: SandboxHandleReviewContractDecisionArchiveVerificationMessage[];
  recommendations: SandboxHandleReviewContractDecisionArchiveVerificationMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewContractDecisionArchiveVerificationJson: string;
    sandboxHandleReviewContractDecisionArchiveVerificationMarkdown: string;
    sourceNodeV356Json: string;
    sourceNodeV356Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
