# v2013 mini-kv CHECK readers

This version moves mini-kv CHECKJSON readers and validation inputs into the split reader/verification boundary.

The verification still requires read-only `true`, execution allowed `false`, valid fnv1a64 command digest, and matching side-effect count.
