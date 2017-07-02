const DataType = require("./data-type");
function getTypeConstructor(type) {
    switch (type) {
        case DataType.DATE:
            return Date;
        case DataType.BOOLEAN:
            return Boolean;
        case DataType.DATE_TIME:
            return Date;
        case DataType.FLOAT:
            return Number;
        case DataType.INTEGER:
            return Number;
        case DataType.STRING:
            return String;
        default:
            throw new Error("Unknown data type.");
    }
}
module.exports = class DataMapper {
    constructor(definitions) {
        if (!definitions) throw new Error();
        this.definitions = definitions;
    }

    mapFromRow(definitionName, row) {
        const definition = this.definitions[definitionName];
        if (!definition) throw new Error("Unknown definition.");
        let result = {};
        Object.keys(definition.fields).forEach((fieldKey) => {
            let field = definition.fields[fieldKey];
            if (typeof field === "string") {
                if (!row[field]) return;
                result[fieldKey] = row[field];
            } else if (typeof field === "object") {
                if (!field.column) {
                    if (!row[fieldKey]) return;
                    result[fieldKey] = row[fieldKey];
                } else {
                    if (!row[field.column]) return;
                    result[fieldKey] = row[field.column];
                }
                if (field.type) {
                    const TypeConstructor = getTypeConstructor(field.type);
                    if (TypeConstructor === Date) {
                        result[fieldKey] = new TypeConstructor(result[fieldKey]);
                    } else {
                        result[fieldKey] = TypeConstructor(result[fieldKey]);
                    }
                }
            }
        });
        return result;
    }

    mapToArgs(definitionName, object, cols) {
        throw new Error("Not implemented");
    }
};