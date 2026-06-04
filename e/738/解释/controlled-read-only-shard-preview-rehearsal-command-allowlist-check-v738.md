# v738 Controlled read-only shard preview rehearsal command allowlist check

v738 adds the mini-kv command allowlist check to the rehearsal packet.

It records `REHEARSAL_COMMAND_ALLOWLIST_CHECK`, mapping to `MINI_KV_COMMAND_ALLOWLIST`. The step confirms the future rehearsal is restricted to the allowed read-only command shape and still reports `writesAllowed=false`.

Cross-project status: mini-kv can keep improving its own read-only contract in parallel. Node is not requesting a live run.

Verification: covered by the v732-v751 rehearsal packet focused test and final batch validation.
