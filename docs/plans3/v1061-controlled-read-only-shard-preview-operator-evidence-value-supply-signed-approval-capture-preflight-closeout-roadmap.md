# Node v1037-v1061 controlled read-only shard preview operator evidence value supply signed approval capture preflight closeout roadmap

## Scope

Node v1037-v1061 adds a signed approval capture preflight layer after the v1036 signed approval template preflight.

This batch does not capture a signed approval, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java or mini-kv, or mutate sibling state. It only proves that the capture preflight input and attestation structure can be derived from the v1036 template while all execution gates remain closed.

## Necessity Proof

- Blocker resolved: v1036 proved the signed approval template fields and clauses, but the next review step still had no explicit capture preflight input map, attestation map, or fail-closed gate summary.
- Later consumer: the next Node batch can consume this capture preflight before planning any signed approval capture artifact.
- Existing report cannot be reused: the v1036 template report records required fields and clauses, not capture request ids, channel policy, signature policy, raw-signature locks, grant locks, or sibling non-mutation attestations.
- Growth stop condition: stop this chain at capture artifact preflight unless a real signed approval artifact is explicitly introduced with separate user approval and no automatic value import.

## Cross-Project Plan

Java and mini-kv remain recommended parallel. Node v1037-v1061 consumes the already frozen template/review evidence and does not require fresh Java or mini-kv files. Node is not a pre-approval blocker for their current work.

If a later version requires fresh Java or mini-kv evidence, that plan must list the exact upstream versions and the files Node will consume. This batch does not start sibling services and does not need live integration.

## Version Breakdown

- Node v1037: capture preflight request id input and required attestation.
- Node v1038: source signed approval template digest binding.
- Node v1039: source approval packet review digest binding.
- Node v1040: operator identity input mirror.
- Node v1041: operator role input mirror.
- Node v1042: approval timestamp source placeholder.
- Node v1043: manual capture window id placeholder.
- Node v1044: capture channel policy placeholder.
- Node v1045: signature algorithm policy placeholder.
- Node v1046: signature material redaction policy.
- Node v1047: approval statement placeholder.
- Node v1048: operator justification mirror.
- Node v1049: source evidence version mirror.
- Node v1050: source evidence file id mirror.
- Node v1051: source evidence snippet id mirror.
- Node v1052: redacted value digest reference.
- Node v1053: value shape binding.
- Node v1054: redaction policy mirror.
- Node v1055: provenance policy mirror.
- Node v1056: no raw secret/signature material lock.
- Node v1057: no approval grant emitted lock.
- Node v1058: zero value submission/acceptance/import lock.
- Node v1059: no write route lock.
- Node v1060: sibling non-mutation lock.
- Node v1061: capture preflight closeout and next-step boundary.

## Required Verification

- Focused capture preflight test.
- Typecheck.
- Adjacent controlled preview route/catalog/barrel/template tests.
- Controlled-preview wide batch.
- Build.
- HTTP smoke for health and controlled preview Markdown.
- Cleanup proof: no `dist`, no `.tmp`, no owned Node/Vitest/smoke process left running.
