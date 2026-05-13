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
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification,
} from "./productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";
import type {
  ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
} from "./productionLiveProbeRealReadSmokeOperatorRunbookVerification.js";

export interface ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1";
  packetState: "ready-for-manual-read-only-window-review" | "blocked";
  readyForReadOnlyWindowReview: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  packet: {
    readinessPacketDigest: string;
    archiveVerificationDigest: string;
    runbookDigest: string;
    runbookVerificationDigest: string;
    runbookVerificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"];
    sourceArchiveVerificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["verificationState"];
    requiredManualJavaStart: true;
    requiredManualMiniKvStart: true;
    requiredUpstreamProbesEnabled: true;
    requiredUpstreamActionsEnabled: false;
    automaticUpstreamStart: false;
    skippedWithoutUpstreamsOnly: true;
    skippedOrMixedEvidenceCannotPass: true;
    runtimeFileRead: false;
  };
  checks: {
    runbookVerificationReady: boolean;
    runbookVerificationDigestValid: boolean;
    runbookDigestValid: boolean;
    archiveVerificationDigestValid: boolean;
    digestChainComplete: boolean;
    sourceArchiveVerificationReady: boolean;
    sourceRunbookReady: boolean;
    manualJavaStartRequired: boolean;
    manualMiniKvStartRequired: boolean;
    upstreamProbesRequirementDocumented: boolean;
    upstreamActionsStayDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    skippedWithoutUpstreamsOnly: boolean;
    skippedOrMixedNotProductionPass: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForReadOnlyWindowReview: boolean;
  };
  artifacts: {
    archiveVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["sourceArchiveVerification"]["verificationState"];
      readyForArchiveVerification: boolean;
      readyForProductionOperations: false;
    };
    operatorRunbook: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["artifacts"]["operatorRunbook"];
    operatorRunbookVerification: {
      profileVersion: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["profileVersion"];
      verificationDigest: string;
      verificationState: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile["verificationState"];
      readyForOperatorRunbookVerification: boolean;
      readyForProductionOperations: false;
    };
  };
  evidenceChain: ReadinessPacketEvidence[];
  operatorWindowRequirements: ReadinessPacketRequirement[];
  reviewSteps: ReadinessPacketReviewStep[];
  summary: {
    packetCheckCount: number;
    passedPacketCheckCount: number;
    evidenceDigestCount: number;
    operatorRequirementCount: number;
    reviewStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadinessPacketMessage[];
  warnings: ReadinessPacketMessage[];
  recommendations: ReadinessPacketMessage[];
  evidenceEndpoints: {
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: string;
    productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown: string;
    productionLiveProbeRealReadSmokeOperatorRunbookVerificationJson: string;
    productionLiveProbeRealReadSmokeOperatorRunbookJson: string;
    productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: string;
  };
  nextActions: string[];
}

interface ReadinessPacketEvidence {
  name: string;
  profileVersion: string;
  digest: string;
  role: string;
}

interface ReadinessPacketRequirement {
  code: string;
  required: boolean;
  evidence: string;
}

interface ReadinessPacketReviewStep {
  order: number;
  title: string;
  action: string;
  blocksProductionPassIfMissing: true;
}

interface ReadinessPacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "archive-verification"
    | "operator-runbook"
    | "runbook-verification"
    | "readiness-packet"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet",
  productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown: "/api/v1/production/live-probe-real-read-smoke-read-only-window-readiness-packet?format=markdown",
  productionLiveProbeRealReadSmokeOperatorRunbookVerificationJson: "/api/v1/production/live-probe-real-read-smoke-operator-runbook-verification",
  productionLiveProbeRealReadSmokeOperatorRunbookJson: "/api/v1/production/live-probe-real-read-smoke-operator-runbook",
  productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerificationJson: "/api/v1/production/live-probe-real-read-smoke-production-pass-evidence-archive-verification",
});

