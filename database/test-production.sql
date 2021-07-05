-- QUERY ONE
-- Selecting Player 1's winning games
SELECT g.gid FROM Game g 
INNER JOIN (
SELECT * 
	FROM PlayedIn 
	WHERE pid = '1'
) p
ON g.gid = p.gid
WHERE 
	(p.isWhite = 1 AND g.winner = 'w')
	OR (p.isWhite = 0 AND g.winner = 'b')
LIMIT 10;

-- QUERY TWO
-- View games with a particular opening: 'd4d5c4'
SELECT gid
FROM (
	SELECT 
		gid, 
		GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves 
	FROM `Move` 
	GROUP BY gid 
	HAVING moves LIKE 'd4-d5-c4%'
) GamesWithOpening
LIMIT 10;

-- QUERY THREE
-- View percentage of games that have the fourth move as Pawn (P)
SELECT 
	numGames * 100 / (SELECT COUNT(*) FROM Game) AS percentOfGames 
FROM (
	SELECT 
		COUNT(gid) AS numGames 
    FROM Move 
    WHERE turnNum = 3 AND chessPiece = 'P'
) NumGamesWithChessPiece;

-- QUERY FOUR
-- View win stats for games with a particular opening
SELECT 
	SUM(CASE
		WHEN winner = 'w' THEN 1
		ELSE 0
		END) AS numWhiteWins,
	SUM(CASE
		WHEN winner = 'b' THEN 1
		ELSE 0
		END) AS numBlackWins,
	COUNT(*) AS numGames
FROM (
	SELECT 
		gid, 
		GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves 
	FROM `Move` 
	GROUP BY gid 
	HAVING moves LIKE 'd4-d5-c4%'
) GamesWithMove, Game
WHERE GamesWithMove.gid = Game.gid;

-- QUERY FIVE
-- Game and player metadata for player with pid='1'

SELECT g.gid, winner, `date`, pi1.pid AS pid1, pi2.pid AS pid2, pi1.elo AS elo1, pi2.elo AS elo2, pi1.isWHite AS p1IsWhite, p1.name as p1name, p2.name as p2name, p1.username as p1username, p2.username as p2username FROM Game g 
	INNER JOIN PlayedIn pi1
		ON g.gid = pi1.gid AND pi1.pid = '1'
	INNER JOIN PlayedIn pi2
		ON g.gid = pi2.gid AND pi2.pid != '1'
	INNER JOIN Player p1
		ON pi1.pid = p1.pid
	INNER JOIN Player p2
		ON pi2.pid = p2.pid
LIMIT 10;
        
-- QUERY SIX
-- Get all moves from game with gid 1
SELECT * FROM Move WHERE gid = 1 LIMIT 10;