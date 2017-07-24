DROP TABLE IF EXISTS schema_version;
CREATE TABLE schema_version(
    version INTEGER DEFAULT 0
);
INSERT INTO schema_version VALUES(1);

DROP TABLE IF EXISTS properties;
CREATE TABLE properties(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    title NVARCHAR(128),
    address NVARCHAR(128),
    price REAL
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    property_id INTEGER,
    
    FOREIGN KEY (property_id) REFERENCES properties(_id)
);

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER,
    firstDate INTEGER,
    lastDate INTEGER,
    clientName NVARCHAR(128),
    clientPhone NVARCHAR(20),
    FOREIGN KEY (property_id) REFERENCES [properties](_id)
);