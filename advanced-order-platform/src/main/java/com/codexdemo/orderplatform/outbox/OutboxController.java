package com.codexdemo.orderplatform.outbox;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/outbox/events")
public class OutboxController {

    private final OutboxRepository outboxRepository;

    public OutboxController(OutboxRepository outboxRepository) {
        this.outboxRepository = outboxRepository;
    }

    @GetMapping
    public List<OutboxEventResponse> listRecentEvents() {
        return outboxRepository.findTop50ByOrderByCreatedAtDesc().stream()
                .map(OutboxEventResponse::from)
                .toList();
    }
}
