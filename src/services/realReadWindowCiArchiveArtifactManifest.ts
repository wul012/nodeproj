import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
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
  loadRealReadAdapterProductionReadinessCheckpoint,
  type RealReadAdapterProductionReadinessCheckpointProfile,
} from "./realReadAdapterProductionReadinessCheckpoint.js";
import {
  loadRealReadWindowAuditStoreHandoffContract,
  type RealReadWindowAuditStoreHandoffContractProfile,
} from "./realReadWindowAuditStoreHandoffContract.js";
import {
  loadRealReadWindowOperatorIdentityBinding,
  type RealReadWindowOperatorIdentityBindingProfile,
} from "./realReadWindowOperatorIdentityBinding.js";

export interface RealReadWindowCiArchiveArtifactManifestProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-window-ci-archive-artifact-manifest.v1";
  manifestState: "ready-for-ci-artifact-publication" | "blocked";
  readyForRealReadWindowCiArchiveArtifactManifest: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  sourceProfiles: {
    readinessCheckpoint: {
      profileVersion: RealReadAdapterProductionReadinessCheckpointProfile["profileVersion"];
      checkpointState: RealReadAdapterProductionReadinessCheckpointProfile["checkpointState"];
      checkpointDigest: string;
      ready: boolean;
    };
    operatorIdentityBinding: {
      profileVersion: RealReadWindowOperatorIdentityBindingProfile["profileVersion"];
      bindingState: RealReadWindowOperatorIdentityBindingProfile["bindingState"];
      bindingDigest: string;
      ready: boolean;
    };
    auditStoreHandoffContract: {
      profileVersion: RealReadWindowAuditStoreHandoffContractProfile["profileVersion"];
      handoffState: RealReadWindowAuditStoreHandoffContractProfile["handoffState"];
      handoffDigest: string;
      ready: boolean;
    };
  };
  manifest: {
    manifestDigest: string;
    evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79";
    artifactRecordCount: 9;
    requiredFileKindCount: 4;
    ciArtifactConnected: false;
    githubArtifactRequiredNow: false;
    localArchiveLayoutOnly: true;
    productionWindowAllowed: false;
    productionOperationAllowed: false;
  };
  artifactRecords: CiArtifactRecord[];
  fileKindRequirements: CiFileKindRequirement[];
  checks: {
    sourceCheckpointReady: boolean;
    sourceCheckpointDigestValid: boolean;
    sourceIdentityBindingReady: boolean;
    sourceIdentityBindingDigestValid: boolean;
    sourceAuditHandoffReady: boolean;
    sourceAuditHandoffDigestValid: boolean;
    artifactRecordsComplete: boolean;
    artifactRecordsReadOnly: boolean;
    artifactRecordDigestsValid: boolean;
    requiredFileKindsCovered: boolean;
    localArchivePathsDeclared: boolean;
    githubArtifactNotRequiredYet: boolean;
    ciArtifactNotConnectedYet: boolean;
    upstreamActionsStillDisabled: boolean;
    productionWindowStillBlocked: boolean;
    executionStillBlocked: boolean;
    readyForRealReadWindowCiArchiveArtifactManifest: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    artifactRecordCount: number;
    fileKindRequirementCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: CiArtifactManifestMessage[];
  warnings: CiArtifactManifestMessage[];
  recommendations: CiArtifactManifestMessage[];
  evidenceEndpoints: {
    realReadWindowCiArchiveArtifactManifestJson: string;
    realReadWindowCiArchiveArtifactManifestMarkdown: string;
    realReadAdapterProductionReadinessCheckpointJson: string;
    realReadWindowOperatorIdentityBindingJson: string;
    realReadWindowAuditStoreHandoffContractJson: string;
  };
  nextActions: string[];
}

interface CiArtifactRecord {
  version:
    | "Node v191"
    | "Node v192"
    | "Node v193"
    | "Node v194"
    | "Node v195"
    | "Node v196"
    | "Node v197"
    | "Node v198"
    | "Node v199";
  role: string;
  localArchiveRoot: string;
  requiredFiles: {
    jsonOrEndpoint: string;
    markdown: string;
    screenshot: string;
    explanation: string;
  };
  sourceDigest: string;
  recordDigest: string;
  readOnly: true;
  writesNow: false;
  ciPublished: false;
}

interface CiFileKindRequirement {
  kind: "json-or-endpoint" | "markdown" | "screenshot" | "explanation";
  requiredForEachRecord: true;
  currentManifestDeclaresPath: boolean;
  verifiedByCiNow: false;
}

