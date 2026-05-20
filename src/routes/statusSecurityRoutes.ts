import type { FastifyInstance } from "fastify";

import {
  createAccessControlReadinessProfile,
  renderAccessControlReadinessProfileMarkdown,
} from "../services/accessControlReadinessProfile.js";
import {
  createAccessGuardReadinessProfile,
  renderAccessGuardReadinessProfileMarkdown,
} from "../services/accessGuard.js";
import {
  createAccessPolicyProfile,
  renderAccessPolicyProfileMarkdown,
} from "../services/accessPolicyProfile.js";
import {
  createAuthEnforcementRehearsalProfile,
  renderAuthEnforcementRehearsalMarkdown,
} from "../services/authEnforcementRehearsal.js";
import {
  createIdpVerifierBoundaryProfile,
  renderIdpVerifierBoundaryMarkdown,
} from "../services/idpVerifierBoundary.js";
import {
  createJwksCacheContractProfile,
  renderJwksCacheContractMarkdown,
} from "../services/jwksCacheContract.js";
import {
  createJwksVerifierFixtureRehearsalProfile,
  renderJwksVerifierFixtureRehearsalMarkdown,
} from "../services/jwksVerifierFixtureRehearsal.js";
import {
  createOperatorIdentityContractProfile,
  renderOperatorIdentityContractMarkdown,
} from "../services/operatorIdentityContract.js";
import {
  createSignedAuthTokenContractProfile,
  renderSignedAuthTokenContractMarkdown,
} from "../services/signedAuthTokenContract.js";
import {
  createVerifiedIdentityAuditBindingProfile,
  renderVerifiedIdentityAuditBindingMarkdown,
} from "../services/verifiedIdentityAuditBinding.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";

export function registerStatusSecurityRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/security/access-control-readiness",
      () => createAccessControlReadinessProfile(deps.config),
      renderAccessControlReadinessProfileMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/access-policy",
      () => createAccessPolicyProfile(deps.config),
      renderAccessPolicyProfileMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/access-guard-readiness",
      () => createAccessGuardReadinessProfile(),
      renderAccessGuardReadinessProfileMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/auth-enforcement-rehearsal",
      () => createAuthEnforcementRehearsalProfile(deps.config),
      renderAuthEnforcementRehearsalMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/operator-identity-contract",
      () => createOperatorIdentityContractProfile(),
      renderOperatorIdentityContractMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/signed-auth-token-contract",
      () => createSignedAuthTokenContractProfile(deps.config),
      renderSignedAuthTokenContractMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/verified-identity-audit-binding",
      () => createVerifiedIdentityAuditBindingProfile(deps.config),
      renderVerifiedIdentityAuditBindingMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/idp-verifier-boundary",
      () => createIdpVerifierBoundaryProfile(deps.config),
      renderIdpVerifierBoundaryMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/jwks-verifier-fixture-rehearsal",
      () => createJwksVerifierFixtureRehearsalProfile(deps.config),
      renderJwksVerifierFixtureRehearsalMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/security/jwks-cache-contract",
      () => createJwksCacheContractProfile(deps.config),
      renderJwksCacheContractMarkdown,
    ),
  ]);
}
