# Cross-project readiness

- Generated: `2026-07-11T04:31:42.750Z`
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

## Provenance

- Node runtime: `v22.20.0`
- Java commit: `894deeb01837647af6dc125159ba5bc354f2cbb5`
- mini-kv commit: `not supplied`

The JSON companion contains process identifiers, artifact digests, fresh-output digests, schema fields, and cleanup evidence.
