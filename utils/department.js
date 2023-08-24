const connections = require("../db/connection")
const menu = require("../index")

class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewAllDepartmentsQuery() {
        return this.connection.promise().query("SELECT * FROM department");
    }
    addDepartment(data) {
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ('${data.departmentName}')`)
    }
    findDepartmentByName(departmentName) {  
        return this.connection.promise().query(`SELECT id FROM department WHERE name = '${departmentName}'`);
    }
}
module.exports = new DB(connections);