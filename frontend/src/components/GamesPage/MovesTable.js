
import '../Table.css';

import React, { useState } from 'react';
import Button from "@material-ui/core/Button";

import MovesTableTemplate from './MovesTableTemplate'


function MovesTable({data}) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'TURN NUMBER',
                accessor: 'turnNum',
            },{
                Header: 'CHESS PIECE',
                accessor: 'chessPiece',  
            },{
                Header: 'FROM',
                accessor: 'fromSquare',
            },{
                Header: 'TO',
                accessor: 'toSquare',
            // },{
            //     Header: 'WIN STATS',
            //     accessor: 'winStats',
            }
        ]
      )

    return (
        <MovesTableTemplate columns={columns} data={data}/>
    )
}

export default MovesTable;