interface CiArtifactManifestMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-window-ci-archive-artifact-manifest"
    | "real-read-adapter-production-readiness-checkpoint"
    | "real-read-window-operator-identity-binding"
    | "real-read-window-audit-store-handoff-contract"
    | "ci-artifact-store"
    | "runtime-config";
  message: string;
}

const ENDPOINTS = Object.freeze({
  realReadWindowCiArchiveArtifactManifestJson: "/api/v1/production/real-read-window-ci-archive-artifact-manifest",
  realReadWindowCiArchiveArtifactManifestMarkdown: "/api/v1/production/real-read-window-ci-archive-artifact-manifest?format=markdown",
  realReadAdapterProductionReadinessCheckpointJson: "/api/v1/production/real-read-adapter-production-readiness-checkpoint",
  realReadWindowOperatorIdentityBindingJson: "/api/v1/production/real-read-window-operator-identity-binding",
  realReadWindowAuditStoreHandoffContractJson: "/api/v1/production/real-read-window-audit-store-handoff-contract",
});

export async function loadRealReadWindowCiArchiveArtifactManifest(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<RealReadWindowCiArchiveArtifactManifestProfile> {
  const checkpoint = await loadRealReadAdapterProductionReadinessCheckpoint(input);
  const identityBinding = await loadRealReadWindowOperatorIdentityBinding(input);
  const auditHandoff = await loadRealReadWindowAuditStoreHandoffContract(input);
  const artifactRecords = createArtifactRecords(checkpoint, identityBinding, auditHandoff);
  const fileKindRequirements = createFileKindRequirements();
  const checks = createChecks(input.config, checkpoint, identityBinding, auditHandoff, artifactRecords, fileKindRequirements);
  checks.readyForRealReadWindowCiArchiveArtifactManifest = Object.entries(checks)
    .filter(([key]) => key !== "readyForRealReadWindowCiArchiveArtifactManifest")
    .every(([, value]) => value);
  const manifestState = checks.readyForRealReadWindowCiArchiveArtifactManifest
    ? "ready-for-ci-artifact-publication"
    : "blocked";
  const manifestDigest = sha256StableJson({
    profileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
    manifestState,
    evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79",
    sourceDigests: sourceDigests(checkpoint, identityBinding, auditHandoff),
    artifactRecordDigests: artifactRecords.map((record) => record.recordDigest),
    fileKindRequirements,
    ciArtifactConnected: false,
    productionWindowAllowed: false,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(manifestState);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Real-read window CI archive artifact manifest",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-window-ci-archive-artifact-manifest.v1",
    manifestState,
    readyForRealReadWindowCiArchiveArtifactManifest: checks.readyForRealReadWindowCiArchiveArtifactManifest,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    sourceProfiles: {
      readinessCheckpoint: {
        profileVersion: checkpoint.profileVersion,
        checkpointState: checkpoint.checkpointState,
        checkpointDigest: checkpoint.checkpoint.checkpointDigest,
        ready: checkpoint.readyForRealReadAdapterProductionReadinessCheckpoint,
      },
      operatorIdentityBinding: {
        profileVersion: identityBinding.profileVersion,
        bindingState: identityBinding.bindingState,
        bindingDigest: identityBinding.packet.bindingDigest,
        ready: identityBinding.readyForRealReadWindowOperatorIdentityBinding,
      },
      auditStoreHandoffContract: {
        profileVersion: auditHandoff.profileVersion,
        handoffState: auditHandoff.handoffState,
        handoffDigest: auditHandoff.handoffContract.handoffDigest,
        ready: auditHandoff.readyForRealReadWindowAuditStoreHandoff,
      },
    },
    manifest: {
      manifestDigest,
      evidenceSpan: "Node v191-v199 + Java v70 + mini-kv v79",
      artifactRecordCount: 9,
      requiredFileKindCount: 4,
      ciArtifactConnected: false,
      githubArtifactRequiredNow: false,
      localArchiveLayoutOnly: true,
      productionWindowAllowed: false,
      productionOperationAllowed: false,
    },
    artifactRecords,
    fileKindRequirements,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      artifactRecordCount: artifactRecords.length,
      fileKindRequirementCount: fileKindRequirements.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Publish this manifest as the schema for later CI artifact upload; do not require GitHub artifacts in v200.",
      "Use the manifest digest to pin Node v191-v199 evidence before opening any real-read window.",
      "Start the next plan with recommended parallel Java v71 + mini-kv v80 only if they provide read-only CI/evidence hints.",
    ],
  };
}

export function renderRealReadWindowCiArchiveArtifactManifestMarkdown(
  profile: RealReadWindowCiArchiveArtifactManifestProfile,
): string {
  return [
    "# Real-read window CI archive artifact manifest",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Manifest state: ${profile.manifestState}`,
    `- Ready for real-read window CI archive artifact manifest: ${profile.readyForRealReadWindowCiArchiveArtifactManifest}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Source Profiles",
    "",
    ...renderEntries(profile.sourceProfiles.readinessCheckpoint),
    "",
    ...renderEntries(profile.sourceProfiles.operatorIdentityBinding),
    "",
    ...renderEntries(profile.sourceProfiles.auditStoreHandoffContract),
    "",
    "## Manifest",
    "",
    ...renderEntries(profile.manifest),
    "",
    "## Artifact Records",
    "",
    ...profile.artifactRecords.flatMap(renderArtifactRecord),
    "## File Kind Requirements",
    "",
    ...profile.fileKindRequirements.flatMap(renderFileKindRequirement),
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
    ...renderMessages(profile.productionBlockers, "No CI archive artifact manifest blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No CI archive artifact manifest warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No CI archive artifact manifest recommendations."),
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

function createArtifactRecords(
  checkpoint: RealReadAdapterProductionReadinessCheckpointProfile,
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
  auditHandoff: RealReadWindowAuditStoreHandoffContractProfile,
): CiArtifactRecord[] {
  return [
    createArtifactRecord("Node v191", "real-read adapter rehearsal", "191", endpointSource("/api/v1/production/real-read-adapter-rehearsal")),
    createArtifactRecord("Node v192", "operator window runbook", "192", endpointSource("/api/v1/production/real-read-adapter-operator-window-runbook")),
    createArtifactRecord("Node v193", "failure taxonomy", "193", endpointSource("/api/v1/production/real-read-adapter-failure-taxonomy")),
    createArtifactRecord("Node v194", "evidence archive", "194", endpointSource("/api/v1/production/real-read-adapter-evidence-archive")),
    createArtifactRecord("Node v195", "evidence archive verification", "195", checkpoint.checkpoint.sourceVerificationDigest),
    createArtifactRecord("Node v196", "imported window result packet", "196", checkpoint.checkpoint.sourcePacketDigest),
    createArtifactRecord("Node v197", "production readiness checkpoint", "197", checkpoint.checkpoint.checkpointDigest),
    createArtifactRecord("Node v198", "operator identity binding", "198", identityBinding.packet.bindingDigest),
    createArtifactRecord("Node v199", "audit store handoff contract", "199", auditHandoff.handoffContract.handoffDigest),
  ];
}

function createArtifactRecord(
  version: CiArtifactRecord["version"],
  role: string,
  archiveVersion: string,
  sourceDigest: string,
): CiArtifactRecord {
  const localArchiveRoot = `c/${archiveVersion}`;
  const requiredFiles = {
    jsonOrEndpoint: `${localArchiveRoot}/${slug(role)}-v${archiveVersion}.json-or-endpoint`,
    markdown: `${localArchiveRoot}/${slug(role)}-v${archiveVersion}.md`,
    screenshot: `${localArchiveRoot}/图片/${slug(role)}-v${archiveVersion}.png`,
    explanation: `${localArchiveRoot}/解释/${slug(role)}-v${archiveVersion}.md`,
  };
  const recordDigest = sha256StableJson({
    version,
    role,
    localArchiveRoot,
    requiredFiles,
    sourceDigest,
    readOnly: true,
    writesNow: false,
    ciPublished: false,
  });

  return {
    version,
    role,
    localArchiveRoot,
    requiredFiles,
    sourceDigest,
    recordDigest,
    readOnly: true,
    writesNow: false,
    ciPublished: false,
  };
}

function createFileKindRequirements(): CiFileKindRequirement[] {
  return [
    fileKindRequirement("json-or-endpoint"),
    fileKindRequirement("markdown"),
    fileKindRequirement("screenshot"),
    fileKindRequirement("explanation"),
  ];
}

function fileKindRequirement(kind: CiFileKindRequirement["kind"]): CiFileKindRequirement {
  return {
    kind,
    requiredForEachRecord: true,
    currentManifestDeclaresPath: true,
    verifiedByCiNow: false,
  };
}

function createChecks(
  config: AppConfig,
  checkpoint: RealReadAdapterProductionReadinessCheckpointProfile,
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
  auditHandoff: RealReadWindowAuditStoreHandoffContractProfile,
  records: CiArtifactRecord[],
  fileKindRequirements: CiFileKindRequirement[],
): RealReadWindowCiArchiveArtifactManifestProfile["checks"] {
  return {
    sourceCheckpointReady: checkpoint.readyForRealReadAdapterProductionReadinessCheckpoint,
    sourceCheckpointDigestValid: isDigest(checkpoint.checkpoint.checkpointDigest),
    sourceIdentityBindingReady: identityBinding.readyForRealReadWindowOperatorIdentityBinding,
    sourceIdentityBindingDigestValid: isDigest(identityBinding.packet.bindingDigest),
    sourceAuditHandoffReady: auditHandoff.readyForRealReadWindowAuditStoreHandoff,
    sourceAuditHandoffDigestValid: isDigest(auditHandoff.handoffContract.handoffDigest),
    artifactRecordsComplete: records.length === 9
      && records[0]?.version === "Node v191"
      && records[records.length - 1]?.version === "Node v199",
    artifactRecordsReadOnly: records.every((record) => record.readOnly && !record.writesNow && !record.ciPublished),
    artifactRecordDigestsValid: records.every((record) => isDigest(record.recordDigest)),
    requiredFileKindsCovered: fileKindRequirements.length === 4
      && fileKindRequirements.every((requirement) => requirement.currentManifestDeclaresPath),
    localArchivePathsDeclared: records.every((record) =>
      record.localArchiveRoot.startsWith("c/")
        && Boolean(record.requiredFiles.markdown)
        && Boolean(record.requiredFiles.screenshot)
        && Boolean(record.requiredFiles.explanation)
        && Boolean(record.requiredFiles.jsonOrEndpoint)
    ),
    githubArtifactNotRequiredYet: true,
    ciArtifactNotConnectedYet: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionWindowStillBlocked: checkpoint.readyForProductionWindow === false
      && identityBinding.readyForProductionWindow === false
      && auditHandoff.readyForProductionWindow === false,
    executionStillBlocked: checkpoint.executionAllowed === false
      && identityBinding.executionAllowed === false
      && auditHandoff.executionAllowed === false,
    readyForRealReadWindowCiArchiveArtifactManifest: false,
  };
}

function sourceDigests(
  checkpoint: RealReadAdapterProductionReadinessCheckpointProfile,
  identityBinding: RealReadWindowOperatorIdentityBindingProfile,
  auditHandoff: RealReadWindowAuditStoreHandoffContractProfile,
): string[] {
  return [
    checkpoint.checkpoint.sourceArchiveDigest,
    checkpoint.checkpoint.sourceVerificationDigest,
    checkpoint.checkpoint.sourcePacketDigest,
    checkpoint.checkpoint.checkpointDigest,
    identityBinding.packet.bindingDigest,
    auditHandoff.handoffContract.handoffDigest,
  ];
}

function collectProductionBlockers(
  checks: RealReadWindowCiArchiveArtifactManifestProfile["checks"],
): CiArtifactManifestMessage[] {
  const blockers: CiArtifactManifestMessage[] = [];
  addMessage(blockers, checks.sourceCheckpointReady, "SOURCE_CHECKPOINT_NOT_READY", "real-read-adapter-production-readiness-checkpoint", "Node v197 checkpoint must be ready before CI manifest publication.");
  addMessage(blockers, checks.sourceCheckpointDigestValid, "SOURCE_CHECKPOINT_DIGEST_INVALID", "real-read-adapter-production-readiness-checkpoint", "Node v197 checkpoint digest must be valid.");
  addMessage(blockers, checks.sourceIdentityBindingReady, "SOURCE_IDENTITY_BINDING_NOT_READY", "real-read-window-operator-identity-binding", "Node v198 identity binding must be ready before CI manifest publication.");
  addMessage(blockers, checks.sourceIdentityBindingDigestValid, "SOURCE_IDENTITY_BINDING_DIGEST_INVALID", "real-read-window-operator-identity-binding", "Node v198 binding digest must be valid.");
  addMessage(blockers, checks.sourceAuditHandoffReady, "SOURCE_AUDIT_HANDOFF_NOT_READY", "real-read-window-audit-store-handoff-contract", "Node v199 audit handoff contract must be ready before CI manifest publication.");
  addMessage(blockers, checks.sourceAuditHandoffDigestValid, "SOURCE_AUDIT_HANDOFF_DIGEST_INVALID", "real-read-window-audit-store-handoff-contract", "Node v199 handoff digest must be valid.");
  addMessage(blockers, checks.artifactRecordsComplete, "ARTIFACT_RECORDS_INCOMPLETE", "real-read-window-ci-archive-artifact-manifest", "Manifest must declare Node v191-v199 artifact records.");
  addMessage(blockers, checks.artifactRecordsReadOnly, "ARTIFACT_RECORDS_NOT_READ_ONLY", "real-read-window-ci-archive-artifact-manifest", "Artifact records must remain read-only declarations in v200.");
  addMessage(blockers, checks.artifactRecordDigestsValid, "ARTIFACT_RECORD_DIGEST_INVALID", "real-read-window-ci-archive-artifact-manifest", "Each artifact record must have a valid digest.");
  addMessage(blockers, checks.requiredFileKindsCovered, "FILE_KIND_REQUIREMENTS_INCOMPLETE", "real-read-window-ci-archive-artifact-manifest", "Manifest must cover JSON/endpoint, Markdown, screenshot, and explanation file kinds.");
  addMessage(blockers, checks.localArchivePathsDeclared, "LOCAL_ARCHIVE_PATHS_INCOMPLETE", "real-read-window-ci-archive-artifact-manifest", "Each artifact record must declare local archive paths.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionWindowStillBlocked, "PRODUCTION_WINDOW_UNLOCKED", "runtime-config", "v200 must not open a production real-read window.");
  addMessage(blockers, checks.executionStillBlocked, "EXECUTION_UNLOCKED", "runtime-config", "v200 must not unlock execution.");
  blockers.push({
    code: "CI_ARTIFACT_STORE_NOT_CONNECTED",
    severity: "blocker",
    source: "ci-artifact-store",
    message: "The manifest is ready, but a real CI artifact store/upload job is still not connected.",
  });
  return blockers;
}

function collectWarnings(manifestState: RealReadWindowCiArchiveArtifactManifestProfile["manifestState"]): CiArtifactManifestMessage[] {
  return [
    {
      code: manifestState === "blocked" ? "CI_ARTIFACT_MANIFEST_BLOCKED" : "CI_ARTIFACT_MANIFEST_SCHEMA_ONLY",
      severity: "warning",
      source: "real-read-window-ci-archive-artifact-manifest",
      message: manifestState === "blocked"
        ? "CI archive artifact manifest has missing source evidence."
        : "CI archive artifact manifest is a schema and local path declaration only in v200.",
    },
  ];
}

function collectRecommendations(): CiArtifactManifestMessage[] {
  return [
    {
      code: "PROCEED_TO_POST_V200_PLAN",
      severity: "recommendation",
      source: "real-read-window-ci-archive-artifact-manifest",
      message: "Start a new post-v200 plan before adding real CI artifact upload, managed audit persistence, or approval execution.",
    },
  ];
}

function addMessage(
  messages: CiArtifactManifestMessage[],
  condition: boolean,
  code: string,
  source: CiArtifactManifestMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({
      code,
      severity: "blocker",
      source,
      message,
    });
  }
}

function renderArtifactRecord(record: CiArtifactRecord): string[] {
  return [
    `- ${record.version}: ${record.role}`,
    `  - localArchiveRoot: ${record.localArchiveRoot}`,
    `  - sourceDigest: ${record.sourceDigest}`,
    `  - recordDigest: ${record.recordDigest}`,
    `  - jsonOrEndpoint: ${record.requiredFiles.jsonOrEndpoint}`,
    `  - markdown: ${record.requiredFiles.markdown}`,
    `  - screenshot: ${record.requiredFiles.screenshot}`,
    `  - explanation: ${record.requiredFiles.explanation}`,
    `  - readOnly: ${record.readOnly}`,
    `  - writesNow: ${record.writesNow}`,
    `  - ciPublished: ${record.ciPublished}`,
  ];
}

function renderFileKindRequirement(requirement: CiFileKindRequirement): string[] {
  return [
    `- ${requirement.kind}`,
    `  - requiredForEachRecord: ${requirement.requiredForEachRecord}`,
    `  - currentManifestDeclaresPath: ${requirement.currentManifestDeclaresPath}`,
    `  - verifiedByCiNow: ${requirement.verifiedByCiNow}`,
  ];
}

function endpointSource(endpoint: string): string {
  return sha256StableJson({ endpoint, source: "local-endpoint-reference" });
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}
