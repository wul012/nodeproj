export interface JavaSecretSourceContractReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v59";
  evidenceTag: "v59订单平台production-secret-source-contract";
  contractVersion: "java-production-secret-source-contract.v1";
  scenario: "PRODUCTION_SECRET_SOURCE_CONTRACT_SAMPLE";
  contractEndpoint: "/contracts/production-secret-source-contract.sample.json";
  contractSource: "src/main/resources/static/contracts/production-secret-source-contract.sample.json";
  archivePath: "c/59";
  screenshotCount: 4;
  walkthroughPath: "代码讲解记录_生产雏形阶段/63-version-59-production-secret-source-contract.md";
  contractMode: "READ_ONLY_SECRET_SOURCE_CONTRACT";
  selectedSourceType: "external-secret-manager";
  allowedSourceTypes: [
    "external-secret-manager",
    "environment-injected-secret",
    "platform-managed-secret",
  ];
  secretManagerOwner: "platform-security-owner";
  rotationOwner: "security-operations-owner";
  reviewCadence: "quarterly-or-before-production-cutover";
  requiredConfirmationFields: [
    "secret-manager-or-source-type",
    "secret-manager-owner",
    "rotation-owner",
    "review-cadence",
    "secret-value-access-boundary",
  ];
  handoffArtifacts: [
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-verification-manifest.sample.json",
  ];
  nodeMayConsume: true;
  nodeMayRenderChecklist: true;
  nodeMayReadSecretValues: false;
  nodeMayModifyRuntimeConfig: false;
  requiresUpstreamActionsEnabled: false;
  requiresProductionSecrets: false;
  requiresProductionDatabase: false;
  sourceValueRecorded: false;
  secretNamesRecorded: false;
  rotationEvidenceRequired: true;
  nodeMayInferRotationState: false;
  changesOrderCreateSemantics: false;
  changesPaymentOrInventoryTransaction: false;
  changesOutboxOrReplayExecution: false;
  changesOrderTransactionSemantics: false;
  connectsMiniKv: false;
  forbiddenOperations: [
    "Reading production secret values from this contract",
    "Embedding secret values in static JSON samples",
    "Writing secret names or raw environment variable values to this repository",
    "Triggering Java runtime configuration changes from Node",
    "Connecting production database",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ];
  readOnlyEvidence: true;
  executionAllowed: false;
}

export interface MiniKvDigestCompatibilityMatrixReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v68";
  evidenceTag: "第六十八版产物摘要兼容矩阵";
  matrixVersion: "mini-kv-artifact-digest-compatibility-matrix.v1";
  matrixPath: "fixtures/release/artifact-digest-compatibility-matrix.json";
  archivePath: "c/68";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/124-version-68-artifact-digest-compatibility-matrix.md";
  projectVersion: "0.68.0";
  releaseVersion: "v68";
  targetReleaseVersion: "v68";
  previousReleaseVersion: "v67";
  digestIds: [
    "binary-digest",
    "wal-checksum-evidence",
    "snapshot-digest-evidence",
    "fixture-digest",
  ];
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/restore-dry-run-operator-package.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/recovery/restart-recovery-evidence.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ];
  compatibilityCheckIds: [
    "binary-version-match",
    "wal-matrix-review",
    "snapshot-matrix-review",
    "fixture-matrix-review",
  ];
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/digest-matrix.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX digest:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET digest:token",
    "QUIT",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  restoreExecutionAllowed: false;
  noRuntimeCommandAdded: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  doesNotRunJavaOrNode: true;
  doesNotReadProductionSecrets: true;
  doesNotOpenUpstreamActions: true;
  digestPlaceholdersRequireOperatorConfirmation: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

