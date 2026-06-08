# 1318. Node v1313 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1313 adds the identity acceptance checkpoint. The catalog maps this checkpoint to the identity comparison lane kind, which keeps its source count at four and avoids broad `metadata-comparison-lane` overmatching.

The builder copies source lane/control counts and readiness counts into a checkpoint record. It also stamps every materialization and payload flag as false.

The validator checks that all source comparison lanes remain covered across the ten checkpoint family map. Identity is therefore a compact precheck summary, not a duplicate of all low-level lane detail.
