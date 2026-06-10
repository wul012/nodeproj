import {
  collectBlockingMessages,
} from "./releaseReportShared.js";
import type {
  ForbiddenOperation,
  GateMessage,
  GateState,
  PrerequisiteActor,
  PrerequisiteSignal,
  PrerequisiteStep,
  RemainingApprovalBlocker,
} from "./approvalDecisionPrerequisiteGateTypes.js";
import {
  ENDPOINTS,
  JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE,
  MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST,
} from "./approvalDecisionPrerequisiteGateData.js";
import type { ProductionReleasePreApprovalPacketProfile } from "./productionReleasePreApprovalPacket.js";

export function hasJavaSignoffField(name: string): boolean {
  return JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.some((field) =>
    field.name === name && field.required);
}

export function createPrerequisiteSignals(): PrerequisiteSignal[] {
  return [
    signal("source-pre-approval-packet-present", "production-release-pre-approval-packet", "present-for-dry-run", ENDPOINTS.productionReleasePreApprovalPacketJson),
    signal("java-release-operator-signoff-present", "java-v64-release-operator-signoff-fixture", "placeholder-requires-operator", ENDPOINTS.javaReleaseOperatorSignoffFixture),
    signal("java-rollback-approver-placeholder-present", "java-v64-release-operator-signoff-fixture", "placeholder-requires-operator", "signoffRecord.rollbackApprover"),
    signal("mini-kv-retained-artifact-digests-present", "mini-kv-v73-retained-restore-artifact-digest", "placeholder-requires-operator", ENDPOINTS.miniKvRetainedRestoreArtifactDigest),
    signal("mini-kv-order-authority-closed", "mini-kv-v73-retained-restore-artifact-digest", "explicitly-blocked-for-production", "order_authoritative=false"),
  ];
}

function signal(
  id: string,
  source: PrerequisiteSignal["source"],
  status: PrerequisiteSignal["status"],
  evidenceTarget: string,
): PrerequisiteSignal {
  return {
    id,
    source,
    status,
    evidenceTarget,
    nodeMayInfer: false,
    nodeMayCreateApprovalDecision: false,
  };
}

export function createRemainingApprovalBlockers(): RemainingApprovalBlocker[] {
  return [
    blocker("real-production-idp", "approval-decision", "Production IdP or verified token source is still not connected."),
    blocker("approval-ledger-dry-run-envelope", "approval-decision", "Node v181 must design the approval ledger dry-run envelope before any approval decision rehearsal."),
    blocker("rollback-approver-evidence-fixture", "production-rollback", "Java v65 rollback approver evidence is still planned for the rollback boundary."),
    blocker("restore-approval-boundary-fixture", "production-restore", "mini-kv v74 restore approval boundary is still planned before decision rehearsal."),
  ];
}

function blocker(
  id: string,
  requiredBefore: RemainingApprovalBlocker["requiredBefore"],
  reason: string,
): RemainingApprovalBlocker {
  return {
    id,
    requiredBefore,
    reason,
    blocksRealApprovalDecision: true,
    blocksDryRunEnvelope: false,
  };
}

export function createPrerequisiteSteps(): PrerequisiteStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v179 production release pre-approval packet.", ENDPOINTS.productionReleasePreApprovalPacketJson, "Packet is ready, digest-valid, and still blocks approval decision creation."),
    createStep(2, "collect", "java", "Reference Java v64 release operator signoff fixture.", ENDPOINTS.javaReleaseOperatorSignoffFixture, "Release operator, rollback approver, release window, artifact target, and signoff placeholder are present."),
    createStep(3, "collect", "mini-kv", "Reference mini-kv v73 retained restore artifact digest fixture.", ENDPOINTS.miniKvRetainedRestoreArtifactDigest, "Restore artifact digest, Snapshot/WAL digest, restore target, retention owner, and order-authority boundary are present."),
    createStep(4, "compare", "node", "Compare prerequisites against v179 missing evidence categories.", "prerequisiteSignals", "Java and mini-kv placeholders are present for a dry-run envelope while real approval remains blocked."),
    createStep(5, "preserve", "operator", "Archive this gate as approval prerequisite evidence.", "c/180 and code walkthrough", "Screenshot, explanation, and walkthrough are archived before Node v181."),
    createStep(6, "stop", "node", "Stop before approval decision, approval ledger write, release, rollback, or restore execution.", "next plan handoff", "Node v181 may create a dry-run envelope only; real decisions remain blocked."),
  ];
}

function createStep(
  order: number,
  phase: PrerequisiteStep["phase"],
  actor: PrerequisiteActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): PrerequisiteStep {
  return {
    order,
    phase,
    actor,
    action,
    evidenceTarget,
    expectedEvidence,
    readOnly: true,
    createsApprovalDecision: false,
    writesApprovalLedger: false,
    executesRelease: false,
    executesDeployment: false,
    executesRollback: false,
    executesRestore: false,
    readsSecretValues: false,
    connectsProductionDatabase: false,
  };
}

