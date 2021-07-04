CREATE SCHEMA IF NOT EXISTS chess;

USE chess;

DROP TABLE IF EXISTS `EventGames`; 
DROP TABLE IF EXISTS `PlayerFavourited`; 
DROP TABLE IF EXISTS `PlayedIn`; 
DROP TABLE IF EXISTS `Player`; 
DROP TABLE IF EXISTS `Event`; 
DROP TABLE IF EXISTS `Move`; 
DROP TABLE IF EXISTS `Game`; 


CREATE TABLE `Event` (
  `eid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`eid`)
);

CREATE TABLE `Game` (
  `gid` INT NOT NULL AUTO_INCREMENT,
  `winner` CHAR(1) NOT NULL CHECK(`winner` = 'b' OR `winner` = 'w' OR `winner` = 't'),
  `date` DATE DEFAULT NULL,
  `eid` INT NOT NULL,
  PRIMARY KEY (`gid`),
  FOREIGN KEY(`eid`) REFERENCES `Event`(`eid`)
);

CREATE TABLE `Move` (
  `gid` INT NOT NULL,
  `turnNum` INT NOT NULL, -- todo: make assertion to guarantee this is sequential
  `moveString` VARCHAR(16) NOT NULL,
  `annotation` VARCHAR(128) DEFAULT NULL,
  `toSquare` CHAR(2) NOT NULL,
  `fromSquare` CHAR(2) NOT NULL,
  `chessPiece` CHAR(2) NOT NULL,
  -- Can add fromSquare, toSquare, chessPiece if we need them for our ui
  PRIMARY KEY (`gid`, `turnNum`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`)
);

CREATE TABLE `Player` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) DEFAULT NULL,
  `username` VARCHAR(128) DEFAULT NULL UNIQUE,
  `password` VARCHAR(128) DEFAULT NULL, -- note: in real life we would store a password hash
  PRIMARY KEY (`pid`)
);

CREATE TABLE `PlayedIn` (
  `pid` INT NOT NULL,
  `gid` INT NOT NULL,
  `elo` INT DEFAULT NULL, -- todo: create assertion to check this is within range
  `isWhite` BOOLEAN NOT NULL, -- todo: create assertion that only 1 person is white per game
  PRIMARY KEY (`pid`, `gid`),
  FOREIGN KEY(`pid`) REFERENCES `Player`(`pid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`)
);

CREATE TABLE `PlayerFavourited` (
  `username` VARCHAR(128) NOT NULL,
  `gid` INT NOT NULL,
  PRIMARY KEY (`username`, `gid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
  FOREIGN KEY(`username`) REFERENCES `Player`(`username`)
);

-- CREATE TABLE `EventGames` (
--   `eid` INT NOT NULL,
--   `gid` INT NOT NULL,
--   PRIMARY KEY (`eid`, `gid`),
--   FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
--   FOREIGN KEY(`eid`) REFERENCES `Event`(`eid`)
-- );