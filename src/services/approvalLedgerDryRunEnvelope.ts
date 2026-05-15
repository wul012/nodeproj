import type { IncomingHttpHeaders } from "node:http";

import type { AppConfig } from "../config.js";
import {
  collectBlockingMessages,
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadApprovalDecisionPrerequisiteGate,
  type ApprovalDecisionPrerequisiteGateProfile,
} from "./approvalDecisionPrerequisiteGate.js";

type EnvelopeState = "ready-for-approval-ledger-dry-run-review" | "blocked";
type EnvelopeActor = "node" | "operator" | "release-manager" | "auditor";

interface EnvelopeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "approval-ledger-dry-run-envelope"
    | "approval-decision-prerequisite-gate"
    | "runtime-config";
  message: string;
}

interface LedgerCandidateField {
  name: string;
  source: string;
  value: string | boolean;
  required: true;
  placeholderAllowed: boolean;
  nodeMayInfer: false;
  writesLedger: false;
}

interface DryRunStep {
  order: number;
  phase: "collect" | "compose" | "digest" | "preserve" | "stop";
  actor: EnvelopeActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  createsApprovalDecision: false;
  writesApprovalLedger: false;
  executesRelease: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v181 approval ledger dry-run envelope"
    | "Node v180 approval decision prerequisite gate"
    | "runtime safety";
}

export interface ApprovalLedgerDryRunEnvelopeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "approval-ledger-dry-run-envelope.v1";
  envelopeState: EnvelopeState;
  readyForApprovalLedgerDryRunEnvelope: boolean;
  readyForApprovalDecision: false;
  readyForApprovalLedgerWrite: false;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  envelope: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  ledgerCandidateFields: LedgerCandidateField[];
  dryRunSteps: DryRunStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: EnvelopeMessage[];
  warnings: EnvelopeMessage[];
  recommendations: EnvelopeMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  approvalLedgerDryRunEnvelopeJson: "/api/v1/production/approval-ledger-dry-run-envelope",
  approvalLedgerDryRunEnvelopeMarkdown: "/api/v1/production/approval-ledger-dry-run-envelope?format=markdown",
  approvalDecisionPrerequisiteGateJson: "/api/v1/production/approval-decision-prerequisite-gate",
  approvalDecisionPrerequisiteGateMarkdown: "/api/v1/production/approval-decision-prerequisite-gate?format=markdown",
  currentRoadmap: "docs/plans/v179-post-pre-approval-roadmap.md",
});

