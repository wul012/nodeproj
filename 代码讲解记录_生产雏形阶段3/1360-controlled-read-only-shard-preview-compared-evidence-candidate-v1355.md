# v1355 code walkthrough

The comparison-result section combines offline comparison result with synthetic-evidence exclusion. The builder requires the source evaluation rules to be ready, then still records zero real and synthetic candidate values.

This keeps "comparison performed" separate from "comparison accepted" and prevents generated fixtures from satisfying the real-candidate path.
