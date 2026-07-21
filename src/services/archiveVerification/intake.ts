import type { AppConfig } from "../../config.js";
import {
  allBooleanChecksPass,
  arrayHasIds,
  isDigest,
  mergeArchiveCheckGroups,
  valueAt,
  type ArchiveFileRef,
  type ParsedArchiveEvidence,
} from "./kernel.js";
import type {
  SandboxHandleReviewPacketGateIntakeArchiveReferences,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks,
  SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord,
  SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationTypes.js";

interface IntakeArchiveCheckInput {
  config: AppConfig;
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference;
  refs: SandboxHandleReviewPacketGateIntakeArchiveReferences;
  archive: ParsedArchiveEvidence;
  verification: SandboxHandleReviewPacketGateIntakeArchiveVerificationRecord;
  archiveFiles: readonly ArchiveFileRef[];
  sourceRoute: string;
}

export function createIntakeArchiveChecks(
  input: IntakeArchiveCheckInput,
): SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks {
  return mergeArchiveCheckGroups<SandboxHandleReviewPacketGateIntakeArchiveVerificationChecks>(
    intakeSourceChecks(input),
    intakeShapeChecks(input.source, input.archive),
    intakeSummaryChecks(input.source, input.archive),
    intakeMarkdownChecks(input.archive),
    intakeDocumentationChecks(input),
    intakeBoundaryChecks(input),
  );
}

function intakeSourceChecks(input: IntakeArchiveCheckInput) {
  const { source, archive } = input;
  return {
    archiveFilesPresent: input.archiveFiles.every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1",
    jsonReadyForV359Verification:
      source.readyForPacketGateIntake
      && source.readyForNodeV359ArchiveVerification
      && source.intakeState === "sandbox-handle-review-packet-gate-non-secret-intake-ready"
      && isDigest(source.intakeDigest)
      && isDigest(source.sourceArchiveVerificationDigest),
    jsonIntakeDecisionValid:
      source.intakeDecision === "define-non-secret-sandbox-handle-review-packet-gate"
      && valueAt(archive.json, "intakeRecord", "intakeDecision")
      === "define-non-secret-sandbox-handle-review-packet-gate",
  };
}

function intakeShapeChecks(
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    packetInputsRecorded:
      source.packetInputCount === 6
      && arrayHasIds(valueAt(archive.json, "packetInputs"), [
        "sandbox-handle-reference",
        "allowlist-review-status",
        "credential-handle-binding-status",
        "operator-approval-correlation",
        "source-archive-verification-digest",
        "review-request-purpose",
      ])
      && packetInputsAreNonSecret(valueAt(archive.json, "packetInputs")),
    gateOutputsRecorded:
      source.gateOutputCount === 5
      && arrayHasIds(valueAt(archive.json, "gateOutputs"), [
        "packet-accepted-for-human-review",
        "packet-rejected-missing-non-secret-input",
        "packet-rejected-boundary-violation",
        "packet-held-for-explicit-approval",
        "packet-archive-required",
      ])
      && gateOutputsAreNonSecret(valueAt(archive.json, "gateOutputs")),
    stopConditionsRecorded:
      source.stopConditionCount === 7
      && arrayHasIds(valueAt(archive.json, "stopConditions"), [
        "credential-value-requested",
        "raw-endpoint-url-present",
        "provider-client-required",
        "runtime-shell-required",
        "managed-audit-connection-required",
        "upstream-write-required",
        "missing-archive-verification",
      ])
      && stopConditionsAreClosed(valueAt(archive.json, "stopConditions")),
    allChecksPassedInSourceIntake:
      source.checkCount === 27
      && source.passedCheckCount === 27
      && source.productionBlockerCount === 0
      && allBooleanChecksPass(valueAt(archive.json, "checks"), 27),
    sourceNodeV357ArchiveEvidenceRecorded:
      source.sourceArchiveFileCount === 11
      && source.sourcePresentArchiveFileCount === 11
      && source.sourceCheckCount === 30
      && source.sourcePassedCheckCount === 30,
  };
}

function intakeSummaryChecks(
  source: SourceNodeV358SandboxHandleReviewPacketGateIntakeArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "intakeDecision") === source.intakeDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "packetInputCount") === source.packetInputCount
      && valueAt(archive.summary, "gateOutputCount") === source.gateOutputCount
      && valueAt(archive.summary, "stopConditionCount") === source.stopConditionCount
      && valueAt(archive.summary, "sourceArchiveFileCount") === source.sourceArchiveFileCount
      && valueAt(archive.summary, "sourcePresentArchiveFileCount") === source.sourcePresentArchiveFileCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
  };
}

