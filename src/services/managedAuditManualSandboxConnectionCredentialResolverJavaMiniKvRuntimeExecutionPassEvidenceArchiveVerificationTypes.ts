import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface RuntimeExecutionPassEvidenceArchiveReference {
  id: string;
  file: HistoricalEvidenceFile;
  present: boolean;
}

export interface RuntimeExecutionPassEvidenceArchiveVerificationRecord {
  verificationDigest: string;
  verificationMode: "runtime-execution-pass-evidence-archive-verification";
  sourceSpan: "Node v407 HTTP pass evidence + cleanup proof archive";
  archiveProfileVersion: string | null;
  activeNodeVersion: string | null;
  sourceNodeVersion: string | null;
  smokeState: string | null;
  smokeDecision: string | null;
  readyForRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke: boolean;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  failedTargetCount: number;
  skippedTargetCount: number;
  cleanupPassed: boolean;
  afterListeningSocketCount: number;
  fullVitestFiles: number;
  fullVitestTests: number;
  nextNodeVersionSuggested: "Node v409";
}

export interface RuntimeExecutionPassEvidenceArchiveVerificationChecks {
  httpArchivePresent: boolean;
  summaryArchivePresent: boolean;
  cleanupProofPresent: boolean;
  browserSnapshotPresent: boolean;
  screenshotPresent: boolean;
  explanationPresent: boolean;
  walkthroughPresent: boolean;
  v407ProfileVersionValid: boolean;
  v407ActiveVersionValid: boolean;
  v407SourceVersionValid: boolean;
  v407SmokePassed: boolean;
  v407ReadyForPassArchive: boolean;
  v407ChecksAllPassed: boolean;
  v407ProductionBlockersClear: boolean;
  v407TargetsAllPassed: boolean;
  v407NoSkippedOrFailedTargets: boolean;
  v407RouteDidNotStartServices: boolean;
  v407NoManagedAuditCredentialRawEndpointOrWrites: boolean;
  sourceNodeV406ReadyInArchive: boolean;
  summaryMatchesHttpArchive: boolean;
  cleanupProofPassed: boolean;
  cleanupProofNoListeningSockets: boolean;
  cleanupProofPortsCovered: boolean;
  verificationResultsRecorded: boolean;
  fullVitestRecorded: boolean;
  typecheckAndBuildRecorded: boolean;
  verificationDigestStable: boolean;
  readyForRuntimeExecutionPassEvidenceArchiveVerification: boolean;
}

export interface RuntimeExecutionPassEvidenceArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveReferenceCount: number;
  presentArchiveReferenceCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  cleanupPassed: boolean;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPassEvidenceArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-archive-verification.v1";
  verificationState: "runtime-execution-pass-evidence-archive-verified" | "blocked";
  verificationDecision: "accept-v407-pass-evidence-and-cleanup-proof-archive" | "blocked";
  readyForRuntimeExecutionPassEvidenceArchiveVerification: boolean;
  readyForRuntimeExecutionPassEvidenceCloseout: boolean;
  activeNodeVersion: "Node v408";
  sourceNodeVersion: "Node v407";
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  archiveVerificationOnly: true;
  rerunsSmoke: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  activeShardPrototypeEnabled: false;
  archiveReferences: RuntimeExecutionPassEvidenceArchiveReference[];
  archiveVerification: RuntimeExecutionPassEvidenceArchiveVerificationRecord;
  checks: RuntimeExecutionPassEvidenceArchiveVerificationChecks;
  summary: RuntimeExecutionPassEvidenceArchiveVerificationSummary;
  productionBlockers: RuntimeExecutionPassEvidenceArchiveVerificationMessage[];
  warnings: RuntimeExecutionPassEvidenceArchiveVerificationMessage[];
  recommendations: RuntimeExecutionPassEvidenceArchiveVerificationMessage[];
  evidenceEndpoints: {
    passEvidenceArchiveVerificationJson: string;
    passEvidenceArchiveVerificationMarkdown: string;
    sourceNodeV407Json: string;
    sourceNodeV407Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: "Node v409";
  };
  nextActions: string[];
}
