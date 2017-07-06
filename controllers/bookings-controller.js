const Connection = require("../model/connection");
const BookingsDAO = require("../model/bookings-dao");
const join = require("path").join;
const DATABASE_PATH = join(__dirname, "../database.sqlite3");

module.exports = class BookingsController {
    constructor() {
        this.connection = new Connection(DATABASE_PATH);
        this.dao = new BookingsDAO(this.connection);
    }

    getByPropertyIdGET(req, res, next) {
        this.dao.getByPropertyId(req.params.id)
            .then((rows) => {
                res.render("bookings", rows);
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    }

    addPUT(req, res, next) {
        throw new Error("Not implemented");
    }

    removeDELETE(req, res, next) {
        throw new Error("Not implemented");
    }
};