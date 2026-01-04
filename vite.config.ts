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
      // Aggressive optimization for production
      minify: "esbuild" as const,
      target: "esnext",
      // Reduce chunk size for better caching
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Simplified chunk splitting to avoid empty chunks
          manualChunks: undefined,
          // Optimize chunk naming for long-term caching
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
      // Enable CSS code splitting and optimization
      cssCodeSplit: true,
      // Inline CSS for critical path
      cssMinify: true,
    },
    // Optimize dependencies for faster builds
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'date-fns'
      ],
    },
    // Define global constants
    define: {
      __DEV__: JSON.stringify(!isProduction),
      __PROD__: JSON.stringify(isProduction),
    },
    // Enable compression for development
    esbuild: {
      target: 'esnext',
      drop: isProduction ? ['console', 'debugger'] as any : [],
    },
  };
});
