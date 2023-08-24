const inquirer = require('inquirer');
// const connection = require('./db/connection');
const Employee = require('./utils/employee');
const Role = require('./utils/role');
const Department = require('./utils/department');

const questions = [
    {
      type: "list",
      name: "selectAction",
      message: "What would you like to do?",
      choices: [
        'View all employees',
        'View all roles',
        'View all departments',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        'Exit',
      ],
    },
  ];
  
  const addDepartment = [
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department?",
    },
  ];
  
  const addRole = [
    { type: "input", name: "roleName", message: "What is the title for the role?" },
    {
      type: "input",
      name: "roleSalary",
      message: "Please enter the annual salary for the role",
    },
    {
      type: "list",
      name: "newRoleDepartment",
      message: "Which department does the role belong to?",
      choices: ["Computer Engineering", "Marketing", "Finance", "Sales", "Service"],
    },
  ];
  
  const addEmployee = [
    { type: "input", name: "firstName", message: "What is the employee's first name?" },
    { type: "input", name: "lastName", message: "What is the employee's last name?" },
    {
      type: "list",
      name: "employeeRole",
      message: "Which department does the role belong to?",
      choices: [
        "Social Media Manager",
        "Salesperson",
        "Web Designer",
        "Accountant",
        "Account Manager",
        "Marketing Coordinator",
        "Marketing Assistant",
        "Head of Sales",
      ],
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the employee's manager?",
      choices: [
        "Scott Mason",
        "Nicole Bolton",
        "Brianna Caviness",
        "Amber Cogdell",
        "Azavier Frazier",
        "Tommy Gress",
        "Jose Lucas",
        "Steven Major",
        "N/A",
      ],
    },
  ];
  
  const updateEmployeeRole = [
    {
      type: "input",
      name: "firstName",
      message: "First name of the employee's role you want to update?",
      choices: [
        "Scott",
        "Nicole",
        "Brianna",
        "Amber",
        "Azavier",
        "Tommy",
        "Jose",
        "Steven",
      ],
    },
    {
      type: "input",
      name: "lastName",
      message: "Last name of the employee's role you want to update?",
      choices: [
        "Mason",
        "Bolton",
        "Caviness",
        "Cogdell",
        "Frazier",
        "Gress",
        "Lucas",
        "Major",
      ],
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Which new role do you want to assign the selected employee?",
      choices: [
        "Social Media Manager",
        "Salesperson",
        "Web Designer",
        "Accountant",
        "Account Manager",
        "Marketing Coordinator",
        "Marketing Assistant",
        "Head of Sales",
      ],
    },
  ];
  
  function menu() {

    inquirer.prompt(questions).then((response) => {
      console.log(response);

      switch (response.selectAction) {
        case "View All Employees":
          Employee.viewEmployeesQuery().then((data) => {
            console.table(data[0]);
            menu();
          });
          break;
        case "Add Employee":
          inquirer.prompt(addEmployee).then((response) => {
            Employee.findRoleByName(response.employeeRole).then((data) => {
              Employee
                .addEmployee(data[0][0].id, response.firstName, response.lastName)
                .then(() => {
                  console.log("New employee added to database");
                  menu();
                });
            });
          });
          break;
        case "Update Employee Role":
          inquirer.prompt(updateEmployeeRole).then((response) => {
            Role.findRoleByName(response.employeeRole).then((data) => {
              Role
                .updateEmployeeRole(
                  data[0][0].id,
                  response.firstName,
                  response.lastName
                )
                .then(() => {
                  console.log("Existing employee role updated in database");
                  menu();
                });
            });
          });
          break;
        case "View All Roles":
          Role.viewAllRolesQuery().then((data) => {
            console.table(data[0]);
            menu();
          });
          break;
        case "Add Role":
          inquirer.prompt(addRole).then((response) => {
            Department.findDepartmentByName(response.newRoleDepartment).then((data) => {
              Department.addRole(response.roleName, response.roleSalary, data[0][0].id).then((data) => {
                console.log("New role added to database");
                menu();
              });
            });
          });
          break;
        case "View All Departments":
          Department.viewAllDepartmentsQuery().then((data) => {
            console.table(data[0]);
            menu();
          });
          break;
        case "Add Department":
          inquirer.prompt(addDepartment).then((response) => {
            Department.addDepartment(response).then((data) => {
              console.log("New department added to database");
              menu();
            });
          });
          break;
        case "Quit":
          
          console.log("Exiting application.");
          return;
        default:
          console.log("No selection was made");
      }
    });
  }
  

  menu();