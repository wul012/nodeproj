import type { AppConfig } from "../config.js";
import {
  appendBlockingMessage,
  completeAggregateReadyCheck,
  digestReleaseReport,
  prefixReportCheckSummary,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadRollbackExecutionPreflightContract,
} from "./rollbackExecutionPreflightContract.js";
import type {
  RollbackExecutionPreflightContractProfile,
} from "./rollbackExecutionPreflightContract.js";

type EnvironmentPreflightState = "ready-for-manual-environment-review" | "blocked";
type EnvironmentPreflightSource = "node" | "operator" | "java" | "mini-kv";

interface EnvironmentPreflightMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-environment-preflight-checklist"
    | "rollback-execution-preflight-contract"
    | "java-v59-production-secret-source-contract"
    | "mini-kv-v68-artifact-digest-compatibility-matrix"
    | "runtime-config";
  message: string;
}

interface EnvironmentPreflightStep {
  order: number;
  phase: "collect" | "verify" | "compare" | "decide" | "closeout";
  source: EnvironmentPreflightSource;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
  executesRestore: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v168 production environment preflight checklist"
    | "Node v167 rollback execution preflight contract"
    | "Java v59 production secret source contract"
    | "mini-kv v68 artifact digest compatibility matrix"
    | "runtime safety";
}

