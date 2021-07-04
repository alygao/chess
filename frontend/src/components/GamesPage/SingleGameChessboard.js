import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import Button from "@material-ui/core/Button";


function SingleGameChessboard({chess, fen, setFen, movesInGame}) {

    const [turnNum, setTurnNum] = useState(0)

    const previousMove = (e) => {
        if (turnNum <= 0) {
            return;
        }
        
        setTurnNum(turnNum - 1)
        chess.undo()
        console.log("PREV - turnNum = ", turnNum);
        console.log(movesInGame[turnNum].toSquare)
        setFen(chess.fen())
    }

    const nextMove = (e) => {
        if (turnNum == movesInGame.length) {
            return;
        }
        console.log("NEXT - turnNum = ", turnNum);
        let nextMove = {from: movesInGame[turnNum].fromSquare, to: movesInGame[turnNum].toSquare}

        console.log(nextMove);
        chess.move(nextMove)
        
        console.log(chess.fen())
        setFen(chess.fen())

        if (turnNum < movesInGame.length - 1){
            setTurnNum(turnNum + 1)
        }

    }


    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "3rem"}}>

          <div className="game-control-buttons-main-container">
            <Button
                onClick={() => {
                previousMove();
                }}
                variant="contained"
                style={{
                backgroundColor: "#A5C1BE",
                color: "black",
                textTransform: "none",
                fontFamily: "Raleway",
                height:75,
                margin: "1rem"
                }}
            >
                previous board
            </Button>

            <Button
                onClick={() => {
                nextMove();
                }}
                variant="contained"
                style={{
                backgroundColor: "#A5C1BE",
                color: "black",
                textTransform: "none",
                fontFamily: "Raleway",
                height:75,
                margin: "1rem"
                }}
            >
                next move
            </Button>
        </div>

          <Chessboard
            width={400}
            position={fen}
          />
        </div>
      );
}

export default SingleGameChessboard;