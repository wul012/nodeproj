import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
} from "./liveProbeReportUtils.js";
import {
  appendBlockingMessage,
  completeAggregateReadyCheck,
  digestReleaseReport,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
} from "./releaseReportShared.js";
import {
  loadReleaseRollbackReadinessRunbook,
} from "./releaseRollbackReadinessRunbook.js";
import type {
  ReleaseRollbackReadinessRunbookProfile,
} from "./releaseRollbackReadinessRunbook.js";

export interface CrossProjectReleaseBundleGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "cross-project-release-bundle-gate.v1";
  gateState: "ready-for-release-bundle-review" | "blocked";
  readyForCrossProjectReleaseBundleGate: boolean;
  readyForProductionRelease: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  gate: {
    gateDigest: string;
    previousRunbookDigest: string;
    previousRunbookVersion: ReleaseRollbackReadinessRunbookProfile["profileVersion"];
    javaVersion: JavaReleaseBundleManifestReference["plannedVersion"];
    javaManifestVersion: JavaReleaseBundleManifestReference["manifestVersion"];
    miniKvVersion: MiniKvRuntimeArtifactBundleManifestReference["plannedVersion"];
    miniKvManifestVersion: MiniKvRuntimeArtifactBundleManifestReference["manifestVersion"];
    nodeBaselineTag: "v164";
    bundleMode: "archived-release-bundle-only";
    nodeMayExecuteJavaMaven: false;
    nodeMayExecuteMiniKvCmake: false;
    nodeMayTriggerJavaWrites: false;
    nodeMayTriggerJavaRollback: false;
    nodeMayExecuteMiniKvWrites: false;
    nodeMayExecuteMiniKvAdminCommands: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionReleaseAuthorized: false;
    productionRollbackAuthorized: false;
  };
  checks: {
    previousRunbookReady: boolean;
    previousRunbookDoesNotAuthorizeRollback: boolean;
    javaV56BundleReady: boolean;
    javaBundleManifestVersionReady: boolean;
    javaBundleInputsComplete: boolean;
    javaVerificationEvidenceComplete: boolean;
    javaContractEndpointsComplete: boolean;
    javaNodeConsumptionBoundariesClosed: boolean;
    javaProductionBoundariesClosed: boolean;
    javaForbiddenOperationsComplete: boolean;
    javaArchiveRootUsesC: boolean;
    miniKvV65BundleReady: boolean;
    miniKvBundleManifestVersionReady: boolean;
    miniKvArtifactsComplete: boolean;
    miniKvCommandEvidenceComplete: boolean;
    miniKvReadOnlySmokeExplainsDangerousCommands: boolean;
    miniKvWriteAndAdminCommandsNotExecuted: boolean;
    miniKvBoundariesClosed: boolean;
    miniKvArchiveRootUsesC: boolean;
    nodeConsumesArchivedBundlesOnly: boolean;
    nodeDoesNotExecuteUpstreamBuilds: boolean;
    nodeDoesNotExecuteReleaseOrRollback: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionReleaseStillFalse: boolean;
    readyForProductionRollbackStillFalse: boolean;
    readyForCrossProjectReleaseBundleGate: boolean;
  };
  artifacts: {
    previousRollbackRunbook: {
      profileVersion: ReleaseRollbackReadinessRunbookProfile["profileVersion"];
      runbookDigest: string;
      runbookState: ReleaseRollbackReadinessRunbookProfile["runbookState"];
      readyForReleaseRollbackReadinessRunbook: boolean;
      readyForProductionRollback: false;
    };
    javaReleaseBundleManifest: JavaReleaseBundleManifestReference;
    miniKvRuntimeArtifactBundleManifest: MiniKvRuntimeArtifactBundleManifestReference;
    nodeBundleEnvelope: {
      archivedReleaseBundlesOnly: true;
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionReleaseAuthorized: false;
      productionRollbackAuthorized: false;
    };
  };
  bundleSteps: CrossProjectReleaseBundleStep[];
  forbiddenOperations: CrossProjectReleaseBundleForbiddenOperation[];
  summary: {
    gateCheckCount: number;
    passedGateCheckCount: number;
    bundleManifestCount: number;
    bundleStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CrossProjectReleaseBundleGateMessage[];
  warnings: CrossProjectReleaseBundleGateMessage[];
  recommendations: CrossProjectReleaseBundleGateMessage[];
  evidenceEndpoints: {
    crossProjectReleaseBundleGateJson: string;
    crossProjectReleaseBundleGateMarkdown: string;
    releaseRollbackReadinessRunbookJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaReleaseBundleManifestReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v56";
  evidenceTag: "v56订单平台release-bundle-manifest";
  manifestVersion: "java-release-bundle-manifest.v1";
  scenario: "JAVA_RELEASE_BUNDLE_MANIFEST_SAMPLE";
  manifestEndpoint: "/contracts/release-bundle-manifest.sample.json";
  manifestSource: "src/main/resources/static/contracts/release-bundle-manifest.sample.json";
  archivePath: "c/56";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/60-version-56-release-bundle-manifest.md";
  bundleMode: "READ_ONLY_RELEASE_BUNDLE";
  buildTool: "Maven";
  javaVersion: "21";
  artifact: "target/advanced-order-platform-0.1.0-SNAPSHOT.jar";
  bundleInputs: [
    "release-verification-manifest",
    "deployment-rollback-evidence",
    "ops-evidence",
    "runtime-archive-root",
  ];
  verificationEvidence: [
    "focused-maven-tests",
    "non-docker-regression-tests",
    "maven-package",
    "http-smoke",
    "static-contract-json-validation",
  ];
  contractEndpointCount: 7;
  nodeMayConsume: true;
  nodeMayExecuteMaven: false;
  nodeMayTriggerJavaWrites: false;
  nodeMayTriggerRollback: false;
  requiresUpstreamActionsEnabled: false;
  requiresProductionDatabase: false;
  requiresProductionSecrets: false;
  changesOrderCreateSemantics: false;
  changesPaymentOrInventoryTransaction: false;
  changesOutboxOrReplayExecution: false;
  changesOrderTransactionSemantics: false;
  connectsMiniKv: false;
  forbiddenOperations: [
    "Executing Maven from Node",
    "Triggering Java rollback from Node",
    "Executing database rollback SQL",
    "Connecting production database",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ];
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvRuntimeArtifactBundleManifestReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v65";
  evidenceTag: "第六十五版运行时产物包清单";
  manifestVersion: "mini-kv-runtime-artifact-bundle.v1";
  manifestPath: "fixtures/release/runtime-artifact-bundle-manifest.json";
  archivePath: "c/65";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/121-version-65-runtime-artifact-bundle-manifest.md";
  projectVersion: "0.65.0";
  releaseVersion: "v65";
  artifactIds: [
    "binary-version",
    "release-verification-manifest",
    "runtime-artifact-rollback-evidence",
    "wal-snapshot-compatibility",
    "fixture-inventory",
  ];
  commandEvidence: [
    "cmake-configure",
    "cmake-build",
    "ctest",
    "targeted-tests",
    "read-only-smoke",
  ];
  targetedTests: [
    "minikv_release_verification_manifest_tests",
    "minikv_runtime_artifact_rollback_evidence_tests",
    "minikv_runtime_artifact_bundle_manifest_tests",
    "minikv_readonly_fixture_tests",
    "minikv_ttl_token_recovery_tests",
  ];
  readOnlySmokeCommands: [
    "INFOJSON",
    "COMMANDSJSON",
    "CHECKJSON LOAD data/bundle.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX bundle:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET bundle:token",
    "QUIT",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  noRuntimeCommandAdded: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  doesNotRunJavaOrNode: true;
  doesNotOpenUpstreamActions: true;
  releaseAndRollbackApprovalRemainOutsideFixture: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface CrossProjectReleaseBundleStep {
  order: number;
  phase: "collect" | "verify" | "gate" | "handoff" | "closeout";
  source: "node" | "java" | "mini-kv" | "operator";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  executesExternalBuild: false;
  executesRelease: false;
  executesRollback: false;
  mutatesState: false;
}

interface CrossProjectReleaseBundleForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v165 release bundle gate"
    | "Java v56 release bundle manifest"
    | "mini-kv v65 runtime artifact bundle manifest"
    | "runtime safety";
}

interface CrossProjectReleaseBundleGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "cross-project-release-bundle-gate"
    | "release-rollback-readiness-runbook"
    | "java-v56-release-bundle-manifest"
    | "mini-kv-v65-runtime-artifact-bundle-manifest"
    | "runtime-config";
  message: string;
}

const JAVA_V56_RELEASE_BUNDLE: JavaReleaseBundleManifestReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v56",
  evidenceTag: "v56订单平台release-bundle-manifest",
  manifestVersion: "java-release-bundle-manifest.v1",
  scenario: "JAVA_RELEASE_BUNDLE_MANIFEST_SAMPLE",
  manifestEndpoint: "/contracts/release-bundle-manifest.sample.json",
  manifestSource: "src/main/resources/static/contracts/release-bundle-manifest.sample.json",
  archivePath: "c/56",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/60-version-56-release-bundle-manifest.md",
  bundleMode: "READ_ONLY_RELEASE_BUNDLE",
  buildTool: "Maven",
  javaVersion: "21",
  artifact: "target/advanced-order-platform-0.1.0-SNAPSHOT.jar",
  bundleInputs: [
    "release-verification-manifest",
    "deployment-rollback-evidence",
    "ops-evidence",
    "runtime-archive-root",
  ] as JavaReleaseBundleManifestReference["bundleInputs"],
  verificationEvidence: [
    "focused-maven-tests",
    "non-docker-regression-tests",
    "maven-package",
    "http-smoke",
    "static-contract-json-validation",
  ] as JavaReleaseBundleManifestReference["verificationEvidence"],
  contractEndpointCount: 7,
  nodeMayConsume: true,
  nodeMayExecuteMaven: false,
  nodeMayTriggerJavaWrites: false,
  nodeMayTriggerRollback: false,
  requiresUpstreamActionsEnabled: false,
  requiresProductionDatabase: false,
  requiresProductionSecrets: false,
  changesOrderCreateSemantics: false,
  changesPaymentOrInventoryTransaction: false,
  changesOutboxOrReplayExecution: false,
  changesOrderTransactionSemantics: false,
  connectsMiniKv: false,
  forbiddenOperations: [
    "Executing Maven from Node",
    "Triggering Java rollback from Node",
    "Executing database rollback SQL",
    "Connecting production database",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ] as JavaReleaseBundleManifestReference["forbiddenOperations"],
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE: MiniKvRuntimeArtifactBundleManifestReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v65",
  evidenceTag: "第六十五版运行时产物包清单",
  manifestVersion: "mini-kv-runtime-artifact-bundle.v1",
  manifestPath: "fixtures/release/runtime-artifact-bundle-manifest.json",
  archivePath: "c/65",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/121-version-65-runtime-artifact-bundle-manifest.md",
  projectVersion: "0.65.0",
  releaseVersion: "v65",
  artifactIds: [
    "binary-version",
    "release-verification-manifest",
    "runtime-artifact-rollback-evidence",
    "wal-snapshot-compatibility",
    "fixture-inventory",
  ] as MiniKvRuntimeArtifactBundleManifestReference["artifactIds"],
  commandEvidence: [
    "cmake-configure",
    "cmake-build",
    "ctest",
    "targeted-tests",
    "read-only-smoke",
  ] as MiniKvRuntimeArtifactBundleManifestReference["commandEvidence"],
  targetedTests: [
    "minikv_release_verification_manifest_tests",
    "minikv_runtime_artifact_rollback_evidence_tests",
    "minikv_runtime_artifact_bundle_manifest_tests",
    "minikv_readonly_fixture_tests",
    "minikv_ttl_token_recovery_tests",
  ] as MiniKvRuntimeArtifactBundleManifestReference["targetedTests"],
  readOnlySmokeCommands: [
    "INFOJSON",
    "COMMANDSJSON",
    "CHECKJSON LOAD data/bundle.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX bundle:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET bundle:token",
    "QUIT",
  ] as MiniKvRuntimeArtifactBundleManifestReference["readOnlySmokeCommands"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotOpenUpstreamActions: true,
  releaseAndRollbackApprovalRemainOutsideFixture: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  crossProjectReleaseBundleGateJson: "/api/v1/production/cross-project-release-bundle-gate",
  crossProjectReleaseBundleGateMarkdown: "/api/v1/production/cross-project-release-bundle-gate?format=markdown",
  releaseRollbackReadinessRunbookJson: "/api/v1/production/release-rollback-readiness-runbook",
  currentRoadmap: "docs/plans/v163-post-rollback-readiness-roadmap.md",
});

