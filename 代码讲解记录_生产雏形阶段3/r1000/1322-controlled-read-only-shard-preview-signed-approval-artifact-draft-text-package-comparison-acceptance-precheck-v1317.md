# 1322. Node v1317 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1317 adds operator value handle acceptance precheck support. The checkpoint maps to the two value-binding comparison lanes.

The guard blocks acceptance when value-handle evidence is missing. It also keeps operator value supply, evidence import, runtime payload routing, writes, and sibling mutation disabled.

The focused test verifies that the value checkpoint source lane count is two. This guards against accidental broad matching with unrelated metadata lanes.
