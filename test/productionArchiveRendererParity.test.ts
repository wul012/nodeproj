import { createHash } from "node:crypto";

import { afterAll, beforeAll, expect, it, vi } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  loadProductionConnectionArchiveVerification,
  renderProductionConnectionArchiveVerificationMarkdown,
} from "../src/services/productionConnectionArchiveVerification.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeEvidenceArchiveVerification,
  renderProductionLiveProbeEvidenceArchiveVerificationMarkdown,
} from "../src/services/productionLiveProbeEvidenceArchiveVerification.js";

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-07-21T13:00:00.000Z"));
});

afterAll(() => {
  vi.useRealTimers();
});

it("keeps production archive Markdown byte-identical across renderer migrations", async () => {
  const config = loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    AUDIT_STORE_KIND: "memory",
    AUDIT_STORE_URL: "managed-audit://contract-only",
  });
  const runtime = createAuditStoreRuntime(config);
  const ledger = new ProductionConnectionDryRunApprovalLedger();
  const connection = await loadProductionConnectionArchiveVerification({
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
    productionConnectionDryRunApprovals: ledger,
  });
  const liveProbe = await loadProductionLiveProbeEvidenceArchiveVerification({
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
    productionConnectionDryRunApprovals: ledger,
    orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
    miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
  });

  expectMarkdownOracle(
    renderProductionConnectionArchiveVerificationMarkdown(connection),
    3535,
    "d1898d64f0ca8e615e2e6d41d0153f106a986bf9a55d79c871e84f87536dfae9",
  );
  expectMarkdownOracle(
    renderProductionLiveProbeEvidenceArchiveVerificationMarkdown(liveProbe),
    3456,
    "50a13c577a64816aeec1aab6b4b9eeef05aded423af0d3b1aff6322f99829883",
  );
});

function expectMarkdownOracle(markdown: string, bytes: number, sha256: string): void {
  expect(Buffer.byteLength(markdown)).toBe(bytes);
  expect(createHash("sha256").update(markdown).digest("hex")).toBe(sha256);
}
