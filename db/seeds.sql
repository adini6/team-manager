INSERT INTO department (name) VALUES 
('Management'),
('Sales'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES 
('Regional Manager', 60000.00, 1),
('Assistant to the Regional Manager', 45000.00, 1),
('Salesperson', 45000.00, 2),
('HR Representative', 42000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id,salary) VALUES 
('Michael', 'Scott', 1, NULL, 60000.00),
('Dwight', 'Schrute', 2, 1, 45000.00),
('Jim', 'Halpert', 3, 1, 45000.00), 
('Toby', 'Flenderson', 4, 1, 42000.00); 
