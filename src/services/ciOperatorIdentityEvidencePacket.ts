import type { IncomingHttpHeaders } from "node:http";

import type { AppConfig } from "../config.js";
import {
  extractRequestIdentityFromHeaders,
  type RequestIdentity,
} from "./accessGuard.js";
import type { AccessPolicyRole } from "./accessPolicyProfile.js";
import {
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadCiEvidenceHardeningPacket,
  type CiEvidenceHardeningPacketProfile,
} from "./ciEvidenceHardeningPacket.js";

type PacketState = "ready-for-operator-identity-evidence" | "blocked";
type IdentityEvidenceActor = "node" | "local-operator" | "ci-runner";

interface PacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "ci-operator-identity-evidence-packet"
    | "ci-evidence-hardening-packet"
    | "local-smoke-headers"
    | "github-actions"
    | "runtime-config";
  message: string;
}

interface LocalSmokeIdentityEvidence {
  id: "local-smoke-header-identity";
  source: "request-headers";
  operatorId: string | null;
  roles: AccessPolicyRole[];
  authSource: RequestIdentity["authSource"];
  authenticated: boolean;
  rawRoles: string[];
  rejectedRoles: string[];
  requiredForLocalSmoke: true;
  productionReady: false;
  readsSecrets: false;
}

interface GitHubActionsIdentityExpectation {
  id: string;
  field: "GITHUB_ACTOR" | "GITHUB_TRIGGERING_ACTOR" | "GITHUB_WORKFLOW" | "GITHUB_RUN_ID" | "GITHUB_RUN_ATTEMPT" | "GITHUB_SHA";
  purpose: string;
  requiredForCiEvidence: boolean;
  readFromSecretStore: false;
}

interface IdentityBindingRule {
  id: string;
  boundary:
    | "local-smoke"
    | "github-actions"
    | "audit-context"
    | "production-auth"
    | "upstream-safety";
  rule: string;
  blocksProductionExecution: true;
}

interface IdentityEvidenceStep {
  order: number;
  phase: "collect" | "verify" | "bind" | "preserve" | "closeout";
  actor: IdentityEvidenceActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  executionAllowed: false;
  upstreamActionsEnabled: false;
}

export interface CiOperatorIdentityEvidencePacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "ci-operator-identity-evidence-packet.v1";
  packetState: PacketState;
  readyForCiOperatorIdentityEvidencePacket: boolean;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readOnly: true;
  executionAllowed: false;
  packet: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  localSmokeIdentity: LocalSmokeIdentityEvidence;
  githubActionsIdentityExpectations: GitHubActionsIdentityExpectation[];
  identityBindingRules: IdentityBindingRule[];
  identityEvidenceSteps: IdentityEvidenceStep[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: PacketMessage[];
  warnings: PacketMessage[];
  recommendations: PacketMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  ciOperatorIdentityEvidencePacketJson: "/api/v1/ci/operator-identity-evidence-packet",
  ciOperatorIdentityEvidencePacketMarkdown: "/api/v1/ci/operator-identity-evidence-packet?format=markdown",
  ciEvidenceHardeningPacketJson: "/api/v1/ci/evidence-hardening-packet",
  operatorIdentityContractJson: "/api/v1/security/operator-identity-contract",
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
  accessPolicyJson: "/api/v1/security/access-policy",
  currentRoadmap: "docs/plans/v176-post-ci-evidence-hardening-roadmap.md",
});

export function loadCiOperatorIdentityEvidencePacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): CiOperatorIdentityEvidencePacketProfile {
  const sourcePacket = loadCiEvidenceHardeningPacket(config);
  const localSmokeIdentity = createLocalSmokeIdentityEvidence(headers);
  const githubActionsIdentityExpectations = createGitHubActionsIdentityExpectations();
  const identityBindingRules = createIdentityBindingRules();
  const identityEvidenceSteps = createIdentityEvidenceSteps();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    sourcePacket,
    localSmokeIdentity,
    githubActionsIdentityExpectations,
    identityBindingRules,
    identityEvidenceSteps,
    pauseConditions,
  );
  const packetDigest = digestPacket({
    profileVersion: "ci-operator-identity-evidence-packet.v1",
    sourceCiEvidenceHardeningDigest: sourcePacket.packet.packetDigest,
    localSmokeIdentity: {
      operatorId: localSmokeIdentity.operatorId,
      roles: localSmokeIdentity.roles,
      authSource: localSmokeIdentity.authSource,
      authenticated: localSmokeIdentity.authenticated,
      rejectedRoles: localSmokeIdentity.rejectedRoles,
    },
    githubActionsIdentityFields: githubActionsIdentityExpectations.map((item) => item.field),
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      packetDigestValid: undefined,
      readyForCiOperatorIdentityEvidencePacket: undefined,
    },
  });
  checks.packetDigestValid = isReleaseReportDigest(packetDigest);
  completeAggregateReadyCheck(checks, "readyForCiOperatorIdentityEvidencePacket");
  const packetState: PacketState = checks.readyForCiOperatorIdentityEvidencePacket
    ? "ready-for-operator-identity-evidence"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "CI operator identity evidence packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "ci-operator-identity-evidence-packet.v1",
    packetState,
    readyForCiOperatorIdentityEvidencePacket: checks.readyForCiOperatorIdentityEvidencePacket,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sourceCiEvidenceHardeningPacketDigest: sourcePacket.packet.packetDigest,
      sourceCiEvidenceHardeningProfileVersion: sourcePacket.profileVersion,
      sourceCiEvidenceHardeningPacketState: sourcePacket.packetState,
      identityMode: "header-rehearsal-only",
      localSmokeEndpoint: ENDPOINTS.ciOperatorIdentityEvidencePacketJson,
      localSmokeOperatorId: localSmokeIdentity.operatorId,
      localSmokeRoles: localSmokeIdentity.roles,
      localSmokeAuthSource: localSmokeIdentity.authSource,
      githubActionsIdentityExpectedOnly: true,
      githubActionsSecretReadAllowed: false,
      productionIdpConnected: false,
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      ciEvidenceHardeningPacket: summarizeSourcePacket(sourcePacket),
      safetyBoundary: {
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        readsProductionSecrets: false,
        connectsProductionIdp: false,
        createsApprovalDecision: false,
        releasesProduction: false,
        deploysProduction: false,
        rollsBackProduction: false,
      },
    },
    localSmokeIdentity,
    githubActionsIdentityExpectations,
    identityBindingRules,
    identityEvidenceSteps,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      githubActionsIdentityExpectationCount: githubActionsIdentityExpectations.length,
      identityBindingRuleCount: identityBindingRules.length,
      identityEvidenceStepCount: identityEvidenceSteps.length,
      pauseConditionCount: pauseConditions.length,
      localSmokeRoleCount: localSmokeIdentity.roles.length,
      localSmokeRejectedRoleCount: localSmokeIdentity.rejectedRoles.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this packet as the Node v177 identity evidence input for the next retention gate.",
      "Keep GitHub Actions identity fields as non-secret evidence expectations until a real IdP is introduced.",
      "Proceed with recommended parallel Java v63 + mini-kv v72 before Node v178 consumes retention evidence.",
    ],
  };
}

