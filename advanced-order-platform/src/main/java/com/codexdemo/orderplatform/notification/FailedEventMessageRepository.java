package com.codexdemo.orderplatform.notification;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailedEventMessageRepository extends JpaRepository<FailedEventMessage, Long> {

    Optional<FailedEventMessage> findByMessageId(String messageId);

    List<FailedEventMessage> findTop50ByOrderByFailedAtDesc();
}
