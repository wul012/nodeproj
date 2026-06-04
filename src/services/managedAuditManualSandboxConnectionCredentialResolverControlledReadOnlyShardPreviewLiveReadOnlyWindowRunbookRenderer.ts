import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageMarkdown(
  runbook: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage,
): string {
  return [
    "# Controlled read-only shard preview live read-only window runbook package",
    "",
    `- Package version: ${runbook.packageVersion}`,
    `- Package state: ${runbook.packageState}`,
    `- Ready for operator live read-only window: ${runbook.readyForOperatorLiveReadOnlyWindow}`,
    `- Ready for production execution: ${runbook.readyForProductionExecution}`,
    `- Section count: ${runbook.sectionCount}`,
    `- Owner count: ${runbook.ownerCount}`,
    `- Cleanup required sections: ${runbook.cleanupRequiredSectionCount}`,
    `- Passed gates: ${runbook.passedGateCount}/${runbook.gateCount}`,
    `- Package digest: ${runbook.packageDigest}`,
    "",
    "## Gates",
    ...renderEntries(runbook.gates),
    "",
    "## Sections",
    ...runbook.sections.flatMap(renderSection),
    "",
    "## Blocked Reasons",
    ...(runbook.blockedReasonCodes.length === 0
      ? ["- none"]
      : runbook.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
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
