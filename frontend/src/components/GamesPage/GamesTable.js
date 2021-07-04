
import '../Table.css';

import React, { useState } from 'react';
import Button from "@material-ui/core/Button";

import GamesTableTemplate from './GamesTableTemplate'


function GamesTable({data, setIsSingleGameShown, setCurrGameId}) {
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
            },{
                Header: " ",
                Cell: () => (
                <Button
                    variant="contained"
                    style={{
                    backgroundColor: "#A5C1BE",
                    borderRadius: 100,
                    fontFamily: "Raleway",
                    color: "black",
                    textTransform: "none",
                    }}
                >
                    View Game
                </Button>
                ),
            }
        ]
      )

    return (
        <GamesTableTemplate columns={columns} data={data} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
    )
}

export default GamesTable;