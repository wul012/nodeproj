import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1";
  archiveVerificationState: "credential-resolver-fake-shell-archive-verification-ready" | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyArchiveVerification: true;
  archiveVerificationRerunsFakeShellBehavior: false;
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
  sourceNodeV264: SourceNodeV264FakeShellContractSummary;
  sourceNodeV265: SourceNodeV265FakeShellUpstreamEchoSummary;
  archivedEvidence: CredentialResolverFakeShellArchiveEvidence;
  archiveVerification: CredentialResolverFakeShellArchiveVerification;
  checks: CredentialResolverFakeShellArchiveVerificationChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    archiveFileCount: number;
    requiredSnippetCount: number;
    matchedSnippetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CredentialResolverFakeShellArchiveVerificationMessage[];
  warnings: CredentialResolverFakeShellArchiveVerificationMessage[];
  recommendations: CredentialResolverFakeShellArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceNodeV264Json: string;
    sourceNodeV264Markdown: string;
    sourceNodeV265Json: string;
    sourceNodeV265Markdown: string;
    v264HtmlArchive: string;
    v264Screenshot: string;
    v264Explanation: string;
    v264CodeWalkthrough: string;
    v265HtmlArchive: string;
    v265Screenshot: string;
    v265Explanation: string;
    v265CodeWalkthrough: string;
    activePlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV264FakeShellContractSummary {
  sourceVersion: "Node v264";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile["profileVersion"];
  shellContractState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile["shellContractState"];
  readyForTestOnlyShellContract: boolean;
  contractDigest: string;
  shellMode: "test-only-fake-resolver-contract";
  resolverKind: "fake-in-memory";
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  fakeResolverOnly: true;
  handleOnlyRequest: true;
  credentialResolverExecutionAllowed: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
}

export interface SourceNodeV265FakeShellUpstreamEchoSummary {
  sourceVersion: "Node v265";
  profileVersion: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile["profileVersion"];
  verificationState: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile["verificationState"];
  readyForUpstreamEchoVerification: boolean;
  verificationDigest: string;
  verificationMode: string;
  sourceSpan: string;
  sourceNodeV264Ready: boolean;
  javaV107EchoReady: boolean;
  miniKvV116NonParticipationReady: boolean;
  javaV109OptimizationContextReady: boolean;
  requestShapeFieldCount: number;
  responseShapeFieldCount: number;
  failureMappingCount: number;
  guardConditionCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  credentialBoundaryAligned: boolean;
  rawEndpointBoundaryAligned: boolean;
  connectionBoundaryAligned: boolean;
  writeBoundaryAligned: boolean;
  autoStartBoundaryAligned: boolean;
  credentialResolverExecutionAllowed: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  connectsManagedAudit: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
}

export interface CredentialResolverFakeShellArchiveEvidence {
  archiveRoots: readonly ["c/264/", "c/265/"];
  sourceVersions: readonly ["Node v264", "Node v265"];
  files: CredentialResolverFakeShellArchiveFileEvidence[];
  requiredSnippetCount: number;
  matchedSnippetCount: number;
  snippetMatches: CredentialResolverFakeShellArchiveSnippetEvidence[];
}

export interface CredentialResolverFakeShellArchiveFileEvidence {
  id: string;
  workspacePath: string;
  historicalPath: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface CredentialResolverFakeShellArchiveSnippetEvidence {
  id: string;
  workspacePath: string;
  expectedText: string;
  matched: boolean;
}

export interface CredentialResolverFakeShellArchiveVerification {
  archiveVerificationDigest: string;
  evidenceSpan: "Node v264 credential resolver fake shell contract + Node v265 upstream echo archive";
  sourceNodeV264ContractDigest: string;
  sourceNodeV265VerificationDigest: string;
  sourceNodeV264RoutePath: string;
  sourceNodeV265RoutePath: string;
  archiveVerificationReadsFilesOnly: true;
  archiveVerificationRerunsFakeShellBehavior: false;
  upstreamActionsEnabled: boolean;
  productionAuditAllowed: false;
}

export type CredentialResolverFakeShellArchiveVerificationChecks = {
  sourceNodeV264Ready: boolean;
  sourceNodeV264DigestValid: boolean;
  sourceNodeV265Ready: boolean;
  sourceNodeV265DigestValid: boolean;
  sourceNodeV265ConsumesUpstreamEchoes: boolean;
  archiveFilesPresent: boolean;
  archiveFilesNonEmpty: boolean;
  v264HtmlPresent: boolean;
  v264ScreenshotPresent: boolean;
  v264ScreenshotNonEmpty: boolean;
  v264ExplanationPresent: boolean;
  v264CodeWalkthroughPresent: boolean;
  v265HtmlPresent: boolean;
  v265ScreenshotPresent: boolean;
  v265ScreenshotNonEmpty: boolean;
  v265ExplanationPresent: boolean;
  v265CodeWalkthroughPresent: boolean;
  archiveSnippetsMatched: boolean;
  v264ArchiveRecordsFakeShellContract: boolean;
  v265ArchiveRecordsUpstreamEchoVerification: boolean;
  walkthroughsRecordImplementationAndVerification: boolean;
  activePlanPointsToV266ArchiveVerification: boolean;
  routeResponsesVerified: boolean;
  noArchiveVerificationFakeShellRerun: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification: boolean;
};

export interface CredentialResolverFakeShellArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification"
    | "node-v264-credential-resolver-test-only-shell-contract"
    | "node-v265-test-only-shell-upstream-echo-verification"
    | "credential-resolver-fake-shell-archive"
    | "v263-plan"
    | "runtime-config";
  message: string;
}
