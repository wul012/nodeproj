import type { AppConfig } from "../../config.js";
import {
  isDigest,
  mergeArchiveCheckGroups,
  valueAt,
  type ArchiveFileRef,
  type ParsedArchiveEvidence,
} from "./kernel.js";
import type {
  MinimalReadOnlyIntegrationGateExecutionArchiveReferences,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks,
  MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord,
  MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck,
  SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "../managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

interface IntegrationArchiveCheckInput {
  config: AppConfig;
  source: SourceNodeV367MinimalReadOnlyIntegrationGateExecutionArchiveReference;
  refs: MinimalReadOnlyIntegrationGateExecutionArchiveReferences;
  archive: ParsedArchiveEvidence;
  targetResults: readonly MinimalReadOnlyIntegrationSmokeTargetResult[];
  verification: MinimalReadOnlyIntegrationGateExecutionArchiveVerificationRecord;
  operatorCiCheck: MinimalReadOnlyIntegrationGateExecutionOperatorCiHandoffCheck;
  archiveFiles: readonly ArchiveFileRef[];
  sourceRoute: string;
  expectedJavaGets: readonly string[];
  expectedMiniKvReads: readonly string[];
}

export function createIntegrationArchiveChecks(
  input: IntegrationArchiveCheckInput,
): MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks {
  return mergeArchiveCheckGroups<MinimalReadOnlyIntegrationGateExecutionArchiveVerificationChecks>(
    integrationSourceChecks(input),
    integrationTargetChecks(input),
    integrationContentChecks(input),
    integrationDocumentationChecks(input),
    integrationOperatorChecks(input),
    integrationBoundaryChecks(input),
  );
}

function integrationSourceChecks(input: IntegrationArchiveCheckInput) {
  const { source, archive } = input;
  return {
    archiveFilesPresent: input.archiveFiles.every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1",
    jsonGateExecutionPassed:
      source.gateExecutionState === "minimal-read-only-integration-gate-executed"
      && source.gateExecutionResult === "all-read-passed"
      && source.gateExecutionDecision === "archive-read-passed-gate-execution"
      && source.readyForMinimalReadOnlyIntegrationGateExecution,
    jsonSourceNodeV366Ready:
      source.consumesNodeV366ExplicitReadWindowGateExecutionDecision
      && source.sourceNodeV366Ready
      && valueAt(archive.json, "sourceNodeV366", "gateExecutionDecision")
      === "ready-for-explicit-read-window-gate-execution",
    jsonReusedSmokeLaneReady:
      source.reusesNodeV349MinimalReadOnlySmokeLane
      && valueAt(archive.json, "reusedNodeV349SmokeLane", "rerunArchiveResult") === "all-read-passed"
      && valueAt(archive.json, "reusedNodeV349SmokeLane", "attemptedTargetCount") === 5
      && valueAt(archive.json, "reusedNodeV349SmokeLane", "passedTargetCount") === 5,
    jsonGateExecutionRecorded:
      isDigest(source.gateExecutionDigest)
      && isDigest(source.sourceDecisionDigest)
      && isDigest(source.reusedSmokeArchiveDigest)
      && valueAt(archive.json, "gateExecution", "executionMode") === "minimal-read-only-integration-gate-execution"
      && valueAt(archive.json, "gateExecution", "nextNodeVersionSuggested") === "Node v368",
  };
}

function integrationTargetChecks(input: IntegrationArchiveCheckInput) {
  const { source, targetResults } = input;
  return {
    jsonTargetResultsComplete:
      targetResults.length === 5
      && source.attemptedTargetCount === 5
      && targetResults.every((target) => target.attempted),
    jsonTargetResultsAllPassed:
      source.passedTargetCount === 5
      && targetResults.every((target) => target.status === "read-passed"),
    jsonTargetResultsReadOnlyNoMutation:
      targetResults.every((target) => target.readOnly && !target.mutatesState),
    jsonJavaTargetsGetOnly:
      expectedEvery(input.expectedJavaGets, targetResults.map((target) => target.methodOrCommand))
      && targetResults.filter((target) => target.project === "java")
        .every((target) => target.methodOrCommand.startsWith("GET ")),
    jsonMiniKvTargetsReadOnlyCommandsOnly:
      expectedEvery(input.expectedMiniKvReads, targetResults.map((target) => target.methodOrCommand))
      && targetResults.filter((target) => target.project === "mini-kv")
        .every((target) => input.expectedMiniKvReads.includes(target.methodOrCommand)),
    jsonCountsMatchTargetResults:
      source.attemptedTargetCount === targetResults.filter((target) => target.attempted).length
      && source.passedTargetCount === targetResults.filter((target) => target.status === "read-passed").length
      && source.unavailableTargetCount === 0
      && source.invalidContractTargetCount === 0,
    jsonChecksAllPassed: source.checkCount === 20 && source.passedCheckCount === 20 && source.productionBlockerCount === 0,
  };
}

function integrationContentChecks(input: IntegrationArchiveCheckInput) {
  const { source, archive } = input;
  return {
    summaryMatchesJson:
      valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "attemptedTargetCount") === source.attemptedTargetCount
      && valueAt(archive.summary, "passedTargetCount") === source.passedTargetCount,
    markdownRecordsPassedExecution:
      archive.markdown.includes("Gate execution state: minimal-read-only-integration-gate-executed")
      && archive.markdown.includes("Gate execution result: all-read-passed")
      && archive.markdown.includes("Gate execution decision: archive-read-passed-gate-execution"),
    markdownRecordsSourceAndSmokeLane:
      archive.markdown.includes("Reused Node v349 Smoke Lane")
      && archive.markdown.includes("GET /api/v1/ops/overview")
      && archive.markdown.includes("STATSJSON"),
  };
}

