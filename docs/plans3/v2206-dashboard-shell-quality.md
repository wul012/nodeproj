# Node v2206 Dashboard Shell Quality

Date: 2026-07-19
Owner: Codex
State: complete; commit 4a9471ce, tag v2206, and Node Evidence run 29693804255 passed

## Objective and stop condition

Repair three page-shell defects exposed by the v2205 browser pass without adding
product behavior: duplicate document-level tags, mobile overflow from long audit
buttons, and the missing favicon request. Stop only when a failing structural test
turns green, desktop/mobile browser evidence passes, and all repository ratchets
remain unchanged or shrink.

## Step-0 reconciliation and cross-project progress

- Node started at commit `fbbb991e`, tag `v2205`; v2203-v2206 were later pushed
  together and cumulative Node Evidence run `29693804255` passed.
- Java is committed/pushed at `8bb577d6`, tag
  `v1869-order-platform-diff-aware-elegance-gates`, with an active uncommitted
  v1870-like core error-boundary slice. Java is recommended parallel; Node does not
  read or modify that dirty tree and is not its pre-approval blocker.
- mini-kv is committed/pushed at `74584be7`, tag `v1665`, with an active uncommitted
  v1666-like shard-test architecture slice. mini-kv is recommended parallel; Node
  does not consume its temporary files or dirty evidence.
- No fresh sibling evidence, live capstone, upstream process, write permission, or
  Stage 2 activation is required for this local HTML/CSS correction.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| One valid document shell | remove document tags from the markup fragment | exact tag-count assertions | passed; one shell and fragment has no document tags |
| No favicon 404 | embed a data-SVG favicon in the outer head | source assertion + browser console/network | passed; zero console errors and no favicon request |
| Mobile buttons fit | permit row buttons to shrink and wrap within their owner | CSS contract + 390px browser boxes | passed; 302px owner and 302px maximum button width |
| Existing UI behavior stays | retain element ids, actions, scripts, route order, and content | existing dashboard tests + focused route parity | passed in 4 files / 17 tests and complete 567-file suite |
| Intentional bytes are explicit | refresh only dashboard length/digest after the shell fix | old digest fails, new digest recorded with rationale | passed; 38122/96100 and both SHA-256 values archived |
| Governance does not grow | no new route/service module; direct routes remain 80 | growth ratchet + maintainability census | passed; 80 routes and census 89 / 121 / 238 / 2 |
| Close locally/remotely | focused tests, typecheck, lint, build, HTTP/browser, batched CI | commands, archive, git refs, Node Evidence | passed; commit 4a9471ce, tag v2206, run 29693804255 |

## Necessity and growth stop

- Blocker: the browser pass reported `/favicon.ico` 404 and mobile button overflow;
  source inspection reproduced duplicate `</head><body>` tags in the markup fragment.
- Consumer: every Dashboard load and mobile maintainer/operator view consumes this fix.
- Existing abstractions are reused: `dashboardHtml`, `dashboardMarkup`,
  `dashboardStyles`, and `dashboard.test.ts`; no new service, report, route chain,
  source family, or configuration flag is authorized.
- Growth stops when the three assertions and two browser viewports pass. Further UI
  redesign is outside v2206.

## Touched-family design note

- Outer shell: `dashboardHtml` alone owns doctype/html/head/body and favicon metadata.
- Fragment: `dashboardMarkup` owns only content below body.
- Layout: `dashboardStyles` owns shrink/wrap behavior; markup stays free of inline fixes.
- Tests: existing Dashboard and parity files own structure and intentional byte freeze.

## Test-first sequence

1. Add assertions for exactly one opening/closing html, head, and body tag; zero
   document-level tags in `dashboardMarkup`; a data favicon; and shrink/wrap CSS.
2. Run the focused test before implementation and record the expected failures.
3. Remove the fragment shell tags, add the embedded favicon, and repair button flex/
   wrapping without renaming actions or changing endpoint strings.
4. Compute the new length/digest only after the structural tests pass, then replace
   the v2205 byte oracle with an explicitly named v2206 shell-result oracle.
5. Verify focused tests, typecheck, zero-warning lint, growth/maintainability gates,
   build, six-endpoint HTTP smoke, desktop/mobile Playwright snapshots, console zero,
   screenshot archive, Chinese walkthrough, commit/tag, batched push, and Node Evidence.

## Executed evidence before the final batch

- Red phase: `dashboard.test.ts` ran 5 tests and failed exactly the three new
  structure/favicon/mobile contracts before implementation.
- Green focused phase: Dashboard/parity ran 2 files / 7 tests; the expanded
  Dashboard/parity/growth/maintainability group ran 4 files / 17 tests.
- Intentional bytes: markup `38122` with SHA-256 `61219ccf...760c6`; complete HTML
  `96100` with SHA-256 `20cd81e4...c95a`.
- Typecheck and zero-warning lint passed. Maintainability stayed ready at
  `89 / 121 / 238 / 2`; elegance, family, source-size, renderer, security/config,
  archive-retention, and the immutable 80-route ceiling all passed.
- HTTP smoke passed 6/6 on the tracked foreground process at port 31206. Playwright
  passed at 1440x900 and 390x844; console errors were zero, no favicon request was
  emitted, and long buttons wrapped at the 302px owner width. Browser/server cleanup
  completed and the port returned to zero listeners.
- The repository scanner reports 3,352 Chinese characters, 9 scannable H2 sections,
  a 584-character largest section, no repetition/oversize signals, and 100% current-
  standard compliance. The first full run correctly failed its missing one-sentence
  summary signal; after adding that real reading anchor, the failing file passed 2/2
  and complete shard 4 passed 36 files / 93 tests.
- The complete suite passed all 16 shards: 567 files / 1,729 tests. Shards 1-3
  passed 108 files / 317 tests before the documentation correction; repaired shard
  4 and shards 5-16 passed afterward. `vitest list --json` independently returned
  the same 567 files / 1,729 tests. The final documents passed 11 focused files /
  34 tests and the final tree built successfully. Commit `4a9471ce`, tag `v2206`,
  push, and cumulative Node Evidence run `29693804255` all completed successfully.

## Fail conditions

- Raising a ratchet, deleting a UI action, hiding overflow, truncating button labels,
  adding another route file, or accepting another favicon request fails the version.
- Updating the digest before structural assertions prove the intended correction fails.
- Claiming mobile success without a 390px browser inspection or leaving the owned
  smoke process running fails cleanup.
