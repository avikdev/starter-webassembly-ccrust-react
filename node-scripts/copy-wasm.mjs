import path from 'path';
import { CopyFilesSync, ValidateCmdLineArgs } from "./common-utils.mjs";

const PACKAGE_NAME = "demo_logic";

// Do nothing now.
ValidateCmdLineArgs();

function CopyWasmAndGlueJs(packageName) {
  const wasmOutput = path.resolve(import.meta.dirname, "../build/wasm");

  // Copy the glue JS code (with Typescript type definitions).
  // This applies to both the "tauri" mode and the "web" mode.
  const glueJsDir = path.resolve(import.meta.dirname, "../src/webassembly/gluejs");
  CopyFilesSync(wasmOutput, glueJsDir, [`${packageName}.js`, `${packageName}.d.ts`]);

  const wasmBinFile = `${packageName}_bg.wasm`;
  if (process.env.APP_MODE === "tauri") {
    const tauriAssetsDir = path.resolve(import.meta.dirname, "../src-tauri/tauri-assets");
    CopyFilesSync(wasmOutput, tauriAssetsDir, [wasmBinFile]);
  } else if (process.env.APP_MODE === "web") {
    const staticAssetsDir = path.resolve(import.meta.dirname, "../public/wa");
    CopyFilesSync(wasmOutput, staticAssetsDir, [wasmBinFile]);
  }
}
