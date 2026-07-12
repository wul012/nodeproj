import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  archiveArray,
  archiveNumber,
  archiveString,
  archiveStrings,
  archiveValueAt,
  createArchiveEvidenceRefs,
  hasAllStrings,
  isSha256,
  listArchiveEvidenceFiles,
  readArchiveEvidence,
} from "../src/evidence/archiveEvidenceEngine.js";

const SPEC = {
  archiveRoot: "e/1",
  basename: "sample",
  codeWalkthrough: "walkthrough.md",
  sourcePlan: "plan.md",
  plansIndex: "plans-index.md",
  archiveIndex: "archive-index.md",
} as const;

describe("archive evidence engine", () => {
  it("preserves raw digests while parsing BOM and CRLF content", () => {
    const projectRoot = mkdtempSync(path.join(os.tmpdir(), "archive-engine-"));
    const jsonBytes = Buffer.from('\ufeff{\r\n  "state": { "ready": true }\r\n}\r\n', "utf8");
    const markdownBytes = Buffer.from("\ufefffirst\r\nsecond\r\n", "utf8");

    try {
      writeEvidenceFile(projectRoot, "e/1/evidence/sample-http.json", jsonBytes);
      writeEvidenceFile(projectRoot, "e/1/evidence/sample-http.md", markdownBytes);
      writeEvidenceFile(projectRoot, "e/1/evidence/sample-summary.json", "{invalid");
      writeEvidenceFile(projectRoot, "walkthrough.md", "walkthrough");
      writeEvidenceFile(projectRoot, "plan.md", "plan");
      writeEvidenceFile(projectRoot, "plans-index.md", "plans");
      writeEvidenceFile(projectRoot, "archive-index.md", "archive");

      const refs = createArchiveEvidenceRefs(projectRoot, SPEC);
      const content = readArchiveEvidence(projectRoot, refs);

      expect(refs.jsonEvidence).toEqual({
        path: "e/1/evidence/sample-http.json",
        exists: true,
        byteLength: jsonBytes.byteLength,
        digest: createHash("sha256").update(jsonBytes).digest("hex"),
      });
      expect(refs.markdownEvidence.digest).toBe(
        createHash("sha256").update(markdownBytes).digest("hex"),
      );
      expect(content.json).toEqual({ state: { ready: true } });
      expect(content.markdown).toBe("first\r\nsecond\r\n");
      expect(content.summary).toBeNull();
      expect(content.browserSnapshot).toBe("");
      expect(refs.browserSnapshot).toMatchObject({ exists: false, byteLength: 0, digest: null });
      expect(listArchiveEvidenceFiles(refs).map((file) => file.path)).toEqual([
        "e/1/evidence/sample-http.json",
        "e/1/evidence/sample-http.md",
        "e/1/evidence/sample-summary.json",
        "e/1/evidence/sample-browser-snapshot.md",
        "e/1/sample.html",
        "e/1/\u56fe\u7247/sample.png",
        "e/1/\u89e3\u91ca/sample.md",
        "walkthrough.md",
        "plan.md",
        "plans-index.md",
        "archive-index.md",
      ]);
    } finally {
      rmSync(projectRoot, { recursive: true, force: true });
    }
  });

  it("keeps coercion helpers narrow and fail-closed", () => {
    const source = { nested: { values: ["a", 2, "b"] } };
    const values = archiveValueAt(source, "nested", "values");

    expect(archiveArray(values)).toEqual(["a", 2, "b"]);
    expect(archiveStrings(values)).toEqual(["a", "b"]);
    expect(archiveValueAt(source, "missing", "value")).toBeUndefined();
    expect(archiveString("ready")).toBe("ready");
    expect(archiveString(1)).toBe("");
    expect(archiveNumber(4)).toBe(4);
    expect(archiveNumber(Number.POSITIVE_INFINITY)).toBe(0);
    expect(hasAllStrings(["a", "b"], ["b"])).toBe(true);
    expect(hasAllStrings(["a"], ["a", "b"])).toBe(false);
    expect(isSha256("a".repeat(64))).toBe(true);
    expect(isSha256("A".repeat(64))).toBe(false);
    expect(isSha256(null)).toBe(false);
  });
});

function writeEvidenceFile(
  projectRoot: string,
  relativePath: string,
  content: string | Buffer,
): void {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content);
}
