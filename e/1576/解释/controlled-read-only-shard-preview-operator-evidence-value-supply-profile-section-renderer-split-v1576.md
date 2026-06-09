# v1576 operator evidence value supply profile section renderer split

v1576 confirms the main live-window profile renderer no longer owns operator evidence import or value supply field renderers.

This version stays inside the Node renderer-maintenance lane. It does not create a new evidence chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for operator evidence import/value draft and fresh sibling/value supply envelope route sections while public controlled read-only shard preview Markdown remains stable.
