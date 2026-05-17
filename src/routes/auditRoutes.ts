import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { AuditLog } from "../services/auditLog.js";
import {
  createAuditStoreRuntimeProfile,
  renderAuditStoreRuntimeProfileMarkdown,
} from "../services/auditStoreRuntimeProfile.js";
import {
  createAuditStoreEnvConfigProfile,
  renderAuditStoreEnvConfigProfileMarkdown,
} from "../services/auditStoreEnvConfigProfile.js";
import {
  createFileAuditRestartEvidenceReport,
  renderFileAuditRestartEvidenceMarkdown,
} from "../services/fileAuditRestartEvidence.js";
import {
  createAuditRetentionIntegrityEvidence,
  renderAuditRetentionIntegrityEvidenceMarkdown,
} from "../services/auditRetentionIntegrityEvidence.js";
import {
  createManagedAuditStoreContractProfile,
  renderManagedAuditStoreContractMarkdown,
} from "../services/managedAuditStoreContract.js";
import {
  createManagedAuditReadinessSummary,
  renderManagedAuditReadinessSummaryMarkdown,
} from "../services/managedAuditReadinessSummary.js";
import {
  createManagedAuditAdapterBoundaryProfile,
  renderManagedAuditAdapterBoundaryMarkdown,
} from "../services/managedAuditAdapterBoundary.js";
import {
  createManagedAuditAdapterComplianceProfile,
  renderManagedAuditAdapterComplianceMarkdown,
} from "../services/managedAuditAdapterCompliance.js";
import {
  createManagedAuditAdapterRunnerProfile,
  renderManagedAuditAdapterRunnerMarkdown,
} from "../services/managedAuditAdapterRunner.js";
import {
  loadManagedAuditPersistenceBoundaryCandidate,
  renderManagedAuditPersistenceBoundaryCandidateMarkdown,
} from "../services/managedAuditPersistenceBoundaryCandidate.js";
import {
  loadManagedAuditPersistenceDryRunVerification,
  renderManagedAuditPersistenceDryRunVerificationMarkdown,
} from "../services/managedAuditPersistenceDryRunVerification.js";
import {
  loadManagedAuditIdentityApprovalBindingContract,
  renderManagedAuditIdentityApprovalBindingContractMarkdown,
} from "../services/managedAuditIdentityApprovalBindingContract.js";
import {
  loadManagedAuditIdentityApprovalProvenanceDryRunPacket,
  renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown,
} from "../services/managedAuditIdentityApprovalProvenanceDryRunPacket.js";
import {
  loadManagedAuditIdentityApprovalProvenancePacketVerificationReport,
  renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown,
} from "../services/managedAuditIdentityApprovalProvenancePacketVerificationReport.js";
import {
  loadManagedAuditPacketRestoreDrillPlan,
  renderManagedAuditPacketRestoreDrillPlanMarkdown,
} from "../services/managedAuditPacketRestoreDrillPlan.js";
import {
  loadManagedAuditRestoreDrillArchiveVerification,
  renderManagedAuditRestoreDrillArchiveVerificationMarkdown,
} from "../services/managedAuditRestoreDrillArchiveVerification.js";
import {
  loadManagedAuditDryRunAdapterCandidate,
  renderManagedAuditDryRunAdapterCandidateMarkdown,
} from "../services/managedAuditDryRunAdapterCandidate.js";
import {
  loadManagedAuditDryRunAdapterArchiveVerification,
  renderManagedAuditDryRunAdapterArchiveVerificationMarkdown,
} from "../services/managedAuditDryRunAdapterArchiveVerification.js";
import {
  loadManagedAuditAdapterProductionHardeningReadinessGate,
  renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown,
} from "../services/managedAuditAdapterProductionHardeningReadinessGate.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  renderManagedAuditRouteHelperQualityPassMarkdown,
} from "../services/managedAuditRouteHelperQualityPass.js";
import {
  loadManagedAuditAdapterImplementationPrecheckPacket,
  renderManagedAuditAdapterImplementationPrecheckPacketMarkdown,
} from "../services/managedAuditAdapterImplementationPrecheckPacket.js";
import {
  loadManagedAuditAdapterDisabledShell,
  renderManagedAuditAdapterDisabledShellMarkdown,
} from "../services/managedAuditAdapterDisabledShell.js";
import {
  loadManagedAuditLocalAdapterCandidateDryRun,
  renderManagedAuditLocalAdapterCandidateDryRunMarkdown,
} from "../services/managedAuditLocalAdapterCandidateDryRun.js";
import {
  loadManagedAuditLocalAdapterCandidateVerificationReport,
  renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown,
} from "../services/managedAuditLocalAdapterCandidateVerificationReport.js";
import {
  loadManagedAuditExternalAdapterConnectionReadinessReview,
  renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown,
} from "../services/managedAuditExternalAdapterConnectionReadinessReview.js";
import {
  loadManagedAuditSandboxAdapterDryRunPlan,
  renderManagedAuditSandboxAdapterDryRunPlanMarkdown,
} from "../services/managedAuditSandboxAdapterDryRunPlan.js";
import {
  loadManagedAuditSandboxAdapterDryRunPackage,
  renderManagedAuditSandboxAdapterDryRunPackageMarkdown,
} from "../services/managedAuditSandboxAdapterDryRunPackage.js";
import {
  loadManagedAuditManualSandboxAdapterConnectionRunbook,
  renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown,
} from "../services/managedAuditManualSandboxAdapterConnectionRunbook.js";
import {
  loadManagedAuditManualSandboxConnectionEvidenceChecklist,
  renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown,
} from "../services/managedAuditManualSandboxConnectionEvidenceChecklist.js";
import {
  loadManagedAuditManualSandboxConnectionOperatorPacket,
  renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown,
} from "../services/managedAuditManualSandboxConnectionOperatorPacket.js";
import type { AuditStoreRuntimeDescription } from "../services/auditStoreFactory.js";

