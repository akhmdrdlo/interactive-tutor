import { defineConfig } from 'vite';

// base './' supaya hasil build bisa dibuka dari folder mana saja / hosting statis.
export default defineConfig({
  base: './',
  server: { port: 5173, strictPort: true },
});
