# Node v692 code walkthrough: window owner binding

`ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger` starts with `WINDOW_OWNER_BINDING`.

This stage requires explicit Node, Java, and mini-kv process ownership before any live read-only window can open. It has `cleanupRequired=true`, `startsServices=false`, and `productionExecutionAllowed=false`.

Focused test coverage verifies the stage appears as Node v692 and remains read-only.
