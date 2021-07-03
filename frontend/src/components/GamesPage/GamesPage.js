import "./GamesPage.css";

import { useHistory, Link } from "react-router-dom";
import { useState } from "react";

import ChessBoard from "./ChessBoard"
import GameSteps from "./GameStepsPanel/GameSteps"
import CandidateMoves from "./CandidateMoves"

function GamesPage() {
    const [moves, setMoves] = useState([]);
    const [mostRecentMove, setMostRecentMove] = useState('');
    return (
        <div className="games-page-main-container">
            <h1>GAMES PAGE</h1>
            <div className="games-page-main-content">
                <GameSteps moves={moves} mostRecentMove={mostRecentMove}/>
                <ChessBoard moves={moves} setMoves={setMoves} setMostRecentMove={setMostRecentMove}/>
            </div>
            <CandidateMoves/>
        </div>
    )
}

export default GamesPage;