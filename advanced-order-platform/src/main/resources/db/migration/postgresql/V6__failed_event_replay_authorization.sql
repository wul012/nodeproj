alter table failed_event_replay_attempts
    add column operator_role varchar(80) not null default 'UNKNOWN';

alter table failed_event_replay_attempts
    add column reason varchar(500) not null default 'not recorded before v16';
