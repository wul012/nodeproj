package com.codexdemo.orderplatform.notification;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationMessageRepository extends JpaRepository<NotificationMessage, Long> {

    Optional<NotificationMessage> findByEventId(UUID eventId);

    List<NotificationMessage> findTop50ByOrderByCreatedAtDesc();

    List<NotificationMessage> findByOrderIdOrderByCreatedAtAscIdAsc(Long orderId);
}
