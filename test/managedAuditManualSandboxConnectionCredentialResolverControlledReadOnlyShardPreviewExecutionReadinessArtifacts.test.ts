import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  createControlledReadOnlyShardPreviewExecutionGapMatrix,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate,
  createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.js";
import {
  renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown,
  renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown,
  renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  blockedSourceMatrix,
  readySourceMatrix,
} from "./support/controlledReadOnlyShardPreviewReviewArtifactFixtures.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("controlled read-only shard preview execution readiness artifacts", () => {
  it("builds the v689-v691 live read-only packet readiness chain", () => {
    const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
      previewState: "controlled-read-only-shard-preview-ready",
      readyForControlledReadOnlyShardPreview: true,
      executionAllowed: false,
      writeRoutingAllowed: false,
      loadRestoreCompactAllowed: false,
      sourceMatrix: readySourceMatrix(),
    });
    const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);
    const verification = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);

    expect(matrix).toMatchObject({
      matrixVersion: "Node v689",
      sourceNodeVersion: "Node v688",
      matrixState: "ready-for-live-read-only-packet-planning",
      readyForLiveReadOnlyPacketPlanning: true,
      readyForLiveReadOnlyExecution: false,
      readyForProductionExecution: false,
      gateCount: 8,
      readyGateCount: 4,
      actionRequiredGateCount: 4,
      blockedGateCount: 0,
      liveReadOnlyPacketPlanningBlockerCount: 0,
      productionExecutionBlockerCount: 6,
      requiredParallelProjects: ["advanced-order-platform", "mini-kv"],
      executionAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    });
    expect(matrix.gates.map((gate) => gate.code)).toContain("MANUAL_RUNTIME_PROCESS_OWNERS_REQUIRED");
    expect(candidate).toMatchObject({
      candidateVersion: "Node v690",
      inputMatrixVersion: "Node v689",
      candidateState: "ready-for-manual-live-read-only-window",
      readyForManualLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
      manualServiceStartRequired: true,
      automaticServiceStart: false,
      processStepCount: 4,
      readTargetCount: 6,
      gateCount: 9,
      passedGateCount: 9,
      blockedReasonCodes: [],
      startsServices: false,
      mutatesSiblingState: false,
      nextVerificationVersion: "Node v691",
    });
    expect(candidate.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(candidate.readTargets.map((target) => target.target)).toContain("SHARDROUTEVERIFYREPORTJSON");
    expect(verification).toMatchObject({
      verificationVersion: "Node v691",
      inputCandidateVersion: "Node v690",
      verificationState: "verified-manual-live-read-only-window-candidate",
      readyForManualLiveReadOnlyWindow: true,
      readyForProductionExecution: false,
      gateCount: 7,
      passedGateCount: 7,
      blockedReasonCodes: [],
      archivedSectionCount: 3,
      executionAllowed: false,
      startsServices: false,
      nextAction: "run-three-project-live-read-only-window-with-explicit-process-owners",
    });
    expect(verification.candidateDigestValue).toBe(candidate.candidateDigest);
  });

  it("fails closed when the source matrix is not ready for planning", () => {
    const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
      previewState: "blocked",
      readyForControlledReadOnlyShardPreview: false,
      executionAllowed: false,
      writeRoutingAllowed: false,
      loadRestoreCompactAllowed: false,
      sourceMatrix: blockedSourceMatrix(),
    });
    const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);
    const verification = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);

    expect(matrix).toMatchObject({
      matrixState: "blocked",
      readyForLiveReadOnlyPacketPlanning: false,
      blockedGateCount: 3,
      liveReadOnlyPacketPlanningBlockerCount: 3,
    });
    expect(candidate).toMatchObject({
      candidateState: "blocked",
      readyForManualLiveReadOnlyWindow: false,
      blockedReasonCodes: ["SOURCE_GAP_MATRIX_NOT_READY"],
    });
    expect(verification).toMatchObject({
      verificationState: "blocked",
      readyForManualLiveReadOnlyWindow: false,
      blockedReasonCodes: ["CANDIDATE_NOT_READY"],
    });
  });

  it("renders stable markdown for archive review", () => {
    const matrix = createControlledReadOnlyShardPreviewExecutionGapMatrix({
      previewState: "controlled-read-only-shard-preview-ready",
      readyForControlledReadOnlyShardPreview: true,
      executionAllowed: false,
      writeRoutingAllowed: false,
      loadRestoreCompactAllowed: false,
      sourceMatrix: readySourceMatrix(),
    });
    const candidate = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate(matrix);
    const verification = createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification(candidate);

    const matrixMarkdown = renderControlledReadOnlyShardPreviewExecutionGapMatrixMarkdown(matrix);
    const candidateMarkdown = renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateMarkdown(candidate);
    const verificationMarkdown =
      renderControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationMarkdown(verification);

    expect(matrixMarkdown).toContain("# Controlled read-only shard preview execution gap matrix");
    expect(candidateMarkdown).toContain("SHARDROUTEVERIFYREPORTJSON");
    expect(verificationMarkdown).toContain("verified-manual-live-read-only-window-candidate");
    expect(matrixMarkdown.endsWith("\n")).toBe(true);
    expect(candidateMarkdown.endsWith("\n")).toBe(true);
    expect(verificationMarkdown.endsWith("\n")).toBe(false);
    expect(sha256(matrixMarkdown)).toBe("52e60c2197a3b606a9f9d1b453b87213a41b66a2469cf69796b8ffca47937626");
    expect(sha256(candidateMarkdown)).toBe("8175275766aa9c72c4109917005ac5d2c6fd1d7cf06d1f4fd6bb79630220449e");
    expect(sha256(verificationMarkdown)).toBe("54cf9bf7bbe13af599a56b48a6b567981434516832301fda5a6746ac01a45ea8");
  });

  it("includes the execution readiness chain in the controlled preview profile", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile.preview.executionGapMatrix.matrixVersion).toBe("Node v689");
    expect(profile.preview.liveReadOnlyPacketCandidate.candidateVersion).toBe("Node v690");
    expect(profile.preview.liveReadOnlyPacketCandidateVerification.verificationVersion).toBe("Node v691");
    expect(profile.preview.liveReadOnlyPacketCandidate.readyForManualLiveReadOnlyWindow).toBe(true);
    expect(profile.preview.liveReadOnlyPacketCandidateVerification.readyForProductionExecution).toBe(false);
  });
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
