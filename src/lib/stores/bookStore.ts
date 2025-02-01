import { persistentStore } from '$lib/stores/persistentStore';
import type { Book, NewBook } from '$lib/types/book';

export const books = persistentStore<Book[]>('books', [], {
  expires: 30 * 24 * 60 * 60 * 1000 // 30 days
});

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