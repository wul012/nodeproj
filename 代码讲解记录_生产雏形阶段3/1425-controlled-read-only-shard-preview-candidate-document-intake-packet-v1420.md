# v1420 code walkthrough

The execution-write-mutation-freeze slot keeps execution, write routing, sibling mutation, and disabled-probe assumptions frozen. This preserves the lesson from prior smoke work: disabled probes must not be treated as ready evidence.

The packet stays read-only even when all preparation gates pass.
