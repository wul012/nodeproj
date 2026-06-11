import {
  loadCodeWalkthroughDocumentationQualityGate,
  renderCodeWalkthroughDocumentationQualityGateMarkdown,
} from "../services/codeWalkthroughDocumentationQualityGate.js";
import {
  loadManagedAuditRouteHelperQualityPass,
  renderManagedAuditRouteHelperQualityPassMarkdown,
} from "../services/managedAuditRouteHelperQualityPass.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
  renderManagedAuditRouteRegistrationTableQualityPassMarkdown,
} from "../services/managedAuditRouteRegistrationTableQualityPass.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditRouteQualityAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/code-walkthrough-documentation-quality-gate", (deps) =>
    loadCodeWalkthroughDocumentationQualityGate({
      config: deps.config,
    }), renderCodeWalkthroughDocumentationQualityGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-helper-quality-pass", (deps) => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-route-registration-table-quality-pass", (deps) => loadManagedAuditRouteRegistrationTableQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteRegistrationTableQualityPassMarkdown),
];
