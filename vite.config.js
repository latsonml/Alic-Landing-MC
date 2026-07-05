import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        features: resolve(__dirname, 'features/index.html'),
        pricing: resolve(__dirname, 'pricing/index.html'),
        mca: resolve(__dirname, 'mca/index.html'),
        reconciliation: resolve(__dirname, 'services/reconciliation/index.html'),
        privacy: resolve(__dirname, 'privacy-policy/index.html'),
        terms: resolve(__dirname, 'terms-of-service/index.html'),
      },
    },
  },
});
