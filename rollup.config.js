import vue from "rollup-plugin-vue"
import typescript from "rollup-plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    format: "esm",
    file: "dist/twindy-headless.esm.js",
  },
  external: ["vue"],
  plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: "es2015",
    }),
    vue(),
  ],
}
