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
  loadIdempotencyVerticalReadinessReview,
} from "./idempotencyVerticalReadinessReview.js";
import type {
  IdempotencyVerticalReadinessReviewProfile,
} from "./idempotencyVerticalReadinessReview.js";

export interface ControlledIdempotencyDrillRunbookProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "controlled-idempotency-drill-runbook.v1";
  runbookState: "ready-for-manual-dry-run" | "blocked";
  readyForControlledIdempotencyDrillRunbook: boolean;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  runbook: {
    runbookDigest: string;
    previousReadinessReviewDigest: string;
    previousReadinessReviewVersion: IdempotencyVerticalReadinessReviewProfile["profileVersion"];
    javaVersionTag: JavaIdempotencyStoreAbstractionReference["tag"];
    javaStoreAbstractionVersion: JavaIdempotencyStoreAbstractionReference["storeAbstractionVersion"];
    miniKvVersionTag: MiniKvTtlRecoveryEvidenceReference["tag"];
    miniKvRecoveryCapability: MiniKvTtlRecoveryEvidenceReference["capability"];
    drillMode: "manual-dry-run-only";
    orderTruthSource: "java-database";
    tokenStoreRole: "disabled-ttl-token-candidate";
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionWriteAuthorized: false;
  };
  checks: {
    previousReadinessReviewReady: boolean;
    previousReviewDoesNotAuthorizeWrites: boolean;
    javaV53TagReady: boolean;
    javaStoreAbstractionReady: boolean;
    javaActiveStoreDatabaseBacked: boolean;
    javaMiniKvCandidateDeclaredButDisabled: boolean;
    javaNodeWritesForbidden: boolean;
    javaDoesNotChangePaymentInventory: boolean;
    miniKvV62TagReady: boolean;
    miniKvRecoveryEvidenceReady: boolean;
    miniKvExpiredTokensDoNotRevive: boolean;
    miniKvRestartEvidenceReady: boolean;
    miniKvOrderAuthoritativeFalse: boolean;
    miniKvNotInJavaTransactionChain: boolean;
    drillStepsAreDryRunOnly: boolean;
    forbiddenOperationsCovered: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForControlledIdempotencyDrillRunbook: boolean;
  };
  artifacts: {
    previousReadinessReview: {
      profileVersion: IdempotencyVerticalReadinessReviewProfile["profileVersion"];
      reviewDigest: string;
      reviewState: IdempotencyVerticalReadinessReviewProfile["reviewState"];
      readyForIdempotencyVerticalReadinessReview: boolean;
      readyForProductionOperations: false;
    };
    javaStoreAbstraction: JavaIdempotencyStoreAbstractionReference;
    miniKvRecoveryEvidence: MiniKvTtlRecoveryEvidenceReference;
    nodeDrillEnvelope: {
      dryRunOnly: true;
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionWriteAuthorized: false;
    };
  };
  operatorSteps: ControlledIdempotencyDrillStep[];
  forbiddenOperations: ControlledIdempotencyForbiddenOperation[];
  summary: {
    runbookCheckCount: number;
    passedRunbookCheckCount: number;
    operatorStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ControlledIdempotencyDrillRunbookMessage[];
  warnings: ControlledIdempotencyDrillRunbookMessage[];
  recommendations: ControlledIdempotencyDrillRunbookMessage[];
  evidenceEndpoints: {
    controlledIdempotencyDrillRunbookJson: string;
    controlledIdempotencyDrillRunbookMarkdown: string;
    idempotencyVerticalReadinessReviewJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaIdempotencyStoreAbstractionReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v53";
  tag: "v53订单平台idempotency-store-abstraction";
  evidenceKind: "order-idempotency-store-abstraction";
  evidencePath: "/contracts/order-idempotency-store-abstraction.sample.json";
  walkthroughPath: "代码讲解记录_生产雏形阶段/57-version-53-idempotency-store-abstraction.md";
  storeAbstractionVersion: "java-idempotency-store.v1";
  activeStore: "jpa-order-idempotency-store";
  activeImplementation: "JpaIdempotencyStore";
  activeStoreMode: "JPA_DATABASE";
  authoritativeStore: "orders table";
  keyColumn: "orders.idempotency_key";
  fingerprintColumn: "orders.idempotency_request_fingerprint";
  miniKvAdapterCandidate: "mini-kv-ttl-token-adapter";
  miniKvAdapterCandidateDeclared: true;
  miniKvAdapterEnabled: false;
  miniKvConnected: false;
  nodeMayTriggerWrites: false;
  changesPaymentOrInventoryTransaction: false;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvTtlRecoveryEvidenceReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v62";
  tag: "第六十二版TTL恢复证据";
  evidenceKind: "ttl-token-recovery-evidence";
  evidencePath: "fixtures/ttl-token/recovery-evidence.json";
  indexPath: "fixtures/ttl-token/index.json";
  walkthroughPath: "代码讲解记录_生产雏形阶段/118-version-62-ttl-recovery-evidence.md";
  capability: "ttl_token_recovery";
  sourcePrimitive: "SETNXEX key seconds value";
  claimRecord: "SETEXAT key epoch_millis value";
  replayRestoresUnexpiredToken: true;
  replayDropsExpiredToken: true;
  snapshotLoadDropsExpiredToken: true;
  restartMergesSnapshotAndWalTokens: true;
  compactedSetExpireatRestoresTtl: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface ControlledIdempotencyDrillStep {
  order: number;
  phase: "prepare" | "observe" | "compare" | "decide" | "closeout";
  actor: "operator" | "node" | "java" | "mini-kv";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
}

interface ControlledIdempotencyForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy: "Node v161 runbook" | "Java v53 boundary" | "mini-kv v62 boundary" | "runtime safety";
}

interface ControlledIdempotencyDrillRunbookMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "controlled-idempotency-drill-runbook"
    | "idempotency-vertical-readiness-review"
    | "java-v53-idempotency-store-abstraction"
    | "mini-kv-v62-ttl-recovery-evidence"
    | "runtime-config";
  message: string;
}

