const express = require("express");
const expressHandlebars = require("express-handlebars");
const PropertiesController = require("./controllers/properties-controller");
const BookingsController = require("./controllers/bookings-controller");
const bodyParser = require("body-parser");

const app = express();
const propertiesController = new PropertiesController();
const bookingsController = new BookingsController();

app.engine("hbs", require("express-handlebars")({
    extname: ".hbs"
}));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/properties/", (req, res, next) => {
    propertiesController.indexGET(req, res, next);
});

app.get("/properties/:id", (req, res, next) => {
    propertiesController.detailsGET(req, res, next);
});

app.put("/properties/:id/add", (req, res, next) => {
    propertiesController.addPUT(req, res, next);
});

app.post("/properties/:id/update", (req, res, next) => {
    propertiesController.updatePOST(req, res, next);
});

app.delete("/properties/:id/remove", (req, res, next) => {
    propertiesController.removeDELETE(req, res, next);
});

app.get("/bookings/:id", (req, res, next) => {
    bookingsController.getByPropertyIdGET(req, res, next);
});

app.put("/bookings/:id/add", (req, res, next) => {
    bookingsController.addPUT(req, res, next);
});

app.delete("/bookings:id/remove", (req, res, next) => {
    bookingsController.removeDELETE(req, res, next);
});
app.listen(1339);