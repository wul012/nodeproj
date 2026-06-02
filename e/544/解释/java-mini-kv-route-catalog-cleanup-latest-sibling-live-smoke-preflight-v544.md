# Node v544 explanation: latest sibling live smoke preflight

v544 prepares the actual three-project local read-only smoke that will run in v545.

The version does not start Java, mini-kv, or Node services. It records the concrete contract:

- Node runs on `127.0.0.1:4190` after `npm run build`;
- Java runs on `127.0.0.1:8080` with `mvn spring-boot:run -Dspring-boot.run.profiles=local`;
- mini-kv runs on `127.0.0.1:6524` with `.\cmake-build-debug\minikv_server.exe 6524 127.0.0.1`;
- read targets are Node health plus the latest archive verifier route, Java health plus ops evidence, and mini-kv `HEALTH`, `COMMANDSJSON`, `SHARDJSON`, `QUIT`;
- cleanup stops only PIDs started by v545 and verifies all three ports are no longer listening.

The source gate is the v543 route for the v542 archive verifier. That route remains ready, and the preflight marks the next execution version as Node v545.

Validation completed for this version:

- focused preflight test;
- TypeScript typecheck;
- build.

No sibling services were started in v544.
