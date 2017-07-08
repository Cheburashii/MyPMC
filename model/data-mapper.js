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
                    const typeConstructor = getTypeConstructor(field.type);
                    if (typeConstructor === Date) {
                        result[fieldKey] = new Date(result[fieldKey]);
                    } else {
                        result[fieldKey] = typeConstructor(result[fieldKey]);
                    }
                }
            }
        });
        return result;
    }

    mapToArgs(definitionName, object, cols) {
        const definition = this.definitions[definitionName];
        if (!definition) throw new Error("Unknown definition.");
        if (!cols) cols = [];
        let result = [];

        cols.forEach(col => {
            let fieldName = null;
            let dataType = null;

            for (let key in definition.fields) {
                dataType = definition.fields[key].type;
                if (definition.fields[key] === col || definition.fields[key].column === col || key === col) {
                    fieldName = key;
                    break;
                }
            }

            if (!fieldName) throw new Error("Can't find field name for column " + col);

            result.push(DataMapper.convertToSafeValue(object[fieldName], dataType));
        });
        return result;
    }

    static convertToSafeValue(value, dataType) {
        switch (dataType) {
            case DataType.BOOLEAN:
                return value !== 0;
            case DataType.DATE:
            case DataType.DATE_TIME:
                return value.getTime();
            default:
                return value;
        }
    }
};