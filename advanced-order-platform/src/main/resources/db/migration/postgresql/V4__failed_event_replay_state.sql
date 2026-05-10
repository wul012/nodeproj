alter table failed_event_messages
    add column status varchar(32) not null default 'RECORDED';

alter table failed_event_messages
    add column replay_count integer not null default 0;

alter table failed_event_messages
    add column last_replayed_at timestamp(6) with time zone;

alter table failed_event_messages
    add column last_replay_event_id varchar(80);

alter table failed_event_messages
    add column last_replay_error varchar(500);

create index idx_failed_event_messages_status
    on failed_event_messages (status);
