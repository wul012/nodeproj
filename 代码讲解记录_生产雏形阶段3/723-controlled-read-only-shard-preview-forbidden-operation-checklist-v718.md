# Node v718 code walkthrough: forbidden operation checklist

`FORBIDDEN_OPERATION_CHECKLIST` maps to `FORBIDDEN_OPERATION_POLICY`.

It keeps write routing, active routing activation, and mini-kv write/admin commands outside the package.
