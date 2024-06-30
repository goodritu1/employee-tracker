INSERT INTO departments (name) 
VALUES ('Sales'),
 ('Marketing'),
 ('Engineering');

INSERT INTO roles (title, salary, department_id) 
VALUES ('Salesperson', 50000, 1),
('Marketing Manager', 70000,2),
('Software Engineer', 80000,3),
('Accountant', 60000, 1),
('Project Manager', 90000, 3),
('Marketing Associate', 100000, 2),
('Product Manager', 70000, 3),
('Account Manager', 80000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
('Ritu', 'Gupta', 2, 1),
('Mike', 'Chan', 3, 1),
('Tom', 'Allen', 4, 2),
('Kevin', 'Malone', 5, 4),
('Sarah', 'Lourd', 6, 1);

