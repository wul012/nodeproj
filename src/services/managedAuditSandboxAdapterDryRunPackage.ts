import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";

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
  loadManagedAuditSandboxAdapterDryRunPlan,
  type ManagedAuditSandboxAdapterDryRunPlanProfile,
} from "./managedAuditSandboxAdapterDryRunPlan.js";

export interface ManagedAuditSandboxAdapterDryRunPackageProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1";
  packageState: "sandbox-adapter-dry-run-package-ready" | "blocked";
  readyForManagedAuditSandboxAdapterDryRunPackage: boolean;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyPackage: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  storesManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  localDryRunWritePerformed: false;
  automaticUpstreamStart: false;
  sourceNodeV224: {
    sourceVersion: "Node v224";
    profileVersion: ManagedAuditSandboxAdapterDryRunPlanProfile["profileVersion"];
    planState: ManagedAuditSandboxAdapterDryRunPlanProfile["planState"];
    planDigest: string;
    readyForDryRunPlan: boolean;
    readyForDryRunPackageBeforeV225: false;
    qualityGatesExported: boolean;
  };
  upstreamGuards: {
    javaV82: JavaV82SandboxAdapterGuardReference;
    miniKvSandboxGuard: MiniKvSandboxAdapterGuardReference;
  };
  packagePlan: SandboxAdapterDryRunPackagePlan;
  archivedEvidence: {
    files: PackageEvidenceFile[];
    snippetMatches: PackageSnippetMatch[];
    expectedSnippetCount: number;
    matchedSnippetCount: number;
  };
  checks: SandboxAdapterDryRunPackageChecks;
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    snippetMatchCount: number;
    requiredEvidenceCount: number;
    packageStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SandboxAdapterDryRunPackageMessage[];
  warnings: SandboxAdapterDryRunPackageMessage[];
  recommendations: SandboxAdapterDryRunPackageMessage[];
  evidenceEndpoints: {
    sandboxAdapterDryRunPackageJson: string;
    sandboxAdapterDryRunPackageMarkdown: string;
    sourceNodeV224Json: string;
    javaV82Runbook: string;
    miniKvRuntimeSmokeEvidence: string;
    miniKvVerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV82SandboxAdapterGuardReference {
  sourceVersion: "Java v82";
  currentHeadVersionHint: "Java v85";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-adapter-approval-schema-guard-receipt.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v16";
  consumedByNodeSandboxPlanVersion: "Node v224";
  nextNodePackageVersion: "Node v225";
  readyForNodeV225SandboxAdapterDryRunPackage: boolean;
  ownerApprovalArtifactRequired: true;
  ownerApprovalArtifactProvidedByJava: false;
  schemaMigrationRehearsalRequired: true;
  schemaMigrationSqlExecutedByJava: false;
  sandboxCredentialHandleRequired: true;
  sandboxCredentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  credentialValueReadByJava: false;
  externalManagedAuditConnectionOpened: false;
  javaManagedAuditStoreWritten: false;
  javaSqlExecuted: false;
  builderOrHelperSplitApplied: true;
  longBooleanConstructorAvoided: true;
  receiptFieldsGroupedByBoundary: true;
  opsEvidenceServiceOnlyWiresReceipt: true;
  readyForProductionAudit: false;
}

interface MiniKvSandboxAdapterGuardReference {
  sourceVersion: "mini-kv v91";
  currentReleaseVersion: string;
  currentProjectVersion: string;
  receiptConsumer: string;
  consumedByNodeSandboxPlanVersion: "Node v224";
  consumedReleaseVersion: string;
  consumedArtifactPathHint: string;
  consumedReceiptDigest: string;
  currentArtifactPathHint: string;
  receiptDigest: string;
  runtimeRole: string;
  readOnly: boolean;
  executionAllowed: boolean;
  sandboxAdapterStorageBackend: boolean;
  participatesInSandboxAdapter: boolean;
  credentialValueRequired: boolean;
  credentialValueReadAllowed: boolean;
  productionCredentialReadAllowed: boolean;
  schemaMigrationExecutionAllowed: boolean;
  sandboxManagedAuditStateWriteAllowed: boolean;
  writeHandlerChanged: boolean;
  adminHandlerChanged: boolean;
  restoreExecutionAllowed: boolean;
  loadRestoreCompactExecuted: boolean;
  managedAuditWriteExecuted: boolean;
  sandboxDryRunRecordsWritten: boolean;
  orderAuthoritative: boolean;
  qualityChain: {
    v91RuntimeEvidenceHelperUsed: boolean;
    v92ManagedAuditReceiptFormatterSplit: boolean;
    v93RuntimeEvidenceReceiptFormatterSplit: boolean;
    v94CommandFormatterSplit: boolean;
    v95StringUtilsSharedSplit: boolean;
  };
}

interface SandboxAdapterDryRunPackagePlan {
  packageDigest: string;
  evidenceSpan: "Node v224 + Java v82 + mini-kv v91/v96";
  packageMode: "sandbox-dry-run-package-only";
  sandboxOnly: true;
  packageReadyButConnectionStillBlocked: true;
  ownerApprovalArtifactRequired: true;
  ownerApprovalArtifactProvidedByJava: false;
  credentialHandleRequired: true;
  credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE";
  credentialValueRequired: false;
  schemaMigrationRehearsalRequired: true;
  schemaMigrationExecutionAllowed: false;
  externalConnectionExecutionAllowed: false;
  managedAuditWriteAllowed: false;
  miniKvStorageBackendAllowed: false;
  javaApprovalLedgerWriteAllowed: false;
  externalServiceStartAllowed: false;
  requiredEvidence: string[];
  packageSteps: string[];
  forbiddenOperations: string[];
}

interface PackageEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface PackageSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

type SandboxAdapterDryRunPackageChecks = {
  nodeV224PlanReady: boolean;
  nodeV224StillReadOnly: boolean;
  javaV82EvidencePresent: boolean;
  javaV82ReceiptAccepted: boolean;
  javaV82QualityGateAccepted: boolean;
  javaV82NoWriteNoCredentialNoSqlBoundaryValid: boolean;
  miniKvRuntimeEvidencePresent: boolean;
  miniKvSandboxReceiptAccepted: boolean;
  miniKvNonParticipationBoundaryValid: boolean;
  miniKvQualityChainAccepted: boolean;
  packageEvidenceComplete: boolean;
  packageStillConnectionBlocked: boolean;
  credentialValueStillForbidden: boolean;
  schemaMigrationStillBlocked: boolean;
  managedAuditWritesStillBlocked: boolean;
  automaticServiceStartStillBlocked: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditSandboxAdapterDryRunPackage: boolean;
};

interface SandboxAdapterDryRunPackageMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-sandbox-adapter-dry-run-package"
    | "node-v224-sandbox-plan"
    | "java-v82-sandbox-guard"
    | "mini-kv-sandbox-guard"
    | "runtime-config";
  message: string;
}

