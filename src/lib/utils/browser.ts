export const isBrowser = typeof window !== 'undefined';
export const hasLocalStorage = isBrowser && !!window.localStorage;