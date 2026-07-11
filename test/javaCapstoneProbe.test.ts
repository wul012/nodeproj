import { afterEach, describe, expect, it } from "vitest";

import { findAvailableLoopbackPort } from "../src/integration/capstoneProcessSupport.js";
import { runJavaCapstoneProbe } from "../src/integration/javaCapstoneProbe.js";
import { createCapstoneFakeProcesses, type CapstoneFakeProcesses } from "./helpers/capstoneFakeProcesses.js";

describe("runJavaCapstoneProbe", () => {
  let fake: CapstoneFakeProcesses | undefined;

  afterEach(async () => {
    await fake?.cleanup();
    fake = undefined;
  });

  it("boots, reads, proves rejection, and gracefully stops the owned process", async () => {
    fake = await createCapstoneFakeProcesses();
    const port = await findAvailableLoopbackPort();

    const result = await runJavaCapstoneProbe({
      port,
      launch: {
        executable: process.execPath,
        args: [fake.javaScript, String(port)],
        artifactPath: fake.javaScript,
      },
      startupTimeoutMs: 10_000,
      requestTimeoutMs: 2_000,
      shutdownTimeoutMs: 5_000,
    });

    expect(result.c1Checks.map((check) => [check.id, check.status])).toEqual([
      ["java.process", "pass"],
      ["java.health", "pass"],
      ["java.ops_evidence", "pass"],
      ["java.graceful_shutdown", "pass"],
    ]);
    expect(result.c3Checks).toMatchObject([{ id: "java.write_rejection", status: "pass" }]);
    expect(result.c1Checks.at(-1)?.evidence).toMatchObject({
      shutdown_status_code: 200,
      fallback_kill_used: false,
      exit_code: 0,
      application_alive_after_shutdown: false,
      port_open_after_shutdown: false,
    });
  });
});
