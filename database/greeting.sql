CREATE SCHEMA IF NOT EXISTS chess;
USE chess;

DROP TABLE IF EXISTS DEMO;

CREATE TABLE `DEMO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GREETING` varchar(128) DEFAULT NULL,
  `TIMESTAMP` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

SELECT * from DEMO;


USE chess;

DROP TABLE IF EXISTS `EventGames`; 
DROP TABLE IF EXISTS `PlayerFavourited`; 
DROP TABLE IF EXISTS `PlayedIn`; 
DROP TABLE IF EXISTS `Player`; 
DROP TABLE IF EXISTS `Event`; 
DROP TABLE IF EXISTS `Move`; 
DROP TABLE IF EXISTS `Game`; 

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
  `toSquare` CHAR(2) NOT NULL,
  `fromSquare` CHAR(2) NOT NULL,
  `chessPiece` CHAR(2) NOT NULL,
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

CREATE TABLE `PlayerFavourited` (
  `username` VARCHAR(128) NOT NULL,
  `gid` INT NOT NULL,
  PRIMARY KEY (`username`, `gid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
  FOREIGN KEY(`username`) REFERENCES `Player`(`username`)
);

CREATE TABLE `EventGames` (
  `eid` INT NOT NULL,
  `gid` INT NOT NULL,
  PRIMARY KEY (`eid`, `gid`),
  FOREIGN KEY(`gid`) REFERENCES `Game`(`gid`),
  FOREIGN KEY(`eid`) REFERENCES `Event`(`eid`)
);

-- Queries

SELECT g.gid FROM Game g 
INNER JOIN (
SELECT * 
	FROM PlayedIn 
	WHERE pid = '2'
) p
ON g.gid = p.gid
WHERE 
	(p.isWhite = 1 AND g.winner = 'w')
	OR (p.isWhite = 0 AND g.winner = 'b');
    
--

SELECT gid 
FROM (
	SELECT 
		gid, 
		GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '') AS moves 
	FROM `Move` 
	GROUP BY gid 
	HAVING moves LIKE 'd4d5c4%'
) GamesWithOpening;

--

SELECT 
	numGames * 100 / (SELECT COUNT(*) FROM Game) AS percentOfGames 
FROM (
	SELECT 
		COUNT(gid) AS numGames 
    FROM Move 
    WHERE turnNum = 3 AND chessPiece = 'K'
) NumGamesWithChessPiece;

USE chess;

INSERT INTO `Game` VALUES (1, 'b', '2010-10-10');
INSERT INTO `Game` VALUES (2, 'w', '2011-11-11');
INSERT INTO `Game` VALUES (3, 'w', '2011-11-11');
INSERT INTO `Game` VALUES (4, 'b', '2011-11-11');

INSERT INTO `Move` VALUES (1, 0, 'd4', 'very nice', 'd2', 'd4', 'P');
INSERT INTO `Move` VALUES (1, 1, 'd5', 'wow', 'd7', 'd5', 'P');
INSERT INTO `Move` VALUES (1, 2, 'c4', 'wow', 'c2', 'c4', 'P');
INSERT INTO `Move` VALUES (1, 3, 'e6', 'wow', 'e7', 'e6', 'P');
INSERT INTO `Move` VALUES (1, 4, 'd3', 'wow', 'd1', 'd3', 'Q');
INSERT INTO `Move` VALUES (1, 5, 'd7', 'wow', 'e8', 'd7', 'K');

INSERT INTO `Move` VALUES (2, 0, 'd4', 'very nice', 'd2', 'd4', 'P');
INSERT INTO `Move` VALUES (2, 1, 'd5', 'wow', 'd7', 'd5', 'P');
INSERT INTO `Move` VALUES (2, 2, 'c4', 'wow', 'c2', 'c4', 'P');
INSERT INTO `Move` VALUES (2, 3, 'a5', 'nice', 'a7', 'a5', 'P');
INSERT INTO `Move` VALUES (2, 4, 'f4', 'wow', 'c1', 'f4', 'B');
INSERT INTO `Move` VALUES (2, 5, 'a7', 'wow', 'a8', 'a7', 'R');

INSERT INTO `Move` VALUES (3, 0, 'a4', 'very nice', 'a2', 'a4', 'P');
INSERT INTO `Move` VALUES (3, 1, 'h5', 'very nice', 'h7', 'h5', 'P');
INSERT INTO `Move` VALUES (3, 2, 'a3', 'very nice', 'a1', 'a3', 'R');
INSERT INTO `Move` VALUES (3, 3, 'f6', 'very nice', 'g8', 'f6', 'K');

INSERT INTO `Event` VALUES (1, 'cs348 chess tournament');
INSERT INTO `Event` VALUES (2, 'world championship');

INSERT INTO `EventGames` VALUES (1, 1);
INSERT INTO `EventGames` VALUES (2, 2);
INSERT INTO `EventGames` VALUES (1, 3);
INSERT INTO `EventGames` VALUES (2, 4);

INSERT INTO `Player` VALUES (1, 'jason', NULL, NULL);
INSERT INTO `Player` VALUES (2, 'john', 'john123', 'password');
INSERT INTO `Player` VALUES (3, 'alyssa', 'alyssa123', '123456');
INSERT INTO `Player` VALUES (4, 'colin', NULL, NULL);

INSERT INTO `PlayedIn` VALUES (1, 1, 1500, TRUE);
INSERT INTO `PlayedIn` VALUES (2, 1, 1700, FALSE);
INSERT INTO `PlayedIn` VALUES (3, 2, 1800, TRUE);
INSERT INTO `PlayedIn` VALUES (4, 2, 1900, FALSE);

INSERT INTO `PlayerFavourited` VALUES ('john123', 2);
INSERT INTO `PlayerFavourited` VALUES ('john123', 3);
INSERT INTO `PlayerFavourited` VALUES ('john123', 4);
INSERT INTO `PlayerFavourited` VALUES ('alyssa123', 2);
INSERT INTO `PlayerFavourited` VALUES ('alyssa123', 4);



SELECT 
	g.gid 
FROM Game g 
INNER JOIN (
	SELECT gid FROM PlayerFavourited WHERE username = 'john123'
)uf 
ON g.gid = uf.gid
WHERE g.winner = 'w';



WITH numUsersFavourited AS (
SELECT 
	gid, 
    COUNT(username) AS numFavourited 
FROM PlayerFavourited 
GROUP BY gid
)
SELECT 
	gid 
FROM numUsersFavourited 
WHERE numFavourited = (SELECT MAX(numFavourited) FROM numUsersFavourited);


SELECT DISTINCT favouritedGames.pid, favouritedGames.username FROM EventGames eg
INNER JOIN (
	SELECT p.pid, p.username, pf.gid FROM Player p 
	INNER JOIN PlayerFavourited pf ON p.username = pf.username) favouritedGames
ON eg.gid = favouritedGames.gid
WHERE eid = 2;

