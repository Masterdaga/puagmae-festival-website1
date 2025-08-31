const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create SQLite database file in the backend directory
const dbPath = path.join(__dirname, '..', 'puagmae_festival.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    email_sent BOOLEAN DEFAULT 0,
    email_error TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Newsletter subscribers table
  db.run(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'subscribed',
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Admin users table
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('✅ Database tables initialized');
}

// Helper function to run queries with promises
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows });
      }
    });
  });
}

// Helper function to run single row queries
function queryOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve({ rows: row ? [row] : [] });
      }
    });
  });
}

// Helper function to run insert/update/delete queries
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ 
          rows: [{ id: this.lastID }],
          rowCount: this.changes 
        });
      }
    });
  });
}

module.exports = {
  query,
  queryOne,
  run,
  db
};

