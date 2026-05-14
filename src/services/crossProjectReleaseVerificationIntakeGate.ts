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
  loadControlledIdempotencyDrillRunbook,
} from "./controlledIdempotencyDrillRunbook.js";
import type {
  ControlledIdempotencyDrillRunbookProfile,
} from "./controlledIdempotencyDrillRunbook.js";

export interface CrossProjectReleaseVerificationIntakeGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "cross-project-release-verification-intake-gate.v1";
  gateState: "ready-for-release-verification-intake" | "blocked";
  readyForCrossProjectReleaseVerificationIntakeGate: boolean;
  readyForProductionRelease: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  gate: {
    gateDigest: string;
    previousRunbookDigest: string;
    previousRunbookVersion: ControlledIdempotencyDrillRunbookProfile["profileVersion"];
    javaVersion: JavaReleaseVerificationManifestReference["plannedVersion"];
    javaManifestVersion: JavaReleaseVerificationManifestReference["manifestVersion"];
    miniKvVersion: MiniKvReleaseVerificationManifestReference["plannedVersion"];
    miniKvManifestVersion: MiniKvReleaseVerificationManifestReference["manifestVersion"];
    nodeBaselineTag: "v161";
    intakeMode: "archived-evidence-only";
    nodeMayExecuteJavaMaven: false;
    nodeMayExecuteMiniKvCmake: false;
    nodeMayTriggerJavaWrites: false;
    nodeMayExecuteMiniKvWrites: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionReleaseAuthorized: false;
  };
  checks: {
    previousRunbookReady: boolean;
    previousRunbookDoesNotAuthorizeExecution: boolean;
    javaV54EvidenceReady: boolean;
    javaManifestVersionReady: boolean;
    javaReleaseChecksComplete: boolean;
    javaStaticContractsListed: boolean;
    javaArchiveRootUsesC: boolean;
    javaNodeCannotExecuteMaven: boolean;
    javaNodeCannotTriggerWrites: boolean;
    javaBusinessSemanticsUnchanged: boolean;
    javaDoesNotConnectMiniKv: boolean;
    miniKvV63EvidenceReady: boolean;
    miniKvManifestVersionReady: boolean;
    miniKvReleaseChecksComplete: boolean;
    miniKvFixtureInventoryReady: boolean;
    miniKvReadOnlySmokeReady: boolean;
    miniKvNoRuntimeCommandAdded: boolean;
    miniKvWriteCommandsNotExecuted: boolean;
    miniKvOrderAuthoritativeFalse: boolean;
    miniKvArchiveRootUsesC: boolean;
    nodeConsumesArchivedEvidenceOnly: boolean;
    nodeDoesNotExecuteUpstreamBuilds: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionReleaseStillFalse: boolean;
    readyForCrossProjectReleaseVerificationIntakeGate: boolean;
  };
  artifacts: {
    previousRunbook: {
      profileVersion: ControlledIdempotencyDrillRunbookProfile["profileVersion"];
      runbookDigest: string;
      runbookState: ControlledIdempotencyDrillRunbookProfile["runbookState"];
      readyForControlledIdempotencyDrillRunbook: boolean;
      readyForProductionOperations: false;
    };
    javaReleaseManifest: JavaReleaseVerificationManifestReference;
    miniKvReleaseManifest: MiniKvReleaseVerificationManifestReference;
    nodeIntakeEnvelope: {
      archivedEvidenceOnly: true;
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionReleaseAuthorized: false;
    };
  };
  intakeSteps: CrossProjectReleaseVerificationIntakeStep[];
  forbiddenOperations: CrossProjectReleaseVerificationForbiddenOperation[];
  summary: {
    gateCheckCount: number;
    passedGateCheckCount: number;
    manifestCount: number;
    intakeStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CrossProjectReleaseVerificationIntakeGateMessage[];
  warnings: CrossProjectReleaseVerificationIntakeGateMessage[];
  recommendations: CrossProjectReleaseVerificationIntakeGateMessage[];
  evidenceEndpoints: {
    crossProjectReleaseVerificationIntakeGateJson: string;
    crossProjectReleaseVerificationIntakeGateMarkdown: string;
    controlledIdempotencyDrillRunbookJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaReleaseVerificationManifestReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v54";
  evidenceTag: "java-v54-release-verification-manifest";
  manifestVersion: "java-release-verification-manifest.v1";
  scenario: "JAVA_RELEASE_VERIFICATION_MANIFEST_SAMPLE";
  manifestEndpoint: "/contracts/release-verification-manifest.sample.json";
  manifestSource: "src/main/resources/static/contracts/release-verification-manifest.sample.json";
  archivePath: "c/54";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/58-version-54-release-verification-manifest.md";
  requiredChecks: [
    "focused-maven-tests",
    "non-docker-regression-tests",
    "maven-package",
    "http-smoke",
    "static-contract-json-validation",
  ];
  staticContractCount: 5;
  focusedTestCount: 33;
  nonDockerRegressionTestCount: 75;
  buildTool: "Maven";
  nodeMayExecuteBuild: false;
  nodeMayTriggerWrites: false;
  changesBusinessSemantics: false;
  connectsMiniKv: false;
  requiresProductionSecrets: false;
  runtimeArchiveRoot: "c/<version>";
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvReleaseVerificationManifestReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v63";
  evidenceTag: "mini-kv-v63-release-verification-manifest";
  manifestVersion: "mini-kv-release-verification-manifest.v1";
  manifestPath: "fixtures/release/verification-manifest.json";
  archivePath: "c/63";
  screenshotCount: 8;
  walkthroughPath: "代码讲解记录_生产雏形阶段/119-version-63-release-verification-manifest.md";
  requiredChecks: [
    "cmake-configure",
    "cmake-build",
    "ctest",
    "targeted-tests",
    "read-only-command-smoke",
    "fixture-inventory",
    "version-manifest",
  ];
  targetedTestCount: 5;
  fixtureCount: 11;
  readOnlySmokeCommandCount: 6;
  buildTool: "CMake";
  projectVersion: "0.63.0";
  noRuntimeCommandAdded: true;
  writeCommandsExecuted: false;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  doesNotRunJavaOrNode: true;
  doesNotOpenUpstreamActions: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface CrossProjectReleaseVerificationIntakeStep {
  order: number;
  phase: "collect" | "verify" | "gate" | "closeout";
  source: "node" | "java" | "mini-kv";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  executesExternalBuild: false;
  mutatesState: false;
}

interface CrossProjectReleaseVerificationForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v162 intake gate"
    | "Java v54 release manifest"
    | "mini-kv v63 release manifest"
    | "runtime safety";
}

interface CrossProjectReleaseVerificationIntakeGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "cross-project-release-verification-intake-gate"
    | "controlled-idempotency-drill-runbook"
    | "java-v54-release-verification-manifest"
    | "mini-kv-v63-release-verification-manifest"
    | "runtime-config";
  message: string;
}

