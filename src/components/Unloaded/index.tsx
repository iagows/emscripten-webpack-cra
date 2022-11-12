import React from "react";

type PropTypes = {
  loading: boolean;
  loadWasm: () => void;
};

const Unloaded = ({ loading, loadWasm }: PropTypes) => {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <button onClick={loadWasm}>Load library</button>
  );
};

export default Unloaded;
