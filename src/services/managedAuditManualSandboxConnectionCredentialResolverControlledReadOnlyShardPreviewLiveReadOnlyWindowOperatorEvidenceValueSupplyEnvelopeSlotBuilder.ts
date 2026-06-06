import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeEvidenceVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_ENVELOPE_VERSIONS = [
  "Node v937",
  "Node v938",
  "Node v939",
  "Node v940",
  "Node v941",
  "Node v942",
  "Node v943",
  "Node v944",
  "Node v945",
  "Node v946",
  "Node v947",
  "Node v948",
  "Node v949",
  "Node v950",
  "Node v951",
  "Node v952",
  "Node v953",
  "Node v954",
  "Node v955",
  "Node v956",
  "Node v957",
  "Node v958",
  "Node v959",
  "Node v960",
  "Node v961",
] as const;

interface ValueSupplyEnvelopeTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion;
  code: string;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlotKind;
  sourceFreshSiblingIntakeSlotCode: string;
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceExpectation: string;
  envelopeFieldNames: string[];
}

const VALUE_SUPPLY_ENVELOPE_TEMPLATES: readonly ValueSupplyEnvelopeTemplate[] = Object.freeze([
  template("Node v937", "VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_PROFILE", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_CLOSEOUT_PROFILE",
    "java-v633-value-draft-closeout-service", "java-value-draft-closeout-profile",
    "Java value draft closeout profile is available for envelope review.", ["javaProfile", "profileVersion"]),
  template("Node v938", "VALUE_SUPPLY_ENVELOPE_JAVA_RESPONSE_VERSION", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_CLOSEOUT_SOURCE_VERSION",
    "java-v633-value-draft-closeout-service", "java-value-draft-closeout-response-version",
    "Java closeout response version remains pinned while the project tag is v633.", ["javaResponseVersion"]),
  template("Node v939", "VALUE_SUPPLY_ENVELOPE_JAVA_VERSION_RANGE", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_NODE_V886_ALIGNMENT",
    "java-v633-value-draft-closeout-service", "java-value-draft-closeout-version-range",
    "Java closeout documents the v609-v633 value draft range.", ["javaVersionRange"]),
  template("Node v940", "VALUE_SUPPLY_ENVELOPE_JAVA_READY_FIELD", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_IMPORT_LOCK",
    "java-v633-value-draft-response", "java-value-draft-response-ready-field",
    "Java response exposes readiness for operator evidence value draft only.", ["readyForOperatorEvidenceValueDraft"]),
  template("Node v941", "VALUE_SUPPLY_ENVELOPE_JAVA_ACTUAL_VALUE_STATE", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_READY_FIELD",
    "java-v633-value-draft-response", "java-value-draft-response-actual-value-state",
    "Java response carries actualValueState for explicit not-supplied verification.", ["actualValueState"]),
  template("Node v942", "VALUE_SUPPLY_ENVELOPE_JAVA_IMPORT_BLOCK", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_EVIDENCE_IMPORT_BLOCK",
    "java-v633-value-draft-response", "java-value-draft-response-evidence-import-blocked",
    "Java response keeps evidence import separate from value draft readiness.", ["readyForEvidenceImport"]),
  template("Node v943", "VALUE_SUPPLY_ENVELOPE_JAVA_MANUAL_ENTRY_BLOCK", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_MANUAL_ENTRY_BLOCK",
    "java-v633-value-draft-response", "java-value-draft-response-manual-entry-blocked",
    "Java response keeps manual evidence entry disabled.", ["readyForManualEvidenceEntry"]),
  template("Node v944", "VALUE_SUPPLY_ENVELOPE_JAVA_LIVE_EXECUTION_BLOCK", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_PRODUCTION_EXECUTION_BLOCK",
    "java-v633-value-draft-response", "java-value-draft-response-live-execution-blocked",
    "Java response keeps live execution disabled.", ["readyForLiveExecution"]),
  template("Node v945", "VALUE_SUPPLY_ENVELOPE_JAVA_PRODUCTION_EXECUTION_BLOCK", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_ROUTE_TEST",
    "java-v633-value-draft-response", "java-value-draft-response-production-execution-blocked",
    "Java response keeps production execution disabled.", ["readyForProductionExecution"]),
  template("Node v946", "VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_ROUTE_TEST", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_STATUS_TEST",
    "java-v633-value-draft-assurance-test", "java-value-draft-test-closeout-route",
    "Java assurance test covers the closeout route.", ["javaCloseoutRoute"]),
  template("Node v947", "VALUE_SUPPLY_ENVELOPE_JAVA_READY_TEST", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_READY_TEST",
    "java-v633-value-draft-assurance-test", "java-value-draft-test-ready-true",
    "Java assurance test requires value draft readiness.", ["javaReadyAssertion"]),
  template("Node v948", "VALUE_SUPPLY_ENVELOPE_JAVA_IMPORT_FALSE_TEST", "java",
    "java-value-draft-evidence-slot", "FRESH_INTAKE_JAVA_IMPORT_BLOCK_TEST",
    "java-v633-value-draft-assurance-test", "java-value-draft-test-import-false",
    "Java assurance test requires evidence import to remain false.", ["javaImportFalseAssertion"]),
  template("Node v949", "VALUE_SUPPLY_ENVELOPE_MINI_KV_CONTRACT", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_CONTRACT",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-contract",
    "mini-kv source exposes the value draft contract.", ["miniKvContract"]),
  template("Node v950", "VALUE_SUPPLY_ENVELOPE_MINI_KV_COMMAND", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_COMMAND",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-command",
    "mini-kv source exposes SHARDROUTEVALUEDRAFTJSON.", ["miniKvCommand"]),
  template("Node v951", "VALUE_SUPPLY_ENVELOPE_MINI_KV_NODE_PLAN", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_NODE_PLAN",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-node-plan",
    "mini-kv value draft points at the Node v911 value draft plan as source evidence only.", ["sourceNodePlan"]),
  template("Node v952", "VALUE_SUPPLY_ENVELOPE_MINI_KV_STAGE", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_STAGE",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-stage-v585",
    "mini-kv source reaches the v585 release package stage.", ["valueDraftStage"]),
  template("Node v953", "VALUE_SUPPLY_ENVELOPE_MINI_KV_SLOT_COUNT", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_SLOT_COUNT",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-slot-count",
    "mini-kv value draft keeps twenty-five operator value draft slots.", ["operatorValueDraftSlotCount"]),
  template("Node v954", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ACCEPTED_ZERO", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_IMPORTED_VALUE_ZERO",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-accepted-zero",
    "mini-kv value draft accepts zero operator values.", ["acceptedOperatorValueCount"]),
  template("Node v955", "VALUE_SUPPLY_ENVELOPE_MINI_KV_IMPORTED_ZERO", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_READY_PREFLIGHT",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-imported-zero",
    "mini-kv value draft imports zero evidence values.", ["importedEvidenceValueCount"]),
  template("Node v956", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ACTUAL_STATE", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_EVIDENCE_IMPORT_FALSE",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-actual-state",
    "mini-kv value draft pins actualValueState as not-supplied.", ["actualValueState"]),
  template("Node v957", "VALUE_SUPPLY_ENVELOPE_MINI_KV_READY_TRUE", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_NO_WAL",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-ready-true",
    "mini-kv value draft is ready for draft review only.", ["readyForOperatorEvidenceValueDraft"]),
  template("Node v958", "VALUE_SUPPLY_ENVELOPE_MINI_KV_IMPORT_FALSE", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_COMMAND_TEST",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-evidence-import-false",
    "mini-kv value draft keeps evidence import disabled.", ["readyForEvidenceImport"]),
  template("Node v959", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ADAPTER_DISABLED", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_STORE_UNCHANGED_TEST",
    "mini-kv-v585-value-draft-source", "mini-kv-value-draft-adapter-disabled",
    "mini-kv value draft keeps the value supply adapter disabled.", ["valueSupplyAdapterEnabled"]),
  template("Node v960", "VALUE_SUPPLY_ENVELOPE_MINI_KV_NO_WRITE_TEST", "miniKv",
    "mini-kv-value-draft-evidence-slot", "FRESH_INTAKE_MINI_KV_RELEASE_EXPLANATION",
    "mini-kv-v585-value-draft-test", "mini-kv-value-draft-test-store-unchanged",
    "mini-kv focused test proves SHARDROUTEVALUEDRAFTJSON leaves the store unchanged.", ["storeSize"]),
  template("Node v961", "VALUE_SUPPLY_ENVELOPE_CLOSEOUT", "node",
    "node-value-supply-envelope-closeout-slot", "FRESH_INTAKE_CROSS_PROJECT_CLOSEOUT",
    "mini-kv-v585-readme", "mini-kv-readme-v585",
    "Node closes the value supply envelope while no WAL, write routing, or sibling mutation is permitted.",
    ["closeoutState", "nextExplicitOperatorValuesRequired"]),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlots(input: {
  sourceFreshSiblingIntakeReady: boolean;
  freshSiblingIntakeSlots: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot[];
  files: Record<string, HistoricalEvidenceFile>;
  snippets: readonly HistoricalSnippetMatch[];
}): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot[] {
  const freshSiblingSlotsByCode = new Map(input.freshSiblingIntakeSlots.map((slot) => [slot.code, slot]));
  const snippetsById = new Map(input.snippets.map((snippetMatch) => [snippetMatch.id, snippetMatch]));

  return VALUE_SUPPLY_ENVELOPE_TEMPLATES.map((slotTemplate, index) => {
    const sourceFreshSiblingIntakeSlot =
      freshSiblingSlotsByCode.get(slotTemplate.sourceFreshSiblingIntakeSlotCode);
    const file = input.files[slotTemplate.evidenceFileId];
    const snippetMatch = snippetsById.get(slotTemplate.evidenceSnippetId);
    const evidenceFilePresent = file?.exists ?? false;
    const evidenceSnippetMatched = snippetMatch?.matched ?? false;
    const sourceFreshSiblingIntakeSlotReady =
      input.sourceFreshSiblingIntakeReady
      && (sourceFreshSiblingIntakeSlot?.readyForFreshSiblingEvidenceIntake ?? false);
    const readyForValueSupplyEnvelopeReview =
      sourceFreshSiblingIntakeSlotReady && evidenceFilePresent && evidenceSnippetMatched;

    return {
      order: index + 1,
      nodeVersion: slotTemplate.nodeVersion,
      code: slotTemplate.code,
      kind: slotTemplate.kind,
      project: slotTemplate.project,
      scope: sourceFreshSiblingIntakeSlot?.scope ?? "crossProject",
      sourceFreshSiblingIntakeSlotCode: slotTemplate.sourceFreshSiblingIntakeSlotCode,
      sourceFreshSiblingIntakeNodeVersion: sourceFreshSiblingIntakeSlot?.nodeVersion ?? "Node v936",
      sourceFreshSiblingIntakeSlotReady,
      evidenceFileId: slotTemplate.evidenceFileId,
      evidenceSnippetId: slotTemplate.evidenceSnippetId,
      evidenceFilePresent,
      evidenceSnippetMatched,
      evidenceResolvedFromHistoricalFixture:
        file?.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces") ?? false,
      evidenceExpectation: slotTemplate.evidenceExpectation,
      valueDraftEvidenceVersion: valueDraftEvidenceVersion(slotTemplate.project),
      envelopeFieldNames: [...slotTemplate.envelopeFieldNames],
      envelopeValueState: "not-supplied",
      valueSupplyPolicy: "explicit-operator-value-required",
      missingValuePolicy: "block-value-supply",
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      valueSupplyAdapterEnabled: false,
      readyForValueSupplyEnvelopeReview,
      readyForOperatorValueSupply: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForLiveExecution: false,
      readyForProductionExecution: false,
      importsRuntimePayload: false,
      acceptsSyntheticEvidence: false,
      containsSecretValue: false,
      readOnly: true,
      writesAllowed: false,
      automaticServiceStart: false,
      startsServices: false,
      mutatesSiblingState: false,
    };
  });
}

function valueDraftEvidenceVersion(
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeEvidenceVersion {
  if (project === "java") {
    return "Java v633";
  }
  if (project === "miniKv") {
    return "mini-kv v585";
  }
  return "Node v936";
}

function template(
  nodeVersion: ValueSupplyEnvelopeTemplate["nodeVersion"],
  code: string,
  project: ValueSupplyEnvelopeTemplate["project"],
  kind: ValueSupplyEnvelopeTemplate["kind"],
  sourceFreshSiblingIntakeSlotCode: string,
  evidenceFileId: string,
  evidenceSnippetId: string,
  evidenceExpectation: string,
  envelopeFieldNames: string[],
): ValueSupplyEnvelopeTemplate {
  return {
    nodeVersion,
    code,
    project,
    kind,
    sourceFreshSiblingIntakeSlotCode,
    evidenceFileId,
    evidenceSnippetId,
    evidenceExpectation,
    envelopeFieldNames,
  };
}
