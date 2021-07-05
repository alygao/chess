
import '../Table.css';

import React, { useState } from 'react';
import Button from "@material-ui/core/Button";

import EventsTableTemplate from './EventsTableTemplate'


function GamesTable({data, setIsSingleEventShown, setCurrEventId}) {
    const columns = React.useMemo(() => [
        {
          Header: "Event Name",
          accessor: "name",
        },
        {
          Header: "Event ID",
          accessor: "eid",
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
        <EventsTableTemplate columns={columns} data={data} setIsSingleEventShown={setIsSingleEventShown} setCurrEventId={setCurrEventId}/>
    )
}

export default GamesTable