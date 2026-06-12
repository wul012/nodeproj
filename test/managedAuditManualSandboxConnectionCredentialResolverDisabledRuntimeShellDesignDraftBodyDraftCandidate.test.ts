import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v342 and records only a bounded design text candidate", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate.v1",
      draftCandidateState: "disabled-runtime-shell-design-draft-body-draft-candidate-ready",
      draftCandidateDecision: "record-disabled-body-draft-candidate-under-non-runtime-boundary",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
      readOnlyDraftCandidate: true,
      draftCandidateOnly: true,
      consumesNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
      activeNodeVersion: "Node v343",
      sourceNodeVersion: "Node v342",
      readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: true,
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
      javaSqlExecutionAllowed: false,
      approvalLedgerWritten: false,
      schemaMigrationExecuted: false,
      rollbackExecutionAllowed: false,
      miniKvWriteCommandAllowed: false,
      miniKvLoadAllowed: false,
      miniKvCompactAllowed: false,
      miniKvRestoreAllowed: false,
      miniKvSetnxexAllowed: false,
      automaticUpstreamStart: false,
      sourceNodeV342: {
        archiveVerificationState: "disabled-design-draft-body-preparation-plan-archive-verified",
        archiveVerificationDecision: "preparation-plan-archive-verified-before-body-draft",
        readyForArchiveVerification: true,
        readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      draftCandidate: {
        candidateMode: "disabled-runtime-shell-design-draft-body-draft-candidate-only",
        candidateDecision: "record-disabled-body-draft-candidate-under-non-runtime-boundary",
        candidateScope: "write-design-body-text-only-without-runtime-or-network-behavior",
        requestsJavaMiniKvEcho: false,
        sectionCount: 8,
        evidenceCitationCount: 8,
        safetyGuardCount: 9,
        stopConditionCount: 8,
        writesDesignBodyText: true,
        implementsRuntimeShell: false,
        invokesRuntimeShell: false,
        instantiatesProviderClient: false,
        readsCredentialValue: false,
        parsesRawEndpointUrl: false,
        sendsExternalRequest: false,
        writesJavaState: false,
        executesMiniKvWriteOrAdmin: false,
        startsUpstreamAutomatically: false,
        readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: true,
        nextNodeVersionSuggested: "Node v344",
      },
      checks: {
        sourceNodeV342Ready: true,
        sourceNodeV342AllowsDraftCandidateOnly: true,
        sourceNodeV342KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        candidateModeIsTextOnly: true,
        bodySectionsComplete: true,
        evidenceCitationsComplete: true,
        safetyGuardsEnforced: true,
        stopConditionsComplete: true,
        noUpstreamEchoRequested: true,
        noRuntimeImplementationCreated: true,
        noRuntimeInvocationAllowed: true,
        noCredentialValueRead: true,
        noRawEndpointUrlParsed: true,
        noProviderClientInstantiated: true,
        noExternalRequestSent: true,
        noJavaOrMiniKvWrites: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate:
          true,
      },
      summary: {
        sourceNodeV342CheckCount: 29,
        sourceNodeV342PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sectionCount: 8,
        evidenceCitationCount: 8,
        safetyGuardCount: 9,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.draftCandidate.candidateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.bodySections.every((section) => section.designTextOnly && section.body.length > 40)).toBe(true);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v342 archive verification source is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v343-empty-"));

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate({
      config: loadTestConfig(),
      archiveRoot: emptyProjectRoot,
    });

    expect(profile.draftCandidateState).toBe("blocked");
    expect(profile.draftCandidateDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate)
      .toBe(false);
    expect(profile.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification).toBe(false);
    expect(profile.draftCandidate.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V342_NOT_READY",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.draftCandidateState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate)
      .toBe(false);
    expect(profile.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V342_NOT_READY",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.automaticUpstreamStart).toBe(false);
  }, 180_000);

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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate.v1",
        draftCandidateState: "disabled-runtime-shell-design-draft-body-draft-candidate-ready",
        activeNodeVersion: "Node v343",
        sourceNodeVersion: "Node v342",
        readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        executionAllowed: false,
        draftCandidate: {
          candidateDecision: "record-disabled-body-draft-candidate-under-non-runtime-boundary",
          writesDesignBodyText: true,
          implementsRuntimeShell: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v344",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate",
      );
      expect(markdown.body).toContain("Ready for Node v344 archive verification: true");
      expect(markdown.body).toContain("Ready for runtime shell implementation: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-343",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v343-body-draft-candidate",
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
