import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadRealReadAdapterImportedWindowResultPacket,
} from "./realReadAdapterImportedWindowResultPacket.js";
import type {
  RealReadAdapterImportedWindowResultPacketProfile,
} from "./realReadAdapterImportedWindowResultPacket.js";

export interface RealReadAdapterProductionReadinessCheckpointProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-production-readiness-checkpoint.v1";
  checkpointState: "rehearsal-evidence-ready-production-window-blocked" | "blocked";
  readyForRealReadAdapterProductionReadinessCheckpoint: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checkpoint: {
    checkpointDigest: string;
    sourcePacketDigest: string;
    sourceSampleDigest: string;
    sourceVerificationDigest: string;
    sourceArchiveDigest: string;
    evidenceSpan: "Node v191-v196 + Java v69 + mini-kv v78";
    sourcePacketState: RealReadAdapterImportedWindowResultPacketProfile["packetState"];
    importedSamplePromotedToProductionPass: false;
    productionWindowAllowed: false;
    productionOperationAllowed: false;
  };
  evidenceChain: EvidenceChainItem[];
  hardGates: ProductionHardGate[];
  checks: {
    sourcePacketReady: boolean;
    sourcePacketDigestValid: boolean;
    sourceSampleDigestValid: boolean;
    sourceVerificationDigestValid: boolean;
    sourceArchiveDigestValid: boolean;
    evidenceSpanComplete: boolean;
    closedBaselinePreserved: boolean;
    importedSampleSeparated: boolean;
    javaV69VerificationHintAccepted: boolean;
    miniKvV78SmokeVerificationAccepted: boolean;
    importedRecordsReadOnly: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    importedSampleNotProductionPass: boolean;
    hardGatesRecorded: boolean;
    productionWindowStillBlocked: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterProductionReadinessCheckpoint: boolean;
  };
  summary: {
    checkpointCheckCount: number;
    passedCheckpointCheckCount: number;
    evidenceChainItemCount: number;
    hardGateCount: number;
    unsatisfiedHardGateCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionReadinessCheckpointMessage[];
  warnings: ProductionReadinessCheckpointMessage[];
  recommendations: ProductionReadinessCheckpointMessage[];
  evidenceEndpoints: {
    realReadAdapterProductionReadinessCheckpointJson: string;
    realReadAdapterProductionReadinessCheckpointMarkdown: string;
    realReadAdapterImportedWindowResultPacketJson: string;
    realReadAdapterEvidenceArchiveVerificationJson: string;
  };
  nextActions: string[];
}

interface EvidenceChainItem {
  version: "Node v191" | "Node v192" | "Node v193" | "Node v194" | "Node v195" | "Node v196" | "Java v69" | "mini-kv v78";
  evidenceRole: string;
  evidenceAnchor: string;
  status: "ready" | "referenced";
  productionAuthority: false;
}

interface ProductionHardGate {
  id: "real-operator-identity" | "managed-audit-store" | "ci-archive-artifact" | "manual-approval-record";
  title: string;
  requiredBeforeProductionWindow: true;
  currentEvidence: string;
  satisfied: false;
  blocking: true;
  nextStep: string;
}

interface ProductionReadinessCheckpointMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-readiness-checkpoint"
    | "imported-window-result-packet"
    | "real-read-adapter-evidence-archive-verification"
    | "hard-gate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadAdapterProductionReadinessCheckpointJson: "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
  realReadAdapterProductionReadinessCheckpointMarkdown: "/api/v1/production/real-read-adapter-production-readiness-checkpoint?format=markdown",
  realReadAdapterImportedWindowResultPacketJson: "/api/v1/production/real-read-adapter-imported-window-result-packet",
  realReadAdapterEvidenceArchiveVerificationJson: "/api/v1/production/real-read-adapter-evidence-archive-verification",
});

