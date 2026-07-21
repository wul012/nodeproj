import type { AppConfig } from "../../../config.js";
import { isSha256, numberValue, readProjectJson, stringValue, valueAt } from "../../../evidence/projectJson.js";
import { readJsonObject } from "../../historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "../../liveProbeReportUtils.js";
import { completeChecks } from "../checkAssembly.js";
import { createDeclaredChecks } from "./intakeChecks.js";
import { createDeclaredProfile } from "./profile.js";
import {
  createDeclaredFile,
  createJavaDeclaredLifecycle,
  createMiniKvDeclaredLifecycle,
  createFrozenOperatorTemplate,
} from "./sources.js";
import type {
  DeclaredEvidenceFile,
  DeclaredIntakeChecks,
  DeclaredIntakeMessage,
  DeclaredIntakeRecord,
  DeclaredIntakeSummary,
  JavaDeclaredLifecycle,
  DeclaredIntakeProfile,
  MiniKvDeclaredLifecycle,
  FrozenOperatorTemplate,
  SourceV387Archive,
} from "./intakeTypes.js";

export {
  renderDeclaredIntakeMarkdown,
} from "./intakeRenderer.js";

const SOURCE_NODE_V387_ARCHIVE =
  "e/387/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387-http.json";
const JAVA_V161_DECLARED_OPERATOR_LIFECYCLE =
  "D:/javaproj/advanced-order-platform/e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json";
const JAVA_V161_DECLARED_OPERATOR_LIFECYCLE_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json";
const MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v152.json";
const MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v152.json";
const MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v151.json";
const MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json";

interface ParsedDeclaredOperatorLifecycleEvidence {
  sourceNodeV387Json: Record<string, unknown> | null;
  javaDeclaredOperatorLifecycleJson: Record<string, unknown> | null;
  miniKvDeclaredOperatorLifecycleJson: Record<string, unknown> | null;
  miniKvFrozenOperatorTemplateJson: Record<string, unknown> | null;
}

export function loadDeclaredIntake(
  input: { config: AppConfig; archiveRoot?: string },
): DeclaredIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaDeclaredOperatorLifecycleFile = createDeclaredFile(
    "java-v161-declared-operator-lifecycle",
    JAVA_V161_DECLARED_OPERATOR_LIFECYCLE,
    JAVA_V161_DECLARED_OPERATOR_LIFECYCLE_FALLBACK,
  );
  const miniKvDeclaredOperatorLifecycleFile = createDeclaredFile(
    "mini-kv-v152-declared-operator-lifecycle",
    MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE,
    MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE_FALLBACK,
  );
  const miniKvFrozenOperatorTemplateFile = createDeclaredFile(
    "mini-kv-v151-frozen-operator-template",
    MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE,
    MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE_FALLBACK,
  );
  const parsed: ParsedDeclaredOperatorLifecycleEvidence = {
    sourceNodeV387Json: readProjectJson(projectRoot, SOURCE_NODE_V387_ARCHIVE),
    javaDeclaredOperatorLifecycleJson: readJsonObject(JAVA_V161_DECLARED_OPERATOR_LIFECYCLE),
    miniKvDeclaredOperatorLifecycleJson: readJsonObject(MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE),
    miniKvFrozenOperatorTemplateJson: readJsonObject(MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE),
  };
  const sourceNodeV387 = createSourceNodeV387(parsed.sourceNodeV387Json);
  const javaDeclaredOperatorLifecycle = createJavaDeclaredLifecycle(parsed.javaDeclaredOperatorLifecycleJson);
  const miniKvDeclaredOperatorLifecycle = createMiniKvDeclaredLifecycle(
    parsed.miniKvDeclaredOperatorLifecycleJson,
  );
  const miniKvFrozenOperatorTemplate = createFrozenOperatorTemplate(parsed.miniKvFrozenOperatorTemplateJson);
  const draftIntake = createIntake(
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    false,
  );
  const completed = completeChecks(createDeclaredChecks({
    source: sourceNodeV387,
    javaFile: javaDeclaredOperatorLifecycleFile,
    miniKvFile: miniKvDeclaredOperatorLifecycleFile,
    frozenFile: miniKvFrozenOperatorTemplateFile,
    java: javaDeclaredOperatorLifecycle,
    miniKv: miniKvDeclaredOperatorLifecycle,
    frozen: miniKvFrozenOperatorTemplate,
    intake: draftIntake,
  }), "readyForDeclaredOperatorLifecycleEvidenceIntake");
  const { checks, ready } = completed;
  const intake = createIntake(
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    ready,
  );
  checks.intakeDigestStable = isSha256(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaDeclaredOperatorLifecycle, miniKvDeclaredOperatorLifecycle, checks,
    productionBlockers, warnings, recommendations);

  return createDeclaredProfile({
    source: sourceNodeV387,
    javaFile: javaDeclaredOperatorLifecycleFile,
    miniKvFile: miniKvDeclaredOperatorLifecycleFile,
    frozenFile: miniKvFrozenOperatorTemplateFile,
    java: javaDeclaredOperatorLifecycle,
    miniKv: miniKvDeclaredOperatorLifecycle,
    frozen: miniKvFrozenOperatorTemplate,
    intake,
    checks,
    summary,
    blockers: productionBlockers,
    warnings,
    recommendations,
    ready,
  });
}

