import { writable, type Writable } from 'svelte/store';
import { Storage } from '$lib/utils/storage';
import type { StorageOptions } from '$lib/types/storage';

interface PersistentStoreOptions<T> extends StorageOptions {
  version?: string;
  validate?: (value: unknown) => value is T;
  migrate?: (oldValue: unknown, oldVersion: string) => T;
  onError?: (error: Error) => void;
}

export function createPersistentStore<T>(
  key: string,
  initialValue: T,
  options: PersistentStoreOptions<T> = {}
): Writable<T> {
  // Load initial state with validation and migration
  const loadInitialState = (): T => {
    try {
      const stored = Storage.get<{ value: T; version: string }>(key, options);
      
      if (!stored) return initialValue;

      // Version check and migration
      if (options.version && stored.version !== options.version) {
        return options.migrate 
          ? options.migrate(stored.value, stored.version)
          : initialValue;
      }

      // Validation
      if (options.validate && !options.validate(stored.value)) {
        throw new Error('Invalid stored data');
      }

      return stored.value;
    } catch (error) {
      options.onError?.(error as Error);
      return initialValue;
    }
  };

  const store = writable<T>(loadInitialState());

  // Subscribe to changes and persist
  store.subscribe(value => {
    try {
      Storage.set(key, {
        value,
        version: options.version || '1.0'
      });
    } catch (error) {
      options.onError?.(error as Error);
    }
  });

  // Listen for storage events from other tabs
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue 
            ? JSON.parse(event.newValue).value
            : initialValue;
            
          if (options.validate && !options.validate(newValue)) {
            throw new Error('Invalid storage event data');
          }
          
          store.set(newValue);
        } catch (error) {
          options.onError?.(error as Error);
        }
      }
    });
  }

  return {
    ...store,
    set: (value: T) => {
      try {
        if (options.validate && !options.validate(value)) {
          throw new Error('Invalid value');
        }
        store.set(value);
      } catch (error) {
        options.onError?.(error as Error);
      }
    },
    update: (updater: (value: T) => T) => {
      store.update(current => {
        try {
          const updated = updater(current);
          if (options.validate && !options.validate(updated)) {
            throw new Error('Invalid updated value');
          }
          return updated;
        } catch (error) {
          options.onError?.(error as Error);
          return current;
        }
      });
    }
  };
}