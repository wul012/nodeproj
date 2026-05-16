import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  createManagedAuditAdapterBoundaryProfile,
  type ManagedAuditAdapterBoundaryProfile,
} from "./managedAuditAdapterBoundary.js";
import {
  createManagedAuditReadinessSummary,
  type ManagedAuditReadinessSummary,
} from "./managedAuditReadinessSummary.js";
import {
  createManagedAuditStoreContractProfile,
  type ManagedAuditStoreContractProfile,
} from "./managedAuditStoreContract.js";
import {
  loadPostRealReadProductionHardeningTriage,
  type PostRealReadProductionHardeningTriageProfile,
} from "./postRealReadProductionHardeningTriage.js";

export interface ManagedAuditPersistenceBoundaryCandidateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-persistence-boundary-candidate.v1";
  candidateState: "ready-for-managed-audit-dry-run" | "blocked";
  readyForManagedAuditPersistenceBoundaryCandidate: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  candidate: {
    candidateDigest: string;
    sourceTriageDigest: string;
    sourceManagedContractVersion: ManagedAuditStoreContractProfile["profileVersion"];
    sourceManagedBoundaryVersion: ManagedAuditAdapterBoundaryProfile["profileVersion"];
    sourceManagedReadinessVersion: ManagedAuditReadinessSummary["summaryVersion"];
    javaHandoffHintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1";
    miniKvProvenanceDigest: "fnv1a64:c1c0896fc6b77fe2";
    candidateSinkMode: "file-or-sqlite-dry-run-candidate";
    candidateRetentionDays: 30;
    candidateRotationPolicy: "size-and-age-rotation-candidate";
    realManagedAdapterConnected: false;
    externalAuditSystemAccessed: false;
    productionAuditRecordAllowed: false;
  };
  upstreamEvidence: {
    javaV74: JavaAuditPersistenceHandoffEvidence;
    miniKvV83: MiniKvBinaryProvenanceEvidence;
  };
  adapterCandidate: {
    adapterContractMethods: string[];
    dryRunStoreCandidates: DryRunStoreCandidate[];
    failureModes: FailureModeCandidate[];
    v209DryRunRequirements: DryRunRequirement[];
  };
  checks: {
    sourceTriageReady: boolean;
    sourceTriageSelectedManagedAuditFirst: boolean;
    sourceTriageStillBlocksProduction: boolean;
    managedStoreContractReadyForCandidate: boolean;
    managedAdapterBoundaryDocumented: boolean;
    managedReadinessStillBlocksProduction: boolean;
    javaV74HandoffAccepted: boolean;
    javaV74NoWriteBoundaryValid: boolean;
    miniKvV83ProvenanceAccepted: boolean;
    miniKvV83NoRestoreOrProductionClaim: boolean;
    dryRunCandidatesDefined: boolean;
    failureModesDefined: boolean;
    v209DryRunRequirementsDefined: boolean;
    noRealManagedAdapterConnected: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    readyForManagedAuditPersistenceBoundaryCandidate: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    dryRunCandidateCount: number;
    failureModeCount: number;
    v209RequirementCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CandidateMessage[];
  warnings: CandidateMessage[];
  recommendations: CandidateMessage[];
  evidenceEndpoints: {
    managedAuditPersistenceBoundaryCandidateJson: string;
    managedAuditPersistenceBoundaryCandidateMarkdown: string;
    sourcePostRealReadHardeningTriageJson: string;
    managedAuditStoreContractJson: string;
    managedAuditAdapterBoundaryJson: string;
    managedAuditReadinessSummaryJson: string;
    javaV74HandoffHint: string;
    miniKvV83RuntimeSmokeEvidence: string;
  };
  nextActions: string[];
}

interface JavaAuditPersistenceHandoffEvidence {
  sourceVersion: "Java v74";
  hintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1";
  responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v8";
  sourceRetentionFixtureVersion: "java-release-audit-retention-fixture.v1";
  javaRetentionDays: 180;
  managedAuditCandidateVersion: "managed-audit-persistence-boundary-candidate.v1";
  managedAuditSinkMode: "file-or-sqlite-dry-run-candidate";
  managedAuditRetentionDays: 30;
  managedAuditRotationPolicy: "size-and-age-rotation-candidate";
  handoffFieldPaths: string[];
  javaAuditSourceReadOnly: true;
  javaLedgerWriteAllowed: false;
  javaManagedAuditWriteAllowed: false;
  javaExternalAuditSystemAccessed: false;
  nodeMayUseAsManagedAuditInput: true;
  nodeMayTreatAsProductionAuditRecord: false;
}

