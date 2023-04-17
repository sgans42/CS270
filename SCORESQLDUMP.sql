-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2022 at 04:10 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` ( 
id INT(11) NOT NULL AUTO_INCREMENT,
FirstName VARCHAR(15) NOT NULL,
UserName VARCHAR(15) NOT NULL, 
TikScore INT,
WhackAMoleScore INT, 
Hangman DECIMAL(5,2),
Memory DECIMAL(5,2),
NumberGuesser INT, 
PRIMARY KEY (id)
); ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`FirstName`, `UserName`, `TikScore`, `WhackAMoleScore`, `Hangman`, `Memory`, `NumberGuesser`) VALUES
('Stephen', 'sgans42', null, null, null, null, null), 
('John', 'john426', null, null, null, null, null);
