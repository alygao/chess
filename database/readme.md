# How to Populate your DB with Real Data

1. Download the pgn file: https://drive.google.com/u/0/uc?id=0Bw0y3jV73lx_NElnLWVlNG9KNkU&export=download
2. Extract the file and make sure it is in this directory
3. Run the create_tables.sql script on your MySQL server
4. Edit `insert_from_pgn.py` with your credentials at the top of script. The bottom of the script has a loop
which determines how many games to extract. It is set to 10000 right now.
6. Run `bash populate_db.sh`. You should probably look at the script to read what it does
