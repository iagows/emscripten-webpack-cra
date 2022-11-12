import wasm, { Wasm } from '../wasm/hello'
import { useEffect, useState } from 'react'

function useWasm(fileName:string): Wasm | undefined {
  const [data, setData] = useState<Wasm>()

  async function loadWasm(){
    const loaded = await wasm({
    // This overrides the default path used by the wasm/hello.mjs wrapper
      locateFile: () => require('../wasm/'+fileName+'.wasm'),
    })
    setData(loaded)
  }

  useEffect(()=>{
    if(!data) {
      loadWasm()
    }
  }, [data, loadWasm])

  return data
}

export default useWasm