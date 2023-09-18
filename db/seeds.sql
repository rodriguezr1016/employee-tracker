INSERT INTO departments (department)
VALUES ("accounting");
insert into roles (job_title, salary, departments)
VALUES ("intern", 40000, 1),
       ("Senior Accountant", 80000, 1);

insert into employees (first_name, last_name, role_id, manager_id)
VALUES ("Rene", "Rodriguez", 2, NUll),
       ("Celeste", "Crawford", 1, 1);