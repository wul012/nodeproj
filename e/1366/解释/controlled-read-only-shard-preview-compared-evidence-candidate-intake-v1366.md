# v1366 compared evidence candidate intake

v1366 adds the identity-digest intake slot. It keeps identity and digest lineage visible as a first-class intake requirement instead of burying those fields inside a larger candidate report.

The guard rejects synthetic digest material and prevents import of unreviewed candidate payloads. The aggregate still reports zero real candidate documents and zero accepted payloads.
