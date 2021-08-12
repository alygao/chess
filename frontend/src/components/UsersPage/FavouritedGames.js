import React, { useEffect, useState } from "react";
import axios from "axios";
import GamesTable from '../GamesPage/GamesTable';

function FavouritedGames({currUsername, setIsSingleGameShown, setCurrGameId}) {

    const [favouritedGames, setFavouritedGames] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        getUserFavouritedGames(currUsername);
        getName(currUsername);
      }, []);



    const getUserFavouritedGames = (username) => {
        axios.get("http://localhost:8080/v1/game/user", { params: { username} }).then((res) => {
          const gamesData = res.data;
          setFavouritedGames(gamesData);
          console.log(gamesData);
        });
      };

    const getName = (username) => {
      axios.get("http://localhost:8080/v1/player/user", { params: { username} }).then((res) => {
          const userData = res.data;
          setName(userData.split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join(' '));
        });
    }

    return (
        <div>
            <h1>Welcome {name}!</h1>
            <p>Here are your favourite games. 
                Click on a game to view details or remove from favourites.</p>
            <GamesTable data={favouritedGames} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
        </div>
    )
}

export default FavouritedGames