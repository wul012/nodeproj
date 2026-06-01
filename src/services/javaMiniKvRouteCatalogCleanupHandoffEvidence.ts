import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
  type HistoricalEvidenceFile,
  type HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export const JAVA_V202_CONSUMER_PROBE_PLAN =
  "D:/javaproj/advanced-order-platform/src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-probe-plan-v202.fixture.json";
export const JAVA_V206_ENDPOINT_PAIR_INTEGRITY =
  "D:/javaproj/advanced-order-platform/e/206/evidence/java-shard-readiness-v1-contract-endpoint-pair-integrity-v206.json";
export const MINI_KV_V191_ROUTE_CATALOG_HANDOFF =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v191.json";
export const MINI_KV_V192_ROUTE_CATALOG_HANDOFF_AUDIT_NOTE =
  "D:/C/mini-kv/e/192/解释/说明.md";

export interface JavaRouteCatalogConsumerProbePlanEvidence {
  project: string | null;
  version: string | null;
  contractName: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  readTargetCount: number;
  fixtureTargetCount: number;
  probeSequenceCount: number;
  requiredEvidenceCount: number;
  stopConditionCount: number;
  probesAreGetOnly: boolean | null;
  upstreamActionsAllowed: boolean | null;
  nodeMayStartOrStopJavaOrMiniKv: boolean | null;
  status: string | null;
}

export interface JavaRouteCatalogEndpointPairIntegrityEvidence {
  project: string | null;
  version: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  v1ContractEndpointPairCount: number | null;
  liveEndpointsDistinct: boolean | null;
  fixtureEndpointsDistinct: boolean | null;
  excludesReadOnlyCatalogEndpoints: boolean | null;
  excludesRuntimeExecutionEndpoints: boolean | null;
  currentRollingRegistryLiveEndpointCount: number | null;
  currentRollingRegistryFixtureEndpointCount: number | null;
  newRouteAdded: boolean | null;
  productionCodeChanged: boolean | null;
  status: string | null;
}

export interface MiniKvRouteCatalogCleanupHandoffEvidence {
  project: string | null;
  releaseVersion: string | null;
  status: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  nodeConsumer: string | null;
  archivedNodeVersionCount: number;
  changesArchivedNodeEvidence: boolean | null;
  previousConsumedReleaseVersion: string | null;
  previousConsumptionNodeVersion: string | null;
  rollingCurrentUsedForHistoricalBaseline: boolean | null;
  evidenceDigest: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupHandoffEvidence {
  files: {
    javaV202ConsumerProbePlan: HistoricalEvidenceFile;
    javaV206EndpointPairIntegrity: HistoricalEvidenceFile;
    miniKvV191RouteCatalogHandoff: HistoricalEvidenceFile;
    miniKvV192RouteCatalogHandoffAuditNote: HistoricalEvidenceFile;
  };
  snippets: {
    miniKvV192Release: HistoricalSnippetMatch;
    miniKvV192Digest: HistoricalSnippetMatch;
    miniKvV192NoRuntimeAuthority: HistoricalSnippetMatch;
  };
  javaV202ConsumerProbePlan: JavaRouteCatalogConsumerProbePlanEvidence;
  javaV206EndpointPairIntegrity: JavaRouteCatalogEndpointPairIntegrityEvidence;
  miniKvV191RouteCatalogHandoff: MiniKvRouteCatalogCleanupHandoffEvidence;
  checks: {
    javaV202FilePresent: boolean;
    javaV202ConsumerProbePlanReady: boolean;
    javaV202ProbePlanReadOnly: boolean;
    javaV202ProbePlanGetOnly: boolean;
    javaV202BlocksRuntimeAuthority: boolean;
    javaV206FilePresent: boolean;
    javaV206EndpointPairIntegrityReady: boolean;
    javaV206EndpointPairCountStable: boolean;
    javaV206NoRouteOrProductionChange: boolean;
    miniKvV191FilePresent: boolean;
    miniKvV191HandoffReady: boolean;
    miniKvV191PreservesNodeV472Window: boolean;
    miniKvV191HistoricalBaselineFrozen: boolean;
    miniKvV192AuditNotePresent: boolean;
    miniKvV192AuditNoteMatchesHandoff: boolean;
    noRuntimeAuthorityOpened: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    javaReadTargetCount: number;
    javaFixtureTargetCount: number;
    javaEndpointPairCount: number | null;
    miniKvArchivedNodeVersionCount: number;
  };
}

export function loadJavaMiniKvRouteCatalogCleanupHandoffEvidence():
  JavaMiniKvRouteCatalogCleanupHandoffEvidence {
  const files = {
    javaV202ConsumerProbePlan: evidenceFile("java-v202-consumer-probe-plan", JAVA_V202_CONSUMER_PROBE_PLAN),
    javaV206EndpointPairIntegrity: evidenceFile("java-v206-endpoint-pair-integrity", JAVA_V206_ENDPOINT_PAIR_INTEGRITY),
    miniKvV191RouteCatalogHandoff: evidenceFile("mini-kv-v191-route-catalog-handoff", MINI_KV_V191_ROUTE_CATALOG_HANDOFF),
    miniKvV192RouteCatalogHandoffAuditNote:
      evidenceFile("mini-kv-v192-route-catalog-handoff-audit-note", MINI_KV_V192_ROUTE_CATALOG_HANDOFF_AUDIT_NOTE),
  };
  const snippets = {
    miniKvV192Release: snippet("mini-kv-v192-release", MINI_KV_V192_ROUTE_CATALOG_HANDOFF_AUDIT_NOTE, "releaseVersion=v192"),
    miniKvV192Digest:
      snippet("mini-kv-v192-digest", MINI_KV_V192_ROUTE_CATALOG_HANDOFF_AUDIT_NOTE, "fnv1a64:89bf4177b09f1ec0"),
    miniKvV192NoRuntimeAuthority:
      snippet("mini-kv-v192-no-runtime", MINI_KV_V192_ROUTE_CATALOG_HANDOFF_AUDIT_NOTE, "`executionAllowed=False`"),
  };
  const javaV202ConsumerProbePlan = createJavaV202ConsumerProbePlan(readJsonObject(JAVA_V202_CONSUMER_PROBE_PLAN));
  const javaV206EndpointPairIntegrity =
    createJavaV206EndpointPairIntegrity(readJsonObject(JAVA_V206_ENDPOINT_PAIR_INTEGRITY));
  const miniKvV191RouteCatalogHandoff =
    createMiniKvV191RouteCatalogHandoff(readJsonObject(MINI_KV_V191_ROUTE_CATALOG_HANDOFF));
  const checks = createChecks({
    files,
    snippets,
    javaV202ConsumerProbePlan,
    javaV206EndpointPairIntegrity,
    miniKvV191RouteCatalogHandoff,
  });

  return {
    files,
    snippets,
    javaV202ConsumerProbePlan,
    javaV206EndpointPairIntegrity,
    miniKvV191RouteCatalogHandoff,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      javaReadTargetCount: javaV202ConsumerProbePlan.readTargetCount,
      javaFixtureTargetCount: javaV202ConsumerProbePlan.fixtureTargetCount,
      javaEndpointPairCount: javaV206EndpointPairIntegrity.v1ContractEndpointPairCount,
      miniKvArchivedNodeVersionCount: miniKvV191RouteCatalogHandoff.archivedNodeVersionCount,
    },
  };
}

