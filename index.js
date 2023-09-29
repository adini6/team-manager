const inquirer = require('inquirer');
const dbManager = require('./db/dbManager');

const init = async () => {
    try {
        let continueLoop = true;
        while (continueLoop) {
            const { selection } = await inquirer.prompt({
                name: "selection",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Exit",
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update a role's salary",
                    "Delete a department",
                    "Delete a role",
                    "Delete an employee"
                ]
            });

            switch (selection) {
                case "Exit":
                    continueLoop = false;
                    break;
                case "View all departments":
                    const departments = await dbManager.getDepartments();
                    console.table(departments);
                    break;
                case "View all roles":
                    const roles = await dbManager.getRoles();
                    console.table(roles);
                    break;
                case "View all employees":
                    const employees = await dbManager.getEmployees();
                    console.table(employees);
                    break;
                case "Add a department":
                    const { name } = await inquirer.prompt({ name: 'name', type: 'input', message: 'Enter department name:' });
                    await dbManager.addDepartment(name);
                    console.log(`Department ${name} added successfully!`);
                    break;
                case "Add a role":
                    const roleAnswers = await inquirer.prompt([
                        { name: 'title', type: 'input', message: 'Enter role title:' },
                        { name: 'salary', type: 'input', message: 'Enter role salary:' },
                        { name: 'department_id', type: 'input', message: 'Enter department ID for the role:' }
                    ]);

                    try {
                        await dbManager.addRole(roleAnswers.title, parseFloat(roleAnswers.salary), parseInt(roleAnswers.department_id));
                        console.log(`Role ${roleAnswers.title} added successfully!`);
                    } catch (error) {
                        console.error('Error adding the new role:', error);
                    }
                    break;
                case "Add an employee":
                    const employeeAnswers = await inquirer.prompt([
                        { name: 'first_name', type: 'input', message: 'Enter employee first name:' },
                        { name: 'last_name', type: 'input', message: 'Enter employee last name:' },
                        { name: 'role_id', type: 'input', message: 'Enter role ID for the employee:' },
                        { name: 'manager_id', type: 'input', message: 'Enter manager ID for the employee (Enter NULL if no manager):' },
                        { name: 'salary', type: 'input', message: 'Enter salary for the employee:' }

                    ]);

                    try {
                        await dbManager.addEmployee(
                            employeeAnswers.first_name,
                            employeeAnswers.last_name,
                            parseInt(employeeAnswers.role_id),
                            employeeAnswers.manager_id === 'NULL' ? null : parseInt(employeeAnswers.manager_id),
                            parseFloat(employeeAnswers.salary)
                        );
                        console.log(`Employee ${employeeAnswers.first_name} ${employeeAnswers.last_name} added successfully!`);
                    } catch (error) {
                        console.error('Error adding the new employee:', error);
                    }
                    break;
                case "Update a role's salary":
                    const { roleId, newSalary } = await inquirer.prompt([
                        { name: 'roleId', type: 'input', message: 'Enter the ID of the role you want to update:' },
                        { name: 'newSalary', type: 'input', message: 'Enter the new salary:' }
                    ]);
                    await dbManager.updateRole(parseInt(roleId), { salary: parseFloat(newSalary) });
                    console.log('Role updated successfully!');
                    break;
                case "Delete a department":
                    try {
                        const { departmentId } = await inquirer.prompt({
                            name: 'departmentId',
                            type: 'input',
                            message: 'Enter the ID of the department you want to delete:'
                        });
                        await dbManager.deleteRecord('department', parseInt(departmentId));
                        console.log('Department deleted successfully!');
                    } catch (error) {
                        console.error('Error deleting department:', error);
                    }
                    break;
                case "Delete a role":
                    try {
                        const { roleId } = await inquirer.prompt({
                            name: 'roleId',
                            type: 'input',
                            message: 'Enter the ID of the role you want to delete:'
                        });
                        await dbManager.deleteRecord('role', parseInt(roleId));
                        console.log('Role deleted successfully!');
                    } catch (error) {
                        console.error('Error deleting role:', error);
                    }
                    break;
                case "Delete an employee":
                    try {
                        const { employeeId } = await inquirer.prompt({
                            name: 'employeeId',
                            type: 'input',
                            message: 'Enter the ID of the employee you want to delete:'
                        });
                        await dbManager.deleteRecord('employee', parseInt(employeeId));
                        console.log('Employee deleted successfully!');
                    } catch (error) {
                        console.error('Error deleting employee:', error);
                    }
                    break;
                default:
                    console.log("Invalid choice! Please choose a valid action.");
            }
        }
    } catch (error) {
        console.error("Error occurred: ", error);
    } finally {
        dbManager.closeConnection();
        console.log("Goodbye!");
    }
};

init();
