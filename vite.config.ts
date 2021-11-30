import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ["vue", "zeed"],
  },
  // optimizeDeps: {
  //   exclude: ["@popperjs/core", "@vueuse/core", "vue"],
  //   include: ["zeed"],
  // },
  build: {
    sourcemap: true,
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["@popperjs/core", "@vueuse/core", "vue", "zeed"],
    },
  },
})
