export function isSSR(): boolean {
  // If we're rendering on the server, the window object is missing.
  return typeof window === 'undefined';
}
