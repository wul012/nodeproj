# Node v543 post Java / mini-kv route catalog cleanup latest sibling evidence archive verification route roadmap

## Goal

Node v543 exposes the v542 latest sibling evidence archive verifier as a JSON/Markdown audit route.

## Cross-Project State

Java and mini-kv may be started by Node in later live-smoke versions, but v543 only exposes a Node archive verifier. No upstream service startup is required.

## Necessity Proof

- Blocker resolved: v542 verifier was internal and not available as a public JSON/Markdown route.
- Later consumer: a follow-up closeout or live-smoke preflight can reference this public verifier route as the latest stable evidence gate.
- Existing route cannot be reused: v536 exposed the CI/catalog health verifier, not the Java v274 / mini-kv v247 latest sibling evidence verifier.
- Growth stop condition: expose one verifier route and update catalog counts. Do not add another archive layer before deciding whether the next work is live-smoke preflight.

## Validation Plan

- Register the verifier under the existing cleanup handoff route group.
- Update route catalog counts from 224/60/26 to 225/61/27.
- Keep historical v540/v542 route catalog source snapshots at 224/60/26.
- Run focused route/catalog/quality tests.
- Run typecheck and build.
- Remove `dist` before commit.
