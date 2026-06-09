import http from "node:http";
import net from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";

import {
  completeHeaders,
  javaEvidence,
  loadTestConfig,
  miniKvEvidence,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

const servers: Array<{ close: () => Promise<void> }> = [];

afterEach(async () => {
  while (servers.length > 0) {
    await servers.pop()?.close();
  }
});

describe("managed audit manual sandbox connection credential resolver controlled read-only shard preview routes", () => {
  it("exposes JSON and Markdown through the audit route table using mock read-only services", async () => {
    const javaServer = await startJavaServer();
    const miniKvServer = await startMiniKvServer();
    servers.push(javaServer, miniKvServer);
    const app = await buildApp(loadTestConfig({
      ORDER_PLATFORM_URL: javaServer.url,
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(miniKvServer.port),
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${CONTROLLED_READ_ONLY_SHARD_PREVIEW_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        previewState: "controlled-read-only-shard-preview-ready",
        previewDecision: "preview-java-and-mini-kv-shard-readiness",
        activeNodeVersion: "Node v638",
        sourceNodeVersion: "Node v637",
        previewOnly: true,
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
        activeShardRouterAllowed: false,
        writeRoutingAllowed: false,
        loadRestoreCompactAllowed: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("controlled read-only shard preview");
      expect(markdown.body).toContain("Preview decision: preview-java-and-mini-kv-shard-readiness");
      expect(markdown.body).toContain("## Source Matrix");
      expect(markdown.body).toContain("## Source Matrix Consumer");
      expect(markdown.body).toContain("## Source Matrix Drift Summary");
      expect(markdown.body).toContain("## Source Matrix Consumption Plan");
      expect(markdown.body).toContain("## Source Matrix Review Checklist");
      expect(markdown.body).toContain("## Source Matrix Review Digest");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Archive Snapshot Summary Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Notes");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Export");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Summary Consumer Receipt Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Snapshot");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Verification");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt");
      expect(markdown.body).toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Snapshot");
      expect(markdown.body)
        .toContain("## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Verification");
      expect(markdown.body).toContain("## Live Read-Only Window Rehearsal Packet");
      expect(markdown.body).toContain("## Live Read-Only Window Command Worksheet");
      expect(markdown.body).toContain("readyForManualCommandReview: true");
      expect(markdown.body).toContain("commandTemplateCount: 20");
      expect(markdown.body).toContain("containsSecretValue: false");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Packet");
      expect(markdown.body).toContain("readyForManualEvidenceCapture: true");
      expect(markdown.body).toContain("commandEvidenceRecordCount: 4");
      expect(markdown.body).toContain("runtimePayloadCaptured: false");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Intake Ledger");
      expect(markdown.body).toContain("readyForManualEvidenceIntake: true");
      expect(markdown.body).toContain("entryCount: 20");
      expect(markdown.body).toContain("## Live Read-Only Window Evidence Intake Review Package");
      expect(markdown.body).toContain("readyForOperatorIntakeReview: true");
      expect(markdown.body).toContain("readyForManualEvidenceEntry: false");
      expect(markdown.body).toContain("controlCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Manual Evidence Entry Worksheet");
      expect(markdown.body).toContain("worksheetState: ready-for-operator-entry-worksheet");
      expect(markdown.body).toContain("readyForOperatorEntryWorksheet: true");
      expect(markdown.body).toContain("readyForManualEvidenceEntry: false");
      expect(markdown.body).toContain("slotCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Import Preflight");
      expect(markdown.body).toContain("preflightState: ready-for-operator-evidence-import-preflight");
      expect(markdown.body).toContain("readyForOperatorEvidenceImportPreflight: true");
      expect(markdown.body).toContain("readyForEvidenceImport: false");
      expect(markdown.body).toContain("preflightSlotCount: 25");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Value Draft");
      expect(markdown.body).toContain("valueDraftState: ready-for-operator-evidence-value-draft");
      expect(markdown.body).toContain("readyForOperatorEvidenceValueDraft: true");
      expect(markdown.body).toContain("valueDraftSlotCount: 25");
      expect(markdown.body).toContain("draftFieldCount: 51");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Fresh Sibling Intake");
      expect(markdown.body).toContain("intakeState: ready-for-fresh-sibling-evidence-intake");
      expect(markdown.body).toContain("readyForFreshSiblingEvidenceIntake: true");
      expect(markdown.body).toContain("readyForOperatorValueSupply: false");
      expect(markdown.body).toContain("intakeSlotCount: 25");
      expect(markdown.body).toContain("matchedSnippetCount: 25");
      expect(markdown.body).toContain("historicalFixtureResolvedFileCount: 7");
      expect(markdown.body).toContain("## Live Read-Only Window Operator Evidence Value Supply Envelope");
      expect(markdown.body).toContain("envelopeState: ready-for-value-supply-envelope-review");
      expect(markdown.body).toContain("readyForValueSupplyEnvelopeReview: true");
      expect(markdown.body).toContain("readyForOperatorValueSupply: false");
      expect(markdown.body).toContain("envelopeSlotCount: 25");
      expect(markdown.body).toContain("javaValueDraftEvidenceVersion: Java v633");
      expect(markdown.body).toContain("miniKvValueDraftEvidenceVersion: mini-kv v585");
      expect(markdown.body).toContain("suppliedValueCount: 0");
      expect(markdown.body).toContain("acceptedValueCount: 0");
      expect(markdown.body).toContain("importedValueCount: 0");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft");
      expect(markdown.body).toContain("draftState: ready-for-value-supply-approval-packet-draft");
      expect(markdown.body).toContain("readyForValueSupplyApprovalPacketDraft: true");
      expect(markdown.body).toContain("readyForOperatorValueSubmission: false");
      expect(markdown.body).toContain("draftSlotCount: 25");
      expect(markdown.body).toContain("javaValueSupplyEvidenceVersion: Java v658");
      expect(markdown.body).toContain("miniKvValueSupplyEvidenceVersion: mini-kv v610");
      expect(markdown.body).toContain("approvalCaptured: false");
      expect(markdown.body).toContain("approvalGrantPresent: false");
      expect(markdown.body).toContain("signedApprovalPresent: false");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Approval Packet Review");
      expect(markdown.body).toContain("reviewPackageState: ready-for-value-supply-approval-packet-review");
      expect(markdown.body).toContain("readyForValueSupplyApprovalPacketReview: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("reviewControlCount: 25");
      expect(markdown.body).toContain("manualReviewRequiredControlCount: 25");
      expect(markdown.body).toContain("autoApprovalBlockedControlCount: 25");
      expect(markdown.body).toContain("approvalPacketReviewVersion: Node v1011");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Template");
      expect(markdown.body).toContain("templateState: ready-for-signed-approval-template-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalTemplatePreflight: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("templateFieldCount: 25");
      expect(markdown.body).toContain("templateClauseCount: 25");
      expect(markdown.body).toContain("missingFieldBlockerCount: 25");
      expect(markdown.body).toContain("signedApprovalTemplateVersion: Node v1036");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Preflight");
      expect(markdown.body).toContain("preflightState: ready-for-signed-approval-capture-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalCapturePreflight: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("captureInputCount: 25");
      expect(markdown.body).toContain("captureAttestationCount: 25");
      expect(markdown.body).toContain("missingInputBlockerCount: 25");
      expect(markdown.body).toContain("rawSignatureMaterialCount: 0");
      expect(markdown.body).toContain("signedApprovalCapturePreflightVersion: Node v1061");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Preflight");
      expect(markdown.body).toContain("artifactPreflightState: ready-for-signed-approval-capture-artifact-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalCaptureArtifactPreflight: true");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("artifactFragmentCount: 25");
      expect(markdown.body).toContain("artifactSealCount: 25");
      expect(markdown.body).toContain("sourceEvidenceFragmentCount: 3");
      expect(markdown.body).toContain("valueBindingFragmentCount: 2");
      expect(markdown.body).toContain("policyFragmentCount: 3");
      expect(markdown.body).toContain("closeoutFragmentCount: 1");
      expect(markdown.body).toContain("artifactBlockerCount: 25");
      expect(markdown.body).toContain("artifactMaterializedCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactPreflightVersion: Node v1086");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Preflight");
      expect(markdown.body)
        .toContain("artifactDraftPreflightState: ready-for-signed-approval-artifact-draft-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftPreflight: true");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraft: false");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("draftFieldCount: 25");
      expect(markdown.body).toContain("draftGuardCount: 25");
      expect(markdown.body).toContain("closeoutDraftFieldCount: 1");
      expect(markdown.body).toContain("draftBlockerCount: 25");
      expect(markdown.body).toContain("draftArtifactMaterializedCount: 0");
      expect(markdown.body).toContain("draftSignaturePayloadCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftPreflightVersion: Node v1111");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Readiness");
      expect(markdown.body)
        .toContain("artifactDraftReadinessState: ready-for-signed-approval-artifact-draft-readiness");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftReadiness: true");
      expect(markdown.body).toContain("readyForManualSignedApprovalDraftReview: true");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraft: false");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("readinessLaneCount: 25");
      expect(markdown.body).toContain("readinessControlCount: 25");
      expect(markdown.body).toContain("archiveCloseoutReadinessLaneCount: 1");
      expect(markdown.body).toContain("readyReadinessLaneCount: 25");
      expect(markdown.body).toContain("readyReadinessControlCount: 25");
      expect(markdown.body).toContain("manualDraftMaterializedCount: 0");
      expect(markdown.body).toContain("draftArtifactMaterializedCount: 0");
      expect(markdown.body).toContain("draftSignaturePayloadCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftReadinessVersion: Node v1136");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Review Package Preflight");
      expect(markdown.body)
        .toContain("artifactDraftReviewPackagePreflightState: ready-for-signed-approval-artifact-draft-review-package-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftReviewPackagePreflight: true");
      expect(markdown.body).toContain("readyForManualSignedApprovalDraftReviewPackage: true");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraft: false");
      expect(markdown.body).toContain("readyForSignedApprovalCapture: false");
      expect(markdown.body).toContain("packageSlotCount: 25");
      expect(markdown.body).toContain("packageGuardCount: 25");
      expect(markdown.body).toContain("archiveCloseoutReviewPackageSlotCount: 1");
      expect(markdown.body).toContain("digestModeReviewPackageSlotCount: 5");
      expect(markdown.body).toContain("readyPackageSlotCount: 25");
      expect(markdown.body).toContain("readyPackageGuardCount: 25");
      expect(markdown.body).toContain("packageSlotMaterializedCount: 0");
      expect(markdown.body).toContain("signedDraftTextCount: 0");
      expect(markdown.body).toContain("draftSignaturePayloadCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: Node v1161");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Authoring Readiness");
      expect(markdown.body)
        .toContain("artifactDraftAuthoringReadinessState: ready-for-signed-approval-artifact-draft-authoring-readiness");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftAuthoringReadiness: true");
      expect(markdown.body).toContain("readyForHumanSignedApprovalDraftArtifactAuthoring: true");
      expect(markdown.body).toContain("readyForManualSignedApprovalDraftReviewPackage: true");
      expect(markdown.body).toContain("authoringRequirementCount: 25");
      expect(markdown.body).toContain("authoringBlockerCount: 25");
      expect(markdown.body).toContain("archiveCloseoutAuthoringRequirementCount: 1");
      expect(markdown.body).toContain("digestModeAuthoringRequirementCount: 5");
      expect(markdown.body).toContain("readyAuthoringRequirementCount: 25");
      expect(markdown.body).toContain("readyAuthoringBlockerCount: 25");
      expect(markdown.body).toContain("authoringInstructionMaterializedCount: 0");
      expect(markdown.body).toContain("draftArtifactCreated: false");
      expect(markdown.body).toContain("signedDraftTextCount: 0");
      expect(markdown.body).toContain("draftSignaturePayloadCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: Node v1186");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Instruction Preflight");
      expect(markdown.body)
        .toContain("artifactDraftInstructionPreflightState: ready-for-signed-approval-artifact-draft-instruction-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftInstructionPreflight: true");
      expect(markdown.body).toContain("readyForHumanSignedApprovalDraftInstructionAuthoring: true");
      expect(markdown.body).toContain("readyForHumanSignedApprovalDraftArtifactAuthoring: true");
      expect(markdown.body).toContain("instructionSlotCount: 25");
      expect(markdown.body).toContain("instructionGuardCount: 25");
      expect(markdown.body).toContain("archiveCloseoutInstructionSlotCount: 1");
      expect(markdown.body).toContain("digestModeInstructionSlotCount: 5");
      expect(markdown.body).toContain("readyInstructionSlotCount: 25");
      expect(markdown.body).toContain("readyInstructionGuardCount: 25");
      expect(markdown.body).toContain("draftInstructionMaterializedCount: 0");
      expect(markdown.body).toContain("draftArtifactCreated: false");
      expect(markdown.body).toContain("signedDraftTextCount: 0");
      expect(markdown.body).toContain("draftSignaturePayloadCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftInstructionPreflightVersion: Node v1211");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Intake");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageIntakeState: ready-for-signed-approval-artifact-draft-text-package-intake");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftTextPackageIntake: true");
      expect(markdown.body).toContain("readyForHumanSignedApprovalDraftTextPackageSubmission: true");
      expect(markdown.body).toContain("intakeFieldCount: 25");
      expect(markdown.body).toContain("intakeGuardCount: 25");
      expect(markdown.body).toContain("archiveCloseoutIntakeFieldCount: 1");
      expect(markdown.body).toContain("digestModeIntakeFieldCount: 5");
      expect(markdown.body).toContain("readyIntakeFieldCount: 25");
      expect(markdown.body).toContain("readyIntakeGuardCount: 25");
      expect(markdown.body).toContain("expectedDraftTextPackageFieldCount: 25");
      expect(markdown.body).toContain("actualDraftTextPackageFieldCount: 0");
      expect(markdown.body).toContain("acceptedDraftTextPackageCount: 0");
      expect(markdown.body).toContain("signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: Node v1236");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Review Preflight");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageReviewPreflightState: ready-for-signed-approval-artifact-draft-text-package-review-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftTextPackageReviewPreflight: true");
      expect(markdown.body).toContain("readyForOfflineSignedApprovalDraftTextPackageReview: true");
      expect(markdown.body).toContain("reviewCriterionCount: 25");
      expect(markdown.body).toContain("reviewControlCount: 25");
      expect(markdown.body).toContain("digestModeReviewCriterionCount: 5");
      expect(markdown.body).toContain("readyReviewCriterionCount: 25");
      expect(markdown.body).toContain("readyReviewControlCount: 25");
      expect(markdown.body).toContain("reviewedDraftTextPackageCount: 0");
      expect(markdown.body).toContain("approvedDraftTextPackageCount: 0");
      expect(markdown.body).toContain("rejectedDraftTextPackageCount: 0");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: Node v1261");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Submission Preflight");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageSubmissionPreflightState: ready-for-signed-approval-artifact-draft-text-package-submission-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight: true");
      expect(markdown.body).toContain("readyForManualSignedApprovalDraftTextPackageSubmission: true");
      expect(markdown.body).toContain("readyForOfflineSignedApprovalDraftTextPackageComparison: true");
      expect(markdown.body).toContain("submissionSlotCount: 25");
      expect(markdown.body).toContain("comparisonControlCount: 25");
      expect(markdown.body).toContain("digestModeSubmissionSlotCount: 5");
      expect(markdown.body).toContain("readySubmissionSlotCount: 25");
      expect(markdown.body).toContain("readyComparisonControlCount: 25");
      expect(markdown.body).toContain("submittedDraftTextPackageCount: 0");
      expect(markdown.body).toContain("comparedDraftTextPackageCount: 0");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: Node v1286");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Preflight");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparisonPreflightState: ready-for-signed-approval-artifact-draft-text-package-comparison-preflight");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: true");
      expect(markdown.body).toContain("comparisonLaneCount: 25");
      expect(markdown.body).toContain("acceptanceControlCount: 25");
      expect(markdown.body).toContain("digestModeComparisonLaneCount: 5");
      expect(markdown.body).toContain("readyComparisonLaneCount: 25");
      expect(markdown.body).toContain("readyAcceptanceControlCount: 25");
      expect(markdown.body).toContain("actualDraftTextPackageComparisonCount: 0");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: Node v1311");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Acceptance Precheck");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparisonAcceptancePrecheckState: ready-for-signed-approval-artifact-draft-text-package-comparison-acceptance-precheck");
      expect(markdown.body).toContain("readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck: true");
      expect(markdown.body).toContain("readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck: true");
      expect(markdown.body).toContain("checkpointCount: 10");
      expect(markdown.body).toContain("guardCount: 10");
      expect(markdown.body).toContain("sourceComparisonLaneCount: 25");
      expect(markdown.body).toContain("sourceAcceptanceControlCount: 25");
      expect(markdown.body).toContain("readyCheckpointCount: 10");
      expect(markdown.body).toContain("readyGuardCount: 10");
      expect(markdown.body).toContain("actualDraftTextPackageAcceptanceEvidenceCount: 0");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: Node v1321");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Package Evidence Intake");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparedPackageEvidenceIntakeState: ready-for-manual-compared-package-evidence-intake-contract");
      expect(markdown.body).toContain("readyForManualComparedPackageEvidenceIntakeContract: true");
      expect(markdown.body).toContain("readyForRealComparedPackageEvidenceIntake: true");
      expect(markdown.body).toContain("slotCount: 10");
      expect(markdown.body).toContain("sourceAcceptanceCheckpointCount: 10");
      expect(markdown.body).toContain("sourceAcceptanceGuardCount: 10");
      expect(markdown.body).toContain("expectedRealComparedPackageEvidenceSlotCount: 10");
      expect(markdown.body).toContain("realComparedPackageEvidenceCount: 0");
      expect(markdown.body).toContain("manualComparedPackageEvidenceMaterializedCount: 0");
      expect(markdown.body).toContain("syntheticComparedPackageEvidenceCount: 0");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: Node v1331");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Evaluation Preflight");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparedEvidenceEvaluationPreflightState: waiting-for-real-compared-package-evidence");
      expect(markdown.body).toContain("readyForComparedEvidenceEvaluationPreflightContract: true");
      expect(markdown.body).toContain("readyForRealComparedPackageEvidenceEvaluation: false");
      expect(markdown.body).toContain("evaluationRuleCount: 20");
      expect(markdown.body).toContain("evaluationGuardCount: 20");
      expect(markdown.body).toContain("expectedRealComparedPackageEvidenceCandidateFieldCount: 20");
      expect(markdown.body).toContain("realComparedPackageEvidenceCandidateCount: 0");
      expect(markdown.body).toContain("syntheticComparedPackageEvidenceCandidateCount: 0");
      expect(markdown.body).toContain("evaluationAllowed: false");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: Node v1351");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparedEvidenceCandidateState: waiting-for-real-compared-package-evidence-candidate");
      expect(markdown.body).toContain("readyForComparedEvidenceCandidateBlueprintContract: true");
      expect(markdown.body).toContain("readyForRealComparedPackageEvidenceCandidateIntake: false");
      expect(markdown.body).toContain("blueprintSectionCount: 10");
      expect(markdown.body).toContain("blueprintBlockerCount: 10");
      expect(markdown.body).toContain("candidateFieldCount: 20");
      expect(markdown.body).toContain("realComparedPackageEvidenceCandidateValueCount: 0");
      expect(markdown.body).toContain("syntheticComparedPackageEvidenceCandidateValueCount: 0");
      expect(markdown.body).toContain("candidateBlueprintMaterializationAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: Node v1361");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Intake");
      expect(markdown.body)
        .toContain("artifactDraftTextPackageComparedEvidenceCandidateIntakeState: waiting-for-real-compared-package-evidence-candidate-document");
      expect(markdown.body).toContain("readyForComparedEvidenceCandidateIntakePreflightContract: true");
      expect(markdown.body).toContain("readyForRealComparedPackageEvidenceCandidateDocumentIntake: false");
      expect(markdown.body).toContain("intakeSlotCount: 10");
      expect(markdown.body).toContain("intakeGuardCount: 10");
      expect(markdown.body).toContain("requiredCandidateFieldCount: 20");
      expect(markdown.body).toContain("realCandidateDocumentCount: 0");
      expect(markdown.body).toContain("syntheticCandidateDocumentCount: 0");
      expect(markdown.body).toContain("candidateDocumentIntakeAllowed: false");
      expect(markdown.body).toContain("candidatePayloadImportAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: Node v1371");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Request Package");
      expect(markdown.body)
        .toContain("candidateDocumentRequestPackageState: ready-for-real-compared-package-evidence-candidate-document-request");
      expect(markdown.body).toContain("readyForCandidateDocumentRequestPackage: true");
      expect(markdown.body).toContain("readyForRealComparedPackageEvidenceCandidateDocument: false");
      expect(markdown.body).toContain("requestItemCount: 15");
      expect(markdown.body).toContain("acceptanceCheckCount: 15");
      expect(markdown.body).toContain("sourceIntakeSlotCount: 10");
      expect(markdown.body).toContain("sourceIntakeGuardCount: 10");
      expect(markdown.body).toContain("requestedCandidateFieldCount: 20");
      expect(markdown.body).toContain("candidateDocumentRequestAllowed: false");
      expect(markdown.body).toContain("candidateDocumentIntakeAllowed: false");
      expect(markdown.body).toContain("candidatePayloadImportAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("candidateDocumentRequestPackageVersion: Node v1386");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Submission Precheck");
      expect(markdown.body)
        .toContain("candidateDocumentSubmissionPrecheckState: ready-for-reviewed-real-candidate-document-submission-precheck");
      expect(markdown.body).toContain("readyForCandidateDocumentSubmissionPrecheck: true");
      expect(markdown.body).toContain("readyForReviewedRealCandidateDocumentSubmission: false");
      expect(markdown.body).toContain("checkpointCount: 25");
      expect(markdown.body).toContain("validatorCount: 25");
      expect(markdown.body).toContain("sourceRequestItemCount: 15");
      expect(markdown.body).toContain("sourceAcceptanceCheckCount: 15");
      expect(markdown.body).toContain("submissionCandidateFieldCount: 20");
      expect(markdown.body).toContain("candidateDocumentSubmissionAllowed: false");
      expect(markdown.body).toContain("candidateDocumentIntakeAllowed: false");
      expect(markdown.body).toContain("candidatePayloadImportAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("candidateDocumentSubmissionPrecheckVersion: Node v1411");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Intake Packet");
      expect(markdown.body)
        .toContain("candidateDocumentIntakePacketState: ready-for-reviewed-real-candidate-document-intake-packet");
      expect(markdown.body).toContain("readyForCandidateDocumentIntakePacket: true");
      expect(markdown.body).toContain("readyForReviewedRealCandidateDocumentIntake: false");
      expect(markdown.body).toContain("intakeSlotCount: 10");
      expect(markdown.body).toContain("intakeGuardCount: 10");
      expect(markdown.body).toContain("sourceCheckpointCount: 25");
      expect(markdown.body).toContain("sourceValidatorCount: 25");
      expect(markdown.body).toContain("intakeCandidateFieldCount: 20");
      expect(markdown.body).toContain("reviewedRealCandidateDocumentPresent: false");
      expect(markdown.body).toContain("candidateDocumentIntakeAllowed: false");
      expect(markdown.body).toContain("candidatePayloadImportAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("candidateDocumentIntakePacketVersion: Node v1421");
      expect(markdown.body)
        .toContain("## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Material Request Package");
      expect(markdown.body)
        .toContain("candidateDocumentMaterialRequestPackageState: ready-for-reviewed-real-candidate-document-material-request");
      expect(markdown.body).toContain("readyForCandidateDocumentMaterialRequestPackage: true");
      expect(markdown.body).toContain("readyForCandidateDocumentMaterialIntake: false");
      expect(markdown.body).toContain("materialRequestItemCount: 25");
      expect(markdown.body).toContain("materialAcceptanceCheckCount: 25");
      expect(markdown.body).toContain("sourceIntakeSlotCount: 10");
      expect(markdown.body).toContain("sourceIntakeGuardCount: 10");
      expect(markdown.body).toContain("requestedMaterialFieldCount: 20");
      expect(markdown.body).toContain("reviewedRealCandidateDocumentMaterialPresent: false");
      expect(markdown.body).toContain("candidateDocumentMaterialIntakeAllowed: false");
      expect(markdown.body).toContain("candidatePayloadImportAllowed: false");
      expect(markdown.body).toContain("candidateEvaluationAllowed: false");
      expect(markdown.body)
        .toContain("candidateDocumentMaterialRequestPackageVersion: Node v1446");
      expect(markdown.body).toContain("Ready source count: 2");
      expect(markdown.body).toContain("Ready for controlled read-only consumption: true");
      expect(markdown.body).toContain("Drift state: controlled-drift-detected");
      expect(markdown.body).toContain("Plan state: ready-for-read-only-consumption-plan");
      expect(markdown.body).toContain("Ready for read-only consumption plan: true");
      expect(markdown.body).toContain("Plan digest scope: source-matrix-consumption-plan");
      expect(markdown.body).toContain("Checklist state: ready-for-controlled-review");
      expect(markdown.body).toContain("Ready for controlled review archive: true");
      expect(markdown.body).toContain("Archive state: ready-for-controlled-review-archive");
      expect(markdown.body).toContain("Export state: ready-for-summary-export");
      expect(markdown.body).toContain("Summary digest scope: archive-snapshot-summary-lines");
      expect(markdown.body).toContain("Summary digest covered line count: 5");
      expect(markdown.body).toContain("Handoff state: ready-for-read-only-handoff");
      expect(markdown.body).toContain("Handoff digest scope: read-only-handoff-notes");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-summary");
      expect(markdown.body).toContain("Ready for read-only handoff summary: true");
      expect(markdown.body).toContain("Summary digest scope: read-only-handoff-summary");
      expect(markdown.body).toContain("Summary digest covered audience count: 4");
      expect(markdown.body).toContain("Decision: ready-for-read-only-summary-consumption");
      expect(markdown.body).toContain("Ready for read-only summary consumption: true");
      expect(markdown.body).toContain("Export state: ready-for-read-only-summary-consumer-export");
      expect(markdown.body).toContain("Export digest scope: handoff-summary-consumer-export-lines");
      expect(markdown.body).toContain("Receipt state: ready-for-read-only-summary-consumer-receipt");
      expect(markdown.body).toContain("Receipt digest scope: handoff-summary-consumer-receipt");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-summary-consumer-receipt-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-summary-consumer-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-summary-consumer-receipt-archive-verification");
      expect(markdown.body).toContain("Ready for read-only summary consumer receipt archive verification: true");
      expect(markdown.body).toContain("Coverage state: ready-for-read-only-handoff-route-coverage");
      expect(markdown.body).toContain("Coverage digest scope: handoff-route-markdown-sections");
      expect(markdown.body).toContain("Verification state: ready-for-read-only-handoff-route-coverage-verification");
      expect(markdown.body).toContain("Ready for read-only handoff route coverage verification: true");
      expect(markdown.body).toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive");
      expect(markdown.body).toContain("Snapshot digest scope: handoff-route-coverage-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive verification: true");
      expect(markdown.body).toContain("Summary state: ready-for-read-only-handoff-route-coverage-archive-summary");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary: true");
      expect(markdown.body).toContain("Summary digest scope: handoff-route-coverage-archive-summary-lines");
      expect(markdown.body)
        .toContain("Receipt state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt: true");
      expect(markdown.body).toContain("Receipt digest scope: handoff-route-coverage-archive-summary-receipt");
      expect(markdown.body)
        .toContain("Snapshot state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive: true");
      expect(markdown.body)
        .toContain("Snapshot digest scope: handoff-route-coverage-archive-summary-receipt-archive-snapshot");
      expect(markdown.body)
        .toContain("Verification state: ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification");
      expect(markdown.body)
        .toContain("Ready for read-only handoff route coverage archive summary receipt archive verification: true");
      expect(markdown.body).toContain("Routing modes: read-only-preview, single-shard-readiness-prototype");
      expect(markdown.body).toContain("Command: SHARDJSON");
      expect(markdown.body).toContain("Starts Java service: false");
      expect(markdown.body).toContain("LOAD/RESTORE/COMPACT allowed: false");
      expect(markdown.body).toContain("## Next Actions");
      expect(markdown.body).toContain("Consume sourceMatrixConsumptionPlan.planStepRecords");
      expect(markdown.body).toContain("observeSources=java|miniKv");
      expect(markdown.body).toContain("### Consumption Plan Step Records");
      expect(markdown.body).toContain("3. review-drift-findings: needs-review");
      expect(markdown.body).toContain("Ready step count: 3");
      expect(markdown.body).toContain("Review step count: 1");
      expect(markdown.body).toContain("Blocked step count: 0");
      expect(markdown.body).toContain("Routing activation allowed step count: 0");
      expect(markdown.body).toContain("Writes allowed step count: 0");
      expect(markdown.body).toContain("Risk level: review");
      expect(markdown.body).toContain("Review required: true");
      expect(markdown.body).toContain("Unsafe step count: 0");
      expect(markdown.body).toContain("Risk reason codes: PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body).toContain("Promotion hold state: read-only-review-required");
      expect(markdown.body).toContain("Promotion hold next allowed action: review-read-only-risk");
      expect(markdown.body).toContain("Routing promotion allowed: false");
      expect(markdown.body).toContain("Write promotion allowed: false");
      expect(markdown.body).toContain("Service startup allowed: false");
      expect(markdown.body).toContain("Promotion hold closure criterion count: 5");
      expect(markdown.body).toContain("reviewRiskReasons=PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body).toContain("Read-only review scope state: ready-for-read-only-review");
      expect(markdown.body)
        .toContain("Read-only review allowed operations: consume-plan-step-records, review-risk-summary, verify-promotion-hold-closure");
      expect(markdown.body)
        .toContain("Read-only review forbidden operations: activate-shard-router, enable-write-routing, start-sibling-services, mutate-sibling-state");
      expect(markdown.body).toContain("Read-only review scope digest scope: read-only-review-scope");
      expect(markdown.body)
        .toContain("Read-only review scope digest covered forbidden operation count: 4");
      expect(markdown.body)
        .toContain("state=ready-for-read-only-review, allowed=consume-plan-step-records|review-risk-summary|verify-promotion-hold-closure");
      expect(markdown.body)
        .toContain("digestScope=read-only-review-scope, coveredAllowed=3, coveredForbidden=4");
      expect(markdown.body).toContain("routingActivationAllowedSteps=0, writesAllowedSteps=0");
      expect(markdown.body)
        .toContain("level=review, reviewRequired=true, blocked=false, unsafeSteps=0, reasons=PLAN_HAS_REVIEW_STEPS");
      expect(markdown.body)
        .toContain("state=read-only-review-required, nextAllowedAction=review-read-only-risk");
      expect(markdown.body).toContain("closureCriterionCount=5");
    } finally {
      await app.close();
    }
  }, 60000);
});

async function startJavaServer(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/api/v1/ops/shard-readiness") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(javaEvidence));
      return;
    }
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Java mock server did not expose a TCP port");
  }
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function startMiniKvServer(): Promise<{ port: number; close: () => Promise<void> }> {
  const server = net.createServer((socket) => {
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => {
      if (chunk.trim().toUpperCase() === "SHARDJSON") {
        socket.end(`${JSON.stringify(miniKvEvidence)}\n`);
        return;
      }
      socket.end("ERR unknown command\n");
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("mini-kv mock server did not expose a TCP port");
  }
  return {
    port: address.port,
    close: () => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}
