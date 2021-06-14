-- Selecting player 1 games, where player 1 won

SELECT * FROM GAME g 
INNER JOIN (
SELECT * 
	FROM PLAYED_IN 
	WHERE pid = '1'
) p
ON g.gid = p.gid
WHERE 
(p.isWhite = 1 AND g.winner = 'w')
	OR (p.isWhite = 0 AND g.winner = 'b');

-- Inserting new Game, with associated moves and event

INSERT INTO `Game` VALUES (1, 'b', '2010-10-10');

INSERT INTO `Move` VALUES (1, 0, 'd4', 'very nice');
INSERT INTO `Move` VALUES (1, 1, 'd5', 'wow';
INSERT INTO `Move` VALUES (1, 2, 'c4', 'wow');
INSERT INTO `Move` VALUES (1, 3, 'e6', 'wow');

INSERT INTO `Event` VALUES (1, 'cs348 chess tournament');

INSERT INTO `Event_Games` VALUES (1, 1);

-- Adding a new Player

INSERT INTO `Player` VALUES (2, 'john', 'john', 'password');

-- View stats about win/loss rates for a particular opening

SELECT * FROM GAME g INNER JOIN MOVE m ON g.gid = m.gid WHERE m.turnNum = 2 AND m.previousMoves LIKE 'd4d5%';

-- Find openings with the highest win-rates