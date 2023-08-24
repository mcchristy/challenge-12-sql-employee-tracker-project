const connections = require("../db/connection")
const menu = require("../index")

class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewEmployeesQuery() {
        return this.connection.promise().query("SELECT e.id, e.first_name, e.last_name, role.title, role.salary, CONCAT(m.first_name,' ',m.last_name) AS manager, department.name AS department FROM employee e INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id;");
    }
    addEmployee(roleId, firstName, lastName) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', ${roleId})`)
    }
    updateEmployeeRole(roleId, firstName, lastName) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE first_name = '${firstName}' AND last_name = '${lastName}'`)
    }
}
module.exports = new DB(connections);