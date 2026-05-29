import { createHash } from "node:crypto";

import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import type {
  JavaOperatorServiceLifecycleReference,
  MiniKvFrozenLiveReadGatePlanReference,
  MiniKvOperatorServiceLifecycleTemplateReference,
  OperatorServiceLifecycleEvidenceFileReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeTypes.js";

export function createOperatorServiceLifecycleEvidenceFileReference(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): OperatorServiceLifecycleEvidenceFileReference {
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

export function createJavaOperatorServiceLifecycle(
  json: Record<string, unknown> | null,
): JavaOperatorServiceLifecycleReference {
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    operatorOwned: valueAt(json, "operatorOwned") === true,
    runtimeProbeAllowed: valueAt(json, "runtimeProbeAllowed") === true,
    nodeMayStartService: valueAt(json, "nodeMayStartService") === true,
    nodeMayStopService: valueAt(json, "nodeMayStopService") === true,
    sourceGatePlanVersion: stringValue(valueAt(json, "sourceGatePlanVersion")),
    lastVerifiedByNodeVersion: stringValue(valueAt(json, "lastVerifiedByNodeVersion")),
    nextNodeConsumerHint: stringValue(valueAt(json, "nextNodeConsumerHint")),
    javaServiceOwner: stringOrNull(valueAt(json, "javaServiceOwner")),
    javaStartOwner: stringOrNull(valueAt(json, "javaStartOwner")),
    javaStopOwner: stringOrNull(valueAt(json, "javaStopOwner")),
    javaPortDeclaration: stringOrNull(valueAt(json, "javaPortDeclaration")),
    javaBaseUrlTemplate: stringOrNull(valueAt(json, "javaBaseUrlTemplate")),
    operatorPrerequisites: stringArray(valueAt(json, "operatorPrerequisites")),
    getOnlySmokeTargets: stringArray(valueAt(json, "getOnlySmokeTargets")),
    failClosedRules: stringArray(valueAt(json, "failClosedRules")),
    cleanupResponsibilities: stringArray(valueAt(json, "cleanupResponsibilities")),
    stopConditions: stringArray(valueAt(json, "stopConditions")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    status: stringValue(valueAt(json, "status")),
  };
}

export function createMiniKvOperatorServiceLifecycleTemplate(
  json: Record<string, unknown> | null,
): MiniKvOperatorServiceLifecycleTemplateReference {
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
    previousConsumedReleaseVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedFixturePath")),
    previousConsumptionNodeVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumptionNodeVersion")),
    rollingCurrentUsedForHistoricalBaseline:
      valueAt(json, "historicalFallback", "rollingCurrentUsedForHistoricalBaseline") === true,
    nodeV385ArchiveVerificationPreserved:
      valueAt(json, "historicalFallback", "nodeV385ArchiveVerificationPreserved") === true,
    nodeV386ReadsUnfinishedUpstream: valueAt(json, "historicalFallback", "nodeV386ReadsUnfinishedUpstream") === true,
    archivedNodeVersions: stringArray(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    liveReadGatePlanFreezeFrozenReleaseVersion:
      stringOrNull(valueAt(json, "liveReadGatePlanFreeze", "frozenReleaseVersion")),
    liveReadGatePlanFreezeFrozenFixturePath:
      stringOrNull(valueAt(json, "liveReadGatePlanFreeze", "frozenFixturePath")),
    liveReadGatePlanFreezePreservesLiveReadGatePlan:
      valueAt(json, "liveReadGatePlanFreeze", "preservesLiveReadGatePlan") === true,
    frozenLiveReadGateAllowed: valueAt(json, "liveReadGatePlanFreeze", "frozenLiveReadGateAllowed") === true,
    frozenRuntimeProbeAllowed: valueAt(json, "liveReadGatePlanFreeze", "frozenRuntimeProbeAllowed") === true,
    frozenStartsServices: valueAt(json, "liveReadGatePlanFreeze", "frozenStartsServices") === true,
    frozenRouterActivationAllowed:
      valueAt(json, "liveReadGatePlanFreeze", "frozenRouterActivationAllowed") === true,
    frozenWriteRoutingAllowed: valueAt(json, "liveReadGatePlanFreeze", "frozenWriteRoutingAllowed") === true,
    frozenExecutionAllowed: valueAt(json, "liveReadGatePlanFreeze", "frozenExecutionAllowed") === true,
    liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline:
      valueAt(json, "liveReadGatePlanFreeze", "rollingCurrentUsedForFrozenBaseline") === true,
    operatorEvidenceMode: stringValue(valueAt(json, "operatorServiceLifecycleTemplate", "evidenceMode")),
    operatorSourceFrozenReleaseVersion:
      stringOrNull(valueAt(json, "operatorServiceLifecycleTemplate", "sourceFrozenReleaseVersion")),
    operatorSourceFrozenFixturePath:
      stringOrNull(valueAt(json, "operatorServiceLifecycleTemplate", "sourceFrozenFixturePath")),
    operatorOwnedServiceLifecycleRequired:
      valueAt(json, "operatorServiceLifecycleTemplate", "operatorOwnedServiceLifecycleRequired") === true,
    serviceOwnerDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "serviceOwnerDeclared") === true,
    startupCommandDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "startupCommandDeclared") === true,
    portListDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "portListDeclared") === true,
    getOnlySmokeTargetDeclared:
      valueAt(json, "operatorServiceLifecycleTemplate", "getOnlySmokeTargetDeclared") === true,
    failClosedBehaviorRequired:
      valueAt(json, "operatorServiceLifecycleTemplate", "failClosedBehaviorRequired") === true,
    cleanupResponsibilityDeclared:
      valueAt(json, "operatorServiceLifecycleTemplate", "cleanupResponsibilityDeclared") === true,
    operatorStartsServices: valueAt(json, "operatorServiceLifecycleTemplate", "startsServices") === true,
    operatorRuntimeProbeAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "runtimeProbeAllowed") === true,
    operatorLiveReadAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "liveReadAllowed") === true,
    operatorRouterActivationAllowed:
      valueAt(json, "operatorServiceLifecycleTemplate", "routerActivationAllowed") === true,
    operatorWriteRoutingAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "writeRoutingAllowed") === true,
    operatorExecutionAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "executionAllowed") === true,
    requiredOperatorEvidence: stringArray(valueAt(json, "operatorServiceLifecycleTemplate", "requiredOperatorEvidence")),
    readOnlyBoundaryFields: stringArray(valueAt(json, "readOnlyBoundaryFields")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

export function createMiniKvFrozenLiveReadGatePlan(
  json: Record<string, unknown> | null,
): MiniKvFrozenLiveReadGatePlanReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    status: stringValue(valueAt(json, "status")),
    liveReadGatePlanMode: stringValue(valueAt(json, "liveReadGatePlan", "planMode")),
    liveReadGateAllowed: valueAt(json, "liveReadGatePlan", "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(json, "liveReadGatePlan", "runtimeProbeAllowed") === true,
    startsServices: valueAt(json, "liveReadGatePlan", "startsServices") === true,
    routerActivationAllowed: valueAt(json, "liveReadGatePlan", "routerActivationAllowed") === true,
    writeRoutingAllowed: valueAt(json, "liveReadGatePlan", "writeRoutingAllowed") === true,
    liveReadGateExecutionAllowed: valueAt(json, "liveReadGatePlan", "executionAllowed") === true,
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
