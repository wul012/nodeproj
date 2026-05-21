package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt;

import org.junit.jupiter.api.Test;

class OpsEvidenceServiceCredentialResolverDisabledRuntimeShellHandoffEchoTests
        extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsReadOnlyDisabledRuntimeShellHandoffEchoReceiptForNodeV296() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-runtime-shell-handoff-echo-receipt.v1"
                );
        assertThat(receipt.sourceExecutionDeniedEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-execution-denied-echo-receipt.v1"
                );
        assertThat(receipt.sourceExecutionDeniedEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v37");
        assertThat(receipt.sourceExecutionDeniedEchoReceiptDigest())
                .isEqualTo(rehearsal.managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt()
                        .receiptDigest());
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewVersion())
                .isEqualTo("Node v295");
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review.v1"
                );
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review"
                );
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewState())
                .isEqualTo("disabled-runtime-shell-design-review-ready");
        assertThat(receipt.nextNodeCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationVersion())
                .isEqualTo("Node v296");
        assertThat(receipt.nextNodeCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification.v1"
                );
        assertThat(receipt.nextNodeCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationState())
                .isEqualTo("disabled-runtime-shell-upstream-echo-verification-awaiting-java-mini-kv");
        assertThat(receipt.handoffEchoMode())
                .isEqualTo("java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v295");

        assertThat(receipt.sourceExecutionDeniedEcho().sourceReadyForNodeV293()).isTrue();
        assertThat(receipt.sourceExecutionDeniedEcho().javaExecutionDeniedEchoPresent()).isTrue();
        assertThat(receipt.sourceExecutionDeniedEcho().sourceReadyForDisabledRuntimeShell()).isFalse();
        assertThat(receipt.sourceExecutionDeniedEcho().disabledRuntimeShellAllowed()).isFalse();
        assertThat(receipt.sourceExecutionDeniedEcho().credentialValueRead()).isFalse();
        assertThat(receipt.sourceExecutionDeniedEcho().rawEndpointUrlParsed()).isFalse();
        assertThat(receipt.sourceExecutionDeniedEcho().approvalLedgerWritten()).isFalse();

        assertThat(receipt.designReviewEcho().sourceVersion()).isEqualTo("Node v295");
        assertThat(receipt.designReviewEcho().reviewMode()).isEqualTo("design-review-only");
        assertThat(receipt.designReviewEcho().decision())
                .isEqualTo("request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation");
        assertThat(receipt.designReviewEcho().designReviewReady()).isTrue();
        assertThat(receipt.designReviewEcho().designReviewOnly()).isTrue();
        assertThat(receipt.designReviewEcho().readOnlyDesignReview()).isTrue();
        assertThat(receipt.designReviewEcho().recommendsParallelUpstreamEchoBeforeRuntimeImplementation())
                .isTrue();
        assertThat(receipt.designReviewEcho().readyForNodeV296RuntimeShellImplementation()).isFalse();
        assertThat(receipt.designReviewEcho().readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.designReviewEcho().runtimeShellImplemented()).isFalse();
        assertThat(receipt.designReviewEcho().runtimeShellInvocationAllowed()).isFalse();
        assertThat(receipt.designReviewEcho().credentialValueRead()).isFalse();
        assertThat(receipt.designReviewEcho().rawEndpointUrlParsed()).isFalse();
        assertThat(receipt.designReviewEcho().externalRequestSent()).isFalse();
        assertThat(receipt.designReviewEcho().approvalLedgerWritten()).isFalse();

        assertThat(receipt.checks().sourceExecutionDeniedEchoReady()).isTrue();
        assertThat(receipt.checks().sourceStillBlocksDisabledRuntimeShell()).isTrue();
        assertThat(receipt.checks().nodeV295DesignReviewReady()).isTrue();
        assertThat(receipt.checks().designReviewRequiresParallelUpstreamEcho()).isTrue();
        assertThat(receipt.checks().noRuntimeImplementationCreated()).isTrue();
        assertThat(receipt.checks().noCredentialValueRead()).isTrue();
        assertThat(receipt.checks().noProviderClientInstantiated()).isTrue();
        assertThat(receipt.checks().noWritesOrMigrations()).isTrue();
        assertThat(receipt.checks().readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification()).isTrue();

        assertRuntimeBlocked(
                receipt.sideEffectBoundary().disabledRuntimeShellImplemented(),
                receipt.sideEffectBoundary().disabledRuntimeShellEnabled(),
                receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                receipt.sideEffectBoundary().fakeHarnessRuntimeAllowed(),
                receipt.sideEffectBoundary().testOnlyFakeHarnessAllowed(),
                receipt.sideEffectBoundary().testOnlyFakeHarnessExecutionAllowed(),
                receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed(),
                receipt.sideEffectBoundary().productionAuditAllowed(),
                receipt.sideEffectBoundary().productionWindowAllowed(),
                receipt.sideEffectBoundary().executionAllowed(),
                receipt.sideEffectBoundary().connectsManagedAudit(),
                receipt.sideEffectBoundary().readsManagedAuditCredential(),
                receipt.sideEffectBoundary().storesManagedAuditCredential(),
                receipt.sideEffectBoundary().credentialValueRead(),
                receipt.sideEffectBoundary().credentialValueProvided(),
                receipt.sideEffectBoundary().rawEndpointUrlParsed(),
                receipt.sideEffectBoundary().rawEndpointUrlRendered(),
                receipt.sideEffectBoundary().externalRequestSent(),
                receipt.sideEffectBoundary().secretProviderInstantiated(),
                receipt.sideEffectBoundary().resolverClientInstantiated(),
                receipt.sideEffectBoundary().fakeSecretProviderInstantiated(),
                receipt.sideEffectBoundary().fakeResolverClientInstantiated(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().managedAuditStoreWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().rollbackExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness()
        );

        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceExecutionDeniedEchoed",
                        "nodeV295DesignReviewEchoed",
                        "disabledRuntimeShellHandoffEchoed",
                        "parallelUpstreamEchoRequestEchoed",
                        "noRuntimeImplementationEchoed",
                        "noRuntimeInvocationEchoed",
                        "noCredentialReadEchoed",
                        "noRawEndpointParseEchoed",
                        "noProviderClientInstantiationEchoed",
                        "noExternalRequestEchoed",
                        "noWriteOrMigrationEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.handoffBoundaryCodes())
                .contains(
                        "NO_RUNTIME_IMPLEMENTATION",
                        "NO_CREDENTIAL_VALUE_READ",
                        "NO_PROVIDER_CLIENT_INSTANTIATION",
                        "NO_LEDGER_SQL_OR_SCHEMA_MIGRATION"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v130 disabled runtime shell non-participation receipt",
                        "Node v296 disabled runtime shell upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v38");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffDesignReviewState",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffRuntimeImplemented",
                        "sandboxEndpointCredentialResolverDisabledRuntimeShellHandoffApprovalLedgerWritten"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.designReviewEcho.designReviewOnly=true",
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.sideEffectBoundary.disabledRuntimeShellImplemented=false",
                        "managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.consumedByNodeCredentialResolverDisabledRuntimeShellDesignReviewProfile with Node v295",
                        "Verify managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.designReviewEcho.recommendsParallelUpstreamEchoBeforeRuntimeImplementation=true before Node v296",
                        "Require managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt.readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification=true before Node v296"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated.managedAuditSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
