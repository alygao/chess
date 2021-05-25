# CS 348 Final Project
This is an interactive database of chess games that lets the user enter any sequence of valid chess moves and view statistics about chess games that have been previously played starting from the same opening sequence of moves that the user has entered. An example application that inspired our application is the Chess Tempo chess database. We plan to use a Kaggle Dataset that consists of 3.5 million games. 

Any chess enthusiast can use our application. By creating a user account, it gives the user the freedom to add their own games and to save their favourite openings. In addition, we also plan to incorporate additional features such as searching/filtering through chess games, interactively inputting a beginning sequence of moves, viewing statistics about win/loss rates for a particular opening, and viewing statistics about the distribution of ELO ratings of players that have played a certain opening (e.g. average ELO).


### Installation Instructions for Sample Databse to Chosen Platform:

1. Download MySQL, Java, Sprint Boot (https://spring.io/tools), Postman (https://www.postman.com/product/rest-client/), and MySQLWorkbench (https://dev.mysql.com/downloads/workbench/)
2. Clone the git repository (https://github.com/alyssagao1120/chess)
3. To setup MySQL, first set a password. Once done, open up MySQLWorkbench and connect to the database. Then, under the database folder, run the series of commands in greeting.sql to create the necessary schemas and tables.
4. Open Sprint Boot, set 'chess' as the workspace. Once opened, choose the option to import an existing Maven project, select 'backend' folder within 'chess'. If nothing is showing up, try clicking on 'View' in the menu bar and click on 'Package Explorer'. You should now be able to see all the contents within the backend folder.
5. Modify the application.properties file with the password to connect to your local database.
6. Right click 'backend' and run as 'Spring Boot App' to start the server.
7. Now, can use Postman to make post requests to http://localhost:8080/v1/greeting/ with JSON body { name: ANY_VALUE }, and will see the updated value entered into your DB as well as the response of all users in the DB currently
8. In order to see the application on brower, go to the frontend folder in the command terminal and run npm install and then npm start to start the React app. You can now interact with the project UI at http://localhost:3000/. The frontend is currently set up to be able to make a post request which then receives a response with the updated list of all current users in DB and displays it in the UI.
