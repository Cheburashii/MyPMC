const Connection = require("../model/connection");
const join = require("path").join;
const fs = require("fs");

const database = new Connection(join(__dirname, "../database.sqlite3"));

let currentVersion = -1;

database.get("SELECT version FROM schema_version").then(
    (row) => {
        currentVersion = row.version;
    }
).then(() => {
    fs.readdir(join(__dirname, "updaters"), (err, fileNames) => {
        let version = currentVersion;
        let result = Promise.resolve();

        fileNames.map((name) => {
            // eslint-disable-next-line global-require
            return require(join(__dirname, "updaters", name));
        }).filter((m) => {
            return m.version > currentVersion;
        }).sort((a, b) => {
            return a.version - b.version;
        }).forEach((Module) => {
            result = result.then(() => {
                version = Module.version;
                return new Module(database).update();
            });
        });

        result.then(() => {
            return database.exec(`UPDATE schema_version SET version = ${version}`);
        }).catch((e) => {
            console.log("Error ", e);
        });
    });
});