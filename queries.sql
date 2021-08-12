-- TABLE CREATION SCRIPT

CREATE SCHEMA IF NOT EXISTS chess;

USE chess;

ALTER TABLE `Game`DROP INDEX `FilteredGames`;
DROP TABLE IF EXISTS `PlayerFavourited`; 
DROP TABLE IF EXISTS `PlayedIn`; 
DROP TABLE IF EXISTS `Player`; 
DROP TABLE IF EXISTS `Move`; 
DROP TABLE IF EXISTS `Game`; 
DROP TABLE IF EXISTS `Event`; 


CREATE TABLE `Event` (
  `eid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`eid`)
);

CREATE TABLE `Game` (
  `gid` INT NOT NULL AUTO_INCREMENT,
  `winner` CHAR(1) NOT NULL CHECK(`winner` = 'b' OR `winner` = 'w' OR `winner` = 't'),
  `date` DATE DEFAULT NULL,
  `eid` INT DEFAULT NULL,
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

CREATE INDEX `FilteredGames`
ON `Game` (winner);


-- PYTHON SCRIPT FOR IMPORTING PRODUCTION DATASET

import chess.pgn
import mysql.connector
import re

# Change the credentials
cnx = mysql.connector.connect(user='root', password='password',
                              database='chess')
cursor = cnx.cursor()

date_regex = re.compile('^\d{4}\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])$')

pgn = open('tenth_cleaned.pgn', encoding='iso-8859-1')

INSERT_GAME_SQL = 'INSERT INTO `Game` VALUES (NULL, %s, %s, %s)'
INSERT_PLAYER_SQL  = 'INSERT INTO `Player` VALUES (NULL, %s, NULL, NULL)'
INSERT_PLAYEDIN_SQL = 'INSERT INTO `PlayedIn` VALUES (%s, %s, %s, %s)'
INSERT_EVENT_SQL = 'INSERT INTO `Event` VALUES (NULL, %s)'
INSERT_EVENTGAME_SQL = 'INSERT INTO `EventGames` VALUES (%s, %s)'
INSERT_MOVE_SQL = 'INSERT INTO `Move` VALUES (%s, %s, %s, %s, %s, %s, %s)'

player_ids = {}
event_ids = {}

def print_moves(g):
  print("new: ", g.mainline())
  board = g.board()
  for move in g.mainline_moves():
    print(board.san(move))
    board.push(move)

def insert_moves(g, gid):
  board = g.board()
  turn_num = 0
  for move in g.mainline_moves():
    move_string = board.san(move)
    # Assume there is no annotation for now
    annotation = None
    to_square = chess.square_name(move.to_square)
    from_square = chess.square_name(move.from_square)
    chess_piece = board.piece_at(move.from_square).symbol()

    data = (gid, turn_num, move_string, annotation, to_square, from_square, chess_piece)
    cursor.execute(INSERT_MOVE_SQL, data)
    board.push(move)
    turn_num += 1

def insert_record(g):
  h = g.headers
  if 'SetUp' in h:
    return 'v'
  
  if h['Result'] == '1/2-1/2':
    winner = 't'
  elif h['Result'] == '1-0':
    winner = 'w'
  elif h['Result'] == '0-1':
    winner = 'b'
  else:
    return 'r'

  date = None
  if date_regex.search(h['Date']) is not None:
    date = h['Date']
  
  event = h['Event']
  if len(event) > 0:
    if event not in event_ids:
      data = (event,)
      cursor.execute(INSERT_EVENT_SQL, data)
      event_ids[event] = cursor.lastrowid

  data = (winner, date, event_ids[event])
  cursor.execute(INSERT_GAME_SQL, data)
  gid = cursor.lastrowid

  # Insert players if necessary
  white = h['White']
  black = h['Black']
  if white not in player_ids:
    data = (white,)
    cursor.execute(INSERT_PLAYER_SQL, data)
    player_ids[white] = cursor.lastrowid
  if black not in player_ids:
    data = (black,)
    cursor.execute(INSERT_PLAYER_SQL, data)
    player_ids[black] = cursor.lastrowid
    
  try:
    welo = h['WhiteElo']
    welo = int(welo)
  except:
    welo = None
  data = (player_ids[white], gid, welo, True)
  cursor.execute(INSERT_PLAYEDIN_SQL, data)
  
  try:
    belo = h['BlackElo']
    belo = int(belo)
  except:
    belo = None
  data = (player_ids[black], gid, belo, False)
  cursor.execute(INSERT_PLAYEDIN_SQL, data)


  insert_moves(g, gid)
  cnx.commit()

def main():
  f = chess.pgn.read_game(pgn)
  i = 0
  num_variations = 0
  num_result_missing = 0
  num_exceptions = 0
  while f is not None:
    i += 1
    try:
      result = insert_record(f)
      if result == 'v':
        num_variations += 1
      elif result == 'r':
        num_result_missing += 1
    except Exception as e:
      print(e)
      num_exceptions += 1
    f = chess.pgn.read_game(pgn)
    if i % 100 == 0:
      print(i)
    if i > 10000: # change this line to fill db with more/less games
      break
  print("num variations:", num_variations)
  print("num result missing:", num_result_missing)
  print("num exceptions:", num_exceptions)

main()


-- EVENTS QUERIES

private static String SELECT_SQL = "SELECT eid, name FROM Event LIMIT 100";
private static String GAME_WITH_EID_SELECT_SQL = "SELECT * FROM Game WHERE eid = ? LIMIT 100";
private static String PLAYERS_IN_GAME_SELECT_SQL = "SELECT p.pid, p.name, p.username, pi.elo, pi.isWhite FROM Player p INNER JOIN PlayedIn pi ON p.pid = pi.pid WHERE pi.gid = ?";

-- GAME QUERIES

private static String WIN_STATS_SQL = "SELECT SUM(CASE WHEN winner = 'w' THEN 1 ELSE 0 END) AS numWhiteWins, SUM(CASE WHEN winner = 'b' THEN 1 ELSE 0 END) AS numBlackWins, SUM(CASE WHEN winner = 't' THEN 1 ELSE 0 END) AS numDraws, COUNT(*) AS numGames FROM ( SELECT gid, GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-') AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) GamesWithMove, Game WHERE GamesWithMove.gid = Game.gid";
private static String NEXT_MOVES_GIVEN_OPENING_SQL = "SELECT DISTINCT SUBSTRING_INDEX(moves, '-', -1) AS nextMoveGivenOpening FROM (SELECT SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT moveString ORDER BY turnNum SEPARATOR '-'), '-', (LENGTH(?)-LENGTH(REPLACE(?,'-',''))) + 1) AS moves FROM `Move` GROUP BY gid HAVING moves LIKE ?) NextMovesGivenOpening;";
private static String GAME_WITH_PLAYER_SELECT_SQL = "SELECT g.gid, winner, `date`, pi1.pid AS pid1, pi2.pid AS pid2, pi1.elo AS elo1, pi2.elo AS elo2, pi1.isWHite AS p1IsWhite, p1.name as p1name, p2.name as p2name, p1.username as p1username, p2.username as p2username FROM Game g INNER JOIN PlayedIn pi1 ON g.gid = pi1.gid AND pi1.pid = ? INNER JOIN PlayedIn pi2 ON g.gid = pi2.gid AND pi2.pid != ? INNER JOIN Player p1 ON pi1.pid = p1.pid INNER JOIN Player p2 ON pi2.pid = p2.pid LIMIT 100";
private static String GAME_WITH_PLAYER_NAME_SELECT_SQL = "SELECT DISTINCT g.gid, g.winner, g.date, g.eid FROM Game g INNER JOIN PlayedIn pi ON g.gid = pi.gid INNER JOIN Player p ON pi.pid = p.pid WHERE name LIKE ?";
private static String USER_FAVOURITED_GAMES_SQL = "SELECT g.gid, g.winner, g.date, g.eid FROM Game g INNER JOIN (SELECT gid FROM PlayerFavourited WHERE username = ?) pf ON g.gid = pf.gid";
private static String DELETE_USER_FAVOURITED_GAME_SQL = "DELETE FROM PlayerFavourited WHERE username = ? AND gid = ?;";
private static String ADD_USER_FAVOURITED_GAME_SQL = "INSERT INTO PlayerFavourited VALUES (?, ?);";
private static String PLAYERS_IN_GAME_SELECT_SQL = "SELECT p.pid, p.name, p.username, pi.elo, pi.isWhite FROM Player p INNER JOIN PlayedIn pi ON p.pid = pi.pid WHERE pi.gid = ?";
private static String SINGLE_GAME_SELECT_SQL = "SELECT gid, winner, date, eid FROM Game WHERE gid = ?";
private static String MOVES_IN_GAME_SQL = "SELECT * FROM Move WHERE gid = ?";

-- PLAYER QUERIES

private static String UNIQUE_SQL = "SELECT pid FROM Player WHERE username = ?";
private static String INSERT_SQL = "INSERT INTO Player (name, username, password) VALUES (?,?,?)";
private static String SELECT_SQL = "SELECT pid, name, username FROM Player WHERE name = ?";
private static String GET_NAME_SQL = "SELECT name FROM Player WHERE username = ?";
private static String LOGIN_SQL = "SELECT pid FROM Player WHERE username = ? AND password = ?";