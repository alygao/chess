import axios from "axios";
import { useState, useEffect } from "react";
import GamesTable from '../GamesPage/GamesTable';

function SingleEventPage({isSingleEventShown, setIsSingleGameShown, currEventId, setDefaultValue}) {
    const [events, setEvents] = useState([]);
    

    useEffect(() => {
        getEvents(currEventId);
      }, []);

    const getEvents = (eid) => {
        axios.get("http://localhost:8080/v1/game/single", { params: { eid } }).then((res) => {
        const eventData = res.data;
        setEvents(eventData);
        });
    };

    // const returnToEventsPage = () => {
    //     setIsSingleEventShown(false);
    // };

    return (
        <>
            <h1>Event #{currEventId}</h1>
            <GamesTable data={events} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setDefaultValue}/>
        </>
    )
}

export default SingleEventPage;