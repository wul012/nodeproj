export interface ArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalReadOnlyIntegrationPassedArchiveReferences {
  archiveRoot: "d/349";
  jsonEvidence: ArchiveFileReference;
  markdownEvidence: ArchiveFileReference;
  summaryEvidence: ArchiveFileReference;
  browserSnapshot: ArchiveFileReference;
  htmlArchive: ArchiveFileReference;
  screenshot: ArchiveFileReference;
  explanation: ArchiveFileReference;
  codeWalkthrough: ArchiveFileReference;
  activePlan: ArchiveFileReference;
  plansIndex: ArchiveFileReference;
}

export interface SourceNodeV349SmokeRerunArchiveReference {
  sourceVersion: "Node v349";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1";
  rerunArchiveState: "minimal-read-only-integration-smoke-rerun-archived" | "minimal-read-only-integration-smoke-rerun-pending" | "blocked";
  rerunArchiveResult: "all-read-passed" | "read-window-unavailable" | "invalid-read-contract" | "pending" | "blocked";
  rerunArchiveDecision:
    | "archive-read-passed-rerun-evidence"
    | "archive-read-window-unavailable-rerun-evidence"
    | "request-java-mini-kv-read-contract-fix"
    | "pending-external-read-window"
    | "blocked";
  readyForRerunArchive: boolean;
  archiveDigest: string;
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
}

export interface MinimalReadOnlyIntegrationPassedArchiveTransitionRecord {
  transitionDigest: string;
  transitionMode: "minimal-read-only-integration-passed-archive-verification";
  sourceSpan: "Node v349 minimal read-only integration smoke rerun archive";
  archiveRoot: "d/349";
  sourceArchiveDigest: string;
  transitionDecision:
    | "advance-to-managed-audit-disabled-read-only-integration-intake"
    | "blocked";
  verifiesJsonMarkdownAndSummary: boolean;
  verifiesScreenshotExplanationAndWalkthrough: boolean;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v351";
}

export type MinimalReadOnlyIntegrationPassedArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV350Verification: boolean;
  jsonArchiveAllReadPassed: boolean;
  targetCountsConfirmAllPassed: boolean;
  targetResultsAllReadOnlyAndAllowed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsPassedArchive: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsPassedWindow: boolean;
  codeWalkthroughPresent: boolean;
  planIndexReferencesV349AndV350: boolean;
  transitionDoesNotRerunProbe: boolean;
  noUpstreamServiceStartedByNode: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  noJavaMiniKvEchoRequired: boolean;
  transitionDecisionLimitedToDisabledReadOnlyStage: boolean;
  transitionDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalReadOnlyIntegrationPassedArchiveVerification: boolean;
};

export interface MinimalReadOnlyIntegrationPassedArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationPassedArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v349"
    | "runtime-boundary"
    | "transition-decision";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification.v1";
  transitionState: "minimal-read-only-integration-passed-archive-verified" | "blocked";
  transitionDecision:
    | "advance-to-managed-audit-disabled-read-only-integration-intake"
    | "blocked";
  readyForMinimalReadOnlyIntegrationPassedArchiveVerification: boolean;
  readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: boolean;
  consumesNodeV349MinimalReadOnlyIntegrationSmokeRerunArchive: true;
  activeNodeVersion: "Node v350";
  sourceNodeVersion: "Node v349";
  archiveVerificationOnly: true;
  transitionDecisionOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: MinimalReadOnlyIntegrationPassedArchiveReferences;
  sourceNodeV349: SourceNodeV349SmokeRerunArchiveReference;
  transitionRecord: MinimalReadOnlyIntegrationPassedArchiveTransitionRecord;
  checks: MinimalReadOnlyIntegrationPassedArchiveVerificationChecks;
  summary: MinimalReadOnlyIntegrationPassedArchiveVerificationSummary;
  productionBlockers: MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[];
  warnings: MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[];
  recommendations: MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationPassedArchiveVerificationJson: string;
    minimalReadOnlyIntegrationPassedArchiveVerificationMarkdown: string;
    sourceNodeV349Json: string;
    sourceNodeV349Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
