import { sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageLedgerGate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const EXPECTED_REVIEW_PACKAGE_VERSIONS = [
  "Node v812",
  "Node v813",
  "Node v814",
  "Node v815",
  "Node v816",
  "Node v817",
  "Node v818",
  "Node v819",
  "Node v820",
  "Node v821",
  "Node v822",
  "Node v823",
  "Node v824",
  "Node v825",
  "Node v826",
  "Node v827",
  "Node v828",
  "Node v829",
  "Node v830",
  "Node v831",
  "Node v832",
  "Node v833",
  "Node v834",
  "Node v835",
  "Node v836",
] as const;

const REQUIRED_TARGETS: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget[] = [
  "node-http",
  "java-http",
  "mini-kv-tcp",
  "archive",
  "policy",
];

type EntrySelector =
  | "all"
  | "none"
  | "node"
  | "java"
  | "miniKv"
  | "policyArchive";

interface ReviewTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceLedgerGate: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageLedgerGate;
  entrySelector: EntrySelector;
  reviewInstruction: string;
  blockingPolicy: string;
  maintenanceAction: string;
}

const REVIEW_TEMPLATES: readonly ReviewTemplate[] = Object.freeze([
  review("Node v812", "INTAKE_REVIEW_SOURCE_PACKET_READY", "ledger-gate-review", "ledger",
    "sourceEvidencePacketReady", "none", "Confirm the v791 source evidence packet is ready.",
    "Block review if the source packet is not ready.", "Preserve the source-packet readiness gate."),
  review("Node v813", "INTAKE_REVIEW_CONTROL_COUNT_COMPLETE", "ledger-gate-review", "ledger",
    "entryCountComplete", "none", "Confirm all twenty intake ledger entries are present.",
    "Block review if any intake entry is missing.", "Keep entry-count checks centralized in the review package."),
  review("Node v814", "INTAKE_REVIEW_VERSION_ORDER", "ledger-gate-review", "ledger",
    "versionsSequential", "none", "Confirm intake ledger versions are sequential.",
    "Block review if version order drifts.", "Keep version sequencing explicit for archive readers."),
  review("Node v815", "INTAKE_REVIEW_SOURCE_RECORD_MAPPING", "ledger-gate-review", "ledger",
    "eachEntryMapsEvidenceRecord", "none", "Confirm every intake entry maps back to v791 evidence.",
    "Block review if a source record mapping is missing.", "Keep source mapping out of manual-entry code."),
  review("Node v816", "INTAKE_REVIEW_PENDING_CAPTURE_STATE", "ledger-gate-review", "ledger",
    "sourceRecordsPendingManualCapture", "none", "Confirm source records remain pending manual capture.",
    "Block review if any source record was already captured.", "Prevent accidental conversion to live evidence."),
  review("Node v817", "INTAKE_REVIEW_REQUIRED_FIELDS_PRESERVED", "ledger-gate-review", "ledger",
    "requiredFieldsPreserved", "none", "Confirm required fields are preserved across intake entries.",
    "Block review if a required field is dropped.", "Keep required-field preservation auditable."),
  review("Node v818", "INTAKE_REVIEW_ACCEPTANCE_CRITERIA_PRESERVED", "ledger-gate-review", "ledger",
    "acceptanceCriteriaPreserved", "none", "Confirm acceptance criteria are preserved.",
    "Block review if any acceptance criterion is missing.", "Keep acceptance criteria separate from runtime data."),
  review("Node v819", "INTAKE_REVIEW_REDACTION_RULES_PRESERVED", "ledger-gate-review", "ledger",
    "redactionRulesPreserved", "none", "Confirm redaction rules are preserved.",
    "Block review if a redaction rule is missing.", "Keep redaction review before manual evidence entry."),
  review("Node v820", "INTAKE_REVIEW_MANUAL_INPUT_STATE", "ledger-gate-review", "ledger",
    "manualInputStateOnly", "none", "Confirm all entries await manual input.",
    "Block review if an entry has moved beyond manual input.", "Keep the package non-importing."),
  review("Node v821", "INTAKE_REVIEW_RUNTIME_PAYLOAD_EXCLUSION", "ledger-gate-review", "ledger",
    "noRuntimePayloadImported", "none", "Confirm no runtime payload has been imported.",
    "Block review if runtime payload appears.", "Keep runtime payload import in a future explicit importer."),
  review("Node v822", "INTAKE_REVIEW_SYNTHETIC_EVIDENCE_REJECTION", "ledger-gate-review", "ledger",
    "noSyntheticEvidenceAccepted", "none", "Confirm synthetic evidence is rejected.",
    "Block review if synthetic evidence is accepted.", "Keep generated placeholders out of accepted evidence."),
  review("Node v823", "INTAKE_REVIEW_TARGET_COVERAGE", "ledger-gate-review", "ledger",
    "targetCoverageComplete", "none", "Confirm target coverage includes Node, Java, mini-kv, archive, and policy.",
    "Block review if a target is missing.", "Keep target coverage reusable for future entry forms."),
  review("Node v824", "INTAKE_REVIEW_CLEANUP_COVERAGE", "ledger-gate-review", "ledger",
    "cleanupEntriesPresent", "none", "Confirm cleanup entries are present.",
    "Block review if cleanup coverage is incomplete.", "Keep cleanup ownership visible before execution."),
  review("Node v825", "INTAKE_REVIEW_FAILURE_CLASS_COVERAGE", "ledger-gate-review", "ledger",
    "failureClassesPresent", "none", "Confirm failure classes are distinct and present.",
    "Block review if failure triage is ambiguous.", "Keep failure taxonomy stable for future import."),
  review("Node v826", "INTAKE_REVIEW_SECRET_EXCLUSION", "ledger-gate-review", "ledger",
    "noSecretValues", "none", "Confirm no secret values are present.",
    "Block review if a secret value appears.", "Keep secret exclusion visible in the review route."),
  review("Node v827", "INTAKE_REVIEW_READ_ONLY_BOUNDARY", "ledger-gate-review", "ledger",
    "allEntriesReadOnly", "none", "Confirm every intake entry is read-only.",
    "Block review if any entry is not read-only.", "Keep read-only checks independent of target checks."),
  review("Node v828", "INTAKE_REVIEW_WRITE_BLOCK", "ledger-gate-review", "ledger",
    "noWritesAllowed", "none", "Confirm writes remain blocked.",
    "Block review if writes are allowed.", "Keep write routing locked before any operator entry."),
  review("Node v829", "INTAKE_REVIEW_SERVICE_START_BLOCK", "ledger-gate-review", "ledger",
    "noAutomaticServiceStart", "none", "Confirm automatic service start is blocked.",
    "Block review if any service start path is enabled.", "Keep service lifecycle ownership outside Node."),
  review("Node v830", "INTAKE_REVIEW_PRODUCTION_EXECUTION_BLOCK", "ledger-gate-review", "ledger",
    "productionExecutionBlocked", "none", "Confirm production execution remains blocked.",
    "Block review if production execution is enabled.", "Keep production execution out of intake review."),
  review("Node v831", "INTAKE_REVIEW_NODE_TARGET", "target-intake-review", "node",
    "targetCoverageComplete", "node", "Confirm Node intake records are covered.",
    "Block review if Node health or Markdown intake is missing.", "Keep Node target review compact."),
  review("Node v832", "INTAKE_REVIEW_JAVA_TARGET", "target-intake-review", "java",
    "targetCoverageComplete", "java", "Confirm Java intake records are covered.",
    "Block review if Java readiness or acceptance intake is missing.", "Document that Java can continue in parallel."),
  review("Node v833", "INTAKE_REVIEW_MINI_KV_TARGET", "target-intake-review", "miniKv",
    "targetCoverageComplete", "miniKv", "Confirm mini-kv intake records are covered.",
    "Block review if SHARDJSON or mini-kv acceptance intake is missing.", "Document that mini-kv can continue in parallel."),
  review("Node v834", "INTAKE_REVIEW_POLICY_ARCHIVE_TARGETS", "archive-policy-review", "policyArchive",
    "targetCoverageComplete", "policyArchive", "Confirm policy and archive intake records are covered.",
    "Block review if policy or archive intake is missing.", "Keep policy/archive review out of the main renderer."),
  review("Node v835", "INTAKE_REVIEW_RENDERER_MAINTENANCE_BOUNDARY", "maintenance-boundary-review", "maintenance",
    "manualInputStateOnly", "all", "Confirm live-window Markdown sections are split from the main renderer.",
    "Block maintenance closeout if review package sections are not route-visible.",
    "Move live-window section rendering into a dedicated profile-section renderer."),
  review("Node v836", "INTAKE_REVIEW_PACKAGE_CLOSEOUT", "closeout", "crossProject",
    "productionExecutionBlocked", "all", "Confirm the review package is ready for operator intake review only.",
    "Block closeout if it enables manual evidence entry or production execution.",
    "State that Java and mini-kv can continue in parallel without waiting for Node."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage(
  ledger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage {
  const ledgerEntryCodes = new Set(ledger.entries.map((entry) => entry.code));
  const controls = REVIEW_TEMPLATES.map((template, index) =>
    createReviewControl(template, ledger, index));
  const sourceLedgerGateNames = new Set(controls.map((control) => control.sourceLedgerGate));
  const coveredEntryCodes = new Set(controls.flatMap((control) => control.sourceLedgerEntryCodes));
  const targets = new Set(ledger.entries.map((entry) => entry.target));
  const gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageGates = {
    sourceIntakeLedgerReady: ledger.readyForManualEvidenceIntake,
    controlCountComplete: controls.length === EXPECTED_REVIEW_PACKAGE_VERSIONS.length,
    versionsSequential: controls.every((control, index) =>
      control.nodeVersion === EXPECTED_REVIEW_PACKAGE_VERSIONS[index]),
    sourceLedgerGateNamesCovered: Object.keys(ledger.gates).every((gate) =>
      sourceLedgerGateNames.has(gate as ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageLedgerGate)),
    sourceLedgerGatePassagePreserved: ledger.passedGateCount === ledger.gateCount,
    sourceLedgerEntriesCovered: ledger.entries.every((entry) => coveredEntryCodes.has(entry.code)),
    sourceLedgerEntryCodesValid: controls.every((control) =>
      control.sourceLedgerEntryCodes.every((code) => ledgerEntryCodes.has(code))),
    manualReviewStateOnly: controls.every((control) => control.reviewState === "awaiting-operator-review"),
    requiredFieldsPreserved: ledger.gates.requiredFieldsPreserved && ledger.requiredFieldCount > 0,
    acceptanceCriteriaPreserved: ledger.gates.acceptanceCriteriaPreserved
      && ledger.acceptanceCriterionCount > 0,
    redactionRulesPreserved: ledger.gates.redactionRulesPreserved,
    targetCoveragePreserved: ledger.gates.targetCoverageComplete
      && REQUIRED_TARGETS.every((target) => targets.has(target)),
    cleanupCoveragePreserved: ledger.gates.cleanupEntriesPresent && ledger.cleanupEntryCount === 2,
    failureClassesPreserved: ledger.gates.failureClassesPresent
      && ledger.failureClassCount === ledger.entryCount,
    maintenanceControlsPresent: controls.some((control) => control.kind === "maintenance-boundary-review"),
    crossProjectParallelPlanClear: controls.some((control) =>
      control.scope === "crossProject" && control.maintenanceAction.includes("Java and mini-kv can continue")),
    noRuntimePayloadImported: !ledger.importsRuntimePayload
      && controls.every((control) => !control.importsRuntimePayload),
    noSyntheticEvidenceAccepted: !ledger.acceptsSyntheticEvidence
      && controls.every((control) => !control.acceptsSyntheticEvidence),
    noSecretValues: !ledger.containsSecretValue && controls.every((control) => !control.containsSecretValue),
    allControlsReadOnly: controls.every((control) => control.readOnly),
    noWritesAllowed: !ledger.writeRoutingAllowed && controls.every((control) => !control.writesAllowed),
    noAutomaticServiceStart: !ledger.startsServices
      && controls.every((control) => !control.automaticServiceStart && !control.startsServices),
    productionExecutionBlocked: !ledger.readyForProductionExecution && !ledger.executionAllowed,
  };
  const blockedReasonCodes = createReviewPackageBlockedReasons(gates);
  const readyForOperatorIntakeReview = blockedReasonCodes.length === 0;
  const packageDigest = sha256StableJson({
    packageVersion: "Node v836",
    sourceIntakeLedgerVersion: ledger.ledgerVersion,
    sourceIntakeLedgerDigest: ledger.ledgerDigest,
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.scope,
      control.sourceLedgerGate,
      control.sourceGatePassed,
      control.sourceLedgerEntryCodes,
      control.reviewState,
    ]),
    gates,
  });

  return {
    packageVersion: "Node v836",
    sourceIntakeLedgerVersion: "Node v811",
    packageState: readyForOperatorIntakeReview ? "ready-for-operator-intake-review" : "blocked",
    readyForOperatorIntakeReview,
    readyForManualEvidenceEntry: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    controlCount: controls.length,
    ledgerGateReviewControlCount: controls
      .filter((control) => control.kind === "ledger-gate-review").length,
    targetReviewControlCount: controls
      .filter((control) => control.kind === "target-intake-review"
        || control.kind === "archive-policy-review").length,
    maintenanceReviewControlCount: controls
      .filter((control) => control.kind === "maintenance-boundary-review").length,
    sourceLedgerEntryCoverageCount: coveredEntryCodes.size,
    targetCount: targets.size,
    requiredFieldCount: ledger.requiredFieldCount,
    acceptanceCriterionCount: ledger.acceptanceCriterionCount,
    cleanupEntryCount: ledger.cleanupEntryCount,
    failureClassCount: ledger.failureClassCount,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    controls,
    packageDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function createReviewControl(
  template: ReviewTemplate,
  ledger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
  index: number,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl {
  return {
    order: index + 1,
    nodeVersion: template.nodeVersion,
    code: template.code,
    kind: template.kind,
    scope: template.scope,
    sourceLedgerGate: template.sourceLedgerGate,
    sourceGatePassed: ledger.gates[template.sourceLedgerGate],
    sourceLedgerEntryCodes: selectLedgerEntryCodes(template.entrySelector, ledger),
    reviewInstruction: template.reviewInstruction,
    blockingPolicy: template.blockingPolicy,
    maintenanceAction: template.maintenanceAction,
    reviewState: "awaiting-operator-review",
    requiresOperatorReview: true,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
    readOnly: true,
    writesAllowed: false,
    automaticServiceStart: false,
    startsServices: false,
    mutatesSiblingState: false,
  };
}

function selectLedgerEntryCodes(
  selector: EntrySelector,
  ledger: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger,
): string[] {
  if (selector === "all") {
    return ledger.entries.map((entry) => entry.code);
  }
  if (selector === "none") {
    return [];
  }

  return ledger.entries
    .filter((entry) => {
      if (selector === "node") {
        return entry.target === "node-http";
      }
      if (selector === "java") {
        return entry.target === "java-http";
      }
      if (selector === "miniKv") {
        return entry.target === "mini-kv-tcp";
      }
      return entry.target === "policy" || entry.target === "archive";
    })
    .map((entry) => entry.code);
}

function review(
  nodeVersion: ReviewTemplate["nodeVersion"],
  code: string,
  kind: ReviewTemplate["kind"],
  scope: ReviewTemplate["scope"],
  sourceLedgerGate: ReviewTemplate["sourceLedgerGate"],
  entrySelector: ReviewTemplate["entrySelector"],
  reviewInstruction: string,
  blockingPolicy: string,
  maintenanceAction: string,
): ReviewTemplate {
  return {
    nodeVersion,
    code,
    kind,
    scope,
    sourceLedgerGate,
    entrySelector,
    reviewInstruction,
    blockingPolicy,
    maintenanceAction,
  };
}

function createReviewPackageBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceIntakeLedgerReady, "SOURCE_INTAKE_LEDGER_NOT_READY"],
    [gates.controlCountComplete, "INTAKE_REVIEW_CONTROL_COUNT_INCOMPLETE"],
    [gates.versionsSequential, "INTAKE_REVIEW_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceLedgerGateNamesCovered, "INTAKE_REVIEW_LEDGER_GATES_NOT_COVERED"],
    [gates.sourceLedgerGatePassagePreserved, "INTAKE_REVIEW_LEDGER_GATES_NOT_PASSED"],
    [gates.sourceLedgerEntriesCovered, "INTAKE_REVIEW_LEDGER_ENTRIES_NOT_COVERED"],
    [gates.sourceLedgerEntryCodesValid, "INTAKE_REVIEW_LEDGER_ENTRY_CODE_INVALID"],
    [gates.manualReviewStateOnly, "INTAKE_REVIEW_NOT_OPERATOR_REVIEW_ONLY"],
    [gates.requiredFieldsPreserved, "INTAKE_REVIEW_REQUIRED_FIELDS_NOT_PRESERVED"],
    [gates.acceptanceCriteriaPreserved, "INTAKE_REVIEW_ACCEPTANCE_CRITERIA_NOT_PRESERVED"],
    [gates.redactionRulesPreserved, "INTAKE_REVIEW_REDACTION_RULES_NOT_PRESERVED"],
    [gates.targetCoveragePreserved, "INTAKE_REVIEW_TARGET_COVERAGE_NOT_PRESERVED"],
    [gates.cleanupCoveragePreserved, "INTAKE_REVIEW_CLEANUP_COVERAGE_NOT_PRESERVED"],
    [gates.failureClassesPreserved, "INTAKE_REVIEW_FAILURE_CLASSES_NOT_PRESERVED"],
    [gates.maintenanceControlsPresent, "INTAKE_REVIEW_MAINTENANCE_CONTROL_MISSING"],
    [gates.crossProjectParallelPlanClear, "INTAKE_REVIEW_CROSS_PROJECT_PLAN_NOT_CLEAR"],
    [gates.noRuntimePayloadImported, "INTAKE_REVIEW_RUNTIME_PAYLOAD_IMPORTED"],
    [gates.noSyntheticEvidenceAccepted, "INTAKE_REVIEW_SYNTHETIC_EVIDENCE_ACCEPTED"],
    [gates.noSecretValues, "INTAKE_REVIEW_SECRET_VALUE_PRESENT"],
    [gates.allControlsReadOnly, "INTAKE_REVIEW_CONTROL_NOT_READ_ONLY"],
    [gates.noWritesAllowed, "INTAKE_REVIEW_WRITES_ALLOWED"],
    [gates.noAutomaticServiceStart, "INTAKE_REVIEW_SERVICE_START_ENABLED"],
    [gates.productionExecutionBlocked, "INTAKE_REVIEW_PRODUCTION_EXECUTION_ENABLED"],
  ]);
}
