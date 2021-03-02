import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const path = require("path")
import typescript from "rollup-plugin-typescript2"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "twindy-headless",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        typescript({
          check: true,
          clean: true,
          abortOnError: false,
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              declarationDir: "types",
            },
          },
        }),
      ],
    },
  },
})
