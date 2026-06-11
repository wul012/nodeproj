import {
  loadProductionShardExecutionCandidateArchiveVerification,
  renderProductionShardExecutionCandidateArchiveVerificationMarkdown,
} from "../services/productionShardExecutionCandidateArchiveVerification.js";
import {
  loadProductionShardExecutionCandidateContract,
  renderProductionShardExecutionCandidateContractMarkdown,
} from "../services/productionShardExecutionCandidateContract.js";
import {
  loadProductionShardExecutionCloseout,
  renderProductionShardExecutionCloseoutMarkdown,
} from "../services/productionShardExecutionCloseout.js";
import {
  loadProductionShardExecutionExternalEvidenceCloseout,
  renderProductionShardExecutionExternalEvidenceCloseoutMarkdown,
} from "../services/productionShardExecutionExternalEvidenceCloseout.js";
import {
  loadProductionShardExecutionFailureMatrix,
  renderProductionShardExecutionFailureMatrixMarkdown,
} from "../services/productionShardExecutionFailureMatrix.js";
import {
  loadProductionShardExecutionHandoffReadiness,
  renderProductionShardExecutionHandoffReadinessMarkdown,
} from "../services/productionShardExecutionHandoffReadiness.js";
import {
  loadProductionShardExecutionManagedAuditStoreBindingPreflight,
  renderProductionShardExecutionManagedAuditStoreBindingPreflightMarkdown,
} from "../services/productionShardExecutionManagedAuditStoreBindingPreflight.js";
import {
  loadProductionShardExecutionOperatorWindowWorksheet,
  renderProductionShardExecutionOperatorWindowWorksheetMarkdown,
} from "../services/productionShardExecutionOperatorWindowWorksheet.js";
import {
  loadProductionShardExecutionOwnerReceiptRequestPacket,
  renderProductionShardExecutionOwnerReceiptRequestPacketMarkdown,
} from "../services/productionShardExecutionOwnerReceiptRequestPacket.js";
import {
  loadProductionShardExecutionRouteCatalogForwardCompatibility,
  renderProductionShardExecutionRouteCatalogForwardCompatibilityMarkdown,
} from "../services/productionShardExecutionRouteCatalogForwardCompatibility.js";
import {
  loadProductionShardExecutionSignedApprovalIntakeContract,
  renderProductionShardExecutionSignedApprovalIntakeContractMarkdown,
} from "../services/productionShardExecutionSignedApprovalIntakeContract.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const productionShardExecutionAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-handoff-readiness", (deps) =>
    loadProductionShardExecutionHandoffReadiness({
      config: deps.config,
    }), renderProductionShardExecutionHandoffReadinessMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-candidate-contract", (deps) =>
    loadProductionShardExecutionCandidateContract({
      config: deps.config,
    }), renderProductionShardExecutionCandidateContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-failure-matrix", (deps) =>
    loadProductionShardExecutionFailureMatrix({
      config: deps.config,
    }), renderProductionShardExecutionFailureMatrixMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-operator-window-worksheet", (deps) =>
    loadProductionShardExecutionOperatorWindowWorksheet({
      config: deps.config,
    }), renderProductionShardExecutionOperatorWindowWorksheetMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-candidate-archive-verification", (deps) =>
    loadProductionShardExecutionCandidateArchiveVerification({
      config: deps.config,
    }), renderProductionShardExecutionCandidateArchiveVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-closeout", (deps) =>
    loadProductionShardExecutionCloseout({
      config: deps.config,
    }), renderProductionShardExecutionCloseoutMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-route-catalog-forward-compatibility", (deps) =>
    loadProductionShardExecutionRouteCatalogForwardCompatibility({
      config: deps.config,
    }), renderProductionShardExecutionRouteCatalogForwardCompatibilityMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-signed-approval-intake-contract", (deps) =>
    loadProductionShardExecutionSignedApprovalIntakeContract({
      config: deps.config,
    }), renderProductionShardExecutionSignedApprovalIntakeContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-managed-audit-store-binding-preflight", (deps) =>
    loadProductionShardExecutionManagedAuditStoreBindingPreflight({
      config: deps.config,
    }), renderProductionShardExecutionManagedAuditStoreBindingPreflightMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-owner-receipt-request-packet", (deps) =>
    loadProductionShardExecutionOwnerReceiptRequestPacket({
      config: deps.config,
    }), renderProductionShardExecutionOwnerReceiptRequestPacketMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/production-shard-execution-external-evidence-closeout", (deps) =>
    loadProductionShardExecutionExternalEvidenceCloseout({
      config: deps.config,
    }), renderProductionShardExecutionExternalEvidenceCloseoutMarkdown),
];
