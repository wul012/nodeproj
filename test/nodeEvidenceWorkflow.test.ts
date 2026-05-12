import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("node evidence workflow", () => {
  it("runs only Node evidence commands with safe upstream settings", async () => {
    const workflow = await readFile(
      path.join(process.cwd(), ".github", "workflows", "node-evidence.yml"),
      "utf8",
    );

    expect(workflow).toContain("name: Node Evidence");
    expect(workflow).toContain("permissions:");
    expect(workflow).toContain("contents: read");
    expect(workflow).toContain("node-version: \"22\"");
    expect(workflow).toContain("npm ci");
    expect(workflow).toContain("npm run typecheck");
    expect(workflow).toContain("npm test");
    expect(workflow).toContain("npm run build");
    expect(workflow).toContain("node dist/server.js");
    expect(workflow).toContain("UPSTREAM_PROBES_ENABLED: \"false\"");
    expect(workflow).toContain("UPSTREAM_ACTIONS_ENABLED: \"false\"");
    expect(workflow).toContain("/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate");
    expect(workflow).toContain("json.readyForReleaseEvidenceArchive !== true || json.executionAllowed !== false");
    expect(workflow).not.toContain("secrets.");
    expect(workflow).not.toContain("UPSTREAM_ACTIONS_ENABLED: \"true\"");
    expect(workflow).not.toContain("docker push");
    expect(workflow).not.toContain("kubectl");
    expect(workflow).not.toContain("scp ");
  });
});
