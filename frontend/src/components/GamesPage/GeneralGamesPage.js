import GamesPage from "./GamesPage";
import SingleGamePage from "./SingleGamePage";

import { useState } from "react";

function GeneralGamesPage({ isSingleGameShown, setIsSingleGameShown}) {
  
    const [currGameId, setCurrGameId] = useState(-1);

  return (
    <>
      {isSingleGameShown ? (
        <SingleGamePage
            setIsSingleGameShown={setIsSingleGameShown}
            currGameId={currGameId}
        />
      ) : (
        <GamesPage
            setIsSingleGameShown={setIsSingleGameShown}
            setCurrGameId={setCurrGameId}
        />
      )}
    </>
  );
}

export default GeneralGamesPage;