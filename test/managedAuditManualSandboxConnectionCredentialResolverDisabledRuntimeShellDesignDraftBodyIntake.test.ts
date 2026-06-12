import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body intake", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v334 and opens only Node v336 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake.v1",
      bodyIntakeState: "disabled-runtime-shell-design-draft-body-intake-ready",
      bodyIntakeDecision: "archive-disabled-body-intake-before-drafting-body",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake: true,
      readOnlyBodyIntake: true,
      bodyIntakeOnly: true,
      consumesNodeV334DisabledDesignDraftOutlineArchiveVerification: true,
      activeNodeVersion: "Node v335",
      sourceNodeVersion: "Node v334",
      readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true,
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
      sourceNodeV334: {
        archiveVerificationState: "disabled-design-draft-outline-archive-verified",
        archiveVerificationDecision: "proceed-to-disabled-design-draft-body-intake",
        readyForArchiveVerification: true,
        readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake: true,
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
        blockerResolved: "outline-archive-verified-but-body-intake-not-yet-declared",
        consumer: "Node v336 body intake archive verification",
        proofComplete: true,
      },
      bodyIntake: {
        recordMode: "disabled-runtime-shell-design-draft-body-intake-only",
        decision: "archive-disabled-body-intake-before-drafting-body",
        sourceSpan: "Node v334 disabled design draft outline archive verification",
        bodyScope: "map-outline-sections-to-non-executable-body-intake-only",
        bodySectionCatalogVersion: "disabled-runtime-shell-design-draft-body-section-catalog.v1",
        evidenceCatalogVersion: "disabled-runtime-shell-design-draft-body-evidence-catalog.v1",
        bodySectionCount: 8,
        evidenceItemCount: 6,
        stopConditionCount: 8,
        requiresArchiveVerificationBeforeBodyDraft: true,
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
        readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true,
        nextNodeVersionSuggested: "Node v336",
      },
      checks: {
        sourceNodeV334Ready: true,
        sourceNodeV334AllowsBodyIntakeOnly: true,
        sourceNodeV334KeepsDesignDraftClosed: true,
        sourceNodeV334KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        bodyIntakeOnly: true,
        bodySectionCatalogComplete: true,
        bodySectionCatalogMapsOutlineSections: true,
        evidenceCatalogComplete: true,
        bodyCatalogIsNonExecutable: true,
        archiveVerificationRequiredBeforeBodyDraft: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake: true,
      },
      summary: {
        sourceNodeV334CheckCount: 29,
        sourceNodeV334PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        bodySectionCount: 8,
        evidenceItemCount: 6,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.bodyIntake.intakeDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sourceNodeV334.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.bodySections.map((section) => section.requiresFutureArchiveVerification)).toEqual(
      Array.from({ length: 8 }, () => true),
    );
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 180_000);

  it("fails closed when the v334 source archive verification is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v335-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.bodyIntakeState).toBe("blocked");
    expect(profile.bodyIntakeDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake)
      .toBe(false);
    expect(profile.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraftOutline).toBe(false);
    expect(profile.bodyIntake.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V334_NOT_READY",
      "NODE_V334_DID_NOT_ALLOW_BODY_INTAKE",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 180_000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.bodyIntakeState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake)
      .toBe(false);
    expect(profile.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V334_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake.v1",
        bodyIntakeState: "disabled-runtime-shell-design-draft-body-intake-ready",
        activeNodeVersion: "Node v335",
        sourceNodeVersion: "Node v334",
        readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        executionAllowed: false,
        bodyIntake: {
          decision: "archive-disabled-body-intake-before-drafting-body",
          bodyScope: "map-outline-sections-to-non-executable-body-intake-only",
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v336",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body intake",
      );
      expect(markdown.body).toContain("Ready for Node v336 body intake archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-335",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v335-body-intake",
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
