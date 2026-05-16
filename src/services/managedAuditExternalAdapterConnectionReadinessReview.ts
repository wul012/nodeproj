import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

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
  loadManagedAuditLocalAdapterCandidateVerificationReport,
  type ManagedAuditLocalAdapterCandidateVerificationReportProfile,
} from "./managedAuditLocalAdapterCandidateVerificationReport.js";

export interface ManagedAuditExternalAdapterConnectionReadinessReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1";
  reviewState: "ready-for-external-adapter-connection-review" | "blocked";
  readyForManagedAuditExternalAdapterConnectionReadinessReview: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyReview: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  schemaMigrationExecuted: false;
  automaticUpstreamStart: false;
  sourceNodeV222: {
    sourceVersion: "Node v222";
    profileVersion: ManagedAuditLocalAdapterCandidateVerificationReportProfile["profileVersion"];
    reportState: ManagedAuditLocalAdapterCandidateVerificationReportProfile["reportState"];
    reportDigest: string;
    readyForVerificationReport: boolean;
    sourceEndpointRerunPerformed: false;
    additionalLocalDryRunWritePerformed: false;
  };
  upstreamGuards: {
    javaV81: JavaV81ExternalAdapterMigrationGuardReference;
    miniKvV90: MiniKvV90ExternalAdapterNonParticipationReference;
  };
  connectionReadiness: {
    readinessDigest: string;
    evidenceSpan: "Node v222 + Java v81 + mini-kv v90";
    ownerApprovalRequiredBeforeConnection: true;
    ownerApprovalPresent: false;
    schemaMigrationReviewRequired: true;
    schemaMigrationApproved: false;
    credentialReviewRequired: true;
    credentialApproved: false;
    credentialValueReadByNode: false;
    credentialValueReadByJava: false;
    externalManagedAuditConnectionOpened: false;
    externalManagedAuditSchemaMigrated: false;
    miniKvExternalAdapterStorageBackend: false;
    miniKvParticipatesInExternalAdapter: false;
    upstreamActionsEnabled: boolean;
    productionAuditAllowed: false;
  };
  archivedEvidence: {
    files: ReadinessEvidenceFile[];
    snippetMatches: ReadinessSnippetMatch[];
    expectedSnippetCount: number;
    matchedSnippetCount: number;
  };
  checks: {
    nodeV222VerificationReady: boolean;
    javaV81EvidencePresent: boolean;
    javaV81MigrationGuardAccepted: boolean;
    javaV81CredentialBoundaryValid: boolean;
    javaV81NoConnectionNoSqlBoundaryValid: boolean;
    miniKvV90RuntimeEvidencePresent: boolean;
    miniKvV90ReceiptAccepted: boolean;
    miniKvV90NonParticipationBoundaryValid: boolean;
    miniKvV90NoCredentialMigrationBoundaryValid: boolean;
    ownerApprovalStillRequired: boolean;
    schemaMigrationReviewStillRequired: boolean;
    credentialReviewStillRequired: boolean;
    realExternalAdapterStillDisconnected: boolean;
    credentialStillUnread: boolean;
    javaMiniKvWritesStillBlocked: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    productionWindowStillBlocked: boolean;
    readyForManagedAuditExternalAdapterConnectionReadinessReview: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    evidenceFileCount: number;
    snippetMatchCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadinessReviewMessage[];
  warnings: ReadinessReviewMessage[];
  recommendations: ReadinessReviewMessage[];
  evidenceEndpoints: {
    readinessReviewJson: string;
    readinessReviewMarkdown: string;
    sourceNodeV222Json: string;
    javaV81Runbook: string;
    miniKvV90RuntimeSmokeEvidence: string;
    miniKvV90VerificationManifest: string;
    activePlan: string;
  };
  nextActions: string[];
}

interface JavaV81ExternalAdapterMigrationGuardReference {
  sourceVersion: "Java v81";
  receiptVersion: "java-release-approval-rehearsal-managed-audit-external-adapter-migration-guard-receipt.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v15";
  consumedByNodeVerificationReportVersion: "Node v222";
  nextNodeReviewVersion: "Node v223";
  readyForNodeV223ExternalAdapterConnectionReadinessReview: true;
  ownerApprovalRequiredBeforeConnection: true;
  schemaMigrationReviewRequired: true;
  credentialReviewRequired: true;
  credentialValueReadByJava: false;
  credentialValueStoredByJava: false;
  externalManagedAuditConnectionOpened: false;
  externalManagedAuditSchemaMigrated: false;
  javaApprovalLedgerWritten: false;
  javaManagedAuditStoreWritten: false;
  javaSqlExecuted: false;
  readyForProductionAudit: false;
}

