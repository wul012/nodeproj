# Node v738 code walkthrough: rehearsal command allowlist check

v738 adds the mini-kv command allowlist check.

Key code:

- `REHEARSAL_COMMAND_ALLOWLIST_CHECK` maps to `MINI_KV_COMMAND_ALLOWLIST`.
- The step keeps `writesAllowed=false` and `automaticServiceStart=false`.

The packet records that later mini-kv interaction must stay in read-only command space.

Verification: covered by the rehearsal packet focused test.
