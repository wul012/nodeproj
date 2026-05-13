import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  digestProductionConnectionDryRunApproval,
  ProductionConnectionDryRunApprovalLedger,
} from "./productionConnectionDryRunApprovalLedger.js";
import type { ProductionConnectionDryRunApprovalRecord } from "./productionConnectionDryRunApprovalLedger.js";
import { loadProductionConnectionDryRunChangeRequest } from "./productionConnectionDryRunChangeRequest.js";
import { loadProductionConnectionImplementationPrecheck } from "./productionConnectionImplementationPrecheck.js";

export interface ProductionConnectionArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-archive-verification.v1";
  readyForArchiveVerification: boolean;
  readyForProductionConnections: false;
  readOnly: true;
  executionAllowed: false;
  archive: {
    archiveDigest: string;
    precheckVersion: string;
    changeRequestDigest: string;
    approvalDigest?: string;
    approvalDecision?: string;
    approvalSequence?: number;
  };
  checks: {
    precheckVersionValid: boolean;
    changeRequestDigestValid: boolean;
    approvalRecordPresent: boolean;
    approvalDigestValid: boolean;
    approvalDigestMatchesChangeRequest: boolean;
    approvalReadyForArchive: boolean;
    noDatabaseConnectionAttempted: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    noRealConnectionAttempted: boolean;
    dryRunOnly: boolean;
    changeRequestNonExecutable: boolean;
    upstreamActionsStillDisabled: boolean;
    readyForArchiveVerification: boolean;
  };
  artifacts: {
    implementationPrecheck: {
      profileVersion: string;
      readyForImplementation: false;
    };
    dryRunChangeRequest: {
      profileVersion: string;
      digest: string;
      dryRun: true;
      executable: false;
      archiveReady: boolean;
    };
    latestApproval?: {
      profileVersion: string;
      approvalId: string;
      sequence: number;
      decision: string;
      reviewer: string;
      approvalDigest: string;
      changeRequestDigest: string;
      realConnectionAttempted: false;
    };
  };
  summary: {
    artifactCount: number;
    verifiedArtifactCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionConnectionArchiveVerificationMessage[];
  warnings: ProductionConnectionArchiveVerificationMessage[];
  recommendations: ProductionConnectionArchiveVerificationMessage[];
  evidenceEndpoints: {
    productionConnectionArchiveVerificationJson: string;
    productionConnectionArchiveVerificationMarkdown: string;
    productionConnectionImplementationPrecheckJson: string;
    productionConnectionDryRunChangeRequestJson: string;
    productionConnectionDryRunApprovalsJson: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "implementation-precheck"
    | "dry-run-change-request"
    | "dry-run-approval-ledger"
    | "archive-verification"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionConnectionArchiveVerificationJson: "/api/v1/production/connection-archive-verification",
  productionConnectionArchiveVerificationMarkdown: "/api/v1/production/connection-archive-verification?format=markdown",
  productionConnectionImplementationPrecheckJson: "/api/v1/production/connection-implementation-precheck",
  productionConnectionDryRunChangeRequestJson: "/api/v1/production/connection-dry-run-change-request",
  productionConnectionDryRunApprovalsJson: "/api/v1/production/connection-dry-run-approvals",
});

