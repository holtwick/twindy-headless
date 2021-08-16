import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ["vue"],
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
  plugins: [
    vue(),
    (dts.default || dts)({
      insertTypesEntry: true,
    }),
  ],
})
