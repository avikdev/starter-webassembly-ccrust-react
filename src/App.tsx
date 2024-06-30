import { useState } from 'react';
import wasmData from './webassembly/demo.wasm?url';
import WasmModule from './webassembly/demo';
import './App.css';


function App() {
  const [message, setMessage] = useState<string>("-");

  const onClickBtn = async () => {
    const wasmMemory = await fetch(wasmData);
    console.log(wasmMemory);
    const mod = await WasmModule({
      wasmMemory: await wasmMemory.arrayBuffer(),
    });
    setMessage(mod.Greet.SayHello("foo"));
  };

  return (
    <div className="card">
      <h3>C++ WebAssembly and React Starter App</h3>
      <p>
        <b>Message from C++:</b>
        <br />
        {message}
      </p>
      <button onClick={onClickBtn}>Load WASM</button>
    </div>
  )
}

export default App
