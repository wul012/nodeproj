# v1536 operator evidence value supply approval profile section renderer split

v1536 moves approval packet draft, approval packet review, and signed approval template rendering into a packet renderer.

This version stays inside the Node renderer-maintenance lane. It does not create a new approval chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for approval packet/template and signed approval capture route sections while public controlled read-only shard preview Markdown remains stable.
