import type {
  DeclaredEvidenceFile,
  DeclaredIntakeChecks,
  DeclaredIntakeMessage,
  DeclaredIntakeProfile,
  DeclaredIntakeRecord,
  DeclaredIntakeSummary,
  FrozenOperatorTemplate,
  JavaDeclaredLifecycle,
  MiniKvDeclaredLifecycle,
  SourceV387Archive,
} from "./intakeTypes.js";

// Public profile assembly and property order belong here.
// Loaders acquire evidence; checks decide readiness; renderers format the result.
// Short TypeScript names never alter the established JSON contract field names.
const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake";
const SOURCE_NODE_V387_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v387-post-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v388-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-roadmap.md";

interface DeclaredProfileInput {
  source: SourceV387Archive;
  javaFile: DeclaredEvidenceFile;
  miniKvFile: DeclaredEvidenceFile;
  frozenFile: DeclaredEvidenceFile;
  java: JavaDeclaredLifecycle;
  miniKv: MiniKvDeclaredLifecycle;
  frozen: FrozenOperatorTemplate;
  intake: DeclaredIntakeRecord;
  checks: DeclaredIntakeChecks;
  summary: DeclaredIntakeSummary;
  blockers: DeclaredIntakeMessage[];
  warnings: DeclaredIntakeMessage[];
  recommendations: DeclaredIntakeMessage[];
  ready: boolean;
}

export function createDeclaredProfile(input: DeclaredProfileInput): DeclaredIntakeProfile {
  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: input.ready ? "java-mini-kv-declared-operator-lifecycle-evidence-intake-ready" : "blocked",
    intakeDecision: input.ready
      ? "consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence"
      : "blocked",
    readyForDeclaredOperatorLifecycleEvidenceIntake: input.ready,
    readyForNodeV389ArchiveVerification: input.ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v388",
    sourceNodeVersion: "Node v387",
    evidenceIntakeOnly: true,
    declaredOperatorLifecycleEvidencePresent:
      input.intake.javaDeclaredOperatorLifecyclePresent && input.intake.miniKvDeclaredOperatorLifecyclePresent,
    runtimeGateRequiresSeparateApproval: true,
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
    sourceNodeV387: input.source,
    javaDeclaredOperatorLifecycleFile: input.javaFile,
    miniKvDeclaredOperatorLifecycleFile: input.miniKvFile,
    miniKvFrozenOperatorTemplateFile: input.frozenFile,
    javaDeclaredOperatorLifecycle: input.java,
    miniKvDeclaredOperatorLifecycle: input.miniKv,
    miniKvFrozenOperatorTemplate: input.frozen,
    intake: input.intake,
    checks: input.checks,
    summary: input.summary,
    productionBlockers: input.blockers,
    warnings: input.warnings,
    recommendations: input.recommendations,
    evidenceEndpoints: {
      declaredOperatorLifecycleEvidenceIntakeJson: ROUTE_PATH,
      declaredOperatorLifecycleEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV387Json: SOURCE_NODE_V387_ROUTE,
      sourceNodeV387Markdown: `${SOURCE_NODE_V387_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v389",
    },
    nextActions: input.ready
      ? [
        "Use Node v389 to archive and verify the v388 declared operator lifecycle evidence intake.",
        "Plan a separate runtime live-read gate only after operator approval and concrete loopback ports are recorded.",
        "Do not run runtime probes, start services, or enable active shard routing from this evidence intake.",
      ]
      : [
        "Repair missing Node v387, Java v161, or mini-kv v152/v151 frozen evidence before retrying v388.",
        "Do not substitute mini-kv rolling current evidence for frozen historical snapshots.",
      ],
  };
}
