import type {
  ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
} from "../managedAuditManualSandboxConnectionPrecheckPacket.js";
import type { PrecheckReceiptProfile } from "./types.js";

export function createSourceNode(
  source: ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
): PrecheckReceiptProfile["sourceNodeV245"] {
  return {
    sourceVersion: "Node v245",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.precheckPacket.precheckDigest,
    readyForPrecheckPacket: source.readyForManagedAuditManualSandboxConnectionPrecheckPacket,
    precheckItemCount: source.summary.precheckItemCount,
    requiredOperatorFieldCount: source.summary.requiredOperatorFieldCount,
    timeoutBudgetMs: source.precheckPacket.timeoutPolicy.timeoutBudgetMs,
    readOnlyPrecheckPacket: source.readOnlyPrecheckPacket,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    actualConnectionAttempted: source.precheckPacket.boundary.actualConnectionAttempted,
    managedAuditStateWriteRequested: source.precheckPacket.boundary.managedAuditStateWriteRequested,
    approvalLedgerWriteRequested: source.precheckPacket.boundary.approvalLedgerWriteRequested,
    javaSqlExecutionRequested: source.precheckPacket.boundary.javaSqlExecutionRequested,
    miniKvWritePermissionRequested: source.precheckPacket.boundary.miniKvWritePermissionRequested,
  };
}
