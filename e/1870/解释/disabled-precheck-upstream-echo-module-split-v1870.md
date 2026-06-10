# Node v1870 - disabled precheck upstream echo module split

## Focus

Extract Java v106 disabled-precheck echo reference builder.

## What changed

The disabled-precheck upstream echo verification service is being split into constants, reference builders, check/message builders, and core loader modules while keeping the old service entrypoint stable.

## Safety and parallelism

This is a Node-owned maintainability batch. It uses existing historical Java v106 and mini-kv v115 evidence, requires no fresh sibling evidence, and does not start sibling services.

## Verification expectation

This batch is covered by the v1867-v1878 gates: split-export identity coverage, focused behavior/route tests, related credential resolver tests, typecheck, build, full regression, tags, push, and CI.
