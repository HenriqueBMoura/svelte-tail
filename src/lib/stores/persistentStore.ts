import { writable, type Writable } from 'svelte/store';
import { Storage } from '$lib/utils/storage';
import type { StorageOptions } from '$lib/types/storage';

export function persistentStore<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions
): Writable<T> {
  // Try to get stored value
  const stored = Storage.get<T>(key, options);
  const { subscribe, set, update } = writable<T>(stored ?? initialValue);

  return {
    subscribe,
    set: (value: T) => {
      Storage.set(key, value);
      set(value);
    },
    update: (updater: (value: T) => T) => {
      update(current => {
        const updated = updater(current);
        Storage.set(key, updated);
        return updated;
      });
    }
  };
}