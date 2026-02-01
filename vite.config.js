import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig((env) => {
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
            extensions: ['.js', '.jsx', '.json']
        },
        build: {
            sourcemap: false,
            minify: "esbuild",
            target: "esnext",
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks: undefined,
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
            cssCodeSplit: true,
            cssMinify: true,
        },
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                'react-router-dom',
                'lucide-react',
                'date-fns'
            ],
        },
        define: {
            __DEV__: JSON.stringify(!isProduction),
            __PROD__: JSON.stringify(isProduction),
        },
        esbuild: {
            target: 'esnext',
            drop: isProduction ? ['console', 'debugger'] : [],
        },
    };
});
