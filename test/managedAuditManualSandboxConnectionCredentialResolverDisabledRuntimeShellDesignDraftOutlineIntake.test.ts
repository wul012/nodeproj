import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v332 and opens only Node v334 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake.v1",
      outlineIntakeState: "disabled-runtime-shell-design-draft-outline-intake-ready",
      outlineIntakeDecision: "archive-disabled-outline-intake-before-drafting-outline",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake: true,
      readOnlyOutlineIntake: true,
      outlineIntakeOnly: true,
      consumesNodeV332DisabledDesignDraftCandidateArchiveVerification: true,
      activeNodeVersion: "Node v333",
      sourceNodeVersion: "Node v332",
      readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: true,
      readyForDisabledRuntimeShellDesignDraft: false,
      readyForDisabledRuntimeShellDesignDraftOutline: false,
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
      sourceNodeV332: {
        archiveVerificationState: "disabled-design-draft-candidate-archive-verified",
        archiveVerificationDecision: "proceed-to-disabled-design-draft-outline-intake",
        readyForArchiveVerification: true,
        readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        archiveFileCount: 11,
        presentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      necessityProof: {
        blockerResolved: "candidate-archive-verified-but-outline-boundaries-not-yet-declared",
        consumer: "Node v334 outline intake archive verification",
        proofComplete: true,
      },
      outlineIntake: {
        recordMode: "disabled-runtime-shell-design-draft-outline-intake-only",
        decision: "archive-disabled-outline-intake-before-drafting-outline",
        sourceSpan: "Node v332 disabled design draft candidate archive verification",
        outlineScope: "declare-non-executable-outline-sections-and-boundaries-only",
        sectionCatalogVersion: "disabled-runtime-shell-design-draft-outline-section-catalog.v1",
        allowedSectionCount: 8,
        forbiddenContentCount: 8,
        requiresArchiveVerificationBeforeOutlineDraft: true,
        requestsJavaMiniKvEcho: false,
        allowsDisabledRuntimeShellDesignDraftNow: false,
        allowsDisabledRuntimeShellDesignDraftOutlineNow: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsRealResolverImplementation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        allowsAutomaticUpstreamStart: false,
        readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: true,
        nextNodeVersionSuggested: "Node v334",
      },
      checks: {
        sourceNodeV332Ready: true,
        sourceNodeV332AllowsOutlineIntakeOnly: true,
        sourceNodeV332KeepsDesignDraftClosed: true,
        sourceNodeV332KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        outlineIntakeOnly: true,
        sectionCatalogComplete: true,
        sectionCatalogIsNonExecutable: true,
        archiveVerificationRequiredBeforeOutlineDraft: true,
        noUpstreamEchoRequested: true,
        noRuntimeDesignDraftCreated: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake: true,
      },
      summary: {
        sourceNodeV332CheckCount: 29,
        sourceNodeV332PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sectionCount: 8,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.outlineIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV332.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.outlineSections.map((section) => section.requiresFutureArchiveVerification)).toEqual(
      Array.from({ length: 8 }, () => true),
    );
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v332 source archive verification is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v333-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.outlineIntakeState).toBe("blocked");
    expect(profile.outlineIntakeDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake)
      .toBe(false);
    expect(profile.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.outlineIntake.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V332_NOT_READY",
      "NODE_V332_DID_NOT_ALLOW_OUTLINE_INTAKE",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.outlineIntakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake)
      .toBe(false);
    expect(profile.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V332_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake.v1",
        outlineIntakeState: "disabled-runtime-shell-design-draft-outline-intake-ready",
        activeNodeVersion: "Node v333",
        sourceNodeVersion: "Node v332",
        readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        outlineIntake: {
          decision: "archive-disabled-outline-intake-before-drafting-outline",
          outlineScope: "declare-non-executable-outline-sections-and-boundaries-only",
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v334",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline intake",
      );
      expect(markdown.body).toContain("Ready for Node v334 archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-333",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v333-outline-intake",
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
