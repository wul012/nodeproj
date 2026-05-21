package com.codexdemo.orderplatform.ops;

import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryInput;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.boundaryLines;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowReadiness;
import static com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.workflowStep;

import com.codexdemo.orderplatform.ops.ReleaseApprovalEchoMarkerSupport.EchoWorkflowReadiness;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoRecords
        .RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverImplementationPlanEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoSupport {

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceiptWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = ReleaseApprovalEchoMarkerSupport
            .boundaryInputNames(
                    "sandboxEndpointCredentialResolverExecutionDeniedEchoReceiptDigest",
                    "sandboxEndpointCredentialResolverExecutionDeniedNodeV292State",
                    "sandboxEndpointCredentialResolverExecutionDeniedJavaEchoPresent",
                    "sandboxEndpointCredentialResolverExecutionDeniedFakeHarnessRuntimeAllowed",
                    "sandboxEndpointCredentialResolverExecutionDeniedCredentialValueRead",
                    "sandboxEndpointCredentialResolverExecutionDeniedRawEndpointUrlParsed",
                    "sandboxEndpointCredentialResolverExecutionDeniedConnectsManagedAudit",
                    "sandboxEndpointCredentialResolverExecutionDeniedApprovalLedgerWritten",
                    "sandboxEndpointCredentialResolverExecutionDeniedSqlExecuted",
                    "sandboxEndpointCredentialResolverExecutionDeniedSchemaMigrationExecuted",
                    "sandboxEndpointCredentialResolverExecutionDeniedAutomaticUpstreamStart",
                    "sandboxEndpointCredentialResolverExecutionDeniedReadyForNodeV293"
            );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.consumedByNodeCredentialResolverFakeHarnessReadinessDecisionState=credential-resolver-fake-harness-readiness-blocked",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.javaExecutionDeniedEchoPresent=true",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.executionDeniedDecision.fakeHarnessExecutionDenied=true",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false",
            "managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification=true"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.consumedByNodeCredentialResolverFakeHarnessReadinessDecisionProfile with Node v292",
            "Verify managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.javaExecutionDeniedEchoPresent=true before Node v293",
            "Verify managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.executionDeniedDecision.fakeHarnessExecutionDenied=true before Node v293",
            "Keep managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.credentialValueRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
            "Keep managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
            "Keep managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.sideEffectBoundary.sqlExecuted=false",
            "Require managedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt.readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification=true before Node v293"
    );

    private static final List<String> DENIAL_REASON_CODES = List.of(
            "JAVA_DIRECT_EXECUTION_DENIED_ECHO_ONLY",
            "NODE_V292_FAKE_HARNESS_READINESS_BLOCKED",
            "CREDENTIAL_VALUE_READ_FORBIDDEN",
            "RAW_ENDPOINT_PARSE_FORBIDDEN",
            "LEDGER_SQL_AND_SCHEMA_SIDE_EFFECTS_FORBIDDEN"
    );

    private static final List<String> NO_GO_CONDITION_CODES = List.of(
            "NO_FAKE_HARNESS_RUNTIME",
            "NO_DISABLED_RUNTIME_SHELL",
            "NO_MANAGED_AUDIT_CONNECTION",
            "NO_CREDENTIAL_VALUE_READ",
            "NO_RAW_ENDPOINT_URL_PARSE",
            "NO_LEDGER_SQL_OR_SCHEMA_MUTATION",
            "NO_AUTOMATIC_UPSTREAM_START"
    );

    private static final List<String> PROHIBITED_ACTIONS = List.of(
            "start-fake-harness-runtime",
            "start-disabled-runtime-shell",
            "connect-managed-audit",
            "read-credential-value",
            "parse-raw-endpoint-url",
            "write-approval-ledger",
            "execute-sql-or-schema-migration",
            "auto-start-node-or-mini-kv"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "FAKE_HARNESS_READINESS_REMAINS_BLOCKED",
            "DIRECT_EXECUTION_DENIED_ECHO_SUPPLIED"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "CONSUME_JAVA_V131_BEFORE_NODE_V293",
            "KEEP_FAKE_HARNESS_RUNTIME_DISABLED_UNTIL_NODE_VERIFICATION"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "mini-kv v129 fake harness non-participation receipt",
            "Node v293 fake harness readiness blocked decision upstream echo verification"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoSupport() {
    }

    static RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt sourceReceipt
    ) {
        RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho sourceEcho =
                sourceEcho(sourceReceipt);
        RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision decision =
                decision();
        RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks checks =
                checks(sourceEcho, decision, sideEffectBoundary);
        EchoWorkflowReadiness readiness = readiness(sourceEcho, decision, checks, sideEffectBoundary);
        List<String> receiptWarnings = receiptWarnings(readiness);
        String receiptDigest = receiptDigest(sourceReceipt, sourceEcho, decision, checks, sideEffectBoundary,
                readiness);

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_EXECUTION_DENIED_ECHO_RECEIPT_VERSION,
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_VERSION,
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_PROFILE,
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_ENDPOINT,
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_STATE,
                OpsEvidenceService
                        .NODE_V293_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V293_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V293_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_STATE,
                "java-v131-credential-resolver-direct-execution-denied-echo-only",
                "Node v292",
                sourceEcho,
                decision,
                checks,
                sideEffectBoundary,
                readiness.readyStepNames(),
                readiness.missingStepNames(),
                readiness.ready("sourceImplementationPlanEchoed"),
                readiness.ready("nodeV292ReadinessBlockedDecisionEchoed"),
                readiness.ready("fakeHarnessExecutionDeniedEchoed"),
                readiness.ready("noCredentialReadEchoed"),
                readiness.ready("noRawEndpointParseEchoed"),
                readiness.ready("noManagedAuditConnectionEchoed"),
                readiness.ready("noSqlOrLedgerWriteEchoed"),
                readiness.ready("noAutoStartBoundaryEchoed"),
                checks.directExecutionDeniedEchoPresent(),
                readiness.allReady(),
                false,
                false,
                false,
                false,
                false,
                false,
                receiptDigest,
                DENIAL_REASON_CODES,
                NO_GO_CONDITION_CODES,
                PROHIBITED_ACTIONS,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                receiptWarnings,
                NODE_VERIFICATION_ACTIONS
        );
    }

    static List<String> warningDigestWarningInputNames() {
        return ReleaseApprovalEchoMarkerSupport.warningInputNames(WARNING_DIGEST_WARNING_INPUT_NAME);
    }

    static List<String> warningDigestBoundaryInputNames() {
        return WARNING_DIGEST_BOUNDARY_INPUT_NAMES;
    }

    static List<String> proofClaims() {
        return PROOF_CLAIMS;
    }

    static List<String> nodeVerificationActions() {
        return NODE_VERIFICATION_ACTIONS;
    }

    static List<String> warningDigestWarningLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt receipt
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(WARNING_DIGEST_WARNING_INPUT_NAME,
                receipt.receiptWarnings());
    }

    static List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt receipt
    ) {
        return boundaryLines(
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedEchoReceiptDigest",
                        receipt.receiptDigest()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedNodeV292State",
                        receipt.consumedByNodeCredentialResolverFakeHarnessReadinessDecisionState()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedJavaEchoPresent",
                        receipt.javaExecutionDeniedEchoPresent()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedFakeHarnessRuntimeAllowed",
                        receipt.sideEffectBoundary().fakeHarnessRuntimeAllowed()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedCredentialValueRead",
                        receipt.sideEffectBoundary().credentialValueRead()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedRawEndpointUrlParsed",
                        receipt.sideEffectBoundary().rawEndpointUrlParsed()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedConnectsManagedAudit",
                        receipt.sideEffectBoundary().connectsManagedAudit()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedApprovalLedgerWritten",
                        receipt.sideEffectBoundary().approvalLedgerWritten()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedSqlExecuted",
                        receipt.sideEffectBoundary().sqlExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedSchemaMigrationExecuted",
                        receipt.sideEffectBoundary().schemaMigrationExecuted()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedAutomaticUpstreamStart",
                        receipt.sideEffectBoundary().automaticUpstreamStart()),
                boundaryInput("sandboxEndpointCredentialResolverExecutionDeniedReadyForNodeV293",
                        receipt.readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification())
        );
    }

    static boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverExecutionDeniedEchoReceipt receipt
    ) {
        return receipt.readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification()
                && receipt.javaExecutionDeniedEchoPresent()
                && !receipt.readyForDisabledRuntimeShell()
                && !receipt.readyForFakeHarnessRuntime()
                && !receipt.readyForManagedAuditResolverImplementation()
                && !receipt.sideEffectBoundary().disabledRuntimeShellAllowed()
                && !receipt.sideEffectBoundary().fakeHarnessRuntimeAllowed()
                && !receipt.sideEffectBoundary().managedAuditResolverImplementationAllowed()
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
                && !receipt.sideEffectBoundary().javaStartedNodeMiniKvOrHarness();
    }

    private static RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho sourceEcho(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt sourceReceipt
    ) {
        return new RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho(
                sourceReceipt.receiptVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_IMPLEMENTATION_PLAN_ECHO_RECEIPT_SCHEMA_VERSION,
                sourceReceipt.receiptDigest(),
                sourceReceipt.consumedByNodeCredentialResolverImplementationPlanDraftState(),
                sourceReceipt.planEchoMode(),
                sourceReceipt.readyForNodeV284CredentialResolverImplementationPlanEchoVerification(),
                sourceReceipt.readyForJavaV121MiniKvV126Echo(),
                sourceReceipt.readyForManagedAuditResolverImplementation(),
                sourceReceipt.readyForTestOnlyFakeHarnessPrecheck(),
                sourceReceipt.readyForProductionAudit(),
                sourceReceipt.readyForProductionWindow(),
                sourceReceipt.sideEffectBoundary().credentialValueRead(),
                sourceReceipt.sideEffectBoundary().rawEndpointUrlParsed(),
                sourceReceipt.sideEffectBoundary().connectsManagedAudit(),
                sourceReceipt.sideEffectBoundary().externalRequestSent(),
                sourceReceipt.sideEffectBoundary().secretProviderInstantiated(),
                sourceReceipt.sideEffectBoundary().resolverClientInstantiated(),
                sourceReceipt.sideEffectBoundary().approvalLedgerWritten(),
                sourceReceipt.sideEffectBoundary().managedAuditStoreWritten(),
                sourceReceipt.sideEffectBoundary().sqlExecuted(),
                sourceReceipt.sideEffectBoundary().schemaMigrationExecuted(),
                sourceReceipt.sideEffectBoundary().automaticUpstreamStart(),
                sourceReceipt.interfaceBoundaries().size(),
                sourceReceipt.requiredArtifactIds().size(),
                sourceReceipt.prohibitedActions().size(),
                sourceReceipt.javaV121EchoRequirements().size(),
                sourceReceipt.miniKvV126ReceiptRequirements().size()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision decision() {
        return new RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision(
                "node-v292-fake-harness-readiness-blocked-direct-execution-denied-echo",
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_VERSION,
                OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_STATE,
                OpsEvidenceService
                        .NODE_V293_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_BLOCKED_DECISION_UPSTREAM_ECHO_VERIFICATION_VERSION,
                true,
                true,
                true,
                true,
                true,
                true,
                true
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary
    sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary(
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

    private static RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks checks(
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision decision,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary sideEffectBoundary
    ) {
        boolean sourceReady = sourceEcho.implementationPlanEchoReady()
                && sourceEcho.javaV121MiniKvV126EchoReady();
        boolean sourceStillBlocked = !sourceEcho.readyForManagedAuditResolverImplementation()
                && !sourceEcho.readyForTestOnlyFakeHarnessPrecheck()
                && !sourceEcho.credentialValueRead()
                && !sourceEcho.rawEndpointUrlParsed()
                && !sourceEcho.connectsManagedAudit()
                && !sourceEcho.sqlExecuted()
                && !sourceEcho.approvalLedgerWritten();
        boolean nodeV292Blocked = OpsEvidenceService.NODE_V292_CREDENTIAL_RESOLVER_FAKE_HARNESS_READINESS_DECISION_STATE
                .equals(decision.blockingNodeDecisionState());
        boolean allRuntimeDenied = !sideEffectBoundary.disabledRuntimeShellAllowed()
                && !sideEffectBoundary.fakeHarnessRuntimeAllowed()
                && !sideEffectBoundary.executionAllowed();
        boolean allWritesDenied = !sideEffectBoundary.approvalLedgerWritten()
                && !sideEffectBoundary.managedAuditStoreWritten()
                && !sideEffectBoundary.sqlExecuted()
                && !sideEffectBoundary.schemaMigrationExecuted();
        return new RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks(
                sourceReady,
                sourceStillBlocked,
                nodeV292Blocked,
                decision.directExecutionDeniedEchoSupplied(),
                allRuntimeDenied,
                !sideEffectBoundary.credentialValueRead(),
                !sideEffectBoundary.rawEndpointUrlParsed() && !sideEffectBoundary.rawEndpointUrlRendered(),
                !sideEffectBoundary.connectsManagedAudit(),
                !sideEffectBoundary.secretProviderInstantiated(),
                !sideEffectBoundary.resolverClientInstantiated(),
                !sideEffectBoundary.approvalLedgerWritten(),
                !sideEffectBoundary.managedAuditStoreWritten(),
                !sideEffectBoundary.sqlExecuted(),
                !sideEffectBoundary.schemaMigrationExecuted(),
                !sideEffectBoundary.automaticUpstreamStart(),
                sourceReady && sourceStillBlocked && nodeV292Blocked && allRuntimeDenied && allWritesDenied
                        && decision.directExecutionDeniedEchoSupplied()
        );
    }

    private static EchoWorkflowReadiness readiness(
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision decision,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks checks,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary sideEffectBoundary
    ) {
        return workflowReadiness(
                workflowStep("sourceImplementationPlanEchoed", checks.sourceImplementationPlanReady()),
                workflowStep("nodeV292ReadinessBlockedDecisionEchoed", checks.nodeV292ReadinessDecisionBlocked()),
                workflowStep("fakeHarnessExecutionDeniedEchoed", decision.fakeHarnessExecutionDenied()
                        && checks.fakeHarnessRuntimeDenied()),
                workflowStep("noCredentialReadEchoed", checks.credentialReadDenied()),
                workflowStep("noRawEndpointParseEchoed", checks.rawEndpointParseDenied()),
                workflowStep("noManagedAuditConnectionEchoed", checks.managedAuditConnectionDenied()),
                workflowStep("noSqlOrLedgerWriteEchoed", checks.approvalLedgerWriteDenied()
                        && checks.sqlExecutionDenied()
                        && checks.schemaMigrationDenied()),
                workflowStep("noAutoStartBoundaryEchoed", checks.automaticUpstreamStartDenied()
                        && !sideEffectBoundary.javaStartedNodeMiniKvOrHarness()),
                workflowStep("sourceStillBlocked", !sourceEcho.readyForManagedAuditResolverImplementation())
        );
    }

    private static String receiptDigest(
            RehearsalManagedAuditSandboxEndpointCredentialResolverImplementationPlanEchoReceipt sourceReceipt,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSourceEcho sourceEcho,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedDecision decision,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedChecks checks,
            RehearsalSandboxEndpointCredentialResolverExecutionDeniedSideEffectBoundary sideEffectBoundary,
            EchoWorkflowReadiness readiness
    ) {
        return ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_EXECUTION_DENIED_ECHO_RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line("sourceImplementationPlanEchoReceiptVersion",
                        sourceReceipt.receiptVersion()),
                ReleaseApprovalDigestSupport.line("sourceImplementationPlanEchoReceiptDigest",
                        sourceReceipt.receiptDigest()),
                ReleaseApprovalDigestSupport.line("sourceEcho", sourceEcho),
                ReleaseApprovalDigestSupport.line("executionDeniedDecision", decision),
                ReleaseApprovalDigestSupport.line("checks", checks),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line("readySteps", readiness.readyStepNames())
        ));
    }

    private static List<String> receiptWarnings(EchoWorkflowReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                readiness.warningIfMissing("sourceImplementationPlanEchoed", "SOURCE_IMPLEMENTATION_PLAN_NOT_READY"),
                readiness.warningIfMissing("nodeV292ReadinessBlockedDecisionEchoed",
                        "NODE_V292_FAKE_HARNESS_READINESS_NOT_BLOCKED"),
                readiness.warningIfMissing("fakeHarnessExecutionDeniedEchoed",
                        "FAKE_HARNESS_EXECUTION_DENIED_ECHO_MISSING"),
                readiness.warningIfMissing("noSqlOrLedgerWriteEchoed", "EXECUTION_DENIED_WRITE_BOUNDARY_OPEN")
        );
    }
}
