import type { AppConfig } from "../config.js";
import {
  createReadinessGate,
  createReadinessGateProfile,
} from "./managedAuditManualSandboxConnectionReadinessGateCore.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionReadinessGatePolicy.js";
import {
  createEvidenceFiles,
  createJavaV92Reference,
  createMiniKvV101Reference,
  createSnippetMatches,
  createSourceNodeV236,
  readJsonFile,
} from "./managedAuditManualSandboxConnectionReadinessGateReferences.js";
import { MINI_KV_V101_FOLLOW_UP } from "./managedAuditManualSandboxConnectionReadinessGateConstants.js";
import type {
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
} from "./managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";

export {
  renderManagedAuditManualSandboxConnectionReadinessGateMarkdown,
} from "./managedAuditManualSandboxConnectionReadinessGateRenderer.js";

export type {
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";

export function loadManagedAuditManualSandboxConnectionReadinessGate(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionReadinessGateProfile {
  const sourceEnvelopeConfig: AppConfig = {
    ...input.config,
    upstreamActionsEnabled: false,
  };
  const sourceNodeV236Profile = loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
    config: sourceEnvelopeConfig,
  });
  const evidenceFiles = createEvidenceFiles();
  const snippetMatches = createSnippetMatches();
  const miniKvFollowUp = readJsonFile(MINI_KV_V101_FOLLOW_UP);
  const sourceNodeV236 = createSourceNodeV236(sourceNodeV236Profile);
  const javaV92 = createJavaV92Reference(evidenceFiles, snippetMatches);
  const miniKvV101 = createMiniKvV101Reference(evidenceFiles, miniKvFollowUp);
  const readinessGate = createReadinessGate(sourceNodeV236, javaV92, miniKvV101);
  const checks = createChecks(input.config, sourceNodeV236, javaV92, miniKvV101, readinessGate);
  checks.readyForManagedAuditManualSandboxConnectionReadinessGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionReadinessGate")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return createReadinessGateProfile({
    sourceNodeV236,
    javaV92,
    miniKvV101,
    readinessGate,
    evidenceFiles,
    snippetMatches,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  });
}
