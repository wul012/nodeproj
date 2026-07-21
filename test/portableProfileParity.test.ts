import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  normalizeForParity,
  normalizeHistoricalReportForParity,
  normalizeText,
} from "./support/portableProfileParity.js";

describe("portable profile parity", () => {
  it("normalizes runtime and declared repository roots on every host", () => {
    expect(normalizeText("/workspace/orderops-node/src/service.ts", "/workspace/orderops-node"))
      .toBe("<repo>/src/service.ts");
    expect(normalizeText("D:\\nodeproj\\orderops-node\\src\\service.ts", "/workspace/orderops-node"))
      .toBe("<repo>/src/service.ts");
    expect(normalizeText("D:/nodeproj/orderops-node-copy/src/service.ts", "/workspace/orderops-node"))
      .toBe("D:/nodeproj/orderops-node-copy/src/service.ts");
  });

  it("normalizes repository roots recursively without changing other values", () => {
    expect(normalizeForParity({
      source: "D:/nodeproj/orderops-node/src/service.ts",
      nested: ["D:\\nodeproj\\orderops-node\\test\\service.test.ts", 3, false],
    })).toEqual({
      source: "<repo>/src/service.ts",
      nested: ["<repo>/test/service.test.ts", 3, false],
    });
  });

  it("canonicalizes text evidence metadata across host line endings", () => {
    const directory = mkdtempSync(join(tmpdir(), "orderops-portable-parity-"));
    const lfPath = join(directory, "lf.md");
    const crlfPath = join(directory, "crlf.md");
    try {
      writeFileSync(lfPath, "alpha\nbeta\n", "utf8");
      writeFileSync(crlfPath, "alpha\r\nbeta\r\n", "utf8");

      const rawLf = evidenceFile(lfPath);
      const rawCrlf = evidenceFile(crlfPath);
      expect(rawLf.sizeBytes).not.toBe(rawCrlf.sizeBytes);

      const portableLf = normalizeHistoricalReportForParity(rawLf) as typeof rawLf;
      const portableCrlf = normalizeHistoricalReportForParity(rawCrlf) as typeof rawCrlf;
      expect({ sizeBytes: portableLf.sizeBytes, digest: portableLf.digest }).toEqual({
        sizeBytes: portableCrlf.sizeBytes,
        digest: portableCrlf.digest,
      });
      expect(portableLf.sizeBytes).toBe(11);
      expect(portableLf.digest).toBe(
        createHash("sha256").update("alpha\nbeta\n").digest("hex"),
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

function evidenceFile(resolvedPath: string) {
  const content = readFileSync(resolvedPath);
  return {
    id: "fixture",
    path: "fixture.md",
    resolvedPath,
    exists: true,
    sizeBytes: statSync(resolvedPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}
