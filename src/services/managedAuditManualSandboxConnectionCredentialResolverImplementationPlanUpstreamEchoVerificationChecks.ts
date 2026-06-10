import type { AppConfig } from "../config.js";
import { arraysEqual } from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationReferences.js";
import type {
  CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
  CredentialResolverImplementationPlanUpstreamEchoVerificationMessage,
  JavaV121ImplementationPlanEchoReference,
  MiniKvV126ImplementationPlanNonParticipationReference,
  SourceNodeV283ImplementationPlanDraftReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

export function createChecks(
  config: AppConfig,
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
): CredentialResolverImplementationPlanUpstreamEchoVerificationChecks {
  const planDigest = sourceNodeV283.planDigest;
  const reviewDigest = sourceNodeV283.reviewDigest;
  const sourceNodeV283Ready =
    sourceNodeV283.planState === "credential-resolver-implementation-plan-draft-ready"
    && sourceNodeV283.readyForImplementationPlanDraft
    && sourceNodeV283.readyForJavaV121MiniKvV126Echo;
  const sourceNodeV283KeepsImplementationBlocked =
    !sourceNodeV283.realResolverImplementationAllowed
    && !sourceNodeV283.testOnlyFakeHarnessAllowed
    && !sourceNodeV283.executionAllowed
    && !sourceNodeV283.connectsManagedAudit
    && !sourceNodeV283.credentialValueRead
    && !sourceNodeV283.rawEndpointUrlParsed
    && !sourceNodeV283.rawEndpointUrlRendered
    && !sourceNodeV283.externalRequestSent
    && !sourceNodeV283.secretProviderInstantiated
    && !sourceNodeV283.resolverClientInstantiated
    && !sourceNodeV283.schemaMigrationExecuted
    && !sourceNodeV283.approvalLedgerWritten
    && !sourceNodeV283.automaticUpstreamStart;
  const javaV121EchoReady =
    javaV121.evidencePresent
    && javaV121.verificationDocumented
    && javaV121.readyForOriginalNodeV284Verification
    && javaV121.readyForJavaV121MiniKvV126Echo
    && javaV121.planEchoMode === "java-v121-credential-resolver-implementation-plan-echo-only"
    && javaV121.sourceSpan === "Node v283"
    && javaV121.originalExpectedNodeVerificationVersion === "Node v284"
    && javaV121.javaPlanDigestRequirementNamed;
  const javaV121DocumentsNodeV283Consumption =
    javaV121.evidencePresent
    && javaV121.verificationDocumented
    && javaV121.proofClaimCount === 11
    && javaV121.nodeVerificationActionCount === 11
    && javaV121.interfaceBoundaryCount === sourceNodeV283.interfaceBoundaryCount
    && javaV121.requiredArtifactCount === sourceNodeV283.requiredArtifactCount
    && javaV121.interfaceBoundaryCodes.length === 7
    && javaV121.requiredArtifactIds.length === 21;
  const javaV121KeepsRuntimeSideEffectsBlocked =
    javaV121.readyForManagedAuditResolverImplementation === false
    && javaV121.readyForTestOnlyFakeHarnessPrecheck === false
    && javaV121.credentialValueRead === false
    && javaV121.rawEndpointUrlParsed === false
    && javaV121.rawEndpointUrlRendered === false
    && javaV121.externalRequestSent === false
    && javaV121.secretProviderInstantiated === false
    && javaV121.resolverClientInstantiated === false
    && javaV121.connectsManagedAudit === false
    && javaV121.approvalLedgerWritten === false
    && javaV121.managedAuditStoreWritten === false
    && javaV121.sqlExecuted === false
    && javaV121.schemaMigrationExecuted === false
    && javaV121.rollbackExecuted === false
    && javaV121.automaticUpstreamStart === false
    && javaV121.javaStartedNodeOrMiniKv === false;
  const miniKvV126ReceiptReady =
    miniKvV126.evidencePresent
    && miniKvV126.verificationDocumented
    && miniKvV126.readyForOriginalNodeV284Verification
    && miniKvV126.readyForJavaV121MiniKvV126Echo
    && miniKvV126.readOnly === true
    && miniKvV126.executionAllowed === false
    && miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false
    && miniKvV126.automaticUpstreamStart === false
    && miniKvV126.managedAuditStorageBackend === false
    && miniKvV126.auditAuthoritative === false
    && miniKvV126.orderAuthoritative === false;
  const miniKvV126DocumentsNodeV283Consumption =
    miniKvV126.planDigest === planDigest
    && miniKvV126.reviewDigest === reviewDigest
    && miniKvV126.sourcePlanState === "credential-resolver-implementation-plan-draft-ready"
    && miniKvV126.interfaceBoundaryCount === sourceNodeV283.interfaceBoundaryCount
    && miniKvV126.requiredArtifactCount === sourceNodeV283.requiredArtifactCount
    && miniKvV126.prohibitedActionCount === sourceNodeV283.prohibitedActions.length
    && miniKvV126.javaEchoRequirementCount === 4
    && miniKvV126.miniKvReceiptRequirementCount === 4;
  const miniKvV126KeepsRuntimeSideEffectsBlocked =
    miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.credentialValueRead === false
    && miniKvV126.credentialValueLoaded === false
    && miniKvV126.credentialValueStored === false
    && miniKvV126.credentialValueIncluded === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlParsed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.rawEndpointUrlRendered === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.externalRequestSent === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.writeCommandsExecuted === false
    && miniKvV126.adminCommandsExecuted === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.approvalLedgerWritten === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false
    && miniKvV126.automaticUpstreamStart === false
    && miniKvV126.managedAuditStorageBackend === false
    && miniKvV126.auditAuthoritative === false
    && miniKvV126.orderAuthoritative === false;
  const planDigestAlignedWithMiniKv = miniKvV126.planDigest === planDigest;
  const reviewDigestAlignedWithMiniKv = miniKvV126.reviewDigest === reviewDigest;
  const boundaryCodesAligned = arraysEqual(miniKvV126.interfaceBoundaryCodes, sourceNodeV283.interfaceBoundaryCodes);
  const requiredArtifactsAligned = arraysEqual(miniKvV126.requiredArtifactIds, sourceNodeV283.requiredArtifactIds);
  const prohibitedActionsAligned = arraysEqual(miniKvV126.prohibitedActions, sourceNodeV283.prohibitedActions);
  const javaRequirementIdsAligned = arraysEqual(miniKvV126.javaRequirementIds, javaV121.javaRequirementIds);
  const miniKvRequirementIdsAligned = arraysEqual(miniKvV126.miniKvRequirementIds, javaV121.miniKvRequirementIds);
  const credentialBoundaryClosed =
    sourceNodeV283.credentialValueRead === false
    && javaV121.credentialValueRead === false
    && miniKvV126.credentialValueReadAllowed === false
    && miniKvV126.credentialValueRead === false
    && miniKvV126.credentialValueLoaded === false
    && miniKvV126.credentialValueStored === false
    && miniKvV126.credentialValueIncluded === false;
  const rawEndpointBoundaryClosed =
    sourceNodeV283.rawEndpointUrlParsed === false
    && sourceNodeV283.rawEndpointUrlRendered === false
    && javaV121.rawEndpointUrlParsed === false
    && javaV121.rawEndpointUrlRendered === false
    && miniKvV126.rawEndpointUrlParseAllowed === false
    && miniKvV126.rawEndpointUrlParsed === false
    && miniKvV126.rawEndpointUrlRenderAllowed === false
    && miniKvV126.rawEndpointUrlRendered === false
    && miniKvV126.rawEndpointUrlIncluded === false;
  const resolverBoundaryClosed =
    sourceNodeV283.resolverClientInstantiated === false
    && sourceNodeV283.secretProviderInstantiated === false
    && javaV121.resolverClientInstantiated === false
    && javaV121.secretProviderInstantiated === false
    && miniKvV126.credentialResolverImplemented === false
    && miniKvV126.credentialResolverInvoked === false
    && miniKvV126.resolverClientInstantiated === false
    && miniKvV126.secretProviderInstantiated === false;
  const connectionBoundaryClosed =
    sourceNodeV283.connectsManagedAudit === false
    && sourceNodeV283.externalRequestSent === false
    && javaV121.connectsManagedAudit === false
    && javaV121.externalRequestSent === false
    && miniKvV126.connectsManagedAudit === false
    && miniKvV126.externalRequestAllowed === false
    && miniKvV126.externalRequestSent === false;
  const writeBoundaryClosed =
    sourceNodeV283.executionAllowed === false
    && sourceNodeV283.schemaMigrationExecuted === false
    && sourceNodeV283.approvalLedgerWritten === false
    && javaV121.approvalLedgerWritten === false
    && javaV121.sqlExecuted === false
    && javaV121.schemaMigrationExecuted === false
    && miniKvV126.storageWriteAllowed === false
    && miniKvV126.writeCommandsExecuted === false
    && miniKvV126.adminCommandsExecuted === false
    && miniKvV126.approvalLedgerWriteAllowed === false
    && miniKvV126.approvalLedgerWritten === false
    && miniKvV126.schemaMigrationExecuted === false
    && miniKvV126.loadRestoreCompactExecuted === false
    && miniKvV126.setnxexExecutionAllowed === false;
  const autoStartBoundaryClosed =
    sourceNodeV283.automaticUpstreamStart === false
    && javaV121.automaticUpstreamStart === false
    && javaV121.javaStartedNodeOrMiniKv === false
    && miniKvV126.automaticUpstreamStart === false;
  const sideEffectBoundaryClosed =
    credentialBoundaryClosed
    && rawEndpointBoundaryClosed
    && resolverBoundaryClosed
    && connectionBoundaryClosed
    && writeBoundaryClosed
    && autoStartBoundaryClosed;

  return {
    sourceNodeV283Ready,
    sourceNodeV283KeepsImplementationBlocked,
    javaV121EchoReady,
    javaV121DocumentsNodeV283Consumption,
    javaV121KeepsRuntimeSideEffectsBlocked,
    miniKvV126ReceiptReady,
    miniKvV126DocumentsNodeV283Consumption,
    miniKvV126KeepsRuntimeSideEffectsBlocked,
    planDigestAlignedWithMiniKv,
    reviewDigestAlignedWithMiniKv,
    boundaryCodesAligned,
    requiredArtifactsAligned,
    prohibitedActionsAligned,
    javaRequirementIdsAligned,
    miniKvRequirementIdsAligned,
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    resolverBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
    sideEffectBoundaryClosed,
    nodeVersionOffsetDocumented:
      sourceNodeV283.sourceVersion === "Node v283"
      && javaV121.originalExpectedNodeVerificationVersion === "Node v284"
      && miniKvV126.readyForOriginalNodeV284Verification === true
      && miniKvV126.readOnly === true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification:
      false,
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverImplementationPlanUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV283Ready,
      code: "NODE_V283_PLAN_NOT_READY",
      source: "node-v283-implementation-plan-draft",
      message: "Node v283 plan draft must be ready before Node v286 verifies the upstream echo chain.",
    },
    {
      condition: checks.javaV121EchoReady,
      code: "JAVA_V121_ECHO_NOT_READY",
      source: "java-v121-implementation-plan-echo",
      message: "Java v121 implementation-plan echo must be present and documented before Node v286.",
    },
    {
      condition: checks.miniKvV126ReceiptReady,
      code: "MINI_KV_V126_RECEIPT_NOT_READY",
      source: "mini-kv-v126-implementation-plan-non-participation-receipt",
      message: "mini-kv v126 non-participation receipt must be present and documented before Node v286.",
    },
    {
      condition: checks.planDigestAlignedWithMiniKv && checks.reviewDigestAlignedWithMiniKv,
      code: "PLAN_DIGESTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Node v283 planDigest and reviewDigest must be echoed by mini-kv v126.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Node v283 and mini-kv v126 must agree on the seven interface boundary codes.",
    },
    {
      condition: checks.requiredArtifactsAligned,
      code: "REQUIRED_ARTIFACT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The twenty-one required artifact ids must be echoed identically by Node v283 and mini-kv v126.",
    },
    {
      condition: checks.prohibitedActionsAligned,
      code: "PROHIBITED_ACTIONS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The twenty-one prohibited actions must be echoed identically by Node v283 and mini-kv v126.",
    },
    {
      condition: checks.javaRequirementIdsAligned,
      code: "JAVA_REQUIREMENT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Java v121 requirement ids must remain aligned with mini-kv v126 receipt references.",
    },
    {
      condition: checks.miniKvRequirementIdsAligned,
      code: "MINIKV_REQUIREMENT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "mini-kv v126 requirement ids must remain aligned with Java v121 echo references.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Credential value reads and storage must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryClosed,
      code: "RESOLVER_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Resolver client and secret provider instantiation must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Managed audit connection and external request sending must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Ledger writes, schema migration, load/restore/compact, and storage writes must remain blocked.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Automatic upstream start must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.nodeVersionOffsetDocumented,
      code: "NODE_VERSION_OFFSET_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "The Node v284 -> v286 execution offset must be documented so Java/mini-kv evidence is not misread.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v286 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v286 upstream echo verification.",
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

export function collectWarnings(): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "v286 is still an echo verification; runtime implementation remains blocked until Node v287 exists.",
    },
    {
      code: "NODE_V284_V286_OFFSET",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Java v121 and mini-kv v126 were authored for the original Node v284 gate, but Node v286 consumed them after local quality-only versions advanced the Node line.",
    },
  ];
}

export function collectRecommendations(): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V287_TEST_ONLY_FAKE_HARNESS_PRECHECK",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "After Node v286 is archived, use Node v287 only for a disabled test-only fake harness precheck.",
    },
    {
      code: "KEEP_JAVA_V121_MINI_KV_V126_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-upstream-echo-verification",
      message: "Keep Java v121 and mini-kv v126 unchanged; they are evidence inputs, not implementation permissions.",
    },
  ];
}