function intakeMarkdownChecks(archive: ParsedArchiveEvidence) {
  return {
    markdownRecordsPacketGateIntake:
      archive.markdown.includes("Intake state: sandbox-handle-review-packet-gate-non-secret-intake-ready")
      && archive.markdown.includes("Intake decision: define-non-secret-sandbox-handle-review-packet-gate")
      && archive.markdown.includes("Credential value requested: false")
      && archive.markdown.includes("Raw endpoint URL requested: false")
      && archive.markdown.includes("Sends managed audit HTTP/TCP: false"),
    markdownRecordsInputOutputStopConditionCounts:
      archive.markdown.includes("packetInputCount: 6")
      && archive.markdown.includes("gateOutputCount: 5")
      && archive.markdown.includes("stopConditionCount: 7")
      && archive.markdown.includes("source-archive-verification-digest")
      && archive.markdown.includes("packet-archive-required")
      && archive.markdown.includes("managed-audit-connection-required"),
  };
}

function intakeDocumentationChecks(input: IntakeArchiveCheckInput) {
  const { refs, archive, sourceRoute } = input;
  return {
    browserSnapshotPresent: refs.browserSnapshot.exists && archive.browserSnapshot.includes("Intake decision"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsNonSecretBoundary:
      archive.explanation.includes("非 secret")
      && archive.explanation.includes("不读取真实 secret")
      && archive.explanation.includes("sendsManagedAuditHttpTcp=false")
      && archive.explanation.includes("managed audit HTTP/TCP"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v358")
      && archive.codeWalkthrough.includes("createPacketInputs")
      && archive.codeWalkthrough.includes("createGateOutputs")
      && archive.codeWalkthrough.includes("createStopConditions"),
    sourcePlanPointsToV359:
      archive.sourcePlan.includes("Node v359")
      && archive.sourcePlan.includes("archive verification")
      && archive.sourcePlan.includes("6 个 packet inputs")
      && archive.sourcePlan.includes("5 个 gate outputs")
      && archive.sourcePlan.includes("7 个 stop conditions"),
    planIndexReferencesV358AndV359:
      archive.plansIndex.includes("Node v358")
      && archive.plansIndex.includes("Node v359")
      && archive.plansIndex.includes("v358-post-sandbox-handle-review-packet-gate-non-secret-intake-roadmap.md"),
    archiveIndexReferencesV358:
      archive.archiveIndex.includes("358：credential resolver sandbox handle review packet/gate non-secret intake"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPacketGateNonSecretIntakeJson")
      === sourceRoute
      && valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPacketGateNonSecretIntakeMarkdown")
      === `${sourceRoute}?format=markdown`,
  };
}

function intakeBoundaryChecks(input: IntakeArchiveCheckInput) {
  const { config, archive, verification } = input;
  return {
    verificationDoesNotRerunProbe: !verification.rerunsLiveProbe,
    noUpstreamServiceStartedByNode:
      !verification.startsUpstreamServices
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
    noJavaMiniKvEchoRequired:
      !verification.requestsJavaMiniKvEcho
      && valueAt(archive.json, "requiresParallelJavaV153MiniKvV144ReadOnlyEcho") === false,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerification: false,
  };
}

function packetInputsAreNonSecret(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).containsSecretValue === false
    && (entry as Record<string, unknown>).containsRawEndpointUrl === false
    && (entry as Record<string, unknown>).allowsNetworkConnection === false
    && (entry as Record<string, unknown>).allowsRuntimeInvocation === false);
}

function gateOutputsAreNonSecret(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).emitsSecretValue === false
    && (entry as Record<string, unknown>).emitsRawEndpointUrl === false
    && (entry as Record<string, unknown>).opensManagedAuditConnection === false
    && (entry as Record<string, unknown>).invokesRuntimeShell === false
    && (entry as Record<string, unknown>).mutatesUpstreamState === false);
}

function stopConditionsAreClosed(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).effect === "fail-closed"
    && (entry as Record<string, unknown>).credentialValueRead === false
    && (entry as Record<string, unknown>).rawEndpointUrlParsed === false
    && (entry as Record<string, unknown>).managedAuditHttpTcpAllowed === false
    && (entry as Record<string, unknown>).runtimeShellInvocationAllowed === false
    && (entry as Record<string, unknown>).upstreamMutationAllowed === false);
}
