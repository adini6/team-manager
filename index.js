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
                            { name: 'department_id', type: 'input', message: 'Enter department ID for the role (or enter a new one):' }
                        ]);
                    
                        const title = roleAnswers.title;
                        const salary = parseFloat(roleAnswers.salary);
                        const departmentId = parseInt(roleAnswers.department_id);
                    
                        try {
                            if (isNaN(departmentId)) {
                                const { departmentName } = await inquirer.prompt({ name: 'departmentName', type: 'input', message: 'Enter the new department name:' });
                                const newDepartment = await dbManager.addDepartment(departmentName);
                                await dbManager.addRole(title, salary, newDepartment.insertId);
                            } else {
                                await dbManager.addRole(title, salary, departmentId);
                            }
                    
                            console.log(`Role ${title} added successfully!`);
                        } catch (error) {
                            console.error('Error adding the new role:', error);
                        }
                        break;
                    case "Add an employee":
                        const employeeAnswers = await inquirer.prompt([
                            { name: 'first_name', type: 'input', message: 'Enter employee first name:' },
                            { name: 'last_name', type: 'input', message: 'Enter employee last name:' },
                            { name: 'role_id', type: 'input', message: 'Enter role ID for the employee:' },
                            { name: 'manager_id', type: 'input', message: 'Enter manager ID for the employee (Enter NULL if no manager):' }
                        ]);
                        await dbManager.addEmployee(
                            employeeAnswers.first_name,
                            employeeAnswers.last_name,
                            employeeAnswers.role_id,
                            employeeAnswers.manager_id === 'NULL' ? null : employeeAnswers.manager_id
                        );
                    
                        console.log(`Employee ${employeeAnswers.first_name} ${employeeAnswers.last_name} added successfully!`);
                        break;
                    
                case "Update a role's salary":
                    const { roleId, newSalary } = await inquirer.prompt([
                        { name: 'roleId', type: 'input', message: 'Enter the ID of the role you want to update:' },
                        { name: 'newSalary', type: 'input', message: 'Enter the new salary:' }
                    ]);
                    await dbManager.updateRole(roleId, { salary: newSalary });
                    console.log('Role updated successfully!');
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
