-- ============================================================
-- CertifyCS — Database Schema
-- Version: 1.0
-- Description: Reference schema for the CertifyCS platform
-- ============================================================


-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    full_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'employer', 'admin')),
    program         VARCHAR(10) CHECK (program IN ('CS', 'IT')),
    year_level      SMALLINT CHECK (year_level BETWEEN 1 AND 4),
    university      VARCHAR(150),
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);


-- ------------------------------------------------------------
-- COURSES
-- ------------------------------------------------------------
CREATE TABLE courses (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(150) NOT NULL,
    description     TEXT,
    language        VARCHAR(50),
    duration_weeks  SMALLINT,
    level           VARCHAR(20) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    field           VARCHAR(20) CHECK (field IN ('CS', 'IT', 'CS & IT')),
    year_level      SMALLINT CHECK (year_level BETWEEN 1 AND 4),
    total_modules   SMALLINT DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW()
);


-- ------------------------------------------------------------
-- MODULES (lessons inside a course)
-- ------------------------------------------------------------
CREATE TABLE modules (
    id              SERIAL PRIMARY KEY,
    course_id       INT REFERENCES courses(id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    order_index     SMALLINT NOT NULL,
    content         TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);


-- ------------------------------------------------------------
-- ENROLLMENTS
-- ------------------------------------------------------------
CREATE TABLE enrollments (
    id              SERIAL PRIMARY KEY,
    user_id         INT REFERENCES users(id) ON DELETE CASCADE,
    course_id       INT REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMP DEFAULT NOW(),
    status          VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    UNIQUE (user_id, course_id)
);


-- ------------------------------------------------------------
-- MODULE PROGRESS
-- ------------------------------------------------------------
CREATE TABLE module_progress (
    id              SERIAL PRIMARY KEY,
    enrollment_id   INT REFERENCES enrollments(id) ON DELETE CASCADE,
    module_id       INT REFERENCES modules(id) ON DELETE CASCADE,
    completed       BOOLEAN DEFAULT FALSE,
    completed_at    TIMESTAMP,
    UNIQUE (enrollment_id, module_id)
);


-- ------------------------------------------------------------
-- CERTIFICATIONS (certificate types)
-- ------------------------------------------------------------
CREATE TABLE certifications (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    tag             VARCHAR(50),
    description     TEXT,
    year_level      SMALLINT CHECK (year_level BETWEEN 1 AND 4),
    valid_years     SMALLINT DEFAULT 2,
    created_at      TIMESTAMP DEFAULT NOW()
);


-- ------------------------------------------------------------
-- CERTIFICATION REQUIREMENTS (which courses are needed)
-- ------------------------------------------------------------
CREATE TABLE certification_requirements (
    certification_id    INT REFERENCES certifications(id) ON DELETE CASCADE,
    course_id           INT REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (certification_id, course_id)
);


-- ------------------------------------------------------------
-- ISSUED CERTIFICATES (student earned certificates)
-- ------------------------------------------------------------
CREATE TABLE issued_certificates (
    id                  SERIAL PRIMARY KEY,
    user_id             INT REFERENCES users(id) ON DELETE CASCADE,
    certification_id    INT REFERENCES certifications(id),
    certificate_code    VARCHAR(60) UNIQUE NOT NULL,
    issued_at           TIMESTAMP DEFAULT NOW(),
    expires_at          TIMESTAMP,
    is_revoked          BOOLEAN DEFAULT FALSE
);


-- ------------------------------------------------------------
-- EMPLOYERS
-- ------------------------------------------------------------
CREATE TABLE employers (
    id              SERIAL PRIMARY KEY,
    company_name    VARCHAR(150) NOT NULL,
    industry        VARCHAR(100),
    location        VARCHAR(100),
    description     TEXT,
    is_verified     BOOLEAN DEFAULT FALSE,
    open_roles      SMALLINT DEFAULT 0,
    contact_email   VARCHAR(150),
    joined_at       TIMESTAMP DEFAULT NOW()
);


-- ------------------------------------------------------------
-- CERTIFICATE VERIFICATIONS (employer lookup log)
-- ------------------------------------------------------------
CREATE TABLE certificate_verifications (
    id                  SERIAL PRIMARY KEY,
    employer_id         INT REFERENCES employers(id),
    certificate_code    VARCHAR(60) NOT NULL,
    verified_at         TIMESTAMP DEFAULT NOW(),
    result              VARCHAR(20) CHECK (result IN ('valid', 'invalid', 'revoked'))
);


-- ------------------------------------------------------------
-- SAMPLE DATA — Users
-- ------------------------------------------------------------
INSERT INTO users (full_name, email, password_hash, role, program, year_level, university) VALUES
('Juan Dela Cruz',  'juan@email.com',  'hashed_pw_1', 'student',  'CS', 2, 'University of the Philippines'),
('Maria Santos',    'maria@email.com', 'hashed_pw_2', 'student',  'IT', 1, 'De La Salle University'),
('Admin User',      'admin@certifycs.com', 'hashed_pw_3', 'admin', NULL, NULL, NULL);


-- ------------------------------------------------------------
-- SAMPLE DATA — Courses
-- ------------------------------------------------------------
INSERT INTO courses (title, description, language, duration_weeks, level, field, year_level, total_modules) VALUES
('Introduction to Programming',     'Learn programming fundamentals using Python.',                          'Python',       6,  'Beginner',     'CS & IT', 1, 8),
('Computer Fundamentals',           'How computers work — hardware, software, and binary systems.',          'General',      4,  'Beginner',     'CS & IT', 1, 6),
('Discrete Mathematics',            'Logic, sets, graph theory, and combinatorics for CS.',                  'Math',         8,  'Beginner',     'CS',      1, 10),
('Web Development Basics',          'Build websites using HTML, CSS, and JavaScript.',                       'HTML/CSS/JS',  6,  'Beginner',     'IT',      1, 9),
('Data Structures & Algorithms',    'Core DSA concepts essential for technical interviews.',                 'Java/C++',     10, 'Intermediate', 'CS & IT', 2, 14),
('Object-Oriented Programming',     'OOP principles using Java: encapsulation, inheritance, polymorphism.', 'Java',         8,  'Intermediate', 'CS & IT', 2, 11),
('Database Management Systems',     'Relational databases, SQL querying, and normalization.',                'SQL',          7,  'Intermediate', 'CS & IT', 2, 10),
('Computer Networks',               'TCP/IP, DNS, HTTP, routing, and network security basics.',              'General',      8,  'Intermediate', 'IT',      2, 12),
('Operating Systems',               'OS internals: process management, memory, and file systems.',           'C/Linux',      10, 'Advanced',     'CS',      3, 13),
('Software Engineering',            'SDLC, Agile, testing, CI/CD, and system design principles.',           'General',      9,  'Advanced',     'CS & IT', 3, 12),
('Cybersecurity Fundamentals',      'Threats, vulnerabilities, ethical hacking basics, and defense.',        'General',      8,  'Advanced',     'IT',      3, 11),
('Machine Learning Basics',         'Supervised and unsupervised learning using Python and scikit-learn.',   'Python',       12, 'Advanced',     'CS',      3, 15),
('Cloud Computing & DevOps',        'AWS, Docker, Kubernetes, and CI/CD pipeline mastery.',                  'AWS/Docker',   10, 'Expert',       'CS & IT', 4, 14),
('Artificial Intelligence',         'Deep learning, NLP, computer vision using TensorFlow and PyTorch.',     'Python',       12, 'Expert',       'CS',      4, 16),
('Mobile App Development',          'Cross-platform mobile apps with React Native.',                         'React Native', 10, 'Expert',       'IT',      4, 13),
('Capstone & System Design',        'Large-scale system design and full capstone project.',                  'General',      14, 'Expert',       'CS & IT', 4, 18);


-- ------------------------------------------------------------
-- SAMPLE DATA — Certifications
-- ------------------------------------------------------------
INSERT INTO certifications (name, tag, description, year_level, valid_years) VALUES
('Certified Junior Developer',    'Foundation',     'Validates fundamental programming and computer science knowledge.',                         1, 2),
('Certified Web Foundations',     'Specialization', 'Recognizes proficiency in HTML, CSS, and JavaScript web development fundamentals.',         1, 2),
('Certified DSA Specialist',      'Core',           'Demonstrates mastery in data structures, algorithms, and computational thinking.',          2, 2),
('Certified Database Engineer',   'Specialization', 'Validates expertise in relational databases, SQL, and data modeling.',                      2, 2),
('Certified Security Analyst',    'Specialization', 'Recognizes foundational knowledge in cybersecurity principles and defense strategies.',     3, 2),
('Certified ML Practitioner',     'Emerging Tech',  'Awarded for demonstrated understanding of machine learning algorithms and data science.',   3, 2),
('Certified Cloud Architect',     'Industry-Ready', 'Validates expertise in cloud infrastructure, DevOps, and containerized deployments.',       4, 2),
('Certified AI Engineer',         'Advanced',       'Recognizes deep expertise in AI, ML, and large-scale system design.',                      4, 2);


-- ------------------------------------------------------------
-- SAMPLE DATA — Issued Certificates
-- ------------------------------------------------------------
INSERT INTO issued_certificates (user_id, certification_id, certificate_code, issued_at, expires_at) VALUES
(1, 3, 'cert-2024-dsa', '2025-01-15', '2027-01-15'),
(2, 2, 'cert-2024-web', '2025-03-03', '2027-03-03');


-- ------------------------------------------------------------
-- SAMPLE DATA — Employers
-- ------------------------------------------------------------
INSERT INTO employers (company_name, industry, location, description, is_verified, open_roles, contact_email) VALUES
('TechCorp Philippines',    'Software Development',  'Taguig, PH',   'Leading software solutions company building enterprise systems for APAC clients.',    TRUE, 12, 'hr@techcorp.ph'),
('CloudBase Inc.',          'Cloud Infrastructure',  'BGC, PH',      'Specializes in cloud migration and managed infrastructure services.',                  TRUE, 7,  'talent@cloudbase.ph'),
('DataMinds Analytics',     'Data & AI',             'Makati, PH',   'Data analytics firm powering business intelligence for Fortune 500 companies.',        TRUE, 9,  'careers@dataminds.ph'),
('SecureNet Solutions',     'Cybersecurity',         'Ortigas, PH',  'Provides SOC services, penetration testing, and security consulting.',                 TRUE, 5,  'jobs@securenet.ph'),
('AppBuilders Co.',         'Mobile Development',    'Cebu, PH',     'Top-rated mobile agency with 200+ apps launched across iOS and Android.',              TRUE, 8,  'recruit@appbuilders.ph'),
('AIventures Lab',          'Artificial Intelligence','Remote',       'AI startup building LLM-powered tools for education and healthcare sectors.',          TRUE, 11, 'hello@aiventures.ph');


-- ------------------------------------------------------------
-- USEFUL QUERIES
-- ------------------------------------------------------------

-- Get all courses for a specific year level
SELECT title, level, field, duration_weeks, total_modules
FROM courses
WHERE year_level = 2
ORDER BY field, level;

-- Get a student's enrolled courses and status
SELECT u.full_name, c.title, e.status, e.enrolled_at
FROM enrollments e
JOIN users u ON u.id = e.user_id
JOIN courses c ON c.id = e.course_id
WHERE u.id = 1;

-- Get all certificates earned by a student
SELECT u.full_name, cert.name, ic.certificate_code, ic.issued_at, ic.expires_at
FROM issued_certificates ic
JOIN users u ON u.id = ic.user_id
JOIN certifications cert ON cert.id = ic.certification_id
WHERE u.id = 1;

-- Verify a certificate by code
SELECT ic.certificate_code, u.full_name, cert.name, ic.issued_at, ic.expires_at, ic.is_revoked
FROM issued_certificates ic
JOIN users u ON u.id = ic.user_id
JOIN certifications cert ON cert.id = ic.certification_id
WHERE ic.certificate_code = 'cert-2024-dsa';

-- Check if a student has completed all requirements for a certification
SELECT cr.certification_id, COUNT(*) AS completed_requirements
FROM certification_requirements cr
JOIN enrollments e ON e.course_id = cr.course_id AND e.user_id = 1 AND e.status = 'completed'
WHERE cr.certification_id = 3
GROUP BY cr.certification_id;

-- Count total enrollments per course
SELECT c.title, COUNT(e.id) AS total_enrolled
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY total_enrolled DESC;

-- Get employer verification history
SELECT e.company_name, cv.certificate_code, cv.result, cv.verified_at
FROM certificate_verifications cv
JOIN employers e ON e.id = cv.employer_id
ORDER BY cv.verified_at DESC;
