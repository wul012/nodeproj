import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection sandbox endpoint credential resolver decision record", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("creates a credential resolver decision record from v259 while keeping resolution blocked", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1",
      decisionState: "sandbox-endpoint-credential-resolver-decision-record-ready",
      readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord: true,
      readOnlyDecisionRecord: true,
      credentialResolverDecisionOnly: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueLoaded: false,
      credentialValueIncluded: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlIncluded: false,
      externalRequestSent: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV259: {
        sourceVersion: "Node v259",
        verificationState: "sandbox-endpoint-handle-upstream-echo-verification-ready",
        readyForUpstreamEchoVerification: true,
        sourceSpan: "Node v258 + Java v104 + mini-kv v113",
        endpointHandleAligned: true,
        credentialHandleAligned: true,
        reviewCountsAligned: true,
        policyReviewsAligned: true,
        operatorWindowAligned: true,
        credentialBoundaryAligned: true,
        rawEndpointBoundaryAligned: true,
        connectionBoundaryAligned: true,
        writeBoundaryAligned: true,
        autoStartBoundaryAligned: true,
        miniKvNonParticipationAligned: true,
        nodeV259BlocksRealConnection: true,
        evidenceFileCount: 6,
        matchedSnippetCount: 39,
        checkCount: 19,
        passedCheckCount: 19,
        productionBlockerCount: 0,
        sourceNodeV258Ready: true,
        javaV104Ready: true,
        miniKvV113Ready: true,
        readyForNodeV260CredentialResolverDecisionRecord: true,
      },
      decisionRecord: {
        recordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
        decisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
        decisionStatus: "human-review-required-before-credential-resolution",
        sourceSpan: "Node v259 sandbox endpoint handle upstream echo verification",
        endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
        credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
        approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
        operatorIdentityRequired: true,
        approvalCorrelationRequired: true,
        resolverMode: "policy-record-only-no-value-read",
        resolverCandidateImplementation: "not-implemented",
        requiredDecisionFieldCount: 8,
        explicitNoGoConditionCount: 9,
        credentialValueMayBeRead: false,
        credentialValueMayBeLoaded: false,
        credentialValueMayBeStored: false,
        rawEndpointUrlMayBeParsed: false,
        managedAuditConnectionMayOpen: false,
        schemaMigrationMayExecute: false,
        externalRequestMayBeSent: false,
        nodeMayStartJavaOrMiniKv: false,
        miniKvMayActAsManagedAuditStorage: false,
        approvalLedgerMayBeWritten: false,
      },
      checks: {
        sourceNodeV259Ready: true,
        sourceNodeV259StillBlocksConnection: true,
        sourceNodeV259StillBlocksCredentialValue: true,
        sourceNodeV259StillBlocksRawEndpoint: true,
        sourceNodeV259StillBlocksWrites: true,
        sourceNodeV259StillBlocksAutoStart: true,
        sourceNodeV259KeepsMiniKvNonParticipant: true,
        endpointHandleRecorded: true,
        credentialHandleRecorded: true,
        resolverPolicyRecorded: true,
        approvalMarkerRecorded: true,
        operatorIdentityRequirementRecorded: true,
        approvalCorrelationRequirementRecorded: true,
        resolverModeStillPolicyOnly: true,
        explicitNoGoConditionsRecorded: true,
        decisionRecordStillReadOnly: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord: true,
      },
      summary: {
        requiredDecisionFieldCount: 8,
        explicitNoGoConditionCount: 9,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV259.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.decisionRecord.decisionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
    expect(profile.decisionRecord.requiredDecisionFields.map((field) => field.id)).toEqual([
      "endpoint-handle",
      "credential-handle",
      "resolver-policy-handle",
      "approval-marker",
      "operator-identity",
      "approval-correlation",
      "redaction-policy",
      "fallback-rotation-plan",
    ]);
    expect(profile.decisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "CREDENTIAL_VALUE_REQUIRED",
    );
    expect(profile.decisionRecord.explicitNoGoConditions.map((condition) => condition.code)).toContain(
      "REAL_CONNECTION_REQUIRED",
    );
  });

  it("uses committed historical fixture fallback through its source v259 chain", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
      config: loadTestConfig(),
    });

    expect(profile.decisionState).toBe("sandbox-endpoint-credential-resolver-decision-record-ready");
    expect(profile.sourceNodeV259.readyForNodeV260CredentialResolverDecisionRecord).toBe(true);
    expect(profile.sourceNodeV259.evidenceFileCount).toBe(6);
    expect(profile.sourceNodeV259.matchedSnippetCount).toBe(39);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.decisionState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.credentialValueRead).toBe(false);
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1",
        decisionState: "sandbox-endpoint-credential-resolver-decision-record-ready",
        decisionRecord: {
          resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
          credentialValueMayBeRead: false,
          managedAuditConnectionMayOpen: false,
        },
        checks: {
          sourceNodeV259Ready: true,
          resolverModeStillPolicyOnly: true,
          decisionRecordStillReadOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection sandbox endpoint credential resolver decision record",
      );
      expect(markdown.body).toContain("sandbox-endpoint-credential-resolver-decision-record-ready");
      expect(markdown.body).toContain("CREDENTIAL_VALUE_REQUIRED");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-260",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v260-credential-resolver-decision-record",
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
    PORT: "4360",
    ...overrides,
  });
}
