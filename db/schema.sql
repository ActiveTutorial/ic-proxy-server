DROP TABLE IF EXISTS pairs;
DROP TABLE IF EXISTS checks;

CREATE TABLE operations (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- 'pair' or 'check'
  first TEXT NOT NULL,
  second TEXT NOT NULL,
  result JSONB NOT NULL,
  valid BOOLEAN, -- NULL for 'pair', TRUE/FALSE for 'check'
  UNIQUE (type, first, second, result)
);
