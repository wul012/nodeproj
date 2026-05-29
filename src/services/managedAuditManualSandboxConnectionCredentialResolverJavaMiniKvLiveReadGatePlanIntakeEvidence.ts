import { createHash } from "node:crypto";

import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import type {
  JavaLiveReadGatePlanReference,
  LiveReadGatePlanEvidenceFileReference,
  MiniKvFrozenConsumerHandoffReference,
  MiniKvLiveReadGatePlanReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeTypes.js";

export function createLiveReadGatePlanEvidenceFileReference(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): LiveReadGatePlanEvidenceFileReference {
  const resolvedPath = resolveHistoricalEvidencePath(configuredPath);
  const exists = historicalEvidenceExists(configuredPath);
  if (!exists) {
    return {
      id,
      configuredPath,
      resolvedPath,
      historicalFallbackPath,
      exists: false,
      usedHistoricalFallback: false,
      byteLength: 0,
      digest: null,
    };
  }
  const content = readHistoricalEvidenceFile(configuredPath);
  return {
    id,
    configuredPath,
    resolvedPath,
    historicalFallbackPath,
    exists: true,
    usedHistoricalFallback: normalizePath(resolvedPath).endsWith(normalizePath(historicalFallbackPath)),
    byteLength: statHistoricalEvidence(configuredPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

export function readHistoricalJson(inputPath: string): Record<string, unknown> | null {
  if (!historicalEvidenceExists(inputPath)) {
    return null;
  }
  try {
    return JSON.parse(readHistoricalEvidenceFile(inputPath, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function createJavaLiveReadGatePlan(json: Record<string, unknown> | null): JavaLiveReadGatePlanReference {
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    liveReadGateAllowed: valueAt(json, "liveReadGateAllowed") === true,
    serviceStartAllowedByNode: valueAt(json, "serviceStartAllowedByNode") === true,
    serviceStopAllowedByNode: valueAt(json, "serviceStopAllowedByNode") === true,
    failClosedRequired: valueAt(json, "failClosedRequired") === true,
    sourceBoundaryHandoffVersion: stringValue(valueAt(json, "sourceBoundaryHandoffVersion")),
    lastVerifiedByNodeVersion: stringValue(valueAt(json, "lastVerifiedByNodeVersion")),
    nextNodeConsumerHint: stringValue(valueAt(json, "nextNodeConsumerHint")),
    requiredServiceOwnershipFields: stringArray(valueAt(json, "requiredServiceOwnershipFields")),
    javaServiceLifecyclePlan: stringArray(valueAt(json, "javaServiceLifecyclePlan")),
    smokeTargets: stringArray(valueAt(json, "smokeTargets")),
    failClosedRules: stringArray(valueAt(json, "failClosedRules")),
    cleanupResponsibilities: stringArray(valueAt(json, "cleanupResponsibilities")),
    stopConditions: stringArray(valueAt(json, "stopConditions")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    status: stringValue(valueAt(json, "status")),
  };
}

export function createMiniKvLiveReadGatePlan(json: Record<string, unknown> | null): MiniKvLiveReadGatePlanReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    contract: stringValue(valueAt(json, "contract")),
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    writeCommandsAllowed: valueAt(json, "boundaries", "writeCommandsAllowed") === true,
    adminCommandsAllowed: valueAt(json, "boundaries", "adminCommandsAllowed") === true,
    loadRestoreCompactAllowed: valueAt(json, "boundaries", "loadRestoreCompactAllowed") === true,
    setnxexExecutionAllowed: valueAt(json, "boundaries", "setnxexExecutionAllowed") === true,
    activeRouterInstalled: valueAt(json, "boundaries", "activeRouterInstalled") === true,
    storageDirectoriesCreated: valueAt(json, "boundaries", "storageDirectoriesCreated") === true,
    multiProcessStarted: valueAt(json, "boundaries", "multiProcessStarted") === true,
    archivedNodeEvidenceMutated: valueAt(json, "boundaries", "archivedNodeEvidenceMutated") === true,
    activeShardPrototypeAllowed: valueAt(json, "activePrototypePlan", "activeShardPrototypeAllowed") === true,
    routerActivationAllowed: valueAt(json, "activePrototypePlan", "routerActivationAllowed") === true,
    shardDirectoryCreationAllowed: valueAt(json, "activePrototypePlan", "shardDirectoryCreationAllowed") === true,
    multiProcessStartAllowed: valueAt(json, "activePrototypePlan", "multiProcessStartAllowed") === true,
    writeRoutingAllowed: valueAt(json, "activePrototypePlan", "writeRoutingAllowed") === true,
    activePlanFreezeFrozenReleaseVersion:
      stringOrNull(valueAt(json, "activePrototypePlanFreeze", "frozenReleaseVersion")),
    activePlanFreezeFrozenFixturePath:
      stringOrNull(valueAt(json, "activePrototypePlanFreeze", "frozenFixturePath")),
    activePlanFreezePreservesActivePrototypePlan:
      valueAt(json, "activePrototypePlanFreeze", "preservesActivePrototypePlan") === true,
    activePlanFreezeRouterActivationAllowed:
      valueAt(json, "activePrototypePlanFreeze", "frozenRouterActivationAllowed") === true,
    activePlanFreezeWriteRoutingAllowed:
      valueAt(json, "activePrototypePlanFreeze", "frozenWriteRoutingAllowed") === true,
    activePlanFreezeRollingCurrentUsedForFrozenBaseline:
      valueAt(json, "activePrototypePlanFreeze", "rollingCurrentUsedForFrozenBaseline") === true,
    consumerHandoffMode: stringValue(valueAt(json, "consumerHandoff", "handoffMode")),
    consumerFrozenReleaseVersion: stringOrNull(valueAt(json, "consumerHandoff", "frozenReleaseVersion")),
    consumerFrozenFixturePath: stringOrNull(valueAt(json, "consumerHandoff", "frozenFixturePath")),
    readyForNodeConsumption: valueAt(json, "consumerHandoff", "readyForNodeConsumption") === true,
    liveReadGateRequiredBeforeRuntimeProbe:
      valueAt(json, "consumerHandoff", "liveReadGateRequiredBeforeRuntimeProbe") === true,
    consumerStartsServices: valueAt(json, "consumerHandoff", "startsServices") === true,
    consumerActiveShardPrototypeEnabled:
      valueAt(json, "consumerHandoff", "activeShardPrototypeEnabled") === true,
    consumerRouterActivationAllowed: valueAt(json, "consumerHandoff", "routerActivationAllowed") === true,
    consumerWriteRoutingAllowed: valueAt(json, "consumerHandoff", "writeRoutingAllowed") === true,
    consumerExecutionAllowed: valueAt(json, "consumerHandoff", "executionAllowed") === true,
    liveReadGatePlanMode: stringValue(valueAt(json, "liveReadGatePlan", "planMode")),
    liveReadGateAllowed: valueAt(json, "liveReadGatePlan", "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(json, "liveReadGatePlan", "runtimeProbeAllowed") === true,
    liveReadGateStartsServices: valueAt(json, "liveReadGatePlan", "startsServices") === true,
    requiresServiceOwner: valueAt(json, "liveReadGatePlan", "requiresServiceOwner") === true,
    requiresPortList: valueAt(json, "liveReadGatePlan", "requiresPortList") === true,
    requiresSmokeTarget: valueAt(json, "liveReadGatePlan", "requiresSmokeTarget") === true,
    requiresFailClosedBehavior: valueAt(json, "liveReadGatePlan", "requiresFailClosedBehavior") === true,
    requiresCleanup: valueAt(json, "liveReadGatePlan", "requiresCleanup") === true,
    liveReadGateRouterActivationAllowed:
      valueAt(json, "liveReadGatePlan", "routerActivationAllowed") === true,
    liveReadGateWriteRoutingAllowed: valueAt(json, "liveReadGatePlan", "writeRoutingAllowed") === true,
    liveReadGateExecutionAllowed: valueAt(json, "liveReadGatePlan", "executionAllowed") === true,
    requiredBeforeLiveRead: stringArray(valueAt(json, "liveReadGatePlan", "requiredBeforeLiveRead")),
    previousConsumedReleaseVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedFixturePath")),
    previousConsumptionNodeVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumptionNodeVersion")),
    rollingCurrentUsedForHistoricalBaseline:
      valueAt(json, "historicalFallback", "rollingCurrentUsedForHistoricalBaseline") === true,
    nodeV383ArchiveVerificationPreserved:
      valueAt(json, "historicalFallback", "nodeV383ArchiveVerificationPreserved") === true,
    nodeV384ReadsUnfinishedUpstream: valueAt(json, "historicalFallback", "nodeV384ReadsUnfinishedUpstream") === true,
    archivedNodeVersions: stringArray(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    readOnlyBoundaryFields: stringArray(valueAt(json, "readOnlyBoundaryFields")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

export function createMiniKvFrozenConsumerHandoff(
  json: Record<string, unknown> | null,
): MiniKvFrozenConsumerHandoffReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    status: stringValue(valueAt(json, "status")),
    consumerHandoffMode: stringValue(valueAt(json, "consumerHandoff", "handoffMode")),
    consumerFrozenReleaseVersion: stringOrNull(valueAt(json, "consumerHandoff", "frozenReleaseVersion")),
    consumerFrozenFixturePath: stringOrNull(valueAt(json, "consumerHandoff", "frozenFixturePath")),
    readyForNodeConsumption: valueAt(json, "consumerHandoff", "readyForNodeConsumption") === true,
    liveReadGateRequiredBeforeRuntimeProbe:
      valueAt(json, "consumerHandoff", "liveReadGateRequiredBeforeRuntimeProbe") === true,
    consumerStartsServices: valueAt(json, "consumerHandoff", "startsServices") === true,
    consumerActiveShardPrototypeEnabled:
      valueAt(json, "consumerHandoff", "activeShardPrototypeEnabled") === true,
    consumerRouterActivationAllowed: valueAt(json, "consumerHandoff", "routerActivationAllowed") === true,
    consumerWriteRoutingAllowed: valueAt(json, "consumerHandoff", "writeRoutingAllowed") === true,
    consumerExecutionAllowed: valueAt(json, "consumerHandoff", "executionAllowed") === true,
  };
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizePath(input: string): string {
  return input.replace(/\\/g, "/");
}
