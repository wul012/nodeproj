export interface ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences {
  archiveRoot: "d/351";
  jsonEvidence: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  markdownEvidence: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  summaryEvidence: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  browserSnapshot: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  htmlArchive: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  screenshot: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  explanation: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  codeWalkthrough: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  sourcePlan: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
  plansIndex: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveFileReference;
}

export interface SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference {
  sourceVersion: "Node v351";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1";
  intakeState: "managed-audit-disabled-read-only-integration-intake-ready" | "blocked";
  intakeDecision: "define-managed-audit-disabled-read-only-integration-stage" | "blocked";
  readyForIntake: boolean;
  intakeDigest: string;
  sourceTransitionDigest: string;
  inputCount: number;
  closedScopeCount: number;
  checkCount: number;
  passedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  managedAuditDisabled: boolean;
  readOnlyIntegrationOnly: boolean;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
}

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "managed-audit-disabled-read-only-integration-intake-archive-verification";
  sourceSpan: "Node v351 managed-audit-disabled read-only integration intake";
  archiveRoot: "d/351";
  archiveVerificationDecision:
    | "archive-managed-audit-disabled-read-only-integration-intake"
    | "blocked";
  sourceIntakeDigest: string;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanIndex: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v353";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export type ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonReadyForV352Verification: boolean;
  jsonIntakeDecisionValid: boolean;
  intakeInputsRecorded: boolean;
  closedScopesRecorded: boolean;
  allChecksPassedInSourceIntake: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsDisabledIntake: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsDisabledBoundary: boolean;
  codeWalkthroughPresent: boolean;
  planIndexReferencesV351AndV352: boolean;
  verificationDoesNotRerunProbe: boolean;
  noUpstreamServiceStartedByNode: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplemented: boolean;
  noJavaMiniKvEchoRequired: boolean;
  archiveVerificationDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: boolean;
};

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  inputCount: number;
  closedScopeCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v351"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake-archive-verification.v1";
  archiveVerificationState: "managed-audit-disabled-read-only-integration-intake-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-managed-audit-disabled-read-only-integration-intake"
    | "blocked";
  readyForManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerification: boolean;
  readyForNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: boolean;
  consumesNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: true;
  activeNodeVersion: "Node v352";
  sourceNodeVersion: "Node v351";
  archiveVerificationOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  readsManagedAuditCredential: false;
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
  archiveReferences: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReferences;
  sourceNodeV351: SourceNodeV351ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveReference;
  archiveVerification: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationRecord;
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationChecks;
  summary: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationSummary;
  productionBlockers: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[];
  warnings: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[];
  recommendations: ManagedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMessage[];
  evidenceEndpoints: {
    managedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationJson: string;
    managedAuditDisabledReadOnlyIntegrationIntakeArchiveVerificationMarkdown: string;
    sourceNodeV351Json: string;
    sourceNodeV351Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
