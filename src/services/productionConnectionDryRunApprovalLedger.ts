import { createHash, randomUUID } from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "./productionConnectionDryRunChangeRequest.js";

export const productionConnectionDryRunApprovalDecisions = ["approve", "reject"] as const;

export type ProductionConnectionDryRunApprovalDecision = (typeof productionConnectionDryRunApprovalDecisions)[number];

export interface CreateProductionConnectionDryRunApprovalInput {
  decision: ProductionConnectionDryRunApprovalDecision;
  reviewer: string;
  reason?: string;
  changeRequestDigest: string;
}

export interface ProductionConnectionDryRunApprovalRecord {
  service: "orderops-node";
  profileVersion: "production-connection-dry-run-approval.v1";
  approvalId: string;
  sequence: number;
  createdAt: string;
  reviewer: string;
  decision: ProductionConnectionDryRunApprovalDecision;
  reason: string;
  changeRequestDigest: string;
  changeRequestVersion: "production-connection-change-request.v1";
  dryRunOnly: true;
  executable: false;
  realConnectionAttempted: false;
  upstreamActionsEnabled: boolean;
  changeRequestArchiveReady: boolean;
  readyForApprovalArchive: boolean;
  approvalDigest: ProductionConnectionDryRunApprovalDigest;
}

export interface ProductionConnectionDryRunApprovalDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface ProductionConnectionDryRunApprovalLedgerProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-dry-run-approval-ledger.v1";
  readyForApprovalArchive: boolean;
  readOnly: true;
  executionAllowed: false;
  checks: {
    approvalRecordPresent: boolean;
    latestApprovalDigestValid: boolean;
    latestChangeRequestDigestMatches: boolean;
    latestDecisionAllowed: boolean;
    latestRealConnectionAttempted: false;
    upstreamActionsStillDisabled: boolean;
    readyForApprovalArchive: boolean;
  };
  summary: {
    approvalRecordCount: number;
    approvalDecisionCount: number;
    rejectionDecisionCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  latestApproval?: ProductionConnectionDryRunApprovalRecord;
  approvals: ProductionConnectionDryRunApprovalRecord[];
  productionBlockers: ProductionConnectionDryRunApprovalMessage[];
  warnings: ProductionConnectionDryRunApprovalMessage[];
  recommendations: ProductionConnectionDryRunApprovalMessage[];
  evidenceEndpoints: {
    productionConnectionDryRunApprovalsJson: string;
    productionConnectionDryRunApprovalsMarkdown: string;
    productionConnectionDryRunChangeRequestJson: string;
    productionConnectionImplementationPrecheckJson: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionDryRunApprovalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "dry-run-approval-ledger" | "dry-run-change-request" | "runtime-config";
  message: string;
}

interface ProductionConnectionDryRunApprovalLedgerOptions {
  maxItems?: number;
}

const APPROVAL_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "profileVersion",
  "approvalId",
  "sequence",
  "createdAt",
  "reviewer",
  "decision",
  "reason",
  "changeRequestDigest",
  "changeRequestVersion",
  "dryRunOnly",
  "executable",
  "realConnectionAttempted",
  "upstreamActionsEnabled",
  "changeRequestArchiveReady",
  "readyForApprovalArchive",
]);

const ENDPOINTS = Object.freeze({
  productionConnectionDryRunApprovalsJson: "/api/v1/production/connection-dry-run-approvals",
  productionConnectionDryRunApprovalsMarkdown: "/api/v1/production/connection-dry-run-approvals?format=markdown",
  productionConnectionDryRunChangeRequestJson: "/api/v1/production/connection-dry-run-change-request",
  productionConnectionImplementationPrecheckJson: "/api/v1/production/connection-implementation-precheck",
});

export class ProductionConnectionDryRunApprovalLedger {
  private readonly records = new Map<string, ProductionConnectionDryRunApprovalRecord>();
  private nextSequence = 1;
  private readonly maxItems: number;

