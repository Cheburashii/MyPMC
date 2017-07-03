const DataTypes = require("./data-type");
module.exports.Property = {
    table: "properties",
    fields: {
        id: "_id",
        title: "title",
        address: "address",
        price: "price",
        photo: "photo"
    }
};
module.exports.Booking = {
    table: "bookings",
    fields: {
        id: "_id",
        from: {
            column: "firstDate",
            type: DataTypes.DATE
        },
        to: {
            column: "lastDate",
            type: DataTypes.DATE
        },
        clientName: "clientName",
        clientPhone: "clientPhone",
        propertyId: "property_id"
    }
};