import type { AppConfig } from "../config.js";
import { createAuditStoreRuntimeProfile, type AuditStoreRuntimeProfile } from "./auditStoreRuntimeProfile.js";
import { createCiEvidenceCommandProfile, type CiEvidenceCommandProfile } from "./ciEvidenceCommandProfile.js";
import { createDeploymentSafetyProfile, type DeploymentSafetyProfile } from "./deploymentSafetyProfile.js";
import { loadRollbackEvidenceRunbook, type RollbackEvidenceRunbook } from "./rollbackEvidenceRunbook.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
  type UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
} from "./upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.js";
import { loadWorkflowEvidenceVerification, type WorkflowEvidenceVerification } from "./workflowEvidenceVerification.js";

export interface ProductionReadinessSummaryIndex {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  indexVersion: "production-readiness-summary-index.v1";
  maturityTarget: "production-leaning";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    releaseEvidenceReady: boolean;
    ciEvidenceProfileValid: boolean;
    workflowEvidenceValid: boolean;
    deploymentSafetyHasNoBlockers: boolean;
    rollbackRunbookReady: boolean;
    auditStoreProductionReady: boolean;
    allSectionsReadOnly: boolean;
    executionStillBlocked: boolean;
  };
  summary: {
    sectionCount: number;
    readySectionCount: number;
    notReadySectionCount: number;
    endpointCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  sections: ProductionReadinessSection[];
  productionBlockers: ProductionReadinessMessage[];
  warnings: ProductionReadinessMessage[];
  recommendations: ProductionReadinessMessage[];
  evidenceEndpoints: {
    productionReadinessSummaryJson: string;
    productionReadinessSummaryMarkdown: string;
    releaseEvidenceReadinessGateJson: string;
    ciEvidenceCommandProfileJson: string;
    workflowEvidenceVerificationJson: string;
    deploymentSafetyProfileJson: string;
    rollbackEvidenceRunbookJson: string;
    auditStoreRuntimeProfileJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessSection {
  id: string;
  title: string;
  endpoint: string;
  ready: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  blockerCount: number;
  warningCount: number;
  recommendationCount: number;
  note: string;
}

export interface ProductionReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryJson: "/api/v1/production/readiness-summary",
  productionReadinessSummaryMarkdown: "/api/v1/production/readiness-summary?format=markdown",
  releaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  workflowEvidenceVerificationJson: "/api/v1/ci/workflow-evidence-verification",
  deploymentSafetyProfileJson: "/api/v1/deployment/safety-profile",
  rollbackEvidenceRunbookJson: "/api/v1/deployment/rollback-runbook",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
});

export async function loadProductionReadinessSummaryIndex(
  config: AppConfig,
): Promise<ProductionReadinessSummaryIndex> {
  return createProductionReadinessSummaryIndex({
    releaseEvidenceGate: await loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(config),
    ciEvidenceCommandProfile: createCiEvidenceCommandProfile(config),
    workflowEvidenceVerification: await loadWorkflowEvidenceVerification(),
    deploymentSafetyProfile: createDeploymentSafetyProfile(config),
    rollbackEvidenceRunbook: await loadRollbackEvidenceRunbook(config),
    auditStoreRuntimeProfile: createAuditStoreRuntimeProfile(),
  });
}

export function createProductionReadinessSummaryIndex(input: {
  releaseEvidenceGate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate;
  ciEvidenceCommandProfile: CiEvidenceCommandProfile;
  workflowEvidenceVerification: WorkflowEvidenceVerification;
  deploymentSafetyProfile: DeploymentSafetyProfile;
  rollbackEvidenceRunbook: RollbackEvidenceRunbook;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
}): ProductionReadinessSummaryIndex {
  const sections = createSections(input);
  const checks = {
    releaseEvidenceReady: input.releaseEvidenceGate.readyForReleaseEvidenceArchive,
    ciEvidenceProfileValid: input.ciEvidenceCommandProfile.valid,
    workflowEvidenceValid: input.workflowEvidenceVerification.valid,
    deploymentSafetyHasNoBlockers: input.deploymentSafetyProfile.summary.blockerCount === 0,
    rollbackRunbookReady: input.rollbackEvidenceRunbook.readyForRollbackEvidenceArchive,
    auditStoreProductionReady: input.auditStoreRuntimeProfile.readyForProductionAudit,
    allSectionsReadOnly: sections.every((section) => section.readOnly),
    executionStillBlocked: sections.every((section) => section.executionAllowed === false),
  };
  const productionBlockers = collectProductionBlockers(input);
  const warnings = collectWarnings(input);
  const recommendations = collectRecommendations(input);

  return {
    service: "orderops-node",
    title: "Production readiness summary index",
    generatedAt: new Date().toISOString(),
    indexVersion: "production-readiness-summary-index.v1",
    maturityTarget: "production-leaning",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      sectionCount: sections.length,
      readySectionCount: sections.filter((section) => section.ready).length,
      notReadySectionCount: sections.filter((section) => !section.ready).length,
      endpointCount: Object.keys(ENDPOINTS).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    sections,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(productionBlockers.length),
  };
}

