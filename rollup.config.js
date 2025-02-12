import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

export default {
  input: 'src/index.tsx',
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
      plugins: [autoprefixer()]
    }),
    copy({
      targets: [{ src: 'src/images/**/*', dest: 'dist/images' }]
    }),
    terser()
  ],
  output: {
    file: packageJson.main,
    format: 'cjs',
    sourcemap: true
  }
}
