export interface StorageItem<T> {
    key: string;
    value: T;
    timestamp: number;
  }
  
  export interface StorageOptions {
    expires?: number; // Time in milliseconds
    version?: string;
    namespace?: string;
  }
  
  export interface StorageError extends Error {
    type: 'storage-error';
    code: 'quota-exceeded' | 'invalid-data' | 'storage-unavailable';
  }
  
  export type StorageKey = string;
  
  export type StorageValue = string | number | boolean | object | null;
  
  export interface StorageAdapter {
    get<T>(key: StorageKey): T | null;
    set<T>(key: StorageKey, value: T): void;
    remove(key: StorageKey): void;
    clear(): void;
  }
  
  export type StorageEventHandler = (event: StorageEvent) => void;
  
  export interface StorageConfig {
    prefix?: string;
    adapter?: StorageAdapter;
    defaultExpiry?: number;
  }