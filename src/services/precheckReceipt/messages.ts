import type {
  JavaV99Echo,
  MiniKvV108Receipt,
  PrecheckReceiptChecks,
  PrecheckReceiptMessage,
} from "./types.js";

interface BlockerRule {
  condition: boolean;
  code: string;
  source: PrecheckReceiptMessage["source"];
  message: string;
}

export function collectProductionBlockers(
  checks: PrecheckReceiptChecks,
): PrecheckReceiptMessage[] {
  const rules: BlockerRule[] = [
    {
      condition: checks.sourceNodeV245Ready && checks.sourceNodeV245StillReadOnly,
      code: "NODE_V245_PRECHECK_PACKET_NOT_READY",
      source: "node-v245-precheck-packet",
      message: "Node v245 precheck packet must be ready and still read-only before upstream receipt verification.",
    },
    {
      condition: checks.javaV99EchoReady,
      code: "JAVA_V99_PRECHECK_ECHO_RECEIPT_NOT_READY",
      source: "java-v99-precheck-echo-receipt",
      message: "Java v99 must provide the read-only precheck packet echo receipt.",
    },
    {
      condition: checks.miniKvV108NonParticipationReady,
      code: "MINI_KV_V108_NON_PARTICIPATION_RECEIPT_NOT_READY",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "mini-kv v108 must prove no-start, no-write, no-credential, and non-storage backend boundaries.",
    },
    {
      condition: checks.consumerHintAcceptedForCurrentPlan,
      code: "CONSUMER_HINT_NOT_ACCEPTED",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "The mini-kv consumer hint must name the planned precheck upstream receipt verification step.",
    },
    {
      condition: checks.precheckItemCountAligned
        && checks.operatorFieldCountAligned
        && checks.operatorFieldNamesAligned
        && checks.timeoutPolicyAligned,
      code: "PRECHECK_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "Node, Java, and mini-kv must align on seven precheck items, six operator fields, and the timeout policy.",
    },
    {
      condition: checks.credentialBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "PRECHECK_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "The upstream receipts must keep credential, connection, write, and auto-start boundaries closed.",
    },
    {
      condition: checks.routeRegistrationAccepted,
      code: "ROUTE_REGISTRATION_QUALITY_PASS_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "The audit route registration table quality pass must remain ready after adding the v247 route.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during precheck upstream receipt verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

export function collectWarnings(
  java: JavaV99Echo,
  miniKv: MiniKvV108Receipt,
): PrecheckReceiptMessage[] {
  const warnings: PrecheckReceiptMessage[] = [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "This version verifies upstream receipts only; it does not open a managed audit sandbox connection.",
    },
  ];
  if (java.javaUsesReviewSpecificFieldNames) {
    warnings.push({
      code: "JAVA_REVIEW_FIELD_NAMES_ARE_SEMANTIC_ECHO",
      severity: "warning",
      source: "java-v99-precheck-echo-receipt",
      message: "Java v99 uses review/rehearsal field names in its echo receipt; Node accepts this as semantic evidence while mini-kv preserves the exact Node v245 operator fields.",
    });
  }
  if (miniKv.consumerHint === "Node v246 manual sandbox connection precheck upstream receipt verification") {
    warnings.push({
      code: "CONSUMER_HINT_SHIFTED_AFTER_CI_REPAIR",
      severity: "warning",
      source: "mini-kv-v108-precheck-non-participation-receipt",
      message: "mini-kv v108 names Node v246 as the consumer because v246 was planned before the CI fallback repair; Node v247 accepts this as the same precheck verification slot.",
    });
  }
  return warnings;
}

export function collectRecommendations(): PrecheckReceiptMessage[] {
  return [
    {
      code: "CREATE_REHEARSAL_GUARD_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "After this verification is ready, Node v248 can create a rehearsal guard without connecting to managed audit.",
    },
    {
      code: "KEEP_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-precheck-upstream-receipt-verification",
      message: "Do not treat Java v99 or mini-kv v108 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}
