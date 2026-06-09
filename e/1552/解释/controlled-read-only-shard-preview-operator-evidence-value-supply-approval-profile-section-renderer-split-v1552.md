# v1552 operator evidence value supply approval profile section renderer split

v1552 keeps the new packet and capture renderers under roughly 220 lines each.

This version stays inside the Node renderer-maintenance lane. It does not create a new approval chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for approval packet/template and signed approval capture route sections while public controlled read-only shard preview Markdown remains stable.
