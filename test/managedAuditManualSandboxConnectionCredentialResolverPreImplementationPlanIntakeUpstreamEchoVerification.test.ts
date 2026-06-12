import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver pre-implementation plan intake upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v270 plan intake with Java v112 and mini-kv v119", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1",
      verificationState:
        "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      planIntakeEchoVerificationOnly: true,
      readyForCredentialResolverPreImplementationPlan: true,
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
      sourceNodeV270: {
        sourceVersion: "Node v270",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
        planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
        readyForPlanIntake: true,
        planIntakeOnly: true,
        readOnlyPlanIntake: true,
        readyForCredentialResolverPreImplementationPlan: true,
        readyForManagedAuditSandboxAdapterConnection: false,
        realResolverImplementationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
        sourceNodeV269Ready: true,
        sourceNodeV269KeepsBlockedDecision: true,
        sourceNodeV269KeepsRealResolverBlocked: true,
        planVersion: "node-v270-credential-resolver-pre-implementation-plan-intake.v1",
        planMode: "plan-intake-only",
        boundaryCount: 10,
        definedBoundaryCount: 10,
        missingBoundaryCount: 0,
        checkCount: 26,
        passedCheckCount: 26,
        sourceCheckCount: 22,
        sourcePassedCheckCount: 22,
        productionBlockerCount: 0,
      },
      upstreamEchoes: {
        javaV112: {
          sourceVersion: "Java v112",
          consumedNodeVersion: "Node v270",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
          nextNodeConsumerVersion: "Node v272",
          planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
          checkCount: 26,
          passedCheckCount: 26,
          sourceCheckCount: 22,
          sourcePassedCheckCount: 22,
          boundaryCount: 10,
          definedBoundaryCount: 10,
          missingBoundaryCount: 0,
          productionBlockerCount: 0,
          boundaryCodesEchoed: true,
          requirementCodesEchoed: true,
          planIntakeEchoed: true,
          sideEffectBoundaryEchoed: true,
          readyForNodeV272Alignment: true,
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
        miniKvV119: {
          sourceVersion: "mini-kv v119",
          receiptVersion:
            "mini-kv-credential-resolver-pre-implementation-plan-intake-non-participation-receipt.v1",
          releaseVersion: "v119",
          consumerHint: "Node v272 credential resolver pre-implementation intake upstream echo verification",
          sourceProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1",
          sourcePlanIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
          sourceReadyForPlanIntake: true,
          sourcePlanIntakeOnly: true,
          sourceReadOnlyPlanIntake: true,
          sourceReadyForCredentialResolverPreImplementationPlan: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceRealResolverImplementationAllowed: false,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceCredentialValueRead: false,
          sourceRawEndpointUrlParsed: false,
          sourceExternalRequestSent: false,
          planVersion: "node-v270-credential-resolver-pre-implementation-plan-intake.v1",
          planMode: "plan-intake-only",
          boundaryCount: 10,
          definedBoundaryCount: 10,
          missingBoundaryCount: 0,
          checkCount: 26,
          passedCheckCount: 26,
          sourceCheckCount: 22,
          sourcePassedCheckCount: 22,
          productionBlockerCount: 0,
          readOnly: true,
          executionAllowed: false,
          planIntakeOnly: true,
          readOnlyPlanIntake: true,
          receiptOnly: true,
          readyForCredentialResolverPreImplementationPlan: true,
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
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          automaticUpstreamStartAllowed: false,
          automaticUpstreamStart: false,
          managedAuditStorageBackend: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          readyForNodeV272Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v112-plus-mini-kv-v119-plan-intake-upstream-echo-verification-only",
        sourceSpan: "Node v270 + Java v112 + mini-kv v119",
        sourceNodeV270Ready: true,
        javaV112EchoReady: true,
        miniKvV119NonParticipationReady: true,
        planIntakeStateAligned: true,
        planCountsAligned: true,
        boundaryCodesAligned: true,
        requirementCodesAligned: true,
        planIntakeVersionsAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV272KeepsRealResolverBlocked: true,
      },
      checks: {
        sourceNodeV270Ready: true,
        sourceNodeV270KeepsPlanIntakeOnly: true,
        sourceNodeV270KeepsRealResolverBlocked: true,
        javaV112EchoReady: true,
        miniKvV119NonParticipationReady: true,
        planIntakeStateAligned: true,
        planCountsAligned: true,
        boundaryCodesAligned: true,
        requirementCodesAligned: true,
        planIntakeVersionsAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        realResolverImplementationStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification: true,
      },
      summary: {
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        boundaryCount: 10,
        definedBoundaryCount: 10,
        missingBoundaryCount: 0,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV270.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV270.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV119.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.sourceNodeV270.boundaryCodes).toEqual([
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
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(8);
    expect(profile.summary.matchedSnippetCount).toBe(68);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe(
      "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
    );
    expect(profile.upstreamEchoes.javaV112.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV119.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV112.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/112/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV119.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-pre-implementation-plan-intake-non-participation-receipt.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeUpstreamEchoVerification)
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
          "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        sourceNodeV270: {
          planIntakeState: "credential-resolver-pre-implementation-plan-intake-ready",
          boundaryCount: 10,
          missingBoundaryCount: 0,
        },
        upstreamEchoes: {
          javaV112: {
            nextNodeConsumerVersion: "Node v272",
            readyForNodeV272Alignment: true,
          },
          miniKvV119: {
            releaseVersion: "v119",
            readyForNodeV272Alignment: true,
            credentialResolverImplemented: false,
            resolverClientInstantiated: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          planCountsAligned: true,
          boundaryCodesAligned: true,
          requirementCodesAligned: true,
          resolverBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver pre-implementation plan intake upstream echo verification",
      );
      expect(markdown.body).toContain(
        "credential-resolver-pre-implementation-plan-intake-upstream-echo-verification-ready",
      );
      expect(markdown.body).toContain("ARCHIVE_V272_AND_CLOSE_PLAN");
      expect(markdown.body).toContain("WRITE_NEXT_PLAN_BEFORE_RESOLVER_WORK");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-272",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v272-credential-resolver-plan-intake-upstream-echo-verification",
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
