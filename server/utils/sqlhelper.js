const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./tutorial.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected successfully.');
});

async function create_table() {
    await db.run(`CREATE TABLE IF NOT EXISTS users(
        name text,
        email text, 
        age integer
    )`)
}

create_table() // Will not proceed to the next line till the function is complete

// Code to execute 
