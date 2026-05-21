import {
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import type {
  RuntimeShellPostDecisionContinuationNecessityProof,
  RuntimeShellPostDecisionContinuationOption,
  RuntimeShellPostDecisionContinuationPlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationPlanIntakeTypes.js";

export const RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION =
  "runtime-shell-post-decision-continuation-catalog.v1";

export const RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS = {
  sourceNodeVersion: "Node v300",
  planIntakeVersion: "Node v301",
  catalogQualityPassVersion: "Node v302",
  legacyNextNodeVerificationVersion: "Node v302",
  nextJavaEchoVersion: "Java v136",
  nextMiniKvReceiptVersion: "mini-kv v133",
  nextNodeVerificationVersion: "Node v303",
} as const;

export function createRuntimeShellPostDecisionContinuationPlanIntake(
  profileVersion: string,
): RuntimeShellPostDecisionContinuationPlanIntake {
  const continuationOptions = createRuntimeShellPostDecisionContinuationOptions();
  const record = {
    catalogVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION as typeof RUNTIME_SHELL_POST_DECISION_CONTINUATION_CATALOG_VERSION,
    intakeMode: "runtime-shell-post-decision-continuation-plan-intake-only" as const,
    sourceSpan: RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.sourceNodeVersion,
    selectedContinuationDecision: "continue-blocked-planning" as const,
    decisionOptionCount: continuationOptions.length,
    selectedDecisionOptionCount: countSelectedContinuationOptions(continuationOptions),
    rejectedRuntimeImplementationOptionCount:
      countRejectedRuntimeImplementationOptions(continuationOptions),
    legacyNextNodeVerificationVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.legacyNextNodeVerificationVersion,
    nextJavaEchoVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.nextJavaEchoVersion,
    nextMiniKvReceiptVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.nextMiniKvReceiptVersion,
    nextNodeVerificationVersion:
      RUNTIME_SHELL_POST_DECISION_CONTINUATION_VERSIONS.nextNodeVerificationVersion,
    runtimeShellImplementationAllowed: false as const,
    runtimeShellInvocationAllowed: false as const,
    credentialValueReadAllowed: false as const,
    rawEndpointUrlParseAllowed: false as const,
    providerClientInstantiationAllowed: false as const,
    externalRequestAllowed: false as const,
    schemaMigrationAllowed: false as const,
    approvalLedgerWriteAllowed: false as const,
    automaticUpstreamStartAllowed: false as const,
    continuationOptions,
  };

  return {
    intakeDigest: sha256StableJson({
      profileVersion,
      record,
    }),
    ...record,
  };
}

export function createRuntimeShellPostDecisionContinuationNecessityProof(input: {
  profileVersion: string;
  intakeDigest: string;
}): RuntimeShellPostDecisionContinuationNecessityProof {
  const proof = {
    blockerResolved:
      "v300 verified Java v135 and mini-kv v132 agreement with the blocked decision record, but it did not decide the post-decision continuation path.",
    consumer:
      "Java v136 and mini-kv v133 consume v301 as read-only echoes; Node v303 consumes both echoes after the Node v302 catalog quality pass.",
    whyV300CannotBeReused:
      "v300 is an upstream echo verification for Node v299; it lacks a selected continuation option, v136/v133 handoff target, active v303 verification target, and explicit stop condition for the post-decision chain.",
    existingReportReuseDecision:
      "Reuse v300 only as source evidence; v301 is the minimal intake layer that records continuation, pause, and approval-prerequisite alternatives.",
    stopCondition:
      "Stop immediately if the next step requires credential values, raw endpoint URLs, provider/client instantiation, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, or automatic upstream start.",
    growthControl:
      "After Node v303 verifies Java v136 and mini-kv v133, do not add another echo stage unless a new blocker and downstream consumer are named in the active plan.",
  };

  return {
    proofDigest: sha256StableJson({
      profileVersion: input.profileVersion,
      intakeDigest: input.intakeDigest,
      proof,
    }),
    ...proof,
    proofComplete: Object.values(proof).every((value) => value.length > 0),
  };
}

export function createRuntimeShellPostDecisionContinuationOptions(): RuntimeShellPostDecisionContinuationOption[] {
  return [
    {
      code: "CONTINUE_BLOCKED_PLANNING",
      title: "Continue blocked planning",
      status: "selected",
      rationale: "v300 proved upstream agreement on the blocked decision, so the next safe step is read-only echo of this continuation intake.",
      allowedActions: ["write-v301-intake", "request-java-v136-echo", "request-mini-kv-v133-non-participation"],
      prohibitedActions: ["implement-runtime-shell", "invoke-runtime-shell", "open-managed-audit-connection"],
    },
    {
      code: "PAUSE_RUNTIME_SHELL_CHAIN",
      title: "Pause runtime shell chain",
      status: "documented-alternative",
      rationale: "This remains valid if the next echo would not be consumed, but v303 has a narrow consumer for Java v136 and mini-kv v133 after the v302 catalog quality pass.",
      allowedActions: ["archive-v301-as-paused", "return-to-quality-work"],
      prohibitedActions: ["treat-pause-as-production-approval"],
    },
    {
      code: "REQUIRE_EXPLICIT_APPROVAL_PREREQUISITES",
      title: "Require explicit approval prerequisites",
      status: "documented-alternative",
      rationale: "Future approval prerequisites can be proposed, but v301 has no credential, endpoint, provider, or operator-window approval to unlock runtime.",
      allowedActions: ["list-approval-prerequisites", "keep-prerequisites-read-only"],
      prohibitedActions: ["read-credential-value", "parse-raw-endpoint-url", "instantiate-provider-client"],
    },
    {
      code: "IMPLEMENT_RUNTIME_SHELL_NOW",
      title: "Implement runtime shell now",
      status: "rejected",
      rationale: "v300 aligned a blocked decision record only; it did not approve implementation, invocation, network, credential, or write boundaries.",
      allowedActions: [],
      prohibitedActions: ["implement-runtime-shell", "invoke-runtime-shell", "send-external-request", "write-ledger-or-schema"],
    },
  ];
}

export function countSelectedContinuationOptions(
  continuationOptions: readonly RuntimeShellPostDecisionContinuationOption[],
): number {
  return continuationOptions.filter((option) => option.status === "selected").length;
}

export function countRejectedRuntimeImplementationOptions(
  continuationOptions: readonly RuntimeShellPostDecisionContinuationOption[],
): number {
  return continuationOptions.filter((option) =>
    option.code === "IMPLEMENT_RUNTIME_SHELL_NOW" && option.status === "rejected").length;
}