const JAVA_V54_RELEASE_MANIFEST: JavaReleaseVerificationManifestReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v54",
  evidenceTag: "java-v54-release-verification-manifest",
  manifestVersion: "java-release-verification-manifest.v1",
  scenario: "JAVA_RELEASE_VERIFICATION_MANIFEST_SAMPLE",
  manifestEndpoint: "/contracts/release-verification-manifest.sample.json",
  manifestSource: "src/main/resources/static/contracts/release-verification-manifest.sample.json",
  archivePath: "c/54",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/58-version-54-release-verification-manifest.md",
  requiredChecks: [
    "focused-maven-tests",
    "non-docker-regression-tests",
    "maven-package",
    "http-smoke",
    "static-contract-json-validation",
  ] as JavaReleaseVerificationManifestReference["requiredChecks"],
  staticContractCount: 5,
  focusedTestCount: 33,
  nonDockerRegressionTestCount: 75,
  buildTool: "Maven",
  nodeMayExecuteBuild: false,
  nodeMayTriggerWrites: false,
  changesBusinessSemantics: false,
  connectsMiniKv: false,
  requiresProductionSecrets: false,
  runtimeArchiveRoot: "c/<version>",
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V63_RELEASE_MANIFEST: MiniKvReleaseVerificationManifestReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v63",
  evidenceTag: "mini-kv-v63-release-verification-manifest",
  manifestVersion: "mini-kv-release-verification-manifest.v1",
  manifestPath: "fixtures/release/verification-manifest.json",
  archivePath: "c/63",
  screenshotCount: 8,
  walkthroughPath: "代码讲解记录_生产雏形阶段/119-version-63-release-verification-manifest.md",
  requiredChecks: [
    "cmake-configure",
    "cmake-build",
    "ctest",
    "targeted-tests",
    "read-only-command-smoke",
    "fixture-inventory",
    "version-manifest",
  ] as MiniKvReleaseVerificationManifestReference["requiredChecks"],
  targetedTestCount: 5,
  fixtureCount: 11,
  readOnlySmokeCommandCount: 6,
  buildTool: "CMake",
  projectVersion: "0.63.0",
  noRuntimeCommandAdded: true,
  writeCommandsExecuted: false,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotOpenUpstreamActions: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  crossProjectReleaseVerificationIntakeGateJson: "/api/v1/production/cross-project-release-verification-intake-gate",
  crossProjectReleaseVerificationIntakeGateMarkdown: "/api/v1/production/cross-project-release-verification-intake-gate?format=markdown",
  controlledIdempotencyDrillRunbookJson: "/api/v1/production/controlled-idempotency-drill-runbook",
  currentRoadmap: "docs/plans/v161-post-controlled-idempotency-drill-roadmap.md",
});

