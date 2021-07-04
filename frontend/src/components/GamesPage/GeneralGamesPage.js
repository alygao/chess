import GamesPage from "./Shipments";
import SingleGamePage from "./Shipment";

import { useState } from "react";

function ShipmentsPage({ isSingleGameShown, setIsSingleGameShown}) {
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

export default ShipmentsPage;