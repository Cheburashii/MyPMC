const BaseDAO = require("./base-dao");
const BookingDefinition = require("./definitions").Booking;
const QueryBuilder = require("./sqlite-query-builder");

module.exports = class BookingsDao extends BaseDAO {
    constructor(connection) {
        super(BookingDefinition, connection);
    }

    getByPropertyId(id) {
        return this.connection.all(QueryBuilder.buildSelect(this.definition.table, null, `${this.definition.fields.propertyId} = ?`, null), [id])
            .then((data) => {
                return data.map((rows) => {
                    return this.dataMapper.mapFromRow(BaseDAO.DEFAULT_DEFINITION_NAME, rows);
                });
            });
    }
};