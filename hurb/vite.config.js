import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true
  },
  plugins: [react()],
  // Add assetsInclude option to include .JPG files
  resolve: {
    alias: {
      // If you have an alias for your assets directory, use it here
      // For example, if your assets directory is src/assets
      // assets: path.resolve(__dirname, './src/assets')
    },
    // Include .JPG files in asset handling
    assetsInclude: ['**/*.jpg', '**/*.jpeg']
  }
});
