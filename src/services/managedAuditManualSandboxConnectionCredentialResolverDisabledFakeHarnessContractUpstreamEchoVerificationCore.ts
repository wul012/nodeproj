import {
  countPassedReportChecks,
  countReportChecks,
} from "./liveProbeReportUtils.js";
import type {
  DisabledFakeHarnessContractUpstreamEchoVerification,
  DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  DisabledFakeHarnessContractUpstreamEchoVerificationMessage,
  DisabledFakeHarnessContractUpstreamEchoVerificationSummary,
  JavaV122V126DisabledFakeHarnessEvidenceReference,
  MiniKvV127DisabledFakeHarnessNonParticipationReference,
  SourceNodeV288DisabledFakeHarnessContractReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export function createEchoVerification(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  verificationDigest: string,
): DisabledFakeHarnessContractUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode:
      "java-v122-v126-plus-mini-kv-v127-disabled-fake-harness-contract-upstream-echo-verification-only",
    sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127",
    sourceNodeV288Ready: checks.sourceNodeV288Ready,
    javaV122V126EvidenceReady: checks.javaV122V126EvidenceReady,
    miniKvV127NonParticipationReady: checks.miniKvV127ReceiptReady,
    contractDigestAlignedWithMiniKv: checks.contractDigestAlignedWithMiniKv,
    javaQualityStopgapApplied: javaV122V126.evidenceServiceCatalogStopgapApplied,
    integrationTestSplitComplete: javaV122V126.integrationTestSplitComplete,
    sideEffectBoundariesAligned: checks.sideEffectBoundaryClosed,
    implementationStillBlocked: true,
    readyForNextDisabledFakeHarnessPlanning:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
  };
}

export function createSummary(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  productionBlockers: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
  warnings: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
  recommendations: DisabledFakeHarnessContractUpstreamEchoVerificationMessage[],
): DisabledFakeHarnessContractUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV122V126.evidenceFiles.filter((file) => file.exists).length
      + miniKvV127.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV122V126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV127.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: sourceNodeV288.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV288.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV288.sourceProductionBlockerCount,
    javaEvidenceFileCount: javaV122V126.evidenceFiles.filter((file) => file.exists).length,
    javaMatchedSnippetCount: javaV122V126.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    javaCompletedVersionCount: javaV122V126.completedVersions.length,
    javaIntegrationTestSplitVersionCount: javaV122V126.integrationTestSplitVersions.length,
    miniKvEvidenceFileCount: miniKvV127.evidenceFiles.filter((file) => file.exists).length,
    miniKvMatchedSnippetCount: miniKvV127.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    miniKvCheckCount: miniKvV127.checkCount,
    miniKvPassedCheckCount: miniKvV127.passedCheckCount,
    requiredInputCount: sourceNodeV288.requiredInputCount,
    allowedOutputCount: sourceNodeV288.allowedOutputCount,
    prohibitedInputCount: sourceNodeV288.prohibitedInputCount,
    requiredArtifactCount: sourceNodeV288.requiredArtifactCount,
    contractAssertionCount: sourceNodeV288.contractAssertionCount,
    prohibitedActionCount: sourceNodeV288.prohibitedActionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
