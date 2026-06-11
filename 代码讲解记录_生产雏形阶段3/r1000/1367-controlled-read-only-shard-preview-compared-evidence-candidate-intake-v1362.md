# v1362 code walkthrough

The intake type layer introduces versioned slot and guard contracts for `Node v1362` through `Node v1371`. The first concrete slot is source-lineage candidate intake, which reads the source section from the v1361 candidate blueprint and preserves its required fields.

The builder marks the slot ready only when the source blueprint is ready, the source section and blocker are ready, all required fields are present, and every real/synthetic/materialized/accepted counter remains zero. This lets the contract become ready without pretending that a real document exists.
