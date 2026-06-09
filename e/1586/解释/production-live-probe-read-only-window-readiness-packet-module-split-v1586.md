# Node v1586 - production live probe read-only window readiness packet module split

## Focus

operator window requirements extraction.

## What changed

Manual Java start, manual mini-kv start, probe flag, action flag, and skipped-evidence requirements now live with builder safety logic.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1582-v1606 batch gates: typecheck, focused readiness packet tests, build, segmented full tests, HTTP smoke, archive, tags, push, and CI.
