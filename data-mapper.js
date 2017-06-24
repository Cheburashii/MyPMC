const DataType = require("data-type");

module.exports = class DataMapper {
    constructor(definitions) {
        throw new Error("Not implemented");
    }

    mapFromRow(definitionName, row) {
        throw new Error("Not implemented");
    }

    mapToArgs(definitionName, object, cols) {
        throw new Error("Not implemented");
    }
};