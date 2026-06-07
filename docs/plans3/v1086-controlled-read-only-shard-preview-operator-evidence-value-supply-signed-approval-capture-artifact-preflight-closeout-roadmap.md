# Node v1062-v1086 controlled read-only shard preview operator evidence value supply signed approval capture artifact preflight closeout roadmap

## Scope

Node v1062-v1086 adds the signed approval capture artifact preflight layer after the v1061 signed approval capture preflight.

This batch does not capture a signed approval, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java or mini-kv, or mutate sibling state. It only proves that a future signed approval artifact draft can be preflighted through read-only fragments, seals, gates, Markdown rendering, profile routing, tests, and catalog ownership.

## Necessity Proof

- Blocker resolved: v1061 proved capture inputs and attestations, but there was still no artifact-level fragment map, no artifact seal map, and no explicit no-materialization/no-grant/no-runtime-payload gate summary.
- Later consumer: the next Node batch can consume this artifact preflight before introducing any signed approval artifact draft or manual capture surface.
- Existing report cannot be reused: the capture preflight report records required inputs; it does not define artifact fragments, seal rejection codes, materialization blockers, or the artifact digest boundary.
- Growth stop condition: stop this chain at signed approval artifact draft readiness unless a later plan explicitly introduces a real manual artifact draft with separate user approval and still no automatic value import.

## Cross-Project Plan

Java and mini-kv remain recommended parallel. Node v1062-v1086 consumes the already frozen capture preflight evidence and does not require fresh Java or mini-kv files. Node is not a pre-approval blocker for their current work.

If a later version requires fresh Java or mini-kv evidence, that plan must list the exact upstream versions and the files Node will consume. This batch does not start sibling services and does not need live integration.

## Version Breakdown
- Node v1062: artifact preflight request id through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REQUEST_ID` and `ARTIFACT_PREFLIGHT_REQUEST_ID_SEAL`.
- Node v1063: source capture preflight digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_CAPTURE_PREFLIGHT_DIGEST` and `ARTIFACT_PREFLIGHT_CAPTURE_PREFLIGHT_DIGEST_SEAL`.
- Node v1064: signed approval template digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_TEMPLATE_DIGEST` and `ARTIFACT_PREFLIGHT_TEMPLATE_DIGEST_SEAL`.
- Node v1065: approval packet review digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REVIEW_DIGEST` and `ARTIFACT_PREFLIGHT_REVIEW_DIGEST_SEAL`.
- Node v1066: operator identity artifact fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_OPERATOR_IDENTITY` and `ARTIFACT_PREFLIGHT_OPERATOR_IDENTITY_SEAL`.
- Node v1067: operator role artifact fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_OPERATOR_ROLE` and `ARTIFACT_PREFLIGHT_OPERATOR_ROLE_SEAL`.
- Node v1068: capture window id artifact fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_WINDOW_ID` and `ARTIFACT_PREFLIGHT_WINDOW_ID_SEAL`.
- Node v1069: capture channel policy artifact fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_CHANNEL_POLICY` and `ARTIFACT_PREFLIGHT_CHANNEL_POLICY_SEAL`.
- Node v1070: signature algorithm artifact fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SIGNATURE_ALGORITHM` and `ARTIFACT_PREFLIGHT_SIGNATURE_ALGORITHM_SEAL`.
- Node v1071: detached signature placeholder through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER` and `ARTIFACT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER_SEAL`.
- Node v1072: signature material redaction policy through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SIGNATURE_REDACTION` and `ARTIFACT_PREFLIGHT_SIGNATURE_REDACTION_SEAL`.
- Node v1073: approval statement digest placeholder through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_APPROVAL_STATEMENT_DIGEST` and `ARTIFACT_PREFLIGHT_APPROVAL_STATEMENT_DIGEST_SEAL`.
- Node v1074: source evidence version fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SOURCE_VERSION` and `ARTIFACT_PREFLIGHT_SOURCE_VERSION_SEAL`.
- Node v1075: source evidence file fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SOURCE_FILE` and `ARTIFACT_PREFLIGHT_SOURCE_FILE_SEAL`.
- Node v1076: source evidence snippet fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SOURCE_SNIPPET` and `ARTIFACT_PREFLIGHT_SOURCE_SNIPPET_SEAL`.
- Node v1077: redacted value digest fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REDACTED_VALUE_DIGEST` and `ARTIFACT_PREFLIGHT_REDACTED_VALUE_DIGEST_SEAL`.
- Node v1078: value shape fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VALUE_SHAPE` and `ARTIFACT_PREFLIGHT_VALUE_SHAPE_SEAL`.
- Node v1079: redaction policy fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REDACTION_POLICY` and `ARTIFACT_PREFLIGHT_REDACTION_POLICY_SEAL`.
- Node v1080: provenance policy fragment through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_PROVENANCE_POLICY` and `ARTIFACT_PREFLIGHT_PROVENANCE_POLICY_SEAL`.
- Node v1081: no raw secret artifact lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_NO_RAW_SECRET_LOCK` and `ARTIFACT_PREFLIGHT_NO_RAW_SECRET_SEAL`.
- Node v1082: no approval grant artifact lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_NO_GRANT_LOCK` and `ARTIFACT_PREFLIGHT_NO_GRANT_SEAL`.
- Node v1083: zero value import artifact lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_ZERO_VALUE_IMPORT_LOCK` and `ARTIFACT_PREFLIGHT_ZERO_VALUE_IMPORT_SEAL`.
- Node v1084: no write route artifact lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_NO_WRITE_ROUTE_LOCK` and `ARTIFACT_PREFLIGHT_NO_WRITE_ROUTE_SEAL`.
- Node v1085: sibling non-mutation artifact lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SIBLING_NON_MUTATION_LOCK` and `ARTIFACT_PREFLIGHT_SIBLING_NON_MUTATION_SEAL`.
- Node v1086: closeout through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_CLOSEOUT` and `ARTIFACT_PREFLIGHT_CLOSEOUT_SEAL`.

## Required Verification

- Focused artifact preflight test, including ready, blocked, renderer, profile, and forced historical fallback coverage.
- Typecheck.
- Adjacent controlled preview route/catalog/barrel/capture-preflight tests.
- Controlled-preview wide batch.
- Build.
- HTTP smoke for health and controlled preview Markdown.
- Cleanup proof: no `dist`, no `.tmp`, no owned Node/Vitest/smoke process left running.