export async function loadRealReadAdapterProductionReadinessCheckpoint(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterProductionReadinessCheckpointProfile> {
  const packet = await loadRealReadAdapterImportedWindowResultPacket(input);
  const evidenceChain = createEvidenceChain(packet);
  const hardGates = createHardGates();
  const checks = createChecks(input.config, packet, evidenceChain, hardGates);
  checks.readyForRealReadAdapterProductionReadinessCheckpoint = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterProductionReadinessCheckpoint")
    .every(([, value]) => value);
  const checkpointState = checks.readyForRealReadAdapterProductionReadinessCheckpoint
    ? "rehearsal-evidence-ready-production-window-blocked"
    : "blocked";
  const checkpointDigest = sha256StableJson({
    profileVersion: "real-read-adapter-production-readiness-checkpoint.v1",
    checkpointState,
    sourcePacketDigest: packet.packet.packetDigest,
    sourceSampleDigest: packet.packet.sampleDigest,
    sourceVerificationDigest: packet.packet.sourceVerificationDigest,
    sourceArchiveDigest: packet.packet.sourceArchiveDigest,
    evidenceVersions: evidenceChain.map((item) => item.version),
    hardGateIds: hardGates.map((gate) => gate.id),
    productionWindowAllowed: false,
    readyForProductionOperations: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks, hardGates);
  const warnings = collectWarnings(checkpointState, hardGates.length);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read adapter production readiness checkpoint",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-production-readiness-checkpoint.v1",
    checkpointState,
    readyForRealReadAdapterProductionReadinessCheckpoint: checks.readyForRealReadAdapterProductionReadinessCheckpoint,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    checkpoint: {
      checkpointDigest,
      sourcePacketDigest: packet.packet.packetDigest,
      sourceSampleDigest: packet.packet.sampleDigest,
      sourceVerificationDigest: packet.packet.sourceVerificationDigest,
      sourceArchiveDigest: packet.packet.sourceArchiveDigest,
      evidenceSpan: "Node v191-v196 + Java v69 + mini-kv v78",
      sourcePacketState: packet.packetState,
      importedSamplePromotedToProductionPass: false,
      productionWindowAllowed: false,
      productionOperationAllowed: false,
    },
    evidenceChain,
    hardGates,
    checks,
    summary: {
      checkpointCheckCount: countReportChecks(checks),
      passedCheckpointCheckCount: countPassedReportChecks(checks),
      evidenceChainItemCount: evidenceChain.length,
      hardGateCount: hardGates.length,
      unsatisfiedHardGateCount: hardGates.filter((gate) => !gate.satisfied).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Do not open a production real-read window from this checkpoint; the four hard gates remain unsatisfied.",
      "Start the next plan by hardening operator identity, managed audit storage, CI artifact archival, and manual approval records.",
      "Keep Java and mini-kv work read-only unless a later plan explicitly introduces a safe production gate.",
    ],
  };
}

export function renderRealReadAdapterProductionReadinessCheckpointMarkdown(
  profile: RealReadAdapterProductionReadinessCheckpointProfile,
): string {
  return [
    "# Real-read adapter production readiness checkpoint",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Checkpoint state: ${profile.checkpointState}`,
    `- Ready for real-read adapter production readiness checkpoint: ${profile.readyForRealReadAdapterProductionReadinessCheckpoint}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Checkpoint",
    "",
    ...renderEntries(profile.checkpoint),
    "",
    "## Evidence Chain",
    "",
    ...profile.evidenceChain.flatMap(renderEvidenceChainItem),
    "## Hard Gates",
    "",
    ...profile.hardGates.flatMap(renderHardGate),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production readiness checkpoint blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production readiness checkpoint warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production readiness checkpoint recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createEvidenceChain(packet: RealReadAdapterImportedWindowResultPacketProfile): EvidenceChainItem[] {
  return [
    evidence("Node v191", "real-read adapter rehearsal", "/api/v1/production/real-read-adapter-rehearsal", "ready"),
    evidence("Node v192", "operator window runbook", "/api/v1/production/real-read-adapter-operator-window-runbook", "ready"),
    evidence("Node v193", "failure taxonomy", "/api/v1/production/real-read-adapter-failure-taxonomy", "ready"),
    evidence("Node v194", "evidence archive", "/api/v1/production/real-read-adapter-evidence-archive", "ready"),
    evidence("Node v195", "archive verification", packet.packet.sourceVerificationDigest, "ready"),
    evidence("Node v196", "imported window result packet", packet.packet.packetDigest, "ready"),
    evidence("Java v69", "release approval verification hint", packet.upstreamVerificationHints.java.warningDigest, "referenced"),
    evidence("mini-kv v78", "SMOKEJSON taxonomy digest", packet.upstreamVerificationHints.miniKv.taxonomyDigest, "referenced"),
  ];
}

function evidence(
  version: EvidenceChainItem["version"],
  evidenceRole: string,
  evidenceAnchor: string,
  status: EvidenceChainItem["status"],
): EvidenceChainItem {
  return {
    version,
    evidenceRole,
    evidenceAnchor,
    status,
    productionAuthority: false,
  };
}

function createHardGates(): ProductionHardGate[] {
  return [
    {
      id: "real-operator-identity",
      title: "Verified operator identity for the real window",
      requiredBeforeProductionWindow: true,
      currentEvidence: "Header and CI identity evidence exists, but real IdP-backed operator identity is not enforced for this real-read window.",
      satisfied: false,
      blocking: true,
      nextStep: "Bind real-read window requests to verified token claims and a named operator approval record.",
    },
    {
      id: "managed-audit-store",
      title: "Managed audit store for window evidence",
      requiredBeforeProductionWindow: true,
      currentEvidence: "File/fake audit contracts exist, but this real-read window evidence is not persisted to a managed audit store.",
      satisfied: false,
      blocking: true,
      nextStep: "Connect a managed audit adapter and write immutable window open/import/checkpoint records.",
    },
    {
      id: "ci-archive-artifact",
      title: "CI archive artifact for the readiness packet",
      requiredBeforeProductionWindow: true,
      currentEvidence: "Local typecheck/test/build/screenshot evidence exists, but there is no CI-published archive artifact for this packet.",
      satisfied: false,
      blocking: true,
      nextStep: "Publish v191-v197 JSON/Markdown/screenshot evidence as a CI artifact with digest.",
    },
    {
      id: "manual-approval-record",
      title: "Manual approval record for opening the production window",
      requiredBeforeProductionWindow: true,
      currentEvidence: "Runbooks and imported samples exist, but no manual approval decision record authorizes a real production read window.",
      satisfied: false,
      blocking: true,
      nextStep: "Create a read-only manual approval record schema before any production window is opened.",
    },
  ];
}

function createChecks(
  config: AppConfig,
  packet: RealReadAdapterImportedWindowResultPacketProfile,
  evidenceChain: EvidenceChainItem[],
  hardGates: ProductionHardGate[],
): RealReadAdapterProductionReadinessCheckpointProfile["checks"] {
  return {
    sourcePacketReady: packet.readyForRealReadAdapterImportedWindowResultPacket,
    sourcePacketDigestValid: /^[a-f0-9]{64}$/.test(packet.packet.packetDigest),
    sourceSampleDigestValid: /^[a-f0-9]{64}$/.test(packet.packet.sampleDigest),
    sourceVerificationDigestValid: /^[a-f0-9]{64}$/.test(packet.packet.sourceVerificationDigest),
    sourceArchiveDigestValid: /^[a-f0-9]{64}$/.test(packet.packet.sourceArchiveDigest),
    evidenceSpanComplete: evidenceChain.length === 8
      && evidenceChain.some((item) => item.version === "Node v191")
      && evidenceChain.some((item) => item.version === "Node v196")
      && evidenceChain.some((item) => item.version === "Java v69")
      && evidenceChain.some((item) => item.version === "mini-kv v78"),
    closedBaselinePreserved: packet.closedWindowBaseline.readOnlyWindowOpen === false
      && packet.closedWindowBaseline.attemptedProbeCount === 0,
    importedSampleSeparated: packet.operatorWindowResult.readOnlyWindowOpen === true
      && packet.packet.importedResultKind === "operator-window-result"
      && packet.packet.baselineKind === "closed-window-baseline",
    javaV69VerificationHintAccepted: packet.checks.javaV69VerificationHintReady,
    miniKvV78SmokeVerificationAccepted: packet.checks.miniKvV78SmokeVerificationReady,
    importedRecordsReadOnly: packet.checks.importedRecordsReadOnly,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
      && packet.checks.upstreamActionsStillDisabled,
    noAutomaticUpstreamStart: packet.checks.nodeDoesNotStartUpstreams,
    importedSampleNotProductionPass: packet.checks.productionPassStillFalse
      && packet.packet.importedAsProductionPassEvidence === false,
    hardGatesRecorded: hardGates.length === 4
      && hardGates.every((gate) => gate.requiredBeforeProductionWindow && gate.blocking && !gate.satisfied),
    productionWindowStillBlocked: hardGates.some((gate) => gate.blocking && !gate.satisfied),
    readyForProductionOperationsStillFalse: packet.readyForProductionOperations === false,
    readyForRealReadAdapterProductionReadinessCheckpoint: false,
  };
}

function collectProductionBlockers(
  checks: RealReadAdapterProductionReadinessCheckpointProfile["checks"],
  hardGates: ProductionHardGate[],
): ProductionReadinessCheckpointMessage[] {
  const blockers: ProductionReadinessCheckpointMessage[] = [];
  addMessage(blockers, checks.sourcePacketReady, "SOURCE_PACKET_NOT_READY", "imported-window-result-packet", "v196 imported window result packet must be ready.");
  addMessage(blockers, checks.sourcePacketDigestValid, "SOURCE_PACKET_DIGEST_INVALID", "imported-window-result-packet", "v196 packet digest must be a sha256 hex digest.");
  addMessage(blockers, checks.evidenceSpanComplete, "EVIDENCE_SPAN_INCOMPLETE", "production-readiness-checkpoint", "Checkpoint must cover Node v191-v196, Java v69, and mini-kv v78.");
  addMessage(blockers, checks.closedBaselinePreserved, "CLOSED_BASELINE_NOT_PRESERVED", "real-read-adapter-evidence-archive-verification", "Closed-window baseline must remain distinguishable.");
  addMessage(blockers, checks.importedSampleSeparated, "IMPORTED_SAMPLE_NOT_SEPARATED", "imported-window-result-packet", "Imported operator-window sample must remain separate from the baseline.");
  addMessage(blockers, checks.javaV69VerificationHintAccepted, "JAVA_V69_HINT_NOT_ACCEPTED", "imported-window-result-packet", "Java v69 verification hint must be accepted.");
  addMessage(blockers, checks.miniKvV78SmokeVerificationAccepted, "MINI_KV_V78_HINT_NOT_ACCEPTED", "imported-window-result-packet", "mini-kv v78 SMOKEJSON verification must be accepted.");
  addMessage(blockers, checks.importedRecordsReadOnly, "IMPORTED_RECORD_NOT_READ_ONLY", "imported-window-result-packet", "Imported records must remain read-only.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "NODE_STARTED_UPSTREAMS", "imported-window-result-packet", "Node must not start Java or mini-kv.");
  addMessage(blockers, checks.importedSampleNotProductionPass, "IMPORTED_SAMPLE_PROMOTED", "production-readiness-checkpoint", "Imported sample must not become production pass evidence.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Checkpoint must not unlock production operations.");

  for (const gate of hardGates.filter((item) => item.blocking && !item.satisfied)) {
    blockers.push({
      code: `HARD_GATE_${gate.id.toUpperCase().replace(/-/g, "_")}`,
      severity: "blocker",
      source: "hard-gate",
      message: `${gate.title}: ${gate.currentEvidence}`,
    });
  }

  return blockers;
}

function collectWarnings(
  checkpointState: RealReadAdapterProductionReadinessCheckpointProfile["checkpointState"],
  hardGateCount: number,
): ProductionReadinessCheckpointMessage[] {
  return [
    {
      code: checkpointState === "blocked"
        ? "READINESS_CHECKPOINT_BLOCKED"
        : "REHEARSAL_EVIDENCE_READY_PRODUCTION_BLOCKED",
      severity: "warning",
      source: "production-readiness-checkpoint",
      message: checkpointState === "blocked"
        ? "The checkpoint has source evidence blockers."
        : "The rehearsal evidence chain is ready, but the production window remains blocked.",
    },
    {
      code: "HARD_GATES_REMAIN",
      severity: "warning",
      source: "hard-gate",
      message: `${hardGateCount} hard gates must be satisfied before a real production read window.`,
    },
  ];
}

function collectRecommendations(): ProductionReadinessCheckpointMessage[] {
  return [
    {
      code: "START_POST_V197_HARD_GATE_PLAN",
      severity: "recommendation",
      source: "production-readiness-checkpoint",
      message: "Start a new post-v197 plan focused on hard gates rather than more rehearsal archive packets.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessCheckpointMessage[],
  condition: boolean,
  code: string,
  source: ProductionReadinessCheckpointMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderEvidenceChainItem(item: EvidenceChainItem): string[] {
  return [
    `### ${item.version}`,
    "",
    `- Evidence role: ${item.evidenceRole}`,
    `- Evidence anchor: ${item.evidenceAnchor}`,
    `- Status: ${item.status}`,
    `- Production authority: ${item.productionAuthority}`,
    "",
  ];
}

function renderHardGate(gate: ProductionHardGate): string[] {
  return [
    `### ${gate.id}`,
    "",
    `- Title: ${gate.title}`,
    `- Required before production window: ${gate.requiredBeforeProductionWindow}`,
    `- Current evidence: ${gate.currentEvidence}`,
    `- Satisfied: ${gate.satisfied}`,
    `- Blocking: ${gate.blocking}`,
    `- Next step: ${gate.nextStep}`,
    "",
  ];
}
