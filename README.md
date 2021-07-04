<img src="https://i.pinimg.com/originals/5e/45/c3/5e45c3f6445fba750c3b4776c7a298fb.gif"  width="300"><img/>

# CS 348 Final Project
This is an interactive database of chess games that lets the user enter any sequence of valid chess moves and view statistics about chess games that have been previously played starting from the same opening sequence of moves that the user has entered. An example application that inspired our application is the Chess Tempo chess database. We plan to use a Kaggle Dataset that consists of 3.5 million games. 

Any chess enthusiast can use our application. By creating a user account, it gives the user the freedom to add their own games and to save their favourite openings. In addition, we also plan to incorporate additional features such as searching/filtering through chess games, interactively inputting a beginning sequence of moves, viewing statistics about win/loss rates for a particular opening, and viewing statistics about the distribution of ELO ratings of players that have played a certain opening (e.g. average ELO).

### Installation Instructions for Sample Databse to Chosen Platform:

1. Install the tools specified in the Tools and Version Requirements section below.
2. Clone the git repository
3. To setup MySQL, first create a password for the root user. Once done, open up MySQLWorkbench and connect to the database, entering the password that you created earlier. Then, by opening the following files in MySQLWorkbench, run `database/create_tables.sql` to create the necessary schemas and tables and run `database/insert_sample_data.sql` to insert the hardcoded sample data. The sample queries can then be run using `database/test-sample.sql` (its output should match the output in `database/test-sample.out`).
4. Open Spring Tool Suite, set 'chess' as the workspace. Once opened, choose the option to import an existing Maven project, select 'backend' folder within 'chess'. If nothing is showing up, try clicking on 'View' in the menu bar and click on 'Package Explorer'. You should now be able to see all the contents within the backend folder.
5. Modify the application.properties file with the password to connect to your local database.
6. Right click 'backend' and run as 'Spring Boot App' to start the server.
7. Now, can use Postman to make post requests to http://localhost:8080/v1/greeting/ with JSON body { name: ANY_VALUE }, and will see the updated value entered into your DB as well as the response of all users in the DB currently
8. In order to see the application on brower, go to the frontend folder in the command terminal and run npm install and then npm start to start the React app. You can now interact with the project UI at http://localhost:3000/. The frontend is currently set up to be able to make a post request which then receives a response with the updated list of all current users in DB and displays it in the UI.

#### Tools and Version Requirements
Tested on Ubuntu 18.04 and macOS 11.4

To run the main application:
1. [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) (>= 8.0.25)
2. `jdk` (>= 11.0.5)
3. [Spring Tool Suite](https://spring.io/tools)
4. [Postman](https://www.postman.com/product/rest-client/)
5. [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (>= 8.0.25)

To run `populate_db.sh`:
1. `python3` (>= 3.8.5)
- `mysql-connector-python` (`pip3 install mysql-connector-python`)
3. `gcc`(>= 7.5)
4. `make` (>= 4.1)
5. `wget`

The provided versions are what we used during development. We cannot guarantee that lower versions of these dependencies will still work.

### How to Populate your DB with Real Data

1. Download the pgn file: https://drive.google.com/u/0/uc?id=0Bw0y3jV73lx_NElnLWVlNG9KNkU&export=download
2. Extract the file and make sure it is in this directory
3. Run the create_tables.sql script on your MySQL server
4. Edit `insert_from_pgn.py` with your credentials at the top of script. The bottom of the script has a loop
which determines how many games to extract. It is set to 10000 right now.
5. Run `bash populate_db.sh`. You should probably look at the script to read what it does

### Features Currently Supported

Our DB current supports features to store games, users/players, and associated moves and events. Our front-end application currently supports the functionality to register new players and add them to our database through the UI.

## How to Run the Application

To run the application, start your local MySQL database (as detailed above). Next, run the Java `backend` part of the application with the Spring Boot Client, as explained for getting the sample database and endpoints set-up. And finally, cd into the `frontend` part of the project, run `npm install` and then run `npm start` to actually see the project live.

In essence, to run this application, we need to start our database (stores all our chess data), our back-end (which handles the queries to the DB), and then finally run the front-end (pings the API endpoints supported by our back-end), which the user will see + interact with.