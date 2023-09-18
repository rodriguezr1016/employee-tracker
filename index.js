const inquirer = require("inquirer");
const fs = require('fs');
const mysql = require('mysql2');
const figlet = require('figlet');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
var questions = [
      {
          type: "list",
          name: "options",
          message: "What would you like to do",
          choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
      }
];
const question2 = [
    {
        type: "input",
        name: "department_Name",
        message: "What is the name of the department"
    }
];
const question3 = [
    {
        type: "input",
        name: "job_Title",
        message: "What is the job title?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the job salary?"
    },
    {
        type: "input",
        name: "department",
        message: "What is the department id?"
    }
];
const question4 = [
    {
        type: "input",
        name: "first_Name",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "last_Name",
        message: "What is the employee's last name?"
    },
    {
        type: "input",
        name: "role_id",
        message: "What is the employees role id?"
    },
    {
        type: "input",
        name: "manager",
        message: "What is the employee's manager_id if none type null?"
    }
];
const question5 = [
    {
        type: "input",
        name: "employee",
        message: "What is the employee's id?"
    },
    {
        type: "input",
        name: "new_Role",
        message: "What is the employee's new role id?"
    }
];
console.log(
    figlet.textSync("Employee Manager", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
//   function continu() {
//     inquirer.prompt(question).then((responses)=>{
//         init

//     })
//   }
function init() {
    console.clear();
    const promptUser =()=> {inquirer.prompt(questions).then((responses)=>{
        if(responses.options == "View all departments"){
            db.query('select * from departments', function (err, results) {
                console.table(results);
                promptUser()
              });
        }else if(responses.options == "View all roles"){
            db.query('SELECT * FROM roles JOIN departments ON roles.departments = departments.id', function (err, results) {
                console.table(results);
                promptUser();
              });
        }else if(responses.options == "View all employees"){
            db.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.job_title, departments.department AS 'department', employees.first_name, employees.last_name, roles.salary FROM employees, roles, departments WHERE departments.id = roles.departments AND roles.id = employees.role_id ORDER BY employees.id ASC", function (err, results) {
                console.table(results);
                console.log(err);
                promptUser();
              });
        }else if(responses.options == "Add a department"){
            const addDepartment = () => {
                inquirer.prompt(question2).then((responses)=>{
                    db.query(`INSERT INTO departments(department) VALUES ("${responses.department_Name}")`, function (err, results) {
                        console.log("Department successfully added!");
                        console.log(err);
                        promptUser();
                      });  
            }
    )};
    addDepartment();
        }else if(responses.options == "Add a role"){
            const addRole = () => {
                inquirer.prompt(question3).then((responses)=>{
                    db.query(`insert into roles (job_title, salary, departments) VALUES ("${responses.job_Title}", ${responses.salary}, ${responses.department})`, function (err, results) {
                        console.log("Role successfully added!");
                        console.log(err);
                        promptUser();
                      });  
            }
    )};
    addRole();
        }else if(responses.options == "Add an employee"){
            const addEmployee = () => {
                inquirer.prompt(question4).then((responses)=>{
                    db.query(`insert into employees (first_name, last_name, role_id, manager_id) VALUES ("${responses.first_Name}", "${responses.last_Name}", ${responses.role_id}, ${responses.manager})`, function (err, results) {
                        console.log("Employee successfully added!");
                        console.log(err);
                        promptUser();
                      });  
            }
    )};
    addEmployee();
        }else if(responses.options == "Update an employee role"){
            const updateEmployeeRole = () => {
                inquirer.prompt(question5).then((responses)=>{
                    db.query(`UPDATE employees SET role_id = ${responses.new_Role} WHERE id = ${responses.employee};`, function (err, results) {
                        console.log("Employee's role succesfully updated!");
                        console.log(err);
                        promptUser();
                      });  
            }
    )};
    updateEmployeeRole();
        }else{
            console.log(err);
            
        }

    }).then(() => {
         questions = [
            {
                type: "list",
                name: "options",
                message: "What else would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
            }
        ]
        
    }
        
        
        )
    }
promptUser();}
    init();

