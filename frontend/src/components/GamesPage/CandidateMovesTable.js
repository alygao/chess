import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Table from "../Table";
import "../Table.css";

function CandidateMovesTable({candidateMoves, columns}) {
  

  const data = candidateMoves;

  return (
    <Table
        columns={columns}
        data={data}
    />
  );
}

export default CandidateMovesTable;