function integrationDocumentationChecks(input: IntegrationArchiveCheckInput) {
  const { refs, archive, sourceRoute } = input;
  return {
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("minimal read-only integration gate execution")
      && archive.browserSnapshot.includes("5"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsExecutionAndBoundary:
      archive.explanation.includes("v367 执行真实最小只读 gate")
      && archive.explanation.includes("credentialValueRead: false")
      && archive.explanation.includes("rawEndpointUrlParsed: false"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v367")
      && archive.codeWalkthrough.includes("loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution")
      && archive.codeWalkthrough.includes("targetResults"),
    sourcePlanPointsToV368:
      archive.sourcePlan.includes("Node v368")
      && archive.sourcePlan.includes("minimal read-only gate execution archive verification")
      && archive.sourcePlan.includes("不要求 Java / mini-kv 新版本"),
    planIndexReferencesV367AndV368:
      archive.plansIndex.includes("Node v367")
      && archive.plansIndex.includes("Node v368")
      && archive.plansIndex.includes("v367-post-minimal-read-only-integration-gate-execution-roadmap.md"),
    archiveIndexReferencesV367:
      archive.archiveIndex.includes("367：credential resolver minimal read-only integration gate execution"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "minimalReadOnlyIntegrationGateExecutionJson") === sourceRoute
      && valueAt(archive.json, "evidenceEndpoints", "minimalReadOnlyIntegrationGateExecutionMarkdown")
      === `${sourceRoute}?format=markdown`,
  };
}

function integrationOperatorChecks(input: IntegrationArchiveCheckInput) {
  const { verification, operatorCiCheck } = input;
  return {
    archiveVerificationDoesNotRerunProbe: !verification.rerunsLiveProbe,
    operatorCiCheckUsesFocusedCommands:
      operatorCiCheck.focusedTestCommand.includes("GateExecutionArchiveVerification.test.ts")
      && operatorCiCheck.groupedTestCommand.includes("GateExecution.test.ts")
      && operatorCiCheck.buildCommand === "npm.cmd run build",
    operatorCiCheckKeepsReadWindowExplicit:
      operatorCiCheck.requiresExternalReadWindowForActualProbe && !operatorCiCheck.rerunsJavaMiniKvNow,
    operatorCiCheckAvoidsLargeTestBatch:
      operatorCiCheck.avoidsFullTestBatchByDefault && operatorCiCheck.splitsVerificationIntoFocusedSteps,
  };
}

function integrationBoundaryChecks(input: IntegrationArchiveCheckInput) {
  const { config, archive, verification, operatorCiCheck } = input;
  return {
    noAutomaticUpstreamStart:
      !verification.startsUpstreamServices
      && !operatorCiCheck.automaticUpstreamStart
      && valueAt(archive.json, "startsJavaService") === false
      && valueAt(archive.json, "startsMiniKvService") === false,
    noUpstreamMutation:
      !verification.writesUpstreamState
      && valueAt(archive.json, "mutatesJavaState") === false
      && valueAt(archive.json, "mutatesMiniKvState") === false,
    noManagedAuditConnection:
      !verification.opensManagedAuditConnection
      && !config.upstreamActionsEnabled
      && valueAt(archive.json, "connectsManagedAudit") === false
      && valueAt(archive.json, "sendsManagedAuditHttpTcp") === false,
    noCredentialValueRequestedOrRead:
      valueAt(archive.json, "credentialValueRequested") === false
      && valueAt(archive.json, "credentialValueRead") === false,
    noRawEndpointUrlRequestedOrParsed:
      valueAt(archive.json, "rawEndpointUrlRequested") === false
      && valueAt(archive.json, "rawEndpointUrlParsed") === false,
    noProviderClientInstantiated:
      valueAt(archive.json, "secretProviderInstantiated") === false
      && valueAt(archive.json, "resolverClientInstantiated") === false,
    noRuntimeShellImplementedOrInvoked:
      valueAt(archive.json, "runtimeShellImplemented") === false
      && valueAt(archive.json, "runtimeShellInvocationAllowed") === false,
    noJavaMiniKvFixRequired:
      !verification.requestsJavaMiniKvEcho
      && valueAt(archive.json, "requiresParallelJavaMiniKvReadContractFix") === false,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    operatorCiCheckDigestStable: isDigest(operatorCiCheck.checkDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification: false,
  };
}

function expectedEvery(expected: readonly string[], actual: readonly string[]): boolean {
  return expected.every((value) => actual.includes(value));
}
