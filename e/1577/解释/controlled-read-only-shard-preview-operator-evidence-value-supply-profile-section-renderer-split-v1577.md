# v1577 operator evidence value supply profile section renderer split

v1577 keeps the new import and envelope renderers around one hundred lines each.

This version stays inside the Node renderer-maintenance lane. It does not create a new evidence chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for operator evidence import/value draft and fresh sibling/value supply envelope route sections while public controlled read-only shard preview Markdown remains stable.
