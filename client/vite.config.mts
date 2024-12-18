import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url"

export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            external: ["path", "util"], // Prevent bundling Node.js modules
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString()
                    }
                },
            },
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
})
