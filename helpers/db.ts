import sqlite3 from "sqlite3"

const DBSOURCE = process.cwd() + "/database.db"

const db = new sqlite3.Database(DBSOURCE)

db.run(`CREATE TABLE IF NOT EXISTS daily_login (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  uid varchar(60) NOT NULL,
  date DATE NOT NULL,
  reward VARCHAR(20) NULL,
  message VARCHAR(50) NULL,
  UNIQUE(uid, date)
)`)

db.run(`CREATE TABLE IF NOT EXISTS redeemed (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  uid varchar(60) NOT NULL,
  codes varchar(20) NOT NULL,
  reward VARCHAR(50) NULL,
  message VARCHAR(50) NULL,
  UNIQUE(uid, codes)
)`)

// db.run(`CREATE TABLE IF NOT EXISTS last_checked (
//   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//   sha varchar(90) NOT NULL UNIQUE
// )`)

export default db
