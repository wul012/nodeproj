# v1529 signed approval artifact draft text package profile section renderer split

v1529 confirms the main live-window profile renderer no longer owns text package field renderers.

This version stays inside the Node renderer-maintenance lane. It does not create a new approval chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for text package submission and compared-evidence route sections while public controlled read-only shard preview Markdown remains stable.
