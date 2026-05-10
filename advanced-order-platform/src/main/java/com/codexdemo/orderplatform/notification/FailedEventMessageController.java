package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/failed-events")
public class FailedEventMessageController {

    private final FailedEventMessageService failedEventMessageService;

    public FailedEventMessageController(FailedEventMessageService failedEventMessageService) {
        this.failedEventMessageService = failedEventMessageService;
    }

    @GetMapping
    public List<FailedEventMessageResponse> listRecentFailedMessages() {
        return failedEventMessageService.listRecentFailedMessages();
    }

    @GetMapping("/{id}/replay-attempts")
    public List<FailedEventReplayAttemptResponse> listReplayAttempts(@PathVariable Long id) {
        return failedEventMessageService.listReplayAttempts(id);
    }

    @PostMapping("/{id}/replay")
    public FailedEventMessageResponse replayFailedMessage(
            @PathVariable Long id,
            @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
            @RequestHeader(value = "X-Operator-Role", required = false) String operatorRole,
            @RequestBody(required = false) ReplayFailedEventRequest request
    ) {
        return failedEventMessageService.replay(id, request, operatorId, operatorRole);
    }
}
