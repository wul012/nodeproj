# 1323. Node v1318 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1318 adds policy and review-state acceptance precheck support. The checkpoint maps to policy lane and policy acceptance control families.

The validator checks full source lane/control coverage across all checkpoints, while the policy checkpoint remains a compact family summary. This keeps acceptance precheck validation stable as route/profile consumers grow.

The precheck does not approve execution. Policy evidence can later inform acceptance review, but this layer keeps approval and execution gates closed.
