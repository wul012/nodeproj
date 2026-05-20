package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPlanIntake;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlan;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoRecords
        .RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport {

    static final String PLAN_INTAKE_ECHO_MODE =
            "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt-only";
    static final String SOURCE_SPAN =
            "Node v270 credential resolver pre-implementation plan intake";
    static final String NODE_V270_PLAN_VERSION =
            "node-v270-credential-resolver-pre-implementation-plan-intake.v1";
    static final String NODE_V270_PLAN_MODE = "plan-intake-only";
    static final String NODE_V270_INTAKE_MODE = "node-v270-plan-intake-only";
    static final String NODE_V270_SOURCE_SPAN = "Node v269";
    static final String NODE_V269_SOURCE_SPAN = "Node v268 + Java v111 + mini-kv v118";
    static final String BOUNDARY_STATUS = "defined-for-review";
    static final int REQUIRED_BOUNDARY_COUNT = 10;
    static final int CHECK_COUNT = 26;
    static final int PASSED_CHECK_COUNT = 26;
    static final int SOURCE_CHECK_COUNT = 22;
    static final int SOURCE_PASSED_CHECK_COUNT = 22;
    static final int PROHIBITED_ACTION_COUNT = 23;
    static final int PRODUCTION_BLOCKER_COUNT = 0;
    static final int WARNING_COUNT = 2;
    static final int RECOMMENDATION_COUNT = 2;

    private static final List<String> BOUNDARY_CODES = List.of(
            "PLAN_DOCUMENT",
            "CREDENTIAL_HANDLE",
            "ENDPOINT_HANDLE",
            "DISABLED_SECRET_PROVIDER_STUB",
            "OPERATOR_APPROVAL",
            "ROLLBACK_BOUNDARY",
            "REDACTION_POLICY",
            "EXTERNAL_REQUEST_SIMULATION",
            "SCHEMA_MIGRATION_POLICY",
            "AUDIT_LEDGER_WRITE_POLICY"
    );

    private static final List<String> REQUIREMENT_CODES = List.of(
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

    private ReleaseApprovalSandboxEndpointCredentialResolverPreImplementationPlanIntakeEchoSupport() {
    }

    static List<String> boundaryCodes() {
        return BOUNDARY_CODES;
    }

    static List<String> requirementCodes() {
        return REQUIREMENT_CODES;
    }

    static RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource sourceNodeV269(
            boolean sourceAccepted,
            String verificationDigest
    ) {
        return new RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource(
                OpsEvidenceService
                        .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_STATE,
                sourceAccepted,
                verificationDigest,
                NODE_V269_SOURCE_SPAN,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                25,
                15,
                REQUIRED_BOUNDARY_COUNT,
                0,
                WARNING_COUNT,
                RECOMMENDATION_COUNT,
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

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho sourceNodeV270(
            boolean sourceAccepted,
            RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource sourceNodeV269,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary summary
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho(
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_VERSION,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_PROFILE,
                OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_STATE,
                SOURCE_SPAN,
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
                false,
                sourceNodeV269,
                summary
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlan preImplementationPlan(
            List<RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary> boundaries,
            String planDigest
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlan(
                NODE_V270_PLAN_VERSION,
                NODE_V270_PLAN_MODE,
                NODE_V270_SOURCE_SPAN,
                planDigest,
                boundaries.size(),
                (int) boundaries.stream()
                        .filter(boundary -> BOUNDARY_STATUS.equals(boundary.status()))
                        .count(),
                boundaries.size() == REQUIRED_BOUNDARY_COUNT
                        && boundaries.stream().allMatch(boundary -> BOUNDARY_STATUS.equals(boundary.status())),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                List.copyOf(boundaries)
        );
    }

    static List<RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary> preImplementationBoundaries() {
        return List.of(
                boundary(
                        "PLAN_DOCUMENT",
                        "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
                        "Pre-implementation plan document",
                        "release-manager",
                        "The resolver cannot move to implementation until this plan is echoed by Java v112, mini-kv v119, and verified by Node v272.",
                        List.of("implement-real-resolver", "open-managed-audit-connection"),
                        "Node v270 profile + v269 source digest"
                ),
                boundary(
                        "CREDENTIAL_HANDLE",
                        "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
                        "Credential handle boundary",
                        "security",
                        "Only credential handles and review status may be stored or rendered; credential values remain unavailable to Node, Java, and mini-kv.",
                        List.of("read-credential-value", "store-credential-value", "render-credential-value"),
                        "credentialValueRead=false and readsManagedAuditCredential=false"
                ),
                boundary(
                        "ENDPOINT_HANDLE",
                        "ENDPOINT_HANDLE_BOUNDARY_MISSING",
                        "Endpoint handle boundary",
                        "security",
                        "Only endpoint handles, allowlist review status, and policy names may be rendered; raw endpoint URLs stay out of profiles and logs.",
                        List.of("parse-raw-endpoint-url", "render-raw-endpoint-url"),
                        "rawEndpointUrlParsed=false"
                ),
                boundary(
                        "DISABLED_SECRET_PROVIDER_STUB",
                        "SECRET_PROVIDER_STUB_MISSING",
                        "Disabled secret-provider stub",
                        "node",
                        "Future code may define a disabled interface shell, but runtime secret-provider instantiation remains false until a separate approval gate exists.",
                        List.of("instantiate-secret-provider-runtime", "load-secret-value"),
                        "secretProviderInstantiated=false"
                ),
                boundary(
                        "OPERATOR_APPROVAL",
                        "OPERATOR_APPROVAL_BOUNDARY_MISSING",
                        "Operator approval boundary",
                        "operator",
                        "Any future resolver dry-run must bind operator identity, approval correlation, and explicit manual window marker before execution gates can be reviewed.",
                        List.of("auto-approve-operation", "execute-without-operator-marker"),
                        "executionAllowed=false and productionWindowStillBlocked=true"
                ),
                boundary(
                        "ROLLBACK_BOUNDARY",
                        "ROLLBACK_BOUNDARY_MISSING",
                        "Rollback boundary",
                        "release-manager",
                        "A rollback path and abort marker must exist before future resolver runtime code can be enabled; v270 does not execute rollback.",
                        List.of("execute-rollback", "deploy-resolver-without-abort-marker"),
                        "realResolverImplementationAllowed=false"
                ),
                boundary(
                        "REDACTION_POLICY",
                        "REDACTION_POLICY_MISSING",
                        "Redaction policy",
                        "security",
                        "All resolver evidence must keep secret and endpoint material redacted by construction; digest inputs may include handles but not raw values.",
                        List.of("log-secret-material", "log-raw-endpoint"),
                        "credentialValueRead=false and rawEndpointUrlParsed=false"
                ),
                boundary(
                        "EXTERNAL_REQUEST_SIMULATION",
                        "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
                        "External request simulation",
                        "node",
                        "Future resolver behavior must first use fake or dry-run request simulation; v270 sends no HTTP/TCP request to managed audit.",
                        List.of("send-external-request", "connect-managed-audit"),
                        "externalRequestSent=false and connectsManagedAudit=false"
                ),
                boundary(
                        "SCHEMA_MIGRATION_POLICY",
                        "SCHEMA_MIGRATION_POLICY_MISSING",
                        "Schema migration policy",
                        "release-manager",
                        "Schema migration remains review-only until a dedicated migration approval artifact exists; v270 cannot execute SQL.",
                        List.of("execute-schema-migration", "execute-sql"),
                        "schemaMigrationExecuted=false"
                ),
                boundary(
                        "AUDIT_LEDGER_WRITE_POLICY",
                        "AUDIT_LEDGER_WRITE_POLICY_MISSING",
                        "Audit ledger write policy",
                        "release-manager",
                        "Approval ledger writes require a later explicit write gate; v270 is plan intake only and writes no ledger.",
                        List.of("write-approval-ledger", "write-managed-audit-state"),
                        "approvalLedgerWritten=false and executionAllowed=false"
                )
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
            String intakeDigest
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPlanIntake(
                intakeDigest,
                NODE_V270_INTAKE_MODE,
                "Node v269",
                REQUIRED_BOUNDARY_COUNT,
                plan.definedBoundaryCount(),
                REQUIRED_BOUNDARY_COUNT - plan.definedBoundaryCount(),
                hasBoundary(plan, "PLAN_DOCUMENT"),
                hasBoundary(plan, "CREDENTIAL_HANDLE"),
                hasBoundary(plan, "ENDPOINT_HANDLE"),
                hasBoundary(plan, "DISABLED_SECRET_PROVIDER_STUB"),
                hasBoundary(plan, "OPERATOR_APPROVAL"),
                hasBoundary(plan, "ROLLBACK_BOUNDARY"),
                hasBoundary(plan, "REDACTION_POLICY"),
                hasBoundary(plan, "EXTERNAL_REQUEST_SIMULATION"),
                hasBoundary(plan, "SCHEMA_MIGRATION_POLICY"),
                hasBoundary(plan, "AUDIT_LEDGER_WRITE_POLICY"),
                "Java v112",
                "mini-kv v119",
                "Node v272"
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks(
            RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource sourceNodeV269,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
            RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks(
                sourceNodeV269Ready(sourceNodeV269),
                sourceNodeV269.blockedDecisionAligned()
                        && sourceNodeV269.missingRequirementBlockersAligned()
                        && sourceNodeV269.missingPreImplementationRequirementCount() == REQUIRED_BOUNDARY_COUNT,
                !sourceNodeV269.readyForCredentialResolverPreImplementationPlan()
                        && !sourceNodeV269.realResolverImplementationAllowed()
                        && !sourceNodeV269.connectsManagedAudit(),
                planIntake.planDocumentPresent(),
                planIntake.credentialHandleBoundaryDefined(),
                planIntake.endpointHandleBoundaryDefined(),
                planIntake.secretProviderStubDefined(),
                planIntake.operatorApprovalBoundaryDefined(),
                planIntake.rollbackBoundaryDefined(),
                planIntake.redactionPolicyDefined(),
                planIntake.externalRequestSimulationDefined(),
                planIntake.schemaMigrationPolicyDefined(),
                planIntake.auditLedgerWritePolicyDefined(),
                plan.boundaryCount() == REQUIRED_BOUNDARY_COUNT
                        && plan.definedBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                        && plan.allRequiredBoundariesDefined()
                        && planIntake.missingBoundaryCount() == 0,
                !plan.credentialValueReadAllowed()
                        && !sourceNodeV269.credentialValueRead()
                        && !sourceNodeV269.readsManagedAuditCredential()
                        && !sourceNodeV269.storesManagedAuditCredential(),
                !plan.rawEndpointUrlParseAllowed()
                        && !sourceNodeV269.rawEndpointUrlParsed(),
                !plan.secretProviderRuntimeAllowed()
                        && !sourceNodeV269.secretProviderInstantiated(),
                !plan.realResolverImplementationAllowed()
                        && !sourceNodeV269.resolverClientInstantiated(),
                !plan.externalRequestAllowed()
                        && !sourceNodeV269.externalRequestSent()
                        && !sourceNodeV269.connectsManagedAudit(),
                !plan.schemaMigrationAllowed()
                        && !sourceNodeV269.schemaMigrationExecuted(),
                !plan.approvalLedgerWriteAllowed(),
                true,
                true,
                true,
                true,
                false
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checksWithReadiness(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks
    ) {
        boolean ready = checks.sourceNodeV269Ready()
                && checks.sourceNodeV269KeepsBlockedDecision()
                && checks.sourceNodeV269KeepsRealResolverBlocked()
                && checks.planDocumentPresent()
                && checks.credentialHandleBoundaryDefined()
                && checks.endpointHandleBoundaryDefined()
                && checks.secretProviderStubDefined()
                && checks.operatorApprovalBoundaryDefined()
                && checks.rollbackBoundaryDefined()
                && checks.redactionPolicyDefined()
                && checks.externalRequestSimulationDefined()
                && checks.schemaMigrationPolicyDefined()
                && checks.auditLedgerWritePolicyDefined()
                && checks.allTenBoundariesDefined()
                && checks.credentialValueStillForbidden()
                && checks.rawEndpointStillForbidden()
                && checks.secretProviderRuntimeStillDisabled()
                && checks.realResolverClientStillDisabled()
                && checks.externalRequestStillSimulationOnly()
                && checks.schemaMigrationStillReviewOnly()
                && checks.auditLedgerWriteStillReviewOnly()
                && checks.upstreamProbesStillDisabled()
                && checks.upstreamActionsStillDisabled()
                && checks.productionAuditStillBlocked()
                && checks.productionWindowStillBlocked();
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks(
                checks.sourceNodeV269Ready(),
                checks.sourceNodeV269KeepsBlockedDecision(),
                checks.sourceNodeV269KeepsRealResolverBlocked(),
                checks.planDocumentPresent(),
                checks.credentialHandleBoundaryDefined(),
                checks.endpointHandleBoundaryDefined(),
                checks.secretProviderStubDefined(),
                checks.operatorApprovalBoundaryDefined(),
                checks.rollbackBoundaryDefined(),
                checks.redactionPolicyDefined(),
                checks.externalRequestSimulationDefined(),
                checks.schemaMigrationPolicyDefined(),
                checks.auditLedgerWritePolicyDefined(),
                checks.allTenBoundariesDefined(),
                checks.credentialValueStillForbidden(),
                checks.rawEndpointStillForbidden(),
                checks.secretProviderRuntimeStillDisabled(),
                checks.realResolverClientStillDisabled(),
                checks.externalRequestStillSimulationOnly(),
                checks.schemaMigrationStillReviewOnly(),
                checks.auditLedgerWriteStillReviewOnly(),
                checks.upstreamProbesStillDisabled(),
                checks.upstreamActionsStillDisabled(),
                checks.productionAuditStillBlocked(),
                checks.productionWindowStillBlocked(),
                ready
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary summary(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSummary(
                CHECK_COUNT,
                checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake()
                        ? PASSED_CHECK_COUNT : PASSED_CHECK_COUNT - 1,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                plan.boundaryCount(),
                plan.definedBoundaryCount(),
                PROHIBITED_ACTION_COUNT,
                PRODUCTION_BLOCKER_COUNT,
                WARNING_COUNT,
                RECOMMENDATION_COUNT
        );
    }

    static RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary(
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
                false
        );
    }

    static boolean sourceNodeV270Ready(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSourceEcho source
    ) {
        return OpsEvidenceService.NODE_V270_CREDENTIAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_INTAKE_STATE
                .equals(source.planIntakeState())
                && source.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake()
                && source.planIntakeOnly()
                && source.readOnlyPlanIntake()
                && source.readyForCredentialResolverPreImplementationPlan()
                && !source.readyForManagedAuditSandboxAdapterConnection()
                && !source.readyForProductionAudit()
                && !source.readyForProductionWindow()
                && !source.readyForProductionOperations()
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
                && !source.approvalLedgerWritten()
                && !source.automaticUpstreamStart()
                && sourceNodeV269Ready(source.sourceNodeV269())
                && source.summary().checkCount() == CHECK_COUNT
                && source.summary().passedCheckCount() == PASSED_CHECK_COUNT
                && source.summary().boundaryCount() == REQUIRED_BOUNDARY_COUNT
                && source.summary().definedBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                && source.summary().productionBlockerCount() == PRODUCTION_BLOCKER_COUNT;
    }

    static boolean planComplete(RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan) {
        return NODE_V270_PLAN_VERSION.equals(plan.planVersion())
                && NODE_V270_PLAN_MODE.equals(plan.planMode())
                && NODE_V270_SOURCE_SPAN.equals(plan.sourceSpan())
                && plan.planDigest().startsWith("sha256:")
                && plan.boundaryCount() == REQUIRED_BOUNDARY_COUNT
                && plan.definedBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                && plan.allRequiredBoundariesDefined()
                && !plan.realResolverImplementationAllowed()
                && !plan.secretProviderRuntimeAllowed()
                && !plan.credentialValueReadAllowed()
                && !plan.rawEndpointUrlParseAllowed()
                && !plan.externalRequestAllowed()
                && !plan.schemaMigrationAllowed()
                && !plan.approvalLedgerWriteAllowed()
                && !plan.automaticUpstreamStartAllowed()
                && plan.boundaries().stream().map(RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary::code)
                .toList().equals(BOUNDARY_CODES)
                && plan.boundaries().stream()
                .map(RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary::requirementFromV268)
                .toList().equals(REQUIREMENT_CODES)
                && plan.boundaries().stream().allMatch(boundary -> BOUNDARY_STATUS.equals(boundary.status()));
    }

    static boolean planIntakeComplete(RehearsalSandboxEndpointCredentialResolverPlanIntake planIntake) {
        return planIntake.intakeDigest().startsWith("sha256:")
                && NODE_V270_INTAKE_MODE.equals(planIntake.intakeMode())
                && "Node v269".equals(planIntake.consumedNodeVersion())
                && planIntake.requiredBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                && planIntake.definedBoundaryCount() == REQUIRED_BOUNDARY_COUNT
                && planIntake.missingBoundaryCount() == 0
                && planIntake.planDocumentPresent()
                && planIntake.credentialHandleBoundaryDefined()
                && planIntake.endpointHandleBoundaryDefined()
                && planIntake.secretProviderStubDefined()
                && planIntake.operatorApprovalBoundaryDefined()
                && planIntake.rollbackBoundaryDefined()
                && planIntake.redactionPolicyDefined()
                && planIntake.externalRequestSimulationDefined()
                && planIntake.schemaMigrationPolicyDefined()
                && planIntake.auditLedgerWritePolicyDefined()
                && "Java v112".equals(planIntake.nextJavaEchoVersion())
                && "mini-kv v119".equals(planIntake.nextMiniKvReceiptVersion())
                && "Node v272".equals(planIntake.nextNodeVerificationVersion());
    }

    static boolean checksClosed(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeChecks checks
    ) {
        return checks.sourceNodeV269Ready()
                && checks.sourceNodeV269KeepsBlockedDecision()
                && checks.sourceNodeV269KeepsRealResolverBlocked()
                && checks.planDocumentPresent()
                && checks.credentialHandleBoundaryDefined()
                && checks.endpointHandleBoundaryDefined()
                && checks.secretProviderStubDefined()
                && checks.operatorApprovalBoundaryDefined()
                && checks.rollbackBoundaryDefined()
                && checks.redactionPolicyDefined()
                && checks.externalRequestSimulationDefined()
                && checks.schemaMigrationPolicyDefined()
                && checks.auditLedgerWritePolicyDefined()
                && checks.allTenBoundariesDefined()
                && checks.credentialValueStillForbidden()
                && checks.rawEndpointStillForbidden()
                && checks.secretProviderRuntimeStillDisabled()
                && checks.realResolverClientStillDisabled()
                && checks.externalRequestStillSimulationOnly()
                && checks.schemaMigrationStillReviewOnly()
                && checks.auditLedgerWriteStillReviewOnly()
                && checks.upstreamProbesStillDisabled()
                && checks.upstreamActionsStillDisabled()
                && checks.productionAuditStillBlocked()
                && checks.productionWindowStillBlocked()
                && checks.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntake();
    }

    static boolean sideEffectBoundaryBlocked(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlanIntakeSideEffectBoundary boundary
    ) {
        return boundary.planIntakeOnly()
                && boundary.readOnlyPlanIntake()
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

    private static boolean sourceNodeV269Ready(
            RehearsalSandboxEndpointCredentialResolverBlockedDecisionUpstreamEchoVerificationSource source
    ) {
        return OpsEvidenceService
                .NODE_V269_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_STATE
                .equals(source.verificationState())
                && source.readyForBlockedDecisionUpstreamEchoVerification()
                && source.verificationDigest().startsWith("sha256:")
                && NODE_V269_SOURCE_SPAN.equals(source.sourceSpan())
                && source.sourceNodeV268Ready()
                && source.javaV111EchoReady()
                && source.miniKvV118NonParticipationReady()
                && source.blockedDecisionAligned()
                && source.missingRequirementBlockersAligned()
                && source.readOnlyDecisionGateAligned()
                && source.credentialBoundaryAligned()
                && source.rawEndpointBoundaryAligned()
                && source.resolverBoundaryAligned()
                && source.connectionBoundaryAligned()
                && source.writeBoundaryAligned()
                && source.autoStartBoundaryAligned()
                && !source.readyForCredentialResolverPreImplementationPlan()
                && !source.readyForManagedAuditSandboxAdapterConnection()
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
                && !source.automaticUpstreamStart();
    }

    private static RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary boundary(
            String code,
            String requirementFromV268,
            String title,
            String owner,
            String implementationRule,
            List<String> prohibitedActions,
            String verificationEvidence
    ) {
        return new RehearsalSandboxEndpointCredentialResolverPreImplementationBoundary(
                code,
                requirementFromV268,
                title,
                BOUNDARY_STATUS,
                owner,
                implementationRule,
                List.copyOf(prohibitedActions),
                verificationEvidence
        );
    }

    private static boolean hasBoundary(
            RehearsalSandboxEndpointCredentialResolverPreImplementationPlan plan,
            String code
    ) {
        return plan.boundaries().stream()
                .anyMatch(boundary -> code.equals(boundary.code()) && BOUNDARY_STATUS.equals(boundary.status()));
    }
}
