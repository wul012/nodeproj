import {
  buildCapstoneRouteCensus,
} from "./crossProjectReadClient.js";
import {
  buildMiniKvCommandCensus,
  runMiniKvCapstoneProbe,
  type MiniKvCapstoneProbeConfig,
} from "./miniKvCapstoneProbe.js";
import {
  runJavaCapstoneProbe,
  type JavaCapstoneProbeConfig,
} from "./javaCapstoneProbe.js";
import {
  skippedCheck,
  statusFromChecks,
  type CapstoneCheck,
  type CapstoneRequirementResult,
  type CrossProjectReadinessReport,
  type JavaCapstoneObservation,
  type MiniKvCapstoneObservation,
} from "./crossProjectReadinessTypes.js";

export interface CrossProjectReadinessOptions {
  liveRequested: boolean;
  java?: JavaCapstoneProbeConfig;
  miniKv?: MiniKvCapstoneProbeConfig;
  javaCommit?: string;
  miniKvCommit?: string;
  now?: () => Date;
}

export async function runCrossProjectReadiness(
  options: CrossProjectReadinessOptions,
): Promise<CrossProjectReadinessReport> {
  const java = options.liveRequested
    ? await runConfiguredJavaProbe(options.java)
    : skippedJavaObservation();
  const miniKv = options.liveRequested
    ? await runConfiguredMiniKvProbe(options.miniKv)
    : skippedMiniKvObservation();

  const c1 = requirement("C1", "Live Java read", java.c1Checks);
  const c2 = requirement("C2", "Live mini-kv read", miniKv.c2Checks);
  const c3Checks = [buildStaticNoWriteCheck(), ...java.c3Checks, ...miniKv.c3Checks];
  const c3 = requirement("C3", "No-write proof", c3Checks);
  const requirements = [c1, c2, c3];
  const overallStatus = statusFromRequirementResults(requirements);

  return {
    schema_version: "orderops.cross-project-readiness.v1",
    generated_at: (options.now ?? (() => new Date()))().toISOString(),
    live_requested: options.liveRequested,
    overall_status: overallStatus,
    read_only: c3.status !== "fail",
    execution_allowed: false,
    requirements,
    provenance: {
      node_runtime: process.version,
      java_commit: options.javaCommit ?? null,
      mini_kv_commit: options.miniKvCommit ?? null,
    },
  };
}

async function runConfiguredJavaProbe(
  config: JavaCapstoneProbeConfig | undefined,
): Promise<JavaCapstoneObservation> {
  if (config === undefined) {
    return {
      c1Checks: [
        failConfiguration("java.configuration", "JAVA_CAPSTONE_JAR is required when INTEGRATION_LIVE=1"),
        skippedCheck("java.health", "Java live configuration is incomplete"),
        skippedCheck("java.ops_evidence", "Java live configuration is incomplete"),
        skippedCheck("java.graceful_shutdown", "Java process was not started"),
      ],
      c3Checks: [skippedCheck("java.write_rejection", "Java live configuration is incomplete")],
    };
  }
  return runJavaCapstoneProbe(config);
}

async function runConfiguredMiniKvProbe(
  config: MiniKvCapstoneProbeConfig | undefined,
): Promise<MiniKvCapstoneObservation> {
  if (config === undefined) {
    return {
      c2Checks: [
        failConfiguration("mini_kv.configuration", "MINIKV_CLI_PATH is required when INTEGRATION_LIVE=1"),
        skippedCheck("mini_kv.smoke_json", "mini-kv live configuration is incomplete"),
        skippedCheck("mini_kv.check_json", "mini-kv live configuration is incomplete"),
      ],
      c3Checks: [skippedCheck("mini_kv.no_execution", "mini-kv live configuration is incomplete")],
    };
  }
  return runMiniKvCapstoneProbe(config);
}

function buildStaticNoWriteCheck(): CapstoneCheck {
  const routeCensus = buildCapstoneRouteCensus();
  const commandCensus = buildMiniKvCommandCensus();
  const expectedMethods = routeCensus.routes.map((route) => route.client_method).sort();
  const publicMethodsMatch = JSON.stringify(routeCensus.public_methods) === JSON.stringify(expectedMethods);
  const passed = routeCensus.write_route_count === 0
    && commandCensus.write_or_admin_command_count === 0
    && publicMethodsMatch;
  return {
    id: "node.capstone_surface_census",
    status: passed ? "pass" : "fail",
    summary: passed
      ? "capstone upstream client and mini-kv plan expose zero write methods"
      : "capstone upstream surface contains an unaccounted or writing operation",
    evidence: {
      java_routes: routeCensus,
      mini_kv_commands: commandCensus,
      public_methods_match_catalog: publicMethodsMatch,
    },
  };
}

function skippedJavaObservation(): JavaCapstoneObservation {
  return {
    c1Checks: [
      skippedCheck("java.process", "INTEGRATION_LIVE is not enabled; no Java process was started"),
      skippedCheck("java.health", "INTEGRATION_LIVE is not enabled"),
      skippedCheck("java.ops_evidence", "INTEGRATION_LIVE is not enabled"),
      skippedCheck("java.graceful_shutdown", "INTEGRATION_LIVE is not enabled"),
    ],
    c3Checks: [skippedCheck("java.write_rejection", "INTEGRATION_LIVE is not enabled")],
  };
}

function skippedMiniKvObservation(): MiniKvCapstoneObservation {
  return {
    c2Checks: [
      skippedCheck("mini_kv.process", "INTEGRATION_LIVE is not enabled; no mini-kv process was started"),
      skippedCheck("mini_kv.smoke_json", "INTEGRATION_LIVE is not enabled"),
      skippedCheck("mini_kv.check_json", "INTEGRATION_LIVE is not enabled"),
    ],
    c3Checks: [skippedCheck("mini_kv.no_execution", "INTEGRATION_LIVE is not enabled")],
  };
}

function requirement(
  id: CapstoneRequirementResult["id"],
  title: string,
  checks: CapstoneCheck[],
): CapstoneRequirementResult {
  return {
    id,
    title,
    status: statusFromChecks(checks),
    checks,
  };
}

function statusFromRequirementResults(
  results: readonly CapstoneRequirementResult[],
): CrossProjectReadinessReport["overall_status"] {
  if (results.some((result) => result.status === "fail")) {
    return "fail";
  }
  if (results.some((result) => result.status === "skipped")) {
    return "skipped";
  }
  return "pass";
}

function failConfiguration(id: string, error: string): CapstoneCheck {
  return {
    id,
    status: "fail",
    summary: "live capstone configuration is incomplete",
    evidence: { error },
  };
}
