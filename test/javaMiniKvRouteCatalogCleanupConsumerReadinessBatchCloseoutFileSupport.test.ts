import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  fileReference,
  numberValue,
  objectField,
  readJsonFile,
  readTextFile,
  stringValue,
  valueAt,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.js";

describe("Java/mini-kv route catalog cleanup consumer readiness batch closeout file support", () => {
  it("reads file references, text, JSON, and nested values deterministically", () => {
    const root = mkdtempSync(path.join(tmpdir(), "orderops-batch-closeout-support-"));
    try {
      writeFileSync(path.join(root, "sample.json"), JSON.stringify({
        nested: {
          label: "ready",
          count: 7,
        },
      }));

      const reference = fileReference(root, "sample.json");
      const json = readJsonFile(root, "sample.json");

      expect(reference).toMatchObject({
        path: "sample.json",
        exists: true,
      });
      expect(reference.sizeBytes).toBeGreaterThan(0);
      expect(reference.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(readTextFile(root, "sample.json")).toContain("\"nested\"");
      expect(stringValue(valueAt(json, "nested", "label"))).toBe("ready");
      expect(numberValue(valueAt(json, "nested", "count"))).toBe(7);
      expect(objectField(json, "nested")).toMatchObject({ label: "ready" });
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("returns empty references for missing or invalid files", () => {
    const root = mkdtempSync(path.join(tmpdir(), "orderops-batch-closeout-support-"));
    try {
      writeFileSync(path.join(root, "invalid.json"), "{not-json");

      expect(fileReference(root, "missing.json")).toEqual({
        path: "missing.json",
        exists: false,
        sizeBytes: 0,
        sha256: null,
      });
      expect(readTextFile(root, "missing.json")).toBe("");
      expect(readJsonFile(root, "missing.json")).toBeNull();
      expect(readJsonFile(root, "invalid.json")).toBeNull();
      expect(stringValue(7)).toBe("");
      expect(numberValue("7")).toBe(0);
      expect(valueAt(null, "a")).toBeUndefined();
      expect(objectField(null, "a")).toEqual({});
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
