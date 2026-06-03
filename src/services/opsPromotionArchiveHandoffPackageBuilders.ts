import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerification,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import { archiveHandoffPackageDigestPayload } from "./opsPromotionArchiveHandoffDigestPayloads.js";
import { archiveHandoffPackageAttachments } from "./opsPromotionArchiveSteps.js";
import {
  archiveHandoffPackageNextActions,
  archiveHandoffPackageVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { missingHandoffVerificationDigest } from "./opsPromotionArchiveHandoffVerificationDigests.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionHandoffPackage(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackage {
  const attachments = archiveHandoffPackageAttachments(input);
  const valid = input.attestationVerification.valid && attachments.every((attachment) => attachment.valid);
  const nextActions = archiveHandoffPackageNextActions(input.attestation, input.attestationVerification);
  const packageName = `promotion-handoff-${input.attestation.sealDigest.value.slice(0, 12)}`;
  const digestPayload = archiveHandoffPackageDigestPayload({
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    sealDigest: input.attestation.sealDigest.value,
    manifestDigest: input.manifest.manifestDigest.value,
    verificationDigest: input.attestation.verificationDigest.value,
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "sealDigest",
        "manifestDigest",
        "verificationDigest",
        "summary",
        "attachments",
        "nextActions",
      ],
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.attestation.sealDigest.value,
    },
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: input.attestation.verificationDigest.value,
    },
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  };
}

export function createOpsPromotionHandoffPackageVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
  handoffPackage: OpsPromotionHandoffPackage;
}): OpsPromotionHandoffPackageVerification {
  const expectedPackage = createOpsPromotionHandoffPackage({
    bundle: input.bundle,
    manifest: input.manifest,
    verification: input.verification,
    attestation: input.attestation,
    attestationVerification: input.attestationVerification,
  });
  const recomputedPackageDigest = digestStable(archiveHandoffPackageDigestPayload({
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid: input.handoffPackage.valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    sealDigest: input.handoffPackage.sealDigest.value,
    manifestDigest: input.handoffPackage.manifestDigest.value,
    verificationDigest: input.handoffPackage.verificationDigest.value,
    summary: input.handoffPackage.summary,
    attachments: input.handoffPackage.attachments,
    nextActions: input.handoffPackage.nextActions,
  }));
  const attachmentChecks = input.handoffPackage.attachments.map((attachment) => {
    const expected = expectedPackage.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? missingHandoffVerificationDigest(attachment.name);
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      packageDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
  const checks = {
    packageDigestValid: input.handoffPackage.packageDigest.value === recomputedPackageDigest,
    attachmentsValid: attachmentChecks.length === expectedPackage.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    packageNameMatches: input.handoffPackage.packageName === expectedPackage.packageName,
    archiveNameMatches: input.handoffPackage.archiveName === expectedPackage.archiveName,
    validMatches: input.handoffPackage.valid === expectedPackage.valid,
    stateMatches: input.handoffPackage.state === expectedPackage.state,
    handoffReadyMatches: input.handoffPackage.handoffReady === expectedPackage.handoffReady,
    sealDigestMatches: input.handoffPackage.sealDigest.value === expectedPackage.sealDigest.value,
    manifestDigestMatches: input.handoffPackage.manifestDigest.value === expectedPackage.manifestDigest.value,
    verificationDigestMatches: input.handoffPackage.verificationDigest.value === expectedPackage.verificationDigest.value,
    summaryMatches: stableJson(input.handoffPackage.summary) === stableJson(expectedPackage.summary),
    nextActionsMatch: stableJson(input.handoffPackage.nextActions) === stableJson(expectedPackage.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.packageDigest.value,
    },
    recomputedPackageDigest: {
      algorithm: "sha256",
      value: recomputedPackageDigest,
    },
    checks,
    summary: {
      totalDecisions: input.handoffPackage.summary.totalDecisions,
      latestDecisionId: input.handoffPackage.summary.latestDecisionId,
      attachmentCount: attachmentChecks.length,
      handoffReady: input.handoffPackage.handoffReady,
    },
    attachments: attachmentChecks,
    nextActions: archiveHandoffPackageVerificationNextActions(checks, input.handoffPackage),
  };
}
