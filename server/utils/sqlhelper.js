'use strict'

const sqlite3 = require("sqlite3").verbose();
const crypto = require('crypto');

class sqlhelper {
  connect(filename) {
    this.db = new sqlite3.Database(filename, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected successfully.');
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connection closed");
      }
    });
  }

  //TODO: add rest of the tables
  createTables() {
    // User table
    this.db.run(`CREATE TABLE IF NOT EXISTS "User" (
    "user_id"	INTEGER NOT NULL,
    "username"	TEXT NOT NULL,
    "email"	TEXT NOT NULL,
    "password"	TEXT NOT NULL,
    PRIMARY KEY("user_id" AUTOINCREMENT)
  );`);
  }

  createUser(form) {
    this.db.run(`INSERT INTO "User"("username", "email", "password") VALUES(?, ?, ?)`, [form.username, form.email, this.#encrypt(form.password)]);
  }

  validateUser(form) {
    this.db.all(`SELECT username, password FROM "User"
      WHERE username=(?)`, [form.username], (err, row) => {
        if (err) {
          console.error(err.message);
          return false;
        } else if (!row[0]){
          return false;
        } else {
          if (this.#encrypt(form.password) !== row[0].password) {
            return false;
          } else {
            console.log("You can be authentificated");
            return true;
          }
        }
      });
  }

  #encrypt(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

module.exports = sqlhelper;

// Create db
//let help = new sqlhelper();
//help.connect("../turboplop.db");
//help.createTables();
//help.close();
