import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface IdempotencyVerticalReadinessReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "idempotency-vertical-readiness-review.v1";
  reviewState: "ready-read-only-vertical-slice" | "blocked";
  readyForIdempotencyVerticalReadinessReview: boolean;
  readyForControlledIdempotencyDrill: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  review: {
    reviewDigest: string;
    javaVersionTag: JavaIdempotencyBoundaryReference["tag"];
    javaBoundaryVersion: JavaIdempotencyBoundaryReference["boundaryVersion"];
    javaRequestFingerprintVersion: JavaIdempotencyBoundaryReference["requestFingerprintVersion"];
    miniKvVersionTag: MiniKvTtlTokenPrimitiveReference["tag"];
    miniKvCapability: MiniKvTtlTokenPrimitiveReference["capability"];
    miniKvCommand: MiniKvTtlTokenPrimitiveReference["command"];
    orderTruthSource: "java-database";
    tokenStoreRole: "ttl-token-candidate-only";
    javaMiniKvConnected: false;
    miniKvOrderAuthoritative: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionWriteAuthorized: false;
  };
  checks: {
    javaV52TagReady: boolean;
    javaBoundaryVersionReady: boolean;
    javaRequestFingerprintReady: boolean;
    javaConflictBeforeMutationReady: boolean;
    javaKeepsDatabaseAuthoritative: boolean;
    javaMiniKvDisconnected: boolean;
    javaDoesNotChangePaymentInventory: boolean;
    miniKvV61TagReady: boolean;
    miniKvSetnxexReady: boolean;
    miniKvAtomicAbsentClaimReady: boolean;
    miniKvExpirationReady: boolean;
    miniKvWalBoundaryReady: boolean;
    miniKvOrderAuthoritativeFalse: boolean;
    miniKvNotInJavaTransactionChain: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    nodeDoesNotAuthorizeWrites: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForIdempotencyVerticalReadinessReview: boolean;
  };
  artifacts: {
    javaBoundary: JavaIdempotencyBoundaryReference;
    miniKvTokenPrimitive: MiniKvTtlTokenPrimitiveReference;
    nodeSafetyEnvelope: {
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionWriteAuthorized: false;
      nodeReviewOnly: true;
    };
  };
  summary: {
    reviewCheckCount: number;
    passedReviewCheckCount: number;
    upstreamEvidenceCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: IdempotencyVerticalReadinessReviewMessage[];
  warnings: IdempotencyVerticalReadinessReviewMessage[];
  recommendations: IdempotencyVerticalReadinessReviewMessage[];
  evidenceEndpoints: {
    idempotencyVerticalReadinessReviewJson: string;
    idempotencyVerticalReadinessReviewMarkdown: string;
    previousReleaseEvidenceReviewJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaIdempotencyBoundaryReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v52";
  tag: "v52订单平台order-idempotency-boundary";
  evidenceKind: "order-idempotency-boundary";
  evidencePath: "/contracts/order-idempotency-boundary.sample.json";
  walkthroughPath: "代码讲解记录_生产雏形阶段/56-version-52-order-idempotency-boundary.md";
  boundaryVersion: "java-order-idempotency-boundary.v1";
  requestFingerprintVersion: "order-create-request-sha256.v1";
  sameKeySameRequestOutcome: "REPLAY_EXISTING_ORDER";
  sameKeyDifferentRequestOutcome: "REJECT_BEFORE_ORDER_MUTATION";
  sameKeyDifferentRequestErrorCode: "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST";
  sameKeyDifferentRequestStatus: 409;
  authoritativeStore: "orders table";
  miniKvConnected: false;
  externalTokenStoreConnected: false;
  changesPaymentOrInventoryTransaction: false;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvTtlTokenPrimitiveReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v61";
  tag: "第六十一版TTL令牌原语";
  evidenceKind: "ttl-token-primitive";
  evidencePath: "fixtures/ttl-token/index.json";
  walkthroughPath: "代码讲解记录_生产雏形阶段/117-version-61-ttl-token-primitive.md";
  capability: "ttl_token_primitive";
  command: "SETNXEX key seconds value";
  successResponse: "1";
  duplicateResponse: "0";
  expiredTokenCanBeClaimedAgain: true;
  atomicAbsentClaim: true;
  walRecord: "SETEXAT key epoch_millis value";
  walReplayDropsExpiredToken: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  changesPaymentOrInventorySemantics: false;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface IdempotencyVerticalReadinessReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "idempotency-vertical-readiness-review"
    | "java-v52-idempotency-boundary"
    | "mini-kv-v61-ttl-token-primitive"
    | "runtime-config";
  message: string;
}

const JAVA_V52_IDEMPOTENCY_BOUNDARY: JavaIdempotencyBoundaryReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v52",
  tag: "v52订单平台order-idempotency-boundary",
  evidenceKind: "order-idempotency-boundary",
  evidencePath: "/contracts/order-idempotency-boundary.sample.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/56-version-52-order-idempotency-boundary.md",
  boundaryVersion: "java-order-idempotency-boundary.v1",
  requestFingerprintVersion: "order-create-request-sha256.v1",
  sameKeySameRequestOutcome: "REPLAY_EXISTING_ORDER",
  sameKeyDifferentRequestOutcome: "REJECT_BEFORE_ORDER_MUTATION",
  sameKeyDifferentRequestErrorCode: "IDEMPOTENCY_KEY_REUSED_WITH_DIFFERENT_REQUEST",
  sameKeyDifferentRequestStatus: 409,
  authoritativeStore: "orders table",
  miniKvConnected: false,
  externalTokenStoreConnected: false,
  changesPaymentOrInventoryTransaction: false,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V61_TTL_TOKEN_PRIMITIVE: MiniKvTtlTokenPrimitiveReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v61",
  tag: "第六十一版TTL令牌原语",
  evidenceKind: "ttl-token-primitive",
  evidencePath: "fixtures/ttl-token/index.json",
  walkthroughPath: "代码讲解记录_生产雏形阶段/117-version-61-ttl-token-primitive.md",
  capability: "ttl_token_primitive",
  command: "SETNXEX key seconds value",
  successResponse: "1",
  duplicateResponse: "0",
  expiredTokenCanBeClaimedAgain: true,
  atomicAbsentClaim: true,
  walRecord: "SETEXAT key epoch_millis value",
  walReplayDropsExpiredToken: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  changesPaymentOrInventorySemantics: false,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  idempotencyVerticalReadinessReviewJson: "/api/v1/production/idempotency-vertical-readiness-review",
  idempotencyVerticalReadinessReviewMarkdown: "/api/v1/production/idempotency-vertical-readiness-review?format=markdown",
  previousReleaseEvidenceReviewJson: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review",
  currentRoadmap: "docs/plans/v159-post-release-evidence-review-roadmap.md",
});

