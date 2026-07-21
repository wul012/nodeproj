import { createHash } from "node:crypto";

import { stringValue, stringValues, valueAt } from "../../../evidence/projectJson.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "../../historicalEvidenceResolver.js";
import type {
  DeclaredEvidenceFile,
  JavaDeclaredLifecycle,
  MiniKvDeclaredLifecycle,
  FrozenOperatorTemplate,
} from "./intakeTypes.js";

export function createDeclaredFile(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): DeclaredEvidenceFile {
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

export function createJavaDeclaredLifecycle(
  json: Record<string, unknown> | null,
): JavaDeclaredLifecycle {
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    operatorOwned: valueAt(json, "operatorOwned") === true,
    operatorLifecycleDeclared: valueAt(json, "operatorLifecycleDeclared") === true,
    startupCommandDeclared: valueAt(json, "startupCommandDeclared") === true,
    portDeclared: valueAt(json, "portDeclared") === true,
    getOnlySmokeDeclared: valueAt(json, "getOnlySmokeDeclared") === true,
    cleanupDeclared: valueAt(json, "cleanupDeclared") === true,
    failClosedDeclared: valueAt(json, "failClosedDeclared") === true,
    runtimeProbeAllowed: valueAt(json, "runtimeProbeAllowed") === true,
    nodeMayStartService: valueAt(json, "nodeMayStartService") === true,
    nodeMayStopService: valueAt(json, "nodeMayStopService") === true,
    sourceLifecycleEvidenceVersion: stringValue(valueAt(json, "sourceLifecycleEvidenceVersion")),
    lastVerifiedByNodeVersion: stringValue(valueAt(json, "lastVerifiedByNodeVersion")),
    nextNodeConsumerHint: stringValue(valueAt(json, "nextNodeConsumerHint")),
    javaServiceOwner: stringOrNull(valueAt(json, "javaServiceOwner")),
    javaStartOwner: stringOrNull(valueAt(json, "javaStartOwner")),
    javaStopOwner: stringOrNull(valueAt(json, "javaStopOwner")),
    declaredWorkingDirectory: stringOrNull(valueAt(json, "declaredWorkingDirectory")),
    declaredStartupCommand: stringOrNull(valueAt(json, "declaredStartupCommand")),
    declaredPorts: stringValues(valueAt(json, "declaredPorts")),
    javaBaseUrlHandle: stringOrNull(valueAt(json, "javaBaseUrlHandle")),
    getOnlySmokeTargets: stringValues(valueAt(json, "getOnlySmokeTargets")),
    failClosedRules: stringValues(valueAt(json, "failClosedRules")),
    cleanupResponsibilities: stringValues(valueAt(json, "cleanupResponsibilities")),
    runtimeGatePrerequisites: stringValues(valueAt(json, "runtimeGatePrerequisites")),
    stopConditions: stringValues(valueAt(json, "stopConditions")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    status: stringValue(valueAt(json, "status")),
  };
}

export function createMiniKvDeclaredLifecycle(
  json: Record<string, unknown> | null,
): MiniKvDeclaredLifecycle {
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
    nodeV387ArchiveVerificationPreserved:
      valueAt(json, "historicalFallback", "nodeV387ArchiveVerificationPreserved") === true,
    nodeV388ReadsUnfinishedUpstream: valueAt(json, "historicalFallback", "nodeV388ReadsUnfinishedUpstream") === true,
    archivedNodeVersions: stringValues(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    operatorTemplateFreezeFrozenReleaseVersion:
      stringOrNull(valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenReleaseVersion")),
    operatorTemplateFreezeFrozenFixturePath:
      stringOrNull(valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenFixturePath")),
    operatorTemplateFreezePreservesTemplate:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "preservesOperatorLifecycleTemplate") === true,
    frozenServiceOwnerDeclared:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenServiceOwnerDeclared") === true,
    frozenStartupCommandDeclared:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenStartupCommandDeclared") === true,
    frozenPortListDeclared:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenPortListDeclared") === true,
    frozenGetOnlySmokeTargetDeclared:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenGetOnlySmokeTargetDeclared") === true,
    frozenCleanupResponsibilityDeclared:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenCleanupResponsibilityDeclared") === true,
    frozenRuntimeProbeAllowed:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenRuntimeProbeAllowed") === true,
    frozenExecutionAllowed:
      valueAt(json, "operatorServiceLifecycleTemplateFreeze", "frozenExecutionAllowed") === true,
    operatorEvidenceMode: stringValue(valueAt(json, "operatorServiceLifecycleEvidence", "evidenceMode")),
    operatorSourceFrozenReleaseVersion:
      stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "sourceFrozenReleaseVersion")),
    operatorSourceFrozenFixturePath:
      stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "sourceFrozenFixturePath")),
    operatorOwnedServiceLifecycleDeclared:
      valueAt(json, "operatorServiceLifecycleEvidence", "operatorOwnedServiceLifecycleDeclared") === true,
    serviceOwnerDeclared: valueAt(json, "operatorServiceLifecycleEvidence", "serviceOwnerDeclared") === true,
    serviceOwnerHandle: stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "serviceOwnerHandle")),
    startupCommandDeclared: valueAt(json, "operatorServiceLifecycleEvidence", "startupCommandDeclared") === true,
    startupCommand: stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "startupCommand")),
    portListDeclared: valueAt(json, "operatorServiceLifecycleEvidence", "portListDeclared") === true,
    declaredPortHandles: stringValues(valueAt(json, "operatorServiceLifecycleEvidence", "declaredPortHandles")),
    getOnlySmokeTargetDeclared:
      valueAt(json, "operatorServiceLifecycleEvidence", "getOnlySmokeTargetDeclared") === true,
    getOnlySmokeTarget: stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "getOnlySmokeTarget")),
    failClosedBehaviorDeclared:
      valueAt(json, "operatorServiceLifecycleEvidence", "failClosedBehaviorDeclared") === true,
    failClosedBehavior: stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "failClosedBehavior")),
    cleanupResponsibilityDeclared:
      valueAt(json, "operatorServiceLifecycleEvidence", "cleanupResponsibilityDeclared") === true,
    cleanupResponsibility: stringOrNull(valueAt(json, "operatorServiceLifecycleEvidence", "cleanupResponsibility")),
    runtimeGateApproved: valueAt(json, "operatorServiceLifecycleEvidence", "runtimeGateApproved") === true,
    startsServices: valueAt(json, "operatorServiceLifecycleEvidence", "startsServices") === true,
    runtimeProbeAllowed: valueAt(json, "operatorServiceLifecycleEvidence", "runtimeProbeAllowed") === true,
    liveReadAllowed: valueAt(json, "operatorServiceLifecycleEvidence", "liveReadAllowed") === true,
    activeShardPrototypeEnabled:
      valueAt(json, "operatorServiceLifecycleEvidence", "activeShardPrototypeEnabled") === true,
    routerActivationAllowed:
      valueAt(json, "operatorServiceLifecycleEvidence", "routerActivationAllowed") === true,
    writeRoutingAllowed: valueAt(json, "operatorServiceLifecycleEvidence", "writeRoutingAllowed") === true,
    operatorExecutionAllowed: valueAt(json, "operatorServiceLifecycleEvidence", "executionAllowed") === true,
    requiresSeparateRuntimeGate:
      valueAt(json, "operatorServiceLifecycleEvidence", "requiresSeparateRuntimeGate") === true,
    requiredBeforeRuntimeGate:
      stringValues(valueAt(json, "operatorServiceLifecycleEvidence", "requiredBeforeRuntimeGate")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

export function createFrozenOperatorTemplate(
  json: Record<string, unknown> | null,
): FrozenOperatorTemplate {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    status: stringValue(valueAt(json, "status")),
    operatorEvidenceMode: stringValue(valueAt(json, "operatorServiceLifecycleTemplate", "evidenceMode")),
    operatorOwnedServiceLifecycleRequired:
      valueAt(json, "operatorServiceLifecycleTemplate", "operatorOwnedServiceLifecycleRequired") === true,
    serviceOwnerDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "serviceOwnerDeclared") === true,
    startupCommandDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "startupCommandDeclared") === true,
    portListDeclared: valueAt(json, "operatorServiceLifecycleTemplate", "portListDeclared") === true,
    getOnlySmokeTargetDeclared:
      valueAt(json, "operatorServiceLifecycleTemplate", "getOnlySmokeTargetDeclared") === true,
    cleanupResponsibilityDeclared:
      valueAt(json, "operatorServiceLifecycleTemplate", "cleanupResponsibilityDeclared") === true,
    runtimeProbeAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "runtimeProbeAllowed") === true,
    liveReadAllowed: valueAt(json, "operatorServiceLifecycleTemplate", "liveReadAllowed") === true,
    executionAllowedByOperatorTemplate:
      valueAt(json, "operatorServiceLifecycleTemplate", "executionAllowed") === true,
  };
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizePath(input: string): string {
  return input.replace(/\\/g, "/");
}
