import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import { createValueSupplyApprovalPacketDraftPolicy } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftPolicyCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidenceVersion,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_VERSIONS = [
  "Node v962",
  "Node v963",
  "Node v964",
  "Node v965",
  "Node v966",
  "Node v967",
  "Node v968",
  "Node v969",
  "Node v970",
  "Node v971",
  "Node v972",
  "Node v973",
  "Node v974",
  "Node v975",
  "Node v976",
  "Node v977",
  "Node v978",
  "Node v979",
  "Node v980",
  "Node v981",
  "Node v982",
  "Node v983",
  "Node v984",
  "Node v985",
  "Node v986",
] as const;

interface ApprovalPacketDraftTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftVersion;
  code: string;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotKind;
  sourceValueSupplyEnvelopeSlotCode: string;
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceExpectation: string;
}

const APPROVAL_PACKET_DRAFT_TEMPLATES: readonly ApprovalPacketDraftTemplate[] = Object.freeze([
  template("Node v962", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_CLOSEOUT_PROFILE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_PROFILE",
    "java-v658-value-supply-closeout-service", "java-value-supply-closeout-profile",
    "Java value-supply closeout profile is available for approval packet review."),
  template("Node v963", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_CLOSEOUT_VERSION", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_RESPONSE_VERSION",
    "java-v658-value-supply-closeout-service", "java-value-supply-closeout-version",
    "Java closeout publishes v658 as the current value-supply evidence version."),
  template("Node v964", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_VERSION_RANGE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_VERSION_RANGE",
    "java-v658-value-supply-closeout-service", "java-value-supply-closeout-version-range",
    "Java closeout documents the v634-v658 value-supply range."),
  template("Node v965", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_READY_ENVELOPE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_READY_FIELD",
    "java-v658-value-supply-response", "java-value-supply-response-ready-envelope",
    "Java response exposes envelope readiness without accepting operator values."),
  template("Node v966", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_SUPPLIED_STATE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_ACTUAL_VALUE_STATE",
    "java-v658-value-supply-response", "java-value-supply-response-supplied-state",
    "Java response keeps supplied value state explicit for review."),
  template("Node v967", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_REDACTION_STATE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_IMPORT_BLOCK",
    "java-v658-value-supply-response", "java-value-supply-response-redaction-state",
    "Java response declares redaction state before any supplied value can exist."),
  template("Node v968", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_PROVENANCE_STATE", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_MANUAL_ENTRY_BLOCK",
    "java-v658-value-supply-response", "java-value-supply-response-provenance-state",
    "Java response declares provenance state without importing evidence."),
  template("Node v969", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_SUBMISSION_BLOCK", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_LIVE_EXECUTION_BLOCK",
    "java-v658-value-supply-response", "java-value-supply-response-submission-blocked",
    "Java response keeps operator value submission disabled."),
  template("Node v970", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_IMPORT_BLOCK", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_PRODUCTION_EXECUTION_BLOCK",
    "java-v658-value-supply-response", "java-value-supply-response-import-blocked",
    "Java response keeps evidence import disabled."),
  template("Node v971", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_RUNTIME_BLOCK", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_CLOSEOUT_ROUTE_TEST",
    "java-v658-value-supply-response", "java-value-supply-response-runtime-blocked",
    "Java response keeps runtime payload acceptance disabled."),
  template("Node v972", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_CLOSEOUT_ROUTE_TEST", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_READY_TEST",
    "java-v658-value-supply-assurance-test", "java-value-supply-test-closeout-route",
    "Java assurance test covers the value-supply closeout route."),
  template("Node v973", "VALUE_SUPPLY_APPROVAL_PACKET_JAVA_LOCKS_TEST", "java",
    "java-value-supply-closeout-evidence-slot", "VALUE_SUPPLY_ENVELOPE_JAVA_IMPORT_FALSE_TEST",
    "java-v658-value-supply-assurance-test", "java-value-supply-test-execution-locks-held",
    "Java assurance test proves all execution locks remain held."),
  template("Node v974", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_CONTRACT", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_CONTRACT",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-contract",
    "mini-kv source publishes the value-supply envelope contract."),
  template("Node v975", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_COMMAND", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_COMMAND",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-command",
    "mini-kv source exposes SHARDROUTEVALUESUPPLYJSON as read metadata."),
  template("Node v976", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_RANGE_START", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_NODE_PLAN",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-range-start",
    "mini-kv value-supply release range starts at v586."),
  template("Node v977", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_RANGE_END", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_STAGE",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-range-end",
    "mini-kv value-supply release range closes at v610."),
  template("Node v978", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_SLOT_COUNT", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_SLOT_COUNT",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-slot-count",
    "mini-kv envelope keeps twenty-five operator value slots."),
  template("Node v979", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_ACCEPTED_ZERO", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ACCEPTED_ZERO",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-accepted-zero",
    "mini-kv envelope accepts zero operator values."),
  template("Node v980", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_IMPORTED_ZERO", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_IMPORTED_ZERO",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-imported-zero",
    "mini-kv envelope imports zero evidence values."),
  template("Node v981", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_DISABLED_STATE", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ACTUAL_STATE",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-envelope-state",
    "mini-kv envelope state remains disabled by default."),
  template("Node v982", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_READY_FALSE", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_READY_TRUE",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-ready-false",
    "mini-kv keeps operator value supply disabled."),
  template("Node v983", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_ADAPTER_DISABLED", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_IMPORT_FALSE",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-adapter-disabled",
    "mini-kv value-supply adapter remains disabled."),
  template("Node v984", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_NO_PERSIST", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_ADAPTER_DISABLED",
    "mini-kv-v610-value-supply-source", "mini-kv-value-supply-values-not-persisted",
    "mini-kv persists no operator values."),
  template("Node v985", "VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_STORE_UNCHANGED_TEST", "miniKv",
    "mini-kv-value-supply-envelope-evidence-slot", "VALUE_SUPPLY_ENVELOPE_MINI_KV_NO_WRITE_TEST",
    "mini-kv-v610-value-supply-test", "mini-kv-value-supply-test-store-unchanged",
    "mini-kv focused test proves the command leaves the store unchanged."),
  template("Node v986", "VALUE_SUPPLY_APPROVAL_PACKET_DRAFT_CLOSEOUT", "node",
    "node-value-supply-approval-packet-draft-closeout-slot", "VALUE_SUPPLY_ENVELOPE_CLOSEOUT",
    "node-v961-value-supply-envelope-artifacts", "node-v961-value-supply-envelope-source",
    "Node closes the approval packet draft while signed approval and actual values remain absent."),
]);

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlots(
  input: {
    sourceValueSupplyEnvelopeReady: boolean;
    valueSupplyEnvelopeSlots: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot[];
    files: Record<string, HistoricalEvidenceFile>;
    snippets: readonly HistoricalSnippetMatch[];
  },
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlot[] {
  const envelopeSlotsByCode = new Map(input.valueSupplyEnvelopeSlots.map((slot) => [slot.code, slot]));
  const snippetsById = new Map(input.snippets.map((snippetMatch) => [snippetMatch.id, snippetMatch]));

  return APPROVAL_PACKET_DRAFT_TEMPLATES.map((slotTemplate, index) => {
    const sourceEnvelopeSlot = envelopeSlotsByCode.get(slotTemplate.sourceValueSupplyEnvelopeSlotCode);
    const file = input.files[slotTemplate.evidenceFileId];
    const snippetMatch = snippetsById.get(slotTemplate.evidenceSnippetId);
    const evidenceFilePresent = file?.exists ?? false;
    const evidenceSnippetMatched = snippetMatch?.matched ?? false;
    const sourceValueSupplyEnvelopeSlotReady =
      input.sourceValueSupplyEnvelopeReady
      && (sourceEnvelopeSlot?.readyForValueSupplyEnvelopeReview ?? false);
    const readyForValueSupplyApprovalPacketDraft =
      sourceValueSupplyEnvelopeSlotReady && evidenceFilePresent && evidenceSnippetMatched;
    const policy = createValueSupplyApprovalPacketDraftPolicy(slotTemplate.project, slotTemplate.code);

    return {
      order: index + 1,
      nodeVersion: slotTemplate.nodeVersion,
      code: slotTemplate.code,
      kind: slotTemplate.kind,
      project: slotTemplate.project,
      sourceValueSupplyEnvelopeSlotCode: slotTemplate.sourceValueSupplyEnvelopeSlotCode,
      sourceValueSupplyEnvelopeNodeVersion: sourceEnvelopeSlot?.nodeVersion ?? "Node v961",
      sourceValueSupplyEnvelopeSlotReady,
      sourceValueSupplyEnvelopeValueState: "not-supplied",
      evidenceFileId: slotTemplate.evidenceFileId,
      evidenceSnippetId: slotTemplate.evidenceSnippetId,
      evidenceFilePresent,
      evidenceSnippetMatched,
      evidenceResolvedFromHistoricalFixture:
        file?.resolvedPath.replace(/\\/g, "/").includes("fixtures/historical/sibling-workspaces") ?? false,
      evidenceExpectation: slotTemplate.evidenceExpectation,
      valueSupplyEvidenceVersion: valueSupplyEvidenceVersion(slotTemplate.project),
      policy,
      approvalFieldNames: [...policy.approvalFieldNames],
      requiredReviewRecordFields: [...policy.requiredReviewRecordFields],
      approvalCaptured: false,
      approvalGrantPresent: false,
      signedApprovalPresent: false,
      operatorIdentityPresent: false,
      approvalTimestampPresent: false,
      suppliedValueCount: 0,
      acceptedValueCount: 0,
      importedValueCount: 0,
      readyForValueSupplyApprovalPacketDraft,
      readyForOperatorValueSupply: false,
      readyForOperatorValueSubmission: false,
      readyForEvidenceImport: false,
      readyForManualEvidenceEntry: false,
      readyForRuntimePayload: false,
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

function valueSupplyEvidenceVersion(
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidenceVersion {
  if (project === "java") {
    return "Java v658";
  }
  if (project === "miniKv") {
    return "mini-kv v610";
  }
  return "Node v961";
}

function template(
  nodeVersion: ApprovalPacketDraftTemplate["nodeVersion"],
  code: string,
  project: ApprovalPacketDraftTemplate["project"],
  kind: ApprovalPacketDraftTemplate["kind"],
  sourceValueSupplyEnvelopeSlotCode: string,
  evidenceFileId: string,
  evidenceSnippetId: string,
  evidenceExpectation: string,
): ApprovalPacketDraftTemplate {
  return {
    nodeVersion,
    code,
    project,
    kind,
    sourceValueSupplyEnvelopeSlotCode,
    evidenceFileId,
    evidenceSnippetId,
    evidenceExpectation,
  };
}
