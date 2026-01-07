// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/aktechblog/aktechblog-1/node_modules/vite/dist/node/index.js";
import react from "file:///E:/aktechblog/aktechblog-1/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var vite_config_default = defineConfig((env) => {
  const { mode } = env;
  const rawEnv = loadEnv(mode, process.cwd(), "");
  const base = rawEnv.VITE_BASE || "/";
  const isProduction = mode === "production";
  return {
    base,
    server: {
      host: true,
      port: 8080,
      open: true
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src")
      }
    },
    build: {
      sourcemap: false,
      // Aggressive optimization for production
      minify: "esbuild",
      target: "esnext",
      // Reduce chunk size for better caching
      chunkSizeWarningLimit: 1e3,
      rollupOptions: {
        output: {
          // Simplified chunk splitting to avoid empty chunks
          manualChunks: void 0,
          // Optimize chunk naming for long-term caching
          chunkFileNames: isProduction ? "assets/js/[name]-[hash].js" : "assets/js/[name].js",
          entryFileNames: isProduction ? "assets/js/[name]-[hash].js" : "assets/js/[name].js",
          assetFileNames: isProduction ? "assets/[ext]/[name]-[hash].[ext]" : "assets/[ext]/[name].[ext]"
        }
      },
      // Enable CSS code splitting and optimization
      cssCodeSplit: true,
      // Inline CSS for critical path
      cssMinify: true
    },
    // Optimize dependencies for faster builds
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "date-fns"
      ]
    },
    // Define global constants
    define: {
      __DEV__: JSON.stringify(!isProduction),
      __PROD__: JSON.stringify(isProduction)
    },
    // Enable compression for development
    esbuild: {
      target: "esnext",
      drop: isProduction ? ["console", "debugger"] : []
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxha3RlY2hibG9nXFxcXGFrdGVjaGJsb2ctMVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcYWt0ZWNoYmxvZ1xcXFxha3RlY2hibG9nLTFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2FrdGVjaGJsb2cvYWt0ZWNoYmxvZy0xL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCB0eXBlIENvbmZpZ0VudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGVudjogQ29uZmlnRW52KSA9PiB7XHJcbiAgY29uc3QgeyBtb2RlIH0gPSBlbnY7XHJcbiAgY29uc3QgcmF3RW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcclxuICBjb25zdCBiYXNlID0gcmF3RW52LlZJVEVfQkFTRSB8fCBcIi9cIjtcclxuXHJcbiAgY29uc3QgaXNQcm9kdWN0aW9uID0gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgICAgLy8gQWdncmVzc2l2ZSBvcHRpbWl6YXRpb24gZm9yIHByb2R1Y3Rpb25cclxuICAgICAgbWluaWZ5OiBcImVzYnVpbGRcIiBhcyBjb25zdCxcclxuICAgICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxyXG4gICAgICAvLyBSZWR1Y2UgY2h1bmsgc2l6ZSBmb3IgYmV0dGVyIGNhY2hpbmdcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAvLyBTaW1wbGlmaWVkIGNodW5rIHNwbGl0dGluZyB0byBhdm9pZCBlbXB0eSBjaHVua3NcclxuICAgICAgICAgIG1hbnVhbENodW5rczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgbmFtaW5nIGZvciBsb25nLXRlcm0gY2FjaGluZ1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGlzUHJvZHVjdGlvbiBcclxuICAgICAgICAgICAgPyBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCJcclxuICAgICAgICAgICAgOiBcImFzc2V0cy9qcy9bbmFtZV0uanNcIixcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBpc1Byb2R1Y3Rpb24gXHJcbiAgICAgICAgICAgID8gXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiXHJcbiAgICAgICAgICAgIDogXCJhc3NldHMvanMvW25hbWVdLmpzXCIsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogaXNQcm9kdWN0aW9uIFxyXG4gICAgICAgICAgICA/IFwiYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIlxyXG4gICAgICAgICAgICA6IFwiYXNzZXRzL1tleHRdL1tuYW1lXS5bZXh0XVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIEVuYWJsZSBDU1MgY29kZSBzcGxpdHRpbmcgYW5kIG9wdGltaXphdGlvblxyXG4gICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgIC8vIElubGluZSBDU1MgZm9yIGNyaXRpY2FsIHBhdGhcclxuICAgICAgY3NzTWluaWZ5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIC8vIE9wdGltaXplIGRlcGVuZGVuY2llcyBmb3IgZmFzdGVyIGJ1aWxkc1xyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAncmVhY3QnLFxyXG4gICAgICAgICdyZWFjdC1kb20nLFxyXG4gICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXHJcbiAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JyxcclxuICAgICAgICAnbHVjaWRlLXJlYWN0JyxcclxuICAgICAgICAnY2xzeCcsXHJcbiAgICAgICAgJ3RhaWx3aW5kLW1lcmdlJyxcclxuICAgICAgICAnZGF0ZS1mbnMnXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgLy8gRGVmaW5lIGdsb2JhbCBjb25zdGFudHNcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0RFVl9fOiBKU09OLnN0cmluZ2lmeSghaXNQcm9kdWN0aW9uKSxcclxuICAgICAgX19QUk9EX186IEpTT04uc3RyaW5naWZ5KGlzUHJvZHVjdGlvbiksXHJcbiAgICB9LFxyXG4gICAgLy8gRW5hYmxlIGNvbXByZXNzaW9uIGZvciBkZXZlbG9wbWVudFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxyXG4gICAgICBkcm9wOiBpc1Byb2R1Y3Rpb24gPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSBhcyBhbnkgOiBbXSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsU0FBUyxjQUFjLGVBQStCO0FBQzVULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFHakIsSUFBTyxzQkFBUSxhQUFhLENBQUMsUUFBbUI7QUFDOUMsUUFBTSxFQUFFLEtBQUssSUFBSTtBQUNqQixRQUFNLFNBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDOUMsUUFBTSxPQUFPLE9BQU8sYUFBYTtBQUVqQyxRQUFNLGVBQWUsU0FBUztBQUU5QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxLQUFLO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUE7QUFBQSxNQUVYLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQTtBQUFBLE1BRVIsdUJBQXVCO0FBQUEsTUFDdkIsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBO0FBQUEsVUFFTixjQUFjO0FBQUE7QUFBQSxVQUVkLGdCQUFnQixlQUNaLCtCQUNBO0FBQUEsVUFDSixnQkFBZ0IsZUFDWiwrQkFDQTtBQUFBLFVBQ0osZ0JBQWdCLGVBQ1oscUNBQ0E7QUFBQSxRQUNOO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxjQUFjO0FBQUE7QUFBQSxNQUVkLFdBQVc7QUFBQSxJQUNiO0FBQUE7QUFBQSxJQUVBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixTQUFTLEtBQUssVUFBVSxDQUFDLFlBQVk7QUFBQSxNQUNyQyxVQUFVLEtBQUssVUFBVSxZQUFZO0FBQUEsSUFDdkM7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsTUFBTSxlQUFlLENBQUMsV0FBVyxVQUFVLElBQVcsQ0FBQztBQUFBLElBQ3pEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
