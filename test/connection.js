const Connection = require("../connection");
const assert = require("assert");
const AssertionError = assert.AssertionError;

describe("Connection", () => {
    it("should construct with connection string and close ", () => {
        const c = new Connection(":memory:");
        return c.close();
    });

    describe("#run", () => {
        it("should return a promise", () => {
            const c = new Connection(":memory:");
            const s = c.run("CREATE TABLE test_table(col1 INTEGER);");
            assert(s.then, "Connection#run should return a thenable object");
            return c.close();
        });

        it("should resolve query with proper sql", () => {
            const c = new Connection(":memory:");
            const s = c.run("CREATE TABLE test_table(col1 INTEGER);");
            return s.then(() => {
                c.close();
            }).catch((err) => {
                c.close();
                throw err;
            });
        });

        it("should reject query with incorrect sql", () => {
            const c = new Connection(":memory:");
            const s = c.run("DONT CREATE TABLE test_table(col1 INTEGER);");
            return s.then(() => {
                c.close();
                throw new AssertionError("Connection#run should reject invalid SQL.");
            }).catch(() => {
                return c.close();
            });
        });
    });

    describe("#exec", () => {
        it("should return a promise", () => {
            const c = new Connection(":memory:");
            const s = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1);");
            assert(s.then, "Connection#exec should return a thenable object");
            return c.close();
        });

        it("should resolve query with proper sql", () => {
            const c = new Connection(":memory:");
            const s = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1);");
            return s.then(() => {
                return c.close();
            }).catch((err) => {
                c.close();
                throw err;
            });
        });

        it("should reject query with incorrect sql", () => {
            const c = new Connection(":memory:");
            const s = c.exec("DONT CREATE TABLE test_table(col1 INTEGER);");
            return s.then(() => {
                c.close();
                throw new AssertionError("Connection#exec should reject invalid SQL.");
            }).catch(() => {
                c.close();
            });
        });
    });

    describe("#get", () => {
        it("should return a promise", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1);");
            const s2 = c.get("SELECT * FROM test_table;");
            assert(s2.then, "Connection#get should return a thenable object");
            return c.close();
        });

        it("should fail when passed incorrect query", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1);");
            const s2 = c.get("DONT SELECT * FROM test_table;");
            return s2.then(() => {
                c.close();
                throw new AssertionError("Connection#get should reject incorrect SQL.");
            }).catch(() => {
                return c.close();
            });
        });

        it("should return single entry", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1), (2);");
            const s2 = c.get("SELECT * FROM test_table;");
            return s2.then((row) => {
                assert(row.col1, "Connection#get should return a single object with col1 property.")
                return c.close();
            }).catch((err) => {
                c.close();
                throw err;
            });
        });
    });

    describe("#all", () => {
        it("should return a promise", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1), (2);");
            const s2 = c.all("SELECT * FROM test_table;");
            assert(s2.then, "Connection#all should return a thenable object");
            return c.close();
        });

        it("should fail when passed incorrect query", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1);");
            const s2 = c.all("DONT SELECT * FROM test_table;");
            return s2.then(() => {
                c.close();
                throw new AssertionError("Connection#all should reject incorrect SQL.");
            }).catch(() => {
                return c.close();
            });
        });

        it("should return an array", () => {
            const c = new Connection(":memory:");
            const s1 = c.exec("CREATE TABLE test_table(col1 INTEGER); INSERT INTO test_table(col1) VALUES(1), (2);");
            const s2 = c.all("SELECT * FROM test_table;");
            return s2.then((row) => {
                assert.equal(row.length, 2, "Connection#all should return multiple objects.")
                return c.close();
            }).catch((err) => {
                c.close();
                throw err;
            });
        });
    });
});