package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffDesignReviewState",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceExecutionDeniedReady",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffReadyForNodeV296",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRuntimeImplemented",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffCredentialValueRead",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffExternalRequestSent",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSqlExecuted",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffAutomaticUpstreamStart"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewState=disabled-runtime-shell-design-review-ready",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.designReviewEcho.designReviewOnly=true",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.designReviewEcho.recommendsParallelUpstreamEchoBeforeRuntimeImplementation=true",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.disabledRuntimeShellImplemented=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.disabledRuntimeShellInvocationAllowed=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification=true",
            "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.readyForDisabledRuntimeShellImplementation=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewProfile with Node v295",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.designReviewEcho.recommendsParallelUpstreamEchoBeforeRuntimeImplementation=true before Node v296",
            "Require managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification=true before Node v296",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.disabledRuntimeShellImplemented=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.disabledRuntimeShellInvocationAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false"
    );

    private static final List<String> HANDOFF_BOUNDARY_CODES = List.of(
            "NO_RUNTIME_IMPLEMENTATION",
            "NO_RUNTIME_INVOCATION",
            "NO_CREDENTIAL_VALUE_READ",
            "NO_RAW_ENDPOINT_URL_PARSE",
            "NO_PROVIDER_CLIENT_INSTANTIATION",
            "NO_EXTERNAL_REQUEST",
            "NO_LEDGER_SQL_OR_SCHEMA_MIGRATION",
            "NO_AUTOMATIC_UPSTREAM_START"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "DISABLED_RUNTIME_SHELL_HANDOFF_ECHO_ONLY",
            "NODE_V296_MUST_WAIT_FOR_MINI_KV_V130"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "CONSUME_JAVA_HANDOFF_WITH_MINI_KV_NON_PARTICIPATION",
            "KEEP_DISABLED_RUNTIME_SHELL_IMPLEMENTATION_BLOCKED_UNTIL_NODE_V296"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v130 disabled runtime shell non-participation receipt",
            "Node v296 disabled runtime shell upstream echo verification"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt sourceReceipt
    ) {
        RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho sourceEcho =
                sourceEcho(sourceReceipt);
        RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho designReviewEcho =
                designReviewEcho();
        RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks checks =
                checks(sourceEcho, designReviewEcho, sideEffectBoundary);
        EchoWorkflowReadiness readiness = readiness(sourceEcho, designReviewEcho, checks, sideEffectBoundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(sourceReceipt, sourceEcho, designReviewEcho, checks, sideEffectBoundary,
                readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_HANDOFF_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_EXECUTION_DENIED_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_VERSION,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_PROFILE,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_ENDPOINT,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_STATE,
                OpsEvidenceService
                        .NODE_V296_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V296_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V296_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_UPSTREAM_ECHO_VERIFICATION_STATE,
                "java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only",
                "Node v295",
                sourceEcho,
                designReviewEcho,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceExecutionDeniedEchoed"),
                readiness.ready("nodeV295DesignReviewEchoed"),
                readiness.ready("disabledRuntimeShellHandoffEchoed"),
                readiness.ready("parallelUpstreamEchoRequestEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                HANDOFF_BOUNDARY_CODES,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                receiptWarnings,
                NODE_VERIFICATION_ACTIONS
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    static List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt receipt
    ) {
        return boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffDesignReviewState",
                        receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewState()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceExecutionDeniedReady",
                        receipt.sourceExecutionDeniedEcho().sourceReadyForNodeV293()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffReadyForNodeV296",
                        receipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRuntimeImplemented",
                        receipt.sideEffectBoundary().disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRuntimeInvocationAllowed",
                        receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt receipt
    ) {
        return receipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !receipt.sideEffectBoundary().disabledRuntimeShellImplemented()
                && !receipt.sideEffectBoundary().disabledRuntimeShellEnabled()
                && !receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed()
                && !receipt.sideEffectBoundary().fakeHarnessRuntimeAllowed()
                && !receipt.sideEffectBoundary().testOnlyFakeHarnessAllowed()
                && !receipt.sideEffectBoundary().testOnlyFakeHarnessExecutionAllowed()
                && !receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed()
                && !receipt.sideEffectBoundary().executionAllowed()
                && !receipt.sideEffectBoundary().connectsManagedAudit()
                && !receipt.sideEffectBoundary().readsManagedAuditCredential()
                && !receipt.sideEffectBoundary().storesManagedAuditCredential()
                && !receipt.sideEffectBoundary().credentialValueRead()
                && !receipt.sideEffectBoundary().credentialValueProvided()
                && !receipt.sideEffectBoundary().rawEndpointUrlParsed()
                && !receipt.sideEffectBoundary().rawEndpointUrlRendered()
                && !receipt.sideEffectBoundary().externalRequestSent()
                && !receipt.sideEffectBoundary().secretProviderInstantiated()
                && !receipt.sideEffectBoundary().resolverClientInstantiated()
                && !receipt.sideEffectBoundary().fakeSecretProviderInstantiated()
                && !receipt.sideEffectBoundary().fakeResolverClientInstantiated()
                && !receipt.sideEffectBoundary().approvalLedgerWritten()
                && !receipt.sideEffectBoundary().managedAuditStoreWritten()
                && !receipt.sideEffectBoundary().sqlExecuted()
                && !receipt.sideEffectBoundary().schemaMigrationExecuted()
                && !receipt.sideEffectBoundary().rollbackExecuted()
                && !receipt.sideEffectBoundary().automaticUpstreamStart()
                && !receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness();
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho sourceEcho(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt sourceReceipt
    ) {
        return new RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho(
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_EXECUTION_DENIED_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                sourceReceipt.consumedByNodeCredentialResolverFakeHarnessReadinessDecisionVersion(),
                sourceReceipt.consumedByNodeCredentialResolverFakeHarnessReadinessDecisionState(),
                sourceReceipt.readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification(),
                sourceReceipt.javaExecutionDeniedEchoPresent(),
                sourceReceipt.readyForDisabledRuntimeShell(),
                sourceReceipt.readyForFakeHarnessRuntime(),
                sourceReceipt.readyForManagedAuditResolverImplementation(),
                sourceReceipt.readyForProductionAudit(),
                sourceReceipt.readyForProductionWindow(),
                sourceReceipt.sideEffectBoundary().disabledRuntimeShellAllowed(),
                sourceReceipt.sideEffectBoundary().fakeHarnessRuntimeAllowed(),
                sourceReceipt.sideEffectBoundary().executionAllowed(),
                sourceReceipt.sideEffectBoundary().connectsManagedAudit(),
                sourceReceipt.sideEffectBoundary().readsManagedAuditCredential(),
                sourceReceipt.sideEffectBoundary().storesManagedAuditCredential(),
                sourceReceipt.sideEffectBoundary().credentialValueRead(),
                sourceReceipt.sideEffectBoundary().rawEndpointUrlParsed(),
                sourceReceipt.sideEffectBoundary().rawEndpointUrlRendered(),
                sourceReceipt.sideEffectBoundary().externalRequestSent(),
                sourceReceipt.sideEffectBoundary().secretProviderInstantiated(),
                sourceReceipt.sideEffectBoundary().resolverClientInstantiated(),
                sourceReceipt.sideEffectBoundary().approvalLedgerWritten(),
                sourceReceipt.sideEffectBoundary().managedAuditStoreWritten(),
                sourceReceipt.sideEffectBoundary().sqlExecuted(),
                sourceReceipt.sideEffectBoundary().schemaMigrationExecuted(),
                sourceReceipt.sideEffectBoundary().automaticUpstreamStart(),
                sourceReceipt.denialReasonCodes().size(),
                sourceReceipt.noGoConditionCodes().size(),
                sourceReceipt.prohibitedActions().size()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho designReviewEcho() {
        return new RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho(
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_VERSION,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_PROFILE,
                OpsEvidenceService.NODE_V295_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_DESIGN_REVIEW_STATE,
                "design-review-only",
                "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation",
                "Node v296 disabled runtime shell implementation decision",
                true,
                true,
                true,
                true,
                true,
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                10,
                11,
                2,
                3,
                2,
                2
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary
    sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary(
                true,
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks checks(
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho designReviewEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary sideEffectBoundary
    ) {
        boolean sourceStillBlocksRuntime = !sourceEcho.sourceReadyForDisabledRuntimeShell()
                && !sourceEcho.disabledRuntimeShellAllowed()
                && !sourceEcho.executionAllowed();
        boolean noRuntime = !sideEffectBoundary.disabledRuntimeShellImplemented()
                && !sideEffectBoundary.disabledRuntimeShellInvocationAllowed()
                && !sideEffectBoundary.executionAllowed();
        boolean noProviderClient = !sideEffectBoundary.secretProviderInstantiated()
                && !sideEffectBoundary.resolverClientInstantiated()
                && !sideEffectBoundary.fakeSecretProviderInstantiated()
                && !sideEffectBoundary.fakeResolverClientInstantiated();
        boolean noWritesOrMigrations = !sideEffectBoundary.approvalLedgerWritten()
                && !sideEffectBoundary.managedAuditStoreWritten()
                && !sideEffectBoundary.sqlExecuted()
                && !sideEffectBoundary.schemaMigrationExecuted();
        boolean readyForNodeV296 = sourceEcho.sourceReadyForNodeV293()
                && sourceStillBlocksRuntime
                && designReviewEcho.designReviewReady()
                && designReviewEcho.recommendsParallelUpstreamEchoBeforeRuntimeImplementation()
                && noRuntime
                && noProviderClient
                && noWritesOrMigrations
                && !sideEffectBoundary.credentialValueRead()
                && !sideEffectBoundary.rawEndpointUrlParsed()
                && !sideEffectBoundary.externalRequestSent()
                && !sideEffectBoundary.automaticUpstreamStart();
        return new RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks(
                sourceEcho.sourceReadyForNodeV293() && sourceEcho.javaExecutionDeniedEchoPresent(),
                sourceStillBlocksRuntime,
                designReviewEcho.designReviewReady(),
                designReviewEcho.recommendsParallelUpstreamEchoBeforeRuntimeImplementation(),
                sideEffectBoundary.handoffEchoOnly(),
                sideEffectBoundary.readOnlyHandoffEcho(),
                noRuntime,
                !sideEffectBoundary.disabledRuntimeShellInvocationAllowed(),
                !sideEffectBoundary.credentialValueRead() && !sideEffectBoundary.credentialValueProvided(),
                !sideEffectBoundary.rawEndpointUrlParsed() && !sideEffectBoundary.rawEndpointUrlRendered(),
                noProviderClient,
                !sideEffectBoundary.externalRequestSent(),
                noWritesOrMigrations,
                !sideEffectBoundary.automaticUpstreamStart(),
                !sideEffectBoundary.productionAuditAllowed(),
                !sideEffectBoundary.productionWindowAllowed(),
                readyForNodeV296
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho designReviewEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks checks,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary sideEffectBoundary
    ) {
        return workflowReadiness(
                workflowStep("sourceExecutionDeniedEchoed", checks.sourceExecutionDeniedEchoReady()),
                workflowStep("nodeV295DesignReviewEchoed", checks.nodeV295DesignReviewReady()),
                workflowStep("disabledRuntimeShellHandoffEchoed", checks.handoffEchoOnly()
                        && checks.readOnlyHandoffEcho()),
                workflowStep("parallelUpstreamEchoRequestEchoed",
                        checks.designReviewRequiresParallelUpstreamEcho()),
                workflowStep("noRuntimeImplementationEchoed", checks.noRuntimeImplementationCreated()
                        && sourceEcho.sourceReadyForDisabledRuntimeShell() == false
                        && !designReviewEcho.readyForDisabledRuntimeShellImplementation()),
                workflowStep("noRuntimeInvocationEchoed", checks.noRuntimeInvocationAllowed()
                        && !designReviewEcho.readyForDisabledRuntimeShellInvocation()),
                workflowStep("noCredentialReadEchoed", checks.noCredentialValueRead()),
                workflowStep("noRawEndpointParseEchoed", checks.noRawEndpointUrlParsed()),
                workflowStep("noProviderClientInstantiationEchoed", checks.noProviderClientInstantiated()),
                workflowStep("noExternalRequestEchoed", checks.noExternalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed", checks.noWritesOrMigrations()),
                workflowStep("noAutoStartBoundaryEchoed", checks.noAutomaticUpstreamStart()
                        && !sideEffectBoundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt sourceReceipt,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellDesignReviewEcho designReviewEcho,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffChecks checks,
            RehearsalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffSideEffectBoundary sideEffectBoundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_RUNTIME_SHELL_HANDOFF_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceExecutionDeniedEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceExecutionDeniedEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceEcho", sourceEcho),
                ReleaseApprovalDigestSupport.line("designReviewEcho", designReviewEcho),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceExecutionDeniedEchoed", "SOURCE_EXECUTION_DENIED_ECHO_NOT_READY"),
                readiness.warningIfMissing("nodeV295DesignReviewEchoed", "NODE_V295_DESIGN_REVIEW_NOT_READY"),
                readiness.warningIfMissing("parallelUpstreamEchoRequestEchoed",
                        "PARALLEL_UPSTREAM_ECHO_REQUEST_MISSING"),
                readiness.warningIfMissing("noRuntimeImplementationEchoed",
                        "DISABLED_RUNTIME_SHELL_IMPLEMENTATION_OPEN"),
                readiness.warningIfMissing("noWriteOrMigrationEchoed",
                        "DISABLED_RUNTIME_SHELL_WRITE_BOUNDARY_OPEN")
        );
    }
}
