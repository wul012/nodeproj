import type { AppConfig } from "../config.js";
import { createPrecheckUpstreamReceiptVerificationProfile } from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationCore.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationPolicy.js";
import {
  createJavaV99PrecheckEchoReference,
  createMiniKvV108PrecheckNonParticipationReference,
  createSourceNodeV245,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationReferences.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
} from "./managedAuditManualSandboxConnectionPrecheckPacket.js";
import type {
  ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
} from "./managedAuditRouteRegistrationTableQualityPass.js";

export {
  renderManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationRenderer.js";

export type {
  ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.js";

export function loadManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile {
  const sourceV245 = loadManagedAuditManualSandboxConnectionPrecheckPacket({ config: input.config });
  const routeQuality = loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config });
  const sourceNodeV245 = createSourceNodeV245(sourceV245);
  const javaV99 = createJavaV99PrecheckEchoReference();
  const miniKvV108 = createMiniKvV108PrecheckNonParticipationReference();
  const checks = createChecks(input.config, sourceNodeV245, javaV99, miniKvV108, routeQuality);
  checks.readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification")
    .every(([, value]) => value);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(javaV99, miniKvV108);
  const recommendations = collectRecommendations();

  return createPrecheckUpstreamReceiptVerificationProfile({
    sourceNodeV245,
    javaV99,
    miniKvV108,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  });
}
