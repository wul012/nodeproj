# v1986 Node source adapter

This version moves the Node v245 precheck packet adapter into the references module.

The adapter still reads the same source profile and preserves every no-execution boundary: no connection, no credential read, no schema migration, no managed-audit write, and no automatic upstream start.
