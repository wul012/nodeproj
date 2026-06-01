# Node v501 post Java / mini-kv route catalog cleanup readiness handoff evidence intake roadmap

## Goal

Node v501 consumes the latest clean sibling evidence window after v500:

- Java v225-v231 readiness handoff evidence.
- mini-kv v211-v212 versioned post-closeout retention fixtures.

Current dirty sibling work is explicitly excluded:

- Java has v232-like uncommitted work.
- mini-kv has v213-like uncommitted work.

## Cross-Project State

Java and mini-kv are recommended parallel. Node v501 consumes only clean tagged/frozen evidence and does not require either sibling project to stop work.

## Necessity Proof

- Blocker resolved: after v500, Java and mini-kv had newer clean tags that Node could safely consume, while both also had dirty next-version work that must be excluded.
- Later consumer: v502 will expose this intake as a report route.
- Existing reports are not enough: v491 covers Java v220-v224 and mini-kv v202-v209/v210 note; it does not cover Java v225-v231 or mini-kv v211-v212.
- Growth stop condition: this five-version chain ends at v505 archive verifier route; future work should wait for the next clean tagged evidence window.

## Implementation Plan

- Copy clean tagged evidence into Node historical fixtures.
- Add typed intake service.
- Add focused normal + forced fallback tests.

## Validation Plan

- Run focused intake test.
- Run typecheck.
- Do not add a route in v501.
