<img src="https://i.pinimg.com/originals/5e/45/c3/5e45c3f6445fba750c3b4776c7a298fb.gif"  width="300"><img/>

# CS 348 Final Project
This is an interactive database of chess games that lets the user enter any sequence of valid chess moves and view statistics about chess games that have been previously played starting from the same opening sequence of moves that the user has entered. An example application that inspired our application is the Chess Tempo chess database. We plan to use a Kaggle Dataset that consists of 3.5 million games. 

Any chess enthusiast can use our application. By creating a user account, it gives the user the freedom to add their own games and to save their favourite openings. In addition, we also plan to incorporate additional features such as searching/filtering through chess games, interactively inputting a beginning sequence of moves, viewing statistics about win/loss rates for a particular opening, and viewing statistics about the distribution of ELO ratings of players that have played a certain opening (e.g. average ELO).


### Installation Instructions for Sample Databse to Chosen Platform:
<ol>
<li>Download MySQL, Java, [Spring Tool Suite](https://spring.io/tools), [Postman](https://www.postman.com/product/rest-client/), and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)</li>
<li>Clone the git repository</li>
<li>To setup MySQL, first create a password. Once done, open up MySQLWorkbench and connect to the database, entering the password that you created earlier. Then, under the database folder, run the series of commands in greeting.sql to create the necessary schemas and tables.</li>
<li>Open Spring Tool Suite, set 'chess' as the workspace. Once opened, choose the option to import an existing Maven project, select 'backend' folder within 'chess'. If nothing is showing up, try clicking on 'View' in the menu bar and click on 'Package Explorer'. You should now be able to see all the contents within the backend folder.</li>
<li>Modify the application.properties file with the password to connect to your local database.</li>
<li>Right click 'backend' and run as 'Spring Boot App' to start the server.</li>
<li>Now, can use Postman to make post requests to http://localhost:8080/v1/greeting/ with JSON body { name: ANY_VALUE }, and will see the updated value entered into your DB as well as the response of all users in the DB currently</li>
<li>In order to see the application on brower, go to the frontend folder in the command terminal and run npm install and then npm start to start the React app. You can now interact with the project UI at http://localhost:3000/. The frontend is currently set up to be able to make a post request which then receives a response with the updated list of all current users in DB and displays it in the UI.</li>
</ol>


### How to Populate your DB with Real Data

1. Download the pgn file: https://drive.google.com/u/0/uc?id=0Bw0y3jV73lx_NElnLWVlNG9KNkU&export=download
2. Extract the file and make sure it is in this directory
3. Run the create_tables.sql script on your MySQL server
4. Edit `insert_from_pgn.py` with your credentials at the top of script. The bottom of the script has a loop
which determines how many games to extract. It is set to 10000 right now.
5. Run `bash populate_db.sh`. You should probably look at the script to read what it does

### Features Currently Supported

Our DB current supports features to store games, users/players, and associated moves and events. The UI currently supports simple, mock calls to our back-end to query data.