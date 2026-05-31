# Node v407 cleanup proof

- Generated at: 2026-05-31T06:31:36.3536465Z
- Revised at: 2026-05-31T06:32:22.6537206Z
- Owned PIDs: 6576, 24416, 4364, 29012, 3216
- Checked ports: 8080, 6424, 4407, 8407
- After process count: 0
- After listening socket count: 0
- After TIME_WAIT count: 2
- Cleanup passed: True
- Criterion: owned processes stopped and no checked port remains in LISTEN state; TIME_WAIT is recorded but not a live listener

## Stop Results

- pid=6576 stopped=True name=java
- pid=24416 stopped=True name=java
- pid=4364 stopped=True name=minikv_server
- pid=29012 stopped=True name=node
- pid=3216 stopped=True name=python

## Boundary

- Stopped only PIDs recorded for this v407 smoke run.
- No broad Node/Java process kill was used.
- Ports 8080, 6424, 4407, and 8407 had no LISTEN sockets after cleanup.
- TIME_WAIT rows, if any, are retained as TCP close tail evidence.
