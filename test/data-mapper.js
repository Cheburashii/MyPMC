const DataType = require("../data-type");
const DataMapper = require("../data-mapper");
const assert = require("assert");
const AssertionError = assert.AssertionError;

const implicitMappingTestDefinition = {
    table: "implicitMappingTest",
    fields: {
        implicitColumn: {},
        implicitColumnName: {
            type: DataType.STRING
        },
        implicitDataType: {
            column: "implicitDataTypeColumn"
        },
        implicitColumnFromString: "_implicitColumnFromString"
    }
};

const dataTypeTestDefinition = {
    table: "dataTypeTest",
    fields: {
        integerField: {
            column: "integerColumn",
            type: DataType.INTEGER
        },
        stringField: {
            column: "stringColumn",
            type: DataType.STRING
        },
        booleanField: {
            column: "booleanColumn",
            type: DataType.BOOLEAN
        },
        dateField: {
            column: "dateColumn",
            type: DataType.DATE
        },
        datetimeField: {
            column: "dateTimeColumn",
            type: DataType.DATE_TIME
        },
        floatField: {
            column: "floatColumn",
            type: DataType.FLOAT
        },
    }
}

const definitions = {
    implicitMapping: implicitMappingTestDefinition,
    dataTypeMapping: dataTypeTestDefinition
};


