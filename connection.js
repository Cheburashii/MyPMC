const sqlite3 = require('sqlite3');
module.exports = class Connection {
    constructor(connectionString) {
        this.db =  new sqlite3.Database(connectionString);
    }

    get(query, values = []) {
        return new Promise((res, rej) => {
            this.db.get(query, values, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        });
    }

    all(query, values = []) {
        return new Promise((res, rej) => {
            this.db.all(query, values, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        });
    }

    run(query) {
        return new Promise((res, rej) => {
            this.db.run(query, (err,) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            })
        });
    }

    exec(queries) {
        return new Promise((res, rej) => {
            this.db.exec(queries, (err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            })
        })
    }

    close() {
        return new Promise((res, rej) => {
            this.db.close((err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            })
        })
    }
};