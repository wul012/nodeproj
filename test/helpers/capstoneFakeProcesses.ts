import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface CapstoneFakeProcesses {
  directory: string;
  javaScript: string;
  miniKvScript: string;
  cleanup: () => Promise<void>;
}

export async function createCapstoneFakeProcesses(): Promise<CapstoneFakeProcesses> {
  const directory = await mkdtemp(join(tmpdir(), "orderops-capstone-"));
  const javaScript = join(directory, "fake-java.mjs");
  const miniKvScript = join(directory, "fake-minikv.mjs");
  await writeFile(javaScript, FAKE_JAVA_SOURCE, "utf8");
  await writeFile(miniKvScript, FAKE_MINI_KV_SOURCE, "utf8");
  return {
    directory,
    javaScript,
    miniKvScript,
    cleanup: () => rm(directory, { recursive: true, force: true }),
  };
}

const FAKE_JAVA_SOURCE = `
import { createServer } from "node:http";

const port = Number(process.argv[2]);
process.stdout.write("Started FakeJava using Java with PID " + process.pid + "\\n");
const server = createServer((request, response) => {
  response.setHeader("content-type", "application/json");
  if (request.method === "GET" && request.url === "/actuator/health") {
    response.end(JSON.stringify({ status: "UP" }));
    return;
  }
  if (request.method === "GET" && request.url === "/api/v1/ops/evidence") {
    response.end(JSON.stringify({
      sampledAt: "2026-07-11T00:00:00Z",
      evidenceVersion: "fake-live-v1",
      service: { name: "advanced-order-platform", profiles: ["prod"] },
      readOnly: true,
      executionAllowed: false
    }));
    return;
  }
  if (request.method === "POST" && request.url === "/api/v1/failed-events/0/replay") {
    response.statusCode = 403;
    response.end(JSON.stringify({ error: "operator headers required" }));
    return;
  }
  if (request.method === "POST" && request.url === "/actuator/shutdown") {
    response.end(JSON.stringify({ message: "Shutting down" }));
    setTimeout(() => server.close(() => process.exit(0)), 20);
    return;
  }
  response.statusCode = 404;
  response.end(JSON.stringify({ error: "not found" }));
});

server.listen(port, "127.0.0.1");
`;

const FAKE_MINI_KV_SOURCE = `
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  const commands = input.trim().split(/\\r?\\n/);
  if (commands[0] !== "SMOKEJSON" || commands[1] !== "CHECKJSON GET capstone:probe" || commands[2] !== "QUIT") {
    process.exitCode = 2;
    return;
  }
  const smoke = {
    schema_version: 1,
    evidence_type: "runtime_smoke",
    version: "fake-live-v1",
    read_only: true,
    execution_allowed: false,
    restore_execution_allowed: false,
    real_read: {
      write_commands_executed: false,
      admin_commands_executed: false,
      runtime_write_observed: false
    }
  };
  const check = {
    schema_version: 1,
    read_only: true,
    execution_allowed: false,
    command_digest: "fake-digest",
    command: "GET",
    write_command: false,
    allowed_by_parser: true,
    checks: { write_command: false, wal_append_when_enabled: false },
    wal: { touches_wal: false }
  };
  process.stdout.write("mini-kv CLI\\n");
  process.stdout.write("mini-kv> " + JSON.stringify(smoke) + "\\n");
  process.stdout.write("mini-kv> " + JSON.stringify(check) + "\\n");
  process.stdout.write("mini-kv> BYE\\n");
});
`;
