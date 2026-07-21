import type { AppConfig } from "../../../config.js";
import {
  isSha256,
  numberValue,
  readProjectJson,
  stringValue,
  valueAt,
} from "../../../evidence/projectJson.js";
import { readJsonObject } from "../../historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "../../liveProbeReportUtils.js";
import { completeChecks } from "../../reportCheckAssembly.js";
import { createServiceChecks } from "./intakeChecks.js";
import { createServiceProfile } from "./profile.js";
import {
  createLifecycleFile,
  createFrozenLiveReadPlan,
  createJavaServiceLifecycle,
  createMiniKvServiceTemplate,
} from "./sources.js";
import type {
  JavaServiceLifecycle,
  ServiceIntakeProfile,
  FrozenLiveReadPlan,
  MiniKvServiceTemplate,
  LifecycleEvidenceFile,
  ServiceIntakeChecks,
  ServiceIntakeMessage,
  ServiceIntakeRecord,
  ServiceIntakeSummary,
  SourceV385Archive,
} from "./intakeTypes.js";

export {
  renderServiceIntakeMarkdown,
} from "./intakeRenderer.js";

const SOURCE_NODE_V385_ARCHIVE =
  "e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json";
const JAVA_V160_OPERATOR_SERVICE_LIFECYCLE =
  "D:/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json";
const JAVA_V160_OPERATOR_SERVICE_LIFECYCLE_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json";
const MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v151.json";
const MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json";
const MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v150.json";
const MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json";

interface ParsedServiceEvidence {
  sourceNodeV385Json: Record<string, unknown> | null;
  javaOperatorServiceLifecycleJson: Record<string, unknown> | null;
  miniKvOperatorServiceLifecycleTemplateJson: Record<string, unknown> | null;
  miniKvFrozenLiveReadGatePlanJson: Record<string, unknown> | null;
}

export function loadServiceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ServiceIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaOperatorServiceLifecycleFile = createLifecycleFile(
    "java-v160-operator-service-lifecycle",
    JAVA_V160_OPERATOR_SERVICE_LIFECYCLE,
    JAVA_V160_OPERATOR_SERVICE_LIFECYCLE_FALLBACK,
  );
  const miniKvOperatorServiceLifecycleTemplateFile = createLifecycleFile(
    "mini-kv-v151-operator-service-lifecycle-template",
    MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE,
    MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE_FALLBACK,
  );
  const miniKvFrozenLiveReadGatePlanFile = createLifecycleFile(
    "mini-kv-v150-frozen-live-read-gate-plan",
    MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN,
    MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN_FALLBACK,
  );
  const parsed: ParsedServiceEvidence = {
    sourceNodeV385Json: readProjectJson(projectRoot, SOURCE_NODE_V385_ARCHIVE),
    javaOperatorServiceLifecycleJson: readJsonObject(JAVA_V160_OPERATOR_SERVICE_LIFECYCLE),
    miniKvOperatorServiceLifecycleTemplateJson: readJsonObject(MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE),
    miniKvFrozenLiveReadGatePlanJson: readJsonObject(MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN),
  };
  const sourceNodeV385 = createSourceNodeV385(parsed.sourceNodeV385Json);
  const javaOperatorServiceLifecycle = createJavaServiceLifecycle(parsed.javaOperatorServiceLifecycleJson);
  const miniKvOperatorServiceLifecycleTemplate = createMiniKvServiceTemplate(
    parsed.miniKvOperatorServiceLifecycleTemplateJson,
  );
  const miniKvFrozenLiveReadGatePlan = createFrozenLiveReadPlan(parsed.miniKvFrozenLiveReadGatePlanJson);
  const draftIntake = createIntake(
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    false,
  );
  const completed = completeChecks(createServiceChecks({
    source: sourceNodeV385,
    javaFile: javaOperatorServiceLifecycleFile,
    miniTemplateFile: miniKvOperatorServiceLifecycleTemplateFile,
    frozenPlanFile: miniKvFrozenLiveReadGatePlanFile,
    java: javaOperatorServiceLifecycle,
    miniKv: miniKvOperatorServiceLifecycleTemplate,
    frozenPlan: miniKvFrozenLiveReadGatePlan,
    intake: draftIntake,
  }), "readyForOperatorServiceLifecycleEvidenceIntake");
  const { checks, ready } = completed;
  const intake = createIntake(
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    ready,
  );
  checks.intakeDigestStable = isSha256(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    miniKvFrozenLiveReadGatePlan,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return createServiceProfile({
    source: sourceNodeV385,
    javaFile: javaOperatorServiceLifecycleFile,
    miniTemplateFile: miniKvOperatorServiceLifecycleTemplateFile,
    frozenPlanFile: miniKvFrozenLiveReadGatePlanFile,
    java: javaOperatorServiceLifecycle,
    miniKv: miniKvOperatorServiceLifecycleTemplate,
    frozenPlan: miniKvFrozenLiveReadGatePlan,
    intake,
    checks,
    summary,
    blockers: productionBlockers,
    warnings,
    recommendations,
    ready,
  });
}

