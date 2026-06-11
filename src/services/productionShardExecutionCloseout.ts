import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionCandidateArchiveVerification } from "./productionShardExecutionCandidateArchiveVerification.js";
import { loadProductionShardExecutionCandidateContract } from "./productionShardExecutionCandidateContract.js";
import { loadProductionShardExecutionFailureMatrix } from "./productionShardExecutionFailureMatrix.js";
import { loadProductionShardExecutionHandoffReadiness } from "./productionShardExecutionHandoffReadiness.js";
import { loadProductionShardExecutionOperatorWindowWorksheet } from "./productionShardExecutionOperatorWindowWorksheet.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-closeout";

export function loadProductionShardExecutionCloseout(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const v2078 = loadProductionShardExecutionHandoffReadiness(input);
  const v2079 = loadProductionShardExecutionCandidateContract(input);
  const v2080 = loadProductionShardExecutionFailureMatrix(input);
  const v2081 = loadProductionShardExecutionOperatorWindowWorksheet(input);
  const v2082 = loadProductionShardExecutionCandidateArchiveVerification(input);
  const sources = [
    profileSource("node-v2078-handoff-readiness", v2078, "Handoff readiness"),
    profileSource("node-v2079-candidate-contract", v2079, "Candidate contract"),
    profileSource("node-v2080-failure-matrix", v2080, "Failure matrix"),
    profileSource("node-v2081-operator-window-worksheet", v2081, "Operator worksheet"),
    profileSource("node-v2082-candidate-archive-verification", v2082, "Candidate archive verification"),
  ];
  const controls = [
    satisfiedControl({
      id: "six-version-readiness-batch-closed",
      title: "Six-version readiness batch is closed",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sources.map((source) => `${source.version}:${source.digest}`).join("|"),
      nextAction: "Use this closeout to start the next batch on signed approval and external owner receipts.",
    }),
    satisfiedControl({
      id: "next-batch-direction-named",
      title: "Next batch direction is named",
      owner: "cross-project",
      blocksNextStage: false,
      blocksProductionExecution: false,
      evidence: "signed approval + managed audit store + owner receipts",
      nextAction: "Ask Java and mini-kv for only the owner receipt artifacts that this closeout names.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    v2078Ready: v2078.readyForNextStage,
    v2079Ready: v2079.readyForNextStage,
    v2080Ready: v2080.readyForNextStage,
    v2081Ready: v2081.readyForNextStage,
    v2082Ready: v2082.readyForNextStage,
    fiveSourceProfilesIncluded: sources.length === 5,
    allSourceProfilesReady: sources.every((source) => source.ready),
    allSourceDigestsValid: sources.every((source) =>
      typeof source.digest === "string" && /^[a-f0-9]{64}$/.test(source.digest)),
    sourceOrderPreserved:
      sources.map((source) => source.version).join(">") === "Node v2078>Node v2079>Node v2080>Node v2081>Node v2082",
    allSourceChecksPassed: sources.every((source) => source.checkCount === source.passedCheckCount),
    noSourceProductionBlockers: sources.every((source) => source.productionBlockerCount === 0),
    allSourceProfilesKeepProductionExecutionDenied: [v2078, v2079, v2080, v2081, v2082].every((profile) =>
      profile.readyForProductionShardExecution === false && profile.safety.executionAllowed === false),
    closeoutNamesNextRealBlockers: true,
    javaMiniKvParallelGuidancePreserved: [v2078, v2079, v2080, v2081, v2082].every((profile) =>
      profile.javaMiniKvRecommendedParallel && !profile.nodeIsUpstreamPreApprovalBlocker),
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution readiness closeout",
    profileVersion: "production-shard-execution-closeout.v1",
    stageId: "closeout",
    activeNodeVersion: "Node v2083",
    sourceNodeVersion: "Node v2082",
    readyState: "closeout-ready",
    readyDecision: "close-production-shard-execution-readiness-batch",
    sources,
    controls,
    stagePayload: {
      closeout: {
        closedSpan: "Node v2078 through Node v2083",
        maturityAfterBatch:
          "Ready for signed-approval and owner-receipt preconditions; still not ready for production execution.",
        nextBatchFocus: [
          "signed production execution approval artifact",
          "managed audit production store binding",
          "Java and mini-kv owner receipts for abort, rollback, and cleanup",
        ],
        productionAuthority: false,
      },
      growthStopCondition:
        "Do not add another readiness closeout until at least one next-batch blocker receives real external evidence.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2083-production-shard-execution-closeout-roadmap.md",
      "docs/plans3/v2084-production-shard-execution-signed-approval-roadmap.md",
    ),
    nextActions: [
      "Start the next batch with signed approval evidence, not another internal readiness report.",
      "Have Java and mini-kv provide owner receipts for abort, rollback, and cleanup responsibilities.",
      "Keep production execution disabled until managed audit storage and signed approval are both real.",
    ],
    warnings: [
      {
        code: "CLOSEOUT_STILL_BLOCKS_PRODUCTION_EXECUTION",
        severity: "warning",
        source: "node-v2083",
        message: "v2083 closes the candidate readiness batch but intentionally keeps production execution blocked.",
      },
    ],
    recommendations: [
      {
        code: "MOVE_TO_EXTERNAL_EVIDENCE_NEXT",
        severity: "recommendation",
        source: "node-v2083",
        message: "The next meaningful jump is external signed approval and owner receipt evidence, not more internal gates.",
      },
    ],
  });
}

export { renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionCloseoutMarkdown };
