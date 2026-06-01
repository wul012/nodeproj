# Node v505 post Java / mini-kv route catalog cleanup readiness handoff evidence archive verification route roadmap

## Goal

Node v505 exposes the v504 readiness handoff evidence archive verifier and closes the requested fifteen-version run from v491 through v505.

## Cross-Project State

Java and mini-kv are recommended parallel.

- Java clean evidence consumed by Node reaches v231.
- Java current dirty v232-like work remains excluded.
- mini-kv clean evidence consumed by Node reaches v212.
- mini-kv current dirty v213-like work remains excluded.

## Necessity Proof

- Blocker resolved: v504 verifier was local-only; v505 publishes it through JSON/Markdown.
- Later consumer: a future Node batch can start from the next clean Java/mini-kv tags after v232/v213 are completed.
- Existing routes are not enough: v502 exposes the report, but not the archive verification.
- Growth stop condition: this route completes the v501-v505 chain and the v491-v505 requested run.

## Validation Plan

- Run focused route/catalog tests.
- Run typecheck and build.
- Clean `dist` before commit.
- Leave no background process running.
