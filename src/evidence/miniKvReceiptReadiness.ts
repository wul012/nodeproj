import {
  DRY_RUN_RESPONSE_FIELDS,
  FAILURE_CLASS_CODES as V115_FAILURE_CODES,
  INHERITED_NO_GO_CONDITIONS,
  OPT_IN_GATE_NAMES,
  REQUIRED_ENV_HANDLE_NAMES,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationConstants.js";
import type {
  MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";
import {
  FAILURE_CLASS_CODES as V116_FAILURE_CODES,
  GUARD_CONDITION_CODES,
  NODE_V264_ROUTE,
  REQUEST_SHAPE_FIELDS,
  RESPONSE_SHAPE_FIELDS,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.js";
import type {
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";
import {
  EXPLICIT_NO_GO_CONDITION_CODES,
  REQUIRED_DECISION_FIELD_IDS,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationConstants.js";
import type {
  MiniKvV114CredentialResolverNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";
import type {
  MiniKvV117FakeShellArchiveNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.js";

const RECEIPT_DIGEST = /^fnv1a64:[a-f0-9]{16}$/;

interface MiniKvBoundary {
  readOnly: boolean;
  executionAllowed: boolean;
  credentialResolverImplemented: boolean;
  credentialResolverInvoked: boolean;
  secretProviderInstantiated: boolean;
  nodeAutoStartAllowed: boolean;
  javaAutoStartAllowed: boolean;
  miniKvAutoStartAllowed: boolean;
  externalAuditServiceAutoStartAllowed: boolean;
  connectionExecutionAllowed: boolean;
  storageWriteAllowed: boolean;
  credentialValueReadAllowed: boolean;
  credentialValueLoaded: boolean;
  credentialValueStored: boolean;
  credentialValueIncluded: boolean;
  rawEndpointUrlParsed: boolean;
  rawEndpointUrlIncluded: boolean;
  externalRequestSent: boolean;
  schemaMigrationExecutionAllowed: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  setnxexExecutionAllowed: boolean;
  managedAuditStorageBackend: boolean;
  orderAuthoritative: boolean;
}

export function isV114Ready(value: MiniKvV114CredentialResolverNonParticipationReference): boolean {
  return allChecks(
    value.evidencePresent,
    value.verificationDocumented,
    value.receiptVersion === "mini-kv-credential-resolver-non-participation-receipt.v1",
    value.releaseVersion === "v114",
    value.consumerHint === "Node v261 credential resolver upstream echo verification",
    RECEIPT_DIGEST.test(value.receiptDigest),
    value.sourceDecisionProfileVersion
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1",
    value.sourceDecisionState === "sandbox-endpoint-credential-resolver-decision-record-ready",
    value.sourceRecordMode === "sandbox-endpoint-credential-resolver-decision-record-only",
    value.sourceDecisionScope === "managed-audit-sandbox-endpoint-credential-resolver",
    value.sourceDecisionStatus === "human-review-required-before-credential-resolution",
    value.sourceSpan === "Node v259 sandbox endpoint handle upstream echo verification",
    value.sourceReadyForDecisionRecord,
    !value.sourceReadyForManagedAuditSandboxAdapterConnection,
    value.sourceReadOnlyDecisionRecord,
    value.sourceCredentialResolverDecisionOnly,
    !value.sourceExecutionAllowed,
    !value.sourceConnectsManagedAudit,
    !value.sourceReadsManagedAuditCredential,
    !value.sourceStoresManagedAuditCredential,
    !value.sourceCredentialValueRead,
    !value.sourceCredentialValueLoaded,
    !value.sourceCredentialValueIncluded,
    !value.sourceRawEndpointUrlParsed,
    !value.sourceRawEndpointUrlIncluded,
    !value.sourceExternalRequestSent,
    !value.sourceSchemaMigrationExecuted,
    !value.sourceAutomaticUpstreamStart,
    value.sourceRequiredDecisionFieldCount === 8,
    value.sourceExplicitNoGoConditionCount === 9,
    value.sourceCheckCount === value.sourcePassedCheckCount,
    value.sourceCheckCount === 20,
    value.sourceProductionBlockerCount === 0,
    value.sourceWarningCount === 2,
    value.sourceRecommendationCount === 2,
    value.sourceNodeV259Ready,
    value.sourceNodeV259BlocksRealConnection,
    value.sourceNodeV259CredentialBoundaryAligned,
    value.sourceNodeV259RawEndpointBoundaryAligned,
    value.sourceNodeV259WriteBoundaryAligned,
    value.sourceNodeV259AutoStartBoundaryAligned,
    value.sourceNodeV259KeepsMiniKvNonParticipant,
    value.sourceNodeV259EvidenceFileCount === 6,
    value.sourceNodeV259MatchedSnippetCount === 39,
    value.sourceNodeV259ReadyForNodeV260DecisionRecord,
    value.sourceUpstreamActionsStillDisabled,
    value.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    value.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    value.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
    value.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    value.operatorIdentityRequired,
    value.approvalCorrelationRequired,
    value.resolverMode === "policy-record-only-no-value-read",
    value.resolverCandidateImplementation === "not-implemented",
    value.requiredDecisionFieldCount === 8,
    value.explicitNoGoConditionCount === 9,
    sameStrings(value.requiredDecisionFieldIds, REQUIRED_DECISION_FIELD_IDS),
    sameStrings(value.explicitNoGoConditionCodes, EXPLICIT_NO_GO_CONDITION_CODES),
    value.dryRunOnly,
    value.credentialResolverDecisionOnly,
    !value.managedAuditWriteExecuted,
    !value.approvalLedgerWriteAllowed,
    !value.approvalLedgerWriteExecuted,
    !value.sandboxManagedAuditStateWriteAllowed,
    !value.credentialValueRequired,
    !value.schemaRehearsalExecutionAllowed,
    !value.sandboxAuditStorageBackend,
    isMiniKvNonParticipant(value),
  );
}

export function isV115Ready(value: MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference): boolean {
  return allChecks(
    value.evidencePresent,
    value.verificationDocumented,
    value.receiptVersion === "mini-kv-disabled-credential-resolver-precheck-non-participation-receipt.v1",
    value.releaseVersion === "v115",
    value.consumerHint === "Node v263 disabled credential resolver upstream echo verification",
    RECEIPT_DIGEST.test(value.receiptDigest),
    value.sourcePrecheckProfileVersion
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck.v1",
    value.sourcePrecheckState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
    value.sourcePrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    value.sourceSpan === "Node v260 + Java v105 + mini-kv v114",
    value.sourceReadyForDisabledPrecheck,
    !value.sourceReadyForManagedAuditSandboxAdapterConnection,
    value.sourceReadOnlyDisabledPrecheck,
    value.sourceDisabledCredentialResolverPrecheckOnly,
    !value.sourceCredentialResolverExecutionAllowed,
    !value.sourceExecutionAllowed,
    !value.sourceConnectsManagedAudit,
    !value.sourceReadsManagedAuditCredential,
    !value.sourceStoresManagedAuditCredential,
    !value.sourceCredentialValueRead,
    !value.sourceCredentialValueLoaded,
    !value.sourceCredentialValueStored,
    !value.sourceCredentialValueIncluded,
    !value.sourceRawEndpointUrlParsed,
    !value.sourceRawEndpointUrlIncluded,
    !value.sourceExternalRequestSent,
    !value.sourceSecretProviderInstantiated,
    !value.sourceResolverClientInstantiated,
    !value.sourceSchemaMigrationExecuted,
    !value.sourceAutomaticUpstreamStart,
    value.sourceRequiredEnvHandleCount === 6,
    value.sourceOptInGateCount === 2,
    value.sourceFailureClassCount === 7,
    value.sourceDryRunResponseFieldCount === 12,
    value.sourceInheritedNoGoConditionCount === 9,
    value.sourceCheckCount === value.sourcePassedCheckCount,
    value.sourceCheckCount === 24,
    value.sourceProductionBlockerCount === 0,
    value.sourceWarningCount === 2,
    value.sourceRecommendationCount === 2,
    value.sourceNodeV261Ready,
    value.sourceNodeV261VerificationMode
      === "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only",
    value.sourceNodeV261Span === "Node v260 + Java v105 + mini-kv v114",
    value.sourceNodeV261BlocksCredentialResolution,
    value.sourceNodeV261CredentialBoundaryAligned,
    value.sourceNodeV261RawEndpointBoundaryAligned,
    value.sourceNodeV261ConnectionBoundaryAligned,
    value.sourceNodeV261WriteBoundaryAligned,
    value.sourceNodeV261AutoStartBoundaryAligned,
    value.sourceNodeV261UpstreamActionsStillDisabled,
    value.disabledPrecheckMode === "sandbox-endpoint-credential-resolver-disabled-precheck-only",
    value.disabledPrecheckReadyState === "sandbox-endpoint-credential-resolver-disabled-precheck-ready",
    value.resolverImplementationStatus === "not-implemented",
    value.secretProviderImplementationStatus === "not-implemented",
    !value.resolverClientMayBeInstantiated,
    !value.secretProviderMayBeInstantiated,
    !value.credentialValueMayBeLoaded,
    !value.rawEndpointUrlMayBeParsed,
    !value.externalRequestMayBeSent,
    value.optInGateRequired,
    value.requiredEnvHandleCount === 6,
    value.optInGateCount === 2,
    value.failureClassCount === 7,
    value.dryRunResponseFieldCount === 12,
    value.inheritedNoGoConditionCount === 9,
    sameStrings(value.requiredEnvHandleNames, REQUIRED_ENV_HANDLE_NAMES),
    sameStrings(value.optInGateNames, OPT_IN_GATE_NAMES),
    sameStrings(value.failureTaxonomyCodes, V115_FAILURE_CODES),
    sameStrings(value.dryRunResponseFields, DRY_RUN_RESPONSE_FIELDS),
    sameStrings(value.inheritedNoGoConditions, INHERITED_NO_GO_CONDITIONS),
    value.dryRunOnly,
    value.disabledCredentialResolverPrecheckOnly,
    !value.resolverClientInstantiated,
    !value.managedAuditWriteExecuted,
    !value.approvalLedgerWriteAllowed,
    !value.approvalLedgerWriteExecuted,
    !value.sandboxManagedAuditStateWriteAllowed,
    !value.credentialValueRequired,
    !value.schemaRehearsalExecutionAllowed,
    !value.sandboxAuditStorageBackend,
    isMiniKvNonParticipant(value),
  );
}

export function isV116Ready(value: MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference): boolean {
  return allChecks(
    value.evidencePresent,
    value.verificationDocumented,
    value.receiptVersion === "mini-kv-test-only-resolver-shell-non-participation-receipt.v1",
    value.releaseVersion === "v116",
    value.consumerHint === "Node v265 test-only resolver shell upstream echo verification",
    RECEIPT_DIGEST.test(value.receiptDigest),
    value.sourceContractProfileVersion
      === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract.v1",
    value.sourceContractRoutePath === NODE_V264_ROUTE,
    value.sourceContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
    value.sourceShellMode === "test-only-fake-resolver-contract",
    value.sourceShellName === "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell",
    value.sourceResolverKind === "fake-in-memory",
    value.sourceReadyForTestOnlyResolverShellContract,
    value.sourceTestOnlyShell,
    value.sourceReadOnlyContract,
    value.sourceFakeResolverOnly,
    value.sourceHandleOnlyRequest,
    !value.sourceReadyForManagedAuditSandboxAdapterConnection,
    !value.sourceReadyForProductionAudit,
    !value.sourceReadyForProductionWindow,
    !value.sourceCredentialResolverExecutionAllowed,
    !value.sourceExecutionAllowed,
    !value.sourceConnectsManagedAudit,
    !value.sourceReadsManagedAuditCredential,
    !value.sourceStoresManagedAuditCredential,
    !value.sourceCredentialValueRead,
    !value.sourceCredentialValueLoaded,
    !value.sourceCredentialValueStored,
    !value.sourceCredentialValueIncluded,
    !value.sourceRawEndpointUrlParsed,
    !value.sourceRawEndpointUrlIncluded,
    !value.sourceExternalRequestSent,
    !value.sourceSecretProviderInstantiated,
    !value.sourceResolverClientInstantiated,
    !value.sourceSchemaMigrationExecuted,
    !value.sourceAutomaticUpstreamStart,
    !value.sourceProductionRecordWritten,
    value.sourceRequestShapeFieldCount === REQUEST_SHAPE_FIELDS.length,
    value.sourceResponseShapeFieldCount === RESPONSE_SHAPE_FIELDS.length,
    value.sourceFailureMappingCount === V116_FAILURE_CODES.length,
    value.sourceGuardConditionCount === GUARD_CONDITION_CODES.length,
    value.sourceCheckCount === value.sourcePassedCheckCount,
    value.sourceCheckCount === 20,
    value.sourceProductionBlockerCount === 0,
    value.sourceWarningCount === 2,
    value.sourceRecommendationCount === 2,
    value.sourceNodeV263Ready,
    value.sourceNodeV263VerificationMode
      === "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only",
    value.sourceNodeV263Span === "Node v262 + Java v106 + mini-kv v115",
    value.sourceNodeV263CheckCount === value.sourceNodeV263PassedCheckCount,
    value.sourceNodeV263CheckCount === 19,
    value.sourceNodeV263ProductionBlockerCount === 0,
    sameStrings(value.requestShapeFields, REQUEST_SHAPE_FIELDS),
    sameStrings(value.responseShapeFields, RESPONSE_SHAPE_FIELDS),
    sameStrings(value.failureClassCodes, V116_FAILURE_CODES),
    sameStrings(value.guardConditionCodes, GUARD_CONDITION_CODES),
    value.fakeResolverProbeRequestId === "managed-audit-v264-test-only-resolver-shell-probe",
    value.fakeResolverProbeAcceptedByFakeResolver,
    value.fakeResolverProbeNoCredentialRead,
    value.fakeResolverProbeNoExternalRequest,
    value.fakeResolverProbeNoProductionWrite,
    value.dryRunOnly,
    value.testOnlyResolverShellContractOnly,
    value.testOnlyShell,
    value.fakeResolverOnly,
    value.handleOnlyRequest,
    !value.resolverClientInstantiated,
    !value.managedAuditWriteExecuted,
    !value.approvalLedgerWriteAllowed,
    !value.approvalLedgerWriteExecuted,
    !value.sandboxManagedAuditStateWriteAllowed,
    !value.credentialValueRequired,
    !value.schemaRehearsalExecutionAllowed,
    !value.managedAuditStore,
    !value.sandboxAuditStorageBackend,
    !value.fakeResolverProbeExecuted,
    isMiniKvNonParticipant(value),
  );
}

export function isV117Ready(value: MiniKvV117FakeShellArchiveNonParticipationReference): boolean {
  return allChecks(
    value.evidencePresent,
    value.verificationDocumented,
    value.receiptVersion === "mini-kv-credential-resolver-fake-shell-archive-non-participation-receipt.v1",
    value.releaseVersion === "v117",
    value.consumerHint === "Node v267 credential resolver fake-shell archive upstream echo verification",
    RECEIPT_DIGEST.test(value.receiptDigest),
    value.sourceArchiveProfileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
    value.sourceArchiveVerificationState === "credential-resolver-fake-shell-archive-verification-ready",
    value.sourceReadyForCredentialResolverFakeShellArchiveVerification,
    value.sourceReadOnlyArchiveVerification,
    !value.sourceArchiveVerificationRerunsFakeShellBehavior,
    value.sourceNodeV264Ready,
    value.sourceNodeV265Ready,
    value.sourceNodeV265ConsumesUpstreamEchoes,
    value.archiveFileCount === 9,
    value.requiredSnippetCount === 24,
    value.matchedSnippetCount === 24,
    value.checkCount === 28,
    value.passedCheckCount === 28,
    value.productionBlockerCount === 0,
    value.warningCount === 1,
    value.recommendationCount === 2,
    !value.archiveFilesReadByMiniKv,
    !value.archiveVerificationRerunsFakeShellBehavior,
    value.archiveVerificationOnly,
    !value.resolverClientInstantiated,
    isMiniKvNonParticipant(value),
  );
}

function isMiniKvNonParticipant(value: MiniKvBoundary): boolean {
  return allChecks(
    value.readOnly,
    !value.executionAllowed,
    !value.credentialResolverImplemented,
    !value.credentialResolverInvoked,
    !value.secretProviderInstantiated,
    !value.nodeAutoStartAllowed,
    !value.javaAutoStartAllowed,
    !value.miniKvAutoStartAllowed,
    !value.externalAuditServiceAutoStartAllowed,
    !value.connectionExecutionAllowed,
    !value.storageWriteAllowed,
    !value.credentialValueReadAllowed,
    !value.credentialValueLoaded,
    !value.credentialValueStored,
    !value.credentialValueIncluded,
    !value.rawEndpointUrlParsed,
    !value.rawEndpointUrlIncluded,
    !value.externalRequestSent,
    !value.schemaMigrationExecutionAllowed,
    !value.restoreExecutionAllowed,
    !value.loadRestoreCompactExecuted,
    !value.setnxexExecutionAllowed,
    !value.managedAuditStorageBackend,
    !value.orderAuthoritative,
  );
}

function sameStrings(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function allChecks(...checks: boolean[]): boolean {
  return checks.every(Boolean);
}