function createJavaV202ConsumerProbePlan(
  source: Record<string, unknown>,
): JavaRouteCatalogConsumerProbePlanEvidence {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    readTargetCount: stringArrayField(source, "readTargets").length,
    fixtureTargetCount: stringArrayField(source, "fixtureTargets").length,
    probeSequenceCount: stringArrayField(source, "probeSequence").length,
    requiredEvidenceCount: stringArrayField(source, "requiredEvidence").length,
    stopConditionCount: stringArrayField(source, "stopConditions").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createJavaV206EndpointPairIntegrity(
  source: Record<string, unknown>,
): JavaRouteCatalogEndpointPairIntegrityEvidence {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    v1ContractEndpointPairCount: numberField(source, "v1ContractEndpointPairCount"),
    liveEndpointsDistinct: booleanField(source, "v1ContractLiveEndpointsDistinct"),
    fixtureEndpointsDistinct: booleanField(source, "v1ContractFixtureEndpointsDistinct"),
    excludesReadOnlyCatalogEndpoints: booleanField(source, "v1ContractGroupExcludesReadOnlyCatalogEndpoints"),
    excludesRuntimeExecutionEndpoints: booleanField(source, "v1ContractGroupExcludesRuntimeExecutionEndpoints"),
    currentRollingRegistryLiveEndpointCount: numberField(source, "currentRollingRegistryLiveEndpointCount"),
    currentRollingRegistryFixtureEndpointCount: numberField(source, "currentRollingRegistryFixtureEndpointCount"),
    newRouteAdded: booleanField(source, "newRouteAdded"),
    productionCodeChanged: booleanField(source, "productionCodeChanged"),
    status: stringField(source, "status"),
  };
}

