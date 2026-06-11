# Node v539 code walkthrough: CI test budget stabilization

## Why This Version Exists

v538 introduced the latest sibling evidence intake and passed local focused tests, typecheck, and build. The pushed CI run then failed only because the Node Evidence job hit the workflow-level 10 minute timeout during `npm test`.

## Workflow Change

`.github/workflows/node-evidence.yml` keeps the same job shape:

- install dependencies;
- typecheck;
- run the full test command;
- build;
- start the safe smoke server;
- run health and release evidence readiness smoke checks;
- stop the smoke server.

The only budget change is `timeout-minutes: 20`.

## Why This Is Safe

The v538 CI log showed tests passing until the job was cancelled, and the new v538 focused test completed successfully in CI before the timeout. This version does not weaken the test command or skip build/smoke verification.

## Boundary

No Node service logic, route registration, Java evidence, mini-kv evidence, or runtime authority changed.
