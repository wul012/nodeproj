import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
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
  loadRealReadWindowOperatorIdentityBinding,
  type RealReadWindowOperatorIdentityBindingProfile,
} from "./realReadWindowOperatorIdentityBinding.js";

export interface RealReadWindowAuditStoreHandoffContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-window-audit-store-handoff-contract.v1";
  handoffState: "ready-for-managed-audit-handoff" | "blocked";
  readyForRealReadWindowAuditStoreHandoff: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceIdentityBinding: {
    profileVersion: RealReadWindowOperatorIdentityBindingProfile["profileVersion"];
    bindingState: RealReadWindowOperatorIdentityBindingProfile["bindingState"];
    bindingDigest: string;
    readyForIdentityBinding: boolean;
    readyForProductionWindow: false;
  };
  handoffContract: {
    handoffDigest: string;
    sourceBindingDigest: string;
    managedAuditStoreConnected: false;
    managedAuditWritesAllowed: false;
    realDatabaseConnectionAttempted: false;
    fileAuditMigrationPerformed: false;
    requiredRecordCount: 3;
  };
  requiredRecords: AuditHandoffRecord[];
  handoffRules: AuditHandoffRule[];
  checks: {
    sourceIdentityBindingReady: boolean;
    sourceBindingDigestValid: boolean;
    sourceProductionWindowStillBlocked: boolean;
    requiredRecordsComplete: boolean;
    requiredRecordsReadOnly: boolean;
    requiredRecordsDigestValid: boolean;
    handoffRulesComplete: boolean;
    managedAuditStoreNotConnected: boolean;
    managedAuditWritesStillDisabled: boolean;
    fileAuditMigrationNotPerformed: boolean;
    productionDatabaseNotTouched: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    readyForRealReadWindowAuditStoreHandoff: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    requiredRecordCount: number;
    handoffRuleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AuditHandoffMessage[];
  warnings: AuditHandoffMessage[];
  recommendations: AuditHandoffMessage[];
  evidenceEndpoints: {
    realReadWindowAuditStoreHandoffContractJson: string;
    realReadWindowAuditStoreHandoffContractMarkdown: string;
    realReadWindowOperatorIdentityBindingJson: string;
    realReadAdapterProductionReadinessCheckpointJson: string;
    managedAuditStoreContractJson: string;
  };
  nextActions: string[];
}

interface AuditHandoffRecord {
  id: "real-read-window-open" | "real-read-window-imported-result" | "real-read-window-checkpoint";
  requiredBeforeProductionWindow: true;
  targetStore: "future-managed-audit-store";
  recordKind: "window-open" | "imported-result" | "checkpoint";
  sourceEvidence: string;
  digest: string;
  appendOnly: true;
  readOnly: true;
  writesNow: false;
}

interface AuditHandoffRule {
  id: string;
  rule: string;
  satisfiedForHandoff: boolean;
  satisfiedForProductionAudit: false;
}

interface AuditHandoffMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-window-audit-store-handoff-contract"
    | "real-read-window-operator-identity-binding"
    | "managed-audit-store"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadWindowAuditStoreHandoffContractJson: "/api/v1/production/real-read-window-audit-store-handoff-contract",
  realReadWindowAuditStoreHandoffContractMarkdown: "/api/v1/production/real-read-window-audit-store-handoff-contract?format=markdown",
  realReadWindowOperatorIdentityBindingJson: "/api/v1/production/real-read-window-operator-identity-binding",
  realReadAdapterProductionReadinessCheckpointJson: "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
});

