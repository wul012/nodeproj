import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createOperationApprovalExecutionContractDiagnostics,
} from "../src/services/operationApprovalExecutionContractDiagnostics.js";

const openTcpServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openTcpServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval execution gate archive routes", () => {
  it("archives an approved mini-kv execution gate preview without executing upstream writes", async () => {
    const seenCommands: string[] = [];
    const server = net.createServer((socket) => {
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => {
        const command = chunk.trim();
        seenCommands.push(command);
        if (command === "COMMANDSJSON") {
          socket.end('{"commands":[{"name":"SET","category":"write","mutates_store":true,"touches_wal":true},{"name":"GET","category":"read","mutates_store":false,"touches_wal":false}]}\n');
          return;
        }
        if (command.startsWith("KEYSJSON")) {
          socket.end('{"prefix":"orderops:","key_count":1,"keys":["orderops:preview"],"truncated":false,"limit":1000}\n');
          return;
        }
        if (command.startsWith("EXPLAINJSON")) {
          socket.end('{"schema_version":1,"command_digest":"fnv1a64:1234567890abcdef","command":"SET","category":"write","mutates_store":true,"touches_wal":true,"key":"orderops:preview","requires_value":true,"ttl_sensitive":false,"allowed_by_parser":true,"warnings":[],"side_effects":["store_write","wal_append_when_enabled"],"side_effect_count":2}\n');
          return;
        }
        if (command.startsWith("CHECKJSON")) {
          socket.end('{"schema_version":1,"read_only":true,"execution_allowed":false,"command_digest":"fnv1a64:1234567890abcdef","command":"SET","write_command":true,"allowed_by_parser":true,"side_effects":["store_write","wal_append_when_enabled"],"side_effect_count":2,"checks":{"parser_allowed":true,"write_command":true,"wal_append_when_enabled":true,"wal_enabled":true},"wal":{"enabled":true,"touches_wal":true,"append_when_enabled":true,"durability":"wal_backed"},"warnings":[]}\n');
          return;
        }
        socket.end("OK\n");
      });
    });
    openTcpServers.push(server);

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(address.port),
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "kv-set",
          operatorId: "local-admin",
          role: "admin",
        },
      });
      const intent = created.json();
      await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${intent.id}/confirm`,
        payload: {
          operatorId: "local-admin",
          confirmText: intent.confirmation.requiredText,
        },
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/operation-dispatches",
        payload: {
          intentId: intent.id,
          requestedBy: "local-admin",
        },
      });
      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/operation-approval-requests",
        payload: {
          intentId: intent.id,
          requestedBy: "local-admin",
          reviewer: "ops-reviewer",
          keyPrefix: "orderops:",
          key: "orderops:preview",
          value: "preview-value",
        },
      });
      const decision = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/decision`,
        payload: {
          decision: "approved",
          reviewer: "ops-reviewer",
          reason: "reviewed execution gate preview",
        },
      });
      const gatePreview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview`,
      });
      const archive = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-archive`,
        payload: {
          reviewer: "ops-reviewer",
          note: "archive v69 execution gate preview",
        },
      });
      const listed = await app.inject({
        method: "GET",
        url: "/api/v1/operation-approval-execution-gate-archives",
      });
      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}?format=markdown`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/verification`,
      });
      const verificationMarkdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/verification?format=markdown`,
      });
      const contractBundle = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/execution-contract-bundle`,
      });
      const contractBundleMarkdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/execution-contract-bundle?format=markdown`,
      });
      const diagnostics = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/execution-contract-diagnostics`,
      });
      const diagnosticsMarkdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/execution-contract-diagnostics?format=markdown`,
      });

      expect(gatePreview.statusCode).toBe(200);
      expect(gatePreview.json()).toMatchObject({
        state: "review-required",
        executionAllowed: false,
        summary: {
          requiredUpstreamEvidenceAvailable: true,
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
          miniKvExecutionContractStatus: "available",
          miniKvCheckReadOnly: true,
          miniKvCheckExecutionAllowed: false,
          miniKvCheckDurability: "wal_backed",
        },
      });
      expect(archive.statusCode).toBe(201);
      expect(archive.json()).toMatchObject({
        service: "orderops-node",
        sequence: 1,
        reviewer: "ops-reviewer",
        reviewerNote: "archive v69 execution gate preview",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "review-required",
        previewOnly: true,
        executionAllowed: false,
        summary: {
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
        },
      });
      expect(archive.json().archiveId).toHaveLength(36);
      expect(archive.json().gateDigest.value).toHaveLength(64);
      expect(archive.json().bundleDigest.value).toHaveLength(64);
      expect(archive.json().archiveDigest.value).toHaveLength(64);
      expect(listed.statusCode).toBe(200);
      expect(listed.json().archives).toHaveLength(1);
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval execution gate archive record");
      expect(markdown.body).toContain("- Execution allowed: false");
      expect(markdown.body).toContain("- Reviewer note: archive v69 execution gate preview");
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        archiveId: archive.json().archiveId,
        sequence: 1,
        valid: true,
        storedArchiveDigest: archive.json().archiveDigest,
        recomputedArchiveDigest: archive.json().archiveDigest,
        storedGateDigest: archive.json().gateDigest,
        archivedPreviewGateDigest: archive.json().preview.gateDigest,
        storedBundleDigest: archive.json().bundleDigest,
        archivedPreviewBundleDigest: archive.json().preview.bundleDigest,
        checks: {
          archiveDigestValid: true,
          gateDigestMatchesPreview: true,
          bundleDigestMatchesPreview: true,
          requestIdMatchesPreview: true,
          decisionIdMatchesPreview: true,
          intentIdMatchesPreview: true,
          requestLedgerMatches: true,
          decisionLedgerMatches: true,
          executionAllowedStillFalse: true,
          previewOnlyStillTrue: true,
        },
      });
      expect(verificationMarkdown.statusCode).toBe(200);
      expect(verificationMarkdown.body).toContain("# Operation approval execution gate archive verification");
      expect(verificationMarkdown.body).toContain("- Valid: true");
      expect(verificationMarkdown.body).toContain("- Archive digest valid: true");
      expect(contractBundle.statusCode).toBe(200);
      expect(contractBundle.json()).toMatchObject({
        service: "orderops-node",
        archiveId: archive.json().archiveId,
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        executionAllowed: false,
        summary: {
          archiveVerificationValid: true,
          miniKvExecutionContractStatus: "available",
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvCheckReadOnly: true,
          miniKvCheckExecutionAllowed: false,
          miniKvCheckDurability: "wal_backed",
          missingReferenceCount: 0,
          invalidReferenceCount: 0,
        },
        references: expect.arrayContaining([
          expect.objectContaining({ name: "execution-gate-archive-record", applicable: true, present: true, valid: true }),
          expect.objectContaining({ name: "execution-gate-preview", applicable: true, present: true, valid: true }),
          expect.objectContaining({ name: "archive-verification", applicable: true, present: true, valid: true }),
          expect.objectContaining({ name: "mini-kv-checkjson-contract", applicable: true, present: true, valid: true }),
          expect.objectContaining({ name: "java-execution-contract", applicable: false, present: false, valid: true }),
        ]),
      });
      expect(contractBundle.json().bundleDigest.value).toHaveLength(64);
      expect(contractBundleMarkdown.statusCode).toBe(200);
      expect(contractBundleMarkdown.body).toContain("# Operation approval execution contract archive bundle");
      expect(contractBundleMarkdown.body).toContain("- mini-kv CHECKJSON contract: available");
      expect(contractBundleMarkdown.body).toContain("### mini-kv-checkjson-contract");
      expect(diagnostics.statusCode).toBe(200);
      expect(diagnostics.json()).toMatchObject({
        service: "orderops-node",
        archiveId: archive.json().archiveId,
        valid: true,
        summary: {
          archiveVerificationValid: true,
          diagnosticCount: 0,
          errorCount: 0,
          warningCount: 0,
          miniKvExecutionContractStatus: "available",
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvCheckReadOnly: true,
          miniKvCheckExecutionAllowed: false,
        },
        diagnostics: [],
      });
      expect(diagnostics.json().diagnosticsDigest.value).toHaveLength(64);
      expect(diagnosticsMarkdown.statusCode).toBe(200);
      expect(diagnosticsMarkdown.body).toContain("# Operation approval execution contract mismatch diagnostics");
      expect(diagnosticsMarkdown.body).toContain("- Diagnostic count: 0");
      expect(diagnosticsMarkdown.body).toContain("- No execution contract mismatch diagnostics.");

      const corruptedArchive = structuredClone(archive.json());
      corruptedArchive.preview.gateDigest.value = "0000000000000000000000000000000000000000000000000000000000000000";
      corruptedArchive.summary.miniKvCheckExecutionAllowed = true;
      corruptedArchive.gateChecks.miniKvCheckExecutionAllowedOk = false;
      const corruptedVerification = structuredClone(verification.json());
      corruptedVerification.valid = false;
      corruptedVerification.checks.gateDigestMatchesPreview = false;
      corruptedVerification.archivedPreviewGateDigest.value = corruptedArchive.preview.gateDigest.value;
      const mismatchDiagnostics = createOperationApprovalExecutionContractDiagnostics(corruptedArchive, corruptedVerification);
      expect(mismatchDiagnostics.valid).toBe(false);
      expect(mismatchDiagnostics.diagnostics).toEqual(expect.arrayContaining([
        expect.objectContaining({ code: "GATE_DIGEST_PREVIEW_MISMATCH", field: "gateDigest" }),
        expect.objectContaining({ code: "MINI_KV_CHECK_EXECUTION_ALLOWED_ARCHIVE_PREVIEW_MISMATCH", field: "miniKvCheckExecutionAllowed" }),
        expect.objectContaining({ code: "MINIKV_CHECKJSON_EXECUTION_ALLOWED", field: "miniKvCheckExecutionAllowed" }),
      ]));

      const corruptedJavaArchive = structuredClone(archive.json());
      corruptedJavaArchive.summary.action = "failed-event-replay-simulation";
      corruptedJavaArchive.summary.target = "order-platform";
      corruptedJavaArchive.summary.javaExecutionContractStatus = "available";
      corruptedJavaArchive.summary.javaContractDigest = "not-a-sha256-digest";
      corruptedJavaArchive.summary.javaReplayPreconditionsSatisfied = false;
      corruptedJavaArchive.summary.javaDigestVerificationMode = "SERVER_ONLY";
      corruptedJavaArchive.gateChecks.javaExecutionContractEvidenceValid = false;
      corruptedJavaArchive.gateChecks.javaReplayPreconditionsSatisfiedOk = false;
      const javaMismatchDiagnostics = createOperationApprovalExecutionContractDiagnostics(corruptedJavaArchive, verification.json());
      expect(javaMismatchDiagnostics.valid).toBe(false);
      expect(javaMismatchDiagnostics.diagnostics).toEqual(expect.arrayContaining([
        expect.objectContaining({ code: "JAVA_CONTRACT_DIGEST_INVALID", field: "javaContractDigest" }),
        expect.objectContaining({ code: "JAVA_EXECUTION_CONTRACT_GATE_CHECK_FAILED" }),
        expect.objectContaining({ code: "JAVA_REPLAY_PRECONDITIONS_NOT_SATISFIED" }),
        expect.objectContaining({ code: "JAVA_DIGEST_VERIFICATION_MODE_MISMATCH" }),
      ]));
      expect(seenCommands.every((command) => !/^(SET|DEL|EXPIRE)\s/.test(command))).toBe(true);
    } finally {
      await app.close();
    }
  });
});
