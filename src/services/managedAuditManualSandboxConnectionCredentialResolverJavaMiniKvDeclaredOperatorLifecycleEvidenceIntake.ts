import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createDeclaredOperatorLifecycleEvidenceFileReference,
  createJavaDeclaredOperatorLifecycle,
  createMiniKvDeclaredOperatorLifecycle,
  createMiniKvFrozenOperatorTemplate,
  readHistoricalJson,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeEvidence.js";
import type {
  DeclaredOperatorLifecycleEvidenceFileReference,
  DeclaredOperatorLifecycleEvidenceIntakeChecks,
  DeclaredOperatorLifecycleEvidenceIntakeMessage,
  DeclaredOperatorLifecycleEvidenceIntakeRecord,
  DeclaredOperatorLifecycleEvidenceIntakeSummary,
  JavaDeclaredOperatorLifecycleReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeProfile,
  MiniKvDeclaredOperatorLifecycleReference,
  MiniKvFrozenOperatorTemplateReference,
  SourceNodeV387ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeRenderer.js";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaDeclaredOperatorLifecycleFile = createDeclaredOperatorLifecycleEvidenceFileReference(
    "java-v161-declared-operator-lifecycle",
    JAVA_V161_DECLARED_OPERATOR_LIFECYCLE,
    JAVA_V161_DECLARED_OPERATOR_LIFECYCLE_FALLBACK,
  );
  const miniKvDeclaredOperatorLifecycleFile = createDeclaredOperatorLifecycleEvidenceFileReference(
    "mini-kv-v152-declared-operator-lifecycle",
    MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE,
    MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE_FALLBACK,
  );
  const miniKvFrozenOperatorTemplateFile = createDeclaredOperatorLifecycleEvidenceFileReference(
    "mini-kv-v151-frozen-operator-template",
    MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE,
    MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE_FALLBACK,
  );
  const parsed: ParsedDeclaredOperatorLifecycleEvidence = {
    sourceNodeV387Json: readProjectJson(projectRoot, SOURCE_NODE_V387_ARCHIVE),
    javaDeclaredOperatorLifecycleJson: readHistoricalJson(JAVA_V161_DECLARED_OPERATOR_LIFECYCLE),
    miniKvDeclaredOperatorLifecycleJson: readHistoricalJson(MINI_KV_V152_DECLARED_OPERATOR_LIFECYCLE),
    miniKvFrozenOperatorTemplateJson: readHistoricalJson(MINI_KV_V151_FROZEN_OPERATOR_TEMPLATE),
  };
  const sourceNodeV387 = createSourceNodeV387(parsed.sourceNodeV387Json);
  const javaDeclaredOperatorLifecycle = createJavaDeclaredOperatorLifecycle(parsed.javaDeclaredOperatorLifecycleJson);
  const miniKvDeclaredOperatorLifecycle = createMiniKvDeclaredOperatorLifecycle(
    parsed.miniKvDeclaredOperatorLifecycleJson,
  );
  const miniKvFrozenOperatorTemplate = createMiniKvFrozenOperatorTemplate(parsed.miniKvFrozenOperatorTemplateJson);
  const draftIntake = createIntake(
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    false,
  );
  const checks = createChecks(
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    miniKvFrozenOperatorTemplate,
    draftIntake,
  );
  checks.readyForDeclaredOperatorLifecycleEvidenceIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleEvidenceIntake")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleEvidenceIntake;
  const intake = createIntake(
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    ready,
  );
  checks.intakeDigestStable = isDigest(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaDeclaredOperatorLifecycle, miniKvDeclaredOperatorLifecycle, checks,
    productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-declared-operator-lifecycle-evidence-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v161-and-mini-kv-v152-declared-operator-lifecycle-evidence" : "blocked",
    readyForDeclaredOperatorLifecycleEvidenceIntake: ready,
    readyForNodeV389ArchiveVerification: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v388",
    sourceNodeVersion: "Node v387",
    evidenceIntakeOnly: true,
    declaredOperatorLifecycleEvidencePresent:
      intake.javaDeclaredOperatorLifecyclePresent && intake.miniKvDeclaredOperatorLifecyclePresent,
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
    sourceNodeV387,
    javaDeclaredOperatorLifecycleFile,
    miniKvDeclaredOperatorLifecycleFile,
    miniKvFrozenOperatorTemplateFile,
    javaDeclaredOperatorLifecycle,
    miniKvDeclaredOperatorLifecycle,
    miniKvFrozenOperatorTemplate,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      declaredOperatorLifecycleEvidenceIntakeJson: ROUTE_PATH,
      declaredOperatorLifecycleEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV387Json: SOURCE_NODE_V387_ROUTE,
      sourceNodeV387Markdown: `${SOURCE_NODE_V387_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v389",
    },
    nextActions: ready
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

function createSourceNodeV387(json: Record<string, unknown> | null): SourceNodeV387ArchiveVerificationReference {
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
  source: SourceNodeV387ArchiveVerificationReference,
  javaFile: DeclaredOperatorLifecycleEvidenceFileReference,
  miniKvFile: DeclaredOperatorLifecycleEvidenceFileReference,
  miniKvFrozenFile: DeclaredOperatorLifecycleEvidenceFileReference,
  java: JavaDeclaredOperatorLifecycleReference,
  miniKv: MiniKvDeclaredOperatorLifecycleReference,
  ready: boolean,
): DeclaredOperatorLifecycleEvidenceIntakeRecord {
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

function createChecks(
  source: SourceNodeV387ArchiveVerificationReference,
  javaFile: DeclaredOperatorLifecycleEvidenceFileReference,
  miniKvFile: DeclaredOperatorLifecycleEvidenceFileReference,
  miniKvFrozenFile: DeclaredOperatorLifecycleEvidenceFileReference,
  java: JavaDeclaredOperatorLifecycleReference,
  miniKv: MiniKvDeclaredOperatorLifecycleReference,
  miniKvFrozen: MiniKvFrozenOperatorTemplateReference,
  intake: DeclaredOperatorLifecycleEvidenceIntakeRecord,
): DeclaredOperatorLifecycleEvidenceIntakeChecks {
  return {
    sourceNodeV387Ready:
      source.readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification
      && source.readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate
      && !source.readyForRuntimeLiveReadGate,
    sourceNodeV387ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
    sourceNodeV387ChecksAllPassed:
      source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    sourceNodeV387BoundariesClosed:
      source.archiveVerificationOnly && !source.rerunsLiveRead && !source.startsJavaService && !source.startsMiniKvService
      && !source.stopsJavaService && !source.stopsMiniKvService && !source.connectsManagedAudit
      && !source.executionAllowed && !source.activeShardPrototypeEnabled,
    javaV161FilePresent: javaFile.exists,
    javaV161VersionValid: java.version === "Java v161",
    javaV161ReadOnly: java.readOnly,
    javaV161ExecutionBlocked: !java.executionAllowed,
    javaV161DeclaredLifecycleComplete:
      java.operatorOwned && java.operatorLifecycleDeclared && java.startupCommandDeclared && java.portDeclared
      && java.getOnlySmokeDeclared && java.cleanupDeclared && java.failClosedDeclared && !java.runtimeProbeAllowed,
    javaV161NodeLifecycleBlocked: !java.nodeMayStartService && !java.nodeMayStopService,
    javaV161ReferencesV160AndNodeV387:
      java.sourceLifecycleEvidenceVersion === "Java v160"
      && java.lastVerifiedByNodeVersion === "Node v387"
      && java.nextNodeConsumerHint === "Node v388",
    javaV161OwnerPortAndStartupPresent:
      java.javaServiceOwner === "java-platform-operator"
      && java.javaStartOwner === "java-platform-operator"
      && java.javaStopOwner === "java-platform-operator"
      && java.declaredWorkingDirectory === "advanced-order-platform"
      && java.declaredStartupCommand !== null
      && java.declaredPorts.includes("8080")
      && java.javaBaseUrlHandle === "java-local-readonly-base-url",
    javaV161SmokeTargetsReadOnlyGet:
      java.getOnlySmokeTargets.length >= 4
      && java.getOnlySmokeTargets.every((target) => target.startsWith("GET "))
      && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/declared-operator-lifecycle"),
    javaV161FailClosedRulesComplete:
      includesAll(java.failClosedRules, [
        "missing-java-service-owner-blocks-runtime-gate",
        "missing-java-start-command-blocks-runtime-gate",
        "missing-java-port-blocks-runtime-gate",
        "missing-java-cleanup-owner-blocks-runtime-gate",
        "non-get-smoke-target-blocks-runtime-gate",
        "failed-java-smoke-blocks-node-consumption",
      ]),
    javaV161CleanupResponsibilitiesSafe:
      java.cleanupResponsibilities.includes("node-must-not-stop-java-from-declared-evidence")
      && java.cleanupResponsibilities.includes("node-may-clean-only-processes-started-by-separate-approved-runtime-gate"),
    javaV161RuntimeGatePrerequisitesComplete:
      includesAll(java.runtimeGatePrerequisites, [
        "mini-kv-declared-operator-lifecycle-evidence",
        "separate-approved-runtime-live-read-gate",
        "operator-confirms-java-service-running-and-port",
      ]),
    javaV161StopConditionsSafe:
      includesAll(java.stopConditions, [
        "request-would-start-java-from-this-evidence",
        "request-would-stop-java-from-this-evidence",
        "request-would-run-runtime-probe-before-mini-kv-declared-lifecycle",
        "request-would-enable-active-shard-router-or-write-routing",
      ]),
    javaV161StatusPassed: java.status === "passed",
    miniKvV152FilePresent: miniKvFile.exists,
    miniKvV152ReleaseVersionValid: miniKv.releaseVersion === "v152",
    miniKvV152ReadOnly: miniKv.readOnly,
    miniKvV152ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV152ShardDisabled: !miniKv.shardEnabled,
    miniKvV152StatusAccepted: miniKv.status === "declared-operator-lifecycle-no-runtime-read-only",
    miniKvV152BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.setnxexExecutionAllowed && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
      && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated,
    miniKvV152HistoricalFallbackSafe:
      miniKv.previousConsumedReleaseVersion === "v151"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v151.json"
      && miniKv.previousConsumptionNodeVersion === "Node v388 pending separate runtime gate approval"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && miniKv.nodeV387ArchiveVerificationPreserved
      && !miniKv.nodeV388ReadsUnfinishedUpstream,
    miniKvV152PreservesNodeV387Archive:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v387"),
    miniKvV152OperatorTemplateFreezeSafe:
      miniKv.operatorTemplateFreezeFrozenReleaseVersion === "v151"
      && miniKv.operatorTemplateFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v151.json"
      && miniKv.operatorTemplateFreezePreservesTemplate
      && !miniKv.frozenRuntimeProbeAllowed
      && !miniKv.frozenExecutionAllowed,
    miniKvV152DeclaredLifecycleComplete:
      miniKv.operatorEvidenceMode === "declared-lifecycle-no-runtime"
      && miniKv.operatorSourceFrozenReleaseVersion === "v151"
      && miniKv.operatorSourceFrozenFixturePath === "fixtures/release/shard-readiness-v151.json"
      && miniKv.operatorOwnedServiceLifecycleDeclared
      && miniKv.serviceOwnerDeclared
      && miniKv.startupCommandDeclared
      && miniKv.portListDeclared
      && miniKv.getOnlySmokeTargetDeclared
      && miniKv.failClosedBehaviorDeclared
      && miniKv.cleanupResponsibilityDeclared,
    miniKvV152RuntimeGateStillBlocked:
      !miniKv.runtimeGateApproved && !miniKv.startsServices && !miniKv.runtimeProbeAllowed && !miniKv.liveReadAllowed
      && !miniKv.activeShardPrototypeEnabled && !miniKv.routerActivationAllowed && !miniKv.writeRoutingAllowed
      && !miniKv.operatorExecutionAllowed,
    miniKvV152RequiresSeparateRuntimeGate:
      miniKv.requiresSeparateRuntimeGate
      && includesAll(miniKv.requiredBeforeRuntimeGate, [
        "operator approval record",
        "concrete loopback port assignment",
        "GET-only smoke command",
        "cleanup proof",
      ]),
    miniKvV152NoRollingCurrentBaseline:
      miniKvFile.configuredPath.endsWith("shard-readiness-v152.json")
      && !miniKv.rollingCurrentUsedForHistoricalBaseline,
    miniKvV151FrozenTemplatePresent: miniKvFrozenFile.exists,
    miniKvV151FrozenTemplateSafe:
      miniKvFrozen.project === "mini-kv"
      && miniKvFrozen.releaseVersion === "v151"
      && miniKvFrozen.readOnly
      && !miniKvFrozen.executionAllowed
      && !miniKvFrozen.shardEnabled
      && miniKvFrozen.status === "operator-service-lifecycle-template-read-only"
      && miniKvFrozen.operatorEvidenceMode === "template-only-no-runtime"
      && miniKvFrozen.operatorOwnedServiceLifecycleRequired
      && !miniKvFrozen.serviceOwnerDeclared
      && !miniKvFrozen.runtimeProbeAllowed
      && !miniKvFrozen.executionAllowedByOperatorTemplate,
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaFile.usedHistoricalFallback && miniKvFile.usedHistoricalFallback && miniKvFrozenFile.usedHistoricalFallback,
    runtimeGateStillBlocked:
      intake.runtimeGateStillBlocked
      && !intake.runtimeProbeAllowed
      && !intake.liveReadGateAllowed
      && !java.runtimeProbeAllowed
      && !miniKv.runtimeGateApproved
      && !miniKv.runtimeProbeAllowed,
    intakeDigestStable: isDigest(intake.intakeDigest),
    noAutomaticUpstreamStartStop: !intake.startsUpstreamServices && !intake.stopsUpstreamServices,
    noUpstreamMutation: !intake.writesUpstreamState,
    noManagedAuditConnection: !intake.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForDeclaredOperatorLifecycleEvidenceIntake: false,
  };
}

function createSummary(
  java: JavaDeclaredOperatorLifecycleReference,
  miniKv: MiniKvDeclaredOperatorLifecycleReference,
  checks: DeclaredOperatorLifecycleEvidenceIntakeChecks,
  productionBlockers: readonly DeclaredOperatorLifecycleEvidenceIntakeMessage[],
  warnings: readonly DeclaredOperatorLifecycleEvidenceIntakeMessage[],
  recommendations: readonly DeclaredOperatorLifecycleEvidenceIntakeMessage[],
): DeclaredOperatorLifecycleEvidenceIntakeSummary {
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
  checks: DeclaredOperatorLifecycleEvidenceIntakeChecks,
): DeclaredOperatorLifecycleEvidenceIntakeMessage[] {
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

function collectWarnings(): DeclaredOperatorLifecycleEvidenceIntakeMessage[] {
  return [{
    code: "DECLARED_LIFECYCLE_INTAKE_IS_NOT_RUNTIME_GATE",
    severity: "warning",
    source: "node-v388",
    message: "v388 consumes declared lifecycle evidence only; it does not run Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): DeclaredOperatorLifecycleEvidenceIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V388_BEFORE_RUNTIME_GATE_PLAN" : "REPAIR_DECLARED_LIFECYCLE_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v388",
    message: ready
      ? "Archive and verify v388 before writing any separate runtime live-read gate plan."
      : "Repair missing frozen declared lifecycle evidence before rerunning v388.",
  }];
}

function readProjectJson(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return null;
  }
  try {
    return JSON.parse(stripBom(readFileSync(absolutePath, "utf8"))) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function includesAll(values: readonly string[], required: readonly string[]): boolean {
  return required.every((value) => values.includes(value));
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function stripBom(content: string): string {
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}
