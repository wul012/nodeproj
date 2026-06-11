import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionHandoffReadiness } from "./productionShardExecutionHandoffReadiness.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-candidate-contract";

const CANDIDATE_PHASES = [
  "pre-window-evidence-lock",
  "operator-approved-read-only-probe",
  "shard-plan-digest-binding",
  "candidate-decision-freeze",
  "archive-and-cleanup-proof",
] as const;

const CONTRACT_INVARIANTS = [
  "executionAllowed remains false until signed production approval exists",
  "Node does not start or stop Java / mini-kv from this route",
  "candidate phases are replayable from digests before any production window",
  "write and migration operations stay outside the shard candidate contract",
] as const;

export function loadProductionShardExecutionCandidateContract(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadProductionShardExecutionHandoffReadiness(input);
  const sources = [profileSource("node-v2078-handoff-readiness", source, "Production shard handoff readiness")];
  const controls = [
    satisfiedControl({
      id: "candidate-phases-named",
      title: "Candidate phases are explicitly named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: CANDIDATE_PHASES.join(","),
      nextAction: "Use these phases as the only allowed v2080 failure-matrix scope.",
    }),
    satisfiedControl({
      id: "candidate-invariants-named",
      title: "Execution invariants are explicitly named",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: CONTRACT_INVARIANTS.join("; "),
      nextAction: "Verify each invariant in v2080 and v2081.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV2078Ready: source.readyForNextStage,
    sourceV2078DigestValid: /^[a-f0-9]{64}$/.test(source.stage.readinessDigest),
    fiveCandidatePhasesNamed: CANDIDATE_PHASES.length === 5,
    allCandidatePhasesHaveStopOrArchiveMeaning: CANDIDATE_PHASES.every((phase) =>
      phase.includes("lock") || phase.includes("approved") || phase.includes("digest")
      || phase.includes("freeze") || phase.includes("archive")),
    invariantsPreventExecutionEnablement: CONTRACT_INVARIANTS.some((invariant) => invariant.includes("false")),
    invariantsPreventServiceLifecycleOwnership: CONTRACT_INVARIANTS.some((invariant) => invariant.includes("start or stop")),
    invariantsRequireDigestReplay: CONTRACT_INVARIANTS.some((invariant) => invariant.includes("digests")),
    invariantsKeepWritesOut: CONTRACT_INVARIANTS.some((invariant) => invariant.includes("write")),
    candidateContractDoesNotConsumeFreshSiblingRuntime: true,
    javaMiniKvCanContinueParallel: source.javaMiniKvRecommendedParallel,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution candidate contract",
    profileVersion: "production-shard-execution-candidate-contract.v1",
    stageId: "candidate-contract",
    activeNodeVersion: "Node v2079",
    sourceNodeVersion: "Node v2078",
    readyState: "candidate-contract-ready",
    readyDecision: "accept-disabled-shard-execution-candidate-contract",
    sources,
    controls,
    stagePayload: {
      candidateContract: {
        contractMode: "disabled-production-shard-execution-candidate",
        phases: CANDIDATE_PHASES,
        invariants: CONTRACT_INVARIANTS,
        allowedRuntimeSurface: "read-only probe evidence and archive replay only",
        forbiddenRuntimeSurface: "write commands, migrations, credential reads, raw endpoint parsing, active shard routing",
      },
      growthStopCondition:
        "Do not add another candidate contract unless a later Java or mini-kv artifact changes the execution surface.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2079-production-shard-execution-candidate-contract-roadmap.md",
      "docs/plans3/v2080-production-shard-execution-failure-matrix-roadmap.md",
    ),
    nextActions: [
      "Use v2079 as the contract boundary for v2080 failure, abort, and rollback classification.",
      "Keep the contract disabled-by-default; production blockers remain intentional until signed approval exists.",
      "Ask Java and mini-kv only for evidence that maps to these phases, not broad new reports.",
    ],
    warnings: [
      {
        code: "CANDIDATE_CONTRACT_IS_DISABLED",
        severity: "warning",
        source: "node-v2079",
        message: "The candidate contract names the execution shape but still denies production execution.",
      },
    ],
    recommendations: [
      {
        code: "CLASSIFY_FAILURES_NEXT",
        severity: "recommendation",
        source: "node-v2079",
        message: "Derive v2080 failure, abort, and rollback semantics directly from the five candidate phases.",
      },
    ],
  });
}

export { renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionCandidateContractMarkdown };
