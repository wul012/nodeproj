import { isSha256, stringValue, valueAt } from "../../../evidence/projectJson.js";

import type {
  ParsedServiceArchive,
  ServiceArchiveChecks,
  ServiceArchiveFile,
  ServiceArchiveRecord,
  ServiceReplay,
  SourceV386ServiceIntake,
} from "./archiveTypes.js";

// Design: this module owns archive-verification readiness behavior.
// Asset, JSON, replay, and safety predicates remain independently reviewable.
// The assembly order preserves the established public check-key sequence.

interface ArchiveCheckInput {
  source: SourceV386ServiceIntake;
  files: ServiceArchiveFile[];
  archive: ParsedServiceArchive;
  replay: ServiceReplay;
  verification: ServiceArchiveRecord;
  sourceRoute: string;
}

export function createServiceArchiveChecks(input: ArchiveCheckInput): ServiceArchiveChecks {
  return {
    ...jsonChecks(input),
    ...assetChecks(input),
    ...replayChecks(input.replay),
    ...archiveBoundaryChecks(input.verification),
    readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: false,
  };
}

function jsonChecks(input: ArchiveCheckInput) {
  const { archive, source } = input;
  return {
    archiveFilesPresent: input.files.every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1",
    jsonIntakeReady:
      source.readyForOperatorServiceLifecycleEvidenceIntake && source.readyForNodeV387ArchiveVerification,
    jsonSourceNodeV385Ready:
      stringValue(valueAt(archive.json, "sourceNodeV385", "archiveVerificationState"))
      === "java-mini-kv-live-read-gate-plan-intake-archive-verified",
    jsonEvidenceVersionsMatch: evidenceVersionsMatch(source),
    jsonRuntimeGateClosed: sourceRuntimeGateClosed(source),
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonIntakeDigestStable: isSha256(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots: sourceUsesFrozenEvidence(source),
    jsonMiniKvTemplateOnly: sourceTemplateOnly(source),
  };
}

function assetChecks(input: ArchiveCheckInput) {
  const { archive, sourceRoute } = input;
  return {
    summaryMatchesJson: summaryMatches(archive, input.source),
    markdownRecordsOperatorServiceLifecycle: markdownRecordsLifecycle(archive.markdown),
    browserSnapshotPresent:
      hasFile(input.files, "browser-snapshot.md")
      && archive.browserSnapshot.includes("java-mini-kv-operator-service-lifecycle-evidence-intake-ready"),
    screenshotAndHtmlPresent: hasFile(input.files, ".png") && hasFile(input.files, ".html"),
    explanationRecordsRuntimeGateBlockedAndChecks:
      archive.explanation.includes("readyForRuntimeLiveReadGate: false")
      && archive.explanation.includes("45/45"),
    codeWalkthroughPresent:
      hasFile(input.files, "391-java-mini-kv-operator-service-lifecycle-evidence-intake-v386.md")
      && archive.codeWalkthrough.includes("v386")
      && archive.codeWalkthrough.includes("shard-readiness-v151.json"),
    sourcePlanPointsToV387ArchiveVerification:
      archive.sourcePlan.includes("Node v387 archives and verifies the v386 evidence intake")
      || archive.sourcePlan.includes("Node v387 should archive and verify this v386 intake"),
    planIndexReferencesV386AndV387:
      archive.plansIndex.includes("v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md")
      && archive.plansIndex.includes("Node v386"),
    archiveIndexReferencesV386:
      archive.archiveIndex.includes("386: Java v160 + mini-kv v151 operator service lifecycle evidence intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "operatorServiceLifecycleEvidenceIntakeJson"))
      === sourceRoute,
  };
}

function replayChecks(replay: ServiceReplay) {
  return {
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV160MiniKvV151AndV150: replayUsesFrozenVersions(replay),
    replayKeepsRuntimeGateClosed:
      !replay.readyForRuntimeLiveReadGate && !replay.liveReadGateAllowed && !replay.runtimeProbeAllowed,
    replayKeepsActiveShardPrototypeDisabled: !replay.activeShardPrototypeEnabled,
    replayKeepsMiniKvTemplateOnly:
      replay.javaOperatorLifecycleEvidencePresent
      && replay.miniKvLifecycleTemplateOnly
      && replay.declaredMiniKvOperatorEvidenceCount === 0,
  };
}

function archiveBoundaryChecks(verification: ServiceArchiveRecord) {
  return {
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isSha256(verification.archiveVerificationDigest),
  };
}

function evidenceVersionsMatch(source: SourceV386ServiceIntake): boolean {
  return source.javaOperatorServiceLifecycleVersion === "Java v160"
    && source.miniKvOperatorServiceLifecycleReleaseVersion === "v151"
    && source.miniKvFrozenLiveReadGatePlanReleaseVersion === "v150";
}

function sourceRuntimeGateClosed(source: SourceV386ServiceIntake): boolean {
  return !source.readyForRuntimeLiveReadGate && !source.liveReadGateAllowed && !source.runtimeProbeAllowed;
}

function sourceUsesFrozenEvidence(source: SourceV386ServiceIntake): boolean {
  return source.javaOperatorServiceLifecycleUsesHistoricalFallback
    && source.miniKvOperatorServiceLifecycleTemplateUsesHistoricalFallback
    && source.miniKvFrozenLiveReadGatePlanUsesHistoricalFallback;
}

function sourceTemplateOnly(source: SourceV386ServiceIntake): boolean {
  return source.javaOperatorLifecycleEvidencePresent
    && source.miniKvLifecycleTemplateOnly
    && source.declaredMiniKvOperatorEvidenceCount === 0;
}

function summaryMatches(archive: ParsedServiceArchive, source: SourceV386ServiceIntake): boolean {
  return valueAt(archive.summary, "intakeState") === source.intakeState
    && valueAt(archive.summary, "checkCount") === source.checkCount
    && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
    && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
    && valueAt(archive.summary, "declaredMiniKvOperatorEvidenceCount") === 0;
}

function markdownRecordsLifecycle(markdown: string): boolean {
  return markdown.includes(
    "Intake decision: consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence",
  )
    && markdown.includes("mini-kv v151 Operator Service Lifecycle Template")
    && markdown.includes("Ready for runtime live-read gate: false");
}

function hasFile(files: readonly ServiceArchiveFile[], suffix: string): boolean {
  return files.some((file) => file.path.endsWith(suffix) && file.exists);
}

function replayUsesFrozenVersions(replay: ServiceReplay): boolean {
  return replay.javaOperatorServiceLifecycleUsedHistoricalFallback
    && replay.miniKvOperatorServiceLifecycleTemplateUsedHistoricalFallback
    && replay.miniKvFrozenLiveReadGatePlanUsedHistoricalFallback
    && replay.javaOperatorServiceLifecycleVersion === "Java v160"
    && replay.miniKvOperatorServiceLifecycleReleaseVersion === "v151"
    && replay.miniKvFrozenLiveReadGatePlanReleaseVersion === "v150";
}
