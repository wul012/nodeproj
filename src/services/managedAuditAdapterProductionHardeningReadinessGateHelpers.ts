import { sha256StableJson } from "./liveProbeReportUtils.js";

export interface ManagedAuditAdapterProductionHardeningReadinessGateChecks {
  nodeV216ArchiveVerificationReady: boolean;
  javaV78ReceiptAccepted: boolean;
  javaV78PrerequisitesRecorded: boolean;
  javaV78NoWriteBoundaryValid: boolean;
  miniKvV87ReceiptAccepted: boolean;
  miniKvV87NonAuthoritativeBoundaryValid: boolean;
  managedAuditStoreUrlConfigured: boolean;
  realManagedAuditAdapterStillDisconnected: boolean;
  operatorIdentityPrerequisiteRecorded: boolean;
  approvalDecisionSourcePrerequisiteRecorded: boolean;
  ledgerHandoffPrerequisiteRecorded: boolean;
  retentionOwnerPrerequisiteRecorded: boolean;
  failureHandlingPrerequisiteRecorded: boolean;
  rollbackReviewPrerequisiteRecorded: boolean;
  javaMiniKvWritesStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditAdapterProductionHardeningReadinessGate: boolean;
}

export interface ReadinessGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-production-hardening-readiness-gate"
    | "node-v216-archive-verification"
    | "java-v78-production-adapter-prerequisite-receipt"
    | "mini-kv-v87-non-authoritative-storage-receipt"
    | "runtime-config";
  message: string;
}

export const MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_ENDPOINTS = Object.freeze({
  managedAuditAdapterProductionHardeningReadinessGateJson:
    "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate",
  managedAuditAdapterProductionHardeningReadinessGateMarkdown:
    "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate?format=markdown",
  sourceArchiveVerificationJson: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification",
  javaV78ReceiptHint: "advanced-order-platform:c/78/\u89e3\u91ca/\u8bf4\u660e.md",
  miniKvV87ReceiptHint: "mini-kv:c/87/\u89e3\u91ca/\u8bf4\u660e.md",
  activePlan: "docs/plans/v215-post-dry-run-adapter-roadmap.md",
});

export const MANAGED_AUDIT_ADAPTER_PRODUCTION_HARDENING_PREREQUISITES = Object.freeze([
  "managed audit store target configured",
  "operator identity prerequisite recorded",
  "approval decision source prerequisite recorded",
  "approval ledger handoff prerequisite recorded",
  "retention and recovery owner recorded",
  "failure handling taxonomy recorded",
  "rollback review prerequisite recorded",
  "mini-kv non-authoritative storage boundary recorded",
]);

export function createManagedAuditAdapterProductionHardeningGateDigest(input: {
  gateState: "ready-for-production-hardening-review" | "blocked";
  sourceArchiveDigest: string;
  javaReceiptVersion: string;
  miniKvReceiptDigest: string;
  checks: ManagedAuditAdapterProductionHardeningReadinessGateChecks;
}): string {
  return sha256StableJson({
    profileVersion: "managed-audit-adapter-production-hardening-readiness-gate.v1",
    gateState: input.gateState,
    sourceArchiveDigest: input.sourceArchiveDigest,
    javaReceiptVersion: input.javaReceiptVersion,
    miniKvReceiptDigest: input.miniKvReceiptDigest,
    checks: input.checks,
    productionAuditAllowed: false,
  });
}

export function collectReadinessGateProductionBlockers(
  checks: ManagedAuditAdapterProductionHardeningReadinessGateChecks,
): ReadinessGateMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ReadinessGateMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.nodeV216ArchiveVerificationReady,
      code: "NODE_V216_ARCHIVE_VERIFICATION_NOT_READY",
      source: "node-v216-archive-verification",
      message: "Node v216 dry-run adapter archive verification must be ready before v217 can review production hardening.",
    },
    {
      condition: checks.javaV78ReceiptAccepted,
      code: "JAVA_V78_RECEIPT_NOT_ACCEPTED",
      source: "java-v78-production-adapter-prerequisite-receipt",
      message: "Java v78 production adapter prerequisite receipt is missing or not accepted.",
    },
    {
      condition: checks.miniKvV87ReceiptAccepted,
      code: "MINI_KV_V87_RECEIPT_NOT_ACCEPTED",
      source: "mini-kv-v87-non-authoritative-storage-receipt",
      message: "mini-kv v87 non-authoritative storage receipt is missing or not accepted.",
    },
    {
      condition: checks.javaV78NoWriteBoundaryValid && checks.miniKvV87NonAuthoritativeBoundaryValid,
      code: "UPSTREAM_WRITE_BOUNDARY_NOT_VALID",
      source: "managed-audit-adapter-production-hardening-readiness-gate",
      message: "Java or mini-kv receipts do not preserve the no-write production boundary.",
    },
    {
      condition: checks.managedAuditStoreUrlConfigured,
      code: "AUDIT_STORE_URL_MISSING",
      source: "runtime-config",
      message: "AUDIT_STORE_URL must identify the future managed audit target before production hardening review is meaningful.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false while v217 is only a readiness gate.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

export function collectReadinessGateWarnings(): ReadinessGateMessage[] {
  return [
    {
      code: "REAL_MANAGED_AUDIT_ADAPTER_STILL_MISSING",
      severity: "warning",
      source: "managed-audit-adapter-production-hardening-readiness-gate",
      message: "The gate can be ready for hardening review while the real managed audit adapter remains disconnected.",
    },
    {
      code: "STATIC_UPSTREAM_RECEIPT_CONSUMPTION",
      severity: "warning",
      source: "managed-audit-adapter-production-hardening-readiness-gate",
      message: "Java v78 and mini-kv v87 receipts are consumed as versioned evidence, not by starting those services.",
    },
  ];
}

export function collectReadinessGateRecommendations(): ReadinessGateMessage[] {
  return [
    {
      code: "SPLIT_AUDIT_ROUTE_REGISTRATION",
      severity: "recommendation",
      source: "managed-audit-adapter-production-hardening-readiness-gate",
      message: "Before adding real adapter wiring, extract common audit JSON/Markdown route registration to keep auditRoutes maintainable.",
    },
    {
      code: "IMPLEMENT_REAL_ADAPTER_BEHIND_EXPLICIT_CONFIG",
      severity: "recommendation",
      source: "runtime-config",
      message: "The real adapter should remain behind explicit config, owner approval, retention policy, restore drill, and rollback review.",
    },
  ];
}
