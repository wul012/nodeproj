import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ProductionShardExecutionControl,
  ProductionShardExecutionDecision,
  ProductionShardExecutionMessage,
  ProductionShardExecutionNodeVersion,
  ProductionShardExecutionProfileVersion,
  ProductionShardExecutionReadinessProfile,
  ProductionShardExecutionReadinessState,
  ProductionShardExecutionSafetyBoundary,
  ProductionShardExecutionSourceReference,
  ProductionShardExecutionStageId,
} from "./productionShardExecutionReadinessTypes.js";

const CLOSED_SAFETY_BOUNDARY: ProductionShardExecutionSafetyBoundary = {
  readOnly: true,
  executionAllowed: false,
  readyForProductionWindow: false,
  readyForProductionOperations: false,
  startsJavaService: false,
  startsMiniKvService: false,
  stopsJavaService: false,
  stopsMiniKvService: false,
  mutatesJavaState: false,
  mutatesMiniKvState: false,
  connectsManagedAudit: false,
  credentialValueRead: false,
  rawEndpointUrlParsed: false,
  activeShardPrototypeEnabled: false,
};

export function createProductionShardExecutionProfile(input: {
  title: string;
  profileVersion: ProductionShardExecutionProfileVersion;
  stageId: ProductionShardExecutionStageId;
  activeNodeVersion: ProductionShardExecutionNodeVersion;
  sourceNodeVersion: ProductionShardExecutionNodeVersion;
  readyState: Exclude<ProductionShardExecutionReadinessState, "blocked">;
  readyDecision: Exclude<ProductionShardExecutionDecision, "blocked">;
  sources: ProductionShardExecutionSourceReference[];
  controls: ProductionShardExecutionControl[];
  stagePayload: Record<string, unknown>;
  checks: Record<string, boolean>;
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
  warnings?: ProductionShardExecutionMessage[];
  recommendations?: ProductionShardExecutionMessage[];
}): ProductionShardExecutionReadinessProfile {
  const readyForNextStage = Object.values(input.checks).every(Boolean)
    && input.sources.every((source) => source.ready)
    && input.controls.every((control) => !control.blocksNextStage || control.status === "satisfied");
  const state: ProductionShardExecutionReadinessState = readyForNextStage ? input.readyState : "blocked";
  const decision: ProductionShardExecutionDecision = readyForNextStage ? input.readyDecision : "blocked";
  const readinessDigest = sha256StableJson({
    stageId: input.stageId,
    activeNodeVersion: input.activeNodeVersion,
    sourceNodeVersion: input.sourceNodeVersion,
    state,
    decision,
    sources: input.sources.map((source) => ({
      id: source.id,
      version: source.version,
      ready: source.ready,
      digest: source.digest,
    })),
    checks: input.checks,
    controls: input.controls.map((control) => ({
      id: control.id,
      status: control.status,
      blocksNextStage: control.blocksNextStage,
      blocksProductionExecution: control.blocksProductionExecution,
    })),
    stagePayload: input.stagePayload,
  });
  const stage = {
    stageId: input.stageId,
    activeNodeVersion: input.activeNodeVersion,
    sourceNodeVersion: input.sourceNodeVersion,
    state,
    decision,
    readinessDigest,
    readyForNextStage,
  };
  const productionBlockers = createProductionBlockers(input.controls);
  const warnings = input.warnings ?? [];
  const recommendations = input.recommendations ?? [];

  return {
    service: "orderops-node",
    title: input.title,
    generatedAt: new Date().toISOString(),
    profileVersion: input.profileVersion,
    stage,
    sourceVersions: uniqueNodeVersions([input.sourceNodeVersion, ...input.sources.map((source) => source.version)]),
    javaSourceVersion: "Java v167",
    miniKvSourceVersion: "mini-kv v158",
    readyForNextStage,
    readyForProductionShardExecution: false,
    candidateOnly: true,
    javaMiniKvRecommendedParallel: true,
    nodeIsUpstreamPreApprovalBlocker: false,
    safety: CLOSED_SAFETY_BOUNDARY,
    sources: input.sources,
    controls: input.controls,
    stagePayload: input.stagePayload,
    checks: input.checks,
    summary: {
      checkCount: countReportChecks(input.checks),
      passedCheckCount: countPassedReportChecks(input.checks),
      sourceCount: input.sources.length,
      readySourceCount: input.sources.filter((source) => source.ready).length,
      controlCount: input.controls.length,
      nextStageBlockingControlCount: input.controls.filter((control) =>
        control.blocksNextStage && control.status !== "satisfied").length,
      productionBlockingControlCount: input.controls.filter((control) =>
        control.blocksProductionExecution && control.status !== "satisfied").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: input.evidenceEndpoints,
    nextActions: input.nextActions,
  };
}

export function sourceReference(input: ProductionShardExecutionSourceReference): ProductionShardExecutionSourceReference {
  return input;
}

export function satisfiedControl(input: Omit<ProductionShardExecutionControl, "status">): ProductionShardExecutionControl {
  return { ...input, status: "satisfied" };
}

export function pendingProductionControl(
  input: Omit<ProductionShardExecutionControl, "status" | "blocksNextStage" | "blocksProductionExecution">,
): ProductionShardExecutionControl {
  return {
    ...input,
    status: "pending",
    blocksNextStage: false,
    blocksProductionExecution: true,
  };
}

export function profileSource(
  id: string,
  profile: ProductionShardExecutionReadinessProfile,
  evidenceRole: string,
): ProductionShardExecutionSourceReference {
  return {
    id,
    version: profile.stage.activeNodeVersion,
    evidenceRole,
    routeOrArtifact: profile.evidenceEndpoints.json,
    ready: profile.readyForNextStage,
    digest: profile.stage.readinessDigest,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: 0,
  };
}

export function routeEndpoints(route: string, activePlan: string, nextPlan: string): Record<string, string> {
  return {
    json: route,
    markdown: `${route}?format=markdown`,
    activePlan,
    nextPlan,
  };
}

export function closedBoundaryChecks(): Record<string, boolean> {
  return {
    readOnlyBoundaryPreserved: CLOSED_SAFETY_BOUNDARY.readOnly,
    executionStillDenied: !CLOSED_SAFETY_BOUNDARY.executionAllowed,
    productionOperationsStillDenied: !CLOSED_SAFETY_BOUNDARY.readyForProductionOperations,
    noJavaLifecycleOwnedByNode: !CLOSED_SAFETY_BOUNDARY.startsJavaService && !CLOSED_SAFETY_BOUNDARY.stopsJavaService,
    noMiniKvLifecycleOwnedByNode:
      !CLOSED_SAFETY_BOUNDARY.startsMiniKvService && !CLOSED_SAFETY_BOUNDARY.stopsMiniKvService,
    noUpstreamMutation: !CLOSED_SAFETY_BOUNDARY.mutatesJavaState && !CLOSED_SAFETY_BOUNDARY.mutatesMiniKvState,
    noManagedAuditCredentialOrRawEndpoint:
      !CLOSED_SAFETY_BOUNDARY.connectsManagedAudit
      && !CLOSED_SAFETY_BOUNDARY.credentialValueRead
      && !CLOSED_SAFETY_BOUNDARY.rawEndpointUrlParsed,
    activeShardPrototypeStillDisabled: !CLOSED_SAFETY_BOUNDARY.activeShardPrototypeEnabled,
  };
}

export function productionApprovalControls(): ProductionShardExecutionControl[] {
  return [
    pendingProductionControl({
      id: "signed-production-execution-approval",
      title: "Signed production execution approval",
      owner: "operator",
      evidence: "No signed production execution approval artifact is present in this candidate batch.",
      nextAction: "Capture a signed approval artifact before any production execution window can open.",
    }),
    pendingProductionControl({
      id: "managed-audit-production-store",
      title: "Managed audit production store binding",
      owner: "node",
      evidence: "The candidate remains archive-backed and does not connect to managed audit production storage.",
      nextAction: "Bind immutable production execution records to a managed audit store before real execution.",
    }),
    pendingProductionControl({
      id: "rollback-owner-confirmation",
      title: "Rollback and abort owner confirmation",
      owner: "cross-project",
      evidence: "Abort and rollback semantics are documented as a candidate matrix, not signed by all service owners.",
      nextAction: "Have Node, Java, and mini-kv owners sign the abort and rollback responsibilities.",
    }),
  ];
}

function createProductionBlockers(controls: ProductionShardExecutionControl[]): ProductionShardExecutionMessage[] {
  return controls
    .filter((control) => control.blocksProductionExecution && control.status !== "satisfied")
    .map((control) => ({
      code: `PRODUCTION_BLOCKED_${control.id.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`,
      severity: "blocker" as const,
      source: control.owner,
      message: `${control.title} is still pending. ${control.nextAction}`,
    }));
}

function uniqueNodeVersions(
  versions: Array<ProductionShardExecutionSourceReference["version"] | ProductionShardExecutionNodeVersion>,
): ProductionShardExecutionNodeVersion[] {
  const result: ProductionShardExecutionNodeVersion[] = [];
  for (const version of versions) {
    if (isNodeVersion(version) && !result.includes(version)) {
      result.push(version);
    }
  }
  return result;
}

function isNodeVersion(value: string): value is ProductionShardExecutionNodeVersion {
  return /^Node v(409|2078|2079|2080|2081|2082|2083)$/.test(value);
}
