import type {
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import { archiveHandoffCompletionDigestPayload } from "./opsPromotionArchiveHandoffDigestPayloads.js";
import { archiveHandoffCompletionSteps } from "./opsPromotionArchiveSteps.js";
import {
  archiveHandoffCompletionNextActions,
  archiveHandoffCompletionReferenceChecksValid,
  archiveHandoffCompletionVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { missingHandoffVerificationDigest } from "./opsPromotionArchiveHandoffVerificationDigests.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionHandoffCompletion(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
}): OpsPromotionHandoffCompletion {
  const completionName = `promotion-completion-${input.closureVerification.recomputedClosureDigest.value.slice(0, 12)}`;
  const completionSteps = archiveHandoffCompletionSteps(input.closure, input.closureVerification);
  const referenceChecksValid = archiveHandoffCompletionReferenceChecksValid(input.closureVerification);
  const verification = {
    closureVerified: input.closureVerification.valid,
    closureDigestValid: input.closureVerification.checks.closureDigestValid,
    closureItemsValid: input.closureVerification.checks.closureItemsValid,
    referenceChecksValid,
    closeoutReady: input.closureVerification.handoffReady,
    closureItemCount: input.closureVerification.summary.closureItemCount,
    completionStepCount: completionSteps.length,
  };
  const valid = input.closure.valid
    && input.closureVerification.valid
    && input.closure.closureDigest.value === input.closureVerification.recomputedClosureDigest.value
    && completionSteps.every((step) => step.valid);
  const handoffReady = valid && input.closure.handoffReady && input.closureVerification.handoffReady;
  const nextActions = archiveHandoffCompletionNextActions(input.closureVerification, valid, handoffReady);
  const digestPayload = archiveHandoffCompletionDigestPayload({
    completionName,
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady,
    closureDigest: input.closure.closureDigest.value,
    verifiedClosureDigest: input.closureVerification.recomputedClosureDigest.value,
    decision: input.closure.decision,
    verification,
    completionSteps,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    completionName,
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady,
    completionDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "completionSteps",
        "nextActions",
      ],
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.closure.closureDigest.value,
    },
    verifiedClosureDigest: {
      algorithm: "sha256",
      value: input.closureVerification.recomputedClosureDigest.value,
    },
    decision: input.closure.decision,
    verification,
    completionSteps,
    nextActions,
  };
}

export function createOpsPromotionHandoffCompletionVerification(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
  completion: OpsPromotionHandoffCompletion;
}): OpsPromotionHandoffCompletionVerification {
  const expectedCompletion = createOpsPromotionHandoffCompletion({
    closure: input.closure,
    closureVerification: input.closureVerification,
  });
  const recomputedCompletionDigest = digestStable(archiveHandoffCompletionDigestPayload({
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid: input.completion.valid,
    state: input.completion.state,
    handoffReady: input.completion.handoffReady,
    closureDigest: input.completion.closureDigest.value,
    verifiedClosureDigest: input.completion.verifiedClosureDigest.value,
    decision: input.completion.decision,
    verification: input.completion.verification,
    completionSteps: input.completion.completionSteps,
    nextActions: input.completion.nextActions,
  }));
  const completionStepChecks = input.completion.completionSteps.map((step) => {
    const expected = expectedCompletion.completionSteps.find((candidate) => candidate.name === step.name);
    const validMatches = expected?.valid === step.valid;
    const readyMatches = expected?.ready === step.ready;
    const sourceMatches = expected?.source === step.source;
    const detailMatches = expected?.detail === step.detail;
    const expectedDigest = expected?.digest ?? missingHandoffVerificationDigest(step.name);
    const digestMatches = step.digest.value === expectedDigest.value;

    return {
      name: step.name,
      valid: expected !== undefined && validMatches && readyMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      readyMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      completionDigest: { ...step.digest },
      recomputedDigest: expectedDigest,
      source: step.source,
      detail: step.detail,
    };
  });
  const checks = {
    completionDigestValid: input.completion.completionDigest.value === recomputedCompletionDigest,
    coveredFieldsMatch: stableJson(input.completion.completionDigest.coveredFields)
      === stableJson(expectedCompletion.completionDigest.coveredFields),
    completionStepsValid: completionStepChecks.length === expectedCompletion.completionSteps.length
      && completionStepChecks.every((step) => step.valid),
    completionNameMatches: input.completion.completionName === expectedCompletion.completionName,
    closureNameMatches: input.completion.closureName === expectedCompletion.closureName,
    receiptNameMatches: input.completion.receiptName === expectedCompletion.receiptName,
    certificateNameMatches: input.completion.certificateName === expectedCompletion.certificateName,
    packageNameMatches: input.completion.packageName === expectedCompletion.packageName,
    archiveNameMatches: input.completion.archiveName === expectedCompletion.archiveName,
    validMatches: input.completion.valid === expectedCompletion.valid,
    stateMatches: input.completion.state === expectedCompletion.state,
    handoffReadyMatches: input.completion.handoffReady === expectedCompletion.handoffReady,
    closureDigestMatches: input.completion.closureDigest.value === expectedCompletion.closureDigest.value,
    verifiedClosureDigestMatches: input.completion.verifiedClosureDigest.value === expectedCompletion.verifiedClosureDigest.value,
    decisionMatches: stableJson(input.completion.decision) === stableJson(expectedCompletion.decision),
    verificationMatches: stableJson(input.completion.verification) === stableJson(expectedCompletion.verification),
    nextActionsMatch: stableJson(input.completion.nextActions) === stableJson(expectedCompletion.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady: input.completion.handoffReady,
    completionDigest: {
      algorithm: "sha256",
      value: input.completion.completionDigest.value,
    },
    recomputedCompletionDigest: {
      algorithm: "sha256",
      value: recomputedCompletionDigest,
    },
    checks,
    summary: {
      totalDecisions: input.completion.decision.totalDecisions,
      latestDecisionId: input.completion.decision.latestDecisionId,
      completionStepCount: completionStepChecks.length,
      handoffReady: input.completion.handoffReady,
      closeoutReady: input.completion.verification.closeoutReady,
    },
    completionSteps: completionStepChecks,
    nextActions: archiveHandoffCompletionVerificationNextActions(checks, input.completion),
  };
}
