package com.codexdemo.orderplatform.ops;

import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellProbe;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellRequestShape;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellResponseShape;
import com.codexdemo.orderplatform.ops.ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellEchoRecords
        .RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho;

import java.util.List;

final class ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder {

    private static final String SHELL_MODE = "test-only-fake-resolver-contract";
    private static final String SHELL_NAME = "ManagedAuditSandboxEndpointCredentialResolverTestOnlyShell";
    private static final String RESOLVER_KIND = "fake-in-memory";
    private static final String PROBE_REQUEST_ID = "managed-audit-v264-test-only-resolver-shell-probe";
    private static final String PROBE_RESPONSE_STATUS = "fake-resolver-accepted";
    private static final String PROBE_RESPONSE_CODE = "TEST_ONLY_FAKE_RESOLVER";

    private static final List<String> REQUEST_SHAPE_FIELDS = List.of(
            "requestId",
            "operation",
            "credentialHandle",
            "endpointHandle",
            "resolverPolicyHandle",
            "approvalMarker",
            "approvalCorrelationId",
            "dryRun",
            "fakeResolverOnly"
    );

    private static final List<String> RESPONSE_SHAPE_FIELDS = List.of(
            "requestId",
            "status",
            "code",
            "fakeResolverOnly",
            "resolverClientInstantiated",
            "secretProviderInstantiated",
            "credentialValueRead",
            "credentialValueLoaded",
            "rawEndpointUrlParsed",
            "externalRequestSent",
            "connectsManagedAudit",
            "schemaMigrationExecuted",
            "productionRecordWritten"
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

    private static final List<String> GUARD_CONDITION_CODES = List.of(
            "SOURCE_V263_READY",
            "FAKE_RESOLVER_ONLY",
            "CREDENTIAL_HANDLE_ONLY",
            "ENDPOINT_HANDLE_ONLY",
            "RESOLVER_POLICY_HANDLE_REQUIRED",
            "APPROVAL_MARKER_REQUIRED",
            "UPSTREAM_ACTIONS_DISABLED",
            "NO_SECRET_PROVIDER",
            "NO_EXTERNAL_REQUEST",
            "NO_SCHEMA_MIGRATION"
    );

    private ReleaseApprovalSandboxEndpointCredentialResolverTestOnlyShellContractBuilder() {
    }

    static String shellMode() {
        return SHELL_MODE;
    }

    static String resolverKind() {
        return RESOLVER_KIND;
    }

    static List<String> requestShapeFields() {
        return REQUEST_SHAPE_FIELDS;
    }

    static List<String> responseShapeFields() {
        return RESPONSE_SHAPE_FIELDS;
    }

    static List<String> failureClassCodes() {
        return FAILURE_CLASS_CODES;
    }

    static List<String> guardConditionCodes() {
        return GUARD_CONDITION_CODES;
    }

    static RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract build(
            RehearsalSandboxEndpointCredentialResolverTestOnlyShellSourceEcho sourceNodeV263
    ) {
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellRequestShape requestShape = requestShape();
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellResponseShape responseShape = responseShape();
        List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping> failureMapping =
                failureMapping();
        List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition> guardConditions =
                guardConditions();
        RehearsalSandboxEndpointCredentialResolverTestOnlyShellProbe fakeResolverProbe =
                fakeResolverProbe();
        String contractDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("shellName", SHELL_NAME),
                ReleaseApprovalDigestSupport.line("shellMode", SHELL_MODE),
                ReleaseApprovalDigestSupport.line("resolverKind", RESOLVER_KIND),
                ReleaseApprovalDigestSupport.line("requestShape", requestShape),
                ReleaseApprovalDigestSupport.line("responseShape", responseShape),
                ReleaseApprovalDigestSupport.line("failureMapping", failureMapping),
                ReleaseApprovalDigestSupport.line("guardConditions", guardConditions),
                ReleaseApprovalDigestSupport.line("fakeResolverProbe", fakeResolverProbe),
                ReleaseApprovalDigestSupport.line(
                        "sourceReady",
                        sourceNodeV263.readyForNodeV264CredentialResolverTestOnlyShellContract()
                )
        ));
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract(
                contractDigest,
                SHELL_NAME,
                SHELL_MODE,
                RESOLVER_KIND,
                false,
                false,
                true,
                false,
                false,
                false,
                false,
                false,
                REQUEST_SHAPE_FIELDS.size(),
                RESPONSE_SHAPE_FIELDS.size(),
                FAILURE_CLASS_CODES.size(),
                GUARD_CONDITION_CODES.size(),
                requestShape,
                responseShape,
                failureMapping,
                guardConditions,
                fakeResolverProbe
        );
    }

    static boolean noEffects(RehearsalSandboxEndpointCredentialResolverTestOnlyShellContract contract) {
        return SHELL_NAME.equals(contract.shellName())
                && SHELL_MODE.equals(contract.shellMode())
                && RESOLVER_KIND.equals(contract.resolverKind())
                && !contract.realResolverImplemented()
                && !contract.realSecretProviderAllowed()
                && contract.fakeResolverOnly()
                && !contract.resolverClientMayBeInstantiatedForProduction()
                && !contract.secretProviderMayBeInstantiated()
                && !contract.credentialValueMayBeLoaded()
                && !contract.rawEndpointUrlMayBeParsed()
                && !contract.externalRequestMayBeSent()
                && requestShapeReady(contract.requestShape())
                && responseShapeReady(contract.responseShape())
                && failureMappingReady(contract.failureMapping())
                && guardConditionsReady(contract.guardConditions())
                && fakeResolverProbeReady(contract.fakeResolverProbe());
    }

    static boolean requestShapeReady(
            RehearsalSandboxEndpointCredentialResolverTestOnlyShellRequestShape requestShape
    ) {
        return requestShape.fields().equals(REQUEST_SHAPE_FIELDS)
                && requestShape.credentialHandleOnly()
                && !requestShape.credentialValueAccepted()
                && requestShape.endpointHandleOnly()
                && !requestShape.rawEndpointUrlAccepted()
                && requestShape.resolverPolicyHandleRequired()
                && requestShape.approvalMarkerRequired()
                && !requestShape.payloadMayContainSecrets();
    }

    static boolean responseShapeReady(
            RehearsalSandboxEndpointCredentialResolverTestOnlyShellResponseShape responseShape
    ) {
        return responseShape.fields().equals(RESPONSE_SHAPE_FIELDS)
                && responseShape.fakeResolverResponseOnly()
                && !responseShape.resolverClientInstantiated()
                && !responseShape.secretProviderInstantiated()
                && !responseShape.credentialValueRead()
                && !responseShape.credentialValueLoaded()
                && !responseShape.rawEndpointUrlParsed()
                && !responseShape.externalRequestSent()
                && !responseShape.connectsManagedAudit()
                && !responseShape.schemaMigrationExecuted()
                && !responseShape.productionRecordWritten();
    }

    static boolean failureMappingReady(
            List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping> failureMapping
    ) {
        return failureMapping.size() == FAILURE_CLASS_CODES.size()
                && failureMapping.stream()
                .map(RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping::sourceFailureCode)
                .toList()
                .equals(FAILURE_CLASS_CODES)
                && failureMapping.stream().allMatch(mapping -> !mapping.retryable());
    }

    static boolean guardConditionsReady(
            List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition> guardConditions
    ) {
        return guardConditions.size() == GUARD_CONDITION_CODES.size()
                && guardConditions.stream()
                .map(RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition::code)
                .toList()
                .equals(GUARD_CONDITION_CODES)
                && guardConditions.stream().allMatch(condition -> condition.required() && condition.value());
    }

    static boolean fakeResolverProbeReady(
            RehearsalSandboxEndpointCredentialResolverTestOnlyShellProbe probe
    ) {
        return PROBE_REQUEST_ID.equals(probe.requestId())
                && RESOLVER_KIND.equals(probe.resolverKind())
                && probe.acceptedByFakeResolver()
                && PROBE_RESPONSE_STATUS.equals(probe.responseStatus())
                && PROBE_RESPONSE_CODE.equals(probe.responseCode())
                && !probe.resolverClientInstantiated()
                && !probe.secretProviderInstantiated()
                && !probe.credentialValueRead()
                && !probe.credentialValueLoaded()
                && !probe.rawEndpointUrlParsed()
                && !probe.externalRequestSent()
                && !probe.connectsManagedAudit()
                && !probe.schemaMigrationExecuted()
                && !probe.productionRecordWritten();
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellRequestShape requestShape() {
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellRequestShape(
                REQUEST_SHAPE_FIELDS,
                true,
                false,
                true,
                false,
                true,
                true,
                false
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellResponseShape responseShape() {
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellResponseShape(
                RESPONSE_SHAPE_FIELDS,
                true,
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

    private static List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping> failureMapping() {
        return FAILURE_CLASS_CODES.stream()
                .map(code -> new RehearsalSandboxEndpointCredentialResolverTestOnlyShellFailureMapping(
                        code,
                        "TEST_ONLY_" + code,
                        "RESOLVER_DISABLED".equals(code) ? "return-fake-failure" : "pause-and-do-not-resolve",
                        false
                ))
                .toList();
    }

    private static List<RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition> guardConditions() {
        return List.of(
                guard("SOURCE_V263_READY", "Node v263 disabled precheck upstream echo verification must be ready."),
                guard("FAKE_RESOLVER_ONLY", "Only fake in-memory resolver is allowed in v264."),
                guard("CREDENTIAL_HANDLE_ONLY", "Requests may carry credential handles only, never credential values."),
                guard("ENDPOINT_HANDLE_ONLY", "Requests may carry endpoint handles only, never raw endpoint URLs."),
                guard("RESOLVER_POLICY_HANDLE_REQUIRED", "Resolver policy handle must be present as a handle only."),
                guard("APPROVAL_MARKER_REQUIRED", "Approval marker must be present before any later resolver work."),
                guard("UPSTREAM_ACTIONS_DISABLED", "UPSTREAM_ACTIONS_ENABLED must stay false."),
                guard("NO_SECRET_PROVIDER", "The test-only shell must not instantiate a secret provider."),
                guard("NO_EXTERNAL_REQUEST", "The test-only shell must not send external managed audit requests."),
                guard("NO_SCHEMA_MIGRATION", "The test-only shell must not execute schema migration SQL.")
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition guard(
            String code,
            String message
    ) {
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellGuardCondition(
                code,
                true,
                true,
                message
        );
    }

    private static RehearsalSandboxEndpointCredentialResolverTestOnlyShellProbe fakeResolverProbe() {
        String probeDigest = ReleaseApprovalDigestSupport.digest(List.of(
                ReleaseApprovalDigestSupport.line("requestId", PROBE_REQUEST_ID),
                ReleaseApprovalDigestSupport.line("resolverKind", RESOLVER_KIND),
                ReleaseApprovalDigestSupport.line("responseCode", PROBE_RESPONSE_CODE),
                ReleaseApprovalDigestSupport.line("credentialValueRead", false),
                ReleaseApprovalDigestSupport.line("externalRequestSent", false),
                ReleaseApprovalDigestSupport.line("productionRecordWritten", false)
        ));
        return new RehearsalSandboxEndpointCredentialResolverTestOnlyShellProbe(
                PROBE_REQUEST_ID,
                RESOLVER_KIND,
                true,
                PROBE_RESPONSE_STATUS,
                PROBE_RESPONSE_CODE,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                probeDigest
        );
    }
}
