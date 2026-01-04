import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => {
  const { mode } = env;
  const rawEnv = loadEnv(mode, process.cwd(), "");
  const base = rawEnv.VITE_BASE || "/";

  const isProduction = mode === "production";

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
      // Optimize build for production
      minify: "esbuild" as const,
      target: "esnext",
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            utils: ['clsx', 'tailwind-merge', 'date-fns'],
          },
          // Optimize chunk naming for caching
          chunkFileNames: isProduction 
            ? "assets/js/[name]-[hash].js"
            : "assets/js/[name].js",
          entryFileNames: isProduction 
            ? "assets/js/[name]-[hash].js"
            : "assets/js/[name].js",
          assetFileNames: isProduction 
            ? "assets/[ext]/[name]-[hash].[ext]"
            : "assets/[ext]/[name].[ext]",
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Set chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    // Define global constants
    define: {
      __DEV__: JSON.stringify(!isProduction),
    },
  };
});
