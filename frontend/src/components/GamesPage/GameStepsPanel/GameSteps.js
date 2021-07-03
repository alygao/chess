import './GameSteps.css'

function GameSteps({
    moves,
    mostRecentMove
  }) {

    // var pastMoves = moves
    // pastMoves.pop()

    return (
        <div className="game-steps-main-container">
            <h2>GAME</h2>
            <div className="game-steps">
                {moves.map((move, i) =>
                    <div key={i}>
                        <div>
                            {move.to}
                        </div>
                    </div>   
                )}
            </div>
        </div>
    );
}

export default GameSteps;