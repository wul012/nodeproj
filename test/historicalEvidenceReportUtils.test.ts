import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { evidenceFile } from "../src/services/historicalEvidenceReportUtils.js";

describe("historical evidence report utilities", () => {
  const temporaryRoots: string[] = [];

  afterEach(() => {
    for (const root of temporaryRoots.splice(0)) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("reports one canonical size and digest for LF and CRLF text", () => {
    const canonicalText = "alpha\nbeta\n";
    const lf = evidenceFile("lf", writeEvidence("lf.txt", canonicalText));
    const crlf = evidenceFile("crlf", writeEvidence("crlf.txt", "alpha\r\nbeta\r\n"));

    expect(lf.sizeBytes).toBe(Buffer.byteLength(canonicalText, "utf8"));
    expect(crlf).toMatchObject({
      exists: true,
      sizeBytes: lf.sizeBytes,
      digest: lf.digest,
    });
  });

  it("excludes a UTF-8 BOM and normalizes mixed line endings from metadata", () => {
    const canonicalText = "first\nsecond\nthird\n";
    const canonical = evidenceFile("canonical", writeEvidence("canonical.txt", canonicalText));
    const mixed = evidenceFile("mixed", writeEvidence("mixed.txt", "\ufefffirst\r\nsecond\rthird\n"));

    expect(mixed).toMatchObject({
      exists: true,
      sizeBytes: Buffer.byteLength(canonicalText, "utf8"),
      digest: canonical.digest,
    });
  });

  it("keeps missing evidence fail-closed", () => {
    const missingPath = path.join(createTemporaryRoot(), "missing.txt");

    expect(evidenceFile("missing", missingPath)).toMatchObject({
      id: "missing",
      path: missingPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    });
  });

  function writeEvidence(name: string, content: string): string {
    const filePath = path.join(createTemporaryRoot(), name);
    writeFileSync(filePath, content, "utf8");
    return filePath;
  }

  function createTemporaryRoot(): string {
    const root = mkdtempSync(path.join(os.tmpdir(), "orderops-historical-evidence-"));
    temporaryRoots.push(root);
    return root;
  }
});
