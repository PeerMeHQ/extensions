import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    commonjs({ sourceMap: false }),
    typescript({ useTsconfigDeclarationDir: true }),
    image(),
    json(),
    postcss({
      extensions: ['.css'],
    }),
    terser(),
  ],
}
