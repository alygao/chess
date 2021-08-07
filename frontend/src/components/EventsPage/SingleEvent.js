import axios from "axios";
import { useState, useEffect } from "react";
import GamesTable from '../GamesPage/GamesTable';

function SingleEventPage({isSingleEventShown, setIsSingleGameShown, currEventId, setCurrGameId}) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames(currEventId);
      }, []);

    const getGames = (eid) => {
        console.log(eid);
        axios.get("http://localhost:8080/v1/events/games", { params: { eid } }).then((res) => {
        const gamesData = res.data;
        setGames(gamesData);
        });
    };

    // const returnToEventsPage = () => {
    //     setIsSingleEventShown(false);
    // };

    return (
        <>
            <h1>Event #{currEventId}</h1>
            <GamesTable data={games} setIsSingleGameShown={setIsSingleGameShown} setCurrGameId={setCurrGameId}/>
        </>
    )
}

export default SingleEventPage;