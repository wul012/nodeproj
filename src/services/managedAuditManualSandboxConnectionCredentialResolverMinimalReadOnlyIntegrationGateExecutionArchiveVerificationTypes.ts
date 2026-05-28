import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile,
  MinimalReadOnlyIntegrationGateExecutionDecision,
  MinimalReadOnlyIntegrationGateExecutionResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export interface MinimalReadOnlyIntegrationGateExecutionArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface MinimalReadOnlyIntegrationGateExecutionArchiveReferences {
  archiveRoot: "d/367";
  jsonEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  markdownEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  summaryEvidence: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  browserSnapshot: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  htmlArchive: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  screenshot: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  explanation: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  codeWalkthrough: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  sourcePlan: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  plansIndex: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
  archiveIndex: MinimalReadOnlyIntegrationGateExecutionArchiveFileReference;
}

export interface SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference {
  sourceVersion: "Node v367";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile["profileVersion"];
  gateExecutionState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile["gateExecutionState"];
  gateExecutionResult: MinimalReadOnlyIntegrationGateExecutionResult;
  gateExecutionDecision: MinimalReadOnlyIntegrationGateExecutionDecision;
  readyForMinimalReadOnlyIntegrationGateExecution: boolean;
  consumesNodeV366ExplicitReadWindowGateExecutionDecision: boolean;
  reusesNodeV349MinimalReadOnlySmokeLane: boolean;
  sourceNodeVersion: "Node v366";
  sourceNodeV366Ready: boolean;
  sourceDecisionDigest: string;
  reusedSmokeArchiveDigest: string | null;
  gateExecutionDigest: string;
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
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
  requiresParallelJavaMiniKvReadContractFix: boolean;
}

export interface MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord {
  archiveVerificationDigest: string;
  verificationMode: "minimal-read-only-integration-gate-execution-archive-verification";
  sourceSpan: "Node v367 minimal read-only integration gate execution";
  archiveRoot: "d/367";
  archiveVerificationDecision:
    | "archive-minimal-read-only-gate-execution-and-operator-ci-handoff"
    | "blocked";
  sourceGateExecutionDigest: string;
  sourceDecisionDigest: string;
  reusedSmokeArchiveDigest: string | null;
  verifiesJsonMarkdownAndSummary: true;
  verifiesScreenshotExplanationAndWalkthrough: true;
  verifiesPlanAndArchiveIndexes: true;
  verifiesOperatorCiHandoffReadiness: true;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v369";
  archiveFileDigests: Array<{
    path: string;
    digest: string | null;
    byteLength: number;
  }>;
}

export interface MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck {
  checkDigest: string;
  checkMode: "operator-ci-regular-minimal-read-only-gate-execution";
  sourceRoute: string;
  sourceMarkdownRoute: string;
  archiveVerificationRoute: string;
  focusedTestCommand: string;
  groupedTestCommand: string;
  buildCommand: string;
  smokeCommand: string;
  readOnlyTargetCount: number;
  expectedPassedTargetCount: 5;
  expectedPassedCheckCount: 20;
  avoidsFullTestBatchByDefault: true;
  splitsVerificationIntoFocusedSteps: true;
  requiresExternalReadWindowForActualProbe: true;
  automaticUpstreamStart: false;
  rerunsJavaMiniKvNow: false;
  opensManagedAuditConnection: false;
  readsCredentialValue: false;
  parsesRawEndpointUrl: false;
  invokesRuntimeShell: false;
}

export type MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks = {
  archiveFilesPresent: boolean;
  jsonEvidenceReadable: boolean;
  jsonProfileVersionValid: boolean;
  jsonGateExecutionPassed: boolean;
  jsonSourceNodeV366Ready: boolean;
  jsonReusedSmokeLaneReady: boolean;
  jsonGateExecutionRecorded: boolean;
  jsonTargetResultsComplete: boolean;
  jsonTargetResultsAllPassed: boolean;
  jsonTargetResultsReadOnlyNoMutation: boolean;
  jsonJavaTargetsGetOnly: boolean;
  jsonMiniKvTargetsReadOnlyCommandsOnly: boolean;
  jsonCountsMatchTargetResults: boolean;
  jsonChecksAllPassed: boolean;
  summaryMatchesJson: boolean;
  markdownRecordsPassedExecution: boolean;
  markdownRecordsSourceAndSmokeLane: boolean;
  browserSnapshotPresent: boolean;
  screenshotAndHtmlPresent: boolean;
  explanationRecordsExecutionAndBoundary: boolean;
  codeWalkthroughPresent: boolean;
  sourcePlanPointsToV368: boolean;
  planIndexReferencesV367AndV368: boolean;
  archiveIndexReferencesV367: boolean;
  routeRecordedInArchive: boolean;
  archiveVerificationDoesNotRerunProbe: boolean;
  operatorCiCheckUsesFocusedCommands: boolean;
  operatorCiCheckKeepsReadWindowExplicit: boolean;
  operatorCiCheckAvoidsLargeTestBatch: boolean;
  noAutomaticUpstreamStart: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointUrlRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noJavaMiniKvFixRequired: boolean;
  archiveVerificationDigestStable: boolean;
  operatorCiCheckDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: boolean;
};

export interface MinimalReadOnlyIntegrationGateExecutionArchiveVerificationSummary {
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  readOnlyTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-files"
    | "archive-json"
    | "archive-markdown"
    | "archive-docs"
    | "node-v367"
    | "operator-ci-handoff"
    | "runtime-boundary"
    | "archive-verification";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification.v1";
  archiveVerificationState: "minimal-read-only-integration-gate-execution-archive-verified" | "blocked";
  archiveVerificationDecision:
    | "archive-minimal-read-only-gate-execution-and-operator-ci-handoff"
    | "blocked";
  readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: boolean;
  readyForNodeV369OperatorCiRegularGateHandoff: boolean;
  consumesNodeV367MinimalReadOnlyIntegrationGateExecution: true;
  activeNodeVersion: "Node v368";
  sourceNodeVersion: "Node v367";
  archiveVerificationOnly: true;
  operatorCiHandoffCheckIncluded: true;
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
  requiresParallelJavaMiniKvReadContractFix: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveReferences: MinimalReadOnlyIntegrationGateExecutionArchiveReferences;
  sourceNodeV367: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference;
  targetResults: MinimalReadOnlyIntegrationSmokeTargetResult[];
  archiveVerification: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord;
  operatorCiHandoffCheck: MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck;
  checks: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks;
  summary: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationSummary;
  productionBlockers: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[];
  warnings: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[];
  recommendations: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationMessage[];
  evidenceEndpoints: {
    gateExecutionArchiveVerificationJson: string;
    gateExecutionArchiveVerificationMarkdown: string;
    sourceNodeV367Json: string;
    sourceNodeV367Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
