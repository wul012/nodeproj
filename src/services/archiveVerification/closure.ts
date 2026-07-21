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
  SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks,
  SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord,
  SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationTypes.js";

interface ClosureArchiveCheckInput {
  config: AppConfig;
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference;
  refs: SandboxHandleReviewPrerequisiteClosureReviewArchiveReferences;
  archive: ParsedArchiveEvidence;
  verification: SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationRecord;
  archiveFiles: readonly ArchiveFileRef[];
  sourceRoute: string;
}

export function createClosureArchiveChecks(
  input: ClosureArchiveCheckInput,
): SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks {
  return mergeArchiveCheckGroups<SandboxHandleReviewPrerequisiteClosureReviewArchiveVerificationChecks>(
    archiveSourceChecks(input),
    closureRecordChecks(input.source, input.archive),
    sourceClosureChecks(input.source, input.archive),
    archiveContentChecks(input.source, input.archive),
    archiveDocumentationChecks(input),
    archiveBoundaryChecks(input),
  );
}

function archiveSourceChecks(input: ClosureArchiveCheckInput) {
  const { source, archive } = input;
  return {
    archiveFilesPresent: input.archiveFiles.every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1",
    jsonReadyForV363Verification:
      source.readyForClosureReview
      && source.readyForNodeV363ArchiveVerification
      && source.reviewState === "sandbox-handle-review-prerequisite-closure-review-ready"
      && isDigest(source.reviewDigest)
      && isDigest(source.sourceArchiveVerificationDigest)
      && isDigest(source.sourceDecisionDigest),
    jsonDecisionValid:
      source.prerequisiteClosureDecision
      === "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review"
      && valueAt(archive.json, "closureReview", "closureDecision")
      === "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
  };
}

function closureRecordChecks(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    closureReviewRecorded:
      valueAt(archive.json, "closureReview", "reviewMode")
      === "sandbox-handle-review-prerequisite-closure-review-only"
      && valueAt(archive.json, "closureReview", "sourceSpan") === "Node v361"
      && valueAt(archive.json, "closureReview", "movedClosureItemId")
      === "sandbox-handle-review-packet-gate-decision-record"
      && valueAt(archive.json, "closureReview", "movedFrom") === "decision-record-complete"
      && valueAt(archive.json, "closureReview", "movedTo") === "decision-record-archive-complete"
      && valueAt(archive.json, "closureReview", "nextNodeVersionSuggested") === "Node v363"
      && valueAt(archive.json, "closureReview", "nextJavaVersionRequested") === null
      && valueAt(archive.json, "closureReview", "nextMiniKvVersionRequested") === null,
    closureItemsRecordedAndClosed:
      source.originalClosureItemCount === 4
      && source.completedClosureItemCount === 4
      && source.remainingClosureItemCount === 0
      && arrayHasIds(valueAt(archive.json, "closureReview", "completedClosureItems"), [
        "managed-audit-disabled-read-only-integration",
        "sandbox-handle-review-prerequisite-intake",
        "sandbox-handle-review-contract-decision",
        "sandbox-handle-review-packet-gate-decision-record",
      ])
      && closureItemsAreClosed(valueAt(archive.json, "closureReview", "completedClosureItems")),
  };
}

function sourceClosureChecks(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    allChecksPassedInSourceClosureReview:
      source.checkCount === 27
      && source.passedCheckCount === 27
      && source.productionBlockerCount === 0
      && allBooleanChecksPass(valueAt(archive.json, "checks"), 27),
    sourceNodeV361ArchiveEvidenceRecorded:
      source.sourceCheckCount === 20
      && source.sourcePassedCheckCount === 20
      && valueAt(archive.json, "sourceNodeV361", "archiveFileCount") === 11
      && valueAt(archive.json, "sourceNodeV361", "presentArchiveFileCount") === 11
      && valueAt(archive.json, "sourceNodeV361", "archiveVerificationState")
      === "sandbox-handle-review-packet-gate-decision-record-archive-verified",
  };
}

