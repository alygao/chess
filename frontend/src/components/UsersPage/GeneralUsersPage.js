import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import FavouritedGames from "./FavouritedGames"
import SingleGamePage from "../GamesPage/SingleGamePage"

function GeneralUsersPage({currUsername, isSingleGameShown, setIsSingleGameShown}) {
    
    const [isFavouritedGamesShown, setFavouritedGamesShown] = useState(true)
    const [currGameId, setCurrGameId] = useState(-1);

    let component = <div></div>

    if (isSingleGameShown) {
        component = 
          <SingleGamePage
            setIsSingleGameShown={setIsSingleGameShown}
            currGameId={currGameId}
            currUsername={currUsername}
          />
      } else if (isFavouritedGamesShown) {
        component = 
            <FavouritedGames currUsername={currUsername} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId} /> 
      } else {
        component = 
          <></>
      }
    

    return (
        <>
            {component}
        </>
    )
}

export default GeneralUsersPage