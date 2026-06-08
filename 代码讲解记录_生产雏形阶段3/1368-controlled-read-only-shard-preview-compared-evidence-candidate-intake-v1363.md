# v1363 code walkthrough

The catalog adds the artifact-shape intake slot template and pairs it with a generated guard template. The guard kind is derived from the slot kind through an explicit map, keeping the relationship type-safe and avoiding a brittle string cast.

The artifact assembler includes the slot in the digest so future changes to artifact-shape intake requirements will be visible in archive comparisons.
