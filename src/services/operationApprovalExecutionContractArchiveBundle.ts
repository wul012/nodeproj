import crypto from "node:crypto";

import type {
  OperationApprovalExecutionGateArchiveRecord,
  OperationApprovalExecutionGateArchiveVerification,
} from "./operationApprovalExecutionGateArchive.js";

export type OperationApprovalExecutionContractArchiveReferenceName =
  | "execution-gate-archive-record"
  | "execution-gate-preview"
  | "approval-handoff-bundle"
  | "archive-verification"
  | "java-execution-contract"
  | "mini-kv-checkjson-contract";

export interface OperationApprovalExecutionContractArchiveDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalExecutionContractReferenceDigest {
  algorithm: "sha256" | "fnv1a64";
  value: string;
}

export interface OperationApprovalExecutionContractArchiveReference {
  name: OperationApprovalExecutionContractArchiveReferenceName;
  applicable: boolean;
  present: boolean;
  valid: boolean;
  source: string;
  digest: OperationApprovalExecutionContractReferenceDigest;
  fields: string[];
  details: Record<string, unknown>;
}

export interface OperationApprovalExecutionContractArchiveBundle {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  archiveId: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalExecutionGateArchiveRecord["state"];
  previewOnly: true;
  executionAllowed: false;
  bundleDigest: OperationApprovalExecutionContractArchiveDigest;
  summary: {
    action: OperationApprovalExecutionGateArchiveRecord["summary"]["action"];
    target: OperationApprovalExecutionGateArchiveRecord["summary"]["target"];
    archiveVerificationValid: boolean;
    archiveDigest: OperationApprovalExecutionContractReferenceDigest;
    gateDigest: OperationApprovalExecutionContractReferenceDigest;
    handoffBundleDigest: OperationApprovalExecutionContractReferenceDigest;
    archiveVerificationDigest: OperationApprovalExecutionContractReferenceDigest;
    javaExecutionContractStatus: OperationApprovalExecutionGateArchiveRecord["summary"]["javaExecutionContractStatus"];
    javaContractVersion?: string;
    javaContractDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    javaDigestVerificationMode?: string;
    miniKvExecutionContractStatus: OperationApprovalExecutionGateArchiveRecord["summary"]["miniKvExecutionContractStatus"];
    miniKvCommandDigest?: string;
    miniKvCheckReadOnly?: boolean;
    miniKvCheckExecutionAllowed?: boolean;
    miniKvCheckDurability?: string;
    applicableReferenceCount: number;
    missingReferenceCount: number;
    invalidReferenceCount: number;
  };
  references: OperationApprovalExecutionContractArchiveReference[];
  archive: OperationApprovalExecutionGateArchiveRecord;
  archiveVerification: OperationApprovalExecutionGateArchiveVerification;
  nextActions: string[];
}

const BUNDLE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "archiveId",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "previewOnly",
  "executionAllowed",
  "summary",
  "references",
  "archiveDigest",
  "archiveVerificationDigest",
  "nextActions",
]);

const ARCHIVE_VERIFICATION_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "archiveId",
  "sequence",
  "valid",
  "storedArchiveDigest",
  "recomputedArchiveDigest",
  "storedGateDigest",
  "archivedPreviewGateDigest",
  "storedBundleDigest",
  "archivedPreviewBundleDigest",
  "checks",
  "summary",
  "nextActions",
]);