  constructor(options: ProductionConnectionDryRunApprovalLedgerOptions = {}) {
    this.maxItems = options.maxItems ?? 100;
  }

  async create(input: CreateProductionConnectionDryRunApprovalInput, context: {
    config: AppConfig;
    auditLog: AuditLog;
    auditStoreRuntime: AuditStoreRuntimeDescription;
  }): Promise<ProductionConnectionDryRunApprovalRecord> {
    const changeRequest = await loadProductionConnectionDryRunChangeRequest(context);
    const expectedDigest = normalizeDigest(input.changeRequestDigest);
    const currentDigest = changeRequest.changeRequest.changeRequestDigest;
    if (expectedDigest !== currentDigest) {
      throw new AppHttpError(409, "DRY_RUN_CHANGE_REQUEST_DIGEST_MISMATCH", "Dry-run approval must reference the current change request digest", {
        expected: expectedDigest,
        current: currentDigest,
      });
    }

    const recordWithoutDigest = {
      service: "orderops-node" as const,
      profileVersion: "production-connection-dry-run-approval.v1" as const,
      approvalId: randomUUID(),
      sequence: this.nextSequence,
      createdAt: new Date().toISOString(),
      reviewer: normalizeReviewer(input.reviewer),
      decision: input.decision,
      reason: normalizeReason(input.reason),
      changeRequestDigest: currentDigest,
      changeRequestVersion: changeRequest.changeRequest.version,
      dryRunOnly: true as const,
      executable: false as const,
      realConnectionAttempted: false as const,
      upstreamActionsEnabled: context.config.upstreamActionsEnabled,
      changeRequestArchiveReady: changeRequest.readyForDryRunArchive,
      readyForApprovalArchive: changeRequest.readyForDryRunArchive
        && context.config.upstreamActionsEnabled === false
        && changeRequest.changeRequest.executable === false,
    };
    const record: ProductionConnectionDryRunApprovalRecord = {
      ...recordWithoutDigest,
      approvalDigest: digestProductionConnectionDryRunApproval(recordWithoutDigest),
    };

    this.records.set(record.approvalId, record);
    this.nextSequence += 1;
    this.trim();
    return cloneRecord(record);
  }

  list(limit = 20): ProductionConnectionDryRunApprovalRecord[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.records.values()]
      .sort((left, right) => right.sequence - left.sequence)
      .slice(0, safeLimit)
      .map(cloneRecord);
  }

  get(approvalId: string): ProductionConnectionDryRunApprovalRecord {
    const record = this.records.get(approvalId);
    if (record === undefined) {
      throw new AppHttpError(404, "DRY_RUN_APPROVAL_NOT_FOUND", "Production connection dry-run approval was not found", {
        approvalId,
      });
    }

    return cloneRecord(record);
  }

  latest(): ProductionConnectionDryRunApprovalRecord | undefined {
    return this.list(1)[0];
  }

  snapshot(config: Pick<AppConfig, "upstreamActionsEnabled">, limit = 20): ProductionConnectionDryRunApprovalLedgerProfile {
    const approvals = this.list(limit);
    const latestApproval = approvals[0];
    const latestApprovalDigestValid = latestApproval === undefined
      ? false
      : latestApproval.approvalDigest.value === recomputeApprovalDigest(latestApproval);
    const checks = {
      approvalRecordPresent: latestApproval !== undefined,
      latestApprovalDigestValid,
      latestChangeRequestDigestMatches: latestApproval !== undefined && latestApproval.changeRequestDigest.length === 64,
      latestDecisionAllowed: latestApproval !== undefined && productionConnectionDryRunApprovalDecisions.includes(latestApproval.decision),
      latestRealConnectionAttempted: false as const,
      upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
      readyForApprovalArchive: latestApproval !== undefined
        && latestApproval.readyForApprovalArchive
        && latestApprovalDigestValid
        && config.upstreamActionsEnabled === false,
    };
    const productionBlockers = collectProductionBlockers(checks);
    const warnings = collectWarnings(checks);
    const recommendations = collectRecommendations();

    return {
      service: "orderops-node",
      title: "Production connection dry-run approval ledger",
      generatedAt: new Date().toISOString(),
      profileVersion: "production-connection-dry-run-approval-ledger.v1",
      readyForApprovalArchive: checks.readyForApprovalArchive,
      readOnly: true,
      executionAllowed: false,
      checks,
      summary: {
        approvalRecordCount: approvals.length,
        approvalDecisionCount: approvals.filter((approval) => approval.decision === "approve").length,
        rejectionDecisionCount: approvals.filter((approval) => approval.decision === "reject").length,
        productionBlockerCount: productionBlockers.length,
        warningCount: warnings.length,
        recommendationCount: recommendations.length,
      },
      latestApproval,
      approvals,
      productionBlockers,
      warnings,
      recommendations,
      evidenceEndpoints: { ...ENDPOINTS },
      nextActions: [
        "Archive the latest approval record with the matching dry-run change request digest.",
        "Keep approval records local and non-executable until real credentials and rollback policies exist.",
        "Use archive verification before promoting any dry-run approval into real implementation work.",
      ],
    };
  }

  private trim(): void {
    if (this.records.size <= this.maxItems) {
      return;
    }

    const oldest = [...this.records.values()].sort((left, right) => left.sequence - right.sequence);
    for (const record of oldest.slice(0, this.records.size - this.maxItems)) {
      this.records.delete(record.approvalId);
    }
  }
}

