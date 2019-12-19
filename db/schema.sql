create database hrApp;
use hrApp;

create table employees (
    id int auto_increment not null,
    first_name varchar (40) not null,
    last_name varchar (40) not null,
    email varchar (100) not null,
    phone varchar (14) not null,
    hire_date date not null,
    position varchar (30) not null,
    ssn int not null,
    dob date not null,
    marital boolean,
    gender varchar (20),
    full_time boolean not null,
    drivers_liscense boolean not null,
    gov_docs boolean not null,
    primary key (id)
);