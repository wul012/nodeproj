import type { AppConfig } from "../config.js";
import { collectFailedReportRules } from "../services/liveProbeReportUtils.js";
import type { ReportRule } from "../services/liveProbeReportUtils.js";
import type {
  JavaV104SandboxEndpointHandlePreflightEchoMarkerReference,
  MiniKvV113SandboxEndpointHandleNonParticipationReference,
  SandboxEndpointHandleUpstreamEchoVerificationChecks,
  SandboxEndpointHandleUpstreamEchoVerificationMessage,
  SourceNodeV258SandboxEndpointHandlePreflightReviewReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";

export function createChecks(
  config: AppConfig,
  source: SourceNodeV258SandboxEndpointHandlePreflightReviewReference,
  java: JavaV104SandboxEndpointHandlePreflightEchoMarkerReference,
  miniKv: MiniKvV113SandboxEndpointHandleNonParticipationReference,
): SandboxEndpointHandleUpstreamEchoVerificationChecks {
  return {
    sourceNodeV258Ready: source.readyForNodeV259UpstreamEchoVerification,
    javaV104EchoReady: java.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
    miniKvV113NonParticipationReady: miniKv.readyForNodeV259Alignment,
    endpointHandleAligned: all([
      source.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      java.endpointHandle === source.endpointHandle,
      miniKv.endpointHandle === source.endpointHandle,
    ]),
    credentialHandleAligned: all([
      source.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      java.credentialHandle === source.credentialHandle,
      miniKv.credentialHandle === source.credentialHandle,
    ]),
    reviewCountsAligned: all([
      source.requiredReviewItemCount === 7,
      source.completedReviewItemCount === 7,
      source.forbiddenOperationCount === 7,
      java.requiredReviewItemCount === 7,
      java.completedReviewItemCount === 7,
      java.forbiddenOperationCount === 7,
      miniKv.sourceRequiredReviewItemCount === 7,
      miniKv.sourceCompletedReviewItemCount === 7,
      miniKv.sourceForbiddenOperationCount === 7,
      miniKv.sourceCheckCount === source.checkCount,
      miniKv.sourcePassedCheckCount === source.passedCheckCount,
    ]),
    networkAllowlistAligned: all([
      source.networkAllowlistReviewReady,
      java.networkAllowlistReviewEchoed,
      miniKv.networkAllowlistReady,
    ]),
    tlsPolicyAligned: all([
      source.tlsPolicyReviewReady,
      java.tlsPolicyReviewEchoed,
      miniKv.tlsPolicyReady,
    ]),
    redactionPolicyAligned: all([
      source.redactionPolicyReady,
      java.redactionPolicyEchoed,
      miniKv.redactionPolicyReady,
    ]),
    operatorWindowAligned: all([
      source.operatorWindowReviewReady,
      java.operatorWindowReviewEchoed,
      miniKv.operatorWindowReady,
    ]),
    credentialBoundaryAligned: all([
      !source.credentialValueRead,
      !java.credentialValueRead,
      !miniKv.sourceCredentialValueRead,
      !miniKv.credentialValueReadAllowed,
      !miniKv.credentialValueLoaded,
      !miniKv.credentialValueIncluded,
    ]),
    rawEndpointBoundaryAligned: all([
      !source.rawEndpointUrlParsed,
      !source.rawEndpointUrlIncluded,
      !java.rawEndpointUrlParsed,
      !java.rawEndpointUrlIncluded,
      !miniKv.sourceRawEndpointUrlParsed,
      !miniKv.sourceRawEndpointUrlIncluded,
      !miniKv.rawEndpointUrlParsed,
      !miniKv.rawEndpointUrlIncluded,
    ]),
    connectionBoundaryAligned: all([
      !source.connectsManagedAudit,
      !source.externalRequestSent,
      !java.connectsManagedAudit,
      !java.externalRequestSent,
      !miniKv.sourceConnectsManagedAudit,
      !miniKv.sourceExternalRequestSent,
      !miniKv.connectionExecutionAllowed,
      !miniKv.externalRequestSent,
    ]),
    writeBoundaryAligned: all([
      !source.schemaMigrationExecuted,
      !java.schemaMigrationExecuted,
      !java.approvalLedgerWritten,
      !miniKv.sourceSchemaMigrationExecuted,
      !miniKv.schemaRehearsalExecutionAllowed,
      !miniKv.schemaMigrationExecutionAllowed,
      !miniKv.storageWriteAllowed,
      !miniKv.managedAuditWriteExecuted,
      !miniKv.approvalLedgerWriteAllowed,
      !miniKv.approvalLedgerWriteExecuted,
      !miniKv.sandboxManagedAuditStateWriteAllowed,
    ]),
    autoStartBoundaryAligned: all([
      !source.automaticUpstreamStart,
      !java.automaticUpstreamStart,
      !java.javaStarted,
      !java.miniKvStarted,
      !miniKv.sourceAutomaticUpstreamStart,
      !miniKv.nodeAutoStartAllowed,
      !miniKv.javaAutoStartAllowed,
      !miniKv.miniKvAutoStartAllowed,
      !miniKv.externalAuditServiceAutoStartAllowed,
    ]),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: false,
  };
}

export function collectProductionBlockers(
  checks: SandboxEndpointHandleUpstreamEchoVerificationChecks,
): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  const rules: ReportRule<
    SandboxEndpointHandleUpstreamEchoVerificationMessage["source"]
  >[] = [
    {
      condition: checks.sourceNodeV258Ready,
      code: "NODE_V258_SOURCE_NOT_READY",
      source: "node-v258-sandbox-endpoint-handle-preflight-review",
      message: "Node v258 must be ready and keep handle-only review boundaries closed before v259.",
    },
    {
      condition: checks.javaV104EchoReady,
      code: "JAVA_V104_ENDPOINT_HANDLE_ECHO_NOT_READY",
      source: "java-v104-sandbox-endpoint-handle-preflight-echo-marker",
      message: "Java v104 must expose the sandbox endpoint handle preflight echo marker for Node v259.",
    },
    {
      condition: checks.miniKvV113NonParticipationReady,
      code: "MINI_KV_V113_ENDPOINT_HANDLE_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v113-sandbox-endpoint-handle-non-participation-receipt",
      message: "mini-kv v113 must prove no auto-start, no storage write, no credential read, no raw endpoint parse, and no backend role.",
    },
    {
      condition: all([
        checks.endpointHandleAligned,
        checks.credentialHandleAligned,
        checks.reviewCountsAligned,
        checks.networkAllowlistAligned,
        checks.tlsPolicyAligned,
        checks.redactionPolicyAligned,
        checks.operatorWindowAligned,
      ]),
      code: "SANDBOX_ENDPOINT_HANDLE_REVIEW_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Node v258, Java v104, and mini-kv v113 must align on handles, counts, network, TLS, redaction, and operator window review.",
    },
    {
      condition: all([
        checks.credentialBoundaryAligned,
        checks.rawEndpointBoundaryAligned,
        checks.connectionBoundaryAligned,
        checks.writeBoundaryAligned,
        checks.autoStartBoundaryAligned,
      ]),
      code: "SANDBOX_ENDPOINT_HANDLE_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, and auto-start boundaries must remain closed in all three projects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v259 upstream echo verification.",
    },
  ];

  return collectFailedReportRules(rules);
}

export function collectWarnings(): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "v259 verifies upstream echo evidence only; it does not open a real managed audit connection.",
    },
    {
      code: "CREDENTIAL_RESOLVER_STILL_ABSENT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Credential resolver policy is intentionally absent and should be handled by v260 decision record.",
    },
  ];
}

export function collectRecommendations(): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_V260_DECISION_RECORD_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Use v260 to decide credential resolver rehearsal conditions before any real endpoint, credential, or migration work.",
    },
    {
      code: "KEEP_UPSTREAM_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Do not treat Java v104 or mini-kv v113 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}

function all(values: readonly boolean[]): boolean {
  return values.every((value) => value);
}
