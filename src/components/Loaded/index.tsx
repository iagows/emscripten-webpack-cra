import React, { useState } from 'react'
import { Wasm } from '../../wasm/hello'

type Stuff = {
  add: number
  sub: number
  text: string
}

const a = 11
const b = 2

const action = (wasm: Wasm, setStuff: (stuff: Stuff) => void) => {
  // Try a simple function call
  const add = wasm.my_add(a, b)
  const sub = wasm.my_sub(a, b)
  const vectorOfPoints = new wasm.VectorPoint()

  // Push a couple of points:
  vectorOfPoints.push_back({ x: 1, y: 2 })
  vectorOfPoints.push_back({ x: 4, y: 5 })

  // Accumulate them
  const { x, y } = wasm.accumulatePoints(vectorOfPoints)

  const text =
    x === 5 && y === 7 ? 'Accumulation worked' : 'Accumulation did not work'

  setStuff({ add, text, sub })
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
          <div>
            {a} + {b} = {stuff.add}
          </div>
          <div>
            {a} - {b} = {stuff.sub}
          </div>
          <div>{stuff.text}</div>
        </>
      ) : (
        <div>click the button</div>
      )}
    </>
  )
}

export default Loaded
