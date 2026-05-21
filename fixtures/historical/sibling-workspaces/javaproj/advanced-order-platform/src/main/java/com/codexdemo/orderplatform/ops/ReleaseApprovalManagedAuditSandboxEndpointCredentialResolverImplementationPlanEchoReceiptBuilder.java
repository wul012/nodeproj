package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationPlanReviewEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptBuilder {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverImplementationPlanEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverImplementationPlanSourceState",
                    "sandboxEndpointCredentialResolverImplementationPlanBoundaryCount",
                    "sandboxEndpointCredentialResolverImplementationPlanRequiredArtifactCount",
                    "sandboxEndpointCredentialResolverImplementationPlanProhibitedActionCount",
                    "sandboxEndpointCredentialResolverImplementationPlanJavaRequirementCount",
                    "sandboxEndpointCredentialResolverImplementationPlanMiniKvRequirementCount",
                    "sandboxEndpointCredentialResolverImplementationPlanCredentialValueRead",
                    "sandboxEndpointCredentialResolverImplementationPlanRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverImplementationPlanExternalRequestSent",
                    "sandboxEndpointCredentialResolverImplementationPlanSecretProviderInstantiated",
                    "sandboxEndpointCredentialResolverImplementationPlanResolverClientInstantiated",
                    "sandboxEndpointCredentialResolverImplementationPlanConnectsManagedAudit",
                    "sandboxEndpointCredentialResolverImplementationPlanApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverImplementationPlanSqlExecuted",
                    "sandboxEndpointCredentialResolverImplementationPlanSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverImplementationPlanAutomaticUpstreamStart"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sourceNodeV283.planState=credential-resolver-implementation-plan-draft-ready",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.interfaceBoundaries.size=7",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.javaV121EchoRequirements.size=4",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.miniKvV126ReceiptRequirements.size=4",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.readyForManagedAuditResolverImplementation=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.consumedByNodeCredentialResolverImplementationPlanDraftProfile with Node v283",
            "Verify managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.interfaceBoundaries.size=7 before Node v284",
            "Verify managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.javaV121EchoRequirements.size=4 before Node v284",
            "Verify managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.miniKvV126ReceiptRequirements.size=4 before Node v284",
            "Keep managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "Keep managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "Keep managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "Require managedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt.readyForNodeV284CredentialResolverImplementationPlanEchoVerification=true before Node v284"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "IMPLEMENTATION_STILL_BLOCKED",
            "UPSTREAM_ECHO_REQUIRED"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "RUN_PARALLEL_JAVA_V121_MINIKV_V126",
            "VERIFY_WITH_NODE_V284_BEFORE_FAKE_HARNESS"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v126 resolver implementation plan non-participation receipt",
            "Node v284 resolver implementation plan upstream echo verification"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    sourceReceipt
    ) {
        List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries =
                interfaceBoundaries();
        List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                javaV121EchoRequirements = javaV121EchoRequirements();
        List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                miniKvV126ReceiptRequirements = miniKvV126ReceiptRequirements();
        RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283 =
                sourceNodeV283(interfaceBoundaries, javaV121EchoRequirements, miniKvV126ReceiptRequirements);
        RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks checks =
                checks(sourceReceipt, sourceNodeV283, interfaceBoundaries, javaV121EchoRequirements,
                        miniKvV126ReceiptRequirements);
        RehearsalSandboxEndpointCredentialResolverImplementationPlanReviewEcho implementationPlanReview =
                implementationPlanReview(sourceNodeV283, interfaceBoundaries, javaV121EchoRequirements,
                        miniKvV126ReceiptRequirements, checks);
        RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoWorkflowReadiness readiness = readiness(
                sourceNodeV283,
                interfaceBoundaries,
                javaV121EchoRequirements,
                miniKvV126ReceiptRequirements,
                sideEffectBoundary
        );
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(
                sourceReceipt,
                sourceNodeV283,
                implementationPlanReview,
                interfaceBoundaries,
                javaV121EchoRequirements,
                miniKvV126ReceiptRequirements,
                checks,
                sideEffectBoundary,
                readiness
        );

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_APPROVAL_REQUIRED_IMPLEMENTATION_READINESS_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_VERSION,
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_PROFILE,
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_ENDPOINT,
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_STATE,
                "java-v121-credential-resolver-implementation-plan-echo-only",
                "Node v283",
                sourceNodeV283,
                implementationPlanReview,
                interfaceBoundaries,
                javaV121EchoRequirements,
                miniKvV126ReceiptRequirements,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceNodeV283Echoed"),
                readiness.ready("interfaceBoundariesEchoed"),
                readiness.ready("javaV121EchoRequirementsEchoed"),
                readiness.ready("miniKvV126ReceiptRequirementsEchoed"),
                readiness.ready("noCredentialBoundaryEchoed"),
                readiness.ready("noRawEndpointBoundaryEchoed"),
                readiness.ready("noManagedAuditConnectionEchoed"),
                readiness.ready("noSqlOrLedgerWriteEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                true,
                readiness.allReady(),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanEcho(),
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                interfaceBoundaryCodes(interfaceBoundaries),
                requiredArtifactIds(interfaceBoundaries),
                prohibitedActions(interfaceBoundaries),
                javaRequirementIds(javaV121EchoRequirements),
                miniKvRequirementIds(miniKvV126ReceiptRequirements),
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                receiptWarnings,
                NODE_VERIFICATION_ACTIONS
        );
    }

    List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt receipt
    ) {
        return boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanSourceState",
                        receipt.sourceNodeV283().planState()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanBoundaryCount",
                        receipt.interfaceBoundaries().size()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanRequiredArtifactCount",
                        receipt.requiredArtifactIds().size()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanProhibitedActionCount",
                        receipt.prohibitedActions().size()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanJavaRequirementCount",
                        receipt.javaV121EchoRequirements().size()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanMiniKvRequirementCount",
                        receipt.miniKvV126ReceiptRequirements().size()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanExternalRequestSent",
                        receipt.sideEffectBoundary().externalRequestSent()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanSecretProviderInstantiated",
                        receipt.sideEffectBoundary().secretProviderInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanResolverClientInstantiated",
                        receipt.sideEffectBoundary().resolverClientInstantiated()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverImplementationPlanAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart())
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt receipt
    ) {
        return receipt.readyForNodeV284CredentialResolverImplementationPlanEchoVerification()
                && receipt.readyForJavaV121MiniKvV126Echo()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !receipt.readyForTestOnlyFakeHarnessPrecheck()
                && !receipt.sideEffectBoundary().realResolverImplementationAllowed()
                && !receipt.sideEffectBoundary().testOnlyFakeHarnessAllowed()
                && !receipt.sideEffectBoundary().executionAllowed()
                && !receipt.sideEffectBoundary().connectsManagedAudit()
                && !receipt.sideEffectBoundary().readsManagedAuditCredential()
                && !receipt.sideEffectBoundary().storesManagedAuditCredential()
                && !receipt.sideEffectBoundary().credentialValueRead()
                && !receipt.sideEffectBoundary().rawEndpointUrlParsed()
                && !receipt.sideEffectBoundary().rawEndpointUrlRendered()
                && !receipt.sideEffectBoundary().externalRequestSent()
                && !receipt.sideEffectBoundary().secretProviderInstantiated()
                && !receipt.sideEffectBoundary().resolverClientInstantiated()
                && !receipt.sideEffectBoundary().approvalLedgerWritten()
                && !receipt.sideEffectBoundary().managedAuditStoreWritten()
                && !receipt.sideEffectBoundary().sqlExecuted()
                && !receipt.sideEffectBoundary().schemaMigrationExecuted()
                && !receipt.sideEffectBoundary().rollbackExecuted()
                && !receipt.sideEffectBoundary().automaticUpstreamStart()
                && !receipt.sideEffectBoundary().javaStartedNodeOrMiniKv();
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283(
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    javaV121EchoRequirements,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    miniKvV126ReceiptRequirements
    ) {
        return new RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283(
                "Node v283",
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_PROFILE,
                OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_STATE,
                "node-v283-credential-resolver-implementation-plan-draft.v1",
                "implementation-plan-draft-only",
                "Node v282",
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
                28,
                28,
                23,
                23,
                interfaceBoundaries.size(),
                requiredArtifactIds(interfaceBoundaries).size(),
                prohibitedActions(interfaceBoundaries).size(),
                javaV121EchoRequirements.size(),
                miniKvV126ReceiptRequirements.size()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationPlanReviewEcho implementationPlanReview(
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283,
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    javaV121EchoRequirements,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    miniKvV126ReceiptRequirements,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks checks
    ) {
        return new RehearsalSandboxEndpointCredentialResolverImplementationPlanReviewEcho(
                "node-v283-implementation-plan-draft-only",
                "Node v283",
                "Java v121",
                "mini-kv v126",
                "Node v284",
                "Node v285",
                interfaceBoundaries.size(),
                requiredArtifactIds(interfaceBoundaries).size(),
                prohibitedActions(interfaceBoundaries).size(),
                javaV121EchoRequirements.size(),
                miniKvV126ReceiptRequirements.size(),
                sourceNodeV283.readyForJavaV121MiniKvV126Echo(),
                !sourceNodeV283.realResolverImplementationAllowed(),
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverImplementationPlanEcho()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks checks(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    sourceReceipt,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283,
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    javaV121EchoRequirements,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    miniKvV126ReceiptRequirements
    ) {
        boolean sourceReady =
                sourceReceipt.readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification()
                        && sourceNodeV283.readyForJavaV121MiniKvV126Echo()
                        && OpsEvidenceService.NODE_V283_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_DRAFT_STATE
                                .equals(sourceNodeV283.planState());
        boolean sourceBlocked = !sourceNodeV283.readyForManagedAuditResolverImplementation()
                && !sourceNodeV283.realResolverImplementationAllowed()
                && !sourceNodeV283.executionAllowed();
        boolean allBoundariesDefined = interfaceBoundaries.size() == 7
                && interfaceBoundaries.stream()
                        .allMatch(boundary -> "drafted-for-upstream-echo".equals(boundary.status()));
        boolean allArtifactsNamed = interfaceBoundaries.stream()
                .allMatch(boundary -> !boundary.requiredArtifacts().isEmpty());
        boolean javaRequirementsDefined = javaV121EchoRequirements.size() == 4
                && javaV121EchoRequirements.stream()
                        .allMatch(RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement
                                ::mustRemainReadOnly);
        boolean miniKvRequirementsDefined = miniKvV126ReceiptRequirements.size() == 4
                && miniKvV126ReceiptRequirements.stream()
                        .allMatch(RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement
                                ::mustRemainReadOnly);
        return new RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks(
                sourceReady,
                sourceBlocked,
                allBoundariesDefined,
                allArtifactsNamed,
                javaRequirementsDefined,
                miniKvRequirementsDefined,
                !sourceNodeV283.realResolverImplementationAllowed(),
                !sourceNodeV283.testOnlyFakeHarnessAllowed(),
                !sourceNodeV283.credentialValueRead(),
                !sourceNodeV283.rawEndpointUrlParsed() && !sourceNodeV283.rawEndpointUrlRendered(),
                !sourceNodeV283.externalRequestSent(),
                !sourceNodeV283.secretProviderInstantiated(),
                !sourceNodeV283.resolverClientInstantiated(),
                !sourceNodeV283.schemaMigrationExecuted(),
                !sourceNodeV283.approvalLedgerWritten(),
                true,
                true,
                sourceReady && sourceBlocked && allBoundariesDefined && allArtifactsNamed
                        && javaRequirementsDefined && miniKvRequirementsDefined
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary
    sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary(
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
                false
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283,
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    javaV121EchoRequirements,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    miniKvV126ReceiptRequirements,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary sideEffectBoundary
    ) {
        return workflowReadiness(
                workflowStep("sourceNodeV283Echoed",
                        sourceNodeV283.readyForJavaV121MiniKvV126Echo()),
                workflowStep("interfaceBoundariesEchoed", interfaceBoundaries.size() == 7),
                workflowStep("javaV121EchoRequirementsEchoed", javaV121EchoRequirements.size() == 4),
                workflowStep("miniKvV126ReceiptRequirementsEchoed", miniKvV126ReceiptRequirements.size() == 4),
                workflowStep("noCredentialBoundaryEchoed", !sideEffectBoundary.credentialValueRead()),
                workflowStep("noRawEndpointBoundaryEchoed", !sideEffectBoundary.rawEndpointUrlParsed()
                        && !sideEffectBoundary.rawEndpointUrlRendered()),
                workflowStep("noManagedAuditConnectionEchoed", !sideEffectBoundary.connectsManagedAudit()),
                workflowStep("noSqlOrLedgerWriteEchoed", !sideEffectBoundary.sqlExecuted()
                        && !sideEffectBoundary.approvalLedgerWritten()),
                workflowStep("noAutoStartBoundaryEchoed", !sideEffectBoundary.automaticUpstreamStart())
        );
    }

    private static List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho>
    interfaceBoundaries() {
        return List.of(
                boundary(
                        "CONFIG_HANDLE_CONTRACT",
                        "PLAN_DOCUMENT",
                        "Config handle contract",
                        "node",
                        List.of("ORDEROPS_MANAGED_AUDIT_RESOLVER_CONFIG_HANDLE",
                                "ORDEROPS_MANAGED_AUDIT_RESOLVER_POLICY_HANDLE"),
                        List.of("configHandle", "policyHandle", "reviewStatus"),
                        List.of("read-secret-env-value", "render-secret-env-value", "instantiate-runtime-client"),
                        List.of("config-handle-review-id", "resolver-policy-handle-review-id",
                                "config-redaction-contract"),
                        "Only named handles may appear in profile output; no raw config values or external client objects are created."
                ),
                boundary(
                        "CREDENTIAL_HANDLE_CONTRACT",
                        "CREDENTIAL_HANDLE",
                        "Credential handle contract",
                        "security",
                        List.of("credentialHandle", "credentialReviewStatus"),
                        List.of("credentialHandle", "credentialReviewStatus", "credentialValuePresent=false"),
                        List.of("read-credential-value", "store-credential-value", "render-credential-value"),
                        List.of("credential-handle-review-id", "credential-value-redaction-contract",
                                "operator-visible-secret-value-prohibition"),
                        "Profiles may reference credential handles only; credential values stay outside Node, Java, and mini-kv."
                ),
                boundary(
                        "ENDPOINT_HANDLE_CONTRACT",
                        "ENDPOINT_HANDLE",
                        "Endpoint handle contract",
                        "security",
                        List.of("endpointHandle", "allowlistReviewStatus"),
                        List.of("endpointHandle", "allowlistReviewStatus", "rawEndpointUrlPresent=false"),
                        List.of("parse-raw-endpoint-url", "render-raw-endpoint-url", "dial-managed-audit-endpoint"),
                        List.of("endpoint-handle-review-id", "allowlist-review-status",
                                "raw-endpoint-redaction-contract"),
                        "Endpoint evidence may name handles and review status only; raw URLs stay out of logs, digests, and Markdown."
                ),
                boundary(
                        "APPROVAL_ARTIFACT_CONTRACT",
                        "OPERATOR_APPROVAL",
                        "Approval artifact contract",
                        "operator",
                        List.of("operatorIdentityBinding", "approvalCorrelationId", "manualWindowMarker"),
                        List.of("approvalArtifactDigest", "approvalState", "manualWindowStatus"),
                        List.of("auto-approve-operation", "execute-without-operator-marker",
                                "write-approval-ledger"),
                        List.of("operator-identity-binding", "approval-correlation-marker",
                                "manual-window-open-marker"),
                        "A later fake harness may only read approval artifacts; real ledger writes stay blocked until a separate write gate."
                ),
                boundary(
                        "FAILURE_TAXONOMY_CONTRACT",
                        "EXTERNAL_REQUEST_SIMULATION",
                        "Failure taxonomy contract",
                        "node",
                        List.of("simulatedFailureClass", "dryRunAdapterResult", "blockedReason"),
                        List.of("failureClass", "operatorVisibleReason", "retryDisposition"),
                        List.of("send-external-request", "connect-managed-audit", "mask-unclassified-error"),
                        List.of("failure-taxonomy-id", "operator-visible-failure-map",
                                "retry-policy-review-id"),
                        "Future fake harness errors must be classified without contacting managed audit or exposing secret/endpoint material."
                ),
                boundary(
                        "ROLLBACK_GUARD_CONTRACT",
                        "ROLLBACK_BOUNDARY",
                        "Rollback guard contract",
                        "release-manager",
                        List.of("rollbackAbortMarker", "restorePointReviewId",
                                "manualRollbackRunbookReference"),
                        List.of("rollbackGuardState", "abortRequired=true", "executionAllowed=false"),
                        List.of("execute-rollback", "deploy-resolver-without-abort-marker",
                                "auto-start-upstream"),
                        List.of("rollback-abort-marker", "restore-point-review-id",
                                "manual-rollback-runbook-reference"),
                        "Resolver implementation remains blocked unless rollback guard evidence exists; this plan executes no rollback."
                ),
                boundary(
                        "TEST_ONLY_FAKE_HARNESS_CONTRACT",
                        "DISABLED_SECRET_PROVIDER_STUB",
                        "Test-only fake harness contract",
                        "node",
                        List.of("fakeCredentialHandle", "fakeEndpointHandle", "testOnlyHarnessToggle=false"),
                        List.of("fakeHarnessPlan", "sideEffectBoundary", "runtimeToggleState"),
                        List.of("instantiate-real-secret-provider", "resolve-real-credential",
                                "send-real-http-request"),
                        List.of("test-only-fake-harness-plan-id", "fake-harness-disabled-toggle",
                                "fake-harness-side-effect-contract"),
                        "Node v285 may define a disabled fake harness precheck only after Java v121, mini-kv v126, and Node v284 align."
                )
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho boundary(
            String code,
            String sourceBoundary,
            String title,
            String owner,
            List<String> allowedInputs,
            List<String> allowedOutputs,
            List<String> prohibitedActions,
            List<String> requiredArtifacts,
            String verificationRule
    ) {
        return new RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho(
                code,
                sourceBoundary,
                title,
                owner,
                "drafted-for-upstream-echo",
                allowedInputs,
                allowedOutputs,
                prohibitedActions,
                requiredArtifacts,
                verificationRule
        );
    }

    private static List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
    javaV121EchoRequirements() {
        return List.of(
                javaRequirement("java-v121-consumes-node-v283-plan",
                        "Java v121 must identify Node v283 planDigest and planVersion without deriving credential values."),
                javaRequirement("java-v121-approval-artifact-boundary",
                        "Java v121 must describe required operator approval and ledger policy artifacts without writing approval ledger state."),
                javaRequirement("java-v121-schema-migration-boundary",
                        "Java v121 must keep schema migration review-only and prove no SQL execution."),
                javaRequirement("java-v121-failure-taxonomy-echo",
                        "Java v121 must echo failure taxonomy expectations for future Node v284 verification.")
        );
    }

    private static List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
    miniKvV126ReceiptRequirements() {
        return List.of(
                miniKvRequirement("mini-kv-v126-consumes-node-v283-plan",
                        "mini-kv v126 must identify Node v283 planDigest and remain non-participating."),
                miniKvRequirement("mini-kv-v126-no-storage-backend",
                        "mini-kv v126 must prove it is not a managed audit storage backend and not authoritative for audit/order state."),
                miniKvRequirement("mini-kv-v126-no-secret-or-endpoint",
                        "mini-kv v126 must prove no credential resolver, no secret provider, and no raw endpoint parser."),
                miniKvRequirement("mini-kv-v126-no-write-command",
                        "mini-kv v126 must keep write/admin commands out of this plan echo receipt.")
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement javaRequirement(
            String id,
            String requirement
    ) {
        return upstreamRequirement(id, "java", "Java v121", requirement);
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement miniKvRequirement(
            String id,
            String requirement
    ) {
        return upstreamRequirement(id, "mini-kv", "mini-kv v126", requirement);
    }

    private static RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement upstreamRequirement(
            String id,
            String project,
            String expectedVersion,
            String requirement
    ) {
        return new RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement(
                id,
                project,
                expectedVersion,
                requirement,
                true,
                true,
                true,
                true,
                true
        );
    }

    private static List<String> interfaceBoundaryCodes(
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries
    ) {
        return interfaceBoundaries.stream()
                .map(RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho::code)
                .toList();
    }

    private static List<String> requiredArtifactIds(
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries
    ) {
        return interfaceBoundaries.stream()
                .flatMap(boundary -> boundary.requiredArtifacts().stream())
                .distinct()
                .toList();
    }

    private static List<String> prohibitedActions(
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries
    ) {
        return interfaceBoundaries.stream()
                .flatMap(boundary -> boundary.prohibitedActions().stream())
                .distinct()
                .toList();
    }

    private static List<String> javaRequirementIds(
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement> requirements
    ) {
        return requirements.stream()
                .map(RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement::id)
                .toList();
    }

    private static List<String> miniKvRequirementIds(
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement> requirements
    ) {
        return javaRequirementIds(requirements);
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt
                    sourceReceipt,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSourceNodeV283 sourceNodeV283,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanReviewEcho implementationPlanReview,
            List<RehearsalSandboxEndpointCredentialResolverImplementationInterfaceBoundaryEcho> interfaceBoundaries,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    javaV121EchoRequirements,
            List<RehearsalSandboxEndpointCredentialResolverImplementationUpstreamEchoRequirement>
                    miniKvV126ReceiptRequirements,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanChecks checks,
            RehearsalSandboxEndpointCredentialResolverImplementationPlanSideEffectBoundary sideEffectBoundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceApprovalRequiredImplementationReadinessEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceApprovalRequiredImplementationReadinessEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceNodeV283", sourceNodeV283),
                ReleaseApprovalDigestSupport.line("implementationPlanReview", implementationPlanReview),
                ReleaseApprovalDigestSupport.line("interfaceBoundaries", interfaceBoundaries),
                ReleaseApprovalDigestSupport.line("javaV121EchoRequirements", javaV121EchoRequirements),
                ReleaseApprovalDigestSupport.line("miniKvV126ReceiptRequirements", miniKvV126ReceiptRequirements),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceNodeV283Echoed", "NODE_V283_IMPLEMENTATION_PLAN_NOT_READY"),
                readiness.warningIfMissing("interfaceBoundariesEchoed", "JAVA_V121_INTERFACE_BOUNDARIES_INCOMPLETE"),
                readiness.warningIfMissing("javaV121EchoRequirementsEchoed",
                        "JAVA_V121_ECHO_REQUIREMENTS_INCOMPLETE"),
                readiness.warningIfMissing("noSqlOrLedgerWriteEchoed", "JAVA_V121_WRITE_BOUNDARY_OPEN")
        );
    }
}
