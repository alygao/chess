import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import CandidateMovesTable from "./CandidateMovesTable";


function CandidateMoves({moves, candidateMoves}) {

    

    const candidateMovesColumns = React.useMemo(() => [
        {
          Header: "Move",
          accessor: "moveString",
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
        {
          Header: " ",
          Cell: () => (
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                color: "white",
                textTransform: "none",
              }}
            >
              Use Move
            </Button>
          ),
        },
      ]);
    

    return (
        <div style={{padding: "1rem"}}>
            <h1>Candidate Moves</h1>
            <CandidateMovesTable candidateMoves={candidateMoves} columns={candidateMovesColumns}/>
        </div>
    )
}

export default CandidateMoves;