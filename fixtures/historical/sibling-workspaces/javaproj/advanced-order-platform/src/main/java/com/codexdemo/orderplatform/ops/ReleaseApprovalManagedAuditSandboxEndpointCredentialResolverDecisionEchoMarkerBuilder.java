package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;

final class ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerBuilder {

    private static final String RECORD_MODE = "sandbox-endpoint-credential-resolver-decision-record-only";
    private static final String DECISION_SCOPE = "managed-audit-sandbox-endpoint-credential-resolver";
    private static final String DECISION_STATUS =
            "human-review-required-before-credential-resolution";
    private static final String SOURCE_SPAN =
            "Node v259 sandbox endpoint handle upstream echo verification";
    private static final String ENDPOINT_HANDLE = "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE";
    private static final String CREDENTIAL_HANDLE = "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
    private static final String RESOLVER_POLICY_HANDLE =
            "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE";
    private static final String APPROVAL_MARKER =
            "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER";
    private static final String RESOLVER_MODE = "policy-record-only-no-value-read";
    private static final String RESOLVER_CANDIDATE_IMPLEMENTATION = "not-implemented";
    private static final int REQUIRED_DECISION_FIELD_COUNT = 8;
    private static final int EXPLICIT_NO_GO_CONDITION_COUNT = 9;
    private static final int SOURCE_EVIDENCE_FILE_COUNT = 6;
    private static final int SOURCE_MATCHED_SNIPPET_COUNT = 39;
    private static final int SOURCE_CHECK_COUNT = 19;
    private static final int SOURCE_PASSED_CHECK_COUNT = 19;
    private static final int SOURCE_PRODUCTION_BLOCKER_COUNT = 0;
    private static final int SOURCE_WARNING_COUNT = 2;
    private static final int SOURCE_RECOMMENDATION_COUNT = 2;

    private static final List<String> REQUIRED_DECISION_FIELD_IDS = List.of(
            "endpoint-handle",
            "credential-handle",
            "resolver-policy-handle",
            "approval-marker",
            "operator-identity",
            "approval-correlation",
            "redaction-policy",
            "fallback-rotation-plan"
    );

    private static final List<String> EXPLICIT_NO_GO_CONDITION_CODES = List.of(
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
            "DECISION_RECORD_ONLY",
            "REAL_CREDENTIAL_STILL_ABSENT"
    );

    private static final List<String> NODE_RECOMMENDATION_CODES = List.of(
            "START_POST_V260_PLAN",
            "DESIGN_DISABLED_RESOLVER_PRECHECK_LATER"
    );

    private static final List<String> NEXT_REQUIRED_ECHO_VERSIONS = List.of(
            "Java v105 sandbox endpoint credential resolver decision echo marker",
            "mini-kv v114 sandbox endpoint credential resolver non-participation receipt"
    );

    private static final List<String> WARNING_DIGEST_WARNING_INPUT_NAMES = List.of(
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerWarnings"
    );

    private static final List<String> WARNING_DIGEST_BOUNDARY_INPUT_NAMES = List.of(
            "sandboxEndpointCredentialResolverDecisionEchoMarkerDigest",
            "sandboxEndpointCredentialResolverDecisionRequiredFieldCount",
            "sandboxEndpointCredentialResolverDecisionNoGoConditionCount",
            "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeRead",
            "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeLoaded",
            "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeStored",
            "sandboxEndpointCredentialResolverDecisionRawEndpointUrlMayBeParsed",
            "sandboxEndpointCredentialResolverDecisionExternalRequestMayBeSent",
            "sandboxEndpointCredentialResolverDecisionManagedAuditConnectionMayOpen",
            "sandboxEndpointCredentialResolverDecisionSchemaMigrationMayExecute",
            "sandboxEndpointCredentialResolverDecisionApprovalLedgerMayBeWritten",
            "sandboxEndpointCredentialResolverDecisionJavaOrMiniKvStartAllowed"
    );

    private static final List<String> PROOF_CLAIMS = List.of(
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.requiredDecisionFieldCount=8",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.explicitNoGoConditionCount=9",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.resolverMode=policy-record-only-no-value-read",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.resolverCandidateImplementation=not-implemented",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.credentialValueMayBeRead=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.credentialValueMayBeLoaded=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.rawEndpointUrlMayBeParsed=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.managedAuditConnectionMayOpen=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.externalRequestMayBeSent=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.approvalLedgerMayBeWritten=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.sideEffectBoundary.credentialValueRead=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.sideEffectBoundary.rawEndpointUrlParsed=false",
            "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.readyForManagedAuditSandboxAdapterConnection=false"
    );

