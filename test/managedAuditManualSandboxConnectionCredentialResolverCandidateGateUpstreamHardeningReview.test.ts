import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review";

describe("managed audit manual sandbox connection credential resolver candidate gate upstream hardening review", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v329, Java v151/v152, and mini-kv v143 from historical fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review.v1",
      reviewState: "candidate-gate-upstream-hardening-review-ready",
      upstreamAlignmentDecision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
      readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview: true,
      readOnlyReview: true,
      activeNodeVersion: "Node v330",
      sourceNodeVersion: "Node v329",
      sourceJavaEvidenceExportVersion: "Java v151",
      sourceJavaInputHardeningEchoVersion: "Java v152",
      sourceMiniKvVersion: "mini-kv v143",
      consumesNodeV329ImplementationCandidateGateInputHardeningDecision: true,
      consumesJavaV151StableEvidenceExportHint: true,
      consumesJavaV152InputHardeningDecisionEcho: true,
      consumesMiniKvV143StableCurrentReceiptExport: true,
      readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: true,
      readyForDisabledRuntimeShellDesignDraft: false,
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
      sourceNodeV329: {
        candidateGateState: "implementation-candidate-gate-input-hardening-decision-ready",
        readyForInputHardeningDecision: true,
        candidateGateDecision: "require-input-export-hardening-before-disabled-runtime-design",
        inputHardeningRequirementCount: 4,
        noGoConditionCount: 7,
        sourceProductionBlockerCount: 0,
        readyForNodeV330CandidateGateUpstreamAlignment: false,
        readyForDisabledRuntimeShellDesignDraft: false,
      },
      javaV151EvidenceExportHint: {
        sourceVersion: "Java v151",
        evidencePresent: true,
        evidenceExportHintDocumented: true,
        stableReadOnlyJsonExportDocumented: true,
        endpointEvidenceExportDocumented: true,
        credentialAndEndpointBoundariesDocumented: true,
        networkWriteRollbackSchemaBoundariesDocumented: true,
        automaticUpstreamStartDenied: true,
        readyForNodeConsumption: true,
      },
      javaV152InputHardeningDecisionEcho: {
        sourceVersion: "Java v152",
        evidencePresent: true,
        inputHardeningDecisionEchoDocumented: true,
        consumesNodeV329Decision: true,
        confirmsJavaV151StableEvidenceExport: true,
        nodeV330WaitDocumented: true,
        providerClientNetworkBoundariesDocumented: true,
        javaWriteBoundariesDocumented: true,
        automaticUpstreamStartDenied: true,
        readyForNodeConsumption: true,
      },
      miniKvV143Receipt: {
        sourceVersion: "mini-kv v143",
        evidencePresent: true,
        releaseVersion: "v143",
        readOnly: true,
        executionAllowed: false,
        restoreExecutionAllowed: false,
        stableCurrentReceiptExportReady: true,
        stableCurrentReceiptPathRequired: true,
        readyForNodeV330AfterJavaV151: true,
        readyForNodeV330BeforeJavaV151: false,
        readyForDisabledRuntimeShellDesignDraft: false,
        runtimeShellImplemented: false,
        runtimeShellInvocationAllowed: false,
        realResolverImplementationAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        externalRequestSent: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
        javaSqlExecutionAllowed: false,
        rollbackExecutionAllowed: false,
        approvalLedgerWritten: false,
        schemaMigrationExecuted: false,
        miniKvWriteCommandAllowed: false,
        miniKvLoadAllowed: false,
        miniKvCompactAllowed: false,
        miniKvRestoreAllowed: false,
        miniKvSetnxexAllowed: false,
        automaticUpstreamStart: false,
        readyForNodeConsumption: true,
      },
      hardeningReview: {
        recordMode: "candidate-gate-upstream-hardening-review-only",
        decision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
        sourceSpan: "Node v329 + Java v151/v152 + mini-kv v143",
        javaEvidenceExportStatus: "stable-read-only-export-hint-present",
        javaInputHardeningEchoStatus: "input-hardening-decision-echo-present",
        miniKvStableReceiptStatus: "stable-current-receipt-ready",
        readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: true,
        allowsDisabledRuntimeShellDesignDraftNow: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        nextNodeVersionSuggested: "Node v331",
      },
      checks: {
        sourceNodeV329Ready: true,
        sourceNodeV329RequiresInputHardening: true,
        sourceNodeV329KeepsRuntimeBlocked: true,
        javaV151EvidencePresent: true,
        javaV151StableEvidenceExportReady: true,
        javaV151BoundariesDocumented: true,
        javaV152EvidencePresent: true,
        javaV152ConsumesNodeV329: true,
        javaV152ConfirmsJavaStableEvidenceExport: true,
        javaV152BoundariesDocumented: true,
        miniKvV143ReceiptPresent: true,
        miniKvV143ReleaseVersionMatches: true,
        miniKvV143StableCurrentReceiptReady: true,
        miniKvV143ReadyAfterJavaV151: true,
        miniKvV143BlocksBeforeJavaV151: true,
        miniKvV143KeepsRuntimeAndWriteBoundariesClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview: true,
      },
      summary: {
        sourceNodeV329CheckCount: 16,
        sourceNodeV329PassedCheckCount: 16,
        javaEvidenceFileCount: 2,
        miniKvReceiptFileCount: 1,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 1,
      },
    });
    expect(profile.hardeningReview.reviewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.summary.javaMatchedSnippetCount).toBe(profile.summary.javaSnippetCount);
    expect(normalizePath(profile.javaV151EvidenceExportHint.evidenceFile.resolvedPath))
      .toContain("fixtures/historical/sibling-workspaces");
    expect(normalizePath(profile.miniKvV143Receipt.evidenceFile.resolvedPath))
      .toContain("fixtures/historical/sibling-workspaces");
  }, 60000);

  it("fails closed when any required upstream hardening evidence is missing", () => {
    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({
        config: loadTestConfig(),
        evidencePaths: {
          javaV151EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v151.md"),
          javaV152EvidencePath: path.join(process.cwd(), "fixtures", "missing-java-v152.md"),
          miniKvV143ReceiptPath: path.join(process.cwd(), "fixtures", "missing-mini-kv-v143.json"),
        },
      });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.upstreamAlignmentDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview)
      .toBe(false);
    expect(profile.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "JAVA_V151_EVIDENCE_MISSING",
      "JAVA_V152_EVIDENCE_MISSING",
      "MINI_KV_V143_RECEIPT_MISSING",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview)
      .toBe(false);
    expect(profile.readyForNextNodeDisabledRuntimeShellDesignDraftCandidate).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V329_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-candidate-gate-upstream-hardening-review.v1",
        reviewState: "candidate-gate-upstream-hardening-review-ready",
        activeNodeVersion: "Node v330",
        sourceNodeVersion: "Node v329",
        sourceJavaEvidenceExportVersion: "Java v151",
        sourceJavaInputHardeningEchoVersion: "Java v152",
        sourceMiniKvVersion: "mini-kv v143",
        readyForNextNodeDisabledRuntimeShellDesignDraftCandidate: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        executionAllowed: false,
        hardeningReview: {
          decision: "input-hardening-aligned-proceed-to-disabled-design-draft-candidate-review",
          nextNodeVersionSuggested: "Node v331",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver candidate gate upstream hardening review",
      );
      expect(markdown.body).toContain("Java v151");
      expect(markdown.body).toContain("Java v152");
      expect(markdown.body).toContain("mini-kv v143");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft now: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-330",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v330-candidate-gate-upstream-hardening",
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

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}
