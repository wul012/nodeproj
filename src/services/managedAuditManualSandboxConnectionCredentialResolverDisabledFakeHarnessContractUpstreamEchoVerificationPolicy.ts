import type { AppConfig } from "../config.js";
import {
  ALLOWED_OUTPUTS,
  CONTRACT_ASSERTIONS,
  PROHIBITED_ACTIONS,
  PROHIBITED_INPUTS,
  REQUIRED_ARTIFACTS,
  REQUIRED_INPUTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationConstants.js";
import {
  JAVA_BOUNDARY_FIELDS,
  JAVA_EVIDENCE_FIELDS,
  MINIKV_AUTHORITY_FIELDS,
  MINIKV_AUTO_START_FIELDS,
  MINIKV_CONNECTION_FIELDS,
  MINIKV_CONTRACT_TRUE_FIELDS,
  MINIKV_CREDENTIAL_FIELDS,
  MINIKV_ENDPOINT_FIELDS,
  MINIKV_PROVIDER_FIELDS,
  MINIKV_RECEIPT_TRUE_FIELDS,
  MINIKV_RUNTIME_FALSE_FIELDS,
  MINIKV_WRITE_FIELDS,
  SOURCE_AUTO_START_FIELDS,
  SOURCE_CONNECTION_FIELDS,
  SOURCE_CREDENTIAL_FIELDS,
  SOURCE_DISABLED_FIELDS,
  SOURCE_ENDPOINT_FIELDS,
  SOURCE_PROVIDER_FIELDS,
  SOURCE_WRITE_FIELDS,
} from "./credentialPolicy/disabledHarnessFields.js";
import {
  allBooleanFieldsAre,
  collectFailedReportRules,
  type ReportRule,
} from "./liveProbeReportUtils.js";
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
  const sourceChecks = createDisabledSourceChecks(sourceNodeV288, javaV122V126, miniKvV127);
  const boundaryChecks = createDisabledBoundaryChecks(
    sourceNodeV288,
    javaV122V126,
    miniKvV127,
    sourceChecks,
  );

  return {
    ...sourceChecks,
    contractDigestAlignedWithMiniKv: miniKvV127.contractDigest === sourceNodeV288.contractDigest,
    requiredInputsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredInputs, REQUIRED_INPUTS),
    allowedOutputsAlignedWithMiniKv: arraysEqual(miniKvV127.allowedOutputs, ALLOWED_OUTPUTS),
    prohibitedInputsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedInputs, PROHIBITED_INPUTS),
    requiredArtifactsAlignedWithMiniKv: arraysEqual(miniKvV127.requiredArtifacts, REQUIRED_ARTIFACTS),
    contractAssertionsAlignedWithMiniKv: arraysEqual(miniKvV127.contractAssertions, CONTRACT_ASSERTIONS),
    prohibitedActionsAlignedWithMiniKv: arraysEqual(miniKvV127.prohibitedActions, PROHIBITED_ACTIONS),
    ...boundaryChecks,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
      false,
  };
}

