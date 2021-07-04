import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MovesTable from './MovesTable'

function SingleGamePage({setIsSingleGameShown, currGameId}) {
    const [game, setGame] = useState(null);
    const [movesInGame, setMovesInGame] = useState([]);

    useEffect(() => {
        getGame(currGameId);
        getMovesInGame(currGameId);
      }, []);

    const getGame = (gid) => {
        axios.get("http://localhost:8080/v1/game/single", { params: { gid } }).then((res) => {
        const gameData = res.data;
        setGame(gameData);
        console.log(gameData);
        });
    };

    const getMovesInGame = (gid) => {
        axios.get("http://localhost:8080/v1/game/moves", { params: { gid } }).then((res) => {
        const movesData = res.data;
        setMovesInGame(movesData);
        console.log(movesData);
        });
    };

    const returnToGamesPage = () => {
        setIsSingleGameShown(false);
    };

    return (
        <div>
            <h1>Game #{currGameId}</h1>
            
            <MovesTable data={movesInGame}/>
        </div>
    )
}

export default SingleGamePage;