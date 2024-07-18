// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: 'localhost', // Allow access from network
    port: 3000, // Change this to your desired port
    strictPort: true, // Exit if the port is already in use
    https: false, // Enable HTTPS
  },
});
