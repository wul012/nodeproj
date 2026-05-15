import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerification,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseAuditTrailRecord,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidenceVerification
} from "./opsPromotionArchiveBundleTypes.js";
import {
  archiveDeploymentApprovalItems,
  archiveDeploymentChangeRecordItems,
  archiveDeploymentExecutionReceiptItems,
  archiveDeploymentExecutionRecordItems,
  archiveHandoffClosureItems,
  archiveHandoffCompletionSteps,
  archiveHandoffPackageAttachments,
  archiveHandoffReceiptMilestones,
  archiveReleaseArchiveItems,
  archiveReleaseAuditTrailItems,
  archiveReleaseEvidenceItems,
} from "./opsPromotionArchiveSteps.js";
import {
  archiveDeploymentApprovalNextActions,
  archiveDeploymentApprovalVerificationNextActions,
  archiveDeploymentChangeRecordNextActions,
  archiveDeploymentChangeRecordVerificationNextActions,
  archiveDeploymentExecutionReceiptNextActions,
  archiveDeploymentExecutionReceiptVerificationNextActions,
  archiveDeploymentExecutionRecordNextActions,
  archiveDeploymentExecutionRecordVerificationNextActions,
  archiveHandoffCertificateNextActions,
  archiveHandoffCertificateVerificationNextActions,
  archiveHandoffClosureNextActions,
  archiveHandoffClosureVerificationNextActions,
  archiveHandoffCompletionNextActions,
  archiveHandoffCompletionReferenceChecksValid,
  archiveHandoffCompletionVerificationNextActions,
  archiveHandoffPackageNextActions,
  archiveHandoffPackageVerificationNextActions,
  archiveHandoffReceiptNextActions,
  archiveHandoffReceiptVerificationNextActions,
  archiveReleaseArchiveNextActions,
  archiveReleaseArchiveVerificationNextActions,
  archiveReleaseAuditTrailNextActions,
  archiveReleaseEvidenceNextActions,
  archiveReleaseEvidenceVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionReleaseEvidence(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
}): OpsPromotionReleaseEvidence {
  const evidenceName = `promotion-release-evidence-${input.completionVerification.recomputedCompletionDigest.value.slice(0, 12)}`;
  const evidenceItems = archiveReleaseEvidenceItems(input.completion, input.completionVerification);
  const closureReferenceValid = input.completionVerification.checks.closureDigestMatches
    && input.completionVerification.checks.verifiedClosureDigestMatches;
  const verification = {
    completionVerified: input.completionVerification.valid,
    completionDigestValid: input.completionVerification.checks.completionDigestValid,
    completionStepsValid: input.completionVerification.checks.completionStepsValid,
    closureReferenceValid,
    closeoutReady: input.completionVerification.summary.closeoutReady,
    completionStepCount: input.completionVerification.summary.completionStepCount,
    evidenceItemCount: evidenceItems.length,
  };
  const valid = input.completion.valid
    && input.completionVerification.valid
    && input.completion.completionDigest.value === input.completionVerification.recomputedCompletionDigest.value
    && evidenceItems.every((item) => item.valid);
  const handoffReady = valid && input.completion.handoffReady && input.completionVerification.handoffReady;
  const nextActions = archiveReleaseEvidenceNextActions(input.completionVerification, valid, handoffReady);
  const digestPayload = archiveReleaseEvidenceDigestPayload({
    evidenceName,
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady,
    completionDigest: input.completion.completionDigest.value,
    verifiedCompletionDigest: input.completionVerification.recomputedCompletionDigest.value,
    closureDigest: input.completion.closureDigest.value,
    verifiedClosureDigest: input.completion.verifiedClosureDigest.value,
    decision: input.completion.decision,
    verification,
    evidenceItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    evidenceName,
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady,
    evidenceDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "completionDigest",
        "verifiedCompletionDigest",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "evidenceItems",
        "nextActions",
      ],
    },
    completionDigest: {
      algorithm: "sha256",
      value: input.completion.completionDigest.value,
    },
    verifiedCompletionDigest: {
      algorithm: "sha256",
      value: input.completionVerification.recomputedCompletionDigest.value,
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.completion.closureDigest.value,
    },
    verifiedClosureDigest: {
      algorithm: "sha256",
      value: input.completion.verifiedClosureDigest.value,
    },
    decision: input.completion.decision,
    verification,
    evidenceItems,
    nextActions,
  };
}

