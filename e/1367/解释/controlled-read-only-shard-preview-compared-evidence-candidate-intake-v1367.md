# v1367 compared evidence candidate intake

v1367 adds the signature-envelope intake slot. It tracks the signature envelope requirement separately from approval grant or signed approval capture, which keeps the preflight honest about what has not happened yet.

The guard blocks signed approval and runtime payloads. A real document can be required without implying that approval has been granted or that execution is permitted.
