const { series} = require('gulp')
const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const sourceMaps = require('rollup-plugin-sourcemaps')
// import camelCase from 'lodash.camelcase'
const json = require('@rollup/plugin-json')
// const camelCase =require('lodash.camelcase')
const babel = require('@rollup/plugin-babel').default
// import babel from "rollup-plugin-babel";
const pkg = require('./package.json')

const libraryName = 'xrvplayer'

// const del = require('del')
// const uglify = require('rollup-plugin-uglify').uglify

console.log(resolve)

const buildCSS = ()=>{
    
}
const buildJS = ()=>{
    return rollup.rollup({
        input: `src/${libraryName}.ts`,
        // output: [
        //   { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
        //   { file: pkg.module, format: 'es', sourcemap: true },
        // ],
        // // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        // external: [],
        // watch: {
        //   include: 'src/**',
        // },
        plugins: [
          // Allow json resolution
          json(),
          // Compile TypeScript files
          // typescript({ useTsconfigDeclarationDir: true }),
          // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
          commonjs(),
          // Allow node_modules resolution, so you can use 'external' to control
          // which external modules to include in the bundle
          // https://github.com/rollup/rollup-plugin-node-resolve#usage
          resolve(),
          babel({
            // "babelrc": false,
            // "presets": [
            //   "@babel/preset-react",
            //   [
            //     "@babel/preset-typescript",{
            //       "isTSX":true,//关键配置
            //       "allExtensions": true//关键配置
            //     }
            //   ],
            //   [
            //     "@babel/env",
            //     {
            //       "modules": false,
            //       "useBuiltIns": "usage",//这里使用babel的自动生成polyfill依赖的功能
            //       "corejs": {
            //         "version": 3, // 使用core-js@3
            //         "proposals": true,
            //       },
            //       "loose": true
            //     }
            //   ]
            // ],
            // "include": [
            //   'src/**'
            // ],
            // "extensions":["tsx","ts","js","jsx"]//超级关键配置
          }),
          // Resolve source maps to the original source
          sourceMaps(),
        ],
      })
      .then(bundle=>{
        const umdBuild = bundle.write({
            file: pkg.main,
            // name: camelCase(libraryName),
            name: libraryName,
            format:'umd',
            sourcemap: true
        })
        const esBuild = bundle.write({ 
            file: pkg.module, 
            format: 'es', 
            sourcemap: true
        })
        return Promise.all([umdBuild,esBuild])
      })
}
exports.default = series(buildJS)