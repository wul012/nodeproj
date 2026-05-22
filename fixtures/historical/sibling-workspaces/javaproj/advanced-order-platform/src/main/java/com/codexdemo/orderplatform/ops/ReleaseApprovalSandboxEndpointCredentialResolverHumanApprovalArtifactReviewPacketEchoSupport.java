package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewMissingFieldCheck;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewPacket;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalHumanApprovalArtifactReviewUpstreamEchoRequest;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketState",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactRequiredFieldCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactRejectionReasonCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactMissingFieldCheckCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactReadyForNodeV309",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactRuntimeImplemented",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactCredentialValueRead",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactExternalRequestSent",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactProviderClientInstantiated",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactSqlExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactMiniKvWriteOrAuthorityCommandExecuted",
                    "sandboxEndpointCredentialResolverHumanApprovalArtifactAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt source
    ) {
        RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307 = sourceNodeV307(source);
        RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof = necessityProof();
        RehearsalHumanApprovalArtifactReviewPacket reviewPacket = reviewPacket(sourceNodeV307, necessityProof);
        RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary = sideEffectBoundary();
        RehearsalHumanApprovalArtifactReviewChecks checks =
                checks(sourceNodeV307, reviewPacket, necessityProof, boundary);
        EchoWorkflowReadiness readiness = readiness(sourceNodeV307, reviewPacket, checks, boundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(source, sourceNodeV307, reviewPacket, necessityProof, checks,
                boundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_ECHO_RECEIPT_VERSION,
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                OpsEvidenceService.NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_VERSION,
                OpsEvidenceService.NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_PROFILE,
                OpsEvidenceService.NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_ENDPOINT,
                OpsEvidenceService.NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_STATE,
                "Node v307",
                "Node v309",
                "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-upstream-echo-verification.v1",
                "java-v143-human-approval-artifact-review-packet-echo-only",
                "Node v308",
                sourceNodeV307,
                reviewPacket,
                necessityProof,
                checks,
                boundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV307Echoed"),
                readiness.ready("reviewPacketContractEchoed"),
                readiness.ready("requiredFieldsEchoed"),
                readiness.ready("prohibitedFieldsEchoed"),
                readiness.ready("rejectionReasonsEchoed"),
                readiness.ready("missingFieldChecksEchoed"),
                readiness.ready("noGoBoundariesEchoed"),
                readiness.ready("upstreamEchoRequestsEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noWriteOrMigrationEchoed"),
                readiness.ready("noMiniKvWriteOrAuthorityEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .rejectionReasonCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .missingFieldCheckCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .nodeWarningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .nodeRecommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .nextRequiredEchoVersions(),
                receiptWarnings,
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .nodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                .proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                .nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt receipt
    ) {
        RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketState",
                        receipt.consumedByNodeHumanApprovalArtifactReviewPacketState()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactRequiredFieldCount",
                        receipt.reviewPacket().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactProhibitedFieldCount",
                        receipt.reviewPacket().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactRejectionReasonCount",
                        receipt.reviewPacket().rejectionReasonCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactMissingFieldCheckCount",
                        receipt.reviewPacket().missingFieldCheckCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactNoGoBoundaryCount",
                        receipt.reviewPacket().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactReadyForNodeV309",
                        receipt.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactProviderClientInstantiated",
                        boundary.secretProviderInstantiated() || boundary.resolverClientInstantiated()
                                || boundary.fakeSecretProviderInstantiated() || boundary.fakeResolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactMiniKvWriteOrAuthorityCommandExecuted",
                        boundary.miniKvWriteOrAuthorityCommandExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverHumanApprovalArtifactAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceipt receipt
    ) {
        RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV309HumanApprovalArtifactReviewPacketUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.externalRequestSent()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.fakeSecretProviderInstantiated()
                && !boundary.fakeResolverClientInstantiated()
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.deploymentExecuted()
                && !boundary.rollbackExecuted()
                && !boundary.miniKvWriteOrAuthorityCommandExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt source
    ) {
        return new RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo(
                "Node v307",
                "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
                "approval-prerequisite-artifact-upstream-echo-verification-ready",
                source.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification(),
                verificationDigest(source),
                "approval-prerequisite-artifact-upstream-echo-verification-only",
                "Node v306 + Java v142 + mini-kv v135",
                source.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification(),
                source.artifactContractEchoed(),
                source.noRuntimeImplementationEchoed()
                        && source.noRuntimeInvocationEchoed()
                        && source.noCredentialReadEchoed()
                        && source.noRawEndpointParseEchoed()
                        && source.noExternalRequestEchoed()
                        && source.noWriteOrMigrationEchoed()
                        && source.noMiniKvWriteOrAuthorityEchoed()
                        && source.noAutoStartBoundaryEchoed(),
                source.artifactIntakePlan().artifactDigest(),
                source.consumedByNodeApprovalPrerequisiteArtifactIntakePlanState(),
                source.artifactIntakePlan().requiredFieldCount(),
                source.artifactIntakePlan().prohibitedFieldCount(),
                source.artifactIntakePlan().rejectionReasonCount(),
                source.artifactIntakePlan().noGoBoundaryCount(),
                source.artifactIntakePlan().upstreamEchoRequests().size(),
                source.sideEffectBoundary().disabledRuntimeShellImplemented(),
                source.sideEffectBoundary().disabledRuntimeShellInvocationAllowed(),
                source.sideEffectBoundary().executionAllowed(),
                source.sideEffectBoundary().connectsManagedAudit(),
                source.sideEffectBoundary().credentialValueRead(),
                source.sideEffectBoundary().rawEndpointUrlParsed(),
                source.sideEffectBoundary().externalRequestSent(),
                source.sideEffectBoundary().schemaMigrationExecuted(),
                source.sideEffectBoundary().approvalLedgerWritten(),
                source.sideEffectBoundary().automaticUpstreamStart()
        );
    }

    private static RehearsalHumanApprovalArtifactReviewPacket reviewPacket(
            RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307,
            RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof
    ) {
        List<RehearsalHumanApprovalArtifactReviewRequiredField> requiredFields =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .requiredFields();
        List<RehearsalHumanApprovalArtifactReviewProhibitedField> prohibitedFields =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .prohibitedFields();
        List<RehearsalHumanApprovalArtifactReviewRejectionReason> rejectionReasons =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .rejectionReasons();
        List<RehearsalHumanApprovalArtifactReviewMissingFieldCheck> missingFieldChecks =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .missingFieldChecks(requiredFields);
        List<RehearsalHumanApprovalArtifactReviewNoGoBoundary> noGoBoundaries =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .noGoBoundaries();
        List<RehearsalHumanApprovalArtifactReviewUpstreamEchoRequest> upstreamEchoRequests =
                ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog
                        .upstreamEchoRequests();
        String digest = packetDigest(sourceNodeV307, necessityProof, requiredFields, prohibitedFields,
                rejectionReasons, missingFieldChecks, noGoBoundaries, upstreamEchoRequests);

        return new RehearsalHumanApprovalArtifactReviewPacket(
                digest,
                "managed-audit-runtime-shell-human-approval-artifact-review-packet",
                "human-approval-artifact-review-packet.v1",
                "human-approval-artifact-review-packet-contract-only",
                "Node v307",
                requiredFields,
                prohibitedFields,
                rejectionReasons,
                missingFieldChecks,
                noGoBoundaries,
                upstreamEchoRequests,
                requiredFields.size(),
                prohibitedFields.size(),
                rejectionReasons.size(),
                missingFieldChecks.size(),
                noGoBoundaries.size(),
                upstreamEchoRequests.size(),
                true
        );
    }

    private static RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof() {
        return new RehearsalHumanApprovalArtifactReviewNecessityProof(
                true,
                "Node v307 proves the upstream echo alignment but leaves the human-submitted approval artifact review shape undefined.",
                "Java v143 + mini-kv v136, then Node v309",
                "v307 verifies that Java and mini-kv echoed the Node v306 artifact prerequisite plan; it does not define the review packet fields, missing-field checks, prohibited-field checks, or rejection reasons for a human-supplied artifact.",
                "Reuse v307 only as the source readiness reference, then create the smallest v308 packet contract for human approval artifact review.",
                "Stop if the work requires credential values, raw endpoint URLs, provider/client config, fake clients, external HTTP/TCP, runtime shell implementation, ledger writes, schema migration, mini-kv writes, or automatic upstream start."
        );
    }

    private static RehearsalHumanApprovalArtifactReviewSideEffectBoundary sideEffectBoundary() {
        return new RehearsalHumanApprovalArtifactReviewSideEffectBoundary(
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
                false,
                false,
                false,
                false
        );
    }

    private static RehearsalHumanApprovalArtifactReviewChecks checks(
            RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307,
            RehearsalHumanApprovalArtifactReviewPacket reviewPacket,
            RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof,
            RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary
    ) {
        boolean sourceSideEffectsClosed = sourceNodeV307.sideEffectBoundariesAligned()
                && !sourceNodeV307.runtimeShellImplemented()
                && !sourceNodeV307.runtimeShellInvocationAllowed()
                && !sourceNodeV307.executionAllowed()
                && !sourceNodeV307.connectsManagedAudit()
                && !sourceNodeV307.credentialValueRead()
                && !sourceNodeV307.rawEndpointUrlParsed()
                && !sourceNodeV307.externalRequestSent()
                && !sourceNodeV307.schemaMigrationExecuted()
                && !sourceNodeV307.approvalLedgerWritten()
                && !sourceNodeV307.automaticUpstreamStart();
        boolean requiredFieldsDocumented = reviewPacket.requiredFieldCount() == 9
                && reviewPacket.requiredFields().stream()
                .map(RehearsalHumanApprovalArtifactReviewRequiredField::id)
                .toList()
                .containsAll(List.of(
                        "operator_approval_reference",
                        "credential_handle_review_status",
                        "endpoint_handle_allowlist_review_status",
                        "no_network_safety_test_reference",
                        "manual_abort_semantics_reference",
                        "rollback_semantics_reference",
                        "created_by_operator_identity",
                        "audit_correlation_id"
                ));
        boolean prohibitedFieldsDocumented = reviewPacket.prohibitedFieldCount() == 9
                && reviewPacket.prohibitedFields().stream()
                .map(RehearsalHumanApprovalArtifactReviewProhibitedField::id)
                .toList()
                .containsAll(List.of(
                        "credential_value",
                        "raw_endpoint_url",
                        "secret_provider_config",
                        "resolver_client_config",
                        "runtime_shell_invocation_request"
                ));
        boolean rejectionReasonsDocumented = reviewPacket.rejectionReasonCount() == 13
                && reviewPacket.rejectionReasons().stream()
                .map(RehearsalHumanApprovalArtifactReviewRejectionReason::code)
                .toList()
                .containsAll(List.of(
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED"
                ));
        boolean missingFieldChecksDocumented =
                reviewPacket.missingFieldCheckCount() == reviewPacket.requiredFieldCount()
                        && reviewPacket.missingFieldChecks().stream()
                        .map(RehearsalHumanApprovalArtifactReviewMissingFieldCheck::rejectionCode)
                        .allMatch(code -> code.startsWith("MISSING_"));
        boolean noGoBoundariesClosed = reviewPacket.noGoBoundaryCount() == 12
                && reviewPacket.noGoBoundaries().stream()
                .allMatch(RehearsalHumanApprovalArtifactReviewNoGoBoundary::closed);
        boolean proofDocumented = necessityProof.proofComplete()
                && necessityProof.nextConsumer().equals("Java v143 + mini-kv v136, then Node v309")
                && necessityProof.whyV307CannotBeReused().contains("missing-field checks")
                && necessityProof.stopCondition().contains("credential values");
        boolean echoRequestParallel = reviewPacket.upstreamEchoRequestCount() == 2
                && reviewPacket.upstreamEchoRequests().stream()
                .allMatch(request -> request.canRunInParallel() && request.requiredBeforeNodeV309())
                && reviewPacket.upstreamEchoRequests().stream()
                .anyMatch(request -> request.version().equals("Java v143"))
                && reviewPacket.upstreamEchoRequests().stream()
                .anyMatch(request -> request.version().equals("mini-kv v136"));
        boolean contractOnly = reviewPacket.reviewMode().equals("human-approval-artifact-review-packet-contract-only")
                && reviewPacket.implementationStillBlocked();
        boolean upstreamProbesStillDisabled = true;
        boolean upstreamActionsStillDisabled = true;
        boolean runtimeBlocked = !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed();
        boolean productionAuditBlocked = !boundary.productionAuditAllowed();
        boolean productionWindowBlocked = !boundary.productionWindowAllowed();
        boolean ready = sourceNodeV307.readyForUpstreamEchoVerification()
                && sourceNodeV307.upstreamEchoAligned()
                && sourceNodeV307.artifactContractAligned()
                && sourceSideEffectsClosed
                && requiredFieldsDocumented
                && prohibitedFieldsDocumented
                && rejectionReasonsDocumented
                && missingFieldChecksDocumented
                && noGoBoundariesClosed
                && proofDocumented
                && echoRequestParallel
                && contractOnly
                && upstreamProbesStillDisabled
                && upstreamActionsStillDisabled
                && runtimeBlocked
                && productionAuditBlocked
                && productionWindowBlocked;

        return new RehearsalHumanApprovalArtifactReviewChecks(
                sourceNodeV307.readyForUpstreamEchoVerification(),
                sourceNodeV307.upstreamEchoAligned(),
                sourceNodeV307.artifactContractAligned(),
                sourceSideEffectsClosed,
                requiredFieldsDocumented,
                prohibitedFieldsDocumented,
                rejectionReasonsDocumented,
                missingFieldChecksDocumented,
                noGoBoundariesClosed,
                proofDocumented,
                echoRequestParallel,
                contractOnly,
                upstreamProbesStillDisabled,
                upstreamActionsStillDisabled,
                runtimeBlocked,
                productionAuditBlocked,
                productionWindowBlocked,
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307,
            RehearsalHumanApprovalArtifactReviewPacket reviewPacket,
            RehearsalHumanApprovalArtifactReviewChecks checks,
            RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV307Echoed",
                        checks.sourceNodeV307Ready()
                                && checks.sourceNodeV307UpstreamEchoAligned()
                                && checks.sourceNodeV307ArtifactContractAligned()),
                workflowStep("reviewPacketContractEchoed",
                        reviewPacket.packetDigest().startsWith("sha256:")
                                && checks.reviewPacketStaysContractOnly()),
                workflowStep("requiredFieldsEchoed", checks.requiredReviewFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.prohibitedReviewFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("missingFieldChecksEchoed", checks.missingFieldChecksDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("upstreamEchoRequestsEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("noRuntimeImplementationEchoed",
                        !sourceNodeV307.runtimeShellImplemented() && !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed",
                        !sourceNodeV307.runtimeShellInvocationAllowed()
                                && !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed",
                        !sourceNodeV307.credentialValueRead() && !boundary.credentialValueRead()),
                workflowStep("noRawEndpointParseEchoed",
                        !sourceNodeV307.rawEndpointUrlParsed() && !boundary.rawEndpointUrlParsed()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()
                                && !boundary.fakeSecretProviderInstantiated()
                                && !boundary.fakeResolverClientInstantiated()),
                workflowStep("noExternalRequestEchoed",
                        !sourceNodeV307.externalRequestSent() && !boundary.externalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed",
                        !sourceNodeV307.approvalLedgerWritten()
                                && !sourceNodeV307.schemaMigrationExecuted()
                                && !boundary.approvalLedgerWritten()
                                && !boundary.sqlExecuted()
                                && !boundary.schemaMigrationExecuted()),
                workflowStep("noMiniKvWriteOrAuthorityEchoed",
                        !boundary.miniKvWriteOrAuthorityCommandExecuted()),
                workflowStep("noAutoStartBoundaryEchoed",
                        !sourceNodeV307.automaticUpstreamStart()
                                && !boundary.automaticUpstreamStart()
                                && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String verificationDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt source
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("nodeVersion", "Node v307"),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV306ArtifactDigest",
                        source.artifactIntakePlan().artifactDigest()),
                ReleaseApprovalDigestSupport.line("upstreamEchoAligned",
                        source.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification())
        ));
    }

    private static String packetDigest(
            RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307,
            RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof,
            List<RehearsalHumanApprovalArtifactReviewRequiredField> requiredFields,
            List<RehearsalHumanApprovalArtifactReviewProhibitedField> prohibitedFields,
            List<RehearsalHumanApprovalArtifactReviewRejectionReason> rejectionReasons,
            List<RehearsalHumanApprovalArtifactReviewMissingFieldCheck> missingFieldChecks,
            List<RehearsalHumanApprovalArtifactReviewNoGoBoundary> noGoBoundaries,
            List<RehearsalHumanApprovalArtifactReviewUpstreamEchoRequest> upstreamEchoRequests
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("profileVersion", OpsEvidenceService
                        .NODE_V308_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_PROFILE),
                ReleaseApprovalDigestSupport.line("nodeV307Digest", sourceNodeV307.verificationDigest()),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("requiredFields", requiredFields),
                ReleaseApprovalDigestSupport.line("prohibitedFields", prohibitedFields),
                ReleaseApprovalDigestSupport.line("rejectionReasons", rejectionReasons),
                ReleaseApprovalDigestSupport.line("missingFieldChecks", missingFieldChecks),
                ReleaseApprovalDigestSupport.line("noGoBoundaries", noGoBoundaries),
                ReleaseApprovalDigestSupport.line("upstreamEchoRequests", upstreamEchoRequests)
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt source,
            RehearsalHumanApprovalArtifactReviewSourceNodeV307Echo sourceNodeV307,
            RehearsalHumanApprovalArtifactReviewPacket reviewPacket,
            RehearsalHumanApprovalArtifactReviewNecessityProof necessityProof,
            RehearsalHumanApprovalArtifactReviewChecks checks,
            RehearsalHumanApprovalArtifactReviewSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV307", sourceNodeV307),
                ReleaseApprovalDigestSupport.line("reviewPacket", reviewPacket),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV307Echoed", "NODE_V307_SOURCE_NOT_READY"),
                readiness.warningIfMissing("reviewPacketContractEchoed", "REVIEW_PACKET_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "REQUIRED_REVIEW_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "PROHIBITED_REVIEW_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("rejectionReasonsEchoed", "REJECTION_REASONS_NOT_ECHOED"),
                readiness.warningIfMissing("missingFieldChecksEchoed", "MISSING_FIELD_CHECKS_NOT_ECHOED"),
                readiness.warningIfMissing("noGoBoundariesEchoed", "NO_GO_BOUNDARIES_NOT_CLOSED"),
                readiness.warningIfMissing("upstreamEchoRequestsEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noMiniKvWriteOrAuthorityEchoed",
                        "MINIKV_WRITE_OR_AUTHORITY_BOUNDARY_OPEN")
        );
    }
}
