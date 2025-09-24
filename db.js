const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'obligations.db');
const db = new Database(dbPath);

db.pragma('journal_mode = wal');

db.exec(`
CREATE TABLE IF NOT EXISTS federal_obligations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  frequency TEXT,
  due TEXT,
  who TEXT,
  sporadic INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS federal_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  obligation_id TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (obligation_id) REFERENCES federal_obligations(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS federal_months (
  obligation_id TEXT NOT NULL,
  month INTEGER NOT NULL,
  PRIMARY KEY (obligation_id, month),
  FOREIGN KEY (obligation_id) REFERENCES federal_obligations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS state_obligations (
  id TEXT PRIMARY KEY,
  state TEXT NOT NULL,
  title TEXT NOT NULL,
  frequency TEXT,
  due TEXT,
  who TEXT,
  sporadic INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS state_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  obligation_id TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (obligation_id) REFERENCES state_obligations(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS state_months (
  obligation_id TEXT NOT NULL,
  month INTEGER NOT NULL,
  PRIMARY KEY (obligation_id, month),
  FOREIGN KEY (obligation_id) REFERENCES state_obligations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS local_obligations (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL CHECK(level IN ('county','city')),
  state TEXT NOT NULL,
  county TEXT,
  city TEXT,
  title TEXT NOT NULL,
  frequency TEXT,
  due TEXT,
  who TEXT,
  sporadic INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS local_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  obligation_id TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (obligation_id) REFERENCES local_obligations(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS local_months (
  obligation_id TEXT NOT NULL,
  month INTEGER NOT NULL,
  PRIMARY KEY (obligation_id, month),
  FOREIGN KEY (obligation_id) REFERENCES local_obligations(id) ON DELETE CASCADE
);
`);

module.exports = db;


