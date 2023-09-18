drop database if exists employee_db;
create database employee_db;
use employee_db;
create table departments(
    id int not null auto_increment primary key,
    department varchar(50)
);
CREATE TABLE roles (
  id INT not null auto_increment primary key,
  job_title VARCHAR(30) NOT NULL,
  salary int not null,
  departments int,
  FOREIGN KEY (departments)
  REFERENCES departments(id)
  ON DELETE SET NULL
);
CREATE TABLE employees (
    id INT not null auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    FOREIGN KEY (role_id) REFERENCES roles(id), 
    manager_id int, 
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);