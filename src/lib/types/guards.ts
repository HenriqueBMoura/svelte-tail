import type { StorageItem, StorageError, StorageValue, StorageKey } from './storage';

// Type guard interface
export interface TypeGuard<T> {
	(value: unknown): value is T;
}

// Storage type guards
export const isStorageItem: TypeGuard<StorageItem<unknown>> = (
	value: unknown
): value is StorageItem<unknown> => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'key' in value &&
		'value' in value &&
		'timestamp' in value &&
		typeof (value as StorageItem<unknown>).timestamp === 'number'
	);
};

export const isStorageError: TypeGuard<StorageError> = (error: unknown): error is StorageError => {
	return (
		error instanceof Error && 'type' in error && (error as StorageError).type === 'storage-error'
	);
};

// Validation utilities
export const isValidStorageKey = (key: unknown): key is StorageKey => {
	return typeof key === 'string' && key.length > 0;
};

export const isValidStorageValue = (value: unknown): value is StorageValue => {
	if (value === null) return true;
	return ['string', 'number', 'boolean', 'object'].includes(typeof value);
};

// Type assertions
export function assertStorageItem<T>(value: unknown): asserts value is StorageItem<T> {
	if (!isStorageItem(value)) {
		throw new Error('Invalid storage item');
	}
}
