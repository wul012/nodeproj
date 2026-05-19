package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverDryRunResponseShape;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverEnvHandle;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverFailureClass;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverDisabledPrecheckEchoRecords
        .RehearsalSandboxEndpointCredentialResolverOptInGate;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerBuilder {

    private static final String PRECHECK_MODE =
            "sandbox-endpoint-credential-resolver-disabled-precheck-only";
    private static final String RESOLVER_IMPLEMENTATION_STATUS = "not-implemented";
    private static final String SECRET_PROVIDER_IMPLEMENTATION_STATUS = "not-implemented";
    private static final String SOURCE_SPAN = "Node v261 credential resolver upstream echo verification";
    private static final String VERIFICATION_MODE =
            "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only";
    private static final String NODE_V261_SOURCE_SPAN = "Node v260 + Java v105 + mini-kv v114";
    private static final String DRY_RUN_READY_STATE =
            "sandbox-endpoint-credential-resolver-disabled-precheck-ready";
    private static final int SOURCE_CHECK_COUNT = 20;
    private static final int SOURCE_PASSED_CHECK_COUNT = 20;
    private static final int SOURCE_PRODUCTION_BLOCKER_COUNT = 0;
    private static final int SOURCE_WARNING_COUNT = 2;
    private static final int SOURCE_RECOMMENDATION_COUNT = 2;

    private static final List<String> REQUIRED_ENV_HANDLE_NAMES = List.of(
            "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
            "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
    );

    private static final List<String> OPT_IN_GATE_NAMES = List.of(
            "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED"
    );

    private static final List<String> FAILURE_CLASS_CODES = List.of(
            "RESOLVER_DISABLED",
            "APPROVAL_MARKER_MISSING",
            "CREDENTIAL_HANDLE_MISSING",
            "CREDENTIAL_VALUE_REQUESTED",
            "RAW_ENDPOINT_URL_REQUESTED",
            "EXTERNAL_REQUEST_REQUESTED",
            "SCHEMA_MIGRATION_REQUESTED"
    );

    private static final List<String> DRY_RUN_RESPONSE_FIELDS = List.of(
            "readyState",
            "resolverMode",
            "resolverClientInstantiated",
            "secretProviderInstantiated",
            "credentialValueRead",
            "credentialValueLoaded",
            "rawEndpointUrlParsed",
            "externalRequestSent",
            "connectsManagedAudit",
            "schemaMigrationExecuted",
            "failureClassCount",
            "nextAction"
    );

    private static final List<String> INHERITED_NO_GO_CONDITIONS = List.of(
            "CREDENTIAL_VALUE_REQUIRED",
            "RAW_ENDPOINT_URL_REQUIRED",
            "REAL_CONNECTION_REQUIRED",
            "EXTERNAL_REQUEST_REQUIRED",
            "SCHEMA_MIGRATION_REQUIRED",
            "UPSTREAM_WRITE_REQUIRED",
            "AUTO_START_REQUIRED",
            "MINI_KV_BACKEND_REQUIRED",
            "PRODUCTION_WINDOW_REQUIRED"
    );

    private static final List<String> NODE_WARNING_CODES = List.of(
            "DISABLED_PRECHECK_ONLY",
            "UPSTREAM_ECHO_REQUIRED_NEXT"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "ASK_JAVA_MINI_KV_FOR_ECHO_NEXT",
            "KEEP_REAL_RESOLVER_OUT_OF_SCOPE"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v106 sandbox endpoint credential resolver disabled precheck echo marker",
            "mini-kv v115 sandbox endpoint credential resolver disabled precheck non-participation receipt"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerDigest",
            "sandboxEndpointCredentialResolverDisabledPrecheckRequiredEnvHandleCount",
            "sandboxEndpointCredentialResolverDisabledPrecheckOptInGateCount",
            "sandboxEndpointCredentialResolverDisabledPrecheckFailureClassCount",
            "sandboxEndpointCredentialResolverDisabledPrecheckDryRunResponseFieldCount",
            "sandboxEndpointCredentialResolverDisabledPrecheckInheritedNoGoConditionCount",
            "sandboxEndpointCredentialResolverDisabledPrecheckResolverClientMayBeInstantiated",
            "sandboxEndpointCredentialResolverDisabledPrecheckSecretProviderMayBeInstantiated",
            "sandboxEndpointCredentialResolverDisabledPrecheckCredentialValueMayBeLoaded",
            "sandboxEndpointCredentialResolverDisabledPrecheckRawEndpointUrlMayBeParsed",
            "sandboxEndpointCredentialResolverDisabledPrecheckExternalRequestMayBeSent",
            "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectCredentialValueRead",
            "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectRawEndpointUrlParsed",
            "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectExternalRequestSent"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.requiredEnvHandleCount=6",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.optInGateCount=2",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.failureClassCount=7",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.dryRunResponseFieldCount=12",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.inheritedNoGoConditionCount=9",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.resolverClientMayBeInstantiated=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.secretProviderMayBeInstantiated=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.credentialValueMayBeLoaded=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.rawEndpointUrlMayBeParsed=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.externalRequestMayBeSent=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.sideEffectBoundary.externalRequestSent=false",
            "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.consumedByNodeSandboxEndpointCredentialResolverDisabledPrecheckProfile with Node v262",
            "Require managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification=true before Node v263",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.requiredEnvHandleCount=6",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.optInGateCount=2",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.failureClassCount=7",
            "Verify managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.dryRunResponseFieldCount=12",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.resolverClientMayBeInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.secretProviderMayBeInstantiated=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.credentialValueMayBeLoaded=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.disabledPrecheck.rawEndpointUrlMayBeParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.sideEffectBoundary.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker.sideEffectBoundary.connectsManagedAudit=false"
    );

    RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker decisionEchoMarker
    ) {
        SourceGate sourceGate = SourceGate.from(decisionEchoMarker);
        RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho sourceNodeV261 =
                sourceNodeV261(sourceGate);
        RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord disabledPrecheck =
                disabledPrecheck();
        RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary sideEffectBoundary =
                sideEffectBoundary();
        EchoReadiness readiness = EchoReadiness.from(sourceNodeV261, disabledPrecheck, sideEffectBoundary);
        List<String> markerWarnings = markerWarnings(readiness);

        String markerDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "markerVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceCredentialResolverDecisionEchoMarkerVersion",
                        decisionEchoMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceCredentialResolverDecisionEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeSandboxEndpointCredentialResolverDisabledPrecheckProfile",
                        OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("precheckMode", PRECHECK_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV261", sourceNodeV261),
                ReleaseApprovalDigestSupport.line("disabledPrecheck", disabledPrecheck),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV263SandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification",
                        readiness.readyForNodeV263()
                )
        ));

        return new RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ECHO_MARKER_VERSION,
                decisionEchoMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_VERSION,
                OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_PROFILE,
                OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_ENDPOINT,
                OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V262_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_STATE,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_STATE,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService
                        .NODE_V263_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DISABLED_PRECHECK_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                PRECHECK_MODE,
                SOURCE_SPAN,
                sourceNodeV261,
                disabledPrecheck,
                sideEffectBoundary,
                readiness.sourceNodeV261Echoed(),
                readiness.envHandlesEchoed(),
                readiness.optInGatesEchoed(),
                readiness.failureTaxonomyEchoed(),
                readiness.dryRunResponseShapeEchoed(),
                readiness.inheritedNoGoConditionsEchoed(),
                readiness.resolverImplementationAbsentEchoed(),
                readiness.secretProviderAbsentEchoed(),
                readiness.sideEffectBoundaryEchoed(),
                readiness.upstreamActionsStillDisabledEchoed(),
                readiness.readyForNodeV263(),
                false,
                false,
                false,
                false,
                markerDigest,
                REQUIRED_ENV_HANDLE_NAMES,
                OPT_IN_GATE_NAMES,
                FAILURE_CLASS_CODES,
                DRY_RUN_RESPONSE_FIELDS,
                INHERITED_NO_GO_CONDITIONS,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                markerWarnings,
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
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerWarnings",
                        marker.markerWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckEchoMarkerDigest",
                        marker.markerDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckRequiredEnvHandleCount",
                        marker.disabledPrecheck().requiredEnvHandleCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckOptInGateCount",
                        marker.disabledPrecheck().optInGateCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckFailureClassCount",
                        marker.disabledPrecheck().failureClassCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckDryRunResponseFieldCount",
                        marker.disabledPrecheck().dryRunResponseFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckInheritedNoGoConditionCount",
                        marker.disabledPrecheck().inheritedNoGoConditionCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckResolverClientMayBeInstantiated",
                        marker.disabledPrecheck().resolverClientMayBeInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckSecretProviderMayBeInstantiated",
                        marker.disabledPrecheck().secretProviderMayBeInstantiated()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckCredentialValueMayBeLoaded",
                        marker.disabledPrecheck().credentialValueMayBeLoaded()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckRawEndpointUrlMayBeParsed",
                        marker.disabledPrecheck().rawEndpointUrlMayBeParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckExternalRequestMayBeSent",
                        marker.disabledPrecheck().externalRequestMayBeSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectCredentialValueRead",
                        marker.sideEffectBoundary().credentialValueRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectRawEndpointUrlParsed",
                        marker.sideEffectBoundary().rawEndpointUrlParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDisabledPrecheckSideEffectExternalRequestSent",
                        marker.sideEffectBoundary().externalRequestSent()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            RehearsalManagedAuditSandboxEndpointCredentialResolverDisabledPrecheckEchoMarker marker
    ) {
        return disabledPrecheckSideEffectsBlocked(marker.disabledPrecheck(), marker.sideEffectBoundary())
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord();
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho sourceNodeV261(
            SourceGate sourceGate
    ) {
        return new RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho(
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_STATE,
                VERIFICATION_MODE,
                NODE_V261_SOURCE_SPAN,
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
                sourceGate.sourceAccepted(),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                SOURCE_PRODUCTION_BLOCKER_COUNT,
                SOURCE_WARNING_COUNT,
                SOURCE_RECOMMENDATION_COUNT,
                sourceGate.sourceAccepted()
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord disabledPrecheck() {
        List<RehearsalSandboxEndpointCredentialResolverEnvHandle> requiredEnvHandles =
                requiredEnvHandles();
        List<RehearsalSandboxEndpointCredentialResolverOptInGate> optInGates = optInGates();
        List<RehearsalSandboxEndpointCredentialResolverFailureClass> failureTaxonomy =
                failureTaxonomy();
        RehearsalSandboxEndpointCredentialResolverDryRunResponseShape dryRunResponseShape =
                dryRunResponseShape();
        String precheckDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("precheckMode", PRECHECK_MODE),
                ReleaseApprovalDigestSupport.line("requiredEnvHandles", requiredEnvHandles),
                ReleaseApprovalDigestSupport.line("optInGates", optInGates),
                ReleaseApprovalDigestSupport.line("failureTaxonomy", failureTaxonomy),
                ReleaseApprovalDigestSupport.line("dryRunResponseShape", dryRunResponseShape),
                ReleaseApprovalDigestSupport.line("inheritedNoGoConditions", INHERITED_NO_GO_CONDITIONS)
        ));
        return new RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord(
                precheckDigest,
                PRECHECK_MODE,
                RESOLVER_IMPLEMENTATION_STATUS,
                SECRET_PROVIDER_IMPLEMENTATION_STATUS,
                false,
                false,
                false,
                false,
                false,
                true,
                REQUIRED_ENV_HANDLE_NAMES.size(),
                OPT_IN_GATE_NAMES.size(),
                FAILURE_CLASS_CODES.size(),
                DRY_RUN_RESPONSE_FIELDS.size(),
                INHERITED_NO_GO_CONDITIONS.size(),
                requiredEnvHandles,
                optInGates,
                failureTaxonomy,
                dryRunResponseShape,
                INHERITED_NO_GO_CONDITIONS
        );
    }

    private static List<RehearsalSandboxEndpointCredentialResolverEnvHandle> requiredEnvHandles() {
        return List.of(
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_ENABLED",
                        "future opt-in gate for the credential resolver",
                        false
                ),
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_RESOLUTION_ENABLED",
                        "future opt-in gate for sandbox endpoint resolution",
                        false
                ),
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
                        "handle for the approved sandbox endpoint",
                        true
                ),
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
                        "handle for the approved sandbox credential",
                        true
                ),
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
                        "handle for the resolver policy review",
                        true
                ),
                envHandle(
                        "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
                        "operator approval marker for future resolver design",
                        true
                )
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverEnvHandle envHandle(
            String name,
            String purpose,
            boolean requiredBeforeRealResolver
    ) {
        return new RehearsalSandboxEndpointCredentialResolverEnvHandle(
                name,
                purpose,
                false,
                false,
                false,
                requiredBeforeRealResolver
        );
    }

    private static List<RehearsalSandboxEndpointCredentialResolverOptInGate> optInGates() {
        return OPT_IN_GATE_NAMES.stream()
                .map(gateName -> new RehearsalSandboxEndpointCredentialResolverOptInGate(
                        gateName,
                        "true",
                        "false",
                        true,
                        true
                ))
                .toList();
    }

    private static List<RehearsalSandboxEndpointCredentialResolverFailureClass> failureTaxonomy() {
        return List.of(
                failureClass("RESOLVER_DISABLED", "configuration", false, "pause-and-review"),
                failureClass("APPROVAL_MARKER_MISSING", "operator-boundary", false, "pause-and-review"),
                failureClass("CREDENTIAL_HANDLE_MISSING", "credential-boundary", false, "pause-and-review"),
                failureClass("CREDENTIAL_VALUE_REQUESTED", "credential-boundary", false, "pause-and-do-not-resolve"),
                failureClass("RAW_ENDPOINT_URL_REQUESTED", "endpoint-boundary", false, "pause-and-do-not-resolve"),
                failureClass("EXTERNAL_REQUEST_REQUESTED", "network-boundary", false, "pause-and-do-not-resolve"),
                failureClass("SCHEMA_MIGRATION_REQUESTED", "schema-boundary", false, "pause-and-do-not-resolve")
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverFailureClass failureClass(
            String code,
            String source,
            boolean retryable,
            String action
    ) {
        return new RehearsalSandboxEndpointCredentialResolverFailureClass(code, source, retryable, action);
    }

    private static RehearsalSandboxEndpointCredentialResolverDryRunResponseShape dryRunResponseShape() {
        return new RehearsalSandboxEndpointCredentialResolverDryRunResponseShape(
                DRY_RUN_RESPONSE_FIELDS,
                DRY_RUN_READY_STATE,
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

    private static RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary sideEffectBoundary() {
        return new RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary(
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

    private static boolean disabledPrecheckSideEffectsBlocked(
            RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck,
            RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary boundary
    ) {
        return boundary.readOnlyDisabledPrecheck()
                && boundary.disabledCredentialResolverPrecheckOnly()
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
                && !boundary.automaticUpstreamStart()
                && !precheck.resolverClientMayBeInstantiated()
                && !precheck.secretProviderMayBeInstantiated()
                && !precheck.credentialValueMayBeLoaded()
                && !precheck.rawEndpointUrlMayBeParsed()
                && !precheck.externalRequestMayBeSent();
    }

    private static List<String> markerWarnings(EchoReadiness readiness) {
        List<String> warnings = new ArrayList<>();
        if (!readiness.sourceNodeV261Echoed()) {
            warnings.add("NODE_V262_SOURCE_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_NOT_READY");
        }
        if (!readiness.envHandlesEchoed() || !readiness.optInGatesEchoed()) {
            warnings.add("NODE_V262_DISABLED_PRECHECK_HANDLE_OR_GATE_MISMATCH");
        }
        if (!readiness.sideEffectBoundaryEchoed()) {
            warnings.add("NODE_V262_DISABLED_PRECHECK_SIDE_EFFECT_BOUNDARY_OPEN");
        }
        return List.copyOf(warnings);
    }

    private record SourceGate(boolean sourceAccepted) {

        static SourceGate from(
                ReleaseApprovalRehearsalResponse
                        .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker marker
        ) {
            return new SourceGate(
                    marker.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification()
                            && marker.markerWarnings().isEmpty()
                            && marker.sourceNodeV259Echoed()
                            && marker.decisionFieldsEchoed()
                            && marker.explicitNoGoConditionsEchoed()
                            && marker.sideEffectBoundaryEchoed()
                            && !marker.readyForManagedAuditSandboxAdapterConnection()
                            && !marker.readyForProductionAudit()
                            && !marker.readyForProductionWindow()
                            && !marker.nodeMayTreatAsProductionAuditRecord()
            );
        }
    }

    private record EchoReadiness(
            boolean sourceNodeV261Echoed,
            boolean envHandlesEchoed,
            boolean optInGatesEchoed,
            boolean failureTaxonomyEchoed,
            boolean dryRunResponseShapeEchoed,
            boolean inheritedNoGoConditionsEchoed,
            boolean resolverImplementationAbsentEchoed,
            boolean secretProviderAbsentEchoed,
            boolean sideEffectBoundaryEchoed,
            boolean upstreamActionsStillDisabledEchoed
    ) {

        boolean readyForNodeV263() {
            return sourceNodeV261Echoed
                    && envHandlesEchoed
                    && optInGatesEchoed
                    && failureTaxonomyEchoed
                    && dryRunResponseShapeEchoed
                    && inheritedNoGoConditionsEchoed
                    && resolverImplementationAbsentEchoed
                    && secretProviderAbsentEchoed
                    && sideEffectBoundaryEchoed
                    && upstreamActionsStillDisabledEchoed;
        }

        static EchoReadiness from(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho source,
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck,
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary boundary
        ) {
            return new EchoReadiness(
                    sourceReady(source),
                    envHandlesReady(precheck),
                    optInGatesReady(precheck),
                    failureTaxonomyReady(precheck),
                    dryRunResponseShapeReady(precheck),
                    inheritedNoGoConditionsReady(precheck),
                    RESOLVER_IMPLEMENTATION_STATUS.equals(precheck.resolverImplementationStatus())
                            && !precheck.resolverClientMayBeInstantiated(),
                    SECRET_PROVIDER_IMPLEMENTATION_STATUS.equals(precheck.secretProviderImplementationStatus())
                            && !precheck.secretProviderMayBeInstantiated(),
                    sideEffectBoundaryReady(boundary, precheck),
                    source.upstreamActionsStillDisabled()
            );
        }

        private static boolean sourceReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSourceEcho source
        ) {
            return OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_VERSION
                    .equals(source.sourceVersion())
                    && OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_PROFILE
                    .equals(source.profileVersion())
                    && OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_STATE
                    .equals(source.verificationState())
                    && VERIFICATION_MODE.equals(source.verificationMode())
                    && NODE_V261_SOURCE_SPAN.equals(source.sourceSpan())
                    && source.readyForUpstreamEchoVerification()
                    && source.sourceNodeV260Ready()
                    && source.javaV105EchoReady()
                    && source.miniKvV114NonParticipationReady()
                    && source.decisionRecordAligned()
                    && source.requiredDecisionFieldsAligned()
                    && source.explicitNoGoConditionsAligned()
                    && source.resolverPolicyAligned()
                    && source.approvalMarkerAligned()
                    && source.operatorIdentityAligned()
                    && source.approvalCorrelationAligned()
                    && source.redactionAndFallbackAligned()
                    && source.credentialBoundaryAligned()
                    && source.rawEndpointBoundaryAligned()
                    && source.connectionBoundaryAligned()
                    && source.writeBoundaryAligned()
                    && source.autoStartBoundaryAligned()
                    && source.upstreamActionsStillDisabled()
                    && !source.credentialResolverExecutionAllowed()
                    && !source.credentialValueRead()
                    && !source.credentialValueLoaded()
                    && !source.rawEndpointUrlParsed()
                    && !source.externalRequestSent()
                    && !source.connectsManagedAudit()
                    && !source.schemaMigrationExecuted()
                    && !source.automaticUpstreamStart()
                    && source.checkCount() == SOURCE_CHECK_COUNT
                    && source.passedCheckCount() == SOURCE_PASSED_CHECK_COUNT
                    && source.productionBlockerCount() == SOURCE_PRODUCTION_BLOCKER_COUNT
                    && source.warningCount() == SOURCE_WARNING_COUNT
                    && source.recommendationCount() == SOURCE_RECOMMENDATION_COUNT
                    && source.readyForNodeV262CredentialResolverDisabledPrecheck();
        }

        private static boolean envHandlesReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            return precheck.requiredEnvHandleCount() == REQUIRED_ENV_HANDLE_NAMES.size()
                    && precheck.requiredEnvHandles().stream()
                    .map(RehearsalSandboxEndpointCredentialResolverEnvHandle::name)
                    .toList()
                    .equals(REQUIRED_ENV_HANDLE_NAMES)
                    && precheck.requiredEnvHandles().stream()
                    .allMatch(handle -> !handle.valueRequiredForPrecheck()
                            && !handle.credentialValue()
                            && !handle.rawEndpointValue());
        }

        private static boolean optInGatesReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            return precheck.optInGateRequired()
                    && precheck.optInGateCount() == OPT_IN_GATE_NAMES.size()
                    && precheck.optInGates().stream()
                    .map(RehearsalSandboxEndpointCredentialResolverOptInGate::gateName)
                    .toList()
                    .equals(OPT_IN_GATE_NAMES)
                    && precheck.optInGates().stream()
                    .allMatch(gate -> "true".equals(gate.requiredValueForFutureResolver())
                            && "false".equals(gate.currentDefault())
                            && gate.precheckTreatsEnabledAsBlocked()
                            && gate.operatorApprovalRequired());
        }

        private static boolean failureTaxonomyReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            return precheck.failureClassCount() == FAILURE_CLASS_CODES.size()
                    && precheck.failureTaxonomy().stream()
                    .map(RehearsalSandboxEndpointCredentialResolverFailureClass::code)
                    .toList()
                    .equals(FAILURE_CLASS_CODES);
        }

        private static boolean dryRunResponseShapeReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            RehearsalSandboxEndpointCredentialResolverDryRunResponseShape shape =
                    precheck.dryRunResponseShape();
            return precheck.dryRunResponseFieldCount() == DRY_RUN_RESPONSE_FIELDS.size()
                    && shape.fields().equals(DRY_RUN_RESPONSE_FIELDS)
                    && DRY_RUN_READY_STATE.equals(shape.readyState())
                    && !shape.resolverClientInstantiated()
                    && !shape.secretProviderInstantiated()
                    && !shape.credentialValueRead()
                    && !shape.credentialValueLoaded()
                    && !shape.rawEndpointUrlParsed()
                    && !shape.externalRequestSent()
                    && !shape.connectsManagedAudit()
                    && !shape.schemaMigrationExecuted();
        }

        private static boolean inheritedNoGoConditionsReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            return precheck.inheritedNoGoConditionCount() == INHERITED_NO_GO_CONDITIONS.size()
                    && precheck.inheritedNoGoConditions().equals(INHERITED_NO_GO_CONDITIONS);
        }

        private static boolean sideEffectBoundaryReady(
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckSideEffectBoundary boundary,
                RehearsalSandboxEndpointCredentialResolverDisabledPrecheckRecord precheck
        ) {
            return disabledPrecheckSideEffectsBlocked(precheck, boundary);
        }
    }
}
