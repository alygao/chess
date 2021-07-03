import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import WithMoveValidation from "./WithMoveValidation";

const Chess = require("chess.js");

function ChessBoard({moves, setMoves, setMostRecentMove}) {

    const [chess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [fen, setFen] = useState(chess.fen());
    console.log(fen)

    const handleMove = (move) => {
        if (chess.move(move)) {
            console.log(move)
            var newMoves = moves
            newMoves.push(move)
            setMoves(newMoves)
            setMostRecentMove(move)
            setFen(chess.fen());
        }
    };

    return (
        <div>
          <h3>Chess Board</h3>
          <Chessboard
            width={400}
            position={fen}
            onDrop={(move) =>
                handleMove({
                  from: move.sourceSquare,
                  to: move.targetSquare,
                  promotion: "q",
                })
            }
          />
        </div>
      );
}

export default ChessBoard;