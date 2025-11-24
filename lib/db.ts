import { createClient } from '@libsql/client';

let db: ReturnType<typeof createClient>;

export function initDb() {
  if (!process.env.TURSO_CONNECTION_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('Missing Turso env vars');
  }
  db = createClient({
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return db;
}

// Schema اولیه (یکبار اجرا کن تو init)
export async function initSchema() {
  const client = initDb();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    );
    CREATE TABLE IF NOT EXISTS cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      color TEXT DEFAULT '#3b82f6',
      icon TEXT DEFAULT '📁',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id INTEGER,
      title TEXT,
      description TEXT,
      due_date TEXT,
      completed BOOLEAN DEFAULT FALSE,
      delayed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_id) REFERENCES cases (id)
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id INTEGER,
      date TEXT,
      time TEXT,
      location TEXT,
      title TEXT,
      description TEXT,
      attachment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_id) REFERENCES cases (id)
    );
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id INTEGER,
      action TEXT,
      details TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_id) REFERENCES cases (id)
    );
    CREATE TABLE IF NOT EXISTS letters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      due_date TEXT,
      completed BOOLEAN DEFAULT FALSE,
      delayed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      color TEXT DEFAULT '#ffffff',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      theme TEXT DEFAULT 'light',
      font_size INTEGER DEFAULT 16,
      logo TEXT,
      title TEXT DEFAULT 'میز کار وکالت',
      user_avatar TEXT
    );

    -- Insert admin user
    INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', '123456', 'admin');
    INSERT OR IGNORE INTO settings (id) VALUES (1);
  `);
}

export { db };
