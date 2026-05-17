export interface ReadOnlyDryRunGuards {
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
}

export interface SandboxDryRunGuards extends ReadOnlyDryRunGuards {
  readyForManagedAuditSandboxAdapterConnection: false;
  connectsManagedAudit: false;
}

export interface LocalDryRunWriteGuard {
  localDryRunWritePerformed: false;
}
