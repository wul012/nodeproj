# Node v694 code walkthrough: Java read target spec

`JAVA_READ_TARGET_SPEC` records the Java side of the future live read-only window.

The code keeps Java as an explicitly owned sibling process and only describes read-only GET evidence. Node does not start Java in this version.

Focused tests verify the stage order and no-write flags.
