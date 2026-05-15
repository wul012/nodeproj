import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  extractRequestIdentityFromHeaders,
  type RequestIdentity,
} from "./accessGuard.js";
import type { AccessPolicyRole } from "./accessPolicyProfile.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadRealReadAdapterProductionReadinessCheckpoint,
  type RealReadAdapterProductionReadinessCheckpointProfile,
} from "./realReadAdapterProductionReadinessCheckpoint.js";

export interface RealReadWindowOperatorIdentityBindingProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-window-operator-identity-binding.v1";
  bindingState: "ready-for-rehearsal-identity-binding" | "blocked";
  readyForRealReadWindowOperatorIdentityBinding: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceCheckpoint: {
    profileVersion: RealReadAdapterProductionReadinessCheckpointProfile["profileVersion"];
    checkpointState: RealReadAdapterProductionReadinessCheckpointProfile["checkpointState"];
    checkpointDigest: string;
    readyForCheckpoint: boolean;
    readyForProductionWindow: false;
  };
  operatorIdentity: BoundOperatorIdentity;
  approvalBinding: ApprovalCorrelationBinding;
  bindingRules: IdentityBindingRule[];
  checks: {
    sourceCheckpointReady: boolean;
    sourceCheckpointDigestValid: boolean;
    sourceProductionWindowStillBlocked: boolean;
    operatorIdPresent: boolean;
    operatorRolesPresent: boolean;
    operatorRolesAllowed: boolean;
    operatorVerifiedClaimPresent: boolean;
    operatorVerifiedClaimTrue: boolean;
    approvalCorrelationIdPresent: boolean;
    approvalCorrelationIdValid: boolean;
    bindingRulesComplete: boolean;
    headerIdentityStillRehearsalOnly: boolean;
    productionIdpNotConnected: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    nodeDoesNotStartUpstreams: boolean;
    readyForRealReadWindowOperatorIdentityBinding: boolean;
  };
  packet: {
    bindingDigest: string;
    sourceCheckpointDigest: string;
    operatorIdentityDigest: string;
    approvalCorrelationDigest: string;
    hardGateFromV197: "real-operator-identity";
    hardGateProgress: "rehearsal-binding-ready-real-idp-blocked" | "blocked";
    productionIdpConnected: false;
    productionWindowAllowed: false;
    productionOperationAllowed: false;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    roleCount: number;
    rejectedRoleCount: number;
    bindingRuleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: IdentityBindingMessage[];
  warnings: IdentityBindingMessage[];
  recommendations: IdentityBindingMessage[];
  evidenceEndpoints: {
    realReadWindowOperatorIdentityBindingJson: string;
    realReadWindowOperatorIdentityBindingMarkdown: string;
    realReadAdapterProductionReadinessCheckpointJson: string;
    operatorIdentityContractJson: string;
    verifiedIdentityAuditBindingJson: string;
  };
  nextActions: string[];
}

interface BoundOperatorIdentity {
  source: "request-headers";
  operatorId: string | null;
  roles: AccessPolicyRole[];
  rawRoles: string[];
  rejectedRoles: string[];
  authSource: RequestIdentity["authSource"];
  authenticatedByHeaderContract: boolean;
  verifiedClaimHeader: "x-orderops-operator-verified";
  verifiedClaimPresent: boolean;
  verifiedClaimValue: boolean;
  verificationMode: "rehearsal-header-claim";
  productionIdpVerified: false;
  requiredBeforeRealReadWindow: true;
}

interface ApprovalCorrelationBinding {
  header: "x-orderops-approval-correlation-id";
  approvalCorrelationId: string | null;
  approvalCorrelationIdValid: boolean;
  requiredBeforeRealReadWindow: true;
  persistedApprovalRecordExists: false;
}

interface IdentityBindingRule {
  id: string;
  boundary: "operator" | "approval" | "production-auth" | "upstream-safety";
  rule: string;
  requiredBeforeProductionWindow: true;
  satisfiedForRehearsalBinding: boolean;
  satisfiedForProductionWindow: false;
}

