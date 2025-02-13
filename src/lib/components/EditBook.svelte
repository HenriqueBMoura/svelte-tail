<script lang="ts">
  import { books } from '$lib/stores/bookStore';
  import type { Book } from '$lib/types/book';
  import { showToast } from '$lib/stores/toastStore';

  export let book: Book;
  export let onEditComplete: () => void; // Callback prop for edit completion
  
  let editedBook = { ...book };

  function handleEdit() {
    books.update(currentBooks => {
      const index = currentBooks.findIndex(b => b.id === book.id);
      if (index !== -1) {
        currentBooks[index] = { ...editedBook };
      }
      return currentBooks;
    });
    showToast('Book updated successfully!', 'success'); // Show toast message
    onEditComplete(); // Call the callback prop
  }
</script>

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
    <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
      Save
    </button>
  </form>
</div>