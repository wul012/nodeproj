# Node v736 code walkthrough: rehearsal mini-kv target dry run

v736 adds the mini-kv target dry run.

Key code:

- `REHEARSAL_MINI_KV_TARGET_DRY_RUN` maps to `MINI_KV_TARGET_CHECKLIST`.
- The step owner is `miniKv`, but Node still reports `startsServices=false`.

The packet can now show all three target families: Node, Java, and mini-kv.

Verification: covered by the rehearsal packet focused test.
