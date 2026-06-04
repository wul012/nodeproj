# Node v695 code walkthrough: mini-kv read target spec

`MINI_KV_READ_TARGET_SPEC` records mini-kv read-only commands for the future window.

The stage points at `SHARDJSON` and `SHARDROUTEVERIFYREPORTJSON`; forbidden write/admin commands stay out of the window.

Focused tests verify no automatic service start and no mutation.