export async function loadRealReadWindowAuditStoreHandoffContract(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<RealReadWindowAuditStoreHandoffContractProfile> {
  const identityBinding = await loadRealReadWindowOperatorIdentityBinding(input);
  const requiredRecords = createRequiredRecords(identityBinding);
  const handoffRules = createHandoffRules(requiredRecords);
  const checks = createChecks(input.config, identityBinding, requiredRecords, handoffRules);
  checks.readyForRealReadWindowAuditStoreHandoff = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadWindowAuditStoreHandoff")
    .every(([, value]) => value);
  const handoffState = checks.readyForRealReadWindowAuditStoreHandoff
    ? "ready-for-managed-audit-handoff"
    : "blocked";
  const handoffDigest = sha256StableJson({
    profileVersion: "real-read-window-audit-store-handoff-contract.v1",
    handoffState,
    sourceBindingDigest: identityBinding.packet.bindingDigest,
    requiredRecordDigests: requiredRecords.map((record) => record.digest),
    handoffRuleIds: handoffRules.map((rule) => rule.id),
    managedAuditStoreConnected: false,
    managedAuditWritesAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(handoffState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read window audit store handoff contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-window-audit-store-handoff-contract.v1",
    handoffState,
    readyForRealReadWindowAuditStoreHandoff: checks.readyForRealReadWindowAuditStoreHandoff,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceIdentityBinding: {
      profileVersion: identityBinding.profileVersion,
      bindingState: identityBinding.bindingState,
      bindingDigest: identityBinding.packet.bindingDigest,
      readyForIdentityBinding: identityBinding.readyForRealReadWindowOperatorIdentityBinding,
      readyForProductionWindow: false,
    },
    handoffContract: {
      handoffDigest,
      sourceBindingDigest: identityBinding.packet.bindingDigest,
      managedAuditStoreConnected: false,
      managedAuditWritesAllowed: false,
      realDatabaseConnectionAttempted: false,
      fileAuditMigrationPerformed: false,
      requiredRecordCount: 3,
    },
    requiredRecords,
    handoffRules,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredRecordCount: requiredRecords.length,
      handoffRuleCount: handoffRules.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this handoff as a contract only; do not write window records to a managed audit store in v199.",
      "Use Node v200 to publish a CI archive artifact manifest for v191-v199 evidence.",
      "Only after a real managed audit adapter and manual approval record exist can the production window be reconsidered.",
    ],
  };
}

export function renderRealReadWindowAuditStoreHandoffContractMarkdown(
  profile: RealReadWindowAuditStoreHandoffContractProfile,
): string {
  return [
    "# Real-read window audit store handoff contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Handoff state: ${profile.handoffState}`,
    `- Ready for real-read window audit store handoff: ${profile.readyForRealReadWindowAuditStoreHandoff}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Identity Binding",
    "",
    ...renderEntries(profile.sourceIdentityBinding),
    "",
    "## Handoff Contract",
    "",
    ...renderEntries(profile.handoffContract),
    "",
    "## Required Records",
    "",
    ...profile.requiredRecords.flatMap(renderRecord),
    "## Handoff Rules",
    "",
    ...profile.handoffRules.flatMap(renderRule),
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
    ...renderMessages(profile.productionBlockers, "No real-read window audit handoff blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No real-read window audit handoff warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No real-read window audit handoff recommendations."),
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

function createRequiredRecords(
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
): AuditHandoffRecord[] {
  return [
    createRecord(
      "real-read-window-open",
      "window-open",
      identityBinding.packet.bindingDigest,
    ),
    createRecord(
      "real-read-window-imported-result",
      "imported-result",
      identityBinding.sourceCheckpoint.checkpointDigest,
    ),
    createRecord(
      "real-read-window-checkpoint",
      "checkpoint",
      identityBinding.packet.sourceCheckpointDigest,
    ),
  ];
}

function createRecord(
  id: AuditHandoffRecord["id"],
  recordKind: AuditHandoffRecord["recordKind"],
  sourceEvidence: string,
): AuditHandoffRecord {
  return {
    id,
    requiredBeforeProductionWindow: true,
    targetStore: "future-managed-audit-store",
    recordKind,
    sourceEvidence,
    digest: sha256StableJson({
      id,
      recordKind,
      sourceEvidence,
      targetStore: "future-managed-audit-store",
      appendOnly: true,
      readOnly: true,
      writesNow: false,
    }),
    appendOnly: true,
    readOnly: true,
    writesNow: false,
  };
}

function createHandoffRules(records: AuditHandoffRecord[]): AuditHandoffRule[] {
  return [
    {
      id: "three-record-window-chain",
      rule: "Managed audit handoff must include window-open, imported-result, and checkpoint records.",
      satisfiedForHandoff: records.length === 3,
      satisfiedForProductionAudit: false,
    },
    {
      id: "append-only-read-only-records",
      rule: "All handoff records must be append-only contracts and must not write in v199.",
      satisfiedForHandoff: records.every((record) => record.appendOnly && record.readOnly && !record.writesNow),
      satisfiedForProductionAudit: false,
    },
    {
      id: "managed-store-future-only",
      rule: "The managed audit store target is documented but not connected in this version.",
      satisfiedForHandoff: records.every((record) => record.targetStore === "future-managed-audit-store"),
      satisfiedForProductionAudit: false,
    },
  ];
}

function createChecks(
  config: AppConfig,
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
  records: AuditHandoffRecord[],
  rules: AuditHandoffRule[],
): RealReadWindowAuditStoreHandoffContractProfile["checks"] {
  return {
    sourceIdentityBindingReady: identityBinding.readyForRealReadWindowOperatorIdentityBinding,
    sourceBindingDigestValid: /^[a-f0-9]{64}$/.test(identityBinding.packet.bindingDigest),
    sourceProductionWindowStillBlocked: identityBinding.readyForProductionWindow === false
      && identityBinding.readyForProductionOperations === false,
    requiredRecordsComplete: records.length === 3
      && records.some((record) => record.recordKind === "window-open")
      && records.some((record) => record.recordKind === "imported-result")
      && records.some((record) => record.recordKind === "checkpoint"),
    requiredRecordsReadOnly: records.every((record) => record.readOnly && !record.writesNow && record.appendOnly),
    requiredRecordsDigestValid: records.every((record) => /^[a-f0-9]{64}$/.test(record.digest)),
    handoffRulesComplete: rules.length === 3 && rules.every((rule) => rule.satisfiedForHandoff),
    managedAuditStoreNotConnected: true,
    managedAuditWritesStillDisabled: true,
    fileAuditMigrationNotPerformed: true,
    productionDatabaseNotTouched: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: identityBinding.executionAllowed === false,
    readyForRealReadWindowAuditStoreHandoff: false,
  };
}

function collectProductionBlockers(
  checks: RealReadWindowAuditStoreHandoffContractProfile["checks"],
): AuditHandoffMessage[] {
  const blockers: AuditHandoffMessage[] = [];
  addMessage(blockers, checks.sourceIdentityBindingReady, "SOURCE_IDENTITY_BINDING_NOT_READY", "real-read-window-operator-identity-binding", "Node v198 identity binding must be ready before audit handoff.");
  addMessage(blockers, checks.sourceBindingDigestValid, "SOURCE_BINDING_DIGEST_INVALID", "real-read-window-operator-identity-binding", "Node v198 binding digest must be valid.");
  addMessage(blockers, checks.sourceProductionWindowStillBlocked, "SOURCE_BINDING_UNLOCKED_PRODUCTION", "real-read-window-operator-identity-binding", "Node v198 must still block production window and operations.");
  addMessage(blockers, checks.requiredRecordsComplete, "HANDOFF_RECORDS_INCOMPLETE", "real-read-window-audit-store-handoff-contract", "Handoff must define window-open, imported-result, and checkpoint records.");
  addMessage(blockers, checks.requiredRecordsReadOnly, "HANDOFF_RECORDS_NOT_READ_ONLY", "real-read-window-audit-store-handoff-contract", "Handoff records must remain read-only contracts in v199.");
  addMessage(blockers, checks.requiredRecordsDigestValid, "HANDOFF_RECORD_DIGEST_INVALID", "real-read-window-audit-store-handoff-contract", "Each handoff record must have a valid digest.");
  addMessage(blockers, checks.handoffRulesComplete, "HANDOFF_RULES_INCOMPLETE", "real-read-window-audit-store-handoff-contract", "Handoff rules must cover record chain, append-only boundary, and future-only store target.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v199 must not unlock execution.");
  blockers.push({
    code: "MANAGED_AUDIT_STORE_NOT_CONNECTED",
    severity: "blocker",
    source: "managed-audit-store",
    message: "The handoff contract is ready, but a real managed audit store is still not connected.",
  });
  return blockers;
}

function collectWarnings(handoffState: RealReadWindowAuditStoreHandoffContractProfile["handoffState"]): AuditHandoffMessage[] {
  return [
    {
      code: handoffState === "blocked" ? "AUDIT_HANDOFF_BLOCKED" : "AUDIT_HANDOFF_CONTRACT_ONLY",
      severity: "warning",
      source: "real-read-window-audit-store-handoff-contract",
      message: handoffState === "blocked"
        ? "Audit handoff contract has missing source evidence."
        : "Audit handoff is a contract only; it does not write managed audit records.",
    },
  ];
}

function collectRecommendations(): AuditHandoffMessage[] {
  return [
    {
      code: "PROCEED_TO_NODE_V200_CI_ARTIFACT_MANIFEST",
      severity: "recommendation",
      source: "real-read-window-audit-store-handoff-contract",
      message: "After v199, publish a CI artifact manifest for the v191-v199 evidence chain.",
    },
  ];
}

function addMessage(
  messages: AuditHandoffMessage[],
  condition: boolean,
  code: string,
  source: AuditHandoffMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderRecord(record: AuditHandoffRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Required before production window: ${record.requiredBeforeProductionWindow}`,
    `- Target store: ${record.targetStore}`,
    `- Record kind: ${record.recordKind}`,
    `- Source evidence: ${record.sourceEvidence}`,
    `- Digest: ${record.digest}`,
    `- Append only: ${record.appendOnly}`,
    `- Read only: ${record.readOnly}`,
    `- Writes now: ${record.writesNow}`,
    "",
  ];
}

function renderRule(rule: AuditHandoffRule): string[] {
  return [
    `### ${rule.id}`,
    "",
    `- Rule: ${rule.rule}`,
    `- Satisfied for handoff: ${rule.satisfiedForHandoff}`,
    `- Satisfied for production audit: ${rule.satisfiedForProductionAudit}`,
    "",
  ];
}
