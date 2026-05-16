import type { IncomingHttpHeaders } from "node:http";

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
  loadThreeProjectRealReadRuntimeSmokeArchiveVerification,
  type ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile,
} from "./threeProjectRealReadRuntimeSmokeArchiveVerification.js";

export interface PostRealReadProductionHardeningTriageProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "post-real-read-production-hardening-triage.v1";
  triageState: "ready-for-hardening-roadmap" | "blocked";
  readyForPostRealReadProductionHardeningTriage: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  triage: {
    triageDigest: string;
    sourceArchiveVerificationProfileVersion: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["profileVersion"];
    sourceArchiveVerificationState: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["verificationState"];
    sourceArchiveVerificationDigest: string;
    sourceEvidenceSpan: "Node v205-v206 + Java v73 + mini-kv v82";
    selectedPriorityCount: 3;
    candidateGateCount: number;
    archiveOnlySummaryAllowed: false;
    upstreamActionsEnabled: boolean;
    productionWindowAllowed: false;
  };
  candidateGates: HardeningCandidateGate[];
  selectedPriorities: HardeningPriority[];
  deferredGates: DeferredHardeningGate[];
  checks: {
    sourceArchiveVerificationReady: boolean;
    sourceArchiveVerificationDigestValid: boolean;
    sourceArchiveVerificationStillReadOnly: boolean;
    sourceArchiveVerificationDoesNotRerunUpstreams: boolean;
    sourceProductionWindowStillBlocked: boolean;
    candidateGateCountStable: boolean;
    selectedPriorityCountFocused: boolean;
    selectedPrioritiesAreTopRanked: boolean;
    selectedPrioritiesAreActionable: boolean;
    managedAuditSelectedFirst: boolean;
    operatorIdentitySelected: boolean;
    approvalRecordSelected: boolean;
    deferredGatesRemainTracked: boolean;
    noArchiveOnlySummaryExpansion: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    readyForPostRealReadProductionHardeningTriage: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    selectedPriorityCount: number;
    deferredGateCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: TriageMessage[];
  warnings: TriageMessage[];
  recommendations: TriageMessage[];
  evidenceEndpoints: {
    postRealReadProductionHardeningTriageJson: string;
    postRealReadProductionHardeningTriageMarkdown: string;
    sourceArchiveVerificationJson: string;
    sourceArchiveVerificationMarkdown: string;
  };
  nextActions: string[];
}

interface HardeningCandidateGate {
  id: "managed-audit-persistence" | "operator-identity-boundary" | "manual-approval-record" | "ci-artifact-store" | "rollback-control-boundary";
  title: string;
  rank: 1 | 2 | 3 | 4 | 5;
  selectedForNextStage: boolean;
  currentEvidence: string;
  productionRisk: string;
  nextVersionHint: "Node v208" | "Node v209+" | "Java v74 + mini-kv v83";
  requiresJavaOrMiniKvBeforeNodeV208: boolean;
  readOnlyUntilSatisfied: true;
}

interface HardeningPriority {
  id: HardeningCandidateGate["id"];
  rank: 1 | 2 | 3;
  targetVersion: "Node v208" | "Node v209";
  nextSmallLoop: string;
  requiredUpstreamEvidence: string;
  successSignal: string;
  productionWriteAllowed: false;
}

interface DeferredHardeningGate {
  id: Extract<HardeningCandidateGate["id"], "ci-artifact-store" | "rollback-control-boundary">;
  rank: 4 | 5;
  reasonDeferred: string;
  revisitAfter: "managed-audit-dry-run" | "manual-approval-record-contract";
}

interface TriageMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "post-real-read-production-hardening-triage"
    | "three-project-real-read-runtime-smoke-archive-verification"
    | "hardening-candidate"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  postRealReadProductionHardeningTriageJson: "/api/v1/production/post-real-read-production-hardening-triage",
  postRealReadProductionHardeningTriageMarkdown: "/api/v1/production/post-real-read-production-hardening-triage?format=markdown",
  sourceArchiveVerificationJson: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
  sourceArchiveVerificationMarkdown: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification?format=markdown",
});

