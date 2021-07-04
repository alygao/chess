import "./GamesPage.css"
import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import GamesTable from './GamesTable';


function GamesPage({setIsSingleGameShown, setCurrGameId}) {
    const [searchInput, setSearchInput] = useState("");
    const [viewBlackWinGames, setViewBlackWinGames] = useState(true);
    const [viewWhiteWinGames, setViewWhiteWinGames] = useState(true);
    const [viewDrawGames, setDrawGames] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGamesWithPlayerName("", true, true, true);
      }, []);

    const getGamesWithPlayerName = (playerName, viewBlackWinGames, viewWhiteWinGames, viewDrawGames) => {
        axios.get("http://localhost:8080/v1/game/filtered", { params: { playerName, viewBlackWinGames, viewWhiteWinGames,  viewDrawGames} }).then((res) => {
          const gamesData = res.data;
          setGames(gamesData);
          console.log(gamesData);
        });
      };

    return (
        <div className="games-page-main-container">
            <h1>Chess Games</h1>
            <div className="games-page-search-bar">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder={"Enter Player Name"} />
                <div style={{margin: "0 1.5rem"}}>
                    Black Win: 
                    <input
                        style={{margin: "0 0.5rem"}}
                        checked={viewBlackWinGames}
                        onChange={() => setViewBlackWinGames(!viewBlackWinGames)}
                        type="checkbox"
                    />
                </div>

                <div style={{margin: "0 1.5rem"}}>
                    White Win: 
                    <input
                        style={{margin: "0 0.5rem"}}
                        checked={viewWhiteWinGames}
                        onChange={() => setViewWhiteWinGames(!viewWhiteWinGames)}
                        type="checkbox"
                    />
                </div>

                <div style={{margin: "0 1.5rem"}}>
                    Draw: 
                    <input
                        style={{margin: "0 0.5rem"}}
                        checked={viewDrawGames}
                        onChange={() => setDrawGames(!viewDrawGames)}
                        type="checkbox"
                    />
                </div>

                <div>
                    <Button
                        onClick={() => {
                        getGamesWithPlayerName(searchInput, viewBlackWinGames, viewWhiteWinGames, viewDrawGames);
                        }}
                        variant="contained"
                        style={{
                        fontFamily: "Raleway",
                        backgroundColor: "black",
                        borderRadius: 100,
                        color: "white",
                        textTransform: "none",
                        }}
                    >
                        Find Games
                    </Button>
                </div>
            </div>
            <GamesTable data={games} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
        </div>
    )
}

export default GamesPage;