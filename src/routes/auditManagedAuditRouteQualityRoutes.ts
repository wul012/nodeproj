import { ROUTE_QUALITY_PATHS } from "../contracts/auditRouteManifest.js";
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
  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.codeWalkthrough, (deps) =>
    loadCodeWalkthroughDocumentationQualityGate({
      config: deps.config,
    }), renderCodeWalkthroughDocumentationQualityGateMarkdown),

  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.fFolderExplanation, (deps) =>
    loadFFolderExplanationQualityGate({
      config: deps.config,
    }), renderFFolderExplanationQualityGateMarkdown),

  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.explanationCloseout, (deps) =>
    loadExplanationReadabilityCloseoutProfile({
      config: deps.config,
    }), renderExplanationReadabilityCloseoutProfileMarkdown),

  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.routeHelper, (deps) => loadManagedAuditRouteHelperQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteHelperQualityPassMarkdown),

  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.registrationTable, (deps) => loadManagedAuditRouteRegistrationTableQualityPass({
    config: deps.config,
  }), renderManagedAuditRouteRegistrationTableQualityPassMarkdown),

  auditJsonMarkdownRoute(ROUTE_QUALITY_PATHS.readabilityMaintenance, (deps) => loadReadabilityMaintenanceProfile({
    config: deps.config,
  }), renderReadabilityMaintenanceProfileMarkdown),
];
