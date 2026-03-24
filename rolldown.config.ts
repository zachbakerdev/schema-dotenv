import { defineConfig, type RolldownOptions } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

const config: RolldownOptions = defineConfig({
  input: './src/index.ts',
  output: {
    format: 'esm',
    dir: 'dist',
    minify: true,
  },
  external: ['dotenv'],
  plugins: [dts({ sourcemap: false })],
});

export default config;
