import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditSandboxAdapterDryRunPackage,
  type ManagedAuditSandboxAdapterDryRunPackageProfile,
} from "./managedAuditSandboxAdapterDryRunPackage.js";
import type {
  LocalDryRunWriteGuard,
  SandboxDryRunGuards,
} from "./managedAuditSandboxGuards.js";

export interface ManagedAuditManualSandboxAdapterConnectionRunbookProfile extends SandboxDryRunGuards, LocalDryRunWriteGuard {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1";
  runbookState: "manual-sandbox-connection-runbook-ready" | "blocked";
  readyForManagedAuditManualSandboxAdapterConnectionRunbook: boolean;
  readOnlyRunbook: true;
  sourceNodeV225: {
    sourceVersion: "Node v225";
    profileVersion: ManagedAuditSandboxAdapterDryRunPackageProfile["profileVersion"];
    packageState: ManagedAuditSandboxAdapterDryRunPackageProfile["packageState"];
    packageDigest: string;
    readyForDryRunPackage: boolean;
    readyForConnectionFromSource: false;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
    packageForbiddenOperationCount: number;
    packageEvidenceFileCount: number;
  };
  operatorInputs: ManualSandboxOperatorInput[];
  manualRunbook: ManualSandboxConnectionRunbook;
  checklist: ManualSandboxChecklistStep[];
  forbiddenOperations: ManualSandboxForbiddenOperation[];
  pauseConditions: ManualSandboxPauseCondition[];
  failureTaxonomy: ManualSandboxFailureClass[];
  checks: ManualSandboxConnectionRunbookChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    operatorInputCount: number;
    checklistStepCount: number;
    forbiddenOperationCount: number;
    pauseConditionCount: number;
    failureClassCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManualSandboxConnectionRunbookMessage[];
  warnings: ManualSandboxConnectionRunbookMessage[];
  recommendations: ManualSandboxConnectionRunbookMessage[];
  evidenceEndpoints: {
    manualSandboxConnectionRunbookJson: string;
    manualSandboxConnectionRunbookMarkdown: string;
    sourceNodeV225Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface ManualSandboxOperatorInput {
  id: string;
  label: string;
  required: boolean;
  valuePolicy: "identifier-or-handle-only" | "boolean-attestation" | "numeric-budget" | "document-reference";
  mustNotContain: string[];
  evidenceTarget: string;
}

interface ManualSandboxConnectionRunbook {
  runbookDigest: string;
  sourcePackageDigest: string;
  runbookMode: "manual-sandbox-connection-runbook-only";
  manualReviewRequired: true;
  connectionExecutionAllowed: false;
  credentialValueRequired: false;
  credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  ownerApprovalArtifactRequired: true;
  schemaRehearsalRequired: true;
  schemaMigrationExecutionAllowed: false;
  rollbackPathRequired: true;
  timeoutFailureClassificationRequired: true;
  nodeAutoStartAllowed: false;
  externalConnectionOpened: false;
  managedAuditWriteAllowed: false;
  javaLedgerWriteAllowed: false;
  miniKvManagedAuditStateWriteAllowed: false;
}

interface ManualSandboxChecklistStep {
  step: number;
  phase:
    | "source-package"
    | "operator-inputs"
    | "credential-boundary"
    | "schema-rehearsal"
    | "rollback"
    | "failure-classification"
    | "upstream-guards"
    | "final-stop-gate";
  owner: "node-operator" | "release-owner" | "security-reviewer" | "java-owner" | "mini-kv-owner";
  action: string;
  evidenceRequired: string;
  required: true;
  executionBoundary: "record-only" | "review-only" | "manual-only";
}

interface ManualSandboxForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v226 runbook"
    | "Node v225 package"
    | "credential boundary"
    | "schema rehearsal boundary"
    | "upstream project boundary";
}

interface ManualSandboxPauseCondition {
  code: string;
  severity: "pause";
  source: "operator-inputs" | "credential-boundary" | "schema-rehearsal" | "runtime-config" | "upstream-guards";
  condition: string;
  response: string;
}

interface ManualSandboxFailureClass {
  failureClass:
    | "closed-window"
    | "missing-owner-artifact"
    | "credential-value-requested"
    | "schema-sql-required"
    | "connection-refused"
    | "timeout"
    | "invalid-response"
    | "manual-abort";
  classificationRule: string;
  operatorResponse: string;
  archiveRequirement: string;
}

type ManualSandboxConnectionRunbookChecks = {
  sourcePackageReady: boolean;
  sourcePackageStillConnectionBlocked: boolean;
  sourcePackageStillCredentialSafe: boolean;
  operatorInputsListed: boolean;
  ownerArtifactInputListed: boolean;
  credentialHandleInputListed: boolean;
  schemaRehearsalInputListed: boolean;
  rollbackPathInputListed: boolean;
  failureClassificationCovered: boolean;
  checklistMachineReadable: boolean;
  forbiddenOperationsMachineReadable: boolean;
  pauseConditionsMachineReadable: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxAdapterConnectionRunbook: boolean;
};

interface ManualSandboxConnectionRunbookMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-manual-sandbox-adapter-connection-runbook"
    | "node-v225-sandbox-package"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  manualSandboxConnectionRunbookJson: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook",
  manualSandboxConnectionRunbookMarkdown: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook?format=markdown",
  sourceNodeV225Json: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package",
  activePlan: "docs/plans/v225-post-sandbox-package-roadmap.md",
});

