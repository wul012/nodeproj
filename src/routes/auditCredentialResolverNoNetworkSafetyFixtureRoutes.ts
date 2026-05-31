import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake,
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverNoNetworkSafetyFixtureAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReviewMarkdown),
];
