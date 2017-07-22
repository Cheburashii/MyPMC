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
        this.dao.add(req.body)
            .then(() => {
                res.redirect("/properties");
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
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
        req.body.id = req.params.id;
        this.dao.update(req.body)
            .then(() => {
                res.redirect("/properties");
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    }

    removeDELETE(req, res, next) {
        this.dao.remove(req.body.id)
            .then(() => {
                res.redirect("/properties");
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    }
};