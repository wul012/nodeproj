import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver disabled candidate upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v273 disabled candidate with Java v113 and mini-kv v120", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1",
      verificationState: "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      disabledCandidateEchoVerificationOnly: true,
      readyForDisabledResolverInterfaceCandidate: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV273: {
        sourceVersion: "Node v273",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1",
        reviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
        readyForDisabledImplementationCandidateReview: true,
        disabledImplementationCandidateReviewOnly: true,
        readOnlyCandidateReview: true,
        readyForDisabledResolverInterfaceCandidate: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        readyForProductionAudit: false,
        readyForProductionWindow: false,
        readyForProductionOperations: false,
        realResolverImplementationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        storesManagedAuditCredential: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
        sourceNodeV272Ready: true,
        sourceNodeV272KeepsReadOnlyEchoOnly: true,
        sourceNodeV272KeepsRealResolverBlocked: true,
        sourceNodeV272KeepsBoundaryAlignment: true,
        candidateVersion: "node-v273-credential-resolver-disabled-implementation-candidate-review.v1",
        candidateMode: "disabled-interface-and-fake-wiring-review-only",
        candidateDigest: "12862fa65cad3a8db92f88fba86b74c25e584f35614c7a47367d441358b8b7d7",
        candidateDecisionCount: 10,
        candidateReadyDecisionCount: 4,
        approvalRequiredDecisionCount: 6,
        candidateReadyBoundaryCodes: [
          "PLAN_DOCUMENT",
          "DISABLED_SECRET_PROVIDER_STUB",
          "REDACTION_POLICY",
          "EXTERNAL_REQUEST_SIMULATION",
        ],
        approvalRequiredBoundaryCodes: [
          "CREDENTIAL_HANDLE",
          "ENDPOINT_HANDLE",
          "OPERATOR_APPROVAL",
          "ROLLBACK_BOUNDARY",
          "SCHEMA_MIGRATION_POLICY",
          "AUDIT_LEDGER_WRITE_POLICY",
        ],
        boundaryCodes: [
          "PLAN_DOCUMENT",
          "CREDENTIAL_HANDLE",
          "ENDPOINT_HANDLE",
          "DISABLED_SECRET_PROVIDER_STUB",
          "OPERATOR_APPROVAL",
          "ROLLBACK_BOUNDARY",
          "REDACTION_POLICY",
          "EXTERNAL_REQUEST_SIMULATION",
          "SCHEMA_MIGRATION_POLICY",
          "AUDIT_LEDGER_WRITE_POLICY",
        ],
        requirementCodes: [
          "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
          "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
          "ENDPOINT_HANDLE_BOUNDARY_MISSING",
          "SECRET_PROVIDER_STUB_MISSING",
          "OPERATOR_APPROVAL_BOUNDARY_MISSING",
          "ROLLBACK_BOUNDARY_MISSING",
          "REDACTION_POLICY_MISSING",
          "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
          "SCHEMA_MIGRATION_POLICY_MISSING",
          "AUDIT_LEDGER_WRITE_POLICY_MISSING",
        ],
        requestFields: [
          "credentialHandle",
          "endpointHandle",
          "resolverPolicyHandle",
          "operatorIdentity",
          "approvalCorrelationId",
          "manualWindowMarker",
        ],
        responseFields: [
          "resolverState",
          "resolvedCredentialValue",
          "rawEndpointUrl",
          "redactionApplied",
          "externalRequestSent",
          "failureClass",
          "auditDigest",
        ],
        failureClasses: [
          "disabled-by-config",
          "missing-credential-handle",
          "missing-endpoint-handle",
          "operator-approval-required",
          "manual-window-required",
          "real-runtime-forbidden",
        ],
        handleOnlyRequest: true,
        includesCredentialValue: false,
        includesRawEndpointUrl: false,
        fakeWiringReviewOnly: true,
        fakeRuntimeInstantiated: false,
        checkCount: 21,
        passedCheckCount: 21,
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
      upstreamEchoes: {
        javaV113: {
          sourceVersion: "Java v113",
          consumedNodeVersion: "Node v273",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1",
          nextNodeConsumerVersion: "Node v274",
          reviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
          checkCount: 21,
          passedCheckCount: 21,
          sourceCheckCount: 22,
          sourcePassedCheckCount: 22,
          candidateDecisionCount: 10,
          candidateReadyDecisionCount: 4,
          approvalRequiredDecisionCount: 6,
          requestFieldCount: 6,
          responseFieldCount: 7,
          failureClassCount: 6,
          boundaryCodesEchoed: true,
          requirementCodesEchoed: true,
          candidateReadyBoundaryCodesEchoed: true,
          approvalRequiredBoundaryCodesEchoed: true,
          interfaceShapeEchoed: true,
          fakeWiringEchoed: true,
          sideEffectBoundaryEchoed: true,
          echoWorkflowTemplateApplied: true,
          readyForNodeV274Alignment: true,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          connectsManagedAudit: false,
          approvalLedgerWritten: false,
          sqlExecuted: false,
          schemaMigrationExecuted: false,
          automaticUpstreamStart: false,
          readyForManagedAuditSandboxAdapterConnection: false,
        },
        miniKvV120: {
          sourceVersion: "mini-kv v120",
          releaseVersion: "v120",
          consumerHint: "Node v274 credential resolver disabled candidate upstream echo verification",
          sourceProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-disabled-implementation-candidate-review.v1",
          sourceReviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
          sourceReadyForDisabledImplementationCandidateReview: true,
          sourceDisabledImplementationCandidateReviewOnly: true,
          sourceReadOnlyCandidateReview: true,
          sourceReadyForDisabledResolverInterfaceCandidate: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceRealResolverImplementationAllowed: false,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceReadsManagedAuditCredential: false,
          sourceStoresManagedAuditCredential: false,
          sourceCredentialValueRead: false,
          sourceRawEndpointUrlParsed: false,
          sourceExternalRequestSent: false,
          sourceSecretProviderInstantiated: false,
          sourceResolverClientInstantiated: false,
          sourceSchemaMigrationExecuted: false,
          sourceApprovalLedgerWritten: false,
          sourceAutomaticUpstreamStart: false,
          sourceNodeV272Ready: true,
          sourceNodeV272Digest: "af7613ac0245fbc1b1ed709b5ea73d7907ab3b84918939c54f57e194446df6f1",
          sourceNodeV272BoundaryCodes: [
            "PLAN_DOCUMENT",
            "CREDENTIAL_HANDLE",
            "ENDPOINT_HANDLE",
            "DISABLED_SECRET_PROVIDER_STUB",
            "OPERATOR_APPROVAL",
            "ROLLBACK_BOUNDARY",
            "REDACTION_POLICY",
            "EXTERNAL_REQUEST_SIMULATION",
            "SCHEMA_MIGRATION_POLICY",
            "AUDIT_LEDGER_WRITE_POLICY",
          ],
          sourceNodeV272RequirementCodes: [
            "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
            "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
            "ENDPOINT_HANDLE_BOUNDARY_MISSING",
            "SECRET_PROVIDER_STUB_MISSING",
            "OPERATOR_APPROVAL_BOUNDARY_MISSING",
            "ROLLBACK_BOUNDARY_MISSING",
            "REDACTION_POLICY_MISSING",
            "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
            "SCHEMA_MIGRATION_POLICY_MISSING",
            "AUDIT_LEDGER_WRITE_POLICY_MISSING",
          ],
          candidateVersion: "node-v273-credential-resolver-disabled-implementation-candidate-review.v1",
          candidateMode: "disabled-interface-and-fake-wiring-review-only",
        candidateDigest: "12862fa65cad3a8db92f88fba86b74c25e584f35614c7a47367d441358b8b7d7",
          candidateDecisionCount: 10,
          candidateReadyDecisionCount: 4,
          approvalRequiredDecisionCount: 6,
          candidateReadyBoundaryCodes: [
            "PLAN_DOCUMENT",
            "DISABLED_SECRET_PROVIDER_STUB",
            "REDACTION_POLICY",
            "EXTERNAL_REQUEST_SIMULATION",
          ],
          approvalRequiredBoundaryCodes: [
            "CREDENTIAL_HANDLE",
            "ENDPOINT_HANDLE",
            "OPERATOR_APPROVAL",
            "ROLLBACK_BOUNDARY",
            "SCHEMA_MIGRATION_POLICY",
            "AUDIT_LEDGER_WRITE_POLICY",
          ],
          requestFieldCount: 6,
          responseFieldCount: 7,
          failureClassCount: 6,
          handleOnlyRequest: true,
          includesCredentialValue: false,
          includesRawEndpointUrl: false,
          sendsExternalRequest: false,
          instantiatesSecretProvider: false,
          instantiatesResolverClient: false,
          fakeWiringReviewOnly: true,
          fakeRuntimeInstantiated: false,
          realSecretProviderAllowed: false,
          realManagedAuditTransportAllowed: false,
          checkCount: 21,
          passedCheckCount: 21,
          sourceCheckCount: 22,
          sourcePassedCheckCount: 22,
          productionBlockerCount: 0,
          warningCount: 2,
          recommendationCount: 2,
          readOnly: true,
          executionAllowed: false,
          disabledImplementationCandidateReviewOnly: true,
          readOnlyCandidateReview: true,
          receiptOnly: true,
          readyForDisabledResolverInterfaceCandidate: true,
          readyForManagedAuditSandboxAdapterConnection: false,
          realResolverImplementationAllowed: false,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          secretProviderRuntimeAllowed: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          rawEndpointUrlParseAllowed: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          externalRequestAllowed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          readsManagedAuditCredential: false,
          storesManagedAuditCredential: false,
          storageWriteAllowed: false,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          approvalLedgerWriteAllowed: false,
          approvalLedgerWritten: false,
          managedAuditWriteExecuted: false,
          schemaMigrationAllowed: false,
          schemaMigrationExecuted: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          automaticUpstreamStartAllowed: false,
          automaticUpstreamStart: false,
          managedAuditStorageBackend: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          readyForNodeV274Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v113-plus-mini-kv-v120-disabled-candidate-upstream-echo-verification-only",
        sourceSpan: "Node v273 + Java v113 + mini-kv v120",
        sourceNodeV273Ready: true,
        javaV113EchoReady: true,
        miniKvV120NonParticipationReady: true,
        candidateCountsAligned: true,
        boundaryScopesAligned: true,
        interfaceShapeAligned: true,
        fakeWiringAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        javaEchoWorkflowTemplateApplied: true,
        nodeV274KeepsRealResolverBlocked: true,
      },
      checks: {
        sourceNodeV273Ready: true,
        sourceNodeV273KeepsReviewOnly: true,
        sourceNodeV273KeepsRealResolverBlocked: true,
        sourceNodeV273KeepsBoundaryAlignment: true,
        javaV113EchoReady: true,
        miniKvV120NonParticipationReady: true,
        candidateCountsAligned: true,
        boundaryCodesAligned: true,
        candidateReadyBoundaryCodesAligned: true,
        approvalRequiredBoundaryCodesAligned: true,
        interfaceShapeAligned: true,
        fakeWiringAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        javaEchoWorkflowTemplateApplied: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        realResolverImplementationStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification: true,
      },
      summary: {
        checkCount: 25,
        passedCheckCount: 25,
        evidenceFileCount: 11,
        matchedSnippetCount: 81,
        sourceCheckCount: 21,
        sourcePassedCheckCount: 21,
        candidateDecisionCount: 10,
        candidateReadyDecisionCount: 4,
        approvalRequiredDecisionCount: 6,
        requestFieldCount: 6,
        responseFieldCount: 7,
        failureClassCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV273.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV120.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(11);
    expect(profile.summary.matchedSnippetCount).toBe(81);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("credential-resolver-disabled-candidate-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV113.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV120.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV113.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/113/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV120.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-implementation-candidate-non-participation-receipt.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.realResolverImplementationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        sourceNodeV273: {
          reviewState: "credential-resolver-disabled-implementation-candidate-review-ready",
          candidateDecisionCount: 10,
          candidateReadyDecisionCount: 4,
          approvalRequiredDecisionCount: 6,
        },
        upstreamEchoes: {
          javaV113: {
            nextNodeConsumerVersion: "Node v274",
            readyForNodeV274Alignment: true,
          },
          miniKvV120: {
            releaseVersion: "v120",
            readyForNodeV274Alignment: true,
            credentialResolverImplemented: false,
            resolverClientInstantiated: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          candidateCountsAligned: true,
          interfaceShapeAligned: true,
          javaEchoWorkflowTemplateApplied: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled candidate upstream echo verification",
      );
      expect(markdown.body).toContain(
        "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
      );
      expect(markdown.body).toContain("ARCHIVE_V274_AND_CLOSE_V272_DERIVED_PLAN");
      expect(markdown.body).toContain("WRITE_SUCCESSOR_PLAN_BEFORE_RUNTIME_RESOLVER");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-274",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v274-credential-resolver-disabled-candidate-upstream-echo-verification",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4372",
    ...overrides,
  });
}
