# Node v1607 - production live probe read-only window live capture module split

## Focus

live capture profile and captured-record type extraction.

## What changed

The live capture profile, captured record, and message contracts now live in a dedicated type module.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1607-v1631 batch gates: typecheck, focused live capture tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
