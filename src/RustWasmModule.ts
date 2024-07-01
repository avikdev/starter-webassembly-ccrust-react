import * as wasmlogic from "./webassembly/rustwasm/demo_logic";

const RustWasmModule = (function () {
  return {
    loadAsync: async (): Promise<void> => {
      await wasmlogic.default();
    },

    hello: (): string => {
      return wasmlogic.say_hello_from_rust("bar");
    }
  };
})();

export default RustWasmModule;
