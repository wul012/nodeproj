# v1368 code walkthrough

The evidence-handle intake slot prepares the future import path to require durable source handles. The current version does not generate handles, import payloads, or read sibling state.

The artifact blocked-reason logic is deliberately conservative: if the source blueprint is not ready, slots or guards are not ready, or any side-effect allowance becomes true, the intake state becomes `blocked`.
