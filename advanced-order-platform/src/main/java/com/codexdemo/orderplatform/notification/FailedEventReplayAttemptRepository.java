package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailedEventReplayAttemptRepository extends JpaRepository<FailedEventReplayAttempt, Long> {

    List<FailedEventReplayAttempt> findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(Long failedEventMessageId);
}