const JAVA_V53_IDEMPOTENCY_STORE: JavaIdempotencyStoreAbstractionReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v53",
  tag: "v53订单平台idempotency-store-abstraction",
  evidenceKind: "order-idempotency-store-abstraction",
  evidencePath: "/contracts/order-idempotency-store-abstraction.sample.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/57-version-53-idempotency-store-abstraction.md",
  storeAbstractionVersion: "java-idempotency-store.v1",
  activeStore: "jpa-order-idempotency-store",
  activeImplementation: "JpaIdempotencyStore",
  activeStoreMode: "JPA_DATABASE",
  authoritativeStore: "orders table",
  keyColumn: "orders.idempotency_key",
  fingerprintColumn: "orders.idempotency_request_fingerprint",
  miniKvAdapterCandidate: "mini-kv-ttl-token-adapter",
  miniKvAdapterCandidateDeclared: true,
  miniKvAdapterEnabled: false,
  miniKvConnected: false,
  nodeMayTriggerWrites: false,
  changesPaymentOrInventoryTransaction: false,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V62_TTL_RECOVERY: MiniKvTtlRecoveryEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v62",
  tag: "第六十二版TTL恢复证据",
  evidenceKind: "ttl-token-recovery-evidence",
  evidencePath: "fixtures/ttl-token/recovery-evidence.json",
  indexPath: "fixtures/ttl-token/index.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/118-version-62-ttl-recovery-evidence.md",
  capability: "ttl_token_recovery",
  sourcePrimitive: "SETNXEX key seconds value",
  claimRecord: "SETEXAT key epoch_millis value",
  replayRestoresUnexpiredToken: true,
  replayDropsExpiredToken: true,
  snapshotLoadDropsExpiredToken: true,
  restartMergesSnapshotAndWalTokens: true,
  compactedSetExpireatRestoresTtl: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  controlledIdempotencyDrillRunbookJson: "/api/v1/production/controlled-idempotency-drill-runbook",
  controlledIdempotencyDrillRunbookMarkdown: "/api/v1/production/controlled-idempotency-drill-runbook?format=markdown",
  idempotencyVerticalReadinessReviewJson: "/api/v1/production/idempotency-vertical-readiness-review",
  currentRoadmap: "docs/plans/v159-post-release-evidence-review-roadmap.md",
});