interface MiniKvV90ExternalAdapterNonParticipationReference {
  sourceVersion: "mini-kv v90";
  projectVersion: "0.90.0";
  receiptVersion: "mini-kv-managed-audit-external-adapter-non-participation-receipt.v1";
  consumer: "Node v223 managed audit external adapter connection readiness review";
  consumedReleaseVersion: string;
  consumedReceiptDigest: string;
  currentArtifactPathHint: string;
  receiptDigest: string;
  runtimeRole: string;
  externalAdapterStorageBackend: boolean;
  participatesInExternalAdapter: boolean;
  credentialReadAllowed: boolean;
  migrationExecutionAllowed: boolean;
  managedAuditWriteExecuted: boolean;
  localDryRunRecordsWritten: boolean;
  orderAuthoritative: boolean;
}

interface MiniKvV90ExternalAdapterNonParticipationEvidence {
  consumedReleaseVersion?: string;
  consumedReceiptDigest?: string;
  currentArtifactPathHint?: string;
  receiptDigest?: string;
  runtimeRole?: string;
  externalAdapterStorageBackend?: boolean;
  participatesInExternalAdapter?: boolean;
  credentialReadAllowed?: boolean;
  migrationExecutionAllowed?: boolean;
  managedAuditWriteExecuted?: boolean;
  localDryRunRecordsWritten?: boolean;
  orderAuthoritative?: boolean;
}

interface ReadinessEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface ReadinessSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

interface ReadinessReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-external-adapter-connection-readiness-review"
    | "node-v222-verification-report"
    | "java-v81-migration-guard"
    | "mini-kv-v90-non-participation"
    | "runtime-config";
  message: string;
}

const JAVA_V81_RUNBOOK = "D:/javaproj/advanced-order-platform/c/81/\u89e3\u91ca/\u8bf4\u660e.md";
const JAVA_V81_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/85-version-81-release-approval-managed-audit-external-adapter-migration-guard-receipt.md";
const MINI_KV_V90_RUNBOOK = "D:/C/mini-kv/c/90/\u89e3\u91ca/\u8bf4\u660e.md";
const MINI_KV_V90_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/146-version-90-external-adapter-non-participation-receipt.md";
const MINI_KV_V90_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";
const MINI_KV_V90_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

const ENDPOINTS = Object.freeze({
  readinessReviewJson: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
  readinessReviewMarkdown: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review?format=markdown",
  sourceNodeV222Json: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report",
  javaV81Runbook: JAVA_V81_RUNBOOK,
  miniKvV90RuntimeSmokeEvidence: MINI_KV_V90_RUNTIME_SMOKE,
  miniKvV90VerificationManifest: MINI_KV_V90_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v221-post-local-adapter-candidate-roadmap.md",
});

