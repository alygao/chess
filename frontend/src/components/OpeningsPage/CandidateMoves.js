import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import CandidateMovesTable from "./CandidateMovesTable";


function CandidateMoves({ moves, candidateMoves, handleMove }) {



  const candidateMovesColumns = React.useMemo(() => [
    {
      Header: "Move",
      accessor: "moveString",
      Cell: ({ cell }) => (
        <Button
          onClick={() => {
            // Pass the moveString itself instead of a dict
            // like used elsewhere in the codebase because
            // a chess.js move can be constructed using this
            // string itself
            handleMove(cell.row.values.moveString);
          }}
          variant="contained"
          style={{
            backgroundColor: "black",
            borderRadius: 100,
            color: "white",
            textTransform: "none",
          }}
        >
          {cell.row.values.moveString}
        </Button>
      ),
    },
    {
      Header: "Game ID",
      accessor: "gid",
    },
    {
      Header: "White Wins",
      accessor: "winStats.numWhiteWins",
    },
    {
      Header: "Black Wins",
      accessor: "winStats.numBlackWins",
    },
  ]);


  return (
    <div style={{ padding: "1rem" }}>
      <h1>Candidate Moves</h1>
      <CandidateMovesTable candidateMoves={candidateMoves} columns={candidateMovesColumns} />
    </div>
  )
}

export default CandidateMoves;