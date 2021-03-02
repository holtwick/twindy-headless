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
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        typescript({
          check: true,
          clean: true,
          abortOnError: false,
          // verbosity: 1,
          // include: ["*.ts+(|x)", "**/*.ts+(|x)"],
          // useTsconfigDeclarationDir: true,
          // tsconfigOverride: {
          //   compilerOptions: {
          //     module: "ESNext",
          //     declaration: true,
          //     declarationDir: "types",
          //   },
          // },
        }),
      ],
    },
  },
})
