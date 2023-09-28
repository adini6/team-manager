const connection = require('./connection');

class DBManager {
    // View All Departments
    getDepartments() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM department';
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // View All Roles with Department Names
    getRoles() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT role.id, title, salary, name as department 
                FROM role 
                JOIN department ON role.department_id = department.id;
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // View All Employees with Role Titles and Department Names
    getEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT employee.id, first_name, last_name, title, name as department, salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager 
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id 
                LEFT JOIN employee manager ON employee.manager_id = manager.id;
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Add a new department
    addDepartment(name) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, [name], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Add a new role
    addRole(title, salary, department_id) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, [title, salary, department_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Add a new employee
    addEmployee(first_name, last_name, role_id, manager_id) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, [first_name, last_name, role_id, manager_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Update an existing role
    updateRole(role_id, updates) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE role SET ? WHERE id = ?';
            connection.query(query, [updates, role_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Delete a department, role, or employee
    deleteRecord(table, id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE id = ?`;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Close the database connection
    closeConnection() {
        connection.end();
    }
}

module.exports = new DBManager();
