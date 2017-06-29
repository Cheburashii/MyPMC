# MyPMC

A tutorial project, attempt at an architecture design and shtuff.

# Data Layer #
* Persisted data source (database, remote service, binary resource, excel tables)
* *Mapping with ORM*
* Models (domain objects) - classes, objects
    * Define domain objects
* Data Access (DAO | Repository | Data Service)
    * CRUD domain objects
    * Convert data rows into objects

# Logic #
* Business logic
    * Data validators
    * Services, contain grouped or organized domain operations 
* Controller
    * Data validation
    * Authentication and security
    * Pass to the business logic
    * Render results

## Middleware ##
* Template engines
* Session and cookie management
* Routing

# Presentation #
* *viewmodel*
* views or templates
* client-side code
* input validation


# Project Structure #
* Util:
    * SQLite Promises + Tests
* Models:
    * Property
        - title
        - address
        - price
        - photos
    * Booking
        - from
        - to
        - property
        - clientName
        - clientPhone
* ORM:
    - QueryBuilder + Tests
        - buildInsert(table, cols)
        - buildUpdate(table, cols, condition)
        - buildDelete(table, condition)
        - buildSelect(table, cols, condition, order)
    - DataMapper + Tests
        - mapFromRow(definition, row) : DomainObject
        - mapToArgs(definition, object, cols) : Array 
        - Data definition (mapping)
        ```
            {
                entity: "booking",
                properties: {
                    "from": {
                        col: "from",
                        type: "date"
                    },
                    "clientName": true,
                    "property": {
                        col: "property_id",
                        type: "reference",
                        table: "property",
                        key: "_id"
                    }
                }
            }
        ```

* DAO:
    * BaseDataAccess
        * getAll
        * getById
        * insert
        * remove
        * update
    * PropertyDataAccess : BaseDataAccess
        * getVacantByDate(from, to)
    * BookingDataAccess : BaseDataAccess
        * getByProperty(property)
* Controllers:
    * PropertyController
        * index => "GET /properties" // display list of properties
        * add => "GET /properties/add" // TODO: later
        * add => "PUT /properties" // add new property through Dao
        * details => "GET /properties/{id}" // get property details for prop #1
        * update => "POST/PATCH /properties/{id}"
        * remove => "DELETE /properties/{id}"
    * BookingController
        * add => "PUT /bookings/"
    * AccountController
        * index => "/account"
        ...
* View
    * property and booking templates
        * index (list) template
        * add/update template
        * details template
    * account templates
        * index templates
            - /bookings
            - /properties/add