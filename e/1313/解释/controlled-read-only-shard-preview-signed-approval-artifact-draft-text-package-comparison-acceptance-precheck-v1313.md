# Node v1313 signed approval artifact draft text package comparison acceptance precheck

Node v1313 adds the identity and request metadata acceptance checkpoint. It groups the four identity comparison lanes from Node v1311 into one acceptance precheck surface for request identity, operator identity, correlation id, and artifact identity.

The guard rejects acceptance if a later compared package lacks identity binding evidence. This keeps comparison preflight detail reusable while avoiding a new giant validator path.

The version does not accept real text, does not parse an approval artifact, and does not enable signature or approval-grant capture. All side-effect and execution flags remain false.

Java and mini-kv can continue in parallel; this is a Node-only read-only downstream checkpoint.
