package com.codexdemo.orderplatform.notification;

import java.util.List;

public record MarkFailedEventManagementRequest(
        List<Long> ids,
        FailedEventManagementStatus status,
        String note
) {
}
