
CREATE DATABASE score;
USE score;

CREATE TABLE user_info ( 
	first_name VARCHAR(15) NOT NULL,
	username VARCHAR(15) NOT NULL, 
	PRIMARY KEY (username)
);

CREATE TABLE tic_tac_toe (
  user VARCHAR(15),
  score1 INT,
  FOREIGN KEY (user) REFERENCES user_info(username)
);

CREATE TABLE whack_a_mole (
  user VARCHAR(15),
  score1 DECIMAL(5,2),
	score2 DECIMAL(5,2),
	score3 DECIMAL(5,2),
  FOREIGN KEY (user) REFERENCES user_info(username)
);

CREATE TABLE hangman (
  user VARCHAR(15),
	score1 INT,
  FOREIGN KEY (user) REFERENCES user_info(username)
);

CREATE TABLE memory (
  user VARCHAR(15),
  score1 INT,
	score2 INT,
	score3 INT,
  FOREIGN KEY (user) REFERENCES user_info(username)
);

CREATE TABLE number_guesser (
  user VARCHAR(15),
  score1 INT,
	score2 INT,
	score3 INT,
  FOREIGN KEY (user) REFERENCES user_info(username)
);



INSERT INTO user_info (first_name, username) VALUES
('Stephen', 'sgans42'), 
('John', 'john426'),
('David', 'dgans88');


INSERT INTO tic_tac_toe (user, score1) VALUES 
('sgans42', 10), ('john426', 12), ('dgans88', 14);

INSERT INTO whack_a_mole (user, score1, score2, score3) VALUES 
('sgans42', 15, 15, 15), ('john426', 18, 18, 18), ('dgans88', 21, 21, 21);

INSERT INTO hangman (user, score1) VALUES 
('sgans42', 4), ('john426', 6), ('dgans88', 28);

INSERT INTO memory (user, score1, score2, score3) VALUES 
('sgans42', 7, 6, 5), ('john426', 6, 5, 4), ('dgans88', 7, 6, 5);

INSERT INTO number_guesser (user, score1, score2, score3) VALUES 
('sgans42', 3, 30, 30), ('john426', 36, 36, 36), ('dgans88', 42, 42, 42);
