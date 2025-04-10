'use strict';

const sqlite3 = require("sqlite3").verbose();
const crypto = require('crypto');

class sqlhelper {
  constructor() {
    this.db = null;
  }

  // Establish a connection
  async connect(filename) {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(filename, (err) => {
        if (err) {
          reject(err.message);
        } else {
          console.log('Connected successfully.');
          resolve();
        }
      });
    });
  }

  // Close the connection
  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err.message);
        } else {
          console.log("Connection closed");
          resolve();
        }
      });
    });
  }

  async createTables() {
    await this.runQuery(`CREATE TABLE IF NOT EXISTS "User" (
      "user_id" INTEGER NOT NULL,
      "username" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      PRIMARY KEY("user_id" AUTOINCREMENT)
    );`);

    await this.runQuery(`CREATE TABLE IF NOT EXISTS "File" (
      "file_id" TEXT NOT NULL,
      "user_id" INTEGER,
      "file_name" TEXT NOT NULL,
      "expiration_date" TEXT NOT NULL,
      "is_private" INTEGER NOT NULL,
      "shared_users" TEXT,
      PRIMARY KEY("file_id"),
      FOREIGN KEY("user_id") REFERENCES "User"("user_id")
    );`);

    await this.runQuery(`CREATE TABLE "Settings" (
      "user_id" INTEGER NOT NULL,
      "theme" TEXT NOT NULL,
      "file_display_type" TEXT NOT NULL,
      FOREIGN KEY("user_id") REFERENCES "User"("user_id")
    );`);
  }

  // Helper function to run queries
  async runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  }

  // Insert user data synchronously
  async createUser(form) {
    await this.runQuery(`INSERT INTO "User"("username", "email", "password") VALUES(?, ?, ?)`, 
      [form.username, form.email, this.#encrypt(form.password)]);
  }

  // Check if login is valid synchronously
  async isValidLogin(form) {
    const result = await this.getUserByUsername(form.username);
    if (!result) {
      console.log('User not found');
      return false;
    }
    if (this.#encrypt(form.password) !== result.password) {
      console.log('Incorrect password');
      return false;
    }
    console.log("You can be authenticated");
    return true;
  }

  // Helper function to retrieve a user by username
  async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT username, password FROM "User" WHERE username = ?`, [username], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  }

    async registerUser(form) {
      // Check username duplicates
      // TODO: add this

      const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
      const isValid = emailRegex.exec(form.email);
      if (!isValid) {
        return false;
      }

      if (form.password.length < 8) {
        return false;
      }

      if (form.password !== form.retypePassword) {
        return false
      }

      // Add to database
      await this.connect("./turboplop.db");
      await this.createUser(form)
      await this.close();
      return true;
    }

  // Encrypt the password
  #encrypt(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

module.exports = sqlhelper;


// (async () => {
//     let helper = new sqlhelper();
//     await helper.connect("../turboplop.db");
//     await helper.createTables();
//     await helper.close();
// })();