function createSourceNodeV387(json: Record<string, unknown> | null): SourceV387Archive {
  return {
    sourceVersion: "Node v387",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification:
      valueAt(json, "readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification") === true,
    readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate:
      valueAt(json, "readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate") === true,
    readyForRuntimeLiveReadGate: valueAt(json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v387",
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    archiveVerificationDigest: stringValue(valueAt(json, "archiveVerification", "archiveVerificationDigest")),
    sourceCheckCount: numberValue(valueAt(json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(json, "summary", "replayPassedCheckCount")),
    declaredMiniKvOperatorEvidenceCount:
      numberValue(valueAt(json, "summary", "declaredMiniKvOperatorEvidenceCount")),
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
  source: SourceV387Archive,
  javaFile: DeclaredEvidenceFile,
  miniKvFile: DeclaredEvidenceFile,
  miniKvFrozenFile: DeclaredEvidenceFile,
  java: JavaDeclaredLifecycle,
  miniKv: MiniKvDeclaredLifecycle,
  ready: boolean,
): DeclaredIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-declared-operator-lifecycle-evidence-intake" as const,
    sourceSpan: "Node v387 + Java v161 + mini-kv v152" as const,
    sourceNodeV387Digest: source.archiveVerificationDigest,
    javaV161Digest: javaFile.digest,
    miniKvV152Digest: miniKvFile.digest,
    miniKvV151Digest: miniKvFrozenFile.digest,
    usesFrozenJavaV161DeclaredLifecycleEvidence: javaFile.usedHistoricalFallback,
    usesFrozenMiniKvV152DeclaredLifecycleEvidence: miniKvFile.usedHistoricalFallback,
    verifiesMiniKvV151OperatorTemplateFreeze: miniKvFrozenFile.usedHistoricalFallback,
    javaDeclaredOperatorLifecyclePresent: java.operatorLifecycleDeclared && java.status === "passed",
    miniKvDeclaredOperatorLifecyclePresent: miniKv.operatorOwnedServiceLifecycleDeclared,
    miniKvRuntimeGateApproved: false as const,
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
    nextNodeVersionSuggested: "Node v389",
  };
}

function createSummary(
  java: JavaDeclaredLifecycle,
  miniKv: MiniKvDeclaredLifecycle,
  checks: DeclaredIntakeChecks,
  productionBlockers: readonly DeclaredIntakeMessage[],
  warnings: readonly DeclaredIntakeMessage[],
  recommendations: readonly DeclaredIntakeMessage[],
): DeclaredIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [
      java.status === "passed" && checks.javaV161DeclaredLifecycleComplete,
      miniKv.status === "declared-operator-lifecycle-no-runtime-read-only"
        && checks.miniKvV152DeclaredLifecycleComplete,
      checks.miniKvV151FrozenTemplateSafe,
    ].filter(Boolean).length,
    javaSmokeTargetCount: java.getOnlySmokeTargets.length,
    javaDeclaredPortCount: java.declaredPorts.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    miniKvDeclaredPortHandleCount: miniKv.declaredPortHandles.length,
    miniKvRequiredBeforeRuntimeGateCount: miniKv.requiredBeforeRuntimeGate.length,
    declaredOperatorEvidenceSourceCount: [
      checks.javaV161DeclaredLifecycleComplete,
      checks.miniKvV152DeclaredLifecycleComplete,
    ].filter(Boolean).length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DeclaredIntakeChecks,
): DeclaredIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV387Ready, "SOURCE_NODE_V387_NOT_READY", "node-v387", "Node v387 must be ready for v388 intake."],
    [checks.sourceNodeV387ArchiveVerified, "SOURCE_NODE_V387_ARCHIVE_NOT_VERIFIED", "node-v387", "Node v387 archive verification must be complete."],
    [checks.javaV161DeclaredLifecycleComplete, "JAVA_V161_DECLARED_LIFECYCLE_INCOMPLETE", "java-v161", "Java v161 declared lifecycle evidence must be complete."],
    [checks.javaV161NodeLifecycleBlocked, "JAVA_V161_NODE_LIFECYCLE_ALLOWED", "java-v161", "v388 must not allow Node to start or stop Java."],
    [checks.miniKvV152DeclaredLifecycleComplete, "MINI_KV_V152_DECLARED_LIFECYCLE_INCOMPLETE", "mini-kv-v152", "mini-kv v152 declared lifecycle evidence must be complete."],
    [checks.miniKvV152RuntimeGateStillBlocked, "MINI_KV_V152_RUNTIME_GATE_OPENED", "mini-kv-v152", "mini-kv v152 must still require a separate runtime gate."],
    [checks.miniKvV151FrozenTemplateSafe, "MINI_KV_V151_FROZEN_TEMPLATE_INVALID", "mini-kv-v151", "mini-kv v151 frozen template must remain read-only and runtime-free."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v388 inputs must resolve to frozen historical snapshots."],
    [checks.runtimeGateStillBlocked, "RUNTIME_GATE_UNEXPECTEDLY_OPEN", "runtime-boundary", "v388 must keep runtime live-read gate blocked."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v388 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v388 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): DeclaredIntakeMessage[] {
  return [{
    code: "DECLARED_LIFECYCLE_INTAKE_IS_NOT_RUNTIME_GATE",
    severity: "warning",
    source: "node-v388",
    message: "v388 consumes declared lifecycle evidence only; it does not run Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): DeclaredIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V388_BEFORE_RUNTIME_GATE_PLAN" : "REPAIR_DECLARED_LIFECYCLE_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v388",
    message: ready
      ? "Archive and verify v388 before writing any separate runtime live-read gate plan."
      : "Repair missing frozen declared lifecycle evidence before rerunning v388.",
  }];
}
