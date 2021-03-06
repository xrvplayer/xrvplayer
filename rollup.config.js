// import rollup from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
// const { series } = require('gulp')
// import camelCase from 'lodash.camelcase'
// import babel from "rollup-plugin-babel";
const pkg = require('./package.json')

const libraryName = 'xrvplayer'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: libraryName, format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // typescript({ useTsconfigDeclarationDir: true }),

    babel({
      babelHelpers: 'runtime',
      // exclude: 'node_modules/**',
      // exclude: [/\/core-js\//],
      // include: [
      //   'src/**'
      // ],
      extensions: ['tsx', 'ts', 'js', 'jsx']// 超级关键配置
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Resolve source maps to the original source
    sourceMaps()
  ]
}
