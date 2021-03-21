import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import typescript2 from "rollup-plugin-typescript2"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      ...typescript2({
        check: false,
        clean: true,
        abortOnError: false,
      }),
      apply: "build",
    },
  ],
  resolve: {
    dedupe: ["vue"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      // plugins: [
      //   typescript({
      //     check: true,
      //     clean: true,
      //     abortOnError: false,
      //   }),
      // ],
    },
  },
})
