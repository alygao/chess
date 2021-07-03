import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import CandidateMovesTable from "./CandidateMovesTable";

import axios from "axios";

function CandidateMoves({moves, candidateMoves}) {

    

    const candidateMovesColumns = React.useMemo(() => [
        {
          Header: "Move",
          accessor: "_id",
        },
        {
          Header: "Game ID",
          accessor: "areaCode",
        },
        {
          Header: "Rating",
          accessor: "totalBuyers",
        },
        {
          Header: "White Win/Draw/Black Win",
          accessor: "totalWeight",
        },
        {
          Header: " ",
          Cell: () => (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#1753E5",
                borderRadius: 100,
                color: "white",
                textTransform: "none",
              }}
            >
              View shipment
            </Button>
          ),
        },
      ]);
    

    return (
        <div style={{background: "#38454F", padding: "1rem"}}>
            <h2>Candidate Moves</h2>
            <CandidateMovesTable candidateMoves={candidateMoves} columns={candidateMovesColumns}/>
        </div>
    )
}

export default CandidateMoves;