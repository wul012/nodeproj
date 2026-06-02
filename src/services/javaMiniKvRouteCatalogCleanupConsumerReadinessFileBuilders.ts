import {
  JAVA_V220_CONSUMER_EVIDENCE_DIGEST,
  JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE,
  JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE,
  JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY,
  JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY,
  JAVA_V224_CONSUMER_READINESS_COMPLETION,
  MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.js";
import {
  MINI_KV_POST_CLOSEOUT_RELEASES,
  type MiniKvPostCloseoutReleaseVersion,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.js";
import {
  evidenceFile,
  snippet,
  type HistoricalEvidenceFile,
} from "./historicalEvidenceReportUtils.js";
import type {
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.js";

export function createConsumerReadinessEvidenceFiles():
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["files"] {
  const miniKvFiles = Object.fromEntries(MINI_KV_POST_CLOSEOUT_RELEASES.map((version) => [
    `miniKvv${version}PostCloseoutContinuity`,
    evidenceFile(
      `mini-kv-v${version}-post-closeout-continuity`,
      `D:/C/mini-kv/fixtures/release/shard-readiness-v${version}.json`,
    ),
  ])) as Record<`miniKv${MiniKvPostCloseoutReleaseVersion}PostCloseoutContinuity`, HistoricalEvidenceFile>;

  return {
    javaV220ConsumerEvidenceDigest:
      evidenceFile("java-v220-consumer-evidence-digest", JAVA_V220_CONSUMER_EVIDENCE_DIGEST),
    javaV220ConsumerEvidenceDigestFixture:
      evidenceFile("java-v220-consumer-evidence-digest-fixture", JAVA_V220_CONSUMER_EVIDENCE_DIGEST_FIXTURE),
    javaV221ConsumerEvidenceDigestSnapshotFreeze:
      evidenceFile(
        "java-v221-consumer-evidence-digest-snapshot-freeze",
        JAVA_V221_CONSUMER_EVIDENCE_DIGEST_SNAPSHOT_FREEZE,
      ),
    javaV222ConsumerEvidenceDigestHistoricalCompatibility:
      evidenceFile(
        "java-v222-consumer-evidence-digest-historical-compatibility",
        JAVA_V222_CONSUMER_EVIDENCE_DIGEST_HISTORICAL_COMPATIBILITY,
      ),
    javaV223ConsumerEvidenceDigestIntegrity:
      evidenceFile("java-v223-consumer-evidence-digest-integrity", JAVA_V223_CONSUMER_EVIDENCE_DIGEST_INTEGRITY),
    javaV224ConsumerReadinessCompletion:
      evidenceFile("java-v224-consumer-readiness-completion", JAVA_V224_CONSUMER_READINESS_COMPLETION),
    miniKvV210RouteCatalogCleanupPostCloseoutAuditNote:
      evidenceFile(
        "mini-kv-v210-route-catalog-cleanup-post-closeout-audit-note",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
      ),
    ...miniKvFiles,
  };
}

export function createMiniKvLatestAuditNoteSnippets():
  JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence["snippets"] {
  return {
    miniKvV210RollingFixture:
      snippet(
        "mini-kv-v210-rolling-fixture",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "rolling fixture is v210",
      ),
    miniKvV210FallbackV209:
      snippet(
        "mini-kv-v210-fallback-v209",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "fallback `v209`",
      ),
    miniKvV210AllTestsPassed:
      snippet(
        "mini-kv-v210-all-tests-passed",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "all 71 tests passed",
      ),
    miniKvV210TcpSmoke:
      snippet(
        "mini-kv-v210-tcp-smoke",
        MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
        "TCP smoke returned v210",
      ),
  };
}
