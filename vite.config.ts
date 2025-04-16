
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..', '/', '.', '../..']
    },
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    proxy: {
      '/api': {
        target: 'https://8000-idx-portfoliobackendgit-1744754619441.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev/api/',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure we explicitly set the base directory for the application
  base: "./",
  // Make sure the root is correct - this should be the directory containing package.json
  root: process.cwd(),
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  }
}));
