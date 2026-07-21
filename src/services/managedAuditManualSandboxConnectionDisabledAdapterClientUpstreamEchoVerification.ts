import type { AppConfig } from "../config.js";
import {
  createJavaV102Reference,
  createMiniKvV111Reference,
} from "../evidence/disabledAdapterEchoReferences.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
  type ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
  type ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";
import type {
  DisabledAdapterClientUpstreamEchoVerificationChecks,
  DisabledAdapterClientUpstreamEchoVerificationMessage,
  JavaV102DisabledAdapterClientEchoReference,
  ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
  MiniKvV111DisabledAdapterClientNonParticipationReference,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationRenderer.js";

const ENDPOINTS = Object.freeze({
  disabledAdapterClientUpstreamEchoVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
  disabledAdapterClientUpstreamEchoVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification?format=markdown",
  sourceNodeV252Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
  sourceNodeV253Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
  activePlan: "docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile {
  const sourceNodeV252 = createSourceNodeV252(
    loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({ config: input.config }),
  );
  const sourceNodeV253 = createSourceNodeV253(
    loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: input.config }),
  );
  const javaV102 = createJavaV102Reference();
  const miniKvV111 = createMiniKvV111Reference();
  const checks = createChecks(input.config, sourceNodeV252, sourceNodeV253, javaV102, miniKvV111);
  checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification
    ? "disabled-adapter-client-upstream-echo-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
    verificationState,
    nodeV252PrecheckDigest: sourceNodeV252.precheckDigest,
    nodeV253ContractDigest: sourceNodeV253.contractDigest,
    javaV102Ready: javaV102.readyForNodeV254Alignment,
    miniKvV111ReceiptDigest: miniKvV111.receiptDigest,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection disabled adapter client upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV252,
    sourceNodeV253,
    upstreamEchoes: { javaV102, miniKvV111 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v102-plus-mini-kv-v111-disabled-adapter-client-upstream-echo-verification-only",
      sourceSpan: "Node v252 + Node v253 + Java v102 + mini-kv v111",
      envHandleCountAligned: checks.envHandleCountAligned,
      failureClassCountAligned: checks.failureClassCountAligned,
      dryRunResponseShapeAligned: checks.dryRunResponseShapeAligned,
      fakeTransportShapeAligned: checks.fakeTransportShapeAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV254BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV102.evidenceFiles.filter((file) => file.exists).length
        + miniKvV111.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV102.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV111.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to Node v255 fake transport adapter dry-run verification packet only after this verification remains ready.",
      "Keep fake transport isolated; do not resolve credential values or external endpoint URLs.",
      "Pause if Java or mini-kv changes env handle counts, failure taxonomy counts, fake transport shape, or no-write/no-start boundaries.",
    ],
  };
}

function createSourceNodeV252(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"] {
  return {
    sourceVersion: "Node v252",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.disabledAdapterClientPrecheck.precheckDigest,
    readyForDisabledAdapterClientPrecheck:
      source.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
    requiredEnvHandleCount: source.disabledAdapterClientPrecheck.requiredEnvHandleCount,
    failureClassCount: source.disabledAdapterClientPrecheck.failureClassCount,
    dryRunResponseFieldCount: source.disabledAdapterClientPrecheck.dryRunResponseFieldCount,
    reusedNoGoConditionCount: source.disabledAdapterClientPrecheck.reusedNoGoConditions.length,
    readyForSandboxAdapterConnection: false,
    externalRequestStillBlocked: true,
    credentialValueStillBlocked: true,
  };
}

