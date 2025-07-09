import React, {FunctionComponent, useEffect, useState} from 'react';
import Routes from "./components/Routes";
import {UidContext} from "./components/AppContext";
import {fetchToken} from "./utils/api";

const App: FunctionComponent = () => {
  const [uid, setUid] = useState<string | null>(null);

    useEffect(() => {
        fetchToken(setUid);
    }, [uid]);

  return (
      <UidContext.Provider value={uid}>
        <Routes/>
      </UidContext.Provider>
  )
}

export default App;
