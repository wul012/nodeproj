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
  loadManagedAuditExternalAdapterConnectionReadinessReview,
  type ManagedAuditExternalAdapterConnectionReadinessReviewProfile,
} from "./managedAuditExternalAdapterConnectionReadinessReview.js";

export interface ManagedAuditSandboxAdapterDryRunPlanProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1";
  planState: "sandbox-adapter-dry-run-plan-ready" | "blocked";
  readyForManagedAuditSandboxAdapterDryRunPlan: boolean;
  readyForManagedAuditSandboxAdapterDryRunPackage: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPlan: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  localDryRunWritePerformed: false;
  automaticUpstreamStart: false;
  sourceNodeV223: {
    sourceVersion: "Node v223";
    profileVersion: ManagedAuditExternalAdapterConnectionReadinessReviewProfile["profileVersion"];
    reviewState: ManagedAuditExternalAdapterConnectionReadinessReviewProfile["reviewState"];
    readinessDigest: string;
    readyForConnectionReadinessReview: boolean;
    connectsManagedAudit: false;
    readsManagedAuditCredential: false;
    schemaMigrationExecuted: false;
  };
  sandboxPlan: SandboxAdapterDryRunPlan;
  qualityGates: SandboxAdapterQualityGates;
  checks: SandboxAdapterDryRunPlanChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredEvidenceCount: number;
    operatorStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SandboxAdapterDryRunPlanMessage[];
  warnings: SandboxAdapterDryRunPlanMessage[];
  recommendations: SandboxAdapterDryRunPlanMessage[];
  evidenceEndpoints: {
    sandboxAdapterDryRunPlanJson: string;
    sandboxAdapterDryRunPlanMarkdown: string;
    sourceNodeV223Json: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface SandboxAdapterDryRunPlan {
  planDigest: string;
  evidenceSpan: "Node v223 external adapter connection readiness review";
  sandboxOnly: true;
  productionCredentialAllowed: false;
  credentialValueRequired: false;
  credentialHandleRequired: true;
  credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  ownerApprovalArtifactRequired: true;
  schemaMigrationRehearsalRequired: true;
  schemaMigrationExecutionAllowed: false;
  externalConnectionExecutionAllowed: false;
  managedAuditWriteAllowed: false;
  externalServiceStartAllowed: false;
  miniKvStorageBackendAllowed: false;
  javaApprovalLedgerWriteAllowed: false;
  failureRollbackPathRequired: true;
  requiredEvidence: string[];
  operatorChecklist: string[];
  forbiddenOperations: string[];
}

interface SandboxAdapterQualityGates {
  gateSource: "docs/plans/v223-post-external-adapter-readiness-roadmap.md";
  gatesAreHardAcceptanceCriteria: true;
  nodeV224ProfileExportsQualityGates: true;
  nodeManagedAuditServiceFileLimit: "split-before-800-lines";
  nodeRouteRegistrationRequired: "registerAuditJsonMarkdownRoute";
  nodeSummaryOnlyVersionForbidden: true;
  javaV82OpsEvidenceServiceBloatForbidden: true;
  javaV82BuilderOrHelperRequired: true;
  javaV82LongBooleanConstructorForbidden: true;
  miniKvV91CommandCppIfChainBloatForbidden: true;
  miniKvV91RuntimeEvidenceHelperRequired: true;
  miniKvV91WalSnapshotRestoreCoreUntouched: true;
}

type SandboxAdapterDryRunPlanChecks = {
  nodeV223ReviewReady: boolean;
  nodeV223StillReadOnly: boolean;
  ownerApprovalArtifactRequired: boolean;
  sandboxCredentialHandleRequired: boolean;
  productionCredentialStillForbidden: boolean;
  schemaMigrationRehearsalRequired: boolean;
  schemaMigrationExecutionStillBlocked: boolean;
  externalConnectionStillBlocked: boolean;
  managedAuditWriteStillBlocked: boolean;
  failureRollbackPathRequired: boolean;
  javaMiniKvFutureGuardsRequired: boolean;
  nodeQualityGatesRecorded: boolean;
  javaMiniKvQualityGatesRecorded: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditSandboxAdapterDryRunPlan: boolean;
};

interface SandboxAdapterDryRunPlanMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-sandbox-adapter-dry-run-plan"
    | "node-v223-external-adapter-readiness-review"
    | "runtime-config"
    | "quality-gates";
  message: string;
}

