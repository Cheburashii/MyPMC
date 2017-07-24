const join = require("path").join;

module.exports = class AddPhotosUpdater {
    constructor(connection) {
        // super(connection);
        this.connection = connection;
    }

    upgrade() {
        const sql = `DROP TABLE IF EXISTS photos;
                    CREATE TABLE photos(
                        _id INTEGER PRIMARY KEY AUTOINCREMENT,
                        url TEXT,
                        property_id INTEGER,
                        FOREIGN KEY (property_id) REFERENCES properties(_id)
                    );`;
        return this.connection.run(sql);
    }
};

module.exports.version = 1;