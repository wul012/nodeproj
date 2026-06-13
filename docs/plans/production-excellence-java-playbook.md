# Production Excellence — Java Playbook (advanced-order-platform)

Executes the standard in `docs/plans/production-excellence-program.md` for
`D:\javaproj\advanced-order-platform`. Java sessions: your AGENTS.md already
requires reading the active Node plan — this playbook IS the active plan for
quality work; it changes no contracts, so it never blocks your feature versions.

**Session bootstrap (parallel-safe):** work in `D:\javaproj\advanced-order-platform`
only. Kickoff prompt for a fresh session:
`Read D:\nodeproj\orderops-node\docs\plans\production-excellence-java-playbook.md and execute the next unfinished milestone.`
This playbook file is read-only for you: record progress in YOUR repo at
`docs/production-excellence-progress.md` (copy the Progress table below into it
on first run, plus a Deviations section). Do not edit anything under
`D:\nodeproj` or `D:\C` — the planner syncs the central tables at review
checkpoints.

Verified starting facts (2026-06-12): **no `.github/workflows` directory — no CI
at all.** No Maven wrapper. No checkstyle/spotbugs/linting. No JaCoCo. Default
profile runs on H2 headless (`mvn spring-boot:run` works without Docker);
Testcontainers-based tests (e.g. PostgresMigrationIntegrationTests,
RabbitMqNotificationConsumerIntegrationTests, `@Testcontainers @Container`)
require Docker. H2 console enabled by default (application.yml ~line 12).
docker-compose.yml hardcodes credentials (order_app:order_app). pom.xml version
0.1.0-SNAPSHOT vs git tag v1788; no CHANGELOG.md. Replay authorization is
config-property based (`failed-event.replay.allowed-roles` etc., application.yml
~lines 71–90) — there is NO FailedEventReplayAuthorizationService class; do not
look for one. ops package = 1,352 of 1,474 classes; largest file
OpsEvidenceService ~1478 LOC; ReleaseApprovalRehearsalResponseRecords ~704 LOC.

## Milestone J0 — CI bootstrap (do this FIRST; 1–2 versions)

The single largest gap in the three-project system: 781 test classes that only
run on one developer machine.

1. **Maven wrapper**: `mvn wrapper:wrapper`, commit `mvnw`, `mvnw.cmd`,
   `.mvn/wrapper/`. Verify `./mvnw -B -q verify` locally first.
2. **Separate Docker-dependent tests**: tag every `@Testcontainers` test class
   with JUnit 5 `@Tag("docker")`. Configure surefire to exclude `docker` by
   default and add a Maven profile `docker-tests` that includes them. Verify
   `./mvnw -B verify` passes with Docker stopped.
3. **Workflow** `.github/workflows/java-ci.yml`:
   - job `build-test`: ubuntu-latest, temurin JDK 21 (cache maven),
     `./mvnw -B verify` (headless suite).
   - job `docker-tests` (optional, `continue-on-error: true` initially):
     same + `./mvnw -B verify -P docker-tests`.
   - timeout-minutes generous (the suite is large); if runtime is excessive,
     split surefire execution by package across two jobs rather than skipping
     tests.
4. **Check whether `target/` is tracked in git** (audit counted compiled
   classes inside target/ — suspicious). If tracked: add to .gitignore and
   `git rm -r --cached target`.

Gate: green CI run on a real push. This is also the first planner review
checkpoint — request it.

## Milestone J1 — static analysis (1 version)

1. `maven-enforcer-plugin`: require Java 21 and a pinned Maven version.
2. `spotbugs-maven-plugin` with `effort=Default`, failing the build on **new**
   findings only: generate `spotbugs-exclude.xml` baseline from the first run
   for legacy findings, commit it with a "ratchet pool — shrink, never grow"
   header comment.
3. Formatting: `spotless-maven-plugin` with google-java-format, enforced in CI
   via `spotless:check` but applied only to files changed going forward
   (`ratchetFrom 'origin/master'` is Spotless's built-in mechanism for exactly
   this — use it; no repo-wide reformat commit).

Gate: CI fails on a deliberately-introduced violation (prove it once in a
branch), passes on master.

## Milestone J2 — coverage (1 version)

1. `jacoco-maven-plugin` (latest 0.8.x), bound to verify; measure the real
   baseline first, set the line-coverage floor at baseline−2 points, never
   lower it.
2. Surface the report in CI as an artifact.
3. Record the baseline number in this file's progress table — expected to be
   dominated by the ops package's generated-looking classes; if so, configure
   meaningful per-package floors (order/inventory/payment/outbox higher; ops
   lower) instead of one global number.

