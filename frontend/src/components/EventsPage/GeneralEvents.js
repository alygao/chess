import EventsPage from "./EventsPage";
import SingleEventPage from "./SingleEvent";
import SingleGamePage from "../GamesPage/SingleGamePage";

import { useState } from "react";

function GeneralEvents({ isSingleEventShown, setIsSingleEventShown, isSingleGameShown, setIsSingleGameShown, currUsername, setDefaultValue}) {
  
  const [currEventId, setCurrEventId] = useState(-1);
  const [currGameId, setCurrGameId] = useState(-1);
  let component = <div></div>

  if (isSingleGameShown) {
    component = 
      <SingleGamePage
        setIsSingleGameShown={setIsSingleGameShown}
        currGameId={currGameId}
        currUsername={currUsername}
      />
  } else if (isSingleEventShown) {
    component = 
      <SingleEventPage
        setIsSingleGameShown={setIsSingleGameShown}
        currEventId={currEventId}
        isSingleEventShown={isSingleEventShown}
        setCurrGameId={setCurrGameId}
      />
  } else {
    component = 
      <EventsPage
          setIsSingleEventShown={setIsSingleEventShown}
          setIsSingleGameShown={setIsSingleGameShown}
          setCurrEventId={setCurrEventId}
      />
  }

  return (
    <div>{component}</div>
  )
}

export default GeneralEvents;