import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Java/mini-kv consumer readiness multi-version archive index", () => {
  it("records the v566-v578 consumer readiness maturity run in the e archive index", () => {
    const archiveIndex = readFileSync(path.join(process.cwd(), "e", "README.md"), "utf8");

    for (const [version, title] of [
      ["566", "Java/mini-kv consumer readiness type ownership split"],
      ["567", "Java/mini-kv consumer readiness evidence file builder split"],
      ["568", "Java/mini-kv consumer readiness Java evidence parser split"],
      ["569", "Java/mini-kv consumer readiness batch closeout artifact manifest split"],
      ["570", "Java/mini-kv consumer readiness batch closeout artifact manifest coverage"],
      ["571", "Java/mini-kv consumer readiness batch closeout file support split"],
      ["572", "Java/mini-kv consumer readiness batch closeout file support coverage"],
      ["573", "Java/mini-kv consumer readiness archive verifier support reuse"],
      ["574", "Java/mini-kv consumer readiness batch closeout archive verifier support reuse"],
      ["575", "Java/mini-kv consumer readiness batch closeout archive artifact coverage"],
      ["576", "Java/mini-kv consumer readiness Java evidence parser coverage"],
      ["577", "Java/mini-kv consumer readiness evidence file builder coverage"],
      ["578", "Java/mini-kv consumer readiness multi-version archive index coverage"],
      ["579", "Java/mini-kv consumer readiness maturity artifact presence coverage"],
    ] as const) {
      expect(archiveIndex).toContain(`${version}: ${title}`);
    }
  });
});
