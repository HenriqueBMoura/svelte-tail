import { writable, derived } from 'svelte/store';
import type { Book, BookFilters, NewBook } from '$lib/types/book';

// Create stores
export const books = writable<Book[]>([]);
export const filters = writable<BookFilters>({
  search: '',
  status: undefined,
  sortBy: 'title'
});

// CRUD operations
export function addBook(newBook: NewBook) {
  const book: Book = {
    ...newBook,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  };
  books.update(items => [...items, book]);
}

export function deleteBook(id: string) {
  books.update(items => items.filter(book => book.id !== id));
}

// Filter functionality
export const filteredBooks = derived(
  [books, filters],
  ([$books, $filters]) => {
    let result = [...$books];
    
    if ($filters.search?.trim()) {
      const term = $filters.search.toLowerCase().trim();
      result = result.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      );
    }
    
    if ($filters.status) {
      result = result.filter(book => book.status === $filters.status);
    }
    
    return result;
  }
);

export function updateFilters(newFilters: Partial<BookFilters>) {
  filters.update(current => ({
    ...current,
    ...newFilters
  }));
}