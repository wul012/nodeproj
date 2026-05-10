package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FailedEventReplayAttemptRepository
        extends JpaRepository<FailedEventReplayAttempt, Long>, JpaSpecificationExecutor<FailedEventReplayAttempt> {

    List<FailedEventReplayAttempt> findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(Long failedEventMessageId);
}
