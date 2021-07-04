import GameSteps from './GameSteps'
import GameControlButtons from './GameControlButtons'
import './GameStepsPanel.css';

function GameStepsPanel({ chess, setChess, moves, mostRecentMove, setMoves, fen, setFen, setMostRecentMove, fenList, setFenList, getCandidateMovesByPreviousMoves }) {
    return (
        <div className="game-steps-panel-main-container">
            <GameControlButtons chess={chess} setChess={setChess} setMoves={setMoves} fen={fen} setFen={setFen} setMostRecentMove={setMostRecentMove} moves={moves} fenList={fenList} setFenList={setFenList} getCandidateMovesByPreviousMoves={getCandidateMovesByPreviousMoves} />
            <GameSteps moves={moves} mostRecentMove={mostRecentMove} />
        </div>
    )
}

export default GameStepsPanel;