export function loadManagedAuditExternalAdapterConnectionReadinessReview(input: {
  config: AppConfig;
}): ManagedAuditExternalAdapterConnectionReadinessReviewProfile {
  const nodeV222 = loadManagedAuditLocalAdapterCandidateVerificationReport({ config: input.config });
  const files = createEvidenceFiles();
  const snippets = createSnippetMatches();
  const miniKvReceipt = readMiniKvV90Receipt();
  const javaV81 = createJavaV81Reference();
  const miniKvV90 = createMiniKvV90Reference(miniKvReceipt);
  const checks = createChecks(input.config, nodeV222, files, snippets, miniKvV90);
  checks.readyForManagedAuditExternalAdapterConnectionReadinessReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditExternalAdapterConnectionReadinessReview")
    .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditExternalAdapterConnectionReadinessReview
    ? "ready-for-external-adapter-connection-review"
    : "blocked";
  const readinessDigest = sha256StableJson({
    profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
    reviewState,
    nodeV222Digest: nodeV222.verification.reportDigest,
    javaV81ReceiptVersion: javaV81.receiptVersion,
    miniKvV90ReceiptDigest: miniKvV90.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit external adapter connection readiness review",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
    reviewState,
    readyForManagedAuditExternalAdapterConnectionReadinessReview:
      checks.readyForManagedAuditExternalAdapterConnectionReadinessReview,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReview: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV222: {
      sourceVersion: "Node v222",
      profileVersion: nodeV222.profileVersion,
      reportState: nodeV222.reportState,
      reportDigest: nodeV222.verification.reportDigest,
      readyForVerificationReport: nodeV222.readyForManagedAuditLocalAdapterCandidateVerificationReport,
      sourceEndpointRerunPerformed: false,
      additionalLocalDryRunWritePerformed: false,
    },
    upstreamGuards: {
      javaV81,
      miniKvV90,
    },
    connectionReadiness: {
      readinessDigest,
      evidenceSpan: "Node v222 + Java v81 + mini-kv v90",
      ownerApprovalRequiredBeforeConnection: true,
      ownerApprovalPresent: false,
      schemaMigrationReviewRequired: true,
      schemaMigrationApproved: false,
      credentialReviewRequired: true,
      credentialApproved: false,
      credentialValueReadByNode: false,
      credentialValueReadByJava: false,
      externalManagedAuditConnectionOpened: false,
      externalManagedAuditSchemaMigrated: false,
      miniKvExternalAdapterStorageBackend: false,
      miniKvParticipatesInExternalAdapter: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionAuditAllowed: false,
    },
    archivedEvidence: {
      files,
      snippetMatches: snippets,
      expectedSnippetCount: snippets.length,
      matchedSnippetCount: snippets.filter((snippet) => snippet.matched).length,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount: files.length,
      snippetMatchCount: snippets.filter((snippet) => snippet.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep Node v223 as a connection readiness review; do not connect to real managed audit yet.",
      "Prepare a sandbox credential and schema migration rehearsal before any external adapter connection dry-run.",
      "If Java v81 or mini-kv v90 guard evidence changes, regenerate this review before moving forward.",
    ],
  };
}

export function renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown(
  profile: ManagedAuditExternalAdapterConnectionReadinessReviewProfile,
): string {
  return [
    "# Managed audit external adapter connection readiness review",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Review state: ${profile.reviewState}`,
    `- Ready for connection readiness review: ${profile.readyForManagedAuditExternalAdapterConnectionReadinessReview}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Reads managed audit credential: ${profile.readsManagedAuditCredential}`,
    "",
    "## Source Node v222",
    "",
    ...renderEntries(profile.sourceNodeV222),
    "",
    "## Java v81 Guard",
    "",
    ...renderEntries(profile.upstreamGuards.javaV81),
    "",
    "## mini-kv v90 Guard",
    "",
    ...renderEntries(profile.upstreamGuards.miniKvV90),
    "",
    "## Connection Readiness",
    "",
    ...renderEntries(profile.connectionReadiness),
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
    ...renderMessages(profile.productionBlockers, "No external adapter connection readiness review blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No external adapter connection readiness review warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No external adapter connection readiness review recommendations."),
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

function createEvidenceFiles(): ReadinessEvidenceFile[] {
  return [
    evidenceFile("java-v81-runbook", JAVA_V81_RUNBOOK),
    evidenceFile("java-v81-walkthrough", JAVA_V81_WALKTHROUGH),
    evidenceFile("mini-kv-v90-runbook", MINI_KV_V90_RUNBOOK),
    evidenceFile("mini-kv-v90-walkthrough", MINI_KV_V90_WALKTHROUGH),
    evidenceFile("mini-kv-v90-runtime-smoke", MINI_KV_V90_RUNTIME_SMOKE),
    evidenceFile("mini-kv-v90-verification-manifest", MINI_KV_V90_VERIFICATION_MANIFEST),
  ];
}

function createSnippetMatches(): ReadinessSnippetMatch[] {
  return [
    snippet("java-v81-receipt", JAVA_V81_RUNBOOK, "managedAuditExternalAdapterMigrationGuardReceipt"),
    snippet("java-v81-node-v223", JAVA_V81_RUNBOOK, "Node v223 external adapter connection readiness review"),
    snippet("java-v81-owner-review", JAVA_V81_RUNBOOK, "ownerApprovalRequiredBeforeConnection=true"),
    snippet("java-v81-schema-review", JAVA_V81_RUNBOOK, "schemaMigrationReviewRequired=true"),
    snippet("java-v81-credential-review", JAVA_V81_RUNBOOK, "credentialReviewRequired=true"),
    snippet("java-v81-no-credential-read", JAVA_V81_RUNBOOK, "credentialValueReadByJava=false"),
    snippet("java-v81-no-connection", JAVA_V81_RUNBOOK, "externalManagedAuditConnectionOpened=false"),
    snippet("java-v81-no-sql", JAVA_V81_RUNBOOK, "javaSqlExecuted=false"),
    snippet("java-v81-builder-split", JAVA_V81_WALKTHROUGH, "ReleaseApprovalManagedAuditExternalAdapterMigrationGuardReceiptBuilder"),
    snippet("java-v81-ready-condition", JAVA_V81_WALKTHROUGH, "readyForNodeV223ExternalAdapterConnectionReadinessReview"),
    snippet("mini-kv-v90-receipt", MINI_KV_V90_WALKTHROUGH, "managed_audit_external_adapter_non_participation_receipt"),
    snippet("mini-kv-v90-digest", MINI_KV_V90_WALKTHROUGH, "receipt_digest=fnv1a64:0dfb07cd2f8de289"),
    snippet("mini-kv-v90-no-storage", MINI_KV_V90_RUNBOOK, "external_adapter_storage_backend=false"),
    snippet("mini-kv-v90-no-participation", MINI_KV_V90_RUNBOOK, "participates_in_external_adapter=false"),
    snippet("mini-kv-v90-no-credential", MINI_KV_V90_RUNBOOK, "credential_read_allowed=false"),
    snippet("mini-kv-v90-no-migration", MINI_KV_V90_RUNBOOK, "migration_execution_allowed=false"),
    snippet("mini-kv-v90-node-v223-fixture", MINI_KV_V90_RUNTIME_SMOKE, "Node v223 managed audit external adapter connection readiness review"),
    snippet("mini-kv-v90-fixture-digest", MINI_KV_V90_RUNTIME_SMOKE, "\"receipt_digest\":\"fnv1a64:0dfb07cd2f8de289\""),
  ];
}

function createChecks(
  config: AppConfig,
  nodeV222: ManagedAuditLocalAdapterCandidateVerificationReportProfile,
  files: ReadinessEvidenceFile[],
  snippets: ReadinessSnippetMatch[],
  miniKvV90: MiniKvV90ExternalAdapterNonParticipationReference,
): ManagedAuditExternalAdapterConnectionReadinessReviewProfile["checks"] {
  return {
    nodeV222VerificationReady: nodeV222.readyForManagedAuditLocalAdapterCandidateVerificationReport
      && nodeV222.reportState === "local-adapter-candidate-verification-ready"
      && !nodeV222.sourceEndpointRerunPerformed
      && !nodeV222.additionalLocalDryRunWritePerformed,
    javaV81EvidencePresent: fileById(files, "java-v81-runbook").exists
      && fileById(files, "java-v81-walkthrough").exists,
    javaV81MigrationGuardAccepted: snippetMatched(snippets, "java-v81-receipt")
      && snippetMatched(snippets, "java-v81-node-v223")
      && snippetMatched(snippets, "java-v81-ready-condition"),
    javaV81CredentialBoundaryValid: snippetMatched(snippets, "java-v81-credential-review")
      && snippetMatched(snippets, "java-v81-no-credential-read"),
    javaV81NoConnectionNoSqlBoundaryValid: snippetMatched(snippets, "java-v81-no-connection")
      && snippetMatched(snippets, "java-v81-no-sql"),
    miniKvV90RuntimeEvidencePresent: fileById(files, "mini-kv-v90-runtime-smoke").exists
      && fileById(files, "mini-kv-v90-verification-manifest").exists,
    miniKvV90ReceiptAccepted: miniKvV90.receiptDigest === "fnv1a64:0dfb07cd2f8de289"
      && miniKvV90.consumedReceiptDigest === "fnv1a64:76411286a0913dc8"
      && snippetMatched(snippets, "mini-kv-v90-receipt"),
    miniKvV90NonParticipationBoundaryValid: !miniKvV90.externalAdapterStorageBackend
      && !miniKvV90.participatesInExternalAdapter
      && snippetMatched(snippets, "mini-kv-v90-no-storage")
      && snippetMatched(snippets, "mini-kv-v90-no-participation"),
    miniKvV90NoCredentialMigrationBoundaryValid: !miniKvV90.credentialReadAllowed
      && !miniKvV90.migrationExecutionAllowed
      && snippetMatched(snippets, "mini-kv-v90-no-credential")
      && snippetMatched(snippets, "mini-kv-v90-no-migration"),
    ownerApprovalStillRequired: snippetMatched(snippets, "java-v81-owner-review"),
    schemaMigrationReviewStillRequired: snippetMatched(snippets, "java-v81-schema-review"),
    credentialReviewStillRequired: snippetMatched(snippets, "java-v81-credential-review"),
    realExternalAdapterStillDisconnected: true,
    credentialStillUnread: true,
    javaMiniKvWritesStillBlocked: !miniKvV90.managedAuditWriteExecuted
      && !miniKvV90.localDryRunRecordsWritten
      && !miniKvV90.orderAuthoritative,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditExternalAdapterConnectionReadinessReview: false,
  };
}

function createJavaV81Reference(): JavaV81ExternalAdapterMigrationGuardReference {
  return {
    sourceVersion: "Java v81",
    receiptVersion: "java-release-approval-rehearsal-managed-audit-external-adapter-migration-guard-receipt.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v15",
    consumedByNodeVerificationReportVersion: "Node v222",
    nextNodeReviewVersion: "Node v223",
    readyForNodeV223ExternalAdapterConnectionReadinessReview: true,
    ownerApprovalRequiredBeforeConnection: true,
    schemaMigrationReviewRequired: true,
    credentialReviewRequired: true,
    credentialValueReadByJava: false,
    credentialValueStoredByJava: false,
    externalManagedAuditConnectionOpened: false,
    externalManagedAuditSchemaMigrated: false,
    javaApprovalLedgerWritten: false,
    javaManagedAuditStoreWritten: false,
    javaSqlExecuted: false,
    readyForProductionAudit: false,
  };
}

function createMiniKvV90Reference(
  receipt: MiniKvV90ExternalAdapterNonParticipationEvidence,
): MiniKvV90ExternalAdapterNonParticipationReference {
  return {
    sourceVersion: "mini-kv v90",
    projectVersion: "0.90.0",
    receiptVersion: "mini-kv-managed-audit-external-adapter-non-participation-receipt.v1",
    consumer: "Node v223 managed audit external adapter connection readiness review",
    consumedReleaseVersion: receipt.consumedReleaseVersion ?? "missing",
    consumedReceiptDigest: receipt.consumedReceiptDigest ?? "missing",
    currentArtifactPathHint: receipt.currentArtifactPathHint ?? "missing",
    receiptDigest: receipt.receiptDigest ?? "missing",
    runtimeRole: receipt.runtimeRole ?? "missing",
    externalAdapterStorageBackend: receipt.externalAdapterStorageBackend ?? true,
    participatesInExternalAdapter: receipt.participatesInExternalAdapter ?? true,
    credentialReadAllowed: receipt.credentialReadAllowed ?? true,
    migrationExecutionAllowed: receipt.migrationExecutionAllowed ?? true,
    managedAuditWriteExecuted: receipt.managedAuditWriteExecuted ?? true,
    localDryRunRecordsWritten: receipt.localDryRunRecordsWritten ?? true,
    orderAuthoritative: receipt.orderAuthoritative ?? true,
  };
}

function readMiniKvV90Receipt(): MiniKvV90ExternalAdapterNonParticipationEvidence {
  if (!existsSync(MINI_KV_V90_RUNTIME_SMOKE)) {
    return {};
  }
  const parsed = JSON.parse(readFileSync(MINI_KV_V90_RUNTIME_SMOKE, "utf8")) as {
    managed_audit_external_adapter_non_participation_receipt?: Record<string, unknown>;
  };
  const receipt = parsed.managed_audit_external_adapter_non_participation_receipt ?? {};
  return {
    consumedReleaseVersion: stringField(receipt, "consumed_release_version"),
    consumedReceiptDigest: stringField(receipt, "consumed_receipt_digest"),
    currentArtifactPathHint: stringField(receipt, "current_artifact_path_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    runtimeRole: stringField(receipt, "runtime_role"),
    externalAdapterStorageBackend: booleanField(receipt, "external_adapter_storage_backend"),
    participatesInExternalAdapter: booleanField(receipt, "participates_in_external_adapter"),
    credentialReadAllowed: booleanField(receipt, "credential_read_allowed"),
    migrationExecutionAllowed: booleanField(receipt, "migration_execution_allowed"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
    localDryRunRecordsWritten: booleanField(receipt, "local_dry_run_records_written"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
  };
}

function collectProductionBlockers(
  checks: ManagedAuditExternalAdapterConnectionReadinessReviewProfile["checks"],
): ReadinessReviewMessage[] {
  const blockers: ReadinessReviewMessage[] = [];
  addMessage(blockers, checks.nodeV222VerificationReady, "NODE_V222_NOT_READY", "node-v222-verification-report", "Node v222 verification report must be ready before v223.");
  addMessage(blockers, checks.javaV81EvidencePresent, "JAVA_V81_EVIDENCE_MISSING", "java-v81-migration-guard", "Java v81 migration guard evidence must be present.");
  addMessage(blockers, checks.javaV81MigrationGuardAccepted, "JAVA_V81_GUARD_NOT_ACCEPTED", "java-v81-migration-guard", "Java v81 must expose the v223 migration guard.");
  addMessage(blockers, checks.javaV81CredentialBoundaryValid, "JAVA_V81_CREDENTIAL_BOUNDARY_INVALID", "java-v81-migration-guard", "Java v81 must keep credential reads disabled.");
  addMessage(blockers, checks.javaV81NoConnectionNoSqlBoundaryValid, "JAVA_V81_CONNECTION_OR_SQL_BOUNDARY_INVALID", "java-v81-migration-guard", "Java v81 must keep external connection and SQL migration disabled.");
  addMessage(blockers, checks.miniKvV90RuntimeEvidencePresent, "MINIKV_V90_RUNTIME_EVIDENCE_MISSING", "mini-kv-v90-non-participation", "mini-kv v90 runtime smoke and verification manifest evidence must be present.");
  addMessage(blockers, checks.miniKvV90ReceiptAccepted, "MINIKV_V90_RECEIPT_NOT_ACCEPTED", "mini-kv-v90-non-participation", "mini-kv v90 external adapter non-participation receipt must match the expected digest chain.");
  addMessage(blockers, checks.miniKvV90NonParticipationBoundaryValid, "MINIKV_V90_PARTICIPATION_BOUNDARY_INVALID", "mini-kv-v90-non-participation", "mini-kv v90 must not be an external adapter participant or storage backend.");
  addMessage(blockers, checks.miniKvV90NoCredentialMigrationBoundaryValid, "MINIKV_V90_CREDENTIAL_OR_MIGRATION_BOUNDARY_INVALID", "mini-kv-v90-non-participation", "mini-kv v90 must not read credentials or run migration.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-external-adapter-connection-readiness-review", "v223 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): ReadinessReviewMessage[] {
  return [
    {
      code: "REVIEW_ONLY_NO_CONNECTION",
      severity: "warning",
      source: "managed-audit-external-adapter-connection-readiness-review",
      message: "This profile proves readiness review inputs only; it does not open a real managed audit connection.",
    },
  ];
}

function collectRecommendations(): ReadinessReviewMessage[] {
  return [
    {
      code: "PREPARE_SANDBOX_ADAPTER_DRY_RUN",
      severity: "recommendation",
      source: "managed-audit-external-adapter-connection-readiness-review",
      message: "Next Node work should define a sandbox-only external adapter dry-run plan before any real connection.",
    },
    {
      code: "KEEP_CREDENTIAL_VALUES_OUT_OF_REPORTS",
      severity: "recommendation",
      source: "managed-audit-external-adapter-connection-readiness-review",
      message: "Future evidence should record credential review status without printing credential values.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): ReadinessEvidenceFile {
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

function snippet(id: string, filePath: string, expectedText: string): ReadinessSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function renderEvidenceFile(file: ReadinessEvidenceFile): string[] {
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

function renderSnippet(snippetMatch: ReadinessSnippetMatch): string[] {
  return [
    `### ${snippetMatch.id}`,
    "",
    `- Path: ${snippetMatch.path}`,
    `- Matched: ${snippetMatch.matched}`,
    `- Expected text: ${snippetMatch.expectedText}`,
    "",
  ];
}

function fileById(files: ReadinessEvidenceFile[], id: string): ReadinessEvidenceFile {
  return files.find((file) => file.id === id) ?? {
    id,
    path: "",
    exists: false,
    sizeBytes: 0,
    digest: null,
  };
}

function snippetMatched(snippets: ReadinessSnippetMatch[], id: string): boolean {
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

function addMessage(
  messages: ReadinessReviewMessage[],
  condition: boolean,
  code: string,
  source: ReadinessReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
