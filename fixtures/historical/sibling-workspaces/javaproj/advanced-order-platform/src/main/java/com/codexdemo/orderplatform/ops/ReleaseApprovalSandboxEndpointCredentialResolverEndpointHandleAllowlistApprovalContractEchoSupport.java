package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContractEchoChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContractEchoSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContractNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalPrerequisiteTransition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalEndpointHandleAllowlistApprovalRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractState",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRequiredFieldCount",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractReadyForNodeV321",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRuntimeImplemented",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCredentialValueRead",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCredentialValueStored",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEndpointHandleAuthorityClaimed",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractExternalRequestSent",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSqlExecuted",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractDeploymentExecuted",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRollbackExecuted",
                    "sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt sourceReceipt
    ) {
        RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319 sourceNodeV319 =
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSections.sourceNodeV319();
        RehearsalEndpointHandleAllowlistApprovalContract contract =
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSections
                        .endpointHandleAllowlistApprovalContract();
        RehearsalEndpointHandleAllowlistApprovalPrerequisiteTransition prerequisiteTransition =
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSections
                        .prerequisiteTransition();
        RehearsalEndpointHandleAllowlistApprovalContractNecessityProof necessityProof =
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSections.necessityProof();
        RehearsalEndpointHandleAllowlistApprovalContractEchoChecks checks =
                checks(sourceReceipt, sourceNodeV319, contract, prerequisiteTransition, necessityProof);
        RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary sideEffectBoundary = sideEffectBoundary();
        EchoWorkflowReadiness readiness =
                readiness(sourceNodeV319, contract, prerequisiteTransition, checks, sideEffectBoundary);
        List<String> warnings = receiptWarnings(readiness);
        RehearsalEndpointHandleAllowlistApprovalContractEchoSummary summary =
                summary(sourceNodeV319, contract);
        String digest = receiptDigest(
                sourceReceipt,
                sourceNodeV319,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt(
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V320_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V320_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V320_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_ENDPOINT,
                OpsEvidenceService.NODE_V320_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V320_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_STATE,
                "Node v321",
                "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1",
                "java-v147-endpoint-handle-allowlist-approval-contract-echo-only",
                "Node v320 + Java v146",
                sourceNodeV319,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                summary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV319Echoed"),
                readiness.ready("sourceJavaV146CredentialHandleApprovalContractEchoed"),
                readiness.ready("nodeV320ContractEchoed"),
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
                readiness.ready("noCredentialValueReadEchoed"),
                readiness.ready("noCredentialValueStoredEchoed"),
                readiness.ready("noCredentialAuthorityClaimedEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noLedgerSqlDeploymentRollbackEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractEcho(),
                false,
                false,
                false,
                false,
                false,
                false,
                digest,
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.warningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.recommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.nextRequiredEchoVersions(),
                warnings,
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.nodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME, receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt receipt
    ) {
        RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractState",
                        receipt.consumedByNodeEndpointHandleAllowlistApprovalContractState()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRequiredFieldCount",
                        receipt.endpointHandleAllowlistApprovalContract().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractProhibitedFieldCount",
                        receipt.endpointHandleAllowlistApprovalContract().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractNoGoBoundaryCount",
                        receipt.endpointHandleAllowlistApprovalContract().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractReadyForNodeV321",
                        receipt.readyForNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCredentialValueStored",
                        boundary.storesManagedAuditCredential()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEndpointHandleAuthorityClaimed",
                        boundary.endpointHandleAuthorityClaimedByJava()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSecretProviderInstantiated",
                        boundary.secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractResolverClientInstantiated",
                        boundary.resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractDeploymentExecuted",
                        boundary.deploymentExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractRollbackExecuted",
                        boundary.rollbackExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt receipt
    ) {
        RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.connectsManagedAudit()
                && !boundary.credentialValueRead()
                && !boundary.storesManagedAuditCredential()
                && !boundary.endpointHandleApprovedByJava()
                && !boundary.endpointHandleStoredByJava()
                && !boundary.endpointHandleValidatedByJava()
                && !boundary.endpointHandleAuthorityClaimedByJava()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.externalRequestSent()
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.deploymentExecuted()
                && !boundary.rollbackExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalEndpointHandleAllowlistApprovalContractEchoChecks checks(
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt sourceReceipt,
            RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319 sourceNodeV319,
            RehearsalEndpointHandleAllowlistApprovalContract contract,
            RehearsalEndpointHandleAllowlistApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalEndpointHandleAllowlistApprovalContractNecessityProof necessityProof
    ) {
        boolean sourceJavaReady =
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoSupport
                        .noCredentialConnectionWriteOrAutoStartProved(sourceReceipt);
        boolean nodeV320Echoed = contract.contractDigest()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.NODE_V320_CONTRACT_DIGEST)
                && contract.requiredFieldCount() == 10
                && contract.prohibitedFieldCount() == 8
                && contract.rejectionReasonCount() == 5
                && contract.noGoBoundaryCount() == 9
                && contract.upstreamEchoRequestCount() == 2;
        boolean requiredFieldsEchoed = contract.requiredFields().stream()
                .map(RehearsalEndpointHandleAllowlistApprovalRequiredField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.requiredFieldIds());
        boolean prohibitedFieldsEchoed = contract.prohibitedFields().stream()
                .map(RehearsalEndpointHandleAllowlistApprovalProhibitedField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.prohibitedFieldIds());
        boolean rejectionReasonsEchoed = contract.rejectionReasons().size() == 5;
        boolean noGoBoundariesEchoed = contract.noGoBoundaries().size() == 9
                && contract.noGoBoundaries().stream().allMatch(boundary -> !boundary.allowed());
        boolean prerequisiteTransitionEchoed = prerequisiteTransition.prerequisiteId()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && prerequisiteTransition.afterV320().equals("contract-intake-defined")
                && prerequisiteTransition.closureRequiresUpstreamEcho()
                && prerequisiteTransition.completedPrerequisiteCountBeforeV320() == 3
                && prerequisiteTransition.remainingPrerequisiteCountBeforeV320() == 3;
        boolean necessityProofEchoed = necessityProof.proofComplete()
                && necessityProof.consumer().equals("Java v147 + mini-kv v140, then Node v321");
        boolean parallelEchoRequestEchoed = contract.upstreamEchoRequests().size() == 2
                && contract.upstreamEchoRequests().stream()
                        .allMatch(request -> request.canRunInParallel() && request.mustRemainReadOnly());
        boolean nonSecretContractEchoed = !contract.requiredFields().stream()
                .map(RehearsalEndpointHandleAllowlistApprovalRequiredField::id)
                .toList()
                .contains("credential_value")
                && contract.prohibitedFields().stream()
                        .map(RehearsalEndpointHandleAllowlistApprovalProhibitedField::id)
                        .toList()
                        .containsAll(List.of("credential_value", "raw_endpoint_url"));
        boolean ready = sourceNodeV319.readyForCredentialHandleApprovalPrerequisiteClosureReview()
                && sourceNodeV319.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && sourceNodeV319.chainContinuationAllowed()
                && sourceNodeV319.runtimeShellStillBlocked()
                && sourceNodeV319.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && sourceJavaReady
                && nodeV320Echoed
                && requiredFieldsEchoed
                && prohibitedFieldsEchoed
                && rejectionReasonsEchoed
                && noGoBoundariesEchoed
                && prerequisiteTransitionEchoed
                && necessityProofEchoed
                && parallelEchoRequestEchoed
                && nonSecretContractEchoed;

        return new RehearsalEndpointHandleAllowlistApprovalContractEchoChecks(
                sourceNodeV319.readyForCredentialHandleApprovalPrerequisiteClosureReview(),
                sourceNodeV319.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                        && sourceNodeV319.nextConcretePrerequisiteContractRequired()
                        && sourceNodeV319.nextNodeVersionSuggested().equals("Node v320"),
                sourceNodeV319.runtimeShellStillBlocked()
                        && !sourceNodeV319.runtimeShellImplemented()
                        && !sourceNodeV319.runtimeShellInvocationAllowed(),
                !sourceNodeV319.executionAllowed()
                        && !sourceNodeV319.connectsManagedAudit()
                        && !sourceNodeV319.credentialValueRead()
                        && !sourceNodeV319.rawEndpointUrlParsed()
                        && !sourceNodeV319.externalRequestSent()
                        && !sourceNodeV319.schemaMigrationExecuted()
                        && !sourceNodeV319.approvalLedgerWritten()
                        && !sourceNodeV319.automaticUpstreamStart(),
                sourceNodeV319.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                        && !sourceNodeV319.completedPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID),
                sourceJavaReady,
                nodeV320Echoed,
                nodeV320Echoed,
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

    private static RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary sideEffectBoundary() {
        return new RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary(
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
                false,
                false,
                false
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319 sourceNodeV319,
            RehearsalEndpointHandleAllowlistApprovalContract contract,
            RehearsalEndpointHandleAllowlistApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalEndpointHandleAllowlistApprovalContractEchoChecks checks,
            RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV319Echoed", checks.sourceNodeV319Ready()
                        && sourceNodeV319.remainingPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.TARGET_PREREQUISITE_ID)),
                workflowStep("sourceJavaV146CredentialHandleApprovalContractEchoed",
                        checks.sourceJavaV146CredentialHandleApprovalContractReady()),
                workflowStep("nodeV320ContractEchoed", checks.nodeV320ContractEchoed()),
                workflowStep("requiredFieldsEchoed", checks.contractRequiredFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.contractProhibitedFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("prerequisiteTransitionEchoed",
                        checks.prerequisiteTransitionScopedToEndpointHandleAllowlist()
                                && prerequisiteTransition.afterV320().equals("contract-intake-defined")),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("parallelEchoRequestEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("nonSecretContractEchoed", checks.contractStaysNonSecret()
                        && contract.implementationStillBlocked()),
                workflowStep("noRuntimeImplementationEchoed", !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed", !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialValueReadEchoed", !boundary.credentialValueRead()
                        && !boundary.credentialValueProvided()),
                workflowStep("noCredentialValueStoredEchoed", !boundary.storesManagedAuditCredential()
                        && !boundary.endpointHandleStoredByJava()),
                workflowStep("noCredentialAuthorityClaimedEchoed",
                        !boundary.endpointHandleAuthorityClaimedByJava()),
                workflowStep("noRawEndpointParseEchoed", !boundary.rawEndpointUrlParsed()
                        && !boundary.rawEndpointUrlRendered()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()
                                && !boundary.fakeSecretProviderInstantiated()
                                && !boundary.fakeResolverClientInstantiated()),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt sourceReceipt,
            RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319 sourceNodeV319,
            RehearsalEndpointHandleAllowlistApprovalContract contract,
            RehearsalEndpointHandleAllowlistApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalEndpointHandleAllowlistApprovalContractNecessityProof necessityProof,
            RehearsalEndpointHandleAllowlistApprovalContractEchoChecks checks,
            RehearsalEndpointHandleAllowlistApprovalContractEchoSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion",
                        OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV319", sourceNodeV319),
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
                readiness.warningIfMissing("sourceNodeV319Echoed", "NODE_V319_SOURCE_NOT_READY"),
                readiness.warningIfMissing("sourceJavaV146CredentialHandleApprovalContractEchoed",
                        "JAVA_V146_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("nodeV320ContractEchoed", "NODE_V320_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "ENDPOINT_HANDLE_ALLOWLIST_REQUIRED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "ENDPOINT_HANDLE_ALLOWLIST_PROHIBITED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("parallelEchoRequestEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noCredentialAuthorityClaimedEchoed",
                        "ENDPOINT_HANDLE_AUTHORITY_BOUNDARY_OPEN"),
                readiness.warningIfMissing("noAutoStartBoundaryEchoed", "AUTO_START_BOUNDARY_OPEN")
        );
    }

    private static RehearsalEndpointHandleAllowlistApprovalContractEchoSummary summary(
            RehearsalEndpointHandleAllowlistApprovalContractSourceNodeV319 sourceNodeV319,
            RehearsalEndpointHandleAllowlistApprovalContract contract
    ) {
        return new RehearsalEndpointHandleAllowlistApprovalContractEchoSummary(
                21,
                21,
                sourceNodeV319.sourceCheckCount(),
                sourceNodeV319.sourcePassedCheckCount(),
                sourceNodeV319.completedPrerequisiteCount(),
                sourceNodeV319.remainingPrerequisiteCount(),
                contract.requiredFieldCount(),
                contract.prohibitedFieldCount(),
                contract.rejectionReasonCount(),
                contract.noGoBoundaryCount(),
                contract.upstreamEchoRequestCount(),
                0,
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.warningCodes().size(),
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.recommendationCodes().size()
        );
    }
}