export function loadApprovalLedgerDryRunEnvelope(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ApprovalLedgerDryRunEnvelopeProfile {
  const prerequisiteGate = loadApprovalDecisionPrerequisiteGate(config, headers);
  const ledgerCandidateFields = createLedgerCandidateFields(prerequisiteGate);
  const dryRunSteps = createDryRunSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    prerequisiteGate,
    ledgerCandidateFields,
    dryRunSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const envelopeDigest = digestEnvelope({
    profileVersion: "approval-ledger-dry-run-envelope.v1",
    sourceGateDigest: stringValue(prerequisiteGate.gate.gateDigest),
    sourceGateProfileVersion: prerequisiteGate.profileVersion,
    ledgerCandidateFields,
    dryRunSteps,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      envelopeDigestValid: undefined,
      readyForApprovalLedgerDryRunEnvelope: undefined,
    },
  });
  checks.envelopeDigestValid = isReleaseReportDigest(envelopeDigest);
  completeAggregateReadyCheck(checks, "readyForApprovalLedgerDryRunEnvelope");
  const envelopeState: EnvelopeState = checks.readyForApprovalLedgerDryRunEnvelope
    ? "ready-for-approval-ledger-dry-run-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(envelopeState);
  const recommendations = collectRecommendations(envelopeState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Approval ledger dry-run envelope",
    generatedAt: new Date().toISOString(),
    profileVersion: "approval-ledger-dry-run-envelope.v1",
    envelopeState,
    readyForApprovalLedgerDryRunEnvelope: checks.readyForApprovalLedgerDryRunEnvelope,
    readyForApprovalDecision: false,
    readyForApprovalLedgerWrite: false,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    envelope: {
      envelopeDigest,
      sourcePrerequisiteGateDigest: stringValue(prerequisiteGate.gate.gateDigest),
      sourcePrerequisiteGateVersion: prerequisiteGate.profileVersion,
      sourcePrerequisiteGateState: prerequisiteGate.gateState,
      sourcePrerequisiteGateReady: prerequisiteGate.readyForApprovalDecisionPrerequisiteGate,
      sourceReadyForDryRunEnvelope: prerequisiteGate.readyForApprovalLedgerDryRunEnvelope,
      idempotencyKey: createIdempotencyKey(prerequisiteGate),
      approvalLedgerCandidateVersion: "approval-ledger-candidate.v1",
      auditContextVersion: "approval-ledger-audit-context.v1",
      rollbackBoundaryVersion: "approval-ledger-rollback-boundary.v1",
      approvalDecisionCreated: false,
      approvalLedgerWriteAllowed: false,
      approvalLedgerWritten: false,
      productionReleaseAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
    },
    checks,
    artifacts: {
      sourceApprovalDecisionPrerequisiteGate: summarizePrerequisiteGate(prerequisiteGate),
      approvalLedgerCandidate: {
        version: "approval-ledger-candidate.v1",
        fieldCount: ledgerCandidateFields.length,
        fields: ledgerCandidateFields,
        candidateCanBePersisted: false,
        writesApprovalLedger: false,
      },
      auditContext: {
        version: "approval-ledger-audit-context.v1",
        operatorIdentitySource: "x-orderops-operator-id header through Node v180 gate",
        roleSource: "x-orderops-roles header through Node v180 gate",
        secretValuesIncluded: false,
        productionDatabaseConnectionRequired: false,
      },
      rollbackBoundary: {
        version: "approval-ledger-rollback-boundary.v1",
        javaRollbackSqlAllowed: false,
        miniKvRestoreAllowed: false,
        releaseExecutionAllowed: false,
        waitsForJavaV65AndMiniKvV74: true,
      },
      noExecutionBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerRelease: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
      },
    },
    ledgerCandidateFields,
    dryRunSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      ...checkSummary,
      ledgerCandidateFieldCount: ledgerCandidateFields.length,
      dryRunStepCount: dryRunSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      sourcePrerequisiteCheckCount: prerequisiteGate.summary.checkCount,
      sourcePrerequisitePassedCheckCount: prerequisiteGate.summary.passedCheckCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this dry-run envelope as the non-persistent approval ledger candidate.",
      "Keep Java v65 and mini-kv v74 as the next recommended parallel evidence pair before Node v182.",
      "Do not create an approval decision, write an approval ledger, release, rollback, or restore from this envelope.",
    ],
  };
}

export function renderApprovalLedgerDryRunEnvelopeMarkdown(
  profile: ApprovalLedgerDryRunEnvelopeProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Approval ledger dry-run envelope",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Envelope state": profile.envelopeState,
      "Ready for approval ledger dry-run envelope": profile.readyForApprovalLedgerDryRunEnvelope,
      "Ready for approval decision": profile.readyForApprovalDecision,
      "Ready for approval ledger write": profile.readyForApprovalLedgerWrite,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Envelope", entries: profile.envelope },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Approval Decision Prerequisite Gate", entries: profile.artifacts.sourceApprovalDecisionPrerequisiteGate },
      { heading: "Approval Ledger Candidate", entries: profile.artifacts.approvalLedgerCandidate },
      { heading: "Audit Context", entries: profile.artifacts.auditContext },
      { heading: "Rollback Boundary", entries: profile.artifacts.rollbackBoundary },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Ledger Candidate Fields",
        items: profile.ledgerCandidateFields,
        renderItem: renderLedgerCandidateField,
      },
      {
        heading: "Dry-run Steps",
        items: profile.dryRunSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Creates approval decision", "createsApprovalDecision"],
            ["Writes approval ledger", "writesApprovalLedger"],
            ["Executes release", "executesRelease"],
            ["Executes deployment", "executesDeployment"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
            ["Reads secret values", "readsSecretValues"],
            ["Connects production database", "connectsProductionDatabase"],
          ],
        }),
      },
      {
        heading: "Forbidden Operations",
        items: profile.forbiddenOperations,
        renderItem: renderReleaseForbiddenOperation,
      },
      {
        heading: "Pause Conditions",
        items: profile.pauseConditions,
        renderItem: (condition) => [`- ${condition}`],
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval ledger dry-run envelope blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval ledger dry-run envelope warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval ledger dry-run envelope recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createLedgerCandidateFields(
  prerequisiteGate: ApprovalDecisionPrerequisiteGateProfile,
): LedgerCandidateField[] {
  return [
    field("sourcePrerequisiteGateDigest", "Node v180 gate", stringValue(prerequisiteGate.gate.gateDigest), false),
    field("sourcePrerequisiteGateState", "Node v180 gate", prerequisiteGate.gateState, false),
    field("releaseOperator", "Java v64 signoff fixture through Node v180", stringValue(prerequisiteGate.gate.javaReleaseOperator), true),
    field("rollbackApprover", "Java v64 signoff fixture through Node v180", stringValue(prerequisiteGate.gate.javaRollbackApprover), true),
    field("releaseWindow", "Java v64 signoff fixture through Node v180", stringValue(prerequisiteGate.gate.javaReleaseWindow), true),
    field("miniKvRetentionId", "mini-kv v73 retained digest through Node v180", stringValue(prerequisiteGate.gate.miniKvRetentionId), false),
    field("miniKvRestoreArtifactDigest", "mini-kv v73 retained digest through Node v180", stringValue(prerequisiteGate.gate.miniKvRestoreArtifactDigestPlaceholder), true),
    field("dryRunOnly", "Node v181 envelope", true, false),
    field("approvalDecisionCreated", "Node v181 envelope", false, false),
    field("approvalLedgerWriteAllowed", "Node v181 envelope", false, false),
  ];
}

function field(
  name: string,
  source: string,
  value: string | boolean,
  placeholderAllowed: boolean,
): LedgerCandidateField {
  return {
    name,
    source,
    value,
    required: true,
    placeholderAllowed,
    nodeMayInfer: false,
    writesLedger: false,
  };
}

function createDryRunSteps(): DryRunStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v180 approval decision prerequisite gate.", ENDPOINTS.approvalDecisionPrerequisiteGateJson, "Gate is ready and digest-valid."),
    createStep(2, "compose", "node", "Compose approval ledger candidate fields without persistence.", "ledgerCandidateFields", "Candidate fields include operator, rollback, release window, and retained digest references."),
    createStep(3, "digest", "node", "Digest the dry-run envelope for archival review.", "envelope.envelopeDigest", "Envelope digest is a valid SHA-256 value."),
    createStep(4, "preserve", "auditor", "Preserve JSON, Markdown, screenshot, and code walkthrough as dry-run evidence.", "c/181 and code walkthrough", "Evidence is reproducible without upstream execution."),
    createStep(5, "stop", "node", "Stop before approval decision creation or approval ledger write.", "next plan handoff", "Java v65 + mini-kv v74 must provide the next parallel evidence pair before Node v182."),
  ];
}

