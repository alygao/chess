import axios from 'axios';
import "../Table.css";
import EventsTable from './EventsTable';
import React, { useEffect, useState } from "react";

function EventsPage({setIsSingleEventShown, setIsSingleGameShown, setCurrEventId}) {

    const [events, setEvents] = useState([]);

    const getEvents = () => {
        setIsSingleGameShown(false)
        axios.get("http://localhost:8080/v1/events/events").then((res) => {
            const eventsData = res.data;
            setEvents(eventsData);
        });
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <h1>Events</h1>
            <EventsTable data={events} setIsSingleEventShown={setIsSingleEventShown} setCurrEventId={setCurrEventId}/>
        </>

    )
}

export default EventsPage;