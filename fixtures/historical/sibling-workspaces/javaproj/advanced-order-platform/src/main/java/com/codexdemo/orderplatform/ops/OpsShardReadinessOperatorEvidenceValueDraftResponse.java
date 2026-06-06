package com.codexdemo.orderplatform.ops;

import java.util.List;

public record OpsShardReadinessOperatorEvidenceValueDraftResponse(
        String project,
        String version,
        boolean readOnly,
        boolean executionAllowed,
        boolean readyForOperatorEvidenceValueDraft,
        String actualValueState,
        String draftValueState,
        boolean readyForEvidenceImport,
        boolean readyForManualEvidenceEntry,
        boolean readyForLiveExecution,
        boolean readyForProductionExecution,
        String endpoint,
        String profile,
        String sourcePlan,
        int slotCount,
        int passedSlotCount,
        List<DraftSlot> slots,
        List<String> checks,
        String status
) {
    public record DraftSlot(
            String code,
            String sourceSlot,
            String instruction,
            String draftValueBoundary,
            String importValueState,
            String sourceEndpoint,
            String status
    ) {
    }
}
