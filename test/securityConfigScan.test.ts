import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { describe, expect, it } from "vitest";

const scriptPath = path.resolve("scripts/security-config-scan.mjs");

describe("security and safe-config scan", () => {
  it("accepts only the exact synthetic credential URL waiver set", () => {
    const result = runScan(process.cwd());

    expect(result.status).toBe(0);
    expect(result.report).toMatchObject({
      schemaVersion: 1,
      waiverManifest: "docs/security-scan-waivers.json",
      secretSignalCount: 6,
      acceptedSecretSignalCount: 6,
      waiverCount: 5,
      nonEmptyEnvSecretCount: 0,
      ready: true,
      violations: {
        waiverErrors: [],
        unwaivedSecretSignals: [],
        staleWaivers: [],
        nonEmptyEnvSecrets: [],
        symlinks: [],
        configChecksFailed: [],
      },
    });
    expect(result.report.configChecks).toHaveLength(18);
    expect(result.report.configChecks.every((check: { passed: boolean }) => check.passed)).toBe(true);
  });

  it("rejects a new credential fingerprint and a non-empty env secret", async () => {
    const root = await createMinimalSafeProject();
    try {
      await writeFile(path.join(root, "leak.txt"), `cloud=${"AKIA" + "ABCDEFGHIJKLMNOP"}\n`);
      await writeFile(path.join(root, ".env.leak"), "DATABASE_PASSWORD=not-a-real-password\n");

      const result = runScan(root);

      expect(result.status).toBe(1);
      expect(result.report.ready).toBe(false);
      expect(result.report.violations.unwaivedSecretSignals).toHaveLength(1);
      expect(result.report.violations.unwaivedSecretSignals[0]).toMatchObject({ type: "aws-access-key" });
      expect(result.report.violations.nonEmptyEnvSecrets).toEqual([
        { path: ".env.leak", key: "DATABASE_PASSWORD", line: 1 },
      ]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

async function createMinimalSafeProject() {
  const root = await mkdtemp(path.join(os.tmpdir(), "orderops-security-scan-"));
  await mkdir(path.join(root, "src"), { recursive: true });
  await mkdir(path.join(root, ".github", "workflows"), { recursive: true });
  await mkdir(path.join(root, "docs"), { recursive: true });
  await writeFile(path.join(root, ".env.example"), [
    "UPSTREAM_PROBES_ENABLED=false",
    "UPSTREAM_ACTIONS_ENABLED=false",
    "ORDEROPS_AUTH_TOKEN_SECRET=",
    "AUDIT_STORE_KIND=memory",
    "",
  ].join("\n"));
  await writeFile(path.join(root, ".env.production.example"), [
    "UPSTREAM_PROBES_ENABLED=false",
    "UPSTREAM_ACTIONS_ENABLED=false",
    "ACCESS_GUARD_ENFORCEMENT_ENABLED=true",
    "ORDEROPS_AUTH_TOKEN_SECRET=",
    "AUDIT_STORE_KIND=managed-unimplemented",
    "",
  ].join("\n"));
  await writeFile(path.join(root, "src", "config.ts"), [
    'readBoolean(env, "UPSTREAM_ACTIONS_ENABLED", false);',
    'readBoolean(env, "UPSTREAM_PROBES_ENABLED", false);',
    'readString(env, "ORDEROPS_AUTH_TOKEN_SECRET", "");',
  ].join("\n"));
  await writeFile(path.join(root, ".github", "workflows", "node-evidence.yml"), [
    'UPSTREAM_ACTIONS_ENABLED: "false"',
    "run: npm run security:scan",
  ].join("\n"));
  await writeFile(path.join(root, "docs", "SECURITY.md"), [
    "## Protected assets",
    "## Trust boundaries",
    "## Threats and controls",
    "## Secrets policy",
  ].join("\n"));
  await writeFile(path.join(root, "docs", "security-scan-waivers.json"), JSON.stringify({
    schemaVersion: 1,
    waivers: [],
  }));
  return root;
}

function runScan(projectRoot: string) {
  const run = spawnSync(process.execPath, [scriptPath, "--json", `--project-root=${projectRoot}`], {
    encoding: "utf8",
  });
  return {
    status: run.status,
    report: JSON.parse(run.stdout) as {
      configChecks: Array<{ passed: boolean }>;
      ready: boolean;
      violations: {
        unwaivedSecretSignals: Array<{ type: string }>;
        nonEmptyEnvSecrets: Array<{ path: string; key: string; line: number }>;
      };
    },
  };
}
