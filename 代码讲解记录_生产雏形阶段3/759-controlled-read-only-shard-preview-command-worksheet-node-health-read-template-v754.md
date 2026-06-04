# Node v754 code walkthrough: command worksheet Node health read template

v754 adds the Node health read command template.

Key code:

- `WORKSHEET_NODE_HEALTH_READ_TEMPLATE` targets `node-http`.
- The template records header use without storing header values.

This prepares a manual health read without starting a server.

Verification: covered by the command worksheet focused test.
