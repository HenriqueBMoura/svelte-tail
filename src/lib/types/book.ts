export interface Book {
    id: string;
    title: string;
    author: string;
    status: 'reading' | 'completed' | 'want-to-read';
    rating?: number;
  }
  
  export type NewBook = Omit<Book, 'id'>;