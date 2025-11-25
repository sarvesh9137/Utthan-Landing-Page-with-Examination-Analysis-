DROP TABLE IF EXISTS student_performance;
DROP TABLE IF EXISTS ward_attendance;

CREATE TABLE student_performance (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(200),
    gender VARCHAR(20),
    ward VARCHAR(20),
    school_name VARCHAR(200),
    medium VARCHAR(50),
    "class" VARCHAR(10),
    reading_level VARCHAR(10),
    writing_level VARCHAR(10),
    numeracy_level VARCHAR(10),
    attendance VARCHAR(20)
);

CREATE TABLE ward_attendance (
    ward VARCHAR(20) PRIMARY KEY,
    total_students INT,
    present INT,
    absent INT,
    long_absent INT
);
