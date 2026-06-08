# v1364 compared evidence candidate intake

v1364 adds the operator-provenance intake slot. It carries the operator identity and provenance fields into the intake preflight so future real documents can be checked before payload import.

The guard blocks approval grants and signed approvals because provenance is still only a required document slot. This version does not start services, write state, or mutate Java or mini-kv.
