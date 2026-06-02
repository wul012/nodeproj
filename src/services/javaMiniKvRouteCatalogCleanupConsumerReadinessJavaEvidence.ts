import {
  JAVA_V220_CONSUMER_EVIDENCE_DIGEST,
  JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE,
  JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE,
  JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY,
  JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY,
  JAVA_V224_CONSUMER_READINESS_COMPLETION,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.js";
import {
  booleanField,
  numberField,
  objectField,
  readJsonObject,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import type {
  JavaConsumerEvidenceDigest,
  JavaConsumerEvidenceDigestFixture,
  JavaConsumerReadinessGuard,
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.js";

export type JavaConsumerReadinessEvidenceParts = Pick<
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
  | "javaV220ConsumerEvidenceDigest"
  | "javaV220ConsumerEvidenceDigestFixture"
  | "javaV221ConsumerEvidenceDigestSnapshotFreeze"
  | "javaV222ConsumerEvidenceDigestHistoricalCompatibility"
  | "javaV223ConsumerEvidenceDigestIntegrity"
  | "javaV224ConsumerReadinessCompletion"
>;

export function loadJavaConsumerReadinessEvidenceParts(): JavaConsumerReadinessEvidenceParts {
  return {
    javaV220ConsumerEvidenceDigest:
      createJavaConsumerEvidenceDigest(readJsonObject(JAVA_V220_CONSUMER_EVIDENCE_DIGEST)),
    javaV220ConsumerEvidenceDigestFixture:
      createJavaConsumerEvidenceDigestFixture(readJsonObject(JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE)),
    javaV221ConsumerEvidenceDigestSnapshotFreeze:
      createJavaConsumerReadinessGuard(readJsonObject(JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE)),
    javaV222ConsumerEvidenceDigestHistoricalCompatibility:
      createJavaConsumerReadinessGuard(readJsonObject(JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY)),
    javaV223ConsumerEvidenceDigestIntegrity:
      createJavaConsumerReadinessGuard(readJsonObject(JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY)),
    javaV224ConsumerReadinessCompletion:
      createJavaConsumerReadinessGuard(readJsonObject(JAVA_V224_CONSUMER_READINESS_COMPLETION)),
  };
}

function createJavaConsumerEvidenceDigest(source: Record<string, unknown>): JavaConsumerEvidenceDigest {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    endpoint: stringField(source, "endpoint"),
    fixtureEndpoint: stringField(source, "fixtureEndpoint"),
    verificationChecklistEndpoint: stringField(source, "verificationChecklistEndpoint"),
    digestEvidenceCount: stringArrayField(source, "digestEvidence").length,
    digestCheckCount: stringArrayField(source, "digestChecks").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: javaBoundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function createJavaConsumerEvidenceDigestFixture(
  source: Record<string, unknown>,
): JavaConsumerEvidenceDigestFixture {
  return {
    project: stringField(source, "project"),
    version: stringField(source, "version"),
    contractName: stringField(source, "contractName"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    shardEnabled: booleanField(source, "shardEnabled"),
    evidenceDigestEndpoint: stringField(source, "evidenceDigestEndpoint"),
    evidenceDigestFixtureEndpoint: stringField(source, "evidenceDigestFixtureEndpoint"),
    verificationChecklistEndpoint: stringField(source, "verificationChecklistEndpoint"),
    verificationChecklistFixtureEndpoint: stringField(source, "verificationChecklistFixtureEndpoint"),
    checklistItemCount: numberField(source, "checklistItemCount"),
    requiredEvidenceCount: numberField(source, "requiredEvidenceCount"),
    verificationCheckCount: numberField(source, "verificationCheckCount"),
    digestEvidenceCount: stringArrayField(source, "digestEvidence").length,
    digestCheckCount: stringArrayField(source, "digestChecks").length,
    blockedOperationCount: stringArrayField(source, "blockedOperations").length,
    probesAreGetOnly: booleanField(source, "probesAreGetOnly"),
    upstreamActionsAllowed: booleanField(source, "upstreamActionsAllowed"),
    startsJavaService: booleanField(source, "startsJavaService"),
    startsMiniKvService: booleanField(source, "startsMiniKvService"),
    nodeMayStartOrStopJavaOrMiniKv: booleanField(source, "nodeMayStartOrStopJavaOrMiniKv"),
    status: stringField(source, "status"),
  };
}

function createJavaConsumerReadinessGuard(source: Record<string, unknown>): JavaConsumerReadinessGuard {
  return {
    version: stringField(source, "version"),
    status: stringField(source, "status"),
    scope: stringField(source, "scope"),
    readOnly: booleanField(source, "readOnly"),
    executionAllowed: booleanField(source, "executionAllowed"),
    receiptId: stringField(source, "receiptId"),
    guardCount: stringArrayField(source, "guards").length,
    validationCount: stringArrayField(source, "validation").length,
    boundaryRuntimeClosed: javaBoundaryRuntimeClosed(objectField(source, "boundary")),
  };
}

function javaBoundaryRuntimeClosed(boundary: Record<string, unknown>): boolean {
  return booleanField(boundary, "writeRoutingAllowed") === false
    && booleanField(boundary, "activeShardRouterAllowed") === false
    && booleanField(boundary, "credentialValueRead") === false
    && booleanField(boundary, "rawEndpointParsed") === false
    && booleanField(boundary, "managedAuditConnectionAllowed") === false
    && booleanField(boundary, "deploymentOrRollbackAllowed") === false
    && booleanField(boundary, "nodeMayStartOrStopJavaOrMiniKv") === false;
}
