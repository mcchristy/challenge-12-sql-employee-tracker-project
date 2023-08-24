const connections = require("../db/connection")
const menu = require("../index")

class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewAllRolesQuery() {
        return this.connection.promise().query("SELECT * FROM role");
    }
    addRole(name, salary, departmentId) {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${name}', ${salary}, ${departmentId})`);
     }
     findRoleByName(roleName) {  
        return this.connection.promise().query(`SELECT id FROM role WHERE title = '${roleName}'`);
    }
}
module.exports = new DB(connections);