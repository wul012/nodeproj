import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  evidenceFile,
  mapReceiptFields,
  mapSnippetFields,
  snippetsMatched,
} from "../src/services/historicalEvidenceReportUtils.js";

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

  it("preserves raw byte metadata when a legacy report requires it", () => {
    const content = "alpha\r\nbeta\r\n";
    const raw = evidenceFile("raw", writeEvidence("raw.txt", content), { textMode: "raw" });

    expect(raw).toMatchObject({
      exists: true,
      sizeBytes: Buffer.byteLength(content, "utf8"),
      digest: createHash("sha256").update(content).digest("hex"),
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

  it("maps mixed receipt fields in declared order and fails closed on wrong types", () => {
    const fields = mapReceiptFields(
      { source_name: "mini-kv", source_ready: "not-a-boolean", source_count: 7 },
      [
        ["name", "source_name", "text", "missing"],
        ["ready", "source_ready", "flag", false],
        ["count", "source_count", "count", -1],
      ] as const,
    );

    expect(Object.keys(fields)).toEqual(["name", "ready", "count"]);
    expect(fields).toEqual({ name: "mini-kv", ready: false, count: 7 });
  });

  it("rejects duplicate output keys instead of silently overwriting a manifest field", () => {
    expect(() => mapReceiptFields({}, [
      ["state", "first_state", "text", "missing"],
      ["state", "second_state", "text", "missing"],
    ] as const)).toThrow("Duplicate receipt target field: state");
  });

  it("maps snippet evidence in declared order with explicit missing fallbacks", () => {
    const snippets = [snippetMatch("schema", true), snippetMatch("boundary", false)];
    const fields = mapSnippetFields(snippets, [
      ["schemaVersion", "schema", "v1", "missing"],
      ["boundaryClosed", "boundary", false, true],
    ] as const);

    expect(Object.keys(fields)).toEqual(["schemaVersion", "boundaryClosed"]);
    expect(fields).toEqual({ schemaVersion: "v1", boundaryClosed: true });
    expect(snippetsMatched(snippets, ["schema"])).toBe(true);
    expect(snippetsMatched(snippets, ["schema", "boundary"])).toBe(false);
  });

  it("rejects duplicate snippet projection targets", () => {
    expect(() => mapSnippetFields([snippetMatch("schema", true)], [
      ["state", "schema", "ready", "missing"],
      ["state", "schema", "verified", "missing"],
    ] as const)).toThrow("Duplicate snippet target field: state");
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

  function snippetMatch(id: string, matched: boolean) {
    return {
      id,
      path: `${id}.txt`,
      resolvedPath: `${id}.txt`,
      expectedText: id,
      matched,
    };
  }
});
