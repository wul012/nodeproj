import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadThreeProjectRealReadRuntimeSmokeExecutionPacket,
} from "../src/services/threeProjectRealReadRuntimeSmokeExecutionPacket.js";
import type { UpstreamJsonResponse } from "../src/types.js";

describe("three-project real-read runtime smoke execution packet", () => {
  it("records closed-window skips without touching Java or mini-kv", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
      config: loadTestConfig(),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      profileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1",
      packetState: "closed-window-skipped",
      readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: false,
      readyForArchiveVerification: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      sourcePreflight: {
        profileVersion: "three-project-real-read-runtime-smoke-preflight.v1",
        preflightState: "closed-window-preflight-ready",
        ready: true,
        runtimeCandidate: false,
      },
      smokeSession: {
        sessionId: "runtime-smoke-v205-session-001",
        windowMode: "closed-window-plan",
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        realRuntimeSmokeExecuted: false,
        plannedTargetCount: 8,
        attemptedTargetCount: 0,
        passedTargetCount: 0,
        skippedTargetCount: 8,
        failedTargetCount: 0,
      },
      checks: {
        closedWindowSkipsWithoutAttempt: true,
        openWindowAttemptsAllTargets: true,
        openWindowAllTargetsPassed: false,
        readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: false,
        readyForArchiveVerification: false,
      },
      summary: {
        recordCount: 8,
        attemptedTargetCount: 0,
        skippedTargetCount: 8,
        productionBlockerCount: 1,
      },
    });
    expect(profile.smokeSession.executionDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.records.every((record) => record.status === "skipped-closed-window" && !record.attempted)).toBe(true);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_RUNTIME_SMOKE_CLOSED_WINDOW",
    ]);
  });

  it("executes all read targets when upstream probes are enabled", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
      config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
      orderPlatform: new PassingOrderPlatformClient(),
      miniKv: new PassingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      packetState: "executed-pass",
      readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: true,
      readyForArchiveVerification: true,
      smokeSession: {
        windowMode: "manual-open-window-plan",
        upstreamProbesEnabled: true,
        realRuntimeSmokeExecuted: true,
        plannedTargetCount: 8,
        attemptedTargetCount: 8,
        passedTargetCount: 8,
        skippedTargetCount: 0,
        failedTargetCount: 0,
      },
      upstreamEvidence: {
        javaV73: {
          hintVersion: "java-release-approval-rehearsal-live-readiness-hint.v1",
          readyForRuntimeSmokeRead: true,
          nodeMayTreatAsProductionAuthorization: false,
        },
        miniKvV82: {
          runtimeSmokeEvidenceVersion: "mini-kv-runtime-smoke-evidence.v7",
          sessionIdEcho: "mini-kv-live-read-v82",
          readCommandListDigest: "fnv1a64:5bef33f2fbe65cc5",
          readCommands: ["SMOKEJSON", "INFOJSON", "STORAGEJSON", "HEALTH"],
          writeCommandsAllowed: false,
          autoStartAllowed: false,
        },
      },
      checks: {
        sourcePreflightReady: true,
        javaV73HintAccepted: true,
        miniKvV82HintAccepted: true,
        openWindowAttemptsAllTargets: true,
        openWindowAllTargetsPassed: true,
        readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: true,
        readyForArchiveVerification: true,
      },
      summary: {
        attemptedTargetCount: 8,
        passedTargetCount: 8,
        failedTargetCount: 0,
        productionBlockerCount: 0,
      },
    });
    expect(profile.records.map((record) => record.id)).toEqual([
      "node-health",
      "node-v203-retention-gate",
      "java-health",
      "java-release-approval-rehearsal",
      "mini-kv-smokejson",
      "mini-kv-infojson",
      "mini-kv-storagejson",
      "mini-kv-health",
    ]);
    expect(profile.records.every((record) => record.status === "passed-read" && record.attempted)).toBe(true);
  });

  it("blocks when upstream actions are enabled", async () => {
    const profile = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
      config: loadTestConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }),
      orderPlatform: new ThrowingOrderPlatformClient(),
      miniKv: new ThrowingMiniKvClient(),
      headers: completeHeaders(),
    });

    expect(profile).toMatchObject({
      packetState: "closed-window-skipped",
      readyForThreeProjectRealReadRuntimeSmokeExecutionPacket: false,
      checks: {
        upstreamActionsStillDisabled: false,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_ACTIONS_ENABLED",
      "REAL_RUNTIME_SMOKE_CLOSED_WINDOW",
    ]));
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "three-project-real-read-runtime-smoke-execution-packet.v1",
        packetState: "closed-window-skipped",
        readyForProductionWindow: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Three-project real-read runtime smoke execution packet");
      expect(markdown.body).toContain("runtime-smoke-v205-session-001");
      expect(markdown.body).toContain("REAL_RUNTIME_SMOKE_CLOSED_WINDOW");
      expect(markdown.body).toContain("PROCEED_TO_NODE_V206_ARCHIVE_VERIFICATION");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "operator-205",
    "x-orderops-roles": "operator,auditor",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v205-runtime-smoke",
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
    PORT: "4305",
    ORDER_PLATFORM_URL: "http://127.0.0.1:18080",
    MINIKV_HOST: "127.0.0.1",
    MINIKV_PORT: "6420",
    ...overrides,
  });
}

class ThrowingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    throw new Error("closed-window execution packet must not call Java");
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    throw new Error("closed-window execution packet must not call Java");
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    throw new Error("closed-window execution packet must not call Java");
  }
}

class ThrowingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("closed-window execution packet must not call mini-kv");
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    throw new Error("closed-window execution packet must not call mini-kv");
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    throw new Error("closed-window execution packet must not call mini-kv");
  }

  execute(): Promise<{ command: string; response: string; latencyMs: number }> {
    throw new Error("closed-window execution packet must not call mini-kv");
  }
}

class PassingOrderPlatformClient {
  health(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 3,
      data: { status: "UP" },
    });
  }

  opsOverview(): Promise<UpstreamJsonResponse> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 4,
      data: { sampledAt: "2026-05-16T00:00:00.000Z" },
    });
  }

  releaseApprovalRehearsal(): Promise<UpstreamJsonResponse<Record<string, unknown>>> {
    return Promise.resolve({
      statusCode: 200,
      latencyMs: 5,
      data: {
        rehearsalVersion: "java-release-approval-rehearsal.v1",
        verificationHint: {
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v7",
        },
        liveReadinessHint: {
          hintVersion: "java-release-approval-rehearsal-live-readiness-hint.v1",
          readyForRuntimeSmokeRead: true,
          runtimeSmokeExecutedByJava: false,
          nodeMayTreatAsProductionAuthorization: false,
        },
      },
    });
  }
}

class PassingMiniKvClient {
  health(): Promise<{ command: string; response: string; latencyMs: number }> {
    return Promise.resolve({ command: "HEALTH", response: "OK version=0.82.0", latencyMs: 2 });
  }

  infoJson(): Promise<{ command: string; response: string; latencyMs: number; info: Record<string, unknown> }> {
    return Promise.resolve({
      command: "INFOJSON",
      response: JSON.stringify({ version: "0.82.0", read_only: true, execution_allowed: false }),
      latencyMs: 2,
      info: { version: "0.82.0", read_only: true, execution_allowed: false },
    });
  }

  statsJson(): Promise<{ command: string; response: string; latencyMs: number; stats: Record<string, unknown> }> {
    return Promise.resolve({
      command: "STATSJSON",
      response: JSON.stringify({ read_only: true, execution_allowed: false }),
      latencyMs: 2,
      stats: { read_only: true, execution_allowed: false },
    });
  }

  execute(command: string): Promise<{ command: string; response: string; latencyMs: number }> {
    if (command === "SMOKEJSON") {
      return Promise.resolve({
        command,
        response: JSON.stringify({
          version: "0.82.0",
          read_only: true,
          execution_allowed: false,
          restore_execution_allowed: false,
          order_authoritative: false,
          live_read_session: {
            session_id_echo: "mini-kv-live-read-v82",
            read_command_list_digest: "fnv1a64:5bef33f2fbe65cc5",
            write_commands_allowed: false,
            auto_start_allowed: false,
          },
        }),
        latencyMs: 2,
      });
    }
    if (command === "STORAGEJSON") {
      return Promise.resolve({
        command,
        response: JSON.stringify({
          version: "0.82.0",
          read_only: true,
          execution_allowed: false,
          order_authoritative: false,
        }),
        latencyMs: 2,
      });
    }
    return this.health();
  }
}
