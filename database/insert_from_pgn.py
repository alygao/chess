import chess.pgn
import mysql.connector
import re

cnx = mysql.connector.connect(user='root', password='password',
                              database='chess')
cursor = cnx.cursor()

date_regex = re.compile('^\d{4}\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])$')

pgn = open("/home/jason/Desktop/cs348/project/tenth_cleaned.pgn", encoding="iso-8859-1")

s1 = "INSERT INTO `Game` VALUES (NULL, %s, %s)"

def print_moves(g):
  print(g.mainline())
  board = g.board()
  for move in g.mainline_moves():
    board.push(move)

def insert_game(g):
  h = g.headers
  if 'SetUp' in h:
    return False
  
  if h['Result'] == '1/2-1/2':
    winner = 't'
  elif h['Result'] == '1-0':
    winner = 'w'
  elif h['Result'] == '0-1':
    winner = 'b'
  else:
    return False

  date = None
  if date_regex.search(h['Date']) is not None:
    date = h['Date']
  
  data = (winner, date)
  cursor.execute(s1, data)
  cnx.commit()
  gid = cursor.lastrowid

def main():
  f = chess.pgn.read_game(pgn)
  i = 0
  while f is not None:
    i += 1
    insert_game(f)
    f = chess.pgn.read_game(pgn)
    if i % 1 == 0:
      print(i)
    if i > 20:
      break

main()
# todo: handle errors, 
# check if following variations gives the correct game
# extract relevant info