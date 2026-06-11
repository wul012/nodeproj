# v2014 inference helpers

This version moves failed-event id inference and mini-kv command inference into the readers module.

The service uses these helpers before attempting Java or mini-kv probes, preserving the old missing-context behavior.