    private static final List<String> NODE_VERIFICATION_ACTIONS = List.of(
            "Compare managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.consumedByNodeSandboxEndpointCredentialResolverDecisionRecordProfile with Node v260",
            "Require managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification=true before Node v261",
            "Verify managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.resolverMode=policy-record-only-no-value-read",
            "Verify managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.resolverPolicyHandle is handle-only",
            "Verify managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.requiredDecisionFieldCount=8",
            "Verify managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.explicitNoGoConditionCount=9",
            "Keep managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.credentialValueMayBeRead=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.credentialValueMayBeLoaded=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.decisionRecord.rawEndpointUrlMayBeParsed=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.sideEffectBoundary.externalRequestSent=false",
            "Keep managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker.sideEffectBoundary.connectsManagedAudit=false"
    );

    ReleaseApprovalRehearsalResponse
            .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker
    build(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker
                    endpointHandlePreflightEchoMarker
    ) {
        boolean sourceAccepted = sourceMarkerAccepted(endpointHandlePreflightEchoMarker);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSourceEcho sourceNodeV259 =
                sourceNodeV259(sourceAccepted);
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord
                decisionRecord = decisionRecord();
        ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSideEffectBoundary
                sideEffectBoundary = sideEffectBoundary();

        List<String> markerWarnings = new ArrayList<>();
        if (!sourceAccepted) {
            markerWarnings.add("NODE_V261_SOURCE_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_NOT_READY");
        }

        boolean sourceNodeV259Echoed = sourceNodeV259Ready(sourceNodeV259);
        boolean decisionFieldsEchoed = decisionFieldsEchoed(decisionRecord);
        boolean endpointHandleEchoed = endpointHandleEchoed(decisionRecord);
        boolean credentialHandleEchoed = credentialHandleEchoed(decisionRecord);
        boolean resolverPolicyEchoed = resolverPolicyEchoed(decisionRecord);
        boolean approvalMarkerEchoed = approvalMarkerEchoed(decisionRecord);
        boolean operatorIdentityRequirementEchoed = operatorIdentityRequirementEchoed(decisionRecord);
        boolean approvalCorrelationRequirementEchoed = approvalCorrelationRequirementEchoed(decisionRecord);
        boolean redactionPolicyEchoed = redactionPolicyEchoed(decisionRecord);
        boolean fallbackRotationPlanEchoed = fallbackRotationPlanEchoed(decisionRecord);
        boolean explicitNoGoConditionsEchoed = explicitNoGoConditionsEchoed(decisionRecord);
        boolean sideEffectBoundaryEchoed = noCredentialConnectionWriteOrAutoStart(sideEffectBoundary);
        boolean readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification =
                sourceNodeV259Echoed
                        && decisionFieldsEchoed
                        && endpointHandleEchoed
                        && credentialHandleEchoed
                        && resolverPolicyEchoed
                        && approvalMarkerEchoed
                        && operatorIdentityRequirementEchoed
                        && approvalCorrelationRequirementEchoed
                        && redactionPolicyEchoed
                        && fallbackRotationPlanEchoed
                        && explicitNoGoConditionsEchoed
                        && sideEffectBoundaryEchoed;

        String markerDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line(
                        "markerVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceEndpointHandlePreflightEchoMarkerVersion",
                        endpointHandlePreflightEchoMarker.markerVersion()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sourceEndpointHandlePreflightEchoMarkerSchemaVersion",
                        OpsEvidenceService
                                .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION
                ),
                ReleaseApprovalDigestSupport.line(
                        "consumedByNodeSandboxEndpointCredentialResolverDecisionRecordProfile",
                        OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_PROFILE
                ),
                ReleaseApprovalDigestSupport.line("recordMode", RECORD_MODE),
                ReleaseApprovalDigestSupport.line("sourceSpan", SOURCE_SPAN),
                ReleaseApprovalDigestSupport.line("sourceNodeV259", sourceNodeV259),
                ReleaseApprovalDigestSupport.line("decisionRecord", decisionRecord),
                ReleaseApprovalDigestSupport.line("sideEffectBoundary", sideEffectBoundary),
                ReleaseApprovalDigestSupport.line(
                        "readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification",
                        readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification
                )
        ));

        return new ReleaseApprovalRehearsalResponse
                .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker(
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_ECHO_MARKER_VERSION,
                endpointHandlePreflightEchoMarker.markerVersion(),
                OpsEvidenceService
                        .RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE_PREFLIGHT_ECHO_MARKER_SCHEMA_VERSION,
                OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_VERSION,
                OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_PROFILE,
                OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_ENDPOINT,
                OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_MARKDOWN_ENDPOINT,
                OpsEvidenceService.NODE_V260_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_DECISION_RECORD_STATE,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_ENDPOINT,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_STATE,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V261_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                true,
                RECORD_MODE,
                SOURCE_SPAN,
                sourceNodeV259,
                decisionRecord,
                sideEffectBoundary,
                sourceNodeV259Echoed,
                decisionFieldsEchoed,
                endpointHandleEchoed,
                credentialHandleEchoed,
                resolverPolicyEchoed,
                approvalMarkerEchoed,
                operatorIdentityRequirementEchoed,
                approvalCorrelationRequirementEchoed,
                redactionPolicyEchoed,
                fallbackRotationPlanEchoed,
                explicitNoGoConditionsEchoed,
                sideEffectBoundaryEchoed,
                readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
                false,
                false,
                false,
                false,
                markerDigest,
                REQUIRED_DECISION_FIELD_IDS,
                EXPLICIT_NO_GO_CONDITION_CODES,
                NODE_WARNING_CODES,
                NODE_RECOMMENDATION_CODES,
                NEXT_REQUIRED_ECHO_VERSIONS,
                List.copyOf(markerWarnings),
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
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerWarnings",
                        marker.markerWarnings()
                )
        );
    }

    List<String> warningDigestBoundaryLines(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker marker
    ) {
        return List.of(
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionEchoMarkerDigest",
                        marker.markerDigest()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionRequiredFieldCount",
                        marker.decisionRecord().requiredDecisionFieldCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionNoGoConditionCount",
                        marker.decisionRecord().explicitNoGoConditionCount()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeRead",
                        marker.decisionRecord().credentialValueMayBeRead()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeLoaded",
                        marker.decisionRecord().credentialValueMayBeLoaded()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionCredentialValueMayBeStored",
                        marker.decisionRecord().credentialValueMayBeStored()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionRawEndpointUrlMayBeParsed",
                        marker.decisionRecord().rawEndpointUrlMayBeParsed()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionExternalRequestMayBeSent",
                        marker.decisionRecord().externalRequestMayBeSent()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionManagedAuditConnectionMayOpen",
                        marker.decisionRecord().managedAuditConnectionMayOpen()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionSchemaMigrationMayExecute",
                        marker.decisionRecord().schemaMigrationMayExecute()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionApprovalLedgerMayBeWritten",
                        marker.decisionRecord().approvalLedgerMayBeWritten()
                ),
                ReleaseApprovalDigestSupport.line(
                        "sandboxEndpointCredentialResolverDecisionJavaOrMiniKvStartAllowed",
                        marker.decisionRecord().nodeMayStartJavaOrMiniKv()
                )
        );
    }

    boolean noCredentialConnectionWriteOrAutoStartProved(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarker marker
    ) {
        return decisionFieldsEchoed(marker.decisionRecord())
                && endpointHandleEchoed(marker.decisionRecord())
                && credentialHandleEchoed(marker.decisionRecord())
                && resolverPolicyEchoed(marker.decisionRecord())
                && approvalMarkerEchoed(marker.decisionRecord())
                && operatorIdentityRequirementEchoed(marker.decisionRecord())
                && approvalCorrelationRequirementEchoed(marker.decisionRecord())
                && redactionPolicyEchoed(marker.decisionRecord())
                && fallbackRotationPlanEchoed(marker.decisionRecord())
                && explicitNoGoConditionsEchoed(marker.decisionRecord())
                && noCredentialConnectionWriteOrAutoStart(marker.sideEffectBoundary())
                && !marker.readyForManagedAuditSandboxAdapterConnection()
                && !marker.readyForProductionAudit()
                && !marker.readyForProductionWindow()
                && !marker.nodeMayTreatAsProductionAuditRecord();
    }

    private static boolean sourceMarkerAccepted(
            ReleaseApprovalRehearsalResponse
                    .RehearsalManagedAuditSandboxEndpointHandlePreflightEchoMarker marker
    ) {
        return marker.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification()
                && marker.markerWarnings().isEmpty()
                && marker.sourceNodeV257Echoed()
                && marker.endpointHandleReviewEchoed()
                && marker.credentialHandleReviewEchoed()
                && marker.networkAllowlistReviewEchoed()
                && marker.tlsPolicyReviewEchoed()
                && marker.redactionPolicyEchoed()
                && marker.operatorWindowReviewEchoed()
                && marker.sideEffectBoundaryEchoed()
                && !marker.readyForManagedAuditSandboxAdapterConnection();
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSourceEcho
    sourceNodeV259(boolean readyForNodeV260CredentialResolverDecisionRecord) {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSourceEcho(
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_VERSION,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_PROFILE,
                OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_STATE,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                SOURCE_EVIDENCE_FILE_COUNT,
                SOURCE_MATCHED_SNIPPET_COUNT,
                SOURCE_CHECK_COUNT,
                SOURCE_PASSED_CHECK_COUNT,
                SOURCE_PRODUCTION_BLOCKER_COUNT,
                SOURCE_WARNING_COUNT,
                SOURCE_RECOMMENDATION_COUNT,
                true,
                readyForNodeV260CredentialResolverDecisionRecord,
                true,
                readyForNodeV260CredentialResolverDecisionRecord
        );
    }

    private static ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord
    decisionRecord() {
        List<ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionField>
                requiredDecisionFields = requiredDecisionFields();
        List<ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverNoGoCondition>
                explicitNoGoConditions = explicitNoGoConditions();
        String decisionDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("recordMode", RECORD_MODE),
                ReleaseApprovalDigestSupport.line("decisionScope", DECISION_SCOPE),
                ReleaseApprovalDigestSupport.line("decisionStatus", DECISION_STATUS),
                ReleaseApprovalDigestSupport.line("endpointHandle", ENDPOINT_HANDLE),
                ReleaseApprovalDigestSupport.line("credentialHandle", CREDENTIAL_HANDLE),
                ReleaseApprovalDigestSupport.line("resolverPolicyHandle", RESOLVER_POLICY_HANDLE),
                ReleaseApprovalDigestSupport.line("approvalMarker", APPROVAL_MARKER),
                ReleaseApprovalDigestSupport.line("resolverMode", RESOLVER_MODE),
                ReleaseApprovalDigestSupport.line(
                        "resolverCandidateImplementation",
                        RESOLVER_CANDIDATE_IMPLEMENTATION
                ),
                ReleaseApprovalDigestSupport.line("requiredDecisionFields", requiredDecisionFields),
                ReleaseApprovalDigestSupport.line("explicitNoGoConditions", explicitNoGoConditions)
        ));
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxEndpointCredentialResolverDecisionRecord(
                decisionDigest,
                RECORD_MODE,
                DECISION_SCOPE,
                DECISION_STATUS,
                SOURCE_SPAN,
                ENDPOINT_HANDLE,
                CREDENTIAL_HANDLE,
                RESOLVER_POLICY_HANDLE,
                APPROVAL_MARKER,
                true,
                true,
                RESOLVER_MODE,
                RESOLVER_CANDIDATE_IMPLEMENTATION,
                REQUIRED_DECISION_FIELD_COUNT,
                EXPLICIT_NO_GO_CONDITION_COUNT,
                requiredDecisionFields,
                explicitNoGoConditions,
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

    private static List<ReleaseApprovalRehearsalResponse
            .RehearsalSandboxEndpointCredentialResolverDecisionField> requiredDecisionFields() {
        return List.of(
                decisionField(
                        "endpoint-handle",
                        "Confirm sandbox endpoint handle",
                        "Node v259 upstream echo",
                        "handle-aligned"
                ),
                decisionField(
                        "credential-handle",
                        "Confirm sandbox credential handle",
                        "Node v259 upstream echo",
                        "handle-aligned"
                ),
                decisionField(
                        "resolver-policy-handle",
                        "Name the credential resolver policy handle",
                        "operator decision",
                        "policy-handle-only"
                ),
                decisionField(
                        "approval-marker",
                        "Record credential resolver approval marker",
                        "operator decision",
                        "approval-marker-only"
                ),
                decisionField(
                        "operator-identity",
                        "Require verified operator identity",
                        "access guard",
                        "operator-header"
                ),
                decisionField(
                        "approval-correlation",
                        "Require approval correlation id",
                        "access guard",
                        "approval-correlation-header"
                ),
                decisionField(
                        "redaction-policy",
                        "Confirm credential and endpoint redaction policy",
                        "Node v259 policy review",
                        "redaction-reviewed"
                ),
                decisionField(
                        "fallback-rotation-plan",
                        "Record fallback and rotation plan handle",
                        "operator decision",
                        "plan-handle-only"
                )
        );
    }

    private static ReleaseApprovalRehearsalResponse
            .RehearsalSandboxEndpointCredentialResolverDecisionField decisionField(
            String id,
            String label,
            String expectedSource,
            String acceptedEvidence
    ) {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionField(
                id,
                label,
                expectedSource,
                acceptedEvidence,
                true,
                false
        );
    }

    private static List<ReleaseApprovalRehearsalResponse
            .RehearsalSandboxEndpointCredentialResolverNoGoCondition> explicitNoGoConditions() {
        return List.of(
                noGo("CREDENTIAL_VALUE_REQUIRED", "credential value would need to be read"),
                noGo("RAW_ENDPOINT_URL_REQUIRED", "raw endpoint URL would need to be parsed"),
                noGo("REAL_CONNECTION_REQUIRED", "managed audit connection would need to open"),
                noGo("EXTERNAL_REQUEST_REQUIRED", "external managed audit request would be sent"),
                noGo("SCHEMA_MIGRATION_REQUIRED", "schema migration would need to execute"),
                noGo("UPSTREAM_WRITE_REQUIRED", "upstream approval or audit record would be written"),
                noGo("AUTO_START_REQUIRED", "Java or mini-kv would need to be started"),
                noGo("MINI_KV_BACKEND_REQUIRED", "mini-kv would become managed audit storage"),
                noGo("PRODUCTION_WINDOW_REQUIRED", "production window would need to open")
        );
    }

    private static ReleaseApprovalRehearsalResponse
            .RehearsalSandboxEndpointCredentialResolverNoGoCondition noGo(
            String code,
            String description
    ) {
        return new ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverNoGoCondition(
                code,
                description,
                false
        );
    }

    private static ReleaseApprovalRehearsalResponse
            .RehearsalSandboxEndpointCredentialResolverSideEffectBoundary sideEffectBoundary() {
        return new ReleaseApprovalRehearsalResponse
                .RehearsalSandboxEndpointCredentialResolverSideEffectBoundary(
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
                false
        );
    }

    private static boolean sourceNodeV259Ready(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSourceEcho source
    ) {
        return OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_VERSION
                .equals(source.sourceVersion())
                && OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_PROFILE
                .equals(source.profileVersion())
                && OpsEvidenceService.NODE_V259_SANDBOX_ENDPOINT_HANDLE_UPSTREAM_ECHO_VERIFICATION_STATE
                .equals(source.verificationState())
                && source.readyForUpstreamEchoVerification()
                && source.endpointHandleAligned()
                && source.credentialHandleAligned()
                && source.reviewCountsAligned()
                && source.policyReviewsAligned()
                && source.operatorWindowAligned()
                && source.credentialBoundaryAligned()
                && source.rawEndpointBoundaryAligned()
                && source.connectionBoundaryAligned()
                && source.writeBoundaryAligned()
                && source.autoStartBoundaryAligned()
                && source.miniKvNonParticipationAligned()
                && source.nodeV259BlocksRealConnection()
                && source.evidenceFileCount() == SOURCE_EVIDENCE_FILE_COUNT
                && source.matchedSnippetCount() == SOURCE_MATCHED_SNIPPET_COUNT
                && source.checkCount() == SOURCE_CHECK_COUNT
                && source.passedCheckCount() == SOURCE_PASSED_CHECK_COUNT
                && source.productionBlockerCount() == SOURCE_PRODUCTION_BLOCKER_COUNT
                && source.warningCount() == SOURCE_WARNING_COUNT
                && source.recommendationCount() == SOURCE_RECOMMENDATION_COUNT
                && source.sourceNodeV258Ready()
                && source.javaV104Ready()
                && source.miniKvV113Ready()
                && source.readyForNodeV260CredentialResolverDecisionRecord();
    }

    private static boolean decisionFieldsEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return record.requiredDecisionFieldCount() == REQUIRED_DECISION_FIELD_COUNT
                && record.requiredDecisionFields().size() == REQUIRED_DECISION_FIELD_COUNT
                && record.requiredDecisionFields().stream()
                .map(ReleaseApprovalRehearsalResponse
                        .RehearsalSandboxEndpointCredentialResolverDecisionField::id)
                .toList()
                .equals(REQUIRED_DECISION_FIELD_IDS)
                && record.requiredDecisionFields().stream()
                .allMatch(field -> field.required() && !field.nodeMayReadValue());
    }

    private static boolean endpointHandleEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return ENDPOINT_HANDLE.equals(record.endpointHandle())
                && hasDecisionField(record, "endpoint-handle", "Node v259 upstream echo", "handle-aligned");
    }

    private static boolean credentialHandleEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return CREDENTIAL_HANDLE.equals(record.credentialHandle())
                && hasDecisionField(record, "credential-handle", "Node v259 upstream echo", "handle-aligned");
    }

    private static boolean resolverPolicyEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return RESOLVER_POLICY_HANDLE.equals(record.resolverPolicyHandle())
                && RESOLVER_MODE.equals(record.resolverMode())
                && RESOLVER_CANDIDATE_IMPLEMENTATION.equals(record.resolverCandidateImplementation())
                && hasDecisionField(record, "resolver-policy-handle", "operator decision", "policy-handle-only");
    }

    private static boolean approvalMarkerEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return APPROVAL_MARKER.equals(record.approvalMarker())
                && hasDecisionField(record, "approval-marker", "operator decision", "approval-marker-only");
    }

    private static boolean operatorIdentityRequirementEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return record.operatorIdentityRequired()
                && hasDecisionField(record, "operator-identity", "access guard", "operator-header");
    }

    private static boolean approvalCorrelationRequirementEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return record.approvalCorrelationRequired()
                && hasDecisionField(record, "approval-correlation", "access guard", "approval-correlation-header");
    }

    private static boolean redactionPolicyEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return hasDecisionField(record, "redaction-policy", "Node v259 policy review", "redaction-reviewed")
                && !record.credentialValueMayBeRead()
                && !record.credentialValueMayBeLoaded()
                && !record.credentialValueMayBeStored()
                && !record.rawEndpointUrlMayBeParsed();
    }

    private static boolean fallbackRotationPlanEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return hasDecisionField(record, "fallback-rotation-plan", "operator decision", "plan-handle-only");
    }

    private static boolean explicitNoGoConditionsEchoed(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record
    ) {
        return record.explicitNoGoConditionCount() == EXPLICIT_NO_GO_CONDITION_COUNT
                && record.explicitNoGoConditions().size() == EXPLICIT_NO_GO_CONDITION_COUNT
                && record.explicitNoGoConditions().stream()
                .map(ReleaseApprovalRehearsalResponse
                        .RehearsalSandboxEndpointCredentialResolverNoGoCondition::code)
                .toList()
                .equals(EXPLICIT_NO_GO_CONDITION_CODES)
                && record.explicitNoGoConditions().stream()
                .noneMatch(ReleaseApprovalRehearsalResponse
                        .RehearsalSandboxEndpointCredentialResolverNoGoCondition::allowed)
                && !record.managedAuditConnectionMayOpen()
                && !record.schemaMigrationMayExecute()
                && !record.externalRequestMayBeSent()
                && !record.nodeMayStartJavaOrMiniKv()
                && !record.miniKvMayActAsManagedAuditStorage()
                && !record.approvalLedgerMayBeWritten();
    }

    private static boolean hasDecisionField(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverDecisionRecord record,
            String id,
            String expectedSource,
            String acceptedEvidence
    ) {
        return record.requiredDecisionFields().stream()
                .anyMatch(field -> id.equals(field.id())
                        && expectedSource.equals(field.expectedSource())
                        && acceptedEvidence.equals(field.acceptedEvidence())
                        && field.required()
                        && !field.nodeMayReadValue());
    }

    private static boolean noCredentialConnectionWriteOrAutoStart(
            ReleaseApprovalRehearsalResponse.RehearsalSandboxEndpointCredentialResolverSideEffectBoundary boundary
    ) {
        return boundary.readOnlyDecisionRecord()
                && boundary.credentialResolverDecisionOnly()
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
                && !boundary.credentialValueIncluded()
                && !boundary.rawEndpointUrlParsed()
                && !boundary.rawEndpointUrlIncluded()
                && !boundary.externalRequestSent()
                && !boundary.schemaMigrationExecuted()
                && !boundary.automaticUpstreamStart()
                && !boundary.approvalLedgerWritten()
                && !boundary.javaStarted()
                && !boundary.miniKvStarted();
    }
}
