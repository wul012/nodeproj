import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck,
  renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-test-only-fake-harness-precheck", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheck({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverTestOnlyFakeHarnessPrecheckMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContract({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification", (deps) => loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown),
];
