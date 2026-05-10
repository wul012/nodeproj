package com.codexdemo.orderplatform.order;

import jakarta.persistence.LockModeType;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

public interface OrderRepository extends JpaRepository<SalesOrder, Long> {

    Optional<SalesOrder> findByIdempotencyKey(String idempotencyKey);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<SalesOrder> findTop50ByStatusAndCreatedAtBeforeOrderByCreatedAtAsc(OrderStatus status, Instant createdAt);
}
