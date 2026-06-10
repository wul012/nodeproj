# Node v1790 - ops promotion archive release deployment renderer split

## Focus

Clean generated validation outputs, commit, tag, and push.

## What changed

The ops promotion release/deployment renderer surface keeps the same public functions while the implementation moves into release/archive, approval/change, execution/receipt, and audit trail modules where applicable for this version focus.

## Safety and parallelism

This is a Node-owned renderer maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1757-v1791 batch gates: typecheck, focused renderer re-export tests, related ops promotion route tests, build, segmented tests, archive, tags, push, and CI.
