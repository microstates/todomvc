const pkg = require("./package.json");
const babel = require("rollup-plugin-babel");
const filesize = require("rollup-plugin-filesize");
const resolve = require("rollup-plugin-node-resolve");

const input = 'todomvc.js';

const external = [
  "microstates"
];

const fileSize = filesize();

module.exports = [
  {
    input,
    external,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        comments: false,
        plugins: ["@babel/plugin-proposal-class-properties"],
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: "6"
              },
              modules: false
            }
          ]
        ]
      }),
      fileSize
    ]
  },
  {
    input,
    external,
    output: { file: pkg.module, format: "es", sourcemap: true },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        comments: false,
        plugins: ["@babel/plugin-proposal-class-properties"],
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false
            }
          ]
        ],
        externalHelpers: true
      }),
      fileSize
    ]
  }
];