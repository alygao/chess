
import '../Table.css';

import React, { useState } from 'react';
import Button from "@material-ui/core/Button";

import EventsTableTemplate from './EventsTableTemplate'


function GamesTable({data, setIsSingleGameShown, setCurrGameId}) {
    const columns = React.useMemo(() => [
        {
          Header: "Move",
          accessor: "moveString",
        },
        {
          Header: "Game ID",
          accessor: "gid",
        }, {
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
                    View Event
                </Button>
                ),
            }
        ]
      );

    return (
        <EventsTableTemplate columns={columns} data={data} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
    )
}

export default GamesTable