import type { BooleanFieldKey } from "../liveProbeReportUtils.js";
import type {
  JavaV121ImplementationPlanEchoReference,
  MiniKvV126ImplementationPlanNonParticipationReference,
  SourceNodeV283ImplementationPlanDraftReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerificationTypes.js";

type Source = SourceNodeV283ImplementationPlanDraftReference;
type JavaEcho = JavaV121ImplementationPlanEchoReference;
type MiniKvReceipt = MiniKvV126ImplementationPlanNonParticipationReference;

export const PLAN_SOURCE_BLOCKED_FIELDS = [
  "realResolverImplementationAllowed",
  "testOnlyFakeHarnessAllowed",
  "executionAllowed",
  "connectsManagedAudit",
  "credentialValueRead",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
  "externalRequestSent",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "schemaMigrationExecuted",
  "approvalLedgerWritten",
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_BLOCKED_FIELDS = [
  "readyForManagedAuditResolverImplementation",
  "readyForTestOnlyFakeHarnessPrecheck",
  "credentialValueRead",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
  "externalRequestSent",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "connectsManagedAudit",
  "approvalLedgerWritten",
  "managedAuditStoreWritten",
  "sqlExecuted",
  "schemaMigrationExecuted",
  "rollbackExecuted",
  "automaticUpstreamStart",
  "javaStartedNodeOrMiniKv",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_RECEIPT_TRUE_FIELDS = [
  "evidencePresent",
  "verificationDocumented",
  "readyForOriginalNodeV284Verification",
  "readyForJavaV121MiniKvV126Echo",
  "readOnly",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_MINIKV_SIDE_EFFECT_FIELDS = [
  "credentialResolverImplemented",
  "credentialResolverInvoked",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
  "credentialValueReadAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
  "rawEndpointUrlParseAllowed",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRenderAllowed",
  "rawEndpointUrlRendered",
  "rawEndpointUrlIncluded",
  "externalRequestAllowed",
  "externalRequestSent",
  "connectsManagedAudit",
  "storageWriteAllowed",
  "writeCommandsExecuted",
  "adminCommandsExecuted",
  "approvalLedgerWriteAllowed",
  "approvalLedgerWritten",
  "schemaMigrationExecuted",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
  "automaticUpstreamStart",
  "managedAuditStorageBackend",
  "auditAuthoritative",
  "orderAuthoritative",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_MINIKV_RUNTIME_FIELDS = [
  "executionAllowed",
  ...PLAN_MINIKV_SIDE_EFFECT_FIELDS,
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_CREDENTIAL_FIELDS = [
  "credentialValueRead",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_CREDENTIAL_FIELDS = [
  "credentialValueRead",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_CREDENTIAL_FIELDS = [
  "credentialValueReadAllowed",
  "credentialValueRead",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_ENDPOINT_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_ENDPOINT_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_ENDPOINT_FIELDS = [
  "rawEndpointUrlParseAllowed",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRenderAllowed",
  "rawEndpointUrlRendered",
  "rawEndpointUrlIncluded",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_RESOLVER_FIELDS = [
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_RESOLVER_FIELDS = [
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_RESOLVER_FIELDS = [
  "credentialResolverImplemented",
  "credentialResolverInvoked",
  "resolverClientInstantiated",
  "secretProviderInstantiated",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_CONNECTION_FIELDS = [
  "connectsManagedAudit",
  "externalRequestSent",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_CONNECTION_FIELDS = [
  "connectsManagedAudit",
  "externalRequestSent",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_CONNECTION_FIELDS = [
  "connectsManagedAudit",
  "externalRequestAllowed",
  "externalRequestSent",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_WRITE_FIELDS = [
  "executionAllowed",
  "schemaMigrationExecuted",
  "approvalLedgerWritten",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_WRITE_FIELDS = [
  "approvalLedgerWritten",
  "sqlExecuted",
  "schemaMigrationExecuted",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_WRITE_FIELDS = [
  "storageWriteAllowed",
  "writeCommandsExecuted",
  "adminCommandsExecuted",
  "approvalLedgerWriteAllowed",
  "approvalLedgerWritten",
  "schemaMigrationExecuted",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const PLAN_SOURCE_AUTO_FIELDS = [
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const PLAN_JAVA_AUTO_FIELDS = [
  "automaticUpstreamStart",
  "javaStartedNodeOrMiniKv",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const PLAN_MINIKV_AUTO_FIELDS = [
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];
