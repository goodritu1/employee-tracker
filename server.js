
const inquirer = require('inquirer');
const { Client } = require('pg');

// PostgreSQL connection details
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Apinki14$',
  database: 'company_db'
});

client.connect();

// Function to display the main menu
async function showMainMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ]
    }
  ])
  switch (choice) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      client.end();
      return;
  }

  showMainMenu();
}
// Function to view all departments
async function viewDepartments() {
  const result = await client.query('SELECT * FROM departments');
  console.table(result.rows);
}

// Function to view all roles
async function viewRoles() {
  const result = await client.query(`
    SELECT
      roles.id,
      roles.title,
      departments.name AS department,
      roles.salary
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `);
  console.table(result.rows);
}

// Function to view all employees
async function viewEmployees() {
  const result = await client.query(`
    SELECT
      employees.id,
      employees.first_name,
      employees.last_name,
      roles.title AS job_title,
      departments.name AS department,
      roles.salary,
      CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
  `);
  console.table(result.rows);
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:'
    }
  ]);

  await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log('Department added successfully!');
}

// Function to add a role
async function addRole() {
  const departments = (await client.query('SELECT * FROM departments')).rows;
  const { title, salary, department } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the new role:'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Select the department for the new role:',
      choices: departments.map(dept => dept.name)
    }
  ]);

  const departmentId = departments.find(dept => dept.name === department).id;
  await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log('Role added successfully!');
}

// Function to add an employee
async function addEmployee() {
  const roles = (await client.query('SELECT * FROM roles')).rows;
  const employees = (await client.query('SELECT id, first_name, last_name FROM employees')).rows;
  const { firstName, lastName, role, manager } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the employee\'s role:',
      choices: roles.map(role => role.title)
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Select the employee\'s manager:',
      choices: ['None', ...employees.map(emp => `${emp.first_name} ${emp.last_name}`)]
    }
  ]);

  const roleId = roles.find(r => r.title === role).id;
  const managerId = manager === 'None' ? null : employees.find(emp => `${emp.first_name} ${emp.last_name}` === manager).id;
  await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log('Employee added successfully!');
}

// Function to update an employee role
async function updateEmployeeRole() {
  const employees = (await client.query('SELECT id, first_name, last_name FROM employees')).rows;
  const roles = (await client.query('SELECT id, title FROM roles')).rows;
  const { employee, newRole } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select the employee to update:',
      choices: employees.map(emp => `${emp.first_name} ${emp.last_name}`)
    },
    {
      type: 'list',
      name: 'newRole',
      message: 'Select the new role for the employee:',
      choices: roles.map(role => role.title)
    }
  ]);

  const employeeId = employees.find(emp => `${emp.first_name} ${emp.last_name}` === employee).id;
  const roleId = roles.find(role => role.title === newRole).id;
  await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  console.log('Employee role updated successfully!');
}

// Start the application
showMainMenu();

