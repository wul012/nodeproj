import {
  evidenceFile,
  snippet,
  type HistoricalEvidenceFile,
  type HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export const JAVA_V633_VALUE_DRAFT_CLOSEOUT_SERVICE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceValueDraftCloseoutService.java";
export const JAVA_V633_VALUE_DRAFT_RESPONSE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceValueDraftResponse.java";
export const JAVA_V633_VALUE_DRAFT_ASSURANCE_TEST_PATH =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/OpsShardReadinessOperatorEvidenceValueDraftAssuranceIntegrationTests.java";
export const MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH =
  "D:/C/mini-kv/src/shard_route_preview_operator_value_draft.cpp";
export const MINI_KV_V585_VALUE_DRAFT_TEST_PATH =
  "D:/C/mini-kv/tests/shard_route_preview_operator_value_draft_tests.cpp";
export const MINI_KV_V585_EXPLANATION_PATH = "D:/C/mini-kv/e/585/\u89e3\u91ca/\u8bf4\u660e.md";
export const MINI_KV_V585_README_PATH = "D:/C/mini-kv/README.md";

export const VALUE_SUPPLY_ENVELOPE_EVIDENCE_FILES = [
  {
    id: "java-v633-value-draft-closeout-service",
    path: JAVA_V633_VALUE_DRAFT_CLOSEOUT_SERVICE_PATH,
  },
  {
    id: "java-v633-value-draft-response",
    path: JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
  },
  {
    id: "java-v633-value-draft-assurance-test",
    path: JAVA_V633_VALUE_DRAFT_ASSURANCE_TEST_PATH,
  },
  {
    id: "mini-kv-v585-value-draft-source",
    path: MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
  },
  {
    id: "mini-kv-v585-value-draft-test",
    path: MINI_KV_V585_VALUE_DRAFT_TEST_PATH,
  },
  {
    id: "mini-kv-v585-value-draft-explanation",
    path: MINI_KV_V585_EXPLANATION_PATH,
  },
  {
    id: "mini-kv-v585-readme",
    path: MINI_KV_V585_README_PATH,
  },
] as const;

export const VALUE_SUPPLY_ENVELOPE_EVIDENCE_SNIPPETS = [
  snippetSpec(
    "java-value-draft-closeout-profile",
    JAVA_V633_VALUE_DRAFT_CLOSEOUT_SERVICE_PATH,
    "java-shard-readiness-operator-evidence-value-draft-closeout.v1",
  ),
  snippetSpec("java-value-draft-closeout-response-version", JAVA_V633_VALUE_DRAFT_CLOSEOUT_SERVICE_PATH, "\"Java v632\""),
  snippetSpec(
    "java-value-draft-closeout-version-range",
    JAVA_V633_VALUE_DRAFT_CLOSEOUT_SERVICE_PATH,
    "value-draft-closeout-versions-v609-v633",
  ),
  snippetSpec(
    "java-value-draft-response-ready-field",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "boolean readyForOperatorEvidenceValueDraft",
  ),
  snippetSpec(
    "java-value-draft-response-actual-value-state",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "String actualValueState",
  ),
  snippetSpec(
    "java-value-draft-response-evidence-import-blocked",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "boolean readyForEvidenceImport",
  ),
  snippetSpec(
    "java-value-draft-response-manual-entry-blocked",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "boolean readyForManualEvidenceEntry",
  ),
  snippetSpec(
    "java-value-draft-response-live-execution-blocked",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "boolean readyForLiveExecution",
  ),
  snippetSpec(
    "java-value-draft-response-production-execution-blocked",
    JAVA_V633_VALUE_DRAFT_RESPONSE_PATH,
    "boolean readyForProductionExecution",
  ),
  snippetSpec(
    "java-value-draft-test-closeout-route",
    JAVA_V633_VALUE_DRAFT_ASSURANCE_TEST_PATH,
    "/api/v1/ops/shard-readiness/operator-evidence-value-draft-closeout",
  ),
  snippetSpec(
    "java-value-draft-test-ready-true",
    JAVA_V633_VALUE_DRAFT_ASSURANCE_TEST_PATH,
    "jsonPath(\"$.readyForOperatorEvidenceValueDraft\").value(true)",
  ),
  snippetSpec(
    "java-value-draft-test-import-false",
    JAVA_V633_VALUE_DRAFT_ASSURANCE_TEST_PATH,
    "jsonPath(\"$.readyForEvidenceImport\").value(false)",
  ),
  snippetSpec(
    "mini-kv-value-draft-contract",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"contract\\\":\\\"shard-route-preview-operator-value-draft.v1\\\"",
  ),
  snippetSpec("mini-kv-value-draft-command", MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH, "SHARDROUTEVALUEDRAFTJSON"),
  snippetSpec(
    "mini-kv-value-draft-node-plan",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "v911-controlled-read-only-shard-preview-operator-evidence-value-draft-closeout-roadmap.md",
  ),
  snippetSpec(
    "mini-kv-value-draft-stage-v585",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "route-preview-value-draft-release-package",
  ),
  snippetSpec(
    "mini-kv-value-draft-slot-count",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"operatorValueDraftSlotCount\\\":25",
  ),
  snippetSpec(
    "mini-kv-value-draft-accepted-zero",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"acceptedOperatorValueCount\\\":0",
  ),
  snippetSpec(
    "mini-kv-value-draft-imported-zero",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"importedEvidenceValueCount\\\":0",
  ),
  snippetSpec(
    "mini-kv-value-draft-actual-state",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"actualValueState\\\":\\\"not-supplied\\\"",
  ),
  snippetSpec(
    "mini-kv-value-draft-ready-true",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"readyForOperatorEvidenceValueDraft\\\":true",
  ),
  snippetSpec(
    "mini-kv-value-draft-evidence-import-false",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"readyForEvidenceImport\\\":false",
  ),
  snippetSpec(
    "mini-kv-value-draft-adapter-disabled",
    MINI_KV_V585_VALUE_DRAFT_SOURCE_PATH,
    "\\\"valueSupplyAdapterEnabled\\\":false",
  ),
  snippetSpec(
    "mini-kv-readme-v585",
    MINI_KV_V585_README_PATH,
    "v585: freezes v584 as a versioned value draft source fixture",
  ),
  snippetSpec(
    "mini-kv-value-draft-test-store-unchanged",
    MINI_KV_V585_VALUE_DRAFT_TEST_PATH,
    "assert(store.size() == 0)",
  ),
] as const;

export function loadValueSupplyEnvelopeEvidenceFiles(): Record<string, HistoricalEvidenceFile> {
  return Object.fromEntries(
    VALUE_SUPPLY_ENVELOPE_EVIDENCE_FILES.map((file) => [file.id, evidenceFile(file.id, file.path)]),
  ) as Record<string, HistoricalEvidenceFile>;
}

export function loadValueSupplyEnvelopeEvidenceSnippets(): HistoricalSnippetMatch[] {
  return VALUE_SUPPLY_ENVELOPE_EVIDENCE_SNIPPETS.map((item) => snippet(item.id, item.path, item.text));
}

function snippetSpec(id: string, path: string, text: string) {
  return { id, path, text };
}
