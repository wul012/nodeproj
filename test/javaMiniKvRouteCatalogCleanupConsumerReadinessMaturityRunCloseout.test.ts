import { describe, expect, it } from "vitest";
import {
  CONSUMER_READINESS_MATURITY_RUN,
  CONSUMER_READINESS_MATURITY_RUN_SIZE,
  getConsumerReadinessExplanationDir,
  hasVersionedMarkdownFile,
  listConsumerReadinessWalkthroughFiles,
  readConsumerReadinessArchiveIndex,
} from "./support/javaMiniKvConsumerReadinessMaturityRun";

describe("Java/mini-kv consumer readiness maturity run closeout", () => {
  it("closes exactly fifteen consecutive Node versions from v566 through v580", () => {
    const versions = CONSUMER_READINESS_MATURITY_RUN.map(({ version }) => Number(version));

    expect(versions).toHaveLength(CONSUMER_READINESS_MATURITY_RUN_SIZE);
    expect(versions[0]).toBe(566);
    expect(versions[versions.length - 1]).toBe(580);
    expect(new Set(versions).size).toBe(CONSUMER_READINESS_MATURITY_RUN_SIZE);

    for (let index = 1; index < versions.length; index += 1) {
      expect(versions[index]).toBe(versions[index - 1] + 1);
    }
  });

  it("keeps archive labels, explanations, and walkthroughs aligned", () => {
    const projectRoot = process.cwd();
    const archiveIndex = readConsumerReadinessArchiveIndex(projectRoot);
    const walkthroughFiles = listConsumerReadinessWalkthroughFiles(projectRoot);

    for (const { version, title } of CONSUMER_READINESS_MATURITY_RUN) {
      const explanationDir = getConsumerReadinessExplanationDir(projectRoot, version);

      expect(archiveIndex).toContain(`${version}: ${title}`);
      expect(hasVersionedMarkdownFile(explanationDir, version), `missing explanation for v${version}`).toBe(true);
      expect(
        walkthroughFiles.some((file) => file.endsWith(`-v${version}.md`)),
        `missing walkthrough for v${version}`,
      ).toBe(true);
    }
  });
});