export function loadIdempotencyVerticalReadinessReview(
  config: AppConfig,
): IdempotencyVerticalReadinessReviewProfile {
  const checks = createChecks(config);
  checks.readyForIdempotencyVerticalReadinessReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForIdempotencyVerticalReadinessReview")
    .every(([, value]) => value);
  const reviewState = checks.readyForIdempotencyVerticalReadinessReview
    ? "ready-read-only-vertical-slice"
    : "blocked";
  const reviewDigest = digestReview({
    profileVersion: "idempotency-vertical-readiness-review.v1",
    javaVersionTag: JAVA_V52_IDEMPOTENCY_BOUNDARY.tag,
    javaBoundaryVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.boundaryVersion,
    javaRequestFingerprintVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.requestFingerprintVersion,
    miniKvVersionTag: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.tag,
    miniKvCapability: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.capability,
    miniKvCommand: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.command,
    orderTruthSource: "java-database",
    tokenStoreRole: "ttl-token-candidate-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    productionWriteAuthorized: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(reviewState);
  const recommendations = collectRecommendations(reviewState);

  return {
    service: "orderops-node",
    title: "Idempotency vertical readiness review",
    generatedAt: new Date().toISOString(),
    profileVersion: "idempotency-vertical-readiness-review.v1",
    reviewState,
    readyForIdempotencyVerticalReadinessReview: checks.readyForIdempotencyVerticalReadinessReview,
    readyForControlledIdempotencyDrill: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    review: {
      reviewDigest,
      javaVersionTag: JAVA_V52_IDEMPOTENCY_BOUNDARY.tag,
      javaBoundaryVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.boundaryVersion,
      javaRequestFingerprintVersion: JAVA_V52_IDEMPOTENCY_BOUNDARY.requestFingerprintVersion,
      miniKvVersionTag: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.tag,
      miniKvCapability: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.capability,
      miniKvCommand: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.command,
      orderTruthSource: "java-database",
      tokenStoreRole: "ttl-token-candidate-only",
      javaMiniKvConnected: false,
      miniKvOrderAuthoritative: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionWriteAuthorized: false,
    },
    checks,
    artifacts: {
      javaBoundary: { ...JAVA_V52_IDEMPOTENCY_BOUNDARY },
      miniKvTokenPrimitive: { ...MINI_KV_V61_TTL_TOKEN_PRIMITIVE },
      nodeSafetyEnvelope: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionWriteAuthorized: false,
        nodeReviewOnly: true,
      },
    },
    summary: {
      reviewCheckCount: countReportChecks(checks),
      passedReviewCheckCount: countPassedReportChecks(checks),
      upstreamEvidenceCount: 2,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to the recommended parallel stage Java v53 plus mini-kv v62 only after this read-only review remains clean.",
      "Keep Java as the order truth source while Java v53 extracts an IdempotencyStore abstraction.",
      "Keep mini-kv as a disabled TTL token candidate until recovery evidence and a controlled drill runbook exist.",
      "Build Node v161 only after Java v53 and mini-kv v62 are both complete.",
    ],
  };
}

export function renderIdempotencyVerticalReadinessReviewMarkdown(
  profile: IdempotencyVerticalReadinessReviewProfile,
): string {
  return [
    "# Idempotency vertical readiness review",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Review state: ${profile.reviewState}`,
    `- Ready for idempotency vertical readiness review: ${profile.readyForIdempotencyVerticalReadinessReview}`,
    `- Ready for controlled idempotency drill: ${profile.readyForControlledIdempotencyDrill}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Review",
    "",
    ...renderEntries(profile.review),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Java Boundary",
    "",
    ...renderEntries(profile.artifacts.javaBoundary),
    "",
    "### mini-kv Token Primitive",
    "",
    ...renderEntries(profile.artifacts.miniKvTokenPrimitive),
    "",
    "### Node Safety Envelope",
    "",
    ...renderEntries(profile.artifacts.nodeSafetyEnvelope),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No idempotency vertical readiness review blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No idempotency vertical readiness review warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No idempotency vertical readiness review recommendations."),
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

function createChecks(config: AppConfig): IdempotencyVerticalReadinessReviewProfile["checks"] {
  return {
    javaV52TagReady: JAVA_V52_IDEMPOTENCY_BOUNDARY.tag === "v52订单平台order-idempotency-boundary",
    javaBoundaryVersionReady: JAVA_V52_IDEMPOTENCY_BOUNDARY.boundaryVersion === "java-order-idempotency-boundary.v1",
    javaRequestFingerprintReady: JAVA_V52_IDEMPOTENCY_BOUNDARY.requestFingerprintVersion === "order-create-request-sha256.v1",
    javaConflictBeforeMutationReady: JAVA_V52_IDEMPOTENCY_BOUNDARY.sameKeyDifferentRequestOutcome === "REJECT_BEFORE_ORDER_MUTATION"
      && JAVA_V52_IDEMPOTENCY_BOUNDARY.sameKeyDifferentRequestStatus === 409,
    javaKeepsDatabaseAuthoritative: JAVA_V52_IDEMPOTENCY_BOUNDARY.authoritativeStore === "orders table",
    javaMiniKvDisconnected: !JAVA_V52_IDEMPOTENCY_BOUNDARY.miniKvConnected
      && !JAVA_V52_IDEMPOTENCY_BOUNDARY.externalTokenStoreConnected,
    javaDoesNotChangePaymentInventory: !JAVA_V52_IDEMPOTENCY_BOUNDARY.changesPaymentOrInventoryTransaction,
    miniKvV61TagReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.tag === "第六十一版TTL令牌原语",
    miniKvSetnxexReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.command === "SETNXEX key seconds value"
      && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.successResponse === "1"
      && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.duplicateResponse === "0",
    miniKvAtomicAbsentClaimReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.atomicAbsentClaim,
    miniKvExpirationReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.expiredTokenCanBeClaimedAgain,
    miniKvWalBoundaryReady: MINI_KV_V61_TTL_TOKEN_PRIMITIVE.walRecord === "SETEXAT key epoch_millis value"
      && MINI_KV_V61_TTL_TOKEN_PRIMITIVE.walReplayDropsExpiredToken,
    miniKvOrderAuthoritativeFalse: !MINI_KV_V61_TTL_TOKEN_PRIMITIVE.orderAuthoritative,
    miniKvNotInJavaTransactionChain: !MINI_KV_V61_TTL_TOKEN_PRIMITIVE.connectedToJavaTransactionChain
      && !MINI_KV_V61_TTL_TOKEN_PRIMITIVE.changesPaymentOrInventorySemantics,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    nodeDoesNotAuthorizeWrites: true,
    readyForProductionOperationsStillFalse: true,
    readyForIdempotencyVerticalReadinessReview: false,
  };
}

function collectProductionBlockers(
  checks: IdempotencyVerticalReadinessReviewProfile["checks"],
): IdempotencyVerticalReadinessReviewMessage[] {
  const blockers: IdempotencyVerticalReadinessReviewMessage[] = [];
  addMessage(blockers, checks.javaV52TagReady, "JAVA_V52_TAG_NOT_READY", "java-v52-idempotency-boundary", "Java v52 tag reference must be present.");
  addMessage(blockers, checks.javaBoundaryVersionReady, "JAVA_BOUNDARY_VERSION_NOT_READY", "java-v52-idempotency-boundary", "Java boundary version must match v52 evidence.");
  addMessage(blockers, checks.javaRequestFingerprintReady, "JAVA_REQUEST_FINGERPRINT_NOT_READY", "java-v52-idempotency-boundary", "Java request fingerprint version must be available.");
  addMessage(blockers, checks.javaConflictBeforeMutationReady, "JAVA_CONFLICT_BOUNDARY_NOT_READY", "java-v52-idempotency-boundary", "Java must reject same-key different-request before order mutation.");
  addMessage(blockers, checks.javaKeepsDatabaseAuthoritative, "JAVA_ORDER_TRUTH_NOT_DATABASE", "java-v52-idempotency-boundary", "Java database must remain the order truth source.");
  addMessage(blockers, checks.javaMiniKvDisconnected, "JAVA_MINI_KV_CONNECTED_TOO_EARLY", "java-v52-idempotency-boundary", "Java v52 must not connect mini-kv to order idempotency.");
  addMessage(blockers, checks.javaDoesNotChangePaymentInventory, "JAVA_PAYMENT_INVENTORY_CHANGED", "java-v52-idempotency-boundary", "Java v52 must not change payment or inventory transaction semantics.");
  addMessage(blockers, checks.miniKvV61TagReady, "MINI_KV_V61_TAG_NOT_READY", "mini-kv-v61-ttl-token-primitive", "mini-kv v61 tag reference must be present.");
  addMessage(blockers, checks.miniKvSetnxexReady, "MINI_KV_SETNXEX_NOT_READY", "mini-kv-v61-ttl-token-primitive", "mini-kv must expose SETNXEX token claim semantics.");
  addMessage(blockers, checks.miniKvAtomicAbsentClaimReady, "MINI_KV_ATOMIC_CLAIM_NOT_READY", "mini-kv-v61-ttl-token-primitive", "mini-kv token primitive must be an atomic absent claim.");
  addMessage(blockers, checks.miniKvExpirationReady, "MINI_KV_TTL_EXPIRATION_NOT_READY", "mini-kv-v61-ttl-token-primitive", "Expired mini-kv token must be claimable again.");
  addMessage(blockers, checks.miniKvWalBoundaryReady, "MINI_KV_WAL_BOUNDARY_NOT_READY", "mini-kv-v61-ttl-token-primitive", "mini-kv WAL evidence must preserve token TTL boundaries.");
  addMessage(blockers, checks.miniKvOrderAuthoritativeFalse, "MINI_KV_ORDER_AUTHORITATIVE", "mini-kv-v61-ttl-token-primitive", "mini-kv must not be treated as order-authoritative.");
  addMessage(blockers, checks.miniKvNotInJavaTransactionChain, "MINI_KV_IN_JAVA_TRANSACTION_CHAIN", "mini-kv-v61-ttl-token-primitive", "mini-kv must remain outside Java payment, inventory, and order transaction semantics.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "idempotency-vertical-readiness-review", "Review must not start Java or mini-kv.");
  addMessage(blockers, checks.nodeDoesNotAuthorizeWrites, "NODE_REVIEW_AUTHORIZES_WRITES", "idempotency-vertical-readiness-review", "Node v160 review must not authorize writes.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Readiness review must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  reviewState: IdempotencyVerticalReadinessReviewProfile["reviewState"],
): IdempotencyVerticalReadinessReviewMessage[] {
  return [
    {
      code: reviewState === "blocked" ? "IDEMPOTENCY_REVIEW_BLOCKED" : "IDEMPOTENCY_VERTICAL_SLICE_READY",
      severity: "warning",
      source: "idempotency-vertical-readiness-review",
      message: reviewState === "blocked"
        ? "Idempotency vertical readiness review has blockers."
        : "Java v52 and mini-kv v61 can be reviewed together as a read-only vertical slice.",
    },
    {
      code: "JAVA_REMAINS_ORDER_TRUTH_SOURCE",
      severity: "warning",
      source: "java-v52-idempotency-boundary",
      message: "Java v52 keeps the orders table as the order truth source and does not connect mini-kv.",
    },
    {
      code: "MINI_KV_TOKEN_CANDIDATE_ONLY",
      severity: "warning",
      source: "mini-kv-v61-ttl-token-primitive",
      message: "mini-kv v61 provides SETNXEX TTL token evidence only; it is not order-authoritative.",
    },
  ];
}

function collectRecommendations(
  reviewState: IdempotencyVerticalReadinessReviewProfile["reviewState"],
): IdempotencyVerticalReadinessReviewMessage[] {
  return [
    {
      code: reviewState === "blocked"
        ? "FIX_IDEMPOTENCY_REVIEW_BLOCKERS"
        : "PROCEED_TO_PARALLEL_ABSTRACTION_AND_RECOVERY_STAGE",
      severity: "recommendation",
      source: "idempotency-vertical-readiness-review",
      message: reviewState === "blocked"
        ? "Fix readiness blockers before Java v53 or mini-kv v62."
        : "Proceed to recommended parallel Java v53 IdempotencyStore abstraction and mini-kv v62 TTL recovery evidence.",
    },
  ];
}

function addMessage(
  messages: IdempotencyVerticalReadinessReviewMessage[],
  condition: boolean,
  code: string,
  source: IdempotencyVerticalReadinessReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function digestReview(value: unknown): string {
  return sha256StableJson(value);
}
