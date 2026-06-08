# v1378 code walkthrough

The evidence-handle request item keeps durable handle requirements explicit. It does not create handles, start services, or read sibling state.

The digest includes request item codes, source slot/guard coverage, candidate fields, acceptance checks, and gates so archive comparisons can detect requirement drift.
