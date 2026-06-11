# 1319. Node v1314 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1314 adds digest acceptance coverage. The catalog maps the checkpoint to digest-binding lane kind and digest-recheck lane mode.

The validator intentionally compares the digest checkpoint source lane count to `digestModeComparisonLaneCount`, not only `digestBindingComparisonLaneCount`, because acceptance must cover every digest-recheck lane.

The artifact digest includes checkpoint order, version, code, kind, mode, source lane count, and source acceptance control count. This makes drift visible without storing raw package material.
