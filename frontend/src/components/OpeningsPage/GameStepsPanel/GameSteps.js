import './GameSteps.css'

function GameSteps({
    moves,
    mostRecentMove
}) {

    // var pastMoves = moves
    // pastMoves.pop()
    const formatMoves = (moves) => {
        let rows = [];
        for (let i = 0; i < moves.length; ++i) {
            if (i % 2 == 0) {
                rows.push([moves[i].san]);
            } else {
                rows[rows.length - 1].push(moves[i].san);
            }
        }
        let formattedRows = []
        for (let i = 0; i < rows.length; ++i) {
            if (rows[i].length == 1) {
                formattedRows.push(<div>{(i + 1).toString() + ". " + rows[i][0]}</div>);
            } else {
                formattedRows.push(<div>{(i + 1).toString() + ". " + rows[i][0] + " " + rows[i][1]}</div>);
            }
        }

        return (
            <div>
                {
                    formattedRows
                }
            </div>
        );

    }

    return (
        <div className="game-steps-main-container">
            <h1 style={{ color: '#F2EDD4' }}>Game</h1>
            <div className="game-steps">
                {
                    formatMoves(moves)
                }
            </div>
        </div>
    );
}

export default GameSteps;