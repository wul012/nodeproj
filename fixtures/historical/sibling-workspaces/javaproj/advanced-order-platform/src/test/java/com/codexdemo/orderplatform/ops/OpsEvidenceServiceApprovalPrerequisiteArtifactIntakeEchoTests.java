package com.codexdemo.orderplatform.ops;

import static org.assertj.core.api.Assertions.assertThat;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt;
import org.junit.jupiter.api.Test;

class OpsEvidenceServiceApprovalPrerequisiteArtifactIntakeEchoTests extends OpsEvidenceServiceRehearsalTestSupport {

    @Test
    void releaseApprovalRehearsalAddsApprovalPrerequisiteArtifactIntakeEchoReceiptForNodeV307() {
        OpsEvidenceService service = readOnlyFixtureService();

        ReleaseApprovalRehearsalResponse rehearsal =
                service.releaseApprovalRehearsal(headerBackedRehearsalRequest());
        RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt
                receipt =
                rehearsal
                        .managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt();

        assertThat(receipt.receiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-prerequisite-artifact-intake-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellStopPrerequisiteDecisionEchoReceiptVersion())
                .isEqualTo(
                        "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-receipt.v1"
                );
        assertThat(receipt.sourceRuntimeShellStopPrerequisiteDecisionEchoReceiptSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v42");
        assertThat(receipt.sourceRuntimeShellStopPrerequisiteDecisionEchoReceiptDigest())
                .isEqualTo(rehearsal
                        .managedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt()
                        .receiptDigest());

        assertThat(receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanVersion())
                .isEqualTo("Node v306");
        assertThat(receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1"
                );
        assertThat(receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanEndpoint())
                .isEqualTo(
                        "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan"
                );
        assertThat(receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanMarkdownEndpoint())
                .endsWith("?format=markdown");
        assertThat(receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanState())
                .isEqualTo("approval-prerequisite-artifact-intake-plan-ready");
        assertThat(receipt.sourceNodeVerificationVersion()).isEqualTo("Node v305");
        assertThat(receipt.nextNodeApprovalPrerequisiteArtifactUpstreamEchoVerificationVersion())
                .isEqualTo("Node v307");
        assertThat(receipt.nextNodeApprovalPrerequisiteArtifactUpstreamEchoVerificationProfile())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1"
                );
        assertThat(receipt.approvalPrerequisiteArtifactIntakeEchoMode())
                .isEqualTo("java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only");
        assertThat(receipt.sourceSpan()).isEqualTo("Node v306");

        assertThat(receipt.sourceNodeV305().sourceVersion()).isEqualTo("Node v305");
        assertThat(receipt.sourceNodeV305().profileVersion())
                .isEqualTo(
                        "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1"
                );
        assertThat(receipt.sourceNodeV305().verificationState())
                .isEqualTo("runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready");
        assertThat(receipt.sourceNodeV305().sourceSpan())
                .isEqualTo("Node v304 + Java v141 + mini-kv v134");
        assertThat(receipt.sourceNodeV305().readyForUpstreamEchoVerification()).isTrue();
        assertThat(receipt.sourceNodeV305().upstreamEchoAligned()).isTrue();
        assertThat(receipt.sourceNodeV305().prerequisiteGateStillBlocked()).isTrue();
        assertThat(receipt.sourceNodeV305().sideEffectBoundariesAligned()).isTrue();
        assertThat(receipt.sourceNodeV305().prerequisiteCount()).isEqualTo(6);
        assertThat(receipt.sourceNodeV305().missingRuntimePrerequisiteCount()).isEqualTo(6);
        assertThat(receipt.sourceNodeV305().noGoConditionCount()).isEqualTo(8);
        assertRuntimeBlocked(
                receipt.sourceNodeV305().runtimeShellImplemented(),
                receipt.sourceNodeV305().runtimeShellInvocationAllowed(),
                receipt.sourceNodeV305().executionAllowed(),
                receipt.sourceNodeV305().connectsManagedAudit(),
                receipt.sourceNodeV305().credentialValueRead(),
                receipt.sourceNodeV305().rawEndpointUrlParsed(),
                receipt.sourceNodeV305().externalRequestSent(),
                receipt.sourceNodeV305().schemaMigrationExecuted(),
                receipt.sourceNodeV305().approvalLedgerWritten(),
                receipt.sourceNodeV305().automaticUpstreamStart()
        );

        assertThat(receipt.artifactIntakePlan().artifactDigest()).startsWith("sha256:");
        assertThat(receipt.artifactIntakePlan().artifactName())
                .isEqualTo("managed-audit-runtime-shell-approval-prerequisite-artifact");
        assertThat(receipt.artifactIntakePlan().artifactVersion())
                .isEqualTo("approval-prerequisite-artifact.v1");
        assertThat(receipt.artifactIntakePlan().intakeMode())
                .isEqualTo("approval-prerequisite-artifact-intake-plan-only");
        assertThat(receipt.artifactIntakePlan().requiredFieldCount()).isEqualTo(12);
        assertThat(receipt.artifactIntakePlan().prohibitedFieldCount()).isEqualTo(8);
        assertThat(receipt.artifactIntakePlan().rejectionReasonCount()).isEqualTo(9);
        assertThat(receipt.artifactIntakePlan().noGoBoundaryCount()).isEqualTo(12);
        assertThat(receipt.artifactIntakePlan().javaMiniKvEchoCanRunInParallel()).isTrue();
        assertThat(receipt.artifactIntakePlan().implementationStillBlocked()).isTrue();
        assertThat(receipt.requiredFieldIds())
                .containsExactly(
                        "artifact_id",
                        "source_node_verification",
                        "operator_approval_reference",
                        "credential_handle_review_status",
                        "endpoint_handle_allowlist_review_status",
                        "no_network_safety_test_reference",
                        "manual_abort_semantics_reference",
                        "rollback_semantics_reference",
                        "java_echo_required_version",
                        "mini_kv_receipt_required_version",
                        "created_by_operator_identity",
                        "audit_correlation_id"
                );
        assertThat(receipt.prohibitedFieldIds())
                .containsExactly(
                        "credential_value",
                        "raw_endpoint_url",
                        "secret_provider_config",
                        "resolver_client_config",
                        "external_request_payload",
                        "approval_ledger_mutation",
                        "schema_migration_sql",
                        "mini_kv_write_command"
                );
        assertThat(receipt.rejectionReasonCodes())
                .containsExactly(
                        "MISSING_OPERATOR_APPROVAL_REFERENCE",
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "NO_NETWORK_SAFETY_TEST_MISSING",
                        "ABORT_ROLLBACK_SEMANTICS_MISSING",
                        "JAVA_OR_MINIKV_ECHO_MISSING",
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
                        "EXTERNAL_REQUEST_REQUESTED",
                        "WRITE_OR_SCHEMA_MUTATION_REQUESTED"
                );
        assertThat(receipt.noGoBoundaryIds())
                .containsExactly(
                        "runtime_shell_implemented",
                        "runtime_shell_invocation_allowed",
                        "execution_allowed",
                        "connects_managed_audit",
                        "credential_value_read",
                        "raw_endpoint_url_parsed",
                        "external_request_sent",
                        "provider_or_client_instantiated",
                        "schema_migration_executed",
                        "approval_ledger_written",
                        "mini_kv_write_or_authority",
                        "automatic_upstream_start"
                );
        assertThat(receipt.artifactIntakePlan().upstreamEchoRequests())
                .extracting(request -> request.project() + ":" + request.version())
                .containsExactly("java:Java v142", "mini-kv:mini-kv v135");

        assertThat(receipt.necessityProof().proofComplete()).isTrue();
        assertThat(receipt.necessityProof().consumer())
                .isEqualTo("Java v142 + mini-kv v135, then Node v307");
        assertThat(receipt.necessityProof().whyV305CannotBeReused())
                .contains("does not define required artifact fields");
        assertThat(receipt.necessityProof().stopCondition())
                .contains("credential values", "raw endpoint URLs", "runtime shell implementation");

        assertThat(receipt.checks().sourceNodeV305Ready()).isTrue();
        assertThat(receipt.checks().sourceNodeV305UpstreamEchoAligned()).isTrue();
        assertThat(receipt.checks().sourceNodeV305PrerequisiteGateBlocked()).isTrue();
        assertThat(receipt.checks().sourceNodeV305SideEffectsClosed()).isTrue();
        assertThat(receipt.checks().requiredArtifactFieldsDocumented()).isTrue();
        assertThat(receipt.checks().prohibitedArtifactFieldsDocumented()).isTrue();
        assertThat(receipt.checks().rejectionReasonsDocumented()).isTrue();
        assertThat(receipt.checks().noGoBoundariesClosed()).isTrue();
        assertThat(receipt.checks().javaMiniKvEchoRequestExplicitlyParallel()).isTrue();
        assertThat(receipt.checks()
                .readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan())
                .isTrue();

        assertThat(receipt.sideEffectBoundary().approvalPrerequisiteArtifactIntakeEchoOnly()).isTrue();
        assertThat(receipt.sideEffectBoundary().readOnlyArtifactContract()).isTrue();
        assertRuntimeBlocked(
                receipt.sideEffectBoundary().disabledRuntimeShellImplemented(),
                receipt.sideEffectBoundary().disabledRuntimeShellEnabled(),
                receipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed(),
                receipt.sideEffectBoundary().productionAuditAllowed(),
                receipt.sideEffectBoundary().productionWindowAllowed(),
                receipt.sideEffectBoundary().productionOperationsAllowed(),
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
                receipt.sideEffectBoundary().deploymentExecuted(),
                receipt.sideEffectBoundary().rollbackExecuted(),
                receipt.sideEffectBoundary().miniKvWriteOrAuthorityCommandExecuted(),
                receipt.sideEffectBoundary().automaticUpstreamStart(),
                receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness()
        );

        assertThat(receipt.echoWorkflowMissingSteps()).isEmpty();
        assertThat(receipt.echoWorkflowReadySteps())
                .containsExactly(
                        "sourceNodeV305Echoed",
                        "artifactContractEchoed",
                        "requiredFieldsEchoed",
                        "prohibitedFieldsEchoed",
                        "rejectionReasonsEchoed",
                        "noGoBoundariesEchoed",
                        "upstreamEchoRequestsEchoed",
                        "necessityProofEchoed",
                        "noRuntimeImplementationEchoed",
                        "noRuntimeInvocationEchoed",
                        "noCredentialReadEchoed",
                        "noRawEndpointParseEchoed",
                        "noProviderClientInstantiationEchoed",
                        "noExternalRequestEchoed",
                        "noWriteOrMigrationEchoed",
                        "noMiniKvWriteOrAuthorityEchoed",
                        "noAutoStartBoundaryEchoed"
                );
        assertThat(receipt.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification()).isTrue();
        assertThat(receipt.readyForDisabledRuntimeShellImplementation()).isFalse();
        assertThat(receipt.readyForDisabledRuntimeShellInvocation()).isFalse();
        assertThat(receipt.readyForManagedAuditResolverImplementation()).isFalse();
        assertThat(receipt.readyForProductionAudit()).isFalse();
        assertThat(receipt.readyForProductionWindow()).isFalse();
        assertThat(receipt.nodeMayTreatAsProductionAuditRecord()).isFalse();
        assertThat(receipt.nodeWarningCodes())
                .containsExactly("ARTIFACT_INTAKE_PLAN_DOES_NOT_AUTHORIZE_RUNTIME");
        assertThat(receipt.nodeRecommendationCodes())
                .containsExactly(
                        "RUN_JAVA_V142_AND_MINI_KV_V135_IN_PARALLEL_AFTER_V306",
                        "VERIFY_ARTIFACT_ECHO_WITH_NODE_V307"
                );
        assertThat(receipt.nextRequiredEchoVersions())
                .containsExactly(
                        "mini-kv v135 approval prerequisite artifact non-participation receipt",
                        "Node v307 approval prerequisite artifact upstream echo verification"
                );
        assertThat(receipt.receiptWarnings()).isEmpty();
        assertThat(receipt.receiptDigest()).startsWith("sha256:");

        assertThat(rehearsal.verificationHint().responseSchemaVersion())
                .isEqualTo("java-release-approval-rehearsal-response-schema.v43");
        assertThat(rehearsal.verificationHint().schemaFields())
                .contains("managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt");
        assertThat(rehearsal.verificationHint().warningDigestInputs())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceiptWarnings",
                        "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakePlanState",
                        "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRequiredFieldCount",
                        "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactReadyForNodeV307",
                        "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactMiniKvWriteOrAuthorityCommandExecuted"
                );
        assertThat(rehearsal.verificationHint().proofClaims())
                .contains(
                        "managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.artifactIntakePlan.requiredFieldCount=12",
                        "managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
                        "managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification=true"
                );
        assertThat(rehearsal.verificationHint().nodeVerificationActions())
                .contains(
                        "Compare managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanProfile with Node v306",
                        "Require managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.artifactIntakePlan.requiredFieldCount=12 before Node v307",
                        "Keep managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt.sideEffectBoundary.miniKvWriteOrAuthorityCommandExecuted=false"
                );

        ReleaseApprovalRehearsalResponse repeated =
                service.releaseApprovalRehearsal(paddedHeaderBackedRehearsalRequest());
        assertThat(repeated
                .managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt()
                .receiptDigest()).isEqualTo(receipt.receiptDigest());
    }

    private static void assertRuntimeBlocked(boolean... flags) {
        assertThat(flags).containsOnly(false);
    }
}
