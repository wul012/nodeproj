# Node v1112-v1136 controlled read-only shard preview signed approval artifact draft readiness closeout roadmap

This package consumes the completed Node v1111 signed approval artifact draft preflight and adds a heavier readiness layer for a future manual signed approval draft artifact. It is intentionally still non-executing: it does not create a signed approval draft, does not capture a signature, does not emit approval grants, does not submit or import operator values, does not create runtime payloads, does not start Java or mini-kv, and does not mutate sibling state.

## Necessity Proof

- Blocker resolved: v1111 proved that draft fields and guards exist, but it did not prove a reviewable lane/control package that an operator can inspect before a separate manual draft artifact package is authored.
- Later consumer: the next manual draft artifact package can consume the readiness lane list, control blocker list, digest pins, no-side-effect gates, and route/profile evidence without rebuilding those checks.
- Existing reports cannot be reused: the artifact draft preflight only says fields and guards are ready; it does not bind each lane to a human-review purpose, manual review blocker, or route-visible readiness closeout.
- Stop condition: the chain stops before real draft materialization. Any later package that accepts actual signature text, raw value material, approval grants, or runtime payloads must be separate and must name service startup, owner, cleanup, and fresh sibling evidence requirements before execution.

## Cross-Project Parallel Status

- Java is recommended parallel. Node v1112-v1136 consumes no fresh Java evidence, starts no Java service, and is not a Java pre-approval blocker.
- mini-kv is recommended parallel. Node v1112-v1136 consumes no fresh mini-kv evidence, starts no mini-kv service, and is not a mini-kv pre-approval blocker.
- Live integration is not required for this package. If a future package needs live Java or mini-kv services, the plan must name ports, startup commands, cleanup commands, and exact owner before running anything.

## Version Slices

