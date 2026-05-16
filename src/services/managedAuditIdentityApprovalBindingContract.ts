import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditOperatorIdentityContext } from "./auditLog.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
  type ManagedAuditPersistenceDryRunVerificationProfile,
} from "./managedAuditPersistenceDryRunVerification.js";
import type { OperationApprovalDecisionValue } from "./operationApprovalDecision.js";
import type { OperationApprovalRequestStatus } from "./operationApprovalRequest.js";

export interface ManagedAuditIdentityApprovalBindingContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-identity-approval-binding-contract.v1";
  contractState: "ready-for-identity-approval-dry-run-packet" | "blocked";
  readyForManagedAuditIdentityApprovalBindingContract: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceDryRunVerification: {
    profileVersion: ManagedAuditPersistenceDryRunVerificationProfile["profileVersion"];
    verificationState: ManagedAuditPersistenceDryRunVerificationProfile["verificationState"];
    verificationDigest: string;
    sourceCandidateDigest: string;
    dryRunRecordVersion: ManagedAuditPersistenceDryRunVerificationProfile["dryRunRecord"]["recordVersion"];
    sourceDryRunRecordId: string;
  };
  contract: {
    contractDigest: string;
    targetRecordVersion: "managed-audit-dry-run-record.v2-candidate";
    sourceRecordVersion: ManagedAuditPersistenceDryRunVerificationProfile["dryRunRecord"]["recordVersion"];
    schemaOnly: true;
    realApprovalDecisionCreated: false;
    realApprovalLedgerWritten: false;
    externalAuditSystemAccessed: false;
    javaWriteAttempted: false;
    miniKvWriteAttempted: false;
    productionAuditRecordAllowed: false;
  };
  bindingShape: ManagedAuditIdentityApprovalBindingShape;
  requiredBindings: BindingRequirement[];
  missingFieldRules: MissingFieldRule[];
  checks: {
    sourceDryRunVerified: boolean;
    sourceDryRunStillBlocksProduction: boolean;
    contractDigestValid: boolean;
    operatorIdentityFieldsBound: boolean;
    approvalRequestFieldsBound: boolean;
    approvalDecisionFieldsBound: boolean;
    correlationFieldsBound: boolean;
    missingFieldRulesDefined: boolean;
    noRealApprovalDecisionCreated: boolean;
    noRealLedgerWritten: boolean;
    noExternalAuditAccessed: boolean;
    javaMiniKvWriteBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionAuditStillBlocked: boolean;
    readyForManagedAuditIdentityApprovalBindingContract: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredBindingCount: number;
    missingFieldRuleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: BindingMessage[];
  warnings: BindingMessage[];
  recommendations: BindingMessage[];
  evidenceEndpoints: {
    managedAuditIdentityApprovalBindingContractJson: string;
    managedAuditIdentityApprovalBindingContractMarkdown: string;
    sourceManagedAuditPersistenceDryRunVerificationJson: string;
    sourceManagedAuditPersistenceBoundaryCandidateJson: string;
  };
  nextActions: string[];
}

