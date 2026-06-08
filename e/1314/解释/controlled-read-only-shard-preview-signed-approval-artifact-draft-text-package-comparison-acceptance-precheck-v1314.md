# Node v1314 signed approval artifact draft text package comparison acceptance precheck

Node v1314 adds the digest binding acceptance checkpoint. It covers all five digest-recheck comparison lanes and the four digest-binding acceptance controls, because acceptance must consider digest mode coverage rather than only the digest-binding lane kind.

The guard rejects acceptance when digest evidence is missing or when digest precheck lineage cannot prove the compared package is still tied to template, review, preflight, and submission lineage.

This version only records the precheck requirement. It does not compare or accept an actual draft text package, and it does not import runtime payloads.

Java and mini-kv remain recommended parallel and are not new prerequisites for Node v1314.
