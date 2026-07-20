import type { BooleanFieldKey } from "../liveProbeReportUtils.js";
import type {
  JavaV122V126DisabledFakeHarnessEvidenceReference,
  MiniKvV127DisabledFakeHarnessNonParticipationReference,
  SourceNodeV288DisabledFakeHarnessContractReference,
} from "../managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationTypes.js";

type Source = SourceNodeV288DisabledFakeHarnessContractReference;
type JavaEcho = JavaV122V126DisabledFakeHarnessEvidenceReference;
type MiniKvReceipt = MiniKvV127DisabledFakeHarnessNonParticipationReference;

export const SOURCE_DISABLED_FIELDS = [
  "realResolverImplementationAllowed",
  "testOnlyFakeHarnessAllowed",
  "testOnlyFakeHarnessExecutionAllowed",
  "fakeHarnessRuntimeEnabled",
  "fakeHarnessInvocationAllowed",
  "executionAllowed",
  "connectsManagedAudit",
  "credentialValueRead",
  "credentialValueProvided",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
  "externalRequestSent",
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "fakeSecretProviderInstantiated",
  "fakeResolverClientInstantiated",
  "schemaMigrationExecuted",
  "approvalLedgerWritten",
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const JAVA_EVIDENCE_FIELDS = [
  "evidencePresent",
  "verificationDocumented",
  "integrationTestSplitComplete",
  "evidenceServiceCatalogStopgapApplied",
  "boundaryCatalogPresent",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const JAVA_BOUNDARY_FIELDS = [
  "noFakeHarnessRuntimeDocumented",
  "credentialValueBoundaryDocumented",
  "rawEndpointBoundaryDocumented",
  "managedAuditConnectionBoundaryDocumented",
  "ledgerAndSqlBoundaryDocumented",
  "didNotModifyProductionCodeDuringV122V125",
  "v126RefactorOnly",
] as const satisfies readonly BooleanFieldKey<JavaEcho>[];

export const MINIKV_RECEIPT_TRUE_FIELDS = [
  "evidencePresent",
  "verificationDocumented",
  "sourceReadyForDisabledFakeHarnessContract",
  "readyForNodeV289UpstreamEchoVerification",
  "readOnly",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const MINIKV_CONTRACT_TRUE_FIELDS = [
  "consumesNodeV288DisabledFakeHarnessContract",
  "sourceReadOnlyContract",
  "sourceDisabledFakeHarnessContractOnly",
  "disabledFakeHarnessContractOnly",
  "disabledFakeHarnessNonParticipationReceiptOnly",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_CREDENTIAL_FIELDS = [
  "credentialValueRead",
  "credentialValueProvided",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_CREDENTIAL_FIELDS = [
  "credentialValueReadAllowed",
  "credentialValueRead",
  "credentialValueProvided",
  "credentialValueLoaded",
  "credentialValueStored",
  "credentialValueIncluded",
  "credentialValueRendered",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_ENDPOINT_FIELDS = [
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_ENDPOINT_FIELDS = [
  "rawEndpointUrlParseAllowed",
  "rawEndpointUrlRenderAllowed",
  "rawEndpointUrlParsed",
  "rawEndpointUrlRendered",
  "rawEndpointUrlProvided",
  "rawEndpointUrlIncluded",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_PROVIDER_FIELDS = [
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "fakeSecretProviderInstantiated",
  "fakeResolverClientInstantiated",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_PROVIDER_FIELDS = [
  "secretProviderInstantiated",
  "resolverClientInstantiated",
  "fakeSecretProviderInstantiated",
  "fakeResolverClientInstantiated",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_CONNECTION_FIELDS = [
  "connectsManagedAudit",
  "externalRequestSent",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_CONNECTION_FIELDS = [
  "externalRequestAllowed",
  "externalRequestSent",
  "httpTcpDialAllowed",
  "connectsManagedAudit",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_WRITE_FIELDS = [
  "executionAllowed",
  "schemaMigrationExecuted",
  "approvalLedgerWritten",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_WRITE_FIELDS = [
  "storageWriteAllowed",
  "writeCommandsExecuted",
  "adminCommandsExecuted",
  "runtimeWriteObserved",
  "approvalLedgerWriteAllowed",
  "approvalLedgerWritten",
  "approvalLedgerWriteExecuted",
  "managedAuditWriteExecuted",
  "productionRecordWritten",
  "schemaMigrationAllowed",
  "schemaMigrationExecuted",
  "restoreExecutionAllowed",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const SOURCE_AUTO_START_FIELDS = [
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<Source>[];

export const MINIKV_AUTO_START_FIELDS = [
  "automaticUpstreamStartAllowed",
  "automaticUpstreamStart",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const MINIKV_AUTHORITY_FIELDS = [
  "auditAuthoritative",
  "orderAuthoritative",
  "managedAuditStore",
  "managedAuditStorageBackend",
  "sandboxAuditStorageBackend",
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];

export const MINIKV_RUNTIME_FALSE_FIELDS = [
  "fakeHarnessRuntimeEnabled",
  "fakeHarnessInvocationAllowed",
  "fakeHarnessRuntimeImplemented",
  "fakeHarnessRuntimeInvoked",
  "credentialResolverImplemented",
  "credentialResolverInvoked",
  ...MINIKV_PROVIDER_FIELDS,
  ...MINIKV_CREDENTIAL_FIELDS,
  ...MINIKV_ENDPOINT_FIELDS,
  ...MINIKV_CONNECTION_FIELDS,
  "readsManagedAuditCredential",
  "storesManagedAuditCredential",
  ...MINIKV_AUTHORITY_FIELDS,
  ...MINIKV_WRITE_FIELDS,
  ...MINIKV_AUTO_START_FIELDS,
] as const satisfies readonly BooleanFieldKey<MiniKvReceipt>[];
