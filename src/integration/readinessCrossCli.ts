import { resolve } from "node:path";

import { findAvailableLoopbackPort } from "./capstoneProcessSupport.js";
import { runCrossProjectReadiness } from "./crossProjectReadiness.js";
import { writeCrossProjectReadinessReport } from "./crossProjectReadinessReport.js";
import {
  buildJavaJarLaunchCommand,
  type JavaCapstoneProbeConfig,
} from "./javaCapstoneProbe.js";
import type { MiniKvCapstoneProbeConfig } from "./miniKvCapstoneProbe.js";
import type { AiprojArtifactProbeConfig } from "./aiprojArtifactProbe.js";

async function main(): Promise<void> {
  const liveRequested = process.env.INTEGRATION_LIVE === "1";
  const java = await resolveJavaConfig(liveRequested);
  const miniKv = liveRequested && hasText(process.env.MINIKV_CLI_PATH)
    ? buildMiniKvConfig(process.env.MINIKV_CLI_PATH)
    : undefined;
  const aiproj = liveRequested && hasText(process.env.AIPROJ_ROOT)
    ? buildAiprojConfig(process.env.AIPROJ_ROOT)
    : undefined;
  const report = await runCrossProjectReadiness({
    liveRequested,
    java,
    miniKv,
    aiproj,
    javaCommit: normalizeOptional(process.env.JAVA_CAPSTONE_COMMIT),
    miniKvCommit: normalizeOptional(process.env.MINIKV_CAPSTONE_COMMIT),
  });
  const outputDirectory = resolve(process.env.CROSS_READINESS_OUTPUT_DIR ?? ".tmp/cross-project-readiness");
  const artifacts = await writeCrossProjectReadinessReport(report, outputDirectory);

  console.log(`readiness:cross overall=${report.overall_status}`);
  console.log(`readiness:cross read_only=${report.read_only} execution_allowed=${report.execution_allowed}`);
  console.log(`readiness:cross json=${artifacts.jsonPath}`);
  console.log(`readiness:cross markdown=${artifacts.markdownPath}`);
  for (const requirement of report.requirements) {
    console.log(`readiness:cross ${requirement.id}=${requirement.status}`);
  }
  if (report.overall_status === "fail") {
    process.exitCode = 1;
  }
}

async function resolveJavaConfig(liveRequested: boolean): Promise<JavaCapstoneProbeConfig | undefined> {
  if (!liveRequested || !hasText(process.env.JAVA_CAPSTONE_JAR)) {
    return undefined;
  }
  const port = parsePort(process.env.JAVA_CAPSTONE_PORT) ?? await findAvailableLoopbackPort();
  return buildJavaConfig(process.env.JAVA_CAPSTONE_JAR, port);
}

function buildJavaConfig(jarPath: string, port: number): JavaCapstoneProbeConfig {
  return {
    port,
    launch: buildJavaJarLaunchCommand({
      jarPath: resolve(jarPath),
      javaExecutable: process.env.JAVA_CAPSTONE_EXECUTABLE,
      port,
    }),
  };
}

function buildMiniKvConfig(executable: string): MiniKvCapstoneProbeConfig {
  return {
    executable: resolve(executable),
    runtimePath: process.env.MINIKV_RUNTIME_PATH,
  };
}

function buildAiprojConfig(rootDirectory: string): AiprojArtifactProbeConfig {
  return {
    rootDirectory: resolve(rootDirectory),
    commit: normalizeOptional(process.env.AIPROJ_CAPSTONE_COMMIT) ?? "",
    schemaId: normalizeOptional(process.env.AIPROJ_CAPSTONE_SCHEMA_ID),
  };
}

function parsePort(value: string | undefined): number | undefined {
  if (!hasText(value)) {
    return undefined;
  }
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`JAVA_CAPSTONE_PORT must be an integer from 1 to 65535, received ${value}`);
  }
  return port;
}

function hasText(value: string | undefined): value is string {
  return value !== undefined && value.trim().length > 0;
}

function normalizeOptional(value: string | undefined): string | undefined {
  return hasText(value) ? value.trim() : undefined;
}

main().catch((error: unknown) => {
  console.error(`readiness:cross fatal=${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
