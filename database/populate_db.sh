# 1. Take the first 10% of games
head -18776864 all.pgn > tenth.pgn
# 2. Download and compile pgn-extract
wget https://www.cs.kent.ac.uk/~djb/pgn-extract/pgn-extract-21-02.tgz
tar -zxvf pgn-extract-21-02.tgz
rm pgn-extract-21-02.tgz
cd pgn-extract
make
# 3. Run the python script to update our db
cd ..
pip3 install chess
./pgn-extract/pgn-extract tenth.pgn -o tenth_cleaned.pgn &> /dev/null
python3 insert_from_pgn.py
