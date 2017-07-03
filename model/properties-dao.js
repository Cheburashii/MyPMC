const BaseDAO = require("./base-dao");
const PropertyDefinition = require("./definitions").Property;
const QueryBuilder = require("./sqlite-query-builder");

module.exports = class PropertiesDAO extends BaseDAO {
    constructor(connection) {
        super(PropertyDefinition, connection);
    }
};