# v1990 code walkthrough

`createChecks` lives in the policy module and returns the same check map as before.

The entrypoint still computes the aggregate ready flag by requiring every other check to pass.
