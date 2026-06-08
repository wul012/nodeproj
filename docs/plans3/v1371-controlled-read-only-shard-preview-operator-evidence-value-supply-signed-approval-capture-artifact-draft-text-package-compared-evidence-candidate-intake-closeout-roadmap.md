# v1371 controlled read-only shard preview compared evidence candidate intake closeout roadmap

## Scope

Node v1362-v1371 adds the compared evidence candidate intake preflight layer after Node v1361 compared evidence candidate blueprint.

The new layer converts the ten blueprint sections into ten intake slots and ten intake guards. It carries the twenty required candidate fields forward, keeps real document counts at zero, blocks synthetic documents, blocks payload import, blocks candidate evaluation, blocks approval grant, blocks signed approval, blocks runtime payloads, blocks writes, and blocks sibling mutation.

The aggregate reports `Node v1371`, source candidate `Node v1361`, ten slots, ten guards, twenty required fields, thirty-six passed gates, and the state `waiting-for-real-compared-package-evidence-candidate-document`.

## Necessity proof

- Blocker resolved: v1361 grouped the candidate blueprint, but there was no intake preflight that could tell future operators exactly which real compared evidence candidate document slots must be supplied.
- Later consumer: future real-candidate document intake can consume these ten slot and guard records without scanning blueprint sections and blockers directly.
- Existing report cannot be reused: the v1361 blueprint is a candidate shape, not an intake control. The intake layer adds missing-document rejection, synthetic-document rejection, unreviewed-document quarantine, payload import blocking, evaluation blocking, approval blocking, runtime blocking, write blocking, and sibling-mutation blocking.
- Stop condition: this chain stops at preflight readiness until a real compared package evidence candidate document exists. No additional readiness echo should be added unless it is consumed by a concrete real-document intake or shard preview execution path.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1362-v1371 consumes the frozen v1361 Node candidate blueprint and historical sibling fallback path; it does not require fresh Java or mini-kv evidence.

Java and mini-kv can continue preparing durable read-only evidence handles, identity/digest lineage, approval separation, and archive closeout references. Node is not a pre-approval blocker for those projects in this version range.

If fresh upstream evidence is introduced later, Node should only wait when the next version explicitly names the required Java and mini-kv versions and the concrete files or route payloads to consume.

## Maintenance split

The implementation keeps five new files instead of one oversized module:

- intake types: public contracts and gate shape;
- intake catalog: declarative slot and guard templates;
- intake builder: blueprint-to-slot and slot-to-guard mapping;
- intake artifacts: gate aggregation, blocked reasons, digest, and top-level artifact;
- intake renderer: archive Markdown rendering.

The type module catalog records these five ownership groups and moves the stable profile entry to order 184.

## Closeout checks

- typecheck
- focused candidate/intake/routes/barrel/type-catalog tests
- build
- HTTP smoke after build
- full test chunks before commit when time permits
- archive integrity for v1362-v1371 explanation and walkthrough files
- path length check for new compared evidence candidate intake modules
- cleanup of .tmp, dist, and smoke server before final
