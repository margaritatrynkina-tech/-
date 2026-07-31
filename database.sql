CREATE DATABASE IF NOT EXISTS romantic_invite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE romantic_invite;

CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    place VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    outfit TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;