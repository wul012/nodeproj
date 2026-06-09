# v1394 code walkthrough

The policy-lock checkpoint reinforces write and execution blocking. The gates keep write routing, source writes, runtime payloads, and sibling mutation as separate conditions.

This makes regressions visible in focused tests and route smoke.
