import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { loadProductionConnectionImplementationPrecheck } from "./productionConnectionImplementationPrecheck.js";

export interface ProductionConnectionDryRunChangeRequestProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-dry-run-change-request.v1";
  readyForDryRunArchive: boolean;
  readyForProductionConnections: false;
  readOnly: true;
  executionAllowed: false;
  changeRequest: {
    id: "production-connection-dry-run-change-request";
    version: "production-connection-change-request.v1";
    dryRun: true;
    executable: false;
    archiveReady: boolean;
    implementationPrecheckVersion: "production-connection-implementation-precheck.v1";
    upstreamActionsEnabled: boolean;
    changeRequestDigest: string;
  };
  checks: {
    implementationPrecheckLoaded: boolean;
    implementationPrecheckEvidenceReady: boolean;
    auditAdapterConnectionItemPresent: boolean;
    idpJwksConnectionItemPresent: boolean;
    rollbackItemPresent: boolean;
    ownerApprovalItemPresent: boolean;
    dryRunOnly: true;
    changeRequestExecutable: false;
    archiveReady: boolean;
    realConnectionAttempted: false;
    upstreamActionsStillDisabled: boolean;
    readyForProductionConnections: false;
  };
  changeItems: ProductionConnectionDryRunChangeItem[];
  summary: {
    changeItemCount: number;
    executableItemCount: number;
    approvalRequiredCount: number;
    rollbackRequiredCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionConnectionDryRunChangeMessage[];
  warnings: ProductionConnectionDryRunChangeMessage[];
  recommendations: ProductionConnectionDryRunChangeMessage[];
  evidenceEndpoints: {
    productionConnectionDryRunChangeRequestJson: string;
    productionConnectionDryRunChangeRequestMarkdown: string;
    productionConnectionImplementationPrecheckJson: string;
    productionConnectionImplementationPrecheckMarkdown: string;
    productionReadinessSummaryV10Json: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionDryRunChangeItem {
  id:
    | "managed-audit-adapter-connection"
    | "idp-jwks-connection"
    | "rollback-disablement"
    | "owner-approval";
  action:
    | "prepare-managed-audit-adapter-target"
    | "prepare-idp-jwks-verifier-target"
    | "prepare-disablement-and-rollback"
    | "collect-owner-approvals";
  status: "review-required";
  dryRunOnly: true;
  executable: false;
  approvalRequired: boolean;
  rollbackRequired: boolean;
  risk: "high" | "medium";
  evidence: string;
  operatorNote: string;
}

export interface ProductionConnectionDryRunChangeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "dry-run-change-request" | "implementation-precheck" | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionConnectionDryRunChangeRequestJson: "/api/v1/production/connection-dry-run-change-request",
  productionConnectionDryRunChangeRequestMarkdown: "/api/v1/production/connection-dry-run-change-request?format=markdown",
  productionConnectionImplementationPrecheckJson: "/api/v1/production/connection-implementation-precheck",
  productionConnectionImplementationPrecheckMarkdown: "/api/v1/production/connection-implementation-precheck?format=markdown",
  productionReadinessSummaryV10Json: "/api/v1/production/readiness-summary-v10",
});

export async function loadProductionConnectionDryRunChangeRequest(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionConnectionDryRunChangeRequestProfile> {
  const precheck = await loadProductionConnectionImplementationPrecheck(input);
  const changeItems = createChangeItems();
  const checks = {
    implementationPrecheckLoaded: precheck.profileVersion === "production-connection-implementation-precheck.v1",
    implementationPrecheckEvidenceReady: precheck.checks.configContractReady
      && precheck.checks.failureModeRehearsalReady
      && precheck.checks.readinessSummaryV10Ready
      && precheck.checks.noDatabaseConnectionAttempted
      && precheck.checks.noJwksNetworkFetch
      && precheck.checks.noExternalIdpCall
      && precheck.checks.upstreamActionsStillDisabled,
    auditAdapterConnectionItemPresent: changeItems.some((item) => item.id === "managed-audit-adapter-connection"),
    idpJwksConnectionItemPresent: changeItems.some((item) => item.id === "idp-jwks-connection"),
    rollbackItemPresent: changeItems.some((item) => item.id === "rollback-disablement"),
    ownerApprovalItemPresent: changeItems.some((item) => item.id === "owner-approval"),
    dryRunOnly: true as const,
    changeRequestExecutable: false as const,
    archiveReady: false,
    realConnectionAttempted: false as const,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionConnections: false as const,
  };
  checks.archiveReady = checks.implementationPrecheckLoaded
    && checks.implementationPrecheckEvidenceReady
    && checks.auditAdapterConnectionItemPresent
    && checks.idpJwksConnectionItemPresent
    && checks.rollbackItemPresent
    && checks.ownerApprovalItemPresent
    && checks.dryRunOnly
    && checks.realConnectionAttempted === false
    && checks.upstreamActionsStillDisabled;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks);
  const recommendations = collectRecommendations();
  const changeRequestDigest = digestChangeRequest({
    profileVersion: "production-connection-dry-run-change-request.v1",
    implementationPrecheckVersion: precheck.profileVersion,
    archiveReady: checks.archiveReady,
    upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    changeItems,
  });

  return {
    service: "orderops-node",
    title: "Production connection dry-run change request",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-connection-dry-run-change-request.v1",
    readyForDryRunArchive: checks.archiveReady,
    readyForProductionConnections: false,
    readOnly: true,
    executionAllowed: false,
    changeRequest: {
      id: "production-connection-dry-run-change-request",
      version: "production-connection-change-request.v1",
      dryRun: true,
      executable: false,
      archiveReady: checks.archiveReady,
      implementationPrecheckVersion: precheck.profileVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      changeRequestDigest,
    },
    checks,
    changeItems,
    summary: {
      changeItemCount: changeItems.length,
      executableItemCount: changeItems.filter((item) => item.executable).length,
      approvalRequiredCount: changeItems.filter((item) => item.approvalRequired).length,
      rollbackRequiredCount: changeItems.filter((item) => item.rollbackRequired).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Review and archive this dry-run change request before any real production connection code is written.",
      "Collect owner approvals outside this endpoint; this profile only records the required approval surface.",
      "Keep the change request non-executable until real credentials, rollout, and rollback rules are available.",
    ],
  };
}

