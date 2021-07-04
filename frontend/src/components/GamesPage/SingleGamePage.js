import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MovesTable from './MovesTable'
import SingleGameChessboard from "./SingleGameChessboard";

const Chess = require("chess.js");

function SingleGamePage({setIsSingleGameShown, currGameId}) {
    const [game, setGame] = useState(null);
    const [movesInGame, setMovesInGame] = useState([]);

    const [chess, setChess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );
    const [fen, setFen] = useState(chess.fen());

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
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>Game #{currGameId}</h1>
            <SingleGameChessboard chess={chess} fen={fen} setFen={setFen} movesInGame={movesInGame}/>
            <MovesTable data={movesInGame}/>
        </div>
    )
}

export default SingleGamePage;