const ENDPOINTS = Object.freeze({
  sandboxAdapterDryRunPlanJson: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
  sandboxAdapterDryRunPlanMarkdown: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan?format=markdown",
  sourceNodeV223Json: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
  activePlan: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
});

export function loadManagedAuditSandboxAdapterDryRunPlan(input: {
  config: AppConfig;
}): ManagedAuditSandboxAdapterDryRunPlanProfile {
  const source = loadManagedAuditExternalAdapterConnectionReadinessReview({ config: input.config });
  const sandboxPlan = createSandboxPlan();
  const qualityGates = createQualityGates();
  const checks = createChecks(input.config, source, sandboxPlan, qualityGates);
  checks.readyForManagedAuditSandboxAdapterDryRunPlan = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditSandboxAdapterDryRunPlan")
    .every(([, value]) => value);
  const planState = checks.readyForManagedAuditSandboxAdapterDryRunPlan
    ? "sandbox-adapter-dry-run-plan-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit sandbox adapter dry-run plan",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
    planState,
    readyForManagedAuditSandboxAdapterDryRunPlan: checks.readyForManagedAuditSandboxAdapterDryRunPlan,
    readyForManagedAuditSandboxAdapterDryRunPackage: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPlan: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    localDryRunWritePerformed: false,
    automaticUpstreamStart: false,
    sourceNodeV223: {
      sourceVersion: "Node v223",
      profileVersion: source.profileVersion,
      reviewState: source.reviewState,
      readinessDigest: source.connectionReadiness.readinessDigest,
      readyForConnectionReadinessReview: source.readyForManagedAuditExternalAdapterConnectionReadinessReview,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
    },
    sandboxPlan,
    qualityGates,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredEvidenceCount: sandboxPlan.requiredEvidence.length,
      operatorStepCount: sandboxPlan.operatorChecklist.length,
      forbiddenOperationCount: sandboxPlan.forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Run Java v82 and mini-kv v91 in parallel as read-only guard receipts before Node v225.",
      "Keep sandbox adapter work plan-only until Java v82 and mini-kv v91 evidence exists.",
      "Do not read credential values; future evidence may reference only a sandbox credential handle and review status.",
    ],
  };
}

