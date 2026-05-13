import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createProductionConnectionConfigContractProfile } from "./productionConnectionConfigContract.js";
import { createProductionConnectionFailureModeRehearsalProfile } from "./productionConnectionFailureModeRehearsal.js";
import { loadProductionReadinessSummaryV10 } from "./productionReadinessSummaryV10.js";

export interface ProductionConnectionImplementationPrecheckProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-implementation-precheck.v1";
  readyForImplementation: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-connection-implementation-precheck";
    productionConnectionConfigContractVersion: "production-connection-config-contract.v1";
    productionConnectionFailureModeRehearsalVersion: "production-connection-failure-mode-rehearsal.v1";
    productionReadinessSummaryV10Version: "production-readiness-summary.v10";
    upstreamActionsEnabled: boolean;
  };
  checks: {
    configContractReady: boolean;
    failureModeRehearsalReady: boolean;
    readinessSummaryV10Ready: boolean;
    realConnectionAttemptAllowed: false;
    noDatabaseConnectionAttempted: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    upstreamActionsStillDisabled: boolean;
    humanAuditOwnerApprovalPresent: boolean;
    humanIdpOwnerApprovalPresent: boolean;
    rollbackOwnerApprovalPresent: boolean;
    readyForImplementation: false;
  };
  precheckItems: ProductionConnectionImplementationPrecheckItem[];
  humanConfirmations: ProductionConnectionHumanConfirmation[];
  summary: {
    precheckItemCount: number;
    passedPrecheckItemCount: number;
    missingHumanConfirmationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionConnectionImplementationMessage[];
  warnings: ProductionConnectionImplementationMessage[];
  recommendations: ProductionConnectionImplementationMessage[];
  evidenceEndpoints: {
    productionConnectionImplementationPrecheckJson: string;
    productionConnectionImplementationPrecheckMarkdown: string;
    productionConnectionConfigContractJson: string;
    productionConnectionFailureModeRehearsalJson: string;
    productionReadinessSummaryV10Json: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionImplementationPrecheckItem {
  id:
    | "config-contract-ready"
    | "failure-mode-rehearsal-ready"
    | "summary-v10-evidence-ready"
    | "upstream-actions-disabled"
    | "no-external-connection-attempts"
    | "audit-owner-approval"
    | "idp-owner-approval"
    | "rollback-owner-approval";
  status: "pass" | "missing" | "blocked";
  requiredFor: "implementation-precheck";
  source:
    | "production-connection-config-contract"
    | "production-connection-failure-mode-rehearsal"
    | "production-readiness-summary-v10"
    | "runtime-config"
    | "implementation-precheck"
    | "operator-confirmation";
  evidence: string;
  note: string;
}

export interface ProductionConnectionHumanConfirmation {
  id: "audit-owner-approval" | "idp-owner-approval" | "rollback-owner-approval";
  present: false;
  required: true;
  owner: "audit-owner" | "idp-owner" | "release-owner";
  reason: string;
}

export interface ProductionConnectionImplementationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-connection-config-contract"
    | "production-connection-failure-mode-rehearsal"
    | "production-readiness-summary-v10"
    | "implementation-precheck";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionConnectionImplementationPrecheckJson: "/api/v1/production/connection-implementation-precheck",
  productionConnectionImplementationPrecheckMarkdown: "/api/v1/production/connection-implementation-precheck?format=markdown",
  productionConnectionConfigContractJson: "/api/v1/production/connection-config-contract",
  productionConnectionFailureModeRehearsalJson: "/api/v1/production/connection-failure-mode-rehearsal",
  productionReadinessSummaryV10Json: "/api/v1/production/readiness-summary-v10",
});