export function createOperationApprovalExecutionContractArchiveBundle(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractArchiveBundle {
  const archiveVerificationDigest = digestOperationApprovalExecutionGateArchiveVerification(archiveVerification);
  const references = createReferences(archive, archiveVerification, archiveVerificationDigest);
  const summary = summarizeBundle(archive, archiveVerification, archiveVerificationDigest, references);
  const nextActions = collectNextActions(summary);
  const bundleWithoutDigest = {
    service: "orderops-node" as const,
    title: `Execution contract archive bundle for ${archive.summary.action}`,
    generatedAt: new Date().toISOString(),
    archiveId: archive.archiveId,
    requestId: archive.requestId,
    ...(archive.decisionId === undefined ? {} : { decisionId: archive.decisionId }),
    intentId: archive.intentId,
    state: archive.state,
    previewOnly: true as const,
    executionAllowed: false as const,
    summary,
    references,
    archive,
    archiveVerification,
    nextActions,
  };

  return {
    ...bundleWithoutDigest,
    bundleDigest: digestOperationApprovalExecutionContractArchiveBundle(bundleWithoutDigest),
  };
}

export function renderOperationApprovalExecutionContractArchiveBundleMarkdown(
  bundle: OperationApprovalExecutionContractArchiveBundle,
): string {
  return [
    "# Operation approval execution contract archive bundle",
    "",
    `- Service: ${bundle.service}`,
    `- Generated at: ${bundle.generatedAt}`,
    `- Archive id: ${bundle.archiveId}`,
    `- Request id: ${bundle.requestId}`,
    `- Decision id: ${bundle.decisionId ?? "missing"}`,
    `- Intent id: ${bundle.intentId}`,
    `- State: ${bundle.state}`,
    `- Preview only: ${bundle.previewOnly}`,
    `- Execution allowed: ${bundle.executionAllowed}`,
    `- Bundle digest: ${bundle.bundleDigest.algorithm}:${bundle.bundleDigest.value}`,
    "",
    "## Reference Chain",
    "",
    `- Archive digest: ${renderDigest(bundle.summary.archiveDigest)}`,
    `- Gate digest: ${renderDigest(bundle.summary.gateDigest)}`,
    `- Handoff bundle digest: ${renderDigest(bundle.summary.handoffBundleDigest)}`,
    `- Archive verification digest: ${renderDigest(bundle.summary.archiveVerificationDigest)}`,
    "",
    "## Execution Contracts",
    "",
    `- Java execution contract: ${bundle.summary.javaExecutionContractStatus}`,
    `- Java contract version: ${bundle.summary.javaContractVersion ?? "unknown"}`,
    `- Java contract digest: ${bundle.summary.javaContractDigest ?? "unknown"}`,
    `- Java replay preconditions satisfied: ${bundle.summary.javaReplayPreconditionsSatisfied === undefined ? "unknown" : bundle.summary.javaReplayPreconditionsSatisfied}`,
    `- Java digest verification mode: ${bundle.summary.javaDigestVerificationMode ?? "unknown"}`,
    `- mini-kv CHECKJSON contract: ${bundle.summary.miniKvExecutionContractStatus}`,
    `- mini-kv command digest: ${bundle.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv CHECKJSON read_only: ${bundle.summary.miniKvCheckReadOnly === undefined ? "unknown" : bundle.summary.miniKvCheckReadOnly}`,
    `- mini-kv CHECKJSON execution_allowed: ${bundle.summary.miniKvCheckExecutionAllowed === undefined ? "unknown" : bundle.summary.miniKvCheckExecutionAllowed}`,
    `- mini-kv CHECKJSON durability: ${bundle.summary.miniKvCheckDurability ?? "unknown"}`,
    "",
    "## Reference Checks",
    "",
    `- Archive verification valid: ${bundle.summary.archiveVerificationValid}`,
    `- Applicable reference count: ${bundle.summary.applicableReferenceCount}`,
    `- Missing reference count: ${bundle.summary.missingReferenceCount}`,
    `- Invalid reference count: ${bundle.summary.invalidReferenceCount}`,
    "",
    "## References",
    "",
    ...renderReferences(bundle.references),
    "",
    "## Next Actions",
    "",
    ...renderList(bundle.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createReferences(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
  archiveVerificationDigest: OperationApprovalExecutionContractArchiveDigest,
): OperationApprovalExecutionContractArchiveReference[] {
  const javaApplicable = archive.summary.target === "order-platform"
    && archive.summary.action === "failed-event-replay-simulation";
  const javaDigest = parseDigestToken(archive.summary.javaContractDigest);
  const miniKvApplicable = archive.summary.target === "mini-kv";
  const miniKvContractDigest = digestReferenceSnapshot({
    commandDigest: archive.summary.miniKvCommandDigest ?? null,
    readOnly: archive.summary.miniKvCheckReadOnly ?? null,
    executionAllowed: archive.summary.miniKvCheckExecutionAllowed ?? null,
    durability: archive.summary.miniKvCheckDurability ?? null,
  });

  return [
    {
      name: "execution-gate-archive-record",
      applicable: true,
      present: true,
      valid: archive.archiveDigest.value === archiveVerification.storedArchiveDigest.value,
      source: `/api/v1/operation-approval-execution-gate-archives/${archive.archiveId}`,
      digest: digestRef(archive.archiveDigest),
      fields: ["archiveDigest", "requestId", "decisionId", "intentId", "summary"],
      details: {
        archiveDigestValid: archiveVerification.checks.archiveDigestValid,
        sequence: archive.sequence,
      },
    },
    {
      name: "execution-gate-preview",
      applicable: true,
      present: true,
      valid: archiveVerification.checks.gateDigestMatchesPreview,
      source: `${archive.archiveId}#preview`,
      digest: digestRef(archive.gateDigest),
      fields: ["gateDigest", "preview.gateDigest", "gateChecks"],
      details: {
        archivedPreviewGateDigest: renderDigest(digestRef(archive.preview.gateDigest)),
      },
    },
    {
      name: "approval-handoff-bundle",
      applicable: true,
      present: true,
      valid: archiveVerification.checks.bundleDigestMatchesPreview,
      source: `${archive.archiveId}#preview.bundleDigest`,
      digest: digestRef(archive.bundleDigest),
      fields: ["bundleDigest", "preview.bundleDigest"],
      details: {
        archivedPreviewBundleDigest: renderDigest(digestRef(archive.preview.bundleDigest)),
      },
    },
    {
      name: "archive-verification",
      applicable: true,
      present: true,
      valid: archiveVerification.valid,
      source: `/api/v1/operation-approval-execution-gate-archives/${archive.archiveId}/verification`,
      digest: digestRef(archiveVerificationDigest),
      fields: ["storedArchiveDigest", "recomputedArchiveDigest", "checks", "summary"],
      details: {
        valid: archiveVerification.valid,
        checkedAt: archiveVerification.verifiedAt,
      },
    },
    {
      name: "java-execution-contract",
      applicable: javaApplicable,
      present: javaApplicable && javaDigest !== undefined && archive.summary.javaExecutionContractStatus === "available",
      valid: !javaApplicable || (
        javaDigest !== undefined
        && archive.gateChecks.javaExecutionContractEvidenceValid
        && archive.gateChecks.javaReplayPreconditionsSatisfiedOk
      ),
      source: `${archive.archiveId}#summary.javaExecutionContract`,
      digest: javaDigest ?? digestReferenceSnapshot({ missing: "java-execution-contract" }),
      fields: [
        "javaExecutionContractStatus",
        "javaContractVersion",
        "javaContractDigest",
        "javaReplayPreconditionsSatisfied",
        "javaDigestVerificationMode",
      ],
      details: {
        contractVersion: archive.summary.javaContractVersion ?? null,
        replayPreconditionsSatisfied: archive.summary.javaReplayPreconditionsSatisfied ?? null,
        digestVerificationMode: archive.summary.javaDigestVerificationMode ?? null,
        gateCheck: archive.gateChecks.javaExecutionContractEvidenceValid,
      },
    },
    {
      name: "mini-kv-checkjson-contract",
      applicable: miniKvApplicable,
      present: miniKvApplicable
        && archive.summary.miniKvExecutionContractStatus === "available"
        && archive.summary.miniKvCommandDigest !== undefined,
      valid: !miniKvApplicable || (
        archive.gateChecks.miniKvExecutionContractEvidenceValid
        && archive.gateChecks.miniKvCheckReadOnlyOk
        && archive.gateChecks.miniKvCheckExecutionAllowedOk
      ),
      source: `${archive.archiveId}#summary.miniKvExecutionContract`,
      digest: miniKvContractDigest,
      fields: [
        "miniKvExecutionContractStatus",
        "miniKvCommandDigest",
        "miniKvCheckReadOnly",
        "miniKvCheckExecutionAllowed",
        "miniKvCheckDurability",
      ],
      details: {
        commandDigest: archive.summary.miniKvCommandDigest ?? null,
        readOnly: archive.summary.miniKvCheckReadOnly ?? null,
        executionAllowed: archive.summary.miniKvCheckExecutionAllowed ?? null,
        durability: archive.summary.miniKvCheckDurability ?? null,
        gateCheck: archive.gateChecks.miniKvExecutionContractEvidenceValid,
      },
    },
  ];
}

function summarizeBundle(
  archive: OperationApprovalExecutionGateArchiveRecord,
  archiveVerification: OperationApprovalExecutionGateArchiveVerification,
  archiveVerificationDigest: OperationApprovalExecutionContractArchiveDigest,
  references: OperationApprovalExecutionContractArchiveReference[],
): OperationApprovalExecutionContractArchiveBundle["summary"] {
  const applicableReferences = references.filter((reference) => reference.applicable);
  return {
    action: archive.summary.action,
    target: archive.summary.target,
    archiveVerificationValid: archiveVerification.valid,
    archiveDigest: digestRef(archive.archiveDigest),
    gateDigest: digestRef(archive.gateDigest),
    handoffBundleDigest: digestRef(archive.bundleDigest),
    archiveVerificationDigest: digestRef(archiveVerificationDigest),
    javaExecutionContractStatus: archive.summary.javaExecutionContractStatus,
    ...(archive.summary.javaContractVersion === undefined ? {} : { javaContractVersion: archive.summary.javaContractVersion }),
    ...(archive.summary.javaContractDigest === undefined ? {} : { javaContractDigest: archive.summary.javaContractDigest }),
    ...(archive.summary.javaReplayPreconditionsSatisfied === undefined ? {} : { javaReplayPreconditionsSatisfied: archive.summary.javaReplayPreconditionsSatisfied }),
    ...(archive.summary.javaDigestVerificationMode === undefined ? {} : { javaDigestVerificationMode: archive.summary.javaDigestVerificationMode }),
    miniKvExecutionContractStatus: archive.summary.miniKvExecutionContractStatus,
    ...(archive.summary.miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest: archive.summary.miniKvCommandDigest }),
    ...(archive.summary.miniKvCheckReadOnly === undefined ? {} : { miniKvCheckReadOnly: archive.summary.miniKvCheckReadOnly }),
    ...(archive.summary.miniKvCheckExecutionAllowed === undefined ? {} : { miniKvCheckExecutionAllowed: archive.summary.miniKvCheckExecutionAllowed }),
    ...(archive.summary.miniKvCheckDurability === undefined ? {} : { miniKvCheckDurability: archive.summary.miniKvCheckDurability }),
    applicableReferenceCount: applicableReferences.length,
    missingReferenceCount: applicableReferences.filter((reference) => !reference.present).length,
    invalidReferenceCount: applicableReferences.filter((reference) => reference.present && !reference.valid).length,
  };
}

function collectNextActions(summary: OperationApprovalExecutionContractArchiveBundle["summary"]): string[] {
  if (!summary.archiveVerificationValid) {
    return ["Archive verification is not valid; regenerate the execution gate preview and archive before relying on this bundle."];
  }
  if (summary.missingReferenceCount > 0 || summary.invalidReferenceCount > 0) {
    return ["Execution contract references are missing or invalid; keep the archive blocked until diagnostics are clean."];
  }
  return [
    "Execution contract archive bundle is ready for release evidence.",
    "Keep this bundle preview-only; orderops-node still does not execute Java replay POST or mini-kv writes.",
  ];
}

function digestOperationApprovalExecutionContractArchiveBundle(
  bundle: Omit<OperationApprovalExecutionContractArchiveBundle, "bundleDigest">,
): OperationApprovalExecutionContractArchiveDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: bundle.service,
        archiveId: bundle.archiveId,
        requestId: bundle.requestId,
        decisionId: bundle.decisionId ?? null,
        intentId: bundle.intentId,
        state: bundle.state,
        previewOnly: bundle.previewOnly,
        executionAllowed: bundle.executionAllowed,
        summary: bundle.summary,
        references: bundle.references,
        archiveDigest: bundle.archive.archiveDigest,
        archiveVerificationDigest: bundle.summary.archiveVerificationDigest,
        nextActions: bundle.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...BUNDLE_DIGEST_COVERED_FIELDS],
  };
}

