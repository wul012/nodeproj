import type {
  ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationTypes.js";
import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1";
  verificationState: "credential-resolver-fake-shell-archive-upstream-echo-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification: boolean;
  readOnlyUpstreamEchoVerification: true;
  archiveVerificationOnly: true;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV266: SourceNodeV266FakeShellArchiveVerificationReference;
  upstreamEchoes: {
    javaV110: JavaV110FakeShellArchiveEchoReceiptReference;
    miniKvV117: MiniKvV117FakeShellArchiveNonParticipationReference;
  };
  echoVerification: CredentialResolverFakeShellArchiveUpstreamEchoVerification;
  checks: CredentialResolverFakeShellArchiveUpstreamEchoVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    matchedSnippetCount: number;
    archiveFileCount: number;
    requiredSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[];
  warnings: CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[];
  recommendations: CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[];
  evidenceEndpoints: {
    fakeShellArchiveUpstreamEchoVerificationJson: string;
    fakeShellArchiveUpstreamEchoVerificationMarkdown: string;
    sourceNodeV266Json: string;
    sourceNodeV266Markdown: string;
    javaV110Runbook: string;
    javaV110Walkthrough: string;
    javaV110Builder: string;
    miniKvV117Receipt: string;
    miniKvV117Runbook: string;
    miniKvV117Walkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV266FakeShellArchiveVerificationReference {
  sourceVersion: "Node v266";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile["archiveVerificationState"];
  readyForArchiveVerification: boolean;
  archiveVerificationDigest: string;
  evidenceSpan: string;
  sourceNodeV264Ready: boolean;
  sourceNodeV265Ready: boolean;
  sourceNodeV265ConsumesUpstreamEchoes: boolean;
  archiveFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  readOnlyArchiveVerification: true;
  archiveVerificationRerunsFakeShellBehavior: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
}

export interface JavaV110FakeShellArchiveEchoReceiptReference {
  sourceVersion: "Java v110";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v30" | "missing";
  receiptVersion: string;
  archiveEchoMode: string;
  consumedNodeVersion: "Node v266" | "missing";
  consumedNodeProfile: string;
  nextNodeConsumerVersion: "Node v267" | "missing";
  archiveFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  sourceNodeV264ContractEchoed: boolean;
  sourceNodeV265UpstreamEchoed: boolean;
  archiveEvidenceEchoed: boolean;
  archiveSnippetsEchoed: boolean;
  routeResponsesEchoed: boolean;
  readOnlyArchiveBoundaryEchoed: boolean;
  noFakeShellRerunEchoed: boolean;
  sideEffectBoundaryEchoed: boolean;
  upstreamActionsStillDisabledEchoed: boolean;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  approvalLedgerWritten: false;
  sqlExecuted: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForNodeV267Alignment: boolean;
}

export interface MiniKvV117FakeShellArchiveNonParticipationReference {
  sourceVersion: "mini-kv v117";
  tagLabel: string;
  evidenceFiles: HistoricalEvidenceFile[];
  expectedSnippets: HistoricalSnippetMatch[];
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourceArchiveProfileVersion: string;
  sourceArchiveVerificationState: string;
  sourceReadyForCredentialResolverFakeShellArchiveVerification: boolean;
  sourceReadOnlyArchiveVerification: boolean;
  sourceArchiveVerificationRerunsFakeShellBehavior: boolean;
  sourceNodeV264Ready: boolean;
  sourceNodeV265Ready: boolean;
  sourceNodeV265ConsumesUpstreamEchoes: boolean;
  archiveFileCount: number;
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  archiveFilesReadByMiniKv: boolean;
  archiveVerificationRerunsFakeShellBehavior: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  archiveVerificationOnly: boolean;
  credentialResolverImplemented: boolean;
  credentialResolverInvoked: boolean;
  resolverClientInstantiated: boolean;
  secretProviderInstantiated: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  externalAuditServiceAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  credentialValueStored: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
  readyForNodeV267Alignment: boolean;
}

export interface CredentialResolverFakeShellArchiveUpstreamEchoVerification {
  verificationDigest: string;
  verificationMode: "java-v110-plus-mini-kv-v117-fake-shell-archive-upstream-echo-verification-only";
  sourceSpan: "Node v266 + Java v110 + mini-kv v117";
  sourceNodeV266Ready: boolean;
  javaV110EchoReady: boolean;
  miniKvV117NonParticipationReady: boolean;
  archiveCountsAligned: boolean;
  archiveSnippetsAligned: boolean;
  archiveNoRerunAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  nodeV267BlocksRealResolver: true;
}

export type CredentialResolverFakeShellArchiveUpstreamEchoVerificationChecks = {
  sourceNodeV266Ready: boolean;
  sourceNodeV266RouteResponsesVerified: boolean;
  javaV110EchoReady: boolean;
  miniKvV117NonParticipationReady: boolean;
  archiveCountsAligned: boolean;
  archiveSnippetsAligned: boolean;
  archiveNoRerunAligned: boolean;
  readOnlyArchiveBoundaryAligned: boolean;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  resolverBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification: boolean;
};

export interface CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification"
    | "node-v266-credential-resolver-fake-shell-archive-verification"
    | "java-v110-credential-resolver-fake-shell-archive-echo-receipt"
    | "mini-kv-v117-credential-resolver-fake-shell-archive-non-participation-receipt"
    | "runtime-config";
  message: string;
}
