import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  formatValue,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadRealReadAdapterEvidenceArchiveVerification,
} from "./realReadAdapterEvidenceArchiveVerification.js";
import type {
  RealReadAdapterEvidenceArchiveVerificationProfile,
} from "./realReadAdapterEvidenceArchiveVerification.js";

export interface RealReadAdapterImportedWindowResultPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-adapter-imported-window-result-packet.v1";
  packetState: "closed-baseline-with-imported-window-sample" | "blocked";
  readyForRealReadAdapterImportedWindowResultPacket: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  packet: {
    packetDigest: string;
    sampleDigest: string;
    sourceVerificationDigest: string;
    sourceArchiveDigest: string;
    sourceVerificationState: RealReadAdapterEvidenceArchiveVerificationProfile["verificationState"];
    baselineKind: "closed-window-baseline";
    importedResultKind: "operator-window-result";
    javaEvidenceVersion: "Java v69";
    miniKvEvidenceVersion: "mini-kv v78";
    upstreamProbesEnabledForImportedSample: true;
    upstreamActionsEnabledForImportedSample: false;
    nodeStartedUpstreams: false;
    productionWriteAuthorized: false;
    importedAsProductionPassEvidence: false;
  };
  closedWindowBaseline: {
    sourceProfileVersion: RealReadAdapterEvidenceArchiveVerificationProfile["profileVersion"];
    sourceArchiveState: RealReadAdapterEvidenceArchiveVerificationProfile["verification"]["sourceArchiveState"];
    sourceRehearsalState: RealReadAdapterEvidenceArchiveVerificationProfile["verification"]["sourceRehearsalState"];
    sourceTaxonomyState: RealReadAdapterEvidenceArchiveVerificationProfile["verification"]["sourceTaxonomyState"];
    readOnlyWindowOpen: false;
    attemptedProbeCount: 0;
    sourceVerificationDigest: string;
    sourceArchiveDigest: string;
  };
  operatorWindowResult: {
    sampleVersion: "real-read-adapter-imported-window-result-sample.v1";
    windowId: string;
    importedRecordCount: number;
    passedRecordCount: number;
    skippedRecordCount: number;
    blockedRecordCount: number;
    readOnlyWindowOpen: true;
    operatorOwnsUpstreamLifecycle: true;
    nodeStartedUpstreams: false;
    importedAsProductionPassEvidence: false;
  };
  upstreamVerificationHints: {
    java: JavaV69VerificationHintReference;
    miniKv: MiniKvV78SmokeVerificationReference;
  };
  importedRecords: ImportedWindowResultRecord[];
  checks: {
    sourceArchiveVerificationReady: boolean;
    sourceVerificationDigestValid: boolean;
    sourceArchiveDigestValid: boolean;
    closedWindowBaselineRecognized: boolean;
    operatorWindowSamplePresent: boolean;
    closedBaselineAndImportedWindowDistinguished: boolean;
    javaV69VerificationHintReady: boolean;
    miniKvV78SmokeVerificationReady: boolean;
    importedRecordSetComplete: boolean;
    importedRecordsReadOnly: boolean;
    noBlockedRecordsImported: boolean;
    upstreamActionsStillDisabled: boolean;
    nodeDoesNotStartUpstreams: boolean;
    productionPassStillFalse: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRealReadAdapterImportedWindowResultPacket: boolean;
  };
  summary: {
    packetCheckCount: number;
    passedPacketCheckCount: number;
    importedRecordCount: number;
    passedRecordCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ImportedWindowResultPacketMessage[];
  warnings: ImportedWindowResultPacketMessage[];
  recommendations: ImportedWindowResultPacketMessage[];
  evidenceEndpoints: {
    realReadAdapterImportedWindowResultPacketJson: string;
    realReadAdapterImportedWindowResultPacketMarkdown: string;
    realReadAdapterEvidenceArchiveVerificationJson: string;
    realReadAdapterEvidenceArchiveJson: string;
  };
  nextActions: string[];
}

export interface ImportedWindowResultRecord {
  id: "java-actuator-health" | "java-ops-overview" | "mini-kv-health" | "mini-kv-infojson" | "mini-kv-statsjson";
  project: "advanced-order-platform" | "mini-kv";
  target: string;
  protocol: "http-get" | "tcp-inline-command";
  importedStatus: "passed-read" | "skipped-read" | "blocked";
  readOnly: true;
  mutatesState: false;
  attempted: true;
  evidenceKind: string;
  evidenceDigest: string;
  sourceVersion: "Java v69" | "mini-kv v78";
  notes: string;
}

