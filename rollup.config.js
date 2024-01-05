const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts");
const postcss = require("rollup-plugin-postcss");
const tailwindcss = require("tailwindcss")
const tailwindConfig = require("./tailwind.config")

const packageJson = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    external: ['react-dom','css'],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: 'tailwind.css', 
        extends:['.css'], 
        module:false,
        minimize: true,
        inject: {
          insertAt: 'top',
        },
        plugins: [
          tailwindcss(tailwindConfig),
          require('autoprefixer'), // Assuming you're using Autoprefixer
        ],
      }),
    ],
  },
  {
    input: "dist/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "cjs" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];