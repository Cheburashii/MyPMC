module.exports = class SQLiteQueryBuilder {

    static buildInsert(table, cols) {
        if (!table || !table.trim()) {
            throw new Error("Table name can`t be empty.");
        } else if (!cols || cols.length === 0) {
            throw new Error("Cols names can`t be empty.");
        }
        return `INSERT INTO ${table}(${cols.join(", ")}) VALUES(${"?, ".repeat(cols.length).slice(0, -2)})`;
    }

    static buildUpdate(table, cols, condition) {
        if (!table || !table.trim()) {
            throw new Error("Table name can`t be empty.");
        } else if (!cols || cols.length === 0) {
            throw new Error("Cols names can`t be empty.");
        }
        let query = `UPDATE ${table} SET ${cols.map(item => `${item} = ?`).join(", ")}`;
        if (condition) {
            query += ` WHERE ${condition}`;
        }
        return query;
    }

    static buildDelete(table, condition) {
        if (!table || !table.trim()) {
            throw new Error("Table name can`t be empty.");
        }
        return `DELETE FROM ${table} ${condition
            ? `WHERE ${condition}`
            : ""}`;
    }

    static buildSelect(table, cols, condition, order) {
        if (!table || !table.trim()) {
            throw new Error("Table name can`t be empty.");
        }
        let query = `SELECT ${!cols || cols.length === 0
            ? "*"
            : cols.join(", ")} FROM ${table} `;
        if (condition) {
            query += `WHERE ${condition} `;
        }
        if (order) {
            query += `ORDER BY ${order}`;
        }
        return query;
    }
};