import chess.pgn
import mysql.connector
import re

# Change the credentials
cnx = mysql.connector.connect(user='root', password='password',
                              database='chess')
cursor = cnx.cursor()

date_regex = re.compile('^\d{4}\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])$')

pgn = open('tenth_cleaned.pgn', encoding='iso-8859-1')

INSERT_GAME_SQL = 'INSERT INTO `Game` VALUES (NULL, %s, %s)'
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
  
  data = (winner, date)
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

  event = h['Event']
  if len(event) > 0:
    if event not in event_ids:
      data = (event,)
      cursor.execute(INSERT_EVENT_SQL, data)
      event_ids[event] = cursor.lastrowid
    data = (event_ids[event], gid)
    cursor.execute(INSERT_EVENTGAME_SQL, data)

  insert_moves(g, gid)
  cnx.commit()

def main():
  f = chess.pgn.read_game(pgn)
  i = 0
  num_variations = 0
  num_result_missing = 0
  while f is not None:
    i += 1
    result = insert_record(f)
    if result == 'v':
      num_variations += 1
    elif result == 'r':
      num_result_missing += 1
    f = chess.pgn.read_game(pgn)
    if i % 100 == 0:
      print(i)
    if i > 10000: # change this line to fill db with more/less games
      break
  print("num variations:", num_variations)
  print("num result missing:", num_result_missing)

main()
