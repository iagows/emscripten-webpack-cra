import "./App.css";
import React, { useState } from "react";

// this just loads stuff to load the wasm
import hello, { Wasm } from "./wasm/hello";

import Loaded from "./components/Loaded";
import Unloaded from "./components/Unloaded";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wasm, setWasm] = useState<Wasm>();
  const loadWasm = async () => {
    setLoading(true);
    const wasm = await hello({
      // This overrides the default path used by the wasm/hello.mjs wrapper
      locateFile: () => require("./wasm/hello.wasm"),
    });
    setWasm(wasm);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {wasm ? (
          <Loaded wasm={wasm} />
        ) : (
          <Unloaded loading={loading} loadWasm={loadWasm} />
        )}
      </header>
    </div>
  );
};

export default App;
