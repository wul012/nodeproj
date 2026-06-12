import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver fake harness readiness decision record", () => {
  it("archives a blocked readiness decision record without authorizing runtime shell planning", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record.v1",
      decisionRecordState: "fake-harness-readiness-decision-record-ready",
      readinessDecision: "blocked",
      readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord: true,
      readOnlyDecisionRecord: true,
      fakeHarnessReadinessDecisionOnly: true,
      consumesNodeV291ExecutionDeniedUpstreamEchoVerification: true,
      readyForDisabledRuntimeShellPlanning: false,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      testOnlyFakeHarnessExecutionAllowed: false,
      fakeHarnessRuntimeEnabled: false,
      fakeHarnessInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueProvided: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV291: {
        sourceVersion: "Node v291",
        verificationState: "blocked",
        readyForExecutionDeniedUpstreamEchoVerification: false,
        sourceSpan: "Node v290 + Java v127-v130 + mini-kv v128",
        sourceNodeV290Ready: true,
        javaV127V130QualityEvidenceReady: true,
        javaExecutionDeniedEchoMissing: true,
        javaExecutionDeniedEchoPresent: false,
        miniKvV128NonParticipationReady: true,
        miniKvPreflightDigestAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        sourceCheckCount: 19,
        sourcePassedCheckCount: 17,
        sourceProductionBlockerCount: 1,
        readOnlyUpstreamEchoVerification: true,
        executionDeniedUpstreamEchoVerificationOnly: true,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      readinessDecisionRecord: {
        recordMode: "credential-resolver-fake-harness-readiness-decision-record-only",
        decisionScope:
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness",
        sourceSpan: "Node v287-v291",
        decision: "blocked",
        allowsDisabledRuntimeShellPlanning: false,
        allowsFakeHarnessRuntimeImplementation: false,
        allowsFakeHarnessRuntimeInvocation: false,
        allowsRealResolverImplementation: false,
        allowsSecretProviderInstantiation: false,
        allowsResolverClientInstantiation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsManagedAuditConnection: false,
        allowsSchemaMigration: false,
        allowsApprovalLedgerWrite: false,
        allowsAutomaticUpstreamStart: false,
        requiredEvidenceCount: 4,
        noGoConditionCount: 8,
      },
      checks: {
        sourceNodeV291Loaded: true,
        sourceNodeV291BlockedAsExpected: true,
        sourceNodeV291StillBlocksRuntime: true,
        sourceNodeV291StillBlocksCredentialEndpoint: true,
        sourceNodeV291StillBlocksConnectionWritesAndAutoStart: true,
        nodeV290PreflightReady: true,
        javaQualityEvidencePresent: true,
        javaDirectExecutionDeniedEchoMissing: true,
        miniKvV128ReceiptReady: true,
        miniKvV128PreflightDigestAligned: true,
        sideEffectBoundariesClosed: true,
        readinessDecisionBlocksRuntimeShell: true,
        decisionRecordStillReadOnly: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord:
          true,
      },
      summary: {
        checkCount: 18,
        passedCheckCount: 18,
        requiredEvidenceCount: 4,
        missingRequiredEvidenceCount: 1,
        noGoConditionCount: 8,
        sourceCheckCount: 19,
        sourcePassedCheckCount: 17,
        sourceProductionBlockerCount: 1,
        productionBlockerCount: 1,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV291.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.readinessDecisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.readinessDecisionRecord.requiredEvidence.map((item) => [item.id, item.status])).toEqual([
      ["node-v290-execution-denied-route-preflight", "present"],
      ["java-v127-v130-quality-evidence", "present"],
      ["mini-kv-v128-execution-denied-receipt", "present"],
      ["java-direct-execution-denied-echo", "missing"],
    ]);
    expect(profile.readinessDecisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "JAVA_EXECUTION_DENIED_ECHO_MISSING",
    );
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("JAVA_EXECUTION_DENIED_ECHO_MISSING");
  });

  it("keeps the historical fixture fallback viable through the v291 source chain", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({
        config: loadTestConfig(),
      });

      expect(profile.decisionRecordState).toBe("fake-harness-readiness-decision-record-ready");
      expect(profile.sourceNodeV291.javaV127V130QualityEvidenceReady).toBe(true);
      expect(profile.sourceNodeV291.miniKvV128NonParticipationReady).toBe(true);
      expect(profile.sourceNodeV291.javaExecutionDeniedEchoMissing).toBe(true);
      expect(profile.summary.missingRequiredEvidenceCount).toBe(1);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });

  it("blocks the decision record if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionRecordState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.credentialValueRead).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record.v1",
        decisionRecordState: "fake-harness-readiness-decision-record-ready",
        readinessDecision: "blocked",
        readyForDisabledRuntimeShellPlanning: false,
        sourceNodeV291: {
          verificationState: "blocked",
          javaExecutionDeniedEchoMissing: true,
        },
        readinessDecisionRecord: {
          decision: "blocked",
          allowsDisabledRuntimeShellPlanning: false,
          allowsFakeHarnessRuntimeImplementation: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver fake harness readiness decision record",
      );
      expect(markdown.body).toContain("JAVA_EXECUTION_DENIED_ECHO_MISSING");
      expect(markdown.body).toContain("pause-and-do-not-plan-runtime-shell");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-292",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v292-fake-harness-readiness-decision-record",
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
    ...overrides,
  });
}