function createStep(
  order: number,
  phase: DryRunStep["phase"],
  actor: EnvelopeActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): DryRunStep {
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

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    forbid("Create approval decision from Node v181", "v181 only builds a dry-run ledger envelope.", "Node v181 approval ledger dry-run envelope"),
    forbid("Write approval ledger from Node v181", "The envelope is non-persistent evidence.", "Node v181 approval ledger dry-run envelope"),
    forbid("Trigger production release from Node v181", "Release execution is outside this dry-run envelope.", "Node v181 approval ledger dry-run envelope"),
    forbid("Trigger production deployment from Node v181", "Deployment still requires external release approval.", "Node v181 approval ledger dry-run envelope"),
    forbid("Execute Java rollback SQL from Node v181", "Rollback approver evidence is planned for Java v65.", "Node v180 approval decision prerequisite gate"),
    forbid("Execute mini-kv restore from Node v181", "Restore approval boundary is planned for mini-kv v74.", "Node v180 approval decision prerequisite gate"),
    forbid("Start Java or mini-kv from Node v181", "This endpoint consumes static Node evidence only.", "runtime safety"),
    forbid("Read production secret values", "The envelope carries placeholders and digests only.", "runtime safety"),
    forbid("Connect production database", "No production database is required for dry-run envelope rendering.", "runtime safety"),
    forbid("Treat v181 as production authentication", "Production IdP remains a blocker.", "runtime safety"),
  ];
}

function forbid(
  operation: ForbiddenOperation["operation"],
  reason: string,
  blockedBy: ForbiddenOperation["blockedBy"],
): ForbiddenOperation {
  return { operation, reason, blockedBy };
}

function createPauseConditions(): string[] {
  return [
    "Need production secrets or secret values.",
    "Need production database access.",
    "Need production IdP connection or token verification.",
    "Need Node to auto-start Java or mini-kv.",
    "Need approval decision creation or approval ledger persistence.",
    "Need Java deployment, Java rollback, or Java rollback SQL.",
    "Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution.",
    "Need mini-kv in Java transaction consistency chain.",
    "Operator signoff, rollback approver, retained digest owner, or restore target is unclear.",
  ];
}

