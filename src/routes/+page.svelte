<!-- <h1 class="text-4xl font-bold text-center">
    Hey SVEEEEELTE
</h1>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.200);
    }
</style>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<!-- // src/routes/+page.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';

  interface Book {
    id: string;
    title: string;
    author: string;
    status: 'reading' | 'completed' | 'want-to-read';
    rating?: number;
  }

  const books = writable<Book[]>([]);
  let newBook: Omit<Book, 'id'> = {
    title: '',
    author: '',
    status: 'want-to-read'
  };

  function addBook() {
    books.update(currentBooks => [
      ...currentBooks,
      {
        ...newBook,
        id: crypto.randomUUID()
      }
    ]);
    
    // Reset form
    newBook = {
      title: '',
      author: '',
      status: 'want-to-read'
    };
  }

  function deleteBook(id: string) {
    books.update(currentBooks => 
      currentBooks.filter(book => book.id !== id)
    );
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">My Bookshelf</h1>
  
  <!-- Add Book Form -->
  <div class="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 class="text-xl font-semibold mb-4">Add New Book</h2>
    <form on:submit|preventDefault={addBook} class="space-y-4">
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
  
  <!-- Book List -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each $books as book (book.id)}
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold">{book.title}</h3>
        <p class="text-gray-600">by {book.author}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="px-2 py-1 rounded-full text-sm capitalize
            {book.status === 'reading' ? 'bg-yellow-100 text-yellow-800' : 
             book.status === 'completed' ? 'bg-green-100 text-green-800' : 
             'bg-blue-100 text-blue-800'}">
            {book.status.replace('-', ' ')}
          </span>
          <button
            on:click={() => deleteBook(book.id)}
            class="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>