export function createOpsPromotionReleaseEvidenceVerification(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
  evidence: OpsPromotionReleaseEvidence;
}): OpsPromotionReleaseEvidenceVerification {
  const expectedEvidence = createOpsPromotionReleaseEvidence({
    completion: input.completion,
    completionVerification: input.completionVerification,
  });
  const recomputedEvidenceDigest = digestStable(archiveReleaseEvidenceDigestPayload({
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid: input.evidence.valid,
    state: input.evidence.state,
    handoffReady: input.evidence.handoffReady,
    completionDigest: input.evidence.completionDigest.value,
    verifiedCompletionDigest: input.evidence.verifiedCompletionDigest.value,
    closureDigest: input.evidence.closureDigest.value,
    verifiedClosureDigest: input.evidence.verifiedClosureDigest.value,
    decision: input.evidence.decision,
    verification: input.evidence.verification,
    evidenceItems: input.evidence.evidenceItems,
    nextActions: input.evidence.nextActions,
  }));
  const evidenceItemChecks = input.evidence.evidenceItems.map((item) => {
    const expected = expectedEvidence.evidenceItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      evidenceDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    evidenceDigestValid: input.evidence.evidenceDigest.value === recomputedEvidenceDigest,
    coveredFieldsMatch: stableJson(input.evidence.evidenceDigest.coveredFields)
      === stableJson(expectedEvidence.evidenceDigest.coveredFields),
    evidenceItemsValid: evidenceItemChecks.length === expectedEvidence.evidenceItems.length
      && evidenceItemChecks.every((item) => item.valid),
    evidenceNameMatches: input.evidence.evidenceName === expectedEvidence.evidenceName,
    completionNameMatches: input.evidence.completionName === expectedEvidence.completionName,
    closureNameMatches: input.evidence.closureName === expectedEvidence.closureName,
    receiptNameMatches: input.evidence.receiptName === expectedEvidence.receiptName,
    certificateNameMatches: input.evidence.certificateName === expectedEvidence.certificateName,
    packageNameMatches: input.evidence.packageName === expectedEvidence.packageName,
    archiveNameMatches: input.evidence.archiveName === expectedEvidence.archiveName,
    validMatches: input.evidence.valid === expectedEvidence.valid,
    stateMatches: input.evidence.state === expectedEvidence.state,
    handoffReadyMatches: input.evidence.handoffReady === expectedEvidence.handoffReady,
    completionDigestMatches: input.evidence.completionDigest.value === expectedEvidence.completionDigest.value,
    verifiedCompletionDigestMatches: input.evidence.verifiedCompletionDigest.value === expectedEvidence.verifiedCompletionDigest.value,
    closureDigestMatches: input.evidence.closureDigest.value === expectedEvidence.closureDigest.value,
    verifiedClosureDigestMatches: input.evidence.verifiedClosureDigest.value === expectedEvidence.verifiedClosureDigest.value,
    decisionMatches: stableJson(input.evidence.decision) === stableJson(expectedEvidence.decision),
    verificationMatches: stableJson(input.evidence.verification) === stableJson(expectedEvidence.verification),
    nextActionsMatch: stableJson(input.evidence.nextActions) === stableJson(expectedEvidence.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady: input.evidence.handoffReady,
    evidenceDigest: {
      algorithm: "sha256",
      value: input.evidence.evidenceDigest.value,
    },
    recomputedEvidenceDigest: {
      algorithm: "sha256",
      value: recomputedEvidenceDigest,
    },
    checks,
    summary: {
      totalDecisions: input.evidence.decision.totalDecisions,
      latestDecisionId: input.evidence.decision.latestDecisionId,
      evidenceItemCount: evidenceItemChecks.length,
      handoffReady: input.evidence.handoffReady,
      closeoutReady: input.evidence.verification.closeoutReady,
    },
    evidenceItems: evidenceItemChecks,
    nextActions: archiveReleaseEvidenceVerificationNextActions(checks, input.evidence),
  };
}

export function createOpsPromotionReleaseArchive(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
}): OpsPromotionReleaseArchive {
  const releaseArchiveName = `promotion-release-archive-${input.evidenceVerification.recomputedEvidenceDigest.value.slice(0, 12)}`;
  const archiveItems = archiveReleaseArchiveItems(input.evidence, input.evidenceVerification);
  const evidenceReferenceValid = input.evidence.evidenceDigest.value === input.evidenceVerification.recomputedEvidenceDigest.value;
  const verification = {
    evidenceVerified: input.evidenceVerification.valid,
    evidenceDigestValid: input.evidenceVerification.checks.evidenceDigestValid,
    evidenceItemsValid: input.evidenceVerification.checks.evidenceItemsValid,
    evidenceReferenceValid,
    closeoutReady: input.evidenceVerification.summary.closeoutReady,
    evidenceItemCount: input.evidenceVerification.summary.evidenceItemCount,
    archiveItemCount: archiveItems.length,
  };
  const valid = input.evidence.valid
    && input.evidenceVerification.valid
    && evidenceReferenceValid
    && archiveItems.every((item) => item.valid);
  const handoffReady = valid && input.evidence.handoffReady && input.evidenceVerification.handoffReady;
  const nextActions = archiveReleaseArchiveNextActions(input.evidenceVerification, valid, handoffReady);
  const digestPayload = archiveReleaseArchiveDigestPayload({
    releaseArchiveName,
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady,
    evidenceDigest: input.evidence.evidenceDigest.value,
    verifiedEvidenceDigest: input.evidenceVerification.recomputedEvidenceDigest.value,
    completionDigest: input.evidence.completionDigest.value,
    closureDigest: input.evidence.closureDigest.value,
    decision: input.evidence.decision,
    verification,
    archiveItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    releaseArchiveName,
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady,
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "evidenceDigest",
        "verifiedEvidenceDigest",
        "completionDigest",
        "closureDigest",
        "decision",
        "verification",
        "archiveItems",
        "nextActions",
      ],
    },
    evidenceDigest: {
      algorithm: "sha256",
      value: input.evidence.evidenceDigest.value,
    },
    verifiedEvidenceDigest: {
      algorithm: "sha256",
      value: input.evidenceVerification.recomputedEvidenceDigest.value,
    },
    completionDigest: {
      algorithm: "sha256",
      value: input.evidence.completionDigest.value,
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.evidence.closureDigest.value,
    },
    decision: input.evidence.decision,
    verification,
    archiveItems,
    nextActions,
  };
}

