import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification";

describe("managed audit manual sandbox connection credential resolver no-network safety fixture upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Java v149 and mini-kv v141 echoes after the Node v323 no-network contract intake", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1",
      verificationState: "no-network-safety-fixture-upstream-echo-verification-ready",
      runtimeShellChainDecision: "require-abort-rollback-semantics-before-runtime-shell",
      readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      noNetworkSafetyFixtureUpstreamEchoVerificationOnly: true,
      consumesNodeV323NoNetworkSafetyFixtureContractIntake: true,
      consumesJavaV149NoNetworkSafetyFixtureContractEcho: true,
      consumesMiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceipt: true,
      activeNodeVerificationVersion: "Node v324",
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      runtimeShellImplemented: false,
      runtimeShellInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      networkSafetyFixtureExecuted: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV323: {
        sourceVersion: "Node v323",
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1",
        contractState: "no-network-safety-fixture-contract-intake-ready",
        readyForNoNetworkSafetyFixtureContractIntake: true,
        targetPrerequisiteId: "no-network-safety-fixture",
        nextJavaVersion: "Java v149",
        nextMiniKvVersion: "mini-kv v141",
        nextNodeVerificationVersion: "Node v324",
        readyForParallelJavaV149MiniKvV141Echo: true,
        networkSafetyFixtureExecuted: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        externalRequestSent: false,
      },
      upstreamEvidence: {
        javaV149: {
          sourceVersion: "Java v149",
          receiptVersion:
            "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-no-network-safety-fixture-contract-echo-receipt.v1",
          echoMode: "java-v149-no-network-safety-fixture-contract-echo-only",
          sourceSpan: "Node v323 + Java v147",
          nextNodeVersion: "Node v324",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV323Plan: true,
          readyForNodeV324: true,
          noNetworkSafetyFixtureContractEchoed: true,
          requiredFieldCountEchoed: true,
          prohibitedFieldCountEchoed: true,
          rejectionReasonCountEchoed: true,
          noGoBoundaryCountEchoed: true,
          upstreamEchoRequestsEchoed: true,
          necessityProofEchoed: true,
          sideEffectBoundariesClosed: true,
        },
        miniKvV141: {
          sourceVersion: "mini-kv v141",
          receiptVersion:
            "mini-kv-credential-resolver-no-network-safety-fixture-contract-non-participation-receipt.v1",
          releaseVersion: "v141",
          consumerHint: "Node v324 no-network safety fixture upstream echo verification",
          evidencePresent: true,
          verificationDocumented: true,
          echoesNodeV323Plan: true,
          readyForNodeV324: true,
          requiredFieldCount: 10,
          prohibitedFieldCount: 12,
          rejectionReasonCount: 6,
          noGoBoundaryCount: 10,
          upstreamEchoRequestCount: 2,
          nonParticipationReceiptOnly: true,
          readOnlyNoNetworkSafetyFixtureContract: true,
          consumesNodeV323NoNetworkSafetyFixtureContractIntake: true,
          readyForNodeV324BeforeUpstreamEcho: false,
          runtimeShellImplemented: false,
          runtimeShellInvocationAllowed: false,
          executionAllowed: false,
          connectsManagedAudit: false,
          credentialValueRead: false,
          rawEndpointUrlParsed: false,
          externalRequestSent: false,
          networkSafetyFixtureExecuted: false,
          networkFixtureExecutionAllowed: false,
          networkSafetyAuthority: false,
          httpRequestSent: false,
          tcpConnectionAttempted: false,
          networkSocketOpened: false,
          secretProviderInstantiated: false,
          resolverClientInstantiated: false,
          schemaMigrationExecuted: false,
          approvalLedgerWritten: false,
          automaticUpstreamStart: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          sideEffectBoundariesClosed: true,
        },
      },
      echoVerification: {
        verificationMode: "no-network-safety-fixture-upstream-echo-verification-only",
        sourceSpan: "Node v323 + Java v149 + mini-kv v141",
        sourceNodeV323Ready: true,
        javaV149EchoReady: true,
        miniKvV141ReceiptReady: true,
        upstreamEchoAligned: true,
        noNetworkSafetyFixtureContractAligned: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
      },
      checks: {
        sourceNodeV323Ready: true,
        sourceNodeV323RequestsParallelEcho: true,
        sourceNodeV323ContractComplete: true,
        sourceNodeV323KeepsRuntimeBlocked: true,
        sourceNodeV323KeepsSideEffectsClosed: true,
        javaV149EvidencePresent: true,
        javaV149EchoesNodeV323Plan: true,
        javaV149ReadyForNodeV324: true,
        javaV149NoNetworkSafetyFixtureContractEchoed: true,
        javaV149KeepsRuntimeBlocked: true,
        miniKvV141EvidencePresent: true,
        miniKvV141EchoesNodeV323Plan: true,
        miniKvV141ReadyForNodeV324: true,
        miniKvV141NoNetworkSafetyFixtureContractEchoed: true,
        miniKvV141KeepsRuntimeBlocked: true,
        upstreamEchoesAligned: true,
        noNetworkSafetyFixtureContractAligned: true,
        sideEffectBoundariesAligned: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification: true,
      },
      summary: {
        requiredFieldCount: 10,
        prohibitedFieldCount: 12,
        rejectionReasonCount: 6,
        noGoBoundaryCount: 10,
        upstreamEchoRequestCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV323.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV323.contractDigest).toBe(profile.upstreamEvidence.miniKvV141.sourceNodeV323ContractDigest);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.echoVerification.remainingPrerequisitesAfterV324).toEqual([
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ]);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEvidence.javaV149.expectedSnippets.every((expected) => expected.matched)).toBe(true);
    expect(profile.upstreamEvidence.miniKvV141.expectedSnippets.every((expected) => expected.matched)).toBe(true);
  }, 60000);

  it("uses committed historical fixture fallback for Java v149 and mini-kv v141", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("no-network-safety-fixture-upstream-echo-verification-ready");
    expect(profile.upstreamEvidence.javaV149.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.upstreamEvidence.miniKvV141.evidenceFiles.every((file) =>
      normalizePath(file.resolvedPath).includes("fixtures/historical/sibling-workspaces"))).toBe(true);
    expect(profile.checks.upstreamEchoesAligned).toBe(true);
    expect(profile.checks.noNetworkSafetyFixtureContractAligned).toBe(true);
    expect(profile.checks.sideEffectBoundariesAligned).toBe(true);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.readyForDisabledRuntimeShellImplementation).toBe(false);
    expect(profile.runtimeShellImplemented).toBe(false);
    expect(profile.networkSafetyFixtureExecuted).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1",
        verificationState: "no-network-safety-fixture-upstream-echo-verification-ready",
        activeNodeVerificationVersion: "Node v324",
        upstreamEvidence: {
          javaV149: {
            readyForNodeV324: true,
            noNetworkSafetyFixtureContractEchoed: true,
            sideEffectBoundariesClosed: true,
          },
          miniKvV141: {
            readyForNodeV324: true,
            requiredFieldCount: 10,
            sideEffectBoundariesClosed: true,
          },
        },
        echoVerification: {
          upstreamEchoAligned: true,
          noNetworkSafetyFixtureContractAligned: true,
          implementationStillBlocked: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver no-network safety fixture upstream echo verification",
      );
      expect(markdown.body).toContain("no-network-safety-fixture-upstream-echo-verification-ready");
      expect(markdown.body).toContain("Java v149 Echo");
      expect(markdown.body).toContain("mini-kv v141 Receipt");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-324",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v324-no-network-upstream-echo",
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
    ...overrides,
  });
}

function normalizePath(value: string) {
  return value.replace(/\\/g, "/");
}