function archiveContentChecks(
  source: SourceNodeV362SandboxHandleReviewPrerequisiteClosureReviewArchiveReference,
  archive: ParsedArchiveEvidence,
) {
  return {
    summaryMatchesJson:
      valueAt(archive.summary, "reviewState") === source.reviewState
      && valueAt(archive.summary, "prerequisiteClosureDecision") === source.prerequisiteClosureDecision
      && valueAt(archive.summary, "readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification")
      === source.readyForNodeV363ArchiveVerification
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "completedClosureItemCount") === source.completedClosureItemCount
      && valueAt(archive.summary, "remainingClosureItemCount") === source.remainingClosureItemCount
      && valueAt(archive.summary, "startsJavaService") === false
      && valueAt(archive.summary, "startsMiniKvService") === false
      && valueAt(archive.summary, "sendsManagedAuditHttpTcp") === false,
    markdownRecordsClosureReview:
      archive.markdown.includes("Review state: sandbox-handle-review-prerequisite-closure-review-ready")
      && archive.markdown.includes(
        "Prerequisite closure decision: close-sandbox-handle-review-prerequisite-chain-for-non-executable-review",
      )
      && archive.markdown.includes("Ready for v363 archive verification: true")
      && archive.markdown.includes("Closure review only: true"),
    markdownRecordsClosureItemsAndBoundaries:
      archive.markdown.includes("managed-audit-disabled-read-only-integration")
      && archive.markdown.includes("sandbox-handle-review-packet-gate-decision-record")
      && archive.markdown.includes("opensCredentialValue: false")
      && archive.markdown.includes("opensRawEndpointUrl: false")
      && archive.markdown.includes("opensProviderClient: false")
      && archive.markdown.includes("opensRuntimeShell: false")
      && archive.markdown.includes("opensManagedAuditConnection: false"),
  };
}

function archiveDocumentationChecks(input: ClosureArchiveCheckInput) {
  const { refs, archive, sourceRoute } = input;
  return {
    browserSnapshotPresent: refs.browserSnapshot.exists && archive.browserSnapshot.includes("Prerequisite closure"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsClosureAndBoundary:
      archive.explanation.includes("prerequisiteClosureDecision")
      && archive.explanation.includes("close-sandbox-handle-review-prerequisite-chain-for-non-executable-review")
      && archive.explanation.includes("不读取 credential value")
      && archive.explanation.includes("managed audit HTTP/TCP"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v362")
      && archive.codeWalkthrough.includes("createSourceNodeV361")
      && archive.codeWalkthrough.includes("createClosureReview")
      && archive.codeWalkthrough.includes("createChecks"),
    sourcePlanPointsToV363:
      archive.sourcePlan.includes("Node v363")
      && archive.sourcePlan.includes("archive verification")
      && archive.sourcePlan.includes("不读取 credential value")
      && archive.sourcePlan.includes("不实例化 provider/client"),
    planIndexReferencesV362AndV363:
      archive.plansIndex.includes("Node v362")
      && archive.plansIndex.includes("Node v363")
      && archive.plansIndex.includes("v362-post-sandbox-handle-review-prerequisite-closure-review-roadmap.md"),
    archiveIndexReferencesV362:
      archive.archiveIndex.includes("362：credential resolver sandbox handle review prerequisite closure review"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPrerequisiteClosureReviewJson")
      === sourceRoute
      && valueAt(archive.json, "evidenceEndpoints", "sandboxHandleReviewPrerequisiteClosureReviewMarkdown")
      === `${sourceRoute}?format=markdown`,
  };
}

function archiveBoundaryChecks(input: ClosureArchiveCheckInput) {
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
    readyForSandboxHandleReviewPrerequisiteClosureReviewArchiveVerification: false,
  };
}

function closureItemsAreClosed(value: unknown): boolean {
  return Array.isArray(value) && value.every((entry) =>
    entry !== null
    && typeof entry === "object"
    && !Array.isArray(entry)
    && (entry as Record<string, unknown>).opensCredentialValue === false
    && (entry as Record<string, unknown>).opensRawEndpointUrl === false
    && (entry as Record<string, unknown>).opensProviderClient === false
    && (entry as Record<string, unknown>).opensRuntimeShell === false
    && (entry as Record<string, unknown>).opensManagedAuditConnection === false
    && (entry as Record<string, unknown>).mutatesUpstreamState === false);
}
