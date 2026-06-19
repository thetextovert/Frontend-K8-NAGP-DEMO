CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    designation VARCHAR(100),
    department VARCHAR(100)
);

INSERT INTO employees
(name, designation, department)
VALUES
('John','Software Engineer','Engineering'),
('Emma','QA Engineer','Testing'),
('David','Project Manager','Management'),
('Sophia','Business Analyst','Business'),
('Liam','DevOps Engineer','Operations');