import "@dotenvx/dotenvx/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // Update process.env depending on the mode
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  let isProxySecure = false;
  try {
    const newUrl = new URL(process.env.VITE_PROXY_API_TARGET!);
    isProxySecure = newUrl.protocol === "https:";
  } catch (_) {
    isProxySecure = false;
  }

  return {
    plugins: [react(), tailwindcss()],
    build: {
      sourcemap: false, // Do not generate .map files during build
    },
    server: {
      open: true,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: process.env.VITE_PROXY_API_TARGET, // We cannot use import.meta.env.VITE_PROXY_API_TARGET inside vite.config.ts file
          changeOrigin: true,
          secure: isProxySecure,
        },
      },
    },
  };
});
