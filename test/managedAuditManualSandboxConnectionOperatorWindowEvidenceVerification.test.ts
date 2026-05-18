import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification,
} from "../src/services/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.js";

describe("managed audit manual sandbox connection operator window evidence verification", () => {
  it("verifies Node v238 against Java v93 and mini-kv v102 without opening a connection", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1",
      verificationState: "manual-sandbox-connection-operator-window-evidence-verification-ready",
      readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyVerification: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV238: {
        sourceVersion: "Node v238",
        profileVersion: "managed-audit-manual-sandbox-connection-operator-window-checklist.v1",
        checklistState: "manual-sandbox-connection-operator-window-checklist-ready",
        readyForOperatorWindowChecklist: true,
        readyForJavaV93EchoReceipt: true,
        readyForSandboxAdapterConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        approvalItemCount: 3,
        checklistStepCount: 8,
        pauseConditionCount: 8,
        forbiddenOperationCount: 6,
        credentialValueRead: false,
        actualConnectionAttempted: false,
        schemaMigrationRequested: false,
        upstreamServiceAutoStartRequested: false,
      },
      upstreamEvidence: {
        javaV93: {
          sourceVersion: "Java v93",
          evidencePresent: true,
          receiptVersionDocumented: true,
          sourceNodeV238ProfileDocumented: true,
          nextNodeV239ProfileDocumented: true,
          readyForNodeV239EvidenceVerification: true,
          checklistCountsDocumented: true,
          checklistFieldNamesEchoed: true,
          approvalItemsEchoed: true,
          pauseCodesEchoed: true,
          credentialHandleOnly: true,
          credentialValueReadByJava: false,
          schemaMigrationSqlExecutedByJava: false,
          approvalLedgerWrittenByJava: false,
          actualConnectionAttemptedByJava: false,
          javaAutoStartForbidden: true,
          builderRecordSplitApplied: true,
          receiptDigestDocumented: true,
        },
        miniKvV102: {
          sourceVersion: "mini-kv v102",
          evidencePresent: true,
          receiptVersion: "mini-kv-operator-window-no-start-no-write-receipt.v1",
          projectVersion: "0.102.0",
          releaseVersion: "v102",
          consumerHint: "Node v239 manual sandbox connection operator window evidence verification",
          sourceChecklist: "Node v238 manual sandbox connection operator window checklist",
          sourceChecklistState: "manual-sandbox-connection-operator-window-checklist-ready",
          approvalItemCount: 3,
          checklistStepCount: 8,
          pauseConditionCount: 8,
          forbiddenOperationCount: 6,
          readyForJavaV93EchoReceipt: true,
          readyForManagedAuditSandboxAdapterConnection: false,
          currentArtifactPathHint: "c/102/",
          currentLiveReadSessionEcho: "mini-kv-live-read-v102",
          readOnly: true,
          executionAllowed: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          nodeAutoStartAllowed: false,
          javaAutoStartAllowed: false,
          miniKvAutoStartAllowed: false,
          connectionExecutionAllowed: false,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          runtimeWriteObserved: false,
          managedAuditStore: false,
          storageWriteAllowed: false,
          managedAuditWriteExecuted: false,
          sandboxManagedAuditStateWriteAllowed: false,
          credentialValueRequired: false,
          credentialValueReadAllowed: false,
          schemaRehearsalExecutionAllowed: false,
          schemaMigrationExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          operatorWindowWriteAllowed: false,
          currentDigestSetPresent: true,
          readyForNodeV239EvidenceVerification: true,
        },
      },
      operatorWindowEvidenceVerification: {
        markerSpan: "Node v238 + Java v93 + mini-kv v102",
        verificationMode: "manual-sandbox-connection-operator-window-evidence-verification-only",
        javaEchoAccepted: true,
        miniKvReceiptAccepted: true,
        checklistCountsAligned: true,
        boundaryFlagsAligned: true,
        connectionExecutionAllowed: false,
        credentialValueReadAllowed: false,
        schemaMigrationExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        automaticServiceStartAllowed: false,
        miniKvExecutionAllowed: false,
        nodeV239BlocksRealConnection: true,
      },
      checks: {
        sourceNodeV238ChecklistReady: true,
        sourceNodeV238StillConnectionBlocked: true,
        sourceNodeV238ChecklistDigestPresent: true,
        javaV93EvidencePresent: true,
        javaV93EchoAccepted: true,
        javaV93NoWriteNoSqlNoCredentialBoundaryAccepted: true,
        miniKvV102EvidencePresent: true,
        miniKvV102NoStartNoWriteReceiptAccepted: true,
        miniKvV102BoundaryAccepted: true,
        checklistCountsAlignedAcrossSources: true,
        operatorChecklistSourceAligned: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        miniKvExecutionStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification: true,
      },
      summary: {
        evidenceFileCount: 8,
        matchedSnippetCount: 28,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV238.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorWindowEvidenceVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
  });

  it("blocks verification when upstream actions are enabled while keeping source evidence readable", () => {
    const profile = loadManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionOperatorWindowEvidenceVerification).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.operatorWindowEvidenceVerification.javaEchoAccepted).toBe(true);
    expect(profile.operatorWindowEvidenceVerification.miniKvReceiptAccepted).toBe(true);
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.operatorWindowEvidenceVerification.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes for v239 operator window evidence verification", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-window-evidence-verification?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-connection-operator-window-evidence-verification.v1",
        verificationState: "manual-sandbox-connection-operator-window-evidence-verification-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        operatorWindowEvidenceVerification: {
          javaEchoAccepted: true,
          miniKvReceiptAccepted: true,
          checklistCountsAligned: true,
          boundaryFlagsAligned: true,
          connectionExecutionAllowed: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox connection operator window evidence verification");
      expect(markdown.body).toContain("EVIDENCE_VERIFICATION_ONLY_NO_CONNECTION");
      expect(markdown.body).toContain("Java v93");
      expect(markdown.body).toContain("mini-kv v102");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-239",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v239-operator-window-evidence-verification",
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4320",
    ...overrides,
  });
}
