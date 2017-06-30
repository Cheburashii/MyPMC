DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS bookings;
CREATE TABLE properties(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    title NVARCHAR(128),
    address NVARCHAR(128),
    price REAL,
    photo NVARCHAR(128)
);

CREATE TABLE bookings(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER,
    firstDate INTEGER,
    lastDate INTEGER,
    clientName NVARCHAR(128),
    clientPhone NVARCHAR(20),
    FOREIGN KEY (_id) REFERENCES [properties](_id)
);