const JAVA_V82_RUNBOOK = "D:/javaproj/advanced-order-platform/c/82/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V82_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/86-version-82-release-approval-managed-audit-sandbox-adapter-approval-schema-guard-receipt.md";
const JAVA_V82_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder.java";
const MINI_KV_V91_RUNBOOK = "D:/C/mini-kv/c/91/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V91_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/147-version-91-sandbox-adapter-runtime-evidence-guard.md";
const MINI_KV_V92_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/148-version-92-managed-audit-receipt-formatter-split.md";
const MINI_KV_V93_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/149-version-93-runtime-evidence-receipt-formatter-split.md";
const MINI_KV_V95_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/151-version-95-string-utils-and-version-sweep.md";
const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  sandboxAdapterDryRunPackageJson: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package",
  sandboxAdapterDryRunPackageMarkdown: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package?format=markdown",
  sourceNodeV224Json: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
  javaV82Runbook: JAVA_V82_RUNBOOK,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
});

export function loadManagedAuditSandboxAdapterDryRunPackage(input: {
  config: AppConfig;
}): ManagedAuditSandboxAdapterDryRunPackageProfile {
  const nodeV224 = loadManagedAuditSandboxAdapterDryRunPlan({ config: input.config });
  const files = createEvidenceFiles();
  const snippets = createSnippetMatches();
  const miniKvEvidence = readMiniKvRuntimeSmokeEvidence();
  const javaV82 = createJavaV82Reference(snippets);
  const miniKvGuard = createMiniKvGuardReference(miniKvEvidence, snippets);
  const checks = createChecks(input.config, nodeV224, files, snippets, javaV82, miniKvGuard);
  checks.readyForManagedAuditSandboxAdapterDryRunPackage = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditSandboxAdapterDryRunPackage")
    .every(([, value]) => value);
  const packageState = checks.readyForManagedAuditSandboxAdapterDryRunPackage
    ? "sandbox-adapter-dry-run-package-ready"
    : "blocked";
  const packagePlan = createPackagePlan(nodeV224, javaV82, miniKvGuard, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit sandbox adapter dry-run package",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
    packageState,
    readyForManagedAuditSandboxAdapterDryRunPackage: checks.readyForManagedAuditSandboxAdapterDryRunPackage,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyPackage: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    localDryRunWritePerformed: false,
    automaticUpstreamStart: false,
    sourceNodeV224: {
      sourceVersion: "Node v224",
      profileVersion: nodeV224.profileVersion,
      planState: nodeV224.planState,
      planDigest: nodeV224.sandboxPlan.planDigest,
      readyForDryRunPlan: nodeV224.readyForManagedAuditSandboxAdapterDryRunPlan,
      readyForDryRunPackageBeforeV225: false,
      qualityGatesExported: nodeV224.qualityGates.gatesAreHardAcceptanceCriteria,
    },
    upstreamGuards: {
      javaV82,
      miniKvSandboxGuard: miniKvGuard,
    },
    packagePlan,
    archivedEvidence: {
      files,
      snippetMatches: snippets,
      expectedSnippetCount: snippets.length,
      matchedSnippetCount: snippets.filter((snippetMatch) => snippetMatch.matched).length,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: files.length,
      snippetMatchCount: snippets.filter((snippetMatch) => snippetMatch.matched).length,
      requiredEvidenceCount: packagePlan.requiredEvidence.length,
      packageStepCount: packagePlan.packageSteps.length,
      forbiddenOperationCount: packagePlan.forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep Node v225 as a sandbox package only; do not open an external managed audit connection from this profile.",
      "Use a later version for a sandbox adapter connection runbook after operator supplies an owner artifact and credential handle.",
      "Continue treating Java and mini-kv as read-only evidence providers unless a later plan explicitly asks for a manual sandbox window.",
    ],
  };
}

