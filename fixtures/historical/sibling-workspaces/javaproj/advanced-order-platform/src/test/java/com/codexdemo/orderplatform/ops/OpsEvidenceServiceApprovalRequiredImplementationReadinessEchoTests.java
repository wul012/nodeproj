package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceApprovalRequiredImplementationReadinessEchoTests extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsApprovalRequiredImplementationReadinessEchoReceipt() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt receipt =
                rehearsal
                        .managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-required-implementation-readiness-echo-receipt.v1"
                );
        assertThat(receipt.sourceDisabledImplementationCandidateEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-disabled-implementation-candidate-echo-receipt.v2"
                );
        assertThat(receipt.sourceDisabledImplementationCandidateEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v34");
        assertThat(receipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewVersion())
                .isEqualTo("Node v281");
        assertThat(receipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review.v1"
                );
        assertThat(receipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review"
                );
        assertThat(receipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewState())
                .isEqualTo("credential-resolver-approval-required-implementation-readiness-review-ready");
        assertThat(receipt.sourceNodeApprovalRequiredBoundaryUpstreamEchoVerificationVersion()).isEqualTo("Node v275");
        assertThat(receipt.sourceNodeApprovalRequiredBoundaryUpstreamEchoVerificationState())
                .isEqualTo("credential-resolver-approval-required-boundary-upstream-echo-verification-ready");
        assertThat(receipt.nodeV282MayConsume()).isTrue();
        assertThat(receipt.implementationReadinessEchoMode())
                .isEqualTo("java-v116-credential-resolver-approval-required-implementation-readiness-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v281");

        assertThat(receipt.sourceNodeV281().sourceVersion()).isEqualTo("Node v281");
        assertThat(receipt.sourceNodeV281()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview())
                .isTrue();
        assertThat(receipt.sourceNodeV281().readyForJavaV116MiniKvV122Echo()).isTrue();
        assertThat(receipt.sourceNodeV281().readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.sourceNodeV281().summary().checkCount()).isEqualTo(21);
        assertThat(receipt.sourceNodeV281().summary().passedCheckCount()).isEqualTo(21);
        assertThat(receipt.sourceNodeV281().summary().boundaryCount()).isEqualTo(6);
        assertThat(receipt.sourceNodeV281().summary().requiredArtifactCount()).isEqualTo(18);

        assertThat(receipt.sourceNodeV275().sourceSpan()).isEqualTo("Node v274 + Java v115 + mini-kv v121");
        assertThat(receipt.sourceNodeV275().sourceCheckCount()).isEqualTo(25);
        assertThat(receipt.sourceNodeV275().sourcePassedCheckCount()).isEqualTo(25);
        assertThat(receipt.sourceNodeV275().approvalRequiredBoundaryCodes())
                .containsExactly(
                        "CREDENTIAL_HANDLE",
                        "ENDPOINT_HANDLE",
                        "OPERATOR_APPROVAL",
                        "ROLLBACK_BOUNDARY",
                        "SCHEMA_MIGRATION_POLICY",
                        "AUDIT_LEDGER_WRITE_POLICY"
                );
        assertThat(receipt.sourceNodeV275().approvalRequiredRequirementCodes())
                .containsExactly(
                        "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
                        "ENDPOINT_HANDLE_BOUNDARY_MISSING",
                        "OPERATOR_APPROVAL_BOUNDARY_MISSING",
                        "ROLLBACK_BOUNDARY_MISSING",
                        "SCHEMA_MIGRATION_POLICY_MISSING",
                        "AUDIT_LEDGER_WRITE_POLICY_MISSING"
                );
        assertRuntimeBlocked(
                receipt.sourceNodeV275().realResolverImplementationAllowed(),
                receipt.sourceNodeV275().executionAllowed(),
                receipt.sourceNodeV275().credentialValueRead(),
                receipt.sourceNodeV275().rawEndpointUrlParsed(),
                receipt.sourceNodeV275().connectsManagedAudit(),
                receipt.sourceNodeV275().approvalLedgerWritten(),
                receipt.sourceNodeV275().automaticUpstreamStart()
        );

        assertThat(receipt.readinessReview().reviewMode())
                .isEqualTo("node-v281-approval-required-implementation-readiness-review-only");
        assertThat(receipt.readinessReview().implementationStage())
                .isEqualTo("blocked-until-java-v116-mini-kv-v122-and-node-v282");
        assertThat(receipt.readinessReview().allApprovalRequiredBoundariesEchoReady()).isTrue();
        assertThat(receipt.readinessReview().allApprovalRequiredBoundariesImplementationBlocked()).isTrue();
        assertThat(receipt.readinessReview().allRequiredArtifactsNamed()).isTrue();
        assertThat(receipt.readinessReview().nodeV282VerificationRequired()).isTrue();

        assertThat(receipt.boundaryReadiness())
                .extracting(RehearsalSandboxEndpointCredentialResolverApprovalRequiredImplementationBoundaryReadiness::code)
                .containsExactly(
                        "CREDENTIAL_HANDLE",
                        "ENDPOINT_HANDLE",
                        "OPERATOR_APPROVAL",
                        "ROLLBACK_BOUNDARY",
                        "SCHEMA_MIGRATION_POLICY",
                        "AUDIT_LEDGER_WRITE_POLICY"
                );
        assertThat(receipt.boundaryReadiness())
                .allMatch(boundary -> boundary.readinessState().equals("echo-ready-implementation-blocked")
                        && boundary.implementationDisposition().equals("requires-explicit-follow-up-artifacts")
                        && boundary.requiredArtifacts().size() == 3
                        && boundary.prohibitedRuntimeActions().size() == 3
                        && boundary.readyForJavaV116Echo()
                        && boundary.readyForMiniKvV122Receipt()
                        && !boundary.readyForNodeV282Verification()
                        && !boundary.readyForRuntimeImplementation());
        assertThat(receipt.requiredArtifactIds()).hasSize(18)
                .contains(
                        "credential-handle-review-id",
                        "allowlist-review-status",
                        "approval-correlation-marker",
                        "rollback-abort-marker",
                        "sql-execution-prohibition-marker",
                        "approval-ledger-write-policy-id"
                );

        assertThat(receipt.checks().sourceNodeV275Ready()).isTrue();
        assertThat(receipt.checks().boundaryReadinessCountExpected()).isTrue();
        assertThat(receipt.checks().allBoundariesEchoReadyForJavaV116()).isTrue();
        assertThat(receipt.checks().allBoundariesStillBlockedForRuntimeImplementation()).isTrue();

        assertRuntimeBlocked(
                receipt.sideEffectBoundary().readyForManagedAuditResolverImplementation(),
                receipt.sideEffectBoundary().executionAllowed(),
                receipt.sideEffectBoundary().credentialValueRead(),
                receipt.sideEffectBoundary().rawEndpointUrlParsed(),
                receipt.sideEffectBoundary().connectsManagedAudit(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().automaticUpstreamStart()
        );
        assertThat(receipt.sideEffectBoundary().sqlExecuted()).isFalse();
        assertThat(receipt.sideEffectBoundary().schemaMigrationExecuted()).isFalse();
        assertThat(receipt.sideEffectBoundary().javaStartedNodeOrMiniKv()).isFalse();

        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceNodeV281Echoed",
                        "sourceNodeV275Echoed",
                        "readinessReviewEchoed",
                        "boundaryReadinessEchoed",
                        "requiredArtifactsEchoed",
                        "javaV116EchoHintsEchoed",
                        "noCredentialBoundaryEchoed",
                        "noRawEndpointBoundaryEchoed",
                        "noResolverRuntimeBoundaryEchoed",
                        "noConnectionBoundaryEchoed",
                        "noWriteBoundaryEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification())
                .isTrue();
        assertThat(receipt.readyForJavaV116MiniKvV122Echo()).isTrue();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("IMPLEMENTATION_STILL_BLOCKED", "JAVA_V116_ECHO_ONLY");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly("RUN_PARALLEL_JAVA_V116_MINI_KV_V122",
                        "VERIFY_WITH_NODE_V282_BEFORE_IMPLEMENTATION_DRAFT");
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v36");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessRequiredArtifactCount",
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessApprovalLedgerWritten",
                        "sandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessAutomaticUpstreamStart"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6",
                        "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18",
                        "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForManagedAuditResolverImplementation=false"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewProfile with Node v281",
                        "Require managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification=true before Node v282",
                        "Verify managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    @Test
    void releaseApprovalRehearsalAddsImplementationPlanEchoReceiptForNodeV284() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt receipt =
                rehearsal.managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-implementation-plan-echo-receipt.v1"
                );
        assertThat(receipt.sourceApprovalRequiredImplementationReadinessEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-required-implementation-readiness-echo-receipt.v1"
                );
        assertThat(receipt.sourceApprovalRequiredImplementationReadinessEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v35");
        assertThat(receipt.consumedByNodeCredentialResolverImplementationPlanDraftVersion())
                .isEqualTo("Node v283");
        assertThat(receipt.consumedByNodeCredentialResolverImplementationPlanDraftProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft.v1"
                );
        assertThat(receipt.consumedByNodeCredentialResolverImplementationPlanDraftEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-implementation-plan-draft"
                );
        assertThat(receipt.consumedByNodeCredentialResolverImplementationPlanDraftMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeCredentialResolverImplementationPlanDraftState())
                .isEqualTo("credential-resolver-implementation-plan-draft-ready");
        assertThat(receipt.planEchoMode())
                .isEqualTo("java-v121-credential-resolver-implementation-plan-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v283");

        assertThat(receipt.sourceNodeV283().planVersion())
                .isEqualTo("node-v283-credential-resolver-implementation-plan-draft.v1");
        assertThat(receipt.sourceNodeV283().planMode()).isEqualTo("implementation-plan-draft-only");
        assertThat(receipt.sourceNodeV283().sourceSpan()).isEqualTo("Node v282");
        assertThat(receipt.sourceNodeV283().checkCount()).isEqualTo(28);
        assertThat(receipt.sourceNodeV283().passedCheckCount()).isEqualTo(28);
        assertThat(receipt.sourceNodeV283().sourceCheckCount()).isEqualTo(23);
        assertThat(receipt.sourceNodeV283().sourcePassedCheckCount()).isEqualTo(23);
        assertThat(receipt.sourceNodeV283().interfaceBoundaryCount()).isEqualTo(7);
        assertThat(receipt.sourceNodeV283().requiredArtifactCount()).isEqualTo(21);
        assertThat(receipt.sourceNodeV283().prohibitedActionCount()).isEqualTo(21);
        assertThat(receipt.sourceNodeV283().javaEchoRequirementCount()).isEqualTo(4);
        assertThat(receipt.sourceNodeV283().miniKvReceiptRequirementCount()).isEqualTo(4);
        assertRuntimeBlocked(
                receipt.sourceNodeV283().readyForManagedAuditResolverImplementation(),
                receipt.sourceNodeV283().realResolverImplementationAllowed(),
                receipt.sourceNodeV283().testOnlyFakeHarnessAllowed(),
                receipt.sourceNodeV283().executionAllowed(),
                receipt.sourceNodeV283().connectsManagedAudit(),
                receipt.sourceNodeV283().credentialValueRead(),
                receipt.sourceNodeV283().rawEndpointUrlParsed(),
                receipt.sourceNodeV283().externalRequestSent(),
                receipt.sourceNodeV283().secretProviderInstantiated(),
                receipt.sourceNodeV283().resolverClientInstantiated(),
                receipt.sourceNodeV283().schemaMigrationExecuted(),
                receipt.sourceNodeV283().approvalLedgerWritten(),
                receipt.sourceNodeV283().automaticUpstreamStart()
        );

        assertThat(receipt.implementationPlanReview().reviewMode())
                .isEqualTo("node-v283-implementation-plan-draft-only");
        assertThat(receipt.implementationPlanReview().nextJavaEchoVersion()).isEqualTo("Java v121");
        assertThat(receipt.implementationPlanReview().nextMiniKvReceiptVersion()).isEqualTo("mini-kv v126");
        assertThat(receipt.implementationPlanReview().nextNodeVerificationVersion()).isEqualTo("Node v284");
        assertThat(receipt.implementationPlanReview().fakeHarnessDeferredUntil()).isEqualTo("Node v285");
        assertThat(receipt.implementationPlanReview().readyForJavaV121MiniKvV126Echo()).isTrue();

        assertThat(receipt.interfaceBoundaries())
                .extracting(RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho::code)
                .containsExactly(
                        "CONFIG_HANDLE_CONTRACT",
                        "CREDENTIAL_HANDLE_CONTRACT",
                        "ENDPOINT_HANDLE_CONTRACT",
                        "APPROVAL_ARTIFACT_CONTRACT",
                        "FAILURE_TAXONOMY_CONTRACT",
                        "ROLLBACK_GUARD_CONTRACT",
                        "TEST_ONLY_FAKE_HARNESS_CONTRACT"
                );
        assertThat(receipt.interfaceBoundaries())
                .allMatch(boundary -> boundary.status().equals("drafted-for-upstream-echo")
                        && boundary.requiredArtifacts().size() == 3
                        && boundary.prohibitedActions().size() == 3);
        assertThat(receipt.requiredArtifactIds()).hasSize(21)
                .contains(
                        "config-handle-review-id",
                        "credential-handle-review-id",
                        "endpoint-handle-review-id",
                        "operator-identity-binding",
                        "failure-taxonomy-id",
                        "rollback-abort-marker",
                        "test-only-fake-harness-plan-id"
                );
        assertThat(receipt.prohibitedActions()).hasSize(21)
                .contains(
                        "read-credential-value",
                        "parse-raw-endpoint-url",
                        "connect-managed-audit",
                        "write-approval-ledger",
                        "execute-rollback",
                        "send-real-http-request"
                );
        assertThat(receipt.javaRequirementIds())
                .containsExactly(
                        "java-v121-consumes-node-v283-plan",
                        "java-v121-approval-artifact-boundary",
                        "java-v121-schema-migration-boundary",
                        "java-v121-failure-taxonomy-echo"
                );
        assertThat(receipt.miniKvRequirementIds())
                .containsExactly(
                        "mini-kv-v126-consumes-node-v283-plan",
                        "mini-kv-v126-no-storage-backend",
                        "mini-kv-v126-no-secret-or-endpoint",
                        "mini-kv-v126-no-write-command"
                );

        assertThat(receipt.checks().sourceNodeV283Ready()).isTrue();
        assertThat(receipt.checks().allInterfaceBoundariesDefined()).isTrue();
        assertThat(receipt.checks().javaV121EchoRequirementsDefined()).isTrue();
        assertThat(receipt.checks().miniKvV126ReceiptRequirementsDefined()).isTrue();
        assertThat(receipt.checks().readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanEcho())
                .isTrue();
        assertRuntimeBlocked(
                receipt.sideEffectBoundary().readyForManagedAuditResolverImplementation(),
                receipt.sideEffectBoundary().readyForTestOnlyFakeHarnessPrecheck(),
                receipt.sideEffectBoundary().realResolverImplementationAllowed(),
                receipt.sideEffectBoundary().testOnlyFakeHarnessAllowed(),
                receipt.sideEffectBoundary().executionAllowed(),
                receipt.sideEffectBoundary().connectsManagedAudit(),
                receipt.sideEffectBoundary().credentialValueRead(),
                receipt.sideEffectBoundary().rawEndpointUrlParsed(),
                receipt.sideEffectBoundary().externalRequestSent(),
                receipt.sideEffectBoundary().secretProviderInstantiated(),
                receipt.sideEffectBoundary().resolverClientInstantiated(),
                receipt.sideEffectBoundary().approvalLedgerWritten(),
                receipt.sideEffectBoundary().managedAuditStoreWritten(),
                receipt.sideEffectBoundary().sqlExecuted(),
                receipt.sideEffectBoundary().schemaMigrationExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeOrMiniKv()
        );

        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceNodeV283Echoed",
                        "interfaceBoundariesEchoed",
                        "javaV121EchoRequirementsEchoed",
                        "miniKvV126ReceiptRequirementsEchoed",
                        "noCredentialBoundaryEchoed",
                        "noRawEndpointBoundaryEchoed",
                        "noManagedAuditConnectionEchoed",
                        "noSqlOrLedgerWriteEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.readyForNodeV284CredentialResolverImplementationPlanEchoVerification()).isTrue();
        assertThat(receipt.readyForJavaV121MiniKvV126Echo()).isTrue();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.readyForTestOnlyFakeHarnessPrecheck()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("IMPLEMENTATION_STILL_BLOCKED", "UPSTREAM_ECHO_REQUIRED");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly("RUN_PARALLEL_JAVA_V121_MINIKV_V126",
                        "VERIFY_WITH_NODE_V284_BEFORE_FAKE_HARNESS");
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v126 resolver implementation plan non-participation receipt",
                        "Node v284 resolver implementation plan upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v36");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverImplementationPlanEchoReceiptDigest",
                        "sandboxEndpointCredentialResolverImplementationPlanRequiredArtifactCount",
                        "sandboxEndpointCredentialResolverImplementationPlanApprovalLedgerWritten",
                        "sandboxEndpointCredentialResolverImplementationPlanAutomaticUpstreamStart"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.interfaceBoundaries.size=7",
                        "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.javaV121EchoRequirements.size=4",
                        "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.readyForManagedAuditResolverImplementation=false"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.consumedByNodeCredentialResolverImplementationPlanDraftProfile with Node v283",
                        "Verify managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.interfaceBoundaries.size=7 before Node v284",
                        "Require managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.readyForNodeV284CredentialResolverImplementationPlanEchoVerification=true before Node v284"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated.managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