function digestOperationApprovalExecutionGateArchiveVerification(
  verification: OperationApprovalExecutionGateArchiveVerification,
): OperationApprovalExecutionContractArchiveDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: verification.service,
        archiveId: verification.archiveId,
        sequence: verification.sequence,
        valid: verification.valid,
        storedArchiveDigest: verification.storedArchiveDigest,
        recomputedArchiveDigest: verification.recomputedArchiveDigest,
        storedGateDigest: verification.storedGateDigest,
        archivedPreviewGateDigest: verification.archivedPreviewGateDigest,
        storedBundleDigest: verification.storedBundleDigest,
        archivedPreviewBundleDigest: verification.archivedPreviewBundleDigest,
        checks: verification.checks,
        summary: verification.summary,
        nextActions: verification.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...ARCHIVE_VERIFICATION_DIGEST_COVERED_FIELDS],
  };
}

function digestReferenceSnapshot(value: unknown): OperationApprovalExecutionContractReferenceDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256").update(stableJson(value)).digest("hex"),
  };
}

function digestRef(digest: { algorithm: "sha256"; value: string }): OperationApprovalExecutionContractReferenceDigest {
  return {
    algorithm: digest.algorithm,
    value: digest.value,
  };
}

function parseDigestToken(value: string | undefined): OperationApprovalExecutionContractReferenceDigest | undefined {
  const match = /^(sha256|fnv1a64):([a-f0-9]+)$/i.exec(value ?? "");
  if (match === null || (match[1] !== "sha256" && match[1] !== "fnv1a64")) {
    return undefined;
  }
  return {
    algorithm: match[1],
    value: match[2],
  };
}

function renderReferences(references: OperationApprovalExecutionContractArchiveReference[]): string[] {
  return references.flatMap((reference) => [
    `### ${reference.name}`,
    "",
    `- Applicable: ${reference.applicable}`,
    `- Present: ${reference.present}`,
    `- Valid: ${reference.valid}`,
    `- Source: ${reference.source}`,
    `- Digest: ${renderDigest(reference.digest)}`,
    `- Fields: ${reference.fields.join(", ")}`,
    "",
  ]);
}

function renderDigest(digest: OperationApprovalExecutionContractReferenceDigest): string {
  return `${digest.algorithm}:${digest.value}`;
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
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
