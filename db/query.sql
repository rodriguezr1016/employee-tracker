SELECT *
FROM roles
JOIN departments ON roles.departments = departments.id;
SELECT * 
from employees
join roles on employees.role_id = roles.id;