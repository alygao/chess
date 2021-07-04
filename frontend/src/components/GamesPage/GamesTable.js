
import '../Table.css';

import React, { useState } from 'react';

import GamesTableTemplate from './GamesTableTemplate'


function GamesTable({data}) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'GAME ID',
                accessor: 'gid',
            },{
                Header: 'WINNER',
                accessor: 'winner',  
            },{
                Header: 'DATE',
                accessor: 'date',
            },{
                Header: 'WHITE PLAYER ID',
                accessor: 'white.id',
            },{
                Header: 'WHITE PLAYER NAME',
                accessor: 'white.name',
            },{
                Header: 'WHITE PLAYER ELO',
                accessor: 'white.elo',
            },{
                Header: 'BLACK PLAYER ID',
                accessor: 'black.id',
            },{
                Header: 'BLACK PLAYER NAME',
                accessor: 'black.name',
            },{
                Header: 'BLACK PLAYER ELO',
                accessor: 'black.elo',
          }
        ]
      )

    return (
        <GamesTableTemplate columns={columns} data={data} />
    )
}

export default GamesTable