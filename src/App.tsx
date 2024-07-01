import { useState } from 'react';
import cppWasmData from './webassembly/cppwasm/demo.wasm?url';
import CppWasmModule from './webassembly/cppwasm/demo';
import reactLogo from './assets/react.svg';
import './App.css';
import RustWasmModule from './RustWasmModule';

function App() {
  const [message, setMessage] = useState<string>("-");

  const onClickWasmCpp = async () => {
    const wasmMemory = await fetch(cppWasmData);
    const mod = await CppWasmModule({
      wasmMemory: await wasmMemory.arrayBuffer(),
    });
    setMessage(mod.Greet.SayHello("foo"));
  };

  const onClickRustWasm = async () => {
    await RustWasmModule.loadAsync();
    const msg = RustWasmModule.hello() as string;
    setMessage(msg);
  };

  return (
    <div className="card">
      <img src={reactLogo}></img>
      <h3>C++ WebAssembly and React Starter App</h3>
      <hr></hr>
      <b>Message from C++:</b>
      <br />
      <div className="highlight">
        {message}
      </div>
      <button onClick={onClickWasmCpp}>Load WASM (C++)</button>
      &nbsp; &nbsp;
      <button onClick={onClickRustWasm}>Load WASM (Rust)</button>
    </div>
  )
}

export default App