interface JavaSecretSourceContractReference {
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

interface MiniKvDigestCompatibilityMatrixReference {
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

export interface ProductionEnvironmentPreflightChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-environment-preflight-checklist.v1";
  checklistState: EnvironmentPreflightState;
  readyForProductionEnvironmentPreflightChecklist: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  checklist: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  preflightSteps: EnvironmentPreflightStep[];
  forbiddenOperations: ForbiddenOperation[];
  summary: Record<string, number>;
  productionBlockers: EnvironmentPreflightMessage[];
  warnings: EnvironmentPreflightMessage[];
  recommendations: EnvironmentPreflightMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V59_SECRET_SOURCE_CONTRACT: JavaSecretSourceContractReference = Object.freeze({
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

const MINI_KV_V68_DIGEST_MATRIX: MiniKvDigestCompatibilityMatrixReference = Object.freeze({
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

const ENDPOINTS = Object.freeze({
  productionEnvironmentPreflightChecklistJson: "/api/v1/production/environment-preflight-checklist",
  productionEnvironmentPreflightChecklistMarkdown: "/api/v1/production/environment-preflight-checklist?format=markdown",
  rollbackExecutionPreflightContractJson: "/api/v1/production/rollback-execution-preflight-contract",
  currentRoadmap: "docs/plans/v166-post-rollback-window-roadmap.md",
});

export function loadProductionEnvironmentPreflightChecklist(
  config: AppConfig,
): ProductionEnvironmentPreflightChecklistProfile {
  const previousPreflight = loadRollbackExecutionPreflightContract(config);
  const preflightSteps = createPreflightSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousPreflight, preflightSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForProductionEnvironmentPreflightChecklist");
  const checklistState: EnvironmentPreflightState = checks.readyForProductionEnvironmentPreflightChecklist
    ? "ready-for-manual-environment-review"
    : "blocked";
  const checklistDigest = digestChecklist({
    profileVersion: "production-environment-preflight-checklist.v1",
    previousPreflightDigest: previousPreflight.contract.contractDigest,
    javaVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.plannedVersion,
    javaContractVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.contractVersion,
    miniKvVersion: MINI_KV_V68_DIGEST_MATRIX.plannedVersion,
    miniKvMatrixVersion: MINI_KV_V68_DIGEST_MATRIX.matrixVersion,
    environmentMode: "manual-environment-preflight-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checklistState);
  const recommendations = collectRecommendations(checklistState);
  const checkSummary = prefixReportCheckSummary(summarizeReportChecks(checks), "checklist");

  return {
    service: "orderops-node",
    title: "Production environment preflight checklist",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-environment-preflight-checklist.v1",
    checklistState,
    readyForProductionEnvironmentPreflightChecklist: checks.readyForProductionEnvironmentPreflightChecklist,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    checklist: {
      checklistDigest,
      previousPreflightDigest: previousPreflight.contract.contractDigest,
      previousPreflightVersion: previousPreflight.profileVersion,
      javaVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.plannedVersion,
      javaContractVersion: JAVA_V59_SECRET_SOURCE_CONTRACT.contractVersion,
      miniKvVersion: MINI_KV_V68_DIGEST_MATRIX.plannedVersion,
      miniKvMatrixVersion: MINI_KV_V68_DIGEST_MATRIX.matrixVersion,
      nodeBaselineTag: "v167",
      environmentMode: "manual-environment-preflight-only",
      nodeMayRenderChecklist: true,
      nodeMayReadSecretValues: false,
      nodeMayModifyRuntimeConfig: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      nodeMayConnectProductionDatabase: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      productionEnvironmentAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      previousRollbackExecutionPreflightContract: {
        profileVersion: previousPreflight.profileVersion,
        contractDigest: previousPreflight.contract.contractDigest,
        contractState: previousPreflight.contractState,
        readyForRollbackExecutionPreflightContract:
          previousPreflight.readyForRollbackExecutionPreflightContract,
        readyForProductionRollback: previousPreflight.readyForProductionRollback,
        executionAllowed: previousPreflight.executionAllowed,
      },
      javaProductionSecretSourceContract: { ...JAVA_V59_SECRET_SOURCE_CONTRACT },
      miniKvArtifactDigestCompatibilityMatrix: { ...MINI_KV_V68_DIGEST_MATRIX },
      nodeEnvironmentEnvelope: {
        manualEnvironmentPreflightOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        readsSecretValues: false,
        connectsProductionDatabase: false,
        executesMiniKvRestore: false,
        productionEnvironmentAuthorized: false,
      },
    },
    preflightSteps,
    forbiddenOperations,
    summary: {
      checklistCheckCount: checkSummary.checklistCheckCount,
      passedChecklistCheckCount: checkSummary.passedChecklistCheckCount,
      preflightArtifactCount: 3,
      preflightStepCount: preflightSteps.length,
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
      "Keep Java v59 and mini-kv v68 as production preflight evidence only; do not treat either as production execution approval.",
      "Proceed to Node v169 post-v166 readiness summary after this environment preflight checklist remains clean.",
      "Pause before any real secret manager, production database, production IdP, Java rollback, or mini-kv restore integration.",
    ],
  };
}

export function renderProductionEnvironmentPreflightChecklistMarkdown(
  profile: ProductionEnvironmentPreflightChecklistProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Production environment preflight checklist",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Checklist state": profile.checklistState,
      "Ready for production environment preflight checklist": profile.readyForProductionEnvironmentPreflightChecklist,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Checklist", entries: profile.checklist },
      { heading: "Checks", entries: profile.checks },
      {
        heading: "Previous Rollback Execution Preflight Contract",
        entries: profile.artifacts.previousRollbackExecutionPreflightContract,
      },
      { heading: "Java Production Secret Source Contract", entries: profile.artifacts.javaProductionSecretSourceContract },
      {
        heading: "mini-kv Artifact Digest Compatibility Matrix",
        entries: profile.artifacts.miniKvArtifactDigestCompatibilityMatrix,
      },
      { heading: "Node Environment Envelope", entries: profile.artifacts.nodeEnvironmentEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Preflight Steps", items: profile.preflightSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No production environment preflight checklist blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No production environment preflight checklist warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No production environment preflight checklist recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createPreflightSteps(): EnvironmentPreflightStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "java",
      action: "Collect Java v59 production secret source contract and c/59 evidence.",
      evidenceTarget: "/contracts/production-secret-source-contract.sample.json and c/59",
      expectedEvidence: "Secret source type, owner, rotation owner, review cadence, and secret-value boundary are present without secret values.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
    {
      order: 2,
      phase: "collect",
      source: "mini-kv",
      action: "Collect mini-kv v68 artifact digest compatibility matrix and c/68 evidence.",
      evidenceTarget: "fixtures/release/artifact-digest-compatibility-matrix.json and c/68",
      expectedEvidence: "Binary, WAL, Snapshot, fixture, and release evidence digest placeholders require operator confirmation.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
    {
      order: 3,
      phase: "verify",
      source: "node",
      action: "Verify Node v167 rollback execution preflight remains clean before adding environment preflight.",
      evidenceTarget: "/api/v1/production/rollback-execution-preflight-contract",
      expectedEvidence: "Previous preflight contract is ready, execution remains disabled, and production rollback remains false.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
    {
      order: 4,
      phase: "compare",
      source: "operator",
      action: "Compare Java secret-source ownership with mini-kv digest ownership before any production window.",
      evidenceTarget: "operator secret source record plus operator artifact digest record",
      expectedEvidence: "Both records are externally confirmed; Node does not infer missing secret or digest state.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
    {
      order: 5,
      phase: "decide",
      source: "operator",
      action: "Pause if secret manager ownership, rotation evidence, binary digest, WAL digest, Snapshot digest, or fixture digest is unclear.",
      evidenceTarget: "production blockers and pause conditions",
      expectedEvidence: "Any uncertainty blocks production environment authorization instead of being automated by Node.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
    {
      order: 6,
      phase: "closeout",
      source: "node",
      action: "Archive this environment preflight checklist and prepare Node v169 stage summary.",
      evidenceTarget: "c/168 archive and docs/plans/v166-post-rollback-window-roadmap.md",
      expectedEvidence: "v168 closes the environment preflight checklist without opening production rollback or restore authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesRestore: false,
    },
  ];
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Read production secret values from Node v168",
      reason: "Java v59 records only secret source metadata and explicitly keeps secret values outside the contract.",
      blockedBy: "Java v59 production secret source contract",
    },
    {
      operation: "Infer secret rotation state from Node v168",
      reason: "Java v59 requires operator rotation evidence and marks nodeMayInferRotationState=false.",
      blockedBy: "Java v59 production secret source contract",
    },
    {
      operation: "Modify Java runtime configuration from Node v168",
      reason: "Java v59 allows checklist rendering only and keeps runtime config changes outside Node.",
      blockedBy: "Java v59 production secret source contract",
    },
    {
      operation: "Connect to a production database",
      reason: "Production database access remains outside this environment preflight checklist.",
      blockedBy: "Node v168 production environment preflight checklist",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "mini-kv v68 uses CHECKJSON/read-only smoke commands and does not execute restore-sensitive commands.",
      blockedBy: "mini-kv v68 artifact digest compatibility matrix",
    },
    {
      operation: "Treat mini-kv digest matrix as Java order authority",
      reason: "mini-kv v68 remains not order-authoritative and is not connected to the Java transaction chain.",
      blockedBy: "mini-kv v68 artifact digest compatibility matrix",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production writes and rollback actions remain disabled during environment preflight review.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this checklist as production environment approval",
      reason: "v168 is a manual environment preflight checklist and does not authorize production operations.",
      blockedBy: "Node v168 production environment preflight checklist",
    },
    {
      operation: "Bypass Node v167 rollback execution preflight contract",
      reason: "v168 depends on v167 remaining clean before production environment checklist review.",
      blockedBy: "Node v167 rollback execution preflight contract",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousPreflight: RollbackExecutionPreflightContractProfile,
  preflightSteps: EnvironmentPreflightStep[],
  forbiddenOperations: ForbiddenOperation[],
): Record<string, boolean> {
  return {
    previousPreflightReady: previousPreflight.readyForRollbackExecutionPreflightContract
      && previousPreflight.contractState === "ready-for-manual-preflight-review",
    previousPreflightDoesNotAuthorizeRollback: previousPreflight.readyForProductionRollback === false
      && previousPreflight.readyForProductionOperations === false
      && !previousPreflight.executionAllowed,
    javaV59ContractReady: JAVA_V59_SECRET_SOURCE_CONTRACT.plannedVersion === "Java v59"
      && JAVA_V59_SECRET_SOURCE_CONTRACT.evidenceTag === "v59订单平台production-secret-source-contract",
    javaContractVersionReady:
      JAVA_V59_SECRET_SOURCE_CONTRACT.contractVersion === "java-production-secret-source-contract.v1"
      && JAVA_V59_SECRET_SOURCE_CONTRACT.scenario === "PRODUCTION_SECRET_SOURCE_CONTRACT_SAMPLE",
    javaSecretSourceMetadataComplete: JAVA_V59_SECRET_SOURCE_CONTRACT.selectedSourceType === "external-secret-manager"
      && JAVA_V59_SECRET_SOURCE_CONTRACT.allowedSourceTypes.length === 3
      && JAVA_V59_SECRET_SOURCE_CONTRACT.secretManagerOwner === "platform-security-owner",
    javaRotationPolicyComplete: JAVA_V59_SECRET_SOURCE_CONTRACT.rotationOwner === "security-operations-owner"
      && JAVA_V59_SECRET_SOURCE_CONTRACT.reviewCadence === "quarterly-or-before-production-cutover"
      && JAVA_V59_SECRET_SOURCE_CONTRACT.rotationEvidenceRequired
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayInferRotationState,
    javaConfirmationFieldsComplete: JAVA_V59_SECRET_SOURCE_CONTRACT.requiredConfirmationFields.length === 5
      && JAVA_V59_SECRET_SOURCE_CONTRACT.requiredConfirmationFields.includes("secret-manager-or-source-type")
      && JAVA_V59_SECRET_SOURCE_CONTRACT.requiredConfirmationFields.includes("secret-value-access-boundary"),
    javaSecretValuesClosed: !JAVA_V59_SECRET_SOURCE_CONTRACT.sourceValueRecorded
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.secretNamesRecorded
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayReadSecretValues,
    javaNodeConsumptionReadOnly: JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayConsume
      && JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayRenderChecklist
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.nodeMayModifyRuntimeConfig
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.requiresUpstreamActionsEnabled,
    javaProductionBoundaryClosed: !JAVA_V59_SECRET_SOURCE_CONTRACT.requiresProductionSecrets
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.requiresProductionDatabase
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.changesOrderCreateSemantics
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.changesPaymentOrInventoryTransaction
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.changesOutboxOrReplayExecution
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.changesOrderTransactionSemantics
      && !JAVA_V59_SECRET_SOURCE_CONTRACT.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V59_SECRET_SOURCE_CONTRACT.forbiddenOperations.length === 7
      && JAVA_V59_SECRET_SOURCE_CONTRACT.forbiddenOperations.includes("Reading production secret values from this contract")
      && JAVA_V59_SECRET_SOURCE_CONTRACT.forbiddenOperations.includes("Connecting production database"),
    javaArchiveRootUsesC: JAVA_V59_SECRET_SOURCE_CONTRACT.archivePath === "c/59",
    miniKvV68MatrixReady: MINI_KV_V68_DIGEST_MATRIX.plannedVersion === "mini-kv v68"
      && MINI_KV_V68_DIGEST_MATRIX.evidenceTag === "第六十八版产物摘要兼容矩阵",
    miniKvMatrixVersionReady:
      MINI_KV_V68_DIGEST_MATRIX.matrixVersion === "mini-kv-artifact-digest-compatibility-matrix.v1"
      && MINI_KV_V68_DIGEST_MATRIX.projectVersion === "0.68.0",
    miniKvReleaseMappingReady: MINI_KV_V68_DIGEST_MATRIX.releaseVersion === "v68"
      && MINI_KV_V68_DIGEST_MATRIX.targetReleaseVersion === "v68"
      && MINI_KV_V68_DIGEST_MATRIX.previousReleaseVersion === "v67",
    miniKvDigestMatrixComplete: MINI_KV_V68_DIGEST_MATRIX.digestIds.length === 4
      && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("binary-digest")
      && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("wal-checksum-evidence")
      && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("snapshot-digest-evidence")
      && MINI_KV_V68_DIGEST_MATRIX.digestIds.includes("fixture-digest"),
    miniKvFixtureInputsComplete: MINI_KV_V68_DIGEST_MATRIX.fixtureInputs.length === 5
      && MINI_KV_V68_DIGEST_MATRIX.fixtureInputs.includes("fixtures/release/verification-manifest.json")
      && MINI_KV_V68_DIGEST_MATRIX.fixtureInputs.includes("fixtures/ttl-token/recovery-evidence.json"),
    miniKvCompatibilityChecksComplete: MINI_KV_V68_DIGEST_MATRIX.compatibilityCheckIds.length === 4
      && MINI_KV_V68_DIGEST_MATRIX.compatibilityCheckIds.includes("binary-version-match")
      && MINI_KV_V68_DIGEST_MATRIX.compatibilityCheckIds.includes("snapshot-matrix-review"),
    miniKvReadOnlySmokeComplete: MINI_KV_V68_DIGEST_MATRIX.readOnlySmokeCommands.length === 8
      && MINI_KV_V68_DIGEST_MATRIX.readOnlySmokeCommands.includes("CHECKJSON LOAD data/digest-matrix.snap")
      && MINI_KV_V68_DIGEST_MATRIX.readOnlySmokeCommands.includes("GET digest:token"),
    miniKvDangerousCommandsExplainedOnly:
      MINI_KV_V68_DIGEST_MATRIX.readOnlySmokeCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V68_DIGEST_MATRIX.readOnlySmokeCommands.includes("CHECKJSON SETNXEX digest:token 30 value"),
    miniKvExecutionBoundariesClosed: !MINI_KV_V68_DIGEST_MATRIX.writeCommandsExecuted
      && !MINI_KV_V68_DIGEST_MATRIX.adminCommandsExecuted
      && !MINI_KV_V68_DIGEST_MATRIX.restoreExecutionAllowed
      && MINI_KV_V68_DIGEST_MATRIX.noRuntimeCommandAdded,
    miniKvOrderAuthorityClosed: !MINI_KV_V68_DIGEST_MATRIX.orderAuthoritative
      && !MINI_KV_V68_DIGEST_MATRIX.connectedToJavaTransactionChain
      && MINI_KV_V68_DIGEST_MATRIX.doesNotRunJavaOrNode
      && MINI_KV_V68_DIGEST_MATRIX.doesNotReadProductionSecrets
      && MINI_KV_V68_DIGEST_MATRIX.doesNotOpenUpstreamActions
      && MINI_KV_V68_DIGEST_MATRIX.digestPlaceholdersRequireOperatorConfirmation,
    miniKvArchiveRootUsesC: MINI_KV_V68_DIGEST_MATRIX.archivePath === "c/68",
    preflightStepsDryRunOnly: preflightSteps.length === 6
      && preflightSteps.every((step) => (
        step.dryRunOnly
        && step.readOnly
        && !step.mutatesState
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
        && !step.executesRestore
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 9
      && forbiddenOperations.some((operation) => operation.operation === "Read production secret values from Node v168")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv LOAD, COMPACT, or SETNXEX")
      && forbiddenOperations.some((operation) => operation.operation === "Bypass Node v167 rollback execution preflight contract"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    readyForProductionEnvironmentPreflightChecklist: false,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): EnvironmentPreflightMessage[] {
  const blockers: EnvironmentPreflightMessage[] = [];
  addMessage(blockers, checks.previousPreflightReady, "PREVIOUS_PREFLIGHT_NOT_READY", "rollback-execution-preflight-contract", "Node v167 rollback execution preflight contract must be ready before environment preflight.");
  addMessage(blockers, checks.previousPreflightDoesNotAuthorizeRollback, "PREVIOUS_PREFLIGHT_AUTHORIZES_EXECUTION", "rollback-execution-preflight-contract", "Node v167 must not authorize rollback or production operations.");
  addMessage(blockers, checks.javaV59ContractReady, "JAVA_V59_SECRET_SOURCE_CONTRACT_NOT_READY", "java-v59-production-secret-source-contract", "Java v59 production secret source contract must be present.");
  addMessage(blockers, checks.javaContractVersionReady, "JAVA_SECRET_SOURCE_CONTRACT_VERSION_NOT_READY", "java-v59-production-secret-source-contract", "Java secret source contract version must match.");
  addMessage(blockers, checks.javaSecretSourceMetadataComplete, "JAVA_SECRET_SOURCE_METADATA_INCOMPLETE", "java-v59-production-secret-source-contract", "Java secret source metadata must include source type and owner.");
  addMessage(blockers, checks.javaRotationPolicyComplete, "JAVA_ROTATION_POLICY_INCOMPLETE", "java-v59-production-secret-source-contract", "Java secret rotation owner and review cadence must be present.");
  addMessage(blockers, checks.javaConfirmationFieldsComplete, "JAVA_SECRET_CONFIRMATIONS_INCOMPLETE", "java-v59-production-secret-source-contract", "Java secret source contract must list required confirmation fields.");
  addMessage(blockers, checks.javaSecretValuesClosed, "JAVA_SECRET_VALUES_EXPOSED", "java-v59-production-secret-source-contract", "Java secret source contract must not record secret values or names.");
  addMessage(blockers, checks.javaNodeConsumptionReadOnly, "JAVA_NODE_CONSUMPTION_NOT_READ_ONLY", "java-v59-production-secret-source-contract", "Java v59 must allow Node checklist rendering only.");
  addMessage(blockers, checks.javaProductionBoundaryClosed, "JAVA_PRODUCTION_BOUNDARY_OPEN", "java-v59-production-secret-source-contract", "Java v59 must not require production secrets/database or change order transaction semantics.");
  addMessage(blockers, checks.javaForbiddenOperationsComplete, "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", "java-v59-production-secret-source-contract", "Java v59 forbidden operations must be complete.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v59-production-secret-source-contract", "Java v59 archive must use c/59.");
  addMessage(blockers, checks.miniKvV68MatrixReady, "MINI_KV_V68_DIGEST_MATRIX_NOT_READY", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv v68 artifact digest compatibility matrix must be present.");
  addMessage(blockers, checks.miniKvMatrixVersionReady, "MINI_KV_DIGEST_MATRIX_VERSION_NOT_READY", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv digest matrix version must match.");
  addMessage(blockers, checks.miniKvReleaseMappingReady, "MINI_KV_RELEASE_MAPPING_NOT_READY", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv release mapping must identify v68 over v67.");
  addMessage(blockers, checks.miniKvDigestMatrixComplete, "MINI_KV_DIGEST_MATRIX_INCOMPLETE", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv digest matrix must include binary, WAL, Snapshot, and fixture digest evidence.");
  addMessage(blockers, checks.miniKvFixtureInputsComplete, "MINI_KV_FIXTURE_INPUTS_INCOMPLETE", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv digest matrix must list release and recovery fixture inputs.");
  addMessage(blockers, checks.miniKvCompatibilityChecksComplete, "MINI_KV_COMPATIBILITY_CHECKS_INCOMPLETE", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv compatibility checks must include binary/WAL/Snapshot/fixture reviews.");
  addMessage(blockers, checks.miniKvReadOnlySmokeComplete, "MINI_KV_READ_ONLY_SMOKE_INCOMPLETE", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv digest matrix smoke commands must remain read-only.");
  addMessage(blockers, checks.miniKvDangerousCommandsExplainedOnly, "MINI_KV_DANGEROUS_COMMANDS_NOT_EXPLAINED", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv dangerous commands must be explained through CHECKJSON only.");
  addMessage(blockers, checks.miniKvExecutionBoundariesClosed, "MINI_KV_EXECUTION_BOUNDARY_OPEN", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv digest matrix must not execute writes, admin commands, or restore.");
  addMessage(blockers, checks.miniKvOrderAuthorityClosed, "MINI_KV_ORDER_AUTHORITY_OPEN", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv v68 must not enter Java transaction authority.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v68-artifact-digest-compatibility-matrix", "mini-kv v68 archive must use c/68.");
  addMessage(blockers, checks.preflightStepsDryRunOnly, "PREFLIGHT_STEPS_NOT_DRY_RUN", "production-environment-preflight-checklist", "Environment preflight steps must remain read-only dry-run.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "production-environment-preflight-checklist", "Forbidden secret, database, restore, and bypass operations must be explicit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "production-environment-preflight-checklist", "Node v168 must not start Java or mini-kv.");
  addMessage(blockers, checks.noProductionSecretRead, "PRODUCTION_SECRET_READ_ATTEMPTED", "production-environment-preflight-checklist", "Node v168 must not read production secret values.");
  addMessage(blockers, checks.noProductionDatabaseConnection, "PRODUCTION_DATABASE_CONNECTION_ATTEMPTED", "production-environment-preflight-checklist", "Node v168 must not connect to production database.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "production-environment-preflight-checklist", "Node v168 must not authorize production rollback.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "production-environment-preflight-checklist", "Node v168 must not authorize production operations.");
  return blockers;
}

function collectWarnings(checklistState: EnvironmentPreflightState): EnvironmentPreflightMessage[] {
  return [
    {
      code: checklistState === "blocked" ? "ENVIRONMENT_PREFLIGHT_BLOCKED" : "ENVIRONMENT_PREFLIGHT_READY",
      severity: "warning",
      source: "production-environment-preflight-checklist",
      message: checklistState === "blocked"
        ? "Production environment preflight checklist has blockers."
        : "Production environment preflight checklist is ready for manual environment review only.",
    },
    {
      code: "SECRET_SOURCE_IS_NOT_SECRET_VALUE_ACCESS",
      severity: "warning",
      source: "java-v59-production-secret-source-contract",
      message: "Java secret source evidence records source ownership and rotation boundaries, but Node still cannot read secret values.",
    },
    {
      code: "DIGEST_MATRIX_IS_NOT_RESTORE_EXECUTION",
      severity: "warning",
      source: "mini-kv-v68-artifact-digest-compatibility-matrix",
      message: "mini-kv digest compatibility evidence records artifact review fields, but Node still cannot execute restore commands.",
    },
  ];
}

function collectRecommendations(checklistState: EnvironmentPreflightState): EnvironmentPreflightMessage[] {
  return [
    {
      code: checklistState === "blocked"
        ? "FIX_ENVIRONMENT_PREFLIGHT_BLOCKERS"
        : "PROCEED_TO_POST_V166_READINESS_SUMMARY",
      severity: "recommendation",
      source: "production-environment-preflight-checklist",
      message: checklistState === "blocked"
        ? "Fix production environment preflight blockers before stage summary."
        : "Proceed to Node v169 post-v166 readiness summary after v168 remains clean.",
    },
  ];
}

function addMessage(
  messages: EnvironmentPreflightMessage[],
  condition: boolean | undefined,
  code: string,
  source: EnvironmentPreflightMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, Boolean(condition), code, source, message);
}

function renderStep(step: EnvironmentPreflightStep): string[] {
  return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
    identityLabel: "Source",
    identityKey: "source",
    booleanFields: [
      ["Dry run only", "dryRunOnly"],
      ["Read only", "readOnly"],
      ["Mutates state", "mutatesState"],
      ["Reads secret values", "readsSecretValues"],
      ["Connects production database", "connectsProductionDatabase"],
      ["Executes restore", "executesRestore"],
    ],
  });
}

function renderForbiddenOperation(operation: ForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestChecklist(value: unknown): string {
  return digestReleaseReport(value);
}
