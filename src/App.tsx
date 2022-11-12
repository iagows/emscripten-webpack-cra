import './App.css'
import React from 'react'

import Loaded from './components/Loaded'

import useWasm from './hooks/useWasm'

const App = () => {
  const wasm = useWasm('hello')
  return (
    <div className="App">
      <header className="App-header">
        {wasm ? <Loaded wasm={wasm} /> : <div>Loading...</div>}
      </header>
    </div>
  )
}

export default App
