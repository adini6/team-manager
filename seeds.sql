
INSERT INTO department (name) VALUES 
('Management'),
('Sales'),
('Human Resources');


INSERT INTO role (title, salary, department_id) VALUES 
('Regional Manager', 60000, 1),                        
('Assistant to the Regional Manager', 45000, 2),       
('Salesperson', 45000, 2),                             
('HR Representative', 48000, 3);                   


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Michael', 'Scott', 1, NULL),        
('Dwight', 'Schrute', 2, NULL);       
('Jim', 'Halpert', 3, NULL),         
('Toby', 'Flenderson', 4, NULL);


