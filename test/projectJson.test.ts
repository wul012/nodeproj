import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  includesAll,
  isSha256,
  numberValue,
  readProjectJson,
  stringValue,
  stringValues,
  valueAt,
} from "../src/evidence/projectJson.js";

describe("project JSON evidence access", () => {
  it("reads an object root through UTF-8 BOM and narrows nested values", () => {
    withProjectFile("\ufeff{\"summary\":{\"count\":3,\"labels\":[\"a\",2,\"b\"]}}", (root) => {
      const json = readProjectJson(root, "evidence/report.json");

      expect(numberValue(valueAt(json, "summary", "count"))).toBe(3);
      expect(stringValues(valueAt(json, "summary", "labels"))).toEqual(["a", "b"]);
      expect(stringValue(valueAt(json, "summary", "missing"))).toBe("");
    });
  });

  it.each(["not-json", "[]", "null", "true", "42"])(
    "fails closed for a non-object JSON root: %s",
    (content) => {
      withProjectFile(content, (root) => {
        expect(readProjectJson(root, "evidence/report.json")).toBeNull();
      });
    },
  );

  it("fails closed for missing paths and unsafe scalar shapes", () => {
    const root = mkdtempSync(path.join(os.tmpdir(), "orderops-project-json-"));
    try {
      expect(readProjectJson(root, "missing.json")).toBeNull();
      expect(valueAt({ branch: [] }, "branch", "value")).toBeUndefined();
      expect(numberValue(Number.POSITIVE_INFINITY)).toBe(0);
      expect(numberValue("3")).toBe(0);
      expect(stringValues("a")).toEqual([]);
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("keeps set inclusion and digest validation explicit", () => {
    expect(includesAll(["owner", "cleanup", "GET"], ["owner", "GET"])).toBe(true);
    expect(includesAll(["owner"], ["owner", "GET"])).toBe(false);
    expect(isSha256("a".repeat(64))).toBe(true);
    expect(isSha256("A".repeat(64))).toBe(false);
    expect(isSha256("a".repeat(63))).toBe(false);
  });
});

function withProjectFile(content: string, assertion: (root: string) => void): void {
  const root = mkdtempSync(path.join(os.tmpdir(), "orderops-project-json-"));
  const evidenceRoot = path.join(root, "evidence");
  try {
    mkdirSync(evidenceRoot, { recursive: true });
    writeFileSync(path.join(evidenceRoot, "report.json"), content, "utf8");
    assertion(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}
