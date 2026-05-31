import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown),
];
