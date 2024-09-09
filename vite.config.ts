import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@assets', replacement: '/src/_assets' },
      { find: '@utils', replacement: '/src/_utils' },
      { find: '@example', replacement: '/src/_example' },
      { find: '@apis', replacement: '/src/_apis' },
      { find: '@recoil', replacement: '/src/_recoil' },
      { find: '@typeBundle', replacement: '/src/_typeBundle' },
    ],
  },
});
