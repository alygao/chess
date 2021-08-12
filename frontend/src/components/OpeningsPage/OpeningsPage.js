import "./OpeningsPage.css";
import { useState, useEffect } from "react";

import ChessBoard from "./ChessBoard"
import GameStepsPanel from "./GameStepsPanel/GameStepsPanel"
import CandidateMoves from "./CandidateMoves"

import axios from "axios";

const Chess = require("chess.js");


function OpeningsPage() {
    const [moves, setMoves] = useState([]);
    const [mostRecentMove, setMostRecentMove] = useState('');

    const [candidateMoves, setCandidateMoves] = useState([]);

    useEffect(() => {
        getCandidateMovesByPreviousMoves([]);
    }, []);

    const getCandidateMovesByPreviousMoves = (moves) => {
        let previousMovesString = "";
        for (let i = 0; i < moves.length; i++) {
            if (previousMovesString.length > 0) {
                previousMovesString = previousMovesString.concat("-" + moves[i].san);
            } else {
                previousMovesString = previousMovesString.concat(moves[i].san);
            }
        }
        console.log("previousMovesString = '" + previousMovesString + "'");
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

    const handleMove = (move) => {
        move = chess.move(move);
        if (move) {
            console.log(move)
            var newMoves = moves
            newMoves.push(move)
            setMoves(newMoves)
            setMostRecentMove(move.san)
            setFen(chess.fen());
            fenList.push(fen)
            setFenList(fenList)
            getCandidateMovesByPreviousMoves(moves)
        }
    };

    return (
        <div className="openings-page-main-container">
            {/* <h1>GAMES PAGE</h1> */}
            <div className="openings-page-main-content">
                <GameStepsPanel chess={chess} setChess={setChess} moves={moves} mostRecentMove={mostRecentMove} setMoves={setMoves} fen={fen} setFen={setFen} setMostRecentMove={setMostRecentMove} fenList={fenList} setFenList={setFenList} getCandidateMovesByPreviousMoves={getCandidateMovesByPreviousMoves} />
                <ChessBoard fen={fen} handleMove={handleMove} />
            </div>
            <CandidateMoves moves={moves} candidateMoves={candidateMoves} handleMove={handleMove} />
        </div>
    )
}

export default OpeningsPage;