export async function loadProductionConnectionImplementationPrecheck(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionConnectionImplementationPrecheckProfile> {
  const configContract = createProductionConnectionConfigContractProfile(input.config);
  const failureModeRehearsal = createProductionConnectionFailureModeRehearsalProfile(input.config);
  const summaryV10 = await loadProductionReadinessSummaryV10(input);
  const checks = {
    configContractReady: configContract.checks.auditRequiredEnvConfigured
      && configContract.checks.idpRequiredEnvConfigured
      && configContract.checks.noDatabaseConnectionAttempted
      && configContract.checks.noJwksNetworkFetch
      && configContract.checks.noExternalIdpCall,
    failureModeRehearsalReady: failureModeRehearsal.checks.configContractReady
      && failureModeRehearsal.checks.auditConnectionMissingCovered
      && failureModeRehearsal.checks.idpJwksTimeoutSimulated
      && failureModeRehearsal.checks.credentialsMissingCovered
      && failureModeRehearsal.checks.safeFallbackCovered
      && failureModeRehearsal.checks.noDatabaseConnectionAttempted
      && failureModeRehearsal.checks.noAuditWritePerformed
      && failureModeRehearsal.checks.noJwksNetworkFetch
      && failureModeRehearsal.checks.noExternalIdpCall,
    readinessSummaryV10Ready: summaryV10.checks.configContractReady
      && summaryV10.checks.failureModeRehearsalReady
      && summaryV10.checks.productionReadinessV9EvidenceConnected
      && summaryV10.checks.upstreamActionsStillDisabled,
    realConnectionAttemptAllowed: false as const,
    noDatabaseConnectionAttempted: configContract.checks.noDatabaseConnectionAttempted
      && failureModeRehearsal.checks.noDatabaseConnectionAttempted,
    noJwksNetworkFetch: configContract.checks.noJwksNetworkFetch
      && failureModeRehearsal.checks.noJwksNetworkFetch,
    noExternalIdpCall: configContract.checks.noExternalIdpCall
      && failureModeRehearsal.checks.noExternalIdpCall,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    humanAuditOwnerApprovalPresent: false,
    humanIdpOwnerApprovalPresent: false,
    rollbackOwnerApprovalPresent: false,
    readyForImplementation: false as const,
  };
  const humanConfirmations = createHumanConfirmations();
  const precheckItems = createPrecheckItems(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production connection implementation precheck",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-connection-implementation-precheck.v1",
    readyForImplementation: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-connection-implementation-precheck",
      productionConnectionConfigContractVersion: configContract.profileVersion,
      productionConnectionFailureModeRehearsalVersion: failureModeRehearsal.profileVersion,
      productionReadinessSummaryV10Version: summaryV10.summaryVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    checks,
    precheckItems,
    humanConfirmations,
    summary: {
      precheckItemCount: precheckItems.length,
      passedPrecheckItemCount: precheckItems.filter((item) => item.status === "pass").length,
      missingHumanConfirmationCount: humanConfirmations.filter((confirmation) => !confirmation.present).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Collect explicit audit owner, IdP owner, and rollback owner approval before any real connection implementation.",
      "Keep this precheck read-only until the dry-run change request is reviewed and archived.",
      "Do not enable upstream actions or attempt database/JWKS connections from this endpoint.",
    ],
  };
}

export function renderProductionConnectionImplementationPrecheckMarkdown(
  profile: ProductionConnectionImplementationPrecheckProfile,
): string {
  return [
    "# Production connection implementation precheck",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for implementation: ${profile.readyForImplementation}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Stage",
    "",
    ...renderEntries(profile.stage),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Precheck Items",
    "",
    ...profile.precheckItems.flatMap(renderPrecheckItem),
    "## Human Confirmations",
    "",
    ...profile.humanConfirmations.map(renderHumanConfirmation),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No implementation precheck blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No implementation precheck warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No implementation precheck recommendations."),
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

function createPrecheckItems(
  checks: ProductionConnectionImplementationPrecheckProfile["checks"],
): ProductionConnectionImplementationPrecheckItem[] {
  return [
    item("config-contract-ready", checks.configContractReady, "production-connection-config-contract", "v126 config contract has required managed audit and IdP env documented."),
    item("failure-mode-rehearsal-ready", checks.failureModeRehearsalReady, "production-connection-failure-mode-rehearsal", "v127 failure rehearsal blocks audit, JWKS, credential, and fallback scenarios safely."),
    item("summary-v10-evidence-ready", checks.readinessSummaryV10Ready, "production-readiness-summary-v10", "v128/v10 summary keeps readiness evidence connected while production remains blocked."),
    item("upstream-actions-disabled", checks.upstreamActionsStillDisabled, "runtime-config", "UPSTREAM_ACTIONS_ENABLED remains false for implementation planning."),
    item("no-external-connection-attempts", checks.noDatabaseConnectionAttempted && checks.noJwksNetworkFetch && checks.noExternalIdpCall, "implementation-precheck", "The precheck does not open database connections, fetch JWKS, or call an external IdP."),
    item("audit-owner-approval", checks.humanAuditOwnerApprovalPresent, "operator-confirmation", "Audit owner must approve the real managed audit adapter target and rollback rules."),
    item("idp-owner-approval", checks.humanIdpOwnerApprovalPresent, "operator-confirmation", "IdP owner must approve issuer, audience, JWKS URL, timeout, cache, and rotation policy."),
    item("rollback-owner-approval", checks.rollbackOwnerApprovalPresent, "operator-confirmation", "Release owner must approve rollback and disablement steps before implementation."),
  ];
}

function item(
  id: ProductionConnectionImplementationPrecheckItem["id"],
  passed: boolean,
  source: ProductionConnectionImplementationPrecheckItem["source"],
  note: string,
): ProductionConnectionImplementationPrecheckItem {
  return {
    id,
    status: passed ? "pass" : source === "operator-confirmation" ? "missing" : "blocked",
    requiredFor: "implementation-precheck",
    source,
    evidence: source,
    note,
  };
}

function createHumanConfirmations(): ProductionConnectionHumanConfirmation[] {
  return [
    {
      id: "audit-owner-approval",
      present: false,
      required: true,
      owner: "audit-owner",
      reason: "Real managed audit storage changes need an owner-approved adapter target and rollback rule.",
    },
    {
      id: "idp-owner-approval",
      present: false,
      required: true,
      owner: "idp-owner",
      reason: "Real IdP/JWKS verification changes need an owner-approved issuer, audience, timeout, and rotation policy.",
    },
    {
      id: "rollback-owner-approval",
      present: false,
      required: true,
      owner: "release-owner",
      reason: "Production connection implementation needs an owner-approved rollback path before any real connection attempt.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionConnectionImplementationPrecheckProfile["checks"],
): ProductionConnectionImplementationMessage[] {
  const blockers: ProductionConnectionImplementationMessage[] = [];
  addMessage(blockers, checks.configContractReady, "CONFIG_CONTRACT_NOT_READY", "production-connection-config-contract", "Production connection config contract must be ready before implementation planning.");
  addMessage(blockers, checks.failureModeRehearsalReady, "FAILURE_MODE_REHEARSAL_NOT_READY", "production-connection-failure-mode-rehearsal", "Production connection failure-mode rehearsal must pass before implementation planning.");
  addMessage(blockers, checks.readinessSummaryV10Ready, "SUMMARY_V10_NOT_READY", "production-readiness-summary-v10", "Production readiness summary v10 evidence must remain connected before implementation planning.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "implementation-precheck", "UPSTREAM_ACTIONS_ENABLED must remain false during implementation precheck.");
  addMessage(blockers, checks.humanAuditOwnerApprovalPresent, "HUMAN_AUDIT_OWNER_APPROVAL_MISSING", "implementation-precheck", "Audit owner approval is required before real managed audit adapter work.");
  addMessage(blockers, checks.humanIdpOwnerApprovalPresent, "HUMAN_IDP_OWNER_APPROVAL_MISSING", "implementation-precheck", "IdP owner approval is required before real JWKS/OIDC verifier work.");
  addMessage(blockers, checks.rollbackOwnerApprovalPresent, "ROLLBACK_OWNER_APPROVAL_MISSING", "implementation-precheck", "Rollback owner approval is required before real production connection work.");
  addMessage(blockers, checks.realConnectionAttemptAllowed, "REAL_CONNECTION_ATTEMPT_NOT_ALLOWED", "implementation-precheck", "This precheck is intentionally read-only and cannot attempt database or JWKS connections.");
  return blockers;
}

function collectWarnings(
  checks: ProductionConnectionImplementationPrecheckProfile["checks"],
): ProductionConnectionImplementationMessage[] {
  return [
    {
      code: checks.configContractReady && checks.failureModeRehearsalReady && checks.readinessSummaryV10Ready
        ? "IMPLEMENTATION_PRECHECK_EVIDENCE_READY_APPROVALS_MISSING"
        : "IMPLEMENTATION_PRECHECK_EVIDENCE_INCOMPLETE",
      severity: "warning",
      source: "implementation-precheck",
      message: "Implementation precheck separates local readiness evidence from human approval and real production connection work.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionImplementationMessage[] {
  return [
    {
      code: "PREPARE_AUDIT_OWNER_CHANGE_REVIEW",
      severity: "recommendation",
      source: "implementation-precheck",
      message: "Prepare a managed audit adapter change review with credentials, migration scope, and disablement path.",
    },
    {
      code: "PREPARE_IDP_OWNER_CHANGE_REVIEW",
      severity: "recommendation",
      source: "implementation-precheck",
      message: "Prepare an IdP/JWKS change review with timeout, cache, rotation, and role-mapping policy.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionImplementationMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionImplementationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderPrecheckItem(item: ProductionConnectionImplementationPrecheckItem): string[] {
  return [
    `### ${item.id}`,
    "",
    `- Status: ${item.status}`,
    `- Required for: ${item.requiredFor}`,
    `- Source: ${item.source}`,
    `- Evidence: ${item.evidence}`,
    `- Note: ${item.note}`,
    "",
  ];
}

function renderHumanConfirmation(confirmation: ProductionConnectionHumanConfirmation): string {
  return `- ${confirmation.id}: present=${confirmation.present}, required=${confirmation.required}, owner=${confirmation.owner}, reason=${confirmation.reason}`;
}

function renderMessages(messages: ProductionConnectionImplementationMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
