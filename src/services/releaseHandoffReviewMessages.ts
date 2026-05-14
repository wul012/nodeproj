import { collectBlockingMessages } from "./releaseReportShared.js";

export type ReleaseHandoffReviewState = "ready-for-manual-release-handoff-review" | "blocked";

export interface ReleaseHandoffReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "release-handoff-readiness-review"
    | "production-release-dry-run-envelope"
    | "java-v62-release-handoff-checklist-fixture"
    | "mini-kv-v71-restore-handoff-checklist"
    | "runtime-config";
  message: string;
}

export function collectReleaseHandoffReviewBlockers(
  checks: Record<string, boolean>,
): ReleaseHandoffReviewMessage[] {
  return collectBlockingMessages<ReleaseHandoffReviewMessage>([
    { condition: checks.sourceEnvelopeReady, code: "SOURCE_ENVELOPE_NOT_READY", source: "production-release-dry-run-envelope", message: "Node v174 dry-run envelope must be ready before v175 handoff review." },
    { condition: checks.sourceEnvelopeDigestValid, code: "SOURCE_ENVELOPE_DIGEST_INVALID", source: "production-release-dry-run-envelope", message: "Node v174 dry-run envelope digest must be valid." },
    { condition: checks.sourceEnvelopeStillBlocksProduction, code: "SOURCE_ENVELOPE_UNLOCKS_PRODUCTION", source: "production-release-dry-run-envelope", message: "Node v174 envelope must still block production operations." },
    { condition: checks.sourceEnvelopeReferencesV173, code: "SOURCE_ENVELOPE_REFERENCE_INVALID", source: "production-release-dry-run-envelope", message: "Node v174 envelope must reference the v173 release window packet." },
    { condition: checks.javaV62FixtureReady, code: "JAVA_V62_FIXTURE_NOT_READY", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 release handoff checklist fixture must be present." },
    { condition: checks.javaChecklistPlaceholdersPresent, code: "JAVA_CHECKLIST_PLACEHOLDERS_MISSING", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 handoff placeholders must remain explicit." },
    { condition: checks.javaRequiredFieldsComplete, code: "JAVA_REQUIRED_FIELDS_INCOMPLETE", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 handoff checklist must include required release, rollback, artifact, migration, and secret-source fields." },
    { condition: checks.javaChecklistArtifactsComplete, code: "JAVA_CHECKLIST_ARTIFACTS_INCOMPLETE", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 handoff checklist must reference required contract artifacts." },
    { condition: checks.javaMigrationDirectionClosed, code: "JAVA_MIGRATION_DIRECTION_OPEN", source: "java-v62-release-handoff-checklist-fixture", message: "Java migration direction must not allow SQL execution or production database access." },
    { condition: checks.javaSecretBoundaryClosed, code: "JAVA_SECRET_BOUNDARY_OPEN", source: "java-v62-release-handoff-checklist-fixture", message: "Java handoff checklist must not record secret values." },
    { condition: checks.javaNodeConsumptionReadOnly, code: "JAVA_NODE_CONSUMPTION_OPEN", source: "java-v62-release-handoff-checklist-fixture", message: "Node may render Java handoff evidence but must not trigger deployment, rollback, SQL, or secret reads." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 handoff production boundaries must remain closed." },
    { condition: checks.javaForbiddenOperationsComplete, code: "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 fixture must list key forbidden operations." },
    { condition: checks.javaArchiveRootUsesC, code: "JAVA_ARCHIVE_NOT_IN_C", source: "java-v62-release-handoff-checklist-fixture", message: "Java v62 archive path must use c/62." },
    { condition: checks.miniKvV71ChecklistReady, code: "MINI_KV_V71_CHECKLIST_NOT_READY", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 restore handoff checklist must be present." },
    { condition: checks.miniKvTargetReleaseReady, code: "MINI_KV_TARGET_RELEASE_INVALID", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv restore handoff target must be v71." },
    { condition: checks.miniKvPreviousEvidenceComplete, code: "MINI_KV_PREVIOUS_EVIDENCE_INCOMPLETE", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 checklist must reference prior release evidence." },
    { condition: checks.miniKvDigestPlaceholdersPresent, code: "MINI_KV_DIGEST_PLACEHOLDERS_MISSING", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 digest, Snapshot, and WAL review placeholders must remain explicit." },
    { condition: checks.miniKvChecklistFieldsComplete, code: "MINI_KV_CHECKLIST_FIELDS_INCOMPLETE", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 checklist fields must cover restore operator, risk confirmation, and Node review readiness." },
    { condition: checks.miniKvRequiredConfirmationsComplete, code: "MINI_KV_REQUIRED_CONFIRMATIONS_INCOMPLETE", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 checklist must require no restore execution." },
    { condition: checks.miniKvCheckJsonRiskCommandsReady, code: "MINI_KV_CHECKJSON_RISK_COMMANDS_INCOMPLETE", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 checklist must include CHECKJSON LOAD, COMPACT, and SETNXEX risk confirmation." },
    { condition: checks.miniKvNoWriteOrAdminExecuted, code: "MINI_KV_WRITE_OR_ADMIN_EXECUTED", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 checklist must not execute writes, admin commands, or restore." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 boundaries must remain closed and outside Java order authority." },
    { condition: checks.miniKvArchiveRootUsesC, code: "MINI_KV_ARCHIVE_NOT_IN_C", source: "mini-kv-v71-restore-handoff-checklist", message: "mini-kv v71 archive path must use c/71." },
    { condition: checks.handoffReviewStepsReadOnly, code: "HANDOFF_REVIEW_STEPS_MUTATE_STATE", source: "release-handoff-readiness-review", message: "Handoff review steps must remain read-only dry-run steps." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "release-handoff-readiness-review", message: "Review must list key forbidden operations." },
    { condition: checks.pauseConditionsComplete, code: "PAUSE_CONDITIONS_INCOMPLETE", source: "release-handoff-readiness-review", message: "Pause conditions must cover unsafe release handoff actions." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "release-handoff-readiness-review", message: "Node v175 must not start Java or mini-kv." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_NOT_ALLOWED", source: "runtime-config", message: "Node v175 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_NOT_ALLOWED", source: "runtime-config", message: "Node v175 must not connect production databases." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "release-handoff-readiness-review", message: "Review must not authorize production release." },
    { condition: checks.readyForProductionDeploymentStillFalse, code: "PRODUCTION_DEPLOYMENT_UNLOCKED", source: "release-handoff-readiness-review", message: "Review must not authorize production deployment." },
    { condition: checks.readyForProductionRollbackStillFalse, code: "PRODUCTION_ROLLBACK_UNLOCKED", source: "release-handoff-readiness-review", message: "Review must not authorize production rollback." },
    { condition: checks.readyForProductionOperationsStillFalse, code: "PRODUCTION_OPERATIONS_UNLOCKED", source: "release-handoff-readiness-review", message: "Review must not authorize production operations." },
    { condition: checks.reviewDigestValid, code: "REVIEW_DIGEST_INVALID", source: "release-handoff-readiness-review", message: "Review digest must be a valid SHA-256 hex digest." },
  ]);
}

export function collectReleaseHandoffReviewWarnings(
  reviewState: ReleaseHandoffReviewState,
): ReleaseHandoffReviewMessage[] {
  return [
    {
      code: reviewState === "blocked"
        ? "RELEASE_HANDOFF_REVIEW_BLOCKED"
        : "RELEASE_HANDOFF_REVIEW_NOT_APPROVAL",
      severity: "warning",
      source: "release-handoff-readiness-review",
      message: reviewState === "blocked"
        ? "Release handoff readiness review has blockers."
        : "Release handoff readiness review is manual evidence only, not production release approval.",
    },
    {
      code: "PLACEHOLDERS_REQUIRE_OPERATOR_REPLACEMENT",
      severity: "warning",
      source: "java-v62-release-handoff-checklist-fixture",
      message: "Java release operator, rollback approver, artifact target, and secret-source placeholders must be replaced outside Node.",
    },
    {
      code: "RESTORE_HANDOFF_PLACEHOLDERS_REQUIRE_REVIEW",
      severity: "warning",
      source: "mini-kv-v71-restore-handoff-checklist",
      message: "mini-kv artifact digest, Snapshot, and WAL placeholders must be verified outside Node before any restore window.",
    },
  ];
}

export function collectReleaseHandoffReviewRecommendations(
  reviewState: ReleaseHandoffReviewState,
): ReleaseHandoffReviewMessage[] {
  return [
    {
      code: reviewState === "blocked"
        ? "FIX_RELEASE_HANDOFF_REVIEW_BLOCKERS"
        : "PROCEED_TO_NODE_V176_CI_EVIDENCE_HARDENING",
      severity: "recommendation",
      source: "release-handoff-readiness-review",
      message: reviewState === "blocked"
        ? "Fix handoff review blockers before CI evidence hardening."
        : "Proceed to Node v176 CI evidence hardening after archiving this review; do not start or mutate upstream projects.",
    },
  ];
}
