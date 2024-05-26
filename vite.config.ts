import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.REACT_APP_API_KEY": JSON.stringify(env.REACT_APP_API_KEY),
      "process.env.REACT_APP_AUTH_DOMAIN": JSON.stringify(
        env.REACT_APP_AUTH_DOMAIN
      ),
      "process.env.REACT_APP_PROJECT_ID": JSON.stringify(
        env.REACT_APP_PROJECT_ID
      ),
      "process.env.REACT_APP_STORAGE_BUCKET": JSON.stringify(
        env.REACT_APP_STORAGE_BUCKET
      ),
      "process.env.REACT_APP_MESSAGING_SENDER_ID": JSON.stringify(
        env.REACT_APP_MESSAGING_SENDER_ID
      ),
      "process.env.REACT_APP_APP_ID": JSON.stringify(env.REACT_APP_APP_ID),
      "process.env.REACT_APP_MEASUREMENT_ID": JSON.stringify(
        env.REACT_APP_MEASUREMENT_ID
      ),
    },
    plugins: [react(), tsconfigPaths()],
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