export function loadCrossProjectReleaseBundleGate(config: AppConfig): CrossProjectReleaseBundleGateProfile {
  const previousRunbook = loadReleaseRollbackReadinessRunbook(config);
  const bundleSteps = createBundleSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousRunbook, bundleSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForCrossProjectReleaseBundleGate");
  const gateState = checks.readyForCrossProjectReleaseBundleGate
    ? "ready-for-release-bundle-review"
    : "blocked";
  const gateDigest = digestGate({
    profileVersion: "cross-project-release-bundle-gate.v1",
    previousRunbookDigest: previousRunbook.runbook.runbookDigest,
    javaVersion: JAVA_V56_RELEASE_BUNDLE.plannedVersion,
    javaManifestVersion: JAVA_V56_RELEASE_BUNDLE.manifestVersion,
    miniKvVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.plannedVersion,
    miniKvManifestVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.manifestVersion,
    nodeBaselineTag: "v164",
    bundleMode: "archived-release-bundle-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);

  return {
    service: "orderops-node",
    title: "Cross-project release bundle gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "cross-project-release-bundle-gate.v1",
    gateState,
    readyForCrossProjectReleaseBundleGate: checks.readyForCrossProjectReleaseBundleGate,
    readyForProductionRelease: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      previousRunbookDigest: previousRunbook.runbook.runbookDigest,
      previousRunbookVersion: previousRunbook.profileVersion,
      javaVersion: JAVA_V56_RELEASE_BUNDLE.plannedVersion,
      javaManifestVersion: JAVA_V56_RELEASE_BUNDLE.manifestVersion,
      miniKvVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.plannedVersion,
      miniKvManifestVersion: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.manifestVersion,
      nodeBaselineTag: "v164",
      bundleMode: "archived-release-bundle-only",
      nodeMayExecuteJavaMaven: false,
      nodeMayExecuteMiniKvCmake: false,
      nodeMayTriggerJavaWrites: false,
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteMiniKvWrites: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionReleaseAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      previousRollbackRunbook: {
        profileVersion: previousRunbook.profileVersion,
        runbookDigest: previousRunbook.runbook.runbookDigest,
        runbookState: previousRunbook.runbookState,
        readyForReleaseRollbackReadinessRunbook: previousRunbook.readyForReleaseRollbackReadinessRunbook,
        readyForProductionRollback: previousRunbook.readyForProductionRollback,
      },
      javaReleaseBundleManifest: { ...JAVA_V56_RELEASE_BUNDLE },
      miniKvRuntimeArtifactBundleManifest: { ...MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE },
      nodeBundleEnvelope: {
        archivedReleaseBundlesOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionReleaseAuthorized: false,
        productionRollbackAuthorized: false,
      },
    },
    bundleSteps,
    forbiddenOperations,
    summary: {
      gateCheckCount: countReportChecks(checks),
      passedGateCheckCount: countPassedReportChecks(checks),
      bundleManifestCount: 2,
      bundleStepCount: bundleSteps.length,
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
      "Proceed to the recommended parallel Java v57 plus mini-kv v66 handoff sample stage after this gate remains clean.",
      "Keep Node v165 as an archived bundle gate; do not make it run Maven, CMake, Java writes, mini-kv writes, release, or rollback.",
      "Build Node v166 only after Java v57 and mini-kv v66 are both complete.",
    ],
  };
}

export function renderCrossProjectReleaseBundleGateMarkdown(
  profile: CrossProjectReleaseBundleGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Cross-project release bundle gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for cross-project release bundle gate": profile.readyForCrossProjectReleaseBundleGate,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Previous Rollback Runbook", entries: profile.artifacts.previousRollbackRunbook },
      { heading: "Java Release Bundle Manifest", entries: profile.artifacts.javaReleaseBundleManifest },
      {
        heading: "mini-kv Runtime Artifact Bundle Manifest",
        entries: profile.artifacts.miniKvRuntimeArtifactBundleManifest,
      },
      { heading: "Node Bundle Envelope", entries: profile.artifacts.nodeBundleEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Bundle Steps", items: profile.bundleSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No cross-project release bundle gate blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No cross-project release bundle gate warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No cross-project release bundle gate recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createBundleSteps(): CrossProjectReleaseBundleStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "java",
      action: "Collect Java v56 release bundle manifest, static contract endpoint, and c/56 archive evidence.",
      evidenceTarget: "/contracts/release-bundle-manifest.sample.json and c/56",
      expectedEvidence: "java-release-bundle-manifest.v1 lists jar, contracts, rollback evidence, focused tests, package, and HTTP smoke.",
      readOnly: true,
      executesExternalBuild: false,
      executesRelease: false,
      executesRollback: false,
      mutatesState: false,
    },
    {
      order: 2,
      phase: "collect",
      source: "mini-kv",
      action: "Collect mini-kv v65 runtime artifact bundle manifest and c/65 archive evidence.",
      evidenceTarget: "fixtures/release/runtime-artifact-bundle-manifest.json and c/65",
      expectedEvidence: "mini-kv-runtime-artifact-bundle.v1 lists binary version, fixtures, WAL/Snapshot compatibility, CTest, and read-only smoke.",
      readOnly: true,
      executesExternalBuild: false,
      executesRelease: false,
      executesRollback: false,
      mutatesState: false,
    },
    {
      order: 3,
      phase: "verify",
      source: "node",
      action: "Verify both bundles are consumed as archived evidence only.",
      evidenceTarget: "Node v165 gate checks",
      expectedEvidence: "Node may consume bundle manifests but may not execute Maven, CMake, Java writes, mini-kv writes, release, or rollback.",
      readOnly: true,
      executesExternalBuild: false,
      executesRelease: false,
      executesRollback: false,
      mutatesState: false,
    },
    {
      order: 4,
      phase: "gate",
      source: "node",
      action: "Keep production release and rollback authorization closed after bundle review.",
      evidenceTarget: "readyForProductionRelease=false and readyForProductionRollback=false",
      expectedEvidence: "Bundle evidence is ready for operator review, not production execution.",
      readOnly: true,
      executesExternalBuild: false,
      executesRelease: false,
      executesRollback: false,
      mutatesState: false,
    },
    {
      order: 5,
      phase: "handoff",
      source: "operator",
      action: "Use this gate to decide whether Java v57 and mini-kv v66 handoff samples can proceed.",
      evidenceTarget: "docs/plans/v163-post-rollback-readiness-roadmap.md",
      expectedEvidence: "Node v166 remains blocked until Java v57 and mini-kv v66 are both complete.",
      readOnly: true,
      executesExternalBuild: false,
      executesRelease: false,
      executesRollback: false,
      mutatesState: false,
    },
  ];
}

