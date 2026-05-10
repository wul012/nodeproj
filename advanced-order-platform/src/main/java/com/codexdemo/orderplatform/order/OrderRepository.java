package com.codexdemo.orderplatform.order;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<SalesOrder, Long> {

    Optional<SalesOrder> findByIdempotencyKey(String idempotencyKey);
}
