import {
  evidenceFile,
  snippet,
  type HistoricalEvidenceFile,
  type HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";

export const JAVA_V658_VALUE_SUPPLY_CLOSEOUT_SERVICE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceValueSupplyCloseoutService.java";
export const JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsShardReadinessOperatorEvidenceValueSupplyResponse.java";
export const JAVA_V658_VALUE_SUPPLY_ASSURANCE_TEST_PATH =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/OpsShardReadinessOperatorEvidenceValueSupplyAssuranceIntegrationTests.java";
export const MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH =
  "D:/C/mini-kv/src/shard_route_preview_operator_value_supply_envelope.cpp";
export const MINI_KV_V610_VALUE_SUPPLY_TEST_PATH =
  "D:/C/mini-kv/tests/shard_route_preview_operator_value_supply_envelope_tests.cpp";
export const MINI_KV_V610_EXPLANATION_PATH = "D:/C/mini-kv/e/610/\u89e3\u91ca/\u8bf4\u660e.md";
export const NODE_V961_VALUE_SUPPLY_ENVELOPE_ARTIFACTS_PATH =
  "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeArtifacts.ts";

export const VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_EVIDENCE_FILES = [
  { id: "java-v658-value-supply-closeout-service", path: JAVA_V658_VALUE_SUPPLY_CLOSEOUT_SERVICE_PATH },
  { id: "java-v658-value-supply-response", path: JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH },
  { id: "java-v658-value-supply-assurance-test", path: JAVA_V658_VALUE_SUPPLY_ASSURANCE_TEST_PATH },
  { id: "mini-kv-v610-value-supply-source", path: MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH },
  { id: "mini-kv-v610-value-supply-test", path: MINI_KV_V610_VALUE_SUPPLY_TEST_PATH },
  { id: "mini-kv-v610-value-supply-explanation", path: MINI_KV_V610_EXPLANATION_PATH },
  { id: "node-v961-value-supply-envelope-artifacts", path: NODE_V961_VALUE_SUPPLY_ENVELOPE_ARTIFACTS_PATH },
] as const;

export const VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_EVIDENCE_SNIPPETS = [
  snippetSpec(
    "java-value-supply-closeout-profile",
    JAVA_V658_VALUE_SUPPLY_CLOSEOUT_SERVICE_PATH,
    "java-shard-readiness-operator-evidence-value-supply-closeout.v1",
  ),
  snippetSpec("java-value-supply-closeout-version", JAVA_V658_VALUE_SUPPLY_CLOSEOUT_SERVICE_PATH, "\"Java v658\""),
  snippetSpec(
    "java-value-supply-closeout-version-range",
    JAVA_V658_VALUE_SUPPLY_CLOSEOUT_SERVICE_PATH,
    "value-supply-closeout-versions-v634-v658",
  ),
  snippetSpec(
    "java-value-supply-response-ready-envelope",
    JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "boolean readyForOperatorValueSupplyEnvelope",
  ),
  snippetSpec("java-value-supply-response-supplied-state", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "String suppliedValueState"),
  snippetSpec("java-value-supply-response-redaction-state", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "String redactionState"),
  snippetSpec("java-value-supply-response-provenance-state", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "String provenanceState"),
  snippetSpec("java-value-supply-response-submission-blocked", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "boolean readyForOperatorValueSubmission"),
  snippetSpec("java-value-supply-response-import-blocked", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "boolean readyForEvidenceImport"),
  snippetSpec("java-value-supply-response-runtime-blocked", JAVA_V658_VALUE_SUPPLY_RESPONSE_PATH,
    "boolean readyForRuntimePayload"),
  snippetSpec(
    "java-value-supply-test-closeout-route",
    JAVA_V658_VALUE_SUPPLY_ASSURANCE_TEST_PATH,
    "/api/v1/ops/shard-readiness/operator-evidence-value-supply-closeout",
  ),
  snippetSpec(
    "java-value-supply-test-execution-locks-held",
    JAVA_V658_VALUE_SUPPLY_ASSURANCE_TEST_PATH,
    "value-supply-closeout-all-execution-locks-held",
  ),
  snippetSpec(
    "mini-kv-value-supply-contract",
    MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"contract\\\":\\\"shard-route-preview-operator-value-supply-envelope.v1\\\"",
  ),
  snippetSpec("mini-kv-value-supply-command", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "SHARDROUTEVALUESUPPLYJSON"),
  snippetSpec("mini-kv-value-supply-range-start", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"valueSupplyReleaseRangeStart\\\":\\\"v586\\\""),
  snippetSpec("mini-kv-value-supply-range-end", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"valueSupplyReleaseRangeEnd\\\":\\\"v610\\\""),
  snippetSpec("mini-kv-value-supply-slot-count", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"operatorValueEnvelopeSlotCount\\\":25"),
  snippetSpec("mini-kv-value-supply-accepted-zero", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"acceptedOperatorValueCount\\\":0"),
  snippetSpec("mini-kv-value-supply-imported-zero", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"importedEvidenceValueCount\\\":0"),
  snippetSpec("mini-kv-value-supply-envelope-state", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"operatorValueEnvelopeState\\\":\\\"disabled-by-default\\\""),
  snippetSpec("mini-kv-value-supply-ready-false", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"readyForOperatorValueSupply\\\":false"),
  snippetSpec("mini-kv-value-supply-adapter-disabled", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"valueSupplyAdapterEnabled\\\":false"),
  snippetSpec("mini-kv-value-supply-values-not-persisted", MINI_KV_V610_VALUE_SUPPLY_SOURCE_PATH,
    "\\\"operatorValuesPersisted\\\":false"),
  snippetSpec("mini-kv-value-supply-test-store-unchanged", MINI_KV_V610_VALUE_SUPPLY_TEST_PATH,
    "assert(store.size() == 0)"),
  snippetSpec("node-v961-value-supply-envelope-source", NODE_V961_VALUE_SUPPLY_ENVELOPE_ARTIFACTS_PATH,
    "valueSupplyEnvelopeVersion: \"Node v961\""),
] as const;

export function loadValueSupplyApprovalPacketDraftEvidenceFiles(): Record<string, HistoricalEvidenceFile> {
  return Object.fromEntries(
    VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_EVIDENCE_FILES.map((file) => [file.id, evidenceFile(file.id, file.path)]),
  ) as Record<string, HistoricalEvidenceFile>;
}

export function loadValueSupplyApprovalPacketDraftEvidenceSnippets(): HistoricalSnippetMatch[] {
  return VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_EVIDENCE_SNIPPETS.map((item) => snippet(item.id, item.path, item.text));
}

function snippetSpec(id: string, path: string, text: string) {
  return { id, path, text };
}
