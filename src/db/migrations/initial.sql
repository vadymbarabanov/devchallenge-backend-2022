CREATE TABLE IF NOT EXISTS users (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS topics (
   id BIGSERIAL PRIMARY KEY,
   title varchar(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS users_topics (
   user_id BIGINT REFERENCES users (id),
   topic_id BIGINT REFERENCES topics (id),
   CONSTRAINT user_topic_pk PRIMARY KEY (user_id, topic_id)
);


CREATE TABLE IF NOT EXISTS trust_relations (
   id BIGSERIAL,
   user_id BIGINT REFERENCES users (id),
   contact_id BIGINT REFERENCES users (id),
   trust_level INT ,
   CONSTRAINT user_contact_pk PRIMARY KEY (user_id, contact_id)
);