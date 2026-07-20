import { describe, expect, it, vi } from "vitest";

import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
  renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";
import { normalizeForParity, normalizeText, sha256 } from "./support/portableProfileParity.js";

const FIXED_TIME = "2026-07-20T00:00:00.000Z";

describe("controlled read-only shard preview parity", () => {
  it("preserves ready and probes-disabled JSON/Markdown surfaces", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(FIXED_TIME));
    try {
      const ready = await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });
      const disabled = await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

      expect([
        measure("ready", ready),
        measure("probes-disabled", disabled),
      ]).toEqual([
        {
          name: "ready",
          json: {
            bytes: 1_752_385,
            sha256: "e9b1421217e5bdf505fd3040a80981c8cb105eb9d8398e9762ffa7b1bdbba8d7",
          },
          markdown: {
            bytes: 81_829,
            sha256: "a87109e40e6b145b86e293ed7d82919ee84aadd9e62db0185c3f68316993be8d",
          },
        },
        {
          name: "probes-disabled",
          json: {
            bytes: 1_760_303,
            sha256: "19360cb813fa4867fc5d26a6d4ab76a7590ce40fd5b4a0f4301cd5c0637ff0a2",
          },
          markdown: {
            bytes: 80_224,
            sha256: "afb9f1c85dea7ee31fadcc20809d9eb05f8dc4ebecd329ed41247c8a45c563a4",
          },
        },
      ]);
    } finally {
      vi.useRealTimers();
    }
  }, 180_000);
});

function measure(
  name: string,
  profile: Awaited<ReturnType<
    typeof loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview
  >>,
) {
  const portable = normalizeForParity(profile) as typeof profile;
  const json = JSON.stringify(portable);
  const markdown = normalizeText(
    renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(portable),
  );
  return {
    name,
    json: { bytes: Buffer.byteLength(json), sha256: sha256(json) },
    markdown: { bytes: Buffer.byteLength(markdown), sha256: sha256(markdown) },
  };
}
