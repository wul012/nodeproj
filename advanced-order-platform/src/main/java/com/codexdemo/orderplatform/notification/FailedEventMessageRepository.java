package com.codexdemo.orderplatform.notification;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FailedEventMessageRepository
        extends JpaRepository<FailedEventMessage, Long>, JpaSpecificationExecutor<FailedEventMessage> {

    Optional<FailedEventMessage> findByMessageId(String messageId);
}
