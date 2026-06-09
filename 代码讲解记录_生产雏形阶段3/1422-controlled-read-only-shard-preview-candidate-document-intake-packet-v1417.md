# v1417 code walkthrough

The evidence-policy slot carries evidence handle and policy lock checkpoints into intake preparation. The builder marks the slot ready only when matching v1411 checkpoints and validators are ready.

The no-side-effect gates continue to block service starts and sibling mutation.
