-- Drops the beernuts_db if it exists currently --
DROP DATABASE IF EXISTS beernuts_db;
-- Creates the "beernuts_db" database --
CREATE DATABASE beernuts_db;
-- Makes it so all of the following code will affect beernuts_db --
USE beernuts_db;
-- Creates the table "crawlers" within beernuts_db --
CREATE TABLE crawlers (
  idcrawlers INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "username" which cannot contain null --
  username VARCHAR(45) NOT NULL,
    -- Makes a string column called "user_email" which cannot contain null --
  user_email VARCHAR(100) NOT NULL,
    -- Makes a string column called "user_city" which cannot contain null --
  user_city VARCHAR(45) NOT NULL,
      -- Makes a string column called "user_city" which cannot contain null --
  user_state VARCHAR(2) NOT NULL,
      -- Makes a string column called "user_state" which cannot contain null --
  user_zip VARCHAR(5) NOT NULL,
      -- Makes a string column called "user_zip" which cannot contain null --
  user_blurb VARCHAR(150) NOT NULL,
      -- Makes a string column called "user_password" not null --
  user_password VARCHAR(25) NOT NULL,
  -- Makes an TIMESTAMP column called "user_created" --
  user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (idcrawlers)
);