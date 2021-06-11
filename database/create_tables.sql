USE chess;

CREATE TABLE `Game` (
  `gid` INT NOT NULL AUTO_INCREMENT,
  `winner` CHAR(1) NOT NULL CHECK(`winner` = 'b' OR `winner` = 'w' OR `winner` = 't'),
  `date` DATE DEFAULT NULL,
  PRIMARY KEY (`gid`)
);

CREATE TABLE `Move` (
  `gid` INT NOT NULL,
  `turnNum` INT NOT NULL, -- todo: make assertion to guarantee this is sequential
  `moveString` VARCHAR(16) NOT NULL,
  `annotation` VARCHAR(128) DEFAULT NULL,
  -- Can add fromSquare, toSquare, chessPiece if we need them for our ui
  PRIMARY KEY (`gid`, `turnNum`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`)
);

CREATE TABLE `Event` (
  `eid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`eid`)
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

CREATE TABLE `UserFavorited` (
  `pid` INT NOT NULL,
  `gid` INT NOT NULL,
  PRIMARY KEY (`pid`, `gid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
  FOREIGN KEY(`pid`) REFERENCES `Player`(`pid`)
);

CREATE TABLE `EventGames` (
  `eid` INT NOT NULL,
  `gid` INT NOT NULL,
  PRIMARY KEY (`eid`, `gid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
  FOREIGN KEY(`eid`) REFERENCES `Event`(`eid`)
);