export function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    forbid("Create approval decision from Node v180", "v180 is only a prerequisite gate.", "Node v180 approval decision prerequisite gate"),
    forbid("Write approval ledger from Node v180", "The approval ledger dry-run envelope is planned for Node v181.", "Node v180 approval decision prerequisite gate"),
    forbid("Trigger production release from Node v180", "Prerequisite evidence cannot authorize release execution.", "Node v180 approval decision prerequisite gate"),
    forbid("Trigger production deployment from Node v180", "Java v64 fixture forbids deployment execution.", "Java v64 release operator signoff fixture"),
    forbid("Trigger Java rollback from Node v180", "Java v64 records rollback approver placeholder only.", "Java v64 release operator signoff fixture"),
    forbid("Execute Java rollback SQL from Node v180", "Java v64 forbids rollback SQL execution.", "Java v64 release operator signoff fixture"),
    forbid("Execute mini-kv restore from Node v180", "mini-kv v73 is retained digest evidence only.", "mini-kv v73 retained restore artifact digest"),
    forbid("Execute mini-kv LOAD/COMPACT/SETNXEX from Node v180", "mini-kv v73 uses CHECKJSON retained digest evidence only.", "mini-kv v73 retained restore artifact digest"),
    forbid("Attach mini-kv to Java order transaction chain", "mini-kv remains not Java order authority.", "mini-kv v73 retained restore artifact digest"),
    forbid("Read production secret values", "Prerequisite gate uses placeholders and source names only.", "runtime safety"),
    forbid("Connect production database", "Rendering the gate does not require production database access.", "runtime safety"),
    forbid("Treat v180 as production authentication", "Production IdP remains a blocker.", "runtime safety"),
  ];
}

function forbid(
  operation: ForbiddenOperation["operation"],
  reason: string,
  blockedBy: ForbiddenOperation["blockedBy"],
): ForbiddenOperation {
  return { operation, reason, blockedBy };
}

export function createPauseConditions(): string[] {
  return [
    "Need production secrets or secret values.",
    "Need production database access.",
    "Need production IdP connection or token verification.",
    "Need Node to auto-start Java or mini-kv.",
    "Need approval decision, release, deployment, rollback, or restore execution.",
    "Need Java deployment, Java rollback, Java rollback SQL, or Java approval ledger writes.",
    "Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution.",
    "Need mini-kv in Java transaction consistency chain.",
    "Operator signoff, retained digest owner, or restore target is unclear.",
  ];
}

