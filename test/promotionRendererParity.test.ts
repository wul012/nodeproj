import { createHash } from "node:crypto";

import { afterEach, describe, expect, it, vi } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const markdownRoutes = [
  ["archive", "/api/v1/ops/promotion-archive"],
  ["manifest", "/api/v1/ops/promotion-archive/manifest"],
  ["archive-verification", "/api/v1/ops/promotion-archive/verification"],
  ["attestation", "/api/v1/ops/promotion-archive/attestation"],
  ["attestation-verification", "/api/v1/ops/promotion-archive/attestation/verification"],
  ["package", "/api/v1/ops/promotion-archive/handoff-package"],
  ["package-verification", "/api/v1/ops/promotion-archive/handoff-package/verification"],
  ["certificate", "/api/v1/ops/promotion-archive/handoff-certificate"],
  ["certificate-verification", "/api/v1/ops/promotion-archive/handoff-certificate/verification"],
  ["receipt", "/api/v1/ops/promotion-archive/handoff-receipt"],
  ["receipt-verification", "/api/v1/ops/promotion-archive/handoff-receipt/verification"],
  ["closure", "/api/v1/ops/promotion-archive/handoff-closure"],
  ["closure-verification", "/api/v1/ops/promotion-archive/handoff-closure/verification"],
  ["completion", "/api/v1/ops/promotion-archive/handoff-completion"],
  ["completion-verification", "/api/v1/ops/promotion-archive/handoff-completion/verification"],
] as const;

const v2199Digests: Record<string, string> = {
  archive: "679:422b5757e447ab7f2ae5b01f4a691970303f2b7be2e2754d828545ff840f0d4e",
  "archive-verification": "1734:7e9688921b2b414659bae4cde6cfd33aa09c116063fb6a8f75299f90e32cb2ab",
  attestation: "1759:5b3ad2213b856e809112720898359e6348b903e59f45399aa8cc68e27ff8702c",
  "attestation-verification": "1109:63f0ed9fbe942a349589ac41ba5a332a45a0de1ca33f8542b29fbe9e0af25fae",
  certificate: "2059:011b5fd60099d373d8fe41dfd4e29629d9fe7866a00527e6948cc55e7ecebc8b",
  "certificate-verification": "2924:8ea826431acf131ee58acc4e6f24085c6eb1f371e854c00e91b628eb1b1983d8",
  closure: "3199:1726ea43f28b80b7f5217141a2baa015683d8d40b116fca28cbbffaaeac937bc",
  "closure-verification": "3960:fc41ccfa01d63ca162ce99b8ec731237fad0b6150de8ff1720893fdf1006197d",
  completion: "2872:ef6be074386bb38850ba17da1867b5c61f3d5a13b0421270e7b0dcf61ad1c665",
  "completion-verification": "3947:090ce3eef47b8b5a445c9c760cbc69faa99ad815dcd432060cb783bfacd03471",
  manifest: "1288:5dcf5658bebbb06fba9b1d0f3ed675fd3dd19489bc2e6065b20bebcf586bb6f1",
  package: "1887:0e9b96686e37e2d4a64b8466b9b44f124a036d3e4dd8f5ba6f4111bc008937d0",
  "package-verification": "2738:2a0f940af33db7aa9b7b6fbef5c58819137590baff2c2cd7f5633abe2367dd84",
  receipt: "2494:7bc08633c9116efeb9d94079b472efdeca29e6166f769da80154119bac7f7973",
  "receipt-verification": "3092:a1fbdbec047b4d58809df593f15f32cddf62d2fe90fd8209e88031a5458aa062",
};

describe("promotion renderer byte parity", () => {
  afterEach(() => vi.useRealTimers());

  it("keeps every v2199 archive and handoff Markdown body", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-07-12T10:00:00.000Z"));
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const actual: Record<string, string> = {};
      for (const [name, route] of markdownRoutes) {
        const response = await app.inject({ method: "GET", url: `${route}?format=markdown` });
        expect(response.statusCode, route).toBe(200);
        const hash = createHash("sha256").update(response.rawPayload).digest("hex");
        actual[name] = `${response.rawPayload.byteLength}:${hash}`;
      }
      expect(actual).toEqual(v2199Digests);
    } finally {
      await app.close();
    }
  });
});
