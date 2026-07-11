import { afterEach, describe, expect, it } from "vitest";

import {
  buildMiniKvCommandCensus,
  parseMiniKvCliOutput,
  runMiniKvCapstoneProbe,
} from "../src/integration/miniKvCapstoneProbe.js";
import { createCapstoneFakeProcesses, type CapstoneFakeProcesses } from "./helpers/capstoneFakeProcesses.js";

describe("mini-kv capstone probe", () => {
  let fake: CapstoneFakeProcesses | undefined;

  afterEach(async () => {
    await fake?.cleanup();
    fake = undefined;
  });

  it("keeps its fixed command plan free of write and admin verbs", () => {
    expect(buildMiniKvCommandCensus()).toMatchObject({
      read_command_count: 2,
      control_command_count: 1,
      write_or_admin_command_count: 0,
      forbidden_commands: [],
    });
    expect(buildMiniKvCommandCensus(["CHECKJSON SET key value"]).write_or_admin_command_count).toBe(1);
  });

  it("executes fresh CLI stdout and validates both boundary objects", async () => {
    fake = await createCapstoneFakeProcesses();

    const result = await runMiniKvCapstoneProbe({
      executable: process.execPath,
      executableArgs: [fake.miniKvScript],
      timeoutMs: 5_000,
    });

    expect(result.c2Checks.map((check) => [check.id, check.status])).toEqual([
      ["mini_kv.process", "pass"],
      ["mini_kv.smoke_json", "pass"],
      ["mini_kv.check_json", "pass"],
    ]);
    expect(result.c3Checks).toMatchObject([{ id: "mini_kv.no_execution", status: "pass" }]);
  });

  it("does not accept output without both fresh JSON objects", () => {
    expect(() => parseMiniKvCliOutput('mini-kv> {"evidence_type":"runtime_smoke"}\n')).toThrow(
      "CHECKJSON GET object was not found",
    );
  });
});
