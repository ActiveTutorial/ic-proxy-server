DROP TABLE IF EXISTS pairs;
DROP TABLE IF EXISTS checks;
DROP TABLE IF EXISTS operations;

CREATE TABLE operations (
  id SERIAL PRIMARY KEY,
  first TEXT NOT NULL,
  second TEXT NOT NULL,
  result JSONB NOT NULL,
  valid BOOLEAN, -- NULL for 'pair', TRUE/FALSE for 'check'
  UNIQUE (first, second, result, valid)
);
