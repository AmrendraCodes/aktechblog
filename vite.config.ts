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
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // Aggressive chunk splitting for better caching
          manualChunks: (id) => {
            // Vendor libraries
            if (id.includes('node_modules')) {
              // React ecosystem
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              // Router
              if (id.includes('react-router')) {
                return 'router';
              }
              // UI libraries
              if (id.includes('@radix-ui')) {
                return 'ui-vendor';
              }
              // Icons
              if (id.includes('lucide')) {
                return 'icons';
              }
              // Utilities
              if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns')) {
                return 'utils';
              }
              // Everything else
              return 'vendor';
            }
            // App chunks
            if (id.includes('pages')) {
              return 'pages';
            }
            if (id.includes('components')) {
              return 'components';
            }
          },
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
        // Additional rollup optimizations
        treeshake: 'smallest',
        compact: true,
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
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  };
});
