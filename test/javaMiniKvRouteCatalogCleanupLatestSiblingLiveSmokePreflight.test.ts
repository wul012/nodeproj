import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight.js";
import {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightMarkdown,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightRenderer.js";

describe("Java/mini-kv route catalog cleanup latest sibling live smoke preflight", () => {
  it("declares concrete startup, read target, and cleanup rules for the local live smoke execution", () => {
    const preflight = loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight({
      config: loadTestConfig(),
    });

    expect(preflight).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-preflight.v1",
      activeNodeVersion: "Node v544",
      sourceNodeVersion: "Node v543",
      plannedExecutionVersion: "Node v545",
      preflightState: "ready",
      readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight: true,
      readyForRouteCatalogCleanupLatestSiblingLiveSmokeExecution: true,
      preflightOnly: true,
      startsJavaService: false,
      startsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      executionAllowed: false,
      sourceArchiveVerification: {
        routeExposedByNodeVersion: "Node v543",
        ready: true,
      },
      liveSmokeWindow: {
        operatorAuthorization: "user-granted-cross-project-local-start-permission",
        nodeBaseUrl: "http://127.0.0.1:4190",
        javaBaseUrl: "http://127.0.0.1:8080",
        miniKvTarget: "127.0.0.1:6524",
        processCleanupRequired: true,
        portPrecheckRequiredBeforeStart: true,
      },
      summary: {
        processCount: 3,
        readTargetCount: 9,
        nodeTargetCount: 3,
        javaTargetCount: 2,
        miniKvTargetCount: 4,
      },
    });

    expect(preflight.summary.checkCount).toBe(preflight.summary.passedCheckCount);
    expect(Object.values(preflight.checks).every(Boolean)).toBe(true);
    expect(preflight.liveSmokeWindow.preflightDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(preflight.processPlan.map((step) => step.port)).toEqual([4190, 8080, 6524]);
    expect(preflight.readTargets.map((target) => target.methodOrCommand)).toEqual([
      "GET",
      "GET",
      "GET",
      "GET",
      "GET",
      "HEALTH",
      "COMMANDSJSON",
      "SHARDJSON",
      "QUIT",
    ]);

    const markdown = renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightMarkdown(preflight);
    expect(markdown).toContain("Ready for live smoke execution: true");
    expect(markdown).toContain("mvn spring-boot:run -Dspring-boot.run.profiles=local");
    expect(markdown).toContain(".\\cmake-build-debug\\minikv_server.exe 6524 127.0.0.1");
    expect(markdown).toContain("cleanupRulesDeclared: true");
  });
});

function loadTestConfig() {
  return loadConfig({
    HOST: "127.0.0.1",
    PORT: "4190",
    LOG_LEVEL: "silent",
    ORDER_PLATFORM_URL: "http://127.0.0.1:8080",
    MINIKV_HOST: "127.0.0.1",
    MINIKV_PORT: "6524",
    UPSTREAM_PROBES_ENABLED: "true",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ORDEROPS_AUTH_MODE: "disabled",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "false",
  });
}
