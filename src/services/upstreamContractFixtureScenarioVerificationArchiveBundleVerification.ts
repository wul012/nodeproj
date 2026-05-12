import type { AppConfig } from "../config.js";
import {
  digestUpstreamContractFixtureScenarioMatrixVerification,
  digestUpstreamContractFixtureScenarioVerificationArchiveBundle,
  loadUpstreamContractFixtureScenarioVerificationArchiveBundle,
  type UpstreamContractFixtureScenarioVerificationArchiveBundle,
  type UpstreamContractFixtureScenarioVerificationArchiveBundleDigest,
} from "./upstreamContractFixtureScenarioVerificationArchiveBundle.js";

export interface UpstreamContractFixtureScenarioVerificationArchiveBundleVerification {
  service: "orderops-node";
  title: string;
  verifiedAt: string;
  valid: boolean;
  storedArchiveBundleDigest: UpstreamContractFixtureScenarioVerificationArchiveBundleDigest;
  recomputedArchiveBundleDigest: UpstreamContractFixtureScenarioVerificationArchiveBundleDigest;
  storedVerificationDigest: string;
  recomputedVerificationDigest: string;
  checks: {
    archiveBundleDigestValid: boolean;
    verificationDigestValid: boolean;
    matrixDigestMatchesBundle: boolean;
    recomputedMatrixDigestMatchesBundle: boolean;
    readOnlyStillTrue: boolean;
    executionAllowedStillFalse: boolean;
    sourcePathCountValid: boolean;
    scenarioEvidenceCountValid: boolean;
    scenarioIdsMatchEvidence: boolean;
    noScenarioIssues: boolean;
    bundleValidityConsistent: boolean;
  };
  summary: {
    bundleValid: boolean;
    readOnly: boolean;
    executionAllowed: boolean;
    totalScenarios: number;
    sourcePathCount: number;
    scenarioEvidenceCount: number;
    issueCount: number;
    matrixDigest: string;
    verificationDigest: string;
  };
  evidenceEndpoints: {
    scenarioMatrixJson: string;
    scenarioMatrixVerificationJson: string;
    scenarioMatrixVerificationArchiveBundleJson: string;
    scenarioMatrixVerificationArchiveBundleMarkdown: string;
    scenarioMatrixVerificationArchiveBundleVerificationJson: string;
    scenarioMatrixVerificationArchiveBundleVerificationMarkdown: string;
  };
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  scenarioMatrixJson: "/api/v1/upstream-contract-fixtures/scenario-matrix",
  scenarioMatrixVerificationJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
  scenarioMatrixVerificationArchiveBundleJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
  scenarioMatrixVerificationArchiveBundleMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown",
  scenarioMatrixVerificationArchiveBundleVerificationJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification",
  scenarioMatrixVerificationArchiveBundleVerificationMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification?format=markdown",
});

export async function loadUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioVerificationArchiveBundleVerification> {
  return createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(
    await loadUpstreamContractFixtureScenarioVerificationArchiveBundle(config),
  );
}

