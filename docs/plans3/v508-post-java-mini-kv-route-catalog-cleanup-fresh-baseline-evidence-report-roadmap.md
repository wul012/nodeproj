# Node v508 post Java / mini-kv route catalog cleanup fresh baseline evidence report roadmap

## Goal

Node v508 exposes the v507 fresh baseline evidence intake as a JSON/Markdown audit report route.

## Cross-Project State

Java and mini-kv are recommended parallel.

- Node already froze Java v232-v239 and mini-kv v213-v220 evidence in v507.
- v508 does not need fresh Java or mini-kv files.
- v508 does not start sibling services or request runtime approval.

## Necessity Proof

- Blocker resolved: v507 only provided an internal intake service, so downstream archive steps had no route output to preserve.
- Later consumer: v509 can archive the JSON/Markdown output for verifier construction.
- Existing routes are not enough: v502 reports the older Java v225-v231 / mini-kv v211-v212 readiness handoff baseline.
- Growth stop condition: this route should be archived and verified once, then folded into a batch closeout instead of spawning parallel report variants.

## Validation Plan

- Run the focused fresh baseline evidence test.
- Run the cleanup route group test to verify JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 212/48 count update.
- Run typecheck before commit.
- Leave no background service running.
