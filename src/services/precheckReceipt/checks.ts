import type { AppConfig } from "../../config.js";
import type {
  ManagedAuditRouteRegistrationTableQualityPassProfile,
} from "../managedAuditRouteRegistrationTableQualityPass.js";
import { completeChecks } from "../reportCheckAssembly.js";
import type {
  JavaV99Echo,
  MiniKvV108Receipt,
  PrecheckReceiptChecks,
  PrecheckReceiptProfile,
} from "./types.js";

type SourceNode = PrecheckReceiptProfile["sourceNodeV245"];

export function createPrecheckReceiptChecks(
  config: AppConfig,
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
  routeQuality: ManagedAuditRouteRegistrationTableQualityPassProfile,
): PrecheckReceiptChecks {
  const draft: PrecheckReceiptChecks = {
    sourceNodeV245Ready: source.readyForPrecheckPacket,
    sourceNodeV245StillReadOnly: isSourceReadOnly(source),
    javaV99EchoReady: java.readyForNodeV247Alignment,
    miniKvV108NonParticipationReady: miniKv.readyForNodeV247Alignment,
    consumerHintAcceptedForCurrentPlan: miniKv.consumerHintAcceptedForCurrentPlan,
    precheckItemCountAligned: itemCountsAlign(source, java, miniKv),
    operatorFieldCountAligned: operatorCountsAlign(source, miniKv),
    operatorFieldNamesAligned: java.fieldEchoComplete && miniKv.operatorFieldsMatchNodeV245,
    timeoutPolicyAligned: timeoutsAlign(source, java, miniKv),
    credentialBoundaryAligned: isCredentialBoundaryClosed(source, java, miniKv),
    connectionBoundaryAligned: isConnectionBoundaryClosed(source, java, miniKv),
    writeBoundaryAligned: isWriteBoundaryClosed(source, java, miniKv),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(source, java, miniKv),
    routeRegistrationAccepted: routeQuality.readyForManagedAuditRouteRegistrationTableQualityPass,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification: false,
  };

  return completeChecks(
    draft,
    "readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification",
  ).checks;
}

function isSourceReadOnly(source: SourceNode): boolean {
  return source.readOnlyPrecheckPacket
    && !source.executionAllowed
    && !source.connectsManagedAudit
    && !source.readsManagedAuditCredential
    && !source.schemaMigrationExecuted
    && !source.automaticUpstreamStart;
}

function itemCountsAlign(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return source.precheckItemCount === 7
    && java.precheckItemCount === 7
    && miniKv.sourcePrecheckItemCount === 7
    && miniKv.precheckItemsMatchNodeV245;
}

function operatorCountsAlign(source: SourceNode, miniKv: MiniKvV108Receipt): boolean {
  return source.requiredOperatorFieldCount === 6
    && miniKv.sourceRequiredOperatorFieldCount === 6
    && miniKv.operatorReviewFields.length === 6;
}

function timeoutsAlign(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return source.timeoutBudgetMs === 15000
    && java.timeoutBudgetMs === 15000
    && miniKv.sourceTimeoutBudgetMs === 15000;
}

function isCredentialBoundaryClosed(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return !source.readsManagedAuditCredential
    && !java.credentialValueEchoed
    && !java.credentialValueReadByJava
    && !miniKv.sourceReadsManagedAuditCredential
    && !miniKv.credentialValueReadAllowed;
}

function isConnectionBoundaryClosed(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return !source.connectsManagedAudit
    && !source.actualConnectionAttempted
    && !java.actualConnectionAttemptedByJava
    && !java.externalManagedAuditConnectionOpenedByJava
    && !miniKv.sourceConnectsManagedAudit
    && !miniKv.connectionExecutionAllowed;
}

function isWriteBoundaryClosed(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return !source.managedAuditStateWriteRequested
    && !source.approvalLedgerWriteRequested
    && !source.javaSqlExecutionRequested
    && !source.miniKvWritePermissionRequested
    && !java.schemaMigrationSqlExecutedByJava
    && !java.approvalLedgerWrittenByJava
    && !java.managedAuditStateWriteRequestedByJava
    && !java.miniKvWritePermissionRequestedByJava
    && !miniKv.storageWriteAllowed
    && !miniKv.managedAuditWriteExecuted
    && !miniKv.managedAuditStorageBackend;
}

function isAutoStartBoundaryClosed(
  source: SourceNode,
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): boolean {
  return !source.automaticUpstreamStart
    && !java.upstreamServiceAutoStartRequestedByJava
    && !miniKv.sourceAutomaticUpstreamStart
    && !miniKv.nodeAutoStartAllowed
    && !miniKv.javaAutoStartAllowed
    && !miniKv.miniKvAutoStartAllowed;
}
