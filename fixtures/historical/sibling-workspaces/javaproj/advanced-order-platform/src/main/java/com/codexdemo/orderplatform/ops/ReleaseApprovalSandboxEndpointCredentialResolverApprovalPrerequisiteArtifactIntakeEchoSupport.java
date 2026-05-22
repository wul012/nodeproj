package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactIntakeChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactIntakePlan;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactNoGoBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactProhibitedField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactRejectionReason;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactRequiredField;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalApprovalPrerequisiteArtifactUpstreamEchoRequest;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt;
import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES =
            ReleaseApprovalEchoMarkerSupport.boundaryInputNames(
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakePlanState",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRequiredFieldCount",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactProhibitedFieldCount",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRejectionReasonCount",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactNoGoBoundaryCount",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactReadyForNodeV307",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRuntimeImplemented",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRuntimeInvocationAllowed",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactCredentialValueRead",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactExternalRequestSent",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactProviderClientInstantiated",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactSqlExecuted",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactMiniKvWriteOrAuthorityCommandExecuted",
                    "sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactAutomaticUpstreamStart"
            );

    private ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt source
    ) {
        RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305 = sourceNodeV305(source);
        RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof = necessityProof();
        RehearsalApprovalPrerequisiteArtifactIntakePlan artifactIntakePlan =
                artifactIntakePlan(sourceNodeV305, necessityProof);
        RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary = sideEffectBoundary();
        RehearsalApprovalPrerequisiteArtifactIntakeChecks checks =
                checks(sourceNodeV305, artifactIntakePlan, necessityProof, boundary);
        EchoWorkflowReadiness readiness = readiness(sourceNodeV305, artifactIntakePlan, checks, boundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(source, sourceNodeV305, artifactIntakePlan, necessityProof, checks,
                boundary, readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_ECHO_RECEIPT_VERSION,
                source.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_RUNTIME_SHELL_STOP_PREREQUISITE_DECISION_ECHO_RECEIPT_SCHEMA_VERSION,
                source.receiptDigest(),
                OpsEvidenceService.NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_VERSION,
                OpsEvidenceService.NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_PROFILE,
                OpsEvidenceService.NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_ENDPOINT,
                OpsEvidenceService.NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_STATE,
                "Node v305",
                "Node v307",
                "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification.v1",
                "java-v142-credential-resolver-approval-prerequisite-artifact-intake-echo-only",
                "Node v306",
                sourceNodeV305,
                artifactIntakePlan,
                necessityProof,
                checks,
                boundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV305Echoed"),
                readiness.ready("artifactContractEchoed"),
                readiness.ready("requiredFieldsEchoed"),
                readiness.ready("prohibitedFieldsEchoed"),
                readiness.ready("rejectionReasonsEchoed"),
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
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .requiredFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .prohibitedFieldIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .rejectionReasonCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .noGoBoundaryIds(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .nodeWarningCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .nodeRecommendationCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .nextRequiredEchoVersions(),
                receiptWarnings,
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
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
        return ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                .proofClaims();
    }

    static List<String> nodeVerificationActions() {
        return ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                .nodeVerificationActions();
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt receipt
    ) {
        RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return ReleaseApprovalEchoMarkerSupport.boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakePlanState",
                        receipt.consumedByNodeApprovalPrerequisiteArtifactIntakePlanState()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRequiredFieldCount",
                        receipt.artifactIntakePlan().requiredFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactProhibitedFieldCount",
                        receipt.artifactIntakePlan().prohibitedFieldCount()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRejectionReasonCount",
                        receipt.artifactIntakePlan().rejectionReasonCount()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactNoGoBoundaryCount",
                        receipt.artifactIntakePlan().noGoBoundaryCount()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactReadyForNodeV307",
                        receipt.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRuntimeImplemented",
                        boundary.disabledRuntimeShellImplemented()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRuntimeInvocationAllowed",
                        boundary.disabledRuntimeShellInvocationAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactCredentialValueRead",
                        boundary.credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactRawEndpointUrlParsed",
                        boundary.rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactExternalRequestSent",
                        boundary.externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactProviderClientInstantiated",
                        boundary.secretProviderInstantiated() || boundary.resolverClientInstantiated()
                                || boundary.fakeSecretProviderInstantiated() || boundary.fakeResolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactApprovalLedgerWritten",
                        boundary.approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactSqlExecuted",
                        boundary.sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactSchemaMigrationExecuted",
                        boundary.schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactMiniKvWriteOrAuthorityCommandExecuted",
                        boundary.miniKvWriteOrAuthorityCommandExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverApprovalPrerequisiteArtifactAutomaticUpstreamStart",
                        boundary.automaticUpstreamStart())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeEchoReceipt receipt
    ) {
        RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary = receipt.sideEffectBoundary();
        return receipt.readyForNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification()
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

    private static RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt source
    ) {
        return new RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo(
                "Node v305",
                "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1",
                "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready",
                source.readyForNodeV305StopPrerequisiteUpstreamEchoVerification(),
                verificationDigest(source),
                "Node v304 + Java v141 + mini-kv v134",
                source.readyForNodeV305StopPrerequisiteUpstreamEchoVerification(),
                source.prerequisiteGateEchoed(),
                source.noRuntimeImplementationEchoed()
                        && source.noRuntimeInvocationEchoed()
                        && source.noCredentialReadEchoed()
                        && source.noRawEndpointParseEchoed()
                        && source.noExternalRequestEchoed()
                        && source.noWriteOrMigrationEchoed()
                        && source.noAutoStartBoundaryEchoed(),
                source.decisionRecord().decisionDigest(),
                source.decisionRecord().prerequisiteCount(),
                source.decisionRecord().missingRuntimePrerequisiteCount(),
                source.decisionRecord().noGoConditionCount(),
                source.receiptWarnings().isEmpty() ? 0 : source.receiptWarnings().size(),
                source.nodeWarningCodes().size(),
                source.nodeRecommendationCodes().size(),
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

    private static RehearsalApprovalPrerequisiteArtifactIntakePlan artifactIntakePlan(
            RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305,
            RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof
    ) {
        List<RehearsalApprovalPrerequisiteArtifactRequiredField> requiredFields =
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .requiredFields();
        List<RehearsalApprovalPrerequisiteArtifactProhibitedField> prohibitedFields =
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .prohibitedFields();
        List<RehearsalApprovalPrerequisiteArtifactRejectionReason> rejectionReasons =
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .rejectionReasons();
        List<RehearsalApprovalPrerequisiteArtifactNoGoBoundary> noGoBoundaries =
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .noGoBoundaries();
        List<RehearsalApprovalPrerequisiteArtifactUpstreamEchoRequest> upstreamEchoRequests =
                ReleaseApprovalSandboxEndpointCredentialResolverApprovalPrerequisiteArtifactIntakeCatalog
                        .upstreamEchoRequests();
        String digest = artifactDigest(sourceNodeV305, necessityProof, requiredFields, prohibitedFields,
                rejectionReasons, noGoBoundaries, upstreamEchoRequests);

        return new RehearsalApprovalPrerequisiteArtifactIntakePlan(
                digest,
                "managed-audit-runtime-shell-approval-prerequisite-artifact",
                "approval-prerequisite-artifact.v1",
                "approval-prerequisite-artifact-intake-plan-only",
                "Node v305 + planned Java v142 + planned mini-kv v135",
                "Capture non-secret approval prerequisite handles and review statuses required before any managed audit credential resolver runtime shell implementation can be discussed.",
                requiredFields,
                prohibitedFields,
                rejectionReasons,
                noGoBoundaries,
                upstreamEchoRequests,
                requiredFields.size(),
                prohibitedFields.size(),
                rejectionReasons.size(),
                noGoBoundaries.size(),
                true,
                true
        );
    }

    private static RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof() {
        return new RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof(
                true,
                "v305 proved the blocked prerequisite decision is echoed upstream, but the six documented-missing prerequisites still lack a concrete non-secret artifact shape.",
                "Java v142 + mini-kv v135, then Node v307",
                "v305 verifies Java v141 and mini-kv v134 echoed Node v304; it does not define required artifact fields, prohibited fields, rejection reasons, or no-go boundaries for the next intake.",
                "Reuse v305 only as source evidence and create v306 as the smallest artifact intake contract consumed by Java v142, mini-kv v135, and Node v307.",
                "Stop if the next step asks for credential values, raw endpoint URLs, provider/client configuration, HTTP/TCP, runtime shell implementation or invocation, ledger writes, schema migration, mini-kv writes/admin commands, or automatic upstream start."
        );
    }

    private static RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary sideEffectBoundary() {
        return new RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary(
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

    private static RehearsalApprovalPrerequisiteArtifactIntakeChecks checks(
            RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305,
            RehearsalApprovalPrerequisiteArtifactIntakePlan artifactIntakePlan,
            RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof,
            RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary
    ) {
        boolean sourceReady = sourceNodeV305.readyForUpstreamEchoVerification();
        boolean sourceAligned = sourceNodeV305.upstreamEchoAligned();
        boolean sourceGateBlocked = sourceNodeV305.prerequisiteGateStillBlocked()
                && sourceNodeV305.prerequisiteCount() == 6
                && sourceNodeV305.missingRuntimePrerequisiteCount() == 6
                && sourceNodeV305.noGoConditionCount() == 8;
        boolean sourceSideEffectsClosed = sourceNodeV305.sideEffectBoundariesAligned()
                && !sourceNodeV305.runtimeShellImplemented()
                && !sourceNodeV305.runtimeShellInvocationAllowed()
                && !sourceNodeV305.executionAllowed()
                && !sourceNodeV305.connectsManagedAudit()
                && !sourceNodeV305.credentialValueRead()
                && !sourceNodeV305.rawEndpointUrlParsed()
                && !sourceNodeV305.externalRequestSent()
                && !sourceNodeV305.schemaMigrationExecuted()
                && !sourceNodeV305.approvalLedgerWritten()
                && !sourceNodeV305.automaticUpstreamStart();
        boolean requiredFieldsDocumented = artifactIntakePlan.requiredFieldCount() == 12
                && artifactIntakePlan.requiredFields().stream()
                .allMatch(RehearsalApprovalPrerequisiteArtifactRequiredField::required);
        boolean prohibitedFieldsDocumented = artifactIntakePlan.prohibitedFieldCount() == 8
                && artifactIntakePlan.prohibitedFields().stream()
                .map(RehearsalApprovalPrerequisiteArtifactProhibitedField::rejectionCode)
                .toList()
                .containsAll(List.of(
                        "CREDENTIAL_VALUE_PRESENT",
                        "RAW_ENDPOINT_URL_PRESENT",
                        "WRITE_OR_SCHEMA_MUTATION_REQUESTED"
                ));
        boolean rejectionReasonsDocumented = artifactIntakePlan.rejectionReasonCount() == 9
                && artifactIntakePlan.rejectionReasons().stream()
                .map(RehearsalApprovalPrerequisiteArtifactRejectionReason::code)
                .toList()
                .containsAll(List.of(
                        "JAVA_OR_MINIKV_ECHO_MISSING",
                        "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED",
                        "EXTERNAL_REQUEST_REQUESTED"
                ));
        boolean noGoBoundariesClosed = artifactIntakePlan.noGoBoundaryCount() == 12
                && artifactIntakePlan.noGoBoundaries().stream()
                .noneMatch(RehearsalApprovalPrerequisiteArtifactNoGoBoundary::allowed)
                && artifactIntakePlan.implementationStillBlocked();
        boolean proofDocumented = necessityProof.proofComplete()
                && necessityProof.consumer().equals("Java v142 + mini-kv v135, then Node v307")
                && necessityProof.whyV305CannotBeReused().contains("does not define required artifact fields");
        boolean echoRequestParallel = artifactIntakePlan.upstreamEchoRequests().size() == 2
                && artifactIntakePlan.upstreamEchoRequests().stream()
                .allMatch(request -> request.canRunInParallel() && request.mustRemainReadOnly())
                && artifactIntakePlan.javaMiniKvEchoCanRunInParallel();
        boolean upstreamProbesStillDisabled = true;
        boolean upstreamActionsStillDisabled = true;
        boolean runtimeBlocked = !boundary.disabledRuntimeShellImplemented()
                && !boundary.disabledRuntimeShellInvocationAllowed();
        boolean productionAuditBlocked = !boundary.productionAuditAllowed();
        boolean productionWindowBlocked = !boundary.productionWindowAllowed();
        boolean ready = sourceReady
                && sourceAligned
                && sourceGateBlocked
                && sourceSideEffectsClosed
                && requiredFieldsDocumented
                && prohibitedFieldsDocumented
                && rejectionReasonsDocumented
                && noGoBoundariesClosed
                && proofDocumented
                && echoRequestParallel
                && upstreamProbesStillDisabled
                && upstreamActionsStillDisabled
                && runtimeBlocked
                && productionAuditBlocked
                && productionWindowBlocked;

        return new RehearsalApprovalPrerequisiteArtifactIntakeChecks(
                sourceReady,
                sourceAligned,
                sourceGateBlocked,
                sourceSideEffectsClosed,
                requiredFieldsDocumented,
                prohibitedFieldsDocumented,
                rejectionReasonsDocumented,
                noGoBoundariesClosed,
                proofDocumented,
                echoRequestParallel,
                upstreamProbesStillDisabled,
                upstreamActionsStillDisabled,
                runtimeBlocked,
                productionAuditBlocked,
                productionWindowBlocked,
                ready
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305,
            RehearsalApprovalPrerequisiteArtifactIntakePlan artifactIntakePlan,
            RehearsalApprovalPrerequisiteArtifactIntakeChecks checks,
            RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV305Echoed",
                        checks.sourceNodeV305Ready() && checks.sourceNodeV305UpstreamEchoAligned()),
                workflowStep("artifactContractEchoed",
                        artifactIntakePlan.artifactDigest().startsWith("sha256:")
                                && artifactIntakePlan.implementationStillBlocked()),
                workflowStep("requiredFieldsEchoed", checks.requiredArtifactFieldsDocumented()),
                workflowStep("prohibitedFieldsEchoed", checks.prohibitedArtifactFieldsDocumented()),
                workflowStep("rejectionReasonsEchoed", checks.rejectionReasonsDocumented()),
                workflowStep("noGoBoundariesEchoed", checks.noGoBoundariesClosed()),
                workflowStep("upstreamEchoRequestsEchoed", checks.javaMiniKvEchoRequestExplicitlyParallel()),
                workflowStep("necessityProofEchoed", checks.necessityProofDocumented()),
                workflowStep("noRuntimeImplementationEchoed",
                        !sourceNodeV305.runtimeShellImplemented() && !boundary.disabledRuntimeShellImplemented()),
                workflowStep("noRuntimeInvocationEchoed",
                        !sourceNodeV305.runtimeShellInvocationAllowed()
                                && !boundary.disabledRuntimeShellInvocationAllowed()),
                workflowStep("noCredentialReadEchoed",
                        !sourceNodeV305.credentialValueRead() && !boundary.credentialValueRead()),
                workflowStep("noRawEndpointParseEchoed",
                        !sourceNodeV305.rawEndpointUrlParsed() && !boundary.rawEndpointUrlParsed()),
                workflowStep("noProviderClientInstantiationEchoed",
                        !boundary.secretProviderInstantiated()
                                && !boundary.resolverClientInstantiated()
                                && !boundary.fakeSecretProviderInstantiated()
                                && !boundary.fakeResolverClientInstantiated()),
                workflowStep("noExternalRequestEchoed",
                        !sourceNodeV305.externalRequestSent() && !boundary.externalRequestSent()),
                workflowStep("noWriteOrMigrationEchoed",
                        !sourceNodeV305.approvalLedgerWritten()
                                && !sourceNodeV305.schemaMigrationExecuted()
                                && !boundary.approvalLedgerWritten()
                                && !boundary.sqlExecuted()
                                && !boundary.schemaMigrationExecuted()),
                workflowStep("noMiniKvWriteOrAuthorityEchoed",
                        !boundary.miniKvWriteOrAuthorityCommandExecuted()),
                workflowStep("noAutoStartBoundaryEchoed",
                        !sourceNodeV305.automaticUpstreamStart()
                                && !boundary.automaticUpstreamStart()
                                && !boundary.javaStartedNodeMiniKvOrHarness())
        );
    }

    private static String verificationDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt source
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("nodeVersion", "Node v305"),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV304DecisionDigest",
                        source.decisionRecord().decisionDigest()),
                ReleaseApprovalDigestSupport.line("upstreamEchoAligned",
                        source.readyForNodeV305StopPrerequisiteUpstreamEchoVerification())
        ));
    }

    private static String artifactDigest(
            RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305,
            RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof,
            List<RehearsalApprovalPrerequisiteArtifactRequiredField> requiredFields,
            List<RehearsalApprovalPrerequisiteArtifactProhibitedField> prohibitedFields,
            List<RehearsalApprovalPrerequisiteArtifactRejectionReason> rejectionReasons,
            List<RehearsalApprovalPrerequisiteArtifactNoGoBoundary> noGoBoundaries,
            List<RehearsalApprovalPrerequisiteArtifactUpstreamEchoRequest> upstreamEchoRequests
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("profileVersion", OpsEvidenceService
                        .NODE_V306_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_PLAN_PROFILE),
                ReleaseApprovalDigestSupport.line("nodeV305Digest", sourceNodeV305.verificationDigest()),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("requiredFields", requiredFields),
                ReleaseApprovalDigestSupport.line("prohibitedFields", prohibitedFields),
                ReleaseApprovalDigestSupport.line("rejectionReasons", rejectionReasons),
                ReleaseApprovalDigestSupport.line("noGoBoundaries", noGoBoundaries),
                ReleaseApprovalDigestSupport.line("upstreamEchoRequests", upstreamEchoRequests)
        ));
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoReceipt source,
            RehearsalApprovalPrerequisiteArtifactSourceNodeV305Echo sourceNodeV305,
            RehearsalApprovalPrerequisiteArtifactIntakePlan artifactIntakePlan,
            RehearsalApprovalPrerequisiteArtifactIntakeNecessityProof necessityProof,
            RehearsalApprovalPrerequisiteArtifactIntakeChecks checks,
            RehearsalApprovalPrerequisiteArtifactIntakeSideEffectBoundary boundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_PREREQUISITE_ARTIFACT_INTAKE_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceReceiptVersion", source.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceReceiptDigest", source.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV305", sourceNodeV305),
                ReleaseApprovalDigestSupport.line("artifactIntakePlan", artifactIntakePlan),
                ReleaseApprovalDigestSupport.line("necessityProof", necessityProof),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", boundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV305Echoed", "NODE_V305_SOURCE_NOT_READY"),
                readiness.warningIfMissing("artifactContractEchoed", "ARTIFACT_CONTRACT_NOT_ECHOED"),
                readiness.warningIfMissing("requiredFieldsEchoed", "REQUIRED_ARTIFACT_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("prohibitedFieldsEchoed", "PROHIBITED_ARTIFACT_FIELDS_NOT_ECHOED"),
                readiness.warningIfMissing("rejectionReasonsEchoed", "REJECTION_REASONS_NOT_ECHOED"),
                readiness.warningIfMissing("noGoBoundariesEchoed", "NO_GO_BOUNDARIES_NOT_CLOSED"),
                readiness.warningIfMissing("upstreamEchoRequestsEchoed", "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT"),
                readiness.warningIfMissing("noMiniKvWriteOrAuthorityEchoed",
                        "MINIKV_WRITE_OR_AUTHORITY_BOUNDARY_OPEN")
        );
    }
}