interface IdentityBindingMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-window-operator-identity-binding"
    | "real-read-adapter-production-readiness-checkpoint"
    | "request-headers"
    | "runtime-config"
    | "production-auth";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadWindowOperatorIdentityBindingJson: "/api/v1/production/real-read-window-operator-identity-binding",
  realReadWindowOperatorIdentityBindingMarkdown: "/api/v1/production/real-read-window-operator-identity-binding?format=markdown",
  realReadAdapterProductionReadinessCheckpointJson: "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
  operatorIdentityContractJson: "/api/v1/security/operator-identity-contract",
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
});

export async function loadRealReadWindowOperatorIdentityBinding(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<RealReadWindowOperatorIdentityBindingProfile> {
  const checkpoint = await loadRealReadAdapterProductionReadinessCheckpoint(input);
  const identity = createBoundOperatorIdentity(input.headers ?? {});
  const approvalBinding = createApprovalCorrelationBinding(input.headers ?? {});
  const bindingRules = createBindingRules(identity, approvalBinding);
  const checks = createChecks(input.config, checkpoint, identity, approvalBinding, bindingRules);
  checks.readyForRealReadWindowOperatorIdentityBinding = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadWindowOperatorIdentityBinding")
    .every(([, value]) => value);
  const bindingState = checks.readyForRealReadWindowOperatorIdentityBinding
    ? "ready-for-rehearsal-identity-binding"
    : "blocked";
  const operatorIdentityDigest = sha256StableJson({
    operatorId: identity.operatorId,
    roles: identity.roles,
    rawRoles: identity.rawRoles,
    rejectedRoles: identity.rejectedRoles,
    verifiedClaimValue: identity.verifiedClaimValue,
    productionIdpVerified: identity.productionIdpVerified,
  });
  const approvalCorrelationDigest = sha256StableJson({
    approvalCorrelationId: approvalBinding.approvalCorrelationId,
    approvalCorrelationIdValid: approvalBinding.approvalCorrelationIdValid,
    persistedApprovalRecordExists: approvalBinding.persistedApprovalRecordExists,
  });
  const hardGateProgress = checks.readyForRealReadWindowOperatorIdentityBinding
    ? "rehearsal-binding-ready-real-idp-blocked"
    : "blocked";
  const bindingDigest = sha256StableJson({
    profileVersion: "real-read-window-operator-identity-binding.v1",
    bindingState,
    sourceCheckpointDigest: checkpoint.checkpoint.checkpointDigest,
    operatorIdentityDigest,
    approvalCorrelationDigest,
    bindingRuleIds: bindingRules.map((rule) => rule.id),
    productionIdpConnected: false,
    productionWindowAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(bindingState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read window operator identity binding",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-window-operator-identity-binding.v1",
    bindingState,
    readyForRealReadWindowOperatorIdentityBinding: checks.readyForRealReadWindowOperatorIdentityBinding,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceCheckpoint: {
      profileVersion: checkpoint.profileVersion,
      checkpointState: checkpoint.checkpointState,
      checkpointDigest: checkpoint.checkpoint.checkpointDigest,
      readyForCheckpoint: checkpoint.readyForRealReadAdapterProductionReadinessCheckpoint,
      readyForProductionWindow: false,
    },
    operatorIdentity: identity,
    approvalBinding,
    bindingRules,
    checks,
    packet: {
      bindingDigest,
      sourceCheckpointDigest: checkpoint.checkpoint.checkpointDigest,
      operatorIdentityDigest,
      approvalCorrelationDigest,
      hardGateFromV197: "real-operator-identity",
      hardGateProgress,
      productionIdpConnected: false,
      productionWindowAllowed: false,
      productionOperationAllowed: false,
    },
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      roleCount: identity.roles.length,
      rejectedRoleCount: identity.rejectedRoles.length,
      bindingRuleCount: bindingRules.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this binding as a rehearsal hard-gate shape; do not treat the verified header as production IdP authentication.",
      "Proceed with recommended parallel Java v70 + mini-kv v79 so upstream evidence can echo identity and consumer hints.",
      "Use Node v199 to define the managed audit store handoff before any real production window can open.",
    ],
  };
}

export function renderRealReadWindowOperatorIdentityBindingMarkdown(
  profile: RealReadWindowOperatorIdentityBindingProfile,
): string {
  return [
    "# Real-read window operator identity binding",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Binding state: ${profile.bindingState}`,
    `- Ready for real-read window operator identity binding: ${profile.readyForRealReadWindowOperatorIdentityBinding}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Checkpoint",
    "",
    ...renderEntries(profile.sourceCheckpoint),
    "",
    "## Operator Identity",
    "",
    ...renderEntries(profile.operatorIdentity),
    "",
    "## Approval Binding",
    "",
    ...renderEntries(profile.approvalBinding),
    "",
    "## Binding Rules",
    "",
    ...profile.bindingRules.flatMap(renderBindingRule),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Packet",
    "",
    ...renderEntries(profile.packet),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No real-read window operator identity binding blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read window operator identity binding warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read window operator identity binding recommendations."),
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

function createBoundOperatorIdentity(headers: IncomingHttpHeaders): BoundOperatorIdentity {
  const identity = extractRequestIdentityFromHeaders(headers);
  const verifiedHeader = readHeader(headers, "x-orderops-operator-verified");

  return {
    source: "request-headers",
    operatorId: identity.operatorId ?? null,
    roles: identity.roles,
    rawRoles: identity.rawRoles,
    rejectedRoles: identity.rejectedRoles,
    authSource: identity.authSource,
    authenticatedByHeaderContract: identity.authenticated,
    verifiedClaimHeader: "x-orderops-operator-verified",
    verifiedClaimPresent: verifiedHeader !== undefined,
    verifiedClaimValue: isTrueHeader(verifiedHeader),
    verificationMode: "rehearsal-header-claim",
    productionIdpVerified: false,
    requiredBeforeRealReadWindow: true,
  };
}

function createApprovalCorrelationBinding(headers: IncomingHttpHeaders): ApprovalCorrelationBinding {
  const approvalCorrelationId = readHeader(headers, "x-orderops-approval-correlation-id") ?? null;

  return {
    header: "x-orderops-approval-correlation-id",
    approvalCorrelationId,
    approvalCorrelationIdValid: isValidApprovalCorrelationId(approvalCorrelationId),
    requiredBeforeRealReadWindow: true,
    persistedApprovalRecordExists: false,
  };
}

function createBindingRules(
  identity: BoundOperatorIdentity,
  approvalBinding: ApprovalCorrelationBinding,
): IdentityBindingRule[] {
  return [
    {
      id: "operator-id-bound",
      boundary: "operator",
      rule: "A real-read window request must carry x-orderops-operator-id.",
      requiredBeforeProductionWindow: true,
      satisfiedForRehearsalBinding: identity.operatorId !== null,
      satisfiedForProductionWindow: false,
    },
    {
      id: "operator-roles-bound",
      boundary: "operator",
      rule: "A real-read window request must carry at least one allowed role and no rejected role values.",
      requiredBeforeProductionWindow: true,
      satisfiedForRehearsalBinding: identity.roles.length > 0 && identity.rejectedRoles.length === 0,
      satisfiedForProductionWindow: false,
    },
    {
      id: "verified-claim-bound",
      boundary: "production-auth",
      rule: "A real-read window request must carry a verified identity claim before the future IdP replaces this rehearsal header.",
      requiredBeforeProductionWindow: true,
      satisfiedForRehearsalBinding: identity.verifiedClaimPresent && identity.verifiedClaimValue,
      satisfiedForProductionWindow: false,
    },
    {
      id: "approval-correlation-bound",
      boundary: "approval",
      rule: "A real-read window request must carry an approval correlation id that can later be linked to a manual approval record.",
      requiredBeforeProductionWindow: true,
      satisfiedForRehearsalBinding: approvalBinding.approvalCorrelationIdValid,
      satisfiedForProductionWindow: false,
    },
    {
      id: "identity-does-not-unlock-upstream-actions",
      boundary: "upstream-safety",
      rule: "A complete operator identity binding must not enable upstream actions or production operations.",
      requiredBeforeProductionWindow: true,
      satisfiedForRehearsalBinding: true,
      satisfiedForProductionWindow: false,
    },
  ];
}

function createChecks(
  config: AppConfig,
  checkpoint: RealReadAdapterProductionReadinessCheckpointProfile,
  identity: BoundOperatorIdentity,
  approvalBinding: ApprovalCorrelationBinding,
  bindingRules: IdentityBindingRule[],
): RealReadWindowOperatorIdentityBindingProfile["checks"] {
  return {
    sourceCheckpointReady: checkpoint.readyForRealReadAdapterProductionReadinessCheckpoint,
    sourceCheckpointDigestValid: /^[a-f0-9]{64}$/.test(checkpoint.checkpoint.checkpointDigest),
    sourceProductionWindowStillBlocked: checkpoint.readyForProductionWindow === false
      && checkpoint.readyForProductionOperations === false,
    operatorIdPresent: identity.operatorId !== null && identity.operatorId.length > 0,
    operatorRolesPresent: identity.roles.length > 0,
    operatorRolesAllowed: identity.rejectedRoles.length === 0,
    operatorVerifiedClaimPresent: identity.verifiedClaimPresent,
    operatorVerifiedClaimTrue: identity.verifiedClaimValue,
    approvalCorrelationIdPresent: approvalBinding.approvalCorrelationId !== null,
    approvalCorrelationIdValid: approvalBinding.approvalCorrelationIdValid,
    bindingRulesComplete: bindingRules.length === 5
      && bindingRules.every((rule) => rule.requiredBeforeProductionWindow)
      && bindingRules.every((rule) => rule.satisfiedForRehearsalBinding),
    headerIdentityStillRehearsalOnly: identity.productionIdpVerified === false,
    productionIdpNotConnected: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: checkpoint.executionAllowed === false,
    nodeDoesNotStartUpstreams: true,
    readyForRealReadWindowOperatorIdentityBinding: false,
  };
}

function collectProductionBlockers(
  checks: RealReadWindowOperatorIdentityBindingProfile["checks"],
): IdentityBindingMessage[] {
  const blockers: IdentityBindingMessage[] = [];
  addMessage(blockers, checks.sourceCheckpointReady, "SOURCE_CHECKPOINT_NOT_READY", "real-read-adapter-production-readiness-checkpoint", "Node v197 readiness checkpoint must be ready before v198 identity binding.");
  addMessage(blockers, checks.sourceCheckpointDigestValid, "SOURCE_CHECKPOINT_DIGEST_INVALID", "real-read-adapter-production-readiness-checkpoint", "Node v197 checkpoint digest must be a sha256 hex digest.");
  addMessage(blockers, checks.sourceProductionWindowStillBlocked, "SOURCE_CHECKPOINT_UNLOCKED_PRODUCTION", "real-read-adapter-production-readiness-checkpoint", "Node v197 checkpoint must still keep the production window blocked.");
  addMessage(blockers, checks.operatorIdPresent, "OPERATOR_ID_MISSING", "request-headers", "x-orderops-operator-id is required for real-read window identity binding.");
  addMessage(blockers, checks.operatorRolesPresent, "OPERATOR_ROLES_MISSING", "request-headers", "x-orderops-roles must include at least one allowed role.");
  addMessage(blockers, checks.operatorRolesAllowed, "OPERATOR_ROLES_REJECTED", "request-headers", "x-orderops-roles must not include rejected role values.");
  addMessage(blockers, checks.operatorVerifiedClaimPresent, "OPERATOR_VERIFIED_CLAIM_MISSING", "request-headers", "x-orderops-operator-verified must be present for the rehearsal binding.");
  addMessage(blockers, checks.operatorVerifiedClaimTrue, "OPERATOR_VERIFIED_CLAIM_FALSE", "request-headers", "x-orderops-operator-verified must be true for the rehearsal binding.");
  addMessage(blockers, checks.approvalCorrelationIdPresent, "APPROVAL_CORRELATION_ID_MISSING", "request-headers", "x-orderops-approval-correlation-id is required for the real-read window.");
  addMessage(blockers, checks.approvalCorrelationIdValid, "APPROVAL_CORRELATION_ID_INVALID", "request-headers", "x-orderops-approval-correlation-id must be a stable correlation token.");
  addMessage(blockers, checks.bindingRulesComplete, "IDENTITY_BINDING_RULES_INCOMPLETE", "real-read-window-operator-identity-binding", "All v198 binding rules must be satisfied for rehearsal binding.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v198 must not unlock execution.");

  blockers.push({
    code: "REAL_IDP_NOT_CONNECTED",
    severity: "blocker",
    source: "production-auth",
    message: "The verified claim is a rehearsal header only; a production IdP is still required before opening a real window.",
  });
  blockers.push({
    code: "MANUAL_APPROVAL_RECORD_NOT_PERSISTED",
    severity: "blocker",
    source: "real-read-window-operator-identity-binding",
    message: "The approval correlation id is not yet linked to a persisted manual approval record.",
  });

  return blockers;
}

function collectWarnings(bindingState: RealReadWindowOperatorIdentityBindingProfile["bindingState"]): IdentityBindingMessage[] {
  return [
    {
      code: bindingState === "blocked"
        ? "REAL_READ_OPERATOR_IDENTITY_BINDING_BLOCKED"
        : "REHEARSAL_IDENTITY_BINDING_NOT_PRODUCTION_AUTH",
      severity: "warning",
      source: "real-read-window-operator-identity-binding",
      message: bindingState === "blocked"
        ? "The operator identity binding has missing request evidence."
        : "The operator identity binding shape is ready, but it is still not production authentication.",
    },
    {
      code: "UPSTREAM_IDENTITY_ECHO_PENDING",
      severity: "warning",
      source: "real-read-window-operator-identity-binding",
      message: "Java v70 and mini-kv v79 are still the recommended parallel follow-up for upstream identity/consumer hints.",
    },
  ];
}

function collectRecommendations(): IdentityBindingMessage[] {
  return [
    {
      code: "PROCEED_TO_JAVA_V70_AND_MINIKV_V79",
      severity: "recommendation",
      source: "real-read-window-operator-identity-binding",
      message: "After v198, run the recommended parallel Java v70 + mini-kv v79 evidence enhancements before Node v199.",
    },
  ];
}

function addMessage(
  messages: IdentityBindingMessage[],
  condition: boolean,
  code: string,
  source: IdentityBindingMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderBindingRule(rule: IdentityBindingRule): string[] {
  return [
    `### ${rule.id}`,
    "",
    `- Boundary: ${rule.boundary}`,
    `- Rule: ${rule.rule}`,
    `- Required before production window: ${rule.requiredBeforeProductionWindow}`,
    `- Satisfied for rehearsal binding: ${rule.satisfiedForRehearsalBinding}`,
    `- Satisfied for production window: ${rule.satisfiedForProductionWindow}`,
    "",
  ];
}

function readHeader(headers: IncomingHttpHeaders, key: string): string | undefined {
  const value = headers[key];
  if (Array.isArray(value)) {
    return value[0]?.trim();
  }
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function isTrueHeader(value: string | undefined): boolean {
  return value !== undefined && ["1", "true", "yes", "verified"].includes(value.trim().toLowerCase());
}

function isValidApprovalCorrelationId(value: string | null): boolean {
  return value !== null && /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/.test(value);
}
