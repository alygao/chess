import EventsPage from "./EventsPage";
import SingleEventPage from "./SingleEventsPage";

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
            setIsSingleGameShown={setIsSingleEventShown}
            setCurrEventId={setCurrEventId}
        />
      )}
    </>
  );
}

export default GeneralGamesPage;