# v1994 code walkthrough

The entrypoint exports the same loader, renderer, and profile type as before.

Routes and tests keep importing the same module path, so this refactor is internal to the service boundary.