describe("DataMapper", () => {
    it("should throw if constructed with falsy or empty definitions", () => {
        try {
            const mapper = new DataMapper();
            throw new AssertionError({ message: "Expected constructor to throw when definitions is undefined" })
        } catch (e) {
            // test passes
        }

        try {
            const mapper = new DataMapper(null);
            throw new AssertionError({ message: "Expected constructor to throw when definitions is null" })
        } catch (e) {
            // test passes
        }

        try {
            const mapper = new DataMapper({});
            throw new AssertionError({ message: "Expected constructor to throw when definitions is empty" })
        } catch (e) {
            // test passes
        }
    });

    describe("#mapFromRow", function () {
        let mapper;

        before(() => {
            mapper = new DataMapper(definitions);
        });

        it("should throw if incorrect definition name is passed", () => {
            try {
                mapper.mapFromRow("non-existent", {});
                throw new AssertionError({ message: "Expected constructor to throw." })
            } catch (e) {
                // test passes
            }
        });

        it("should map empty row to an empty object", () => {
            const result = mapper.mapFromRow("implicitMapping", {});
            assert.equal(Object.keys(result), 0, "Expected returned object to have no keys.");
        });

        it("should map column names implicitly", () => {
            const result = mapper.mapFromRow("implicitMapping", {
                implicitColumn: "implicitColumnValue",
                implicitColumnName: "implicitColumnNameValue",
                implicitDataTypeColumn: "implicitDataTypeColumnValue",
                _implicitColumnFromString: "_implicitColumnFromStringValue"
            });

            // TODO: split into multiple smaller tests for clarity
            assert.strictEqual(result.implicitColumn, "implicitColumnValue",
                "Expected implicitColumn => implicitColumn mapping, when column definition is an empty object or truthy value");
            assert.strictEqual(result.implicitColumnName, "implicitColumnNameValue",
                "Expected implicitColumnName => implicitColumnName mapping when column name isn't provided");
            assert.strictEqual(result.implicitDataType, "implicitDataTypeColumnValue",
                "Expected implicitDataTypeColumn => implicitDataType mapping when column name is provided");
            assert.strictEqual(result.implicitColumnFromString, "_implicitColumnFromStringValue",
                "Expected _implicitColumnFromString => implicitColumnFromString mapping when string provided instead of options");
        });

        it("should map datatypes properly", () => {
            const date = new Date(2017, 1, 1);
            const dateTime = new Date(2017, 1, 1, 1, 1, 1);

            const result = mapper.mapFromRow("dataTypeMapping", {
                integerColumn: 1,
                floatColumn: 2.3,
                stringColumn: "a string value",
                booleanField: 1,
                dateField: date.getTime(),
                dateTimeField: dateTime.getTime()
            });

            // TODO: split into multiple smaller tests for clarity
            assert.strictEqual(result.integerField, 1,
                "Expected integerColumn => integerField mapping to be integer");
            assert(Math.abs(result.floatField - 2.3) < 0.00001,
                "Expected floatColumn => floatField mapping to be float");
            assert.strictEqual(result.stringField, "a string value",
                "Expected stringColumn => stringField mapping to be string");
            assert.strictEqual(result.booleanField, true,
                "Expected booleanColumn => booleanField mapping to be bool");
            assert.strictEqual(result.dateField.getTime(), date.getTime(),
                "Expected dateColumn => dateField mapping to be date without time component");
            assert.strictEqual(result.dateTimeField.getTime(), dateTime.getTime(),
                "Expected dateTimeColumn => dateTimeField mapping to be date with time component");
        });

        it("should skip missing columns", () => {
            const result = mapper.mapFromRow("implicitMapping", {
                implicitColumn: "implicitColumnValue"
            });

            assert.strictEqual(result.implicitColumn, "implicitColumnValue", "Expected to map known implicitColumn");
            assert.equal(Object.keys(result).length, 1, "Expected result to have only one field")
        });

        it("should ignore unknown columns", () => {
            const result = mapper.mapFromRow("implicitMapping", {
                implicitColumn: "implicitColumnValue",
                unknownColumn: "unknownColumnValue"
            });

            assert.strictEqual(result.implicitColumn, "implicitColumnValue", "Expected to map known implicitColumn");
            assert.strictEqual("undefined", typeof result.unknownColumn, "Expected unknownColumn to be undefined");
        });
    });

    describe("#mapToArgs", () => {
        let mapper;

        before(() => {
            mapper = new DataMapper(definitions);
        });

        it("should throw if incorrect definition name is passed", () => {
            try {
                mapper.mapToArgs("non-existent", {}, []);
                throw new AssertionError({ message: "Expected constructor to throw." })
            } catch (e) {
                // test passes
            }
        });

        it("should map empty object to an empty array", () => {
            const result = mapper.mapFromRow("implicitMapping", {});
            assert.equal(result.length, 0, "Expected returned array to have no items.");
        });


        it("should map fields implicitly", () => {
            const result = mapper.mapToArgs("implicitMapping", {
                implicitColumn: "implicitColumnValue",
                implicitColumnName: "implicitColumnNameValue",
                implicitDataType: "implicitDataTypeColumnValue",
                implicitColumnFromString: "implicitColumnFromStringValue"
            }, [
                    "implicitColumn",
                    "implicitColumnName",
                    "implicitDataTypeColumn",
                    "_implicitColumnFromString"
                ]);

            // TODO: split into multiple smaller tests for clarity
            assert.strictEqual(result[0], "implicitColumnValue",
                "Expected implicitColumn => implicitColumn mapping, when column definition is an empty object or truthy value");
            assert.strictEqual(result[1], "implicitColumnNameValue",
                "Expected implicitColumnName => implicitColumnName mapping when column name isn't provided");
            assert.strictEqual(result[2], "implicitDataTypeColumnValue",
                "Expected implicitDataTypeColumn => implicitDataType mapping when column name is provided");
            assert.strictEqual(result[3], "implicitColumnFromStringValue",
                "Expected _implicitColumnFromString => implicitColumnFromString mapping when string provided instead of options");
        });

        it("should map datatypes properly", () => {
            const date = new Date(2017, 1, 1);
            const dateTime = new Date(2017, 1, 1, 1, 1, 1);

            const result = mapper.mapFromRow("dataTypeMapping", {
                integerField: 1,
                floatField: 2.3,
                stringField: "a string value",
                booleanField: 1,
                dateField: date,
                dateTimeField: dateTime
            }, [
                    "integerColumn",
                    "floatColumn",
                    "stringColumn",
                    "booleanColumn",
                    "dateColumn",
                    "dateTimeColumn"
                ]);

            // TODO: split into multiple smaller tests for clarity
            assert.strictEqual(result[0], 1,
                "Expected integerColumn => integerField mapping to be integer");
            assert(Math.abs(result[1] - 2.3) < 0.00001,
                "Expected floatColumn => floatField mapping to be float");
            assert.strictEqual(result[2], "a string value",
                "Expected stringColumn => stringField mapping to be string");
            assert.strictEqual(result[3], true,
                "Expected booleanColumn => booleanField mapping to be bool");
            assert.strictEqual(result[4], date.getTime(),
                "Expected dateColumn => dateField mapping to be date without time component");
            assert.strictEqual(result[5], dateTime.getTime(),
                "Expected dateTimeColumn => dateTimeField mapping to be date with time component");
        });
    });
});