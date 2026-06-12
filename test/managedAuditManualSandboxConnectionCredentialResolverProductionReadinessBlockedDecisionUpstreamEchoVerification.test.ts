import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver production readiness blocked decision upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies the Node v268 blocked decision with Java v111 and mini-kv v118", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1",
      verificationState:
        "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      blockedDecisionVerificationOnly: true,
      readyForCredentialResolverPreImplementationPlan: false,
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
      automaticUpstreamStart: false,
      sourceNodeV268: {
        sourceVersion: "Node v268",
        profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1",
        decisionGateState: "blocked",
        readinessDecision: "blocked",
        decisionMode: "node-v268-production-readiness-decision-gate-only",
        sourceSpan: "Node v267",
        decisionGateEvaluated: true,
        productionReadinessGateOnly: true,
        readOnlyDecisionGate: true,
        sourceNodeV267Ready: true,
        sourceNodeV267BlocksRealResolver: true,
        archiveEchoChainReady: true,
        checkCount: 25,
        passedCheckCount: 15,
        sourceCheckCount: 18,
        sourcePassedCheckCount: 18,
        archiveFileCount: 9,
        evidenceFileCount: 7,
        requiredSnippetCount: 24,
        matchedSnippetCount: 32,
        missingPreImplementationRequirementCount: 10,
        productionBlockerCount: 10,
        warningCount: 2,
        recommendationCount: 2,
        readyForCredentialResolverPreImplementationPlan: false,
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
        automaticUpstreamStart: false,
      },
      upstreamEchoes: {
        javaV111: {
          sourceVersion: "Java v111",
          consumedNodeVersion: "Node v268",
          consumedNodeProfile:
            "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1",
          nextNodeConsumerVersion: "Node v269",
          readinessDecision: "blocked",
          checkCount: 25,
          passedCheckCount: 15,
          sourceCheckCount: 18,
          sourcePassedCheckCount: 18,
          archiveFileCount: 9,
          evidenceFileCount: 7,
          requiredSnippetCount: 24,
          matchedSnippetCount: 32,
          missingPreImplementationRequirementCount: 10,
          productionBlockerCount: 10,
          blockerCodesEchoed: true,
          blockedDecisionEchoed: true,
          preImplementationRequirementsEchoed: true,
          sideEffectBoundaryEchoed: true,
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
          readyForNodeV269Alignment: true,
        },
        miniKvV118: {
          sourceVersion: "mini-kv v118",
          receiptVersion:
            "mini-kv-credential-resolver-production-readiness-blocked-decision-non-participation-receipt.v1",
          releaseVersion: "v118",
          consumerHint: "Node v269 credential resolver production-readiness blocked-decision upstream echo verification",
          sourceProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1",
          sourceDecisionGateState: "blocked",
          sourceReadinessDecision: "blocked",
          sourceDecisionMode: "node-v268-production-readiness-decision-gate-only",
          sourceNodeV267Ready: true,
          sourceNodeV267BlocksRealResolver: true,
          archiveEchoChainReady: true,
          checkCount: 25,
          passedCheckCount: 15,
          sourceCheckCount: 18,
          sourcePassedCheckCount: 18,
          archiveFileCount: 9,
          evidenceFileCount: 7,
          requiredSnippetCount: 24,
          matchedSnippetCount: 32,
          missingPreImplementationRequirementCount: 10,
          productionBlockerCount: 10,
          readOnly: true,
          executionAllowed: false,
          blockedDecisionOnly: true,
          productionReadinessGateOnly: true,
          readOnlyDecisionGate: true,
          readyForCredentialResolverPreImplementationPlan: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          realResolverImplementationAllowed: false,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          secretProviderStubDefined: false,
          secretProviderRuntimeAllowed: false,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          externalAuditServiceAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          storageWriteAllowed: false,
          managedAuditWriteExecuted: false,
          approvalLedgerWriteAllowed: false,
          approvalLedgerWriteExecuted: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          externalRequestSent: false,
          schemaMigrationExecutionAllowed: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          managedAuditStorageBackend: false,
          orderAuthoritative: false,
          readyForNodeV269Alignment: true,
        },
      },
      echoVerification: {
        verificationMode: "java-v111-plus-mini-kv-v118-blocked-decision-upstream-echo-verification-only",
        sourceSpan: "Node v268 + Java v111 + mini-kv v118",
        sourceNodeV268Ready: true,
        javaV111EchoReady: true,
        miniKvV118NonParticipationReady: true,
        blockedDecisionAligned: true,
        decisionModeAligned: true,
        countSummaryAligned: true,
        missingRequirementBlockersAligned: true,
        readOnlyDecisionGateAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        nodeV269KeepsRealResolverBlocked: true,
      },
      checks: {
        sourceNodeV268Ready: true,
        sourceNodeV268DecisionBlocked: true,
        sourceNodeV268KeepsRealResolverBlocked: true,
        javaV111EchoReady: true,
        miniKvV118NonParticipationReady: true,
        blockedDecisionAligned: true,
        decisionModeAligned: true,
        countSummaryAligned: true,
        missingRequirementBlockersAligned: true,
        readOnlyDecisionGateAligned: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification: true,
      },
      summary: {
        sourceCheckCount: 25,
        sourcePassedCheckCount: 15,
        missingPreImplementationRequirementCount: 10,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV268.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV118.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.evidenceFileCount).toBe(7);
    expect(profile.summary.matchedSnippetCount).toBe(36);
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe(
      "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready",
    );
    expect(profile.upstreamEchoes.javaV111.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV118.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV111.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/111/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV118.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-production-readiness-blocked-decision-non-participation-receipt.json",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        sourceNodeV268: {
          readinessDecision: "blocked",
          productionBlockerCount: 10,
        },
        upstreamEchoes: {
          javaV111: {
            nextNodeConsumerVersion: "Node v269",
            readyForNodeV269Alignment: true,
          },
          miniKvV118: {
            releaseVersion: "v118",
            readyForNodeV269Alignment: true,
            realResolverImplementationAllowed: false,
            resolverClientInstantiated: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          blockedDecisionAligned: true,
          missingRequirementBlockersAligned: true,
          resolverBoundaryAligned: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver production readiness blocked decision upstream echo verification",
      );
      expect(markdown.body).toContain("credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready");
      expect(markdown.body).toContain("RUN_V270_PLAN_INTAKE");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-269",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v269-credential-resolver-blocked-decision-upstream-echo-verification",
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
