create index idx_failed_event_messages_status_failed_at
    on failed_event_messages (status, failed_at);

create index idx_failed_event_messages_event_type_failed_at
    on failed_event_messages (event_type, failed_at);

create index idx_failed_event_messages_aggregate
    on failed_event_messages (aggregate_type, aggregate_id);

create index idx_failed_event_replay_attempts_status
    on failed_event_replay_attempts (status, attempted_at);

create index idx_failed_event_replay_attempts_operator_role
    on failed_event_replay_attempts (operator_role, attempted_at);

create index idx_failed_event_replay_attempts_operator_id
    on failed_event_replay_attempts (operator_id, attempted_at);
