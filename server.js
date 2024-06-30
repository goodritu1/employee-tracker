
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'Add an employee',
      'Update an employee role',
      'View all roles',
      'Add a role',
      'View all employees',
      'Add a department',
      'Quit' 
    ],
  }
])
.then((answers) => {
  console.log(answers);
})
.catch((error) => {
  console.log(error);
});


// const inquirer = require("inquirer");
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'employee_tracker',
//   password: 'Apinki14$',
//   port: 3001,
// });

// // const inquirer = new Inquirer();

// const departments = [];
// const roles = [];
// const employees = [];

// pool.query('SELECT * FROM department', (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   departments = result.rows;
// });

// pool.query('SELECT * FROM role', (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   roles = result.rows;
// });

// pool.query('SELECT * FROM employee', (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   employees = result.rows;
// });

// const mainMenu = [
//   {
//     type: 'list',
//     name: 'option',
//     message: 'What would you like to do?',
//     choices: [
//       'View all departments',
//       'View all roles',
//       'View all employees',
//       'Add a department',
//       'Add a role',
//       'Add an employee',
//       'Update an employee role',
//     ],
//   },
// ];

// const viewDepartments = () => {
//   console.log('Departments:');
//   console.table(departments);
//   inquirer.prompt(mainMenu).then(answers => {
//     handleOption(answers.option);
//   });
// };

// const viewRoles = () => {
//   console.log('Roles:');
//   console.table(roles);
//   inquirer.prompt(mainMenu).then(answers => {
//     handleOption(answers.option);
//   });
// };

// const viewEmployees = () => {
//   console.log('Employees:');
//   console.table(employees);
//   inquirer.prompt(mainMenu).then(answers => {
//     handleOption(answers.option);
//   });
// };

// const addDepartment = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter department name:',
//     },
//   ]).then(answers => {
//     pool.query(`INSERT INTO department (name) VALUES ($1) RETURNING *`, [answers.name], (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       departments.push(result.rows[0]);
//       console.log(`Department added: ${answers.name}`);
//       inquirer.prompt(mainMenu).then(answers => {
//         handleOption(answers.option);
//       });
//     });
//   });
// };

// const addRole = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'title',
//       message: 'Enter role title:',
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter role salary:',
//     },
//     {
//       type: 'list',
//       name: 'department',
//       message: 'Select department:',
//       choices: departments.map(department => department.name),
//     },
//   ]).then(answers => {
//     pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM department WHERE name = $3)) RETURNING *`, [answers.title, answers.salary, answers.department], (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       roles.push(result.rows[0]);
//       console.log(`Role added: ${answers.title}`);
//       inquirer.prompt(mainMenu).then(answers => {
//         handleOption(answers.option);
//       });
//     });
//   });
// };

// const addEmployee = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'first_name',
//       message: 'Enter employee first name:',
//     },
//     {
//       type: 'input',
//       name: 'last_name',
//       message: 'Enter employee last name:',
//     },
//     {
//       type: 'list',
//       name: 'role',
//       message: 'Select role:',
//       choices: roles.map(role => role.title),
//     },
//     {
//       type: 'list',
//       name: 'manager',
//       message: 'Select manager:',
//       choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
//     },
//   ]).then(answers => {
//     pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, (SELECT id FROM role WHERE title = $3), (SELECT id FROM employee WHERE first_name = $4 AND last_name = $5)) RETURNING *`, [answers.first_name, answers.last_name, answers.role, answers.manager.split(' ')[0], answers.manager.split(' ')[1]], (err, result) => {
//       if (err) {
// console.error(err);
//         return;
//       }
//       employees.push(result.rows[0]);
//       console.log(`Employee added: ${answers.first_name} ${answers.last_name}`);
//       inquirer.prompt(mainMenu).then(answers => {
//         handleOption(answers.option);
//       });
//     });
//   });
// };

// const updateEmployeeRole = () => {
//   inquirer.prompt([
//     {
//       type: 'list',
//       name: 'employee',
//       message: 'Select employee:',
//       choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
//     },
//     {
//       type: 'list',
//       name: 'role',
//       message: 'Select new role:',
//       choices: roles.map(role => role.title),
//     },
//   ]).then(answers => {
//     pool.query(`UPDATE employee SET role_id = (SELECT id FROM role WHERE title = $1) WHERE first_name = $2 AND last_name = $3`, [answers.role, answers.employee.split(' ')[0], answers.employee.split(' ')[1]], (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(`Employee role updated: ${answers.employee} -> ${answers.role}`);
//       inquirer.prompt(mainMenu).then(answers => {
//         handleOption(answers.option);
//       });
//     });
//   });
// };

// const handleOption = (option) => {
//   switch (option) {
//     case 'View all departments':
//       viewDepartments();
//       break;
//     case 'View all roles':
//       viewRoles();
//       break;
//     case 'View all employees':
//       viewEmployees();
//       break;
//     case 'Add a department':
//       addDepartment();
//       break;
//     case 'Add a role':
//       addRole();
//       break;
//     case 'Add an employee':
//       addEmployee();
//       break;
//     case 'Update an employee role':
//       updateEmployeeRole();
//       break;
//     default:
//       console.log('Invalid option');
//       inquirer.prompt(mainMenu).then(answers => {
//         handleOption(answers.option);
//       });
//   }
// };

// inquirer.prompt(mainMenu).then(answers => {
//   handleOption(answers.option);
// });