export function createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(
  bundle: UpstreamContractFixtureScenarioVerificationArchiveBundle,
): UpstreamContractFixtureScenarioVerificationArchiveBundleVerification {
  const recomputedArchiveBundleDigest = digestUpstreamContractFixtureScenarioVerificationArchiveBundle(stripArchiveBundleDigest(bundle));
  const recomputedVerificationDigest = digestUpstreamContractFixtureScenarioMatrixVerification(bundle.verification);
  const expectedScenarioCount = bundle.scenarioIds.length;
  const sourcePathCount = Object.values(bundle.sourcePaths).filter((sourcePath) => typeof sourcePath === "string" && sourcePath.length > 0).length;
  const scenarioEvidenceIds = bundle.scenarioEvidence.map((scenario) => scenario.scenarioId);
  const checks = {
    archiveBundleDigestValid: bundle.archiveBundleDigest.value === recomputedArchiveBundleDigest.value,
    verificationDigestValid: bundle.digests.verificationDigest === `${recomputedVerificationDigest.algorithm}:${recomputedVerificationDigest.value}`,
    matrixDigestMatchesBundle: bundle.digests.matrixDigest === `${bundle.matrix.matrixDigest.algorithm}:${bundle.matrix.matrixDigest.value}`,
    recomputedMatrixDigestMatchesBundle: bundle.digests.recomputedMatrixDigest === `${bundle.verification.recomputedMatrixDigest.algorithm}:${bundle.verification.recomputedMatrixDigest.value}`,
    readOnlyStillTrue: bundle.readOnly === true,
    executionAllowedStillFalse: bundle.executionAllowed === false,
    sourcePathCountValid: bundle.summary.sourcePathCount === expectedScenarioCount && sourcePathCount === expectedScenarioCount,
    scenarioEvidenceCountValid: bundle.scenarioEvidence.length === expectedScenarioCount,
    scenarioIdsMatchEvidence: bundle.scenarioIds.every((scenarioId) => scenarioEvidenceIds.includes(scenarioId)),
    noScenarioIssues: bundle.summary.issueCount === 0,
    bundleValidityConsistent: bundle.valid === expectedBundleValidity(bundle, sourcePathCount),
  };
  const valid = Object.values(checks).every((check) => check);

  return {
    service: "orderops-node",
    title: "Upstream fixture scenario verification archive bundle verification",
    verifiedAt: new Date().toISOString(),
    valid,
    storedArchiveBundleDigest: bundle.archiveBundleDigest,
    recomputedArchiveBundleDigest,
    storedVerificationDigest: bundle.digests.verificationDigest,
    recomputedVerificationDigest: `${recomputedVerificationDigest.algorithm}:${recomputedVerificationDigest.value}`,
    checks,
    summary: {
      bundleValid: bundle.valid,
      readOnly: bundle.readOnly,
      executionAllowed: bundle.executionAllowed,
      totalScenarios: bundle.summary.totalScenarios,
      sourcePathCount: bundle.summary.sourcePathCount,
      scenarioEvidenceCount: bundle.scenarioEvidence.length,
      issueCount: bundle.summary.issueCount,
      matrixDigest: bundle.digests.matrixDigest,
      verificationDigest: bundle.digests.verificationDigest,
    },
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };
}

export function renderUpstreamContractFixtureScenarioVerificationArchiveBundleVerificationMarkdown(
  verification: UpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
): string {
  return [
    "# Upstream fixture scenario verification archive bundle verification",
    "",
    `- Service: ${verification.service}`,
    `- Verified at: ${verification.verifiedAt}`,
    `- Valid: ${verification.valid}`,
    `- Stored archive bundle digest: ${verification.storedArchiveBundleDigest.algorithm}:${verification.storedArchiveBundleDigest.value}`,
    `- Recomputed archive bundle digest: ${verification.recomputedArchiveBundleDigest.algorithm}:${verification.recomputedArchiveBundleDigest.value}`,
    `- Stored verification digest: ${verification.storedVerificationDigest}`,
    `- Recomputed verification digest: ${verification.recomputedVerificationDigest}`,
    "",
    "## Checks",
    "",
    ...renderEntries(verification.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(verification.summary),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(verification.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function stripArchiveBundleDigest(
  bundle: UpstreamContractFixtureScenarioVerificationArchiveBundle,
): Omit<UpstreamContractFixtureScenarioVerificationArchiveBundle, "archiveBundleDigest"> {
  const { archiveBundleDigest: _archiveBundleDigest, ...withoutDigest } = bundle;
  return withoutDigest;
}

function expectedBundleValidity(
  bundle: UpstreamContractFixtureScenarioVerificationArchiveBundle,
  sourcePathCount: number,
): boolean {
  return bundle.summary.matrixValid
    && bundle.summary.verificationValid
    && bundle.summary.matrixDigestValid
    && bundle.summary.scenarioCountValid
    && bundle.summary.sourcePathsPresent
    && bundle.summary.blockedReplaySemanticsStable
    && bundle.summary.miniKvReadSemanticsStable
    && bundle.summary.issueCount === 0
    && bundle.summary.totalScenarios === bundle.scenarioIds.length
    && bundle.summary.sourcePathCount === bundle.scenarioIds.length
    && sourcePathCount === bundle.scenarioIds.length
    && bundle.readOnly === true
    && bundle.executionAllowed === false;
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Scenario archive bundle verification is clean; archive this report beside the bundle evidence.",
      "Keep this verification read-only and do not treat it as a real upstream execution permit.",
    ];
  }

  return [
    "Resolve archive bundle verification failures before relying on this bundle for release evidence.",
    "Do not auto-repair fixtures and do not execute Java replay or mini-kv write commands from this verification.",
  ];
}

function renderEntries(record: Record<string, unknown>): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
