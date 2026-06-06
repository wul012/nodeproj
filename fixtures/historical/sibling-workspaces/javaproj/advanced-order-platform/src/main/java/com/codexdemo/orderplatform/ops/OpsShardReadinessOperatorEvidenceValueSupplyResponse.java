package com.codexdemo.orderplatform.ops;

record OpsShardReadinessOperatorEvidenceValueSupplyResponse(
        boolean readyForOperatorValueSupplyEnvelope,
        String suppliedValueState,
        String redactionState,
        String provenanceState,
        boolean readyForOperatorValueSubmission,
        boolean readyForEvidenceImport,
        boolean readyForRuntimePayload
) {
}
