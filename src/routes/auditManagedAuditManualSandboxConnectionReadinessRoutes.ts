import {
  loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal,
  renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown,
} from "../services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.js";
import {
  loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
  renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown,
} from "../services/managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";
import {
  loadManagedAuditManualSandboxConnectionPreconditionIntake,
  renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreconditionIntake.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightGate,
  renderManagedAuditManualSandboxConnectionPreflightGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreflightGate.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightVerification,
  renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown,
} from "../services/managedAuditManualSandboxConnectionPreflightVerification.js";
import {
  loadManagedAuditManualSandboxConnectionReadinessGate,
  renderManagedAuditManualSandboxConnectionReadinessGateMarkdown,
} from "../services/managedAuditManualSandboxConnectionReadinessGate.js";
import {
  loadManagedAuditManualSandboxConnectionRehearsalPacketReview,
  renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown,
} from "../services/managedAuditManualSandboxConnectionRehearsalPacketReview.js";
import {
  auditJsonMarkdownRoute,
  type AuditJsonMarkdownRouteRegistration,
} from "./auditJsonMarkdownRouteRegistrar.js";

export const managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes: readonly AuditJsonMarkdownRouteRegistration[] = [
  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-gate", (deps) => loadManagedAuditManualSandboxConnectionPreflightGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreflightGateMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-preflight-verification", (deps) => loadManagedAuditManualSandboxConnectionPreflightVerification({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-rehearsal-packet-review", (deps) => loadManagedAuditManualSandboxConnectionRehearsalPacketReview({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionRehearsalPacketReviewMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-blocked-execution-rehearsal", (deps) => loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-precondition-intake", (deps) => loadManagedAuditManualSandboxConnectionPreconditionIntake({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionPreconditionIntakeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-dry-run-request-envelope", (deps) => loadManagedAuditManualSandboxConnectionDryRunRequestEnvelope({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionDryRunRequestEnvelopeMarkdown),

  auditJsonMarkdownRoute("/api/v1/audit/managed-audit-manual-sandbox-connection-readiness-gate", (deps) => loadManagedAuditManualSandboxConnectionReadinessGate({
    config: deps.config,
  }), renderManagedAuditManualSandboxConnectionReadinessGateMarkdown),
];
