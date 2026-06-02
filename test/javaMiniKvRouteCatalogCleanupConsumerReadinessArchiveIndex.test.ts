import { describe, expect, it } from "vitest";
import {
  CONSUMER_READINESS_MATURITY_RUN,
  CONSUMER_READINESS_MATURITY_RUN_SIZE,
  readConsumerReadinessArchiveIndex,
} from "./support/javaMiniKvConsumerReadinessMaturityRun";

describe("Java/mini-kv consumer readiness multi-version archive index", () => {
  it("records the v566-v580 consumer readiness maturity run in the e archive index", () => {
    const archiveIndex = readConsumerReadinessArchiveIndex();

    expect(CONSUMER_READINESS_MATURITY_RUN).toHaveLength(CONSUMER_READINESS_MATURITY_RUN_SIZE);
    for (const { version, title } of CONSUMER_READINESS_MATURITY_RUN) {
      expect(archiveIndex).toContain(`${version}: ${title}`);
    }
  });
});
