import { readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findAvailableLoopbackPort } from "../src/integration/capstoneProcessSupport.js";
import { runCrossProjectReadiness } from "../src/integration/crossProjectReadiness.js";
import { writeCrossProjectReadinessReport } from "../src/integration/crossProjectReadinessReport.js";
import { createCapstoneFakeProcesses, type CapstoneFakeProcesses } from "./helpers/capstoneFakeProcesses.js";

describe("cross-project readiness aggregation", () => {
  let fake: CapstoneFakeProcesses | undefined;
  const reportDirectories: string[] = [];

  afterEach(async () => {
    await fake?.cleanup();
    fake = undefined;
    await Promise.all(reportDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
  });

  it("reports skipped without spawning dependencies when the live gate is closed", async () => {
    const report = await runCrossProjectReadiness({
      liveRequested: false,
      now: () => new Date("2026-07-11T00:00:00.000Z"),
    });

    expect(report).toMatchObject({
      live_requested: false,
      overall_status: "skipped",
      read_only: true,
      execution_allowed: false,
    });
    expect(report.requirements.map((requirement) => requirement.status)).toEqual(["skipped", "skipped", "skipped"]);
    expect(report.requirements[2].checks[0]).toMatchObject({
      id: "node.capstone_surface_census",
      status: "pass",
    });
  });

  it("fails closed when live mode omits either executable path", async () => {
    const report = await runCrossProjectReadiness({ liveRequested: true });

    expect(report.overall_status).toBe("fail");
    expect(report.requirements[0].status).toBe("fail");
    expect(report.requirements[1].status).toBe("fail");
    expect(report.requirements[2].status).toBe("skipped");
  });

  it("aggregates a full live pass and atomically writes JSON plus Markdown", async () => {
    fake = await createCapstoneFakeProcesses();
    const port = await findAvailableLoopbackPort();
    const report = await runCrossProjectReadiness({
      liveRequested: true,
      java: {
        port,
        launch: {
          executable: process.execPath,
          args: [fake.javaScript, String(port)],
          artifactPath: fake.javaScript,
        },
        startupTimeoutMs: 10_000,
        requestTimeoutMs: 2_000,
        shutdownTimeoutMs: 5_000,
      },
      miniKv: {
        executable: process.execPath,
        executableArgs: [fake.miniKvScript],
        timeoutMs: 5_000,
      },
      javaCommit: "java-test-commit",
      miniKvCommit: "mini-kv-test-commit",
      now: () => new Date("2026-07-11T00:00:00.000Z"),
    });
    const directory = join(tmpdir(), `orderops-cross-report-${process.pid}-${Date.now()}`);
    reportDirectories.push(directory);
    const paths = await writeCrossProjectReadinessReport(report, directory);

    expect(report.overall_status).toBe("pass");
    expect(report.requirements.map((requirement) => requirement.status)).toEqual(["pass", "pass", "pass"]);
    const persisted = JSON.parse(await readFile(paths.jsonPath, "utf8")) as Record<string, unknown>;
    expect(persisted).toMatchObject({ overall_status: "pass", read_only: true, execution_allowed: false });
    const markdown = await readFile(paths.markdownPath, "utf8");
    expect(markdown).toContain("Overall status: **PASS**");
    expect(markdown).toContain("| C3 No-write proof | PASS |");
  });
});
