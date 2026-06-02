import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  countRecords,
  fileReference,
  type LatestSiblingLiveSmokeArchiveFileReference,
  numberValue,
  objectArrayAt,
  readJsonFile,
  readTextFile,
  recordById,
  recordPassed,
  recordsFrom,
  stringValue,
  valueAt,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationSupport.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRenderer.js";

const ARCHIVE_JSON =
  "e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.json";
const ARCHIVE_MARKDOWN =
  "e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.md";
const ARCHIVE_SUMMARY =
  "e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-summary.json";
const CLEANUP_PROOF =
  "e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-cleanup-proof.json";

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1";
  activeNodeVersion: "Node v546";
  sourceNodeVersion: "Node v545";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  archiveFiles: {
    json: LatestSiblingLiveSmokeArchiveFileReference;
    markdown: LatestSiblingLiveSmokeArchiveFileReference;
    summary: LatestSiblingLiveSmokeArchiveFileReference;
    cleanupProof: LatestSiblingLiveSmokeArchiveFileReference;
  };
  sourceLiveSmoke: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    smokeState: string;
    ready: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
    mutatesJavaState: boolean;
    mutatesMiniKvState: boolean;
    connectsManagedAudit: boolean;
    credentialValueRead: boolean;
    rawEndpointUrlParsed: boolean;
    executionAllowed: boolean;
    localHttpProxyBypass: string;
    mingwRuntimePathAddedForMiniKv: boolean;
    recordCount: number;
    passedRecordCount: number;
    failedRecordCount: number;
    checkCount: number;
    passedCheckCount: number;
    cleanupPassed: boolean;
    afterListeningSocketCount: number;
  };
  recordSummary: {
    nodeRecordCount: number;
    javaRecordCount: number;
    miniKvRecordCount: number;
    httpRecordCount: number;
    tcpInlineRecordCount: number;
    passedRecordIds: string[];
    readOnlyRecordCount: number;
    mutatingRecordCount: number;
    proxyBypassHttpRecordCount: number;
    miniKvCommands: string[];
  };
  cleanupProof: {
    profileVersion: string;
    startedProcessCount: number;
    startedProjects: string[];
    startedPorts: number[];
    beforeListeningSocketCount: number;
    afterListeningSocketCount: number;
    distRemoved: boolean;
    cleanupPassed: boolean;
  };
  summary: {
    archiveFileCount: number;
    presentArchiveFileCount: number;
    sourceRecordCount: number;
    sourcePassedRecordCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
    checkCount: number;
    passedCheckCount: number;
  };
  checks: {
    archiveFilesPresent: boolean;
    jsonReadable: boolean;
    markdownReadable: boolean;
    summaryReadable: boolean;
    cleanupProofReadable: boolean;
    jsonProfileVersionValid: boolean;
    jsonSourceVersionsMatch: boolean;
    jsonLiveSmokeReady: boolean;
    jsonChecksAllPassed: boolean;
    jsonRecordsAllPassed: boolean;
    summaryMatchesJson: boolean;
    markdownRecordsLiveSmoke: boolean;
    readTargetCompositionValid: boolean;
    nodeArchiveVerifierReadPassed: boolean;
    javaReadOnlyEvidencePassed: boolean;
    miniKvReadCommandsPassed: boolean;
    localProxyBypassRecorded: boolean;
    sourceStartedExpectedLocalServices: boolean;
    cleanupProofMatchesJson: boolean;
    cleanupProofPassed: boolean;
    noProductionExecutionApproved: boolean;
    noUpstreamMutationOrSensitiveAccess: boolean;
    archiveVerifierDoesNotStartServices: boolean;
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification(input: {
  config: AppConfig;
  projectRoot?: string;
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile {
  void input.config;
  const projectRoot = input.projectRoot ?? process.cwd();
  const archiveFiles = {
    json: fileReference(projectRoot, ARCHIVE_JSON),
    markdown: fileReference(projectRoot, ARCHIVE_MARKDOWN),
    summary: fileReference(projectRoot, ARCHIVE_SUMMARY),
    cleanupProof: fileReference(projectRoot, CLEANUP_PROOF),
  };
  const json = readJsonFile(projectRoot, ARCHIVE_JSON);
  const markdown = readTextFile(projectRoot, ARCHIVE_MARKDOWN);
  const summaryJson = readJsonFile(projectRoot, ARCHIVE_SUMMARY);
  const cleanupJson = readJsonFile(projectRoot, CLEANUP_PROOF);
  const sourceLiveSmoke = createSourceLiveSmoke(json);
  const recordSummary = createRecordSummary(json);
  const cleanupProof = createCleanupProof(cleanupJson);
  const checks = createChecks({
    archiveFiles,
    json,
    markdown,
    summaryJson,
    cleanupJson,
    sourceLiveSmoke,
    recordSummary,
    cleanupProof,
  });
  checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1",
    activeNodeVersion: "Node v546",
    sourceNodeVersion: "Node v545",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveVerificationOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    archiveFiles,
    sourceLiveSmoke,
    recordSummary,
    cleanupProof,
    summary: {
      archiveFileCount: Object.keys(archiveFiles).length,
      presentArchiveFileCount: Object.values(archiveFiles).filter((file) => file.exists).length,
      sourceRecordCount: sourceLiveSmoke.recordCount,
      sourcePassedRecordCount: sourceLiveSmoke.passedRecordCount,
      sourceCheckCount: sourceLiveSmoke.checkCount,
      sourcePassedCheckCount: sourceLiveSmoke.passedCheckCount,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
    },
    checks,
    nextActions: ready
      ? [
        "Expose this archive verification through the cleanup route group in Node v547.",
        "Keep future live-smoke scripts on local no-proxy HTTP reads and explicit cleanup proof.",
      ]
      : [
        "Repair the v545 live smoke archive files before exposing a route.",
        "Do not rerun sibling services unless the archived cleanup proof is missing or failed.",
      ],
  };
}

function createSourceLiveSmoke(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["sourceLiveSmoke"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    smokeState: stringValue(valueAt(json, "smokeState")),
    ready: valueAt(json, "readyForRouteCatalogCleanupLatestSiblingLiveSmoke") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
    mutatesJavaState: valueAt(json, "mutatesJavaState") === true,
    mutatesMiniKvState: valueAt(json, "mutatesMiniKvState") === true,
    connectsManagedAudit: valueAt(json, "connectsManagedAudit") === true,
    credentialValueRead: valueAt(json, "credentialValueRead") === true,
    rawEndpointUrlParsed: valueAt(json, "rawEndpointUrlParsed") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    localHttpProxyBypass: stringValue(valueAt(json, "liveSmokeWindow", "localHttpProxyBypass")),
    mingwRuntimePathAddedForMiniKv: valueAt(json, "liveSmokeWindow", "mingwRuntimePathAddedForMiniKv") === true,
    recordCount: numberValue(valueAt(json, "summary", "recordCount")),
    passedRecordCount: numberValue(valueAt(json, "summary", "passedRecordCount")),
    failedRecordCount: numberValue(valueAt(json, "summary", "failedRecordCount")),
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    cleanupPassed: valueAt(json, "summary", "cleanupPassed") === true,
    afterListeningSocketCount: numberValue(valueAt(json, "summary", "afterListeningSocketCount")),
  };
}

function createRecordSummary(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["recordSummary"] {
  const records = recordsFrom(json);
  return {
    nodeRecordCount: countRecords(records, { project: "node" }),
    javaRecordCount: countRecords(records, { project: "java" }),
    miniKvRecordCount: countRecords(records, { project: "mini-kv" }),
    httpRecordCount: countRecords(records, { protocol: "http" }),
    tcpInlineRecordCount: countRecords(records, { protocol: "tcp-inline" }),
    passedRecordIds: records
      .filter((record) => stringValue(record.status) === "pass")
      .map((record) => stringValue(record.id)),
    readOnlyRecordCount: records.filter((record) => record.readOnly === true).length,
    mutatingRecordCount: records.filter((record) => record.mutatesState === true).length,
    proxyBypassHttpRecordCount: records
      .filter((record) => stringValue(record.protocol) === "http" && record.proxyBypassUsed === true)
      .length,
    miniKvCommands: records
      .filter((record) => stringValue(record.project) === "mini-kv")
      .map((record) => stringValue(record.methodOrCommand)),
  };
}

function createCleanupProof(
  cleanupJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["cleanupProof"] {
  const started = objectArrayAt(cleanupJson, "startedProcesses");
  return {
    profileVersion: stringValue(valueAt(cleanupJson, "profileVersion")),
    startedProcessCount: started.length,
    startedProjects: started.map((process) => stringValue(process.project)),
    startedPorts: started.map((process) => numberValue(process.port)),
    beforeListeningSocketCount: objectArrayAt(cleanupJson, "beforeListeningSockets").length,
    afterListeningSocketCount: objectArrayAt(cleanupJson, "afterListeningSockets").length,
    distRemoved: valueAt(cleanupJson, "distRemoved") === true,
    cleanupPassed: valueAt(cleanupJson, "cleanupPassed") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  cleanupJson: Record<string, unknown> | null;
  sourceLiveSmoke: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["sourceLiveSmoke"];
  recordSummary: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["recordSummary"];
  cleanupProof: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["cleanupProof"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationProfile["checks"] {
  const records = recordsFrom(input.json);
  const nodeArchiveJson = recordById(records, "node-latest-sibling-archive-verifier-json");
  const javaHealth = recordById(records, "java-health");
  const javaOpsEvidence = recordById(records, "java-ops-evidence");
  const miniKvHealth = recordById(records, "mini-kv-health");
  const miniKvCommandCatalog = recordById(records, "mini-kv-command-catalog");
  const miniKvShardReadiness = recordById(records, "mini-kv-shard-readiness");
  const miniKvQuit = recordById(records, "mini-kv-quit");

  return {
    archiveFilesPresent: Object.values(input.archiveFiles).every((file) => file.exists),
    jsonReadable: input.json !== null,
    markdownReadable: input.markdown.length > 0,
    summaryReadable: input.summaryJson !== null,
    cleanupProofReadable: input.cleanupJson !== null,
    jsonProfileVersionValid:
      input.sourceLiveSmoke.profileVersion === "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke.v1",
    jsonSourceVersionsMatch:
      input.sourceLiveSmoke.activeNodeVersion === "Node v545"
      && input.sourceLiveSmoke.sourceNodeVersion === "Node v544",
    jsonLiveSmokeReady:
      input.sourceLiveSmoke.ready
      && input.sourceLiveSmoke.smokeState === "ready",
    jsonChecksAllPassed:
      input.sourceLiveSmoke.checkCount === 14
      && input.sourceLiveSmoke.checkCount === input.sourceLiveSmoke.passedCheckCount,
    jsonRecordsAllPassed:
      input.sourceLiveSmoke.recordCount === 9
      && input.sourceLiveSmoke.recordCount === input.sourceLiveSmoke.passedRecordCount
      && input.sourceLiveSmoke.failedRecordCount === 0,
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceLiveSmoke.ready
      && valueAt(input.summaryJson, "smokeState") === input.sourceLiveSmoke.smokeState
      && valueAt(input.summaryJson, "recordCount") === input.sourceLiveSmoke.recordCount
      && valueAt(input.summaryJson, "passedRecordCount") === input.sourceLiveSmoke.passedRecordCount
      && valueAt(input.summaryJson, "checkCount") === input.sourceLiveSmoke.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceLiveSmoke.passedCheckCount
      && valueAt(input.summaryJson, "cleanupPassed") === input.sourceLiveSmoke.cleanupPassed
      && valueAt(input.summaryJson, "afterListeningSocketCount") === input.sourceLiveSmoke.afterListeningSocketCount,
    markdownRecordsLiveSmoke:
      input.markdown.includes("# Java / mini-kv route catalog cleanup latest sibling live smoke v545")
      && input.markdown.includes("Records: 9/9 passed")
      && input.markdown.includes("Cleanup passed: True"),
    readTargetCompositionValid:
      input.recordSummary.nodeRecordCount === 3
      && input.recordSummary.javaRecordCount === 2
      && input.recordSummary.miniKvRecordCount === 4
      && input.recordSummary.httpRecordCount === 5
      && input.recordSummary.tcpInlineRecordCount === 4
      && input.recordSummary.readOnlyRecordCount === 9
      && input.recordSummary.mutatingRecordCount === 0,
    nodeArchiveVerifierReadPassed:
      recordPassed(nodeArchiveJson)
      && valueAt(nodeArchiveJson, "assertion", "profileVersion")
        === "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification.v1"
      && valueAt(nodeArchiveJson, "assertion", "ready") === true
      && valueAt(nodeArchiveJson, "assertion", "checkCount") === valueAt(nodeArchiveJson, "assertion", "passedCheckCount"),
    javaReadOnlyEvidencePassed:
      recordPassed(javaHealth)
      && valueAt(javaHealth, "assertion", "status") === "UP"
      && recordPassed(javaOpsEvidence)
      && valueAt(javaOpsEvidence, "assertion", "evidenceVersion") === "java-ops-evidence.v1"
      && valueAt(javaOpsEvidence, "assertion", "readOnly") === true
      && valueAt(javaOpsEvidence, "assertion", "executionAllowed") === false
      && valueAt(javaOpsEvidence, "assertion", "readyForReadOnlyLiveProbe") === true,
    miniKvReadCommandsPassed:
      recordPassed(miniKvHealth)
      && recordPassed(miniKvCommandCatalog)
      && recordPassed(miniKvShardReadiness)
      && recordPassed(miniKvQuit)
      && input.recordSummary.miniKvCommands.join(",") === "HEALTH,COMMANDSJSON,SHARDJSON,QUIT",
    localProxyBypassRecorded:
      input.sourceLiveSmoke.localHttpProxyBypass === "--noproxy *"
      && input.recordSummary.proxyBypassHttpRecordCount === 5,
    sourceStartedExpectedLocalServices:
      input.sourceLiveSmoke.startsJavaService
      && input.sourceLiveSmoke.startsMiniKvService
      && input.sourceLiveSmoke.mingwRuntimePathAddedForMiniKv
      && input.cleanupProof.startedProcessCount === 4
      && input.cleanupProof.startedProjects.includes("java-runtime")
      && input.cleanupProof.startedProjects.includes("mini-kv")
      && input.cleanupProof.startedProjects.includes("node")
      && input.cleanupProof.startedPorts.includes(4190)
      && input.cleanupProof.startedPorts.includes(8080)
      && input.cleanupProof.startedPorts.includes(6524),
    cleanupProofMatchesJson:
      stringValue(valueAt(input.json, "cleanupProofPath")) === CLEANUP_PROOF
      && input.cleanupProof.cleanupPassed === input.sourceLiveSmoke.cleanupPassed
      && input.cleanupProof.afterListeningSocketCount === input.sourceLiveSmoke.afterListeningSocketCount,
    cleanupProofPassed:
      input.cleanupProof.profileVersion
        === "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-cleanup-proof.v1"
      && input.cleanupProof.cleanupPassed
      && input.cleanupProof.beforeListeningSocketCount === 0
      && input.cleanupProof.afterListeningSocketCount === 0
      && input.cleanupProof.distRemoved
      && input.sourceLiveSmoke.afterListeningSocketCount === 0,
    noProductionExecutionApproved:
      input.sourceLiveSmoke.executionAllowed === false
      && valueAt(input.json, "readyForProductionAudit") === false
      && valueAt(input.json, "readyForProductionWindow") === false
      && valueAt(input.json, "readyForProductionOperations") === false,
    noUpstreamMutationOrSensitiveAccess:
      input.sourceLiveSmoke.mutatesJavaState === false
      && input.sourceLiveSmoke.mutatesMiniKvState === false
      && input.sourceLiveSmoke.connectsManagedAudit === false
      && input.sourceLiveSmoke.credentialValueRead === false
      && input.sourceLiveSmoke.rawEndpointUrlParsed === false,
    archiveVerifierDoesNotStartServices: true,
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification: false,
  };
}
