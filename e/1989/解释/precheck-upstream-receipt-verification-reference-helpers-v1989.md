# v1989 reference helpers

This version keeps evidence-file hashing, snippet matching, JSON parsing, field extraction, and array comparison private to the references module.

That keeps historical evidence mechanics close to Java and mini-kv reference creation without leaking helper APIs into unrelated services.