export interface ManagedAuditIdentityApprovalBindingShape {
  identity: {
    identityVersion: AuditOperatorIdentityContext["identityVersion"];
    operatorIdPath: "operatorIdentity.operatorId";
    authenticatedPath: "operatorIdentity.authenticated";
    rolesPath: "operatorIdentity.roles";
    authSourcePath: "operatorIdentity.authSource";
    verifiedTokenPath: "operatorIdentity.verifiedToken";
    requiredWhen: "all-managed-audit-dry-run-packets";
  };
  approvalRequest: {
    requestIdPath: "approvalRequest.requestId";
    intentIdPath: "approvalRequest.intentId";
    actionPath: "approvalRequest.action";
    targetPath: "approvalRequest.target";
    statusPath: "approvalRequest.status";
    requestedByPath: "approvalRequest.requestedBy";
    reviewerPath: "approvalRequest.reviewer";
    previewDigestPath: "approvalRequest.previewDigest";
    preflightDigestPath: "approvalRequest.preflightDigest";
    requiredStatus: Extract<OperationApprovalRequestStatus, "pending" | "approved" | "rejected">[];
  };
  approvalDecision: {
    decisionIdPath: "approvalDecision.decisionId";
    decisionPath: "approvalDecision.decision";
    reviewerPath: "approvalDecision.reviewer";
    reasonPath: "approvalDecision.reason";
    decisionDigestPath: "approvalDecision.decisionDigest";
    upstreamTouchedPath: "approvalDecision.upstreamTouched";
    allowedValues: OperationApprovalDecisionValue[];
    requiredBeforeProductionExecution: true;
  };
  correlation: {
    approvalCorrelationIdPath: "headers.x-orderops-approval-correlation-id";
    auditRequestIdPath: "auditRecord.requestId";
    operationIntentIdPath: "approvalRequest.intentId";
    sourceDryRunRecordIdPath: "sourceDryRunRecord.recordId";
    traceDigestPath: "bindingContract.contractDigest";
  };
}

interface BindingRequirement {
  id:
    | "operator-identity"
    | "approval-request"
    | "approval-decision"
    | "approval-correlation"
    | "digest-linkage";
  requiredForV211: true;
  requiredBeforeProductionAudit: true;
  fieldPaths: string[];
}

interface MissingFieldRule {
  id:
    | "missing-operator-identity"
    | "missing-approval-request"
    | "missing-approval-decision"
    | "missing-correlation-id"
    | "missing-digest-linkage";
  missingFields: string[];
  v211Behavior: "block-dry-run-packet";
  productionWindowAllowed: false;
}

interface BindingMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-identity-approval-binding-contract"
    | "managed-audit-persistence-dry-run-verification"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditIdentityApprovalBindingContractJson: "/api/v1/audit/managed-identity-approval-binding-contract",
  managedAuditIdentityApprovalBindingContractMarkdown: "/api/v1/audit/managed-identity-approval-binding-contract?format=markdown",
  sourceManagedAuditPersistenceDryRunVerificationJson: "/api/v1/audit/managed-persistence-dry-run-verification",
  sourceManagedAuditPersistenceBoundaryCandidateJson: "/api/v1/audit/managed-persistence-boundary-candidate",
});

