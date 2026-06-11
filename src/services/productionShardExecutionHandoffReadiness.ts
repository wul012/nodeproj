import type { AppConfig } from "../config.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout } from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  routeEndpoints,
  satisfiedControl,
  sourceReference,
} from "./productionShardExecutionReadinessBuilder.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-handoff-readiness";

export function loadProductionShardExecutionHandoffReadiness(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout({
    config: input.config,
  });
  const sources = [
    sourceReference({
      id: "node-v409-runtime-pass-evidence-closeout",
      version: "Node v409",
      evidenceRole: "Runtime execution pass evidence closeout ledger",
      routeOrArtifact: source.evidenceEndpoints.passEvidenceCloseoutJson,
      ready: source.readyForRuntimeExecutionPassEvidenceCloseout,
      digest: source.closeout.closeoutDigest,
      checkCount: source.summary.checkCount,
      passedCheckCount: source.summary.passedCheckCount,
      productionBlockerCount: source.summary.productionBlockerCount,
    }),
  ];
  const controls = [
    satisfiedControl({
      id: "v409-chain-closed",
      title: "Node v409 runtime pass evidence chain is closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: source.closeout.closeoutDigest,
      nextAction: "Use this digest as the handoff anchor for the shard execution candidate contract.",
    }),
    satisfiedControl({
      id: "parallel-upstream-work-allowed",
      title: "Java and mini-kv remain recommended parallel work",
      owner: "cross-project",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: String(source.javaMiniKvRecommendedParallel),
      nextAction: "Do not make Java or mini-kv wait for a Node-only candidate drafting stage.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    sourceV409Ready: source.readyForRuntimeExecutionPassEvidenceCloseout,
    sourceV409DigestValid: /^[a-f0-9]{64}$/.test(source.closeout.closeoutDigest),
    sourceV409HandoffReady: source.readyForRuntimeExecutionChainHandoff,
    sourceV409HasNoProductionBlockers: source.summary.productionBlockerCount === 0,
    sourceV409DidNotRerunSmoke: source.rerunsSmoke === false,
    sourceV409DidNotStartServices: source.startsJavaService === false && source.startsMiniKvService === false,
    sourceV409KeptExecutionDenied: source.executionAllowed === false,
    sourceV409ParallelPlanClear:
      source.javaMiniKvRecommendedParallel === true && source.nodeIsUpstreamPreApprovalBlocker === false,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution handoff readiness",
    profileVersion: "production-shard-execution-handoff-readiness.v1",
    stageId: "handoff-readiness",
    activeNodeVersion: "Node v2078",
    sourceNodeVersion: "Node v409",
    readyState: "handoff-readiness-ready",
    readyDecision: "accept-runtime-pass-evidence-handoff",
    sources,
    controls,
    stagePayload: {
      handoffMode: "runtime-pass-evidence-to-production-shard-candidate",
      handoffDigest: source.closeout.closeoutDigest,
      sourceSpan: source.closeout.sourceSpan,
      sourceStageVersions: source.sourceStageVersions,
      nextCandidateVersion: "Node v2079",
      stopsGrowthCondition:
        "Stop adding handoff ledgers once the v2079 candidate contract names every production execution precondition.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2078-production-shard-execution-handoff-readiness-roadmap.md",
      "docs/plans3/v2079-production-shard-execution-candidate-contract-roadmap.md",
    ),
    nextActions: [
      "Use v2078 as the bridge from the v409 runtime pass evidence closeout to a production shard execution candidate.",
      "Draft v2079 as a disabled candidate contract; do not enable active shard routing or production execution.",
      "Keep Java and mini-kv parallel unless the candidate contract asks for fresh owner-signed runtime evidence.",
    ],
    warnings: [
      {
        code: "HANDOFF_IS_NOT_EXECUTION_APPROVAL",
        severity: "warning",
        source: "node-v2078",
        message: "v2078 proves that the prior evidence chain can be handed off; it is not production execution approval.",
      },
    ],
    recommendations: [
      {
        code: "DRAFT_CANDIDATE_CONTRACT_NEXT",
        severity: "recommendation",
        source: "node-v2078",
        message: "Move next to a single candidate contract that names execution phases, invariants, owners, and stop rules.",
      },
    ],
  });
}

export { renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionHandoffReadinessMarkdown };
