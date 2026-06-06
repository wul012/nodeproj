import {
  evidenceFile,
  snippet,
  type HistoricalEvidenceFile,
  type HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export const JAVA_V608_CLOSEOUT_SERVICE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceImportPreflightCloseoutService.java";
export const JAVA_V608_RESPONSE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceImportPreflightResponse.java";
export const JAVA_V608_ASSURANCE_TEST_PATH =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/OpsShardReadinessOperatorEvidenceImportPreflightAssuranceIntegrationTests.java";
export const MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH =
  "D:/C/mini-kv/src/shard_route_preview_operator_import_preflight.cpp";
export const MINI_KV_V560_IMPORT_PREFLIGHT_TEST_PATH =
  "D:/C/mini-kv/tests/shard_route_preview_operator_import_preflight_tests.cpp";
export const MINI_KV_V560_EXPLANATION_PATH =
  "D:/C/mini-kv/e/560/\u89e3\u91ca/\u8bf4\u660e.md";
export const MINI_KV_V560_README_PATH = "D:/C/mini-kv/README.md";

export const FRESH_SIBLING_EVIDENCE_FILES = [
  {
    id: "java-v608-import-preflight-closeout-service",
    path: JAVA_V608_CLOSEOUT_SERVICE_PATH,
  },
  {
    id: "java-v608-import-preflight-response",
    path: JAVA_V608_RESPONSE_PATH,
  },
  {
    id: "java-v608-import-preflight-assurance-test",
    path: JAVA_V608_ASSURANCE_TEST_PATH,
  },
  {
    id: "mini-kv-v560-import-preflight-source",
    path: MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
  },
  {
    id: "mini-kv-v560-import-preflight-test",
    path: MINI_KV_V560_IMPORT_PREFLIGHT_TEST_PATH,
  },
  {
    id: "mini-kv-v560-import-preflight-explanation",
    path: MINI_KV_V560_EXPLANATION_PATH,
  },
  {
    id: "mini-kv-v560-readme",
    path: MINI_KV_V560_README_PATH,
  },
] as const;

export const FRESH_SIBLING_EVIDENCE_SNIPPETS = [
  snippetSpec(
    "java-closeout-profile",
    JAVA_V608_CLOSEOUT_SERVICE_PATH,
    "java-shard-readiness-operator-evidence-import-preflight-closeout.v1",
  ),
  snippetSpec("java-closeout-source-version", JAVA_V608_CLOSEOUT_SERVICE_PATH, "\"Java v607\""),
  snippetSpec(
    "java-closeout-node-v886-alignment",
    JAVA_V608_CLOSEOUT_SERVICE_PATH,
    "Java closeout aligns to Node v886 controlled read-only import preflight",
  ),
  snippetSpec(
    "java-closeout-import-remains-locked",
    JAVA_V608_CLOSEOUT_SERVICE_PATH,
    "import-preflight-closeout-import-remains-locked",
  ),
  snippetSpec(
    "java-response-ready-preflight",
    JAVA_V608_RESPONSE_PATH,
    "boolean readyForOperatorEvidenceImportPreflight",
  ),
  snippetSpec("java-response-evidence-import-blocked", JAVA_V608_RESPONSE_PATH, "boolean readyForEvidenceImport"),
  snippetSpec("java-response-manual-entry-blocked", JAVA_V608_RESPONSE_PATH, "boolean readyForManualEvidenceEntry"),
  snippetSpec(
    "java-response-production-execution-blocked",
    JAVA_V608_RESPONSE_PATH,
    "boolean readyForProductionExecution",
  ),
  snippetSpec(
    "java-test-closeout-route",
    JAVA_V608_ASSURANCE_TEST_PATH,
    "/api/v1/ops/shard-readiness/operator-evidence-import-preflight-closeout",
  ),
  snippetSpec("java-test-closeout-status-passed", JAVA_V608_ASSURANCE_TEST_PATH, "jsonPath(\"$.status\").value(\"passed\")"),
  snippetSpec(
    "java-test-ready-preflight-true",
    JAVA_V608_ASSURANCE_TEST_PATH,
    "jsonPath(\"$.readyForOperatorEvidenceImportPreflight\").value(true)",
  ),
  snippetSpec(
    "java-test-evidence-import-false",
    JAVA_V608_ASSURANCE_TEST_PATH,
    "jsonPath(\"$.readyForEvidenceImport\").value(false)",
  ),
  snippetSpec(
    "mini-kv-contract",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "\\\"contract\\\":\\\"shard-route-preview-operator-import-preflight.v1\\\"",
  ),
  snippetSpec("mini-kv-command", MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH, "SHARDROUTEIMPORTPREFLIGHTJSON"),
  snippetSpec(
    "mini-kv-source-node-plan",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "v886-controlled-read-only-shard-preview-operator-evidence-import-preflight-closeout-roadmap.md",
  ),
  snippetSpec(
    "mini-kv-stage-v560",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "route-preview-import-preflight-release-package",
  ),
  snippetSpec(
    "mini-kv-slot-count",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "\\\"operatorPreflightSlotCount\\\":25",
  ),
  snippetSpec(
    "mini-kv-imported-value-zero",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "\\\"importedEvidenceValueCount\\\":0",
  ),
  snippetSpec(
    "mini-kv-ready-preflight-true",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "\\\"readyForOperatorEvidenceImportPreflight\\\":true",
  ),
  snippetSpec(
    "mini-kv-evidence-import-false",
    MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH,
    "\\\"readyForEvidenceImport\\\":false",
  ),
  snippetSpec("mini-kv-no-write-boundary", MINI_KV_V560_IMPORT_PREFLIGHT_SOURCE_PATH, "\\\"walTouched\\\":false"),
  snippetSpec(
    "mini-kv-test-command",
    MINI_KV_V560_IMPORT_PREFLIGHT_TEST_PATH,
    "constexpr std::string_view import_preflight_command = \"SHARDROUTEIMPORTPREFLIGHTJSON\"",
  ),
  snippetSpec("mini-kv-test-store-size", MINI_KV_V560_IMPORT_PREFLIGHT_TEST_PATH, "assert(store.size() == 0)"),
  snippetSpec(
    "mini-kv-explanation-release-package",
    MINI_KV_V560_EXPLANATION_PATH,
    "route-preview-import-preflight-release-package",
  ),
  snippetSpec(
    "mini-kv-readme-v560",
    MINI_KV_V560_README_PATH,
    "v560: freezes v559 as a versioned source fixture",
  ),
] as const;

export function loadFreshSiblingEvidenceFiles(): Record<string, HistoricalEvidenceFile> {
  return Object.fromEntries(
    FRESH_SIBLING_EVIDENCE_FILES.map((file) => [file.id, evidenceFile(file.id, file.path)]),
  ) as Record<string, HistoricalEvidenceFile>;
}

export function loadFreshSiblingEvidenceSnippets(): HistoricalSnippetMatch[] {
  return FRESH_SIBLING_EVIDENCE_SNIPPETS.map((item) => snippet(item.id, item.path, item.text));
}

function snippetSpec(id: string, path: string, text: string) {
  return { id, path, text };
}
