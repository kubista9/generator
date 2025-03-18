import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    publicDir: "public",
    plugins: [tsconfigPaths()],
    build: {
        ssr: true,
        target: "esnext",
        rollupOptions: {
            input: {
                main: "src/main.ts",
            },
            output: {
                dir: path.resolve("./dist"),
                entryFileNames: "create.mjs",
                format: "es",
                globals: {
                    "@inquirer/prompts": "prompts",  
                },
            },
        },
    },
});