- Node v1112: request manifest readiness lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REQUEST_MANIFEST`, binds source field `draftArtifactRequestId`, and exposes blocker `REJECT_DRAFT_READINESS_REQUEST_MANIFEST_MISSING`.
- Node v1113: artifact preflight digest pin lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_ARTIFACT_PREFLIGHT_DIGEST_PIN`, binds source field `sourceSignedApprovalCaptureArtifactPreflightDigest`, and exposes blocker `REJECT_DRAFT_READINESS_ARTIFACT_PREFLIGHT_DIGEST_UNPINNED`.
- Node v1114: template digest pin lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_TEMPLATE_DIGEST_PIN`, binds source field `sourceSignedApprovalTemplateDigest`, and exposes blocker `REJECT_DRAFT_READINESS_TEMPLATE_DIGEST_UNPINNED`.
- Node v1115: approval review digest pin lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REVIEW_DIGEST_PIN`, binds source field `sourceApprovalPacketReviewDigest`, and exposes blocker `REJECT_DRAFT_READINESS_REVIEW_DIGEST_UNPINNED`.
- Node v1116: operator identity review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_OPERATOR_IDENTITY_REVIEW`, binds source field `operatorIdentity`, and exposes blocker `REJECT_DRAFT_READINESS_OPERATOR_IDENTITY_UNREVIEWED`.
- Node v1117: operator role review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_OPERATOR_ROLE_REVIEW`, binds source field `operatorRole`, and exposes blocker `REJECT_DRAFT_READINESS_OPERATOR_ROLE_UNREVIEWED`.
- Node v1118: capture window id review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_WINDOW_ID_REVIEW`, binds source field `captureWindowId`, and exposes blocker `REJECT_DRAFT_READINESS_WINDOW_ID_UNREVIEWED`.
- Node v1119: capture channel policy review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_CHANNEL_POLICY_REVIEW`, binds source field `captureChannelPolicy`, and exposes blocker `REJECT_DRAFT_READINESS_CHANNEL_POLICY_UNREVIEWED`.
- Node v1120: signature algorithm review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SIGNATURE_ALGORITHM_REVIEW`, binds source field `signatureAlgorithmPolicy`, and exposes blocker `REJECT_DRAFT_READINESS_SIGNATURE_ALGORITHM_UNREVIEWED`.
- Node v1121: detached signature placeholder review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_DETACHED_SIGNATURE_REVIEW`, binds source field `detachedSignaturePlaceholder`, and exposes blocker `REJECT_DRAFT_READINESS_DETACHED_SIGNATURE_PLACEHOLDER_UNREVIEWED`.
- Node v1122: signature redaction review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SIGNATURE_REDACTION_REVIEW`, binds source field `signatureMaterialRedactionPolicy`, and exposes blocker `REJECT_DRAFT_READINESS_SIGNATURE_REDACTION_UNREVIEWED`.
- Node v1123: approval statement digest pin lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_APPROVAL_STATEMENT_DIGEST_PIN`, binds source field `approvalStatementDigest`, and exposes blocker `REJECT_DRAFT_READINESS_APPROVAL_STATEMENT_DIGEST_UNPINNED`.
- Node v1124: source evidence version review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SOURCE_VERSION_REVIEW`, binds source field `sourceEvidenceVersion`, and exposes blocker `REJECT_DRAFT_READINESS_SOURCE_VERSION_UNREVIEWED`.
- Node v1125: source evidence file review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SOURCE_FILE_REVIEW`, binds source field `sourceEvidenceFileId`, and exposes blocker `REJECT_DRAFT_READINESS_SOURCE_FILE_UNREVIEWED`.
- Node v1126: source evidence snippet review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SOURCE_SNIPPET_REVIEW`, binds source field `sourceEvidenceSnippetId`, and exposes blocker `REJECT_DRAFT_READINESS_SOURCE_SNIPPET_UNREVIEWED`.
- Node v1127: redacted value digest pin lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REDACTED_VALUE_DIGEST_PIN`, binds source field `redactedValueDigest`, and exposes blocker `REJECT_DRAFT_READINESS_REDACTED_VALUE_DIGEST_UNPINNED`.
- Node v1128: value shape review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VALUE_SHAPE_REVIEW`, binds source field `valueShape`, and exposes blocker `REJECT_DRAFT_READINESS_VALUE_SHAPE_UNREVIEWED`.
- Node v1129: redaction policy review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REDACTION_POLICY_REVIEW`, binds source field `redactionPolicy`, and exposes blocker `REJECT_DRAFT_READINESS_REDACTION_POLICY_UNREVIEWED`.
- Node v1130: provenance policy review lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_PROVENANCE_POLICY_REVIEW`, binds source field `provenancePolicy`, and exposes blocker `REJECT_DRAFT_READINESS_PROVENANCE_POLICY_UNREVIEWED`.
- Node v1131: raw secret embargo lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_RAW_SECRET_EMBARGO`, binds source field `noRawSecretLock`, and exposes blocker `REJECT_DRAFT_READINESS_RAW_SECRET_PRESENT`.
- Node v1132: approval grant embargo lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_APPROVAL_GRANT_EMBARGO`, binds source field `noApprovalGrantEmittedLock`, and exposes blocker `REJECT_DRAFT_READINESS_APPROVAL_GRANT_EMITTED`.
- Node v1133: zero value import embargo lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_ZERO_VALUE_IMPORT_EMBARGO`, binds source field `zeroValueImportLock`, and exposes blocker `REJECT_DRAFT_READINESS_VALUE_IMPORT_NONZERO`.
- Node v1134: write route embargo lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_WRITE_ROUTE_EMBARGO`, binds source field `noWriteRouteLock`, and exposes blocker `REJECT_DRAFT_READINESS_WRITE_ROUTE_ENABLED`.
- Node v1135: sibling non-mutation evidence lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_SIBLING_NON_MUTATION_EVIDENCE`, binds source field `siblingNonMutationLock`, and exposes blocker `REJECT_DRAFT_READINESS_SIBLING_MUTATION_ENABLED`.
- Node v1136: artifact draft readiness closeout lane adds lane `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_CLOSEOUT`, binds source field `signedApprovalCaptureArtifactDraftPreflightCloseout`, and exposes blocker `REJECT_DRAFT_READINESS_NEXT_STEP_NOT_MANUAL_PACKAGE`.

## Verification Plan

- Focused readiness test: ready path, blocked source path, markdown rendering, profile inclusion, and forced historical fallback.
- Adjacent route/barrel/catalog tests: route markdown surface, stable review artifact exports, and module ownership count/order.
- Typecheck, controlled preview test batch, build, and safe HTTP smoke after archive generation.
- GitHub Actions Node Evidence must pass after push before the batch is considered closed.
