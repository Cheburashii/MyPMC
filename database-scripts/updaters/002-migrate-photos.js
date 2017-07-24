module.exports = class MigratePhotosUpdater {
    constructor(connection) {
        // super(connection);
        this.connection = connection;
    }

    update() {
        const promises = [];
        const insert = "INSERT INTO photos(url, property_id) VALUES(?, ?)";
        const select = "SELECT _id, photo FROM properties";
        this.connection.all(select).then((data) => {
            data.forEach(row => {
                promises.push(this.connection.run(insert, [row.photo, row._id]));
            });
        });
        return Promise.all(promises).then(() => this.connection.exec(`
                PRAGMA writable_schema = 1;
                UPDATE properties SET photo = NULL;
                UPDATE SQLITE_MASTER SET SQL = 'CREATE TABLE properties(
                                                    _id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    title NVARCHAR(128),
                                                    address NVARCHAR(128),
                                                    price REAL
                                                );'
                                                WHERE NAME = 'properties';
                PRAGMA writable_schema = 0;`
        ));
    }
};

module.exports.version = 2;