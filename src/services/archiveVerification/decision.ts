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
  SandboxHandleReviewPacketGateDecisionRecordArchiveReferences,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks,
  SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord,
  SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationTypes.js";

interface DecisionArchiveCheckInput {
  config: AppConfig;
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference;
  refs: SandboxHandleReviewPacketGateDecisionRecordArchiveReferences;
  archive: ParsedArchiveEvidence;
  verification: SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationRecord;
  archiveFiles: readonly ArchiveFileRef[];
  sourceRoute: string;
}

export function createDecisionArchiveChecks(
  input: DecisionArchiveCheckInput,
): SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks {
  return mergeArchiveCheckGroups<SandboxHandleReviewPacketGateDecisionRecordArchiveVerificationChecks>(
    archiveSourceChecks(input),
    decisionRecordChecks(input.source, input.archive),
    sourceDecisionChecks(input.source, input.archive),
    archiveContentChecks(input.source, input.archive),
    archiveDocumentationChecks(input),
    archiveBoundaryChecks(input),
  );
}

function archiveSourceChecks(input: DecisionArchiveCheckInput) {
  const { source, archive } = input;
  return {
    archiveFilesPresent: input.archiveFiles.every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1",
    jsonReadyForV361Verification:
      source.readyForDecisionRecord
      && source.readyForNodeV361ArchiveVerification
      && source.decisionState === "sandbox-handle-review-packet-gate-decision-record-ready"
      && isDigest(source.decisionDigest)
      && isDigest(source.sourceArchiveVerificationDigest)
      && isDigest(source.sourceIntakeDigest),
    jsonDecisionValid:
      source.decision === "advance-to-sandbox-handle-review-prerequisite-closure-review"
      && valueAt(archive.json, "decisionRecord", "decision")
      === "advance-to-sandbox-handle-review-prerequisite-closure-review",
  };
}

function decisionRecordChecks(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    decisionInputsRecorded:
      source.inputCount === 5
      && arrayHasIds(valueAt(archive.json, "decisionInputs"), [
        "node-v359-archive-verification",
        "packet-gate-shape",
        "secret-and-endpoint-material",
        "human-review-authority",
        "future-prerequisite-closure",
      ])
      && decisionInputsAreClosed(valueAt(archive.json, "decisionInputs")),
    decisionRecordRecorded:
      valueAt(archive.json, "decisionRecord", "decisionMode")
      === "sandbox-handle-review-packet-gate-decision-record"
      && valueAt(archive.json, "decisionRecord", "allowsSandboxHandleReviewPrerequisiteClosure") === true
      && valueAt(archive.json, "decisionRecord", "requestsCredentialValue") === false
      && valueAt(archive.json, "decisionRecord", "requestsRawEndpointUrl") === false
      && valueAt(archive.json, "decisionRecord", "instantiatesProviderClient") === false
      && valueAt(archive.json, "decisionRecord", "implementsRuntimeShell") === false
      && valueAt(archive.json, "decisionRecord", "invokesRuntimeShell") === false
      && valueAt(archive.json, "decisionRecord", "opensManagedAuditConnection") === false
      && valueAt(archive.json, "decisionRecord", "startsUpstreamServices") === false
      && valueAt(archive.json, "decisionRecord", "writesUpstreamState") === false
      && valueAt(archive.json, "decisionRecord", "requestsJavaMiniKvEcho") === false
      && valueAt(archive.json, "decisionRecord", "nextNodeVersionSuggested") === "Node v361",
  };
}

function sourceDecisionChecks(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    allChecksPassedInSourceDecisionRecord:
      source.checkCount === 20
      && source.passedCheckCount === 20
      && source.productionBlockerCount === 0
      && allBooleanChecksPass(valueAt(archive.json, "checks"), 20),
    sourceNodeV359ArchiveEvidenceRecorded:
      source.sourceArchiveFileCount === 11
      && source.sourcePresentArchiveFileCount === 11
      && source.sourceCheckCount === 34
      && source.sourcePassedCheckCount === 34
      && source.packetInputCount === 6
      && source.gateOutputCount === 5
      && source.stopConditionCount === 7,
  };
}

function archiveContentChecks(
  source: SourceNodeV360SandboxHandleReviewPacketGateDecisionRecordArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    summaryMatchesJson:
      valueAt(archive.summary, "decisionState") === source.decisionState
      && valueAt(archive.summary, "decision") === source.decision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "inputCount") === source.inputCount
      && valueAt(archive.summary, "packetInputCount") === source.packetInputCount
      && valueAt(archive.summary, "gateOutputCount") === source.gateOutputCount
      && valueAt(archive.summary, "stopConditionCount") === source.stopConditionCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
    markdownRecordsDecisionRecord:
      archive.markdown.includes("Decision state: sandbox-handle-review-packet-gate-decision-record-ready")
      && archive.markdown.includes("Decision: advance-to-sandbox-handle-review-prerequisite-closure-review")
      && archive.markdown.includes("Ready for v361 archive verification: true")
      && archive.markdown.includes("Decision record only: true"),
    markdownRecordsDecisionInputsAndBoundaries:
      archive.markdown.includes("node-v359-archive-verification")
      && archive.markdown.includes("future-prerequisite-closure")
      && archive.markdown.includes("requestsCredentialValue: false")
      && archive.markdown.includes("requestsRawEndpointUrl: false")
      && archive.markdown.includes("opensManagedAuditConnection: false")
      && archive.markdown.includes("nextNodeVersionSuggested: Node v361"),
  };
}

function archiveDocumentationChecks(input: DecisionArchiveCheckInput) {
  const { refs, archive, sourceRoute } = input;
  return {
    browserSnapshotPresent: refs.browserSnapshot.exists && archive.browserSnapshot.includes("Decision"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsDecisionAndBoundary:
      archive.explanation.includes("decisionState")
      && archive.explanation.includes("advance-to-sandbox-handle-review-prerequisite-closure-review")
      && archive.explanation.includes("不读取 credential value")
      && archive.explanation.includes("managed audit HTTP/TCP"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v360")
      && archive.codeWalkthrough.includes("createDecisionInputs")
      && archive.codeWalkthrough.includes("createDecisionRecord")
      && archive.codeWalkthrough.includes("createChecks"),
    sourcePlanPointsToV361:
      archive.sourcePlan.includes("Node v361")
      && archive.sourcePlan.includes("decision record archive verification")
      && archive.sourcePlan.includes("不读取 credential value")
      && archive.sourcePlan.includes("不实例化 provider/client"),
    planIndexReferencesV360AndV361:
      archive.plansIndex.includes("Node v360")
      && archive.plansIndex.includes("Node v361")
      && archive.plansIndex.includes("v360-post-sandbox-handle-review-packet-gate-decision-record-roadmap.md"),
    archiveIndexReferencesV360:
      archive.archiveIndex.includes("360：credential resolver sandbox handle review packet/gate decision record"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPacketGateDecisionRecordJson")
      === sourceRoute
      && valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPacketGateDecisionRecordMarkdown")
      === `${sourceRoute}?format=markdown`,
  };
}

function archiveBoundaryChecks(input: DecisionArchiveCheckInput) {
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
    readyForSandboxHandleReviewPacketGateDecisionRecordArchiveVerification: false,
  };
}

function decisionInputsAreClosed(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).notes !== undefined
    && (entry as Record<string, unknown>).status !== "missing");
}