export function renderManagedAuditSandboxAdapterDryRunPackageMarkdown(
  profile: ManagedAuditSandboxAdapterDryRunPackageProfile,
): string {
  return [
    "# Managed audit sandbox adapter dry-run package",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Package state: ${profile.packageState}`,
    `- Ready for sandbox adapter dry-run package: ${profile.readyForManagedAuditSandboxAdapterDryRunPackage}`,
    `- Ready for sandbox adapter connection: ${profile.readyForManagedAuditSandboxAdapterConnection}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v224",
    "",
    ...renderEntries(profile.sourceNodeV224),
    "",
    "## Java v82 Guard",
    "",
    ...renderEntries(profile.upstreamGuards.javaV82),
    "",
    "## mini-kv Sandbox Guard",
    "",
    ...renderEntries(profile.upstreamGuards.miniKvSandboxGuard),
    "",
    "## Package Plan",
    "",
    ...renderEntries(profile.packagePlan),
    "",
    "## Evidence Files",
    "",
    ...profile.archivedEvidence.files.flatMap(renderEvidenceFile),
    "## Snippet Matches",
    "",
    ...profile.archivedEvidence.snippetMatches.flatMap(renderSnippet),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No sandbox adapter dry-run package blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No sandbox adapter dry-run package warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No sandbox adapter dry-run package recommendations."),
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

function createPackagePlan(
  nodeV224: ManagedAuditSandboxAdapterDryRunPlanProfile,
  javaV82: JavaV82SandboxAdapterGuardReference,
  miniKvGuard: MiniKvSandboxAdapterGuardReference,
  checks: SandboxAdapterDryRunPackageChecks,
): SandboxAdapterDryRunPackagePlan {
  const requiredEvidence = [
    "Node v224 sandbox adapter dry-run plan digest.",
    "Java v82 sandbox adapter approval/schema guard receipt.",
    "Java v82 builder/helper quality gate evidence.",
    "mini-kv v91 sandbox adapter non-participation receipt.",
    "mini-kv v92-v95 formatter and shared utility split quality chain, preserved by the current v96 runtime fixture.",
    "Sandbox credential handle name without credential value disclosure.",
    "Owner approval artifact requirement and schema rehearsal requirement.",
  ];
  const packageSteps = [
    "Verify Node v224 plan remains ready and read-only.",
    "Verify Java v82 guard keeps owner approval, schema rehearsal, and credential boundaries explicit.",
    "Verify mini-kv current runtime fixture preserves v91-origin sandbox non-participation evidence through v96 while keeping the v95 digest chain visible.",
    "Assemble a sandbox-only package digest without contacting external managed audit.",
    "Keep future connection and schema migration blocked until a separate manual sandbox runbook exists.",
  ];
  const forbiddenOperations = [
    "Read or print a production or sandbox credential value.",
    "Open an external managed audit connection.",
    "Execute schema migration SQL.",
    "Write Java approval ledger or managed audit state.",
    "Write sandbox dry-run records into mini-kv.",
    "Use mini-kv as sandbox audit storage backend.",
    "Start Java, mini-kv, or an external audit service automatically.",
    "Unlock a production audit or production operations window.",
  ];

  return {
    packageDigest: sha256StableJson({
      profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
      nodeV224PlanDigest: nodeV224.sandboxPlan.planDigest,
      javaV82ReceiptVersion: javaV82.receiptVersion,
      miniKvSandboxReceiptDigest: miniKvGuard.receiptDigest,
      checks,
      requiredEvidence,
      packageSteps,
      forbiddenOperations,
    }),
    evidenceSpan: "Node v224 + Java v82 + mini-kv v91/v96",
    packageMode: "sandbox-dry-run-package-only",
    sandboxOnly: true,
    packageReadyButConnectionStillBlocked: true,
    ownerApprovalArtifactRequired: true,
    ownerApprovalArtifactProvidedByJava: false,
    credentialHandleRequired: true,
    credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    credentialValueRequired: false,
    schemaMigrationRehearsalRequired: true,
    schemaMigrationExecutionAllowed: false,
    externalConnectionExecutionAllowed: false,
    managedAuditWriteAllowed: false,
    miniKvStorageBackendAllowed: false,
    javaApprovalLedgerWriteAllowed: false,
    externalServiceStartAllowed: false,
    requiredEvidence,
    packageSteps,
    forbiddenOperations,
  };
}

function createEvidenceFiles(): PackageEvidenceFile[] {
  return [
    evidenceFile("java-v82-runbook", JAVA_V82_RUNBOOK),
    evidenceFile("java-v82-walkthrough", JAVA_V82_WALKTHROUGH),
    evidenceFile("java-v82-builder", JAVA_V82_BUILDER),
    evidenceFile("mini-kv-v91-runbook", MINI_KV_V91_RUNBOOK),
    evidenceFile("mini-kv-v91-walkthrough", MINI_KV_V91_WALKTHROUGH),
    evidenceFile("mini-kv-v92-walkthrough", MINI_KV_V92_WALKTHROUGH),
    evidenceFile("mini-kv-v93-walkthrough", MINI_KV_V93_WALKTHROUGH),
    evidenceFile("mini-kv-v95-walkthrough", MINI_KV_V95_WALKTHROUGH),
    evidenceFile("mini-kv-runtime-smoke", MINI_KV_RUNTIME_SMOKE),
    evidenceFile("mini-kv-verification-manifest", MINI_KV_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): PackageSnippetMatch[] {
  return [
    snippet("java-v82-receipt", JAVA_V82_RUNBOOK, "managedAuditSandboxAdapterApprovalSchemaGuardReceipt"),
    snippet("java-v82-node-v225", JAVA_V82_RUNBOOK, "Node v225 sandbox adapter dry-run package"),
    snippet("java-v82-ready", JAVA_V82_RUNBOOK, "readyForNodeV225SandboxAdapterDryRunPackage=true"),
    snippet("java-v82-owner-required", JAVA_V82_RUNBOOK, "ownerApprovalArtifactRequired=true"),
    snippet("java-v82-schema-blocked", JAVA_V82_RUNBOOK, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v82-credential-blocked", JAVA_V82_RUNBOOK, "credentialValueReadByJava=false"),
    snippet("java-v82-quality-builder", JAVA_V82_WALKTHROUGH, "ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder"),
    snippet("java-v82-quality-grouped", JAVA_V82_WALKTHROUGH, "避免长 boolean constructor chain"),
    snippet("java-v82-source-builder", JAVA_V82_BUILDER, "qualityGateBoundary.builderOrHelperSplitApplied()"),
    snippet("mini-kv-v91-receipt", MINI_KV_V91_WALKTHROUGH, "managed_audit_sandbox_adapter_non_participation_receipt"),
    snippet("mini-kv-v91-helper", MINI_KV_V91_WALKTHROUGH, "runtime_evidence.cpp"),
    snippet("mini-kv-v91-not-storage", MINI_KV_V91_WALKTHROUGH, "不是 sandbox audit storage backend"),
    snippet("mini-kv-v92-split", MINI_KV_V92_WALKTHROUGH, "managed audit receipt JSON/digest 逻辑拆出来"),
    snippet("mini-kv-v93-split", MINI_KV_V93_WALKTHROUGH, "runtime evidence receipt formatter"),
    snippet("mini-kv-fixture-consumer", MINI_KV_RUNTIME_SMOKE, "\"consumer\":\"Node v225 managed audit sandbox adapter dry-run package\""),
    snippet("mini-kv-fixture-receipt", MINI_KV_RUNTIME_SMOKE, "\"managed_audit_sandbox_adapter_non_participation_receipt\""),
    snippet("mini-kv-fixture-current-v96", MINI_KV_RUNTIME_SMOKE, "\"release_version\":\"v96\""),
    snippet("mini-kv-fixture-digest", MINI_KV_RUNTIME_SMOKE, "\"receipt_digest\":\"fnv1a64:e3693d38283c37e2\""),
    snippet("mini-kv-fixture-not-storage", MINI_KV_RUNTIME_SMOKE, "\"sandbox_adapter_storage_backend\":false"),
    snippet("mini-kv-fixture-no-credential", MINI_KV_RUNTIME_SMOKE, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-fixture-no-write", MINI_KV_RUNTIME_SMOKE, "\"sandbox_managed_audit_state_write_allowed\":false"),
    snippet("mini-kv-v95-string-utils", MINI_KV_V95_WALKTHROUGH, "include/minikv/string_utils.hpp"),
    snippet("mini-kv-v95-command-bounded", MINI_KV_V95_WALKTHROUGH, "`src/command.cpp` 557"),
  ];
}

function createJavaV82Reference(snippets: PackageSnippetMatch[]): JavaV82SandboxAdapterGuardReference {
  return {
    sourceVersion: "Java v82",
    currentHeadVersionHint: "Java v85",
    receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-adapter-approval-schema-guard-receipt.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v16",
    consumedByNodeSandboxPlanVersion: "Node v224",
    nextNodePackageVersion: "Node v225",
    readyForNodeV225SandboxAdapterDryRunPackage: snippetMatched(snippets, "java-v82-ready"),
    ownerApprovalArtifactRequired: true,
    ownerApprovalArtifactProvidedByJava: false,
    schemaMigrationRehearsalRequired: true,
    schemaMigrationSqlExecutedByJava: false,
    sandboxCredentialHandleRequired: true,
    sandboxCredentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    credentialValueReadByJava: false,
    externalManagedAuditConnectionOpened: false,
    javaManagedAuditStoreWritten: false,
    javaSqlExecuted: false,
    builderOrHelperSplitApplied: true,
    longBooleanConstructorAvoided: true,
    receiptFieldsGroupedByBoundary: true,
    opsEvidenceServiceOnlyWiresReceipt: true,
    readyForProductionAudit: false,
  };
}

function createMiniKvGuardReference(
  evidence: MiniKvRuntimeSmokeEvidence,
  snippets: PackageSnippetMatch[],
): MiniKvSandboxAdapterGuardReference {
  const receipt = evidence.managed_audit_sandbox_adapter_non_participation_receipt ?? {};
  return {
    sourceVersion: "mini-kv v91",
    currentReleaseVersion: stringField(evidence, "release_version") ?? "missing",
    currentProjectVersion: stringField(evidence, "project_version") ?? "missing",
    receiptConsumer: stringField(receipt, "consumer") ?? "missing",
    consumedByNodeSandboxPlanVersion: "Node v224",
    consumedReleaseVersion: stringField(receipt, "consumed_release_version") ?? "missing",
    consumedArtifactPathHint: stringField(receipt, "consumed_artifact_path_hint") ?? "missing",
    consumedReceiptDigest: stringField(receipt, "consumed_receipt_digest") ?? "missing",
    currentArtifactPathHint: stringField(receipt, "current_artifact_path_hint") ?? "missing",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    runtimeRole: stringField(receipt, "runtime_role") ?? "missing",
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    sandboxAdapterStorageBackend: booleanField(receipt, "sandbox_adapter_storage_backend") ?? true,
    participatesInSandboxAdapter: booleanField(receipt, "participates_in_sandbox_adapter") ?? true,
    credentialValueRequired: booleanField(receipt, "credential_value_required") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    productionCredentialReadAllowed: booleanField(receipt, "production_credential_read_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(receipt, "sandbox_managed_audit_state_write_allowed") ?? true,
    writeHandlerChanged: booleanField(receipt, "write_handler_changed") ?? true,
    adminHandlerChanged: booleanField(receipt, "admin_handler_changed") ?? true,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed") ?? true,
    sandboxDryRunRecordsWritten: booleanField(receipt, "sandbox_dry_run_records_written") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    qualityChain: {
      v91RuntimeEvidenceHelperUsed: snippetMatched(snippets, "mini-kv-v91-helper"),
      v92ManagedAuditReceiptFormatterSplit: snippetMatched(snippets, "mini-kv-v92-split"),
      v93RuntimeEvidenceReceiptFormatterSplit: snippetMatched(snippets, "mini-kv-v93-split"),
      v94CommandFormatterSplit: snippetMatched(snippets, "mini-kv-v95-command-bounded")
        && JSON.stringify(evidence).includes("command response formatter module split"),
      v95StringUtilsSharedSplit: ["v95", "v96"].includes(stringField(evidence, "release_version") ?? "")
        && snippetMatched(snippets, "mini-kv-v95-string-utils"),
    },
  };
}

function createChecks(
  config: AppConfig,
  nodeV224: ManagedAuditSandboxAdapterDryRunPlanProfile,
  files: PackageEvidenceFile[],
  snippets: PackageSnippetMatch[],
  javaV82: JavaV82SandboxAdapterGuardReference,
  miniKvGuard: MiniKvSandboxAdapterGuardReference,
): SandboxAdapterDryRunPackageChecks {
  return {
    nodeV224PlanReady: nodeV224.readyForManagedAuditSandboxAdapterDryRunPlan
      && nodeV224.planState === "sandbox-adapter-dry-run-plan-ready",
    nodeV224StillReadOnly: nodeV224.readOnlyPlan
      && !nodeV224.connectsManagedAudit
      && !nodeV224.readsManagedAuditCredential
      && !nodeV224.schemaMigrationExecuted,
    javaV82EvidencePresent: fileById(files, "java-v82-runbook").exists
      && fileById(files, "java-v82-walkthrough").exists
      && fileById(files, "java-v82-builder").exists,
    javaV82ReceiptAccepted: javaV82.readyForNodeV225SandboxAdapterDryRunPackage
      && snippetMatched(snippets, "java-v82-receipt")
      && snippetMatched(snippets, "java-v82-node-v225"),
    javaV82QualityGateAccepted: javaV82.builderOrHelperSplitApplied
      && javaV82.longBooleanConstructorAvoided
      && javaV82.receiptFieldsGroupedByBoundary
      && javaV82.opsEvidenceServiceOnlyWiresReceipt
      && snippetMatched(snippets, "java-v82-quality-builder")
      && snippetMatched(snippets, "java-v82-source-builder"),
    javaV82NoWriteNoCredentialNoSqlBoundaryValid: !javaV82.ownerApprovalArtifactProvidedByJava
      && !javaV82.schemaMigrationSqlExecutedByJava
      && !javaV82.credentialValueReadByJava
      && !javaV82.externalManagedAuditConnectionOpened
      && !javaV82.javaManagedAuditStoreWritten
      && !javaV82.javaSqlExecuted,
    miniKvRuntimeEvidencePresent: fileById(files, "mini-kv-runtime-smoke").exists
      && fileById(files, "mini-kv-verification-manifest").exists,
    miniKvSandboxReceiptAccepted: miniKvGuard.currentReleaseVersion === "v96"
      && miniKvGuard.consumedReleaseVersion === "v90"
      && miniKvGuard.consumedReceiptDigest === "fnv1a64:0dfb07cd2f8de289"
      && miniKvGuard.currentArtifactPathHint === "c/96/"
      && miniKvGuard.receiptDigest === "fnv1a64:e3693d38283c37e2"
      && snippetMatched(snippets, "mini-kv-fixture-consumer"),
    miniKvNonParticipationBoundaryValid: miniKvGuard.readOnly
      && !miniKvGuard.executionAllowed
      && !miniKvGuard.sandboxAdapterStorageBackend
      && !miniKvGuard.participatesInSandboxAdapter
      && !miniKvGuard.credentialValueRequired
      && !miniKvGuard.credentialValueReadAllowed
      && !miniKvGuard.productionCredentialReadAllowed
      && !miniKvGuard.schemaMigrationExecutionAllowed
      && !miniKvGuard.sandboxManagedAuditStateWriteAllowed
      && !miniKvGuard.restoreExecutionAllowed
      && !miniKvGuard.loadRestoreCompactExecuted
      && !miniKvGuard.managedAuditWriteExecuted
      && !miniKvGuard.sandboxDryRunRecordsWritten
      && !miniKvGuard.orderAuthoritative,
    miniKvQualityChainAccepted: miniKvGuard.qualityChain.v91RuntimeEvidenceHelperUsed
      && miniKvGuard.qualityChain.v92ManagedAuditReceiptFormatterSplit
      && miniKvGuard.qualityChain.v93RuntimeEvidenceReceiptFormatterSplit
      && miniKvGuard.qualityChain.v94CommandFormatterSplit
      && miniKvGuard.qualityChain.v95StringUtilsSharedSplit,
    packageEvidenceComplete: snippetMatched(snippets, "mini-kv-fixture-digest")
      && snippetMatched(snippets, "mini-kv-fixture-not-storage")
      && snippetMatched(snippets, "mini-kv-fixture-no-credential")
      && snippetMatched(snippets, "mini-kv-fixture-no-write"),
    packageStillConnectionBlocked: true,
    credentialValueStillForbidden: true,
    schemaMigrationStillBlocked: true,
    managedAuditWritesStillBlocked: true,
    automaticServiceStartStillBlocked: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditSandboxAdapterDryRunPackage: false,
  };
}

function collectProductionBlockers(
  checks: SandboxAdapterDryRunPackageChecks,
): SandboxAdapterDryRunPackageMessage[] {
  const blockers: SandboxAdapterDryRunPackageMessage[] = [];
  addBlocker(blockers, checks.nodeV224PlanReady, "NODE_V224_PLAN_NOT_READY", "node-v224-sandbox-plan", "Node v224 sandbox adapter plan must be ready before v225.");
  addBlocker(blockers, checks.javaV82EvidencePresent, "JAVA_V82_EVIDENCE_MISSING", "java-v82-sandbox-guard", "Java v82 sandbox guard evidence must be present.");
  addBlocker(blockers, checks.javaV82ReceiptAccepted, "JAVA_V82_RECEIPT_NOT_ACCEPTED", "java-v82-sandbox-guard", "Java v82 must expose a Node v225-ready sandbox guard receipt.");
  addBlocker(blockers, checks.javaV82QualityGateAccepted, "JAVA_V82_QUALITY_GATE_NOT_ACCEPTED", "java-v82-sandbox-guard", "Java v82 must prove builder/helper split and grouped receipt fields.");
  addBlocker(blockers, checks.miniKvSandboxReceiptAccepted, "MINIKV_SANDBOX_RECEIPT_NOT_ACCEPTED", "mini-kv-sandbox-guard", "mini-kv current runtime evidence must preserve the v91 sandbox non-participation receipt for Node v225.");
  addBlocker(blockers, checks.miniKvNonParticipationBoundaryValid, "MINIKV_SANDBOX_BOUNDARY_INVALID", "mini-kv-sandbox-guard", "mini-kv must not be sandbox audit storage, read credentials, or write managed audit state.");
  addBlocker(blockers, checks.miniKvQualityChainAccepted, "MINIKV_QUALITY_CHAIN_NOT_ACCEPTED", "mini-kv-sandbox-guard", "mini-kv v91-v95 quality split evidence must be present.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addBlocker(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-sandbox-adapter-dry-run-package", "v225 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): SandboxAdapterDryRunPackageMessage[] {
  return [
    {
      code: "PACKAGE_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-sandbox-adapter-dry-run-package",
      message: "This package proves sandbox prerequisites only; it does not connect to external managed audit.",
    },
    {
      code: "MINIKV_CURRENT_FIXTURE_ADVANCED_TO_V96",
      severity: "warning",
      source: "mini-kv-sandbox-guard",
      message: "mini-kv v91 evidence is consumed through the current v96 runtime smoke fixture, which preserves the v90-origin sandbox receipt and keeps the v95 shared string utility split evidence visible.",
    },
  ];
}

function collectRecommendations(): SandboxAdapterDryRunPackageMessage[] {
  return [
    {
      code: "PREPARE_MANUAL_SANDBOX_CONNECTION_RUNBOOK",
      severity: "recommendation",
      source: "managed-audit-sandbox-adapter-dry-run-package",
      message: "A later version should define a manual sandbox connection runbook before any actual adapter connection attempt.",
    },
    {
      code: "KEEP_CREDENTIAL_VALUES_OUT_OF_ARCHIVES",
      severity: "recommendation",
      source: "managed-audit-sandbox-adapter-dry-run-package",
      message: "Continue recording credential handle and review status only; do not archive credential values.",
    },
  ];
}

interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  managed_audit_sandbox_adapter_non_participation_receipt?: Record<string, unknown>;
}

function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  if (!existsSync(MINI_KV_RUNTIME_SMOKE)) {
    return {};
  }
  return JSON.parse(readFileSync(MINI_KV_RUNTIME_SMOKE, "utf8")) as MiniKvRuntimeSmokeEvidence;
}

function evidenceFile(id: string, filePath: string): PackageEvidenceFile {
  if (!existsSync(filePath)) {
    return { id, path: filePath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readFileSync(filePath);
  return {
    id,
    path: filePath,
    exists: true,
    sizeBytes: statSync(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): PackageSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function renderEvidenceFile(file: PackageEvidenceFile): string[] {
  return [
    `### ${file.id}`,
    "",
    `- Path: ${file.path}`,
    `- Exists: ${file.exists}`,
    `- Size bytes: ${file.sizeBytes}`,
    `- Digest: ${file.digest ?? "missing"}`,
    "",
  ];
}

function renderSnippet(snippetMatch: PackageSnippetMatch): string[] {
  return [
    `### ${snippetMatch.id}`,
    "",
    `- Path: ${snippetMatch.path}`,
    `- Matched: ${snippetMatch.matched}`,
    `- Expected text: ${snippetMatch.expectedText}`,
    "",
  ];
}

function fileById(files: PackageEvidenceFile[], id: string): PackageEvidenceFile {
  return files.find((file) => file.id === id) ?? {
    id,
    path: "",
    exists: false,
    sizeBytes: 0,
    digest: null,
  };
}

function snippetMatched(snippets: PackageSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function booleanField(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === "boolean" ? value : undefined;
}

function addBlocker(
  messages: SandboxAdapterDryRunPackageMessage[],
  condition: boolean,
  code: string,
  source: SandboxAdapterDryRunPackageMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
