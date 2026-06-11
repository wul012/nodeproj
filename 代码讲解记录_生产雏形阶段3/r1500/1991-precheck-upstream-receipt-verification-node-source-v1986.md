# v1986 code walkthrough

`createSourceNodeV245` now lives with the other reference builders.

It maps the source Node v245 precheck packet into the compact shape consumed by checks and profile assembly, preserving the original read-only and no-execution flags.
