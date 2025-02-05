export interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
    rating?: number;
    createdAt?: number;
}
  
export type NewBook = Omit<Book, 'id'>;

export type BookStatus = 'want-to-read' | 'reading' | 'completed';
export interface BookFilters {
    search: string;
    status?: BookStatus;
    sortBy?: 'title' | 'author' | 'date';
}
// export enum BookStatus {
//     READING = 'reading',
//     COMPLETED = 'completed',
//     WANT_TO_READ = 'want-to-read'
//   }