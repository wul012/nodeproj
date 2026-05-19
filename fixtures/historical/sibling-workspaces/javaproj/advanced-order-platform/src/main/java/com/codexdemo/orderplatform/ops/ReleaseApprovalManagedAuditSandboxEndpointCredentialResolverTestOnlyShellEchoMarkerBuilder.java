package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho;

import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarkerBuilder {

    private static final String VERIFICATION_MODE =
            "java-v106-plus-mini-kv-v115-disabled-credential-resolver-precheck-upstream-echo-verification-only";
    private static final String SOURCE_SPAN = "Node v264 credential resolver test-only shell contract";
    private static final String NODE_V263_SOURCE_SPAN = "Node v262 + Java v106 + mini-kv v115";
    private static final int SOURCE_CHECK_COUNT = 19;
    private static final int SOURCE_PASSED_CHECK_COUNT = 19;
    private static final int SOURCE_PRODUCTION_BLOCKER_COUNT = 0;
    private static final int SOURCE_WARNING_COUNT = 2;
    private static final int SOURCE_RECOMMENDATION_COUNT = 2;
    private static final int REQUIRED_ENV_HANDLE_COUNT = 6;
    private static final int OPT_IN_GATE_COUNT = 2;
    private static final int DRY_RUN_RESPONSE_FIELD_COUNT = 12;
    private static final int INHERITED_NO_GO_CONDITION_COUNT = 9;

    private static final List<String> NODE_WARNING_CODES = List.of(
            "TEST_ONLY_SHELL_NOT_A_REAL_RESOLVER",
            "UPSTREAM_ECHO_REQUIRED_NEXT"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "ASK_JAVA_MINI_KV_FOR_ECHO_NEXT",
            "KEEP_REAL_RESOLVER_OUT_OF_SCOPE"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v107 sandbox endpoint credential resolver test-only shell echo marker",
            "mini-kv v116 sandbox endpoint credential resolver test-only shell non-participation receipt"
    );

    private static final String WARNING_DIGEST_WARNING_INPUT_NAME =
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarkerWarnings";

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverTestOnlyShellEchoMarkerDigest",
            "sandboxEndpointCredentialResolverTestOnlyShellRequestShapeFieldCount",
            "sandboxEndpointCredentialResolverTestOnlyShellResponseShapeFieldCount",
            "sandboxEndpointCredentialResolverTestOnlyShellFailureMappingCount",
            "sandboxEndpointCredentialResolverTestOnlyShellGuardConditionCount",
            "sandboxEndpointCredentialResolverTestOnlyShellFakeResolverOnly",
            "sandboxEndpointCredentialResolverTestOnlyShellCredentialValueAccepted",
            "sandboxEndpointCredentialResolverTestOnlyShellRawEndpointUrlAccepted",
            "sandboxEndpointCredentialResolverTestOnlyShellResolverClientInstantiated",
            "sandboxEndpointCredentialResolverTestOnlyShellSecretProviderInstantiated",
            "sandboxEndpointCredentialResolverTestOnlyShellExternalRequestSent",
            "sandboxEndpointCredentialResolverTestOnlyShellProbeCredentialValueRead",
            "sandboxEndpointCredentialResolverTestOnlyShellProbeExternalRequestSent",
            "sandboxEndpointCredentialResolverTestOnlyShellProbeProductionRecordWritten"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShapeFieldCount=9",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShapeFieldCount=13",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.failureMappingCount=7",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.guardConditionCount=10",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.fakeResolverOnly=true",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShape.credentialValueAccepted=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShape.rawEndpointUrlAccepted=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShape.resolverClientInstantiated=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShape.secretProviderInstantiated=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShape.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.fakeResolverProbe.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.consumedByNodeSandboxEndpointCredentialResolverTestOnlyShellContractProfile with Node v264",
            "Require managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification=true before Node v265",
            "Verify managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShapeFieldCount=9",
            "Verify managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShapeFieldCount=13",
            "Verify managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.failureMappingCount=7",
            "Verify managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.guardConditionCount=10",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.realResolverImplemented=false",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.realSecretProviderAllowed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShape.credentialValueAccepted=false",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.requestShape.rawEndpointUrlAccepted=false",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.resolverShellContract.responseShape.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker.sideEffectBoundary.connectsManagedAudit=false"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker build(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker disabledPrecheckMarker
    ) {
        SourceGate sourceGate = SourceGate.from(disabledPrecheckMarker);
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho sourceNodeV263 =
                sourceNodeV263(sourceGate);
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract resolverShellContract =
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.build(sourceNodeV263);
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoReadiness readiness = EchoReadiness.from(sourceNodeV263, resolverShellContract, sideEffectBoundary);
        List<String> markerWarnings = markerWarnings(readiness);

        String markerDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "markerVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDisabledPrecheckEchoMarkerVersion",
                        disabledPrecheckMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceDisabledPrecheckEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeSandboxEndpointCredentialResolverTestOnlyShellContractProfile",
                        OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_PROFILE
                ),
                ReleaseApprovalDigestSupport.line(
                        "shellMode",
                        ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.shellMode()
                ),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV263", sourceNodeV263),
                ReleaseApprovalDigestSupport.line("resolverShellContract", resolverShellContract),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV265SandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification",
                        readiness.readyForNodeV265()
                )
        ));

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_ECHO_MARKER_VERSION,
                disabledPrecheckMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_VERSION,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_PROFILE,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_ENDPOINT,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V264_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_CONTRACT_STATE,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_STATE,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V265_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_TEST_ONLY_SHELL_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.shellMode(),
                SOURCE_SPAN,
                sourceNodeV263,
                resolverShellContract,
                sideEffectBoundary,
                readiness.sourceNodeV263Echoed(),
                readiness.requestShapeEchoed(),
                readiness.responseShapeEchoed(),
                readiness.failureMappingEchoed(),
                readiness.guardConditionsEchoed(),
                readiness.fakeResolverProbeEchoed(),
                readiness.fakeResolverOnlyEchoed(),
                readiness.handleOnlyRequestEchoed(),
                readiness.sideEffectBoundaryEchoed(),
                readiness.upstreamActionsStillDisabledEchoed(),
                readiness.readyForNodeV265(),
                false,
                false,
                false,
                false,
                markerDigest,
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.requestShapeFields(),
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.responseShapeFields(),
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.failureClassCodes(),
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.guardConditionCodes(),
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                markerWarnings,
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker marker
    ) {
        return ReleaseApprovalEchoMarkerSupport.warningLines(
                WARNING_DIGEST_WARNING_INPUT_NAME,
                marker.markerWarnings()
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellEchoMarkerDigest",
                        marker.markerDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellRequestShapeFieldCount",
                        marker.resolverShellContract().requestShapeFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellResponseShapeFieldCount",
                        marker.resolverShellContract().responseShapeFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellFailureMappingCount",
                        marker.resolverShellContract().failureMappingCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellGuardConditionCount",
                        marker.resolverShellContract().guardConditionCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellFakeResolverOnly",
                        marker.resolverShellContract().fakeResolverOnly()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellCredentialValueAccepted",
                        marker.resolverShellContract().requestShape().credentialValueAccepted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellRawEndpointUrlAccepted",
                        marker.resolverShellContract().requestShape().rawEndpointUrlAccepted()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellResolverClientInstantiated",
                        marker.resolverShellContract().responseShape().resolverClientInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellSecretProviderInstantiated",
                        marker.resolverShellContract().responseShape().secretProviderInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellExternalRequestSent",
                        marker.resolverShellContract().responseShape().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellProbeCredentialValueRead",
                        marker.resolverShellContract().fakeResolverProbe().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellProbeExternalRequestSent",
                        marker.resolverShellContract().fakeResolverProbe().externalRequestSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverTestOnlyShellProbeProductionRecordWritten",
                        marker.resolverShellContract().fakeResolverProbe().productionRecordWritten()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverTestOnlyShellEchoMarker marker
    ) {
        return ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                .noEffects(marker.resolverShellContract())
                && sideEffectBoundaryBlocked(marker.sideEffectBoundary())
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord();
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho sourceNodeV263(
            SourceGate sourceGate
    ) {
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho(
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_STATE,
                VERIFICATION_MODE,
                NODE_V263_SOURCE_SPAN,
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
                sourceGate.sourceAccepted(),
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
                ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder.failureClassCodes().size(),
                REQUIRED_ENV_HANDLE_COUNT,
                OPT_IN_GATE_COUNT,
                DRY_RUN_RESPONSE_FIELD_COUNT,
                INHERITED_NO_GO_CONDITION_COUNT,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                SOURCE_PRODUCTION_BLOCKER_COUNT,
                SOURCE_WARNING_COUNT,
                SOURCE_RECOMMENDATION_COUNT,
                sourceGate.sourceAccepted()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary(
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
                false
        );
    }

    private static boolean sideEffectBoundaryBlocked(
            RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary boundary
    ) {
        return boundary.testOnlyShell()
                && boundary.readOnlyContract()
                && boundary.fakeResolverOnly()
                && boundary.handleOnlyRequest()
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
                && !boundary.credentialValueIncluded()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.rawEndpointUrlIncluded()
                && !boundary.externalRequestSent()
                && !boundary.secretProviderInstantiated()
                && !boundary.resolverClientInstantiated()
                && !boundary.schemaMigrationExecuted()
                && !boundary.automaticUpstreamStart();
    }

    private static List<String> markerWarnings(EchoReadiness readiness) {
        return ReleaseApprovalEchoMarkerSupport.warnings(
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sourceNodeV263Echoed(),
                        "NODE_V264_SOURCE_DISABLED_PRECHECK_UPSTREAM_ECHO_NOT_READY"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.requestShapeEchoed() || !readiness.responseShapeEchoed(),
                        "NODE_V264_TEST_ONLY_SHELL_SHAPE_MISMATCH"
                ),
                ReleaseApprovalEchoMarkerSupport.warningIf(
                        !readiness.sideEffectBoundaryEchoed(),
                        "NODE_V264_TEST_ONLY_SHELL_SIDE_EFFECT_BOUNDARY_OPEN"
                )
        );
    }

    private record SourceGate(boolean sourceAccepted) {

        static SourceGate from(
                RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker marker
        ) {
            return new SourceGate(
                    marker.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification()
                            && marker.markerWarnings().isEmpty()
                            && marker.sourceNodeV261Echoed()
                            && marker.envHandlesEchoed()
                            && marker.optInGatesEchoed()
                            && marker.failureTaxonomyEchoed()
                            && marker.dryRunResponseShapeEchoed()
                            && marker.inheritedNoGoConditionsEchoed()
                            && marker.sideEffectBoundaryEchoed()
                            && marker.upstreamActionsStillDisabledEchoed()
                            && !marker.readyForManagedAuditSandboxAdapterConnection()
                            && !marker.readyForProductionAudit()
                            && !marker.readyForProductionWindow()
                            && !marker.nodeMayTreatAsProductionAuditRecord()
            );
        }
    }

    private record EchoReadiness(
            boolean sourceNodeV263Echoed,
            boolean requestShapeEchoed,
            boolean responseShapeEchoed,
            boolean failureMappingEchoed,
            boolean guardConditionsEchoed,
            boolean fakeResolverProbeEchoed,
            boolean fakeResolverOnlyEchoed,
            boolean handleOnlyRequestEchoed,
            boolean sideEffectBoundaryEchoed,
            boolean upstreamActionsStillDisabledEchoed
    ) {

        boolean readyForNodeV265() {
            return sourceNodeV263Echoed
                    && requestShapeEchoed
                    && responseShapeEchoed
                    && failureMappingEchoed
                    && guardConditionsEchoed
                    && fakeResolverProbeEchoed
                    && fakeResolverOnlyEchoed
                    && handleOnlyRequestEchoed
                    && sideEffectBoundaryEchoed
                    && upstreamActionsStillDisabledEchoed;
        }

        static EchoReadiness from(
                RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho source,
                RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract contract,
                RehearsalSandboxEndpointCredentialResolverTestOnlyShellSideEffectBoundary boundary
        ) {
            return new EchoReadiness(
                    sourceReady(source),
                    ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .requestShapeReady(contract.requestShape()),
                    ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .responseShapeReady(contract.responseShape()),
                    ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .failureMappingReady(contract.failureMapping()),
                    ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .guardConditionsReady(contract.guardConditions()),
                    ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .fakeResolverProbeReady(contract.fakeResolverProbe()),
                    contract.fakeResolverOnly()
                            && ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                            .resolverKind()
                            .equals(contract.resolverKind())
                            && !contract.realResolverImplemented()
                            && !contract.realSecretProviderAllowed(),
                    contract.requestShape().credentialHandleOnly()
                            && contract.requestShape().endpointHandleOnly()
                            && !contract.requestShape().credentialValueAccepted()
                            && !contract.requestShape().rawEndpointUrlAccepted(),
                    sideEffectBoundaryBlocked(boundary),
                    source.upstreamActionsStillDisabled()
            );
        }

        private static boolean sourceReady(
                RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho source
        ) {
            return source.readyForDisabledPrecheckUpstreamEchoVerification()
                    && OpsEvidenceService
                    .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_STATE
                    .equals(source.verificationState())
                    && VERIFICATION_MODE.equals(source.verificationMode())
                    && NODE_V263_SOURCE_SPAN.equals(source.sourceSpan())
                    && source.sourceNodeV262Ready()
                    && source.javaV106EchoReady()
                    && source.miniKvV115NonParticipationReady()
                    && source.disabledPrecheckAligned()
                    && source.requiredEnvHandlesAligned()
                    && source.optInGatesAligned()
                    && source.failureTaxonomyAligned()
                    && source.dryRunResponseShapeAligned()
                    && source.inheritedNoGoConditionsAligned()
                    && source.sourceNodeV261Aligned()
                    && source.credentialBoundaryAligned()
                    && source.rawEndpointBoundaryAligned()
                    && source.connectionBoundaryAligned()
                    && source.writeBoundaryAligned()
                    && source.autoStartBoundaryAligned()
                    && source.upstreamActionsStillDisabled()
                    && !source.credentialResolverExecutionAllowed()
                    && !source.credentialValueRead()
                    && !source.credentialValueLoaded()
                    && !source.credentialValueStored()
                    && !source.credentialValueIncluded()
                    && !source.rawEndpointUrlParsed()
                    && !source.rawEndpointUrlIncluded()
                    && !source.externalRequestSent()
                    && !source.secretProviderInstantiated()
                    && !source.resolverClientInstantiated()
                    && !source.connectsManagedAudit()
                    && !source.schemaMigrationExecuted()
                    && !source.automaticUpstreamStart()
                    && source.failureClassCount() == ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder
                    .failureClassCodes()
                    .size()
                    && source.requiredEnvHandleCount() == REQUIRED_ENV_HANDLE_COUNT
                    && source.optInGateCount() == OPT_IN_GATE_COUNT
                    && source.dryRunResponseFieldCount() == DRY_RUN_RESPONSE_FIELD_COUNT
                    && source.inheritedNoGoConditionCount() == INHERITED_NO_GO_CONDITION_COUNT
                    && source.checkCount() == source.passedCheckCount()
                    && source.checkCount() == SOURCE_CHECK_COUNT
                    && source.productionBlockerCount() == SOURCE_PRODUCTION_BLOCKER_COUNT
                    && source.warningCount() == SOURCE_WARNING_COUNT
                    && source.recommendationCount() == SOURCE_RECOMMENDATION_COUNT
                    && source.readyForNodeV264CredentialResolverTestOnlyShellContract();
        }
    }
}
