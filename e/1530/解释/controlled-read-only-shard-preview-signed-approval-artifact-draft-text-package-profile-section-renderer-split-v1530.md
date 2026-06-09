# v1530 signed approval artifact draft text package profile section renderer split

v1530 documents focused tests, typecheck, build, HTTP smoke, split full tests, and cleanup before commit.

This version stays inside the Node renderer-maintenance lane. It does not create a new approval chain, does not import runtime payloads, does not write sibling project files, and does not require Java or mini-kv services to start.

The practical maintenance result is a smaller live-window renderer and local ownership for text package submission and compared-evidence route sections while public controlled read-only shard preview Markdown remains stable.
