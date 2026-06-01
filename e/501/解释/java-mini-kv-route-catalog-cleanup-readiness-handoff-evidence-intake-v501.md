# Node v501 Java / mini-kv route catalog cleanup readiness handoff evidence intake

v501 consumes the latest clean sibling evidence while excluding dirty current work.

## Inputs

- Java v225 readiness handoff JSON and fixture.
- Java v226-v231 readiness handoff guard JSON files.
- mini-kv v211 and v212 versioned release fixtures.

## Boundary

Java's current v232-like worktree changes are not consumed. mini-kv's current v213-like worktree changes are not consumed. Node reads only clean, copied historical fixtures and does not start sibling services.

## Result

The intake records 10 files and 16/16 checks passed. Java latest clean evidence is v231. mini-kv latest clean versioned fixture is v212.

## Next Step

v502 should expose this intake as a JSON/Markdown report route.
