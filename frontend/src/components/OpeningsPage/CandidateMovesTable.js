import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Table from "../Table";
import "../Table.css";

function CandidateMovesTable({ candidateMoves, columns }) {

  return (
    <Table
      columns={columns}
      data={candidateMoves}
      hiddenColumns={
        [
          "winStats.numWhiteWins",
          "winStats.numDraws",
          "winStats.numBlackWins",
        ]
      }
    />
  );
}

export default CandidateMovesTable;