export function renderManagedAuditSandboxAdapterDryRunPlanMarkdown(
  profile: ManagedAuditSandboxAdapterDryRunPlanProfile,
): string {
  return [
    "# Managed audit sandbox adapter dry-run plan",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Plan state: ${profile.planState}`,
    `- Ready for sandbox adapter dry-run plan: ${profile.readyForManagedAuditSandboxAdapterDryRunPlan}`,
    `- Ready for sandbox adapter dry-run package: ${profile.readyForManagedAuditSandboxAdapterDryRunPackage}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v223",
    "",
    ...renderEntries(profile.sourceNodeV223),
    "",
    "## Sandbox Plan",
    "",
    ...renderEntries(profile.sandboxPlan),
    "",
    "## Quality Gates",
    "",
    ...renderEntries(profile.qualityGates),
    "",
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
    ...renderMessages(profile.productionBlockers, "No sandbox adapter dry-run plan blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No sandbox adapter dry-run plan warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No sandbox adapter dry-run plan recommendations."),
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

function createSandboxPlan(): SandboxAdapterDryRunPlan {
  const requiredEvidence = [
    "Node v223 external adapter connection readiness review digest.",
    "Owner approval artifact identifier for sandbox adapter rehearsal.",
    "Sandbox credential handle name without credential value disclosure.",
    "Schema migration rehearsal checklist without SQL execution.",
    "Failure rollback path and manual abort criteria.",
    "Java v82 approval/schema rehearsal guard receipt.",
    "mini-kv v91 non-participation receipt for sandbox adapter runtime evidence.",
  ];
  const operatorChecklist = [
    "Confirm Node v223 review remains ready and read-only.",
    "Prepare owner approval artifact for sandbox adapter rehearsal.",
    "Register only the sandbox credential handle name, not the credential value.",
    "Document schema migration rehearsal steps without running SQL.",
    "Document rollback and abort path before any future connection dry-run.",
    "Wait for Java v82 and mini-kv v91 guard receipts before Node v225 package.",
  ];
  const forbiddenOperations = [
    "Read or print a production managed audit credential value.",
    "Open a real external managed audit connection.",
    "Execute schema migration SQL.",
    "Write Java approval ledger or managed audit state.",
    "Use mini-kv as managed audit storage backend.",
    "Start Java, mini-kv, or an external audit service automatically.",
    "Unlock a production audit or production operations window.",
  ];
  const digest = sha256StableJson({
    profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
    requiredEvidence,
    operatorChecklist,
    forbiddenOperations,
  });

  return {
    planDigest: digest,
    evidenceSpan: "Node v223 external adapter connection readiness review",
    sandboxOnly: true,
    productionCredentialAllowed: false,
    credentialValueRequired: false,
    credentialHandleRequired: true,
    credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    ownerApprovalArtifactRequired: true,
    schemaMigrationRehearsalRequired: true,
    schemaMigrationExecutionAllowed: false,
    externalConnectionExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    externalServiceStartAllowed: false,
    miniKvStorageBackendAllowed: false,
    javaApprovalLedgerWriteAllowed: false,
    failureRollbackPathRequired: true,
    requiredEvidence,
    operatorChecklist,
    forbiddenOperations,
  };
}

function createQualityGates(): SandboxAdapterQualityGates {
  return {
    gateSource: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
    gatesAreHardAcceptanceCriteria: true,
    nodeV224ProfileExportsQualityGates: true,
    nodeManagedAuditServiceFileLimit: "split-before-800-lines",
    nodeRouteRegistrationRequired: "registerAuditJsonMarkdownRoute",
    nodeSummaryOnlyVersionForbidden: true,
    javaV82OpsEvidenceServiceBloatForbidden: true,
    javaV82BuilderOrHelperRequired: true,
    javaV82LongBooleanConstructorForbidden: true,
    miniKvV91CommandCppIfChainBloatForbidden: true,
    miniKvV91RuntimeEvidenceHelperRequired: true,
    miniKvV91WalSnapshotRestoreCoreUntouched: true,
  };
}

function createChecks(
  config: AppConfig,
  source: ManagedAuditExternalAdapterConnectionReadinessReviewProfile,
  sandboxPlan: SandboxAdapterDryRunPlan,
  qualityGates: SandboxAdapterQualityGates,
): SandboxAdapterDryRunPlanChecks {
  return {
    nodeV223ReviewReady: source.readyForManagedAuditExternalAdapterConnectionReadinessReview
      && source.reviewState === "ready-for-external-adapter-connection-review",
    nodeV223StillReadOnly: source.readOnlyReview
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted,
    ownerApprovalArtifactRequired: sandboxPlan.ownerApprovalArtifactRequired,
    sandboxCredentialHandleRequired: sandboxPlan.credentialHandleRequired
      && sandboxPlan.credentialHandleName === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    productionCredentialStillForbidden: !sandboxPlan.productionCredentialAllowed
      && !sandboxPlan.credentialValueRequired,
    schemaMigrationRehearsalRequired: sandboxPlan.schemaMigrationRehearsalRequired,
    schemaMigrationExecutionStillBlocked: !sandboxPlan.schemaMigrationExecutionAllowed,
    externalConnectionStillBlocked: !sandboxPlan.externalConnectionExecutionAllowed,
    managedAuditWriteStillBlocked: !sandboxPlan.managedAuditWriteAllowed
      && !sandboxPlan.javaApprovalLedgerWriteAllowed
      && !sandboxPlan.miniKvStorageBackendAllowed,
    failureRollbackPathRequired: sandboxPlan.failureRollbackPathRequired,
    javaMiniKvFutureGuardsRequired: sandboxPlan.requiredEvidence.includes("Java v82 approval/schema rehearsal guard receipt.")
      && sandboxPlan.requiredEvidence.includes("mini-kv v91 non-participation receipt for sandbox adapter runtime evidence."),
    nodeQualityGatesRecorded: qualityGates.gatesAreHardAcceptanceCriteria
      && qualityGates.nodeV224ProfileExportsQualityGates
      && qualityGates.nodeRouteRegistrationRequired === "registerAuditJsonMarkdownRoute",
    javaMiniKvQualityGatesRecorded: qualityGates.javaV82BuilderOrHelperRequired
      && qualityGates.javaV82OpsEvidenceServiceBloatForbidden
      && qualityGates.miniKvV91RuntimeEvidenceHelperRequired
      && qualityGates.miniKvV91CommandCppIfChainBloatForbidden,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditSandboxAdapterDryRunPlan: false,
  };
}

function collectProductionBlockers(
  checks: SandboxAdapterDryRunPlanChecks,
): SandboxAdapterDryRunPlanMessage[] {
  const blockers: SandboxAdapterDryRunPlanMessage[] = [];
  addBlocker(blockers, checks.nodeV223ReviewReady, "NODE_V223_NOT_READY", "node-v223-external-adapter-readiness-review", "Node v223 connection readiness review must be ready before v224.");
  addBlocker(blockers, checks.nodeV223StillReadOnly, "NODE_V223_NOT_READ_ONLY", "node-v223-external-adapter-readiness-review", "Node v223 must remain read-only and disconnected.");
  addBlocker(blockers, checks.productionCredentialStillForbidden, "PRODUCTION_CREDENTIAL_ALLOWED", "managed-audit-sandbox-adapter-dry-run-plan", "v224 must keep production credential values forbidden.");
  addBlocker(blockers, checks.externalConnectionStillBlocked, "EXTERNAL_CONNECTION_UNLOCKED", "managed-audit-sandbox-adapter-dry-run-plan", "v224 must not open an external managed audit connection.");
  addBlocker(blockers, checks.managedAuditWriteStillBlocked, "MANAGED_AUDIT_WRITE_UNLOCKED", "managed-audit-sandbox-adapter-dry-run-plan", "v224 must not allow managed audit writes or mini-kv storage participation.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.nodeQualityGatesRecorded, "NODE_QUALITY_GATES_MISSING", "quality-gates", "Node v224 must export hard quality gates in its profile.");
  addBlocker(blockers, checks.javaMiniKvQualityGatesRecorded, "UPSTREAM_QUALITY_GATES_MISSING", "quality-gates", "Java v82 and mini-kv v91 quality gates must be visible for the next parallel step.");
  return blockers;
}

function collectWarnings(): SandboxAdapterDryRunPlanMessage[] {
  return [
    {
      code: "PLAN_ONLY_NO_SANDBOX_CONNECTION",
      severity: "warning",
      source: "managed-audit-sandbox-adapter-dry-run-plan",
      message: "This profile defines the sandbox dry-run plan only; it does not connect to any audit adapter.",
    },
  ];
}

function collectRecommendations(): SandboxAdapterDryRunPlanMessage[] {
  return [
    {
      code: "RUN_PARALLEL_SANDBOX_GUARDS",
      severity: "recommendation",
      source: "managed-audit-sandbox-adapter-dry-run-plan",
      message: "Run Java v82 and mini-kv v91 in parallel before Node v225 consumes their guard receipts.",
    },
    {
      code: "KEEP_QUALITY_GATES_AS_ACCEPTANCE_CRITERIA",
      severity: "recommendation",
      source: "quality-gates",
      message: "Treat Node, Java, and mini-kv quality gates as version completion criteria rather than optional notes.",
    },
  ];
}

function addBlocker(
  messages: SandboxAdapterDryRunPlanMessage[],
  condition: boolean,
  code: string,
  source: SandboxAdapterDryRunPlanMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
