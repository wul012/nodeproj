# 1324. Node v1319 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1319 adds execution lock acceptance precheck support. It maps to the five execution-lock comparison lanes and controls.

The validator enforces `executionLockCheckpointCoversExecutionLocks` and keeps live and production execution blocked. This prevents a future compared package from weakening no-runtime or no-write guarantees.

The renderer lists blocks for draft text package acceptance, approval grant, runtime payload, writes, and sibling mutation. These fields are also asserted in focused tests.
