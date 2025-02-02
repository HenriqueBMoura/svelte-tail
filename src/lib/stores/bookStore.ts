import { derived, type Readable } from 'svelte/store';
import { persistentStore } from './persistentStore';
import type { Book, NewBook, BookFilters } from '$lib/types/book';

// Persistent store for books
export const books = persistentStore<Book[]>('books', []);

import { writable } from 'svelte/store';

// Separate store for filters (non-persistent)
export const filters = writable<BookFilters>({
  search: '',
  sortBy: 'title'
});

// Derived store for filtered books (doesn't affect storage)
export const filteredBooks = derived(
  [books as unknown as Readable<Book[]>, filters as unknown as Readable<BookFilters>],
  ([$books, $filters]) => {
    return $books?.filter(book => {
      // Search filter
      if ($filters.search) {
        const searchTerm = $filters.search.toLowerCase();
        if (!book.title.toLowerCase().includes(searchTerm) &&
            !book.author.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      // Status filter
      if ($filters.status && book.status !== $filters.status) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if ($filters.sortBy === 'date') {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      const sortBy = $filters.sortBy || 'title';
      return a[sortBy].localeCompare(b[sortBy]);
    });
  }
);

export function addBook(newBook: NewBook) {
  books.update(currentBooks => [
    ...currentBooks,
    {
      ...newBook,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    }
  ]);
}

export function deleteBook(id: string) {
  books.update(currentBooks => 
    currentBooks.filter(book => book.id !== id)
  );
}