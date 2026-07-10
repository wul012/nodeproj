export interface JavaReleaseBundleManifestReference {
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

export interface MiniKvRuntimeArtifactBundleManifestReference {
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

export const JAVA_V56_RELEASE_BUNDLE: JavaReleaseBundleManifestReference = Object.freeze({
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

export const MINI_KV_V65_RUNTIME_ARTIFACT_BUNDLE: MiniKvRuntimeArtifactBundleManifestReference = Object.freeze({
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
