import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";
import type { RouteHandlerObject } from "@serwist/sw";

interface RequestWithURL extends Request {
  url: string;
}

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: PrecacheEntry[];
};

const CACHE_VERSION = "v1";

const runtimeCaching: RouteHandlerObject[] = [
  {
    matcher: ({ request }) => request.mode === "navigate",
    handler: "NetworkFirst",
    options: {
      cacheName: `pages-cache-${CACHE_VERSION}`,
      fallbackURL: "/offline.html",
    },
  },
  {
    matcher: ({ request }: { request: RequestWithURL }) =>
      new URL(request.url).pathname.startsWith("/api/"),
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      },
    },
  },
  {
    matcher: ({ request }: { request: RequestWithURL }) =>
      /\.(png|jpg|jpeg|svg|gif)$/.test(new URL(request.url).pathname),
    handler: "CacheFirst",
    options: {
      cacheName: "images-cache",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      },
    },
  },
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(`static-cache-${CACHE_VERSION}`).then((cache) =>
      cache.addAll([
        "/offline.html", // Precache this file
        // Other critical assets
      ])
    )
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [`static-cache-${CACHE_VERSION}`, `pages-cache-${CACHE_VERSION}`, "api-cache", "images-cache"];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  cleanupOutdatedCaches: true,
});
