<script lang="ts">
  import { books } from '$lib/stores/bookStore';
  import type { Book } from '$lib/types/book';
  import EditBook from './EditBook.svelte';

  export let book: Book;
  
  let isEditing = false;

  function handleEditComplete() {
    isEditing = false;
  }
</script>

{#if isEditing}
  <EditBook {book} onEditComplete={handleEditComplete} />
{:else}
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold">{book.title}</h3>
        <p class="text-gray-600">by {book.author}</p>
      </div>
      <div class="flex gap-2">
        <button
          on:click={() => isEditing = true}
          class="text-blue-500 hover:text-blue-700"
          aria-label="Edit book"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          on:click={() => books.deleteBook(book.id)}
          class="text-red-500 hover:text-red-700"
          aria-label="Delete book"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      {book.status === 'reading' ? 'bg-yellow-100 text-yellow-800' : 
       book.status === 'completed' ? 'bg-green-100 text-green-800' : 
       'bg-blue-100 text-blue-800'}">
      {book.status}
    </span>
  </div>
{/if}