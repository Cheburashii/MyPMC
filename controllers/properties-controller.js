const Connection = require("../model/connection");
const PropertiesDAO = require("../model/properties-dao");
const join = require("path").join;
const DATABASE_PATH = join(__dirname, "../database.sqlite3");

module.exports = class PropertiesController {
    constructor() {
        this.connection = new Connection(DATABASE_PATH);
        this.dao = new PropertiesDAO(this.connection);
    }

    indexGET(req, res, next) {
        this.dao.getAll()
            .then((rows) => {
                res.render("properties", rows);
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    }

    addPUT(req, res, next) {
        throw new Error("Not implemented");
    }

    detailsGET(req, res, next) {
        this.dao.getById(req.params.id)
            .then((row) => {
                res.render("details", row);
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    }

    updatePOST(req, res, next) {
        throw new Error("Not implemented");
    }

    removeDELETE(req, res, next) {
        throw new Error("Not implemented");
    }
};