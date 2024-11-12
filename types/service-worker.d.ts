declare module '@serwist/sw' {
  interface RouteHandlerObject {
    matcher: (options: { request: Request }) => boolean;
    handler: 'NetworkFirst' | 'CacheFirst' | 'NetworkOnly' | 'CacheOnly' | 'StaleWhileRevalidate';
    options?: {
      cacheName?: string;
      fallbackURL?: string;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
    };
  }

  interface InstallSerwistOptions {
    precacheEntries: any[];
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    navigationPreload?: boolean;
    runtimeCaching?: RouteHandlerObject[];
    cleanupOutdatedCaches?: boolean;
  }

  export function installSerwist(options: InstallSerwistOptions): void;
}