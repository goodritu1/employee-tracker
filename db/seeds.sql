INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 50000, (SELECT id FROM department WHERE name = 'Sales'));
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', 70000, (SELECT id FROM department WHERE name = 'Marketing'));
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 80000, (SELECT id FROM department WHERE name = 'Engineering'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', (SELECT id FROM