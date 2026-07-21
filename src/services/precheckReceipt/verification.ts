import type { AppConfig } from "../../config.js";
import {
  loadManagedAuditManualSandboxConnectionPrecheckPacket,
} from "../managedAuditManualSandboxConnectionPrecheckPacket.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
} from "../managedAuditRouteRegistrationTableQualityPass.js";
import { createPrecheckReceiptChecks } from "./checks.js";
import { createJavaV99Echo } from "./javaEcho.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
} from "./messages.js";
import { createMiniKvV108Receipt } from "./miniKvReceipt.js";
import { createPrecheckReceiptProfile } from "./profile.js";
import { createSourceNode } from "./sourceNode.js";
import type { PrecheckReceiptProfile } from "./types.js";

export { renderPrecheckReceiptMarkdown } from "./precheckReceiptRenderer.js";
export type { PrecheckReceiptProfile } from "./types.js";

export function loadPrecheckReceiptVerification(input: {
  config: AppConfig;
}): PrecheckReceiptProfile {
  const source = createSourceNode(
    loadManagedAuditManualSandboxConnectionPrecheckPacket({ config: input.config }),
  );
  const java = createJavaV99Echo();
  const miniKv = createMiniKvV108Receipt();
  const checks = createPrecheckReceiptChecks(
    input.config,
    source,
    java,
    miniKv,
    loadManagedAuditRouteRegistrationTableQualityPass({ config: input.config }),
  );

  return createPrecheckReceiptProfile({
    sourceNodeV245: source,
    javaV99: java,
    miniKvV108: miniKv,
    checks,
    productionBlockers: collectProductionBlockers(checks),
    warnings: collectWarnings(java, miniKv),
    recommendations: collectRecommendations(),
  });
}
