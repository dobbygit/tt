import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Only import tempo if we're in the Tempo environment
let tempo = () => ({});
if (process.env.TEMPO === "true") {
  try {
    const tempoModule = require("tempo-devtools/dist/vite");
    tempo = tempoModule.tempo;
  } catch (e) {
    console.warn("Could not load tempo-devtools, continuing without it");
  }
}

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "framer-motion"],
          ui: ["./src/components/ui/**/*.tsx"],
        },
      },
    },
  },
});