function createDisabledSourceChecks(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
) {
  const sourceNodeV288Ready =
    sourceNodeV288.contractState === "disabled-fake-harness-contract-ready"
    && sourceNodeV288.readyForDisabledFakeHarnessContract
    && sourceNodeV288.readyForJavaV122MiniKvV127ParallelEcho
    && sourceNodeV288.sourceProductionBlockerCount === 0
    && sourceNodeV288.javaEchoRequiredNow
    && sourceNodeV288.miniKvEchoRequiredNow;
  const sourceNodeV288ContractStillDisabled = allBooleanFieldsAre(
    sourceNodeV288,
    SOURCE_DISABLED_FIELDS,
    false,
  );
  const javaV122V126EvidenceReady = allBooleanFieldsAre(
    javaV122V126,
    JAVA_EVIDENCE_FIELDS,
    true,
  );
  const javaDocumentsRuntimeBoundaries = allBooleanFieldsAre(
    javaV122V126,
    JAVA_BOUNDARY_FIELDS,
    true,
  );
  const miniKvV127ReceiptReady =
    allBooleanFieldsAre(miniKvV127, MINIKV_RECEIPT_TRUE_FIELDS, true)
    && miniKvV127.receiptVersion === "mini-kv-credential-resolver-disabled-fake-harness-non-participation-receipt.v1"
    && miniKvV127.releaseVersion === "v127"
    && miniKvV127.consumerHint === "Node v289 disabled fake harness contract upstream echo verification"
    && miniKvV127.sourceContract === "Node v288 disabled fake harness contract"
    && miniKvV127.executionAllowed === false;
  const miniKvV127EchoesNodeV288Contract =
    allBooleanFieldsAre(miniKvV127, MINIKV_CONTRACT_TRUE_FIELDS, true)
    && miniKvV127.sourceProfileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1"
    && miniKvV127.sourceContractState === "disabled-fake-harness-contract-ready";
  const miniKvV127KeepsRuntimeSideEffectsBlocked = allBooleanFieldsAre(
    miniKvV127,
    MINIKV_RUNTIME_FALSE_FIELDS,
    false,
  );

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
  };
}

function createDisabledBoundaryChecks(
  sourceNodeV288: SourceNodeV288DisabledFakeHarnessContractReference,
  javaV122V126: JavaV122V126DisabledFakeHarnessEvidenceReference,
  miniKvV127: MiniKvV127DisabledFakeHarnessNonParticipationReference,
  sourceChecks: ReturnType<typeof createDisabledSourceChecks>,
) {
  const credentialBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_CREDENTIAL_FIELDS, false)
    && javaV122V126.credentialValueBoundaryDocumented
    && allBooleanFieldsAre(miniKvV127, MINIKV_CREDENTIAL_FIELDS, false);
  const rawEndpointBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_ENDPOINT_FIELDS, false)
    && javaV122V126.rawEndpointBoundaryDocumented
    && allBooleanFieldsAre(miniKvV127, MINIKV_ENDPOINT_FIELDS, false);
  const providerClientBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_PROVIDER_FIELDS, false)
    && allBooleanFieldsAre(miniKvV127, MINIKV_PROVIDER_FIELDS, false);
  const connectionBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_CONNECTION_FIELDS, false)
    && javaV122V126.managedAuditConnectionBoundaryDocumented
    && allBooleanFieldsAre(miniKvV127, MINIKV_CONNECTION_FIELDS, false);
  const writeBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_WRITE_FIELDS, false)
    && javaV122V126.ledgerAndSqlBoundaryDocumented
    && allBooleanFieldsAre(miniKvV127, MINIKV_WRITE_FIELDS, false);
  const autoStartBoundaryClosed =
    allBooleanFieldsAre(sourceNodeV288, SOURCE_AUTO_START_FIELDS, false)
    && allBooleanFieldsAre(miniKvV127, MINIKV_AUTO_START_FIELDS, false);
  const authorityBoundaryClosed = allBooleanFieldsAre(
    miniKvV127,
    MINIKV_AUTHORITY_FIELDS,
    false,
  );
  const boundaries = {
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    providerClientBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    authorityBoundaryClosed,
  };
  const sideEffectBoundaryClosed =
    Object.values(boundaries).every(Boolean)
    && sourceChecks.javaDocumentsRuntimeBoundaries
    && sourceChecks.sourceNodeV288ContractStillDisabled
    && sourceChecks.miniKvV127KeepsRuntimeSideEffectsBlocked;

  return {
    ...boundaries,
    sideEffectBoundaryClosed,
  };
}

export function collectProductionBlockers(
  checks: DisabledFakeHarnessContractUpstreamEchoVerificationChecks,
): DisabledFakeHarnessContractUpstreamEchoVerificationMessage[] {
  const rules: readonly ReportRule<
    DisabledFakeHarnessContractUpstreamEchoVerificationMessage["source"]
  >[] = [
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

  return collectFailedReportRules(rules);
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
