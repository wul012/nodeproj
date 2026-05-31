import type { HistoricalEvidenceFile } from "./historicalEvidenceReportUtils.js";

export interface RuntimeExecutionPassEvidenceCloseoutArchiveReference {
  id: string;
  file: HistoricalEvidenceFile;
  present: boolean;
}

export interface RuntimeExecutionPassEvidenceCloseoutStageRecord {
  version: "Node v405" | "Node v406" | "Node v407" | "Node v408";
  route: string | null;
  state: string | null;
  decision: string | null;
  ready: boolean;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
}

export interface RuntimeExecutionPassEvidenceCloseoutRecord {
  closeoutDigest: string;
  verificationMode: "runtime-execution-pass-evidence-closeout";
  sourceSpan: "Node v405 canonical approval + Node v406 live-read gate + Node v407 smoke + Node v408 archive verification";
  stageRecords: RuntimeExecutionPassEvidenceCloseoutStageRecord[];
  sourceSummaryCount: number;
  readyStageCount: number;
  totalCheckCount: number;
  totalPassedCheckCount: number;
  totalProductionBlockerCount: number;
  v407CleanupPassed: boolean;
  v408ArchiveReferenceCount: number;
  v408PresentArchiveReferenceCount: number;
  v408FullVitestFiles: number;
  v408FullVitestTests: number;
  closeoutDecision: "close-runtime-execution-pass-evidence-chain" | "blocked";
  nextNodeVersionSuggested: "Node v410";
}

export interface RuntimeExecutionPassEvidenceCloseoutChecks {
  v405SummaryPresent: boolean;
  v406SummaryPresent: boolean;
  v407SummaryPresent: boolean;
  v408SummaryPresent: boolean;
  v408HttpArchivePresent: boolean;
  v408MarkdownArchivePresent: boolean;
  v408BrowserSnapshotPresent: boolean;
  v408ScreenshotPresent: boolean;
  v408ExplanationPresent: boolean;
  v408WalkthroughPresent: boolean;
  chainVersionOrderValid: boolean;
  v405CanonicalApprovalReady: boolean;
  v405CanonicalApprovalHasConcreteInputs: boolean;
  v405NoRuntimeExecutionOrServiceStart: boolean;
  v406LiveReadGateReady: boolean;
  v406TargetsReady: boolean;
  v406NoRuntimeExecutionOrServiceStart: boolean;
  v407ApprovedLoopbackSmokePassed: boolean;
  v407TargetsPassed: boolean;
  v407CleanupProofPassed: boolean;
  v407NoRouteOwnedServiceStartOrExecution: boolean;
  v408ArchiveVerificationReady: boolean;
  v408ArchiveReferencesComplete: boolean;
  v408DoesNotRerunOrStartServices: boolean;
  v408NoManagedAuditCredentialRawEndpointOrExecution: boolean;
  sourceChecksAllPassedAcrossChain: boolean;
  noProductionBlockersAcrossChain: boolean;
  verificationResultsRecordedForV406ThroughV408: boolean;
  closeoutDigestStable: boolean;
  readyForRuntimeExecutionPassEvidenceCloseout: boolean;
}

export interface RuntimeExecutionPassEvidenceCloseoutSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceSummaryCount: number;
  archiveReferenceCount: number;
  presentArchiveReferenceCount: number;
  readyStageCount: number;
  totalSourceCheckCount: number;
  totalSourcePassedCheckCount: number;
  totalSourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface RuntimeExecutionPassEvidenceCloseoutMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-pass-evidence-closeout.v1";
  closeoutState: "runtime-execution-pass-evidence-closeout-ready" | "blocked";
  closeoutDecision: "close-runtime-execution-pass-evidence-chain" | "blocked";
  readyForRuntimeExecutionPassEvidenceCloseout: boolean;
  readyForRuntimeExecutionChainHandoff: boolean;
  activeNodeVersion: "Node v409";
  sourceNodeVersion: "Node v408";
  sourceStageVersions: readonly ["Node v405", "Node v406", "Node v407", "Node v408"];
  javaSourceVersion: "Java v167";
  miniKvSourceVersion: "mini-kv v158";
  closeoutOnly: true;
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
  javaMiniKvRecommendedParallel: true;
  nodeIsUpstreamPreApprovalBlocker: false;
  archiveReferences: RuntimeExecutionPassEvidenceCloseoutArchiveReference[];
  closeout: RuntimeExecutionPassEvidenceCloseoutRecord;
  checks: RuntimeExecutionPassEvidenceCloseoutChecks;
  summary: RuntimeExecutionPassEvidenceCloseoutSummary;
  productionBlockers: RuntimeExecutionPassEvidenceCloseoutMessage[];
  warnings: RuntimeExecutionPassEvidenceCloseoutMessage[];
  recommendations: RuntimeExecutionPassEvidenceCloseoutMessage[];
  evidenceEndpoints: {
    passEvidenceCloseoutJson: string;
    passEvidenceCloseoutMarkdown: string;
    sourceNodeV408Json: string;
    sourceNodeV408Markdown: string;
    v407SmokeJson: string;
    activePlan: string;
    nextNodeVersion: "Node v410";
  };
  nextActions: string[];
}
