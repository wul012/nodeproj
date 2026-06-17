import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
  trimVerificationTrailingBlankLine,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightMarkdown(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact preflight",
    meta: [
      ["Signed approval capture artifact preflight version", preflight.signedApprovalCaptureArtifactPreflightVersion],
      ["Source signed approval capture preflight version", preflight.sourceSignedApprovalCapturePreflightVersion],
      ["Artifact preflight state", preflight.artifactPreflightState],
      ["Ready for signed approval capture artifact preflight", preflight.readyForSignedApprovalCaptureArtifactPreflight],
      ["Ready for signed approval capture", preflight.readyForSignedApprovalCapture],
      ["Ready for operator value supply", preflight.readyForOperatorValueSupply],
      ["Ready for operator value submission", preflight.readyForOperatorValueSubmission],
      ["Ready for evidence import", preflight.readyForEvidenceImport],
      ["Ready for runtime payload", preflight.readyForRuntimePayload],
      ["Ready for live execution", preflight.readyForLiveExecution],
      ["Ready for production execution", preflight.readyForProductionExecution],
      ["Artifact fragment count", preflight.artifactFragmentCount],
      ["Artifact seal count", preflight.artifactSealCount],
      ["Identity fragment count", preflight.identityFragmentCount],
      ["Digest binding fragment count", preflight.digestBindingFragmentCount],
      ["Signature envelope fragment count", preflight.signatureEnvelopeFragmentCount],
      ["Source evidence fragment count", preflight.sourceEvidenceFragmentCount],
      ["Value binding fragment count", preflight.valueBindingFragmentCount],
      ["Policy fragment count", preflight.policyFragmentCount],
      ["Execution lock fragment count", preflight.executionLockFragmentCount],
      ["Closeout fragment count", preflight.closeoutFragmentCount],
      ["Required fragment count", preflight.requiredFragmentCount],
      ["Ready fragment count", preflight.readyFragmentCount],
      ["Ready seal count", preflight.readySealCount],
      ["Artifact blocker count", preflight.artifactBlockerCount],
      ["Digest binding seal count", preflight.digestBindingSealCount],
      ["Signature envelope seal count", preflight.signatureEnvelopeSealCount],
      ["Policy seal count", preflight.policySealCount],
      ["No-execution seal count", preflight.noExecutionSealCount],
      ["Artifact materialized count", preflight.artifactMaterializedCount],
      ["Raw signature material count", preflight.rawSignatureMaterialCount],
      ["Approval captured", preflight.approvalCaptured],
      ["Approval grant present", preflight.approvalGrantPresent],
      ["Signed approval present", preflight.signedApprovalPresent],
      ["Source signed approval capture preflight digest", preflight.sourceSignedApprovalCapturePreflightDigest],
      ["Source signed approval template digest", preflight.sourceSignedApprovalTemplateDigest],
      ["Source approval packet review digest", preflight.sourceApprovalPacketReviewDigest],
      ["Passed gates", `${preflight.passedGateCount}/${preflight.gateCount}`],
      ["Imports runtime payload", preflight.importsRuntimePayload],
      ["Accepts synthetic evidence", preflight.acceptsSyntheticEvidence],
      ["Contains secret value", preflight.containsSecretValue],
      ["Signed approval capture artifact preflight digest", preflight.signedApprovalCaptureArtifactPreflightDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(preflight.gates), bodyLeadingBlankLine: false },
      {
        heading: "Fragments",
        lines: trimVerificationTrailingBlankLine(preflight.fragments.flatMap(renderFragment)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Seals",
        lines: trimVerificationTrailingBlankLine(preflight.seals.flatMap(renderSeal)),
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

function renderFragment(
  fragment:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment,
): string[] {
  return [
    `### ${fragment.order}. ${fragment.nodeVersion} ${fragment.code}`,
    `- Fragment name: ${fragment.fragmentName}`,
    `- Kind: ${fragment.kind}`,
    `- Value mode: ${fragment.valueMode}`,
    `- Source capture input: ${fragment.sourceCaptureInputCode}`,
    `- Source capture input ready: ${fragment.sourceCaptureInputReady}`,
    `- Source capture input required: ${fragment.sourceCaptureInputRequired}`,
    `- Source capture still blocked: ${fragment.sourceCaptureStillBlocked}`,
    `- Required capture input: ${fragment.requiredCaptureInputName}`,
    `- Required capture input present: ${fragment.requiredCaptureInputPresent}`,
    `- Artifact blocker code: ${fragment.artifactBlockerCode}`,
    `- Fragment purpose: ${fragment.fragmentPurpose}`,
    `- Required for artifact preflight: ${fragment.requiredForArtifactPreflight}`,
    `- Artifact materialized: ${fragment.artifactMaterialized}`,
    `- Raw signature material present: ${fragment.rawSignatureMaterialPresent}`,
    `- Approval grant emitted: ${fragment.approvalGrantEmitted}`,
    `- Ready for signed approval capture artifact preflight fragment: ${fragment.readyForSignedApprovalCaptureArtifactPreflightFragment}`,
    `- Ready for signed approval capture: ${fragment.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${fragment.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${fragment.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${fragment.readyForRuntimePayload}`,
    `- Writes allowed: ${fragment.writesAllowed}`,
    `- Starts services: ${fragment.startsServices}`,
    `- Mutates sibling state: ${fragment.mutatesSiblingState}`,
    "",
  ];
}

function renderSeal(
  seal:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal,
): string[] {
  return [
    `### ${seal.order}. ${seal.nodeVersion} ${seal.code}`,
    `- Kind: ${seal.kind}`,
    `- Source artifact fragment: ${seal.sourceArtifactFragmentCode}`,
    `- Source artifact fragment ready: ${seal.sourceArtifactFragmentReady}`,
    `- Rejection code: ${seal.rejectionCode}`,
    `- Seal text: ${seal.sealText}`,
    `- Rejects missing fragment: ${seal.rejectsMissingFragment}`,
    `- Blocks unsigned artifact: ${seal.blocksUnsignedArtifact}`,
    `- Blocks auto materialization: ${seal.blocksAutoMaterialization}`,
    `- Blocks runtime payload: ${seal.blocksRuntimePayload}`,
    `- Blocks writes: ${seal.blocksWrites}`,
    `- Blocks sibling mutation: ${seal.blocksSiblingMutation}`,
    `- Ready for signed approval capture artifact preflight seal: ${seal.readyForSignedApprovalCaptureArtifactPreflightSeal}`,
    `- Ready for signed approval capture: ${seal.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${seal.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${seal.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${seal.readyForRuntimePayload}`,
    `- Writes allowed: ${seal.writesAllowed}`,
    `- Starts services: ${seal.startsServices}`,
    `- Mutates sibling state: ${seal.mutatesSiblingState}`,
    "",
  ];
}