export function loadManagedAuditManualSandboxAdapterConnectionRunbook(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxAdapterConnectionRunbookProfile {
  const sourcePackage = loadManagedAuditSandboxAdapterDryRunPackage({ config: input.config });
  const operatorInputs = createOperatorInputs();
  const checklist = createChecklist(sourcePackage);
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const failureTaxonomy = createFailureTaxonomy();
  const manualRunbook = createManualRunbook(sourcePackage, operatorInputs, checklist, forbiddenOperations, pauseConditions, failureTaxonomy);
  const checks = createChecks(input.config, sourcePackage, operatorInputs, checklist, forbiddenOperations, pauseConditions, failureTaxonomy);
  checks.readyForManagedAuditManualSandboxAdapterConnectionRunbook = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxAdapterConnectionRunbook")
    .every(([, value]) => value);
  const runbookState = checks.readyForManagedAuditManualSandboxAdapterConnectionRunbook
    ? "manual-sandbox-connection-runbook-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox adapter connection runbook",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
    runbookState,
    readyForManagedAuditManualSandboxAdapterConnectionRunbook: checks.readyForManagedAuditManualSandboxAdapterConnectionRunbook,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyRunbook: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    localDryRunWritePerformed: false,
    automaticUpstreamStart: false,
    sourceNodeV225: {
      sourceVersion: "Node v225",
      profileVersion: sourcePackage.profileVersion,
      packageState: sourcePackage.packageState,
      packageDigest: sourcePackage.packagePlan.packageDigest,
      readyForDryRunPackage: sourcePackage.readyForManagedAuditSandboxAdapterDryRunPackage,
      readyForConnectionFromSource: sourcePackage.readyForManagedAuditSandboxAdapterConnection,
      connectsManagedAudit: sourcePackage.connectsManagedAudit,
      readsManagedAuditCredential: sourcePackage.readsManagedAuditCredential,
      schemaMigrationExecuted: sourcePackage.schemaMigrationExecuted,
      packageForbiddenOperationCount: sourcePackage.summary.forbiddenOperationCount,
      packageEvidenceFileCount: sourcePackage.summary.evidenceFileCount,
    },
    operatorInputs,
    manualRunbook,
    checklist,
    forbiddenOperations,
    pauseConditions,
    failureTaxonomy,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      operatorInputCount: operatorInputs.length,
      checklistStepCount: checklist.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      failureClassCount: failureTaxonomy.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Review this runbook manually; do not use it to open an external managed audit connection.",
      "Recommended parallel next step: Java v86 and mini-kv v95 should add read-only connection guard receipts.",
      "After Java v86 and mini-kv v95 are complete, Node v227 can consume all three artifacts into an evidence checklist.",
    ],
  };
}