export function loadControlledIdempotencyDrillRunbook(config: AppConfig): ControlledIdempotencyDrillRunbookProfile {
  const previousReadinessReview = loadIdempotencyVerticalReadinessReview(config);
  const operatorSteps = createOperatorSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousReadinessReview, operatorSteps, forbiddenOperations);
  checks.readyForControlledIdempotencyDrillRunbook = Object.entries(checks)
    .filter(([key]) => key !== "readyForControlledIdempotencyDrillRunbook")
    .every(([, value]) => value);
  const runbookState = checks.readyForControlledIdempotencyDrillRunbook
    ? "ready-for-manual-dry-run"
    : "blocked";
  const runbookDigest = digestRunbook({
    profileVersion: "controlled-idempotency-drill-runbook.v1",
    previousReadinessReviewDigest: previousReadinessReview.review.reviewDigest,
    javaVersionTag: JAVA_V53_IDEMPOTENCY_STORE.tag,
    javaStoreAbstractionVersion: JAVA_V53_IDEMPOTENCY_STORE.storeAbstractionVersion,
    miniKvVersionTag: MINI_KV_V62_TTL_RECOVERY.tag,
    miniKvRecoveryCapability: MINI_KV_V62_TTL_RECOVERY.capability,
    drillMode: "manual-dry-run-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    operatorSteps: operatorSteps.map((step) => ({
      order: step.order,
      phase: step.phase,
      evidenceTarget: step.evidenceTarget,
    })),
    forbiddenOperations: forbiddenOperations.map((operation) => operation.operation),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(runbookState);
  const recommendations = collectRecommendations(runbookState);

  return {
    service: "orderops-node",
    title: "Controlled idempotency drill runbook",
    generatedAt: new Date().toISOString(),
    profileVersion: "controlled-idempotency-drill-runbook.v1",
    runbookState,
    readyForControlledIdempotencyDrillRunbook: checks.readyForControlledIdempotencyDrillRunbook,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    runbook: {
      runbookDigest,
      previousReadinessReviewDigest: previousReadinessReview.review.reviewDigest,
      previousReadinessReviewVersion: previousReadinessReview.profileVersion,
      javaVersionTag: JAVA_V53_IDEMPOTENCY_STORE.tag,
      javaStoreAbstractionVersion: JAVA_V53_IDEMPOTENCY_STORE.storeAbstractionVersion,
      miniKvVersionTag: MINI_KV_V62_TTL_RECOVERY.tag,
      miniKvRecoveryCapability: MINI_KV_V62_TTL_RECOVERY.capability,
      drillMode: "manual-dry-run-only",
      orderTruthSource: "java-database",
      tokenStoreRole: "disabled-ttl-token-candidate",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionWriteAuthorized: false,
    },
    checks,
    artifacts: {
      previousReadinessReview: {
        profileVersion: previousReadinessReview.profileVersion,
        reviewDigest: previousReadinessReview.review.reviewDigest,
        reviewState: previousReadinessReview.reviewState,
        readyForIdempotencyVerticalReadinessReview: previousReadinessReview.readyForIdempotencyVerticalReadinessReview,
        readyForProductionOperations: previousReadinessReview.readyForProductionOperations,
      },
      javaStoreAbstraction: { ...JAVA_V53_IDEMPOTENCY_STORE },
      miniKvRecoveryEvidence: { ...MINI_KV_V62_TTL_RECOVERY },
      nodeDrillEnvelope: {
        dryRunOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionWriteAuthorized: false,
      },
    },
    operatorSteps,
    forbiddenOperations,
    summary: {
      runbookCheckCount: countReportChecks(checks),
      passedRunbookCheckCount: countPassedReportChecks(checks),
      operatorStepCount: operatorSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this runbook as the Node v161 dry-run closeout for the idempotency vertical slice.",
      "Create the next plan from Node v161 instead of appending more completed versions to the v159 plan.",
      "Keep any future live idempotency drill behind a separate approval, explicit operator startup, and write-safety gate.",
    ],
  };
}

