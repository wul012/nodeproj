export type CapstoneStatus = "pass" | "fail" | "skipped";

export type CapstoneRequirementId = "C1" | "C2" | "C3";

export interface CapstoneCheck {
  id: string;
  status: CapstoneStatus;
  summary: string;
  evidence: Record<string, unknown>;
}

export interface CapstoneRequirementResult {
  id: CapstoneRequirementId;
  title: string;
  status: CapstoneStatus;
  checks: CapstoneCheck[];
}

export interface CrossProjectReadinessReport {
  schema_version: "orderops.cross-project-readiness.v1";
  generated_at: string;
  live_requested: boolean;
  overall_status: CapstoneStatus;
  read_only: boolean;
  execution_allowed: false;
  requirements: CapstoneRequirementResult[];
  provenance: {
    node_runtime: string;
    java_commit: string | null;
    mini_kv_commit: string | null;
  };
}

export interface JavaCapstoneObservation {
  c1Checks: CapstoneCheck[];
  c3Checks: CapstoneCheck[];
}

export interface MiniKvCapstoneObservation {
  c2Checks: CapstoneCheck[];
  c3Checks: CapstoneCheck[];
}

export function statusFromChecks(checks: readonly CapstoneCheck[]): CapstoneStatus {
  if (checks.some((check) => check.status === "fail")) {
    return "fail";
  }
  if (checks.length === 0 || checks.some((check) => check.status === "skipped")) {
    return "skipped";
  }
  return "pass";
}

export function skippedCheck(id: string, summary: string): CapstoneCheck {
  return {
    id,
    status: "skipped",
    summary,
    evidence: {},
  };
}
