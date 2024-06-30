import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
//import vitePlugin from 'vite-plugin-feature';
//import rollupPlugin from 'rollup-plugin-feature';

export default defineConfig(({ command, mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ["**/*.wasm"],

  build: {
    manifest: false,
    minify: mode === 'development' ? false : 'terser',
    target: ['es2021'],
    terserOptions: {
      ecma: 2020,
    },
  },
  // pass your local crate path to the plugin
  plugins: [react()],

  envDir: "dotenv",

  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
     }
  }
}));