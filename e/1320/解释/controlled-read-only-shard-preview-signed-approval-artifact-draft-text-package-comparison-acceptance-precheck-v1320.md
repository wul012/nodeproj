# Node v1320 signed approval artifact draft text package comparison acceptance precheck

Node v1320 adds the approval grant review separation checkpoint. It intentionally spans signature-envelope, policy, and execution-lock lanes because those are the areas most likely to be mistaken for approval.

The guard rejects acceptance unless approval-grant review remains separate from package comparison. A compared package can be evidence for a later review, but it is not itself an approval grant.

Approval captured, approval grant present, and signed approval present remain false. Signature payload and runtime payload counts remain zero.

Java and mini-kv remain recommended parallel and do not need to produce fresh evidence for this version.
