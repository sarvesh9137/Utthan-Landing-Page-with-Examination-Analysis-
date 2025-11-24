DROP TABLE IF EXISTS student_performance;

CREATE TABLE student_performance (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(200),
    gender VARCHAR(20),
    ward VARCHAR(20),
    school_name VARCHAR(200),
    medium VARCHAR(50),
    reading_level VARCHAR(10),
    writing_level VARCHAR(10),
    numeracy_level VARCHAR(10)
);
