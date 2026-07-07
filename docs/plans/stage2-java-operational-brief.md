# Stage 2 Java Brief — real database, deployable service, ops drills

STATUS: INACTIVE — gated on Stage-1 Java track PASS + capstone PASS.
Executor: Codex session in `D:\javaproj\advanced-order-platform`. Parent:
`D:\nodeproj\orderops-node\docs\plans\stage2-operational-reality-program.md` (read-only;
progress recorded only in the Java repo). Stage-1 gates (JaCoCo floors, SpotBugs
shrink-only, Spotless, walkthrough-before-verify, tag/push/CI per version) remain
enforced. Domain boundaries unchanged: simulated payments stay simulated; evidence stays
read-only; deployment grants no execution/rollback/secret authority.

## Step 0 — re-grounding (mandatory, first version)

1. Confirm Stage-1 PASS records (Java final evidence + reviewer sign-off + capstone).
   If absent, STOP.
2. Re-verify: extraction endgame census holds; `mvnw verify` green; CI green on HEAD.
3. Read the Node `docs/ops/vm-census.md` fallback decision — it determines whether Java
   runs continuously on the VM or boots on demand for drills. Both modes are in scope;
   the census picks.

## Phase 1 — PostgreSQL as the real runtime database (2–3 versions)

1. Composed-runtime image: a pinned, reproducible container build of the app jar
   (Temurin base, non-root user, health check). Published to the compose file by digest.
2. Postgres profile becomes the composed default: Flyway migrations verified against
   real Postgres in an env-gated CI job (service container) — not only H2. Any
   H2-vs-Postgres dialect drift found = fixed via migration, never via test weakening.
3. Migration drill: from an empty Postgres, `flyway migrate` to head; then the
   rollback-SQL review-gate rehearsal on ONE reversible migration — executed against a
   throwaway database, producing a receipt. (This makes the existing rollback *review*
   machinery touch a real database once, without granting any standing rollback
   execution capability — the drill DB is destroyed after.)
4. Backup/restore drill: `pg_dump` → restore into a fresh container → row-count +
   checksum verification → receipt with digests. Scripted, rerunnable.

## Phase 2 — deployed service hardening (2 versions)

1. On the VM (per census mode): app under compose restart-policy/systemd; prod profile +
   Postgres; JVM sized to the memory-budget table (explicit -Xmx, GC log to rotated
   file); graceful shutdown verified by real SIGTERM during an in-flight request
   (receipt shows the request completes or is cleanly rejected — no connection reset).
2. Actuator: reachable only via localhost/proxy-auth; `health` probe-able by the Node
   monitoring loop; no heap-dump/env endpoints exposed anywhere.
3. Startup contract: service comes up unattended after VM reboot; failed migration =
   fail-fast with a clear log line, not a half-started service.

## Phase 3 — security and performance depth (2–3 versions)

1. Dependency scanning: OWASP dependency-check (or equivalent) as a CI gate — fail on
   new CVEs ≥ High, committed suppression file (shrink-only, each entry justified with
   the CVE id and reason). First run establishes the baseline honestly; do not suppress
   your way to green.
2. Endpoint authz posture: on the deployed instance every route requires the proxy
   token; additionally, the app itself rejects state-changing routes without the
   existing approval headers — proven by a live probe receipt (defense in depth: proxy
   AND app both refuse).
3. Load test: k6/JMeter against 2–3 read evidence endpoints and one write path
   (simulated domain), through the composed stack; committed SLOs from measurement;
   rerunnable harness in `scripts/perf/`; GC behavior during load captured once and
   summarized (no tuning rabbit hole — measure, record, only act if p99 is unacceptable).
4. Optional (only if all above green and census allows): enable the RabbitMQ transport
   in the composed stack as an opt-in lane with one consumer and an idempotency test,
   making the dormant outbox pattern demonstrably real. This is the ONLY new-capability
   item in this brief; it ships boundary-tested or not at all.

## Phase 4 — soak participation + closeout (1 version + soak)

1. During the 14-day soak: weekly backup/restore drill receipt; one induced-failure
   drill (kill -9 the JVM under the monitoring loop's watch → restart policy recovers →
   receipt includes the recovery gap measured from the status log).
2. Closeout: `docs/stage2-java-final-evidence.md` — drills, SLOs, scan baseline, live
   probe transcripts. Request Claude review (reviewer re-runs the backup/restore drill).

## Fail conditions

- H2-only proof for anything claimed to run on Postgres = not proven.
- A suppression-file entry without CVE id + justification = gate fail.
- Actuator or H2 console reachable without auth on the VM = phase fail.
- SIGTERM test replaced by "we configured graceful shutdown" prose = not evidence.
- Stage-1 gate regressions (coverage/SpotBugs/Spotless/ratchets) = version invalid.