function createSourceNodeV385(json: Record<string, unknown> | null): SourceV385Archive {
  return {
    sourceVersion: "Node v385",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForLiveReadGatePlanIntakeArchiveVerification:
      valueAt(json, "readyForLiveReadGatePlanIntakeArchiveVerification") === true,
    readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate:
      valueAt(json, "readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate") === true,
    activeNodeVersion: "Node v385",
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    archiveVerificationDigest: stringValue(valueAt(json, "archiveVerification", "archiveVerificationDigest")),
    sourceCheckCount: numberValue(valueAt(json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(json, "summary", "replayPassedCheckCount")),
    productionBlockerCount: numberValue(valueAt(json, "summary", "productionBlockerCount")),
    archiveVerificationOnly: valueAt(json, "archiveVerificationOnly") === true,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createIntake(
  source: SourceV385Archive,
  javaOperatorServiceLifecycleFile: LifecycleEvidenceFile,
  miniKvOperatorServiceLifecycleTemplateFile: LifecycleEvidenceFile,
  miniKvFrozenLiveReadGatePlanFile: LifecycleEvidenceFile,
  java: JavaServiceLifecycle,
  miniKv: MiniKvServiceTemplate,
  ready: boolean,
): ServiceIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-operator-service-lifecycle-evidence-intake" as const,
    sourceSpan: "Node v385 + Java v160 + mini-kv v151" as const,
    sourceNodeV385Digest: source.archiveVerificationDigest,
    javaV160Digest: javaOperatorServiceLifecycleFile.digest,
    miniKvV151Digest: miniKvOperatorServiceLifecycleTemplateFile.digest,
    miniKvV150Digest: miniKvFrozenLiveReadGatePlanFile.digest,
    usesFrozenJavaV160OperatorLifecycleEvidence: javaOperatorServiceLifecycleFile.usedHistoricalFallback,
    usesFrozenMiniKvV151LifecycleTemplate: miniKvOperatorServiceLifecycleTemplateFile.usedHistoricalFallback,
    verifiesMiniKvV150LiveReadGatePlanFreeze: miniKvFrozenLiveReadGatePlanFile.usedHistoricalFallback,
    javaOperatorLifecycleEvidencePresent: java.operatorOwned && java.status === "passed",
    miniKvLifecycleTemplateOnly: miniKv.operatorEvidenceMode === "template-only-no-runtime",
    runtimeGateStillBlocked: true as const,
    consumesRollingCurrentAsHistoricalBaseline: false as const,
    liveReadGateAllowed: false as const,
    runtimeProbeAllowed: false as const,
    activeShardPrototypeEnabled: false as const,
    ready,
  };
  return {
    ...record,
    intakeDigest: sha256StableJson(record),
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v387",
  };
}

function createSummary(
  java: JavaServiceLifecycle,
  miniKv: MiniKvServiceTemplate,
  miniKvFrozen: FrozenLiveReadPlan,
  checks: ServiceIntakeChecks,
  productionBlockers: readonly ServiceIntakeMessage[],
  warnings: readonly ServiceIntakeMessage[],
  recommendations: readonly ServiceIntakeMessage[],
): ServiceIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [
      java.status === "passed" && java.operatorOwned,
      miniKv.status === "operator-service-lifecycle-template-read-only" && checks.miniKvV151OperatorTemplateRequiresEvidence,
      miniKvFrozen.status === "live-read-gate-prerequisite-read-only" && checks.miniKvV150FrozenGatePlanSafe,
    ].filter(Boolean).length,
    javaSmokeTargetCount: java.getOnlySmokeTargets.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    requiredOperatorEvidenceCount: miniKv.requiredOperatorEvidence.length,
    declaredMiniKvOperatorEvidenceCount: [
      miniKv.serviceOwnerDeclared,
      miniKv.startupCommandDeclared,
      miniKv.portListDeclared,
      miniKv.getOnlySmokeTargetDeclared,
      miniKv.cleanupResponsibilityDeclared,
    ].filter(Boolean).length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ServiceIntakeChecks,
): ServiceIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV385Ready, "SOURCE_NODE_V385_NOT_READY", "node-v385", "Node v385 must be ready for v386 intake."],
    [checks.sourceNodeV385ArchiveVerified, "SOURCE_NODE_V385_ARCHIVE_NOT_VERIFIED", "node-v385", "Node v385 archive verification must be complete."],
    [checks.sourceNodeV385ChecksAllPassed, "SOURCE_NODE_V385_CHECKS_NOT_PASSED", "node-v385", "Node v385 source and replay checks must pass."],
    [checks.javaV160FilePresent, "JAVA_V160_OPERATOR_LIFECYCLE_MISSING", "java-v160", "Java v160 operator-owned service lifecycle evidence must be frozen."],
    [checks.javaV160OperatorOwned, "JAVA_V160_NOT_OPERATOR_OWNED", "java-v160", "Java v160 must declare operator-owned lifecycle responsibility."],
    [checks.javaV160NodeLifecycleBlocked, "JAVA_V160_NODE_LIFECYCLE_ALLOWED", "java-v160", "v386 must not allow Node to start or stop Java."],
    [checks.javaV160SmokeTargetsReadOnlyGet, "JAVA_V160_SMOKE_TARGETS_UNSAFE", "java-v160", "Java v160 smoke targets must be GET-only."],
    [checks.javaV160StopConditionsSafe, "JAVA_V160_STOP_CONDITIONS_UNSAFE", "java-v160", "Java v160 must fail closed on service, credential, and non-GET requests."],
    [checks.miniKvV151FilePresent, "MINI_KV_V151_TEMPLATE_MISSING", "mini-kv-v151", "mini-kv v151 operator lifecycle template must be frozen."],
    [checks.miniKvV151BoundarySafe, "MINI_KV_V151_BOUNDARY_UNSAFE", "mini-kv-v151", "mini-kv v151 must keep write, admin, storage, router, and process mutation disabled."],
    [checks.miniKvV151LiveReadGatePlanFreezeSafe, "MINI_KV_V151_LIVE_READ_FREEZE_UNSAFE", "mini-kv-v151", "mini-kv v151 must freeze v150 live-read gate evidence safely."],
    [checks.miniKvV151OperatorTemplateRequiresEvidence, "MINI_KV_V151_OPERATOR_EVIDENCE_NOT_REQUIRED", "mini-kv-v151", "mini-kv v151 must require owner, port, smoke, fail-closed, and cleanup evidence."],
    [checks.miniKvV151OperatorTemplateNotRuntimeReady, "MINI_KV_V151_RUNTIME_TEMPLATE_OPENED", "mini-kv-v151", "mini-kv v151 is a template only and must not be runtime-ready."],
    [checks.miniKvV150FrozenGatePlanSafe, "MINI_KV_V150_FROZEN_GATE_PLAN_INVALID", "mini-kv-v150", "mini-kv v150 frozen live-read gate plan must remain read-only and service-free."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v386 inputs must resolve to frozen historical snapshots."],
    [checks.runtimeGateStillBlocked, "RUNTIME_GATE_UNEXPECTEDLY_OPEN", "runtime-boundary", "v386 must keep runtime live-read gate blocked."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v386 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v386 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ServiceIntakeMessage[] {
  return [
    {
      code: "OPERATOR_SERVICE_LIFECYCLE_INTAKE_IS_NOT_RUNTIME_GATE",
      severity: "warning",
      source: "node-v386",
      message: "v386 archives operator service lifecycle evidence only; it does not run Java, mini-kv, or runtime probes.",
    },
    {
      code: "MINI_KV_V151_TEMPLATE_NOT_OPERATOR_APPROVAL",
      severity: "warning",
      source: "mini-kv-v151",
      message: "mini-kv v151 requires operator evidence but declares no owner, port, smoke target, or cleanup responsibility yet.",
    },
  ];
}

function collectRecommendations(ready: boolean): ServiceIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V386_BEFORE_ANY_RUNTIME_GATE" : "REPAIR_OPERATOR_LIFECYCLE_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v386",
    message: ready
      ? "Archive and verify v386 before considering any separate runtime live-read gate."
      : "Repair missing frozen operator lifecycle evidence before rerunning v386.",
  }];
}