export function digestProductionConnectionDryRunApproval(
  record: Omit<ProductionConnectionDryRunApprovalRecord, "approvalDigest">,
): ProductionConnectionDryRunApprovalDigest {
  return {
    algorithm: "sha256",
    value: createHash("sha256")
      .update(stableJson({
        service: record.service,
        profileVersion: record.profileVersion,
        approvalId: record.approvalId,
        sequence: record.sequence,
        createdAt: record.createdAt,
        reviewer: record.reviewer,
        decision: record.decision,
        reason: record.reason,
        changeRequestDigest: record.changeRequestDigest,
        changeRequestVersion: record.changeRequestVersion,
        dryRunOnly: record.dryRunOnly,
        executable: record.executable,
        realConnectionAttempted: record.realConnectionAttempted,
        upstreamActionsEnabled: record.upstreamActionsEnabled,
        changeRequestArchiveReady: record.changeRequestArchiveReady,
        readyForApprovalArchive: record.readyForApprovalArchive,
      }))
      .digest("hex"),
    coveredFields: [...APPROVAL_DIGEST_COVERED_FIELDS],
  };
}

export function renderProductionConnectionDryRunApprovalMarkdown(
  approval: ProductionConnectionDryRunApprovalRecord,
): string {
  return [
    "# Production connection dry-run approval",
    "",
    `- Service: ${approval.service}`,
    `- Approval id: ${approval.approvalId}`,
    `- Sequence: ${approval.sequence}`,
    `- Created at: ${approval.createdAt}`,
    `- Reviewer: ${approval.reviewer}`,
    `- Decision: ${approval.decision}`,
    `- Reason: ${approval.reason}`,
    `- Change request digest: ${approval.changeRequestDigest}`,
    `- Dry run only: ${approval.dryRunOnly}`,
    `- Executable: ${approval.executable}`,
    `- Real connection attempted: ${approval.realConnectionAttempted}`,
    `- Ready for approval archive: ${approval.readyForApprovalArchive}`,
    "",
    "## Approval Digest",
    "",
    `- Algorithm: ${approval.approvalDigest.algorithm}`,
    `- Value: ${approval.approvalDigest.value}`,
    `- Covered fields: ${approval.approvalDigest.coveredFields.join(", ")}`,
    "",
  ].join("\n");
}

