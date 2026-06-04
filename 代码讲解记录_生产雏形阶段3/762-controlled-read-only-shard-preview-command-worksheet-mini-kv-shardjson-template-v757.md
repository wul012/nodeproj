# Node v757 code walkthrough: command worksheet mini-kv SHARDJSON template

v757 adds the mini-kv command template.

Key code:

- `WORKSHEET_MINI_KV_SHARDJSON_TEMPLATE` targets `mini-kv-tcp`.
- The worksheet keeps `writesAllowed=false` and `startsServices=false`.

This preserves the mini-kv read-only command path for future manual review.

Verification: covered by the command worksheet focused test.
