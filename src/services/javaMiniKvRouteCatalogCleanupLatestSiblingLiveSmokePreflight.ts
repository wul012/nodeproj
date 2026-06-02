import type { AppConfig } from "../config.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification,
  type JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightRenderer.js";

type LiveSmokeProject = "node" | "java" | "mini-kv";

interface LiveSmokeProcessPlan {
  id: string;
  project: LiveSmokeProject;
  owner: string;
  cwd: string;
  host: "127.0.0.1";
  port: number;
  startCommand: string;
  readinessProbe: string;
  startupAllowedInExecutionVersion: true;
  stopPolicy: string;
  cleanupVerification: string;
  failClosedRule: string;
}

interface LiveSmokeReadTarget {
  id: string;
  project: LiveSmokeProject;
  protocol: "http" | "tcp-inline";
  methodOrCommand: string;
  target: string;
  expectedEvidence: string;
  readOnly: true;
  mutatesState: false;
}

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-preflight.v1";
  activeNodeVersion: "Node v544";
  sourceNodeVersion: "Node v543";
  plannedExecutionVersion: "Node v545";
  preflightState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight: boolean;
  readyForRouteCatalogCleanupLatestSiblingLiveSmokeExecution: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  preflightOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  sourceArchiveVerification: {
    routePath: string;
    profileVersion: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["profileVersion"];
    activeNodeVersion: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["activeNodeVersion"];
    routeExposedByNodeVersion: "Node v543";
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
  };
  liveSmokeWindow: {
    windowMode: "current-thread-authorized-local-read-only-smoke";
    operatorAuthorization: "user-granted-cross-project-local-start-permission";
    nodeBaseUrl: "http://127.0.0.1:4190";
    javaBaseUrl: "http://127.0.0.1:8080";
    miniKvTarget: "127.0.0.1:6524";
    nodeSmokePort: 4190;
    javaPort: 8080;
    miniKvPort: 6524;
    upstreamServiceStartupAllowedInExecutionVersion: true;
    upstreamWritesAllowed: false;
    managedAuditAccessAllowed: false;
    processCleanupRequired: true;
    portPrecheckRequiredBeforeStart: true;
    preflightDigest: string;
  };
  nodeSmokeEnvironment: Record<string, string>;
  processPlan: LiveSmokeProcessPlan[];
  readTargets: LiveSmokeReadTarget[];
  commandPolicy: {
    allowedHttpMethods: readonly ["GET"];
    forbiddenHttpMethods: readonly ["POST", "PUT", "PATCH", "DELETE"];
    allowedMiniKvCommands: readonly ["HEALTH", "COMMANDSJSON", "SHARDJSON", "QUIT"];
    forbiddenMiniKvCommands: readonly ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"];
  };
  summary: {
    processCount: number;
    readTargetCount: number;
    nodeTargetCount: number;
    javaTargetCount: number;
    miniKvTargetCount: number;
    checkCount: number;
    passedCheckCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
  };
  checks: {
    sourceArchiveVerificationReady: boolean;
    sourceArchiveRouteExposedByV543: boolean;
    userAuthorizationCaptured: boolean;
    concretePortsAssigned: boolean;
    startupCommandsDeclared: boolean;
    ownerAndCwdDeclared: boolean;
    cleanupRulesDeclared: boolean;
    portPrecheckRequiredBeforeStart: boolean;
    readTargetsComplete: boolean;
    nodeTargetsReadOnly: boolean;
    javaTargetsGetOnly: boolean;
    miniKvCommandsReadOnly: boolean;
    noWriteHttpMethodsPlanned: boolean;
    noForbiddenMiniKvCommandsPlanned: boolean;
    executionVersionSeparatesPreflight: boolean;
    plannedStartupLimitedToLocalLoopback: boolean;
    noManagedAuditCredentialOrRawEndpointScope: boolean;
    productionStillBlocked: boolean;
    readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight(input: {
  config: AppConfig;
  projectRoot?: string;
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile {
  const source = loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification(input);
  const nodeSmokeEnvironment = createNodeSmokeEnvironment();
  const processPlan = createProcessPlan();
  const readTargets = createReadTargets();
  const commandPolicy = createCommandPolicy();
  const liveSmokeWindow = createLiveSmokeWindow({ nodeSmokeEnvironment, processPlan, readTargets });
  const sourceArchiveVerification = {
    routePath: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    profileVersion: source.profileVersion,
    activeNodeVersion: source.activeNodeVersion,
    routeExposedByNodeVersion: "Node v543" as const,
    ready: source.readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
  };
  const checks = createChecks({
    sourceArchiveVerification,
    liveSmokeWindow,
    processPlan,
    readTargets,
    commandPolicy,
  });
  checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke preflight",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-preflight.v1",
    activeNodeVersion: "Node v544",
    sourceNodeVersion: "Node v543",
    plannedExecutionVersion: "Node v545",
    preflightState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight: ready,
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeExecution: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    preflightOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    sourceArchiveVerification,
    liveSmokeWindow,
    nodeSmokeEnvironment,
    processPlan,
    readTargets,
    commandPolicy,
    summary: {
      processCount: processPlan.length,
      readTargetCount: readTargets.length,
      nodeTargetCount: countTargets(readTargets, "node"),
      javaTargetCount: countTargets(readTargets, "java"),
      miniKvTargetCount: countTargets(readTargets, "mini-kv"),
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: source.summary.checkCount,
      sourcePassedCheckCount: source.summary.passedCheckCount,
    },
    checks,
    nextActions: ready
      ? [
        "Run Node v545 as a local read-only live smoke using only the planned loopback ports.",
        "Start Java, mini-kv, and Node only after confirming ports 8080, 6524, and 4190 are free.",
        "Stop only PIDs started by the v545 smoke task and verify all three ports are no longer listening.",
      ]
      : [
        "Repair the v543 source archive route before starting Java or mini-kv.",
        "Do not start sibling services until process owner, port, and cleanup checks are ready.",
      ],
  };
}

function createNodeSmokeEnvironment(): Record<string, string> {
  return {
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
  };
}

function createProcessPlan(): LiveSmokeProcessPlan[] {
  return [
    {
      id: "node-orderops",
      project: "node",
      owner: "orderops-node-codex",
      cwd: "D:\\nodeproj\\orderops-node",
      host: "127.0.0.1",
      port: 4190,
      startCommand:
        "npm run build; set safe env HOST=127.0.0.1 PORT=4190 ORDER_PLATFORM_URL=http://127.0.0.1:8080 MINIKV_HOST=127.0.0.1 MINIKV_PORT=6524; node dist/server.js",
      readinessProbe: "GET http://127.0.0.1:4190/health",
      startupAllowedInExecutionVersion: true,
      stopPolicy: "Stop only the Node PID started by Node v545.",
      cleanupVerification: "Verify port 4190 has no LISTENING socket after cleanup.",
      failClosedRule: "If port 4190 is occupied by an unknown PID, do not kill it; record the blocker.",
    },
    {
      id: "java-order-platform",
      project: "java",
      owner: "java-platform-operator-codex",
      cwd: "D:\\javaproj\\advanced-order-platform",
      host: "127.0.0.1",
      port: 8080,
      startCommand: "mvn spring-boot:run -Dspring-boot.run.profiles=local",
      readinessProbe: "GET http://127.0.0.1:8080/actuator/health",
      startupAllowedInExecutionVersion: true,
      stopPolicy: "Stop only the Java PID started by Node v545.",
      cleanupVerification: "Verify port 8080 has no LISTENING socket after cleanup.",
      failClosedRule: "If port 8080 is occupied by an unknown PID, do not kill it; record the blocker.",
    },
    {
      id: "mini-kv-server",
      project: "mini-kv",
      owner: "mini-kv-operator-codex",
      cwd: "D:\\C\\mini-kv",
      host: "127.0.0.1",
      port: 6524,
      startCommand: ".\\cmake-build-debug\\minikv_server.exe 6524 127.0.0.1",
      readinessProbe: "TCP 127.0.0.1:6524 HEALTH",
      startupAllowedInExecutionVersion: true,
      stopPolicy: "Stop only the mini-kv PID started by Node v545.",
      cleanupVerification: "Verify port 6524 has no LISTENING socket after cleanup.",
      failClosedRule: "If port 6524 is occupied by an unknown PID, do not kill it; record the blocker.",
    },
  ];
}

function createReadTargets(): LiveSmokeReadTarget[] {
  return [
    target("node-health", "node", "http", "GET", "http://127.0.0.1:4190/health", "Node health returns ok."),
    target(
      "node-latest-sibling-archive-verifier-json",
      "node",
      "http",
      "GET",
      `http://127.0.0.1:4190${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}`,
      "Latest sibling archive verifier returns ready=true.",
    ),
    target(
      "node-latest-sibling-archive-verifier-markdown",
      "node",
      "http",
      "GET",
      `http://127.0.0.1:4190${JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH}?format=markdown`,
      "Latest sibling archive verifier Markdown renders.",
    ),
    target("java-health", "java", "http", "GET", "http://127.0.0.1:8080/actuator/health", "Java health status is UP."),
    target("java-ops-evidence", "java", "http", "GET", "http://127.0.0.1:8080/api/v1/ops/evidence", "Java ops evidence exposes a ready read-only window."),
    target("mini-kv-health", "mini-kv", "tcp-inline", "HEALTH", "127.0.0.1:6524", "mini-kv health responds."),
    target("mini-kv-command-catalog", "mini-kv", "tcp-inline", "COMMANDSJSON", "127.0.0.1:6524", "mini-kv command catalog includes SHARDJSON."),
    target("mini-kv-shard-readiness", "mini-kv", "tcp-inline", "SHARDJSON", "127.0.0.1:6524", "mini-kv SHARDJSON reports v247 read-only evidence."),
    target("mini-kv-quit", "mini-kv", "tcp-inline", "QUIT", "127.0.0.1:6524", "mini-kv client exits cleanly."),
  ];
}

function target(
  id: string,
  project: LiveSmokeProject,
  protocol: LiveSmokeReadTarget["protocol"],
  methodOrCommand: string,
  targetValue: string,
  expectedEvidence: string,
): LiveSmokeReadTarget {
  return {
    id,
    project,
    protocol,
    methodOrCommand,
    target: targetValue,
    expectedEvidence,
    readOnly: true,
    mutatesState: false,
  };
}

function createCommandPolicy(): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["commandPolicy"] {
  return {
    allowedHttpMethods: ["GET"],
    forbiddenHttpMethods: ["POST", "PUT", "PATCH", "DELETE"],
    allowedMiniKvCommands: ["HEALTH", "COMMANDSJSON", "SHARDJSON", "QUIT"],
    forbiddenMiniKvCommands: ["SET", "DEL", "EXPIRE", "LOAD", "COMPACT", "SETNXEX", "RESTORE"],
  };
}

function createLiveSmokeWindow(input: {
  nodeSmokeEnvironment: Record<string, string>;
  processPlan: LiveSmokeProcessPlan[];
  readTargets: LiveSmokeReadTarget[];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["liveSmokeWindow"] {
  const digest = sha256StableJson({
    env: input.nodeSmokeEnvironment,
    processes: input.processPlan.map(({ id, project, host, port, readinessProbe }) => ({
      id,
      project,
      host,
      port,
      readinessProbe,
    })),
    targets: input.readTargets.map(({ id, project, methodOrCommand, target: targetValue }) => ({
      id,
      project,
      methodOrCommand,
      target: targetValue,
    })),
  });

  return {
    windowMode: "current-thread-authorized-local-read-only-smoke",
    operatorAuthorization: "user-granted-cross-project-local-start-permission",
    nodeBaseUrl: "http://127.0.0.1:4190",
    javaBaseUrl: "http://127.0.0.1:8080",
    miniKvTarget: "127.0.0.1:6524",
    nodeSmokePort: 4190,
    javaPort: 8080,
    miniKvPort: 6524,
    upstreamServiceStartupAllowedInExecutionVersion: true,
    upstreamWritesAllowed: false,
    managedAuditAccessAllowed: false,
    processCleanupRequired: true,
    portPrecheckRequiredBeforeStart: true,
    preflightDigest: digest,
  };
}

function createChecks(input: {
  sourceArchiveVerification: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["sourceArchiveVerification"];
  liveSmokeWindow: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["liveSmokeWindow"];
  processPlan: LiveSmokeProcessPlan[];
  readTargets: LiveSmokeReadTarget[];
  commandPolicy: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["commandPolicy"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightProfile["checks"] {
  const httpTargets = input.readTargets.filter((readTarget) => readTarget.protocol === "http");
  const miniKvTargets = input.readTargets.filter((readTarget) => readTarget.project === "mini-kv");
  const ports = input.processPlan.map((step) => step.port);

  return {
    sourceArchiveVerificationReady:
      input.sourceArchiveVerification.ready
      && input.sourceArchiveVerification.checkCount === input.sourceArchiveVerification.passedCheckCount,
    sourceArchiveRouteExposedByV543:
      input.sourceArchiveVerification.routeExposedByNodeVersion === "Node v543"
      && input.sourceArchiveVerification.routePath ===
        JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH,
    userAuthorizationCaptured:
      input.liveSmokeWindow.operatorAuthorization === "user-granted-cross-project-local-start-permission"
      && input.liveSmokeWindow.upstreamServiceStartupAllowedInExecutionVersion,
    concretePortsAssigned:
      ports.length === 3
      && new Set(ports).size === 3
      && ports.includes(4190)
      && ports.includes(8080)
      && ports.includes(6524),
    startupCommandsDeclared: input.processPlan.every((step) => step.startCommand.length > 0),
    ownerAndCwdDeclared: input.processPlan.every((step) => step.owner.length > 0 && step.cwd.length > 0),
    cleanupRulesDeclared: input.processPlan.every(
      (step) => step.stopPolicy.includes("only") && step.cleanupVerification.includes("no LISTENING socket"),
    ),
    portPrecheckRequiredBeforeStart:
      input.liveSmokeWindow.portPrecheckRequiredBeforeStart
      && input.processPlan.every((step) => step.failClosedRule.includes("occupied by an unknown PID")),
    readTargetsComplete:
      countTargets(input.readTargets, "node") === 3
      && countTargets(input.readTargets, "java") === 2
      && countTargets(input.readTargets, "mini-kv") === 4,
    nodeTargetsReadOnly:
      input.readTargets
        .filter((readTarget) => readTarget.project === "node")
        .every((readTarget) => readTarget.methodOrCommand === "GET" && readTarget.readOnly && !readTarget.mutatesState),
    javaTargetsGetOnly:
      input.readTargets
        .filter((readTarget) => readTarget.project === "java")
        .every((readTarget) => readTarget.methodOrCommand === "GET" && readTarget.readOnly && !readTarget.mutatesState),
    miniKvCommandsReadOnly: miniKvTargets.every((readTarget) =>
      input.commandPolicy.allowedMiniKvCommands.includes(
        readTarget.methodOrCommand as typeof input.commandPolicy.allowedMiniKvCommands[number],
      )
      && readTarget.readOnly
      && !readTarget.mutatesState),
    noWriteHttpMethodsPlanned: httpTargets.every((readTarget) =>
      !input.commandPolicy.forbiddenHttpMethods.includes(
        readTarget.methodOrCommand as typeof input.commandPolicy.forbiddenHttpMethods[number],
      )),
    noForbiddenMiniKvCommandsPlanned: miniKvTargets.every((readTarget) =>
      !input.commandPolicy.forbiddenMiniKvCommands.includes(
        readTarget.methodOrCommand as typeof input.commandPolicy.forbiddenMiniKvCommands[number],
      )),
    executionVersionSeparatesPreflight: input.processPlan.every((step) => step.startupAllowedInExecutionVersion),
    plannedStartupLimitedToLocalLoopback: input.processPlan.every((step) => step.host === "127.0.0.1"),
    noManagedAuditCredentialOrRawEndpointScope:
      !input.liveSmokeWindow.managedAuditAccessAllowed
      && !input.liveSmokeWindow.upstreamWritesAllowed,
    productionStillBlocked: true,
    readyForRouteCatalogCleanupLatestSiblingLiveSmokePreflight: false,
  };
}

function countTargets(readTargets: LiveSmokeReadTarget[], project: LiveSmokeProject): number {
  return readTargets.filter((readTarget) => readTarget.project === project).length;
}