export function renderProductionConnectionDryRunApprovalLedgerMarkdown(
  profile: ProductionConnectionDryRunApprovalLedgerProfile,
): string {
  return [
    "# Production connection dry-run approval ledger",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for approval archive: ${profile.readyForApprovalArchive}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Latest Approval",
    "",
    ...renderLatestApproval(profile.latestApproval),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No dry-run approval blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No dry-run approval warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No dry-run approval recommendations."),
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

function collectProductionBlockers(
  checks: ProductionConnectionDryRunApprovalLedgerProfile["checks"],
): ProductionConnectionDryRunApprovalMessage[] {
  const blockers: ProductionConnectionDryRunApprovalMessage[] = [];
  addMessage(blockers, checks.approvalRecordPresent, "APPROVAL_RECORD_MISSING", "dry-run-approval-ledger", "A dry-run approval or rejection record is required before archive verification.");
  addMessage(blockers, checks.latestApprovalDigestValid, "LATEST_APPROVAL_DIGEST_INVALID", "dry-run-approval-ledger", "Latest approval digest must verify before archive verification.");
  addMessage(blockers, checks.latestChangeRequestDigestMatches, "CHANGE_REQUEST_DIGEST_MISSING", "dry-run-change-request", "Latest approval must carry a dry-run change request digest.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false while approval records are local dry-run evidence.");
  return blockers;
}

function collectWarnings(
  checks: ProductionConnectionDryRunApprovalLedgerProfile["checks"],
): ProductionConnectionDryRunApprovalMessage[] {
  return [
    {
      code: checks.readyForApprovalArchive
        ? "DRY_RUN_APPROVAL_ARCHIVE_READY"
        : "DRY_RUN_APPROVAL_ARCHIVE_BLOCKED",
      severity: "warning",
      source: "dry-run-approval-ledger",
      message: "Dry-run approval records can be archived, but they never execute production connections.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionDryRunApprovalMessage[] {
  return [
    {
      code: "VERIFY_APPROVAL_WITH_ARCHIVE_BUNDLE",
      severity: "recommendation",
      source: "dry-run-approval-ledger",
      message: "Verify the approval digest together with precheck and change request evidence before real implementation work.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionDryRunApprovalMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionDryRunApprovalMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function normalizeReviewer(reviewer: string): string {
  const normalized = reviewer.trim();
  if (normalized.length === 0 || normalized.length > 80) {
    throw new AppHttpError(400, "INVALID_DRY_RUN_APPROVAL_REVIEWER", "reviewer must be 1-80 characters");
  }

  return normalized;
}

function normalizeReason(reason: string | undefined): string {
  const normalized = reason?.trim();
  return normalized && normalized.length > 0 ? normalized.slice(0, 400) : "local dry-run approval review";
}

function normalizeDigest(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(normalized)) {
    throw new AppHttpError(400, "INVALID_DRY_RUN_CHANGE_REQUEST_DIGEST", "changeRequestDigest must be a 64 character sha256 hex digest");
  }

  return normalized;
}

function renderLatestApproval(approval: ProductionConnectionDryRunApprovalRecord | undefined): string[] {
  if (approval === undefined) {
    return ["- No dry-run approval records yet."];
  }

  return [
    `- Approval id: ${approval.approvalId}`,
    `- Sequence: ${approval.sequence}`,
    `- Reviewer: ${approval.reviewer}`,
    `- Decision: ${approval.decision}`,
    `- Change request digest: ${approval.changeRequestDigest}`,
    `- Approval digest: ${approval.approvalDigest.algorithm}:${approval.approvalDigest.value}`,
    `- Real connection attempted: ${approval.realConnectionAttempted}`,
  ];
}

function renderMessages(messages: ProductionConnectionDryRunApprovalMessage[], emptyText: string): string[] {
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

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function cloneRecord(record: ProductionConnectionDryRunApprovalRecord): ProductionConnectionDryRunApprovalRecord {
  return structuredClone(record);
}

function recomputeApprovalDigest(record: ProductionConnectionDryRunApprovalRecord): string {
  const { approvalDigest: _approvalDigest, ...recordWithoutDigest } = record;
  return digestProductionConnectionDryRunApproval(recordWithoutDigest).value;
}
