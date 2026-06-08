# Node v1316 signed approval artifact draft text package comparison acceptance precheck

Node v1316 adds the source evidence handle acceptance checkpoint. It groups the three source-evidence comparison lanes from Node v1311 and requires future compared package evidence to reference existing source handles.

The guard rejects acceptance if those source handles are missing or if the acceptance path tries to import fresh runtime payloads. This keeps the chain compatible with historical fallback fixtures and sibling evidence archives.

The version does not start Java, does not start mini-kv, and does not mutate either sibling project.

Java and mini-kv remain recommended parallel; Node v1316 only records downstream acceptance precheck structure.
