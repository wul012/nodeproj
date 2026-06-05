import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageMarkdown(
  reviewPackage: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
): string {
  return [
    "# Controlled read-only shard preview live read-only window evidence intake review package",
    "",
    `- Package version: ${reviewPackage.packageVersion}`,
    `- Source intake ledger version: ${reviewPackage.sourceIntakeLedgerVersion}`,
    `- Package state: ${reviewPackage.packageState}`,
    `- Ready for operator intake review: ${reviewPackage.readyForOperatorIntakeReview}`,
    `- Ready for manual evidence entry: ${reviewPackage.readyForManualEvidenceEntry}`,
    `- Ready for live execution: ${reviewPackage.readyForLiveExecution}`,
    `- Ready for production execution: ${reviewPackage.readyForProductionExecution}`,
    `- Control count: ${reviewPackage.controlCount}`,
    `- Ledger gate review control count: ${reviewPackage.ledgerGateReviewControlCount}`,
    `- Target review control count: ${reviewPackage.targetReviewControlCount}`,
    `- Maintenance review control count: ${reviewPackage.maintenanceReviewControlCount}`,
    `- Source ledger entry coverage count: ${reviewPackage.sourceLedgerEntryCoverageCount}`,
    `- Target count: ${reviewPackage.targetCount}`,
    `- Passed gates: ${reviewPackage.passedGateCount}/${reviewPackage.gateCount}`,
    `- Imports runtime payload: ${reviewPackage.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${reviewPackage.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${reviewPackage.containsSecretValue}`,
    `- Package digest: ${reviewPackage.packageDigest}`,
    "",
    "## Gates",
    ...renderEntries(reviewPackage.gates),
    "",
    "## Controls",
    ...reviewPackage.controls.flatMap(renderControl),
    "",
    "## Blocked Reasons",
    ...(reviewPackage.blockedReasonCodes.length === 0
      ? ["- none"]
      : reviewPackage.blockedReasonCodes.map((reason) => `- ${reason}`)),
  ].join("\n");
}

function renderControl(
  control: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl,
): string[] {
  return [
    `### ${control.order}. ${control.nodeVersion} ${control.code}`,
    `- Kind: ${control.kind}`,
    `- Scope: ${control.scope}`,
    `- Source ledger gate: ${control.sourceLedgerGate}`,
    `- Source gate passed: ${control.sourceGatePassed}`,
    `- Source ledger entry codes: ${control.sourceLedgerEntryCodes.join(", ")}`,
    `- Review instruction: ${control.reviewInstruction}`,
    `- Blocking policy: ${control.blockingPolicy}`,
    `- Maintenance action: ${control.maintenanceAction}`,
    `- Review state: ${control.reviewState}`,
    `- Requires operator review: ${control.requiresOperatorReview}`,
    `- Imports runtime payload: ${control.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${control.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${control.containsSecretValue}`,
    `- Writes allowed: ${control.writesAllowed}`,
    `- Automatic service start: ${control.automaticServiceStart}`,
    "",
  ];
}
