# v1369 compared evidence candidate intake

v1369 adds the policy-lock intake slot. It preserves the policy-lock expectations needed before any real candidate document can be evaluated or accepted.

The guard blocks writes and sibling mutation. This keeps the preflight usable for archive review while preventing it from becoming an implicit execution gate.