function createMiniKvV191RouteCatalogHandoff(
  source: Record<string, unknown>,
): MiniKvRouteCatalogCleanupHandoffEvidence {
  const archiveCompatibility = objectField(source, "archiveCompatibility");
  const historicalFallback = objectField(source, "historicalFallback");
  const diagnostics = objectField(source, "diagnostics");

  return {
    project: stringField(source, "project"),
    releaseVersion: stringField(source, "releaseVersion"),
    status: stringField(source, "status"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    nodeConsumer: stringField(diagnostics, "nodeConsumer"),
    archivedNodeVersionCount: stringArrayField(archiveCompatibility, "archivedNodeVersions").length,
    changesArchivedNodeEvidence: booleanField(archiveCompatibility, "changesArchivedNodeEvidence"),
    previousConsumedReleaseVersion: stringField(historicalFallback, "previousConsumedReleaseVersion"),
    previousConsumptionNodeVersion: stringField(historicalFallback, "previousConsumptionNodeVersion"),
    rollingCurrentUsedForHistoricalBaseline: booleanField(historicalFallback, "rollingCurrentUsedForHistoricalBaseline"),
    evidenceDigest: stringField(source, "evidenceDigest"),
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupHandoffEvidence["files"];
  snippets: JavaMiniKvRouteCatalogCleanupHandoffEvidence["snippets"];
  javaV202ConsumerProbePlan: JavaRouteCatalogConsumerProbePlanEvidence;
  javaV206EndpointPairIntegrity: JavaRouteCatalogEndpointPairIntegrityEvidence;
  miniKvV191RouteCatalogHandoff: MiniKvRouteCatalogCleanupHandoffEvidence;
}): JavaMiniKvRouteCatalogCleanupHandoffEvidence["checks"] {
  const javaV202 = input.javaV202ConsumerProbePlan;
  const javaV206 = input.javaV206EndpointPairIntegrity;
  const miniKv = input.miniKvV191RouteCatalogHandoff;

  return {
    javaV202FilePresent: input.files.javaV202ConsumerProbePlan.exists,
    javaV202ConsumerProbePlanReady:
      javaV202.project === "advanced-order-platform"
      && javaV202.version === "Java v202"
      && javaV202.contractName === "shard-readiness.v1"
      && javaV202.status === "passed",
    javaV202ProbePlanReadOnly: javaV202.readOnly === true && javaV202.executionAllowed === false,
    javaV202ProbePlanGetOnly:
      javaV202.readTargetCount === 5
      && javaV202.fixtureTargetCount === 5
      && javaV202.probeSequenceCount === 6
      && javaV202.requiredEvidenceCount === 10
      && javaV202.stopConditionCount === 8
      && javaV202.probesAreGetOnly === true,
    javaV202BlocksRuntimeAuthority:
      javaV202.upstreamActionsAllowed === false && javaV202.nodeMayStartOrStopJavaOrMiniKv === false,
    javaV206FilePresent: input.files.javaV206EndpointPairIntegrity.exists,
    javaV206EndpointPairIntegrityReady:
      javaV206.project === "advanced-order-platform"
      && javaV206.version === "Java v206"
      && javaV206.status === "passed"
      && javaV206.readOnly === true
      && javaV206.executionAllowed === false,
    javaV206EndpointPairCountStable:
      javaV206.v1ContractEndpointPairCount === 6
      && javaV206.liveEndpointsDistinct === true
      && javaV206.fixtureEndpointsDistinct === true
      && javaV206.excludesReadOnlyCatalogEndpoints === true
      && javaV206.excludesRuntimeExecutionEndpoints === true,
    javaV206NoRouteOrProductionChange: javaV206.newRouteAdded === false && javaV206.productionCodeChanged === false,
    miniKvV191FilePresent: input.files.miniKvV191RouteCatalogHandoff.exists,
    miniKvV191HandoffReady:
      miniKv.project === "mini-kv"
      && miniKv.releaseVersion === "v191"
      && miniKv.status === "node-route-catalog-cleanup-closeout-handoff-read-only"
      && miniKv.readOnly === true
      && miniKv.executionAllowed === false
      && miniKv.shardEnabled === false,
    miniKvV191PreservesNodeV472Window:
      miniKv.archivedNodeVersionCount >= 80
      && miniKv.changesArchivedNodeEvidence === false
      && (miniKv.nodeConsumer?.includes("Node v472") ?? false),
    miniKvV191HistoricalBaselineFrozen:
      miniKv.previousConsumedReleaseVersion === "v190"
      && miniKv.previousConsumptionNodeVersion?.includes("Node v472") === true
      && miniKv.rollingCurrentUsedForHistoricalBaseline === false,
    miniKvV192AuditNotePresent: input.files.miniKvV192RouteCatalogHandoffAuditNote.exists,
    miniKvV192AuditNoteMatchesHandoff:
      snippetMatched(Object.values(input.snippets), "mini-kv-v192-release")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v192-digest")
      && snippetMatched(Object.values(input.snippets), "mini-kv-v192-no-runtime"),
    noRuntimeAuthorityOpened:
      javaV202.executionAllowed === false
      && javaV206.executionAllowed === false
      && miniKv.executionAllowed === false
      && miniKv.shardEnabled === false,
  };
}
