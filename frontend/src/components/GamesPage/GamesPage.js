import "./GamesPage.css";

import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ChessBoard from "./ChessBoard"
import GameStepsPanel from "./GameStepsPanel/GameStepsPanel"
import CandidateMoves from "./CandidateMoves"

import axios from "axios";

const Chess = require("chess.js");


function GamesPage() {
    const [moves, setMoves] = useState([]);
    const [mostRecentMove, setMostRecentMove] = useState('');

    const [candidateMoves, setCandidateMoves] = useState([]);

    useEffect(() => {
        getCandidateMovesByPreviousMoves([]);
      }, []);

    const getCandidateMovesByPreviousMoves = (moves) => {
        let previousMovesString = "";
        for (let i = 0; i < moves.length; i++) { 
            previousMovesString = previousMovesString.concat(moves[i].to)
        }
        console.log("previousMovesString = ", previousMovesString);
        axios.get("http://localhost:8080/v1/game/candidate_moves", { params: { previousMovesString } }).then((res) => {
          const candidateMoves = res.data;
          setCandidateMoves(candidateMoves);
          console.log(candidateMoves);
        });
      };

    const [chess, setChess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [fen, setFen] = useState(chess.fen());
    const [fenList, setFenList] = useState([fen])

    return (
        <div className="games-page-main-container">
            {/* <h1>GAMES PAGE</h1> */}
            <div className="games-page-main-content">
                <GameStepsPanel chess={chess} setChess={setChess} moves={moves} mostRecentMove={mostRecentMove} setMoves={setMoves} fen={fen} setFen={setFen} setMostRecentMove={setMostRecentMove} moves={moves} fenList={fenList} setFenList={setFenList} getCandidateMovesByPreviousMoves={getCandidateMovesByPreviousMoves}/>
                <ChessBoard moves={moves} getCandidateMovesByPreviousMoves={getCandidateMovesByPreviousMoves} setMoves={setMoves} setMostRecentMove={setMostRecentMove}
                    chess={chess} fen={fen} setFen={setFen} fenList={fenList} setFenList={setFenList}
                />
            </div>
            <CandidateMoves moves={moves} candidateMoves={candidateMoves}/>
        </div>
    )
}

export default GamesPage;