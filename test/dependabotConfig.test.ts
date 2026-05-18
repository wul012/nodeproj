import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("dependabot configuration", () => {
  it("covers npm and GitHub Actions dependency updates", () => {
    const config = readFileSync(".github/dependabot.yml", "utf8");

    expect(config).toContain("version: 2");
    expect(config).toContain('package-ecosystem: "npm"');
    expect(config).toContain('package-ecosystem: "github-actions"');
    expect(config).toContain('directory: "/"');
    expect(config).toContain('interval: "weekly"');
    expect(config).toContain('timezone: "Asia/Shanghai"');
    expect(config).toContain("node-production-dependencies");
    expect(config).toContain("node-development-dependencies");
    expect(config).toContain("github-actions");
    expect(config).toContain("version-update:semver-major");
  });

  it("keeps CI evidence workflow sensitive to dependabot config changes", () => {
    const workflow = readFileSync(".github/workflows/node-evidence.yml", "utf8");

    expect(workflow).toContain(".github/dependabot.yml");
    expect(workflow).toContain("npm ci");
    expect(workflow).toContain("npm run typecheck");
    expect(workflow).toContain("npm test");
    expect(workflow).toContain("npm run build");
  });
});
