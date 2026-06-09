# v1502 signed approval artifact draft profile section renderer split

v1502 keeps the extracted module as a pure renderer using existing profile types.

This version stays inside the Node renderer-maintenance lane. It does not create a new approval chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is smaller ownership around signed approval artifact draft route sections while the public controlled read-only shard preview Markdown remains stable.
