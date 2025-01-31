// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const config = {
  input: 'src/index.ts',
  output: {
    esModule: true,
    file: 'dist/index.mjs',
    format: 'es',
    sourcemap: true
  },
  plugins: [typescript(), nodeResolve(), commonjs(), terser()]
};

export default config;
