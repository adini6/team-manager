# Team Manager

A Command-Line Application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Questions](#questions)

##  Description

This application is a Content Management Systems (CMS) for managing a company's employees using Node, Inquirer, and MySQL. It allows users to:

- View and manage the departments, roles, and employees in the company
- Organize and plan the business.

##  Installation

1. Clone the repository to your local machine.
   ```sh
   git clone <https://github.com/adini6/team-manager.git>
   ```
2. install the necessary packages.
```sh
npm install
```
3. Use your terminal to log in to MySQL shell with:
```sh
mysql-u root -p
```
* it will prompt you for your password for MySQL
i
4. Once you're in the MYSQL shell initiallize your database and tables by using the following commands"
```sh
SOURCE db/schema.sql;
SOURCE db/seeds.sql;
```
5. Update the `connection.js` in the `db` directory with your MySQL user information.

## Usuage 

Navigate to the project directory via terminal and run:
```sh 
node index.js
```
Follow the inquirer prompts to view, add, update, or delete records in your employee database.
![Team manager](https://github.com/adini6/team-manager/assets/28551058/263fe055-3959-4706-9fa2-19f34b11c2a3)


[walk through video](https://drive.google.com/file/d/1gtR8mV8Lw2Jgu-kGhQm4tY7Twf7yRH9e/view)

## Features

1. View all employees, roles, and departments.
2. Add employees, roles, and departments.
3. Update employee roles and employee information.
4. Delete employees, roles, and departments.

## Licennse 

This project is licensed under the terms of the MIT license.

## Questions

If you have any questions or have any insights, feel free to reach out to me. You can contact me through my [Github](https://github.com/adini6) or send me an [email](mailto:adini18@gmail.com).
