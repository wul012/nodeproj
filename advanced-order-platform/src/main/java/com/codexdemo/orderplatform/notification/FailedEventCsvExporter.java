package com.codexdemo.orderplatform.notification;

import java.util.List;
import java.util.StringJoiner;

final class FailedEventCsvExporter {

    private static final String LINE_SEPARATOR = "\r\n";

    private FailedEventCsvExporter() {
    }

    static String failedMessages(List<FailedEventMessageResponse> messages) {
        StringBuilder csv = new StringBuilder();
        appendRow(
                csv,
                List.of(
                        "id",
                        "messageId",
                        "eventId",
                        "eventType",
                        "aggregateType",
                        "aggregateId",
                        "status",
                        "managementStatus",
                        "managementNote",
                        "managedBy",
                        "managedAt",
                        "failedAt",
                        "replayCount",
                        "lastReplayedAt",
                        "lastReplayEventId",
                        "lastReplayError",
                        "sourceQueue",
                        "deadLetterQueue",
                        "failureReason",
                        "payload"
                )
        );
        messages.forEach(message -> appendRow(
                csv,
                List.of(
                        value(message.id()),
                        value(message.messageId()),
                        value(message.eventId()),
                        value(message.eventType()),
                        value(message.aggregateType()),
                        value(message.aggregateId()),
                        value(message.status()),
                        value(message.managementStatus()),
                        value(message.managementNote()),
                        value(message.managedBy()),
                        value(message.managedAt()),
                        value(message.failedAt()),
                        value(message.replayCount()),
                        value(message.lastReplayedAt()),
                        value(message.lastReplayEventId()),
                        value(message.lastReplayError()),
                        value(message.sourceQueue()),
                        value(message.deadLetterQueue()),
                        value(message.failureReason()),
                        value(message.payload())
                )
        ));
        return csv.toString();
    }

    static String managementHistory(List<FailedEventManagementHistoryResponse> history) {
        StringBuilder csv = new StringBuilder();
        appendRow(
                csv,
                List.of(
                        "id",
                        "failedEventMessageId",
                        "previousStatus",
                        "newStatus",
                        "operatorId",
                        "operatorRole",
                        "note",
                        "changedAt"
                )
        );
        history.forEach(item -> appendRow(
                csv,
                List.of(
                        value(item.id()),
                        value(item.failedEventMessageId()),
                        value(item.previousStatus()),
                        value(item.newStatus()),
                        value(item.operatorId()),
                        value(item.operatorRole()),
                        value(item.note()),
                        value(item.changedAt())
                )
        ));
        return csv.toString();
    }

    private static void appendRow(StringBuilder csv, List<String> values) {
        StringJoiner row = new StringJoiner(",");
        values.forEach(value -> row.add(escape(value)));
        csv.append(row).append(LINE_SEPARATOR);
    }

    private static String value(Object value) {
        return value == null ? "" : value.toString();
    }

    private static String escape(String value) {
        if (value == null || value.isEmpty()) {
            return "";
        }
        boolean requiresQuoting = value.contains(",")
                || value.contains("\"")
                || value.contains("\n")
                || value.contains("\r");
        if (!requiresQuoting) {
            return value;
        }
        return "\"" + value.replace("\"", "\"\"") + "\"";
    }
}
