import { isSha256, stringValue, valueAt } from "../../../evidence/projectJson.js";

import type {
  DeclaredArchiveChecks,
  DeclaredArchiveFile,
  DeclaredArchiveRecord,
  DeclaredReplay,
  ParsedDeclaredArchive,
  SourceV388DeclaredIntake,
} from "./archiveTypes.js";

// Archive readiness is grouped into JSON, asset, replay, and safety boundaries.
// Each group is data-only and public key order remains byte-compatible.
// Frozen replay may prove evidence consistency, never runtime authorization.
interface ArchiveCheckInput {
  source: SourceV388DeclaredIntake;
  files: DeclaredArchiveFile[];
  archive: ParsedDeclaredArchive;
  replay: DeclaredReplay;
  verification: DeclaredArchiveRecord;
  sourceRoute: string;
}

export function createDeclaredArchiveChecks(input: ArchiveCheckInput): DeclaredArchiveChecks {
  return {
    ...jsonChecks(input),
    ...assetChecks(input),
    ...replayChecks(input.replay),
    ...boundaryChecks(input.verification),
    readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification: false,
  };
}

function jsonChecks(input: ArchiveCheckInput) {
  const { archive, source } = input;
  return {
    archiveFilesPresent: input.files.every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1",
    jsonIntakeReady:
      source.readyForDeclaredOperatorLifecycleEvidenceIntake && source.readyForNodeV389ArchiveVerification,
    jsonSourceNodeV387ArchiveVerified:
      stringValue(valueAt(archive.json, "sourceNodeV387", "archiveVerificationState"))
      === "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
    jsonEvidenceVersionsMatch: evidenceVersionsMatch(source),
    jsonRuntimeGateClosed: sourceRuntimeGateClosed(source),
    jsonRuntimeGateRequiresSeparateApproval: source.runtimeGateRequiresSeparateApproval,
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonIntakeDigestStable: isSha256(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots: sourceUsesFrozenEvidence(source),
    jsonDeclaredOperatorEvidencePresent: sourceHasDeclaredEvidence(source),
  };
}

function assetChecks(input: ArchiveCheckInput) {
  const { archive, files, source, sourceRoute } = input;
  return {
    summaryMatchesJson: summaryMatches(archive, source),
    markdownRecordsDeclaredOperatorLifecycle: markdownRecordsLifecycle(archive.markdown),
    browserSnapshotPresent:
      hasFile(files, "browser-snapshot.md")
      && archive.browserSnapshot.includes("java-mini-kv-declared-operator-lifecycle-evidence-intake-ready"),
    screenshotAndHtmlPresent: hasFile(files, ".png") && hasFile(files, ".html"),
    explanationRecordsRuntimeGateBlockedAndChecks:
      archive.explanation.includes("readyForRuntimeLiveReadGate: false")
      && archive.explanation.includes("45/45"),
    codeWalkthroughPresent:
      hasFile(files, "393-java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.md")
      && archive.codeWalkthrough.includes("v388")
      && archive.codeWalkthrough.includes("shard-readiness-v152.json"),
    sourcePlanPointsToV389ArchiveVerification:
      archive.sourcePlan.includes("Node v389 archives and verifies the v388 declared lifecycle intake")
      || archive.sourcePlan.includes("Node v389 should archive and verify this v388 intake"),
    planIndexReferencesV388AndV389:
      archive.plansIndex.includes("v388-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-roadmap.md")
      && archive.plansIndex.includes(
        "v389-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-roadmap.md",
      ),
    archiveIndexReferencesV388:
      archive.archiveIndex.includes("388: Java v161 + mini-kv v152 declared operator lifecycle evidence intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "declaredOperatorLifecycleEvidenceIntakeJson"))
      === sourceRoute,
  };
}

function replayChecks(replay: DeclaredReplay) {
  return {
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV161MiniKvV152AndV151: replayUsesFrozenVersions(replay),
    replayKeepsRuntimeGateClosed:
      !replay.readyForRuntimeLiveReadGate && !replay.liveReadGateAllowed
      && !replay.runtimeProbeAllowed && replay.runtimeGateRequiresSeparateApproval,
    replayKeepsActiveShardPrototypeDisabled: !replay.activeShardPrototypeEnabled,
    replayKeepsDeclaredOperatorEvidence: replayHasDeclaredEvidence(replay),
  };
}

function boundaryChecks(verification: DeclaredArchiveRecord) {
  return {
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop:
      !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isSha256(verification.archiveVerificationDigest),
  };
}

function evidenceVersionsMatch(source: SourceV388DeclaredIntake): boolean {
  return source.javaDeclaredOperatorLifecycleVersion === "Java v161"
    && source.miniKvDeclaredOperatorLifecycleReleaseVersion === "v152"
    && source.miniKvFrozenOperatorTemplateReleaseVersion === "v151";
}

function sourceRuntimeGateClosed(source: SourceV388DeclaredIntake): boolean {
  return !source.readyForRuntimeLiveReadGate && !source.liveReadGateAllowed && !source.runtimeProbeAllowed;
}

function sourceUsesFrozenEvidence(source: SourceV388DeclaredIntake): boolean {
  return source.javaDeclaredOperatorLifecycleUsesHistoricalFallback
    && source.miniKvDeclaredOperatorLifecycleUsesHistoricalFallback
    && source.miniKvFrozenOperatorTemplateUsesHistoricalFallback;
}

function sourceHasDeclaredEvidence(source: SourceV388DeclaredIntake): boolean {
  return source.declaredOperatorLifecycleEvidencePresent
    && source.declaredOperatorEvidenceSourceCount === 2
    && source.readyEvidenceSourceCount === 3
    && source.miniKvRequiredBeforeRuntimeGateCount === 4;
}

function summaryMatches(
  archive: ParsedDeclaredArchive,
  source: SourceV388DeclaredIntake,
): boolean {
  return valueAt(archive.summary, "intakeState") === source.intakeState
    && valueAt(archive.summary, "checkCount") === source.checkCount
    && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
    && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
    && valueAt(archive.summary, "declaredOperatorEvidenceSourceCount") === 2;
}

function markdownRecordsLifecycle(markdown: string): boolean {
  return markdown.includes(
    "Intake decision: consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence",
  )
    && markdown.includes("mini-kv v152 Declared Operator Lifecycle")
    && markdown.includes("Ready for runtime live-read gate: false");
}

function hasFile(files: readonly DeclaredArchiveFile[], suffix: string): boolean {
  return files.some((file) => file.path.endsWith(suffix) && file.exists);
}

function replayUsesFrozenVersions(replay: DeclaredReplay): boolean {
  return replay.javaDeclaredOperatorLifecycleUsedHistoricalFallback
    && replay.miniKvDeclaredOperatorLifecycleUsedHistoricalFallback
    && replay.miniKvFrozenOperatorTemplateUsedHistoricalFallback
    && replay.javaDeclaredOperatorLifecycleVersion === "Java v161"
    && replay.miniKvDeclaredOperatorLifecycleReleaseVersion === "v152"
    && replay.miniKvFrozenOperatorTemplateReleaseVersion === "v151";
}

function replayHasDeclaredEvidence(replay: DeclaredReplay): boolean {
  return replay.declaredOperatorLifecycleEvidencePresent
    && replay.declaredOperatorEvidenceSourceCount === 2
    && replay.readyEvidenceSourceCount === 3
    && replay.miniKvRequiredBeforeRuntimeGateCount === 4;
}
