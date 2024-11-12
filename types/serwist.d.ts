declare module '@serwist/precaching' {
  export interface PrecacheEntry {
    url: string;
    revision: string | null;
  }
}