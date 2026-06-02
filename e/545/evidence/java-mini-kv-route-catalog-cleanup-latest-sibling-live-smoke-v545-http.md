# Java / mini-kv route catalog cleanup latest sibling live smoke v545

- Generated at: 2026-06-02T07:58:33.8352104Z
- Smoke state: ready
- Ready: True
- Records: 9/9 passed
- Checks: 14/14 passed
- Cleanup passed: True
- Local HTTP proxy bypass: --noproxy *

## Records

### node-health
- Project: node
- Protocol: http
- Method/command: GET
- Target: http://127.0.0.1:4190/health
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: af6acc03e89ac9a8fce9eadae4db15980ac35d53f66a18e07e379296ef174a0f

### node-latest-sibling-archive-verifier-json
- Project: node
- Protocol: http
- Method/command: GET
- Target: http://127.0.0.1:4190/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: 34c25535a74b9b9194c9f350cf374057ea74372c9dd45b6fb60f2cdca961844e

### node-latest-sibling-archive-verifier-markdown
- Project: node
- Protocol: http
- Method/command: GET
- Target: http://127.0.0.1:4190/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification?format=markdown
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: a81ea30ccad03b0f33c9357bbfb3570bfb794fb3484464f1eabefab4df895517

### java-health
- Project: java
- Protocol: http
- Method/command: GET
- Target: http://127.0.0.1:8080/actuator/health
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: b9613659d8f4412c778e34293d5b865fb188c5814379ee3bfb8c819432e70020

### java-ops-evidence
- Project: java
- Protocol: http
- Method/command: GET
- Target: http://127.0.0.1:8080/api/v1/ops/evidence
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: 465bdcf3161abc9840c878bb872415577eec7e717599122e9479f4ed5ce5a2ed

### mini-kv-health
- Project: mini-kv
- Protocol: tcp-inline
- Method/command: HEALTH
- Target: 127.0.0.1:6524
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: b9c5cd332d93c175f3b1702a5a34e0caa67eff3e74cc7b56ab8345f0a11d3e66

### mini-kv-command-catalog
- Project: mini-kv
- Protocol: tcp-inline
- Method/command: COMMANDSJSON
- Target: 127.0.0.1:6524
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: 9df1c9938a71b0bf7e94219b6b82f503989f22db4173b6b4c36ea96f26743f0f

### mini-kv-shard-readiness
- Project: mini-kv
- Protocol: tcp-inline
- Method/command: SHARDJSON
- Target: 127.0.0.1:6524
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: 9efbcb4ce41dadcfb50a358e9a10b65f8565a99da3f750abc87cd340dd90d62e

### mini-kv-quit
- Project: mini-kv
- Protocol: tcp-inline
- Method/command: QUIT
- Target: 127.0.0.1:6524
- Status: pass
- Read only: True
- Mutates state: False
- Evidence digest: 261fa6237ad8115cff739fc4ffceb1c24507b311917c138e2f331740aafd0127

## Cleanup
- Started process count: 4
- After-listening socket count: 0
- Dist removed: True
- Cleanup proof: e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-cleanup-proof.json
