import './GameControlButtons.css'
import Button from "@material-ui/core/Button";

const Chess = require("chess.js");

function GameControlButtons({ chess, setChess, fen, setFen, setMoves, setMostRecentMove, moves, fenList, setFenList, getCandidateMovesByPreviousMoves }) {
    const resetBoard = (e) => {
        chess.reset()
        setMoves([])
        setFenList([])
        setFen(chess.fen())
        setMostRecentMove('')
        getCandidateMovesByPreviousMoves([])
    }

    const undoMove = (e) => {
        chess.undo()
        var updatedMoves = moves

        if (moves.length === 0) {
            return
        }
        updatedMoves.pop()
        setMoves(updatedMoves)

        var updatedFenList = fenList
        updatedFenList.pop()
        setFenList(updatedFenList)

        setMostRecentMove(moves[moves.length - 1])
        setFen(chess.fen())

        getCandidateMovesByPreviousMoves(moves)
    }

    return (
        <div className="game-control-buttons-main-container">
            {/* Game Control Buttons */}
            <Button
                onClick={() => {
                    resetBoard();
                }}
                variant="contained"
                style={{
                    backgroundColor: "#A5C1BE",
                    color: "black",
                    textTransform: "none",
                    fontFamily: "Raleway",
                    height: 75,
                    margin: "1rem"
                }}
            >
                reset board
            </Button>

            <Button
                onClick={() => {
                    undoMove();
                }}
                variant="contained"
                style={{
                    backgroundColor: "#A5C1BE",
                    color: "black",
                    textTransform: "none",
                    fontFamily: "Raleway",
                    height: 75,
                    margin: "1rem"
                }}
            >
                undo move
            </Button>

        </div>
    )
}

export default GameControlButtons;