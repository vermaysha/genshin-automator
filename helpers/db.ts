import Database from "better-sqlite3"

const db = new Database(process.cwd() + "/database.db")

let stmt

stmt = db.prepare(`CREATE TABLE IF NOT EXISTS daily_login (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  uid VARCHAR(30) NOT NULL,
  nickname VARCHAR(60) NULL,
  reward_icon VARCHAR(200) NULL,
  reward_name VARCHAR(20) NULL,
  reward_count INTEGER NULL,
  message VARCHAR(50) NULL,
  retcode INTEGER NULL,
  created_at TEXT NOT NULL
)`)

stmt.run()

stmt = db.prepare(`CREATE TABLE IF NOT EXISTS redeemed (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  uid VARCHAR(30) NOT NULL,
  codes VARCHAR(10) NOT NULL,
  nickname VARCHAR(60) NULL,
  rewards TEXT NULL,
  message VARCHAR(50) NULL,
  retcode INTEGER NULL,
  created_at TEXT NOT NULL
)`)

stmt.run()

// db.run(`CREATE TABLE IF NOT EXISTS last_checked (
//   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//   sha varchar(90) NOT NULL UNIQUE
// )`)

export default db
