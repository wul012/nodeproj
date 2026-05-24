# Java v148 sandbox connection response records split

## Scope

This version is a Java-only quality pass. The active Node plan still points at the Java v147 echo lane, which is already complete, so v148 avoids a new echo contract and focuses on maintainability.

`ReleaseApprovalRehearsalResponseRecords.java` previously carried the sandbox connection packet response records together with the older release approval response records. v148 moves the sandbox connection record group into:

```text
ReleaseApprovalRehearsalSandboxConnectionResponseRecords.java
```

## What Moved

The new record container owns the sandbox connection response model family:

- operator handoff marker records
- preflight echo marker records
- precondition receipt records
- dry-run envelope receipt records
- operator window checklist receipt records
- dry-run command package receipt records
- precheck packet receipt records

The original `ReleaseApprovalRehearsalResponseRecords.java` keeps the older request, hint, managed audit adapter, taxonomy, verification, input, live signal, and execution boundary records.

## Behavior

No response fields, constructor argument order, schema values, digest inputs, or warning semantics changed. Call sites now reference:

```text
ReleaseApprovalRehearsalSandboxConnectionResponseRecords.<record>
```

instead of:

```text
ReleaseApprovalRehearsalResponseRecords.<record>
```

for the moved sandbox connection records.

## Resulting File Sizes

```text
ReleaseApprovalRehearsalResponseRecords.java: 624 lines
ReleaseApprovalRehearsalSandboxConnectionResponseRecords.java: 616 lines
OpsEvidenceService.java: 1037 lines
```

This keeps the response model below the previous 1200+ line shape and gives future sandbox connection changes a dedicated file.

## Verification

```powershell
mvn -q -DskipTests compile
mvn -q -DskipTests test-compile
mvn -q "-Dtest=OpsEvidenceServiceSandboxConnectionPacketEchoTests" test
mvn -q test
```

Result: passed.
