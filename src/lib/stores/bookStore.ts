import { writable } from 'svelte/store';
import type { Book, NewBook } from '$lib/types/book';

export const books = writable<Book[]>([]);

export function addBook(newBook: NewBook) {
  books.update(currentBooks => [
    ...currentBooks,
    {
      ...newBook,
      id: crypto.randomUUID()
    }
  ]);
}

export function deleteBook(id: string) {
  books.update(currentBooks => 
    currentBooks.filter(book => book.id !== id)
  );
}