export async function loadManagedAuditIdentityApprovalBindingContract(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditIdentityApprovalBindingContractProfile> {
  const sourceDryRun = await loadManagedAuditPersistenceDryRunVerification({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const bindingShape = createBindingShape();
  const requiredBindings = createRequiredBindings(bindingShape);
  const missingFieldRules = createMissingFieldRules();
  const contractDigest = sha256StableJson({
    profileVersion: "managed-audit-identity-approval-binding-contract.v1",
    sourceVerificationDigest: sourceDryRun.verification.verificationDigest,
    targetRecordVersion: "managed-audit-dry-run-record.v2-candidate",
    bindingShape,
    requiredBindings,
    missingFieldRules,
    realApprovalDecisionCreated: false,
    realApprovalLedgerWritten: false,
    productionAuditRecordAllowed: false,
  });
  const contract = {
    contractDigest,
    targetRecordVersion: "managed-audit-dry-run-record.v2-candidate" as const,
    sourceRecordVersion: sourceDryRun.dryRunRecord.recordVersion,
    schemaOnly: true as const,
    realApprovalDecisionCreated: false as const,
    realApprovalLedgerWritten: false as const,
    externalAuditSystemAccessed: false as const,
    javaWriteAttempted: false as const,
    miniKvWriteAttempted: false as const,
    productionAuditRecordAllowed: false as const,
  };
  const checks = createChecks(input.config, sourceDryRun, contract, bindingShape, requiredBindings, missingFieldRules);
  checks.readyForManagedAuditIdentityApprovalBindingContract = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditIdentityApprovalBindingContract")
    .every(([, value]) => value);
  const contractState = checks.readyForManagedAuditIdentityApprovalBindingContract
    ? "ready-for-identity-approval-dry-run-packet"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(contractState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit identity and approval binding contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-identity-approval-binding-contract.v1",
    contractState,
    readyForManagedAuditIdentityApprovalBindingContract: checks.readyForManagedAuditIdentityApprovalBindingContract,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceDryRunVerification: {
      profileVersion: sourceDryRun.profileVersion,
      verificationState: sourceDryRun.verificationState,
      verificationDigest: sourceDryRun.verification.verificationDigest,
      sourceCandidateDigest: sourceDryRun.sourceCandidate.candidateDigest,
      dryRunRecordVersion: sourceDryRun.dryRunRecord.recordVersion,
      sourceDryRunRecordId: sourceDryRun.dryRunRecord.recordId,
    },
    contract,
    bindingShape,
    requiredBindings,
    missingFieldRules,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredBindingCount: requiredBindings.length,
      missingFieldRuleCount: missingFieldRules.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use Java v75 and mini-kv v84 to add read-only handoff evidence before Node v211 consumes upstream provenance.",
      "Use Node v211 to generate a temporary dry-run packet with identity, approval, and provenance fields bound to this contract.",
      "Do not create a real approval decision or managed audit record from this contract version.",
    ],
  };
}

export function renderManagedAuditIdentityApprovalBindingContractMarkdown(
  profile: ManagedAuditIdentityApprovalBindingContractProfile,
): string {
  return [
    "# Managed audit identity and approval binding contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Contract state: ${profile.contractState}`,
    `- Ready for managed audit identity approval binding contract: ${profile.readyForManagedAuditIdentityApprovalBindingContract}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Dry-run Verification",
    "",
    ...renderEntries(profile.sourceDryRunVerification),
    "",
    "## Contract",
    "",
    ...renderEntries(profile.contract),
    "",
    "## Binding Shape",
    "",
    ...renderBindingShape(profile.bindingShape),
    "## Required Bindings",
    "",
    ...profile.requiredBindings.flatMap(renderRequirement),
    "## Missing Field Rules",
    "",
    ...profile.missingFieldRules.flatMap(renderMissingFieldRule),
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
    ...renderMessages(profile.productionBlockers, "No managed audit identity approval binding blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit identity approval binding warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit identity approval binding recommendations."),
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

function createBindingShape(): ManagedAuditIdentityApprovalBindingShape {
  return {
    identity: {
      identityVersion: "operator-identity-contract.v1",
      operatorIdPath: "operatorIdentity.operatorId",
      authenticatedPath: "operatorIdentity.authenticated",
      rolesPath: "operatorIdentity.roles",
      authSourcePath: "operatorIdentity.authSource",
      verifiedTokenPath: "operatorIdentity.verifiedToken",
      requiredWhen: "all-managed-audit-dry-run-packets",
    },
    approvalRequest: {
      requestIdPath: "approvalRequest.requestId",
      intentIdPath: "approvalRequest.intentId",
      actionPath: "approvalRequest.action",
      targetPath: "approvalRequest.target",
      statusPath: "approvalRequest.status",
      requestedByPath: "approvalRequest.requestedBy",
      reviewerPath: "approvalRequest.reviewer",
      previewDigestPath: "approvalRequest.previewDigest",
      preflightDigestPath: "approvalRequest.preflightDigest",
      requiredStatus: ["pending", "approved", "rejected"],
    },
    approvalDecision: {
      decisionIdPath: "approvalDecision.decisionId",
      decisionPath: "approvalDecision.decision",
      reviewerPath: "approvalDecision.reviewer",
      reasonPath: "approvalDecision.reason",
      decisionDigestPath: "approvalDecision.decisionDigest",
      upstreamTouchedPath: "approvalDecision.upstreamTouched",
      allowedValues: ["approved", "rejected"],
      requiredBeforeProductionExecution: true,
    },
    correlation: {
      approvalCorrelationIdPath: "headers.x-orderops-approval-correlation-id",
      auditRequestIdPath: "auditRecord.requestId",
      operationIntentIdPath: "approvalRequest.intentId",
      sourceDryRunRecordIdPath: "sourceDryRunRecord.recordId",
      traceDigestPath: "bindingContract.contractDigest",
    },
  };
}

function createRequiredBindings(shape: ManagedAuditIdentityApprovalBindingShape): BindingRequirement[] {
  return [
    {
      id: "operator-identity",
      requiredForV211: true,
      requiredBeforeProductionAudit: true,
      fieldPaths: [
        shape.identity.operatorIdPath,
        shape.identity.authenticatedPath,
        shape.identity.rolesPath,
        shape.identity.authSourcePath,
      ],
    },
    {
      id: "approval-request",
      requiredForV211: true,
      requiredBeforeProductionAudit: true,
      fieldPaths: [
        shape.approvalRequest.requestIdPath,
        shape.approvalRequest.intentIdPath,
        shape.approvalRequest.actionPath,
        shape.approvalRequest.targetPath,
        shape.approvalRequest.statusPath,
        shape.approvalRequest.previewDigestPath,
        shape.approvalRequest.preflightDigestPath,
      ],
    },
    {
      id: "approval-decision",
      requiredForV211: true,
      requiredBeforeProductionAudit: true,
      fieldPaths: [
        shape.approvalDecision.decisionIdPath,
        shape.approvalDecision.decisionPath,
        shape.approvalDecision.reviewerPath,
        shape.approvalDecision.reasonPath,
        shape.approvalDecision.decisionDigestPath,
        shape.approvalDecision.upstreamTouchedPath,
      ],
    },
    {
      id: "approval-correlation",
      requiredForV211: true,
      requiredBeforeProductionAudit: true,
      fieldPaths: [
        shape.correlation.approvalCorrelationIdPath,
        shape.correlation.auditRequestIdPath,
        shape.correlation.operationIntentIdPath,
      ],
    },
    {
      id: "digest-linkage",
      requiredForV211: true,
      requiredBeforeProductionAudit: true,
      fieldPaths: [
        shape.correlation.sourceDryRunRecordIdPath,
        shape.correlation.traceDigestPath,
        shape.approvalRequest.previewDigestPath,
        shape.approvalDecision.decisionDigestPath,
      ],
    },
  ];
}

function createMissingFieldRules(): MissingFieldRule[] {
  return [
    {
      id: "missing-operator-identity",
      missingFields: ["operatorIdentity.operatorId", "operatorIdentity.authenticated", "operatorIdentity.roles"],
      v211Behavior: "block-dry-run-packet",
      productionWindowAllowed: false,
    },
    {
      id: "missing-approval-request",
      missingFields: ["approvalRequest.requestId", "approvalRequest.intentId", "approvalRequest.previewDigest"],
      v211Behavior: "block-dry-run-packet",
      productionWindowAllowed: false,
    },
    {
      id: "missing-approval-decision",
      missingFields: ["approvalDecision.decisionId", "approvalDecision.decision", "approvalDecision.decisionDigest"],
      v211Behavior: "block-dry-run-packet",
      productionWindowAllowed: false,
    },
    {
      id: "missing-correlation-id",
      missingFields: ["headers.x-orderops-approval-correlation-id", "auditRecord.requestId"],
      v211Behavior: "block-dry-run-packet",
      productionWindowAllowed: false,
    },
    {
      id: "missing-digest-linkage",
      missingFields: ["sourceDryRunRecord.recordId", "bindingContract.contractDigest"],
      v211Behavior: "block-dry-run-packet",
      productionWindowAllowed: false,
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceDryRun: ManagedAuditPersistenceDryRunVerificationProfile,
  contract: ManagedAuditIdentityApprovalBindingContractProfile["contract"],
  bindingShape: ManagedAuditIdentityApprovalBindingShape,
  requiredBindings: BindingRequirement[],
  missingFieldRules: MissingFieldRule[],
): ManagedAuditIdentityApprovalBindingContractProfile["checks"] {
  return {
    sourceDryRunVerified: sourceDryRun.readyForManagedAuditPersistenceDryRunVerification
      && sourceDryRun.verificationState === "dry-run-verified",
    sourceDryRunStillBlocksProduction: sourceDryRun.readyForProductionAudit === false
      && sourceDryRun.readyForProductionWindow === false
      && sourceDryRun.readyForProductionOperations === false
      && sourceDryRun.executionAllowed === false,
    contractDigestValid: /^[a-f0-9]{64}$/.test(contract.contractDigest),
    operatorIdentityFieldsBound: requiredBindings.some((binding) => binding.id === "operator-identity")
      && bindingShape.identity.identityVersion === "operator-identity-contract.v1"
      && bindingShape.identity.operatorIdPath === "operatorIdentity.operatorId",
    approvalRequestFieldsBound: requiredBindings.some((binding) => binding.id === "approval-request")
      && bindingShape.approvalRequest.requiredStatus.includes("pending")
      && bindingShape.approvalRequest.previewDigestPath === "approvalRequest.previewDigest",
    approvalDecisionFieldsBound: requiredBindings.some((binding) => binding.id === "approval-decision")
      && bindingShape.approvalDecision.allowedValues.includes("approved")
      && bindingShape.approvalDecision.allowedValues.includes("rejected")
      && bindingShape.approvalDecision.upstreamTouchedPath === "approvalDecision.upstreamTouched",
    correlationFieldsBound: requiredBindings.some((binding) => binding.id === "approval-correlation")
      && bindingShape.correlation.approvalCorrelationIdPath === "headers.x-orderops-approval-correlation-id"
      && bindingShape.correlation.traceDigestPath === "bindingContract.contractDigest",
    missingFieldRulesDefined: missingFieldRules.length === 5
      && missingFieldRules.every((rule) => rule.v211Behavior === "block-dry-run-packet" && !rule.productionWindowAllowed),
    noRealApprovalDecisionCreated: !contract.realApprovalDecisionCreated,
    noRealLedgerWritten: !contract.realApprovalLedgerWritten,
    noExternalAuditAccessed: !contract.externalAuditSystemAccessed,
    javaMiniKvWriteBlocked: !contract.javaWriteAttempted && !contract.miniKvWriteAttempted,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: true,
    productionAuditStillBlocked: !contract.productionAuditRecordAllowed,
    readyForManagedAuditIdentityApprovalBindingContract: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditIdentityApprovalBindingContractProfile["checks"],
): BindingMessage[] {
  const blockers: BindingMessage[] = [];
  addMessage(blockers, checks.sourceDryRunVerified, "SOURCE_DRY_RUN_NOT_VERIFIED", "managed-audit-persistence-dry-run-verification", "Node v209 dry-run verification must be ready before v210 binding contract.");
  addMessage(blockers, checks.sourceDryRunStillBlocksProduction, "SOURCE_DRY_RUN_UNLOCKS_PRODUCTION", "managed-audit-persistence-dry-run-verification", "Node v209 must still block production audit and production operations.");
  addMessage(blockers, checks.contractDigestValid, "CONTRACT_DIGEST_INVALID", "managed-audit-identity-approval-binding-contract", "v210 contract digest must be a stable sha256 hex digest.");
  addMessage(blockers, checks.operatorIdentityFieldsBound, "OPERATOR_IDENTITY_BINDING_MISSING", "managed-audit-identity-approval-binding-contract", "Operator identity fields must be bound to the audit record candidate.");
  addMessage(blockers, checks.approvalRequestFieldsBound, "APPROVAL_REQUEST_BINDING_MISSING", "managed-audit-identity-approval-binding-contract", "Approval request fields must be bound to the audit record candidate.");
  addMessage(blockers, checks.approvalDecisionFieldsBound, "APPROVAL_DECISION_BINDING_MISSING", "managed-audit-identity-approval-binding-contract", "Approval decision fields must be bound to the audit record candidate.");
  addMessage(blockers, checks.correlationFieldsBound, "CORRELATION_BINDING_MISSING", "managed-audit-identity-approval-binding-contract", "Approval correlation and trace digest fields must be bound.");
  addMessage(blockers, checks.missingFieldRulesDefined, "MISSING_FIELD_RULES_INCOMPLETE", "managed-audit-identity-approval-binding-contract", "Missing identity/approval/correlation fields must block the v211 dry-run packet.");
  addMessage(blockers, checks.noRealApprovalDecisionCreated, "REAL_APPROVAL_DECISION_CREATED", "managed-audit-identity-approval-binding-contract", "v210 must not create a real approval decision.");
  addMessage(blockers, checks.noRealLedgerWritten, "REAL_APPROVAL_LEDGER_WRITTEN", "managed-audit-identity-approval-binding-contract", "v210 must not write a real approval ledger.");
  addMessage(blockers, checks.noExternalAuditAccessed, "EXTERNAL_AUDIT_ACCESSED", "managed-audit-identity-approval-binding-contract", "v210 must not connect a real managed audit system.");
  addMessage(blockers, checks.javaMiniKvWriteBlocked, "UPSTREAM_WRITE_ATTEMPTED", "managed-audit-identity-approval-binding-contract", "v210 must not write Java or mini-kv.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "runtime-config", "v210 must not unlock production audit.");
  return blockers;
}

function collectWarnings(
  contractState: ManagedAuditIdentityApprovalBindingContractProfile["contractState"],
): BindingMessage[] {
  return [
    {
      code: contractState === "blocked" ? "BINDING_CONTRACT_BLOCKED" : "SCHEMA_CONTRACT_ONLY",
      severity: "warning",
      source: "managed-audit-identity-approval-binding-contract",
      message: contractState === "blocked"
        ? "Managed audit identity approval binding contract has blockers."
        : "Identity and approval fields are bound as schema/contract only; no real approval decision or production audit record is created.",
    },
  ];
}

function collectRecommendations(): BindingMessage[] {
  return [
    {
      code: "COMPLETE_JAVA_V75_MINIKV_V84_HANDOFFS",
      severity: "recommendation",
      source: "managed-audit-identity-approval-binding-contract",
      message: "Complete Java v75 and mini-kv v84 read-only handoff evidence before Node v211 consumes upstream provenance.",
    },
    {
      code: "START_NODE_V211_IDENTITY_APPROVAL_DRY_RUN_PACKET",
      severity: "recommendation",
      source: "managed-audit-identity-approval-binding-contract",
      message: "Use Node v211 to generate a local dry-run packet with identity, approval, correlation, and digest linkage.",
    },
  ];
}

function renderBindingShape(shape: ManagedAuditIdentityApprovalBindingShape): string[] {
  return [
    "### Identity",
    "",
    ...renderEntries(shape.identity),
    "",
    "### Approval Request",
    "",
    ...renderEntries(shape.approvalRequest),
    "",
    "### Approval Decision",
    "",
    ...renderEntries(shape.approvalDecision),
    "",
    "### Correlation",
    "",
    ...renderEntries(shape.correlation),
    "",
  ];
}

function renderRequirement(requirement: BindingRequirement): string[] {
  return [
    `- ${requirement.id}`,
    `  - requiredForV211: ${requirement.requiredForV211}`,
    `  - requiredBeforeProductionAudit: ${requirement.requiredBeforeProductionAudit}`,
    `  - fieldPaths: ${JSON.stringify(requirement.fieldPaths)}`,
  ];
}

function renderMissingFieldRule(rule: MissingFieldRule): string[] {
  return [
    `- ${rule.id}`,
    `  - missingFields: ${JSON.stringify(rule.missingFields)}`,
    `  - v211Behavior: ${rule.v211Behavior}`,
    `  - productionWindowAllowed: ${rule.productionWindowAllowed}`,
  ];
}

function addMessage(
  messages: BindingMessage[],
  condition: boolean,
  code: string,
  source: BindingMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
