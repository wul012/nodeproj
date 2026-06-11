import type { AppConfig } from "../config.js";
import { SHA256_HEX } from "./managedAuditManualSandboxConnectionReadinessGateConstants.js";
import type {
  JavaV92DryRunEnvelopeEchoReceiptReference,
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
  ManualSandboxConnectionReadinessGateChecks,
  ManualSandboxConnectionReadinessGateMessage,
  MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";

export function createChecks(
  config: AppConfig,
  source: ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"],
  javaV92: JavaV92DryRunEnvelopeEchoReceiptReference,
  miniKvV101: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
  gate: ManagedAuditManualSandboxConnectionReadinessGateProfile["readinessGate"],
): ManualSandboxConnectionReadinessGateChecks {
  return {
    sourceNodeV236DryRunEnvelopeReady:
      source.readyForDryRunRequestEnvelope
      && source.envelopeState === "manual-sandbox-connection-dry-run-request-envelope-ready",
    sourceEnvelopeDigestPresent: SHA256_HEX.test(source.envelopeDigest),
    sourceStillHandleOnlyAndNonExecuting:
      source.operatorReviewFieldCount === 6
      && source.credentialHandleOnly
      && !source.credentialValueIncluded
      && !source.actualConnectionAttempted
      && !source.readyForSandboxAdapterConnectionFromSource
      && !source.connectsManagedAudit
      && !source.readsManagedAuditCredential
      && !source.schemaMigrationExecuted,
    javaV92EvidencePresent: javaV92.evidencePresent,
    javaV92EchoReceiptAccepted: javaV92.readyForNodeV237Gate,
    javaV92BoundaryAccepted: javaV92.allEnvelopeFieldsEchoed
      && javaV92.credentialHandleOnly
      && !javaV92.credentialValueIncludedInEnvelope
      && !javaV92.credentialValueReadByJava
      && !javaV92.actualConnectionAttemptedByJava
      && !javaV92.schemaMigrationSqlExecutedByJava
      && !javaV92.approvalLedgerWrittenByJava
      && !javaV92.managedAuditStoreWrittenByJava
      && !javaV92.readyForManagedAuditSandboxAdapterConnection,
    miniKvV101EvidencePresent: miniKvV101.evidencePresent,
    miniKvV101FollowUpAccepted: miniKvV101.readyForNodeV237Gate,
    miniKvV101BoundaryAccepted: miniKvV101.readOnly
      && !miniKvV101.executionAllowed
      && !miniKvV101.nodeAutoStartAllowed
      && !miniKvV101.javaAutoStartAllowed
      && !miniKvV101.miniKvAutoStartAllowed
      && !miniKvV101.connectionExecutionAllowed
      && !miniKvV101.writeCommandsExecuted
      && !miniKvV101.adminCommandsExecuted
      && !miniKvV101.runtimeWriteObserved
      && !miniKvV101.managedAuditStore
      && !miniKvV101.storageWriteAllowed
      && !miniKvV101.managedAuditWriteExecuted
      && !miniKvV101.sandboxManagedAuditStateWriteAllowed
      && !miniKvV101.credentialValueReadAllowed
      && !miniKvV101.schemaRehearsalExecutionAllowed
      && !miniKvV101.schemaMigrationExecutionAllowed
      && !miniKvV101.restoreExecutionAllowed
      && !miniKvV101.loadRestoreCompactExecuted
      && !miniKvV101.orderAuthoritative,
    readinessGateDigestPresent: SHA256_HEX.test(gate.gateDigest),
    readyForOperatorWindowChecklist: gate.readyForOperatorWindowChecklist,
    noCredentialValueRead: !gate.credentialValueRead,
    noConnectionAttempted: !gate.actualConnectionAttempted,
    noSchemaMigrationRequested: !gate.schemaMigrationRequested,
    noManagedAuditStateWriteRequested: !gate.managedAuditStateWriteRequested,
    noUpstreamServiceAutoStartRequested: !gate.upstreamServiceAutoStartRequested,
    noMiniKvExecutionPermissionInferred: !gate.miniKvExecutionPermissionInferred,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionReadinessGate: false,
  };
}

export function collectProductionBlockers(
  checks: ManualSandboxConnectionReadinessGateChecks,
): ManualSandboxConnectionReadinessGateMessage[] {
  const blockers: ManualSandboxConnectionReadinessGateMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV236DryRunEnvelopeReady, "NODE_V236_DRY_RUN_ENVELOPE_NOT_READY", "node-v236-dry-run-request-envelope", "Node v236 dry-run request envelope must be ready before v237 readiness gate.");
  addBlocker(blockers, checks.sourceStillHandleOnlyAndNonExecuting, "NODE_V236_ENVELOPE_BOUNDARY_DRIFTED", "node-v236-dry-run-request-envelope", "Node v236 envelope must remain handle-only and non-executing.");
  addBlocker(blockers, checks.javaV92EchoReceiptAccepted, "JAVA_V92_ECHO_RECEIPT_NOT_ACCEPTED", "java-v92-dry-run-envelope-echo-receipt", "Java v92 must echo the Node v236 envelope fields and keep no credential/connection/SQL/ledger boundaries.");
  addBlocker(blockers, checks.miniKvV101FollowUpAccepted, "MINIKV_V101_NO_START_NO_WRITE_NOT_ACCEPTED", "mini-kv-v101-runtime-no-start-no-write-follow-up", "mini-kv v101 must prove no-start/no-write/no-credential/no-restore runtime boundaries.");
  addBlocker(blockers, checks.readyForOperatorWindowChecklist, "OPERATOR_WINDOW_CHECKLIST_NOT_READY", "managed-audit-manual-sandbox-connection-readiness-gate", "v237 may only advance to an operator window checklist after Node v236, Java v92, and mini-kv v101 are aligned.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  return blockers;
}

export function collectWarnings(): ManualSandboxConnectionReadinessGateMessage[] {
  return [
    {
      code: "READINESS_GATE_IS_NOT_CONNECTION_APPROVAL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "The gate is ready for an operator window checklist only; it is not approval to open a managed audit sandbox connection.",
    },
    {
      code: "REAL_CONNECTION_REMAINS_PAUSED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "Real connection, credential value reads, schema migration, audit writes, and upstream auto-start remain blocked.",
    },
  ];
}

export function collectRecommendations(): ManualSandboxConnectionReadinessGateMessage[] {
  return [
    {
      code: "NEXT_NODE_V238_OPERATOR_WINDOW_CHECKLIST",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-readiness-gate",
      message: "Use Node v238 to produce a manual operator window checklist before any connection execution discussion.",
    },
    {
      code: "KEEP_UPSTREAM_ACTIONS_DISABLED",
      severity: "recommendation",
      source: "runtime-config",
      message: "Keep UPSTREAM_ACTIONS_ENABLED=false until a separate human approval window exists.",
    },
  ];
}

function addBlocker(
  messages: ManualSandboxConnectionReadinessGateMessage[],
  condition: boolean,
  code: string,
  source: ManualSandboxConnectionReadinessGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}
