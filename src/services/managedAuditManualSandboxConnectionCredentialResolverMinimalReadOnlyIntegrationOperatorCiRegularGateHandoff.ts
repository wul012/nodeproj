import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.js";
import type {
  FrozenContractReference,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
  OperatorCiRegularGateHandoff,
  OperatorCiRegularGateHandoffArchiveReferences,
  OperatorCiRegularGateHandoffChecks,
  OperatorCiRegularGateHandoffFileReference,
  OperatorCiRegularGateHandoffMessage,
  OperatorCiRegularGateHandoffSummary,
  ParallelShardReadinessPlan,
  SourceNodeV368GateExecutionArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff";
const SOURCE_NODE_V368_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution-archive-verification";
const ACTIVE_PLAN = "docs/plans3/v368-post-minimal-read-only-integration-gate-execution-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans3/v369-post-operator-ci-regular-gate-handoff-roadmap.md";
const READ_ONLY_CONTRACT_PATH = "fixtures/upstream-contracts/read-only-integration.v1.json";
const SHARD_READINESS_CONTRACT_PATH = "fixtures/upstream-contracts/shard-readiness.v1.json";
const V368_BASENAME = "minimal-read-only-gate-execution-archive-verification-v368";
const V368_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/373-minimal-read-only-gate-execution-archive-verification-v368.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV368Profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification({
      config: input.config,
      archiveRoot: projectRoot,
    });
  const sourceNodeV368 = createSourceNodeV368(sourceNodeV368Profile);
  const archiveReferences = createArchiveReferences(projectRoot);
  const frozenContracts = createFrozenContracts(projectRoot);
  const handoff = createHandoff(sourceNodeV368, frozenContracts);
  const parallelShardReadinessPlan = createParallelShardReadinessPlan(frozenContracts);
  const checks = createChecks(
    input.config,
    sourceNodeV368,
    archiveReferences,
    frozenContracts,
    handoff,
    parallelShardReadinessPlan,
  );
  checks.readyForOperatorCiRegularGateHandoff = Object.entries(checks)
    .filter(([key]) => key !== "readyForOperatorCiRegularGateHandoff")
    .every(([, value]) => value);
  const ready = checks.readyForOperatorCiRegularGateHandoff;
  const readyForParallel = ready;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV368, archiveReferences, frozenContracts, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal read-only integration operator/CI regular gate handoff",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    handoffState: ready ? "operator-ci-regular-gate-handoff-ready" : "blocked",
    handoffDecision: ready ? "freeze-read-only-and-shard-readiness-contracts" : "blocked",
    readyForOperatorCiRegularGateHandoff: ready,
    readyForParallelMiniKvShardReadinessPrototype: readyForParallel,
    readyForParallelJavaShardReadinessEcho: readyForParallel,
    readyForNodeV370ShardReadinessContractConsumerGate: readyForParallel,
    consumesNodeV367GateExecution: true,
    consumesNodeV368GateExecutionArchiveVerification: true,
    activeNodeVersion: "Node v369",
    sourceNodeVersion: "Node v368",
    handoffOnly: true,
    contractFreezeIncluded: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV368,
    archiveReferences,
    frozenContracts,
    handoff,
    parallelShardReadinessPlan,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      operatorCiRegularGateHandoffJson: ROUTE_PATH,
      operatorCiRegularGateHandoffMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV368Json: SOURCE_NODE_V368_ROUTE,
      sourceNodeV368Markdown: `${SOURCE_NODE_V368_ROUTE}?format=markdown`,
      readOnlyIntegrationContract: READ_ONLY_CONTRACT_PATH,
      shardReadinessContract: SHARD_READINESS_CONTRACT_PATH,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v370",
    },
    nextActions: ready
      ? [
        "Let mini-kv start the shard readiness prototype and Java start the shard readiness echo in parallel under shard-readiness.v1.",
        "Use Node v370 only after both projects publish read-only shard readiness evidence.",
        "Keep Node as the contract consumer and integration gate; do not resume Node-fronted prerequisite chains for shard work.",
      ]
      : [
        "Fix the v368 archive verification or frozen contract files before parallel shard readiness work begins.",
        "Do not ask Java or mini-kv to implement against an unfrozen contract.",
      ],
  };
}

