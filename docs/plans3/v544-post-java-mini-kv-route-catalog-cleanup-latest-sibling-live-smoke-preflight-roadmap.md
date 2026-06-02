# Node v544 post Java / mini-kv route catalog cleanup latest sibling live smoke preflight roadmap

## Goal

Node v544 writes the concrete preflight contract for the next local three-project read-only live smoke.

## Cross-Project State

Java and mini-kv may be started by Node in the next execution version because the current thread grants cross-project local startup permission. This version still does not start either sibling service; it records the owner, command, port, read target, fail-closed condition, and cleanup rule that Node v545 must follow.

## Necessity Proof

- Blocker resolved: after v543, the next useful work is a real local read smoke, but the startup/cleanup details were still scattered across old Java, mini-kv, and Node records.
- Later consumer: Node v545 consumes this preflight to run the actual read-only smoke.
- Existing report cannot be reused: v543 only exposes archive verification; older v407 runtime smoke used older Java/mini-kv versions and does not cover Java v274 plus mini-kv v247 latest sibling evidence.
- Growth stop condition: one preflight package, then execute. Do not add another planning-only package unless a port, command, or cleanup proof is missing.

## Startup And Cleanup Contract

- Node: `D:\nodeproj\orderops-node`, port `4190`, safe env, `node dist/server.js` after build.
- Java: `D:\javaproj\advanced-order-platform`, port `8080`, `mvn spring-boot:run -Dspring-boot.run.profiles=local`.
- mini-kv: `D:\C\mini-kv`, port `6524`, `.\cmake-build-debug\minikv_server.exe 6524 127.0.0.1`.
- Cleanup: stop only PIDs started by the Node v545 task, then verify ports `4190`, `8080`, and `6524` have no `LISTENING` sockets.
- Fail closed: if a required port is occupied by an unknown PID, do not terminate it; record the blocker.

## Validation Plan

- Add a typed preflight service and Markdown renderer.
- Assert the source v543 archive route is ready.
- Assert all startup commands, loopback ports, GET/TCP read targets, and cleanup rules are present.
- Run the focused preflight test.
- Run typecheck and build.
- Remove `dist` before commit.
