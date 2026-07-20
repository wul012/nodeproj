import type { AppConfig } from "../config.js";
import {
  PLAN_JAVA_AUTO_FIELDS,
  PLAN_JAVA_BLOCKED_FIELDS,
  PLAN_JAVA_CONNECTION_FIELDS,
  PLAN_JAVA_CREDENTIAL_FIELDS,
  PLAN_JAVA_ENDPOINT_FIELDS,
  PLAN_JAVA_RESOLVER_FIELDS,
  PLAN_JAVA_WRITE_FIELDS,
  PLAN_MINIKV_AUTO_FIELDS,
  PLAN_MINIKV_CONNECTION_FIELDS,
  PLAN_MINIKV_CREDENTIAL_FIELDS,
  PLAN_MINIKV_ENDPOINT_FIELDS,
  PLAN_MINIKV_RECEIPT_TRUE_FIELDS,
  PLAN_MINIKV_RESOLVER_FIELDS,
  PLAN_MINIKV_RUNTIME_FIELDS,
  PLAN_MINIKV_SIDE_EFFECT_FIELDS,
  PLAN_MINIKV_WRITE_FIELDS,
  PLAN_SOURCE_AUTO_FIELDS,
  PLAN_SOURCE_BLOCKED_FIELDS,
  PLAN_SOURCE_CONNECTION_FIELDS,
  PLAN_SOURCE_CREDENTIAL_FIELDS,
  PLAN_SOURCE_ENDPOINT_FIELDS,
  PLAN_SOURCE_RESOLVER_FIELDS,
  PLAN_SOURCE_WRITE_FIELDS,
} from "./credentialPolicy/planEchoFields.js";
import {
  allBooleanFieldsAre,
  collectFailedReportRules,
  type ReportRule,
} from "./liveProbeReportUtils.js";
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
  const sourceChecks = createPlanSourceChecks(sourceNodeV283, javaV121, miniKvV126);
  const alignmentChecks = createPlanAlignmentChecks(sourceNodeV283, javaV121, miniKvV126);
  const boundaryChecks = createPlanBoundaryChecks(sourceNodeV283, javaV121, miniKvV126);

  return {
    ...sourceChecks,
    ...alignmentChecks,
    ...boundaryChecks,
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

function createPlanSourceChecks(
  sourceNodeV283: SourceNodeV283ImplementationPlanDraftReference,
  javaV121: JavaV121ImplementationPlanEchoReference,
  miniKvV126: MiniKvV126ImplementationPlanNonParticipationReference,
) {
  return {
    sourceNodeV283Ready: isPlanSourceReady(sourceNodeV283),
    sourceNodeV283KeepsImplementationBlocked: allBooleanFieldsAre(
      sourceNodeV283,
      PLAN_SOURCE_BLOCKED_FIELDS,
      false,
    ),
    javaV121EchoReady: isJavaEchoReady(javaV121),
    javaV121DocumentsNodeV283Consumption: isJavaConsumptionDocumented(sourceNodeV283, javaV121),
    javaV121KeepsRuntimeSideEffectsBlocked: allBooleanFieldsAre(javaV121, PLAN_JAVA_BLOCKED_FIELDS, false),
    miniKvV126ReceiptReady:
      allBooleanFieldsAre(miniKvV126, PLAN_MINIKV_RECEIPT_TRUE_FIELDS, true)
      && allBooleanFieldsAre(miniKvV126, PLAN_MINIKV_RUNTIME_FIELDS, false),
    miniKvV126DocumentsNodeV283Consumption: isMiniKvConsumptionDocumented(sourceNodeV283, miniKvV126),
    miniKvV126KeepsRuntimeSideEffectsBlocked: allBooleanFieldsAre(
      miniKvV126,
      PLAN_MINIKV_SIDE_EFFECT_FIELDS,
      false,
    ),
  };
}

function isPlanSourceReady(source: SourceNodeV283ImplementationPlanDraftReference): boolean {
  return source.planState === "credential-resolver-implementation-plan-draft-ready"
    && source.readyForImplementationPlanDraft
    && source.readyForJavaV121MiniKvV126Echo;
}

function isJavaEchoReady(javaEcho: JavaV121ImplementationPlanEchoReference): boolean {
  return javaEcho.evidencePresent
    && javaEcho.verificationDocumented
    && javaEcho.readyForOriginalNodeV284Verification
    && javaEcho.readyForJavaV121MiniKvV126Echo
    && javaEcho.planEchoMode === "java-v121-credential-resolver-implementation-plan-echo-only"
    && javaEcho.sourceSpan === "Node v283"
    && javaEcho.originalExpectedNodeVerificationVersion === "Node v284"
    && javaEcho.javaPlanDigestRequirementNamed;
}

function isJavaConsumptionDocumented(
  source: SourceNodeV283ImplementationPlanDraftReference,
  javaEcho: JavaV121ImplementationPlanEchoReference,
): boolean {
  return javaEcho.evidencePresent
    && javaEcho.verificationDocumented
    && javaEcho.proofClaimCount === 11
    && javaEcho.nodeVerificationActionCount === 11
    && javaEcho.interfaceBoundaryCount === source.interfaceBoundaryCount
    && javaEcho.requiredArtifactCount === source.requiredArtifactCount
    && javaEcho.interfaceBoundaryCodes.length === 7
    && javaEcho.requiredArtifactIds.length === 21;
}

function isMiniKvConsumptionDocumented(
  source: SourceNodeV283ImplementationPlanDraftReference,
  receipt: MiniKvV126ImplementationPlanNonParticipationReference,
): boolean {
  return receipt.planDigest === source.planDigest
    && receipt.reviewDigest === source.reviewDigest
    && receipt.sourcePlanState === "credential-resolver-implementation-plan-draft-ready"
    && receipt.interfaceBoundaryCount === source.interfaceBoundaryCount
    && receipt.requiredArtifactCount === source.requiredArtifactCount
    && receipt.prohibitedActionCount === source.prohibitedActions.length
    && receipt.javaEchoRequirementCount === 4
    && receipt.miniKvReceiptRequirementCount === 4;
}

function createPlanAlignmentChecks(
  source: SourceNodeV283ImplementationPlanDraftReference,
  javaEcho: JavaV121ImplementationPlanEchoReference,
  receipt: MiniKvV126ImplementationPlanNonParticipationReference,
) {
  return {
    planDigestAlignedWithMiniKv: receipt.planDigest === source.planDigest,
    reviewDigestAlignedWithMiniKv: receipt.reviewDigest === source.reviewDigest,
    boundaryCodesAligned: arraysEqual(receipt.interfaceBoundaryCodes, source.interfaceBoundaryCodes),
    requiredArtifactsAligned: arraysEqual(receipt.requiredArtifactIds, source.requiredArtifactIds),
    prohibitedActionsAligned: arraysEqual(receipt.prohibitedActions, source.prohibitedActions),
    javaRequirementIdsAligned: arraysEqual(receipt.javaRequirementIds, javaEcho.javaRequirementIds),
    miniKvRequirementIdsAligned: arraysEqual(receipt.miniKvRequirementIds, javaEcho.miniKvRequirementIds),
  };
}

function createPlanBoundaryChecks(
  source: SourceNodeV283ImplementationPlanDraftReference,
  javaEcho: JavaV121ImplementationPlanEchoReference,
  receipt: MiniKvV126ImplementationPlanNonParticipationReference,
) {
  const credentialBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_CREDENTIAL_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_CREDENTIAL_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_CREDENTIAL_FIELDS, false);
  const rawEndpointBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_ENDPOINT_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_ENDPOINT_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_ENDPOINT_FIELDS, false);
  const resolverBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_RESOLVER_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_RESOLVER_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_RESOLVER_FIELDS, false);
  const connectionBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_CONNECTION_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_CONNECTION_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_CONNECTION_FIELDS, false);
  const writeBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_WRITE_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_WRITE_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_WRITE_FIELDS, false);
  const autoStartBoundaryClosed =
    allBooleanFieldsAre(source, PLAN_SOURCE_AUTO_FIELDS, false)
    && allBooleanFieldsAre(javaEcho, PLAN_JAVA_AUTO_FIELDS, false)
    && allBooleanFieldsAre(receipt, PLAN_MINIKV_AUTO_FIELDS, false);
  const boundaries = {
    credentialBoundaryClosed,
    rawEndpointBoundaryClosed,
    resolverBoundaryClosed,
    connectionBoundaryClosed,
    writeBoundaryClosed,
    autoStartBoundaryClosed,
  };

  return {
    ...boundaries,
    sideEffectBoundaryClosed: Object.values(boundaries).every(Boolean),
  };
}

export function collectProductionBlockers(
  checks: CredentialResolverImplementationPlanUpstreamEchoVerificationChecks,
): CredentialResolverImplementationPlanUpstreamEchoVerificationMessage[] {
  const rules: readonly ReportRule<
    CredentialResolverImplementationPlanUpstreamEchoVerificationMessage["source"]
  >[] = [
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

  return collectFailedReportRules(rules);
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