export const JAVA_V59_SECRET_SOURCE_CONTRACT: JavaSecretSourceContractReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v59",
  evidenceTag: "v59订单平台production-secret-source-contract",
  contractVersion: "java-production-secret-source-contract.v1",
  scenario: "PRODUCTION_SECRET_SOURCE_CONTRACT_SAMPLE",
  contractEndpoint: "/contracts/production-secret-source-contract.sample.json",
  contractSource: "src/main/resources/static/contracts/production-secret-source-contract.sample.json",
  archivePath: "c/59",
  screenshotCount: 4,
  walkthroughPath: "代码讲解记录_生产雏形阶段/63-version-59-production-secret-source-contract.md",
  contractMode: "READ_ONLY_SECRET_SOURCE_CONTRACT",
  selectedSourceType: "external-secret-manager",
  allowedSourceTypes: [
    "external-secret-manager",
    "environment-injected-secret",
    "platform-managed-secret",
  ] as JavaSecretSourceContractReference["allowedSourceTypes"],
  secretManagerOwner: "platform-security-owner",
  rotationOwner: "security-operations-owner",
  reviewCadence: "quarterly-or-before-production-cutover",
  requiredConfirmationFields: [
    "secret-manager-or-source-type",
    "secret-manager-owner",
    "rotation-owner",
    "review-cadence",
    "secret-value-access-boundary",
  ] as JavaSecretSourceContractReference["requiredConfirmationFields"],
  handoffArtifacts: [
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-verification-manifest.sample.json",
  ] as JavaSecretSourceContractReference["handoffArtifacts"],
  nodeMayConsume: true,
  nodeMayRenderChecklist: true,
  nodeMayReadSecretValues: false,
  nodeMayModifyRuntimeConfig: false,
  requiresUpstreamActionsEnabled: false,
  requiresProductionSecrets: false,
  requiresProductionDatabase: false,
  sourceValueRecorded: false,
  secretNamesRecorded: false,
  rotationEvidenceRequired: true,
  nodeMayInferRotationState: false,
  changesOrderCreateSemantics: false,
  changesPaymentOrInventoryTransaction: false,
  changesOutboxOrReplayExecution: false,
  changesOrderTransactionSemantics: false,
  connectsMiniKv: false,
  forbiddenOperations: [
    "Reading production secret values from this contract",
    "Embedding secret values in static JSON samples",
    "Writing secret names or raw environment variable values to this repository",
    "Triggering Java runtime configuration changes from Node",
    "Connecting production database",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ] as JavaSecretSourceContractReference["forbiddenOperations"],
  readOnlyEvidence: true,
  executionAllowed: false,
});

export const MINI_KV_V68_DIGEST_MATRIX: MiniKvDigestCompatibilityMatrixReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v68",
  evidenceTag: "第六十八版产物摘要兼容矩阵",
  matrixVersion: "mini-kv-artifact-digest-compatibility-matrix.v1",
  matrixPath: "fixtures/release/artifact-digest-compatibility-matrix.json",
  archivePath: "c/68",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/124-version-68-artifact-digest-compatibility-matrix.md",
  projectVersion: "0.68.0",
  releaseVersion: "v68",
  targetReleaseVersion: "v68",
  previousReleaseVersion: "v67",
  digestIds: [
    "binary-digest",
    "wal-checksum-evidence",
    "snapshot-digest-evidence",
    "fixture-digest",
  ] as MiniKvDigestCompatibilityMatrixReference["digestIds"],
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/restore-dry-run-operator-package.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/recovery/restart-recovery-evidence.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ] as MiniKvDigestCompatibilityMatrixReference["fixtureInputs"],
  compatibilityCheckIds: [
    "binary-version-match",
    "wal-matrix-review",
    "snapshot-matrix-review",
    "fixture-matrix-review",
  ] as MiniKvDigestCompatibilityMatrixReference["compatibilityCheckIds"],
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/digest-matrix.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX digest:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET digest:token",
    "QUIT",
  ] as MiniKvDigestCompatibilityMatrixReference["readOnlySmokeCommands"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  restoreExecutionAllowed: false,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotReadProductionSecrets: true,
  doesNotOpenUpstreamActions: true,
  digestPlaceholdersRequireOperatorConfirmation: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});
