# CS 348 Final Project
This is an interactive database of chess games that lets the user enter any sequence of valid chess moves and view statistics about chess games that have been previously played starting from the same opening sequence of moves that the user has entered. An example application that inspired our application is the Chess Tempo chess database. We plan to use a Kaggle Dataset that consists of 3.5 million games. 

Any chess enthusiast can use our application. By creating a user account, it gives the user the freedom to add their own games and to save their favourite openings. In addition, we also plan to incorporate additional features such as searching/filtering through chess games, interactively inputting a beginning sequence of moves, viewing statistics about win/loss rates for a particular opening, and viewing statistics about the distribution of ELO ratings of players that have played a certain opening (e.g. average ELO).


### Installation Instructions for Sample Databse to Chosen Platform:

1. Download MySQL, Java, Sprint Boot (https://spring.io/tools), Postman (https://www.postman.com/product/rest-client/), and MySQLWorkbench (https://dev.mysql.com/downloads/workbench/)
2. Create a database on MySQL and user account
3. Clone git repository (https://github.com/alyssagao1120/chess)
4. Open Sprint Boot, open 'chess' project, import existing Maven project, select 'backend' folder within 'chess', open 'Package Explorer' open in 'View' menu
5. Fix chess.dao file to have correct password for your local database that you set
6. Right click 'backend' and run as 'Spring Boot App'
7. Now, can use Postman to make post requests to http://localhost:8080/v1/greeting/ with JSON body { name: ANY_VALUE }, and will see the updated value entered into your DB as well as the response of all users in the DB currently
8. Can get project running with UI by opening project in vscode, running npm install, npm build and interacting with project through UI, adding user to make post request then receiving a response with the updated list of all current users in DB