interface MiniKvBinaryProvenanceEvidence {
  sourceVersion: "mini-kv v83";
  projectVersion: "0.83.0";
  provenanceDigest: "fnv1a64:c1c0896fc6b77fe2";
  artifactPathHint: "c/83/";
  runtimeBinaryHint: "cmake-build-v83/minikv_server and cmake-build-v83/minikv_client from the current CMake build";
  releaseManifestPath: "fixtures/release/verification-manifest.json";
  runtimeSmokeEvidencePath: "fixtures/release/runtime-smoke-evidence.json";
  readOnly: true;
  loadRestoreCompactExecuted: false;
  productionBinaryClaimed: false;
  orderAuthoritative: false;
}

interface DryRunStoreCandidate {
  id: "file-jsonl" | "sqlite";
  selectedForV209: boolean;
  persistenceBoundary: string;
  retentionBoundary: string;
  cleanupBoundary: string;
  productionReady: false;
}

interface FailureModeCandidate {
  id: "append-failed" | "query-failed" | "digest-mismatch" | "rotation-limit-reached";
  expectedBehavior: string;
  productionWindowAllowed: false;
}

interface DryRunRequirement {
  id: "temp-directory-only" | "append-query-digest" | "cleanup-after-test" | "no-java-mini-kv-write";
  requiredForV209: true;
  evidenceSignal: string;
}

interface CandidateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-persistence-boundary-candidate"
    | "post-real-read-production-hardening-triage"
    | "managed-audit-store-contract"
    | "managed-audit-adapter-boundary"
    | "managed-audit-readiness-summary"
    | "java-v74-audit-persistence-handoff"
    | "mini-kv-v83-binary-provenance"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditPersistenceBoundaryCandidateJson: "/api/v1/audit/managed-persistence-boundary-candidate",
  managedAuditPersistenceBoundaryCandidateMarkdown: "/api/v1/audit/managed-persistence-boundary-candidate?format=markdown",
  sourcePostRealReadHardeningTriageJson: "/api/v1/production/post-real-read-production-hardening-triage",
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  managedAuditReadinessSummaryJson: "/api/v1/audit/managed-readiness-summary",
  javaV74HandoffHint: "D:/javaproj/advanced-order-platform/c/74/",
  miniKvV83RuntimeSmokeEvidence: "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json",
});

