# Node v539 post Node Evidence CI test budget stabilization roadmap

## Goal

Node v539 stabilizes the GitHub Actions Node Evidence job after v538 exposed a timeout-only CI failure.

## Failure Context

The v538 run completed typecheck and entered `npm test`. The test log showed passing test files, including the new v538 intake test, until the job hit the workflow-level 10 minute maximum execution time. No assertion failure was observed.

## Cross-Project State

Java and mini-kv remain recommended parallel. This CI budget change is Node-owned and does not require new sibling evidence, service startup, runtime probing, or upstream changes.

## Necessity Proof

- Blocker resolved: latest HEAD cannot become green while the workflow cancels the full test step at 10 minutes.
- Later consumer: v540+ needs a green latest HEAD before treating v538 evidence intake as mature.
- Existing report cannot be reused: this is a GitHub Actions execution budget, not a route report or evidence contract issue.
- Growth stop condition: only raise the job timeout. Do not split workflow topology or add new CI gates unless another timeout or real assertion failure appears.

## Validation Plan

- Keep the test command unchanged so CI still runs the full existing suite.
- Raise the workflow job timeout from 10 minutes to 20 minutes.
- Run local focused v538 intake and route catalog stability tests.
- Run typecheck.
- Push and wait for the new GitHub Actions conclusion.
