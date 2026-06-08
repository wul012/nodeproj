import { describe, expect, it } from "vitest";

import {
  renderControlledReadOnlyShardPreviewCandidateDocumentRequestPackageMarkdown,
} from "../src/services/controlledReadOnlyShardPreviewCandidateDocumentRequestRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  controlledReadOnlyShardPreviewCandidateDocumentRequestPackageFixture,
} from "./support/controlledReadOnlyShardPreviewLiveWindowFixtureFactory.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("controlled read-only shard preview candidate document request package", () => {
  it("builds fifteen request items and checks while still requiring a real candidate document", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentRequestPackageFixture(true);

    expect(requestPackage).toMatchObject({
      candidateDocumentRequestPackageVersion: "Node v1386",
      sourceCandidateIntakeVersion: "Node v1371",
      candidateDocumentRequestPackageState:
        "ready-for-real-compared-package-evidence-candidate-document-request",
      readyForCandidateDocumentRequestPackage: true,
      readyForRealComparedPackageEvidenceCandidateDocument: false,
      readyForCandidateDocumentIntake: false,
      readyForCandidatePayloadImport: false,
      readyForCandidateEvaluation: false,
      readyForApprovalGrant: false,
      readyForSignedApproval: false,
      readyForRuntimePayload: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      requestItemCount: 15,
      acceptanceCheckCount: 15,
      sourceIntakeSlotCount: 10,
      sourceIntakeGuardCount: 10,
      readyRequestItemCount: 15,
      readyAcceptanceCheckCount: 15,
      requiredCandidateFieldCount: 20,
      requestedCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      stagedCandidateDocumentCount: 0,
      importedCandidatePayloadCount: 0,
      evaluatedCandidatePayloadCount: 0,
      acceptedCandidatePayloadCount: 0,
      rejectedCandidatePayloadCount: 0,
      gateCount: 38,
      passedGateCount: 38,
      blockedReasonCodes: [],
      candidateDocumentRequestAllowed: false,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(requestPackage.sourceCandidateIntakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(requestPackage.candidateDocumentRequestPackageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(requestPackage.requestItems.map((item) => item.nodeVersion)).toEqual([
      "Node v1372",
      "Node v1373",
      "Node v1374",
      "Node v1375",
      "Node v1376",
      "Node v1377",
      "Node v1378",
      "Node v1379",
      "Node v1380",
      "Node v1381",
      "Node v1382",
      "Node v1383",
      "Node v1384",
      "Node v1385",
      "Node v1386",
    ]);
    expect(requestPackage.acceptanceChecks.map((check) => check.nodeVersion))
      .toEqual(requestPackage.requestItems.map((item) => item.nodeVersion));
    expect(requestPackage.requestItems.flatMap((item) => item.candidateFields)).toHaveLength(20);
    expect(new Set(requestPackage.requestItems.flatMap((item) => item.candidateFields)).size)
      .toBe(20);
    expect(requestPackage.requestItems.every((item) => item.readyForCandidateDocumentRequestItem))
      .toBe(true);
    expect(requestPackage.requestItems.every((item) => item.requiresRealCandidateDocument))
      .toBe(true);
    expect(requestPackage.requestItems.every((item) => item.realCandidateDocumentCount === 0))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.rejectsMissingCandidateDocument))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.rejectsSyntheticCandidateDocument))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.quarantinesUnreviewedCandidateDocument))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksCandidatePayloadImport))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksCandidateEvaluation))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksCandidateAcceptance))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksApprovalGrant))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksSignedApproval))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksRuntimePayload))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksWrites))
      .toBe(true);
    expect(requestPackage.acceptanceChecks.every((check) => check.blocksSiblingMutation))
      .toBe(true);
  });

  it("fails closed when the source candidate intake preflight is blocked", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentRequestPackageFixture(false);

    expect(requestPackage).toMatchObject({
      candidateDocumentRequestPackageState: "blocked",
      readyForCandidateDocumentRequestPackage: false,
      sourceCandidateIntakeVersion: "Node v1371",
      requestItemCount: 15,
      acceptanceCheckCount: 15,
      readyRequestItemCount: 0,
      readyAcceptanceCheckCount: 0,
      requiredCandidateFieldCount: 20,
      requestedCandidateFieldCount: 20,
      realCandidateDocumentCount: 0,
      syntheticCandidateDocumentCount: 0,
      candidateDocumentRequestAllowed: false,
      candidateDocumentIntakeAllowed: false,
      candidatePayloadImportAllowed: false,
      candidateEvaluationAllowed: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
    });
    expect(requestPackage.passedGateCount).toBeLessThan(requestPackage.gateCount);
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_REQUEST_SOURCE_INTAKE_NOT_READY");
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_REQUEST_ITEMS_BLOCKED");
    expect(requestPackage.blockedReasonCodes)
      .toContain("CANDIDATE_DOCUMENT_REQUEST_CHECKS_BLOCKED");
  });

  it("renders stable candidate document request package markdown", () => {
    const requestPackage = controlledReadOnlyShardPreviewCandidateDocumentRequestPackageFixture(true);
    const markdown =
      renderControlledReadOnlyShardPreviewCandidateDocumentRequestPackageMarkdown(requestPackage);

    expect(markdown)
      .toContain("# Controlled read-only shard preview candidate document request package");
    expect(markdown).toContain("- Candidate document request package version: Node v1386");
    expect(markdown)
      .toContain("- Candidate document request package state: ready-for-real-compared-package-evidence-candidate-document-request");
    expect(markdown).toContain("- Request item count: 15");
    expect(markdown).toContain("- Acceptance check count: 15");
    expect(markdown).toContain("- Requested candidate field count: 20");
    expect(markdown).toContain("- Candidate document intake allowed: false");
    expect(markdown)
      .toContain("### 1. Node v1372 CANDIDATE_DOCUMENT_REQUEST_SOURCE_LINEAGE");
    expect(markdown)
      .toContain("### 15. Node v1386 CANDIDATE_DOCUMENT_REQUEST_EXECUTION_WRITE_MUTATION_FREEZE");
    expect(markdown).toContain("- Rejects missing candidate document: true");
    expect(markdown).toContain("- Rejects synthetic candidate document: true");
    expect(markdown).toContain("- Blocks candidate payload import: true");
    expect(markdown).toContain("- Blocks candidate evaluation: true");
    expect(markdown).toContain("- Blocks sibling mutation: true");
  });

  it("includes the candidate document request package in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentRequestPackage)
      .toMatchObject({
        candidateDocumentRequestPackageVersion: "Node v1386",
        sourceCandidateIntakeVersion: "Node v1371",
        requestItemCount: 15,
        acceptanceCheckCount: 15,
        sourceIntakeSlotCount: 10,
        sourceIntakeGuardCount: 10,
        requiredCandidateFieldCount: 20,
        requestedCandidateFieldCount: 20,
        readyForCandidateDocumentRequestPackage: true,
        readyForRealComparedPackageEvidenceCandidateDocument: false,
        readyForCandidateDocumentIntake: false,
        realCandidateDocumentCount: 0,
        syntheticCandidateDocumentCount: 0,
        candidateDocumentRequestAllowed: false,
        candidateDocumentIntakeAllowed: false,
        candidatePayloadImportAllowed: false,
        candidateEvaluationAllowed: false,
        executionAllowed: false,
        writeRoutingAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
        importsRuntimePayload: false,
        acceptsSyntheticEvidence: false,
        containsSecretValue: false,
      });
  });

  it("keeps the request package ready when forced to historical sibling evidence fallback", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];

    try {
      process.env[FORCE_FALLBACK_ENV] = "true";

      const profile =
        await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
          config: loadTestConfig(),
          orderPlatform: fakeOrderPlatform(),
          miniKv: fakeMiniKv(),
        });

      expect(profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentRequestPackage)
        .toMatchObject({
          candidateDocumentRequestPackageVersion: "Node v1386",
          readyForCandidateDocumentRequestPackage: true,
          readyForRealComparedPackageEvidenceCandidateDocument: false,
          requestItemCount: 15,
          acceptanceCheckCount: 15,
          requiredCandidateFieldCount: 20,
          requestedCandidateFieldCount: 20,
          realCandidateDocumentCount: 0,
          candidateDocumentRequestAllowed: false,
          candidateDocumentIntakeAllowed: false,
          candidatePayloadImportAllowed: false,
          candidateEvaluationAllowed: false,
          executionAllowed: false,
          writeRoutingAllowed: false,
          startsServices: false,
          mutatesSiblingState: false,
        });
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });
});
