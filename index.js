const express = require("express");
const expressHandlebars = require("express-handlebars");
const PropertiesController = require("./controllers/properties-controller");

const app = express();
const propertiesController = new PropertiesController();

app.engine("hbs", require("express-handlebars")({
    extname: ".hbs"
}));
app.set("view engine", "hbs");

app.get("/properties/", (req, res, next) => {
    propertiesController.indexGET(req, res, next);
});

app.listen(1339);