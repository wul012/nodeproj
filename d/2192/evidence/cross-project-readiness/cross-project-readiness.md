# Cross-project readiness

- Generated: `2026-07-11T08:34:35.453Z`
- Live requested: `true`
- Overall status: **PASS**
- Read only: `true`
- Execution allowed: `false`

## Requirements

| Requirement | Status | Check | Result |
|---|---|---|---|
| C1 Live Java read | PASS | java.process | PASS: packaged Java process started |
| C1 Live Java read | PASS | java.health | PASS: Java actuator health is UP |
| C1 Live Java read | PASS | java.ops_evidence | PASS: Java ops evidence schema and read-only boundary are valid |
| C1 Live Java read | PASS | java.graceful_shutdown | PASS: Java Spring context stopped through loopback actuator shutdown |
| C2 Live mini-kv read | PASS | mini_kv.process | PASS: real mini-kv CLI completed a fresh read-only session |
| C2 Live mini-kv read | PASS | mini_kv.smoke_json | PASS: fresh SMOKEJSON schema and runtime boundary are valid |
| C2 Live mini-kv read | PASS | mini_kv.check_json | PASS: fresh CHECKJSON confirms GET has no write or WAL effect |
| C3 No-write proof | PASS | node.capstone_surface_census | PASS: capstone upstream client and mini-kv plan expose zero write methods |
| C3 No-write proof | PASS | java.write_rejection | PASS: unauthenticated Java write route was rejected before an authorized operation |
| C3 No-write proof | PASS | mini_kv.no_execution | PASS: fresh mini-kv CHECKJSON proves GET is non-writing and does not touch WAL |
| C4 aiproj artifact validation | PASS | aiproj.registry | PASS: aiproj committed artifact registry and selected schema are valid |
| C4 aiproj artifact validation | PASS | aiproj.artifact_integrity | PASS: one registry-listed aiproj artifact was read inside the project root |
| C4 aiproj artifact validation | PASS | aiproj.artifact_contract | PASS: registered required fields, expected values, and type checks all pass |
| C4 aiproj artifact validation | PASS | aiproj.no_promotion | PASS: artifact grants downstream lookup only and denies promotion authority |

## Provenance

- Node runtime: `v22.20.0`
- Java commit: `a7237a85b50fed2de62eb71113739439812bc043`
- mini-kv commit: `12b08563b2ac7a40c4874e4c2864f8deb3a32eef`
- aiproj commit: `5d6c288bff244ce5568c032ca7ab4bc6303dbc57`

The JSON companion contains process identifiers, artifact digests, fresh-output digests, schema fields, and cleanup evidence.
