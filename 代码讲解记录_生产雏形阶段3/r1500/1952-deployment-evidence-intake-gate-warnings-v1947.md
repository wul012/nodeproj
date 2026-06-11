# Code walkthrough - Node v1947

## Focus

Extract warnings and recommendations.

## Code reading notes

- `collectWarnings` and `collectRecommendations` moved to policy.
- Blocked and ready states still produce different operator-facing codes.
- The entrypoint simply includes the returned messages in the profile.

## Maintenance rule

Keep operator-facing policy text in policy, not in the loader.
