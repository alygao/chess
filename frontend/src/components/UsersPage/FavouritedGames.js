import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import GamesTable from '../GamesPage/GamesTable';

function FavouritedGames({currUsername, setIsSingleGameShown, setCurrGameId}) {

    const [favouritedGames, setFavouritedGames] = useState([])

    useEffect(() => {
        getUserFavouritedGames(currUsername);
      }, []);

    const getUserFavouritedGames = (username) => {
        axios.get("http://localhost:8080/v1/game/user", { params: { username} }).then((res) => {
          const gamesData = res.data;
          setFavouritedGames(gamesData);
          console.log(gamesData);
        });
      };

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Here are your favourite games. 
                Click on a game to view details or remove from favourites.</p>
            <GamesTable data={favouritedGames} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
        </div>
    )
}

export default FavouritedGames