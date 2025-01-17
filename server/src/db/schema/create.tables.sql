DROP TABLE IF EXISTS USERS CASCADE;
DROP TABLE IF EXISTS CHATS CASCADE;
DROP TABLE IF EXISTS CHAT_MESSAGES CASCADE;
DROP TABLE IF EXISTS CHAT_PARTICIPANTS CASCADE;

CREATE TABLE USERS (
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(255) NOT NULL,
  EMAIL VARCHAR(255) NOT NULL UNIQUE,
  PASSWORD VARCHAR(255) NOT NULL
);

CREATE TABLE CHATS (
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(255) DEFAULT 'New Private Chat',
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOIN TABLE FOR MANY TO MANY RELATIONSHIP BETWEEN USERS AND CHATS
CREATE TABLE CHAT_PARTICIPANTS (
  CHAT_ID INT NOT NULL REFERENCES CHATS(ID) ON DELETE CASCADE,
  USER_ID INT NOT NULL REFERENCES USERS(ID) ON DELETE CASCADE,
  PRIMARY KEY (CHAT_ID, USER_ID)
);

CREATE TABLE CHAT_MESSAGES (
  ID SERIAL PRIMARY KEY,
  USER_ID INT NOT NULL REFERENCES USERS(ID) ON DELETE CASCADE,
  CHAT_ID INT NOT NULL REFERENCES CHATS(ID) ON DELETE CASCADE,
  MESSAGE TEXT NOT NULL,
  CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);