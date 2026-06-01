# Node v491 Java / mini-kv route catalog cleanup consumer readiness evidence intake

v491 freezes the next sibling evidence window after v490. The important boundary is that Java currently has uncommitted work, so Node does not treat the Java working tree as authoritative. It consumes only the already tagged Java v220-v224 evidence files and the copied historical fixtures inside Node.

## Inputs

- Java v220 evidence digest JSON.
- Java v220 evidence digest static fixture.
- Java v221 evidence digest snapshot freeze JSON.
- Java v222 evidence digest historical compatibility JSON.
- Java v223 evidence digest integrity JSON.
- Java v224 consumer readiness completion JSON.
- mini-kv v202-v209 versioned release fixtures.
- mini-kv v210 explanation note, used only to observe that v210 points back to versioned v209 and that the rolling fixture should not become a historical baseline.

## Boundary

v491 does not start Java or mini-kv, does not run live probes, does not parse raw endpoint URLs, does not read credentials, and does not enable runtime execution. The test also forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` so the service proves it can run from Node-owned frozen evidence.

## Result

The intake records 15 files, 21 checks, and 21 passed checks. It confirms Java v220-v224 are read-only and passed, mini-kv v202-v209 form a sequential versioned continuity chain, and mini-kv v210 is only a latest audit note until a versioned v210 fixture appears.

## Next Step

v492 should expose this intake through the existing Java/mini-kv route catalog cleanup route group as a JSON/Markdown report, then update the route catalog counts.
