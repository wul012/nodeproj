import type { AppConfig } from "../config.js";
import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  ACTIVE_PLAN,
  JAVA_V122_RUNBOOK,
  JAVA_V123_RUNBOOK,
  JAVA_V124_RUNBOOK,
  JAVA_V125_RUNBOOK,
  JAVA_V126_BOUNDARY_CATALOG,
  JAVA_V126_RUNBOOK,
  MINI_KV_V127_RECEIPT,
  NEXT_PLAN,
  NODE_V288_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationConstants.js";
import {
  createEchoVerification,
  createSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationCore.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationPolicy.js";
import {
  createJavaV122V126Reference,
  createMiniKvV127Reference,
  createSourceNodeV288,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationReferences.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationRenderer.js";

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationProfile {
  const sourceNodeV288 = createSourceNodeV288(input.config);
  const javaV122V126 = createJavaV122V126Reference();
  const miniKvV127 = createMiniKvV127Reference();
  const checks = createChecks(input.config, sourceNodeV288, javaV122V126, miniKvV127);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification
    ? "disabled-fake-harness-contract-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceContractDigest: sourceNodeV288.contractDigest,
    javaEvidenceDigest: javaV122V126.evidenceDigest,
    miniKvReceiptDigest: miniKvV127.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(
    sourceNodeV288,
    javaV122V126,
    miniKvV127,
    checks,
    verificationDigest,
  );
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV288, javaV122V126, miniKvV127, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled fake harness contract upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledFakeHarnessContractUpstreamEchoVerificationOnly: true,
    consumesNodeV288DisabledFakeHarnessContract: true,
    consumesJavaV122V126QualityAndEchoEvidence: true,
    consumesMiniKvV127DisabledFakeHarnessNonParticipationReceipt: true,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV288,
    upstreamEchoes: { javaV122V126, miniKvV127 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledFakeHarnessContractUpstreamEchoVerificationJson: ROUTE_PATH,
      disabledFakeHarnessContractUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV288Json: NODE_V288_ROUTE,
      sourceNodeV288Markdown: `${NODE_V288_ROUTE}?format=markdown`,
      javaV122Runbook: JAVA_V122_RUNBOOK,
      javaV123Runbook: JAVA_V123_RUNBOOK,
      javaV124Runbook: JAVA_V124_RUNBOOK,
      javaV125Runbook: JAVA_V125_RUNBOOK,
      javaV126Runbook: JAVA_V126_RUNBOOK,
      javaV126BoundaryCatalog: JAVA_V126_BOUNDARY_CATALOG,
      miniKvV127Receipt: MINI_KV_V127_RECEIPT,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v289 with JSON, Markdown, explanation, and code walkthrough evidence.",
      "Treat Java v122-v126 and mini-kv v127 as read-only inputs; do not mutate sibling projects from Node.",
      "Use the next plan to decide whether the disabled fake harness line needs another read-only preflight before any runtime shell work.",
      "Keep credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, ledger writes, schema migration, and automatic upstream start blocked.",
    ],
  };
}
