package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
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
}
