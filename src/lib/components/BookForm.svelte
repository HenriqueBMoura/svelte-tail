<script lang="ts">
  import type { NewBook } from '$lib/types/book';
  import { books } from '$lib/stores/bookStore';

  let newBook: NewBook = {
    title: '',
    author: '',
    status: 'want-to-read'
  };

  function handleSubmit() {
    books.addBook(newBook);
    newBook = {
      title: '',
      author: '',
      status: 'want-to-read'
    };
  }
</script>
  
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 class="text-xl font-semibold mb-4">Add New Book</h2>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          bind:value={newBook.title}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          id="author"
          bind:value={newBook.author}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          bind:value={newBook.status}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="want-to-read">Want to Read</option>
          <option value="reading">Currently Reading</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <button
        type="submit"
        class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Book
      </button>
    </form>
  </div>