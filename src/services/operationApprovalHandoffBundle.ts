import crypto from "node:crypto";

import type {
  OperationApprovalEvidenceReport,
  OperationApprovalEvidenceVerification,
} from "./operationApprovalEvidence.js";

export type OperationApprovalHandoffArtifactName =
  | "approval-request"
  | "approval-decision"
  | "approval-evidence-report"
  | "approval-evidence-verification"
  | "upstream-evidence";

export interface OperationApprovalHandoffDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalHandoffArtifact {
  name: OperationApprovalHandoffArtifactName;
  present: boolean;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OperationApprovalHandoffBundle {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalEvidenceReport["state"];
  handoffReady: boolean;
  bundleDigest: OperationApprovalHandoffDigest;
  summary: {
    action: string;
    target: string;
    requestStatus: OperationApprovalEvidenceReport["summary"]["requestStatus"];
    decision: OperationApprovalEvidenceReport["summary"]["decision"];
    verificationValid: boolean;
    upstreamTouched: boolean;
    evidenceDigest: OperationApprovalEvidenceReport["evidenceDigest"];
    storedEvidenceDigest: OperationApprovalEvidenceVerification["storedDigest"];
    recomputedEvidenceDigest: OperationApprovalEvidenceVerification["recomputedDigest"];
    javaApprovalStatus: OperationApprovalEvidenceReport["summary"]["javaApprovalStatus"];
    javaApprovedForReplay?: boolean;
    javaEvidenceVersion?: string;
    javaApprovalDigest?: string;
    javaReplayEligibilityDigest?: string;
    miniKvExplainCoverage: OperationApprovalEvidenceReport["summary"]["miniKvExplainCoverage"];
    miniKvSideEffects: string[];
    miniKvSchemaVersion?: number;
    miniKvCommandDigest?: string;
    miniKvSideEffectCount?: number;
    artifactCount: number;
    missingArtifactCount: number;
    invalidArtifactCount: number;
  };
  artifacts: OperationApprovalHandoffArtifact[];
  report: OperationApprovalEvidenceReport;
  verification: OperationApprovalEvidenceVerification;
  nextActions: string[];
}

const HANDOFF_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "handoffReady",
  "summary",
  "artifacts",
  "reportDigest",
  "verificationChecks",
  "nextActions",
]);

export function createOperationApprovalHandoffBundle(
  report: OperationApprovalEvidenceReport,
  verification: OperationApprovalEvidenceVerification,
): OperationApprovalHandoffBundle {
  const artifacts = createArtifacts(report, verification);
  const handoffReady = verification.valid;
  const summary = summarizeHandoff(report, verification, artifacts);
  const nextActions = collectNextActions(handoffReady, artifacts, report, verification);
  const bundleWithoutDigest = {
    service: "orderops-node" as const,
    title: `Operation approval handoff bundle for ${report.summary.action}`,
    generatedAt: new Date().toISOString(),
    requestId: report.requestId,
    ...(report.decisionId === undefined ? {} : { decisionId: report.decisionId }),
    intentId: report.intentId,
    state: report.state,
    handoffReady,
    summary,
    artifacts,
    report,
    verification,
    nextActions,
  };

  return {
    ...bundleWithoutDigest,
    bundleDigest: digestOperationApprovalHandoffBundle(bundleWithoutDigest),
  };
}

