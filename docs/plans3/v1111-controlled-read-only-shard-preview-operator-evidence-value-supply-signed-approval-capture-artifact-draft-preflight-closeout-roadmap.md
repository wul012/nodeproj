# Node v1087-v1111 controlled read-only shard preview operator evidence value supply signed approval capture artifact draft preflight closeout roadmap

## Scope

Node v1087-v1111 adds the signed approval capture artifact draft preflight layer after the v1086 artifact preflight.

This batch does not create a real signed approval draft, capture a signature, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java or mini-kv, or mutate sibling state. It only proves that a future manual signed approval draft can be checked through read-only fields, guards, gates, Markdown rendering, profile routing, tests, and catalog ownership.

## Necessity Proof

- Blocker resolved: v1086 proved artifact fragments and seals, but there was still no draft-level field map, guard map, or no-draft-materialization gate summary.
- Later consumer: the next Node batch can consume this draft preflight before introducing any manual artifact draft surface.
- Existing report cannot be reused: the artifact preflight report records fragment and seal readiness; it does not define draft fields, guard rejection codes, draft signature payload blockers, or the draft preflight digest boundary.
- Growth stop condition: stop this chain at manual signed approval draft readiness unless a later plan explicitly introduces a real manual draft with separate user approval and still no automatic value import.

## Cross-Project Plan

Java and mini-kv remain recommended parallel. Node v1087-v1111 consumes the already frozen artifact preflight evidence and does not require fresh Java or mini-kv files. Node is not a pre-approval blocker for their current work.

If a later version requires fresh Java or mini-kv evidence, that plan must list the exact upstream versions and the files Node will consume. This batch does not start sibling services and does not need live integration.

## Version Breakdown
- Node v1087: artifact draft request id through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID` and `ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID_GUARD`.
- Node v1088: source artifact preflight digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_ARTIFACT_PREFLIGHT_DIGEST` and `ARTIFACT_DRAFT_PREFLIGHT_ARTIFACT_PREFLIGHT_DIGEST_GUARD`.
- Node v1089: template digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_TEMPLATE_DIGEST` and `ARTIFACT_DRAFT_PREFLIGHT_TEMPLATE_DIGEST_GUARD`.
- Node v1090: approval packet review digest binding through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REVIEW_DIGEST` and `ARTIFACT_DRAFT_PREFLIGHT_REVIEW_DIGEST_GUARD`.
- Node v1091: operator identity draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_OPERATOR_IDENTITY` and `ARTIFACT_DRAFT_PREFLIGHT_OPERATOR_IDENTITY_GUARD`.
- Node v1092: operator role draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_OPERATOR_ROLE` and `ARTIFACT_DRAFT_PREFLIGHT_OPERATOR_ROLE_GUARD`.
- Node v1093: capture window id draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_WINDOW_ID` and `ARTIFACT_DRAFT_PREFLIGHT_WINDOW_ID_GUARD`.
- Node v1094: capture channel policy draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_CHANNEL_POLICY` and `ARTIFACT_DRAFT_PREFLIGHT_CHANNEL_POLICY_GUARD`.
- Node v1095: signature algorithm draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SIGNATURE_ALGORITHM` and `ARTIFACT_DRAFT_PREFLIGHT_SIGNATURE_ALGORITHM_GUARD`.
- Node v1096: detached signature placeholder through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER` and `ARTIFACT_DRAFT_PREFLIGHT_DETACHED_SIGNATURE_PLACEHOLDER_GUARD`.
- Node v1097: signature redaction draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SIGNATURE_REDACTION` and `ARTIFACT_DRAFT_PREFLIGHT_SIGNATURE_REDACTION_GUARD`.
- Node v1098: approval statement digest placeholder through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_APPROVAL_STATEMENT_DIGEST` and `ARTIFACT_DRAFT_PREFLIGHT_APPROVAL_STATEMENT_DIGEST_GUARD`.
- Node v1099: source evidence version draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SOURCE_VERSION` and `ARTIFACT_DRAFT_PREFLIGHT_SOURCE_VERSION_GUARD`.
- Node v1100: source evidence file draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SOURCE_FILE` and `ARTIFACT_DRAFT_PREFLIGHT_SOURCE_FILE_GUARD`.
- Node v1101: source evidence snippet draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SOURCE_SNIPPET` and `ARTIFACT_DRAFT_PREFLIGHT_SOURCE_SNIPPET_GUARD`.
- Node v1102: redacted value digest draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REDACTED_VALUE_DIGEST` and `ARTIFACT_DRAFT_PREFLIGHT_REDACTED_VALUE_DIGEST_GUARD`.
- Node v1103: value shape draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VALUE_SHAPE` and `ARTIFACT_DRAFT_PREFLIGHT_VALUE_SHAPE_GUARD`.
- Node v1104: redaction policy draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REDACTION_POLICY` and `ARTIFACT_DRAFT_PREFLIGHT_REDACTION_POLICY_GUARD`.
- Node v1105: provenance policy draft field through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_PROVENANCE_POLICY` and `ARTIFACT_DRAFT_PREFLIGHT_PROVENANCE_POLICY_GUARD`.
- Node v1106: no raw secret draft lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_NO_RAW_SECRET_LOCK` and `ARTIFACT_DRAFT_PREFLIGHT_NO_RAW_SECRET_GUARD`.
- Node v1107: no approval grant draft lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_NO_GRANT_LOCK` and `ARTIFACT_DRAFT_PREFLIGHT_NO_GRANT_GUARD`.
- Node v1108: zero value import draft lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_ZERO_VALUE_IMPORT_LOCK` and `ARTIFACT_DRAFT_PREFLIGHT_ZERO_VALUE_IMPORT_GUARD`.
- Node v1109: no write route draft lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_NO_WRITE_ROUTE_LOCK` and `ARTIFACT_DRAFT_PREFLIGHT_NO_WRITE_ROUTE_GUARD`.
- Node v1110: sibling non-mutation draft lock through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_SIBLING_NON_MUTATION_LOCK` and `ARTIFACT_DRAFT_PREFLIGHT_SIBLING_NON_MUTATION_GUARD`.
- Node v1111: closeout through `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_CLOSEOUT` and `ARTIFACT_DRAFT_PREFLIGHT_CLOSEOUT_GUARD`.

## Required Verification

- Focused artifact draft preflight test, including ready, blocked, renderer, profile, and forced historical fallback coverage.
- Typecheck.
- Adjacent controlled preview route/catalog/barrel/artifact-preflight tests.
- Controlled-preview wide batch.
- Build.
- HTTP smoke for health and controlled preview Markdown.
- Cleanup proof: no `dist`, no `.tmp`, no owned Node/Vitest/smoke process left running.
