const DataMapper = require("./data-mapper");
const QueryBuilder = require("./sqlite-query-builder");
const ID_COLUMN = "_id";
const DEFAULT_DEFINITION_NAME = "definition";

module.exports = class BaseDAO {
    constructor(definition, connection) {
        if (!definition) throw new Error("BaseDataAccess can`t exist without a definition.");
        this.definition = definition;
        this.connection = connection;
        let definitions = {};
        definitions[DEFAULT_DEFINITION_NAME] = definition;
        this.dataMapper = new DataMapper(definitions);
    }

    getAll() {
        return this.connection.all(QueryBuilder.buildSelect(this.definition.table, null, null, null))
            .then((data) => {
                return data.map((row) => {
                    return this.dataMapper.mapFromRow(DEFAULT_DEFINITION_NAME, row);
                });
            });
    }

    getById(id) {
        return this.connection.get(QueryBuilder.buildSelect(this.definition.table, null, `${ID_COLUMN} = ?`), [id])
            .then((row) => {
                return this.dataMapper.mapFromRow(DEFAULT_DEFINITION_NAME, row);
            });
    }

    remove(id) {
        return this.connection.run(QueryBuilder.buildDelete(this.definition.table, null, `${ID_COLUMN} = ?`), [id]);
    }
};

module.exports.DEFAULT_DEFINITION_NAME = DEFAULT_DEFINITION_NAME;