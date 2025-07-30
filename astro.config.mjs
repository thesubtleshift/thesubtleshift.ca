// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:1313/',
  integrations: [mdx(), react()],

  server: {
    port: 4321,
    host: true, // Enable network access for better dev experience
    open: false // Prevent auto-opening browser
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true // Enable CSS source maps in development
    },
    server: {
      watch: {
        usePolling: false, // Use native file system events
        interval: 100, // Faster polling interval if needed
      }
    }
  }
});

