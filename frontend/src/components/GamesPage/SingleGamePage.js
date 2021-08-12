import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import MovesTable from './MovesTable'
import SingleGameChessboard from "./SingleGameChessboard";

const Chess = require("chess.js");

function SingleGamePage({setIsSingleGameShown, currGameId, currUsername}) {
    const [game, setGame] = useState(null);
    const [movesInGame, setMovesInGame] = useState([]);
    const [isFavourited, setFavourited] = useState(false);

    const [chess, setChess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );
    const [fen, setFen] = useState(chess.fen());

    useEffect(() => {
        getGame(currGameId, currUsername);
        getMovesInGame(currGameId);
      }, []);

    const getGame = (gid, username) => {
        axios.get("http://localhost:8080/v1/game/single", { params: { gid } }).then((res) => {
        const gameData = res.data;
        setGame(gameData);
        console.log(gameData);
        });

        // check if game is favourited by current user
        axios.get("http://localhost:8080/v1/game/user", { params: { username } }).then((res) => {
        const favouritedGames = res.data;
        for (let i = 0; i < favouritedGames.length; i++) {
            if (favouritedGames[i].gid == currGameId) {
                setFavourited(true)
            }
        }})
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

    const addOrRemoveGameFromFavourites = (gid, username) => {
        if (isFavourited) {
            // remove from favourites
            axios.delete("http://localhost:8080/v1/game/user", { params: { gid, username } });
        } else {
            // add to favourites
            const favouritedGame = { username: username, gid: gid };
            console.log("favourited game = ", favouritedGame);
            axios.post('http://localhost:8080/v1/game/user', favouritedGame);
        }
        setFavourited(!isFavourited)
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>Game #{currGameId}</h1>
            {currUsername != null && 
                <Button
                    onClick={() => {
                    addOrRemoveGameFromFavourites(currGameId, currUsername)
                    }}
                    variant="contained"
                    style={{
                    backgroundColor: "#A5C1BE",
                    color: "black",
                    textTransform: "none",
                    fontFamily: "Raleway",
                    height:55,
                    margin: "1rem"
                    }}
                >
                    {isFavourited ? 'remove from favourites' : 'add to favourites'}
                </Button>
            }

            <SingleGameChessboard chess={chess} fen={fen} setFen={setFen} movesInGame={movesInGame}/>
            <MovesTable data={movesInGame}/>
        </div>
    )
}

export default SingleGamePage;