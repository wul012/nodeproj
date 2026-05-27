import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan";

describe("managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("consumes Node v340 and opens only Node v342 archive verification", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan({
        config: loadTestConfig(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan.v1",
      preparationPlanState: "disabled-runtime-shell-design-draft-body-preparation-plan-ready",
      preparationPlanDecision: "prepare-disabled-body-draft-plan-after-archive-verification",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan:
        true,
      readOnlyPreparationPlan: true,
      preparationPlanOnly: true,
      consumesNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification: true,
      activeNodeVersion: "Node v341",
      sourceNodeVersion: "Node v340",
      readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
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
      sourceNodeV340: {
        archiveVerificationState: "disabled-design-draft-body-pre-draft-decision-archive-verified",
        archiveVerificationDecision: "pre-draft-decision-archive-verified-before-body-draft",
        readyForArchiveVerification: true,
        readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        readyForDisabledRuntimeShellDesignDraftOutline: false,
        sourceCheckCount: 29,
        sourcePassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        sourceDecisionQuestionCount: 5,
        sourceAnsweredDecisionQuestionCount: 5,
        sourcePreparationControlCount: 6,
        sourceEnforcedPreparationControlCount: 6,
        executionAllowed: false,
        credentialValueRead: false,
        rawEndpointUrlParsed: false,
        httpRequestSent: false,
        tcpConnectionAttempted: false,
      },
      bodyPreparationPlan: {
        planMode: "disabled-runtime-shell-design-draft-body-preparation-plan-only",
        planDecision: "prepare-disabled-body-draft-plan-after-archive-verification",
        planScope: "plan-body-draft-sections-and-evidence-mapping-without-writing-body-content",
        requiresArchiveVerificationBeforeBodyDraft: true,
        requestsJavaMiniKvEcho: false,
        sectionPlanCount: 8,
        evidenceMappingCount: 6,
        draftGuardCount: 8,
        stopConditionCount: 8,
        writesBodyDraftNow: false,
        allowsRuntimeShellImplementation: false,
        allowsRuntimeShellInvocation: false,
        allowsCredentialValueRead: false,
        allowsRawEndpointUrlParse: false,
        allowsExternalRequest: false,
        allowsMiniKvWriteOrAdminCommand: false,
        readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
        nextNodeVersionSuggested: "Node v342",
      },
      checks: {
        sourceNodeV340Ready: true,
        sourceNodeV340AllowsPreparationPlanOnly: true,
        sourceNodeV340KeepsDesignDraftClosed: true,
        sourceNodeV340KeepsRuntimeAndSideEffectsClosed: true,
        necessityProofComplete: true,
        preparationPlanOnly: true,
        sectionPlansComplete: true,
        evidenceMappingsComplete: true,
        draftGuardsEnforced: true,
        stopConditionsComplete: true,
        archiveVerificationRequiredBeforeBodyDraft: true,
        noUpstreamEchoRequested: true,
        noBodyDraftWritten: true,
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
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan:
          true,
      },
      summary: {
        sourceNodeV340CheckCount: 29,
        sourceNodeV340PassedCheckCount: 29,
        sourceArchiveFileCount: 11,
        sourcePresentArchiveFileCount: 11,
        sourceProductionBlockerCount: 0,
        sourceBodySectionCount: 8,
        sourceEvidenceItemCount: 6,
        sourceStopConditionCount: 8,
        sectionPlanCount: 8,
        plannedSectionCount: 8,
        evidenceMappingCount: 6,
        draftGuardCount: 8,
        enforcedDraftGuardCount: 8,
        stopConditionCount: 8,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.bodyPreparationPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  }, 60000);

  it("fails closed when the v340 source archive verification is blocked", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const emptyProjectRoot = mkdtempSync(path.join(os.tmpdir(), "orderops-v341-empty-"));

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan({
        config: loadTestConfig(),
        archiveRoot: emptyProjectRoot,
      });

    expect(profile.preparationPlanState).toBe("blocked");
    expect(profile.preparationPlanDecision).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan)
      .toBe(false);
    expect(profile.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.bodyPreparationPlan.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification)
      .toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V340_NOT_READY",
    ]));
    expect(profile.executionAllowed).toBe(false);
    expect(profile.httpRequestSent).toBe(false);
    expect(profile.tcpConnectionAttempted).toBe(false);
  }, 60000);

  it("blocks when upstream probes or actions are enabled", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile =
      loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan({
        config: loadTestConfig({
          UPSTREAM_PROBES_ENABLED: "true",
          UPSTREAM_ACTIONS_ENABLED: "true",
        }),
      });

    expect(profile.preparationPlanState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan)
      .toBe(false);
    expect(profile.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification).toBe(false);
    expect(profile.readyForDisabledRuntimeShellDesignDraft).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "NODE_V340_NOT_READY",
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
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan.v1",
        preparationPlanState: "disabled-runtime-shell-design-draft-body-preparation-plan-ready",
        activeNodeVersion: "Node v341",
        sourceNodeVersion: "Node v340",
        readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification: true,
        readyForDisabledRuntimeShellDesignDraft: false,
        executionAllowed: false,
        bodyPreparationPlan: {
          planDecision: "prepare-disabled-body-draft-plan-after-archive-verification",
          writesBodyDraftNow: false,
          requestsJavaMiniKvEcho: false,
          nextNodeVersionSuggested: "Node v342",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan",
      );
      expect(markdown.body).toContain("Ready for Node v342 body preparation plan archive verification: true");
      expect(markdown.body).toContain("Ready for disabled runtime shell design draft: false");
      expect(markdown.body).toContain("requestsJavaMiniKvEcho: false");
    } finally {
      await app.close();
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-341",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v341-body-preparation-plan",
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
