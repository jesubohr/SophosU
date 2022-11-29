-- THESE ROWS HAVE TO BE INSERTED ONE BY ONE BECAUSE ONE ROW MAY DEPEND IN ANOTHER PREVIOUS ROW
-- INSERTING COURSES
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('0886245869', 'Cálculo 1', NULL, 1, 3, 20, 20);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('7683019461', 'Cálculo 2', 1, 2, 3, 30, 40);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('6662075906', 'Cálculo 3', 2, 3, 5, 10, 20);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('5093553573', 'Física Mecánica', 1, 2, 5, 15, 30);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('4492965386', 'Física Calor/Ondas', 4, 6, 4, 36, 40);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('5122309868', 'Física Electricidad', 5, 2, 4, 10, 20);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('8055903158', 'Ecuaciones Diferenciales', 3, 6, 4, 35, 40);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('6375452465', 'Análisis de Datos', 3, 4, 3, 29, 30);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('6625355623', 'Soluciones Computacionales a Problemas de Ingeniería', 3, 2, 4, 19, 30);
INSERT INTO Course(code, name, precourse_id, faculty_id, required_credits, enrolled_students, max_students) VALUES('2060413109', 'Optimización', 3, 6, 5, 30, 40);
