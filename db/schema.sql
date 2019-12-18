create database hrApp;
use hrApp;

create table employees (
    id int auto_increment not null,
    first_name varchar (12) not null,
    last_name varchar (15) not null,
    email varchar (30) not null,
    phone int not null,
    hire_date date not null,
    position varchar (12) not null,
    ssn int not null,
    dob date not null,
    marital boolean,
    gender varchar (8),
    full_time boolean not null,
    drivers_liscence boolean not null,
    gov_docs boolean not null,
    primary key (id)
)