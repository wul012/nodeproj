# Node v544 code walkthrough: latest sibling live smoke preflight

## Why This Version Exists

v543 exposed the latest sibling evidence archive verifier, but the next step needs a real three-project read smoke. v544 turns the startup and cleanup rules into a typed Node profile before any process is started.

## Service

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight.ts` loads the v543 archive verification source and builds:

- a local smoke window using Node `4190`, Java `8080`, and mini-kv `6524`;
- a process plan for all three services;
- read-only HTTP and TCP targets;
- command policy that allows only GET plus mini-kv read commands and blocks write/admin commands;
- checks proving startup commands, owners, ports, cleanup rules, and source archive readiness are present.

The profile is marked `preflightOnly=true`, `startsJavaService=false`, and `startsMiniKvService=false`, because v544 itself does not run the smoke.

## Renderer

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflightRenderer.ts` renders the same contract as Markdown, including environment, process plan, read targets, command policy, and checks.

## Test

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokePreflight.test.ts` verifies:

- source v543 archive verification is ready;
- ports are exactly `4190`, `8080`, and `6524`;
- read targets are GET-only for HTTP and read-only for mini-kv;
- cleanup rules require stopping only v545-owned PIDs and checking no listening sockets remain.

## Boundary

v544 is the final planning step before execution. If v545 sees an occupied port owned by an unknown process, it must record the blocker instead of killing that process.
