import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const packageJson = require('./package.json')

export default {
  input: 'index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
    },
    {
      file: packageJson.module,
      format: 'esm',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({ sourceMap: false }),
    typescript({ useTsconfigDeclarationDir: true }),
    image(),
    json(),
    postcss({
      extensions: ['.css'],
    }),
    terser(),
  ],
  external: ['react', 'next'],
}
