package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder {

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxAdapterApprovalSchemaGuardReceiptWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxAdapterApprovalSchemaGuardDigest",
            "sandboxAdapterOwnerApprovalArtifactProvidedByJava",
            "sandboxAdapterSchemaMigrationSqlExecutedByJava",
            "sandboxAdapterCredentialValueReadByJava",
            "sandboxAdapterExternalManagedAuditConnectionOpened",
            "sandboxAdapterJavaManagedAuditStoreWritten",
            "sandboxAdapterJavaSqlExecuted",
            "sandboxAdapterQualityGateBuilderOrHelperSplitApplied"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.ownerApprovalBoundary.ownerApprovalArtifactRequired=true",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.ownerApprovalBoundary.ownerApprovalArtifactProvidedByJava=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.schemaRehearsalBoundary.schemaMigrationRehearsalRequired=true",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.credentialBoundary.sandboxCredentialHandleRequired=true",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.credentialBoundary.credentialValueReadByJava=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.executionBoundary.externalManagedAuditConnectionOpened=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.executionBoundary.javaManagedAuditStoreWritten=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.executionBoundary.javaSqlExecuted=false",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.qualityGateBoundary.builderOrHelperSplitApplied=true",
            "managedAuditSandboxAdapterApprovalSchemaGuardReceipt.qualityGateBoundary.longBooleanConstructorAvoided=true"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxAdapterApprovalSchemaGuardReceipt.consumedByNodeSandboxPlanProfile with Node v224",
            "Require managedAuditSandboxAdapterApprovalSchemaGuardReceipt.readyForNodeV225SandboxAdapterDryRunPackage=true before Node v225",
            "Keep managedAuditSandboxAdapterApprovalSchemaGuardReceipt.credentialBoundary.credentialValueReadByJava=false",
            "Keep managedAuditSandboxAdapterApprovalSchemaGuardReceipt.schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava=false",
            "Keep managedAuditSandboxAdapterApprovalSchemaGuardReceipt.executionBoundary.externalManagedAuditConnectionOpened=false",
            "Verify managedAuditSandboxAdapterApprovalSchemaGuardReceipt.qualityGateBoundary.builderOrHelperSplitApplied=true"
    );

    private static final String RECEIPT_VERSION =
            "java-release-approval-rehearsal-managed-audit-sandbox-adapter-approval-schema-guard-receipt.v1";

    private static final String SOURCE_SCHEMA_VERSION =
            "java-release-approval-rehearsal-response-schema.v15";

    private static final String NODE_V224_VERSION = "Node v224";

    private static final String NODE_V224_PROFILE =
            "managed-audit-sandbox-adapter-dry-run-plan.v1";

    private static final String NODE_V224_ENDPOINT =
            "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan";

    private static final String NODE_V224_STATE =
            "sandbox-adapter-dry-run-plan-ready";

    private static final String NODE_V225_VERSION = "Node v225";

    private static final String NODE_V225_PROFILE =
            "managed-audit-sandbox-adapter-dry-run-package.v1";

    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt
            build(
                    ReleaseApprovalRehearsalResponse.RehearsalManagedAuditExternalAdapterMigrationGuardReceipt
                            migrationGuardReceipt
    ) {
        boolean sourceReceiptAccepted =
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_EXTERNAL_ADAPTER_MIGRATION_GUARD_RECEIPT_VERSION
                        .equals(migrationGuardReceipt.receiptVersion())
                        && migrationGuardReceipt.readyForNodeV223ExternalAdapterConnectionReadinessReview()
                        && migrationGuardReceipt.ownerApprovalRequiredBeforeConnection()
                        && migrationGuardReceipt.schemaMigrationReviewRequired()
                        && migrationGuardReceipt.credentialReviewRequired()
                        && !migrationGuardReceipt.credentialValueReadByJava()
                        && !migrationGuardReceipt.credentialValueStoredByJava()
                        && !migrationGuardReceipt.externalManagedAuditConnectionOpened()
                        && !migrationGuardReceipt.externalManagedAuditSchemaMigrated()
                        && !migrationGuardReceipt.javaApprovalDecisionCreated()
                        && !migrationGuardReceipt.javaApprovalLedgerWritten()
                        && !migrationGuardReceipt.javaApprovalRecordPersisted()
                        && !migrationGuardReceipt.javaManagedAuditStoreWritten()
                        && !migrationGuardReceipt.javaSqlExecuted()
                        && !migrationGuardReceipt.javaDeploymentTriggered()
                        && !migrationGuardReceipt.javaRollbackTriggered()
                        && !migrationGuardReceipt.javaRestoreExecuted()
                        && !migrationGuardReceipt.nodeMayTreatAsProductionAuditRecord();

        ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxPlanEvidence nodeV224SandboxPlan =
                nodeV224SandboxPlan();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxOwnerApprovalBoundary ownerApprovalBoundary =
                ownerApprovalBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxSchemaRehearsalBoundary schemaRehearsalBoundary =
                schemaRehearsalBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxCredentialBoundary credentialBoundary =
                credentialBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxExecutionBoundary executionBoundary =
                executionBoundary();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxQualityGateBoundary qualityGateBoundary =
                qualityGateBoundary();

        List<String> guardWarnings = new ArrayList<>();
        if (!sourceReceiptAccepted) {
            guardWarnings.add("NODE_V225_SOURCE_EXTERNAL_ADAPTER_MIGRATION_GUARD_RECEIPT_NOT_READY");
        }

        boolean readyForNodeV225SandboxAdapterDryRunPackage =
                sourceReceiptAccepted
                        && nodeV224SandboxPlan.readyForManagedAuditSandboxAdapterDryRunPlan()
                        && !nodeV224SandboxPlan.readyForManagedAuditSandboxAdapterDryRunPackage()
                        && nodeV224SandboxPlan.readOnlyPlan()
                        && !nodeV224SandboxPlan.connectsManagedAudit()
                        && !nodeV224SandboxPlan.readsManagedAuditCredential()
                        && !nodeV224SandboxPlan.storesManagedAuditCredential()
                        && !nodeV224SandboxPlan.schemaMigrationExecuted()
                        && !nodeV224SandboxPlan.localDryRunWritePerformed()
                        && !nodeV224SandboxPlan.automaticUpstreamStart()
                        && !nodeV224SandboxPlan.readyForProductionAudit()
                        && ownerApprovalBoundary.ownerApprovalArtifactRequired()
                        && !ownerApprovalBoundary.ownerApprovalArtifactProvidedByJava()
                        && !ownerApprovalBoundary.javaApprovalDecisionCreated()
                        && !ownerApprovalBoundary.javaApprovalLedgerWritten()
                        && schemaRehearsalBoundary.schemaMigrationRehearsalRequired()
                        && schemaRehearsalBoundary.schemaMigrationChecklistRequired()
                        && !schemaRehearsalBoundary.schemaMigrationExecutionAllowed()
                        && !schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava()
                        && !schemaRehearsalBoundary.schemaMigrationAppliedByJava()
                        && credentialBoundary.sandboxCredentialHandleRequired()
                        && !credentialBoundary.productionCredentialAllowed()
                        && !credentialBoundary.credentialValueRequired()
                        && !credentialBoundary.credentialValueReadByJava()
                        && !credentialBoundary.credentialValueStoredByJava()
                        && !executionBoundary.externalManagedAuditConnectionOpened()
                        && !executionBoundary.externalServiceStartedByJava()
                        && !executionBoundary.javaManagedAuditStoreWritten()
                        && !executionBoundary.javaSqlExecuted()
                        && !executionBoundary.javaDeploymentTriggered()
                        && !executionBoundary.javaRollbackTriggered()
                        && !executionBoundary.javaRestoreExecuted()
                        && !executionBoundary.productionAuditWindowOpened()
                        && qualityGateBoundary.qualityGatesAreHardAcceptanceCriteria()
                        && qualityGateBoundary.opsEvidenceServiceBloatForbidden()
                        && qualityGateBoundary.builderOrHelperSplitApplied()
                        && qualityGateBoundary.longBooleanConstructorAvoided()
                        && qualityGateBoundary.receiptFieldsGroupedByBoundary()
                        && qualityGateBoundary.opsEvidenceServiceOnlyWiresReceipt();

        String guardDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("receiptVersion", RECEIPT_VERSION),
                ReleaseApprovalDigestSupport.line(
                        "sourceExternalAdapterMigrationGuardReceiptVersion",
                        migrationGuardReceipt.receiptVersion()
                ),
                ReleaseApprovalDigestSupport.line("sourceExternalAdapterMigrationGuardSchemaVersion", SOURCE_SCHEMA_VERSION),
                ReleaseApprovalDigestSupport.line("consumedByNodeSandboxPlanVersion", NODE_V224_VERSION),
                ReleaseApprovalDigestSupport.line("consumedByNodeSandboxPlanProfile", NODE_V224_PROFILE),
                ReleaseApprovalDigestSupport.line("consumedByNodeSandboxPlanState", NODE_V224_STATE),
                ReleaseApprovalDigestSupport.line(
                        "nodeV224ReadyForPlan",
                        nodeV224SandboxPlan.readyForManagedAuditSandboxAdapterDryRunPlan()
                ),
                ReleaseApprovalDigestSupport.line("nodeV224ConnectsManagedAudit", nodeV224SandboxPlan.connectsManagedAudit()),
                ReleaseApprovalDigestSupport.line(
                        "ownerApprovalArtifactRequired",
                        ownerApprovalBoundary.ownerApprovalArtifactRequired()
                ),
                ReleaseApprovalDigestSupport.line(
                        "ownerApprovalArtifactProvidedByJava",
                        ownerApprovalBoundary.ownerApprovalArtifactProvidedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaMigrationRehearsalRequired",
                        schemaRehearsalBoundary.schemaMigrationRehearsalRequired()
                ),
                ReleaseApprovalDigestSupport.line(
                        "schemaMigrationSqlExecutedByJava",
                        schemaRehearsalBoundary.schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line("sandboxCredentialHandleRequired", credentialBoundary.sandboxCredentialHandleRequired()),
                ReleaseApprovalDigestSupport.line("sandboxCredentialHandleName", credentialBoundary.sandboxCredentialHandleName()),
                ReleaseApprovalDigestSupport.line("credentialValueReadByJava", credentialBoundary.credentialValueReadByJava()),
                ReleaseApprovalDigestSupport.line(
                        "externalManagedAuditConnectionOpened",
                        executionBoundary.externalManagedAuditConnectionOpened()
                ),
                ReleaseApprovalDigestSupport.line("javaManagedAuditStoreWritten", executionBoundary.javaManagedAuditStoreWritten()),
                ReleaseApprovalDigestSupport.line("javaSqlExecuted", executionBoundary.javaSqlExecuted()),
                ReleaseApprovalDigestSupport.line(
                        "qualityGateBuilderOrHelperSplitApplied",
                        qualityGateBoundary.builderOrHelperSplitApplied()
                ),
                ReleaseApprovalDigestSupport.line(
                        "qualityGateLongBooleanConstructorAvoided",
                        qualityGateBoundary.longBooleanConstructorAvoided()
                ),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV225SandboxAdapterDryRunPackage",
                        readyForNodeV225SandboxAdapterDryRunPackage
                )
        ));

        return new ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt(
                RECEIPT_VERSION,
                migrationGuardReceipt.receiptVersion(),
                SOURCE_SCHEMA_VERSION,
                NODE_V224_VERSION,
                NODE_V224_PROFILE,
                NODE_V224_ENDPOINT,
                NODE_V224_STATE,
                NODE_V225_VERSION,
                NODE_V225_PROFILE,
                true,
                nodeV224SandboxPlan,
                ownerApprovalBoundary,
                schemaRehearsalBoundary,
                credentialBoundary,
                executionBoundary,
                qualityGateBoundary,
                readyForNodeV225SandboxAdapterDryRunPackage,
                false,
                false,
                false,
                guardDigest,
                List.of(
                        "Node v224 sandbox adapter dry-run plan digest",
                        "Owner approval artifact identifier for sandbox rehearsal",
                        "Sandbox credential handle without credential value disclosure",
                        "Schema migration rehearsal checklist without SQL execution",
                        "Failure rollback path and manual abort criteria",
                        "mini-kv v91 sandbox runtime evidence non-participation receipt"
                ),
                List.of(
                        "Read or print a production managed audit credential value during Java v82 guard",
                        "Open an external managed audit connection during Java v82 guard",
                        "Execute schema migration SQL during Java v82 guard",
                        "Write Java approval ledger or managed audit state during Java v82 guard",
                        "Start Java, mini-kv, or external audit services automatically",
                        "Unlock a production audit or production operations window"
                ),
                List.of(
                        "Node v224 sandbox adapter dry-run plan must be ready and read-only",
                        "Java v82 sandbox approval/schema guard receipt must be ready",
                        "mini-kv v91 sandbox runtime evidence non-participation receipt must be present",
                        "Node v225 must consume credential handles only, never credential values",
                        "UPSTREAM_ACTIONS_ENABLED must remain false"
                ),
                List.copyOf(guardWarnings),
                NODE_VERIFICATION_ACTIONS
        );
    }

    List<String> warningDigestWarningInputNames() {
        return WARNING_DIGEST_WARNING_INPUT_NAMES;
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
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt
                    receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxAdapterApprovalSchemaGuardReceiptWarnings",
                        receipt.guardWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt
                    receipt
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line("sandboxAdapterApprovalSchemaGuardDigest", receipt.guardDigest()),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterOwnerApprovalArtifactProvidedByJava",
                        receipt.ownerApprovalBoundary().ownerApprovalArtifactProvidedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterSchemaMigrationSqlExecutedByJava",
                        receipt.schemaRehearsalBoundary().schemaMigrationSqlExecutedByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterCredentialValueReadByJava",
                        receipt.credentialBoundary().credentialValueReadByJava()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterExternalManagedAuditConnectionOpened",
                        receipt.executionBoundary().externalManagedAuditConnectionOpened()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterJavaManagedAuditStoreWritten",
                        receipt.executionBoundary().javaManagedAuditStoreWritten()
                ),
                ReleaseApprovalDigestSupport.line("sandboxAdapterJavaSqlExecuted", receipt.executionBoundary().javaSqlExecuted()),
                ReleaseApprovalDigestSupport.line(
                        "sandboxAdapterQualityGateBuilderOrHelperSplitApplied",
                        receipt.qualityGateBoundary().builderOrHelperSplitApplied()
                )
        );
    }

    boolean noWriteCredentialConnectionOrSchemaEffectProved(
            ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxAdapterApprovalSchemaGuardReceipt
                    receipt
    ) {
        return !receipt.ownerApprovalBoundary().ownerApprovalArtifactProvidedByJava()
                && !receipt.ownerApprovalBoundary().javaApprovalDecisionCreated()
                && !receipt.ownerApprovalBoundary().javaApprovalLedgerWritten()
                && !receipt.schemaRehearsalBoundary().schemaMigrationExecutionAllowed()
                && !receipt.schemaRehearsalBoundary().schemaMigrationSqlExecutedByJava()
                && !receipt.schemaRehearsalBoundary().schemaMigrationAppliedByJava()
                && !receipt.credentialBoundary().credentialValueReadByJava()
                && !receipt.credentialBoundary().credentialValueStoredByJava()
                && !receipt.executionBoundary().externalManagedAuditConnectionOpened()
                && !receipt.executionBoundary().externalServiceStartedByJava()
                && !receipt.executionBoundary().javaManagedAuditStoreWritten()
                && !receipt.executionBoundary().javaSqlExecuted()
                && !receipt.executionBoundary().javaDeploymentTriggered()
                && !receipt.executionBoundary().javaRollbackTriggered()
                && !receipt.executionBoundary().javaRestoreExecuted();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxPlanEvidence nodeV224SandboxPlan() {
        return new ReleaseApprovalRehearsalResponse.RehearsalManagedAuditSandboxPlanEvidence(
                true,
                false,
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxOwnerApprovalBoundary
            ownerApprovalBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxOwnerApprovalBoundary(
                true,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxSchemaRehearsalBoundary
            schemaRehearsalBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxSchemaRehearsalBoundary(
                true,
                true,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxCredentialBoundary
            credentialBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxCredentialBoundary(
                true,
                "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
                false,
                false,
                false,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxExecutionBoundary
            executionBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxExecutionBoundary(
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

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxQualityGateBoundary
            qualityGateBoundary() {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxQualityGateBoundary(
                true,
                true,
                true,
                true,
                true,
                true,
                "ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder",
                List.of(
                        "Java v82 must not add receipt logic directly to OpsEvidenceService",
                        "Java v82 must use builder/helper split for sandbox guard construction",
                        "Java v82 must avoid long boolean constructor chains by grouping receipt fields",
                        "Java v82 must keep owner approval, schema rehearsal, and credential boundaries explicit"
                )
        );
    }

}
