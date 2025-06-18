import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  target: 'es2018',
  sourcemap: false,
  clean: true,
  external: [
    'react',
    'react-native',
    '@react-native-async-storage/async-storage',
  ],
});
