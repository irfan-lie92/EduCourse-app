/** @type {import('next').NextConfig} */

// Deteksi environment lokal
const isLocal = process.env.NODE_ENV === 'development';

console.log(`🛠️ Running Next.js in ${isLocal ? 'local development' : 'production'} mode`);

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Konfigurasi eksperimental hasil percobaan lokal
  experimental: {
    // ⚠️ Percobaan lokal: fitur eksperimental aktif selama pengembangan
    // Dioptimalkan untuk dev experience dan kecepatan kompilasi
    incrementalCacheHandlerPath: isLocal
      ? undefined // Gunakan default saat development
      : 'custom-cache-handler', // Misal: disiapkan untuk deploy
  },
};

module.exports = nextConfig;
