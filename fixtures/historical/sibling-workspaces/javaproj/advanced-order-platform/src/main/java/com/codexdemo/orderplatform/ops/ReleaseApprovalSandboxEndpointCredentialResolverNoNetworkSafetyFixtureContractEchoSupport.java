package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContractEchoChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContractEchoSummary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContractNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureContractSourceNodeV322;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixturePrerequisiteTransition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords
        .RehearsalNoNetworkSafetyFixtureRequiredField;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractState",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRequiredFieldCount",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractReadyForNodeV324",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRuntimeImplemented",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCredentialValueRead",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractNetworkSafetyFixtureExecuted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractHttpRequestSent",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractTcpConnectionAttempted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractExternalRequestSent",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSqlExecuted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractDeploymentExecuted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRollbackExecuted",
                    "sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt
                    sourceReceipt
    ) {
        RehearsalNoNetworkSafetyFixtureContractSourceNodeV322 sourceNodeV322 =
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSections.sourceNodeV322();
        RehearsalNoNetworkSafetyFixtureContract contract =
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSections
                        .noNetworkSafetyFixtureContract();
        RehearsalNoNetworkSafetyFixturePrerequisiteTransition prerequisiteTransition =
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSections
                        .prerequisiteTransition();
        RehearsalNoNetworkSafetyFixtureContractNecessityProof necessityProof =
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSections.necessityProof();
        RehearsalNoNetworkSafetyFixtureContractEchoChecks checks =
                checks(sourceReceipt, sourceNodeV322, contract, prerequisiteTransition, necessityProof);
        RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary sideEffectBoundary = sideEffectBoundary();
        EchoWorkflowReadiness readiness =
                readiness(sourceNodeV322, contract, prerequisiteTransition, checks, sideEffectBoundary);
        List<String> warnings = receiptWarnings(readiness);
        RehearsalNoNetworkSafetyFixtureContractEchoSummary summary = summary(sourceNodeV322, contract);
        String digest = receiptDigest(
                sourceReceipt,
                sourceNodeV322,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt(
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V323_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V323_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V323_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_ENDPOINT,
                OpsEvidenceService.NODE_V323_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V323_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_STATE,
                "Node v324",
                "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1",
                "java-v149-no-network-safety-fixture-contract-echo-only",
                "Node v323 + Java v147",
                sourceNodeV322,
                contract,
                prerequisiteTransition,
                necessityProof,
                checks,
                sideEffectBoundary,
                summary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV322Echoed"),
                readiness.ready("sourceJavaV147EndpointHandleAllowlistApprovalContractEchoed"),
                readiness.ready("nodeV323ContractEchoed"),
                readiness.ready("requiredFieldsEchoed"),
                readiness.ready("prohibitedFieldsEchoed"),
                readiness.ready("rejectionReasonsEchoed"),
                readiness.ready("noGoBoundariesEchoed"),
                readiness.ready("prerequisiteTransitionEchoed"),
                readiness.ready("necessityProofEchoed"),
                readiness.ready("parallelEchoRequestEchoed"),
                readiness.ready("nonSecretNoNetworkContractEchoed"),
                readiness.ready("noFixtureExecutionEchoed"),
                readiness.ready("noRuntimeImplementationEchoed"),
                readiness.ready("noRuntimeInvocationEchoed"),
                readiness.ready("noCredentialValueReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noProviderClientInstantiationEchoed"),
                readiness.ready("noHttpRequestEchoed"),
                readiness.ready("noTcpConnectionEchoed"),
                readiness.ready("noExternalRequestEchoed"),
                readiness.ready("noLedgerSqlDeploymentRollbackEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractEcho(),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                digest,
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.warningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .recommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .nextRequiredEchoVersions(),
                warnings,
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
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
        return ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                .nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME, receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt receipt
    ) {
        RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractState",
                        receipt.consumedByNodeNoNetworkSafetyFixtureContractState()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRequiredFieldCount",
                        receipt.noNetworkSafetyFixtureContract().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractProhibitedFieldCount",
                        receipt.noNetworkSafetyFixtureContract().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractNoGoBoundaryCount",
                        receipt.noNetworkSafetyFixtureContract().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractReadyForNodeV324",
                        receipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractNetworkSafetyFixtureExecuted",
                        boundary.networkSafetyFixtureExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractHttpRequestSent",
                        boundary.httpRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractTcpConnectionAttempted",
                        boundary.tcpConnectionAttempted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSecretProviderInstantiated",
                        boundary.secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractResolverClientInstantiated",
                        boundary.resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractDeploymentExecuted",
                        boundary.deploymentExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractRollbackExecuted",
                        boundary.rollbackExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceipt receipt
    ) {
        RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification()
                && !receipt.readyForDisabledRuntimeShellImplementation()
                && !receipt.readyForDisabledRuntimeShellInvocation()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed()
                && !boundary.connectsManagedAudit()
                && !boundary.credentialValueRead()
                && !boundary.storesManagedAuditCredential()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.networkSafetyFixtureExecuted()
                && !boundary.httpRequestSent()
                && !boundary.tcpConnectionAttempted()
                && !boundary.externalRequestSent()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.approvalLedgerWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.deploymentExecuted()
                && !boundary.rollbackExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static RehearsalNoNetworkSafetyFixtureContractEchoChecks checks(
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt
                    sourceReceipt,
            RehearsalNoNetworkSafetyFixtureContractSourceNodeV322 sourceNodeV322,
            RehearsalNoNetworkSafetyFixtureContract contract,
            RehearsalNoNetworkSafetyFixturePrerequisiteTransition prerequisiteTransition,
            RehearsalNoNetworkSafetyFixtureContractNecessityProof necessityProof
    ) {
        boolean sourceJavaReady =
                ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoSupport
                        .noCredentialConnectionWriteOrAutoStartProved(sourceReceipt);
        boolean nodeV323Echoed = contract.contractDigest()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .NODE_V323_CONTRACT_DIGEST)
                && contract.requiredFieldCount() == 10
                && contract.prohibitedFieldCount() == 12
                && contract.rejectionReasonCount() == 6
                && contract.noGoBoundaryCount() == 10
                && contract.upstreamEchoRequestCount() == 2
                && !contract.fixtureExecutionAllowed();
        boolean requiredFieldsEchoed = contract.requiredFields().stream()
                .map(RehearsalNoNetworkSafetyFixtureRequiredField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .requiredFieldIds());
        boolean prohibitedFieldsEchoed = contract.prohibitedFields().stream()
                .map(RehearsalNoNetworkSafetyFixtureProhibitedField::id)
                .toList()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .prohibitedFieldIds());
        boolean rejectionReasonsEchoed = contract.rejectionReasons().size() == 6;
        boolean noGoBoundariesEchoed = contract.noGoBoundaries().size() == 10
                && contract.noGoBoundaries().stream().allMatch(boundary -> !boundary.allowed());
        boolean prerequisiteTransitionEchoed = prerequisiteTransition.prerequisiteId()
                .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .TARGET_PREREQUISITE_ID)
                && prerequisiteTransition.afterV323().equals("contract-intake-defined")
                && prerequisiteTransition.closureRequiresUpstreamEcho()
                && prerequisiteTransition.completedPrerequisiteCountBeforeV323() == 4
                && prerequisiteTransition.remainingPrerequisiteCountBeforeV323() == 2;
        boolean necessityProofEchoed = necessityProof.proofComplete()
                && necessityProof.consumer().equals("Java v149 + mini-kv v141, then Node v324");
        boolean parallelEchoRequestEchoed = contract.upstreamEchoRequests().size() == 2
                && contract.upstreamEchoRequests().stream()
                        .allMatch(request -> request.canRunInParallel() && request.mustRemainReadOnly());
        boolean nonSecretNoNetworkContractEchoed = contract.requiredFields().stream()
                .map(RehearsalNoNetworkSafetyFixtureRequiredField::id)
                .toList()
                .containsAll(List.of(
                        "fixture_id",
                        "expected_denied_transport_classes",
                        "forbidden_network_actions"
                ))
                && contract.prohibitedFields().stream()
                        .map(RehearsalNoNetworkSafetyFixtureProhibitedField::id)
                        .toList()
                        .containsAll(List.of(
                                "credential_value",
                                "raw_endpoint_url",
                                "http_request_execution",
                                "tcp_connection_attempt"
                        ));
        boolean ready = sourceNodeV322.readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview()
                && sourceNodeV322.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                .TARGET_PREREQUISITE_ID)
                && sourceNodeV322.chainContinuationAllowed()
                && sourceNodeV322.runtimeShellStillBlocked()
                && sourceNodeV322.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                .TARGET_PREREQUISITE_ID)
                && sourceJavaReady
                && nodeV323Echoed
                && requiredFieldsEchoed
                && prohibitedFieldsEchoed
                && rejectionReasonsEchoed
                && noGoBoundariesEchoed
                && prerequisiteTransitionEchoed
                && necessityProofEchoed
                && parallelEchoRequestEchoed
                && nonSecretNoNetworkContractEchoed;

        return new RehearsalNoNetworkSafetyFixtureContractEchoChecks(
                sourceNodeV322.readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview(),
                sourceNodeV322.nextConcretePrerequisiteId()
                        .equals(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                .TARGET_PREREQUISITE_ID)
                        && sourceNodeV322.nextConcretePrerequisiteContractRequired()
                        && sourceNodeV322.nextNodeVersionSuggested().equals("Node v323"),
                sourceNodeV322.runtimeShellStillBlocked()
                        && !sourceNodeV322.runtimeShellImplemented()
                        && !sourceNodeV322.runtimeShellInvocationAllowed(),
                !sourceNodeV322.executionAllowed()
                        && !sourceNodeV322.connectsManagedAudit()
                        && !sourceNodeV322.credentialValueRead()
                        && !sourceNodeV322.rawEndpointUrlParsed()
                        && !sourceNodeV322.externalRequestSent()
                        && !sourceNodeV322.schemaMigrationExecuted()
                        && !sourceNodeV322.approvalLedgerWritten()
                        && !sourceNodeV322.automaticUpstreamStart(),
                sourceNodeV322.remainingPrerequisiteIds()
                        .contains(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                .TARGET_PREREQUISITE_ID)
                        && !sourceNodeV322.completedPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                        .TARGET_PREREQUISITE_ID),
                sourceJavaReady,
                nodeV323Echoed,
                nodeV323Echoed,
                requiredFieldsEchoed,
                prohibitedFieldsEchoed,
                rejectionReasonsEchoed,
                noGoBoundariesEchoed,
                prerequisiteTransitionEchoed,
                necessityProofEchoed,
                parallelEchoRequestEchoed,
                nonSecretNoNetworkContractEchoed,
                !contract.fixtureExecutionAllowed(),
                true,
                true,
                true,
                true,
                true,
                ready
        );
    }

    private static RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary sideEffectBoundary() {
        return new RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary(
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
            RehearsalNoNetworkSafetyFixtureContractSourceNodeV322 sourceNodeV322,
            RehearsalNoNetworkSafetyFixtureContract contract,
            RehearsalNoNetworkSafetyFixturePrerequisiteTransition prerequisiteTransition,
            RehearsalNoNetworkSafetyFixtureContractEchoChecks checks,
            RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV322Echoed", checks.sourceNodeV322Ready()
                        && sourceNodeV322.remainingPrerequisiteIds()
                                .contains(ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                                        .TARGET_PREREQUISITE_ID)),
                workflowStep("sourceJavaV147EndpointHandleAllowlistApprovalContractEchoed",
                        checks.sourceJavaV147EndpointHandleAllowlistApprovalContractReady()),
                workflowStep("nodeV323ContractEchoed", checks.nodeV323ContractEchoed()),
                workflowStep("requiredFieldsEchoed", checks.contractRequiredFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.contractProhibitedFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("prerequisiteTransitionEchoed",
                        checks.prerequisiteTransitionScopedToNoNetworkSafetyFixture()
                                && prerequisiteTransition.afterV323().equals("contract-intake-defined")),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("parallelEchoRequestEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("nonSecretNoNetworkContractEchoed", checks.contractStaysNoNetworkAndNonSecret()
                        && contract.implementationStillBlocked()),
                workflowStep("noFixtureExecutionEchoed", checks.fixtureExecutionStillBlocked()
                        && !boundary.networkSafetyFixtureExecuted()),
                workflowStep("noRuntimeImplementationEchoed", !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed", !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialValueReadEchoed", !boundary.credentialValueRead()
                        && !boundary.credentialValueProvided()),
                workflowStep("noRawEndpointParseEchoed", !boundary.rawEndpointUrlParsed()
                        && !boundary.rawEndpointUrlRendered()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()
                                && !boundary.fakeSecretProviderInstantiated()
                                && !boundary.fakeResolverClientInstantiated()),
                workflowStep("noHttpRequestEchoed", !boundary.httpRequestSent()),
                workflowStep("noTcpConnectionEchoed", !boundary.tcpConnectionAttempted()),
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceipt
                    sourceReceipt,
            RehearsalNoNetworkSafetyFixtureContractSourceNodeV322 sourceNodeV322,
            RehearsalNoNetworkSafetyFixtureContract contract,
            RehearsalNoNetworkSafetyFixturePrerequisiteTransition prerequisiteTransition,
            RehearsalNoNetworkSafetyFixtureContractNecessityProof necessityProof,
            RehearsalNoNetworkSafetyFixtureContractEchoChecks checks,
            RehearsalNoNetworkSafetyFixtureContractEchoSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion",
                        OpsEvidenceService.RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV322", sourceNodeV322),
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
                readiness.warningIfMissing("sourceNodeV322Echoed", "NODE_V322_SOURCE_NOT_READY"),
                readiness.warningIfMissing("sourceJavaV147EndpointHandleAllowlistApprovalContractEchoed",
                        "JAVA_V147_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("nodeV323ContractEchoed", "NODE_V323_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "NO_NETWORK_REQUIRED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "NO_NETWORK_PROHIBITED_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("noFixtureExecutionEchoed", "NO_NETWORK_FIXTURE_EXECUTION_BOUNDARY_OPEN"),
                readiness.warningIfMissing("noHttpRequestEchoed", "HTTP_REQUEST_BOUNDARY_OPEN"),
                readiness.warningIfMissing("noTcpConnectionEchoed", "TCP_CONNECTION_BOUNDARY_OPEN"),
                readiness.warningIfMissing("noAutoStartBoundaryEchoed", "AUTO_START_BOUNDARY_OPEN")
        );
    }

    private static RehearsalNoNetworkSafetyFixtureContractEchoSummary summary(
            RehearsalNoNetworkSafetyFixtureContractSourceNodeV322 sourceNodeV322,
            RehearsalNoNetworkSafetyFixtureContract contract
    ) {
        return new RehearsalNoNetworkSafetyFixtureContractEchoSummary(
                22,
                22,
                sourceNodeV322.sourceCheckCount(),
                sourceNodeV322.sourcePassedCheckCount(),
                sourceNodeV322.completedPrerequisiteCount(),
                sourceNodeV322.remainingPrerequisiteCount(),
                contract.requiredFieldCount(),
                contract.prohibitedFieldCount(),
                contract.rejectionReasonCount(),
                contract.noGoBoundaryCount(),
                contract.upstreamEchoRequestCount(),
                0,
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.warningCodes().size(),
                ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog
                        .recommendationCodes()
                        .size()
        );
    }
}
