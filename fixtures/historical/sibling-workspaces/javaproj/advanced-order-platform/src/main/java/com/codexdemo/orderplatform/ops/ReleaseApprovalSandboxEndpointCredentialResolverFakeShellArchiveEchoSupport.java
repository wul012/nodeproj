package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidenceFile;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport {

    static final String ARCHIVE_ECHO_MODE =
            "java-v110-credential-resolver-fake-shell-archive-echo-receipt-only";
    static final String SOURCE_SPAN =
            "Node v264 credential resolver fake shell contract + Node v265 upstream echo archive";
    static final int CHECK_COUNT = 28;
    static final int ARCHIVE_FILE_COUNT = 9;
    static final int REQUIRED_SNIPPET_COUNT = 24;
    static final int WARNING_COUNT = 1;
    static final int RECOMMENDATION_COUNT = 2;
    static final int PRODUCTION_BLOCKER_COUNT = 0;

    private static final List<String> ARCHIVE_ROOTS = List.of("c/264/", "c/265/");

    private static final List<String> SOURCE_VERSIONS = List.of("Node v264", "Node v265");

    private static final List<String> EVIDENCE_FILE_IDS = List.of(
            "v264-html-archive",
            "v264-screenshot",
            "v264-explanation",
            "v264-code-walkthrough",
            "v265-html-archive",
            "v265-screenshot",
            "v265-explanation",
            "v265-code-walkthrough",
            "active-plan"
    );

    private static final List<String> REQUIRED_SNIPPET_IDS = List.of(
            "v264-html-title",
            "v264-html-ready",
            "v264-explanation-profile",
            "v264-explanation-no-real-resolver",
            "v264-explanation-smoke",
            "v264-explanation-screenshot",
            "v264-walkthrough-service",
            "v264-walkthrough-request",
            "v264-walkthrough-failure",
            "v264-walkthrough-tests",
            "v265-html-title",
            "v265-html-ready",
            "v265-explanation-profile",
            "v265-explanation-java-v109",
            "v265-explanation-smoke",
            "v265-explanation-screenshot",
            "v265-walkthrough-service",
            "v265-walkthrough-java-v107",
            "v265-walkthrough-mini-kv-v116",
            "v265-walkthrough-tests",
            "plan-v266",
            "plan-v266-archive-only",
            "plan-no-rerun",
            "plan-no-real-provider"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport() {
    }

    static List<String> archiveRoots() {
        return ARCHIVE_ROOTS;
    }

    static List<String> sourceVersions() {
        return SOURCE_VERSIONS;
    }

    static List<String> evidenceFileIds() {
        return EVIDENCE_FILE_IDS;
    }

    static List<String> requiredSnippetIds() {
        return REQUIRED_SNIPPET_IDS;
    }

    static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho sourceNodeV266(
            boolean sourceAccepted
    ) {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho(
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_STATE,
                ARCHIVE_ECHO_MODE,
                SOURCE_SPAN,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                sourceAccepted,
                true,
                true,
                true,
                false,
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
                CHECK_COUNT,
                CHECK_COUNT,
                ARCHIVE_FILE_COUNT,
                REQUIRED_SNIPPET_COUNT,
                REQUIRED_SNIPPET_COUNT,
                PRODUCTION_BLOCKER_COUNT,
                WARNING_COUNT,
                RECOMMENDATION_COUNT,
                sourceAccepted,
                sourceAccepted
        );
    }

    static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence archiveEvidence() {
        List<RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidenceFile> files = List.of(
                file("v264-html-archive", "c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html"),
                file("v264-screenshot",
                        "c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png"),
                file("v264-explanation",
                        "c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md"),
                file("v264-code-walkthrough",
                        "代码讲解记录_生产雏形阶段/268-sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md"),
                file("v265-html-archive",
                        "c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html"),
                file("v265-screenshot",
                        "c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png"),
                file("v265-explanation",
                        "c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md"),
                file("v265-code-walkthrough",
                        "代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md"),
                file("active-plan", "docs/plans/v266-post-fake-shell-archive-roadmap.md")
        );
        List<RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet> snippets = List.of(
                snippet("v264-html-title", "c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html",
                        "Node v264 Credential Resolver Test-only Shell Contract"),
                snippet("v264-html-ready", "c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html",
                        "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
                snippet("v264-explanation-profile",
                        "c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
                        "shellContractState=sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
                snippet("v264-explanation-no-real-resolver",
                        "c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
                        "不实例化真实 resolver client"),
                snippet("v264-walkthrough-service",
                        "代码讲解记录_生产雏形阶段/268-sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
                        "managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.ts"),
                snippet("v265-html-title",
                        "c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html",
                        "Node v265 test-only resolver shell upstream echo verification"),
                snippet("v265-html-ready",
                        "c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html",
                        "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"),
                snippet("v265-explanation-profile",
                        "c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
                        "verificationState=sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"),
                snippet("v265-explanation-java-v109",
                        "c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
                        "javaV109OptimizationContextReady=true"),
                snippet("v265-walkthrough-java-v107",
                        "代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
                        "createJavaV107Reference()"),
                snippet("v265-walkthrough-mini-kv-v116",
                        "代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
                        "mini-kv v116 non-participation"),
                snippet("plan-v266", "docs/plans/v266-post-fake-shell-archive-roadmap.md",
                        "Node v266：credential resolver fake-shell archive verification")
        );
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence(
                files.size(),
                REQUIRED_SNIPPET_COUNT,
                REQUIRED_SNIPPET_COUNT,
                ARCHIVE_ROOTS,
                SOURCE_VERSIONS,
                files,
                snippets
        );
    }

    static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification archiveVerification() {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification(
                SOURCE_SPAN,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_ENDPOINT,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_ENDPOINT,
                true,
                false,
                false,
                false,
                true,
                true,
                true,
                true
        );
    }

    static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks archiveChecks(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho source,
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence archiveEvidence,
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification archiveVerification
    ) {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks(
                source.sourceNodeV264Ready(),
                true,
                source.sourceNodeV265Ready(),
                true,
                source.sourceNodeV265ConsumesUpstreamEchoes(),
                archiveEvidence.archiveFileCount() == ARCHIVE_FILE_COUNT,
                archiveEvidence.files().stream()
                        .allMatch(file -> file.expectedPresent() && file.expectedNonEmpty()),
                archiveEvidence.matchedSnippetCount() == archiveEvidence.requiredSnippetCount(),
                true,
                true,
                true,
                true,
                archiveVerification.routeResponsesVerified(),
                !archiveVerification.archiveVerificationRerunsFakeShellBehavior(),
                !archiveVerification.upstreamActionsEnabled(),
                true,
                true,
                source.readyForFakeShellArchiveVerification()
        );
    }

    static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary(
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
                false
        );
    }

    static boolean archiveEvidenceReady(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidence archiveEvidence
    ) {
        return archiveEvidence.archiveFileCount() == ARCHIVE_FILE_COUNT
                && archiveEvidence.requiredSnippetCount() == REQUIRED_SNIPPET_COUNT
                && archiveEvidence.matchedSnippetCount() == REQUIRED_SNIPPET_COUNT
                && archiveEvidence.files().size() == ARCHIVE_FILE_COUNT
                && archiveEvidence.files().stream()
                .allMatch(file -> file.expectedPresent() && file.expectedNonEmpty() && file.digestRequired())
                && archiveEvidence.snippets().stream()
                .allMatch(RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet::matchedByNode);
    }

    static boolean archiveVerificationReady(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveVerification archiveVerification
    ) {
        return SOURCE_SPAN.equals(archiveVerification.evidenceSpan())
                && archiveVerification.archiveVerificationReadsFilesOnly()
                && !archiveVerification.archiveVerificationRerunsFakeShellBehavior()
                && !archiveVerification.upstreamActionsEnabled()
                && !archiveVerification.productionAuditAllowed()
                && archiveVerification.routeResponsesVerified()
                && archiveVerification.archiveDigestExpected()
                && archiveVerification.sourceNodeV264ContractDigestExpected()
                && archiveVerification.sourceNodeV265VerificationDigestExpected();
    }

    static boolean archiveChecksReadOnly(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveChecks checks
    ) {
        return checks.archiveFilesPresent()
                && checks.archiveFilesNonEmpty()
                && checks.archiveSnippetsMatched()
                && checks.v264ArchiveRecordsFakeShellContract()
                && checks.v265ArchiveRecordsUpstreamEchoVerification()
                && checks.walkthroughsRecordImplementationAndVerification()
                && checks.activePlanPointsToV266ArchiveVerification()
                && checks.routeResponsesVerified()
                && checks.noArchiveVerificationFakeShellRerun()
                && checks.upstreamActionsStillDisabled()
                && checks.productionAuditStillBlocked()
                && checks.productionWindowStillBlocked();
    }

    static boolean sideEffectBoundaryBlocked(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSideEffectBoundary boundary
    ) {
        return boundary.readOnlyArchiveVerification()
                && boundary.archiveVerificationReadsFilesOnly()
                && !boundary.archiveVerificationRerunsFakeShellBehavior()
                && !boundary.credentialResolverExecutionAllowed()
                && !boundary.readyForManagedAuditSandboxAdapterConnection()
                && !boundary.readyForProductionAudit()
                && !boundary.readyForProductionWindow()
                && !boundary.readyForProductionOperations()
                && !boundary.executionAllowed()
                && !boundary.connectsManagedAudit()
                && !boundary.readsManagedAuditCredential()
                && !boundary.storesManagedAuditCredential()
                && !boundary.credentialValueRead()
                && !boundary.credentialValueLoaded()
                && !boundary.credentialValueStored()
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

    static boolean sourceReady(
            RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSourceEcho source
    ) {
        return OpsEvidenceService.NODE_V266_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_VERIFICATION_STATE
                .equals(source.archiveVerificationState())
                && ARCHIVE_ECHO_MODE.equals(source.archiveEchoMode())
                && SOURCE_SPAN.equals(source.sourceSpan())
                && source.readyForFakeShellArchiveVerification()
                && source.sourceNodeV264Ready()
                && source.sourceNodeV265Ready()
                && source.sourceNodeV265ConsumesUpstreamEchoes()
                && source.javaV107EchoReady()
                && source.miniKvV116NonParticipationReady()
                && source.javaV109OptimizationContextReady()
                && source.archiveFilesPresent()
                && source.archiveFilesNonEmpty()
                && source.archiveSnippetsMatched()
                && source.routeResponsesVerified()
                && source.noArchiveVerificationFakeShellRerun()
                && source.readOnlyArchiveVerification()
                && source.archiveVerificationReadsFilesOnly()
                && !source.archiveVerificationRerunsFakeShellBehavior()
                && source.upstreamActionsStillDisabled()
                && !source.credentialResolverExecutionAllowed()
                && !source.credentialValueRead()
                && !source.rawEndpointUrlParsed()
                && !source.externalRequestSent()
                && !source.secretProviderInstantiated()
                && !source.resolverClientInstantiated()
                && !source.connectsManagedAudit()
                && !source.schemaMigrationExecuted()
                && !source.automaticUpstreamStart()
                && source.checkCount() == CHECK_COUNT
                && source.passedCheckCount() == CHECK_COUNT
                && source.archiveFileCount() == ARCHIVE_FILE_COUNT
                && source.requiredSnippetCount() == REQUIRED_SNIPPET_COUNT
                && source.matchedSnippetCount() == REQUIRED_SNIPPET_COUNT
                && source.productionBlockerCount() == PRODUCTION_BLOCKER_COUNT
                && source.warningCount() == WARNING_COUNT
                && source.recommendationCount() == RECOMMENDATION_COUNT
                && source.readyForJavaV110EchoReceipt()
                && source.readyForMiniKvV117NonParticipationReceipt();
    }

    private static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidenceFile file(
            String id,
            String workspacePath
    ) {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveEvidenceFile(
                id,
                workspacePath,
                true,
                true,
                true
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet snippet(
            String id,
            String workspacePath,
            String expectedSignal
    ) {
        return new RehearsalSandboxEndpointCredentialResolverFakeShellArchiveSnippet(
                id,
                workspacePath,
                expectedSignal,
                true
        );
    }
}
