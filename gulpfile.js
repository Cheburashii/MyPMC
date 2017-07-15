const gulp = require("gulp");
const fs = require("fs");
const Connection = require("./model/connection");
const join = require("path").join;
const del = require("del");

gulp.task("db:clear", (cb) => {
    fs.unlink("database.sqlite3", (err) => {
        cb();
    });
});

gulp.task("db:create", ["db:clear"], (cb) => {
    const database = new Connection("database.sqlite3");
    fs.readFile(join(__dirname, "database-scripts/setup.sql"), "utf8", (error, data) => {
        database.exec(data)
            .then(() => {
                console.log("Database created");
                cb();
            })
            .catch((err) => {
                console.error(err);
                cb();
            });
    });
});

gulp.task("db:seed", ["db:create"], () => {
    const database = new Connection("database.sqlite3");
    fs.readFile(join(__dirname, "database-scripts/seed.sql"), "utf8", (error, data) => {
        database.exec(data)
            .then(() => {
                console.log("Database seeded");
            })
            .catch((err) => {
                console.error(err);
            });
    });
});