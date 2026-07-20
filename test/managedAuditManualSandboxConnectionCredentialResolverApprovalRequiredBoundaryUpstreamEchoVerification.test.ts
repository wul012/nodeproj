import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification";

const APPROVAL_REQUIRED_BOUNDARIES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
];

describe("managed audit manual sandbox connection credential resolver approval-required boundary upstream echo verification", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("verifies Node v274 approval-required boundaries with Java v115 and mini-kv v121", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification.v1",
      verificationState: "credential-resolver-approval-required-boundary-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification: true,
      readOnlyUpstreamEchoVerification: true,
      approvalRequiredBoundaryEchoVerificationOnly: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
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
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV274: {
        sourceVersion: "Node v274",
        verificationState: "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
        readyForDisabledCandidateUpstreamEchoVerification: true,
        readOnlyUpstreamEchoVerification: true,
        disabledCandidateEchoVerificationOnly: true,
        candidateDecisionCount: 10,
        candidateReadyDecisionCount: 4,
        approvalRequiredDecisionCount: 6,
        approvalRequiredBoundaryCodes: APPROVAL_REQUIRED_BOUNDARIES,
        sourceNodeV273Ready: true,
        javaV113EchoReady: true,
        miniKvV120NonParticipationReady: true,
        candidateCountsAligned: true,
        approvalRequiredBoundaryCodesAligned: true,
        interfaceShapeAligned: true,
        fakeWiringAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        javaEchoWorkflowTemplateApplied: true,
        checkCount: 25,
        passedCheckCount: 25,
      },
      upstreamEchoes: {
        javaV115: {
          sourceVersion: "Java v115",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v34",
          echoMode: "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only",
          proofClaimPresent: true,
          nodeVerificationActionPresent: true,
          approvalRequiredBoundaryExplanationsEchoed: true,
          approvalRequiredBoundaryExplanationCount: 6,
          approvalRequiredBoundaryCodes: APPROVAL_REQUIRED_BOUNDARIES,
          evidenceAllowedMode: "approval-required-read-only-evidence",
          credentialValueReadAllowed: false,
          rawEndpointUrlParseAllowed: false,
          managedAuditConnectionAllowed: false,
          approvalLedgerWriteAllowed: false,
          sqlExecutionAllowed: false,
          rollbackExecutionAllowed: false,
          automaticUpstreamStartAllowed: false,
          approvalLedgerWritten: false,
          sqlExecuted: false,
          schemaMigrationExecuted: false,
          readyForManagedAuditSandboxAdapterConnection: false,
          echoWorkflowTemplateApplied: true,
          recordsSplitApplied: true,
          readyForNodeV275Alignment: true,
        },
        miniKvV121: {
          sourceVersion: "mini-kv v121",
          receiptVersion: "mini-kv-credential-resolver-approval-required-boundary-non-participation-receipt.v1",
          releaseVersion: "v121",
          consumerHint: "Node v275 credential resolver approval-required boundary upstream echo verification",
          sourceProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification.v1",
          sourceVerificationState: "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
          sourceReady: true,
          sourceReadOnlyUpstreamEchoVerification: true,
          sourceDisabledCandidateEchoVerificationOnly: true,
          sourceReadyForManagedAuditSandboxAdapterConnection: false,
          sourceRealResolverImplementationAllowed: false,
          sourceExecutionAllowed: false,
          sourceConnectsManagedAudit: false,
          sourceCredentialValueRead: false,
          sourceRawEndpointUrlParsed: false,
          sourceExternalRequestSent: false,
          sourceSecretProviderInstantiated: false,
          sourceResolverClientInstantiated: false,
          sourceSchemaMigrationExecuted: false,
          sourceApprovalLedgerWritten: false,
          sourceAutomaticUpstreamStart: false,
          sourceNodeV274CheckCount: 25,
          sourceNodeV274PassedCheckCount: 25,
          sourceCandidateDecisionCount: 10,
          sourceCandidateReadyDecisionCount: 4,
          sourceApprovalRequiredDecisionCount: 6,
          sourceApprovalRequiredBoundaryCodes: APPROVAL_REQUIRED_BOUNDARIES,
          approvalRequiredBoundaryCount: 6,
          approvalRequiredBoundaryCodes: APPROVAL_REQUIRED_BOUNDARIES,
          checkCount: 25,
          passedCheckCount: 25,
          readOnly: true,
          executionAllowed: false,
          approvalRequiredBoundaryNonParticipationReceiptOnly: true,
          approvalRequiredBoundaryRefinementOnly: true,
          readyForApprovalRequiredBoundaryUpstreamEcho: true,
          readyForManagedAuditSandboxAdapterConnection: false,
          realResolverImplementationAllowed: false,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          secretProviderRuntimeAllowed: false,
          credentialValueReadAllowed: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          rawEndpointUrlParseAllowed: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlIncluded: false,
          externalRequestAllowed: false,
          externalRequestSent: false,
          connectsManagedAudit: false,
          readsManagedAuditCredential: false,
          storesManagedAuditCredential: false,
          storageWriteAllowed: false,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          runtimeWriteObserved: false,
          approvalLedgerWriteAllowed: false,
          approvalLedgerWritten: false,
          managedAuditWriteExecuted: false,
          schemaMigrationAllowed: false,
          schemaMigrationExecuted: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          automaticUpstreamStartAllowed: false,
          automaticUpstreamStart: false,
          managedAuditStorageBackend: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          readyForNodeV275Alignment: true,
        },
      },
      echoVerification: {
        verificationMode:
          "java-v115-plus-mini-kv-v121-approval-required-boundary-upstream-echo-verification-only",
        sourceSpan: "Node v274 + Java v115 + mini-kv v121",
        sourceNodeV274Ready: true,
        javaV115EchoReady: true,
        miniKvV121NonParticipationReady: true,
        approvalRequiredBoundaryScopeAligned: true,
        approvalRequiredExplanationsAligned: true,
        prohibitedRuntimeActionsAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        javaEchoWorkflowTemplateApplied: true,
        javaRecordsSplitApplied: true,
        nodeV275KeepsRealResolverBlocked: true,
      },
      checks: {
        sourceNodeV274Ready: true,
        sourceNodeV274KeepsReadOnlyEchoOnly: true,
        sourceNodeV274KeepsRealResolverBlocked: true,
        sourceNodeV274KeepsBoundaryAlignment: true,
        javaV115EchoReady: true,
        miniKvV121NonParticipationReady: true,
        approvalRequiredBoundaryCountAligned: true,
        approvalRequiredBoundaryCodesAligned: true,
        approvalRequiredRequirementCodesAligned: true,
        javaApprovalRequiredExplanationsComplete: true,
        miniKvApprovalRequiredDetailsComplete: true,
        prohibitedRuntimeActionsAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        resolverBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        javaEchoWorkflowTemplateApplied: true,
        javaRecordsSplitApplied: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        realResolverImplementationStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification:
          true,
      },
      summary: {
        checkCount: 26,
        passedCheckCount: 26,
        evidenceFileCount: 11,
        approvalRequiredBoundaryCount: 6,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV121.receiptDigest).toMatch(/^fnv1a64:[a-f0-9]{16}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.upstreamEchoes.miniKvV121.approvalRequiredBoundaryDetails).toHaveLength(6);
    expect(profile.upstreamEchoes.miniKvV121.approvalRequiredBoundaryDetails.map((detail) => detail.code)).toEqual(
      APPROVAL_REQUIRED_BOUNDARIES,
    );
  });

  it("uses committed historical fixture fallback for GitHub runner style checks", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile.verificationState).toBe("credential-resolver-approval-required-boundary-upstream-echo-verification-ready");
    expect(profile.upstreamEchoes.javaV115.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.miniKvV121.evidenceFiles.every((file) => file.exists)).toBe(true);
    expect(profile.upstreamEchoes.javaV115.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/115/解释/说明.md",
    );
    expect(profile.upstreamEchoes.miniKvV121.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-approval-required-boundary-non-participation-receipt.json",
    );
  });

  it("freezes portable fallback JSON and Markdown across the hotspot split", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    const stableProfile = {
      ...profile,
      generatedAt: "2026-07-20T00:00:00.000Z",
    };
    const normalizedProfile = normalizeForParity(stableProfile) as typeof stableProfile;
    const json = JSON.stringify(normalizedProfile);
    const markdown = normalizeText(
      renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown(
        normalizedProfile,
      ),
    );

    expect.soft(Buffer.byteLength(json, "utf8")).toBe(38_431);
    expect.soft(sha256(json)).toBe(
      "fe1823311fcd14e730e875dc546548df777c041ef76c9e2c978a2ac5c96bfade",
    );
    expect.soft(Buffer.byteLength(markdown, "utf8")).toBe(37_992);
    expect.soft(sha256(markdown)).toBe(
      "6f29d65826ad60d4f960a88835b7d8b202f2b1979695551295b8690e17dca1c8",
    );
  });

  it("blocks when upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
    expect(profile.realResolverImplementationAllowed).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.externalRequestSent).toBe(false);
    expect(profile.resolverClientInstantiated).toBe(false);
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
          "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification.v1",
        verificationState:
          "credential-resolver-approval-required-boundary-upstream-echo-verification-ready",
        readOnlyUpstreamEchoVerification: true,
        upstreamEchoes: {
          javaV115: {
            readyForNodeV275Alignment: true,
            approvalRequiredBoundaryExplanationCount: 6,
          },
          miniKvV121: {
            releaseVersion: "v121",
            readyForNodeV275Alignment: true,
            credentialResolverImplemented: false,
            resolverClientInstantiated: false,
            secretProviderInstantiated: false,
          },
        },
        checks: {
          approvalRequiredBoundaryCodesAligned: true,
          prohibitedRuntimeActionsAligned: true,
          javaRecordsSplitApplied: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver approval-required boundary upstream echo verification",
      );
      expect(markdown.body).toContain(
        "credential-resolver-approval-required-boundary-upstream-echo-verification-ready",
      );
      expect(markdown.body).toContain("ARCHIVE_V275_UNDER_NEW_DOCUMENT_DIRECTORIES");
      expect(markdown.body).toContain("CONTINUE_WITH_NODE_V276_STATUS_ROUTES_QUALITY_PASS");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-275",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v275-credential-resolver-approval-required-boundary-upstream-echo-verification",
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
    PORT: "4375",
    ...overrides,
  });
}

function normalizeForParity(value: unknown): unknown {
  if (typeof value === "string") {
    return normalizeText(value);
  }
  if (Array.isArray(value)) {
    return value.map(normalizeForParity);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeForParity(entry)]),
    );
  }
  return value;
}

function normalizeText(value: string): string {
  const repositoryRoot = process.cwd().replace(/\\/g, "/");
  return value.replace(/\\/g, "/").replaceAll(repositoryRoot, "<repo>");
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
