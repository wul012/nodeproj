package com.codexdemo.orderplatform.notification;

import com.codexdemo.orderplatform.outbox.OutboxRabbitMqProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "notification.rabbitmq", name = "enabled", havingValue = "true")
public class FailedEventMessageListener {

    private static final Logger log = LoggerFactory.getLogger(FailedEventMessageListener.class);

    private final FailedEventMessageService failedEventMessageService;

    private final OutboxRabbitMqProperties outboxRabbitMqProperties;

    public FailedEventMessageListener(
            FailedEventMessageService failedEventMessageService,
            OutboxRabbitMqProperties outboxRabbitMqProperties
    ) {
        this.failedEventMessageService = failedEventMessageService;
        this.outboxRabbitMqProperties = outboxRabbitMqProperties;
    }

    @RabbitListener(queues = "${outbox.rabbitmq.dead-letter-queue}")
    public void handle(Message message) {
        FailedEventMessage failedMessage = failedEventMessageService.record(
                message,
                outboxRabbitMqProperties.getDeadLetterQueue()
        );
        log.warn(
                "event=failed_event_recorded failedEventId={} messageId={} eventType={} reason={}",
                failedMessage.getId(),
                failedMessage.getMessageId(),
                failedMessage.getEventType(),
                failedMessage.getFailureReason()
        );
    }
}
