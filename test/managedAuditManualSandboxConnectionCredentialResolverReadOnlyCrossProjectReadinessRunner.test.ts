import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner";

describe("managed audit manual sandbox connection credential resolver read-only cross-project readiness runner", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("reads Java v150 and mini-kv v142 local evidence through historical fallback and builds a readiness report", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner.v1",
      runnerState: "read-only-cross-project-readiness-ready",
      activeNodeVersion: "Node v327",
      sourceNodeContractVersion: "Node v326",
      sourceJavaVersion: "Java v150",
      sourceMiniKvVersion: "mini-kv v142",
      targetPrerequisiteId: "abort-rollback-semantics",
      consumesNodeV326AbortRollbackSemanticsContractIntake: true,
      consumesJavaV150LocalEvidence: true,
      consumesMiniKvV142LocalReceipt: true,
      readsSiblingWorkspaceEvidence: true,
      usesHistoricalFixtureFallback: true,
      readOnlyCrossProjectReadinessRunner: true,
      readyForReadOnlyCrossProjectReadinessReport: true,
      readyForFinalPrerequisiteClosureReview: true,
      readyForRuntimeShellImplementation: false,
      readyForRuntimeShellInvocation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      externalRequestSent: false,
      httpRequestSent: false,
      tcpConnectionAttempted: false,
      networkSocketOpened: false,
      javaServiceStarted: false,
      miniKvServiceStarted: false,
      javaSqlExecutionAllowed: false,
      approvalLedgerWritten: false,
      schemaMigrationExecuted: false,
      rollbackExecutionAllowed: false,
      deploymentActionAllowed: false,
      miniKvWriteCommandAllowed: false,
      miniKvLoadAllowed: false,
      miniKvCompactAllowed: false,
      miniKvRestoreAllowed: false,
      miniKvSetnxexAllowed: false,
      automaticUpstreamStart: false,
      sourceNodeV326: {
        contractState: "abort-rollback-semantics-contract-intake-ready",
        readyForContractIntake: true,
        targetPrerequisiteId: "abort-rollback-semantics",
        nextJavaVersion: "Java v150",
        nextMiniKvVersion: "mini-kv v142",
        nextNodeVerificationVersion: "Node v327",
        requiredFieldCount: 10,
        prohibitedFieldCount: 14,
        noGoBoundaryCount: 11,
        implementationStillBlocked: true,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
      },
      javaV150Evidence: {
        project: "advanced-order-platform",
        sourceVersion: "Java v150",
        tagLabel: "v150-order-platform-abort-rollback-semantics-contract-echo",
        evidencePresent: true,
        readOnlyEchoDocumented: true,
        sqlRollbackLedgerNetworkDenied: true,
        noRuntimeProviderClientDocumented: true,
        noAutomaticUpstreamStartDocumented: true,
        readyForNodeConsumption: true,
      },
      miniKvV142Receipt: {
        project: "mini-kv",
        sourceVersion: "mini-kv v142",
        releaseVersion: "v142",
        readOnly: true,
        executionAllowed: false,
        restoreExecutionAllowed: false,
        orderAuthoritative: false,
        consumesNodeV326: true,
        readyForNodeV327: true,
        rollbackExecutionAllowed: false,
        deploymentActionAllowed: false,
        javaSqlExecutionAllowed: false,
        miniKvWriteCommandAllowed: false,
        loadRestoreCompactExecuted: false,
        setnxexExecutionAllowed: false,
        abortRollbackAuthority: false,
        readyForNodeConsumption: true,
      },
      sideEffectSafetyMatrix: {
        nodeStartsJavaService: false,
        nodeStartsMiniKvService: false,
        nodeReadsCredentialValue: false,
        nodeParsesRawEndpointUrl: false,
        nodeSendsHttpRequest: false,
        nodeOpensTcpConnection: false,
        nodeWritesJavaLedger: false,
        nodeExecutesJavaSql: false,
        nodeCallsRollback: false,
        nodeRunsSchemaMigration: false,
        nodeRunsDeployment: false,
        nodeRunsMiniKvLoad: false,
        nodeRunsMiniKvCompact: false,
        nodeRunsMiniKvRestore: false,
        nodeRunsMiniKvSetnxex: false,
        nodeRunsMiniKvWriteCommand: false,
        allSideEffectsClosed: true,
      },
      checks: {
        nodeV326ContractReady: true,
        nodeV326TargetsAbortRollbackSemantics: true,
        nodeV326KeepsRuntimeBlocked: true,
        nodeV326KeepsSideEffectsClosed: true,
        javaV150EvidencePresent: true,
        javaV150ReadOnlyEchoDocumented: true,
        javaV150SqlRollbackLedgerNetworkDenied: true,
        miniKvV142ReceiptPresent: true,
        miniKvV142ReleaseVersionMatches: true,
        miniKvV142ReadOnlyReceipt: true,
        miniKvV142ExecutionDenied: true,
        miniKvV142RestoreDenied: true,
        miniKvV142WriteCommandsDenied: true,
        miniKvV142DoesNotBecomeAuthority: true,
        miniKvV142ConsumesNodeV326: true,
        miniKvV142ReadyForNodeV327: true,
        sideEffectSafetyMatrixClosed: true,
        readyForReadOnlyCrossProjectReadinessReport: true,
      },
      summary: {
        javaEvidenceFileCount: 1,
        javaSnippetCount: 5,
        javaMatchedSnippetCount: 5,
        miniKvReceiptFileCount: 1,
        sideEffectClosedCount: 16,
        sideEffectTotalCount: 16,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.readinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.javaV150Evidence.evidenceFile.resolvedPath).toContain("fixtures");
    expect(profile.miniKvV142Receipt.evidenceFile.resolvedPath).toContain("fixtures");
  }, 60000);

  it("fails closed when sibling evidence files are missing", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
      config: loadTestConfig(),
      evidencePaths: {
        javaV150EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v150.md"),
        miniKvV142ReceiptPath: path.join(process.cwd(), "fixtures", "missing-mini-kv-v142.json"),
      },
    });

    expect(profile.runnerState).toBe("blocked");
    expect(profile.readyForReadOnlyCrossProjectReadinessReport).toBe(false);
    expect(profile.readyForFinalPrerequisiteClosureReview).toBe(false);
    expect(profile.javaV150Evidence.evidencePresent).toBe(false);
    expect(profile.miniKvV142Receipt.evidencePresent).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "JAVA_V150_EVIDENCE_MISSING",
      "MINI_KV_V142_RECEIPT_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.rollbackExecutionAllowed).toBe(false);
    expect(profile.miniKvWriteCommandAllowed).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.runnerState).toBe("blocked");
    expect(profile.readyForReadOnlyCrossProjectReadinessReport).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
    expect(profile.automaticUpstreamStart).toBe(false);
  }, 60000);

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
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
          "managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner.v1",
        runnerState: "read-only-cross-project-readiness-ready",
        activeNodeVersion: "Node v327",
        sourceJavaVersion: "Java v150",
        sourceMiniKvVersion: "mini-kv v142",
        readyForReadOnlyCrossProjectReadinessReport: true,
        readyForFinalPrerequisiteClosureReview: true,
        executionAllowed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        javaV150Evidence: {
          readyForNodeConsumption: true,
        },
        miniKvV142Receipt: {
          readyForNodeConsumption: true,
          releaseVersion: "v142",
          executionAllowed: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver read-only cross-project readiness runner",
      );
      expect(markdown.body).toContain("Java v150");
      expect(markdown.body).toContain("mini-kv v142");
      expect(markdown.body).toContain("Side Effect Safety Matrix");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-327",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v327-read-only-cross-project-readiness",
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
    ...overrides,
  });
}
