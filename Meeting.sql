CREATE DATABASE metting;

CREATE TABLE USUARIO(
'idusuario' int NOT NULL,
'username' varchar(45) NOT NULL,
'email' varchar(45) NOT NULL,
'password' TEXT NOT NULL,
'birthday' DATE NULL,
'sex' varchar(1) NOT NULL,
'profession' varchar(45) NOT NULL,
'extrainfo' varchar(45) NULL,
'age' int NOT NULL,
'name' varchar('45') NOT NULL,
PRIMARY KEY('idusuario'));

INSERT INTO USUARIO VALUES(
1,
'jdoe',
'jdoe@gmail.com',
'mypassword',
'14-09-1989',
'M',
'Engineer',
'',
36,
'John Doe')