export interface JavaV69VerificationHintReference {
  project: "advanced-order-platform";
  version: "Java v69";
  endpoint: "GET /api/v1/ops/release-approval-rehearsal";
  hintVersion: "java-release-approval-rehearsal-verification-hint.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v3";
  warningDigest: string;
  noLedgerWriteProof: string;
  noLedgerWriteProved: true;
  nodeMayTreatAsProductionAuthorization: false;
  readOnly: true;
  executionAllowed: false;
}

export interface MiniKvV78SmokeVerificationReference {
  project: "mini-kv";
  version: "mini-kv v78";
  command: "SMOKEJSON";
  runtimeVersion: "0.78.0";
  taxonomyDigest: "fnv1a64:f92fcba55feb26a2";
  verificationSampleConsumer: "Node v196 imported window result packet";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
}

interface ImportedWindowResultPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "imported-window-result-packet"
    | "real-read-adapter-evidence-archive-verification"
    | "java-v69-verification-hint"
    | "mini-kv-v78-smokejson"
    | "runtime-config";
  message: string;
}

interface ImportedWindowResultSample {
  sampleVersion: "real-read-adapter-imported-window-result-sample.v1";
  windowId: string;
  windowKind: "operator-window-result";
  upstreamProbesEnabled: true;
  upstreamActionsEnabled: false;
  operatorOwnsUpstreamLifecycle: true;
  nodeStartedUpstreams: false;
  productionWriteAuthorized: false;
  importedAsProductionPassEvidence: false;
  java: JavaV69VerificationHintReference;
  miniKv: MiniKvV78SmokeVerificationReference;
  records: ImportedWindowResultRecord[];
}

const ENDPOINTS = Object.freeze({
  realReadAdapterImportedWindowResultPacketJson: "/api/v1/production/real-read-adapter-imported-window-result-packet",
  realReadAdapterImportedWindowResultPacketMarkdown: "/api/v1/production/real-read-adapter-imported-window-result-packet?format=markdown",
  realReadAdapterEvidenceArchiveVerificationJson: "/api/v1/production/real-read-adapter-evidence-archive-verification",
  realReadAdapterEvidenceArchiveJson: "/api/v1/production/real-read-adapter-evidence-archive",
});