export function loadCrossProjectReleaseVerificationIntakeGate(
  config: AppConfig,
): CrossProjectReleaseVerificationIntakeGateProfile {
  const previousRunbook = loadControlledIdempotencyDrillRunbook(config);
  const intakeSteps = createIntakeSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousRunbook, intakeSteps, forbiddenOperations);
  checks.readyForCrossProjectReleaseVerificationIntakeGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForCrossProjectReleaseVerificationIntakeGate")
    .every(([, value]) => value);
  const gateState = checks.readyForCrossProjectReleaseVerificationIntakeGate
    ? "ready-for-release-verification-intake"
    : "blocked";
  const gateDigest = digestGate({
    profileVersion: "cross-project-release-verification-intake-gate.v1",
    previousRunbookDigest: previousRunbook.runbook.runbookDigest,
    javaVersion: JAVA_V54_RELEASE_MANIFEST.plannedVersion,
    javaManifestVersion: JAVA_V54_RELEASE_MANIFEST.manifestVersion,
    miniKvVersion: MINI_KV_V63_RELEASE_MANIFEST.plannedVersion,
    miniKvManifestVersion: MINI_KV_V63_RELEASE_MANIFEST.manifestVersion,
    nodeBaselineTag: "v161",
    intakeMode: "archived-evidence-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);

  return {
    service: "orderops-node",
    title: "Cross-project release verification intake gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "cross-project-release-verification-intake-gate.v1",
    gateState,
    readyForCrossProjectReleaseVerificationIntakeGate: checks.readyForCrossProjectReleaseVerificationIntakeGate,
    readyForProductionRelease: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      previousRunbookDigest: previousRunbook.runbook.runbookDigest,
      previousRunbookVersion: previousRunbook.profileVersion,
      javaVersion: JAVA_V54_RELEASE_MANIFEST.plannedVersion,
      javaManifestVersion: JAVA_V54_RELEASE_MANIFEST.manifestVersion,
      miniKvVersion: MINI_KV_V63_RELEASE_MANIFEST.plannedVersion,
      miniKvManifestVersion: MINI_KV_V63_RELEASE_MANIFEST.manifestVersion,
      nodeBaselineTag: "v161",
      intakeMode: "archived-evidence-only",
      nodeMayExecuteJavaMaven: false,
      nodeMayExecuteMiniKvCmake: false,
      nodeMayTriggerJavaWrites: false,
      nodeMayExecuteMiniKvWrites: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionReleaseAuthorized: false,
    },
    checks,
    artifacts: {
      previousRunbook: {
        profileVersion: previousRunbook.profileVersion,
        runbookDigest: previousRunbook.runbook.runbookDigest,
        runbookState: previousRunbook.runbookState,
        readyForControlledIdempotencyDrillRunbook: previousRunbook.readyForControlledIdempotencyDrillRunbook,
        readyForProductionOperations: previousRunbook.readyForProductionOperations,
      },
      javaReleaseManifest: { ...JAVA_V54_RELEASE_MANIFEST },
      miniKvReleaseManifest: { ...MINI_KV_V63_RELEASE_MANIFEST },
      nodeIntakeEnvelope: {
        archivedEvidenceOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionReleaseAuthorized: false,
      },
    },
    intakeSteps,
    forbiddenOperations,
    summary: {
      gateCheckCount: countReportChecks(checks),
      passedGateCheckCount: countPassedReportChecks(checks),
      manifestCount: 2,
      intakeStepCount: intakeSteps.length,
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
      "Proceed to the recommended parallel Java v55 plus mini-kv v64 rollback evidence stage after this intake gate remains clean.",
      "Keep Node v162 as an intake gate; do not make it execute Maven, CMake, Java writes, or mini-kv writes.",
      "Build Node v163 only after Java v55 and mini-kv v64 are both complete.",
    ],
  };
}

