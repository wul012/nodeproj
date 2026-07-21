interface MiniKvV101GateReference {
  followUpVersion: string;
  sourceEnvelopeProducer: string;
  operatorReviewFieldCount: number;
  credentialHandleOnly: boolean;
  credentialValueIncluded: boolean;
  actualConnectionAttempted: boolean;
  schemaMigrationRequested: boolean;
  managedAuditStateWriteRequested: boolean;
  upstreamServiceAutoStartRequested: boolean;
  miniKvPermissionRequested: boolean;
  readyForOperatorReview: boolean;
  readyForManagedAuditSandboxAdapterConnection: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  writeCommandsExecuted: boolean;
  adminCommandsExecuted: boolean;
  runtimeWriteObserved: boolean;
  managedAuditStore: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  credentialValueReadAllowed: boolean;
  schemaRehearsalExecutionAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  orderAuthoritative: boolean;
  historicalReceiptAnchorsStable: boolean;
}

interface MiniKvV107GateReference {
  evidencePresent: boolean;
  verificationDocumented: boolean;
  receiptVersion: string;
  releaseVersion: string;
  consumerHint: string;
  receiptDigest: string;
  sourcePackageCommandCount: number;
  sourcePackageDisabledByDefault: boolean;
  sourcePackageDryRunOnly: boolean;
  sourcePackageCarriesCredentialValue: boolean;
  sourcePackageActualConnectionAttempted: boolean;
  sourcePackageManagedAuditStateWriteRequested: boolean;
  sourcePackageSchemaMigrationRequested: boolean;
  sourcePackageMiniKvWritePermissionRequested: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  credentialValueReadAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStore: boolean;
  orderAuthoritative: boolean;
}

export function miniKvV101GateReady(
  reference: MiniKvV101GateReference,
  evidencePresent: boolean,
  acceptedVersion: boolean,
): boolean {
  return evidencePresent
    && reference.followUpVersion === "mini-kv-runtime-no-start-no-write-follow-up.v1"
    && acceptedVersion
    && v101EnvelopeReady(reference)
    && v101RuntimeClosed(reference)
    && reference.historicalReceiptAnchorsStable;
}

function v101EnvelopeReady(reference: MiniKvV101GateReference): boolean {
  return reference.sourceEnvelopeProducer === "Node v236 manual sandbox connection dry-run request envelope"
    && reference.operatorReviewFieldCount === 6
    && reference.credentialHandleOnly
    && !reference.credentialValueIncluded
    && !reference.actualConnectionAttempted
    && !reference.schemaMigrationRequested
    && !reference.managedAuditStateWriteRequested
    && !reference.upstreamServiceAutoStartRequested
    && !reference.miniKvPermissionRequested
    && reference.readyForOperatorReview
    && !reference.readyForManagedAuditSandboxAdapterConnection;
}

function v101RuntimeClosed(reference: MiniKvV101GateReference): boolean {
  return reference.readOnly
    && !reference.executionAllowed
    && !reference.nodeAutoStartAllowed
    && !reference.javaAutoStartAllowed
    && !reference.miniKvAutoStartAllowed
    && !reference.connectionExecutionAllowed
    && !reference.writeCommandsExecuted
    && !reference.adminCommandsExecuted
    && !reference.runtimeWriteObserved
    && !reference.managedAuditStore
    && !reference.storageWriteAllowed
    && !reference.managedAuditWriteExecuted
    && !reference.sandboxManagedAuditStateWriteAllowed
    && !reference.credentialValueReadAllowed
    && !reference.schemaRehearsalExecutionAllowed
    && !reference.schemaMigrationExecutionAllowed
    && !reference.restoreExecutionAllowed
    && !reference.loadRestoreCompactExecuted
    && !reference.orderAuthoritative;
}

export function miniKvV107AlignmentReady(reference: MiniKvV107GateReference): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && v107ReceiptReady(reference)
    && v107RuntimeClosed(reference);
}

function v107ReceiptReady(reference: MiniKvV107GateReference): boolean {
  return reference.receiptVersion === "mini-kv-manual-sandbox-dry-run-command-non-participation-receipt.v1"
    && reference.releaseVersion === "v107"
    && reference.consumerHint === "Node v244 manual sandbox dry-run command upstream echo verification"
    && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
    && reference.sourcePackageCommandCount === 6
    && reference.sourcePackageDisabledByDefault
    && reference.sourcePackageDryRunOnly
    && !reference.sourcePackageCarriesCredentialValue
    && !reference.sourcePackageActualConnectionAttempted
    && !reference.sourcePackageManagedAuditStateWriteRequested
    && !reference.sourcePackageSchemaMigrationRequested
    && !reference.sourcePackageMiniKvWritePermissionRequested;
}

function v107RuntimeClosed(reference: MiniKvV107GateReference): boolean {
  return reference.readOnly
    && !reference.executionAllowed
    && !reference.nodeAutoStartAllowed
    && !reference.javaAutoStartAllowed
    && !reference.miniKvAutoStartAllowed
    && !reference.connectionExecutionAllowed
    && !reference.storageWriteAllowed
    && !reference.managedAuditWriteExecuted
    && !reference.credentialValueReadAllowed
    && !reference.schemaMigrationExecutionAllowed
    && !reference.loadRestoreCompactExecuted
    && !reference.setnxexExecutionAllowed
    && !reference.managedAuditStore
    && !reference.orderAuthoritative;
}