export function renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown(
  profile: ManagedAuditManualSandboxAdapterConnectionRunbookProfile,
): string {
  return [
    "# Managed audit manual sandbox adapter connection runbook",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Runbook state: ${profile.runbookState}`,
    `- Ready for manual sandbox adapter connection runbook: ${profile.readyForManagedAuditManualSandboxAdapterConnectionRunbook}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v225",
    "",
    ...renderEntries(profile.sourceNodeV225),
    "",
    "## Manual Runbook",
    "",
    ...renderEntries(profile.manualRunbook),
    "",
    "## Operator Inputs",
    "",
    ...profile.operatorInputs.flatMap(renderOperatorInput),
    "## Checklist",
    "",
    ...profile.checklist.flatMap(renderChecklistStep),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
    "## Pause Conditions",
    "",
    ...profile.pauseConditions.flatMap(renderPauseCondition),
    "## Failure Taxonomy",
    "",
    ...profile.failureTaxonomy.flatMap(renderFailureClass),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No manual sandbox connection runbook blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No manual sandbox connection runbook warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No manual sandbox connection runbook recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createOperatorInputs(): ManualSandboxOperatorInput[] {
  return [
    input("ownerApprovalArtifactId", "Owner approval artifact id", "document-reference", ["credential", "secret", "password"], "Release owner approval record for a future sandbox-only window."),
    input("sandboxCredentialHandle", "Sandbox credential handle", "identifier-or-handle-only", ["credential value", "secret value", "password"], "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE only; never paste the resolved value."),
    input("schemaRehearsalChecklistId", "Schema rehearsal checklist id", "document-reference", ["SQL body", "migration password"], "Schema review checklist proving SQL is reviewed but not executed by Node v226."),
    input("rollbackPathDocumentId", "Rollback path document id", "document-reference", ["production token", "database password"], "Manual rollback path for an aborted sandbox connection rehearsal."),
    input("manualWindowId", "Manual sandbox window id", "identifier-or-handle-only", ["production window", "credential value"], "Human-approved sandbox window reference."),
    input("timeoutBudgetMs", "Timeout budget in milliseconds", "numeric-budget", ["credential", "secret"], "Operator-selected timeout budget for classifying future read failures."),
    input("failureTaxonomyReference", "Failure taxonomy reference", "document-reference", ["credential", "secret"], "Reference to the failure class mapping archived with this runbook."),
    input("operatorIdentityAttestation", "Operator identity attestation", "boolean-attestation", ["credential", "secret"], "Operator confirms identity and approval chain without recording secrets."),
  ];
}

function createChecklist(
  sourcePackage: ManagedAuditSandboxAdapterDryRunPackageProfile,
): ManualSandboxChecklistStep[] {
  return [
    step(1, "source-package", "node-operator", `Confirm Node v225 package digest ${sourcePackage.packagePlan.packageDigest} is archived and still reports readyForManagedAuditSandboxAdapterConnection=false.`, "Node v225 package digest and JSON endpoint response.", "review-only"),
    step(2, "operator-inputs", "release-owner", "Provide ownerApprovalArtifactId, manualWindowId, and rollbackPathDocumentId as artifact handles only.", "Artifact handles; no credential values or production secrets.", "record-only"),
    step(3, "credential-boundary", "security-reviewer", "Confirm ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE is the only credential reference allowed in the runbook.", "Credential handle review note without resolved value.", "review-only"),
    step(4, "schema-rehearsal", "java-owner", "Attach schemaRehearsalChecklistId and verify Java will not execute SQL during Node v226 or v227.", "Schema rehearsal checklist id and no-SQL attestation.", "review-only"),
    step(5, "rollback", "release-owner", "Attach rollbackPathDocumentId and confirm rollback is a manual operator path outside Node.", "Rollback path document id and owner attestation.", "manual-only"),
    step(6, "failure-classification", "node-operator", "Map timeout, connection-refused, invalid-response, and manual-abort classes before any future connection attempt.", "Failure taxonomy archived with this runbook.", "record-only"),
    step(7, "upstream-guards", "java-owner", "Wait for Java v86 and mini-kv v95 read-only guard receipts before Node v227 evidence checklist.", "Java v86 and mini-kv v95 receipt references.", "review-only"),
    step(8, "final-stop-gate", "node-operator", "Stop if any required item asks Node to start services, read credential values, execute SQL, or write managed audit state.", "Stop-gate attestation in the archived runbook.", "manual-only"),
  ];
}

function createForbiddenOperations(): ManualSandboxForbiddenOperation[] {
  return [
    forbidden("Read, print, log, or archive a sandbox or production credential value.", "v226 accepts credential handles only.", "credential boundary"),
    forbidden("Open an external managed audit connection.", "v226 is a runbook, not an adapter execution.", "Node v226 runbook"),
    forbidden("Execute schema migration SQL.", "Schema work is rehearsal and review only.", "schema rehearsal boundary"),
    forbidden("Write Java approval ledger or managed audit state.", "Java remains a read-only evidence provider for this phase.", "upstream project boundary"),
    forbidden("Write sandbox managed audit records into mini-kv.", "mini-kv is not the sandbox audit storage backend.", "upstream project boundary"),
    forbidden("Use mini-kv as an audit/order authority.", "mini-kv remains infrastructure evidence only.", "upstream project boundary"),
    forbidden("Start Java, mini-kv, or an external audit service automatically.", "All future service startup must be a separate manual operator action.", "Node v226 runbook"),
    forbidden("Treat this runbook as production audit approval.", "Production audit and production window remain blocked.", "Node v225 package"),
  ];
}

function createPauseConditions(): ManualSandboxPauseCondition[] {
  return [
    pause("OWNER_ARTIFACT_MISSING", "operator-inputs", "ownerApprovalArtifactId is missing or unclear.", "Stop v227 planning until the release owner supplies an artifact handle."),
    pause("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", "Any step asks for a resolved credential value.", "Stop immediately; replace the value request with a credential handle review."),
    pause("SCHEMA_SQL_REQUIRED", "schema-rehearsal", "Any step requires Node or Java to execute SQL.", "Stop and move schema execution into a later approved migration workflow."),
    pause("UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED is true.", "Stop and rerun with UPSTREAM_ACTIONS_ENABLED=false."),
    pause("AUTO_START_REQUIRED", "runtime-config", "A future step requires Node to start Java, mini-kv, or audit services.", "Stop; service startup must remain manual and out of Node v226."),
    pause("JAVA_V86_GUARD_MISSING", "upstream-guards", "Java v86 read-only guard receipt is missing.", "Stop Node v227 until Java v86 is complete."),
    pause("MINIKV_V95_GUARD_MISSING", "upstream-guards", "mini-kv v95 non-storage guard receipt is missing.", "Stop Node v227 until mini-kv v95 is complete."),
    pause("FAILURE_CLASS_UNCLEAR", "operator-inputs", "Timeout, refused connection, invalid response, or manual abort cannot be classified.", "Stop and update the failure taxonomy before a future connection window."),
  ];
}

function createFailureTaxonomy(): ManualSandboxFailureClass[] {
  return [
    failure("closed-window", "The operator has not opened a manual sandbox window.", "Keep the runbook archived and do not connect.", "Archive the closed-window decision and current config."),
    failure("missing-owner-artifact", "ownerApprovalArtifactId is absent or not reviewable.", "Stop before v227 and request the owner artifact handle.", "Archive the missing-artifact blocker."),
    failure("credential-value-requested", "Any workflow asks for a resolved secret instead of the configured handle.", "Stop immediately and remove secret material from the workflow.", "Archive only the fact that a value request was rejected."),
    failure("schema-sql-required", "A step requires SQL execution rather than rehearsal.", "Stop and move SQL to a later approved migration plan.", "Archive the schema rehearsal gap."),
    failure("connection-refused", "A later manual sandbox attempt cannot reach the external audit endpoint.", "Classify as environment readiness failure, not Node write failure.", "Archive endpoint status without credentials."),
    failure("timeout", "A later manual sandbox read exceeds timeoutBudgetMs.", "Classify as timeout and keep writes disabled.", "Archive timeout budget and elapsed duration only."),
    failure("invalid-response", "A later manual sandbox read returns malformed JSON or an unexpected schema.", "Classify as adapter contract failure.", "Archive redacted response shape and parser error."),
    failure("manual-abort", "An operator aborts before or during a future sandbox window.", "Stop the workflow and keep production audit blocked.", "Archive operator abort reason without secrets."),
  ];
}

function createManualRunbook(
  sourcePackage: ManagedAuditSandboxAdapterDryRunPackageProfile,
  operatorInputs: ManualSandboxOperatorInput[],
  checklist: ManualSandboxChecklistStep[],
  forbiddenOperations: ManualSandboxForbiddenOperation[],
  pauseConditions: ManualSandboxPauseCondition[],
  failureTaxonomy: ManualSandboxFailureClass[],
): ManualSandboxConnectionRunbook {
  return {
    runbookDigest: sha256StableJson({
      profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
      sourcePackageDigest: sourcePackage.packagePlan.packageDigest,
      operatorInputs,
      checklist,
      forbiddenOperations,
      pauseConditions,
      failureTaxonomy,
    }),
    sourcePackageDigest: sourcePackage.packagePlan.packageDigest,
    runbookMode: "manual-sandbox-connection-runbook-only",
    manualReviewRequired: true,
    connectionExecutionAllowed: false,
    credentialValueRequired: false,
    credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    ownerApprovalArtifactRequired: true,
    schemaRehearsalRequired: true,
    schemaMigrationExecutionAllowed: false,
    rollbackPathRequired: true,
    timeoutFailureClassificationRequired: true,
    nodeAutoStartAllowed: false,
    externalConnectionOpened: false,
    managedAuditWriteAllowed: false,
    javaLedgerWriteAllowed: false,
    miniKvManagedAuditStateWriteAllowed: false,
  };
}

function createChecks(
  config: AppConfig,
  sourcePackage: ManagedAuditSandboxAdapterDryRunPackageProfile,
  operatorInputs: ManualSandboxOperatorInput[],
  checklist: ManualSandboxChecklistStep[],
  forbiddenOperations: ManualSandboxForbiddenOperation[],
  pauseConditions: ManualSandboxPauseCondition[],
  failureTaxonomy: ManualSandboxFailureClass[],
): ManualSandboxConnectionRunbookChecks {
  return {
    sourcePackageReady: sourcePackage.readyForManagedAuditSandboxAdapterDryRunPackage
      && sourcePackage.packageState === "sandbox-adapter-dry-run-package-ready",
    sourcePackageStillConnectionBlocked: !sourcePackage.readyForManagedAuditSandboxAdapterConnection
      && !sourcePackage.connectsManagedAudit,
    sourcePackageStillCredentialSafe: !sourcePackage.readsManagedAuditCredential
      && !sourcePackage.storesManagedAuditCredential,
    operatorInputsListed: operatorInputs.length >= 8
      && operatorInputs.every((operatorInput) => operatorInput.required),
    ownerArtifactInputListed: operatorInputs.some((operatorInput) => operatorInput.id === "ownerApprovalArtifactId"),
    credentialHandleInputListed: operatorInputs.some((operatorInput) => operatorInput.id === "sandboxCredentialHandle")
      && operatorInputs.some((operatorInput) => operatorInput.evidenceTarget.includes("ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE")),
    schemaRehearsalInputListed: operatorInputs.some((operatorInput) => operatorInput.id === "schemaRehearsalChecklistId"),
    rollbackPathInputListed: operatorInputs.some((operatorInput) => operatorInput.id === "rollbackPathDocumentId"),
    failureClassificationCovered: failureTaxonomy.length >= 8
      && failureTaxonomy.some((failureClass) => failureClass.failureClass === "timeout")
      && failureTaxonomy.some((failureClass) => failureClass.failureClass === "connection-refused")
      && failureTaxonomy.some((failureClass) => failureClass.failureClass === "credential-value-requested"),
    checklistMachineReadable: checklist.length >= 8
      && checklist.every((item, index) => item.step === index + 1 && item.required),
    forbiddenOperationsMachineReadable: forbiddenOperations.length >= 8
      && forbiddenOperations.some((operation) => operation.operation.includes("credential value"))
      && forbiddenOperations.some((operation) => operation.operation.includes("external managed audit connection")),
    pauseConditionsMachineReadable: pauseConditions.length >= 8
      && pauseConditions.some((condition) => condition.code === "CREDENTIAL_VALUE_REQUESTED")
      && pauseConditions.some((condition) => condition.code === "UPSTREAM_ACTIONS_ENABLED"),
    credentialValueStillForbidden: true,
    schemaMigrationStillBlocked: true,
    externalConnectionStillBlocked: true,
    managedAuditWritesStillBlocked: true,
    automaticServiceStartStillBlocked: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxAdapterConnectionRunbook: false,
  };
}

function collectProductionBlockers(
  checks: ManualSandboxConnectionRunbookChecks,
): ManualSandboxConnectionRunbookMessage[] {
  const blockers: ManualSandboxConnectionRunbookMessage[] = [];
  addBlocker(blockers, checks.sourcePackageReady, "NODE_V225_PACKAGE_NOT_READY", "node-v225-sandbox-package", "Node v225 sandbox dry-run package must be ready before v226.");
  addBlocker(blockers, checks.sourcePackageStillConnectionBlocked, "NODE_V225_CONNECTION_UNLOCKED", "node-v225-sandbox-package", "Node v225 must still block sandbox adapter connection.");
  addBlocker(blockers, checks.operatorInputsListed, "OPERATOR_INPUTS_INCOMPLETE", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 must list all required operator inputs.");
  addBlocker(blockers, checks.checklistMachineReadable, "CHECKLIST_NOT_MACHINE_READABLE", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 checklist must be machine-readable.");
  addBlocker(blockers, checks.forbiddenOperationsMachineReadable, "FORBIDDEN_OPERATIONS_INCOMPLETE", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 forbidden operations must cover credential, connection, SQL, and write boundaries.");
  addBlocker(blockers, checks.pauseConditionsMachineReadable, "PAUSE_CONDITIONS_INCOMPLETE", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 pause conditions must be explicit.");
  addBlocker(blockers, checks.failureClassificationCovered, "FAILURE_TAXONOMY_INCOMPLETE", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 must classify timeout, connection, invalid-response, credential, and manual-abort cases.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-manual-sandbox-adapter-connection-runbook", "v226 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ManualSandboxConnectionRunbookMessage[] {
  return [
    {
      code: "RUNBOOK_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-manual-sandbox-adapter-connection-runbook",
      message: "This runbook prepares a manual sandbox connection review only; it does not connect to managed audit.",
    },
    {
      code: "OWNER_ARTIFACT_STILL_REQUIRED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-adapter-connection-runbook",
      message: "The owner approval artifact is listed as a required operator input but is not supplied by Node v226.",
    },
  ];
}

function collectRecommendations(): ManualSandboxConnectionRunbookMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V86_MINIKV_V95",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-adapter-connection-runbook",
      message: "Run Java v86 and mini-kv v95 in parallel before Node v227 consumes their read-only guard receipts.",
    },
    {
      code: "KEEP_ROUTE_HELPER_FOR_AUDIT_REPORTS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-adapter-connection-runbook",
      message: "Continue registering audit JSON/Markdown reports through registerAuditJsonMarkdownRoute.",
    },
  ];
}

function input(
  id: string,
  label: string,
  valuePolicy: ManualSandboxOperatorInput["valuePolicy"],
  mustNotContain: string[],
  evidenceTarget: string,
): ManualSandboxOperatorInput {
  return {
    id,
    label,
    required: true,
    valuePolicy,
    mustNotContain,
    evidenceTarget,
  };
}

function step(
  stepNumber: number,
  phase: ManualSandboxChecklistStep["phase"],
  owner: ManualSandboxChecklistStep["owner"],
  action: string,
  evidenceRequired: string,
  executionBoundary: ManualSandboxChecklistStep["executionBoundary"],
): ManualSandboxChecklistStep {
  return {
    step: stepNumber,
    phase,
    owner,
    action,
    evidenceRequired,
    required: true,
    executionBoundary,
  };
}

function forbidden(
  operation: string,
  reason: string,
  blockedBy: ManualSandboxForbiddenOperation["blockedBy"],
): ManualSandboxForbiddenOperation {
  return { operation, reason, blockedBy };
}

function pause(
  code: string,
  source: ManualSandboxPauseCondition["source"],
  condition: string,
  response: string,
): ManualSandboxPauseCondition {
  return {
    code,
    severity: "pause",
    source,
    condition,
    response,
  };
}

function failure(
  failureClass: ManualSandboxFailureClass["failureClass"],
  classificationRule: string,
  operatorResponse: string,
  archiveRequirement: string,
): ManualSandboxFailureClass {
  return {
    failureClass,
    classificationRule,
    operatorResponse,
    archiveRequirement,
  };
}

function addBlocker(
  messages: ManualSandboxConnectionRunbookMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxConnectionRunbookMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderOperatorInput(operatorInput: ManualSandboxOperatorInput): string[] {
  return [
    `### ${operatorInput.id}`,
    "",
    ...renderEntries(operatorInput),
    "",
  ];
}

function renderChecklistStep(checklistStep: ManualSandboxChecklistStep): string[] {
  return [
    `### Step ${checklistStep.step}: ${checklistStep.phase}`,
    "",
    ...renderEntries(checklistStep),
    "",
  ];
}

function renderForbiddenOperation(operation: ManualSandboxForbiddenOperation): string[] {
  return [
    `- ${operation.operation}`,
    `  - Reason: ${operation.reason}`,
    `  - Blocked by: ${operation.blockedBy}`,
  ];
}

function renderPauseCondition(condition: ManualSandboxPauseCondition): string[] {
  return [
    `- ${condition.code} (${condition.severity}, ${condition.source})`,
    `  - Condition: ${condition.condition}`,
    `  - Response: ${condition.response}`,
  ];
}

function renderFailureClass(failureClass: ManualSandboxFailureClass): string[] {
  return [
    `### ${failureClass.failureClass}`,
    "",
    ...renderEntries(failureClass),
    "",
  ];
}