function createForbiddenOperations(): CrossProjectReleaseBundleForbiddenOperation[] {
  return [
    {
      operation: "Run Maven from Node v165",
      reason: "Java v56 bundle is consumed as archived evidence; Java owns Maven execution.",
      blockedBy: "Java v56 release bundle manifest",
    },
    {
      operation: "Run CMake or CTest from Node v165",
      reason: "mini-kv v65 bundle is consumed as archived evidence; mini-kv owns CMake and CTest execution.",
      blockedBy: "mini-kv v65 runtime artifact bundle manifest",
    },
    {
      operation: "Trigger Java release or rollback from Node v165",
      reason: "The Java bundle explicitly blocks Node-triggered release, writes, and rollback.",
      blockedBy: "Java v56 release bundle manifest",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, SETNXEX, or runtime writes",
      reason: "The mini-kv bundle only records CHECKJSON/read-only smoke evidence.",
      blockedBy: "mini-kv v65 runtime artifact bundle manifest",
    },
    {
      operation: "Connect production database or production secrets",
      reason: "Java v56 bundle declares production database and secrets are not required for this evidence gate.",
      blockedBy: "Node v165 release bundle gate",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production writes, release, and rollback actions remain disabled during bundle review.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this gate as production release approval",
      reason: "v165 is release bundle review evidence only and does not authorize production release or rollback.",
      blockedBy: "Node v165 release bundle gate",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousRunbook: ReleaseRollbackReadinessRunbookProfile,
  bundleSteps: CrossProjectReleaseBundleStep[],
  forbiddenOperations: CrossProjectReleaseBundleForbiddenOperation[],
): CrossProjectReleaseBundleGateProfile["checks"] {
  return {
    previousRunbookReady: previousRunbook.readyForReleaseRollbackReadinessRunbook
      && previousRunbook.runbookState === "ready-for-manual-dry-run",
    previousRunbookDoesNotAuthorizeRollback: previousRunbook.readyForProductionRollback === false
      && !previousRunbook.executionAllowed,
    javaV56BundleReady: JAVA_V56_RELEASE_BUNDLE.plannedVersion === "Java v56"
      && JAVA_V56_RELEASE_BUNDLE.evidenceTag === "v56订单平台release-bundle-manifest",
    javaBundleManifestVersionReady: JAVA_V56_RELEASE_BUNDLE.manifestVersion === "java-release-bundle-manifest.v1"
      && JAVA_V56_RELEASE_BUNDLE.scenario === "JAVA_RELEASE_BUNDLE_MANIFEST_SAMPLE",
    javaBundleInputsComplete: JAVA_V56_RELEASE_BUNDLE.bundleInputs.length === 4
      && JAVA_V56_RELEASE_BUNDLE.bundleInputs.includes("release-verification-manifest")
      && JAVA_V56_RELEASE_BUNDLE.bundleInputs.includes("deployment-rollback-evidence"),
    javaVerificationEvidenceComplete: JAVA_V56_RELEASE_BUNDLE.verificationEvidence.length === 5
      && JAVA_V56_RELEASE_BUNDLE.verificationEvidence.includes("maven-package")
      && JAVA_V56_RELEASE_BUNDLE.verificationEvidence.includes("http-smoke"),
    javaContractEndpointsComplete: JAVA_V56_RELEASE_BUNDLE.contractEndpointCount === 7,
    javaNodeConsumptionBoundariesClosed: JAVA_V56_RELEASE_BUNDLE.nodeMayConsume
      && !JAVA_V56_RELEASE_BUNDLE.nodeMayExecuteMaven
      && !JAVA_V56_RELEASE_BUNDLE.nodeMayTriggerJavaWrites
      && !JAVA_V56_RELEASE_BUNDLE.nodeMayTriggerRollback
      && !JAVA_V56_RELEASE_BUNDLE.requiresUpstreamActionsEnabled,
    javaProductionBoundariesClosed: !JAVA_V56_RELEASE_BUNDLE.requiresProductionDatabase
      && !JAVA_V56_RELEASE_BUNDLE.requiresProductionSecrets
      && !JAVA_V56_RELEASE_BUNDLE.changesOrderCreateSemantics
      && !JAVA_V56_RELEASE_BUNDLE.changesPaymentOrInventoryTransaction
      && !JAVA_V56_RELEASE_BUNDLE.changesOutboxOrReplayExecution
      && !JAVA_V56_RELEASE_BUNDLE.changesOrderTransactionSemantics
      && !JAVA_V56_RELEASE_BUNDLE.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V56_RELEASE_BUNDLE.forbiddenOperations.length === 6
      && JAVA_V56_RELEASE_BUNDLE.forbiddenOperations.includes("Executing Maven from Node")
      && JAVA_V56_RELEASE_BUNDLE.forbiddenOperations.includes("POST /api/v1/failed-events/{id}/replay"),
    javaArchiveRootUsesC: JAVA_V56_RELEASE_BUNDLE.archivePath === "c/56",
    miniKvV65BundleReady: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.plannedVersion === "mini-kv v65"
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.evidenceTag === "第六十五版运行时产物包清单",
    miniKvBundleManifestVersionReady:
      MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.manifestVersion === "mini-kv-runtime-artifact-bundle.v1"
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.projectVersion === "0.65.0",
    miniKvArtifactsComplete: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.artifactIds.length === 5
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.artifactIds.includes("binary-version")
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.artifactIds.includes("wal-snapshot-compatibility"),
    miniKvCommandEvidenceComplete: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.commandEvidence.length === 5
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.targetedTests.length === 5
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.commandEvidence.includes("ctest"),
    miniKvReadOnlySmokeExplainsDangerousCommands:
      MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON LOAD data/bundle.snap")
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.readOnlySmokeCommands.includes("CHECKJSON SETNXEX bundle:token 30 value"),
    miniKvWriteAndAdminCommandsNotExecuted: !MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.writeCommandsExecuted
      && !MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.adminCommandsExecuted,
    miniKvBoundariesClosed: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.noRuntimeCommandAdded
      && !MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.orderAuthoritative
      && !MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.connectedToJavaTransactionChain
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.doesNotRunJavaOrNode
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.doesNotOpenUpstreamActions
      && MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.releaseAndRollbackApprovalRemainOutsideFixture,
    miniKvArchiveRootUsesC: MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE.archivePath === "c/65",
    nodeConsumesArchivedBundlesOnly: bundleSteps.length === 5
      && bundleSteps.every((step) => (
        step.readOnly
        && !step.executesExternalBuild
        && !step.executesRelease
        && !step.executesRollback
        && !step.mutatesState
      )),
    nodeDoesNotExecuteUpstreamBuilds: forbiddenOperations.some(
      (operation) => operation.operation === "Run Maven from Node v165",
    ) && forbiddenOperations.some((operation) => operation.operation === "Run CMake or CTest from Node v165"),
    nodeDoesNotExecuteReleaseOrRollback: forbiddenOperations.some(
      (operation) => operation.operation === "Trigger Java release or rollback from Node v165",
    ) && forbiddenOperations.some(
      (operation) => operation.operation === "Treat this gate as production release approval",
    ),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForCrossProjectReleaseBundleGate: false,
  };
}

function collectProductionBlockers(
  checks: CrossProjectReleaseBundleGateProfile["checks"],
): CrossProjectReleaseBundleGateMessage[] {
  const blockers: CrossProjectReleaseBundleGateMessage[] = [];
  addMessage(blockers, checks.previousRunbookReady, "PREVIOUS_RUNBOOK_NOT_READY", "release-rollback-readiness-runbook", "Node v163 rollback readiness runbook must be ready before bundle gate.");
  addMessage(blockers, checks.previousRunbookDoesNotAuthorizeRollback, "PREVIOUS_RUNBOOK_AUTHORIZES_ROLLBACK", "release-rollback-readiness-runbook", "Node v163 must not authorize rollback.");
  addMessage(blockers, checks.javaV56BundleReady, "JAVA_V56_BUNDLE_NOT_READY", "java-v56-release-bundle-manifest", "Java v56 release bundle manifest must be present.");
  addMessage(blockers, checks.javaBundleManifestVersionReady, "JAVA_BUNDLE_MANIFEST_VERSION_NOT_READY", "java-v56-release-bundle-manifest", "Java release bundle manifest version must match.");
  addMessage(blockers, checks.javaBundleInputsComplete, "JAVA_BUNDLE_INPUTS_INCOMPLETE", "java-v56-release-bundle-manifest", "Java bundle inputs must include release verification and rollback evidence.");
  addMessage(blockers, checks.javaVerificationEvidenceComplete, "JAVA_VERIFICATION_EVIDENCE_INCOMPLETE", "java-v56-release-bundle-manifest", "Java bundle must list focused tests, package, HTTP smoke, and contract validation evidence.");
  addMessage(blockers, checks.javaContractEndpointsComplete, "JAVA_CONTRACT_ENDPOINTS_INCOMPLETE", "java-v56-release-bundle-manifest", "Java bundle must list all static contract endpoints.");
  addMessage(blockers, checks.javaNodeConsumptionBoundariesClosed, "JAVA_NODE_CONSUMPTION_BOUNDARY_OPEN", "java-v56-release-bundle-manifest", "Java bundle must forbid Node executing Maven, writes, or rollback.");
  addMessage(blockers, checks.javaProductionBoundariesClosed, "JAVA_PRODUCTION_BOUNDARY_OPEN", "java-v56-release-bundle-manifest", "Java bundle must not require production database/secrets or change transaction semantics.");
  addMessage(blockers, checks.javaForbiddenOperationsComplete, "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", "java-v56-release-bundle-manifest", "Java bundle forbidden operations must be complete.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v56-release-bundle-manifest", "Java v56 archive must use c/56.");
  addMessage(blockers, checks.miniKvV65BundleReady, "MINI_KV_V65_BUNDLE_NOT_READY", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv v65 runtime artifact bundle manifest must be present.");
  addMessage(blockers, checks.miniKvBundleManifestVersionReady, "MINI_KV_BUNDLE_MANIFEST_VERSION_NOT_READY", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle manifest version must match.");
  addMessage(blockers, checks.miniKvArtifactsComplete, "MINI_KV_ARTIFACTS_INCOMPLETE", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle artifacts must include binary version and WAL/Snapshot compatibility.");
  addMessage(blockers, checks.miniKvCommandEvidenceComplete, "MINI_KV_COMMAND_EVIDENCE_INCOMPLETE", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle must list CTest, targeted tests, and read-only smoke evidence.");
  addMessage(blockers, checks.miniKvReadOnlySmokeExplainsDangerousCommands, "MINI_KV_DANGEROUS_COMMAND_EXPLANATIONS_MISSING", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle must inspect LOAD/COMPACT/SETNXEX through CHECKJSON only.");
  addMessage(blockers, checks.miniKvWriteAndAdminCommandsNotExecuted, "MINI_KV_WRITE_OR_ADMIN_COMMANDS_EXECUTED", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle must not execute write or admin commands.");
  addMessage(blockers, checks.miniKvBoundariesClosed, "MINI_KV_BOUNDARY_OPEN", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv bundle must not become order-authoritative or enter the Java transaction chain.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v65-runtime-artifact-bundle-manifest", "mini-kv v65 archive must use c/65.");
  addMessage(blockers, checks.nodeConsumesArchivedBundlesOnly, "NODE_BUNDLE_GATE_MUTATES_OR_BUILDS", "cross-project-release-bundle-gate", "Node v165 must only consume archived bundles.");
  addMessage(blockers, checks.nodeDoesNotExecuteUpstreamBuilds, "NODE_BUILD_BOUNDARIES_MISSING", "cross-project-release-bundle-gate", "Node v165 must explicitly forbid upstream builds.");
  addMessage(blockers, checks.nodeDoesNotExecuteReleaseOrRollback, "NODE_RELEASE_ROLLBACK_BOUNDARIES_MISSING", "cross-project-release-bundle-gate", "Node v165 must explicitly forbid release and rollback execution.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "cross-project-release-bundle-gate", "Node v165 must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionReleaseStillFalse, "PRODUCTION_RELEASE_UNLOCKED", "cross-project-release-bundle-gate", "Node v165 must not authorize production release.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "cross-project-release-bundle-gate", "Node v165 must not authorize production rollback.");
  return blockers;
}

function collectWarnings(
  gateState: CrossProjectReleaseBundleGateProfile["gateState"],
): CrossProjectReleaseBundleGateMessage[] {
  return [
    {
      code: gateState === "blocked" ? "RELEASE_BUNDLE_GATE_BLOCKED" : "RELEASE_BUNDLE_GATE_READY",
      severity: "warning",
      source: "cross-project-release-bundle-gate",
      message: gateState === "blocked"
        ? "Cross-project release bundle gate has blockers."
        : "Cross-project release bundle gate is ready for archived evidence review only.",
    },
    {
      code: "JAVA_RELEASE_BUNDLE_CONSUMED_ONLY",
      severity: "warning",
      source: "java-v56-release-bundle-manifest",
      message: "Java v56 release bundle is consumed by Node, but Maven, writes, and rollback remain Java-owned.",
    },
    {
      code: "MINI_KV_RUNTIME_BUNDLE_CONSUMED_ONLY",
      severity: "warning",
      source: "mini-kv-v65-runtime-artifact-bundle-manifest",
      message: "mini-kv v65 runtime bundle is consumed by Node, but CMake, CTest, write, and admin execution remain mini-kv-owned.",
    },
  ];
}

function collectRecommendations(
  gateState: CrossProjectReleaseBundleGateProfile["gateState"],
): CrossProjectReleaseBundleGateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_RELEASE_BUNDLE_GATE_BLOCKERS"
        : "PROCEED_TO_HANDOFF_SAMPLE_STAGE",
      severity: "recommendation",
      source: "cross-project-release-bundle-gate",
      message: gateState === "blocked"
        ? "Fix release bundle gate blockers before Java v57 or mini-kv v66."
        : "Proceed to recommended parallel Java v57 and mini-kv v66 handoff samples.",
    },
  ];
}

function addMessage(
  messages: CrossProjectReleaseBundleGateMessage[],
  condition: boolean,
  code: string,
  source: CrossProjectReleaseBundleGateMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, condition, code, source, message);
}

function renderStep(step: CrossProjectReleaseBundleStep): string[] {
  return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
    identityLabel: "Source",
    identityKey: "source",
    booleanFields: [
      ["Read only", "readOnly"],
      ["Executes external build", "executesExternalBuild"],
      ["Executes release", "executesRelease"],
      ["Executes rollback", "executesRollback"],
      ["Mutates state", "mutatesState"],
    ],
  });
}

function renderForbiddenOperation(operation: CrossProjectReleaseBundleForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestGate(value: unknown): string {
  return digestReleaseReport(value);
}