export function renderControlledIdempotencyDrillRunbookMarkdown(
  profile: ControlledIdempotencyDrillRunbookProfile,
): string {
  return [
    "# Controlled idempotency drill runbook",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Runbook state: ${profile.runbookState}`,
    `- Ready for controlled idempotency drill runbook: ${profile.readyForControlledIdempotencyDrillRunbook}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Dry run only: ${profile.dryRunOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runbook",
    "",
    ...renderEntries(profile.runbook),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Previous Readiness Review",
    "",
    ...renderEntries(profile.artifacts.previousReadinessReview),
    "",
    "### Java Store Abstraction",
    "",
    ...renderEntries(profile.artifacts.javaStoreAbstraction),
    "",
    "### mini-kv Recovery Evidence",
    "",
    ...renderEntries(profile.artifacts.miniKvRecoveryEvidence),
    "",
    "### Node Drill Envelope",
    "",
    ...renderEntries(profile.artifacts.nodeDrillEnvelope),
    "",
    "## Operator Steps",
    "",
    ...profile.operatorSteps.flatMap(renderStep),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No controlled idempotency drill runbook blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No controlled idempotency drill runbook warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No controlled idempotency drill runbook recommendations."),
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

function createOperatorSteps(): ControlledIdempotencyDrillStep[] {
  return [
    {
      order: 1,
      phase: "prepare",
      actor: "operator",
      action: "Confirm Java v53 and mini-kv v62 tags are present before starting the dry-run review.",
      evidenceTarget: "git tag evidence only",
      expectedEvidence: "Java v53 and mini-kv v62 are already completed and pushed.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 2,
      phase: "observe",
      actor: "java",
      action: "Inspect Java order idempotency store abstraction evidence.",
      evidenceTarget: "GET /api/v1/ops/evidence and /contracts/order-idempotency-store-abstraction.sample.json",
      expectedEvidence: "activeStore=jpa-order-idempotency-store, activeStoreMode=JPA_DATABASE, miniKvAdapterEnabled=false.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 3,
      phase: "observe",
      actor: "mini-kv",
      action: "Inspect mini-kv TTL token recovery evidence without executing SETNXEX.",
      evidenceTarget: "fixtures/ttl-token/recovery-evidence.json and fixtures/ttl-token/index.json",
      expectedEvidence: "replayDropsExpiredToken=true, snapshotLoadDropsExpiredToken=true, orderAuthoritative=false.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 4,
      phase: "compare",
      actor: "node",
      action: "Compare Java's active JPA idempotency store with mini-kv's disabled TTL token candidate.",
      evidenceTarget: "Node v161 controlled runbook JSON",
      expectedEvidence: "orderTruthSource=java-database and tokenStoreRole=disabled-ttl-token-candidate.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 5,
      phase: "decide",
      actor: "operator",
      action: "Record that no live idempotency write drill is authorized by this runbook.",
      evidenceTarget: "forbiddenOperations[]",
      expectedEvidence: "POST /api/v1/orders and SETNXEX against live mini-kv remain forbidden.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Archive the dry-run runbook and start a fresh post-v161 plan for the next production-hardening slice.",
      evidenceTarget: "c/161 and docs/plans/v161-post-controlled-idempotency-drill-roadmap.md",
      expectedEvidence: "Node v161 is the closeout of the current v159-derived idempotency slice.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
    },
  ];
}

function createForbiddenOperations(): ControlledIdempotencyForbiddenOperation[] {
  return [
    {
      operation: "POST /api/v1/orders",
      reason: "Creating orders is a Java write path and is outside the Node v161 dry-run runbook.",
      blockedBy: "Node v161 runbook",
    },
    {
      operation: "SETNXEX against a live mini-kv instance",
      reason: "SETNXEX is a write command; v161 consumes recovery evidence only.",
      blockedBy: "mini-kv v62 boundary",
    },
    {
      operation: "Enable mini-kv adapter in Java order creation",
      reason: "Java v53 declares mini-kv only as a disabled candidate.",
      blockedBy: "Java v53 boundary",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production write actions must remain disabled for this runbook.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Node automatically starts Java or mini-kv",
      reason: "Operator startup and real upstream windows must remain explicit.",
      blockedBy: "Node v161 runbook",
    },
    {
      operation: "Treat mini-kv as order-authoritative storage",
      reason: "mini-kv v62 recovery evidence is not an order truth source.",
      blockedBy: "mini-kv v62 boundary",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousReadinessReview: IdempotencyVerticalReadinessReviewProfile,
  operatorSteps: ControlledIdempotencyDrillStep[],
  forbiddenOperations: ControlledIdempotencyForbiddenOperation[],
): ControlledIdempotencyDrillRunbookProfile["checks"] {
  return {
    previousReadinessReviewReady: previousReadinessReview.readyForIdempotencyVerticalReadinessReview
      && previousReadinessReview.reviewState === "ready-read-only-vertical-slice",
    previousReviewDoesNotAuthorizeWrites: !previousReadinessReview.executionAllowed
      && !previousReadinessReview.review.productionWriteAuthorized,
    javaV53TagReady: JAVA_V53_IDEMPOTENCY_STORE.tag === "v53订单平台idempotency-store-abstraction",
    javaStoreAbstractionReady: JAVA_V53_IDEMPOTENCY_STORE.storeAbstractionVersion === "java-idempotency-store.v1"
      && JAVA_V53_IDEMPOTENCY_STORE.activeImplementation === "JpaIdempotencyStore",
    javaActiveStoreDatabaseBacked: JAVA_V53_IDEMPOTENCY_STORE.activeStoreMode === "JPA_DATABASE"
      && JAVA_V53_IDEMPOTENCY_STORE.authoritativeStore === "orders table",
    javaMiniKvCandidateDeclaredButDisabled: JAVA_V53_IDEMPOTENCY_STORE.miniKvAdapterCandidateDeclared
      && !JAVA_V53_IDEMPOTENCY_STORE.miniKvAdapterEnabled
      && !JAVA_V53_IDEMPOTENCY_STORE.miniKvConnected,
    javaNodeWritesForbidden: !JAVA_V53_IDEMPOTENCY_STORE.nodeMayTriggerWrites,
    javaDoesNotChangePaymentInventory: !JAVA_V53_IDEMPOTENCY_STORE.changesPaymentOrInventoryTransaction,
    miniKvV62TagReady: MINI_KV_V62_TTL_RECOVERY.tag === "第六十二版TTL恢复证据",
    miniKvRecoveryEvidenceReady: MINI_KV_V62_TTL_RECOVERY.capability === "ttl_token_recovery"
      && MINI_KV_V62_TTL_RECOVERY.claimRecord === "SETEXAT key epoch_millis value",
    miniKvExpiredTokensDoNotRevive: MINI_KV_V62_TTL_RECOVERY.replayDropsExpiredToken
      && MINI_KV_V62_TTL_RECOVERY.snapshotLoadDropsExpiredToken,
    miniKvRestartEvidenceReady: MINI_KV_V62_TTL_RECOVERY.replayRestoresUnexpiredToken
      && MINI_KV_V62_TTL_RECOVERY.restartMergesSnapshotAndWalTokens
      && MINI_KV_V62_TTL_RECOVERY.compactedSetExpireatRestoresTtl,
    miniKvOrderAuthoritativeFalse: !MINI_KV_V62_TTL_RECOVERY.orderAuthoritative,
    miniKvNotInJavaTransactionChain: !MINI_KV_V62_TTL_RECOVERY.connectedToJavaTransactionChain,
    drillStepsAreDryRunOnly: operatorSteps.length === 6
      && operatorSteps.every((step) => step.dryRunOnly && step.readOnly && !step.mutatesState),
    forbiddenOperationsCovered: forbiddenOperations.length >= 6
      && forbiddenOperations.some((operation) => operation.operation === "POST /api/v1/orders")
      && forbiddenOperations.some((operation) => operation.operation === "SETNXEX against a live mini-kv instance"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionOperationsStillFalse: true,
    readyForControlledIdempotencyDrillRunbook: false,
  };
}

function collectProductionBlockers(
  checks: ControlledIdempotencyDrillRunbookProfile["checks"],
): ControlledIdempotencyDrillRunbookMessage[] {
  const blockers: ControlledIdempotencyDrillRunbookMessage[] = [];
  addMessage(blockers, checks.previousReadinessReviewReady, "PREVIOUS_READINESS_REVIEW_NOT_READY", "idempotency-vertical-readiness-review", "Node v160 readiness review must be ready.");
  addMessage(blockers, checks.previousReviewDoesNotAuthorizeWrites, "PREVIOUS_REVIEW_AUTHORIZES_WRITES", "idempotency-vertical-readiness-review", "Node v160 must not authorize writes.");
  addMessage(blockers, checks.javaV53TagReady, "JAVA_V53_TAG_NOT_READY", "java-v53-idempotency-store-abstraction", "Java v53 tag reference must be present.");
  addMessage(blockers, checks.javaStoreAbstractionReady, "JAVA_STORE_ABSTRACTION_NOT_READY", "java-v53-idempotency-store-abstraction", "Java IdempotencyStore abstraction evidence must be ready.");
  addMessage(blockers, checks.javaActiveStoreDatabaseBacked, "JAVA_ACTIVE_STORE_NOT_DATABASE", "java-v53-idempotency-store-abstraction", "Java active idempotency store must remain database-backed.");
  addMessage(blockers, checks.javaMiniKvCandidateDeclaredButDisabled, "JAVA_MINI_KV_CANDIDATE_ENABLED", "java-v53-idempotency-store-abstraction", "mini-kv adapter candidate must remain disabled.");
  addMessage(blockers, checks.javaNodeWritesForbidden, "JAVA_ALLOWS_NODE_WRITES", "java-v53-idempotency-store-abstraction", "Java evidence must not allow Node-triggered writes.");
  addMessage(blockers, checks.javaDoesNotChangePaymentInventory, "JAVA_PAYMENT_INVENTORY_CHANGED", "java-v53-idempotency-store-abstraction", "Java v53 must not change payment or inventory semantics.");
  addMessage(blockers, checks.miniKvV62TagReady, "MINI_KV_V62_TAG_NOT_READY", "mini-kv-v62-ttl-recovery-evidence", "mini-kv v62 tag reference must be present.");
  addMessage(blockers, checks.miniKvRecoveryEvidenceReady, "MINI_KV_RECOVERY_EVIDENCE_NOT_READY", "mini-kv-v62-ttl-recovery-evidence", "mini-kv TTL recovery evidence must be ready.");
  addMessage(blockers, checks.miniKvExpiredTokensDoNotRevive, "MINI_KV_EXPIRED_TOKEN_REVIVES", "mini-kv-v62-ttl-recovery-evidence", "Expired tokens must not revive through WAL or snapshot recovery.");
  addMessage(blockers, checks.miniKvRestartEvidenceReady, "MINI_KV_RESTART_EVIDENCE_NOT_READY", "mini-kv-v62-ttl-recovery-evidence", "Restart recovery evidence must be ready.");
  addMessage(blockers, checks.miniKvOrderAuthoritativeFalse, "MINI_KV_ORDER_AUTHORITATIVE", "mini-kv-v62-ttl-recovery-evidence", "mini-kv must not be order-authoritative.");
  addMessage(blockers, checks.miniKvNotInJavaTransactionChain, "MINI_KV_IN_JAVA_TRANSACTION_CHAIN", "mini-kv-v62-ttl-recovery-evidence", "mini-kv must remain outside Java transaction chain.");
  addMessage(blockers, checks.drillStepsAreDryRunOnly, "DRILL_STEPS_MUTATE_STATE", "controlled-idempotency-drill-runbook", "All drill steps must be read-only dry-run steps.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "controlled-idempotency-drill-runbook", "Runbook must list key forbidden write operations.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "controlled-idempotency-drill-runbook", "Runbook must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Runbook must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  runbookState: ControlledIdempotencyDrillRunbookProfile["runbookState"],
): ControlledIdempotencyDrillRunbookMessage[] {
  return [
    {
      code: runbookState === "blocked" ? "CONTROLLED_DRILL_RUNBOOK_BLOCKED" : "CONTROLLED_DRILL_RUNBOOK_READY",
      severity: "warning",
      source: "controlled-idempotency-drill-runbook",
      message: runbookState === "blocked"
        ? "Controlled idempotency drill runbook has blockers."
        : "Controlled idempotency drill runbook is ready as a manual dry-run only artifact.",
    },
    {
      code: "JAVA_STORE_ABSTRACTION_STAYS_DATABASE_BACKED",
      severity: "warning",
      source: "java-v53-idempotency-store-abstraction",
      message: "Java v53 exposes IdempotencyStore abstraction while keeping JPA database as the active store.",
    },
    {
      code: "MINI_KV_RECOVERY_EVIDENCE_ONLY",
      severity: "warning",
      source: "mini-kv-v62-ttl-recovery-evidence",
      message: "mini-kv v62 recovery evidence is suitable for drill review, not production order authority.",
    },
  ];
}

function collectRecommendations(
  runbookState: ControlledIdempotencyDrillRunbookProfile["runbookState"],
): ControlledIdempotencyDrillRunbookMessage[] {
  return [
    {
      code: runbookState === "blocked"
        ? "FIX_CONTROLLED_DRILL_RUNBOOK_BLOCKERS"
        : "START_POST_V161_PLAN",
      severity: "recommendation",
      source: "controlled-idempotency-drill-runbook",
      message: runbookState === "blocked"
        ? "Fix blockers before closing the idempotency vertical slice."
        : "Start a fresh post-v161 plan for the next production-hardening slice instead of appending more completed versions here.",
    },
  ];
}

function addMessage(
  messages: ControlledIdempotencyDrillRunbookMessage[],
  condition: boolean,
  code: string,
  source: ControlledIdempotencyDrillRunbookMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderStep(step: ControlledIdempotencyDrillStep): string[] {
  return [
    `### Step ${step.order}: ${step.phase}`,
    "",
    `- Actor: ${step.actor}`,
    `- Action: ${step.action}`,
    `- Evidence target: ${step.evidenceTarget}`,
    `- Expected evidence: ${step.expectedEvidence}`,
    `- Dry run only: ${step.dryRunOnly}`,
    `- Read only: ${step.readOnly}`,
    `- Mutates state: ${step.mutatesState}`,
    "",
  ];
}

function renderForbiddenOperation(operation: ControlledIdempotencyForbiddenOperation): string[] {
  return [
    `- ${operation.operation}: ${operation.reason} Blocked by ${operation.blockedBy}.`,
  ];
}

function digestRunbook(value: unknown): string {
  return sha256StableJson(value);
}