export function renderCiOperatorIdentityEvidencePacketMarkdown(
  profile: CiOperatorIdentityEvidencePacketProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "CI operator identity evidence packet",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for CI operator identity evidence packet": profile.readyForCiOperatorIdentityEvidencePacket,
      "Ready for production auth": profile.readyForProductionAuth,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Packet", entries: profile.packet },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source CI Evidence Hardening Packet", entries: profile.artifacts.ciEvidenceHardeningPacket },
      { heading: "Local Smoke Identity", entries: profile.localSmokeIdentity },
      { heading: "Safety Boundary", entries: profile.artifacts.safetyBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "GitHub Actions Identity Expectations",
        items: profile.githubActionsIdentityExpectations,
        renderItem: renderGitHubActionsIdentityExpectation,
      },
      {
        heading: "Identity Binding Rules",
        items: profile.identityBindingRules,
        renderItem: renderIdentityBindingRule,
      },
      {
        heading: "Identity Evidence Steps",
        items: profile.identityEvidenceSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Execution allowed", "executionAllowed"],
            ["Upstream actions enabled", "upstreamActionsEnabled"],
          ],
        }),
      },
      {
        heading: "Pause Conditions",
        items: profile.pauseConditions,
        renderItem: (condition) => [`- ${condition}`],
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No CI operator identity evidence blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No CI operator identity evidence warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No CI operator identity evidence recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createLocalSmokeIdentityEvidence(headers: IncomingHttpHeaders): LocalSmokeIdentityEvidence {
  const identity = extractRequestIdentityFromHeaders(headers);

  return {
    id: "local-smoke-header-identity",
    source: "request-headers",
    operatorId: identity.operatorId ?? null,
    roles: identity.roles,
    authSource: identity.authSource,
    authenticated: identity.authenticated,
    rawRoles: identity.rawRoles,
    rejectedRoles: identity.rejectedRoles,
    requiredForLocalSmoke: true,
    productionReady: false,
    readsSecrets: false,
  };
}

function createGitHubActionsIdentityExpectations(): GitHubActionsIdentityExpectation[] {
  return [
    {
      id: "github-actor",
      field: "GITHUB_ACTOR",
      purpose: "Records the account that triggered the workflow as non-secret CI evidence.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
    {
      id: "github-triggering-actor",
      field: "GITHUB_TRIGGERING_ACTOR",
      purpose: "Preserves the rerun initiator when it differs from the original actor.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
    {
      id: "github-workflow",
      field: "GITHUB_WORKFLOW",
      purpose: "Binds the evidence packet to the workflow name without granting release approval.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
    {
      id: "github-run-id",
      field: "GITHUB_RUN_ID",
      purpose: "Links the packet to the CI run URL and uploaded read-only artifacts.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
    {
      id: "github-run-attempt",
      field: "GITHUB_RUN_ATTEMPT",
      purpose: "Distinguishes reruns while keeping the evidence read-only.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
    {
      id: "github-sha",
      field: "GITHUB_SHA",
      purpose: "Binds CI evidence to the commit under verification.",
      requiredForCiEvidence: true,
      readFromSecretStore: false,
    },
  ];
}

function createIdentityBindingRules(): IdentityBindingRule[] {
  return [
    {
      id: "local-smoke-headers-required",
      boundary: "local-smoke",
      rule: "Local smoke must send x-orderops-operator-id and x-orderops-roles headers.",
      blocksProductionExecution: true,
    },
    {
      id: "github-actions-identity-is-non-secret",
      boundary: "github-actions",
      rule: "CI identity comes from GitHub-provided metadata fields, not from repository secrets.",
      blocksProductionExecution: true,
    },
    {
      id: "audit-context-preserved",
      boundary: "audit-context",
      rule: "Request audit context must preserve operatorId, roles, authSource, rawRoles, and rejectedRoles.",
      blocksProductionExecution: true,
    },
    {
      id: "production-idp-not-connected",
      boundary: "production-auth",
      rule: "This packet is identity evidence only; production IdP connection remains a future step.",
      blocksProductionExecution: true,
    },
    {
      id: "identity-does-not-unlock-upstream",
      boundary: "upstream-safety",
      rule: "A present operator identity does not enable upstream actions, release, deployment, rollback, or restore.",
      blocksProductionExecution: true,
    },
  ];
}

function createIdentityEvidenceSteps(): IdentityEvidenceStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      actor: "node",
      action: "Load Node v176 CI evidence hardening packet and keep its digest as the source evidence.",
      evidenceTarget: "sourceCiEvidenceHardeningPacketDigest",
      expectedEvidence: "Source packet is ready, digest-valid, and still blocks production operations.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 2,
      phase: "collect",
      actor: "local-operator",
      action: "Send local smoke headers for operator id and roles.",
      evidenceTarget: "localSmokeIdentity",
      expectedEvidence: "Packet records authenticated header identity without reading secrets.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 3,
      phase: "verify",
      actor: "ci-runner",
      action: "Expose GitHub Actions actor, workflow, run, attempt, and sha fields as expected non-secret evidence.",
      evidenceTarget: "githubActionsIdentityExpectations",
      expectedEvidence: "All CI identity fields are metadata fields and none are read from secret store.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 4,
      phase: "bind",
      actor: "node",
      action: "Bind local and CI identity evidence to a packet digest.",
      evidenceTarget: "packetDigest",
      expectedEvidence: "Digest covers source v176 digest, local identity, CI identity fields, and safety flags.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 5,
      phase: "preserve",
      actor: "node",
      action: "Expose JSON and Markdown packet routes for archive and later retention gate consumption.",
      evidenceTarget: "evidenceEndpoints",
      expectedEvidence: "Both routes remain viewer-read-only and do not mutate local or upstream state.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "local-operator",
      action: "Archive screenshot, explanation, and code walkthrough after verification.",
      evidenceTarget: "c/177 and code walkthrough",
      expectedEvidence: "Version evidence is archived before Java v63 + mini-kv v72 are consumed by Node v178.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
  ];
}

function createPauseConditions(): string[] {
  return [
    "UPSTREAM_ACTIONS_ENABLED must remain false.",
    "Operator identity evidence must not read production secrets.",
    "GitHub Actions identity fields must come from metadata, not secrets.",
    "This packet must not connect to a production IdP.",
    "Node must not start Java or mini-kv for this packet.",
    "A valid identity must not create approval, release, deployment, rollback, or restore authority.",
    "Missing local smoke operator headers blocks this packet and pauses the version.",
  ];
}

function createChecks(
  config: AppConfig,
  sourcePacket: CiEvidenceHardeningPacketProfile,
  localSmokeIdentity: LocalSmokeIdentityEvidence,
  githubActionsIdentityExpectations: GitHubActionsIdentityExpectation[],
  identityBindingRules: IdentityBindingRule[],
  identityEvidenceSteps: IdentityEvidenceStep[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourceCiEvidenceHardeningReady: sourcePacket.readyForCiEvidenceHardeningPacket
      && sourcePacket.packetState === "ready-for-ci-evidence-hardening",
    sourceCiEvidenceHardeningDigestValid: isReleaseReportDigest(sourcePacket.packet.packetDigest),
    sourceCiEvidenceHardeningStillBlocksProduction: sourcePacket.readyForProductionRelease === false
      && sourcePacket.readyForProductionDeployment === false
      && sourcePacket.readyForProductionRollback === false
      && sourcePacket.executionAllowed === false,
    localSmokeIdentityAuthenticated: localSmokeIdentity.authenticated,
    localSmokeIdentityAuthSourceHeaders: localSmokeIdentity.authSource === "headers",
    localSmokeOperatorIdPresent: typeof localSmokeIdentity.operatorId === "string"
      && localSmokeIdentity.operatorId.length > 0,
    localSmokeRolesPresent: localSmokeIdentity.roles.length > 0,
    localSmokeRejectedRolesRecorded: Array.isArray(localSmokeIdentity.rejectedRoles),
    localSmokeReadsNoSecrets: !localSmokeIdentity.readsSecrets,
    githubActionsIdentityExpectationsComplete: githubActionsIdentityExpectations.length === 6
      && githubActionsIdentityExpectations.some((item) => item.field === "GITHUB_ACTOR")
      && githubActionsIdentityExpectations.some((item) => item.field === "GITHUB_RUN_ID")
      && githubActionsIdentityExpectations.some((item) => item.field === "GITHUB_SHA"),
    githubActionsIdentityFieldsNonSecret: githubActionsIdentityExpectations.every((item) => !item.readFromSecretStore),
    identityBindingRulesComplete: identityBindingRules.length === 5
      && identityBindingRules.every((item) => item.blocksProductionExecution),
    identityEvidenceStepsComplete: identityEvidenceSteps.length === 6,
    identityEvidenceStepsReadOnly: identityEvidenceSteps.every((step) => (
      step.readOnly
      && !step.executionAllowed
      && !step.upstreamActionsEnabled
    )),
    pauseConditionsComplete: pauseConditions.length === 7
      && pauseConditions.includes("This packet must not connect to a production IdP.")
      && pauseConditions.includes("Missing local smoke operator headers blocks this packet and pauses the version."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noProductionIdpConnection: true,
    noProductionReleaseAuthorization: true,
    noDeploymentAuthorization: true,
    noRollbackAuthorization: true,
    noJavaOrMiniKvStart: true,
    packetDigestValid: false,
    readyForCiOperatorIdentityEvidencePacket: false,
  };
}

function summarizeSourcePacket(profile: CiEvidenceHardeningPacketProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    packetState: profile.packetState,
    packetDigest: profile.packet.packetDigest,
    readyForCiEvidenceHardeningPacket: profile.readyForCiEvidenceHardeningPacket,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): PacketMessage[] {
  return collectMessages("blocker", [
    { condition: checks.sourceCiEvidenceHardeningReady, code: "SOURCE_CI_EVIDENCE_HARDENING_NOT_READY", source: "ci-evidence-hardening-packet", message: "Node v176 CI evidence hardening packet must be ready before operator identity evidence is accepted." },
    { condition: checks.sourceCiEvidenceHardeningDigestValid, code: "SOURCE_CI_EVIDENCE_HARDENING_DIGEST_INVALID", source: "ci-evidence-hardening-packet", message: "Node v176 packet digest must be valid." },
    { condition: checks.sourceCiEvidenceHardeningStillBlocksProduction, code: "SOURCE_CI_EVIDENCE_HARDENING_UNLOCKS_PRODUCTION", source: "ci-evidence-hardening-packet", message: "Source packet must still block production release, deployment, and rollback." },
    { condition: checks.localSmokeIdentityAuthenticated, code: "LOCAL_SMOKE_IDENTITY_MISSING", source: "local-smoke-headers", message: "Local smoke must provide authenticated operator headers." },
    { condition: checks.localSmokeIdentityAuthSourceHeaders, code: "LOCAL_SMOKE_AUTH_SOURCE_NOT_HEADERS", source: "local-smoke-headers", message: "Local smoke identity must come from request headers in v177." },
    { condition: checks.localSmokeOperatorIdPresent, code: "LOCAL_SMOKE_OPERATOR_ID_MISSING", source: "local-smoke-headers", message: "Local smoke must include x-orderops-operator-id." },
    { condition: checks.localSmokeRolesPresent, code: "LOCAL_SMOKE_ROLES_MISSING", source: "local-smoke-headers", message: "Local smoke must include at least one allowed role." },
    { condition: checks.localSmokeRejectedRolesRecorded, code: "LOCAL_SMOKE_REJECTED_ROLES_NOT_RECORDED", source: "local-smoke-headers", message: "Local smoke evidence must preserve rejected role details." },
    { condition: checks.localSmokeReadsNoSecrets, code: "LOCAL_SMOKE_SECRET_READ_UNLOCKED", source: "local-smoke-headers", message: "Local smoke identity evidence must not read secrets." },
    { condition: checks.githubActionsIdentityExpectationsComplete, code: "GITHUB_ACTIONS_IDENTITY_EXPECTATIONS_INCOMPLETE", source: "github-actions", message: "GitHub Actions identity expectations must include actor, run id, and sha." },
    { condition: checks.githubActionsIdentityFieldsNonSecret, code: "GITHUB_ACTIONS_IDENTITY_SECRET_READ_UNLOCKED", source: "github-actions", message: "GitHub Actions identity fields must not be read from secret store." },
    { condition: checks.identityBindingRulesComplete, code: "IDENTITY_BINDING_RULES_INCOMPLETE", source: "ci-operator-identity-evidence-packet", message: "Identity binding rules must cover local smoke, CI metadata, audit, production auth, and upstream safety." },
    { condition: checks.identityEvidenceStepsComplete, code: "IDENTITY_EVIDENCE_STEPS_INCOMPLETE", source: "ci-operator-identity-evidence-packet", message: "Identity evidence packet must list all collection and closeout steps." },
    { condition: checks.identityEvidenceStepsReadOnly, code: "IDENTITY_EVIDENCE_STEPS_NOT_READ_ONLY", source: "ci-operator-identity-evidence-packet", message: "Identity evidence steps must remain read-only." },
    { condition: checks.pauseConditionsComplete, code: "PAUSE_CONDITIONS_INCOMPLETE", source: "ci-operator-identity-evidence-packet", message: "Pause conditions must cover identity evidence hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noProductionIdpConnection, code: "PRODUCTION_IDP_CONNECTED", source: "ci-operator-identity-evidence-packet", message: "v177 must not connect to production IdP." },
    { condition: checks.noProductionReleaseAuthorization, code: "PRODUCTION_RELEASE_UNLOCKED", source: "ci-operator-identity-evidence-packet", message: "Identity evidence must not authorize production release." },
    { condition: checks.noDeploymentAuthorization, code: "DEPLOYMENT_UNLOCKED", source: "ci-operator-identity-evidence-packet", message: "Identity evidence must not authorize deployment." },
    { condition: checks.noRollbackAuthorization, code: "ROLLBACK_UNLOCKED", source: "ci-operator-identity-evidence-packet", message: "Identity evidence must not authorize rollback." },
    { condition: checks.noJavaOrMiniKvStart, code: "UPSTREAM_START_UNLOCKED", source: "ci-operator-identity-evidence-packet", message: "Identity evidence must not start Java or mini-kv." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "ci-operator-identity-evidence-packet", message: "Packet digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "CI_OPERATOR_IDENTITY_EVIDENCE_BLOCKED"
        : "CI_OPERATOR_IDENTITY_EVIDENCE_NOT_PRODUCTION_AUTH",
      severity: "warning",
      source: "ci-operator-identity-evidence-packet",
      message: packetState === "blocked"
        ? "CI operator identity evidence packet has blockers."
        : "This packet records operator identity evidence but is not production authentication.",
    },
    {
      code: "HEADER_IDENTITY_REHEARSAL_ONLY",
      severity: "warning",
      source: "local-smoke-headers",
      message: "Header identity is accepted only as rehearsal evidence until real auth middleware exists.",
    },
  ];
}

function collectRecommendations(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_OPERATOR_IDENTITY_EVIDENCE_BLOCKERS"
        : "PROCEED_TO_RECOMMENDED_PARALLEL_RETENTION_FIXTURES",
      severity: "recommendation",
      source: "ci-operator-identity-evidence-packet",
      message: packetState === "blocked"
        ? "Fix missing identity or safety blockers before archiving v177."
        : "After v177, proceed with recommended parallel Java v63 + mini-kv v72 before Node v178.",
    },
  ];
}

function renderGitHubActionsIdentityExpectation(expectation: GitHubActionsIdentityExpectation): string[] {
  return [
    `### ${expectation.id}`,
    "",
    `- Field: ${expectation.field}`,
    `- Purpose: ${expectation.purpose}`,
    `- Required for CI evidence: ${expectation.requiredForCiEvidence}`,
    `- Read from secret store: ${expectation.readFromSecretStore}`,
    "",
  ];
}

function renderIdentityBindingRule(rule: IdentityBindingRule): string[] {
  return [
    `### ${rule.id}`,
    "",
    `- Boundary: ${rule.boundary}`,
    `- Rule: ${rule.rule}`,
    `- Blocks production execution: ${rule.blocksProductionExecution}`,
    "",
  ];
}

function collectMessages(
  severity: "blocker",
  specs: Array<{
    condition: boolean | undefined;
    code: string;
    source: PacketMessage["source"];
    message: string;
  }>,
): PacketMessage[] {
  const messages: PacketMessage[] = [];
  for (const spec of specs) {
    if (!spec.condition) {
      messages.push({ code: spec.code, severity, source: spec.source, message: spec.message });
    }
  }
  return messages;
}

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
