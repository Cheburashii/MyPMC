const fs = require("fs");
const Connection = require("../connection");
const join = require("path").join;

const database = new Connection(join(__dirname, "../database.sqlite3"));

fs.readFile(join(__dirname, "setup.sql"), "utf8", (error, data) => {
    database.exec(data)
        .then(() => {
            console.log("Database created");
        })
        .catch((err) => {
            console.error(err);
        });
});