import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => {
  const { mode } = env;
  const rawEnv = loadEnv(mode, process.cwd(), "");
  const base = rawEnv.VITE_BASE || "/";

  return {
    base,
    server: {
      host: true,
      port: 8080,
      open: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    build: {
      sourcemap: false,
    },
  };
});
