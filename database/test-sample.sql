-- QUERY ONE
-- Selecting Player 2's winning games
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

-- QUERY TWO
-- View games with a particular opening: 'd4d5c4'
SELECT gid, moves
FROM (
	SELECT 
		gid, 
		GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '') AS moves 
	FROM `Move` 
	GROUP BY gid 
	HAVING moves LIKE 'd4d5c4%'
) GamesWithOpening;

-- QUERY THREE
-- View percentage of games that have the fourth move as King (K)
SELECT 
	numGames * 100 / (SELECT COUNT(*) FROM Game) AS percentOfGames 
FROM (
	SELECT 
		COUNT(gid) AS numGames 
    FROM Move 
    WHERE turnNum = 3 AND chessPiece = 'K'
) NumGamesWithChessPiece;

-- QUERY FOUR
-- View user(john123)'s favourited games in which the winner was white.
SELECT 
	g.gid 
FROM Game g 
INNER JOIN (
	SELECT gid FROM PlayerFavourited WHERE username = 'john123'
)uf 
ON g.gid = uf.gid
WHERE g.winner = 'w';

-- QUERY FIVE
-- View most favourited games
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

-- QUERY SIX
-- View all users who favourited games at Event (ID = 2)
SELECT DISTINCT favouritedGames.pid, favouritedGames.username FROM EventGames eg
INNER JOIN (
	SELECT p.pid, p.username, pf.gid FROM Player p 
	INNER JOIN PlayerFavourited pf ON p.username = pf.username) favouritedGames
ON eg.gid = favouritedGames.gid
WHERE eid = 2;

-- QUERY SEVEN
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
		GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '') AS moves 
	FROM `Move` 
	GROUP BY gid 
	HAVING moves LIKE 'd4d5c4%'
) GamesWithMove, Game
WHERE GamesWithMove.gid = Game.gid;

-- Other potential queries we plan to do:
-------- View stats about win/loss rates for a particular opening
-------- Find openings with the highest win-rates