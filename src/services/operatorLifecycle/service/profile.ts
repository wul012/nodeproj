import type {
  FrozenLiveReadPlan,
  JavaServiceLifecycle,
  LifecycleEvidenceFile,
  MiniKvServiceTemplate,
  ServiceIntakeChecks,
  ServiceIntakeMessage,
  ServiceIntakeProfile,
  ServiceIntakeRecord,
  ServiceIntakeSummary,
  SourceV385Archive,
} from "./intakeTypes.js";

// Design: this module owns public profile assembly and key order.
// Loaders acquire data; checks decide readiness; renderers format the profile.
// Contract field names remain stable even though local TypeScript names are short.

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake";
const SOURCE_NODE_V385_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v385-post-java-mini-kv-live-read-gate-plan-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md";

interface ServiceProfileInput {
  source: SourceV385Archive;
  javaFile: LifecycleEvidenceFile;
  miniTemplateFile: LifecycleEvidenceFile;
  frozenPlanFile: LifecycleEvidenceFile;
  java: JavaServiceLifecycle;
  miniKv: MiniKvServiceTemplate;
  frozenPlan: FrozenLiveReadPlan;
  intake: ServiceIntakeRecord;
  checks: ServiceIntakeChecks;
  summary: ServiceIntakeSummary;
  blockers: ServiceIntakeMessage[];
  warnings: ServiceIntakeMessage[];
  recommendations: ServiceIntakeMessage[];
  ready: boolean;
}

export function createServiceProfile(input: ServiceProfileInput): ServiceIntakeProfile {
  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: input.ready ? "java-mini-kv-operator-service-lifecycle-evidence-intake-ready" : "blocked",
    intakeDecision: input.ready ? "consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence" : "blocked",
    readyForOperatorServiceLifecycleEvidenceIntake: input.ready,
    readyForNodeV387ArchiveVerification: input.ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v386",
    sourceNodeVersion: "Node v385",
    evidenceIntakeOnly: true,
    liveReadGateAllowed: false,
    runtimeProbeAllowed: false,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV385: input.source,
    javaOperatorServiceLifecycleFile: input.javaFile,
    miniKvOperatorServiceLifecycleTemplateFile: input.miniTemplateFile,
    miniKvFrozenLiveReadGatePlanFile: input.frozenPlanFile,
    javaOperatorServiceLifecycle: input.java,
    miniKvOperatorServiceLifecycleTemplate: input.miniKv,
    miniKvFrozenLiveReadGatePlan: input.frozenPlan,
    intake: input.intake,
    checks: input.checks,
    summary: input.summary,
    productionBlockers: input.blockers,
    warnings: input.warnings,
    recommendations: input.recommendations,
    evidenceEndpoints: {
      operatorServiceLifecycleEvidenceIntakeJson: ROUTE_PATH,
      operatorServiceLifecycleEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV385Json: SOURCE_NODE_V385_ROUTE,
      sourceNodeV385Markdown: `${SOURCE_NODE_V385_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v387",
    },
    nextActions: input.ready
      ? [
        "Use Node v387 to archive and verify the v386 operator service lifecycle evidence intake.",
        "Keep Java and mini-kv in recommended parallel mode while mini-kv replaces the template with declared operator evidence.",
        "Do not run runtime probes, start services, or enable active shard routing from this evidence intake.",
      ]
      : [
        "Repair missing Node v385, Java v160, or mini-kv v151/v150 frozen evidence before retrying v386.",
        "Do not substitute mini-kv rolling current evidence for the frozen v151 and v150 historical snapshots.",
      ],
  };
}
