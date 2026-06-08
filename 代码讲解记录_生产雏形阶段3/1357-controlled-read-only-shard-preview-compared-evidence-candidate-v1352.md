# v1352 code walkthrough

The compared evidence candidate layer starts with source lineage. The catalog maps v1351 `source-intake-readiness-evaluation-rule` and `digest-lineage-evaluation-rule` into one section, and the builder checks that both source rules and their guards are ready before marking the section ready.

The artifact remains read-only: candidate value count, materialized count, accepted count, approval grant, signed approval, execution, writes, runtime payload import, and sibling mutation all stay disabled.
