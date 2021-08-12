import Button from "@material-ui/core/Button";
import React from "react";
import CandidateMovesTable from "./CandidateMovesTable";
import HorizontalBar from "./HorizontalBar";

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
      Header: "White Wins",
      accessor: "winStats.numWhiteWins",
    },
    {
      Header: "Black Wins",
      accessor: "winStats.numBlackWins",
    },
    {
      Header: "Draws",
      accessor: "winStats.numDraws",
    },
    {
      Header: "Games",
      accessor: "winStats.numGames",
    },
    {
      Header: "White / Draw / Black",
      Cell: ({ cell }) => {
        console.log(cell);

        return <HorizontalBar
          showTextIn
          fontColor={["black", "white", "white"]}
          data={
            [
              {
                description: cell.row.values["winStats.numWhiteWins"],
                value: cell.row.values["winStats.numWhiteWins"],
                color: "white"
              },
              {
                description: cell.row.values["winStats.numDraws"],
                value: cell.row.values["winStats.numWhiteWins"],
                color: "gray"
              },
              {
                description: cell.row.values["winStats.numBlackWins"],
                value: cell.row.values["winStats.numBlackWins"],
                color: "black"
              },

            ]
          } />
      }
    }
  ]);


  return (
    <div style={{ padding: "1rem" }}>
      <h1>Candidate Moves</h1>
      <CandidateMovesTable candidateMoves={candidateMoves} columns={candidateMovesColumns} />
    </div>
  )
}

export default CandidateMoves;