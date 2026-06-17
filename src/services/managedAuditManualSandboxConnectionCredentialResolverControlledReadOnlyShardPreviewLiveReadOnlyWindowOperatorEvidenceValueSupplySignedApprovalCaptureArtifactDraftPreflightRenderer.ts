import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
  trimVerificationTrailingBlankLine,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightMarkdown(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft preflight",
    meta: [
      ["Signed approval capture artifact draft preflight version", preflight.signedApprovalCaptureArtifactDraftPreflightVersion],
      ["Source signed approval capture artifact preflight version", preflight.sourceSignedApprovalCaptureArtifactPreflightVersion],
      ["Artifact draft preflight state", preflight.artifactDraftPreflightState],
      ["Ready for signed approval artifact draft preflight", preflight.readyForSignedApprovalArtifactDraftPreflight],
      ["Ready for signed approval artifact draft", preflight.readyForSignedApprovalArtifactDraft],
      ["Ready for signed approval capture", preflight.readyForSignedApprovalCapture],
      ["Ready for operator value supply", preflight.readyForOperatorValueSupply],
      ["Ready for operator value submission", preflight.readyForOperatorValueSubmission],
      ["Ready for evidence import", preflight.readyForEvidenceImport],
      ["Ready for runtime payload", preflight.readyForRuntimePayload],
      ["Ready for live execution", preflight.readyForLiveExecution],
      ["Ready for production execution", preflight.readyForProductionExecution],
      ["Draft field count", preflight.draftFieldCount],
      ["Draft guard count", preflight.draftGuardCount],
      ["Identity draft field count", preflight.identityDraftFieldCount],
      ["Digest binding draft field count", preflight.digestBindingDraftFieldCount],
      ["Signature envelope draft field count", preflight.signatureEnvelopeDraftFieldCount],
      ["Source evidence draft field count", preflight.sourceEvidenceDraftFieldCount],
      ["Value binding draft field count", preflight.valueBindingDraftFieldCount],
      ["Policy draft field count", preflight.policyDraftFieldCount],
      ["Execution lock draft field count", preflight.executionLockDraftFieldCount],
      ["Closeout draft field count", preflight.closeoutDraftFieldCount],
      ["Required draft field count", preflight.requiredDraftFieldCount],
      ["Ready draft field count", preflight.readyDraftFieldCount],
      ["Ready draft guard count", preflight.readyDraftGuardCount],
      ["Draft blocker count", preflight.draftBlockerCount],
      ["Digest binding guard count", preflight.digestBindingGuardCount],
      ["Signature envelope guard count", preflight.signatureEnvelopeGuardCount],
      ["Policy guard count", preflight.policyGuardCount],
      ["No-execution guard count", preflight.noExecutionGuardCount],
      ["Draft artifact created", preflight.draftArtifactCreated],
      ["Draft artifact materialized count", preflight.draftArtifactMaterializedCount],
      ["Draft signature payload count", preflight.draftSignaturePayloadCount],
      ["Approval captured", preflight.approvalCaptured],
      ["Approval grant present", preflight.approvalGrantPresent],
      ["Signed approval present", preflight.signedApprovalPresent],
      ["Source signed approval capture artifact preflight digest", preflight.sourceSignedApprovalCaptureArtifactPreflightDigest],
      ["Source signed approval capture preflight digest", preflight.sourceSignedApprovalCapturePreflightDigest],
      ["Source signed approval template digest", preflight.sourceSignedApprovalTemplateDigest],
      ["Source approval packet review digest", preflight.sourceApprovalPacketReviewDigest],
      ["Passed gates", `${preflight.passedGateCount}/${preflight.gateCount}`],
      ["Imports runtime payload", preflight.importsRuntimePayload],
      ["Accepts synthetic evidence", preflight.acceptsSyntheticEvidence],
      ["Contains secret value", preflight.containsSecretValue],
      ["Signed approval capture artifact draft preflight digest", preflight.signedApprovalCaptureArtifactDraftPreflightDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(preflight.gates), bodyLeadingBlankLine: false },
      {
        heading: "Fields",
        lines: trimVerificationTrailingBlankLine(preflight.fields.flatMap(renderField)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Guards",
        lines: trimVerificationTrailingBlankLine(preflight.guards.flatMap(renderGuard)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Blocked Reasons",
        lines: renderVerificationBlockedReasonLines(preflight.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderField(
  field:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField,
): string[] {
  return [
    `### ${field.order}. ${field.nodeVersion} ${field.code}`,
    `- Field name: ${field.fieldName}`,
    `- Kind: ${field.kind}`,
    `- Field mode: ${field.fieldMode}`,
    `- Source artifact fragment: ${field.sourceArtifactFragmentCode}`,
    `- Source artifact fragment ready: ${field.sourceArtifactFragmentReady}`,
    `- Source artifact seal ready: ${field.sourceArtifactSealReady}`,
    `- Source artifact still blocked: ${field.sourceArtifactStillBlocked}`,
    `- Required artifact fragment: ${field.requiredArtifactFragmentName}`,
    `- Required artifact fragment present: ${field.requiredArtifactFragmentPresent}`,
    `- Draft blocker code: ${field.draftBlockerCode}`,
    `- Field purpose: ${field.fieldPurpose}`,
    `- Required for artifact draft preflight: ${field.requiredForArtifactDraftPreflight}`,
    `- Draft artifact created: ${field.draftArtifactCreated}`,
    `- Draft signature payload present: ${field.draftSignaturePayloadPresent}`,
    `- Approval grant emitted: ${field.approvalGrantEmitted}`,
    `- Ready for signed approval artifact draft preflight field: ${field.readyForSignedApprovalArtifactDraftPreflightField}`,
    `- Ready for signed approval artifact draft: ${field.readyForSignedApprovalArtifactDraft}`,
    `- Ready for signed approval capture: ${field.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${field.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${field.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${field.readyForRuntimePayload}`,
    `- Writes allowed: ${field.writesAllowed}`,
    `- Starts services: ${field.startsServices}`,
    `- Mutates sibling state: ${field.mutatesSiblingState}`,
    "",
  ];
}

function renderGuard(
  guard:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard,
): string[] {
  return [
    `### ${guard.order}. ${guard.nodeVersion} ${guard.code}`,
    `- Kind: ${guard.kind}`,
    `- Source draft field: ${guard.sourceDraftFieldCode}`,
    `- Source draft field ready: ${guard.sourceDraftFieldReady}`,
    `- Rejection code: ${guard.rejectionCode}`,
    `- Guard text: ${guard.guardText}`,
    `- Rejects missing field: ${guard.rejectsMissingField}`,
    `- Blocks unsigned draft: ${guard.blocksUnsignedDraft}`,
    `- Blocks auto capture: ${guard.blocksAutoCapture}`,
    `- Blocks runtime payload: ${guard.blocksRuntimePayload}`,
    `- Blocks writes: ${guard.blocksWrites}`,
    `- Blocks sibling mutation: ${guard.blocksSiblingMutation}`,
    `- Ready for signed approval artifact draft preflight guard: ${guard.readyForSignedApprovalArtifactDraftPreflightGuard}`,
    `- Ready for signed approval artifact draft: ${guard.readyForSignedApprovalArtifactDraft}`,
    `- Ready for signed approval capture: ${guard.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${guard.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${guard.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${guard.readyForRuntimePayload}`,
    `- Writes allowed: ${guard.writesAllowed}`,
    `- Starts services: ${guard.startsServices}`,
    `- Mutates sibling state: ${guard.mutatesSiblingState}`,
    "",
  ];
}
