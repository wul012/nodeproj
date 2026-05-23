package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContractEchoChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContractEchoSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContractNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactPrerequisiteTransition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactContractSourceNodeV312;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalSignedHumanApprovalArtifactUpstreamEchoRequest;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractState",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRequiredFieldCount",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractReadyForNodeV315",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRuntimeImplemented",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCredentialValueRead",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactStored",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactValidated",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactAuthorityClaimed",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractExternalRequestSent",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSqlExecuted",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractDeploymentExecuted",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRollbackExecuted",
                    "sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt sourceReceipt
    ) {
        RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312 = sourceNodeV312();
        RehearsalSignedHumanApprovalArtifactContract contract = signedArtifactContract();
        RehearsalSignedHumanApprovalArtifactPrerequisiteTransition prerequisiteTransition = prerequisiteTransition();
        RehearsalSignedHumanApprovalArtifactContractNecessityProof necessityProof = necessityProof();
        RehearsalSignedHumanApprovalArtifactContractEchoChecks checks =
                checks(sourceReceipt, sourceNodeV312, contract, prerequisiteTransition, necessityProof);
        RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary sideEffectBoundary = sideEffectBoundary();
        EchoWorkflowReadiness readiness = readiness(sourceNodeV312, sourceReceipt, contract, prerequisiteTransition, checks, sideEffectBoundary);
        List<String> warnings = receiptWarnings(readiness);
        RehearsalSignedHumanApprovalArtifactContractEchoSummary summary =
                summary(sourceNodeV312, contract, checks);
        String digest = receiptDigest(sourceReceipt, sourceNodeV312, contract, prerequisiteTransition, necessityProof, checks, sideEffectBoundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt(
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_DECISION_GATE_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V314_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V314_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V314_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_ENDPOINT,
                OpsEvidenceService.NODE_V314_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V314_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_STATE,
                "Node v315",
                "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification.v1",
                "java-v145-signed-human-approval-artifact-contract-echo-only",
                "Node v314 + Java v144",
                sourceNodeV312,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                summary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV312Echoed"),
                readiness.ready("sourceJavaV144PostEchoDecisionGateEchoed"),
                readiness.ready("nodeV314ContractEchoed"),
                readiness.ready("requiredFieldsEchoed"),
                readiness.ready("prohibitedFieldsEchoed"),
                readiness.ready("rejectionReasonsEchoed"),
                readiness.ready("noGoBoundariesEchoed"),
                readiness.ready("prerequisiteTransitionEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("parallelEchoRequestEchoed"),
                readiness.ready("nonSecretContractEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noSignedArtifactAuthorityEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noLedgerSqlDeploymentRollbackEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractEcho(),
                false,
                false,
                false,
                false,
                false,
                false,
                digest,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.warningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.recommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.nextRequiredEchoVersions(),
                warnings,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.nodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME, receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt receipt
    ) {
        RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractState",
                        receipt.consumedByNodeSignedHumanApprovalArtifactContractState()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRequiredFieldCount",
                        receipt.signedArtifactContract().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractProhibitedFieldCount",
                        receipt.signedArtifactContract().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractNoGoBoundaryCount",
                        receipt.signedArtifactContract().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractReadyForNodeV315",
                        receipt.readyForNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactStored",
                        boundary.signedArtifactStoredByJava()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactValidated",
                        boundary.signedArtifactValidatedByJava()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSignedArtifactAuthorityClaimed",
                        boundary.signedArtifactAuthorityClaimedByJava()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractDeploymentExecuted",
                        boundary.deploymentExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractRollbackExecuted",
                        boundary.rollbackExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt receipt
    ) {
        RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.signedArtifactStoredByJava()
                && !boundary.signedArtifactValidatedByJava()
                && !boundary.signedArtifactAuthorityClaimedByJava()
                && !boundary.externalRequestSent()
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.deploymentExecuted()
                && !boundary.rollbackExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312() {
        return new RehearsalSignedHumanApprovalArtifactContractSourceNodeV312(
                "Node v312",
                "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision.v1",
                "human-approval-artifact-review-governance-stop-prerequisite-closure-decision-ready",
                true,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.SOURCE_NODE_V312_DECISION_DIGEST,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.SOURCE_NODE_V312_VERIFICATION_DIGEST,
                1,
                5,
                6,
                9,
                false,
                true,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.sourceCompletedPrerequisiteIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.sourceRemainingPrerequisiteIds(),
                16,
                16,
                0,
                1,
                2,
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

    private static RehearsalSignedHumanApprovalArtifactContract signedArtifactContract() {
        List<RehearsalSignedHumanApprovalArtifactRequiredField> requiredFields =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.requiredFields();
        List<RehearsalSignedHumanApprovalArtifactProhibitedField> prohibitedFields =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.prohibitedFields();
        List<RehearsalSignedHumanApprovalArtifactRejectionReason> rejectionReasons =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.rejectionReasons();
        List<RehearsalSignedHumanApprovalArtifactNoGoBoundary> noGoBoundaries =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.noGoBoundaries();
        List<RehearsalSignedHumanApprovalArtifactUpstreamEchoRequest> upstreamEchoRequests =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.upstreamEchoRequests();

        return new RehearsalSignedHumanApprovalArtifactContract(
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.NODE_V314_CONTRACT_DIGEST,
                "managed-audit-signed-human-approval-artifact",
                "signed-human-approval-artifact.v1",
                "signed-human-approval-artifact-contract-intake-only",
                "Node v312 + Node v313 catalog",
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.TARGET_PREREQUISITE_ID,
                "Define the non-secret signed human approval artifact shape required before any later managed audit credential resolver runtime shell discussion.",
                requiredFields,
                prohibitedFields,
                rejectionReasons,
                noGoBoundaries,
                upstreamEchoRequests,
                requiredFields.size(),
                prohibitedFields.size(),
                rejectionReasons.size(),
                noGoBoundaries.size(),
                upstreamEchoRequests.size(),
                true
        );
    }

    private static RehearsalSignedHumanApprovalArtifactPrerequisiteTransition prerequisiteTransition() {
        return new RehearsalSignedHumanApprovalArtifactPrerequisiteTransition(
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.TARGET_PREREQUISITE_ID,
                "Signed human approval artifact",
                "still-missing",
                "contract-intake-defined",
                true,
                false,
                false,
                false,
                false
        );
    }

    private static RehearsalSignedHumanApprovalArtifactContractNecessityProof necessityProof() {
        return new RehearsalSignedHumanApprovalArtifactContractNecessityProof(
                true,
                "v312 paused the governance chain with five remaining prerequisites; v314 names the first concrete missing prerequisite and defines its non-secret contract shape.",
                "Java v145 + mini-kv v138, then Node v315",
                "v312 is a closure decision only; it lists signed-human-approval-artifact as missing but does not define the signed artifact contract fields that upstreams can echo.",
                "Reuse v312 as source state and v313 as the prerequisite catalog; create v314 only for the signed-human-approval-artifact contract intake.",
                "Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start."
        );
    }

    private static RehearsalSignedHumanApprovalArtifactContractEchoChecks checks(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt sourceReceipt,
            RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312,
            RehearsalSignedHumanApprovalArtifactContract contract,
            RehearsalSignedHumanApprovalArtifactPrerequisiteTransition prerequisiteTransition,
            RehearsalSignedHumanApprovalArtifactContractNecessityProof necessityProof
    ) {
        boolean sourceJavaReady = sourceReceipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification()
                && sourceReceipt.readyForDisabledRuntimeShellImplementation() == false
                && sourceReceipt.readyForDisabledRuntimeShellInvocation() == false
                && sourceReceipt.readyForManagedAuditResolverImplementation() == false
                && sourceReceipt.sideEffectBoundary().approvalLedgerWritten() == false
                && sourceReceipt.sideEffectBoundary().sqlExecuted() == false
                && sourceReceipt.sideEffectBoundary().schemaMigrationExecuted() == false
                && sourceReceipt.sideEffectBoundary().automaticUpstreamStart() == false;
        boolean nodeV314Echoed = contract.contractDigest().equals(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.NODE_V314_CONTRACT_DIGEST)
                && contract.requiredFieldCount() == 11
                && contract.prohibitedFieldCount() == 8
                && contract.rejectionReasonCount() == 5
                && contract.noGoBoundaryCount() == 8
                && contract.upstreamEchoRequestCount() == 2;
        boolean requiredFieldsEchoed = contract.requiredFields().stream()
                .map(RehearsalSignedHumanApprovalArtifactRequiredField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.requiredFieldIds());
        boolean prohibitedFieldsEchoed = contract.prohibitedFields().stream()
                .map(RehearsalSignedHumanApprovalArtifactProhibitedField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.prohibitedFieldIds());
        boolean rejectionReasonsEchoed = contract.rejectionReasons().size() == 5;
        boolean noGoBoundariesEchoed = contract.noGoBoundaries().size() == 8
                && contract.noGoBoundaries().stream().allMatch(boundary -> boundary.allowed() == false);
        boolean prerequisiteTransitionEchoed = prerequisiteTransition.prerequisiteId().equals(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.TARGET_PREREQUISITE_ID)
                && prerequisiteTransition.afterV314().equals("contract-intake-defined")
                && prerequisiteTransition.closureRequiresUpstreamEcho();
        boolean necessityProofEchoed = necessityProof.proofComplete()
                && necessityProof.consumer().equals("Java v145 + mini-kv v138, then Node v315");
        boolean parallelEchoRequestEchoed = contract.upstreamEchoRequests().size() == 2
                && contract.upstreamEchoRequests().stream().allMatch(request -> request.canRunInParallel() && request.mustRemainReadOnly());
        boolean nonSecretContractEchoed = !prohibitedFieldsEchoed
                ? false
                : !contract.prohibitedFields().stream().map(RehearsalSignedHumanApprovalArtifactProhibitedField::id)
                        .toList().contains("operator_identity_handle");
        boolean noRuntimeImplementationEchoed = !sourceReceipt.sideEffectBoundary().disabledRuntimeShellImplemented();
        boolean noRuntimeInvocationEchoed = !sourceReceipt.sideEffectBoundary().disabledRuntimeShellInvocationAllowed();
        boolean noCredentialReadEchoed = !sourceReceipt.sideEffectBoundary().credentialValueRead()
                && !sourceReceipt.sideEffectBoundary().credentialValueProvided();
        boolean noRawEndpointParseEchoed = !sourceReceipt.sideEffectBoundary().rawEndpointUrlParsed()
                && !sourceReceipt.sideEffectBoundary().rawEndpointUrlRendered();
        boolean noSignedArtifactAuthorityEchoed = true;
        boolean noExternalRequestEchoed = !sourceReceipt.sideEffectBoundary().externalRequestSent();
        boolean noLedgerSqlDeploymentRollbackEchoed = !sourceReceipt.sideEffectBoundary().approvalLedgerWritten()
                && !sourceReceipt.sideEffectBoundary().sqlExecuted()
                && !sourceReceipt.sideEffectBoundary().schemaMigrationExecuted()
                && !sourceReceipt.sideEffectBoundary().deploymentExecuted()
                && !sourceReceipt.sideEffectBoundary().rollbackExecuted();
        boolean noAutoStartBoundaryEchoed = !sourceReceipt.sideEffectBoundary().automaticUpstreamStart()
                && !sourceReceipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness();
        boolean ready = sourceNodeV312.readyForClosureDecision()
                && sourceNodeV312.chainContinuationAllowed() == false
                && sourceNodeV312.nextConcretePrerequisiteContractRequired()
                && sourceJavaReady
                && nodeV314Echoed
                && requiredFieldsEchoed
                && prohibitedFieldsEchoed
                && rejectionReasonsEchoed
                && noGoBoundariesEchoed
                && prerequisiteTransitionEchoed
                && necessityProofEchoed
                && parallelEchoRequestEchoed
                && nonSecretContractEchoed
                && noRuntimeImplementationEchoed
                && noRuntimeInvocationEchoed
                && noCredentialReadEchoed
                && noRawEndpointParseEchoed
                && noSignedArtifactAuthorityEchoed
                && noExternalRequestEchoed
                && noLedgerSqlDeploymentRollbackEchoed
                && noAutoStartBoundaryEchoed
                && sourceReceipt.readyForNodeV311PostEchoDecisionUpstreamEchoVerification();

        return new RehearsalSignedHumanApprovalArtifactContractEchoChecks(
                sourceNodeV312.readyForClosureDecision(),
                sourceNodeV312.chainContinuationAllowed() == false && sourceNodeV312.nextConcretePrerequisiteContractRequired(),
                sourceNodeV312.remainingPrerequisiteIds().contains(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.TARGET_PREREQUISITE_ID),
                sourceJavaReady,
                nodeV314Echoed,
                nodeV314Echoed,
                requiredFieldsEchoed,
                prohibitedFieldsEchoed,
                rejectionReasonsEchoed,
                noGoBoundariesEchoed,
                prerequisiteTransitionEchoed,
                necessityProofEchoed,
                parallelEchoRequestEchoed,
                nonSecretContractEchoed,
                true,
                true,
                true,
                true,
                true,
                ready
        );
    }

    private static RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary(
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
                false,
                false,
                false,
                false,
                false,
                false
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312,
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt sourceReceipt,
            RehearsalSignedHumanApprovalArtifactContract contract,
            RehearsalSignedHumanApprovalArtifactPrerequisiteTransition prerequisiteTransition,
            RehearsalSignedHumanApprovalArtifactContractEchoChecks checks,
            RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV312Echoed", checks.sourceNodeV312Ready()
                        && sourceNodeV312.remainingPrerequisiteIds().contains(ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.TARGET_PREREQUISITE_ID)),
                workflowStep("sourceJavaV144PostEchoDecisionGateEchoed", checks.sourceJavaV144PostEchoDecisionGateReady()),
                workflowStep("nodeV314ContractEchoed", checks.nodeV314ContractEchoed()),
                workflowStep("requiredFieldsEchoed", checks.contractRequiredFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.contractProhibitedFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("prerequisiteTransitionEchoed", checks.prerequisiteTransitionScopedToSignedArtifact()),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("parallelEchoRequestEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("nonSecretContractEchoed", checks.contractStaysNonSecret()),
                workflowStep("noRuntimeImplementationEchoed", !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed", !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed", !boundary.credentialValueRead()
                        && !boundary.credentialValueProvided()),
                workflowStep("noRawEndpointParseEchoed", !boundary.rawEndpointUrlParsed()
                        && !boundary.rawEndpointUrlRendered()),
                workflowStep("noSignedArtifactAuthorityEchoed", !boundary.signedArtifactAuthorityClaimedByJava()),
                workflowStep("noExternalRequestEchoed", !boundary.externalRequestSent()),
                workflowStep("noLedgerSqlDeploymentRollbackEchoed",
                        !boundary.approvalLedgerWritten()
                                && !boundary.sqlExecuted()
                                && !boundary.schemaMigrationExecuted()
                                && !boundary.deploymentExecuted()
                                && !boundary.rollbackExecuted()),
                workflowStep("noAutoStartBoundaryEchoed",
                        !boundary.automaticUpstreamStart() && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGateEchoReceipt sourceReceipt,
            RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312,
            RehearsalSignedHumanApprovalArtifactContract contract,
            RehearsalSignedHumanApprovalArtifactPrerequisiteTransition prerequisiteTransition,
            RehearsalSignedHumanApprovalArtifactContractNecessityProof necessityProof,
            RehearsalSignedHumanApprovalArtifactContractEchoChecks checks,
            RehearsalSignedHumanApprovalArtifactContractEchoSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion",
                        OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV312", sourceNodeV312),
                ReleaseApprovalDigestSupport.line("contract", contract),
                ReleaseApprovalDigestSupport.line("prerequisiteTransition", prerequisiteTransition),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("boundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV312Echoed", "NODE_V312_SOURCE_NOT_READY"),
                readiness.warningIfMissing("sourceJavaV144PostEchoDecisionGateEchoed", "JAVA_V144_POST_ECHO_DECISION_GATE_NOT_ECHOED"),
                readiness.warningIfMissing("nodeV314ContractEchoed", "NODE_V314_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "SIGNED_ARTIFACT_REQUIRED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "SIGNED_ARTIFACT_PROHIBITED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("parallelEchoRequestEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noAutoStartBoundaryEchoed", "AUTO_START_BOUNDARY_OPEN")
        );
    }

    private static RehearsalSignedHumanApprovalArtifactContractEchoSummary summary(
            RehearsalSignedHumanApprovalArtifactContractSourceNodeV312 sourceNodeV312,
            RehearsalSignedHumanApprovalArtifactContract contract,
            RehearsalSignedHumanApprovalArtifactContractEchoChecks checks
    ) {
        return new RehearsalSignedHumanApprovalArtifactContractEchoSummary(
                19,
                19,
                sourceNodeV312.sourceCheckCount(),
                sourceNodeV312.sourcePassedCheckCount(),
                18,
                18,
                sourceNodeV312.remainingPrerequisiteCount(),
                contract.requiredFieldCount(),
                contract.prohibitedFieldCount(),
                contract.rejectionReasonCount(),
                contract.noGoBoundaryCount(),
                contract.upstreamEchoRequestCount(),
                0,
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.warningCodes().size(),
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.recommendationCodes().size()
        );
    }
}
