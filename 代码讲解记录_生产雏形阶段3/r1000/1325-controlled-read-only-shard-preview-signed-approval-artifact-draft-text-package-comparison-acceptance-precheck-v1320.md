# 1325. Node v1320 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1320 adds approval grant review separation. The checkpoint spans signature-envelope, policy, and execution-lock families because those are the strongest approval-adjacent signals.

The guard text explicitly rejects acceptance when approval-grant separation proof is missing. A later compared package may become review evidence, but comparison is not treated as approval.

The artifact keeps approval captured, approval grant present, and signed approval present as false. Tests assert that forced historical fallback preserves those boundaries.
