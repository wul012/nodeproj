import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver fake harness readiness blocked decision upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v292 with Java v131 and mini-kv v129 without opening runtime execution", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification.v1",
      verificationState:
        "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      fakeHarnessReadinessBlockedDecisionVerificationOnly: true,
      consumesNodeV292FakeHarnessReadinessDecisionRecord: true,
      consumesJavaV131DirectExecutionDeniedEcho: true,
      consumesMiniKvV129ReceiptRetentionCheck: true,
      readyForDisabledRuntimeShellPlanning: false,
      realResolverImplementationAllowed: false,
      fakeHarnessRuntimeEnabled: false,
      fakeHarnessInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      resolverClientInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV292: {
        sourceVersion: "Node v292",
        decisionRecordState: "fake-harness-readiness-decision-record-ready",
        readinessDecision: "blocked",
        javaDirectExecutionDeniedEchoMissing: true,
        implementationStillBlocked: true,
        readyForDisabledRuntimeShellPlanning: false,
      },
      upstreamEvidence: {
        javaV131: {
          sourceVersion: "Java v131",
          evidencePresent: true,
          verificationDocumented: true,
          directExecutionDeniedEchoPresent: true,
          readyForNodeV293: true,
          echoMode: "java-v131-credential-resolver-direct-execution-denied-echo-only",
          noFakeHarnessRuntime: true,
          credentialValueBoundaryClosed: true,
          rawEndpointBoundaryClosed: true,
          ledgerSqlSchemaBoundaryClosed: true,
        },
        miniKvV129: {
          sourceVersion: "mini-kv v129",
          evidencePresent: true,
          verificationDocumented: true,
          releaseVersion: "v129",
          consumerHint: "Node v293 fake harness readiness blocked decision upstream echo verification",
          sourceNodeV292Ready: true,
          sourceNodeV292BlockedAsExpected: true,
          v128ReceiptDigestStable: true,
          readyForNodeV293: true,
          readOnly: true,
          executionAllowed: false,
          fakeHarnessRuntimeImplemented: false,
          fakeHarnessRuntimeInvoked: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          storageWriteAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          orderAuthoritative: false,
        },
      },
      echoVerification: {
        verificationMode:
          "node-v292-plus-java-v131-plus-mini-kv-v129-fake-harness-readiness-blocked-decision-upstream-echo-verification-only",
        sourceSpan: "Node v292 + Java v131 + mini-kv v129",
        sourceNodeV292Ready: true,
        javaV131EchoReady: true,
        miniKvV129RetentionReady: true,
        blockedDecisionAligned: true,
        missingJavaEchoResolved: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForDisabledRuntimeShellPlanning: false,
      },
      checks: {
        sourceNodeV292Ready: true,
        sourceNodeV292KeepsReadinessBlocked: true,
        sourceNodeV292KeepsRuntimeShellBlocked: true,
        javaV131EvidencePresent: true,
        javaV131DirectExecutionDeniedEchoReady: true,
        miniKvV129EvidencePresent: true,
        miniKvV129RetentionCheckReady: true,
        blockedDecisionAligned: true,
        missingJavaEchoResolvedByJavaV131: true,
        sideEffectBoundariesClosed: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
      },
      summary: {
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEvidence.miniKvV129.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("uses committed historical fixture fallback for Java v131 and mini-kv v129", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe(
      "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready",
    );
    expect(profile.upstreamEvidence.javaV131.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV129.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(normalizePath(profile.upstreamEvidence.javaV131.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/131/解释/说明.md",
    );
    expect(normalizePath(profile.upstreamEvidence.miniKvV129.evidenceFiles[0]?.resolvedPath ?? "")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-receipt-verification-retention-check.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification.v1",
        verificationState:
          "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready",
        upstreamEvidence: {
          javaV131: {
            readyForNodeV293: true,
          },
          miniKvV129: {
            readyForNodeV293: true,
            releaseVersion: "v129",
          },
        },
        checks: {
          missingJavaEchoResolvedByJavaV131: true,
          sideEffectBoundariesClosed: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver fake harness readiness blocked decision upstream echo verification",
      );
      expect(markdown.body).toContain("fake-harness-readiness-blocked-decision-upstream-echo-verification-ready");
      expect(markdown.body).toContain("RUN_V294_DISABLED_RUNTIME_SHELL_PRE_PLAN_INTAKE");
    } finally {
      await app.close();
    }
  }, 45000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-293",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v293-fake-harness-readiness-blocked-decision-upstream-echo",
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
    PORT: "4369",
    ...overrides,
  });
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}
