# v1983 boundary

This version starts the v247 precheck upstream receipt verification split.

The public route, loader, renderer export, profile version, and safety states stay unchanged. The work only separates responsibilities so later maintenance does not keep adding evidence parsing, policy checks, and rendering into one service file.

Java and mini-kv are parallel-safe here because Node consumes existing Java v99 and mini-kv v108 evidence only.
