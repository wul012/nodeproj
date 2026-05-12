import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("uses stable local defaults", () => {
    const config = loadConfig({});

    expect(config.port).toBe(4100);
    expect(config.host).toBe("127.0.0.1");
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6379);
    expect(config.upstreamProbesEnabled).toBe(false);
    expect(config.upstreamActionsEnabled).toBe(false);
    expect(config.mutationRateLimitWindowMs).toBe(60000);
    expect(config.mutationRateLimitMax).toBe(30);
    expect(config.javaExecutionContractFixturePath).toContain("failed-event-replay-execution-contract-approved.sample.json");
    expect(config.javaExecutionContractBlockedFixturePath).toContain("failed-event-replay-execution-contract-blocked.sample.json");
    expect(config.miniKvCheckJsonFixturePath).toContain("set-orderops-write-contract.json");
    expect(config.miniKvCheckJsonReadFixturePath).toContain("get-orderops-read-contract.json");
    expect(config.javaOpsEvidenceFixturePath).toContain("java-ops-evidence.sample.json");
    expect(config.miniKvStorageEvidenceFixturePath).toContain("mini-kv-storage-evidence.sample.json");
    expect(config.javaReplayAuditApprovedFixturePath).toContain("failed-event-replay-audit-approved.sample.json");
    expect(config.javaReplayAuditBlockedFixturePath).toContain("failed-event-replay-audit-blocked.sample.json");
    expect(config.javaReplayEvidenceIndexFixturePath).toContain("failed-event-replay-evidence-index.sample.json");
    expect(config.miniKvRestartRecoveryEvidenceFixturePath).toMatch(/(mini-kv-restart-recovery-evidence|restart-recovery-evidence)\.json$/);
    expect(config.miniKvRecoveryFixtureIndexPath).toMatch(/(mini-kv-recovery-fixtures-index|index)\.json$/);
    expect(config.auditStoreKind).toBe("memory");
    expect(config.auditStorePath).toBe("");
    expect(config.auditStoreUrl).toBe("");
  });

  it("normalizes numeric values and strips the order URL slash", () => {
    const config = loadConfig({
      PORT: "4200",
      ORDER_PLATFORM_URL: "http://localhost:8080/",
      MINIKV_PORT: "6380",
      OPS_SAMPLE_INTERVAL_MS: "1500",
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "on",
      MUTATION_RATE_LIMIT_WINDOW_MS: "30000",
      MUTATION_RATE_LIMIT_MAX: "4",
      JAVA_EXECUTION_CONTRACT_FIXTURE_PATH: "D:\\fixtures\\java.json",
      JAVA_EXECUTION_CONTRACT_BLOCKED_FIXTURE_PATH: "D:\\fixtures\\java-blocked.json",
      MINIKV_CHECKJSON_FIXTURE_PATH: "D:\\fixtures\\minikv.json",
      MINIKV_CHECKJSON_READ_FIXTURE_PATH: "D:\\fixtures\\minikv-read.json",
      JAVA_OPS_EVIDENCE_FIXTURE_PATH: "D:\\fixtures\\java-ops-evidence.json",
      MINIKV_STORAGE_EVIDENCE_FIXTURE_PATH: "D:\\fixtures\\minikv-storage-evidence.json",
      JAVA_REPLAY_AUDIT_APPROVED_FIXTURE_PATH: "D:\\fixtures\\java-replay-audit-approved.json",
      JAVA_REPLAY_AUDIT_BLOCKED_FIXTURE_PATH: "D:\\fixtures\\java-replay-audit-blocked.json",
      JAVA_REPLAY_EVIDENCE_INDEX_FIXTURE_PATH: "D:\\fixtures\\java-replay-index.json",
      MINIKV_RESTART_RECOVERY_EVIDENCE_FIXTURE_PATH: "D:\\fixtures\\minikv-recovery.json",
      MINIKV_RECOVERY_FIXTURE_INDEX_PATH: "D:\\fixtures\\minikv-recovery-index.json",
      AUDIT_STORE_KIND: "database",
      AUDIT_STORE_PATH: "D:\\audit\\audit.jsonl",
      AUDIT_STORE_URL: "postgres://user:secret@localhost:5432/orderops",
    });

    expect(config.port).toBe(4200);
    expect(config.orderPlatformUrl).toBe("http://localhost:8080");
    expect(config.miniKvPort).toBe(6380);
    expect(config.opsSampleIntervalMs).toBe(1500);
    expect(config.upstreamProbesEnabled).toBe(true);
    expect(config.upstreamActionsEnabled).toBe(true);
    expect(config.mutationRateLimitWindowMs).toBe(30000);
    expect(config.mutationRateLimitMax).toBe(4);
    expect(config.javaExecutionContractFixturePath).toBe("D:\\fixtures\\java.json");
    expect(config.javaExecutionContractBlockedFixturePath).toBe("D:\\fixtures\\java-blocked.json");
    expect(config.miniKvCheckJsonFixturePath).toBe("D:\\fixtures\\minikv.json");
    expect(config.miniKvCheckJsonReadFixturePath).toBe("D:\\fixtures\\minikv-read.json");
    expect(config.javaOpsEvidenceFixturePath).toBe("D:\\fixtures\\java-ops-evidence.json");
    expect(config.miniKvStorageEvidenceFixturePath).toBe("D:\\fixtures\\minikv-storage-evidence.json");
    expect(config.javaReplayAuditApprovedFixturePath).toBe("D:\\fixtures\\java-replay-audit-approved.json");
    expect(config.javaReplayAuditBlockedFixturePath).toBe("D:\\fixtures\\java-replay-audit-blocked.json");
    expect(config.javaReplayEvidenceIndexFixturePath).toBe("D:\\fixtures\\java-replay-index.json");
    expect(config.miniKvRestartRecoveryEvidenceFixturePath).toBe("D:\\fixtures\\minikv-recovery.json");
    expect(config.miniKvRecoveryFixtureIndexPath).toBe("D:\\fixtures\\minikv-recovery-index.json");
    expect(config.auditStoreKind).toBe("database");
    expect(config.auditStorePath).toBe("D:\\audit\\audit.jsonl");
    expect(config.auditStoreUrl).toBe("postgres://user:secret@localhost:5432/orderops");
  });

  it("parses boolean-style upstream probe flags", () => {
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "1" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "yes" }).upstreamProbesEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "off" }).upstreamProbesEnabled).toBe(false);
    expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "not-a-bool" }).upstreamProbesEnabled).toBe(false);
  });

  it("parses boolean-style upstream action flags", () => {
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }).upstreamActionsEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "on" }).upstreamActionsEnabled).toBe(true);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "0" }).upstreamActionsEnabled).toBe(false);
    expect(loadConfig({ UPSTREAM_ACTIONS_ENABLED: "not-a-bool" }).upstreamActionsEnabled).toBe(false);
  });
});
