import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_FRESH_SIBLING_INTAKE_VERSIONS = [
  "Node v912",
  "Node v913",
  "Node v914",
  "Node v915",
  "Node v916",
  "Node v917",
  "Node v918",
  "Node v919",
  "Node v920",
  "Node v921",
  "Node v922",
  "Node v923",
  "Node v924",
  "Node v925",
  "Node v926",
  "Node v927",
  "Node v928",
  "Node v929",
  "Node v930",
  "Node v931",
  "Node v932",
  "Node v933",
  "Node v934",
  "Node v935",
  "Node v936",
] as const;

interface FreshSiblingIntakeTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion;
  code: string;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotKind;
  sourceValueDraftSlotCode: string;
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceExpectation: string;
}

const FRESH_SIBLING_INTAKE_TEMPLATES: readonly FreshSiblingIntakeTemplate[] = Object.freeze([
  template("Node v912", "FRESH_INTAKE_JAVA_CLOSEOUT_PROFILE", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-closeout-service", "java-closeout-profile",
    "Java closeout exposes the operator evidence import preflight profile."),
  template("Node v913", "FRESH_INTAKE_JAVA_CLOSEOUT_SOURCE_VERSION", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-closeout-service", "java-closeout-source-version",
    "Java closeout service keeps its source response version pinned."),
  template("Node v914", "FRESH_INTAKE_JAVA_NODE_V886_ALIGNMENT", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-closeout-service", "java-closeout-node-v886-alignment",
    "Java preflight closeout states alignment to Node v886 import preflight."),
  template("Node v915", "FRESH_INTAKE_JAVA_IMPORT_LOCK", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-closeout-service", "java-closeout-import-remains-locked",
    "Java closeout keeps evidence import locked."),
  template("Node v916", "FRESH_INTAKE_JAVA_READY_FIELD", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-response", "java-response-ready-preflight",
    "Java response exposes readyForOperatorEvidenceImportPreflight."),
  template("Node v917", "FRESH_INTAKE_JAVA_EVIDENCE_IMPORT_BLOCK", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-response", "java-response-evidence-import-blocked",
    "Java response exposes readyForEvidenceImport for explicit false checks."),
  template("Node v918", "FRESH_INTAKE_JAVA_MANUAL_ENTRY_BLOCK", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-response", "java-response-manual-entry-blocked",
    "Java response exposes readyForManualEvidenceEntry for explicit false checks."),
  template("Node v919", "FRESH_INTAKE_JAVA_PRODUCTION_EXECUTION_BLOCK", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-response", "java-response-production-execution-blocked",
    "Java response exposes readyForProductionExecution for explicit false checks."),
  template("Node v920", "FRESH_INTAKE_JAVA_ROUTE_TEST", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-assurance-test", "java-test-closeout-route",
    "Java assurance test covers the closeout route."),
  template("Node v921", "FRESH_INTAKE_JAVA_STATUS_TEST", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-assurance-test", "java-test-closeout-status-passed",
    "Java assurance test requires passed status."),
  template("Node v922", "FRESH_INTAKE_JAVA_READY_TEST", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-assurance-test", "java-test-ready-preflight-true",
    "Java assurance test requires import preflight readiness."),
  template("Node v923", "FRESH_INTAKE_JAVA_IMPORT_BLOCK_TEST", "java", "java-import-preflight-evidence-slot",
    "VALUE_DRAFT_JAVA_TARGET", "java-v608-import-preflight-assurance-test", "java-test-evidence-import-false",
    "Java assurance test requires evidence import to remain false."),
  template("Node v924", "FRESH_INTAKE_MINI_KV_CONTRACT", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-contract",
    "mini-kv source exposes the import preflight contract."),
  template("Node v925", "FRESH_INTAKE_MINI_KV_COMMAND", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-command",
    "mini-kv source exposes SHARDROUTEIMPORTPREFLIGHTJSON."),
  template("Node v926", "FRESH_INTAKE_MINI_KV_NODE_PLAN", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-source-node-plan",
    "mini-kv source references Node v886 import preflight plan evidence."),
  template("Node v927", "FRESH_INTAKE_MINI_KV_STAGE", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-stage-v560",
    "mini-kv source reaches the v560 release package stage."),
  template("Node v928", "FRESH_INTAKE_MINI_KV_SLOT_COUNT", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-slot-count",
    "mini-kv source keeps the operator preflight slot count at twenty-five."),
  template("Node v929", "FRESH_INTAKE_MINI_KV_IMPORTED_VALUE_ZERO", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-imported-value-zero",
    "mini-kv source reports zero imported evidence values."),
  template("Node v930", "FRESH_INTAKE_MINI_KV_READY_PREFLIGHT", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-ready-preflight-true",
    "mini-kv source reports import preflight readiness."),
  template("Node v931", "FRESH_INTAKE_MINI_KV_EVIDENCE_IMPORT_FALSE", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-evidence-import-false",
    "mini-kv source keeps evidence import disabled."),
  template("Node v932", "FRESH_INTAKE_MINI_KV_NO_WAL", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-source", "mini-kv-no-write-boundary",
    "mini-kv source proves the preflight does not touch WAL."),
  template("Node v933", "FRESH_INTAKE_MINI_KV_COMMAND_TEST", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-test", "mini-kv-test-command",
    "mini-kv focused test covers the import preflight command."),
  template("Node v934", "FRESH_INTAKE_MINI_KV_STORE_UNCHANGED_TEST", "miniKv", "mini-kv-import-preflight-evidence-slot",
    "VALUE_DRAFT_MINI_KV_TARGET", "mini-kv-v560-import-preflight-test", "mini-kv-test-store-size",
    "mini-kv focused test proves the command leaves the store empty."),
  template("Node v935", "FRESH_INTAKE_MINI_KV_RELEASE_EXPLANATION", "miniKv",
    "mini-kv-import-preflight-evidence-slot", "VALUE_DRAFT_MINI_KV_TARGET",
    "mini-kv-v560-import-preflight-explanation", "mini-kv-explanation-release-package",
    "mini-kv v560 explanation records the release package stage."),
  template("Node v936", "FRESH_INTAKE_CROSS_PROJECT_CLOSEOUT", "node",
    "cross-project-fresh-intake-closeout-slot", "VALUE_DRAFT_CLOSEOUT", "mini-kv-v560-readme",
    "mini-kv-readme-v560", "Node closes the fresh sibling intake while keeping Java and mini-kv read-only."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlots(input: {
  sourceValueDraftReady: boolean;
  valueDraftSlots: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot[];
  files: Record<string, HistoricalEvidenceFile>;
  snippets: readonly HistoricalSnippetMatch[];
}): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot[] {
  const valueDraftSlotsByCode = new Map(input.valueDraftSlots.map((valueDraftSlot) =>
    [valueDraftSlot.code, valueDraftSlot]));
  const snippetsById = new Map(input.snippets.map((snippetMatch) => [snippetMatch.id, snippetMatch]));

  return FRESH_SIBLING_INTAKE_TEMPLATES.map((slotTemplate, index) => {
    const sourceValueDraftSlot = valueDraftSlotsByCode.get(slotTemplate.sourceValueDraftSlotCode);
    const file = input.files[slotTemplate.evidenceFileId];
    const snippetMatch = snippetsById.get(slotTemplate.evidenceSnippetId);
    const evidenceFilePresent = file?.exists ?? false;
    const evidenceSnippetMatched = snippetMatch?.matched ?? false;
    const sourceValueDraftSlotReady =
      input.sourceValueDraftReady && (sourceValueDraftSlot?.readyForOperatorValueDraft ?? false);

    return {
      order: index + 1,
      nodeVersion: slotTemplate.nodeVersion,
      code: slotTemplate.code,
      kind: slotTemplate.kind,
      project: slotTemplate.project,
      scope: sourceValueDraftSlot?.scope ?? "crossProject",
      sourceValueDraftSlotCode: slotTemplate.sourceValueDraftSlotCode,
      sourceValueDraftNodeVersion: sourceValueDraftSlot?.nodeVersion ?? "Node v911",
      sourceValueDraftSlotReady,
      evidenceFileId: slotTemplate.evidenceFileId,
      evidenceSnippetId: slotTemplate.evidenceSnippetId,
      evidenceFilePresent,
      evidenceSnippetMatched,
      evidenceResolvedFromHistoricalFixture:
        file?.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces") ?? false,
      evidenceExpectation: slotTemplate.evidenceExpectation,
      freshSiblingVersion: freshSiblingVersion(slotTemplate.project),
      readyForFreshSiblingEvidenceIntake:
        sourceValueDraftSlotReady && evidenceFilePresent && evidenceSnippetMatched,
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

function freshSiblingVersion(
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject,
): "Java v608" | "mini-kv v560" | "Node v911" {
  if (project === "java") {
    return "Java v608";
  }
  if (project === "miniKv") {
    return "mini-kv v560";
  }
  return "Node v911";
}

function template(
  nodeVersion: FreshSiblingIntakeTemplate["nodeVersion"],
  code: string,
  project: FreshSiblingIntakeTemplate["project"],
  kind: FreshSiblingIntakeTemplate["kind"],
  sourceValueDraftSlotCode: string,
  evidenceFileId: string,
  evidenceSnippetId: string,
  evidenceExpectation: string,
): FreshSiblingIntakeTemplate {
  return {
    nodeVersion,
    code,
    project,
    kind,
    sourceValueDraftSlotCode,
    evidenceFileId,
    evidenceSnippetId,
    evidenceExpectation,
  };
}
