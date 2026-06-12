import {
  loadCodeWalkthroughDocumentationQualityGate,
  renderCodeWalkthroughDocumentationQualityGateMarkdown,
} from "../services/codeWalkthroughDocumentationQualityGate.js";
import {
  loadFFolderExplanationQualityGate,
  renderFFolderExplanationQualityGateMarkdown,
} from "../services/fFolderExplanationQualityGate.js";
import {
  loadExplanationReadabilityCloseoutProfile,
  renderExplanationReadabilityCloseoutProfileMarkdown,
} from "../services/explanationReadabilityCloseoutProfile.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  renderManagedAuditRouteHelperQualityPassMarkdown,
} from "../services/managedAuditRouteHelperQualityPass.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  renderManagedAuditRouteRegistrationTableQualityPassMarkdown,
} from "../services/managedAuditRouteRegistrationTableQualityPass.js";
import {
  loadReadabilityMaintenanceProfile,
  renderReadabilityMaintenanceProfileMarkdown,
} from "../services/readabilityMaintenanceProfile.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditRouteQualityAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/code-walkthrough-documentation-quality-gate", (deps) =>
    loadCodeWalkthroughDocumentationQualityGate({
      config: deps.config,
    }), renderCodeWalkthroughDocumentationQualityGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/f-folder-explanation-quality-gate", (deps) =>
    loadFFolderExplanationQualityGate({
      config: deps.config,
    }), renderFFolderExplanationQualityGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/explanation-readability-closeout-profile", (deps) =>
    loadExplanationReadabilityCloseoutProfile({
      config: deps.config,
    }), renderExplanationReadabilityCloseoutProfileMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-helper-quality-pass", (deps) => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-registration-table-quality-pass", (deps) => loadManagedAuditRouteRegistrationTableQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteRegistrationTableQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-readability-maintenance-profile", (deps) => loadReadabilityMaintenanceProfile({
    config: deps.config,
  }), renderReadabilityMaintenanceProfileMarkdown),
];