export async function loadPostRealReadProductionHardeningTriage(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<PostRealReadProductionHardeningTriageProfile> {
  const sourceArchiveVerification = await loadThreeProjectRealReadRuntimeSmokeArchiveVerification(input);
  const candidateGates = createCandidateGates();
  const selectedPriorities = createSelectedPriorities();
  const deferredGates = createDeferredGates();
  const checks = createChecks(input.config, sourceArchiveVerification, candidateGates, selectedPriorities, deferredGates);
  checks.readyForPostRealReadProductionHardeningTriage = Object.entries(checks)
    .filter(([key]) => key !== "readyForPostRealReadProductionHardeningTriage")
    .every(([, value]) => value);
  const triageState = checks.readyForPostRealReadProductionHardeningTriage
    ? "ready-for-hardening-roadmap"
    : "blocked";
  const triageDigest = sha256StableJson({
    profileVersion: "post-real-read-production-hardening-triage.v1",
    triageState,
    sourceArchiveVerificationDigest: sourceArchiveVerification.verification.verificationDigest,
    selectedPriorityIds: selectedPriorities.map((priority) => priority.id),
    deferredGateIds: deferredGates.map((gate) => gate.id),
    archiveOnlySummaryAllowed: false,
    productionWindowAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(triageState, deferredGates.length);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Post-real-read production hardening triage",
    generatedAt: new Date().toISOString(),
    profileVersion: "post-real-read-production-hardening-triage.v1",
    triageState,
    readyForPostRealReadProductionHardeningTriage: checks.readyForPostRealReadProductionHardeningTriage,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    triage: {
      triageDigest,
      sourceArchiveVerificationProfileVersion: sourceArchiveVerification.profileVersion,
      sourceArchiveVerificationState: sourceArchiveVerification.verificationState,
      sourceArchiveVerificationDigest: sourceArchiveVerification.verification.verificationDigest,
      sourceEvidenceSpan: "Node v205-v206 + Java v73 + mini-kv v82",
      selectedPriorityCount: 3,
      candidateGateCount: candidateGates.length,
      archiveOnlySummaryAllowed: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionWindowAllowed: false,
    },
    candidateGates,
    selectedPriorities,
    deferredGates,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      selectedPriorityCount: selectedPriorities.length,
      deferredGateCount: deferredGates.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep Node v207 as a triage gate; do not add another archive-only summary after this version.",
      "Run Java v74 + mini-kv v83 in parallel as read-only upstream hints for managed audit provenance.",
      "Use Node v208 for the managed audit persistence boundary candidate after those read-only hints exist.",
      "Keep production windows closed until identity, audit persistence, and approval records are all represented as durable evidence.",
    ],
  };
}

export function renderPostRealReadProductionHardeningTriageMarkdown(
  profile: PostRealReadProductionHardeningTriageProfile,
): string {
  return [
    "# Post-real-read production hardening triage",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Triage state: ${profile.triageState}`,
    `- Ready for post-real-read production hardening triage: ${profile.readyForPostRealReadProductionHardeningTriage}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Triage",
    "",
    ...renderEntries(profile.triage),
    "",
    "## Candidate Gates",
    "",
    ...profile.candidateGates.flatMap(renderCandidateGate),
    "## Selected Priorities",
    "",
    ...profile.selectedPriorities.flatMap(renderSelectedPriority),
    "## Deferred Gates",
    "",
    ...profile.deferredGates.flatMap(renderDeferredGate),
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
    ...renderMessages(profile.productionBlockers, "No post-real-read production hardening triage blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No post-real-read production hardening triage warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No post-real-read production hardening triage recommendations."),
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

function createCandidateGates(): HardeningCandidateGate[] {
  return [
    {
      id: "managed-audit-persistence",
      title: "Managed audit persistence",
      rank: 1,
      selectedForNextStage: true,
      currentEvidence: "Memory/file audit contracts exist, but v205-v206 real-read evidence is not persisted to a managed audit adapter.",
      productionRisk: "A production window cannot be trusted if the operator, request, decision, and result records are not durable and queryable.",
      nextVersionHint: "Node v208",
      requiresJavaOrMiniKvBeforeNodeV208: true,
      readOnlyUntilSatisfied: true,
    },
    {
      id: "operator-identity-boundary",
      title: "Operator identity boundary",
      rank: 2,
      selectedForNextStage: true,
      currentEvidence: "Header-based rehearsal identity exists, but real IdP-backed identity is not bound to the three-project runtime smoke evidence.",
      productionRisk: "Without a durable identity boundary, real-read evidence cannot prove who opened or reviewed the window.",
      nextVersionHint: "Node v209+",
      requiresJavaOrMiniKvBeforeNodeV208: false,
      readOnlyUntilSatisfied: true,
    },
    {
      id: "manual-approval-record",
      title: "Manual approval record",
      rank: 3,
      selectedForNextStage: true,
      currentEvidence: "Approval runbooks and ledgers exist, but no durable approval record authorizes a real-read production window.",
      productionRisk: "A real window needs an explicit human decision record before any write or privileged read can be considered.",
      nextVersionHint: "Node v209+",
      requiresJavaOrMiniKvBeforeNodeV208: false,
      readOnlyUntilSatisfied: true,
    },
    {
      id: "ci-artifact-store",
      title: "CI artifact store",
      rank: 4,
      selectedForNextStage: false,
      currentEvidence: "Local c/ archives and pushed tags exist, but GitHub artifact upload is still dry-run only.",
      productionRisk: "Release reviewers need a remote immutable artifact bundle, but this is less urgent than durable audit and identity.",
      nextVersionHint: "Node v209+",
      requiresJavaOrMiniKvBeforeNodeV208: false,
      readOnlyUntilSatisfied: true,
    },
    {
      id: "rollback-control-boundary",
      title: "Rollback control boundary",
      rank: 5,
      selectedForNextStage: false,
      currentEvidence: "Rollback runbooks exist, but real restore/rollback execution remains intentionally blocked.",
      productionRisk: "Rollback is required before production writes, but v205-v206 only proved read smoke, so it can follow audit and approval.",
      nextVersionHint: "Node v209+",
      requiresJavaOrMiniKvBeforeNodeV208: false,
      readOnlyUntilSatisfied: true,
    },
  ];
}

function createSelectedPriorities(): HardeningPriority[] {
  return [
    {
      id: "managed-audit-persistence",
      rank: 1,
      targetVersion: "Node v208",
      nextSmallLoop: "Define a managed audit adapter boundary candidate with file/sqlite shape, retention, rotation, and failure modes.",
      requiredUpstreamEvidence: "Java v74 audit-persistence handoff hint + mini-kv v83 runtime artifact provenance hint.",
      successSignal: "Node can explain where real-read window records would be persisted without enabling production writes.",
      productionWriteAllowed: false,
    },
    {
      id: "operator-identity-boundary",
      rank: 2,
      targetVersion: "Node v209",
      nextSmallLoop: "Bind the real-read hardening plan to verified operator identity claims rather than raw headers.",
      requiredUpstreamEvidence: "No new Java/mini-kv write evidence required; can consume existing identity and release evidence.",
      successSignal: "Every hardening record names a verified operator identity source and still blocks production.",
      productionWriteAllowed: false,
    },
    {
      id: "manual-approval-record",
      rank: 3,
      targetVersion: "Node v209",
      nextSmallLoop: "Define the manual approval record contract for opening a future read-only production window.",
      requiredUpstreamEvidence: "Java approval rehearsal hint may enrich the schema; no Java ledger write is required.",
      successSignal: "Approval record fields are durable-audit ready while executionAllowed remains false.",
      productionWriteAllowed: false,
    },
  ];
}

function createDeferredGates(): DeferredHardeningGate[] {
  return [
    {
      id: "ci-artifact-store",
      rank: 4,
      reasonDeferred: "Remote artifact upload matters, but managed audit should define the durable record model first.",
      revisitAfter: "managed-audit-dry-run",
    },
    {
      id: "rollback-control-boundary",
      rank: 5,
      reasonDeferred: "Rollback controls are essential before production writes, but v205-v206 only exercised real reads.",
      revisitAfter: "manual-approval-record-contract",
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceArchiveVerification: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile,
  candidateGates: HardeningCandidateGate[],
  selectedPriorities: HardeningPriority[],
  deferredGates: DeferredHardeningGate[],
): PostRealReadProductionHardeningTriageProfile["checks"] {
  const selectedIds = new Set(selectedPriorities.map((priority) => priority.id));
  return {
    sourceArchiveVerificationReady: sourceArchiveVerification.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification,
    sourceArchiveVerificationDigestValid: /^[a-f0-9]{64}$/.test(sourceArchiveVerification.verification.verificationDigest),
    sourceArchiveVerificationStillReadOnly: sourceArchiveVerification.readOnly === true
      && sourceArchiveVerification.executionAllowed === false,
    sourceArchiveVerificationDoesNotRerunUpstreams: sourceArchiveVerification.verification.archiveVerificationRerunsUpstreams === false
      && sourceArchiveVerification.closedWindowRecheck.realRuntimeSmokeExecuted === false,
    sourceProductionWindowStillBlocked: sourceArchiveVerification.readyForProductionWindow === false
      && sourceArchiveVerification.readyForProductionOperations === false,
    candidateGateCountStable: candidateGates.length === 5,
    selectedPriorityCountFocused: selectedPriorities.length === 3,
    selectedPrioritiesAreTopRanked: selectedPriorities.every((priority, index) => priority.rank === index + 1)
      && candidateGates.filter((gate) => gate.selectedForNextStage).every((gate) => selectedIds.has(gate.id)),
    selectedPrioritiesAreActionable: selectedPriorities.every((priority) =>
      priority.nextSmallLoop.length > 0
      && priority.requiredUpstreamEvidence.length > 0
      && priority.successSignal.length > 0
      && priority.productionWriteAllowed === false
    ),
    managedAuditSelectedFirst: selectedPriorities[0]?.id === "managed-audit-persistence"
      && selectedPriorities[0]?.targetVersion === "Node v208",
    operatorIdentitySelected: selectedIds.has("operator-identity-boundary"),
    approvalRecordSelected: selectedIds.has("manual-approval-record"),
    deferredGatesRemainTracked: deferredGates.length === 2
      && deferredGates.some((gate) => gate.id === "ci-artifact-store")
      && deferredGates.some((gate) => gate.id === "rollback-control-boundary"),
    noArchiveOnlySummaryExpansion: candidateGates.every((gate) => gate.title !== "Archive-only summary")
      && selectedPriorities.every((priority) => !priority.nextSmallLoop.toLowerCase().includes("archive-only summary")),
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    executionStillBlocked: sourceArchiveVerification.executionAllowed === false,
    readyForPostRealReadProductionHardeningTriage: false,
  };
}

function collectProductionBlockers(
  checks: PostRealReadProductionHardeningTriageProfile["checks"],
): TriageMessage[] {
  const blockers: TriageMessage[] = [];
  addMessage(blockers, checks.sourceArchiveVerificationReady, "SOURCE_ARCHIVE_VERIFICATION_NOT_READY", "three-project-real-read-runtime-smoke-archive-verification", "Node v206 archive verification must be ready before production hardening triage.");
  addMessage(blockers, checks.sourceArchiveVerificationDigestValid, "SOURCE_ARCHIVE_VERIFICATION_DIGEST_INVALID", "three-project-real-read-runtime-smoke-archive-verification", "Node v206 archive verification digest must be a sha256 hex digest.");
  addMessage(blockers, checks.sourceArchiveVerificationStillReadOnly, "SOURCE_ARCHIVE_VERIFICATION_NOT_READ_ONLY", "three-project-real-read-runtime-smoke-archive-verification", "Source archive verification must remain read-only.");
  addMessage(blockers, checks.sourceArchiveVerificationDoesNotRerunUpstreams, "SOURCE_ARCHIVE_RERAN_UPSTREAMS", "three-project-real-read-runtime-smoke-archive-verification", "Triage must not depend on rerunning Java or mini-kv probes.");
  addMessage(blockers, checks.sourceProductionWindowStillBlocked, "SOURCE_PRODUCTION_WINDOW_UNLOCKED", "three-project-real-read-runtime-smoke-archive-verification", "Source archive verification must still block production.");
  addMessage(blockers, checks.candidateGateCountStable, "CANDIDATE_GATE_COUNT_UNSTABLE", "hardening-candidate", "Triage must evaluate exactly five hardening candidates.");
  addMessage(blockers, checks.selectedPriorityCountFocused, "SELECTED_PRIORITY_COUNT_NOT_FOCUSED", "post-real-read-production-hardening-triage", "Triage should select exactly three next-stage priorities.");
  addMessage(blockers, checks.selectedPrioritiesAreTopRanked, "SELECTED_PRIORITIES_NOT_TOP_RANKED", "hardening-candidate", "Selected priorities must match the top-ranked candidates.");
  addMessage(blockers, checks.selectedPrioritiesAreActionable, "SELECTED_PRIORITIES_NOT_ACTIONABLE", "hardening-candidate", "Each selected priority needs a small loop, upstream evidence rule, and success signal.");
  addMessage(blockers, checks.managedAuditSelectedFirst, "MANAGED_AUDIT_NOT_FIRST", "hardening-candidate", "Managed audit persistence must be the first hardening candidate after v206.");
  addMessage(blockers, checks.operatorIdentitySelected, "OPERATOR_IDENTITY_NOT_SELECTED", "hardening-candidate", "Operator identity must remain selected.");
  addMessage(blockers, checks.approvalRecordSelected, "APPROVAL_RECORD_NOT_SELECTED", "hardening-candidate", "Manual approval record must remain selected.");
  addMessage(blockers, checks.deferredGatesRemainTracked, "DEFERRED_GATES_NOT_TRACKED", "hardening-candidate", "CI artifact and rollback gates must remain tracked even when deferred.");
  addMessage(blockers, checks.noArchiveOnlySummaryExpansion, "ARCHIVE_ONLY_SUMMARY_EXPANSION", "post-real-read-production-hardening-triage", "v207 must not add another archive-only summary layer.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v207 must not unlock execution.");
  return blockers;
}

function collectWarnings(
  triageState: PostRealReadProductionHardeningTriageProfile["triageState"],
  deferredGateCount: number,
): TriageMessage[] {
  return [
    {
      code: triageState === "blocked" ? "HARDENING_TRIAGE_BLOCKED" : "HARDENING_TRIAGE_READY",
      severity: "warning",
      source: "post-real-read-production-hardening-triage",
      message: triageState === "blocked"
        ? "The hardening triage has blockers and should not feed v208."
        : "The hardening triage is ready; it still does not authorize a production window.",
    },
    {
      code: "DEFERRED_GATES_REMAIN",
      severity: "warning",
      source: "hardening-candidate",
      message: `${deferredGateCount} hardening gates are intentionally deferred and must be revisited after managed audit and approval records.`,
    },
  ];
}

function collectRecommendations(): TriageMessage[] {
  return [
    {
      code: "RUN_JAVA_V74_AND_MINI_KV_V83_IN_PARALLEL",
      severity: "recommendation",
      source: "post-real-read-production-hardening-triage",
      message: "Run Java v74 and mini-kv v83 in parallel as read-only hints before Node v208 consumes managed audit provenance.",
    },
    {
      code: "START_NODE_V208_MANAGED_AUDIT_BOUNDARY",
      severity: "recommendation",
      source: "post-real-read-production-hardening-triage",
      message: "Use Node v208 for a managed audit persistence boundary candidate rather than another archive verification layer.",
    },
  ];
}

function renderCandidateGate(gate: HardeningCandidateGate): string[] {
  return [
    `- ${gate.rank}. ${gate.id}: ${gate.title}`,
    `  - selectedForNextStage: ${gate.selectedForNextStage}`,
    `  - currentEvidence: ${gate.currentEvidence}`,
    `  - productionRisk: ${gate.productionRisk}`,
    `  - nextVersionHint: ${gate.nextVersionHint}`,
    `  - requiresJavaOrMiniKvBeforeNodeV208: ${gate.requiresJavaOrMiniKvBeforeNodeV208}`,
  ];
}

function renderSelectedPriority(priority: HardeningPriority): string[] {
  return [
    `- ${priority.rank}. ${priority.id} -> ${priority.targetVersion}`,
    `  - nextSmallLoop: ${priority.nextSmallLoop}`,
    `  - requiredUpstreamEvidence: ${priority.requiredUpstreamEvidence}`,
    `  - successSignal: ${priority.successSignal}`,
    `  - productionWriteAllowed: ${priority.productionWriteAllowed}`,
  ];
}

function renderDeferredGate(gate: DeferredHardeningGate): string[] {
  return [
    `- ${gate.rank}. ${gate.id}`,
    `  - reasonDeferred: ${gate.reasonDeferred}`,
    `  - revisitAfter: ${gate.revisitAfter}`,
  ];
}

function addMessage(
  messages: TriageMessage[],
  condition: boolean,
  code: string,
  source: TriageMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
