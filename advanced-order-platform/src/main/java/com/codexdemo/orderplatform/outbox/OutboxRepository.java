package com.codexdemo.orderplatform.outbox;

import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

public interface OutboxRepository extends JpaRepository<OutboxEvent, UUID> {

    List<OutboxEvent> findTop50ByOrderByCreatedAtDesc();

    long countByPublishedAtIsNull();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<OutboxEvent> findTop50ByPublishedAtIsNullOrderByCreatedAtAsc();
}