interface AuditRouteDeps {
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  config: AppConfig;
}

interface EventsQuery {
  limit?: number;
}

interface AuditStoreProfileQuery {
  format?: "json" | "markdown";
}

const auditStoreProfileRouteSchema = {
  querystring: {
    type: "object",
    properties: {
      format: { type: "string", enum: ["json", "markdown"] },
    },
    additionalProperties: false,
  },
};

function registerAuditJsonMarkdownRoute<TProfile>(
  app: FastifyInstance,
  routePath: string,
  loadProfile: () => TProfile | Promise<TProfile>,
  renderMarkdown: (profile: TProfile) => string,
): void {
  app.get<{ Querystring: AuditStoreProfileQuery }>(routePath, {
    schema: auditStoreProfileRouteSchema,
  }, async (request, reply) => {
    const profile = await loadProfile();

    if (request.query.format === "markdown") {
      reply.type("text/markdown; charset=utf-8");
      return renderMarkdown(profile);
    }

    return profile;
  });
}

export async function registerAuditRoutes(app: FastifyInstance, deps: AuditRouteDeps): Promise<void> {
  app.get<{ Querystring: EventsQuery }>("/api/v1/audit/events", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 200 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => ({
    events: deps.auditLog.list(request.query.limit ?? 50),
  }));

  app.get("/api/v1/audit/summary", async () => deps.auditLog.summary());

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/store-profile", () => createAuditStoreRuntimeProfile({
      currentEventCount: deps.auditLog.summary().total,
      runtime: deps.auditStoreRuntime,
  }), renderAuditStoreRuntimeProfileMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/store-config-profile", () => createAuditStoreEnvConfigProfile({
      auditStoreKind: deps.config.auditStoreKind,
      auditStorePath: deps.config.auditStorePath,
      auditStoreUrl: deps.config.auditStoreUrl,
  }), renderAuditStoreEnvConfigProfileMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/file-restart-evidence", () => createFileAuditRestartEvidenceReport({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
  }), renderFileAuditRestartEvidenceMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/retention-integrity-evidence", () => createAuditRetentionIntegrityEvidence({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
  }), renderAuditRetentionIntegrityEvidenceMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-store-contract", () => createManagedAuditStoreContractProfile(deps.config), renderManagedAuditStoreContractMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-readiness-summary", () => createManagedAuditReadinessSummary({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
      auditLog: deps.auditLog,
  }), renderManagedAuditReadinessSummaryMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-adapter-boundary", () => createManagedAuditAdapterBoundaryProfile({
      config: deps.config,
      runtime: deps.auditStoreRuntime,
  }), renderManagedAuditAdapterBoundaryMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-persistence-boundary-candidate", () => loadManagedAuditPersistenceBoundaryCandidate({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceBoundaryCandidateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-persistence-dry-run-verification", () => loadManagedAuditPersistenceDryRunVerification({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPersistenceDryRunVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-binding-contract", () => loadManagedAuditIdentityApprovalBindingContract({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalBindingContractMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-provenance-dry-run-packet", () => loadManagedAuditIdentityApprovalProvenanceDryRunPacket({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenanceDryRunPacketMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-identity-approval-provenance-packet-verification-report", () => loadManagedAuditIdentityApprovalProvenancePacketVerificationReport({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditIdentityApprovalProvenancePacketVerificationReportMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-packet-restore-drill-plan", () => loadManagedAuditPacketRestoreDrillPlan({
    config: deps.config,
    runtime: deps.auditStoreRuntime,
    auditLog: deps.auditLog,
    orderPlatform: deps.orderPlatform,
    miniKv: deps.miniKv,
  }), renderManagedAuditPacketRestoreDrillPlanMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-restore-drill-archive-verification", () => loadManagedAuditRestoreDrillArchiveVerification({
    config: deps.config,
  }), renderManagedAuditRestoreDrillArchiveVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-dry-run-adapter-candidate", () => loadManagedAuditDryRunAdapterCandidate({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterCandidateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification", () => loadManagedAuditDryRunAdapterArchiveVerification({
    config: deps.config,
  }), renderManagedAuditDryRunAdapterArchiveVerificationMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-adapter-production-hardening-readiness-gate", () => loadManagedAuditAdapterProductionHardeningReadinessGate({
    config: deps.config,
  }), renderManagedAuditAdapterProductionHardeningReadinessGateMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-route-helper-quality-pass", () => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-adapter-implementation-precheck-packet", () => loadManagedAuditAdapterImplementationPrecheckPacket({
    config: deps.config,
  }), renderManagedAuditAdapterImplementationPrecheckPacketMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-adapter-disabled-shell", () => loadManagedAuditAdapterDisabledShell({
    config: deps.config,
  }), renderManagedAuditAdapterDisabledShellMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run", () => loadManagedAuditLocalAdapterCandidateDryRun({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateDryRunMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report", () => loadManagedAuditLocalAdapterCandidateVerificationReport({
    config: deps.config,
  }), renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review", () => loadManagedAuditExternalAdapterConnectionReadinessReview({
    config: deps.config,
  }), renderManagedAuditExternalAdapterConnectionReadinessReviewMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan", () => loadManagedAuditSandboxAdapterDryRunPlan({
    config: deps.config,
  }), renderManagedAuditSandboxAdapterDryRunPlanMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package", () => loadManagedAuditSandboxAdapterDryRunPackage({
    config: deps.config,
  }), renderManagedAuditSandboxAdapterDryRunPackageMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook", () => loadManagedAuditManualSandboxAdapterConnectionRunbook({
    config: deps.config,
  }), renderManagedAuditManualSandboxAdapterConnectionRunbookMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-connection-evidence-checklist", () => loadManagedAuditManualSandboxConnectionEvidenceChecklist({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionEvidenceChecklistMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-audit-manual-sandbox-connection-operator-packet", () => loadManagedAuditManualSandboxConnectionOperatorPacket({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionOperatorPacketMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-adapter-compliance", () => createManagedAuditAdapterComplianceProfile(deps.config), renderManagedAuditAdapterComplianceMarkdown);

  registerAuditJsonMarkdownRoute(app, "/api/v1/audit/managed-adapter-runner", () => createManagedAuditAdapterRunnerProfile(deps.config), renderManagedAuditAdapterRunnerMarkdown);
}
