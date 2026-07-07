# Stage 2 Node Brief — composed-runtime owner, deployment, dashboard

STATUS: INACTIVE — gated on Stage-1 Node track PASS + capstone C1–C4 PASS.
Executor: Codex session in `D:\nodeproj\orderops-node`. Parent:
`docs/plans/stage2-operational-reality-program.md`. Node owns the system-level phases
(0, 1, 2, 4) because it is the consumer/control plane; Java/mini-kv/aiproj supply
artifacts through their own briefs. All Stage-1 gates (coverage floors, lint, ratchets,
CHANGELOG, boundaries docs) remain enforced throughout — Stage 2 work does not get to
regress Stage 1.

## Step 0 — re-grounding (mandatory, first version)

1. Confirm Stage-1 PASS records (final evidence docs + reviewer sign-off) for Node and
   the capstone. If absent, STOP — this brief is not active.
2. Re-verify: current version/tag, CI green, capstone suite still passes locally.
3. VM census (Phase 0): SSH in, record OS version, RAM, CPU, disk, existing services,
   the mini-kv clone state. Write `docs/ops/vm-census.md` with the memory-budget table
   and the chosen fallback rung (a/b/c from the program). Apply the security baseline
   (key-only SSH, firewall default-deny, swap if RAM < 4GB, docker+compose).
   Every hardening step lands as a committed script or documented command, not a memory.

## Phase 1 — composed runtime, local (2–4 versions)

1. `compose/system.yml`: Java (+Postgres, per Java brief's image/profile), Node, mini-kv
   service container (per mini-kv brief's artifact). Health-gated startup order
   (depends_on with healthchecks), pinned image digests, one `.env.example`.
2. End-to-end scenario suite `test/e2e/` (env-gated `E2E_COMPOSED=1`, its own vitest
   config, excluded from default CI): real HTTP through Node → Java evidence endpoints;
   fresh mini-kv SMOKEJSON/CHECKJSON produced inside the composed stack and validated;
   negative scenarios (Java down → Node degrades with explicit status, not hangs; wrong
   token → 401; write attempt → rejected). Each scenario asserts boundary fields
   (`read_only`, `execution_allowed:false`) from live responses.
3. Contract-drift job: the capstone C1–C4 suite runs against the composed stack (not
   just the singleton boots) via one npm script. `readiness:cross` gains a
   `--target composed` mode.
4. Acceptance: `npm run system:up && npm run system:test && npm run system:down` clean
   on the dev machine, twice in a row, with a committed transcript.

## Phase 2 — VM deployment (2–3 versions)

1. Deploy the composed definition to the VM (compose with restart policies, or systemd
   units per the census decision). One idempotent deploy script committed
   (`scripts/deploy-vm.sh`): rsync/pull, migrate, restart, verify health. Rollback = the
   previous image digests, documented and tested once.
2. Caddy (or nginx) as the single public entry: 443 only, TLS (internal CA/self-signed
   documented), bearer-token auth on every route except `GET /healthz`. Tokens in VM env
   files (600), documented in `docs/ops/secrets-handling.md` with rotation steps.
3. Log rotation for every service (logrotate or docker log opts, bounded sizes).
4. Monitoring loop: a cron probe (every 1–5 min) hits each service's health/metrics via
   localhost, appends a committed-format JSONL status log with timestamps; disk-bounded.
5. Acceptance: reviewer probes from the dev machine through the authed proxy; a port
   scan shows exactly 22 and 443 open; services survive a VM reboot unattended.

## Phase 3 — depth (2–3 versions, parallelizable)

1. Security: `npm audit` CI gate (fail on high/critical; documented baseline for
   unfixable transitive items, shrink-only); rate limiting on all proxied routes;
   the metrics/readiness endpoints require auth in deployed mode.
2. Performance: load test key read endpoints + `readiness:cross` aggregation with
   autocannon/k6; commit SLOs (e.g., p99 < the measured baseline + margin at N conns —
   numbers come from measurement, not aspiration); a repeatable perf script whose rerun
   reproduces within stated variance; regression = warn first run, gate once stable.
3. Failure drills: kill Node mid-request (proxy returns 502 not hang, restart policy
   recovers, drill receipt); dependency-down drill (Java stopped → dashboard shows
   degraded honestly).

## Phase 4 — dashboard + soak (1–2 versions + 14 days)

1. Dashboard: one served page (behind the proxy auth) rendering the latest
   `readiness:cross` output + the monitoring JSONL + last drill receipts + the latest
   aiproj publication-receipt validation. Server-rendered or static-regenerated; no new
   framework. This is the "one screen that tells the truth" artifact.
2. Soak: 14 days; weekly drill receipts (restart, backup-restore coordination with
   Java/mini-kv briefs, one induced failure); every gap in the status log explained in
   the soak journal `docs/ops/soak-journal.md`.
3. Closeout: `docs/ops/stage2-node-final-evidence.md`; request Claude review (live
   probes + fresh e2e run + one drill re-executed).

## Fail conditions

- Any publicly reachable unauthenticated endpoint beyond `/healthz` = phase fail.
- E2E suite green only when services are pre-warmed by hand = not reproducible = fail.
- SLO numbers without a committed rerunnable harness = not evidence.
- Stage-1 ratchet/coverage/lint regressions during Stage-2 work = the version is invalid.
- Soak-journal gaps without explanation = soak restarts.
