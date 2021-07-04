import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

function ChessBoard({ fen, handleMove }) {

  // const [chess] = useState(
  //     new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  // );

  // const [fen, setFen] = useState(chess.fen());
  console.log(fen)

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h3>Chess Board</h3>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            piece: move.piece,
            from: move.sourceSquare,
            to: move.targetSquare,
            // promotion: "q",
          })
        }
      />
    </div>
  );
}

export default ChessBoard;