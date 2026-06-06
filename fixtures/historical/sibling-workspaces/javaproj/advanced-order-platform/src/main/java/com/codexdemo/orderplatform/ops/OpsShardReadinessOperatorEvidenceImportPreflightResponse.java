package com.codexdemo.orderplatform.ops;

import java.util.List;

public record OpsShardReadinessOperatorEvidenceImportPreflightResponse(
        boolean readyForOperatorEvidenceImportPreflight,
        boolean readyForEvidenceImport,
        boolean readyForManualEvidenceEntry,
        boolean readyForProductionExecution,
        List<String> checks
) {
}
