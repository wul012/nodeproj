# Stage 2 — Operational Reality Program (all four projects)

STATUS: **INACTIVE — GATED**. No step in this program or its four briefs may execute until
the Stage-1 final-acceptance review (`production-excellence-final-acceptance.md`) is PASS
for the repo in question, and the integration capstone C1–C4 is PASS for the program as a
whole. Designed 2026-07-06 by Claude (planner/final reviewer) so the next stage starts
deliberately, not improvised. At activation, every assumption below must be re-verified
(step-0 sections); where reality disagrees, reality wins and the deviation is recorded.

## Thesis

Stage 1 ends with four rigorously engineered repos and a one-command proof they can talk
read-only. Stage 2 makes the system OPERATE: composed runtime, real deployment on the
Azure Linux VM, security depth proportional to exposure, measured performance, and drills
that produce receipts. Nothing here changes domain semantics: order authority, promotion
authority, no-execution boundaries, and read-only evidence flows all carry over unchanged.
Deployment grants NO new authority — a deployed evidence endpoint is still read-only.

## The four briefs

- Node (composed-runtime + deployment owner): `docs/plans/stage2-node-operational-brief.md`
- Java: `docs/plans/stage2-java-operational-brief.md`
- mini-kv: `D:\C\mini-kv\治理计划\stage2-minikv-operational-brief.md`
- aiproj: `D:\aiproj\docs\stage2-aiproj-operational-brief.md`

## Shared facts and constraints (re-verify at activation)

- Target host: the existing Azure Ubuntu VM (`azure-linux`, 20.89.23.122; mini-kv already
  cloned at `/home/azureuser/mini-kv`; user accesses via FinalShell; local proxy needs a
  DIRECT rule for this IP). Known specs (Azure portal, 2026-07-06): **Standard B2ats v2 —
  2 vCPU, 1 GiB RAM**, Ubuntu 24.04, Japan East, Azure for Students subscription, dynamic
  public IP, no DNS name. 1 GiB cannot hold the full composed stack (JVM alone needs
  ~0.5 GiB); the working plan is: **resize to B2als v2 (2 vCPU, 4 GiB, same x86 family)
  for the Stage-2 deployment window and the 14-day soak, then resize back down** —
  deallocate → resize → start, minutes of work. Budget note: ~US$16–20 of student credit
  for the soak fortnight at 4 GiB (verify current Japan East rates before resizing).
  Caution: deallocation may release the dynamic public IP — either attach a static IP
  first or update the Clash DIRECT rule and any hardcoded references after resize.
  If the user declines to resize, fallback rung (c) applies as designed.
- All three services already build/test on Ubuntu in CI; aiproj is Python.
- No domain name is assumed. TLS uses Caddy's internal CA or self-signed certs with the
  trade-off documented; certificates are still mandatory for anything exposed.

## Security posture for the VM (non-negotiable, precedes any service start)

1. Default-deny NSG/firewall: inbound allowlist = SSH (key-only, no password auth) + at
   most ONE public HTTPS port (443, reverse proxy). Every service binds localhost/unix
   sockets; nothing else is reachable from the internet. H2 console, actuator, metrics,
   dashboards: never exposed without auth.
2. The reverse proxy fronts everything with token auth (shared bearer token minimum;
   per-service tokens preferred). Unauthenticated surface = health probe only.
3. Secrets live in VM env files with 600 perms, never in git, never in receipts. A
   committed `secrets-handling.md` documents every credential, where it lives, and how to
   rotate it.
4. Fail condition: any service found listening publicly without auth at review time =
   the phase fails, no partial credit.

## Phases (system-level; per-repo detail in the briefs)

- **Phase 0 — VM census + hardening** (Node session owns; 1 version): OS/RAM/disk/CPU
  census; SSH hardening; firewall; swap; docker + compose installed; memory budget table
  written for the composed system. Fallback ladder if the VM is small: (a) full compose;
  (b) Java+Postgres and Node on VM, mini-kv native binary (it is tiny), aiproj artifacts
  static; (c) minimum: Node + mini-kv + static aiproj artifacts, Java booted on demand
  for drills. The census decides; the choice is written down with numbers.
- **Phase 1 — composed runtime, locally** (Node leads; Java/mini-kv provide artifacts):
  one compose file boots Java(+Postgres) + Node + mini-kv service; an end-to-end scenario
  suite drives real HTTP through Node into Java evidence reads and fresh mini-kv output
  validation; contract-drift tests run against the composed stack. Acceptance: one
  command up, one command test, one command down, on the dev machine.
- **Phase 2 — deploy to the VM**: the same composed definition deployed under systemd (or
  compose-with-restart-policy); reverse proxy + TLS + tokens; log rotation; a minimal
  monitoring loop (health-probe cron writing a committed-format status log the dashboard
  reads — no heavy monitoring stack on a small VM).
- **Phase 3 — depth, in parallel per repo** (each brief): fuzzing (mini-kv), dependency
  scan gates (all), load tests + committed SLOs (Node/Java/mini-kv/aiproj-inference),
  backup/restore + kill-recovery drills with receipts.
- **Phase 4 — the soak**: 14 days of the composed system running on the VM. Weekly drill
  receipts (restart drill, backup-restore drill, one induced-failure recovery). The Node
  dashboard aggregates all four projects' health/evidence into one page — the single
  screen that tells the truth about the system. Soak ends with the final review.

## Acceptance bar (strict)

1. One command reproduces the composed stack locally; the reviewer runs it fresh.
2. Live probes of the VM endpoints (through the authed proxy) succeed at review time;
   the unauthenticated surface is exactly the health probe and nothing else.
3. Every drill has a receipt with digests and timestamps; the reviewer re-executes at
   least one drill end-to-end rather than trusting receipts.
4. Load tests hit the committed SLOs; SLO numbers live in version control with the
   harness that produced them; a rerun at review must reproduce within stated variance.
5. Fuzzers have accumulated the brief-specified CPU-hours with zero open crashes.
6. 14-day soak completed with the dashboard green ≥ 99% of probe intervals, gaps explained.
7. Docs honesty: maturity claims upgraded ONLY to what the evidence shows — the honest
   end-state label is `operational on one VM with drills and SLOs`, which is still not
   "production"; no doc may say production.

## Discipline carried over from Stage 1

Frozen archive paths; per-repo AGENTS conventions (versions, walkthroughs, cleanup gates,
tags, CI); ratchets only tighten; one theme per version; review checkpoints after every
phase per repo; a checkpoint claim the reviewer cannot reproduce = checkpoint fail.
