# v1366 code walkthrough

The identity-digest intake slot keeps identity and digest lineage out of an oversized artifact file. Types, catalog, builder, artifacts, and renderer are split so each module owns one maintenance boundary.

The focused test checks field uniqueness across all intake slots. That protects the future real-document path from silently duplicating or dropping one of the twenty candidate fields.