## Milestone J3 — config & security hardening (1–2 versions)

1. **application-prod.yml**: `spring.h2.console.enabled=false`,
   `spring.jpa.show-sql=false`, hibernate format_sql off, sane logging levels,
   `server.shutdown=graceful` + `spring.lifecycle.timeout-per-shutdown-phase=30s`.
   Document activation (`--spring.profiles.active=prod`) in README. Add a CI
   step that boots the app once with the prod profile (H2 in-memory) and
   asserts /actuator/health (after J4) or the root endpoint responds.
2. **docker-compose.yml**: replace hardcoded `order_app:order_app` with
   `${POSTGRES_USER:-order_app}`-style env substitution; add `.env.example`.
3. **Graceful shutdown of schedulers**: verify OrderExpirationScheduler and
   OutboxPublisher stop cleanly under `server.shutdown=graceful`; add a test if
   feasible, otherwise document observed behavior.
4. **Input validation**: audit request DTOs (CreateOrderRequest first) for
   missing `@Valid`/`@NotNull`/`@Size`/`@Positive` constraints; add
   boundary-condition tests modeled on FailedEventSearchValidationIntegrationTests.

## Milestone J4 — observability (1 version)

1. Add `spring-boot-starter-actuator`; expose health, info, metrics
   (management.endpoints.web.exposure.include=health,info,metrics). Keep the
   port/paths out of any security-sensitive surface.
2. Request correlation: use **Micrometer Tracing**
   (`micrometer-tracing-bridge-brave`) for trace/span ids in logs — NOT Spring
   Cloud Sleuth, which is dead and incompatible with Boot 3. A no-op/log-only
   setup is fine; no Zipkin backend required.
3. Ensure ApiExceptionHandler log statements include the trace id.

## Milestone J5 — docs & release discipline (1 version)

1. **CHANGELOG.md**: start at the current tag; one line per version forward;
   backfill last 10 only.
2. **Version coherence**: keep pom at a real number (0.1.0, drop -SNAPSHOT at
   tag time) or document that git tags vNNNN are authoritative — pick one
   policy, write it in CHANGELOG.md header.
3. **PRODUCTION_READINESS.md**: centralize the scattered boundaries — payment
   is simulated, RabbitMQ consumer off by default, outbox publisher off by
   default, release-approval rehearsal sandbox flags, H2 console policy, role
   guards are config properties (cite application.yml lines), replay gates'
   role matrix (ORDER_SUPPORT / SRE / SYSTEM).

## Milestone J6 — ops-package consolidation (long-running; mirrors Node v2114)

The ops package holds 1,352 of 1,474 classes; Readiness=1,213 source classes.
This is the Java twin of Node's renderer consolidation. Run it AFTER J0–J2 so
CI and coverage protect the refactor.

1. Write `docs/plans/ops-consolidation-roadmap.md` in the Java repo modeled on
   Node's `v2114-governance-consolidation-roadmap.md` (necessity proof,
   scope, stop conditions).
2. Add a **file-count ratchet test** (JUnit): classes under
   `com.codexdemo.orderplatform.ops` ≤ baseline 1352; only decreases allowed.
3. Identify the template families (echo records / receipts / readiness
   builders — start from ReleaseApprovalRehearsalResponseRecords and the
   30+ builder classes), build ONE generic catalog-driven builder, migrate in
   batches of 10–15 with byte-identical JSON/response output proven by existing
   tests; never edit a test expectation.
4. Split OpsEvidenceService (~1478 LOC) by concern once the builder exists.
5. **Frozen paths rule applies**: never rename `a/`–`f/` archives or evidence
   files — orderops-node asserts their exact paths and digests.

## Deviations

(record here when reality contradicts an instruction)

## Progress

| Milestone | Version(s) | State | Evidence |
| --------- | ---------- | ----- | -------- |
| J0 | v1790 | **completed — planner reviewed 2026-06-12** | wrapper (Maven 3.9.9) committed; 4/4 Testcontainers classes tagged `docker` + `disabledWithoutDocker=true`; surefire excludes `docker` by default, `docker-tests` profile re-includes; workflow at git root `D:\javaproj\.github\workflows\maven-ci.yml` (monorepo — deviation accepted); CI run 27397723739 success. Advisory for J1: drop `-q` or upload surefire reports on failure for debuggability. |
| J1 | — | not started | |
| J2 | — | not started | baseline: __% |
| J3 | — | not started | |
| J4 | — | not started | |
| J5 | — | not started | |
| J6 | — | blocked on J0–J2 | |
