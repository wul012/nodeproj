import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export type MinimalReadOnlyIntegrationSmokeArchiveResult =
  | "all-read-passed"
  | "read-window-unavailable"
  | "invalid-read-contract";

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1";
  archiveVerificationState: "minimal-read-only-integration-smoke-archive-verified" | "blocked";
  archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult | "blocked";
  archiveDecision:
    | "wait-for-external-read-window-rerun"
    | "ready-for-next-read-only-stage"
    | "request-java-mini-kv-read-contract-fix"
    | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification: boolean;
  consumesNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true;
  activeNodeVersion: "Node v347";
  sourceNodeVersion: "Node v346";
  archiveVerificationOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readyForNodeV348MinimalReadOnlyIntegrationRerunDecision: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: MinimalReadOnlyIntegrationSmokeArchiveReferences;
  archiveVerification: MinimalReadOnlyIntegrationSmokeArchiveVerificationRecord;
  sourceNodeV346: SourceNodeV346SmokeRehearsalReference;
  checks: MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks;
  summary: MinimalReadOnlyIntegrationSmokeArchiveVerificationSummary;
  productionBlockers: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[];
  warnings: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[];
  recommendations: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationSmokeArchiveVerificationJson: string;
    minimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown: string;
    sourceNodeV346Json: string;
    sourceNodeV346Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface ArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalReadOnlyIntegrationSmokeArchiveReferences {
  archiveRoot: "d/346";
  jsonEvidence: ArchiveFileReference;
  markdownEvidence: ArchiveFileReference;
  smokeSummary: ArchiveFileReference;
  browserSnapshot: ArchiveFileReference;
  htmlArchive: ArchiveFileReference;
  screenshot: ArchiveFileReference;
  explanation: ArchiveFileReference;
  codeWalkthrough: ArchiveFileReference;
  activePlan: ArchiveFileReference;
  plansIndex: ArchiveFileReference;
}

export interface MinimalReadOnlyIntegrationSmokeArchiveVerificationRecord {
  verificationDigest: string;
  verificationMode: "read-only-v346-smoke-archive-verification";
  sourceSpan: "Node v346 minimal read-only integration smoke rehearsal archive";
  decision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"];
  archiveRoot: "d/346";
  archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult | "blocked";
  verifiesJsonAndMarkdown: boolean;
  verifiesSmokeSummary: boolean;
  verifiesScreenshotAndExplanation: boolean;
  verifiesCodeWalkthroughAndPlanIndex: boolean;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  requestsJavaMiniKvEcho: boolean;
  nextNodeVersionSuggested: "Node v348";
}

export interface SourceNodeV346SmokeRehearsalReference {
  sourceVersion: "Node v346";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["profileVersion"];
  smokeState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeState"];
  smokeDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeDecision"];
  readyForSmokeRehearsal: boolean;
  readyForNodeV347ArchiveVerification: boolean;
  sessionDigest: string;
  attemptedTargetCount: number;
  passedTargetCount: number;
  connectionRefusedTargetCount: number;
  timeoutTargetCount: number;
  invalidJsonTargetCount: number;
  unexpectedStatusTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  liveProbePerformedNow: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
}

export type MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonEvidenceProfileVersionValid: boolean;
  jsonEvidenceReadyForArchiveVerification: boolean;
  jsonEvidenceKeepsRuntimeAndWritesClosed: boolean;
  smokeSummaryMatchesJson: boolean;
  markdownRecordsSmokeState: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsReadWindowUnavailable: boolean;
  codeWalkthroughPresent: boolean;
  planIndexReferencesV346AndV347: boolean;
  archiveVerificationDoesNotRerunProbe: boolean;
  noUpstreamServiceStarted: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  readWindowUnavailableDoesNotRequestJavaMiniKvCodeChange: boolean;
  invalidContractRequestsParallelEchoOnlyWhenNeeded: boolean;
  archiveVerificationDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification: boolean;
};

export interface MinimalReadOnlyIntegrationSmokeArchiveVerificationSummary {
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

export interface MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v346"
    | "runtime-boundary"
    | "next-step";
  message: string;
}
