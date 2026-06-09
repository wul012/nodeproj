# Node v1626 - production live probe read-only window live capture module split

## Focus

renderer re-export regression test.

## What changed

A focused test verifies the stable live capture entrypoint renderer export points to the extracted renderer implementation.

## Safety and parallelism

This is a Node-owned maintainability split. It does not enable production operations, does not start Java or mini-kv, and does not require fresh sibling evidence. Java and mini-kv can continue in parallel.

## Verification expectation

This version is covered by the v1607-v1631 batch gates: typecheck, focused live capture tests, adjacent read-only window tests, build, HTTP smoke, segmented full tests, archive, tags, push, and CI.
