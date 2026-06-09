# v1449 candidate document material submission precheck

v1449 adds the document-origin checkpoint. It requires stable document source URI and SHA-256 digest material so a future reviewer can identify the exact candidate document before submission.

The precheck only records the requirement. It does not fetch the URI, load a document body, trust an external digest, stage material, or mutate sibling project state.
