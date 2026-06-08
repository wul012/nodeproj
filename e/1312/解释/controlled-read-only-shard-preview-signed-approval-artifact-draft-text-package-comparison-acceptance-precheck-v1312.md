# Node v1312 signed approval artifact draft text package comparison acceptance precheck

Node v1312 starts the v1312-v1321 comparison acceptance precheck by adding the source comparison preflight readiness checkpoint. It consumes the Node v1311 comparison preflight digest, the twenty-five comparison lanes, and the twenty-five acceptance controls without accepting any package material.

The checkpoint asks whether the source comparison preflight is complete, ready, read-only, and still blocking real package acceptance. Its guard rejects acceptance when source readiness evidence, approval-grant separation, or no-side-effect proof is missing.

This remains read-only: submitted, compared, accepted, rejected, signed, signature-payload, and approval-grant counts stay at zero. Runtime payloads, writes, service starts, and sibling mutations remain blocked.

Java and mini-kv can continue in parallel. Node v1312 does not request fresh sibling evidence and does not make either project wait for Node approval.
