import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import typescript from "rollup-plugin-typescript2"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ["vue"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
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
