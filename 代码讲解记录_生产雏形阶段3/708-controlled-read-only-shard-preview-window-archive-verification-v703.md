# Node v703 code walkthrough: window archive verification

`WINDOW_ARCHIVE_VERIFICATION` records the future archive digest and section-count verification step.

No archive route is added in this version. The stage ledger keeps the verification obligation visible without growing another receipt chain.

Focused tests verify ordered v703 presence.
