CREATE DATABASE score;
USE score;

CREATE TABLE user_info ( 
id INT(11) NOT NULL AUTO_INCREMENT,
FirstName VARCHAR(15) NOT NULL,
UserName VARCHAR(15) NOT NULL, 
TikScore INT,
WhackAMoleScore INT, 
Hangman DECIMAL(5,2),
Memory DECIMAL(5,2),
NumberGuesser INT, 
PRIMARY KEY (id)
);

INSERT INTO user_info (FirstName, UserName, TikScore, WhackAMoleScore, Hangman, Memory, NumberGuesser)
VALUES ('Stephen', 'sgans42', null, null, null, null, null); 

INSERT INTO user_info (FirstName, UserName, TikScore, WhackAMoleScore, Hangman, Memory, NumberGuesser)
VALUES ('John', 'john426', null, null, null, null, null); 