export async function loadProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile> {
  const runbookVerification = await loadProductionLiveProbeRealReadSmokeOperatorRunbookVerification(input);
  const evidenceChain = createEvidenceChain(runbookVerification);
  const operatorWindowRequirements = createOperatorWindowRequirements(runbookVerification);
  const reviewSteps = createReviewSteps();
  const checks = createChecks(runbookVerification, evidenceChain, operatorWindowRequirements, reviewSteps);
  checks.readyForReadOnlyWindowReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForReadOnlyWindowReview")
    .every(([, value]) => value);
  const packetState = checks.readyForReadOnlyWindowReview
    ? "ready-for-manual-read-only-window-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(runbookVerification, packetState);
  const recommendations = collectRecommendations(packetState);
  const readinessPacketDigest = digestPacket({
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
    archiveVerificationDigest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
    runbookDigest: runbookVerification.verification.runbookDigest,
    runbookVerificationDigest: runbookVerification.verification.verificationDigest,
    packetState,
    operatorWindowRequirements,
    reviewSteps,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Production live probe real-read smoke read-only window readiness packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-live-probe-real-read-smoke-read-only-window-readiness-packet.v1",
    packetState,
    readyForReadOnlyWindowReview: checks.readyForReadOnlyWindowReview,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    packet: {
      readinessPacketDigest,
      archiveVerificationDigest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
      runbookDigest: runbookVerification.verification.runbookDigest,
      runbookVerificationDigest: runbookVerification.verification.verificationDigest,
      runbookVerificationState: runbookVerification.verificationState,
      sourceArchiveVerificationState: runbookVerification.artifacts.sourceArchiveVerification.verificationState,
      requiredManualJavaStart: true,
      requiredManualMiniKvStart: true,
      requiredUpstreamProbesEnabled: true,
      requiredUpstreamActionsEnabled: false,
      automaticUpstreamStart: false,
      skippedWithoutUpstreamsOnly: true,
      skippedOrMixedEvidenceCannotPass: true,
      runtimeFileRead: false,
    },
    checks,
    artifacts: {
      archiveVerification: {
        ...runbookVerification.artifacts.sourceArchiveVerification,
      },
      operatorRunbook: {
        ...runbookVerification.artifacts.operatorRunbook,
      },
      operatorRunbookVerification: {
        profileVersion: runbookVerification.profileVersion,
        verificationDigest: runbookVerification.verification.verificationDigest,
        verificationState: runbookVerification.verificationState,
        readyForOperatorRunbookVerification: runbookVerification.readyForOperatorRunbookVerification,
        readyForProductionOperations: runbookVerification.readyForProductionOperations,
      },
    },
    evidenceChain,
    operatorWindowRequirements,
    reviewSteps,
    summary: {
      packetCheckCount: countReportChecks(checks),
      passedPacketCheckCount: countPassedReportChecks(checks),
      evidenceDigestCount: evidenceChain.length,
      operatorRequirementCount: operatorWindowRequirements.length,
      reviewStepCount: reviewSteps.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this packet as the pre-review input before any Java or mini-kv startup.",
      "Complete Java v50 and mini-kv v59 read-only self-description upgrades before real live capture.",
      "If upstreams are not manually started, record skipped evidence only and keep production pass false.",
    ],
  };
}

export function renderProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdown(
  profile: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile,
): string {
  return [
    "# Production live probe real-read smoke read-only window readiness packet",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Packet state: ${profile.packetState}`,
    `- Ready for read-only window review: ${profile.readyForReadOnlyWindowReview}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Packet",
    "",
    ...renderEntries(profile.packet),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Evidence Chain",
    "",
    ...renderEvidenceChain(profile.evidenceChain),
    "",
    "## Operator Window Requirements",
    "",
    ...renderRequirements(profile.operatorWindowRequirements),
    "",
    "## Review Steps",
    "",
    ...renderReviewSteps(profile.reviewSteps),
    "",
    "## Artifacts",
    "",
    "### Archive Verification",
    "",
    ...renderEntries(profile.artifacts.archiveVerification),
    "",
    "### Operator Runbook",
    "",
    ...renderEntries(profile.artifacts.operatorRunbook),
    "",
    "### Operator Runbook Verification",
    "",
    ...renderEntries(profile.artifacts.operatorRunbookVerification),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No read-only window readiness packet blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No read-only window readiness packet warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No read-only window readiness packet recommendations."),
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

function createEvidenceChain(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
): ReadinessPacketEvidence[] {
  return [
    {
      name: "v152 archive verification",
      profileVersion: runbookVerification.artifacts.sourceArchiveVerification.profileVersion,
      digest: runbookVerification.artifacts.sourceArchiveVerification.verificationDigest,
      role: "Source archive verification digest for the manual read-only window.",
    },
    {
      name: "v153 operator runbook",
      profileVersion: runbookVerification.artifacts.operatorRunbook.profileVersion,
      digest: runbookVerification.artifacts.operatorRunbook.runbookDigest,
      role: "Operator checklist and no-write boundary digest.",
    },
    {
      name: "v154 operator runbook verification",
      profileVersion: runbookVerification.profileVersion,
      digest: runbookVerification.verification.verificationDigest,
      role: "Verification digest proving the runbook was rechecked.",
    },
  ];
}

function createOperatorWindowRequirements(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
): ReadinessPacketRequirement[] {
  return [
    {
      code: "MANUAL_JAVA_START",
      required: true,
      evidence: "Java startup must be performed by the operator, not by Node.",
    },
    {
      code: "MANUAL_MINI_KV_START",
      required: true,
      evidence: "mini-kv startup must be performed by the operator, not by Node.",
    },
    {
      code: "UPSTREAM_PROBES_ENABLED_TRUE",
      required: true,
      evidence: "The later capture window must set UPSTREAM_PROBES_ENABLED=true.",
    },
    {
      code: "UPSTREAM_ACTIONS_ENABLED_FALSE",
      required: runbookVerification.checks.upstreamActionsStayDisabled,
      evidence: "The later capture window must keep UPSTREAM_ACTIONS_ENABLED=false.",
    },
    {
      code: "SKIPPED_WITHOUT_UPSTREAMS",
      required: true,
      evidence: "If Java or mini-kv is not manually started, Node records skipped evidence only.",
    },
    {
      code: "SKIPPED_OR_MIXED_NOT_PRODUCTION_PASS",
      required: true,
      evidence: "Skipped or mixed evidence cannot be promoted to production pass.",
    },
  ];
}

function createReviewSteps(): ReadinessPacketReviewStep[] {
  return [
    {
      order: 1,
      title: "Review v152 archive verification digest",
      action: "Confirm the source archive verification digest is present and valid.",
      blocksProductionPassIfMissing: true,
    },
    {
      order: 2,
      title: "Review v153 operator runbook digest",
      action: "Confirm the operator runbook digest is present and valid.",
      blocksProductionPassIfMissing: true,
    },
    {
      order: 3,
      title: "Review v154 runbook verification digest",
      action: "Confirm the runbook verification digest is present and valid.",
      blocksProductionPassIfMissing: true,
    },
    {
      order: 4,
      title: "Confirm manual upstream ownership",
      action: "Confirm Java and mini-kv will be started manually by the operator.",
      blocksProductionPassIfMissing: true,
    },
    {
      order: 5,
      title: "Confirm skipped evidence semantics",
      action: "Confirm missing upstreams produce skipped evidence only, never production pass.",
      blocksProductionPassIfMissing: true,
    },
  ];
}

function createChecks(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
  evidenceChain: ReadinessPacketEvidence[],
  requirements: ReadinessPacketRequirement[],
  reviewSteps: ReadinessPacketReviewStep[],
): ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["checks"] {
  return {
    runbookVerificationReady: runbookVerification.readyForOperatorRunbookVerification,
    runbookVerificationDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.verification.verificationDigest),
    runbookDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.verification.runbookDigest),
    archiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(runbookVerification.artifacts.sourceArchiveVerification.verificationDigest),
    digestChainComplete: evidenceChain.length === 3
      && evidenceChain.every((item) => /^[a-f0-9]{64}$/.test(item.digest)),
    sourceArchiveVerificationReady: runbookVerification.artifacts.sourceArchiveVerification.readyForArchiveVerification,
    sourceRunbookReady: runbookVerification.artifacts.operatorRunbook.readyForOperatorRunbook,
    manualJavaStartRequired: requirements.some((requirement) => requirement.code === "MANUAL_JAVA_START" && requirement.required),
    manualMiniKvStartRequired: requirements.some((requirement) => requirement.code === "MANUAL_MINI_KV_START" && requirement.required),
    upstreamProbesRequirementDocumented: requirements.some((requirement) => requirement.code === "UPSTREAM_PROBES_ENABLED_TRUE" && requirement.required),
    upstreamActionsStayDisabled: requirements.some((requirement) => requirement.code === "UPSTREAM_ACTIONS_ENABLED_FALSE" && requirement.required)
      && runbookVerification.checks.upstreamActionsStayDisabled,
    noAutomaticUpstreamStart: runbookVerification.checks.noAutomaticUpstreamStart,
    skippedWithoutUpstreamsOnly: requirements.some((requirement) => requirement.code === "SKIPPED_WITHOUT_UPSTREAMS" && requirement.required),
    skippedOrMixedNotProductionPass: requirements.some((requirement) => requirement.code === "SKIPPED_OR_MIXED_NOT_PRODUCTION_PASS" && requirement.required),
    readyForProductionOperationsStillFalse: runbookVerification.readyForProductionOperations === false,
    readyForReadOnlyWindowReview: false,
  };
}

function collectProductionBlockers(
  checks: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["checks"],
): ReadinessPacketMessage[] {
  const blockers: ReadinessPacketMessage[] = [];
  addMessage(blockers, checks.runbookVerificationReady, "RUNBOOK_VERIFICATION_NOT_READY", "runbook-verification", "v154 runbook verification must be ready before packaging the window review packet.");
  addMessage(blockers, checks.runbookVerificationDigestValid, "RUNBOOK_VERIFICATION_DIGEST_INVALID", "runbook-verification", "v154 verification digest must be a valid sha256 digest.");
  addMessage(blockers, checks.runbookDigestValid, "RUNBOOK_DIGEST_INVALID", "operator-runbook", "v153 runbook digest must be a valid sha256 digest.");
  addMessage(blockers, checks.archiveVerificationDigestValid, "ARCHIVE_VERIFICATION_DIGEST_INVALID", "archive-verification", "v152 archive verification digest must be a valid sha256 digest.");
  addMessage(blockers, checks.digestChainComplete, "DIGEST_CHAIN_INCOMPLETE", "readiness-packet", "The packet must include v152, v153, and v154 digests.");
  addMessage(blockers, checks.sourceArchiveVerificationReady, "SOURCE_ARCHIVE_VERIFICATION_NOT_READY", "archive-verification", "Source archive verification must be ready.");
  addMessage(blockers, checks.sourceRunbookReady, "SOURCE_RUNBOOK_NOT_READY", "operator-runbook", "Source operator runbook must be ready.");
  addMessage(blockers, checks.manualJavaStartRequired, "MANUAL_JAVA_START_NOT_REQUIRED", "readiness-packet", "The packet must require manual Java startup.");
  addMessage(blockers, checks.manualMiniKvStartRequired, "MANUAL_MINI_KV_START_NOT_REQUIRED", "readiness-packet", "The packet must require manual mini-kv startup.");
  addMessage(blockers, checks.upstreamProbesRequirementDocumented, "UPSTREAM_PROBES_REQUIREMENT_MISSING", "runtime-config", "The packet must document UPSTREAM_PROBES_ENABLED=true for the later window.");
  addMessage(blockers, checks.upstreamActionsStayDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "The packet must keep UPSTREAM_ACTIONS_ENABLED=false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_ALLOWED", "readiness-packet", "Node must not automatically start Java or mini-kv.");
  addMessage(blockers, checks.skippedWithoutUpstreamsOnly, "SKIPPED_WITHOUT_UPSTREAMS_NOT_DOCUMENTED", "readiness-packet", "Missing upstreams must result in skipped evidence only.");
  addMessage(blockers, checks.skippedOrMixedNotProductionPass, "SKIPPED_OR_MIXED_PROMOTED", "readiness-packet", "Skipped or mixed evidence cannot become production pass.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "The packet must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  runbookVerification: ProductionLiveProbeRealReadSmokeOperatorRunbookVerificationProfile,
  packetState: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["packetState"],
): ReadinessPacketMessage[] {
  return [
    {
      code: packetState === "ready-for-manual-read-only-window-review"
        ? "READ_ONLY_WINDOW_PACKET_READY"
        : "READ_ONLY_WINDOW_PACKET_BLOCKED",
      severity: "warning",
      source: "readiness-packet",
      message: packetState === "ready-for-manual-read-only-window-review"
        ? "The packet is ready for operator review, but it does not start Java or mini-kv."
        : "The packet has blockers and cannot be used for window review.",
    },
    {
      code: runbookVerification.artifacts.sourceArchiveVerification.verificationState === "verified-production-pass-archive"
        ? "SOURCE_ARCHIVE_PASS"
        : "SOURCE_ARCHIVE_NON_PASS",
      severity: "warning",
      source: "archive-verification",
      message: runbookVerification.artifacts.sourceArchiveVerification.verificationState === "verified-production-pass-archive"
        ? "Source archive verifies as pass evidence; production operations remain separately gated."
        : "Source archive remains non-pass evidence; the later window must record skipped evidence if upstreams are absent.",
    },
  ];
}

function collectRecommendations(
  packetState: ProductionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketProfile["packetState"],
): ReadinessPacketMessage[] {
  return [
    {
      code: packetState === "ready-for-manual-read-only-window-review"
        ? "PROCEED_TO_UPSTREAM_SELF_DESCRIPTION"
        : "FIX_PACKET_BLOCKERS_FIRST",
      severity: "recommendation",
      source: "readiness-packet",
      message: packetState === "ready-for-manual-read-only-window-review"
        ? "Proceed to Java v50 and mini-kv v59 read-only self-description work before real capture."
        : "Fix digest, runbook, or safety blockers before upstream work.",
    },
  ];
}

function renderEvidenceChain(items: ReadinessPacketEvidence[]): string[] {
  return items.map((item) => `- ${item.name}: ${item.profileVersion}; digest=${item.digest}; role=${item.role}`);
}

function renderRequirements(items: ReadinessPacketRequirement[]): string[] {
  return items.map((item) => `- ${item.code}: required=${item.required}; evidence=${item.evidence}`);
}

function renderReviewSteps(items: ReadinessPacketReviewStep[]): string[] {
  return items.map((item) => [
    `- ${item.order}. ${item.title}`,
    `  - Action: ${item.action}`,
    `  - Blocks production pass if missing: ${item.blocksProductionPassIfMissing}`,
  ].join("\n"));
}

function addMessage(
  messages: ReadinessPacketMessage[],
  condition: boolean,
  code: string,
  source: ReadinessPacketMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestPacket(value: unknown): string {
  return sha256StableJson(value);
}
