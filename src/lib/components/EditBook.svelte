<script lang="ts">
    import { books } from '$lib/stores/bookStore';
    import type { Book, BookStatus } from '$lib/types/book';
  
    export let book: Book;
    
    let isEditing = false;
    let editedBook = { ...book };
  
    function handleEdit() {
      books.editBook(book.id, editedBook);
      isEditing = false;
    }
  </script>
  
  {#if isEditing}
    <div class="bg-white p-6 rounded-lg shadow-md">
      <form on:submit|preventDefault={handleEdit} class="space-y-4">
        <input
          type="text"
          bind:value={editedBook.title}
          class="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          bind:value={editedBook.author}
          class="w-full px-3 py-2 border rounded"
        />
        <select
          bind:value={editedBook.status}
          class="w-full px-3 py-2 border rounded"
        >
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="want-to-read">Want to Read</option>
        </select>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            on:click={() => isEditing = false}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
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
            aria-label="Delete book"
            on:click={() => books.deleteBook(book.id)}
            class="text-red-500 hover:text-red-700"
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