export function renderProductionReadinessSummaryIndexMarkdown(index: ProductionReadinessSummaryIndex): string {
  return [
    "# Production readiness summary index",
    "",
    `- Service: ${index.service}`,
    `- Generated at: ${index.generatedAt}`,
    `- Index version: ${index.indexVersion}`,
    `- Maturity target: ${index.maturityTarget}`,
    `- Ready for production operations: ${index.readyForProductionOperations}`,
    `- Read only: ${index.readOnly}`,
    `- Execution allowed: ${index.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(index.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(index.summary),
    "",
    "## Sections",
    "",
    ...index.sections.flatMap(renderSection),
    "## Production Blockers",
    "",
    ...renderMessages(index.productionBlockers, "No production readiness blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(index.warnings, "No production readiness warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(index.recommendations, "No production readiness recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(index.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(index.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createSections(input: {
  releaseEvidenceGate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate;
  ciEvidenceCommandProfile: CiEvidenceCommandProfile;
  workflowEvidenceVerification: WorkflowEvidenceVerification;
  deploymentSafetyProfile: DeploymentSafetyProfile;
  rollbackEvidenceRunbook: RollbackEvidenceRunbook;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
}): ProductionReadinessSection[] {
  return [
    {
      id: "release-evidence-readiness",
      title: input.releaseEvidenceGate.title,
      endpoint: ENDPOINTS.releaseEvidenceReadinessGateJson,
      ready: input.releaseEvidenceGate.readyForReleaseEvidenceArchive,
      readOnly: input.releaseEvidenceGate.readOnly,
      executionAllowed: input.releaseEvidenceGate.executionAllowed,
      blockerCount: input.releaseEvidenceGate.summary.blockerCount,
      warningCount: input.releaseEvidenceGate.summary.warningCount,
      recommendationCount: 0,
      note: "Scenario fixture release evidence can be archived, but does not authorize execution.",
    },
    {
      id: "ci-evidence-command-profile",
      title: input.ciEvidenceCommandProfile.title,
      endpoint: ENDPOINTS.ciEvidenceCommandProfileJson,
      ready: input.ciEvidenceCommandProfile.valid,
      readOnly: input.ciEvidenceCommandProfile.readOnly,
      executionAllowed: input.ciEvidenceCommandProfile.executionAllowed,
      blockerCount: input.ciEvidenceCommandProfile.summary.blockerCount,
      warningCount: input.ciEvidenceCommandProfile.summary.warningCount,
      recommendationCount: 0,
      note: "CI commands are safe and read-only, with manual authorization excluded from default runs.",
    },
    {
      id: "workflow-evidence-verification",
      title: input.workflowEvidenceVerification.title,
      endpoint: ENDPOINTS.workflowEvidenceVerificationJson,
      ready: input.workflowEvidenceVerification.valid,
      readOnly: input.workflowEvidenceVerification.readOnly,
      executionAllowed: input.workflowEvidenceVerification.executionAllowed,
      blockerCount: input.workflowEvidenceVerification.summary.blockerCount,
      warningCount: input.workflowEvidenceVerification.summary.warningCount,
      recommendationCount: 0,
      note: "Checked-in GitHub Actions workflow still avoids secrets and deployment commands.",
    },
    {
      id: "deployment-safety-profile",
      title: input.deploymentSafetyProfile.title,
      endpoint: ENDPOINTS.deploymentSafetyProfileJson,
      ready: input.deploymentSafetyProfile.summary.blockerCount === 0,
      readOnly: input.deploymentSafetyProfile.readOnly,
      executionAllowed: input.deploymentSafetyProfile.executionAllowed,
      blockerCount: input.deploymentSafetyProfile.summary.blockerCount,
      warningCount: input.deploymentSafetyProfile.summary.warningCount,
      recommendationCount: input.deploymentSafetyProfile.summary.recommendationCount,
      note: "Runtime is suitable for a production demo review but still has deployment warnings.",
    },
    {
      id: "rollback-evidence-runbook",
      title: input.rollbackEvidenceRunbook.title,
      endpoint: ENDPOINTS.rollbackEvidenceRunbookJson,
      ready: input.rollbackEvidenceRunbook.readyForRollbackEvidenceArchive,
      readOnly: input.rollbackEvidenceRunbook.readOnly,
      executionAllowed: input.rollbackEvidenceRunbook.executionAllowed,
      blockerCount: input.rollbackEvidenceRunbook.summary.blockerCount,
      warningCount: input.rollbackEvidenceRunbook.summary.warningCount,
      recommendationCount: input.rollbackEvidenceRunbook.summary.recommendationCount,
      note: "Rollback runbook is archive-ready but deliberately does not execute rollback commands.",
    },
    {
      id: "audit-store-runtime-profile",
      title: input.auditStoreRuntimeProfile.title,
      endpoint: ENDPOINTS.auditStoreRuntimeProfileJson,
      ready: input.auditStoreRuntimeProfile.readyForProductionAudit,
      readOnly: input.auditStoreRuntimeProfile.readOnly,
      executionAllowed: input.auditStoreRuntimeProfile.executionAllowed,
      blockerCount: input.auditStoreRuntimeProfile.summary.productionBlockerCount,
      warningCount: input.auditStoreRuntimeProfile.summary.warningCount,
      recommendationCount: input.auditStoreRuntimeProfile.summary.recommendationCount,
      note: "Audit capture is safe for local runtime but blocked for production until durable storage exists.",
    },
  ];
}

function collectProductionBlockers(input: {
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
}): ProductionReadinessMessage[] {
  return input.auditStoreRuntimeProfile.productionBlockers.map((message) => ({
    code: message.code,
    severity: "blocker",
    source: "audit-store-runtime-profile",
    message: message.message,
  }));
}

function collectWarnings(input: {
  releaseEvidenceGate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate;
  ciEvidenceCommandProfile: CiEvidenceCommandProfile;
  workflowEvidenceVerification: WorkflowEvidenceVerification;
  deploymentSafetyProfile: DeploymentSafetyProfile;
  rollbackEvidenceRunbook: RollbackEvidenceRunbook;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
}): ProductionReadinessMessage[] {
  return [
    ...input.releaseEvidenceGate.warnings.map((message) => fromMessage("release-evidence-readiness", message)),
    ...input.ciEvidenceCommandProfile.warnings.map((message) => fromMessage("ci-evidence-command-profile", message)),
    ...input.workflowEvidenceVerification.warnings.map((message) => fromMessage("workflow-evidence-verification", message)),
    ...input.deploymentSafetyProfile.warnings.map((message) => fromMessage("deployment-safety-profile", message)),
    ...input.rollbackEvidenceRunbook.stopConditions.map((condition) => ({
      code: condition.code,
      severity: "warning" as const,
      source: "rollback-evidence-runbook",
      message: condition.message,
    })),
    ...input.auditStoreRuntimeProfile.warnings.map((message) => fromMessage("audit-store-runtime-profile", message)),
  ];
}

function collectRecommendations(input: {
  deploymentSafetyProfile: DeploymentSafetyProfile;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
}): ProductionReadinessMessage[] {
  return [
    ...input.deploymentSafetyProfile.recommendations.map((message) => fromMessage("deployment-safety-profile", message)),
    ...input.auditStoreRuntimeProfile.recommendations.map((message) => fromMessage("audit-store-runtime-profile", message)),
  ];
}

function fromMessage(
  source: string,
  message: { code: string; severity: string; message: string },
): ProductionReadinessMessage {
  return {
    code: message.code,
    severity: message.severity === "recommendation" ? "recommendation" : "warning",
    source,
    message: message.message,
  };
}

function collectNextActions(productionBlockerCount: number): string[] {
  if (productionBlockerCount === 0) {
    return [
      "Archive this summary index with the referenced evidence endpoints.",
      "Run a coordinated read-only upstream probe window before any public demo.",
      "Keep real upstream execution disabled until a separate audited workflow exists.",
    ];
  }

  return [
    "Resolve production blockers before calling the Node control plane production-ready.",
    "Prioritize durable audit storage, access control, and upstream observability evidence.",
    "Use the next plan to decide whether Java or mini-kv should provide stronger upstream evidence.",
  ];
}

function renderSection(section: ProductionReadinessSection): string[] {
  return [
    `### ${section.id}`,
    "",
    `- Title: ${section.title}`,
    `- Endpoint: ${section.endpoint}`,
    `- Ready: ${section.ready}`,
    `- Read only: ${section.readOnly}`,
    `- Execution allowed: ${section.executionAllowed}`,
    `- Blocker count: ${section.blockerCount}`,
    `- Warning count: ${section.warningCount}`,
    `- Recommendation count: ${section.recommendationCount}`,
    `- Note: ${section.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: Record<string, unknown>): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
