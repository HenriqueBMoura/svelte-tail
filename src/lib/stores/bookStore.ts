import { writable, derived } from 'svelte/store';
import type { Book, BookFilters, NewBook } from '$lib/types/book';

const STORAGE_KEY = 'bookshelf_books';

function createPersistentBookStore() {
  const stored = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    : [];
    
  const { subscribe, set, update } = writable<Book[]>(stored);

  if (typeof window !== 'undefined') {
    subscribe(books => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    });
  }

  return {
    subscribe,
    set,
    update,
    addBook: (newBook: NewBook) => {
      const book: Book = {
        ...newBook,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      };
      update(books => [...books, book]);
    },
    deleteBook: (id: string) => {
      update(books => books.filter(b => b.id !== id));
    }
  };
}

export const books = createPersistentBookStore();
export const filters = writable<BookFilters>({
  search: '',
  status: undefined,
  sortBy: 'title'
});

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