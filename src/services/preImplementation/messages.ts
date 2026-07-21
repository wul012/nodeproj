import type { PlanEchoChecks, PlanEchoMessage } from "./types.js";

interface BlockerRule {
  condition: boolean;
  code: string;
  source: PlanEchoMessage["source"];
  message: string;
}

export function collectProductionBlockers(checks: PlanEchoChecks): PlanEchoMessage[] {
  const rules: BlockerRule[] = [
    {
      condition: checks.sourceNodeV270Ready,
      code: "SOURCE_NODE_V270_NOT_READY",
      source: "node-v270-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 plan intake must be ready before v272 can verify upstream echoes.",
    },
    {
      condition: checks.sourceNodeV270KeepsPlanIntakeOnly,
      code: "SOURCE_NODE_V270_NOT_PLAN_INTAKE_ONLY",
      source: "node-v270-credential-resolver-pre-implementation-plan-intake",
      message: "Node v270 must remain plan-intake-only and read-only.",
    },
    {
      condition: checks.javaV112EchoReady,
      code: "JAVA_V112_ECHO_NOT_READY",
      source: "java-v112-credential-resolver-pre-implementation-plan-intake-echo-receipt",
      message: "Java v112 must echo Node v270 plan intake before v272 can proceed.",
    },
    {
      condition: checks.miniKvV119NonParticipationReady,
      code: "MINI_KV_V119_RECEIPT_NOT_READY",
      source: "mini-kv-v119-credential-resolver-pre-implementation-plan-intake-non-participation-receipt",
      message: "mini-kv v119 must prove plan-intake non-participation before v272 can proceed.",
    },
    {
      condition: checks.planCountsAligned,
      code: "PLAN_COUNTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Node v270, Java v112, and mini-kv v119 must agree on 26/26 checks, 10 defined boundaries, and 0 blockers.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "All ten pre-implementation boundary codes must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.requirementCodesAligned,
      code: "REQUIREMENT_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "All ten requirement codes from v268 must align across Node, Java, and mini-kv.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Credential value read/load/store/include must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryAligned,
      code: "RESOLVER_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Real resolver client and secret provider boundaries must remain closed.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Managed audit connection and external request boundaries must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v272 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v272 upstream echo verification.",
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

export function collectWarnings(): PlanEchoMessage[] {
  return [
    {
      code: "PLAN_INTAKE_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "This profile verifies Java v112 and mini-kv v119 understanding of Node v270 plan intake; it does not implement a real credential resolver.",
    },
    {
      code: "IMPLEMENTATION_REQUIRES_SUCCESSOR_PLAN",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "A successor plan is required before adding any disabled secret-provider stub or resolver interface candidate.",
    },
  ];
}

export function collectRecommendations(): PlanEchoMessage[] {
  return [
    {
      code: "ARCHIVE_V272_AND_CLOSE_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Archive v272 and close the v269-derived plan because Node v270, Java v112, mini-kv v119, and Node v272 complete the planned sequence.",
    },
    {
      code: "WRITE_NEXT_PLAN_BEFORE_RESOLVER_WORK",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake-upstream-echo-verification",
      message: "Write the next plan before moving from plan-intake echo verification toward any disabled resolver implementation candidate.",
    },
  ];
}