function createChecks(
  config: AppConfig,
  prerequisiteGate: ApprovalDecisionPrerequisiteGateProfile,
  ledgerCandidateFields: LedgerCandidateField[],
  dryRunSteps: DryRunStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  const candidateFieldNames = new Set(ledgerCandidateFields.map((candidate) => candidate.name));

  return {
    sourcePrerequisiteGateReady: prerequisiteGate.readyForApprovalDecisionPrerequisiteGate
      && prerequisiteGate.readyForApprovalLedgerDryRunEnvelope
      && prerequisiteGate.gateState === "ready-for-approval-decision-prerequisite-review",
    sourcePrerequisiteGateDigestValid: isReleaseReportDigest(prerequisiteGate.gate.gateDigest),
    sourcePrerequisiteStillBlocksApprovalAndProduction: prerequisiteGate.readyForApprovalDecision === false
      && prerequisiteGate.readyForProductionRelease === false
      && prerequisiteGate.readyForProductionDeployment === false
      && prerequisiteGate.readyForProductionRollback === false
      && prerequisiteGate.readyForProductionRestore === false
      && prerequisiteGate.executionAllowed === false,
    sourcePrerequisiteNoLedgerWrite: prerequisiteGate.gate.approvalLedgerWriteAllowed === false,
    ledgerCandidateFieldsComplete: ledgerCandidateFields.length === 10
      && candidateFieldNames.has("sourcePrerequisiteGateDigest")
      && candidateFieldNames.has("releaseOperator")
      && candidateFieldNames.has("rollbackApprover")
      && candidateFieldNames.has("releaseWindow")
      && candidateFieldNames.has("miniKvRestoreArtifactDigest")
      && candidateFieldNames.has("dryRunOnly")
      && candidateFieldNames.has("approvalLedgerWriteAllowed"),
    ledgerCandidateFieldsNonPersistent: ledgerCandidateFields.every((candidate) => (
      candidate.required
      && !candidate.nodeMayInfer
      && !candidate.writesLedger
    )),
    idempotencyKeyPresent: createIdempotencyKey(prerequisiteGate).startsWith("approval-ledger-dry-run:"),
    auditContextDryRunOnly: true,
    rollbackBoundaryClosed: true,
    dryRunStepsReadOnly: dryRunSteps.length === 5
      && dryRunSteps.every((step) => (
        step.readOnly
        && !step.createsApprovalDecision
        && !step.writesApprovalLedger
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 10
      && forbiddenOperations.some((operation) => operation.operation === "Create approval decision from Node v181")
      && forbiddenOperations.some((operation) => operation.operation === "Write approval ledger from Node v181")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v181"),
    pauseConditionsComplete: pauseConditions.length === 9
      && pauseConditions.includes("Need approval decision creation or approval ledger persistence.")
      && pauseConditions.includes("Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noApprovalDecisionCreated: true,
    noApprovalLedgerWrite: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRestoreExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForApprovalDecisionStillFalse: true,
    readyForApprovalLedgerWriteStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    envelopeDigestValid: false,
    readyForApprovalLedgerDryRunEnvelope: false,
  };
}

function summarizePrerequisiteGate(profile: ApprovalDecisionPrerequisiteGateProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    gateDigest: profile.gate.gateDigest,
    readyForApprovalDecisionPrerequisiteGate: profile.readyForApprovalDecisionPrerequisiteGate,
    readyForApprovalLedgerDryRunEnvelope: profile.readyForApprovalLedgerDryRunEnvelope,
    readyForApprovalDecision: profile.readyForApprovalDecision,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): EnvelopeMessage[] {
  return collectBlockingMessages<EnvelopeMessage>([
    { condition: checks.sourcePrerequisiteGateReady, code: "SOURCE_PREREQUISITE_GATE_NOT_READY", source: "approval-decision-prerequisite-gate", message: "Node v180 approval decision prerequisite gate must be ready before v181 envelope." },
    { condition: checks.sourcePrerequisiteGateDigestValid, code: "SOURCE_PREREQUISITE_GATE_DIGEST_INVALID", source: "approval-decision-prerequisite-gate", message: "Node v180 gate digest must be valid." },
    { condition: checks.sourcePrerequisiteStillBlocksApprovalAndProduction, code: "SOURCE_PREREQUISITE_UNLOCKS_PRODUCTION", source: "approval-decision-prerequisite-gate", message: "Node v180 must still block approval decisions and production operations." },
    { condition: checks.sourcePrerequisiteNoLedgerWrite, code: "SOURCE_PREREQUISITE_LEDGER_WRITE_OPEN", source: "approval-decision-prerequisite-gate", message: "Node v180 must not allow approval ledger writes." },
    { condition: checks.ledgerCandidateFieldsComplete, code: "LEDGER_CANDIDATE_FIELDS_INCOMPLETE", source: "approval-ledger-dry-run-envelope", message: "Dry-run envelope must include source, operator, rollback, digest, idempotency, and safety fields." },
    { condition: checks.ledgerCandidateFieldsNonPersistent, code: "LEDGER_CANDIDATE_FIELDS_PERSISTENT", source: "approval-ledger-dry-run-envelope", message: "Candidate fields must not write an approval ledger." },
    { condition: checks.idempotencyKeyPresent, code: "IDEMPOTENCY_KEY_MISSING", source: "approval-ledger-dry-run-envelope", message: "Dry-run envelope must expose a deterministic idempotency key." },
    { condition: checks.dryRunStepsReadOnly, code: "DRY_RUN_STEPS_NOT_READ_ONLY", source: "approval-ledger-dry-run-envelope", message: "Dry-run steps must remain read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "approval-ledger-dry-run-envelope", message: "Forbidden operations must cover approval, ledger, release, rollback, restore, secrets, database, and auth hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "runtime-config", message: "Node v181 must not start Java or mini-kv." },
    { condition: checks.noApprovalDecisionCreated, code: "APPROVAL_DECISION_CREATED", source: "approval-ledger-dry-run-envelope", message: "v181 must not create an approval decision." },
    { condition: checks.noApprovalLedgerWrite, code: "APPROVAL_LEDGER_WRITE_UNLOCKED", source: "approval-ledger-dry-run-envelope", message: "v181 must not write approval ledger records." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "approval-ledger-dry-run-envelope", message: "v181 must not execute release." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "approval-ledger-dry-run-envelope", message: "v181 must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "approval-ledger-dry-run-envelope", message: "v181 must not execute restore." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v181 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v181 must not connect production databases." },
    { condition: checks.readyForApprovalDecisionStillFalse, code: "APPROVAL_DECISION_UNLOCKED", source: "approval-ledger-dry-run-envelope", message: "v181 must not mark approval decision ready." },
    { condition: checks.readyForApprovalLedgerWriteStillFalse, code: "APPROVAL_LEDGER_WRITE_READY", source: "approval-ledger-dry-run-envelope", message: "v181 must not mark approval ledger write ready." },
    { condition: checks.envelopeDigestValid, code: "ENVELOPE_DIGEST_INVALID", source: "approval-ledger-dry-run-envelope", message: "Envelope digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(envelopeState: EnvelopeState): EnvelopeMessage[] {
  return [
    {
      code: envelopeState === "blocked"
        ? "APPROVAL_LEDGER_DRY_RUN_ENVELOPE_BLOCKED"
        : "DRY_RUN_ENVELOPE_NOT_LEDGER_WRITE",
      severity: "warning",
      source: "approval-ledger-dry-run-envelope",
      message: envelopeState === "blocked"
        ? "Approval ledger dry-run envelope has blockers."
        : "This envelope is a non-persistent ledger candidate only; it writes no approval ledger.",
    },
    {
      code: "NEXT_UPSTREAM_EVIDENCE_PAIR_REQUIRED",
      severity: "warning",
      source: "approval-ledger-dry-run-envelope",
      message: "Node v182 must wait for Java v65 and mini-kv v74 rollback/restore approval boundary evidence.",
    },
  ];
}

function collectRecommendations(envelopeState: EnvelopeState): EnvelopeMessage[] {
  return [
    {
      code: envelopeState === "blocked"
        ? "FIX_APPROVAL_LEDGER_DRY_RUN_BLOCKERS"
        : "PROCEED_TO_RECOMMENDED_PARALLEL_JAVA_V65_MINI_KV_V74",
      severity: "recommendation",
      source: "approval-ledger-dry-run-envelope",
      message: envelopeState === "blocked"
        ? "Fix missing dry-run envelope evidence before archiving v181."
        : "After v181 is archived, recommended parallel next work is Java v65 and mini-kv v74 before Node v182.",
    },
  ];
}

function renderLedgerCandidateField(field: LedgerCandidateField): string[] {
  return [
    `### ${field.name}`,
    "",
    `- Source: ${field.source}`,
    `- Value: ${String(field.value)}`,
    `- Required: ${field.required}`,
    `- Placeholder allowed: ${field.placeholderAllowed}`,
    `- Node may infer: ${field.nodeMayInfer}`,
    `- Writes ledger: ${field.writesLedger}`,
    "",
  ];
}

function createIdempotencyKey(prerequisiteGate: ApprovalDecisionPrerequisiteGateProfile): string {
  return `approval-ledger-dry-run:${String(prerequisiteGate.gate.gateDigest).slice(0, 16)}`;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function digestEnvelope(value: unknown): string {
  return digestReleaseReport(value);
}
