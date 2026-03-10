import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Performance optimizations
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and related libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // Separate UI libraries
          'vendor-ui': ['antd', 'lucide-react'],
          
          // Separate utility libraries
          'vendor-utils': ['i18next', 'zustand', 'react-i18next', 'react-select'],
        }
      }
    },
    
    // Chunk size warning at 500kb (down from 1.37mb)
    chunkSizeWarningLimit: 500,
    
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    
    // Source maps for production debugging (optional)
    sourcemap: false,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  
  // Server configuration
  server: {
    port: 5173,
    open: true,
  },
})