export function renderOperationApprovalHandoffBundleMarkdown(bundle: OperationApprovalHandoffBundle): string {
  return [
    "# Operation approval handoff bundle",
    "",
    `- Service: ${bundle.service}`,
    `- Generated at: ${bundle.generatedAt}`,
    `- Handoff ready: ${bundle.handoffReady}`,
    `- State: ${bundle.state}`,
    `- Request id: ${bundle.requestId}`,
    `- Decision id: ${bundle.decisionId ?? "missing"}`,
    `- Intent id: ${bundle.intentId}`,
    `- Action: ${bundle.summary.action}`,
    `- Target: ${bundle.summary.target}`,
    `- Bundle digest: ${bundle.bundleDigest.algorithm}:${bundle.bundleDigest.value}`,
    "",
    "## Summary",
    "",
    `- Request status: ${bundle.summary.requestStatus}`,
    `- Decision: ${bundle.summary.decision}`,
    `- Verification valid: ${bundle.summary.verificationValid}`,
    `- Upstream touched: ${bundle.summary.upstreamTouched}`,
    `- Evidence digest: ${bundle.summary.evidenceDigest.algorithm}:${bundle.summary.evidenceDigest.value}`,
    `- Stored evidence digest: ${bundle.summary.storedEvidenceDigest.algorithm}:${bundle.summary.storedEvidenceDigest.value}`,
    `- Recomputed evidence digest: ${bundle.summary.recomputedEvidenceDigest.algorithm}:${bundle.summary.recomputedEvidenceDigest.value}`,
    `- Java approval-status: ${bundle.summary.javaApprovalStatus}`,
    `- Java approved for replay: ${bundle.summary.javaApprovedForReplay === undefined ? "unknown" : bundle.summary.javaApprovedForReplay}`,
    `- Java evidence version: ${bundle.summary.javaEvidenceVersion ?? "unknown"}`,
    `- Java approval digest: ${bundle.summary.javaApprovalDigest ?? "unknown"}`,
    `- Java replay eligibility digest: ${bundle.summary.javaReplayEligibilityDigest ?? "unknown"}`,
    `- mini-kv EXPLAINJSON coverage: ${bundle.summary.miniKvExplainCoverage}`,
    `- mini-kv schema version: ${bundle.summary.miniKvSchemaVersion ?? "unknown"}`,
    `- mini-kv command digest: ${bundle.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv side_effect_count: ${bundle.summary.miniKvSideEffectCount ?? "unknown"}`,
    `- Artifact count: ${bundle.summary.artifactCount}`,
    `- Missing artifact count: ${bundle.summary.missingArtifactCount}`,
    `- Invalid artifact count: ${bundle.summary.invalidArtifactCount}`,
    "",
    "## mini-kv side_effects",
    "",
    ...renderList(bundle.summary.miniKvSideEffects, "No mini-kv side_effects reported."),
    "",
    "## Artifacts",
    "",
    ...renderArtifacts(bundle.artifacts),
    "",
    "## Verification Checks",
    "",
    `- Digest valid: ${bundle.verification.checks.digestValid}`,
    `- Request matches: ${bundle.verification.checks.requestMatches}`,
    `- Decision present: ${bundle.verification.checks.decisionPresent}`,
    `- Decision matches request: ${bundle.verification.checks.decisionMatchesRequest}`,
    `- Request preview digest valid: ${bundle.verification.checks.requestPreviewDigestValid}`,
    `- Decision digest valid: ${bundle.verification.checks.decisionDigestValid}`,
    `- Summary matches: ${bundle.verification.checks.summaryMatches}`,
    `- Upstream evidence matches summary: ${bundle.verification.checks.upstreamEvidenceMatchesSummary}`,
    `- Java approval digest evidence valid: ${bundle.verification.checks.javaApprovalDigestEvidenceValid}`,
    `- mini-kv command digest evidence valid: ${bundle.verification.checks.miniKvCommandDigestEvidenceValid}`,
    `- mini-kv side_effect_count matches: ${bundle.verification.checks.miniKvSideEffectCountMatches}`,
    `- Next actions match: ${bundle.verification.checks.nextActionsMatch}`,
    `- Upstream untouched: ${bundle.verification.checks.upstreamUntouched}`,
    "",
    "## Next Actions",
    "",
    ...renderList(bundle.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createArtifacts(
  report: OperationApprovalEvidenceReport,
  verification: OperationApprovalEvidenceVerification,
): OperationApprovalHandoffArtifact[] {
  return [
    {
      name: "approval-request",
      present: true,
      valid: verification.checks.requestMatches && verification.checks.requestPreviewDigestValid,
      source: `/api/v1/operation-approval-requests/${report.requestId}`,
      digest: {
        algorithm: "sha256",
        value: report.request.previewDigest.value,
      },
    },
    {
      name: "approval-decision",
      present: report.decision !== undefined,
      valid: verification.checks.decisionPresent
        && verification.checks.decisionMatchesRequest
        && verification.checks.decisionDigestValid,
      source: report.decisionId === undefined
        ? "/api/v1/operation-approval-decisions/:decisionId"
        : `/api/v1/operation-approval-decisions/${report.decisionId}`,
      digest: {
        algorithm: "sha256",
        value: report.decision?.decisionDigest.value ?? digestStable({ present: false, requestId: report.requestId }),
      },
    },
    {
      name: "approval-evidence-report",
      present: true,
      valid: verification.checks.digestValid
        && verification.checks.summaryMatches
        && verification.checks.nextActionsMatch,
      source: `/api/v1/operation-approval-requests/${report.requestId}/evidence`,
      digest: {
        algorithm: "sha256",
        value: report.evidenceDigest.value,
      },
    },
    {
      name: "approval-evidence-verification",
      present: true,
      valid: verification.valid,
      source: `/api/v1/operation-approval-requests/${report.requestId}/verification`,
      digest: {
        algorithm: "sha256",
        value: digestStable({
          requestId: verification.requestId,
          decisionId: verification.decisionId ?? null,
          state: verification.state,
          valid: verification.valid,
          checks: verification.checks,
          storedDigest: verification.storedDigest,
          recomputedDigest: verification.recomputedDigest,
        }),
      },
    },
    {
      name: "upstream-evidence",
      present: true,
      valid: verification.checks.upstreamEvidenceMatchesSummary,
      source: `/api/v1/operation-approval-requests/${report.requestId}/evidence#upstreamEvidence`,
      digest: {
        algorithm: "sha256",
        value: digestStable(report.upstreamEvidence),
      },
    },
  ];
}

function summarizeHandoff(
  report: OperationApprovalEvidenceReport,
  verification: OperationApprovalEvidenceVerification,
  artifacts: OperationApprovalHandoffArtifact[],
): OperationApprovalHandoffBundle["summary"] {
  const invalidArtifactCount = artifacts.filter((artifact) => !artifact.valid).length;
  const missingArtifactCount = artifacts.filter((artifact) => !artifact.present).length;
  return {
    action: report.summary.action,
    target: report.summary.target,
    requestStatus: report.summary.requestStatus,
    decision: report.summary.decision,
    verificationValid: verification.valid,
    upstreamTouched: report.summary.upstreamTouched,
    evidenceDigest: structuredClone(report.evidenceDigest),
    storedEvidenceDigest: structuredClone(verification.storedDigest),
    recomputedEvidenceDigest: structuredClone(verification.recomputedDigest),
    javaApprovalStatus: report.summary.javaApprovalStatus,
    ...(report.summary.javaApprovedForReplay === undefined ? {} : { javaApprovedForReplay: report.summary.javaApprovedForReplay }),
    ...(report.summary.javaEvidenceVersion === undefined ? {} : { javaEvidenceVersion: report.summary.javaEvidenceVersion }),
    ...(report.summary.javaApprovalDigest === undefined ? {} : { javaApprovalDigest: report.summary.javaApprovalDigest }),
    ...(report.summary.javaReplayEligibilityDigest === undefined ? {} : { javaReplayEligibilityDigest: report.summary.javaReplayEligibilityDigest }),
    miniKvExplainCoverage: report.summary.miniKvExplainCoverage,
    miniKvSideEffects: [...report.summary.miniKvSideEffects],
    ...(report.summary.miniKvSchemaVersion === undefined ? {} : { miniKvSchemaVersion: report.summary.miniKvSchemaVersion }),
    ...(report.summary.miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest: report.summary.miniKvCommandDigest }),
    ...(report.summary.miniKvSideEffectCount === undefined ? {} : { miniKvSideEffectCount: report.summary.miniKvSideEffectCount }),
    artifactCount: artifacts.length,
    missingArtifactCount,
    invalidArtifactCount,
  };
}

function collectNextActions(
  handoffReady: boolean,
  artifacts: OperationApprovalHandoffArtifact[],
  report: OperationApprovalEvidenceReport,
  verification: OperationApprovalEvidenceVerification,
): string[] {
  if (!verification.valid) {
    return verification.nextActions;
  }

  const missing = artifacts.filter((artifact) => !artifact.present).map((artifact) => artifact.name);
  if (missing.length > 0) {
    return [`Complete missing handoff artifacts before archiving: ${missing.join(", ")}`];
  }

  const invalid = artifacts.filter((artifact) => !artifact.valid).map((artifact) => artifact.name);
  if (invalid.length > 0) {
    return [`Regenerate invalid handoff artifacts before archiving: ${invalid.join(", ")}`];
  }

  if (handoffReady && report.state === "approved") {
    return ["Approval handoff bundle is ready; archive it before moving toward execution gate preview."];
  }

  return ["Approval handoff bundle is internally consistent; keep it with the blocked or rejected operation record."];
}

function digestOperationApprovalHandoffBundle(
  bundle: Omit<OperationApprovalHandoffBundle, "bundleDigest">,
): OperationApprovalHandoffDigest {
  return {
    algorithm: "sha256",
    value: digestStable({
      service: bundle.service,
      requestId: bundle.requestId,
      decisionId: bundle.decisionId ?? null,
      intentId: bundle.intentId,
      state: bundle.state,
      handoffReady: bundle.handoffReady,
      summary: bundle.summary,
      artifacts: bundle.artifacts,
      reportDigest: bundle.report.evidenceDigest,
      verificationChecks: bundle.verification.checks,
      nextActions: bundle.nextActions,
    }),
    coveredFields: [...HANDOFF_DIGEST_COVERED_FIELDS],
  };
}

function renderArtifacts(artifacts: OperationApprovalHandoffArtifact[]): string[] {
  return artifacts.flatMap((artifact) => [
    `### ${artifact.name}`,
    "",
    `- Present: ${artifact.present}`,
    `- Valid: ${artifact.valid}`,
    `- Source: ${artifact.source}`,
    `- Digest: ${artifact.digest.algorithm}:${artifact.digest.value}`,
    "",
  ]);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function digestStable(value: unknown): string {
  return crypto.createHash("sha256").update(stableJson(value)).digest("hex");
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
