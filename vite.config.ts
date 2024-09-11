import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/', replacement: '/src' },
      { find: '@/pages', replacement: '/src/pages' },
      { find: '@/components', replacement: '/src/components' },
      { find: '@/_assets', replacement: '/src/_assets' },
      { find: '@/_utils', replacement: '/src/_utils' },
      { find: '@/_example', replacement: '/src/_example' },
      { find: '@/_apis', replacement: '/src/_apis' },
      { find: '@/_recoil', replacement: '/src/_recoil' },
      { find: '@/_typeBundle', replacement: '/src/_typeBundle' },
    ],
  },
});
