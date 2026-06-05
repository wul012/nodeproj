# Node v785 code walkthrough: evidence packet sibling cleanup record

v785 adds sibling cleanup evidence shape.

`EVIDENCE_SIBLING_CLEANUP_RECORD` sets `cleanupRequired=true`, and owner `crossProject` preserves Java and mini-kv lifecycle ownership.

Verification: covered by the evidence packet focused test.
