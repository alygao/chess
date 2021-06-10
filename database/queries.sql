USE chess;

-- Find games played by jason
SELECT * FROM Game, PlayedIn, Player WHERE Player.name = 'jason' AND Player.pid = PlayedIn.pid AND Game.gid = PlayedIn.gid;

-- Find games with the given opening
-- Keep adding subqueries if you want to filter based on more turns
-- is there a better way to do this?
SELECT gid FROM `Move` WHERE turnNum = 2 AND moveString = 'c4' AND gid in 
  (SELECT gid FROM `Move` WHERE turnNum = 1 AND moveString = 'd5' AND gid in 
    (SELECT gid FROM `Move` WHERE turnNum = 0 AND moveString = 'd4')
  );

-- Find the most popular opening move
SELECT moveString, timesUsed FROM
  (SELECT moveString, COUNT(*) AS timesUsed FROM `Move` WHERE turnNum = 0 GROUP BY moveString) AS T
WHERE timesUsed >= ALL(SELECT COUNT(*) FROM `Move` GROUP BY moveString);
