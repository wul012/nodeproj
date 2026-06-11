import type { AppConfig } from "../config.js";
import {
  ALLOWED_OUTPUTS,
  CONTRACT_ASSERTIONS,
  PROHIBITED_ACTIONS,
  PROHIBITED_INPUTS,
  REQUIRED_ARTIFACTS,
  REQUIRED_INPUTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationConstants.js";
import type {
  DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
  DisabledFakeHarnessContractUpstreamEchoVerificationMessage,
  JavaV122V126DisabledFakeHarnessEvidenceReference,
  MiniKvV127DisabledFakeHarnessNonParticipationReference,
  SourceNodeV288DisabledFakeHarnessContractReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export function createChecks(
  config: AppConfig,
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
): DisabledFakeHarnessContractUpstreamEchoVerificationChecks {
  const sourceNodeV288Ready =
    sourceNodeV288.contractState === "disabled-fake-harness-contract-ready"
    && sourceNodeV288.readyForDisabledFakeHarnessContract
    && sourceNodeV288.readyForJavaV122MiniKvV127ParallelEcho
    && sourceNodeV288.sourceProductionBlockerCount === 0
    && sourceNodeV288.javaEchoRequiredNow
    && sourceNodeV288.miniKvEchoRequiredNow;
  const sourceNodeV288ContractStillDisabled =
    !sourceNodeV288.realResolverImplementationAllowed
    && !sourceNodeV288.testOnlyFakeHarnessAllowed
    && !sourceNodeV288.testOnlyFakeHarnessExecutionAllowed
    && !sourceNodeV288.fakeHarnessRuntimeEnabled
    && !sourceNodeV288.fakeHarnessInvocationAllowed
    && !sourceNodeV288.executionAllowed
    && !sourceNodeV288.connectsManagedAudit
    && !sourceNodeV288.credentialValueRead
    && !sourceNodeV288.credentialValueProvided
    && !sourceNodeV288.rawEndpointUrlParsed
    && !sourceNodeV288.rawEndpointUrlRendered
    && !sourceNodeV288.externalRequestSent
    && !sourceNodeV288.secretProviderInstantiated
    && !sourceNodeV288.resolverClientInstantiated
    && !sourceNodeV288.fakeSecretProviderInstantiated
    && !sourceNodeV288.fakeResolverClientInstantiated
    && !sourceNodeV288.schemaMigrationExecuted
    && !sourceNodeV288.approvalLedgerWritten
    && !sourceNodeV288.automaticUpstreamStart;
  const javaV122V126EvidenceReady =
    javaV122V126.evidencePresent
    && javaV122V126.verificationDocumented
    && javaV122V126.integrationTestSplitComplete
    && javaV122V126.evidenceServiceCatalogStopgapApplied
    && javaV122V126.boundaryCatalogPresent;
  const javaDocumentsRuntimeBoundaries =
    javaV122V126.noFakeHarnessRuntimeDocumented
    && javaV122V126.credentialValueBoundaryDocumented
    && javaV122V126.rawEndpointBoundaryDocumented
    && javaV122V126.managedAuditConnectionBoundaryDocumented
    && javaV122V126.ledgerAndSqlBoundaryDocumented
    && javaV122V126.didNotModifyProductionCodeDuringV122V125
    && javaV122V126.v126RefactorOnly;
  const miniKvV127ReceiptReady =
    miniKvV127.evidencePresent
    && miniKvV127.verificationDocumented
    && miniKvV127.receiptVersion === "mini-kv-credential-resolver-disabled-fake-harness-non-participation-receipt.v1"
    && miniKvV127.releaseVersion === "v127"
    && miniKvV127.consumerHint === "Node v289 disabled fake harness contract upstream echo verification"
    && miniKvV127.sourceContract === "Node v288 disabled fake harness contract"
    && miniKvV127.sourceReadyForDisabledFakeHarnessContract === true
    && miniKvV127.readyForNodeV289UpstreamEchoVerification === true
    && miniKvV127.readOnly === true
    && miniKvV127.executionAllowed === false;
  const miniKvV127EchoesNodeV288Contract =
    miniKvV127.consumesNodeV288DisabledFakeHarnessContract === true
    && miniKvV127.sourceProfileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1"
    && miniKvV127.sourceContractState === "disabled-fake-harness-contract-ready"
    && miniKvV127.sourceReadOnlyContract === true
    && miniKvV127.sourceDisabledFakeHarnessContractOnly === true
    && miniKvV127.disabledFakeHarnessContractOnly === true
    && miniKvV127.disabledFakeHarnessNonParticipationReceiptOnly === true;
  const miniKvV127KeepsRuntimeSideEffectsBlocked =
    miniKvV127.fakeHarnessRuntimeEnabled === false
    && miniKvV127.fakeHarnessInvocationAllowed === false
    && miniKvV127.fakeHarnessRuntimeImplemented === false
    && miniKvV127.fakeHarnessRuntimeInvoked === false
    && miniKvV127.credentialResolverImplemented === false
    && miniKvV127.credentialResolverInvoked === false
    && miniKvV127.resolverClientInstantiated === false
    && miniKvV127.secretProviderInstantiated === false
    && miniKvV127.fakeSecretProviderInstantiated === false
    && miniKvV127.fakeResolverClientInstantiated === false
    && miniKvV127.credentialValueReadAllowed === false
    && miniKvV127.credentialValueRead === false
    && miniKvV127.credentialValueProvided === false
    && miniKvV127.credentialValueLoaded === false
    && miniKvV127.credentialValueStored === false
    && miniKvV127.credentialValueIncluded === false
    && miniKvV127.credentialValueRendered === false
    && miniKvV127.rawEndpointUrlParseAllowed === false
    && miniKvV127.rawEndpointUrlRenderAllowed === false
    && miniKvV127.rawEndpointUrlParsed === false
    && miniKvV127.rawEndpointUrlRendered === false
    && miniKvV127.rawEndpointUrlProvided === false
    && miniKvV127.rawEndpointUrlIncluded === false
    && miniKvV127.externalRequestAllowed === false
    && miniKvV127.externalRequestSent === false
    && miniKvV127.httpTcpDialAllowed === false
    && miniKvV127.connectsManagedAudit === false
    && miniKvV127.readsManagedAuditCredential === false
    && miniKvV127.storesManagedAuditCredential === false
    && miniKvV127.managedAuditStore === false
    && miniKvV127.managedAuditStorageBackend === false
    && miniKvV127.sandboxAuditStorageBackend === false
    && miniKvV127.storageWriteAllowed === false
    && miniKvV127.writeCommandsExecuted === false
    && miniKvV127.adminCommandsExecuted === false
    && miniKvV127.runtimeWriteObserved === false
    && miniKvV127.approvalLedgerWriteAllowed === false
    && miniKvV127.approvalLedgerWritten === false
    && miniKvV127.approvalLedgerWriteExecuted === false
    && miniKvV127.managedAuditWriteExecuted === false
    && miniKvV127.productionRecordWritten === false
    && miniKvV127.schemaMigrationAllowed === false
    && miniKvV127.schemaMigrationExecuted === false
    && miniKvV127.restoreExecutionAllowed === false
    && miniKvV127.loadRestoreCompactExecuted === false
    && miniKvV127.setnxexExecutionAllowed === false
    && miniKvV127.automaticUpstreamStartAllowed === false
    && miniKvV127.automaticUpstreamStart === false
    && miniKvV127.auditAuthoritative === false
    && miniKvV127.orderAuthoritative === false;
  const credentialBoundaryClosed =
    !sourceNodeV288.credentialValueRead
    && !sourceNodeV288.credentialValueProvided
    && javaV122V126.credentialValueBoundaryDocumented
    && miniKvV127.credentialValueReadAllowed === false
    && miniKvV127.credentialValueRead === false
    && miniKvV127.credentialValueProvided === false
    && miniKvV127.credentialValueLoaded === false
    && miniKvV127.credentialValueStored === false
    && miniKvV127.credentialValueIncluded === false
    && miniKvV127.credentialValueRendered === false;
  const rawEndpointBoundaryClosed =
    !sourceNodeV288.rawEndpointUrlParsed
    && !sourceNodeV288.rawEndpointUrlRendered
    && javaV122V126.rawEndpointBoundaryDocumented
    && miniKvV127.rawEndpointUrlParseAllowed === false
    && miniKvV127.rawEndpointUrlRenderAllowed === false
    && miniKvV127.rawEndpointUrlParsed === false
    && miniKvV127.rawEndpointUrlRendered === false
    && miniKvV127.rawEndpointUrlProvided === false
    && miniKvV127.rawEndpointUrlIncluded === false;
  const providerClientBoundaryClosed =
    !sourceNodeV288.secretProviderInstantiated
    && !sourceNodeV288.resolverClientInstantiated
    && !sourceNodeV288.fakeSecretProviderInstantiated
    && !sourceNodeV288.fakeResolverClientInstantiated
    && miniKvV127.secretProviderInstantiated === false
    && miniKvV127.resolverClientInstantiated === false
    && miniKvV127.fakeSecretProviderInstantiated === false
    && miniKvV127.fakeResolverClientInstantiated === false;
  const connectionBoundaryClosed =
    !sourceNodeV288.connectsManagedAudit
    && !sourceNodeV288.externalRequestSent
    && javaV122V126.managedAuditConnectionBoundaryDocumented
    && miniKvV127.externalRequestAllowed === false
    && miniKvV127.externalRequestSent === false
    && miniKvV127.httpTcpDialAllowed === false
    && miniKvV127.connectsManagedAudit === false;
  const writeBoundaryClosed =
    !sourceNodeV288.executionAllowed
    && !sourceNodeV288.schemaMigrationExecuted
    && !sourceNodeV288.approvalLedgerWritten
    && javaV122V126.ledgerAndSqlBoundaryDocumented
    && miniKvV127.storageWriteAllowed === false
    && miniKvV127.writeCommandsExecuted === false
    && miniKvV127.adminCommandsExecuted === false
    && miniKvV127.runtimeWriteObserved === false
    && miniKvV127.approvalLedgerWriteAllowed === false
    && miniKvV127.approvalLedgerWritten === false
    && miniKvV127.approvalLedgerWriteExecuted === false
    && miniKvV127.managedAuditWriteExecuted === false
    && miniKvV127.productionRecordWritten === false
    && miniKvV127.schemaMigrationAllowed === false
    && miniKvV127.schemaMigrationExecuted === false
    && miniKvV127.restoreExecutionAllowed === false
    && miniKvV127.loadRestoreCompactExecuted === false
    && miniKvV127.setnxexExecutionAllowed === false;
  const autoStartBoundaryClosed =
    !sourceNodeV288.automaticUpstreamStart
    && miniKvV127.automaticUpstreamStartAllowed === false
    && miniKvV127.automaticUpstreamStart === false;
  const authorityBoundaryClosed =
    miniKvV127.auditAuthoritative === false
    && miniKvV127.orderAuthoritative === false
    && miniKvV127.managedAuditStore === false
    && miniKvV127.managedAuditStorageBackend === false
    && miniKvV127.sandboxAuditStorageBackend === false;
  const sideEffectBoundaryClosed =
    credentialBoundaryClosed
    && rawEndpointBoundaryClosed
    && providerClientBoundaryClosed
    && connectionBoundaryClosed
    && writeBoundaryClosed
    && autoStartBoundaryClosed
    && authorityBoundaryClosed
    && javaDocumentsRuntimeBoundaries
    && sourceNodeV288ContractStillDisabled
    && miniKvV127KeepsRuntimeSideEffectsBlocked;

  return {
    sourceNodeV288Ready,
    sourceNodeV288ContractStillDisabled,
    javaV122V126EvidenceReady,
    javaIntegrationTestSplitsComplete: javaV122V126.integrationTestSplitComplete,
    javaCatalogStopgapApplied: javaV122V126.evidenceServiceCatalogStopgapApplied,
    javaDocumentsRuntimeBoundaries,
    miniKvV127ReceiptReady,
    miniKvV127EchoesNodeV288Contract,
    miniKvV127KeepsRuntimeSideEffectsBlocked,
    contractDigestAlignedWithMiniKv: miniKvV127.contractDigest === sourceNodeV288.contractDigest,
    requiredInputsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredInputs, REQUIRED_INPUTS),
    allowedOutputsAlignedWithMiniKv: arraysEqual(miniKvV127.allowedOutputs, ALLOWED_OUTPUTS),
    prohibitedInputsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedInputs, PROHIBITED_INPUTS),
    requiredArtifactsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredArtifacts, REQUIRED_ARTIFACTS),
    contractAssertionsAlignedWithMiniKv: arraysEqual(miniKvV127.contractAssertions, CONTRACT_ASSERTIONS),
    prohibitedActionsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedActions, PROHIBITED_ACTIONS),
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    providerClientBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    authorityBoundaryClosed,
    sideEffectBoundaryClosed,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
      false,
  };
}