export function createOpsPromotionReleaseArchiveVerification(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
  releaseArchive: OpsPromotionReleaseArchive;
}): OpsPromotionReleaseArchiveVerification {
  const expectedReleaseArchive = createOpsPromotionReleaseArchive({
    evidence: input.evidence,
    evidenceVerification: input.evidenceVerification,
  });
  const recomputedReleaseArchiveDigest = digestStable(archiveReleaseArchiveDigestPayload({
    releaseArchiveName: input.releaseArchive.releaseArchiveName,
    evidenceName: input.releaseArchive.evidenceName,
    completionName: input.releaseArchive.completionName,
    closureName: input.releaseArchive.closureName,
    receiptName: input.releaseArchive.receiptName,
    certificateName: input.releaseArchive.certificateName,
    packageName: input.releaseArchive.packageName,
    archiveName: input.releaseArchive.archiveName,
    valid: input.releaseArchive.valid,
    state: input.releaseArchive.state,
    handoffReady: input.releaseArchive.handoffReady,
    evidenceDigest: input.releaseArchive.evidenceDigest.value,
    verifiedEvidenceDigest: input.releaseArchive.verifiedEvidenceDigest.value,
    completionDigest: input.releaseArchive.completionDigest.value,
    closureDigest: input.releaseArchive.closureDigest.value,
    decision: input.releaseArchive.decision,
    verification: input.releaseArchive.verification,
    archiveItems: input.releaseArchive.archiveItems,
    nextActions: input.releaseArchive.nextActions,
  }));
  const archiveItemChecks = input.releaseArchive.archiveItems.map((item) => {
    const expected = expectedReleaseArchive.archiveItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      releaseArchiveDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    releaseArchiveDigestValid: input.releaseArchive.releaseArchiveDigest.value === recomputedReleaseArchiveDigest,
    coveredFieldsMatch: stableJson(input.releaseArchive.releaseArchiveDigest.coveredFields)
      === stableJson(expectedReleaseArchive.releaseArchiveDigest.coveredFields),
    archiveItemsValid: archiveItemChecks.length === expectedReleaseArchive.archiveItems.length
      && archiveItemChecks.every((item) => item.valid),
    releaseArchiveNameMatches: input.releaseArchive.releaseArchiveName === expectedReleaseArchive.releaseArchiveName,
    evidenceNameMatches: input.releaseArchive.evidenceName === expectedReleaseArchive.evidenceName,
    completionNameMatches: input.releaseArchive.completionName === expectedReleaseArchive.completionName,
    closureNameMatches: input.releaseArchive.closureName === expectedReleaseArchive.closureName,
    receiptNameMatches: input.releaseArchive.receiptName === expectedReleaseArchive.receiptName,
    certificateNameMatches: input.releaseArchive.certificateName === expectedReleaseArchive.certificateName,
    packageNameMatches: input.releaseArchive.packageName === expectedReleaseArchive.packageName,
    archiveNameMatches: input.releaseArchive.archiveName === expectedReleaseArchive.archiveName,
    validMatches: input.releaseArchive.valid === expectedReleaseArchive.valid,
    stateMatches: input.releaseArchive.state === expectedReleaseArchive.state,
    handoffReadyMatches: input.releaseArchive.handoffReady === expectedReleaseArchive.handoffReady,
    evidenceDigestMatches: input.releaseArchive.evidenceDigest.value === expectedReleaseArchive.evidenceDigest.value,
    verifiedEvidenceDigestMatches: input.releaseArchive.verifiedEvidenceDigest.value === expectedReleaseArchive.verifiedEvidenceDigest.value,
    completionDigestMatches: input.releaseArchive.completionDigest.value === expectedReleaseArchive.completionDigest.value,
    closureDigestMatches: input.releaseArchive.closureDigest.value === expectedReleaseArchive.closureDigest.value,
    decisionMatches: stableJson(input.releaseArchive.decision) === stableJson(expectedReleaseArchive.decision),
    verificationMatches: stableJson(input.releaseArchive.verification) === stableJson(expectedReleaseArchive.verification),
    nextActionsMatch: stableJson(input.releaseArchive.nextActions) === stableJson(expectedReleaseArchive.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    releaseArchiveName: input.releaseArchive.releaseArchiveName,
    evidenceName: input.releaseArchive.evidenceName,
    completionName: input.releaseArchive.completionName,
    closureName: input.releaseArchive.closureName,
    receiptName: input.releaseArchive.receiptName,
    certificateName: input.releaseArchive.certificateName,
    packageName: input.releaseArchive.packageName,
    archiveName: input.releaseArchive.archiveName,
    valid,
    state: input.releaseArchive.state,
    handoffReady: input.releaseArchive.handoffReady,
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.releaseArchive.releaseArchiveDigest.value,
    },
    recomputedReleaseArchiveDigest: {
      algorithm: "sha256",
      value: recomputedReleaseArchiveDigest,
    },
    checks,
    summary: {
      totalDecisions: input.releaseArchive.decision.totalDecisions,
      latestDecisionId: input.releaseArchive.decision.latestDecisionId,
      archiveItemCount: archiveItemChecks.length,
      handoffReady: input.releaseArchive.handoffReady,
      closeoutReady: input.releaseArchive.verification.closeoutReady,
    },
    archiveItems: archiveItemChecks,
    nextActions: archiveReleaseArchiveVerificationNextActions(checks, input.releaseArchive),
  };
}

function archiveReleaseEvidenceDigestPayload(input: {
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  completionDigest: string;
  verifiedCompletionDigest: string;
  closureDigest: string;
  verifiedClosureDigest: string;
  decision: OpsPromotionReleaseEvidence["decision"];
  verification: OpsPromotionReleaseEvidence["verification"];
  evidenceItems: OpsPromotionReleaseEvidenceItem[];
  nextActions: string[];
}) {
  return {
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    completionDigest: input.completionDigest,
    verifiedCompletionDigest: input.verifiedCompletionDigest,
    closureDigest: input.closureDigest,
    verifiedClosureDigest: input.verifiedClosureDigest,
    decision: input.decision,
    verification: input.verification,
    evidenceItems: input.evidenceItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveReleaseArchiveDigestPayload(input: {
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  evidenceDigest: string;
  verifiedEvidenceDigest: string;
  completionDigest: string;
  closureDigest: string;
  decision: OpsPromotionReleaseArchive["decision"];
  verification: OpsPromotionReleaseArchive["verification"];
  archiveItems: OpsPromotionReleaseArchiveItem[];
  nextActions: string[];
}) {
  return {
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    evidenceDigest: input.evidenceDigest,
    verifiedEvidenceDigest: input.verifiedEvidenceDigest,
    completionDigest: input.completionDigest,
    closureDigest: input.closureDigest,
    decision: input.decision,
    verification: input.verification,
    archiveItems: input.archiveItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

