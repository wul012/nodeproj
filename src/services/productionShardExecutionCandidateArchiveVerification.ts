import type { AppConfig } from "../config.js";
import {
  closedBoundaryChecks,
  createProductionShardExecutionProfile,
  productionApprovalControls,
  profileSource,
  routeEndpoints,
  satisfiedControl,
} from "./productionShardExecutionReadinessBuilder.js";
import { loadProductionShardExecutionCandidateContract } from "./productionShardExecutionCandidateContract.js";
import { loadProductionShardExecutionFailureMatrix } from "./productionShardExecutionFailureMatrix.js";
import { loadProductionShardExecutionHandoffReadiness } from "./productionShardExecutionHandoffReadiness.js";
import { loadProductionShardExecutionOperatorWindowWorksheet } from "./productionShardExecutionOperatorWindowWorksheet.js";
import { renderProductionShardExecutionReadinessMarkdown } from "./productionShardExecutionReadinessRenderer.js";
import type { ProductionShardExecutionReadinessProfile } from "./productionShardExecutionReadinessTypes.js";

const ROUTE =
  "/api/v1/audit/production-shard-execution-candidate-archive-verification";

export function loadProductionShardExecutionCandidateArchiveVerification(
  input: { config: AppConfig },
): ProductionShardExecutionReadinessProfile {
  const v2078 = loadProductionShardExecutionHandoffReadiness(input);
  const v2079 = loadProductionShardExecutionCandidateContract(input);
  const v2080 = loadProductionShardExecutionFailureMatrix(input);
  const v2081 = loadProductionShardExecutionOperatorWindowWorksheet(input);
  const sources = [
    profileSource("node-v2078-handoff-readiness", v2078, "Handoff readiness"),
    profileSource("node-v2079-candidate-contract", v2079, "Candidate contract"),
    profileSource("node-v2080-failure-matrix", v2080, "Failure matrix"),
    profileSource("node-v2081-operator-window-worksheet", v2081, "Operator window worksheet"),
  ];
  const sourceDigests = sources.map((source) => source.digest);
  const controls = [
    satisfiedControl({
      id: "candidate-archive-span-complete",
      title: "Candidate archive span is complete",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sources.map((source) => source.version).join(","),
      nextAction: "Use v2082 as the source archive for the v2083 six-version closeout.",
    }),
    satisfiedControl({
      id: "candidate-archive-digests-stable",
      title: "Candidate archive digests are stable",
      owner: "node",
      blocksNextStage: true,
      blocksProductionExecution: false,
      evidence: sourceDigests.join(","),
      nextAction: "Keep these digests immutable when writing v2083 closeout documentation.",
    }),
    ...productionApprovalControls(),
  ];
  const checks = {
    v2078Ready: v2078.readyForNextStage,
    v2079Ready: v2079.readyForNextStage,
    v2080Ready: v2080.readyForNextStage,
    v2081Ready: v2081.readyForNextStage,
    fourCandidateSourcesPresent: sources.length === 4,
    allCandidateSourcesReady: sources.every((source) => source.ready),
    allCandidateDigestsValid: sourceDigests.every((digest) => typeof digest === "string" && /^[a-f0-9]{64}$/.test(digest)),
    sourceOrderPreserved:
      sources.map((source) => source.version).join(">") === "Node v2078>Node v2079>Node v2080>Node v2081",
    allSourceChecksPassed: sources.every((source) => source.checkCount === source.passedCheckCount),
    noSourceProductionBlockers: sources.every((source) => source.productionBlockerCount === 0),
    sourceProductionStillDenied: [v2078, v2079, v2080, v2081].every((profile) =>
      profile.readyForProductionShardExecution === false && profile.safety.executionAllowed === false),
    archiveVerificationDoesNotGenerateFreshRuntimeEvidence: true,
    ...closedBoundaryChecks(),
  };

  return createProductionShardExecutionProfile({
    title: "Production shard execution candidate archive verification",
    profileVersion: "production-shard-execution-candidate-archive-verification.v1",
    stageId: "candidate-archive-verification",
    activeNodeVersion: "Node v2082",
    sourceNodeVersion: "Node v2081",
    readyState: "candidate-archive-verification-ready",
    readyDecision: "verify-candidate-archive",
    sources,
    controls,
    stagePayload: {
      archiveVerification: {
        verificationMode: "in-memory-candidate-profile-digest-verification",
        sourceDigestCount: sourceDigests.length,
        sourceDigests,
        archiveSpan: "Node v2078 through Node v2081",
        productionAuthority: false,
      },
      growthStopCondition:
        "Stop archive verification after v2082 unless a later stage adds a real external artifact or signed approval.",
    },
    checks,
    evidenceEndpoints: routeEndpoints(
      ROUTE,
      "docs/plans3/v2082-production-shard-execution-candidate-archive-verification-roadmap.md",
      "docs/plans3/v2083-production-shard-execution-closeout-roadmap.md",
    ),
    nextActions: [
      "Use v2082 as the source archive verification for the six-version v2083 closeout.",
      "Do not rerun Java or mini-kv smoke from archive verification.",
      "Only add filesystem archive checks after JSON/Markdown artifacts are intentionally generated.",
    ],
    warnings: [
      {
        code: "ARCHIVE_VERIFICATION_IS_PROFILE_BASED",
        severity: "warning",
        source: "node-v2082",
        message: "v2082 verifies the in-memory candidate profiles; filesystem evidence is generated during closeout.",
      },
    ],
    recommendations: [
      {
        code: "CLOSE_BATCH_NEXT",
        severity: "recommendation",
        source: "node-v2082",
        message: "Close the six-version readiness batch with a compact v2083 summary and next-batch direction.",
      },
    ],
  });
}

export {
  renderProductionShardExecutionReadinessMarkdown as renderProductionShardExecutionCandidateArchiveVerificationMarkdown,
};
