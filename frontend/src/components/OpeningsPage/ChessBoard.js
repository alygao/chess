import Chessboard from "chessboardjsx";

function ChessBoard({ fen, handleMove }) {
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
          })
        }
      />
    </div>
  );
}

export default ChessBoard;