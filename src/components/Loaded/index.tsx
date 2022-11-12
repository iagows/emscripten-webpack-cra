import React, { useState } from 'react'
import { Wasm } from '../../wasm/hello'

type Stuff = {
  add: number
  text: string
}

const action = (wasm: Wasm, setStuff: (stuff: Stuff) => void) => {
  // Try a simple function call
  const add = wasm.my_add(1, 2)
  const vectorOfPoints = new wasm.VectorPoint()

  // Push a couple of points:
  vectorOfPoints.push_back({ x: 1, y: 2 })
  vectorOfPoints.push_back({ x: 4, y: 5 })

  // Accumulate them
  const { x, y } = wasm.accumulatePoints(vectorOfPoints)
  if (x === 5 && y === 7) {
    setStuff({ add, text: 'Accumulation worked' })
  } else {
    setStuff({ add, text: 'Accumulation did not work' })
  }
}

type PropTypes = {
  wasm: Wasm
}

const Loaded = ({ wasm }: PropTypes) => {
  const [stuff, setStuff] = useState<Stuff>()

  function onClick(): void {
    action(wasm, setStuff)
  }

  return (
    <>
      <button onClick={onClick}>Click me</button>
      {stuff ? (
        <>
          <div>1 + 2 = {stuff.add}</div>
          <div>{stuff.text}</div>
        </>
      ) : (
        <div>click the button</div>
      )}
    </>
  )
}

export default Loaded