export function collectProductionBlockers(
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledFakeHarnessContractUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV288Ready,
      code: "NODE_V288_CONTRACT_NOT_READY",
      source: "node-v288-disabled-fake-harness-contract",
      message: "Node v288 disabled fake harness contract must be ready before Node v289 verifies upstream echoes.",
    },
    {
      condition: checks.sourceNodeV288ContractStillDisabled,
      code: "NODE_V288_CONTRACT_OPENED_RUNTIME",
      source: "node-v288-disabled-fake-harness-contract",
      message: "Node v288 must still keep fake harness runtime, provider/client instantiation, HTTP/TCP, and writes disabled.",
    },
    {
      condition: checks.javaV122V126EvidenceReady,
      code: "JAVA_V122_V126_EVIDENCE_NOT_READY",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v126 runbooks and catalog evidence must be present before Node v289.",
    },
    {
      condition: checks.javaIntegrationTestSplitsComplete,
      code: "JAVA_INTEGRATION_SPLITS_INCOMPLETE",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v125 integration test split evidence must remain complete.",
    },
    {
      condition: checks.javaCatalogStopgapApplied,
      code: "JAVA_CATALOG_STOPGAP_MISSING",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v126 catalog stopgap must be present so repeated boundary constants do not drift.",
    },
    {
      condition: checks.javaDocumentsRuntimeBoundaries,
      code: "JAVA_RUNTIME_BOUNDARY_NOT_DOCUMENTED",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java evidence must explicitly keep fake harness runtime, credential values, raw endpoints, managed audit, ledger, and SQL blocked.",
    },
    {
      condition: checks.miniKvV127ReceiptReady,
      code: "MINI_KV_V127_RECEIPT_NOT_READY",
      source: "mini-kv-v127-disabled-fake-harness-non-participation-receipt",
      message: "mini-kv v127 non-participation receipt must be present and ready for Node v289.",
    },
    {
      condition: checks.miniKvV127EchoesNodeV288Contract,
      code: "MINI_KV_V127_CONTRACT_ECHO_MISSING",
      source: "mini-kv-v127-disabled-fake-harness-non-participation-receipt",
      message: "mini-kv v127 must echo the Node v288 disabled fake harness contract identity and closed-state semantics.",
    },
    {
      condition: checks.contractDigestAlignedWithMiniKv,
      code: "CONTRACT_DIGEST_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "mini-kv v127 contract digest must match the Node v288 disabled fake harness contract digest.",
    },
    {
      condition:
        checks.requiredInputsAlignedWithMiniKv
        && checks.allowedOutputsAlignedWithMiniKv
        && checks.prohibitedInputsAlignedWithMiniKv
        && checks.requiredArtifactsAlignedWithMiniKv
        && checks.contractAssertionsAlignedWithMiniKv
        && checks.prohibitedActionsAlignedWithMiniKv,
      code: "CONTRACT_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "mini-kv v127 must echo Node v288 inputs, outputs, artifacts, assertions, and prohibited actions without shape drift.",
    },
    {
      condition: checks.sideEffectBoundaryClosed,
      code: "SIDE_EFFECT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "Credential, endpoint, provider/client, connection, write, auto-start, and authority boundaries must remain closed across all three projects.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v289 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v289 upstream echo verification.",
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

export function collectWarnings(): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY_NO_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "v289 only verifies upstream echo evidence; it does not create a fake harness runtime or resolver client.",
    },
    {
      code: "JAVA_EVIDENCE_IS_FILE_SCAN",
      severity: "warning",
      source: "java-v122-v126-quality-and-echo-evidence",
      message: "Java v122-v126 is consumed as runbook/catalog evidence, while mini-kv v127 is consumed as structured JSON receipt.",
    },
  ];
}

export function collectRecommendations(): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_NEXT_PLAN_AFTER_V289",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "After v289, start a fresh plan from the verified disabled fake harness echo baseline instead of appending duplicate versions.",
    },
    {
      code: "KEEP_NEXT_STEP_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification",
      message: "The next version may plan a disabled shell or preflight, but should keep runtime execution, credential values, raw endpoints, HTTP/TCP, and writes blocked.",
    },
  ];
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}
