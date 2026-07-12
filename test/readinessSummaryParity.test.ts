import { createHash } from "node:crypto";

import { afterEach, describe, expect, it, vi } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const versions = [5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
const v2200Digests: Record<string, string> = {
  "v5-json": "6219:935657060f749869612517858ee71d8edadd65910f4ccd8cc92380c7ad9affeb",
  "v5-markdown": "6123:90843eed3b8ccc2309273fe81f7bf5c2f13392a0612e34d65b1d841c7606dcc9",
  "v6-json": "4125:1351d856cdf10c35143ccc76bd974c1adaef7d2d0faa7a7b54eb98fc47a8f45c",
  "v6-markdown": "3787:b8e914c5d42d0edefa804a58321f4406375211b1096af9502be085abaef2ee17",
  "v7-json": "4223:ab86877c100954f5c9ab7b6ed27910e56cd4c3a0f39025ffc0de98ac14806a98",
  "v7-markdown": "3949:b647c33417783aaa484f072d30d5df99e6fef8a738917acf93d56df0514b79b5",
  "v8-json": "4753:a5f21ff63fa7e5fd9e5542615a0968dea3173bf916bf268e3d9952e77b871be6",
  "v8-markdown": "4476:fa6a30235ba9990f62dacdce23496057850a52c1206292c085ffee195241bba9",
  "v9-json": "4605:bac138c9c6a43d2b137d39837e8a0a6fae1aa8a3319569387b085d0f9f941908",
  "v9-markdown": "4328:7c18665289ed3257649bcb335d46bbba325ba43464e74ab654b78dd44504b1b2",
  "v10-json": "4971:e15e72a87c656f52641e02193f5905d01f33fcc1d0b2f9984b06d69016f76fac",
  "v10-markdown": "4655:e64883f06ad72a566944930b101cd0021aabee49682b6d799fdf52fd1b04a823",
  "v11-json": "5648:57b033ca44402fefe760a4544d55bb92448c77209013c130fdba0a5fca3dd19c",
  "v11-markdown": "5256:e83888c65c81d0a88071cf8da1c59869a0ec760c9bed227eeeacceb4539842b2",
  "v12-json": "4849:11f359223c687738bc2c5c04cb5c727ed44391f74938c438abae4213f4c16a0b",
  "v12-markdown": "4538:2ffa8917f9aca31a34ce5c00fe9a804ac16a38e33332c010307505fdc7cd874d",
  "v13-json": "4435:59989bb63bb898a8d15b757ae8ca9bf667dbb330d1f6def19be453252932934f",
  "v13-markdown": "4248:38054e6a39a86421282091fb9ea5f155f2b7144628b918a57e7dc6ea0b1d5772",
};

describe("readiness summary byte parity", () => {
  afterEach(() => vi.useRealTimers());

  it("keeps every v2200 V5-V13 JSON and Markdown body", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-07-12T12:00:00.000Z"));
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "false",
      UPSTREAM_PROBES_ENABLED: "false",
    }));

    try {
      const actual: Record<string, string> = {};
      for (const version of versions) {
        const route = `/api/v1/production/readiness-summary-v${version}`;
        for (const format of ["json", "markdown"] as const) {
          const url = format === "json" ? route : `${route}?format=markdown`;
          const response = await app.inject({ method: "GET", url });
          expect(response.statusCode, url).toBe(200);
          const hash = createHash("sha256").update(response.rawPayload).digest("hex");
          actual[`v${version}-${format}`] = `${response.rawPayload.byteLength}:${hash}`;
        }
      }
      expect(actual).toEqual(v2200Digests);
    } finally {
      await app.close();
    }
  });
});
