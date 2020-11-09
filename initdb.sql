CREATE DATABASE verzeo;
use verzeo;
create table contacts (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, email VARCHAR(30) NOT NULL, msg TEXT);
