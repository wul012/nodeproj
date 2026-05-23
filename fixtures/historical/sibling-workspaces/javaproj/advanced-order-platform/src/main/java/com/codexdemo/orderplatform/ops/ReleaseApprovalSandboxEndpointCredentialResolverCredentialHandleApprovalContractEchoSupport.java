package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContractEchoChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContractEchoSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContractNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalContractSourceNodeV316;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalPrerequisiteTransition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalCredentialHandleApprovalRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractState",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRequiredFieldCount",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractReadyForNodeV318",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRuntimeImplemented",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialValueRead",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialValueStored",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialAuthorityClaimed",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractExternalRequestSent",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractSqlExecuted",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractDeploymentExecuted",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractRollbackExecuted",
                    "sandboxEndpointCredentialResolverCredentialHandleApprovalContractAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt sourceReceipt
    ) {
        RehearsalCredentialHandleApprovalContractSourceNodeV316 sourceNodeV316 =
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractSections.sourceNodeV316();
        RehearsalCredentialHandleApprovalContract contract =
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractSections
                        .credentialHandleApprovalContract();
        RehearsalCredentialHandleApprovalPrerequisiteTransition prerequisiteTransition =
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractSections
                        .prerequisiteTransition();
        RehearsalCredentialHandleApprovalContractNecessityProof necessityProof =
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractSections.necessityProof();
        RehearsalCredentialHandleApprovalContractEchoChecks checks =
                checks(sourceReceipt, sourceNodeV316, contract, prerequisiteTransition, necessityProof);
        RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary sideEffectBoundary = sideEffectBoundary();
        EchoWorkflowReadiness readiness =
                readiness(sourceNodeV316, contract, prerequisiteTransition, checks, sideEffectBoundary);
        List<String> warnings = receiptWarnings(readiness);
        RehearsalCredentialHandleApprovalContractEchoSummary summary =
                summary(sourceNodeV316, contract);
        String digest = receiptDigest(
                sourceReceipt,
                sourceNodeV316,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt(
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_SIGNED_HUMAN_APPROVAL_ARTIFACT_CONTRACT_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V317_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V317_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V317_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_ENDPOINT,
                OpsEvidenceService.NODE_V317_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V317_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_STATE,
                "Node v318",
                "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1",
                "java-v146-credential-handle-approval-contract-echo-only",
                "Node v317 + Java v145",
                sourceNodeV316,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                summary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV316Echoed"),
                readiness.ready("sourceJavaV145SignedArtifactContractEchoed"),
                readiness.ready("nodeV317ContractEchoed"),
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
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractEcho(),
                false,
                false,
                false,
                false,
                false,
                false,
                digest,
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.warningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.recommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.nextRequiredEchoVersions(),
                warnings,
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.nodeVerificationActions()
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME, receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt receipt
    ) {
        RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractState",
                        receipt.consumedByNodeCredentialHandleApprovalContractState()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractRequiredFieldCount",
                        receipt.credentialHandleApprovalContract().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractProhibitedFieldCount",
                        receipt.credentialHandleApprovalContract().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractNoGoBoundaryCount",
                        receipt.credentialHandleApprovalContract().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractReadyForNodeV318",
                        receipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialValueStored",
                        boundary.storesManagedAuditCredential()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractCredentialAuthorityClaimed",
                        boundary.credentialAuthorityClaimedByJava()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractSecretProviderInstantiated",
                        boundary.secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractResolverClientInstantiated",
                        boundary.resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractDeploymentExecuted",
                        boundary.deploymentExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractRollbackExecuted",
                        boundary.rollbackExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverCredentialHandleApprovalContractAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceipt receipt
    ) {
        RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.connectsManagedAudit()
                && !boundary.credentialValueRead()
                && !boundary.storesManagedAuditCredential()
                && !boundary.credentialHandleApprovedByJava()
                && !boundary.credentialHandleStoredByJava()
                && !boundary.credentialHandleValidatedByJava()
                && !boundary.credentialAuthorityClaimedByJava()
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

    private static RehearsalCredentialHandleApprovalContractEchoChecks checks(
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt sourceReceipt,
            RehearsalCredentialHandleApprovalContractSourceNodeV316 sourceNodeV316,
            RehearsalCredentialHandleApprovalContract contract,
            RehearsalCredentialHandleApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalCredentialHandleApprovalContractNecessityProof necessityProof
    ) {
        boolean sourceJavaReady =
                ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoSupport
                        .noCredentialConnectionWriteOrAutoStartProved(sourceReceipt);
        boolean nodeV317Echoed = contract.contractDigest()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.NODE_V317_CONTRACT_DIGEST)
                && contract.requiredFieldCount() == 10
                && contract.prohibitedFieldCount() == 8
                && contract.rejectionReasonCount() == 5
                && contract.noGoBoundaryCount() == 9
                && contract.upstreamEchoRequestCount() == 2;
        boolean requiredFieldsEchoed = contract.requiredFields().stream()
                .map(RehearsalCredentialHandleApprovalRequiredField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.requiredFieldIds());
        boolean prohibitedFieldsEchoed = contract.prohibitedFields().stream()
                .map(RehearsalCredentialHandleApprovalProhibitedField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.prohibitedFieldIds());
        boolean rejectionReasonsEchoed = contract.rejectionReasons().size() == 5;
        boolean noGoBoundariesEchoed = contract.noGoBoundaries().size() == 9
                && contract.noGoBoundaries().stream().allMatch(boundary -> !boundary.allowed());
        boolean prerequisiteTransitionEchoed = prerequisiteTransition.prerequisiteId()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && prerequisiteTransition.afterV317().equals("contract-intake-defined")
                && prerequisiteTransition.closureRequiresUpstreamEcho()
                && prerequisiteTransition.completedPrerequisiteCountBeforeV317() == 2
                && prerequisiteTransition.remainingPrerequisiteCountBeforeV317() == 4;
        boolean necessityProofEchoed = necessityProof.proofComplete()
                && necessityProof.consumer().equals("Java v146 + mini-kv v139, then Node v318");
        boolean parallelEchoRequestEchoed = contract.upstreamEchoRequests().size() == 2
                && contract.upstreamEchoRequests().stream()
                        .allMatch(request -> request.canRunInParallel() && request.mustRemainReadOnly());
        boolean nonSecretContractEchoed = !contract.requiredFields().stream()
                .map(RehearsalCredentialHandleApprovalRequiredField::id)
                .toList()
                .contains("credential_value")
                && contract.prohibitedFields().stream()
                        .map(RehearsalCredentialHandleApprovalProhibitedField::id)
                        .toList()
                        .containsAll(List.of("credential_value", "raw_endpoint_url"));
        boolean ready = sourceNodeV316.readyForSignedHumanApprovalArtifactPrerequisiteClosureReview()
                && sourceNodeV316.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && sourceNodeV316.chainContinuationAllowed()
                && sourceNodeV316.runtimeShellStillBlocked()
                && sourceNodeV316.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                && sourceJavaReady
                && nodeV317Echoed
                && requiredFieldsEchoed
                && prohibitedFieldsEchoed
                && rejectionReasonsEchoed
                && noGoBoundariesEchoed
                && prerequisiteTransitionEchoed
                && necessityProofEchoed
                && parallelEchoRequestEchoed
                && nonSecretContractEchoed;

        return new RehearsalCredentialHandleApprovalContractEchoChecks(
                sourceNodeV316.readyForSignedHumanApprovalArtifactPrerequisiteClosureReview(),
                sourceNodeV316.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                        && sourceNodeV316.nextConcretePrerequisiteContractRequired()
                        && sourceNodeV316.nextNodeVersionSuggested().equals("Node v317"),
                sourceNodeV316.runtimeShellStillBlocked()
                        && !sourceNodeV316.runtimeShellImplemented()
                        && !sourceNodeV316.runtimeShellInvocationAllowed(),
                !sourceNodeV316.executionAllowed()
                        && !sourceNodeV316.connectsManagedAudit()
                        && !sourceNodeV316.credentialValueRead()
                        && !sourceNodeV316.rawEndpointUrlParsed()
                        && !sourceNodeV316.externalRequestSent()
                        && !sourceNodeV316.schemaMigrationExecuted()
                        && !sourceNodeV316.approvalLedgerWritten()
                        && !sourceNodeV316.automaticUpstreamStart(),
                sourceNodeV316.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)
                        && !sourceNodeV316.completedPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID),
                sourceJavaReady,
                nodeV317Echoed,
                nodeV317Echoed,
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

    private static RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary sideEffectBoundary() {
        return new RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary(
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
            RehearsalCredentialHandleApprovalContractSourceNodeV316 sourceNodeV316,
            RehearsalCredentialHandleApprovalContract contract,
            RehearsalCredentialHandleApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalCredentialHandleApprovalContractEchoChecks checks,
            RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV316Echoed", checks.sourceNodeV316Ready()
                        && sourceNodeV316.remainingPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.TARGET_PREREQUISITE_ID)),
                workflowStep("sourceJavaV145SignedArtifactContractEchoed",
                        checks.sourceJavaV145SignedArtifactContractReady()),
                workflowStep("nodeV317ContractEchoed", checks.nodeV317ContractEchoed()),
                workflowStep("requiredFieldsEchoed", checks.contractRequiredFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.contractProhibitedFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("prerequisiteTransitionEchoed",
                        checks.prerequisiteTransitionScopedToCredentialHandle()
                                && prerequisiteTransition.afterV317().equals("contract-intake-defined")),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("parallelEchoRequestEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("nonSecretContractEchoed", checks.contractStaysNonSecret()
                        && contract.implementationStillBlocked()),
                workflowStep("noRuntimeImplementationEchoed", !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed", !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialValueReadEchoed", !boundary.credentialValueRead()
                        && !boundary.credentialValueProvided()),
                workflowStep("noCredentialValueStoredEchoed", !boundary.storesManagedAuditCredential()
                        && !boundary.credentialHandleStoredByJava()),
                workflowStep("noCredentialAuthorityClaimedEchoed",
                        !boundary.credentialAuthorityClaimedByJava()),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceipt sourceReceipt,
            RehearsalCredentialHandleApprovalContractSourceNodeV316 sourceNodeV316,
            RehearsalCredentialHandleApprovalContract contract,
            RehearsalCredentialHandleApprovalPrerequisiteTransition prerequisiteTransition,
            RehearsalCredentialHandleApprovalContractNecessityProof necessityProof,
            RehearsalCredentialHandleApprovalContractEchoChecks checks,
            RehearsalCredentialHandleApprovalContractEchoSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion",
                        OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV316", sourceNodeV316),
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
                readiness.warningIfMissing("sourceNodeV316Echoed", "NODE_V316_SOURCE_NOT_READY"),
                readiness.warningIfMissing("sourceJavaV145SignedArtifactContractEchoed",
                        "JAVA_V145_SIGNED_ARTIFACT_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("nodeV317ContractEchoed", "NODE_V317_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "CREDENTIAL_HANDLE_REQUIRED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "CREDENTIAL_HANDLE_PROHIBITED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("parallelEchoRequestEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noCredentialAuthorityClaimedEchoed",
                        "CREDENTIAL_AUTHORITY_BOUNDARY_OPEN"),
                readiness.warningIfMissing("noAutoStartBoundaryEchoed", "AUTO_START_BOUNDARY_OPEN")
        );
    }

    private static RehearsalCredentialHandleApprovalContractEchoSummary summary(
            RehearsalCredentialHandleApprovalContractSourceNodeV316 sourceNodeV316,
            RehearsalCredentialHandleApprovalContract contract
    ) {
        return new RehearsalCredentialHandleApprovalContractEchoSummary(
                21,
                21,
                sourceNodeV316.sourceCheckCount(),
                sourceNodeV316.sourcePassedCheckCount(),
                sourceNodeV316.completedPrerequisiteCount(),
                sourceNodeV316.remainingPrerequisiteCount(),
                contract.requiredFieldCount(),
                contract.prohibitedFieldCount(),
                contract.rejectionReasonCount(),
                contract.noGoBoundaryCount(),
                contract.upstreamEchoRequestCount(),
                0,
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.warningCodes().size(),
                ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.recommendationCodes().size()
        );
    }
}
