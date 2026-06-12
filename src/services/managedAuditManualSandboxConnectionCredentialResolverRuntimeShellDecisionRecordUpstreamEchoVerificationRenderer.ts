import {
  renderEntries,
  renderList,
} from "./liveProbeReportUtils.js";
import type {
  JavaV135RuntimeShellDecisionRecordEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationProfile,
  MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationProfile,
): string {
  return renderVerificationReportMarkdown({
    title: "Managed audit manual sandbox connection credential resolver runtime shell decision record upstream echo verification",
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Verification state", profile.verificationState],
      [
        "Ready for upstream echo verification",
        profile.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
      ],
      ["Ready for post-decision plan", profile.readyForPostRuntimeShellDecisionPlan],
      ["Runtime shell implemented", profile.runtimeShellImplemented],
      ["Runtime shell invocation allowed", profile.runtimeShellInvocationAllowed],
      ["Execution allowed", profile.executionAllowed],
      ["Connects managed audit", profile.connectsManagedAudit],
    ],
    sections: [
      { heading: "Source Node v299", entries: profile.sourceNodeV299 },
      { heading: "Java v135 Echo", lines: renderJavaReference(profile.upstreamEvidence.javaV135) },
      { heading: "mini-kv v132 Receipt", lines: renderMiniKvReference(profile.upstreamEvidence.miniKvV132) },
      { heading: "Echo Verification", entries: profile.echoVerification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No runtime shell decision record upstream echo verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No runtime shell decision record upstream echo verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No runtime shell decision record upstream echo verification recommendations.",
      },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderJavaReference(reference: JavaV135RuntimeShellDecisionRecordEchoReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      echoMode: reference.echoMode,
      sourceSpan: reference.sourceSpan,
      nextNodeVersion: reference.nextNodeVersion,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      readyForNodeV300: reference.readyForNodeV300,
      echoesNodeV299DecisionRecord: reference.echoesNodeV299DecisionRecord,
      blockedDecisionEchoed: reference.blockedDecisionEchoed,
      requiredEvidenceEchoed: reference.requiredEvidenceEchoed,
      noGoConditionsEchoed: reference.noGoConditionsEchoed,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; size=${file.sizeBytes}; resolved=${file.resolvedPath}`),
      "No Java evidence files.",
    ),
    "",
    "### Expected Snippets",
    "",
    ...renderList(
      reference.expectedSnippets.map((snippet) => `${snippet.id}: matched=${snippet.matched}; resolved=${snippet.resolvedPath}`),
      "No Java expected snippets.",
    ),
  ];
}

function renderMiniKvReference(reference: MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference): string[] {
  return [
    ...renderEntries({
      sourceVersion: reference.sourceVersion,
      receiptVersion: reference.receiptVersion,
      releaseVersion: reference.releaseVersion,
      consumerHint: reference.consumerHint,
      receiptDigest: reference.receiptDigest,
      evidencePresent: reference.evidencePresent,
      verificationDocumented: reference.verificationDocumented,
      readyForNodeV300: reference.readyForNodeV300,
      echoesNodeV299DecisionRecord: reference.echoesNodeV299DecisionRecord,
      blockedDecisionEchoed: reference.blockedDecisionEchoed,
      runtimeShellDecisionRecordOnly: reference.runtimeShellDecisionRecordOnly,
      sideEffectBoundariesClosed: reference.sideEffectBoundariesClosed,
    }),
    "",
    "### Evidence Files",
    "",
    ...renderList(
      reference.evidenceFiles.map((file) => `${file.id}: exists=${file.exists}; size=${file.sizeBytes}; resolved=${file.resolvedPath}`),
      "No mini-kv evidence files.",
    ),
    "",
    "### Expected Snippets",
    "",
    ...renderList(
      reference.expectedSnippets.map((snippet) => `${snippet.id}: matched=${snippet.matched}; resolved=${snippet.resolvedPath}`),
      "No mini-kv expected snippets.",
    ),
  ];
}
