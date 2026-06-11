# Node v706 code walkthrough: window receipt archive

`WINDOW_RECEIPT_ARCHIVE` records the future receipt archive stage.

It stores only digest and count expectations, not secrets or runtime payloads.

Focused tests verify safety flags across all stages.
