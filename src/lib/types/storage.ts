export interface StorageItem<T> {
    key: string;
    value: T;
    timestamp: number;
  }
  
  export interface StorageOptions {
    expires?: number; // Time in milliseconds
  }