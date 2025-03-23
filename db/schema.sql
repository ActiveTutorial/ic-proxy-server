CREATE TABLE operations (
  id SERIAL PRIMARY KEY,
  first TEXT NOT NULL,
  second TEXT NOT NULL,
  result TEXT NOT NULL,
  emoji TEXT NOT NULL,
  UNIQUE (first, second, result, emoji)
);
