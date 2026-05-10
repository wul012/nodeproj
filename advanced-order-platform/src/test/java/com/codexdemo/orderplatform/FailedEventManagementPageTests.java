package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.Test;

class FailedEventManagementPageTests {

    @Test
    void staticManagementPageWiresFailedEventApisAndAssets() throws IOException {
        String html = resource("static/failed-events.html");
        String javascript = resource("static/failed-events.js");
        String css = resource("static/failed-events.css");

        assertThat(html).contains(
                "失败事件管理",
                "/failed-events.css",
                "/failed-events.js",
                "exportFailedButton",
                "exportHistoryButton",
                "markButton",
                "replayButton",
                "refreshAttemptsButton",
                "attemptList",
                "replayReasonInput"
        );
        assertThat(javascript).contains(
                "const apiBase = \"/api/v1/failed-events\"",
                "/management-status",
                "/management-history",
                "/management-history/export",
                "/replay-attempts",
                "/replay",
                "/export",
                "replayActiveEvent",
                "loadReplayAttempts",
                "X-Operator-Id",
                "reason"
        );
        assertThat(css).contains(
                ".content-grid",
                ".table-wrap",
                ".side-column",
                ".replay-panel",
                ".attempt-list",
                ".history-panel",
                "@media (max-width: 640px)"
        );
    }

    private String resource(String path) throws IOException {
        try (InputStream input = getClass().getClassLoader().getResourceAsStream(path)) {
            assertThat(input).as("classpath resource %s", path).isNotNull();
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
