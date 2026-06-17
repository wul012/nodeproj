import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown(
  runbook: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window runbook package",
    meta: [
      ["Package version", runbook.packageVersion],
      ["Package state", runbook.packageState],
      ["Ready for operator live read-only window", runbook.readyForOperatorLiveReadOnlyWindow],
      ["Ready for production execution", runbook.readyForProductionExecution],
      ["Section count", runbook.sectionCount],
      ["Owner count", runbook.ownerCount],
      ["Cleanup required sections", runbook.cleanupRequiredSectionCount],
      ["Passed gates", `${runbook.passedGateCount}/${runbook.gateCount}`],
      ["Package digest", runbook.packageDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(runbook.gates), bodyLeadingBlankLine: false },
      { heading: "Sections", lines: runbook.sections.flatMap(renderSection), bodyLeadingBlankLine: false },
      {
        heading: "Blocked Reasons",
        lines: renderBlockedReasons(runbook.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderBlockedReasons(blockedReasonCodes: readonly string[]): string[] {
  return blockedReasonCodes.length === 0
    ? ["- none"]
    : blockedReasonCodes.map((reason) => `- ${reason}`);
}

function renderSection(section: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection): string[] {
  return [
    `### ${section.order}. ${section.nodeVersion} ${section.code}`,
    `- Kind: ${section.kind}`,
    `- Owner: ${section.owner}`,
    `- Verifies stage: ${section.verifiesStageCode}`,
    `- Operator instruction: ${section.operatorInstruction}`,
    `- Required evidence: ${section.requiredEvidence}`,
    `- Cleanup required: ${section.cleanupRequired}`,
    `- Read-only: ${section.readOnly}`,
    `- Writes allowed: ${section.writesAllowed}`,
    `- Automatic service start: ${section.automaticServiceStart}`,
    "",
  ];
}