const IMPORTED_WINDOW_SAMPLE: ImportedWindowResultSample = {
  sampleVersion: "real-read-adapter-imported-window-result-sample.v1",
  windowId: "operator-window-sample-v196",
  windowKind: "operator-window-result",
  upstreamProbesEnabled: true,
  upstreamActionsEnabled: false,
  operatorOwnsUpstreamLifecycle: true,
  nodeStartedUpstreams: false,
  productionWriteAuthorized: false,
  importedAsProductionPassEvidence: false,
  java: {
    project: "advanced-order-platform",
    version: "Java v69",
    endpoint: "GET /api/v1/ops/release-approval-rehearsal",
    hintVersion: "java-release-approval-rehearsal-verification-hint.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v3",
    warningDigest: "sha256:8fd34127861b20d98b993f8c2f16f5f70d40a98daaf6ce21e60e2a84fc4f1f5a",
    noLedgerWriteProof: "executionAllowed=false;approvalLedgerWritten=false;nodeMayCreateApprovalDecision=false;nodeMayWriteApprovalLedger=false",
    noLedgerWriteProved: true,
    nodeMayTreatAsProductionAuthorization: false,
    readOnly: true,
    executionAllowed: false,
  },
  miniKv: {
    project: "mini-kv",
    version: "mini-kv v78",
    command: "SMOKEJSON",
    runtimeVersion: "0.78.0",
    taxonomyDigest: "fnv1a64:f92fcba55feb26a2",
    verificationSampleConsumer: "Node v196 imported window result packet",
    readOnly: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    orderAuthoritative: false,
  },
  records: [
    {
      id: "java-actuator-health",
      project: "advanced-order-platform",
      target: "GET /actuator/health",
      protocol: "http-get",
      importedStatus: "passed-read",
      readOnly: true,
      mutatesState: false,
      attempted: true,
      evidenceKind: "java-health-read",
      evidenceDigest: "sha256:2bb66e40d74d122ae13938d6414ba6f1cc5c78acb15d8f2b9368492c8c68d1b5",
      sourceVersion: "Java v69",
      notes: "Operator-window sample records Java health as a read-only pass.",
    },
    {
      id: "java-ops-overview",
      project: "advanced-order-platform",
      target: "GET /api/v1/ops/overview",
      protocol: "http-get",
      importedStatus: "passed-read",
      readOnly: true,
      mutatesState: false,
      attempted: true,
      evidenceKind: "java-release-approval-verification-hint",
      evidenceDigest: "sha256:8fd34127861b20d98b993f8c2f16f5f70d40a98daaf6ce21e60e2a84fc4f1f5a",
      sourceVersion: "Java v69",
      notes: "Java v69 verification hint proves response schema, warning digest, and no-ledger boundary.",
    },
    {
      id: "mini-kv-health",
      project: "mini-kv",
      target: "HEALTH",
      protocol: "tcp-inline-command",
      importedStatus: "passed-read",
      readOnly: true,
      mutatesState: false,
      attempted: true,
      evidenceKind: "mini-kv-health-read",
      evidenceDigest: "fnv1a64:3a7f9f0b41f65e8d",
      sourceVersion: "mini-kv v78",
      notes: "Operator-window sample records mini-kv liveness without writes.",
    },
    {
      id: "mini-kv-infojson",
      project: "mini-kv",
      target: "INFOJSON",
      protocol: "tcp-inline-command",
      importedStatus: "passed-read",
      readOnly: true,
      mutatesState: false,
      attempted: true,
      evidenceKind: "mini-kv-runtime-identity",
      evidenceDigest: "fnv1a64:a86c1089ca4f9507",
      sourceVersion: "mini-kv v78",
      notes: "Runtime identity is read-only and keeps order_authoritative=false.",
    },
    {
      id: "mini-kv-statsjson",
      project: "mini-kv",
      target: "SMOKEJSON",
      protocol: "tcp-inline-command",
      importedStatus: "passed-read",
      readOnly: true,
      mutatesState: false,
      attempted: true,
      evidenceKind: "mini-kv-smokejson-taxonomy-digest",
      evidenceDigest: "fnv1a64:f92fcba55feb26a2",
      sourceVersion: "mini-kv v78",
      notes: "mini-kv v78 SMOKEJSON taxonomy digest is the imported-window verification anchor.",
    },
  ],
};

