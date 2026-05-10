package com.codexdemo.orderplatform.notification;

import java.util.List;

public record FailedEventManagementBatchResponse(
        FailedEventManagementStatus status,
        int updatedCount,
        List<FailedEventMessageResponse> items
) {
}
