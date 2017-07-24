const Connection = require("../model/connection");
const join = require("path").join;
const fs = require("fs");

const database = new Connection(join(__dirname, "../database.sqlite3"));

let currentVersion = -1;

database.get("SELECT version FROM schema_version").then(
    (row) => {
        currentVersion = row.version;
    }
);

fs.readdir(join(__dirname, "updaters"), (err, fileNames) => {
    const modules = fileNames.map((name) => {
        return require(join(__dirname, "updaters", name));
    });

    modules = modules.filter((m) => {
        return m.version > currentVersion;
    }).sort((a, b) => {
        return a.version - b.version;
    });

    // modules.reduce((PrevModule, NextModule) => {
    //     new PrevModule(database).update().then(NextModule);
    // });

    let result = Promise.resolve();
    modules.forEach(function (Module) {
        result = result.then(Module);
    });
    return result;
    
});