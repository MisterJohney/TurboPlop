const sqlhelper = require("../utils/sqlhelper.js");

dbh = new sqlhelper()

dbh.connect("./test.db");
dbh.createTables();
dbh.createUser("test", "email@email.com", "password");

dbh.validateUser("test", "password");

//expect(dbh.validateUser("test", "password")).toBe(true);
//expect(dbh.validateUser("test1", "password")).toBe(false);
//expect(dbh.validateUser("test", "password1")).toBe(false);
//expect(dbh.validateUser("test1", "password1")).toBe(false);

dbh.close()