export async function loadRealReadAdapterImportedWindowResultPacket(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<RealReadAdapterImportedWindowResultPacketProfile> {
  const sourceVerification = await loadRealReadAdapterEvidenceArchiveVerification(input);
  const sample = cloneImportedWindowSample();
  const sampleDigest = sha256StableJson(sample);
  const checks = createChecks(input.config, sourceVerification, sample);
  checks.readyForRealReadAdapterImportedWindowResultPacket = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadAdapterImportedWindowResultPacket")
    .every(([, value]) => value);
  const packetState = checks.readyForRealReadAdapterImportedWindowResultPacket
    ? "closed-baseline-with-imported-window-sample"
    : "blocked";
  const packetDigest = sha256StableJson({
    profileVersion: "real-read-adapter-imported-window-result-packet.v1",
    packetState,
    sampleDigest,
    sourceVerificationDigest: sourceVerification.verification.verificationDigest,
    sourceArchiveDigest: sourceVerification.verification.storedArchiveDigest,
    windowId: sample.windowId,
    javaWarningDigest: sample.java.warningDigest,
    miniKvTaxonomyDigest: sample.miniKv.taxonomyDigest,
    importedRecords: sample.records.map((record) => ({
      id: record.id,
      importedStatus: record.importedStatus,
      evidenceDigest: record.evidenceDigest,
    })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);

  return {
    service: "orderops-node",
    title: "Real-read adapter imported window result packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-adapter-imported-window-result-packet.v1",
    packetState,
    readyForRealReadAdapterImportedWindowResultPacket: checks.readyForRealReadAdapterImportedWindowResultPacket,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sampleDigest,
      sourceVerificationDigest: sourceVerification.verification.verificationDigest,
      sourceArchiveDigest: sourceVerification.verification.storedArchiveDigest,
      sourceVerificationState: sourceVerification.verificationState,
      baselineKind: "closed-window-baseline",
      importedResultKind: "operator-window-result",
      javaEvidenceVersion: "Java v69",
      miniKvEvidenceVersion: "mini-kv v78",
      upstreamProbesEnabledForImportedSample: true,
      upstreamActionsEnabledForImportedSample: false,
      nodeStartedUpstreams: false,
      productionWriteAuthorized: false,
      importedAsProductionPassEvidence: false,
    },
    closedWindowBaseline: {
      sourceProfileVersion: sourceVerification.profileVersion,
      sourceArchiveState: sourceVerification.verification.sourceArchiveState,
      sourceRehearsalState: sourceVerification.verification.sourceRehearsalState,
      sourceTaxonomyState: sourceVerification.verification.sourceTaxonomyState,
      readOnlyWindowOpen: false,
      attemptedProbeCount: 0,
      sourceVerificationDigest: sourceVerification.verification.verificationDigest,
      sourceArchiveDigest: sourceVerification.verification.storedArchiveDigest,
    },
    operatorWindowResult: {
      sampleVersion: sample.sampleVersion,
      windowId: sample.windowId,
      importedRecordCount: sample.records.length,
      passedRecordCount: sample.records.filter((record) => record.importedStatus === "passed-read").length,
      skippedRecordCount: sample.records.filter((record) => record.importedStatus === "skipped-read").length,
      blockedRecordCount: sample.records.filter((record) => record.importedStatus === "blocked").length,
      readOnlyWindowOpen: true,
      operatorOwnsUpstreamLifecycle: true,
      nodeStartedUpstreams: false,
      importedAsProductionPassEvidence: false,
    },
    upstreamVerificationHints: {
      java: { ...sample.java },
      miniKv: { ...sample.miniKv },
    },
    importedRecords: sample.records.map((record) => ({ ...record })),
    checks,
    summary: {
      packetCheckCount: countReportChecks(checks),
      passedPacketCheckCount: countPassedReportChecks(checks),
      importedRecordCount: sample.records.length,
      passedRecordCount: sample.records.filter((record) => record.importedStatus === "passed-read").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep this packet as an imported-window sample, not production pass evidence.",
      "Use Java v69 warningDigest and mini-kv v78 taxonomyDigest when validating a real operator-window import.",
      "Proceed to Node v197 production readiness checkpoint after this packet is archived and verified.",
    ],
  };
}

export function renderRealReadAdapterImportedWindowResultPacketMarkdown(
  profile: RealReadAdapterImportedWindowResultPacketProfile,
): string {
  return [
    "# Real-read adapter imported window result packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for real-read adapter imported window result packet: ${profile.readyForRealReadAdapterImportedWindowResultPacket}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Packet",
    "",
    ...renderEntries(profile.packet),
    "",
    "## Closed Window Baseline",
    "",
    ...renderEntries(profile.closedWindowBaseline),
    "",
    "## Operator Window Result",
    "",
    ...renderEntries(profile.operatorWindowResult),
    "",
    "## Java v69 Verification Hint",
    "",
    ...renderEntries(profile.upstreamVerificationHints.java),
    "",
    "## mini-kv v78 Smoke Verification",
    "",
    ...renderEntries(profile.upstreamVerificationHints.miniKv),
    "",
    "## Imported Records",
    "",
    ...profile.importedRecords.flatMap(renderImportedRecord),
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
    ...renderMessages(profile.productionBlockers, "No imported window result packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No imported window result packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No imported window result packet recommendations."),
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

function createChecks(
  config: AppConfig,
  sourceVerification: RealReadAdapterEvidenceArchiveVerificationProfile,
  sample: ImportedWindowResultSample,
): RealReadAdapterImportedWindowResultPacketProfile["checks"] {
  return {
    sourceArchiveVerificationReady: sourceVerification.readyForRealReadAdapterEvidenceArchiveVerification,
    sourceVerificationDigestValid: /^[a-f0-9]{64}$/.test(sourceVerification.verification.verificationDigest),
    sourceArchiveDigestValid: /^[a-f0-9]{64}$/.test(sourceVerification.verification.storedArchiveDigest),
    closedWindowBaselineRecognized: sourceVerification.verification.sourceArchiveState === "closed-window-evidence-archived"
      && sourceVerification.verification.sourceRehearsalState === "closed-skipped"
      && sourceVerification.verification.readOnlyWindowOpen === false,
    operatorWindowSamplePresent: sample.sampleVersion === "real-read-adapter-imported-window-result-sample.v1"
      && sample.windowKind === "operator-window-result"
      && sample.upstreamProbesEnabled === true,
    closedBaselineAndImportedWindowDistinguished: sourceVerification.verification.readOnlyWindowOpen === false
      && sample.upstreamProbesEnabled === true
      && sample.windowKind === "operator-window-result",
    javaV69VerificationHintReady: isJavaV69VerificationHintReady(sample.java),
    miniKvV78SmokeVerificationReady: isMiniKvV78SmokeVerificationReady(sample.miniKv),
    importedRecordSetComplete: sample.records.length === 5
      && ["java-actuator-health", "java-ops-overview", "mini-kv-health", "mini-kv-infojson", "mini-kv-statsjson"]
        .every((id) => sample.records.some((record) => record.id === id)),
    importedRecordsReadOnly: sample.records.every((record) => record.readOnly && !record.mutatesState && record.attempted),
    noBlockedRecordsImported: sample.records.every((record) => record.importedStatus !== "blocked"),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
      && sample.upstreamActionsEnabled === false,
    nodeDoesNotStartUpstreams: sample.nodeStartedUpstreams === false
      && sample.operatorOwnsUpstreamLifecycle === true,
    productionPassStillFalse: sample.importedAsProductionPassEvidence === false
      && sample.productionWriteAuthorized === false,
    readyForProductionOperationsStillFalse: sourceVerification.readyForProductionOperations === false,
    readyForRealReadAdapterImportedWindowResultPacket: false,
  };
}

function isJavaV69VerificationHintReady(reference: JavaV69VerificationHintReference): boolean {
  return reference.version === "Java v69"
    && reference.hintVersion === "java-release-approval-rehearsal-verification-hint.v1"
    && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v3"
    && /^sha256:[a-f0-9]{64}$/.test(reference.warningDigest)
    && reference.noLedgerWriteProof.includes("nodeMayWriteApprovalLedger=false")
    && reference.noLedgerWriteProved
    && reference.nodeMayTreatAsProductionAuthorization === false
    && reference.readOnly
    && reference.executionAllowed === false;
}

function isMiniKvV78SmokeVerificationReady(reference: MiniKvV78SmokeVerificationReference): boolean {
  return reference.version === "mini-kv v78"
    && reference.command === "SMOKEJSON"
    && reference.runtimeVersion === "0.78.0"
    && reference.taxonomyDigest === "fnv1a64:f92fcba55feb26a2"
    && reference.verificationSampleConsumer === "Node v196 imported window result packet"
    && reference.readOnly
    && reference.executionAllowed === false
    && reference.restoreExecutionAllowed === false
    && reference.orderAuthoritative === false;
}

function collectProductionBlockers(
  checks: RealReadAdapterImportedWindowResultPacketProfile["checks"],
): ImportedWindowResultPacketMessage[] {
  const blockers: ImportedWindowResultPacketMessage[] = [];
  addMessage(blockers, checks.sourceArchiveVerificationReady, "SOURCE_ARCHIVE_VERIFICATION_NOT_READY", "real-read-adapter-evidence-archive-verification", "v195 archive verification must be ready before importing a window result sample.");
  addMessage(blockers, checks.sourceVerificationDigestValid, "SOURCE_VERIFICATION_DIGEST_INVALID", "real-read-adapter-evidence-archive-verification", "Source verification digest must be a sha256 hex digest.");
  addMessage(blockers, checks.sourceArchiveDigestValid, "SOURCE_ARCHIVE_DIGEST_INVALID", "real-read-adapter-evidence-archive-verification", "Source archive digest must be a sha256 hex digest.");
  addMessage(blockers, checks.closedWindowBaselineRecognized, "CLOSED_WINDOW_BASELINE_NOT_RECOGNIZED", "real-read-adapter-evidence-archive-verification", "The packet must preserve the closed-window baseline from v195.");
  addMessage(blockers, checks.operatorWindowSamplePresent, "OPERATOR_WINDOW_SAMPLE_MISSING", "imported-window-result-packet", "An operator-window import sample must be present.");
  addMessage(blockers, checks.closedBaselineAndImportedWindowDistinguished, "WINDOW_STATES_NOT_DISTINGUISHED", "imported-window-result-packet", "Closed-window baseline and operator-window result must remain distinct.");
  addMessage(blockers, checks.javaV69VerificationHintReady, "JAVA_V69_VERIFICATION_HINT_NOT_READY", "java-v69-verification-hint", "Java v69 verification hint must include schema, warning digest, and no-ledger proof.");
  addMessage(blockers, checks.miniKvV78SmokeVerificationReady, "MINI_KV_V78_SMOKE_VERIFICATION_NOT_READY", "mini-kv-v78-smokejson", "mini-kv v78 SMOKEJSON taxonomy digest sample must be ready.");
  addMessage(blockers, checks.importedRecordSetComplete, "IMPORTED_RECORD_SET_INCOMPLETE", "imported-window-result-packet", "The imported sample must cover the five real-read adapter records.");
  addMessage(blockers, checks.importedRecordsReadOnly, "IMPORTED_RECORD_NOT_READ_ONLY", "imported-window-result-packet", "Imported records must be read-only and mutatesState=false.");
  addMessage(blockers, checks.noBlockedRecordsImported, "BLOCKED_RECORD_IMPORTED", "imported-window-result-packet", "Blocked records cannot enter the imported window packet.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.nodeDoesNotStartUpstreams, "NODE_STARTED_UPSTREAMS", "imported-window-result-packet", "Node must not start Java or mini-kv.");
  addMessage(blockers, checks.productionPassStillFalse, "IMPORTED_SAMPLE_PROMOTED_TO_PRODUCTION_PASS", "imported-window-result-packet", "The imported sample must not be production pass evidence.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "The packet must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  packetState: RealReadAdapterImportedWindowResultPacketProfile["packetState"],
): ImportedWindowResultPacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "IMPORTED_WINDOW_PACKET_BLOCKED"
        : "IMPORTED_WINDOW_SAMPLE_READY",
      severity: "warning",
      source: "imported-window-result-packet",
      message: packetState === "blocked"
        ? "Imported window result packet has blockers."
        : "Imported operator-window sample is ready as read-only evidence, not as production pass.",
    },
    {
      code: "CLOSED_BASELINE_PRESERVED",
      severity: "warning",
      source: "real-read-adapter-evidence-archive-verification",
      message: "The packet preserves the v195 closed-window baseline while attaching a separate operator-window sample.",
    },
  ];
}

function collectRecommendations(
  packetState: RealReadAdapterImportedWindowResultPacketProfile["packetState"],
): ImportedWindowResultPacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_IMPORTED_WINDOW_PACKET_BLOCKERS"
        : "PROCEED_TO_PRODUCTION_READINESS_CHECKPOINT",
      severity: "recommendation",
      source: "imported-window-result-packet",
      message: packetState === "blocked"
        ? "Fix packet blockers before the production readiness checkpoint."
        : "Proceed to Node v197 to summarize remaining hard gates before a real production window.",
    },
  ];
}

function addMessage(
  messages: ImportedWindowResultPacketMessage[],
  condition: boolean,
  code: string,
  source: ImportedWindowResultPacketMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function cloneImportedWindowSample(): ImportedWindowResultSample {
  return {
    ...IMPORTED_WINDOW_SAMPLE,
    java: { ...IMPORTED_WINDOW_SAMPLE.java },
    miniKv: { ...IMPORTED_WINDOW_SAMPLE.miniKv },
    records: IMPORTED_WINDOW_SAMPLE.records.map((record) => ({ ...record })),
  };
}

function renderImportedRecord(record: ImportedWindowResultRecord): string[] {
  return [
    `### ${record.id}`,
    "",
    `- Project: ${record.project}`,
    `- Target: ${record.target}`,
    `- Protocol: ${record.protocol}`,
    `- Imported status: ${record.importedStatus}`,
    `- Read only: ${record.readOnly}`,
    `- Mutates state: ${record.mutatesState}`,
    `- Attempted: ${record.attempted}`,
    `- Evidence kind: ${record.evidenceKind}`,
    `- Evidence digest: ${record.evidenceDigest}`,
    `- Source version: ${record.sourceVersion}`,
    `- Notes: ${formatValue(record.notes)}`,
    "",
  ];
}