export function summarizePreApprovalPacket(profile: ProductionReleasePreApprovalPacketProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    packetState: profile.packetState,
    packetDigest: profile.packet.packetDigest,
    readyForProductionReleasePreApprovalPacket: profile.readyForProductionReleasePreApprovalPacket,
    readyForApprovalDecision: profile.readyForApprovalDecision,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionRestore: profile.readyForProductionRestore,
    executionAllowed: profile.executionAllowed,
    missingEvidenceCount: profile.summary.missingEvidenceCount,
    missingEvidenceBlockingDecisionCount: profile.summary.missingEvidenceBlockingDecisionCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

export function collectProductionBlockers(checks: Record<string, boolean>): GateMessage[] {
  return collectBlockingMessages<GateMessage>([
    { condition: checks.sourcePreApprovalPacketReady, code: "SOURCE_PRE_APPROVAL_PACKET_NOT_READY", source: "production-release-pre-approval-packet", message: "Node v179 pre-approval packet must be ready before v180 prerequisite gate." },
    { condition: checks.sourcePreApprovalPacketDigestValid, code: "SOURCE_PRE_APPROVAL_PACKET_DIGEST_INVALID", source: "production-release-pre-approval-packet", message: "Node v179 packet digest must be valid." },
    { condition: checks.sourcePreApprovalStillBlocksApprovalAndProduction, code: "SOURCE_PRE_APPROVAL_UNLOCKS_PRODUCTION", source: "production-release-pre-approval-packet", message: "Node v179 must still block approval decision and production operations." },
    { condition: checks.sourcePreApprovalReferencesNodeV178, code: "SOURCE_PRE_APPROVAL_V178_REFERENCE_INVALID", source: "production-release-pre-approval-packet", message: "Node v179 must reference the v178 retention gate." },
    { condition: checks.javaV64SignoffFixtureReady, code: "JAVA_V64_SIGNOFF_FIXTURE_NOT_READY", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 release operator signoff fixture must be present." },
    { condition: checks.javaSignoffRecordComplete, code: "JAVA_SIGNOFF_RECORD_INCOMPLETE", source: "java-v64-release-operator-signoff-fixture", message: "Java signoff record must include release operator, rollback approver, release window, artifact target, and signoff placeholder." },
    { condition: checks.javaRequiredSignoffFieldsComplete, code: "JAVA_REQUIRED_SIGNOFF_FIELDS_INCOMPLETE", source: "java-v64-release-operator-signoff-fixture", message: "Java required signoff fields must include operator, approver, window, artifact, signoff, retention, and no-secret boundaries." },
    { condition: checks.javaNodeConsumptionSafe, code: "JAVA_NODE_CONSUMPTION_UNSAFE", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 may be consumed only for rendering the prerequisite gate." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 must not enable approval, ledger writes, deployment, rollback, SQL, secrets, database, or mini-kv coupling." },
    { condition: checks.miniKvV73DigestFixtureReady, code: "MINI_KV_V73_DIGEST_FIXTURE_NOT_READY", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv v73 retained restore artifact digest fixture must be present." },
    { condition: checks.miniKvDigestTargetComplete, code: "MINI_KV_DIGEST_TARGET_INCOMPLETE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv digest target must include restore target, artifact digest, Snapshot/WAL digest, and retention owner placeholders." },
    { condition: checks.miniKvRetainedDigestEvidenceComplete, code: "MINI_KV_RETAINED_DIGEST_EVIDENCE_INCOMPLETE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv retained digest evidence fields and confirmations must be complete." },
    { condition: checks.miniKvCheckJsonDigestEvidenceReadOnly, code: "MINI_KV_CHECKJSON_DIGEST_EVIDENCE_UNSAFE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv CHECKJSON digest evidence must remain read-only and non-executing." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv v73 must remain non-authoritative and disconnected from Java transaction consistency." },
    { condition: checks.prerequisiteSignalsComplete, code: "PREREQUISITE_SIGNALS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Prerequisite signals must map v179 missing evidence to Java v64 and mini-kv v73 inputs." },
    { condition: checks.remainingApprovalBlockersExplicit, code: "REMAINING_APPROVAL_BLOCKERS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Remaining real approval blockers must be explicit and must not block the dry-run envelope." },
    { condition: checks.prerequisiteStepsReadOnly, code: "PREREQUISITE_STEPS_NOT_READ_ONLY", source: "approval-decision-prerequisite-gate", message: "Prerequisite steps must be read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Forbidden operations must cover approval, ledger, release, Java, mini-kv, secrets, database, and auth hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "runtime-config", message: "Node v180 must not start Java or mini-kv." },
    { condition: checks.noApprovalDecisionCreated, code: "APPROVAL_DECISION_CREATED", source: "approval-decision-prerequisite-gate", message: "v180 must not create an approval decision." },
    { condition: checks.noApprovalLedgerWrite, code: "APPROVAL_LEDGER_WRITE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not write approval ledger records." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute release." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute restore." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v180 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v180 must not connect production databases." },
    { condition: checks.noProductionIdpConnection, code: "PRODUCTION_IDP_CONNECTION_UNLOCKED", source: "runtime-config", message: "v180 must not connect production IdP." },
    { condition: checks.readyForApprovalDecisionStillFalse, code: "APPROVAL_DECISION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark approval decision ready." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark production release ready." },
    { condition: checks.readyForProductionRestoreStillFalse, code: "PRODUCTION_RESTORE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark production restore ready." },
    { condition: checks.gateDigestValid, code: "GATE_DIGEST_INVALID", source: "approval-decision-prerequisite-gate", message: "Gate digest must be a valid SHA-256 hex digest." },
  ]);
}

export function collectWarnings(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "APPROVAL_DECISION_PREREQUISITE_GATE_BLOCKED"
        : "PREREQUISITE_GATE_NOT_APPROVAL_DECISION",
      severity: "warning",
      source: "approval-decision-prerequisite-gate",
      message: gateState === "blocked"
        ? "Approval decision prerequisite gate has blockers."
        : "This gate proves prerequisite evidence is readable for a dry-run envelope only; it is not an approval decision.",
    },
    {
      code: "PLACEHOLDERS_REQUIRE_EXTERNAL_OPERATOR_CONFIRMATION",
      severity: "warning",
      source: "approval-decision-prerequisite-gate",
      message: "Java and mini-kv placeholders must be replaced by external operator evidence before any real approval decision.",
    },
  ];
}

export function collectRecommendations(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_APPROVAL_DECISION_PREREQUISITE_BLOCKERS"
        : "PROCEED_TO_APPROVAL_LEDGER_DRY_RUN_ENVELOPE",
      severity: "recommendation",
      source: "approval-decision-prerequisite-gate",
      message: gateState === "blocked"
        ? "Fix missing prerequisite evidence before archiving v180."
        : "After v180 is archived, proceed to Node v181 approval ledger dry-run envelope without writing a real ledger.",
    },
  ];
}