function createSourceNodeV368(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
): SourceNodeV368GateExecutionArchiveVerificationReference {
  return {
    sourceVersion: "Node v368",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForArchiveVerification: profile.readyForMinimalReadOnlyIntegrationGateExecutionArchiveVerification,
    readyForNodeV369OperatorCiRegularGateHandoff: profile.readyForNodeV369OperatorCiRegularGateHandoff,
    sourceNodeVersion: "Node v367",
    sourceNodeV367GateExecutionResult: profile.sourceNodeV367.gateExecutionResult,
    sourceNodeV367GateExecutionDecision: profile.sourceNodeV367.gateExecutionDecision,
    sourceNodeV367ExecutionDigest: profile.sourceNodeV367.gateExecutionDigest,
    v368ArchiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    v368OperatorCiCheckDigest: profile.operatorCiHandoffCheck.checkDigest,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    archiveCheckCount: profile.summary.checkCount,
    archivePassedCheckCount: profile.summary.passedCheckCount,
    attemptedTargetCount: profile.summary.attemptedTargetCount,
    passedTargetCount: profile.summary.passedTargetCount,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    runtimeShellImplemented: false,
    executionAllowed: false,
  };
}

function createArchiveReferences(projectRoot: string): OperatorCiRegularGateHandoffArchiveReferences {
  return {
    sourceNodeV368Json: fileReference(projectRoot, "e", "368", "evidence", `${V368_BASENAME}-http.json`),
    sourceNodeV368Markdown: fileReference(projectRoot, "e", "368", "evidence", `${V368_BASENAME}-http.md`),
    sourceNodeV368Summary: fileReference(projectRoot, "e", "368", "evidence", `${V368_BASENAME}-summary.json`),
    sourceNodeV368BrowserSnapshot: fileReference(projectRoot, "e", "368", "evidence", `${V368_BASENAME}-browser-snapshot.md`),
    sourceNodeV368Html: fileReference(projectRoot, "e", "368", `${V368_BASENAME}.html`),
    sourceNodeV368Screenshot: fileReference(projectRoot, "e", "368", "图片", `${V368_BASENAME}.png`),
    sourceNodeV368Explanation: fileReference(projectRoot, "e", "368", "解释", `${V368_BASENAME}.md`),
    sourceNodeV368Walkthrough: fileReference(projectRoot, V368_WALKTHROUGH),
    sourceNodeV368Plan: fileReference(projectRoot, ACTIVE_PLAN),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): OperatorCiRegularGateHandoffFileReference {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, byteLength: 0, digest: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    byteLength: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function createFrozenContracts(projectRoot: string): FrozenContractReference[] {
  return [
    createContractReference(projectRoot, "read-only-integration.v1", READ_ONLY_CONTRACT_PATH),
    createContractReference(projectRoot, "shard-readiness.v1", SHARD_READINESS_CONTRACT_PATH),
  ];
}

function createContractReference(
  projectRoot: string,
  contractVersion: FrozenContractReference["contractVersion"],
  contractPath: string,
): FrozenContractReference {
  const absolutePath = path.join(projectRoot, ...contractPath.split("/"));
  const raw = existsSync(absolutePath) ? readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "") : "";
  const parsed = parseJson(raw);
  const requiredFields = arrayOfStrings(parsed?.requiredFields);
  const fieldRules = parsed?.fieldRules;
  const fieldRuleRecord = fieldRules !== null && typeof fieldRules === "object" && !Array.isArray(fieldRules)
    ? fieldRules as Record<string, unknown>
    : {};
  return {
    contractVersion,
    contractState: parsed?.contractState === "frozen" ? "frozen" : "missing",
    path: contractPath,
    exists: existsSync(absolutePath),
    digest: existsSync(absolutePath) ? createHash("sha256").update(readFileSync(absolutePath)).digest("hex") : null,
    requiredFields,
    requiredFieldCount: requiredFields.length,
    readOnlyRequired: fieldRuleRecord.readOnly === true,
    executionAllowedRequired: fieldRuleRecord.executionAllowed === false,
    automaticUpstreamStartAllowed: false,
  };
}

function createHandoff(
  source: SourceNodeV368GateExecutionArchiveVerificationReference,
  contracts: readonly FrozenContractReference[],
): OperatorCiRegularGateHandoff {
  const record = {
    handoffMode: "operator-ci-regular-minimal-read-only-gate" as const,
    sourceSpan: "Node v367 gate execution plus Node v368 archive verification" as const,
    sourceNodeV367ExecutionDigest: source.sourceNodeV367ExecutionDigest,
    v368ArchiveVerificationDigest: source.v368ArchiveVerificationDigest,
    contractDigests: contracts.map((contract) => ({ version: contract.contractVersion, digest: contract.digest })),
    focusedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts",
    groupedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerification.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts",
    buildCommand: "npm.cmd run build",
    smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for operator/CI handoff route",
  };
  return {
    handoffDigest: sha256StableJson(record),
    handoffMode: record.handoffMode,
    sourceSpan: record.sourceSpan,
    freezesContracts: true,
    readOnlyIntegrationContractVersion: "read-only-integration.v1",
    shardReadinessContractVersion: "shard-readiness.v1",
    focusedCommand: record.focusedCommand,
    groupedCommand: record.groupedCommand,
    buildCommand: record.buildCommand,
    smokeCommand: record.smokeCommand,
    actualProbeRequiresExternalReadWindow: true,
    largeTestBatchDefaultAllowed: false,
    automaticUpstreamStart: false,
    managedAuditConnectionAllowed: false,
    nextNodeVersionSuggested: "Node v370",
  };
}

function createParallelShardReadinessPlan(
  contracts: readonly FrozenContractReference[],
): ParallelShardReadinessPlan {
  const record = {
    contractDigests: contracts.map((contract) => ({ version: contract.contractVersion, digest: contract.digest })),
    miniKvTrack: "shard readiness prototype",
    javaTrack: "shard readiness echo",
    nodeTrack: "contract consumer gate",
  };
  return {
    planDigest: sha256StableJson(record),
    miniKvTrack: {
      recommendedVersion: "mini-kv shard-readiness prototype",
      canRunInParallelWithJava: true,
      consumesContract: "shard-readiness.v1",
      expectedOutput: "read-only JSON/CLI evidence",
      allowedScope: ["shard-map", "slot-table", "key-routing", "multi-dir-or-multi-process-smoke"],
      forbiddenScope: ["order-authoritative-storage", "audit-authoritative-storage", "write-admin-in-node-gate"],
    },
    javaTrack: {
      recommendedVersion: "Java shard-readiness echo",
      canRunInParallelWithMiniKv: true,
      consumesContract: "shard-readiness.v1",
      expectedOutput: "fixture-first read-only echo, then live echo",
      allowedScope: ["read-only-endpoint-or-fixture", "shard-count-echo", "routing-mode-echo"],
      forbiddenScope: ["order-transaction-change", "payment-or-inventory-route-change", "ledger-write"],
    },
    nodeTrack: {
      nextVersion: "Node v370",
      waitsForJavaAndMiniKvShardEvidence: true,
      consumesContracts: ["read-only-integration.v1", "shard-readiness.v1"],
      role: "contract-consumer-and-integration-gate",
    },
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV368GateExecutionArchiveVerificationReference,
  archiveRefs: OperatorCiRegularGateHandoffArchiveReferences,
  contracts: readonly FrozenContractReference[],
  handoff: OperatorCiRegularGateHandoff,
  parallelPlan: ParallelShardReadinessPlan,
): OperatorCiRegularGateHandoffChecks {
  const readOnlyContract = contractByVersion(contracts, "read-only-integration.v1");
  const shardContract = contractByVersion(contracts, "shard-readiness.v1");
  return {
    sourceNodeV368Ready:
      source.archiveVerificationState === "minimal-read-only-integration-gate-execution-archive-verified"
      && source.archiveVerificationDecision === "archive-minimal-read-only-gate-execution-and-operator-ci-handoff"
      && source.readyForNodeV369OperatorCiRegularGateHandoff,
    sourceNodeV367GatePassed:
      source.sourceNodeV367GateExecutionResult === "all-read-passed"
      && source.sourceNodeV367GateExecutionDecision === "archive-read-passed-gate-execution"
      && source.attemptedTargetCount === 5
      && source.passedTargetCount === 5,
    sourceNodeV368ArchiveFilesComplete:
      source.archiveFileCount === 11
      && source.presentArchiveFileCount === 11,
    sourceNodeV368ChecksAllPassed:
      source.archiveCheckCount === 42
      && source.archivePassedCheckCount === 42
      && source.productionBlockerCount === 0,
    sourceNodeV368DoesNotRerunProbe: true,
    sourceNodeV368KeepsRuntimeBoundaryClosed:
      !source.startsJavaService
      && !source.startsMiniKvService
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp
      && !source.executionAllowed,
    sourceNodeV368EvidenceFilesPresent:
      Object.values(archiveRefs).every((file) => file.exists && file.byteLength > 0),
    readOnlyIntegrationContractPresent: readOnlyContract?.exists === true,
    readOnlyIntegrationContractFrozen: readOnlyContract?.contractState === "frozen",
    readOnlyIntegrationRequiredFieldsComplete:
      requiredFieldsPresent(readOnlyContract, ["project", "version", "readOnly", "executionAllowed", "status", "evidencePath"]),
    readOnlyIntegrationRulesSafe:
      readOnlyContract?.readOnlyRequired === true
      && readOnlyContract.executionAllowedRequired === true
      && !readOnlyContract.automaticUpstreamStartAllowed,
    shardReadinessContractPresent: shardContract?.exists === true,
    shardReadinessContractFrozen: shardContract?.contractState === "frozen",
    shardReadinessRequiredFieldsComplete:
      requiredFieldsPresent(shardContract, [
        "project",
        "version",
        "readOnly",
        "executionAllowed",
        "shardEnabled",
        "shardCount",
        "slotCount",
        "routingMode",
        "evidencePath",
        "status",
      ]),
    shardReadinessRulesSafe:
      shardContract?.readOnlyRequired === true
      && shardContract.executionAllowedRequired === true
      && !shardContract.automaticUpstreamStartAllowed,
    handoffDigestStable: isDigest(handoff.handoffDigest),
    handoffUsesFocusedCommands:
      handoff.focusedCommand.includes("OperatorCiRegularGateHandoff.test.ts")
      && handoff.groupedCommand.includes("GateExecutionArchiveVerification.test.ts")
      && handoff.buildCommand === "npm.cmd run build",
    handoffAvoidsLargeTestBatch: !handoff.largeTestBatchDefaultAllowed,
    handoffRequiresExternalReadWindowForProbe: handoff.actualProbeRequiresExternalReadWindow,
    handoffDoesNotStartUpstreams: !handoff.automaticUpstreamStart,
    parallelShardPlanExplicit:
      isDigest(parallelPlan.planDigest)
      && parallelPlan.nodeTrack.nextVersion === "Node v370",
    parallelJavaMiniKvAllowed:
      parallelPlan.miniKvTrack.canRunInParallelWithJava
      && parallelPlan.javaTrack.canRunInParallelWithMiniKv,
    nodeNoLongerBlocksParallelProgress:
      parallelPlan.nodeTrack.waitsForJavaAndMiniKvShardEvidence
      && parallelPlan.nodeTrack.role === "contract-consumer-and-integration-gate",
    noManagedAuditConnection:
      !config.upstreamActionsEnabled && !handoff.managedAuditConnectionAllowed && !source.connectsManagedAudit,
    noCredentialValueRead: !source.credentialValueRead,
    noRawEndpointUrlParsed: !source.rawEndpointUrlParsed,
    noRuntimeShellImplementedOrInvoked: !source.runtimeShellImplemented,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForOperatorCiRegularGateHandoff: false,
  };
}

function collectProductionBlockers(checks: OperatorCiRegularGateHandoffChecks): OperatorCiRegularGateHandoffMessage[] {
  const rules: Array<[boolean, string, OperatorCiRegularGateHandoffMessage["source"], string]> = [
    [checks.sourceNodeV368Ready, "SOURCE_NODE_V368_NOT_READY", "node-v368", "Node v368 archive verification must be ready."],
    [checks.sourceNodeV367GatePassed, "SOURCE_NODE_V367_GATE_NOT_PASSED", "node-v367", "Node v367 gate execution must remain 5/5 passed."],
    [checks.sourceNodeV368EvidenceFilesPresent, "SOURCE_NODE_V368_EVIDENCE_MISSING", "node-v368", "Node v368 archive evidence must be present under e/368."],
    [checks.readOnlyIntegrationContractFrozen, "READ_ONLY_CONTRACT_NOT_FROZEN", "contract-freeze", "read-only-integration.v1 must be frozen."],
    [checks.shardReadinessContractFrozen, "SHARD_READINESS_CONTRACT_NOT_FROZEN", "contract-freeze", "shard-readiness.v1 must be frozen."],
    [checks.handoffUsesFocusedCommands, "HANDOFF_COMMANDS_NOT_FOCUSED", "operator-ci-handoff", "v369 must keep focused and grouped verification commands."],
    [checks.parallelJavaMiniKvAllowed, "PARALLEL_PLAN_NOT_ALLOWED", "parallel-shard-plan", "Java and mini-kv shard tracks must be explicitly parallel."],
    [checks.nodeNoLongerBlocksParallelProgress, "NODE_STILL_BLOCKS_PROGRESS", "parallel-shard-plan", "Node must wait as a contract consumer, not pre-approve every shard step."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
    [checks.noCredentialValueRead, "CREDENTIAL_VALUE_READ", "runtime-boundary", "Credential value must remain unread."],
    [checks.noRawEndpointUrlParsed, "RAW_ENDPOINT_PARSED", "runtime-boundary", "Raw endpoint URL must remain unparsed."],
    [checks.noRuntimeShellImplementedOrInvoked, "RUNTIME_SHELL_OPENED", "runtime-boundary", "Runtime shell must remain unimplemented and uninvoked."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): OperatorCiRegularGateHandoffMessage[] {
  return [{
    code: "NODE_ROLE_REDUCED_TO_CONTRACT_CONSUMER",
    severity: "warning",
    source: "parallel-shard-plan",
    message: "Node now gates risk and consumes contracts; Java and mini-kv can produce shard-readiness evidence in parallel.",
  }];
}

function collectRecommendations(ready: boolean): OperatorCiRegularGateHandoffMessage[] {
  return [{
    code: ready ? "START_PARALLEL_SHARD_READINESS_WORK" : "FIX_HANDOFF_BEFORE_PARALLEL_WORK",
    severity: "recommendation",
    source: "parallel-shard-plan",
    message: ready
      ? "Start mini-kv shard readiness prototype and Java shard readiness echo in parallel; return to Node v370 when both publish read-only evidence."
      : "Keep parallel shard work paused until v369 handoff and frozen contracts are internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV368GateExecutionArchiveVerificationReference,
  archiveRefs: OperatorCiRegularGateHandoffArchiveReferences,
  contracts: readonly FrozenContractReference[],
  checks: OperatorCiRegularGateHandoffChecks,
  productionBlockers: readonly OperatorCiRegularGateHandoffMessage[],
  warnings: readonly OperatorCiRegularGateHandoffMessage[],
  recommendations: readonly OperatorCiRegularGateHandoffMessage[],
): OperatorCiRegularGateHandoffSummary {
  const archiveFiles = Object.values(archiveRefs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceArchiveCheckCount: source.archiveCheckCount,
    sourceArchivePassedCheckCount: source.archivePassedCheckCount,
    sourceGateTargetCount: source.attemptedTargetCount,
    sourceGatePassedTargetCount: source.passedTargetCount,
    sourceArchiveFileCount: archiveFiles.length,
    sourcePresentArchiveFileCount: archiveFiles.filter((file) => file.exists && file.byteLength > 0).length,
    frozenContractCount: contracts.filter((contract) => contract.contractState === "frozen").length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function parseJson(raw: string): Record<string, unknown> | null {
  if (raw.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

function arrayOfStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function contractByVersion(
  contracts: readonly FrozenContractReference[],
  version: FrozenContractReference["contractVersion"],
): FrozenContractReference | undefined {
  return contracts.find((contract) => contract.contractVersion === version);
}

function requiredFieldsPresent(contract: FrozenContractReference | undefined, fields: readonly string[]): boolean {
  return contract !== undefined && fields.every((field) => contract.requiredFields.includes(field));
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