export async function loadManagedAuditPersistenceBoundaryCandidate(input: {
  config: AppConfig;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ManagedAuditPersistenceBoundaryCandidateProfile> {
  const sourceTriage = await loadPostRealReadProductionHardeningTriage({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const managedContract = createManagedAuditStoreContractProfile(input.config);
  const managedBoundary = createManagedAuditAdapterBoundaryProfile({
    config: input.config,
    runtime: input.runtime,
  });
  const managedReadiness = createManagedAuditReadinessSummary({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
  });
  const upstreamEvidence = {
    javaV74: createJavaV74Evidence(),
    miniKvV83: createMiniKvV83Evidence(),
  };
  const adapterCandidate = {
    adapterContractMethods: managedBoundary.adapterInterface.methods.map((method) => method.name),
    dryRunStoreCandidates: createDryRunStoreCandidates(),
    failureModes: createFailureModes(),
    v209DryRunRequirements: createDryRunRequirements(),
  };
  const checks = createChecks(input.config, sourceTriage, managedContract, managedBoundary, managedReadiness, upstreamEvidence, adapterCandidate);
  checks.readyForManagedAuditPersistenceBoundaryCandidate = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditPersistenceBoundaryCandidate")
    .every(([, value]) => value);
  const candidateState = checks.readyForManagedAuditPersistenceBoundaryCandidate
    ? "ready-for-managed-audit-dry-run"
    : "blocked";
  const candidateDigest = sha256StableJson({
    profileVersion: "managed-audit-persistence-boundary-candidate.v1",
    candidateState,
    sourceTriageDigest: sourceTriage.triage.triageDigest,
    managedContractVersion: managedContract.profileVersion,
    managedBoundaryVersion: managedBoundary.profileVersion,
    managedReadinessVersion: managedReadiness.summaryVersion,
    javaHintVersion: upstreamEvidence.javaV74.hintVersion,
    miniKvProvenanceDigest: upstreamEvidence.miniKvV83.provenanceDigest,
    dryRunStoreCandidateIds: adapterCandidate.dryRunStoreCandidates.map((candidate) => candidate.id),
    v209RequirementIds: adapterCandidate.v209DryRunRequirements.map((requirement) => requirement.id),
    productionAuditRecordAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(candidateState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit persistence boundary candidate",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-persistence-boundary-candidate.v1",
    candidateState,
    readyForManagedAuditPersistenceBoundaryCandidate: checks.readyForManagedAuditPersistenceBoundaryCandidate,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    candidate: {
      candidateDigest,
      sourceTriageDigest: sourceTriage.triage.triageDigest,
      sourceManagedContractVersion: managedContract.profileVersion,
      sourceManagedBoundaryVersion: managedBoundary.profileVersion,
      sourceManagedReadinessVersion: managedReadiness.summaryVersion,
      javaHandoffHintVersion: upstreamEvidence.javaV74.hintVersion,
      miniKvProvenanceDigest: upstreamEvidence.miniKvV83.provenanceDigest,
      candidateSinkMode: "file-or-sqlite-dry-run-candidate",
      candidateRetentionDays: 30,
      candidateRotationPolicy: "size-and-age-rotation-candidate",
      realManagedAdapterConnected: false,
      externalAuditSystemAccessed: false,
      productionAuditRecordAllowed: false,
    },
    upstreamEvidence,
    adapterCandidate,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      dryRunCandidateCount: adapterCandidate.dryRunStoreCandidates.length,
      failureModeCount: adapterCandidate.failureModes.length,
      v209RequirementCount: adapterCandidate.v209DryRunRequirements.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use Node v209 to dry-run this candidate in a Node-owned temporary directory only.",
      "Do not connect a real managed audit service or migrate existing audit files in v208.",
      "Keep Java v74 and mini-kv v83 as read-only upstream evidence; Node v208 must not write either project.",
      "Preserve production window blockers until dry-run persistence, operator identity, and approval records are all represented.",
    ],
  };
}

export function renderManagedAuditPersistenceBoundaryCandidateMarkdown(
  profile: ManagedAuditPersistenceBoundaryCandidateProfile,
): string {
  return [
    "# Managed audit persistence boundary candidate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Candidate state: ${profile.candidateState}`,
    `- Ready for managed audit persistence boundary candidate: ${profile.readyForManagedAuditPersistenceBoundaryCandidate}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Candidate",
    "",
    ...renderEntries(profile.candidate),
    "",
    "## Java v74 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.javaV74),
    "",
    "## mini-kv v83 Evidence",
    "",
    ...renderEntries(profile.upstreamEvidence.miniKvV83),
    "",
    "## Dry-run Store Candidates",
    "",
    ...profile.adapterCandidate.dryRunStoreCandidates.flatMap(renderDryRunStoreCandidate),
    "## Failure Modes",
    "",
    ...profile.adapterCandidate.failureModes.flatMap(renderFailureMode),
    "## v209 Dry-run Requirements",
    "",
    ...profile.adapterCandidate.v209DryRunRequirements.flatMap(renderDryRunRequirement),
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
    ...renderMessages(profile.productionBlockers, "No managed audit persistence boundary candidate blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit persistence boundary candidate warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit persistence boundary candidate recommendations."),
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

function createJavaV74Evidence(): JavaAuditPersistenceHandoffEvidence {
  return {
    sourceVersion: "Java v74",
    hintVersion: "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1",
    responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v8",
    sourceRetentionFixtureVersion: "java-release-audit-retention-fixture.v1",
    javaRetentionDays: 180,
    managedAuditCandidateVersion: "managed-audit-persistence-boundary-candidate.v1",
    managedAuditSinkMode: "file-or-sqlite-dry-run-candidate",
    managedAuditRetentionDays: 30,
    managedAuditRotationPolicy: "size-and-age-rotation-candidate",
    handoffFieldPaths: [
      "requestContext.requestId",
      "operatorWindowHint.operatorId",
      "ciEvidenceHint.manifestDigest",
      "liveReadinessHint.runtimeSmokeSessionId",
      "verificationHint.warningDigest",
      "executionBoundaries.nodeMayWriteApprovalLedger",
    ],
    javaAuditSourceReadOnly: true,
    javaLedgerWriteAllowed: false,
    javaManagedAuditWriteAllowed: false,
    javaExternalAuditSystemAccessed: false,
    nodeMayUseAsManagedAuditInput: true,
    nodeMayTreatAsProductionAuditRecord: false,
  };
}

function createMiniKvV83Evidence(): MiniKvBinaryProvenanceEvidence {
  return {
    sourceVersion: "mini-kv v83",
    projectVersion: "0.83.0",
    provenanceDigest: "fnv1a64:c1c0896fc6b77fe2",
    artifactPathHint: "c/83/",
    runtimeBinaryHint: "cmake-build-v83/minikv_server and cmake-build-v83/minikv_client from the current CMake build",
    releaseManifestPath: "fixtures/release/verification-manifest.json",
    runtimeSmokeEvidencePath: "fixtures/release/runtime-smoke-evidence.json",
    readOnly: true,
    loadRestoreCompactExecuted: false,
    productionBinaryClaimed: false,
    orderAuthoritative: false,
  };
}

function createDryRunStoreCandidates(): DryRunStoreCandidate[] {
  return [
    {
      id: "file-jsonl",
      selectedForV209: true,
      persistenceBoundary: "Write JSONL audit records only under a Node-owned temporary test directory.",
      retentionBoundary: "Use 30-day metadata and size rotation markers without deleting real audit files.",
      cleanupBoundary: "Delete only the v209 temp directory after the dry-run verification finishes.",
      productionReady: false,
    },
    {
      id: "sqlite",
      selectedForV209: false,
      persistenceBoundary: "Document sqlite schema candidate only; do not add sqlite dependency in v208.",
      retentionBoundary: "Keep retention and backup markers as schema fields until a dedicated implementation version.",
      cleanupBoundary: "No sqlite file is created in v208.",
      productionReady: false,
    },
  ];
}

function createFailureModes(): FailureModeCandidate[] {
  return [
    {
      id: "append-failed",
      expectedBehavior: "Report audit persistence degraded and keep production window closed.",
      productionWindowAllowed: false,
    },
    {
      id: "query-failed",
      expectedBehavior: "Keep append records intact and mark lookup evidence unavailable.",
      productionWindowAllowed: false,
    },
    {
      id: "digest-mismatch",
      expectedBehavior: "Block release evidence promotion until the dry-run audit digest is regenerated.",
      productionWindowAllowed: false,
    },
    {
      id: "rotation-limit-reached",
      expectedBehavior: "Stop dry-run writes in the temp store and require operator cleanup.",
      productionWindowAllowed: false,
    },
  ];
}

function createDryRunRequirements(): DryRunRequirement[] {
  return [
    {
      id: "temp-directory-only",
      requiredForV209: true,
      evidenceSignal: "All dry-run audit writes occur under .tmp/managed-audit-v209 or a test-created temp directory.",
    },
    {
      id: "append-query-digest",
      requiredForV209: true,
      evidenceSignal: "v209 writes one dry-run record, queries it by request id, and records a stable digest.",
    },
    {
      id: "cleanup-after-test",
      requiredForV209: true,
      evidenceSignal: "The dry-run temp directory is removed before final cleanup.",
    },
    {
      id: "no-java-mini-kv-write",
      requiredForV209: true,
      evidenceSignal: "Java and mini-kv remain read-only evidence sources and are not started or mutated by Node.",
    },
  ];
}

function createChecks(
  config: AppConfig,
  sourceTriage: PostRealReadProductionHardeningTriageProfile,
  managedContract: ManagedAuditStoreContractProfile,
  managedBoundary: ManagedAuditAdapterBoundaryProfile,
  managedReadiness: ManagedAuditReadinessSummary,
  upstreamEvidence: ManagedAuditPersistenceBoundaryCandidateProfile["upstreamEvidence"],
  adapterCandidate: ManagedAuditPersistenceBoundaryCandidateProfile["adapterCandidate"],
): ManagedAuditPersistenceBoundaryCandidateProfile["checks"] {
  return {
    sourceTriageReady: sourceTriage.readyForPostRealReadProductionHardeningTriage,
    sourceTriageSelectedManagedAuditFirst: sourceTriage.selectedPriorities[0]?.id === "managed-audit-persistence",
    sourceTriageStillBlocksProduction: sourceTriage.readyForProductionWindow === false
      && sourceTriage.readyForProductionOperations === false,
    managedStoreContractReadyForCandidate: managedContract.checks.appendOnlyWriteCovered
      && managedContract.checks.queryByRequestIdCovered
      && managedContract.checks.digestVerificationCovered
      && managedContract.checks.fakeAdapterDoesNotClaimProduction,
    managedAdapterBoundaryDocumented: managedBoundary.checks.adapterInterfaceDefined
      && managedBoundary.checks.noDatabaseConnectionAttempted
      && managedBoundary.checks.noAuditMigrationPerformed,
    managedReadinessStillBlocksProduction: managedReadiness.readyForProductionAudit === false
      && managedReadiness.executionAllowed === false,
    javaV74HandoffAccepted: upstreamEvidence.javaV74.hintVersion === "java-release-approval-rehearsal-audit-persistence-handoff-hint.v1"
      && upstreamEvidence.javaV74.handoffFieldPaths.length >= 6
      && upstreamEvidence.javaV74.nodeMayUseAsManagedAuditInput,
    javaV74NoWriteBoundaryValid: upstreamEvidence.javaV74.javaAuditSourceReadOnly
      && !upstreamEvidence.javaV74.javaLedgerWriteAllowed
      && !upstreamEvidence.javaV74.javaManagedAuditWriteAllowed
      && !upstreamEvidence.javaV74.javaExternalAuditSystemAccessed
      && !upstreamEvidence.javaV74.nodeMayTreatAsProductionAuditRecord,
    miniKvV83ProvenanceAccepted: upstreamEvidence.miniKvV83.projectVersion === "0.83.0"
      && upstreamEvidence.miniKvV83.provenanceDigest === "fnv1a64:c1c0896fc6b77fe2"
      && upstreamEvidence.miniKvV83.artifactPathHint === "c/83/",
    miniKvV83NoRestoreOrProductionClaim: upstreamEvidence.miniKvV83.readOnly
      && !upstreamEvidence.miniKvV83.loadRestoreCompactExecuted
      && !upstreamEvidence.miniKvV83.productionBinaryClaimed
      && !upstreamEvidence.miniKvV83.orderAuthoritative,
    dryRunCandidatesDefined: adapterCandidate.dryRunStoreCandidates.length === 2
      && adapterCandidate.dryRunStoreCandidates.some((candidate) => candidate.id === "file-jsonl" && candidate.selectedForV209)
      && adapterCandidate.dryRunStoreCandidates.every((candidate) => !candidate.productionReady),
    failureModesDefined: adapterCandidate.failureModes.length === 4
      && adapterCandidate.failureModes.every((mode) => !mode.productionWindowAllowed),
    v209DryRunRequirementsDefined: adapterCandidate.v209DryRunRequirements.length === 4
      && adapterCandidate.v209DryRunRequirements.every((requirement) => requirement.requiredForV209),
    noRealManagedAdapterConnected: !managedContract.checks.realManagedAdapterConnected
      && !managedBoundary.checks.realManagedAdapterConnected,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false
      && managedBoundary.checks.upstreamActionsStillDisabled,
    executionStillBlocked: managedContract.executionAllowed === false
      && managedBoundary.executionAllowed === false
      && managedReadiness.executionAllowed === false,
    readyForManagedAuditPersistenceBoundaryCandidate: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditPersistenceBoundaryCandidateProfile["checks"],
): CandidateMessage[] {
  const blockers: CandidateMessage[] = [];
  addMessage(blockers, checks.sourceTriageReady, "SOURCE_TRIAGE_NOT_READY", "post-real-read-production-hardening-triage", "Node v207 hardening triage must be ready before v208.");
  addMessage(blockers, checks.sourceTriageSelectedManagedAuditFirst, "MANAGED_AUDIT_NOT_FIRST_PRIORITY", "post-real-read-production-hardening-triage", "Node v207 must select managed audit as the first hardening priority.");
  addMessage(blockers, checks.sourceTriageStillBlocksProduction, "SOURCE_TRIAGE_UNLOCKS_PRODUCTION", "post-real-read-production-hardening-triage", "Source triage must still block production.");
  addMessage(blockers, checks.managedStoreContractReadyForCandidate, "MANAGED_STORE_CONTRACT_NOT_READY", "managed-audit-store-contract", "Existing managed store contract must cover append/query/digest fake-adapter behavior.");
  addMessage(blockers, checks.managedAdapterBoundaryDocumented, "MANAGED_ADAPTER_BOUNDARY_INCOMPLETE", "managed-audit-adapter-boundary", "Managed adapter boundary must be documented without database connection or migration.");
  addMessage(blockers, checks.managedReadinessStillBlocksProduction, "MANAGED_READINESS_UNLOCKS_PRODUCTION", "managed-audit-readiness-summary", "Managed audit readiness summary must still block production audit.");
  addMessage(blockers, checks.javaV74HandoffAccepted, "JAVA_V74_HANDOFF_NOT_ACCEPTED", "java-v74-audit-persistence-handoff", "Java v74 audit-persistence handoff hint must be accepted.");
  addMessage(blockers, checks.javaV74NoWriteBoundaryValid, "JAVA_V74_WRITE_BOUNDARY_INVALID", "java-v74-audit-persistence-handoff", "Java v74 must remain no-ledger, no-managed-audit-write, no-external-audit.");
  addMessage(blockers, checks.miniKvV83ProvenanceAccepted, "MINI_KV_V83_PROVENANCE_NOT_ACCEPTED", "mini-kv-v83-binary-provenance", "mini-kv v83 binary provenance hint must be accepted.");
  addMessage(blockers, checks.miniKvV83NoRestoreOrProductionClaim, "MINI_KV_V83_BOUNDARY_INVALID", "mini-kv-v83-binary-provenance", "mini-kv v83 must not claim production binary or restore/compact execution.");
  addMessage(blockers, checks.dryRunCandidatesDefined, "DRY_RUN_CANDIDATES_INCOMPLETE", "managed-audit-persistence-boundary-candidate", "v208 must define file-jsonl and sqlite dry-run candidates.");
  addMessage(blockers, checks.failureModesDefined, "FAILURE_MODES_INCOMPLETE", "managed-audit-persistence-boundary-candidate", "v208 must define append/query/digest/rotation failure modes.");
  addMessage(blockers, checks.v209DryRunRequirementsDefined, "V209_DRY_RUN_REQUIREMENTS_INCOMPLETE", "managed-audit-persistence-boundary-candidate", "v208 must define v209 dry-run requirements.");
  addMessage(blockers, checks.noRealManagedAdapterConnected, "REAL_MANAGED_ADAPTER_CONNECTED", "managed-audit-adapter-boundary", "v208 must not connect a real managed adapter.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v208 must not unlock execution.");
  return blockers;
}

function collectWarnings(
  candidateState: ManagedAuditPersistenceBoundaryCandidateProfile["candidateState"],
): CandidateMessage[] {
  return [
    {
      code: candidateState === "blocked" ? "MANAGED_AUDIT_CANDIDATE_BLOCKED" : "MANAGED_AUDIT_CANDIDATE_READY",
      severity: "warning",
      source: "managed-audit-persistence-boundary-candidate",
      message: candidateState === "blocked"
        ? "Managed audit persistence boundary candidate has blockers."
        : "Managed audit persistence boundary candidate is ready for v209 dry-run, but production audit remains blocked.",
    },
  ];
}

function collectRecommendations(): CandidateMessage[] {
  return [
    {
      code: "RUN_NODE_V209_DRY_RUN_VERIFICATION",
      severity: "recommendation",
      source: "managed-audit-persistence-boundary-candidate",
      message: "Use Node v209 to write/query/digest one dry-run audit record in a Node-owned temporary directory.",
    },
    {
      code: "KEEP_UPSTREAMS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-persistence-boundary-candidate",
      message: "Keep Java v74 and mini-kv v83 as read-only evidence inputs; do not write either upstream during managed audit dry-run.",
    },
  ];
}

function renderDryRunStoreCandidate(candidate: DryRunStoreCandidate): string[] {
  return [
    `- ${candidate.id}`,
    `  - selectedForV209: ${candidate.selectedForV209}`,
    `  - persistenceBoundary: ${candidate.persistenceBoundary}`,
    `  - retentionBoundary: ${candidate.retentionBoundary}`,
    `  - cleanupBoundary: ${candidate.cleanupBoundary}`,
    `  - productionReady: ${candidate.productionReady}`,
  ];
}

function renderFailureMode(mode: FailureModeCandidate): string[] {
  return [
    `- ${mode.id}`,
    `  - expectedBehavior: ${mode.expectedBehavior}`,
    `  - productionWindowAllowed: ${mode.productionWindowAllowed}`,
  ];
}

function renderDryRunRequirement(requirement: DryRunRequirement): string[] {
  return [
    `- ${requirement.id}`,
    `  - requiredForV209: ${requirement.requiredForV209}`,
    `  - evidenceSignal: ${requirement.evidenceSignal}`,
  ];
}

function addMessage(
  messages: CandidateMessage[],
  condition: boolean,
  code: string,
  source: CandidateMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
