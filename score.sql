
CREATE DATABASE score;

USE score;

CREATE TABLE User
( 
FirstName CHAR(15),
UserName CHAR(15), 
TikScore INT,
WhackAMoleScore INT, 
Hangman DECIMAL(5,2),
Memor DECIMAL(5,2),
NumberGuesser INT 
);

INSERT INTO User 
VALUES 
('Stephen', 'sgans42', null, null, null, null, null); 