# Node v1318 signed approval artifact draft text package comparison acceptance precheck

Node v1318 adds the policy and review-state acceptance checkpoint. It groups the policy comparison lanes and controls into one precheck that later compared evidence can consume.

The guard rejects acceptance when policy assertion evidence or review-state lineage is missing. It also keeps comparison separate from final approval so a matched policy lane cannot become an approval grant by implication.

This version remains read-only and pre-runtime. It does not parse a draft text package and does not permit writes or sibling mutation.

Java and mini-kv remain recommended parallel.
