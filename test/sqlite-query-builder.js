const builder = require("../sqlite-query-builder");
const assert = require("assert");
const AssertionError = assert.AssertionError;

describe("SQLiteQueryBuilder", () => {

    const table = "test_table";
    const col1 = "col1";
    const col2 = "col2";

    describe("#buildInsert", () => {

        it("should throw if table is an empty string", () => {
            try {
                const result = normalize(builder.buildInsert("", [col1, col2]));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if table is null", () => {
            try {
                const result = normalize(builder.buildInsert(null, [col1, col2]));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if table is a whitespace string", () => {
            try {
                const result = normalize(builder.buildInsert("   ", [col1, col2]));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if columns is null", () => {
            try {
                const result = normalize(builder.buildInsert(table, null));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if columns is empty", () => {
            try {
                const result = normalize(builder.buildInsert(table, []));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should produce insert statement for multiple columns", () => {
            const result = normalize(builder.buildInsert(table, [col1, col2]));
            const expected = "INSERT INTO test_table(col1, col2) VALUES(?, ?)";
            assert.equal(result, expected);
        });

        it("should produce insert statement for single column", () => {
            const result = normalize(builder.buildInsert(table, [col1]));
            const expected = "INSERT INTO test_table(col1) VALUES(?)";
            assert.equal(result, expected);
        });
    });

    describe("#buildDelete", () => {
        it("should throw if table is an empty string", () => {
            try {
                const result = normalize(builder.buildDelete(""));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if table is null", () => {
            try {
                const result = normalize(builder.buildDelete(null));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should throw if table is a whitespace string", () => {
            try {
                const result = normalize(builder.buildDelete("   "));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildInsert to throw an error"});
        });

        it("should build an unconditional delete when condition is falsy", () => {
            const expected = "DELETE FROM test_table";
            assert.equal(normalize(builder.buildDelete(table)), expected,
                "should build an unconditional delete when condition is undefined");
            assert.equal(normalize(builder.buildDelete(table, null)), expected,
                "should build an unconditional delete when condition is null");
            assert.equal(normalize(builder.buildDelete(table, "")), expected,
                "should build an unconditional delete when condition is an empty string");
        });

        it("should build delete statement with condition", () => {
            const actual = normalize(builder.buildDelete(table, "col1 = 1"));
            const expected = "DELETE FROM test_table WHERE col1 = 1";
            assert.equal(actual, expected);
        });
    });

    describe("#buildUpdate", () => {
        it("should throw if table is an empty string", () => {
            try {
                const result = normalize(builder.buildUpdate(""));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildUpdate to throw an error"});
        });

        it("should throw if table is null", () => {
            try {
                const result = normalize(builder.buildUpdate(null));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildUpdate to throw an error"});
        });

        it("should throw if table is a whitespace string", () => {
            try {
                const result = normalize(builder.buildUpdate("   "));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildUpdate to throw an error"});
        });

        it("should throw if columns is null", () => {
            try {
                const result = normalize(builder.buildUpdate(table, null));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildUpdate to throw an error"});
        });

        it("should throw if columns is empty", () => {
            try {
                const result = normalize(builder.buildUpdate(table, []));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildUpdate to throw an error"});
        });

        it("should build a single-column unconditional update when condition is falsy", () => {
            const expected = "UPDATE test_table SET col1 = ?";
            assert.equal(normalize(builder.buildUpdate(table, [col1])), expected,
                "should build an unconditional update when condition is undefined");
            assert.equal(normalize(builder.buildUpdate(table, [col1], null)), expected,
                "should build an unconditional update when condition is null");
            assert.equal(normalize(builder.buildUpdate(table, [col1], "")), expected,
                "should build an unconditional update when condition is an empty string");
        });

        it("should build a single-column update statement with condition", () => {
            const expected = "UPDATE test_table SET col1 = ? WHERE col1 = 1";
            const actual = normalize(builder.buildUpdate(table, [col1], "col1 = 1"));
            assert.equal(actual, expected);
        });

        it("should build a multi-column unconditional update when condition is falsy", () => {
            const expected = "UPDATE test_table SET col1 = ?, col2 = ?";
            assert.equal(normalize(builder.buildUpdate(table, [col1, col2])), expected,
                "should build an unconditional update when condition is undefined");
            assert.equal(normalize(builder.buildUpdate(table, [col1, col2], null)), expected,
                "should build an unconditional update when condition is null");
            assert.equal(normalize(builder.buildUpdate(table, [col1, col2], "")), expected,
                "should build an unconditional update when condition is an empty string");
        });

        it("should build a multi-column update statement with condition", () => {
            const expected = "UPDATE test_table SET col1 = ?, col2 = ? WHERE col1 = 1";
            const actual = normalize(builder.buildUpdate(table, [col1, col2], "col1 = 1"));
            assert.equal(actual, expected);
        });
    });

    describe("#buildSelect", () => {
        it("should throw if table is an empty string", () => {
            try {
                const result = normalize(builder.buildSelect(""));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildSelect to throw an error"});
        });

        it("should throw if table is null", () => {
            try {
                const result = normalize(builder.buildSelect(null));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildSelect to throw an error"});
        });

        it("should throw if table is a whitespace string", () => {
            try {
                const result = normalize(builder.buildSelect("   "));
            } catch (error) {
                return true;
            }
            throw new AssertionError({message: "Expected SQLiteQueryBuilder#buildSelect to throw an error"});
        });

        it("should produce unconditional select * statement when cols is falsy", () => {
            const expected = "SELECT * FROM test_table";
            assert.equal(normalize(builder.buildSelect(table)), expected,
                "should build an unconditional update when cols is undefined");
            assert.equal(normalize(builder.buildSelect(table, null)), expected,
                "should build an unconditional update when cols is null");
            assert.equal(normalize(builder.buildSelect(table, [])), expected,
                "should build an unconditional update when cols is an empty array");
        });

        it("should produce a single-column query", () => {
            const expected = "SELECT col1 FROM test_table";
            const actual = normalize(builder.buildSelect(table, [col1]));
            assert.equal(actual, expected);
        });

        it("should produce a multi-column query", () => {
            const expected = "SELECT col1, col2 FROM test_table";
            const actual = normalize(builder.buildSelect(table, [col1, col2]));
            assert.equal(actual, expected);
        });

        it("should append condition when provided", () => {
            const expected = "SELECT col1, col2 FROM test_table WHERE col1 = 1";
            const actual = normalize(builder.buildSelect(table, [col1, col2], "col1 = 1"));
            assert.equal(actual, expected);
        });

        it("should append order when provided", () => {
            const expected = "SELECT col1, col2 FROM test_table ORDER BY col1 ASC";
            const actual = normalize(builder.buildSelect(table, [col1, col2], null, "col1 ASC"));
            assert.equal(actual, expected);
        });

        it("should append condition and order when provided", () => {
            const expected = "SELECT col1, col2 FROM test_table WHERE col1 = 1 ORDER BY col1 ASC";
            const actual = normalize(builder.buildSelect(table, [col1, col2], "col1 = 1", "col1 ASC"));
            assert.equal(actual, expected);
        });
    });

    function normalize(str) {
        return str.replace(/,/, ", ").replace(/[\r\n\s\t]+/gmi, " ").trim();
    }
});