export function renderCrossProjectReleaseVerificationIntakeGateMarkdown(
  profile: CrossProjectReleaseVerificationIntakeGateProfile,
): string {
  return [
    "# Cross-project release verification intake gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Gate state: ${profile.gateState}`,
    `- Ready for cross-project release verification intake gate: ${profile.readyForCrossProjectReleaseVerificationIntakeGate}`,
    `- Ready for production release: ${profile.readyForProductionRelease}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Gate",
    "",
    ...renderEntries(profile.gate),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Previous Runbook",
    "",
    ...renderEntries(profile.artifacts.previousRunbook),
    "",
    "### Java Release Manifest",
    "",
    ...renderEntries(profile.artifacts.javaReleaseManifest),
    "",
    "### mini-kv Release Manifest",
    "",
    ...renderEntries(profile.artifacts.miniKvReleaseManifest),
    "",
    "### Node Intake Envelope",
    "",
    ...renderEntries(profile.artifacts.nodeIntakeEnvelope),
    "",
    "## Intake Steps",
    "",
    ...profile.intakeSteps.flatMap(renderStep),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No cross-project release verification intake gate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No cross-project release verification intake gate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No cross-project release verification intake gate recommendations."),
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

function createIntakeSteps(): CrossProjectReleaseVerificationIntakeStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "java",
      action: "Collect Java v54 release verification manifest and c/54 archive evidence.",
      evidenceTarget: "Java v54 tag, static manifest sample, and c/54 runtime archive",
      expectedEvidence: "manifestVersion=java-release-verification-manifest.v1 with five release verification checks.",
      readOnly: true,
      executesExternalBuild: false,
      mutatesState: false,
    },
    {
      order: 2,
      phase: "collect",
      source: "mini-kv",
      action: "Collect mini-kv v63 release verification manifest and c/63 archive evidence.",
      evidenceTarget: "mini-kv v63 tag, fixtures/release/verification-manifest.json, and c/63 runtime archive",
      expectedEvidence: "manifest_version=mini-kv-release-verification-manifest.v1 with read-only smoke and no runtime command additions.",
      readOnly: true,
      executesExternalBuild: false,
      mutatesState: false,
    },
    {
      order: 3,
      phase: "verify",
      source: "node",
      action: "Verify both manifests declare archived-evidence-only consumption boundaries.",
      evidenceTarget: "Node v162 gate checks",
      expectedEvidence: "nodeMayExecuteJavaMaven=false, nodeMayExecuteMiniKvCmake=false, and writeCommandsExecuted=false.",
      readOnly: true,
      executesExternalBuild: false,
      mutatesState: false,
    },
    {
      order: 4,
      phase: "gate",
      source: "node",
      action: "Keep production release and production operations closed after intake.",
      evidenceTarget: "readyForProductionRelease=false and readyForProductionOperations=false",
      expectedEvidence: "Release evidence is ready for intake review, not production release authorization.",
      readOnly: true,
      executesExternalBuild: false,
      mutatesState: false,
    },
    {
      order: 5,
      phase: "closeout",
      source: "node",
      action: "Use this gate as the prerequisite for Java v55 and mini-kv v64 rollback evidence.",
      evidenceTarget: "docs/plans/v161-post-controlled-idempotency-drill-roadmap.md",
      expectedEvidence: "Node v163 remains blocked until Java v55 and mini-kv v64 are both complete.",
      readOnly: true,
      executesExternalBuild: false,
      mutatesState: false,
    },
  ];
}

function createForbiddenOperations(): CrossProjectReleaseVerificationForbiddenOperation[] {
  return [
    {
      operation: "Run Maven from Node v162",
      reason: "Java v54 manifest is consumed as archived evidence; Java owns Maven execution.",
      blockedBy: "Node v162 intake gate",
    },
    {
      operation: "Run CMake or CTest from Node v162",
      reason: "mini-kv v63 manifest is consumed as archived evidence; mini-kv owns CMake and CTest execution.",
      blockedBy: "Node v162 intake gate",
    },
    {
      operation: "POST /api/v1/orders",
      reason: "Release verification intake must not trigger Java writes.",
      blockedBy: "Java v54 release manifest",
    },
    {
      operation: "Execute SETNXEX or any mini-kv write smoke",
      reason: "mini-kv v63 only permits read-only release smoke and CHECKJSON write-command inspection.",
      blockedBy: "mini-kv v63 release manifest",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production write actions remain disabled during release verification intake.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this gate as production release approval",
      reason: "v162 is intake evidence only and does not authorize production release.",
      blockedBy: "Node v162 intake gate",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousRunbook: ControlledIdempotencyDrillRunbookProfile,
  intakeSteps: CrossProjectReleaseVerificationIntakeStep[],
  forbiddenOperations: CrossProjectReleaseVerificationForbiddenOperation[],
): CrossProjectReleaseVerificationIntakeGateProfile["checks"] {
  return {
    previousRunbookReady: previousRunbook.readyForControlledIdempotencyDrillRunbook
      && previousRunbook.runbookState === "ready-for-manual-dry-run",
    previousRunbookDoesNotAuthorizeExecution: !previousRunbook.executionAllowed
      && previousRunbook.readyForProductionOperations === false,
    javaV54EvidenceReady: JAVA_V54_RELEASE_MANIFEST.plannedVersion === "Java v54"
      && JAVA_V54_RELEASE_MANIFEST.evidenceTag === "java-v54-release-verification-manifest",
    javaManifestVersionReady: JAVA_V54_RELEASE_MANIFEST.manifestVersion === "java-release-verification-manifest.v1",
    javaReleaseChecksComplete: JAVA_V54_RELEASE_MANIFEST.requiredChecks.length === 5
      && JAVA_V54_RELEASE_MANIFEST.requiredChecks.includes("focused-maven-tests")
      && JAVA_V54_RELEASE_MANIFEST.requiredChecks.includes("http-smoke"),
    javaStaticContractsListed: JAVA_V54_RELEASE_MANIFEST.staticContractCount === 5
      && JAVA_V54_RELEASE_MANIFEST.manifestEndpoint === "/contracts/release-verification-manifest.sample.json",
    javaArchiveRootUsesC: JAVA_V54_RELEASE_MANIFEST.archivePath === "c/54"
      && JAVA_V54_RELEASE_MANIFEST.runtimeArchiveRoot === "c/<version>",
    javaNodeCannotExecuteMaven: !JAVA_V54_RELEASE_MANIFEST.nodeMayExecuteBuild,
    javaNodeCannotTriggerWrites: !JAVA_V54_RELEASE_MANIFEST.nodeMayTriggerWrites,
    javaBusinessSemanticsUnchanged: !JAVA_V54_RELEASE_MANIFEST.changesBusinessSemantics,
    javaDoesNotConnectMiniKv: !JAVA_V54_RELEASE_MANIFEST.connectsMiniKv,
    miniKvV63EvidenceReady: MINI_KV_V63_RELEASE_MANIFEST.plannedVersion === "mini-kv v63"
      && MINI_KV_V63_RELEASE_MANIFEST.evidenceTag === "mini-kv-v63-release-verification-manifest",
    miniKvManifestVersionReady: MINI_KV_V63_RELEASE_MANIFEST.manifestVersion === "mini-kv-release-verification-manifest.v1",
    miniKvReleaseChecksComplete: MINI_KV_V63_RELEASE_MANIFEST.requiredChecks.length === 7
      && MINI_KV_V63_RELEASE_MANIFEST.requiredChecks.includes("ctest")
      && MINI_KV_V63_RELEASE_MANIFEST.requiredChecks.includes("read-only-command-smoke"),
    miniKvFixtureInventoryReady: MINI_KV_V63_RELEASE_MANIFEST.fixtureCount === 11
      && MINI_KV_V63_RELEASE_MANIFEST.targetedTestCount === 5,
    miniKvReadOnlySmokeReady: MINI_KV_V63_RELEASE_MANIFEST.readOnlySmokeCommandCount === 6
      && MINI_KV_V63_RELEASE_MANIFEST.readOnlyEvidence,
    miniKvNoRuntimeCommandAdded: MINI_KV_V63_RELEASE_MANIFEST.noRuntimeCommandAdded,
    miniKvWriteCommandsNotExecuted: !MINI_KV_V63_RELEASE_MANIFEST.writeCommandsExecuted,
    miniKvOrderAuthoritativeFalse: !MINI_KV_V63_RELEASE_MANIFEST.orderAuthoritative
      && !MINI_KV_V63_RELEASE_MANIFEST.connectedToJavaTransactionChain,
    miniKvArchiveRootUsesC: MINI_KV_V63_RELEASE_MANIFEST.archivePath === "c/63",
    nodeConsumesArchivedEvidenceOnly: intakeSteps.length === 5
      && intakeSteps.every((step) => step.readOnly && !step.executesExternalBuild && !step.mutatesState),
    nodeDoesNotExecuteUpstreamBuilds: forbiddenOperations.some((operation) => operation.operation === "Run Maven from Node v162")
      && forbiddenOperations.some((operation) => operation.operation === "Run CMake or CTest from Node v162"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionReleaseStillFalse: true,
    readyForCrossProjectReleaseVerificationIntakeGate: false,
  };
}

function collectProductionBlockers(
  checks: CrossProjectReleaseVerificationIntakeGateProfile["checks"],
): CrossProjectReleaseVerificationIntakeGateMessage[] {
  const blockers: CrossProjectReleaseVerificationIntakeGateMessage[] = [];
  addMessage(blockers, checks.previousRunbookReady, "PREVIOUS_RUNBOOK_NOT_READY", "controlled-idempotency-drill-runbook", "Node v161 runbook must be ready before release verification intake.");
  addMessage(blockers, checks.previousRunbookDoesNotAuthorizeExecution, "PREVIOUS_RUNBOOK_AUTHORIZES_EXECUTION", "controlled-idempotency-drill-runbook", "Node v161 runbook must not authorize execution.");
  addMessage(blockers, checks.javaV54EvidenceReady, "JAVA_V54_EVIDENCE_NOT_READY", "java-v54-release-verification-manifest", "Java v54 release manifest evidence must be present.");
  addMessage(blockers, checks.javaManifestVersionReady, "JAVA_MANIFEST_VERSION_NOT_READY", "java-v54-release-verification-manifest", "Java release verification manifest version must match.");
  addMessage(blockers, checks.javaReleaseChecksComplete, "JAVA_RELEASE_CHECKS_INCOMPLETE", "java-v54-release-verification-manifest", "Java manifest must list the five required release checks.");
  addMessage(blockers, checks.javaStaticContractsListed, "JAVA_STATIC_CONTRACTS_INCOMPLETE", "java-v54-release-verification-manifest", "Java manifest must list static contracts.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v54-release-verification-manifest", "Java v54 archive must use c/54.");
  addMessage(blockers, checks.javaNodeCannotExecuteMaven, "NODE_MAY_EXECUTE_JAVA_MAVEN", "java-v54-release-verification-manifest", "Node v162 must not execute Maven.");
  addMessage(blockers, checks.javaNodeCannotTriggerWrites, "NODE_MAY_TRIGGER_JAVA_WRITES", "java-v54-release-verification-manifest", "Node v162 must not trigger Java writes.");
  addMessage(blockers, checks.javaBusinessSemanticsUnchanged, "JAVA_BUSINESS_SEMANTICS_CHANGED", "java-v54-release-verification-manifest", "Java v54 release manifest must not change business semantics.");
  addMessage(blockers, checks.javaDoesNotConnectMiniKv, "JAVA_CONNECTS_MINI_KV", "java-v54-release-verification-manifest", "Java v54 release manifest must not connect mini-kv.");
  addMessage(blockers, checks.miniKvV63EvidenceReady, "MINI_KV_V63_EVIDENCE_NOT_READY", "mini-kv-v63-release-verification-manifest", "mini-kv v63 release manifest evidence must be present.");
  addMessage(blockers, checks.miniKvManifestVersionReady, "MINI_KV_MANIFEST_VERSION_NOT_READY", "mini-kv-v63-release-verification-manifest", "mini-kv release verification manifest version must match.");
  addMessage(blockers, checks.miniKvReleaseChecksComplete, "MINI_KV_RELEASE_CHECKS_INCOMPLETE", "mini-kv-v63-release-verification-manifest", "mini-kv manifest must list required release checks.");
  addMessage(blockers, checks.miniKvFixtureInventoryReady, "MINI_KV_FIXTURE_INVENTORY_NOT_READY", "mini-kv-v63-release-verification-manifest", "mini-kv manifest fixture inventory must be ready.");
  addMessage(blockers, checks.miniKvReadOnlySmokeReady, "MINI_KV_READ_ONLY_SMOKE_NOT_READY", "mini-kv-v63-release-verification-manifest", "mini-kv v63 read-only smoke evidence must be ready.");
  addMessage(blockers, checks.miniKvNoRuntimeCommandAdded, "MINI_KV_RUNTIME_COMMAND_ADDED", "mini-kv-v63-release-verification-manifest", "mini-kv v63 must not add runtime commands.");
  addMessage(blockers, checks.miniKvWriteCommandsNotExecuted, "MINI_KV_WRITE_COMMANDS_EXECUTED", "mini-kv-v63-release-verification-manifest", "mini-kv v63 smoke must not execute write commands.");
  addMessage(blockers, checks.miniKvOrderAuthoritativeFalse, "MINI_KV_ORDER_AUTHORITATIVE", "mini-kv-v63-release-verification-manifest", "mini-kv must not be order-authoritative.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v63-release-verification-manifest", "mini-kv v63 archive must use c/63.");
  addMessage(blockers, checks.nodeConsumesArchivedEvidenceOnly, "NODE_INTAKE_MUTATES_OR_BUILDS", "cross-project-release-verification-intake-gate", "Node v162 must only consume archived evidence.");
  addMessage(blockers, checks.nodeDoesNotExecuteUpstreamBuilds, "NODE_BUILD_BOUNDARIES_MISSING", "cross-project-release-verification-intake-gate", "Node v162 must explicitly forbid upstream builds.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "cross-project-release-verification-intake-gate", "Node v162 must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionReleaseStillFalse, "PRODUCTION_RELEASE_UNLOCKED", "cross-project-release-verification-intake-gate", "Node v162 must not authorize production release.");
  return blockers;
}

function collectWarnings(
  gateState: CrossProjectReleaseVerificationIntakeGateProfile["gateState"],
): CrossProjectReleaseVerificationIntakeGateMessage[] {
  return [
    {
      code: gateState === "blocked" ? "RELEASE_INTAKE_GATE_BLOCKED" : "RELEASE_INTAKE_GATE_READY",
      severity: "warning",
      source: "cross-project-release-verification-intake-gate",
      message: gateState === "blocked"
        ? "Cross-project release verification intake gate has blockers."
        : "Cross-project release verification intake gate is ready as archived evidence only.",
    },
    {
      code: "JAVA_RELEASE_MANIFEST_CONSUMED_ONLY",
      severity: "warning",
      source: "java-v54-release-verification-manifest",
      message: "Java v54 manifest is consumed by Node, but Maven remains Java-owned.",
    },
    {
      code: "MINI_KV_RELEASE_MANIFEST_CONSUMED_ONLY",
      severity: "warning",
      source: "mini-kv-v63-release-verification-manifest",
      message: "mini-kv v63 manifest is consumed by Node, but CMake and CTest remain mini-kv-owned.",
    },
  ];
}

function collectRecommendations(
  gateState: CrossProjectReleaseVerificationIntakeGateProfile["gateState"],
): CrossProjectReleaseVerificationIntakeGateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_RELEASE_INTAKE_GATE_BLOCKERS"
        : "PROCEED_TO_ROLLBACK_EVIDENCE_STAGE",
      severity: "recommendation",
      source: "cross-project-release-verification-intake-gate",
      message: gateState === "blocked"
        ? "Fix release intake blockers before Java v55 or mini-kv v64."
        : "Proceed to recommended parallel Java v55 and mini-kv v64 rollback evidence samples.",
    },
  ];
}

function addMessage(
  messages: CrossProjectReleaseVerificationIntakeGateMessage[],
  condition: boolean,
  code: string,
  source: CrossProjectReleaseVerificationIntakeGateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderStep(step: CrossProjectReleaseVerificationIntakeStep): string[] {
  return [
    `### Step ${step.order}: ${step.phase}`,
    "",
    `- Source: ${step.source}`,
    `- Action: ${step.action}`,
    `- Evidence target: ${step.evidenceTarget}`,
    `- Expected evidence: ${step.expectedEvidence}`,
    `- Read only: ${step.readOnly}`,
    `- Executes external build: ${step.executesExternalBuild}`,
    `- Mutates state: ${step.mutatesState}`,
    "",
  ];
}

function renderForbiddenOperation(operation: CrossProjectReleaseVerificationForbiddenOperation): string[] {
  return [
    `- ${operation.operation}: ${operation.reason} Blocked by ${operation.blockedBy}.`,
  ];
}

function digestGate(value: unknown): string {
  return sha256StableJson(value);
}
