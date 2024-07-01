import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

function CopyFilesSync(sourceDir, destDir, filenames) {
  try {
    // Ensure the destination directory exists.
    fs.mkdirSync(path.dirname(destDir), { recursive: true });

    // Copy the individual files.
    for (const filename of filenames) {
      const srcFilePath = path.join(sourceDir, filename);
      const destFilePath = path.join(destDir, filename);
      fs.copyFileSync(srcFilePath, destFilePath);
      console.log(`Copied: ${srcFilePath} => ${destFilePath}`);
    }
  } catch (err) {
    console.error(`Error copying file: ${err}`);
  }
}

function ValidateCmdLineArgs() {
  if (process.argv.length !== 3) {
    throw new Error("Too few args");
  }

  const [NODE_BIN, SCRIPT_PATH, DOTENV_SCRIPT] = process.argv.splice(0, 3);
  globalThis.NODE_BIN = NODE_BIN;
  globalThis.SCRIPT_PATH = SCRIPT_PATH;

  // The dotenv config file specific for the app env.
  const dotEnvPath = path.resolve(import.meta.dirname, "../dotenv", DOTENV_SCRIPT);
  dotenv.config({ path: dotEnvPath });

  if (["tauri", "web"].indexOf(process.env.APP_MODE) < 0) {
    throw new Error("APP_MODE not found in process.env");
  }
}

export { CopyFilesSync, ValidateCmdLineArgs };