function createSourceNodeV253(
  source: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"] {
  return {
    sourceVersion: "Node v253",
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    contractDigest: source.testOnlyAdapterShellContract.contractDigest,
    readyForTestOnlyAdapterShellContract:
      source.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
    requestShapeFieldCount: source.testOnlyAdapterShellContract.requestShapeFieldCount,
    responseShapeFieldCount: source.testOnlyAdapterShellContract.responseShapeFieldCount,
    failureMappingCount: source.testOnlyAdapterShellContract.failureMappingCount,
    guardConditionCount: source.testOnlyAdapterShellContract.guardConditionCount,
    fakeTransportOnly: true,
    realClientImplemented: false,
    realTransportAllowed: false,
    externalRequestSent: false,
    credentialValueRead: false,
    productionRecordWritten: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV252: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"],
  sourceNodeV253: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
  javaV102: JavaV102DisabledAdapterClientEchoReference,
  miniKvV111: MiniKvV111DisabledAdapterClientNonParticipationReference,
): DisabledAdapterClientUpstreamEchoVerificationChecks {
  return {
    sourceNodeV252Ready: sourceNodeV252.readyForDisabledAdapterClientPrecheck,
    sourceNodeV253Ready: sourceNodeV253.readyForTestOnlyAdapterShellContract,
    sourceNodeBoundariesStillClosed: areNodeBoundariesClosed(sourceNodeV252, sourceNodeV253),
    javaV102EchoReady: javaV102.readyForNodeV254Alignment,
    miniKvV111NonParticipationReady: miniKvV111.readyForNodeV254Alignment,
    envHandleCountAligned: hasAlignedCount(
      5,
      sourceNodeV252.requiredEnvHandleCount,
      javaV102.requiredEnvHandleCount,
      miniKvV111.sourceRequiredEnvHandleCount,
    ),
    failureClassCountAligned: hasAlignedCount(
      6,
      sourceNodeV252.failureClassCount,
      javaV102.failureClassCount,
      miniKvV111.sourceFailureClassCount,
    ),
    dryRunResponseShapeAligned: hasAlignedCount(
      10,
      sourceNodeV252.dryRunResponseFieldCount,
      javaV102.dryRunResponseFieldCount,
      miniKvV111.sourceDryRunResponseFieldCount,
    ),
    fakeTransportShapeAligned: hasAlignedFakeTransport(sourceNodeV253, miniKvV111),
    credentialBoundaryAligned: isCredentialBoundaryClosed(sourceNodeV252, javaV102, miniKvV111),
    connectionBoundaryAligned: isConnectionBoundaryClosed(sourceNodeV252, sourceNodeV253, javaV102, miniKvV111),
    writeBoundaryAligned: isWriteBoundaryClosed(sourceNodeV253, javaV102, miniKvV111),
    autoStartBoundaryAligned: isAutoStartBoundaryClosed(javaV102, miniKvV111),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: false,
  };
}

function areNodeBoundariesClosed(
  precheck: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"],
  shell: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
): boolean {
  return !precheck.readyForSandboxAdapterConnection
    && precheck.externalRequestStillBlocked
    && precheck.credentialValueStillBlocked
    && shell.fakeTransportOnly
    && !shell.realClientImplemented
    && !shell.realTransportAllowed
    && !shell.externalRequestSent
    && !shell.credentialValueRead
    && !shell.productionRecordWritten;
}

function hasAlignedCount(expected: number, ...values: number[]): boolean {
  return values.length > 0 && values.every((value) => value === expected);
}

function hasAlignedFakeTransport(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
  receipt: MiniKvV111DisabledAdapterClientNonParticipationReference,
): boolean {
  return source.requestShapeFieldCount === 8
    && source.responseShapeFieldCount === 9
    && source.failureMappingCount === 6
    && source.guardConditionCount === 7
    && receipt.sourceRequestShapeFieldCount === 8
    && receipt.sourceResponseShapeFieldCount === 9
    && receipt.sourceFailureMappingCount === 6
    && receipt.sourceGuardConditionCount === 7
    && receipt.sourceFakeTransportOnly;
}

function isCredentialBoundaryClosed(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"],
  javaEcho: JavaV102DisabledAdapterClientEchoReference,
  receipt: MiniKvV111DisabledAdapterClientNonParticipationReference,
): boolean {
  return source.credentialValueStillBlocked
    && !javaEcho.credentialValueMayBeLoaded
    && !receipt.sourceCredentialValueMayBeLoaded
    && receipt.requestCredentialHandleOnly
    && !receipt.requestCredentialValueAccepted
    && !receipt.credentialValueReadAllowed
    && !receipt.credentialValueLoaded
    && !receipt.responseCredentialValueRead;
}

function isConnectionBoundaryClosed(
  precheck: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"],
  shell: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
  javaEcho: JavaV102DisabledAdapterClientEchoReference,
  receipt: MiniKvV111DisabledAdapterClientNonParticipationReference,
): boolean {
  return precheck.externalRequestStillBlocked
    && !shell.externalRequestSent
    && !javaEcho.clientMayBeInstantiated
    && !javaEcho.externalRequestMayBeSent
    && !javaEcho.actualConnectionAttemptedByJava
    && !javaEcho.externalRequestSentByJava
    && !receipt.sourceExternalRequestMayBeSent
    && !receipt.externalRequestSent
    && !receipt.responseExternalRequestSent
    && !receipt.connectionExecutionAllowed;
}

function isWriteBoundaryClosed(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
  javaEcho: JavaV102DisabledAdapterClientEchoReference,
  receipt: MiniKvV111DisabledAdapterClientNonParticipationReference,
): boolean {
  return !source.productionRecordWritten
    && !javaEcho.schemaMigrationSqlExecutedByJava
    && !javaEcho.approvalLedgerWrittenByJava
    && !javaEcho.miniKvWritePermissionRequestedByJava
    && !receipt.storageWriteAllowed
    && !receipt.managedAuditWriteExecuted
    && !receipt.responseProductionRecordWritten
    && !receipt.managedAuditStorageBackend
    && !receipt.orderAuthoritative;
}

function isAutoStartBoundaryClosed(
  javaEcho: JavaV102DisabledAdapterClientEchoReference,
  receipt: MiniKvV111DisabledAdapterClientNonParticipationReference,
): boolean {
  return !javaEcho.upstreamServiceAutoStartRequestedByJava
    && !receipt.nodeAutoStartAllowed
    && !receipt.javaAutoStartAllowed
    && !receipt.miniKvAutoStartAllowed;
}

function collectProductionBlockers(
  checks: DisabledAdapterClientUpstreamEchoVerificationChecks,
): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledAdapterClientUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV252Ready && checks.sourceNodeV253Ready && checks.sourceNodeBoundariesStillClosed,
      code: "NODE_SOURCES_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Node v252 and v253 must be ready and still block real connection effects.",
    },
    {
      condition: checks.javaV102EchoReady,
      code: "JAVA_V102_DISABLED_ADAPTER_CLIENT_ECHO_NOT_READY",
      source: "java-v102-disabled-adapter-client-precheck-echo-receipt",
      message: "Java v102 must echo disabled adapter client precheck fields and keep execution boundaries closed.",
    },
    {
      condition: checks.miniKvV111NonParticipationReady,
      code: "MINI_KV_V111_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v111-disabled-adapter-client-non-participation-receipt",
      message: "mini-kv v111 must prove no storage, no credential, no external request, no restore, and no auto-start.",
    },
    {
      condition:
        checks.envHandleCountAligned
        && checks.failureClassCountAligned
        && checks.dryRunResponseShapeAligned
        && checks.fakeTransportShapeAligned,
      code: "DISABLED_ADAPTER_CLIENT_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Node, Java, and mini-kv must align on env handles, failure taxonomy, dry-run response, and fake transport shapes.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "DISABLED_ADAPTER_CLIENT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Credential, connection, write, and auto-start boundaries must remain closed in all three projects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v254 upstream echo verification.",
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

function collectWarnings(): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "v254 verifies upstream echo evidence only; it does not open a real managed audit connection.",
    },
    {
      code: "FAKE_TRANSPORT_REMAINS_TEST_ONLY",
      severity: "warning",
      source: "node-v253-test-only-adapter-shell-contract",
      message: "The fake transport shell is shape evidence, not a production adapter client.",
    },
  ];
}

function collectRecommendations(): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "CREATE_FAKE_TRANSPORT_DRY_RUN_PACKET_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "After v254 is ready, Node v255 may verify fake transport dry-run packets without real endpoints.",
    },
    {
      code: "KEEP_UPSTREAM_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Do not treat Java v102 or mini-kv v111 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}
