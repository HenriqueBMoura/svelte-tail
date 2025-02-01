<script lang="ts">
    import { books } from '$lib/stores/bookStore';
    import { deleteBook } from '$lib/stores/bookStore';
  </script>
  
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