export function renderProductionConnectionDryRunChangeRequestMarkdown(
  profile: ProductionConnectionDryRunChangeRequestProfile,
): string {
  return [
    "# Production connection dry-run change request",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for dry-run archive: ${profile.readyForDryRunArchive}`,
    `- Ready for production connections: ${profile.readyForProductionConnections}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Change Request",
    "",
    ...renderEntries(profile.changeRequest),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Change Items",
    "",
    ...profile.changeItems.flatMap(renderChangeItem),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No dry-run change blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No dry-run change warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No dry-run change recommendations."),
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

function createChangeItems(): ProductionConnectionDryRunChangeItem[] {
  return [
    {
      id: "managed-audit-adapter-connection",
      action: "prepare-managed-audit-adapter-target",
      status: "review-required",
      dryRunOnly: true,
      executable: false,
      approvalRequired: true,
      rollbackRequired: true,
      risk: "high",
      evidence: "production-connection-implementation-precheck",
      operatorNote: "Prepare real managed audit adapter wiring only after credentials and migration rules are approved.",
    },
    {
      id: "idp-jwks-connection",
      action: "prepare-idp-jwks-verifier-target",
      status: "review-required",
      dryRunOnly: true,
      executable: false,
      approvalRequired: true,
      rollbackRequired: true,
      risk: "high",
      evidence: "production-connection-implementation-precheck",
      operatorNote: "Prepare real JWKS verifier wiring only after issuer, audience, timeout, cache, and rotation policy are approved.",
    },
    {
      id: "rollback-disablement",
      action: "prepare-disablement-and-rollback",
      status: "review-required",
      dryRunOnly: true,
      executable: false,
      approvalRequired: true,
      rollbackRequired: true,
      risk: "medium",
      evidence: "production-readiness-summary-v10",
      operatorNote: "Document how to disable new production connections and return to local-only evidence mode.",
    },
    {
      id: "owner-approval",
      action: "collect-owner-approvals",
      status: "review-required",
      dryRunOnly: true,
      executable: false,
      approvalRequired: true,
      rollbackRequired: false,
      risk: "medium",
      evidence: "production-connection-implementation-precheck",
      operatorNote: "Collect audit, IdP, and release owner approval outside this dry-run endpoint.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionConnectionDryRunChangeRequestProfile["checks"],
): ProductionConnectionDryRunChangeMessage[] {
  const blockers: ProductionConnectionDryRunChangeMessage[] = [];
  addMessage(blockers, checks.implementationPrecheckLoaded, "IMPLEMENTATION_PRECHECK_NOT_LOADED", "implementation-precheck", "Implementation precheck must load before creating the dry-run change request.");
  addMessage(blockers, checks.implementationPrecheckEvidenceReady, "IMPLEMENTATION_PRECHECK_EVIDENCE_NOT_READY", "implementation-precheck", "Implementation precheck evidence must be ready before dry-run change review.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false for dry-run change requests.");
  addMessage(blockers, false, "OWNER_APPROVALS_PENDING", "dry-run-change-request", "Audit, IdP, and release owner approvals remain pending outside this read-only profile.");
  addMessage(blockers, checks.changeRequestExecutable, "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE", "dry-run-change-request", "This change request is intentionally non-executable and cannot perform real production connection work.");
  return blockers;
}

function collectWarnings(
  checks: ProductionConnectionDryRunChangeRequestProfile["checks"],
): ProductionConnectionDryRunChangeMessage[] {
  return [
    {
      code: checks.archiveReady
        ? "DRY_RUN_CHANGE_REQUEST_ARCHIVABLE"
        : "DRY_RUN_CHANGE_REQUEST_ARCHIVE_NOT_READY",
      severity: "warning",
      source: "dry-run-change-request",
      message: "Dry-run change request can be reviewed and archived, but it must not execute real audit or IdP connections.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionDryRunChangeMessage[] {
  return [
    {
      code: "ARCHIVE_DRY_RUN_CHANGE_REQUEST",
      severity: "recommendation",
      source: "dry-run-change-request",
      message: "Archive this dry-run change request before creating any real connection implementation task.",
    },
    {
      code: "SPLIT_REAL_CONNECTION_IMPLEMENTATION",
      severity: "recommendation",
      source: "dry-run-change-request",
      message: "Keep managed audit adapter, IdP/JWKS verifier, rollback, and approval work as separate reviewed changes.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionDryRunChangeMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionDryRunChangeMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestChangeRequest(value: unknown): string {
  return createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex");
}

function renderChangeItem(item: ProductionConnectionDryRunChangeItem): string[] {
  return [
    `### ${item.id}`,
    "",
    `- Action: ${item.action}`,
    `- Status: ${item.status}`,
    `- Dry run only: ${item.dryRunOnly}`,
    `- Executable: ${item.executable}`,
    `- Approval required: ${item.approvalRequired}`,
    `- Rollback required: ${item.rollbackRequired}`,
    `- Risk: ${item.risk}`,
    `- Evidence: ${item.evidence}`,
    `- Operator note: ${item.operatorNote}`,
    "",
  ];
}

function renderMessages(messages: ProductionConnectionDryRunChangeMessage[], emptyText: string): string[] {
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