export async function loadProductionConnectionArchiveVerification(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}): Promise<ProductionConnectionArchiveVerificationProfile> {
  const precheck = await loadProductionConnectionImplementationPrecheck(input);
  const changeRequest = await loadProductionConnectionDryRunChangeRequest(input);
  const latestApproval = input.productionConnectionDryRunApprovals.latest();
  const approvalDigestValid = latestApproval === undefined
    ? false
    : latestApproval.approvalDigest.value === recomputeApprovalDigest(latestApproval);
  const checks = {
    precheckVersionValid: precheck.profileVersion === "production-connection-implementation-precheck.v1",
    changeRequestDigestValid: /^[a-f0-9]{64}$/.test(changeRequest.changeRequest.changeRequestDigest),
    approvalRecordPresent: latestApproval !== undefined,
    approvalDigestValid,
    approvalDigestMatchesChangeRequest: latestApproval !== undefined
      && latestApproval.changeRequestDigest === changeRequest.changeRequest.changeRequestDigest,
    approvalReadyForArchive: latestApproval?.readyForApprovalArchive === true,
    noDatabaseConnectionAttempted: precheck.checks.noDatabaseConnectionAttempted,
    noJwksNetworkFetch: precheck.checks.noJwksNetworkFetch,
    noExternalIdpCall: precheck.checks.noExternalIdpCall,
    noRealConnectionAttempted: precheck.checks.realConnectionAttemptAllowed === false
      && changeRequest.checks.realConnectionAttempted === false
      && (latestApproval?.realConnectionAttempted ?? false) === false,
    dryRunOnly: changeRequest.changeRequest.dryRun === true
      && (latestApproval?.dryRunOnly ?? false) === true,
    changeRequestNonExecutable: changeRequest.changeRequest.executable === false
      && (latestApproval?.executable ?? true) === false,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForArchiveVerification: false,
  };
  checks.readyForArchiveVerification = checks.precheckVersionValid
    && checks.changeRequestDigestValid
    && checks.approvalRecordPresent
    && checks.approvalDigestValid
    && checks.approvalDigestMatchesChangeRequest
    && checks.approvalReadyForArchive
    && checks.noDatabaseConnectionAttempted
    && checks.noJwksNetworkFetch
    && checks.noExternalIdpCall
    && checks.noRealConnectionAttempted
    && checks.dryRunOnly
    && checks.changeRequestNonExecutable
    && checks.upstreamActionsStillDisabled;
  const archiveDigest = digestArchive({
    profileVersion: "production-connection-archive-verification.v1",
    precheckVersion: precheck.profileVersion,
    changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
    approvalDigest: latestApproval?.approvalDigest.value ?? "missing",
    approvalDecision: latestApproval?.decision ?? "missing",
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks);
  const recommendations = collectRecommendations();
  const verifiedArtifactCount = [
    checks.precheckVersionValid,
    checks.changeRequestDigestValid,
    checks.approvalRecordPresent && checks.approvalDigestValid && checks.approvalDigestMatchesChangeRequest,
  ].filter(Boolean).length;

  return {
    service: "orderops-node",
    title: "Production connection change request archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-connection-archive-verification.v1",
    readyForArchiveVerification: checks.readyForArchiveVerification,
    readyForProductionConnections: false,
    readOnly: true,
    executionAllowed: false,
    archive: {
      archiveDigest,
      precheckVersion: precheck.profileVersion,
      changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
      approvalDigest: latestApproval?.approvalDigest.value,
      approvalDecision: latestApproval?.decision,
      approvalSequence: latestApproval?.sequence,
    },
    checks,
    artifacts: {
      implementationPrecheck: {
        profileVersion: precheck.profileVersion,
        readyForImplementation: precheck.readyForImplementation,
      },
      dryRunChangeRequest: {
        profileVersion: changeRequest.profileVersion,
        digest: changeRequest.changeRequest.changeRequestDigest,
        dryRun: changeRequest.changeRequest.dryRun,
        executable: changeRequest.changeRequest.executable,
        archiveReady: changeRequest.readyForDryRunArchive,
      },
      latestApproval: latestApproval === undefined ? undefined : {
        profileVersion: latestApproval.profileVersion,
        approvalId: latestApproval.approvalId,
        sequence: latestApproval.sequence,
        decision: latestApproval.decision,
        reviewer: latestApproval.reviewer,
        approvalDigest: latestApproval.approvalDigest.value,
        changeRequestDigest: latestApproval.changeRequestDigest,
        realConnectionAttempted: latestApproval.realConnectionAttempted,
      },
    },
    summary: {
      artifactCount: 3,
      verifiedArtifactCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this archive verification read-only and pair it with v12 readiness before real implementation work.",
      "Do not treat archive verification as production connection readiness; it only verifies dry-run evidence integrity.",
      "Move to real live probes only after owner approval, managed audit credentials, and IdP/JWKS access are explicitly available.",
    ],
  };
}

export function renderProductionConnectionArchiveVerificationMarkdown(
  profile: ProductionConnectionArchiveVerificationProfile,
): string {
  return [
    "# Production connection archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for archive verification: ${profile.readyForArchiveVerification}`,
    `- Ready for production connections: ${profile.readyForProductionConnections}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Archive",
    "",
    ...renderEntries(profile.archive),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    ...renderEntries(profile.artifacts.implementationPrecheck),
    "",
    ...renderEntries(profile.artifacts.dryRunChangeRequest),
    "",
    ...renderLatestApproval(profile.artifacts.latestApproval),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No archive verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No archive verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No archive verification recommendations."),
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
  checks: ProductionConnectionArchiveVerificationProfile["checks"],
): ProductionConnectionArchiveVerificationMessage[] {
  const blockers: ProductionConnectionArchiveVerificationMessage[] = [];
  addMessage(blockers, checks.precheckVersionValid, "PRECHECK_VERSION_INVALID", "implementation-precheck", "Implementation precheck profileVersion must match v129.");
  addMessage(blockers, checks.changeRequestDigestValid, "CHANGE_REQUEST_DIGEST_INVALID", "dry-run-change-request", "Dry-run change request digest must be a valid sha256 hex digest.");
  addMessage(blockers, checks.approvalRecordPresent, "APPROVAL_RECORD_MISSING", "dry-run-approval-ledger", "A dry-run approval record is required before archive verification can pass.");
  addMessage(blockers, checks.approvalDigestValid, "APPROVAL_DIGEST_INVALID", "dry-run-approval-ledger", "Latest approval digest must verify against the stored approval record.");
  addMessage(blockers, checks.approvalDigestMatchesChangeRequest, "APPROVAL_CHANGE_REQUEST_DIGEST_MISMATCH", "dry-run-approval-ledger", "Latest approval must reference the current dry-run change request digest.");
  addMessage(blockers, checks.noDatabaseConnectionAttempted && checks.noJwksNetworkFetch && checks.noExternalIdpCall && checks.noRealConnectionAttempted, "REAL_CONNECTION_ATTEMPTED", "archive-verification", "Archive verification must prove no database, JWKS, IdP, or real connection attempt was made.");
  addMessage(blockers, checks.dryRunOnly, "DRY_RUN_ONLY_VIOLATED", "dry-run-change-request", "Archive verification requires all artifacts to remain dry-run only.");
  addMessage(blockers, checks.changeRequestNonExecutable, "CHANGE_REQUEST_EXECUTABLE", "dry-run-change-request", "Dry-run change request must remain non-executable.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false while archive verification is dry-run.");
  return blockers;
}

function collectWarnings(
  checks: ProductionConnectionArchiveVerificationProfile["checks"],
): ProductionConnectionArchiveVerificationMessage[] {
  return [
    {
      code: checks.readyForArchiveVerification
        ? "ARCHIVE_VERIFICATION_READY_CONNECTIONS_MISSING"
        : "ARCHIVE_VERIFICATION_INCOMPLETE",
      severity: "warning",
      source: "archive-verification",
      message: "Archive verification can pass for dry-run evidence while real production connections remain missing.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionArchiveVerificationMessage[] {
  return [
    {
      code: "CONNECT_ARCHIVE_VERIFICATION_TO_SUMMARY_V12",
      severity: "recommendation",
      source: "archive-verification",
      message: "Use this verification profile as an input to production readiness summary v12.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function recomputeApprovalDigest(approval: ProductionConnectionDryRunApprovalRecord): string {
  const { approvalDigest: _approvalDigest, ...approvalWithoutDigest } = approval;
  return digestProductionConnectionDryRunApproval(approvalWithoutDigest).value;
}

function digestArchive(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

function renderLatestApproval(approval: ProductionConnectionArchiveVerificationProfile["artifacts"]["latestApproval"]): string[] {
  if (approval === undefined) {
    return ["- Latest approval: missing"];
  }

  return [
    `- Latest approval id: ${approval.approvalId}`,
    `- Latest approval sequence: ${approval.sequence}`,
    `- Latest approval decision: ${approval.decision}`,
    `- Latest approval reviewer: ${approval.reviewer}`,
    `- Latest approval digest: ${approval.approvalDigest}`,
    `- Latest approval change request digest: ${approval.changeRequestDigest}`,
    `- Latest approval real connection attempted: ${approval.realConnectionAttempted}`,
  ];
}

function renderMessages(messages: ProductionConnectionArchiveVerificationMessage[], emptyText: string): string[] {
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
    return "missing";
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
