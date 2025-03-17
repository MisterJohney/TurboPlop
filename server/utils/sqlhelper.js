'use strict'

const sqlite3 = require("sqlite3").verbose();
const crypto = require('crypto');

class sqlhelper {
  //constructor() {
  //}

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

  // TODO: might add input verification
  createUser(username, email, password) {
    //let encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
    this.db.run(`INSERT INTO "User"("username", "email", "password") VALUES(?, ?, ?)`, [username, email, this.#encrypt(password)]);
  }

  validateUser(username, password) {
    this.db.all(`SELECT username, password FROM "User"
      WHERE username=(?)`, [username], (err, row) => {
        if (err) {
          console.error(err.message);
          return false;
        } else if (!row[0]){
          //console.error("nothing found");
          return false;
        } else {
          //console.log(row[0].username);
          if (this.#encrypt(password) !== row[0].password) {
            //console.log("login failed");
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



//let a = new sqlhelper();
//a.connect("./test.db");
//a.createTables();
//a.close();

//let help = new sqlhelper();
//help.connect("./turboplop.db");
////help.createTables();
////help.createUser("Zedis", "emial", "password1");
//help.validateUser("Zedis", "password");
//help.close();
