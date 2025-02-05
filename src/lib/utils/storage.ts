import type { StorageItem, StorageOptions } from '$lib/types/storage';
import { hasLocalStorage } from './browser';

export class Storage {
  static set<T>(key: string, value: T): void {
    if (!hasLocalStorage) return;

    const item: StorageItem<T> = {
      key,
      value,
      timestamp: Date.now()
    };

    try {
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn('LocalStorage error:', error);
    }
  }

  static get<T>(key: string, options?: StorageOptions): T | null {
    if (!hasLocalStorage) return null;

    try {
      const itemStr = window.localStorage.getItem(key);
      if (!itemStr) return null;

      const item: StorageItem<T> = JSON.parse(itemStr);

      if (options?.expires && Date.now() - item.timestamp > options.expires) {
        window.localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.warn('LocalStorage error:', error);
      return null;
    }
  }

  static remove(key: string): void {
    if (!hasLocalStorage) return;
    window.localStorage.removeItem(key);
  }

  static clear(): void {
    if (!hasLocalStorage) return;
    window.localStorage.clear();
  }
}