import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  CONSUMER_READINESS_MATURITY_RUN,
  getConsumerReadinessExplanationDir,
  hasVersionedMarkdownFile,
  listConsumerReadinessWalkthroughFiles,
} from "./support/javaMiniKvConsumerReadinessMaturityRun";

describe("Java/mini-kv consumer readiness maturity artifacts", () => {
  it("keeps explanation and walkthrough artifacts for v566-v580", () => {
    const projectRoot = process.cwd();
    const walkthroughFiles = listConsumerReadinessWalkthroughFiles(projectRoot);

    for (const { version } of CONSUMER_READINESS_MATURITY_RUN) {
      const explanationDir = getConsumerReadinessExplanationDir(projectRoot, version);
      expect(existsSync(explanationDir), `missing explanation dir for v${version}`).toBe(true);
      expect(hasVersionedMarkdownFile(explanationDir, version)).toBe(true);
      expect(walkthroughFiles.some((file) => file.endsWith(`-v${version}.md`))).toBe(true);
    }
  });
});
