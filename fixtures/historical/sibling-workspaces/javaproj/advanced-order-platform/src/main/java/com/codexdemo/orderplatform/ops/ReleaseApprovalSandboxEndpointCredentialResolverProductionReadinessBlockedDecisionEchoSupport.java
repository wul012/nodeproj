package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoRecords
        .RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport {

    static final String DECISION_ECHO_MODE =
            "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt-only";
    static final String SOURCE_SPAN =
            "Node v268 credential resolver production readiness blocked decision gate";
    static final String NODE_V268_DECISION_MODE = "node-v268-production-readiness-decision-gate-only";
    static final String NODE_V268_DECISION_SOURCE_SPAN = "Node v267";
    static final String BLOCKED_DECISION = "blocked";
    static final int CHECK_COUNT = 25;
    static final int PASSED_CHECK_COUNT = 15;
    static final int SOURCE_CHECK_COUNT = 18;
    static final int SOURCE_PASSED_CHECK_COUNT = 18;
    static final int ARCHIVE_FILE_COUNT = 9;
    static final int EVIDENCE_FILE_COUNT = 7;
    static final int REQUIRED_SNIPPET_COUNT = 24;
    static final int MATCHED_SNIPPET_COUNT = 32;
    static final int MISSING_REQUIREMENT_COUNT = 10;
    static final int PRODUCTION_BLOCKER_COUNT = 10;
    static final int WARNING_COUNT = 2;
    static final int RECOMMENDATION_COUNT = 2;

    private static final List<String> MISSING_REQUIREMENT_CODES = List.of(
            "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
            "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
            "ENDPOINT_HANDLE_BOUNDARY_MISSING",
            "SECRET_PROVIDER_STUB_MISSING",
            "OPERATOR_APPROVAL_BOUNDARY_MISSING",
            "ROLLBACK_BOUNDARY_MISSING",
            "REDACTION_POLICY_MISSING",
            "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
            "SCHEMA_MIGRATION_POLICY_MISSING",
            "AUDIT_LEDGER_WRITE_POLICY_MISSING"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport() {
    }

    static List<String> missingRequirementCodes() {
        return MISSING_REQUIREMENT_CODES;
    }

    static RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho sourceNodeV268(
            boolean sourceAccepted
    ) {
        return new RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho(
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_VERSION,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE,
                OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_STATE,
                BLOCKED_DECISION,
                NODE_V268_DECISION_MODE,
                NODE_V268_DECISION_SOURCE_SPAN,
                sourceAccepted,
                true,
                sourceAccepted,
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
                CHECK_COUNT,
                PASSED_CHECK_COUNT,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                ARCHIVE_FILE_COUNT,
                EVIDENCE_FILE_COUNT,
                REQUIRED_SNIPPET_COUNT,
                MATCHED_SNIPPET_COUNT,
                MISSING_REQUIREMENT_COUNT,
                PRODUCTION_BLOCKER_COUNT,
                WARNING_COUNT,
                RECOMMENDATION_COUNT,
                sourceAccepted,
                sourceAccepted
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements preImplementationRequirements() {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements(
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

    static RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision productionReadinessDecision(
            String decisionDigest
    ) {
        return new RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision(
                decisionDigest,
                NODE_V268_DECISION_MODE,
                NODE_V268_DECISION_SOURCE_SPAN,
                BLOCKED_DECISION,
                "Node v267 aligns the fake-shell archive echo chain, but the real resolver pre-implementation plan is still missing required boundaries.",
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
                true
        );
    }

    static RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks decisionChecks(
            RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho source,
            RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements requirements
    ) {
        return new RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks(
                true,
                source.sourceNodeV267Ready(),
                source.sourceNodeV267BlocksRealResolver(),
                source.archiveEchoChainReady(),
                !source.readsManagedAuditCredential()
                        && !source.storesManagedAuditCredential()
                        && !source.credentialValueRead(),
                !source.rawEndpointUrlParsed(),
                !source.secretProviderInstantiated()
                        && !source.resolverClientInstantiated()
                        && !source.realResolverImplementationAllowed(),
                !source.connectsManagedAudit()
                        && !source.externalRequestSent()
                        && !source.readyForManagedAuditSandboxAdapterConnection(),
                !source.executionAllowed()
                        && !source.schemaMigrationExecuted(),
                !source.automaticUpstreamStart(),
                true,
                true,
                requirements.planDocumentPresent(),
                requirements.credentialHandleBoundaryDefined(),
                requirements.endpointHandleBoundaryDefined(),
                requirements.secretProviderStubDefined(),
                requirements.operatorApprovalBoundaryDefined(),
                requirements.rollbackBoundaryDefined(),
                requirements.redactionPolicyDefined(),
                requirements.externalRequestSimulationDefined(),
                requirements.schemaMigrationPolicyDefined(),
                requirements.auditLedgerWritePolicyDefined(),
                true,
                true,
                true
        );
    }

    static RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary(
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
                false
        );
    }

    static boolean sourceReady(
            RehearsalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionSourceEcho source
    ) {
        return OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_STATE
                .equals(source.decisionGateState())
                && BLOCKED_DECISION.equals(source.readinessDecision())
                && NODE_V268_DECISION_MODE.equals(source.decisionMode())
                && NODE_V268_DECISION_SOURCE_SPAN.equals(source.sourceSpan())
                && source.sourceNodeV267Ready()
                && source.sourceNodeV267BlocksRealResolver()
                && source.archiveEchoChainReady()
                && source.decisionGateEvaluated()
                && source.productionReadinessGateOnly()
                && source.readOnlyDecisionGate()
                && !source.readyForCredentialResolverPreImplementationPlan()
                && !source.readyForManagedAuditSandboxAdapterConnection()
                && !source.readyForProductionAudit()
                && !source.readyForProductionWindow()
                && !source.realResolverImplementationAllowed()
                && !source.executionAllowed()
                && !source.connectsManagedAudit()
                && !source.readsManagedAuditCredential()
                && !source.storesManagedAuditCredential()
                && !source.credentialValueRead()
                && !source.rawEndpointUrlParsed()
                && !source.externalRequestSent()
                && !source.secretProviderInstantiated()
                && !source.resolverClientInstantiated()
                && !source.schemaMigrationExecuted()
                && !source.automaticUpstreamStart()
                && source.checkCount() == CHECK_COUNT
                && source.passedCheckCount() == PASSED_CHECK_COUNT
                && source.sourceCheckCount() == SOURCE_CHECK_COUNT
                && source.sourcePassedCheckCount() == SOURCE_PASSED_CHECK_COUNT
                && source.archiveFileCount() == ARCHIVE_FILE_COUNT
                && source.evidenceFileCount() == EVIDENCE_FILE_COUNT
                && source.requiredSnippetCount() == REQUIRED_SNIPPET_COUNT
                && source.matchedSnippetCount() == MATCHED_SNIPPET_COUNT
                && source.missingPreImplementationRequirementCount() == MISSING_REQUIREMENT_COUNT
                && source.productionBlockerCount() == PRODUCTION_BLOCKER_COUNT
                && source.warningCount() == WARNING_COUNT
                && source.recommendationCount() == RECOMMENDATION_COUNT
                && source.readyForJavaV111EchoReceipt()
                && source.readyForMiniKvV118NonParticipationReceipt();
    }

    static boolean requirementsMissing(
            RehearsalSandboxEndpointCredentialResolverPreImplementationRequirements requirements
    ) {
        return !requirements.planDocumentPresent()
                && !requirements.credentialHandleBoundaryDefined()
                && !requirements.endpointHandleBoundaryDefined()
                && !requirements.secretProviderStubDefined()
                && !requirements.operatorApprovalBoundaryDefined()
                && !requirements.rollbackBoundaryDefined()
                && !requirements.redactionPolicyDefined()
                && !requirements.externalRequestSimulationDefined()
                && !requirements.schemaMigrationPolicyDefined()
                && !requirements.auditLedgerWritePolicyDefined();
    }

    static boolean decisionBlocked(
            RehearsalSandboxEndpointCredentialResolverProductionReadinessDecision decision
    ) {
        return BLOCKED_DECISION.equals(decision.decision())
                && NODE_V268_DECISION_MODE.equals(decision.decisionMode())
                && NODE_V268_DECISION_SOURCE_SPAN.equals(decision.sourceSpan())
                && !decision.allowsRealResolverPreImplementationPlan()
                && !decision.allowsRealCredentialResolverImplementation()
                && !decision.allowsSecretProviderStub()
                && !decision.allowsSecretProviderRuntime()
                && !decision.allowsCredentialValueRead()
                && !decision.allowsRawEndpointUrlParse()
                && !decision.allowsExternalRequest()
                && !decision.allowsManagedAuditConnection()
                && !decision.allowsSchemaMigration()
                && !decision.allowsApprovalLedgerWrite()
                && !decision.allowsAutomaticUpstreamStart()
                && decision.nextPlanRequiredBeforeImplementation()
                && decision.decisionDigest().startsWith("sha256:");
    }

    static boolean decisionChecksClosed(
            RehearsalSandboxEndpointCredentialResolverProductionReadinessDecisionChecks checks
    ) {
        return checks.decisionGateEvaluated()
                && checks.sourceNodeV267Ready()
                && checks.sourceNodeV267BlocksRealResolver()
                && checks.archiveEchoChainReady()
                && checks.credentialBoundaryStillClosed()
                && checks.rawEndpointBoundaryStillClosed()
                && checks.resolverBoundaryStillClosed()
                && checks.connectionBoundaryStillClosed()
                && checks.writeBoundaryStillClosed()
                && checks.autoStartBoundaryStillClosed()
                && checks.upstreamProbesStillDisabled()
                && checks.upstreamActionsStillDisabled()
                && !checks.preImplementationPlanPresent()
                && !checks.credentialHandleBoundaryDefined()
                && !checks.endpointHandleBoundaryDefined()
                && !checks.secretProviderStubDefined()
                && !checks.operatorApprovalBoundaryDefined()
                && !checks.rollbackBoundaryDefined()
                && !checks.redactionPolicyDefined()
                && !checks.externalRequestSimulationDefined()
                && !checks.schemaMigrationPolicyDefined()
                && !checks.auditLedgerWritePolicyDefined()
                && checks.productionAuditStillBlocked()
                && checks.productionWindowStillBlocked()
                && checks.realResolverImplementationStillBlocked();
    }

    static boolean sideEffectBoundaryBlocked(
            RehearsalSandboxEndpointCredentialResolverProductionReadinessSideEffectBoundary boundary
    ) {
        return boundary.readOnlyDecisionGate()
                && boundary.productionReadinessGateOnly()
                && boundary.decisionGateEvaluated()
                && !boundary.readyForCredentialResolverPreImplementationPlan()
                && !boundary.readyForManagedAuditSandboxAdapterConnection()
                && !boundary.readyForProductionAudit()
                && !boundary.readyForProductionWindow()
                && !boundary.readyForProductionOperations()
                && !boundary.realResolverImplementationAllowed()
                && !boundary.executionAllowed()
                && !boundary.connectsManagedAudit()
                && !boundary.readsManagedAuditCredential()
                && !boundary.storesManagedAuditCredential()
                && !boundary.credentialValueRead()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.rawEndpointUrlIncluded()
                && !boundary.externalRequestSent()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.approvalLedgerWritten()
                && !boundary.managedAuditStoreWritten()
                && !boundary.sqlExecuted()
                && !boundary.schemaMigrationExecuted()
                && !boundary.automaticUpstreamStart()
                && !boundary.javaStartedNodeOrMiniKv();
    }
}
