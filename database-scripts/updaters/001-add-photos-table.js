module.exports = class AddPhotosUpdater {
    constructor(connection) {
        // super(connection);
        this.connection = connection;
    }

    update() {
        const sql = `DROP TABLE IF EXISTS photos;
                    CREATE TABLE photos(
                        _id INTEGER PRIMARY KEY AUTOINCREMENT,
                        url TEXT,
                        property_id INTEGER,
                        FOREIGN KEY (property_id) REFERENCES properties(_id)
                    );`;
        return this.connection.exec(sql);
    }
};

module.exports.version = 1;