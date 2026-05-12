import http from "node:http";
import type { Server as HttpServer } from "node:http";
import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const openTcpServers: net.Server[] = [];
const openHttpServers: HttpServer[] = [];

afterEach(async () => {
  await Promise.all(openTcpServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
  await Promise.all(openHttpServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("operation approval evidence route", () => {
  it("reports incomplete evidence when a request has no reviewer decision", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

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
      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/operation-approval-requests",
        payload: {
          intentId: created.json().id,
          requestedBy: "local-admin",
          reviewer: "ops-reviewer",
          key: "orderops:preview",
          value: "preview-value",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/verification`,
      });
      const executionGatePreview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview`,
      });

      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        state: "missing-decision",
        summary: {
          requestStatus: "rejected",
          decision: "missing",
          upstreamTouched: false,
        },
      });
      expect(evidence.json().evidenceDigest.value).toHaveLength(64);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        valid: false,
        checks: {
          digestValid: true,
          decisionPresent: false,
          upstreamUntouched: false,
        },
      });
      expect(executionGatePreview.statusCode).toBe(200);
      expect(executionGatePreview.json()).toMatchObject({
        state: "blocked",
        previewOnly: true,
        executionAllowed: false,
        gateChecks: {
          requestApproved: false,
          decisionApproved: false,
          requiredUpstreamEvidenceAvailable: false,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("builds and verifies a complete approved evidence report", async () => {
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
          reason: "reviewed v64 approval evidence",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/verification`,
      });
      const markdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence?format=markdown`,
      });
      const bundle = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence-bundle`,
      });
      const bundleMarkdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence-bundle?format=markdown`,
      });
      const executionGatePreview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview`,
      });
      const executionGatePreviewMarkdown = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview?format=markdown`,
      });

      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "approved",
        summary: {
          requestStatus: "approved",
          decision: "approved",
          reviewer: "ops-reviewer",
          upstreamTouched: false,
          readyForApprovalRequest: true,
          javaApprovalStatus: "not_applicable",
          miniKvExplainCoverage: "available",
          miniKvSideEffects: ["store_write", "wal_append_when_enabled"],
          miniKvSchemaVersion: 1,
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
          miniKvExecutionContractStatus: "available",
          miniKvCheckReadOnly: true,
          miniKvCheckExecutionAllowed: false,
          miniKvCheckDurability: "wal_backed",
        },
        upstreamEvidence: {
          miniKvExplainCoverage: {
            status: "available",
          },
        },
      });
      expect(evidence.json().summary.previewDigest).toEqual(approval.json().previewDigest);
      expect(evidence.json().summary.decisionDigest).toEqual(decision.json().decisionDigest);
      expect(evidence.json().evidenceDigest.value).toHaveLength(64);

      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        valid: true,
        state: "approved",
        checks: {
          digestValid: true,
          requestMatches: true,
          decisionPresent: true,
          decisionMatchesRequest: true,
          requestPreviewDigestValid: true,
          decisionDigestValid: true,
          summaryMatches: true,
          upstreamEvidenceMatchesSummary: true,
          javaApprovalDigestEvidenceValid: true,
          javaExecutionContractEvidenceValid: true,
          miniKvCommandDigestEvidenceValid: true,
          miniKvSideEffectCountMatches: true,
          miniKvExecutionContractEvidenceValid: true,
          nextActionsMatch: true,
          upstreamUntouched: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Operation approval evidence report");
      expect(markdown.body).toContain("- State: approved");
      expect(markdown.body).toContain("- Upstream touched: false");
      expect(markdown.body).toContain("mini-kv.store-would-mutate");
      expect(markdown.body).toContain("- mini-kv EXPLAINJSON coverage: available");
      expect(markdown.body).toContain("- store_write");
      expect(markdown.body).toContain("- wal_append_when_enabled");
      expect(bundle.statusCode).toBe(200);
      expect(bundle.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "approved",
        handoffReady: true,
        summary: {
          action: "kv-set",
          target: "mini-kv",
          verificationValid: true,
          upstreamTouched: false,
          miniKvExplainCoverage: "available",
          miniKvSideEffects: ["store_write", "wal_append_when_enabled"],
          miniKvSchemaVersion: 1,
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
          miniKvExecutionContractStatus: "available",
          miniKvCheckReadOnly: true,
          miniKvCheckExecutionAllowed: false,
          miniKvCheckDurability: "wal_backed",
          artifactCount: 5,
          missingArtifactCount: 0,
          invalidArtifactCount: 0,
        },
        artifacts: expect.arrayContaining([
          expect.objectContaining({ name: "approval-request", present: true, valid: true }),
          expect.objectContaining({ name: "approval-decision", present: true, valid: true }),
          expect.objectContaining({ name: "approval-evidence-report", present: true, valid: true }),
          expect.objectContaining({ name: "approval-evidence-verification", present: true, valid: true }),
          expect.objectContaining({ name: "upstream-evidence", present: true, valid: true }),
        ]),
      });
      expect(bundle.json().bundleDigest.value).toHaveLength(64);
      expect(bundleMarkdown.statusCode).toBe(200);
      expect(bundleMarkdown.body).toContain("# Operation approval handoff bundle");
      expect(bundleMarkdown.body).toContain("- Handoff ready: true");
      expect(bundleMarkdown.body).toContain("### approval-evidence-verification");
      expect(bundleMarkdown.body).toContain("- mini-kv command digest: fnv1a64:1234567890abcdef");
      expect(bundleMarkdown.body).toContain("- mini-kv side_effect_count: 2");
      expect(bundleMarkdown.body).toContain("- store_write");
      expect(executionGatePreview.statusCode).toBe(200);
      expect(executionGatePreview.json()).toMatchObject({
        service: "orderops-node",
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        intentId: intent.id,
        state: "review-required",
        previewOnly: true,
        executionAllowed: false,
        summary: {
          action: "kv-set",
          target: "mini-kv",
          requestStatus: "approved",
          decision: "approved",
          handoffReady: true,
          verificationValid: true,
          upstreamTouched: false,
          requiredUpstreamEvidenceAvailable: true,
          miniKvExplainCoverage: "available",
          miniKvCommandDigest: "fnv1a64:1234567890abcdef",
          miniKvSideEffectCount: 2,
          hardBlockerCount: 0,
        },
        gateChecks: {
          requestApproved: true,
          decisionApproved: true,
          handoffReady: true,
          evidenceVerificationValid: true,
          upstreamUntouched: true,
          noRequestHardBlockers: true,
          requiredUpstreamEvidenceAvailable: true,
          javaApprovedForReplayOk: true,
          javaApprovalDigestEvidenceValid: true,
          javaExecutionContractEvidenceValid: true,
          javaReplayPreconditionsSatisfiedOk: true,
          miniKvCommandDigestEvidenceValid: true,
          miniKvSideEffectCountMatches: true,
          miniKvExecutionContractEvidenceValid: true,
          miniKvCheckReadOnlyOk: true,
          miniKvCheckExecutionAllowedOk: true,
        },
        hardBlockers: [],
      });
      expect(executionGatePreview.json().gateDigest.value).toHaveLength(64);
      expect(executionGatePreviewMarkdown.statusCode).toBe(200);
      expect(executionGatePreviewMarkdown.body).toContain("# Operation approval execution gate preview");
      expect(executionGatePreviewMarkdown.body).toContain("- Execution allowed: false");
      expect(executionGatePreviewMarkdown.body).toContain("- mini-kv command digest: fnv1a64:1234567890abcdef");
      expect(executionGatePreviewMarkdown.body).toContain("- mini-kv CHECKJSON execution_allowed: false");
      expect(seenCommands[0]).toBe("COMMANDSJSON");
      expect(seenCommands[1]).toBe("KEYSJSON orderops:");
      expect(seenCommands.filter((command) => command === "EXPLAINJSON SET orderops:preview preview-value")).toHaveLength(8);
      expect(seenCommands.filter((command) => command === "CHECKJSON SET orderops:preview preview-value")).toHaveLength(7);
    } finally {
      await app.close();
    }
  });

  it("attaches Java v40 approval-status evidence for approved replay simulations", async () => {
    const seenRequests: string[] = [];
    const server = http.createServer((request, response) => {
      const path = request.url ?? "/";
      seenRequests.push(`${request.method ?? "GET"} ${path}`);
      response.setHeader("content-type", "application/json");

      if (path === "/api/v1/failed-events/42/replay-simulation") {
        response.end(JSON.stringify({
          sampledAt: "2026-05-11T03:40:00.000Z",
          failedEventId: 42,
          exists: true,
          eligibleForReplay: true,
          wouldReplay: true,
          wouldPublishOutbox: true,
          wouldChangeManagementStatus: true,
          requiredApprovalStatus: "APPROVED",
          expectedSideEffects: ["order-event-replayed", "outbox-message-created"],
          blockedBy: [],
          warnings: ["approval-required-before-real-replay"],
          nextAllowedActions: ["REQUEST_REPLAY_APPROVAL"],
        }));
        return;
      }

      if (path === "/api/v1/failed-events/42/approval-status") {
        response.end(JSON.stringify({
          evidenceVersion: "failed-event-approval-status.v1",
          approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          sampledAt: "2026-05-11T03:41:00.000Z",
          failedEventId: 42,
          exists: true,
          failedEventStatus: "FAILED",
          managementStatus: "WAITING_REPLAY",
          approvalStatus: "APPROVED",
          requiredApprovalStatus: "APPROVED",
          approvalRequested: true,
          approvalPending: false,
          approvedForReplay: true,
          rejected: false,
          requestReason: "ops review",
          requestedBy: "ops-user",
          requestedAt: "2026-05-11T03:39:00.000Z",
          reviewedBy: "ops-reviewer",
          reviewedAt: "2026-05-11T03:40:30.000Z",
          reviewNote: "approved in Java v40 mock",
          historyCount: 1,
          latestApproval: {
            action: "APPROVED",
            status: "APPROVED",
            operatorId: "ops-reviewer",
            operatorRole: "OPERATOR",
            note: "approved in Java v40 mock",
            changedAt: "2026-05-11T03:40:30.000Z",
          },
          approvalBlockedBy: [],
          nextAllowedActions: ["REPLAY_FAILED_EVENT"],
        }));
        return;
      }

      if (path === "/api/v1/failed-events/42/replay-execution-contract") {
        response.end(JSON.stringify({
          sampledAt: "2026-05-11T03:42:00.000Z",
          failedEventId: 42,
          exists: true,
          contractVersion: "failed-event-replay-execution-contract.v1",
          contractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          approvalEvidenceVersion: "failed-event-approval-status.v1",
          approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          failedEventStatus: "FAILED",
          managementStatus: "WAITING_REPLAY",
          approvalStatus: "APPROVED",
          requiredApprovalStatus: "APPROVED",
          replayPreconditionsSatisfied: true,
          realReplayEndpointEnforcesApprovalDigest: false,
          realReplayEndpointEnforcesReplayEligibilityDigest: false,
          digestVerificationMode: "CLIENT_PRECHECK_ONLY",
          realExecutionMethod: "POST",
          realExecutionPath: "/api/v1/failed-events/{id}/replay",
          requiredOperatorAction: "REPLAY_FAILED_EVENT",
          idempotencyKeyHint: "failed-event-replay:42",
          expectedAggregateId: "order-42",
          executionChecks: [
            {
              checkId: "REPLAY_APPROVAL_APPROVED",
              source: "FailedEventMessageService.replay",
              category: "APPROVAL",
              required: true,
              status: "PASSED",
              requiredValue: "approvalStatus=APPROVED",
              currentValue: "approvalStatus=APPROVED",
              evidenceDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              blockedBy: [],
            },
          ],
          requestRequirements: [
            {
              field: "Idempotency-Key",
              requiredForPost: true,
              rule: "non-empty",
              fallback: "none",
            },
          ],
          blockedBy: [],
          warnings: ["client-precheck-only"],
          expectedSideEffects: ["order-event-replayed", "outbox-message-created"],
          nextAllowedActions: ["REPLAY_FAILED_EVENT"],
        }));
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not-found", path }));
    });
    openHttpServers.push(server);

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      ORDER_PLATFORM_URL: `http://127.0.0.1:${address.port}`,
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const created = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          action: "failed-event-replay-simulation",
          operatorId: "ops-user",
          role: "operator",
        },
      });
      const intent = created.json();
      await app.inject({
        method: "POST",
        url: `/api/v1/operation-intents/${intent.id}/confirm`,
        payload: {
          operatorId: "ops-user",
          confirmText: intent.confirmation.requiredText,
        },
      });
      const approval = await app.inject({
        method: "POST",
        url: "/api/v1/operation-approval-requests",
        payload: {
          intentId: intent.id,
          requestedBy: "ops-user",
          reviewer: "ops-reviewer",
          failedEventId: "42",
        },
      });
      const decision = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/decision`,
        payload: {
          decision: "approved",
          reviewer: "ops-reviewer",
          reason: "reviewed Java v40 approval-status evidence",
        },
      });
      const evidence = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/evidence`,
      });
      const verification = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/verification`,
      });
      const executionGatePreview = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-preview`,
      });
      const archive = await app.inject({
        method: "POST",
        url: `/api/v1/operation-approval-requests/${approval.json().requestId}/execution-gate-archive`,
        payload: {
          reviewer: "ops-reviewer",
          note: "archive Java execution contract bundle",
        },
      });
      const contractBundle = await app.inject({
        method: "GET",
        url: `/api/v1/operation-approval-execution-gate-archives/${archive.json().archiveId}/execution-contract-bundle`,
      });

      expect(evidence.statusCode).toBe(200);
      expect(evidence.json()).toMatchObject({
        state: "approved",
        decisionId: decision.json().decisionId,
        summary: {
          action: "failed-event-replay-simulation",
          target: "order-platform",
          javaApprovalStatus: "available",
          javaApprovedForReplay: true,
          javaEvidenceVersion: "failed-event-approval-status.v1",
          javaApprovalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          javaReplayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          javaExecutionContractStatus: "available",
          javaContractVersion: "failed-event-replay-execution-contract.v1",
          javaContractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          javaReplayPreconditionsSatisfied: true,
          javaDigestVerificationMode: "CLIENT_PRECHECK_ONLY",
          miniKvExplainCoverage: "not_applicable",
        },
        upstreamEvidence: {
          javaApprovalStatus: {
            status: "available",
            details: {
              failedEventId: "42",
              approvalStatus: {
                evidenceVersion: "failed-event-approval-status.v1",
                approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                approvalStatus: "APPROVED",
                approvedForReplay: true,
                nextAllowedActions: ["REPLAY_FAILED_EVENT"],
              },
            },
          },
        },
      });
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        valid: true,
        checks: {
          upstreamEvidenceMatchesSummary: true,
          javaApprovalDigestEvidenceValid: true,
          javaExecutionContractEvidenceValid: true,
          miniKvCommandDigestEvidenceValid: true,
          miniKvSideEffectCountMatches: true,
          miniKvExecutionContractEvidenceValid: true,
          upstreamUntouched: true,
        },
      });
      expect(executionGatePreview.statusCode).toBe(200);
      expect(executionGatePreview.json()).toMatchObject({
        state: "review-required",
        previewOnly: true,
        executionAllowed: false,
        summary: {
          action: "failed-event-replay-simulation",
          target: "order-platform",
          requestStatus: "approved",
          decision: "approved",
          handoffReady: true,
          verificationValid: true,
          upstreamTouched: false,
          requiredUpstreamEvidenceAvailable: true,
          javaApprovalStatus: "available",
          javaApprovedForReplay: true,
          javaApprovalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          javaReplayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
          javaExecutionContractStatus: "available",
          javaContractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          javaReplayPreconditionsSatisfied: true,
          javaDigestVerificationMode: "CLIENT_PRECHECK_ONLY",
          hardBlockerCount: 0,
        },
        gateChecks: {
          requestApproved: true,
          decisionApproved: true,
          handoffReady: true,
          evidenceVerificationValid: true,
          upstreamUntouched: true,
          noRequestHardBlockers: true,
          requiredUpstreamEvidenceAvailable: true,
          javaApprovedForReplayOk: true,
          javaApprovalDigestEvidenceValid: true,
          javaExecutionContractEvidenceValid: true,
          javaReplayPreconditionsSatisfiedOk: true,
        },
      });
      expect(archive.statusCode).toBe(201);
      expect(contractBundle.statusCode).toBe(200);
      expect(contractBundle.json()).toMatchObject({
        archiveId: archive.json().archiveId,
        requestId: approval.json().requestId,
        decisionId: decision.json().decisionId,
        executionAllowed: false,
        summary: {
          archiveVerificationValid: true,
          javaExecutionContractStatus: "available",
          javaContractVersion: "failed-event-replay-execution-contract.v1",
          javaContractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          javaReplayPreconditionsSatisfied: true,
          javaDigestVerificationMode: "CLIENT_PRECHECK_ONLY",
          missingReferenceCount: 0,
          invalidReferenceCount: 0,
        },
        references: expect.arrayContaining([
          expect.objectContaining({ name: "java-execution-contract", applicable: true, present: true, valid: true }),
          expect.objectContaining({ name: "mini-kv-checkjson-contract", applicable: false, present: false, valid: true }),
        ]),
      });
      expect(seenRequests).toEqual([
        "GET /api/v1/failed-events/42/replay-simulation",
        "GET /api/v1/failed-events/42/approval-status",
        "GET /api/v1/failed-events/42/replay-execution-contract",
        "GET /api/v1/failed-events/42/approval-status",
        "GET /api/v1/failed-events/42/replay-execution-contract",
        "GET /api/v1/failed-events/42/approval-status",
        "GET /api/v1/failed-events/42/replay-execution-contract",
        "GET /api/v1/failed-events/42/approval-status",
        "GET /api/v1/failed-events/42/replay-execution-contract",
      ]);
    } finally {
      await app.close();
    }
  });
});
