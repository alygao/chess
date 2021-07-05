import EventsPage from "./EventsPage";
import SingleEventPage from "./SingleEvent";

import { useState } from "react";

function GeneralGamesPage({ isSingleEventShown, setIsSingleEventShown, setIsSingleGameShown, setDefaultValue}) {
  
    const [currEventId, setCurrEventId] = useState(-1);

  return (
    <>
      {isSingleEventShown ? (
        <SingleEventPage
            setIsSingleGameShown={setIsSingleGameShown}
            currEventId={currEventId}
            isSingleEventShown={isSingleEventShown}
            setDefaultValue={setDefaultValue}
        />
      ) : (
        <EventsPage
            setIsSingleEventShown={setIsSingleEventShown}
            setCurrEventId={setCurrEventId}
        />
      )}
    </>
  );
}

export default GeneralGamesPage;